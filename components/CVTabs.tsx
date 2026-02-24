"use client";

import { useState } from "react";
import Section from "@/components/Section";
import ExperienceList from "@/components/ExperienceList";
import EducationList from "@/components/EducationList";
import SkillsList from "@/components/SkillsList";
import ProjectsList from "@/components/ProjectsList";
import PublicationsList from "@/components/PublicationsList";
import PresentationsList from "@/components/PresentationsList";
import type { CVData } from "@/types/cv";

const TAB_KEYS = ["education", "experience", "projects", "publications", "presentations", "skills"] as const;
type TabKey = typeof TAB_KEYS[number];

const TAB_LABELS: Record<TabKey, string> = {
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  publications: "Publications",
  presentations: "Presentations",
  projects: "Projects",
};

export default function CVTabs({ cv }: { cv: CVData }) {
  const visibleTabs = TAB_KEYS.filter((key) => cv[key].length > 0);
  const [active, setActive] = useState<TabKey>(visibleTabs[0]);

  return (
    <div>
      <div className="flex flex-wrap gap-1 border-b border-gray-700 mb-6">
        {visibleTabs.map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`px-4 py-2 text-sm font-medium transition-colors rounded-t
              ${active === key
                ? "text-white border-b-2 border-blue-400 -mb-px"
                : "text-gray-400 hover:text-gray-200"
              }`}
          >
            {TAB_LABELS[key]}
          </button>
        ))}
      </div>

      {active === "experience" && (
        <Section title="Experience">
          <ExperienceList items={cv.experience} />
        </Section>
      )}
      {active === "education" && (
        <Section title="Education">
          <EducationList items={cv.education} />
        </Section>
      )}
      {active === "skills" && (
        <Section title="Skills">
          <SkillsList items={cv.skills} />
        </Section>
      )}
      {active === "publications" && (
        <Section title="Publications">
          <PublicationsList items={cv.publications} />
        </Section>
      )}
      {active === "presentations" && (
        <Section title="Presentations">
          <PresentationsList items={cv.presentations} />
        </Section>
      )}
      {active === "projects" && (
        <Section title="Projects">
          <ProjectsList items={cv.projects} />
        </Section>
      )}
    </div>
  );
}
