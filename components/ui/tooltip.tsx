"use client";

import { useState } from "react";

export function Tooltip({
  children,
  tip,
}: {
  children: React.ReactNode;
  tip: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <span className="relative inline-flex items-center">
      <span
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        tabIndex={0}
        className="cursor-help outline-none"
      >
        {children}
      </span>

      {visible && (
        <div
          role="tooltip"
          className="absolute z-50 left-full ml-3 max-w-xs rounded-md border border-border bg-card p-3 text-sm text-foreground shadow-lg"
        >
          {tip}
        </div>
      )}
    </span>
  );
}
export { Tooltip }
