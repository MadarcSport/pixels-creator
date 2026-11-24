import { useId, useState, type ReactNode } from "react";

interface ProjectSummaryProps {
  children: ReactNode;
  collapsible?: boolean;
}

export function ProjectSummary({
  children,
  collapsible = false,
}: ProjectSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const summaryId = useId();

  return (
    <>
      <p
        id={summaryId}
        className={`project-summary${collapsible && !isExpanded ? " project-summary-collapsed" : ""}`}
      >
        {children}
      </p>
      {collapsible && (
        <button
          className="project-summary-toggle"
          type="button"
          aria-expanded={isExpanded}
          aria-controls={summaryId}
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
    </>
  );
}
