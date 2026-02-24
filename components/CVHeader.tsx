import type { PersonalInfo } from "@/types/cv";
import LatexText from "@/components/LatexText";

export default function CVHeader({ personal }: { personal: PersonalInfo }) {
  return (
    <header className="border-b border-gray-700 pb-6 mb-8">
      <h1 className="text-3xl font-bold text-white"><LatexText text={personal.name} /></h1>
      <p className="text-lg text-gray-300 mt-1"><LatexText text={personal.title} /></p>
      <p className="text-gray-400 mt-0.5"><LatexText text={personal.institution} /></p>
      {personal.bio && (
        <p className="mt-3 text-gray-300 max-w-2xl"><LatexText text={personal.bio} /></p>
      )}
      <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
        {personal.email && (
          <a href={`mailto:${personal.email}`} className="hover:text-blue-400 transition-colors">
            {personal.email}
          </a>
        )}
        {personal.github && (
          <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
            GitHub
          </a>
        )}
        {personal.linkedin && (
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
            LinkedIn
          </a>
        )}
      </div>
    </header>
  );
}
