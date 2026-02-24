import type { Skill } from "@/types/cv";
import LatexText from "@/components/LatexText";

export default function SkillsList({ items }: { items: Skill[] }) {
  const grouped = items.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <div className="space-y-3">
      {Object.entries(grouped).map(([category, skills]) => (
        <div key={category}>
          <p className="text-sm font-medium text-gray-500 mb-1">{category}</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="px-2.5 py-0.5 bg-gray-800 text-gray-300 text-sm rounded-full">
                <LatexText text={skill.name} />
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
