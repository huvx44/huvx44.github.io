import type { Project } from "@/types/cv";

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
            <p className="font-medium text-gray-100">
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                  {item.name}
                </a>
              ) : (
                item.name
              )}
            </p>
            <div className="flex items-center gap-2 shrink-0">
              {formatPeriod(item) && (
                <span className="text-sm text-gray-500">{formatPeriod(item)}</span>
              )}
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-blue-900 text-blue-300 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          {item.description && (
            <p className="mt-1 text-sm text-gray-400">{item.description}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
