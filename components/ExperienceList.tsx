import type { WorkExperience } from "@/types/cv";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export default function ExperienceList({ items }: { items: WorkExperience[] }) {
  return (
    <ul className="space-y-5">
      {items.map((item) => (
        <li key={item.id}>
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="font-medium text-gray-900">{item.role}</p>
              <p className="text-gray-600">{item.organization}</p>
            </div>
            <p className="text-sm text-gray-500 whitespace-nowrap">
              {formatDate(item.startDate)} – {item.current ? "Present" : formatDate(item.endDate ?? "")}
            </p>
          </div>
          {item.description && (
            <p className="mt-1 text-sm text-gray-600">{item.description}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
