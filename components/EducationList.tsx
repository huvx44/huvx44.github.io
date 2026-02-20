import type { Education } from "@/types/cv";

export default function EducationList({ items }: { items: Education[] }) {
  return (
    <ul className="space-y-5">
      {items.map((item) => (
        <li key={item.id}>
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="font-medium text-gray-900">{item.degree} in {item.field}</p>
              <p className="text-gray-600">{item.institution}</p>
            </div>
            <p className="text-sm text-gray-500">{item.year}</p>
          </div>
          {item.description && (
            <p className="mt-1 text-sm text-gray-600">{item.description}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
