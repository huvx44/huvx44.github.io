import type { Education } from "@/types/cv";
import LatexText from "@/components/LatexText";

export default function EducationList({ items }: { items: Education[] }) {
  const sorted = [...items].sort((a, b) => b.year - a.year);
  return (
    <ul className="space-y-5">
      {sorted.map((item) => (
        <li key={item.id}>
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="font-medium text-gray-100">
                <LatexText text={`${item.degree} in ${item.field}`} />
              </p>
              <p className="text-gray-400"><LatexText text={item.institution} /></p>
            </div>
            <p className="text-sm text-gray-500">{item.year}</p>
          </div>
          {item.description && (
            <p className="mt-1 text-sm text-gray-400"><LatexText text={item.description} /></p>
          )}
        </li>
      ))}
    </ul>
  );
}
