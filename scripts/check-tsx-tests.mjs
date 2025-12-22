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
    // Allowed test file suffixes that satisfy the requirement.
    testSuffixes: [".test.tsx", ".spec.tsx"],
  };

  if (!fs.existsSync(cfgPath)) return defaults;
  const raw = fs.readFileSync(cfgPath, "utf8");
  const userCfg = JSON.parse(raw);
  return {
    ignoreRegex: Array.isArray(userCfg.ignoreRegex) ? userCfg.ignoreRegex : defaults.ignoreRegex,
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
  return cfg.testSuffixes.map((suffix) => `${base}${suffix}`);
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

  if (candidates.length === 0) {
    process.exit(0);
  }

  const missing = [];
  for (const component of candidates) {
    const expected = expectedTestsFor(component, cfg);
    const ok = expected.some((t) => existsInIndex(t));
    if (!ok) missing.push({ component, expected });
  }

  if (missing.length > 0) {
    console.log("[pre-commit] Missing required test files for staged TSX components:");
    for (const m of missing) {
      console.log(`- ${m.component}`);
      for (const t of m.expected) console.log(`  - expected: ${t}`);
    }
    console.log(
      "[pre-commit] Add the matching test file(s), or add an ignore rule in tsx-test-requirements.json (ignoreRegex)."
    );
    process.exit(1);
  }
}

try {
  main();
} catch (e) {
  console.log(`[pre-commit] TSX test check failed to run: ${e?.message || e}`);
  process.exit(1);
}


