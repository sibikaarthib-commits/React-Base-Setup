import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AppTable } from "../../../../app/ui/components/baseComponent/AppTable";

type SampleRow = { id: string; name: string };

const rows: SampleRow[] = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
];

describe("AppTable", () => {
  it("renders table rows correctly", () => {
    render(
      <AppTable<SampleRow>
        rows={rows}
        columns={[{ key: "name", header: "Name" }]}
        getRowKey={(row:any) => row.id}
      />
    );

    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("Bob")).toBeDefined();
  });

  it("renders table headers correctly", () => {
    render(
      <AppTable<SampleRow>
        rows={rows}
        columns={[{ key: "name", header: "Name" }]}
        getRowKey={(row:any) => row.id}
      />
    );

    expect(screen.getByText("Name")).toBeDefined();
  });
});
