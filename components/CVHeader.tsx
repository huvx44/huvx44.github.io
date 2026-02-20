import type { PersonalInfo } from "@/types/cv";

export default function CVHeader({ personal }: { personal: PersonalInfo }) {
  return (
    <header className="border-b border-gray-200 pb-6 mb-8">
      <h1 className="text-3xl font-bold text-gray-900">{personal.name}</h1>
      <p className="text-lg text-gray-600 mt-1">{personal.title}</p>
      <p className="text-gray-500 mt-0.5">{personal.institution}</p>
      {personal.bio && (
        <p className="mt-3 text-gray-700 max-w-2xl">{personal.bio}</p>
      )}
      <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
        {personal.email && (
          <a href={`mailto:${personal.email}`} className="hover:text-blue-600 transition-colors">
            {personal.email}
          </a>
        )}
        {personal.github && (
          <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
            GitHub
          </a>
        )}
        {personal.linkedin && (
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
            LinkedIn
          </a>
        )}
      </div>
    </header>
  );
}
