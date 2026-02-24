import type { Publication } from "@/types/cv";
import LatexText from "@/components/LatexText";

const STATUS_BADGE: Record<string, string> = {
  "In Press": "bg-yellow-900 text-yellow-300",
  "Submitted": "bg-gray-700 text-gray-400",
};

export default function PublicationsList({ items }: { items: Publication[] }) {
  const sorted = [...items].sort((a, b) => b.year - a.year);

  const grouped = sorted.reduce<Record<string, Publication[]>>((acc, pub) => {
    const key = String(pub.year);
    if (!acc[key]) acc[key] = [];
    acc[key].push(pub);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([year, pubs]) => (
        <div key={year}>
          <p className="text-sm font-semibold text-gray-500 mb-2">{year}</p>
          <ul className="space-y-4">
            {pubs.map((pub) => (
              <li key={pub.id}>
                <p className="text-gray-100 font-medium leading-snug">
                  {pub.doi ? (
                    <a href={pub.doi} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                      <LatexText text={pub.title} />
                    </a>
                  ) : <LatexText text={pub.title} />}
                  {pub.status !== "Published" && (
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-normal ${STATUS_BADGE[pub.status] ?? "bg-gray-700 text-gray-400"}`}>
                      {pub.status}
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-400 mt-0.5"><LatexText text={pub.authors} /></p>
                <p className="text-sm text-gray-500 italic">
                  <LatexText text={[
                    pub.journal,
                    pub.volume ? `vol. ${pub.volume}` : "",
                    pub.page ? `pp. ${pub.page}` : "",
                    pub.type,
                  ].filter(Boolean).join(" · ")} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
