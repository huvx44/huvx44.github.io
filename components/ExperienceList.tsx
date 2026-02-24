import type { WorkExperience } from "@/types/cv";
import LatexText from "@/components/LatexText";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export default function ExperienceList({ items }: { items: WorkExperience[] }) {
  const sorted = [...items].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  return (
    <ul className="space-y-5">
      {sorted.map((item) => (
        <li key={item.id}>
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="font-medium text-gray-100"><LatexText text={item.role} /></p>
              <p className="text-gray-400"><LatexText text={item.organization} /></p>
            </div>
            <p className="text-sm text-gray-500 whitespace-nowrap">
              {formatDate(item.startDate)} – {item.current ? "Present" : formatDate(item.endDate ?? "")}
            </p>
          </div>
          {item.description && (
            <p className="mt-1 text-sm text-gray-400"><LatexText text={item.description} /></p>
          )}
        </li>
      ))}
    </ul>
  );
}
