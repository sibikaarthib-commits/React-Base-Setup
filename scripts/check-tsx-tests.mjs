import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = process.cwd();

function runGit(args) {
  const res = spawnSync("git", args, { encoding: "utf8" });
  return res;
}

function gitStdout(args) {
  const res = runGit(args);
  if (res.status !== 0) {
    const msg = (res.stderr || res.stdout || "").trim();
    throw new Error(`git ${args.join(" ")} failed${msg ? `: ${msg}` : ""}`);
  }
  return (res.stdout || "").trimEnd();
}

function existsInIndex(filePath) {
  // Check existence of a file in the Git index (staged or tracked).
  const res = runGit(["cat-file", "-e", `:${filePath}`]);
  return res.status === 0;
}

function loadConfig() {
  const cfgPath = path.join(repoRoot, "tsx-test-requirements.json");
  const defaults = {
    // These are JavaScript RegExp strings matched against repo-relative POSIX paths.
    ignoreRegex: [
      "^src/main\\.tsx$",
      "^src/App\\.tsx$",
      "^src/.*?/index\\.tsx$",
      "^src/.*?\\.stories\\.tsx$",
    ],
    // Optional path mappings to locate tests in a different root but same relative path.
    // Example: src/app/ui/X.tsx -> src/app-test/ui/X.test.tsx
    testPathMappings: [],
    // Allowed test file suffixes that satisfy the requirement.
    testSuffixes: [".test.tsx", ".spec.tsx"],
  };

  if (!fs.existsSync(cfgPath)) return defaults;
  const raw = fs.readFileSync(cfgPath, "utf8");
  const userCfg = JSON.parse(raw);
  return {
    ignoreRegex: Array.isArray(userCfg.ignoreRegex) ? userCfg.ignoreRegex : defaults.ignoreRegex,
    testPathMappings: Array.isArray(userCfg.testPathMappings)
      ? userCfg.testPathMappings
      : defaults.testPathMappings,
    testSuffixes: Array.isArray(userCfg.testSuffixes) ? userCfg.testSuffixes : defaults.testSuffixes,
  };
}

function toPosix(p) {
  return p.replaceAll("\\", "/");
}

function isTsxCandidate(filePath, cfg) {
  if (!filePath.endsWith(".tsx")) return false;
  if (filePath.endsWith(".test.tsx") || filePath.endsWith(".spec.tsx")) return false;

  return !cfg.ignoreRegex.some((re) => new RegExp(re).test(filePath));
}

function expectedTestsFor(componentPath, cfg) {
  const base = componentPath.slice(0, -".tsx".length);
  const bases = new Set([base]); // same-folder rule still allowed

  for (const m of cfg.testPathMappings || []) {
    if (!m || typeof m.from !== "string" || typeof m.to !== "string") continue;
    try {
      const re = new RegExp(m.from);
      if (re.test(componentPath)) {
        const mappedComponent = componentPath.replace(re, m.to);
        if (mappedComponent.endsWith(".tsx")) {
          bases.add(mappedComponent.slice(0, -".tsx".length));
        }
      }
    } catch {
      // ignore invalid regex
    }
  }

  const out = [];
  for (const b of bases) {
    for (const suffix of cfg.testSuffixes) out.push(`${b}${suffix}`);
  }
  return out;
}

function main() {
  const cfg = loadConfig();

  // Only check what's staged for commit (added/copied/modified/renamed).
  const staged = gitStdout(["diff", "--cached", "--name-only", "--diff-filter=ACMR"]);
  const stagedFiles = staged
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map(toPosix);

  const candidates = stagedFiles.filter((f) => isTsxCandidate(f, cfg));

  // Also protect against removing tests for existing components (staged deletions).
  const deleted = gitStdout(["diff", "--cached", "--name-only", "--diff-filter=D"]);
  const deletedFiles = deleted
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map(toPosix);

  const missing = [];
  for (const component of candidates) {
    const expected = expectedTestsFor(component, cfg);
    const ok = expected.some((t) => existsInIndex(t));
    if (!ok) missing.push({ component, expected });
  }

  const deletedTests = [];
  for (const f of deletedFiles) {
    if (!(f.endsWith(".test.tsx") || f.endsWith(".spec.tsx"))) continue;

    const suffix = f.endsWith(".test.tsx") ? ".test.tsx" : ".spec.tsx";
    const testBase = f.slice(0, -suffix.length);

    // Candidate component paths to check (same-folder + inverse mappings)
    const componentCandidates = new Set([`${testBase}.tsx`]);
    for (const m of cfg.testPathMappings || []) {
      if (!m || typeof m.from !== "string" || typeof m.to !== "string") continue;
      try {
        const re = new RegExp(m.to); // invert: to -> from
        if (re.test(`${testBase}.tsx`)) {
          componentCandidates.add(`${(`${testBase}.tsx`).replace(re, m.from)}`);
        }
      } catch {
        // ignore invalid regex
      }
    }

    for (const comp of componentCandidates) {
      const compPath = toPosix(comp);
      if (cfg.ignoreRegex.some((re) => new RegExp(re).test(compPath))) continue;
      if (existsInIndex(compPath)) {
        deletedTests.push({ testFile: f, component: compPath });
        break;
      }
    }
  }

  if (missing.length === 0 && deletedTests.length === 0) process.exit(0);

  // FIRST LINE on failure (so Cursor/VS Code notification shows the real reason)
  console.log("[pre-commit] Missing tests — commit blocked.");

  if (missing.length > 0) {
    console.log("[pre-commit] Missing required test files for staged TSX components:");
    for (const m of missing) {
      console.log(`- ${m.component}`);
      for (const t of m.expected) console.log(`  - expected: ${t}`);
    }
  }

  if (deletedTests.length > 0) {
    console.log("[pre-commit] You removed staged test files for components that still exist:");
    for (const d of deletedTests) {
      console.log(`- deleted: ${d.testFile}`);
      console.log(`  component still exists: ${d.component}`);
    }
  }

  console.log(
    "[pre-commit] Add the matching test file(s), or add an ignore rule in tsx-test-requirements.json (ignoreRegex)."
  );
  process.exit(1);
}

try {
  main();
} catch (e) {
  console.log(`[pre-commit] TSX test check failed to run: ${e?.message || e}`);
  process.exit(1);
}


