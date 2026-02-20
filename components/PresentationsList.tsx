import type { Presentation } from "@/types/cv";

const TYPE_BADGE: Record<string, string> = {
  Oral: "bg-blue-50 text-blue-700",
  Poster: "bg-green-50 text-green-700",
};

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export default function PresentationsList({ items }: { items: Presentation[] }) {
  const sorted = [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const grouped = sorted.reduce<Record<string, Presentation[]>>((acc, p) => {
    const key = p.category || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(p);
    return acc;
  }, {});

  const order = ["Conference", "Seminar", "Workshop", "Other"];
  const sortedKeys = Object.keys(grouped).sort(
    (a, b) => order.indexOf(a) - order.indexOf(b)
  );

  return (
    <div className="space-y-6">
      {sortedKeys.map((category) => (
        <div key={category}>
          <p className="text-sm font-semibold text-gray-400 mb-2">{category}</p>
          <ul className="space-y-4">
            {grouped[category].map((p) => (
              <li key={p.id}>
                <div className="flex items-start justify-between gap-4">
                  <p className="font-medium text-gray-900 leading-snug">
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                        {p.title}
                      </a>
                    ) : p.title}
                  </p>
                  <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_BADGE[p.type] ?? "bg-gray-100 text-gray-600"}`}>
                    {p.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-0.5">
                  {p.event}
                  {p.location ? ` · ${p.location}` : ""}
                  {p.date ? ` · ${formatDate(p.date)}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
