import type { Project } from "@/types/cv";
import LatexText from "@/components/LatexText";

function formatPeriod(project: Project): string {
  if (!project.startYear) return "";
  const end = project.current ? "Present" : project.endYear ? String(project.endYear) : "";
  return end ? `${project.startYear} – ${end}` : String(project.startYear);
}

export default function ProjectsList({ items }: { items: Project[] }) {
  const sorted = [...items].sort((a, b) => {
    if (a.current !== b.current) return a.current ? -1 : 1;
    return (b.startYear ?? 0) - (a.startYear ?? 0);
  });

  return (
    <ul className="space-y-5">
      {sorted.map((item) => (
        <li key={item.id}>
          <div className="flex items-start justify-between gap-4">
            <p className="font-medium text-gray-100"><LatexText text={item.name} /></p>
            {formatPeriod(item) && (
              <span className="text-sm text-gray-500 shrink-0">{formatPeriod(item)}</span>
            )}
          </div>
          {item.experiment && (
            <p className="mt-0.5 text-xs text-gray-500">Experiment: <LatexText text={item.experiment} /></p>
          )}
        </li>
      ))}
    </ul>
  );
}
