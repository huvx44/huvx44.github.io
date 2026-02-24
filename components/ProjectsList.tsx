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
    <ul className="space-y-6">
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

          {item.publications.length > 0 && (
            <div className="mt-2">
              <p className="text-xs font-medium text-gray-500 mb-1">Publications</p>
              <ul className="space-y-1">
                {item.publications.map((pub) => (
                  <li key={pub.id} className="text-sm text-gray-400 flex items-start gap-1.5">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-600 shrink-0" />
                    {pub.doi ? (
                      <a href={pub.doi} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                        <LatexText text={pub.title} />
                      </a>
                    ) : (
                      <LatexText text={pub.title} />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {item.presentations.length > 0 && (
            <div className="mt-2">
              <p className="text-xs font-medium text-gray-500 mb-1">Presentations</p>
              <ul className="space-y-1">
                {item.presentations.map((pres) => (
                  <li key={pres.id} className="text-sm text-gray-400 flex items-start gap-1.5">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-600 shrink-0" />
                    <span>
                      {pres.url ? (
                        <a href={pres.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                          <LatexText text={pres.title} />
                        </a>
                      ) : (
                        <LatexText text={pres.title} />
                      )}
                      <span className="text-gray-600"> · {pres.event}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
