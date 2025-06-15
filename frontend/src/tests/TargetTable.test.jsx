import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import TargetTable from "../App";

const mockTargets = [
  {
    id: 1,
    type: "ship",
    threat_level: "high",
    updated_at: new Date().toISOString()
  }
];

test("renders row with correct background color for high threat", () => {
  render(<TargetTable targets={mockTargets} onSelect={() => {}} />);
  
  const row = screen.getByText("ship").closest("tr");

  expect(row).toHaveStyle("background-color: #f87171");
});
