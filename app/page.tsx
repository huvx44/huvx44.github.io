import { getCVData } from "@/lib/notion";
import CVHeader from "@/components/CVHeader";
import Section from "@/components/Section";
import ExperienceList from "@/components/ExperienceList";
import EducationList from "@/components/EducationList";
import SkillsList from "@/components/SkillsList";
import ProjectsList from "@/components/ProjectsList";
import PublicationsList from "@/components/PublicationsList";
import PresentationsList from "@/components/PresentationsList";

export const revalidate = false;

export default async function Home() {
  const cv = await getCVData();

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <CVHeader personal={cv.personal} />

      {cv.experience.length > 0 && (
        <Section title="Work Experience">
          <ExperienceList items={cv.experience} />
        </Section>
      )}

      {cv.education.length > 0 && (
        <Section title="Education">
          <EducationList items={cv.education} />
        </Section>
      )}

      {cv.skills.length > 0 && (
        <Section title="Skills">
          <SkillsList items={cv.skills} />
        </Section>
      )}

      {cv.publications.length > 0 && (
        <Section title="Publications">
          <PublicationsList items={cv.publications} />
        </Section>
      )}

      {cv.presentations.length > 0 && (
        <Section title="Presentations">
          <PresentationsList items={cv.presentations} />
        </Section>
      )}

      {cv.projects.length > 0 && (
        <Section title="Projects">
          <ProjectsList items={cv.projects} />
        </Section>
      )}
    </main>
  );
}
