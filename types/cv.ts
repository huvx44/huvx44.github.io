export interface PersonalInfo {
  name: string;
  title: string;
  institution: string;
  email: string;
  github?: string;
  linkedin?: string;
  bio?: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  year: number;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  url?: string;
  tags: string[];
  startYear?: number;
  endYear?: number;
  current: boolean;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  doi?: string;
  type: string;
  status: string;
}

export interface Presentation {
  id: string;
  title: string;
  event: string;
  location?: string;
  date: string;
  type: string;   // Oral | Poster
  category: string; // Conference | Seminar | Workshop
  url?: string;
}

export interface CVData {
  personal: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  publications: Publication[];
  presentations: Presentation[];
}
