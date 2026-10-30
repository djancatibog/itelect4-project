// ===== GT6 test 1 of 3: a component render ============================
// The test sits beside the file it tests, with .test before .tsx.
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ClaimBadge from "./ClaimBadge";
import { ClaimStatus } from "../types/index";
import type { ApiClaim } from "../types/index";

// One claim shaped like a row from the API. Typed, so a field that does
// not exist in ApiClaim is a compile error here too.
const pending: ApiClaim = {
  id: "665f1c2ab4e8d3a1f0c9e101",
  itemId: 1,
  claimantId: 2,
  submittedAt: "2026-10-17T02:15:00.000Z",
  status: ClaimStatus.Pending,
};

describe("ClaimBadge", () => {
  it("shows the claim id and its status", () => {
    render(<ClaimBadge claim={pending} />);

    expect(
      screen.getByText("Claim ID: 665f1c2ab4e8d3a1f0c9e101"),
    ).toBeInTheDocument();
    expect(screen.getByText("Status: pending")).toBeInTheDocument();
  });

  it("shows a different status when the claim is verified", () => {
    // Everything from pending, with status changed -- the prop that
    // changes the text on the page.
    const verified: ApiClaim = { ...pending, status: ClaimStatus.Verified };

    render(<ClaimBadge claim={verified} />);

    expect(screen.getByText("Status: verified")).toBeInTheDocument();
  });
});