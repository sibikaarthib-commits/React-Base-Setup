import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AppModal } from "../../../../app/ui/components/baseComponent/AppModal";

describe("AppModal", () => {
  it("renders children inside modal", () => {
    render(
      <AppModal open={true} onClose={() => {}}>
        <div data-testid="modal-child">Modal Content</div>
      </AppModal>
    );

    const child = screen.getByTestId("modal-child");
    expect(child).toBeDefined();
    expect(child.textContent).toBe("Modal Content");
  });

  it("does not render children when closed", () => {
    render(
      <AppModal open={false} onClose={() => {}}>
        <div data-testid="modal-child">Hidden Content</div>
      </AppModal>
    );

    const child = screen.queryByTestId("modal-child");
    expect(child).toBeNull();
  });
});
