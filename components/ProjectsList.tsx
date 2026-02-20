import type { Project } from "@/types/cv";

export default function ProjectsList({ items }: { items: Project[] }) {
  return (
    <ul className="space-y-5">
      {items.map((item) => (
        <li key={item.id}>
          <div className="flex items-start justify-between gap-4">
            <p className="font-medium text-gray-900">
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                  {item.name}
                </a>
              ) : (
                item.name
              )}
            </p>
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 shrink-0">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          {item.description && (
            <p className="mt-1 text-sm text-gray-600">{item.description}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
