import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  PartialPageObjectResponse,
  DatabaseObjectResponse,
  PartialDatabaseObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { CVData, WorkExperience, Education, Skill, Project, Publication, Presentation } from "@/types/cv";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

type NotionPage = PageObjectResponse | PartialPageObjectResponse | DatabaseObjectResponse | PartialDatabaseObjectResponse;

function getText(page: NotionPage, property: string): string {
  const p = (page as PageObjectResponse).properties?.[property];
  if (!p) return "";
  if (p.type === "title") return p.title.map((t) => t.plain_text).join("");
  if (p.type === "rich_text") return p.rich_text.map((t) => t.plain_text).join("");
  if (p.type === "email") return p.email ?? "";
  if (p.type === "url") return p.url ?? "";
  if (p.type === "number") return String(p.number ?? "");
  if (p.type === "select") return p.select?.name ?? "";
  if (p.type === "checkbox") return String(p.checkbox);
  if (p.type === "date") return p.date?.start ?? "";
  return "";
}

function getMultiSelect(page: NotionPage, property: string): string[] {
  const p = (page as PageObjectResponse).properties?.[property];
  if (!p || p.type !== "multi_select") return [];
  return p.multi_select.map((s) => s.name);
}

function getDate(page: NotionPage, property: string): string {
  const p = (page as PageObjectResponse).properties?.[property];
  if (!p || p.type !== "date") return "";
  return p.date?.start ?? "";
}

function getCheckbox(page: NotionPage, property: string): boolean {
  const p = (page as PageObjectResponse).properties?.[property];
  if (!p || p.type !== "checkbox") return false;
  return p.checkbox;
}

async function queryDatabase(databaseId: string): Promise<NotionPage[]> {
  const response = await notion.databases.query({ database_id: databaseId });
  return response.results;
}

export async function getCVData(): Promise<CVData> {
  const [experiencePages, educationPages, skillsPages, projectsPages, publicationPages, presentationPages] =
    await Promise.all([
      queryDatabase(process.env.NOTION_DB_EXPERIENCE!),
      queryDatabase(process.env.NOTION_DB_EDUCATION!),
      queryDatabase(process.env.NOTION_DB_SKILLS!),
      queryDatabase(process.env.NOTION_DB_PROJECTS!),
      queryDatabase(process.env.NOTION_DB_PUBLICATIONS!),
      queryDatabase(process.env.NOTION_DB_PRESENTATIONS!),
    ]);

  const experience: WorkExperience[] = experiencePages.map((page) => ({
    id: (page as PageObjectResponse).id,
    role: getText(page, "Role"),
    organization: getText(page, "Organization"),
    startDate: getDate(page, "Start Date"),
    endDate: getDate(page, "End Date") || undefined,
    current: getCheckbox(page, "Current"),
    description: getText(page, "Description") || undefined,
  }));

  const education: Education[] = educationPages.map((page) => ({
    id: (page as PageObjectResponse).id,
    degree: getText(page, "Degree"),
    field: getText(page, "Field"),
    institution: getText(page, "Institution"),
    year: Number(getText(page, "Year")),
    description: getText(page, "Description") || undefined,
  }));

  const skills: Skill[] = skillsPages.map((page) => ({
    id: (page as PageObjectResponse).id,
    name: getText(page, "Name"),
    category: getText(page, "Category"),
  }));

  const projects: Project[] = projectsPages.map((page) => ({
    id: (page as PageObjectResponse).id,
    name: getText(page, "Name"),
    description: getText(page, "Description") || undefined,
    url: getText(page, "URL") || undefined,
    tags: getMultiSelect(page, "Tags"),
    startYear: Number(getText(page, "Start Year")) || undefined,
    endYear: Number(getText(page, "End Year")) || undefined,
    current: getCheckbox(page, "Current"),
  }));

  const publications: Publication[] = publicationPages.map((page) => ({
    id: (page as PageObjectResponse).id,
    title: getText(page, "Title"),
    authors: getText(page, "Authors"),
    venue: getText(page, "Venue"),
    year: Number(getText(page, "Year")),
    doi: getText(page, "DOI") || undefined,
    type: getText(page, "Type"),
    status: getText(page, "Status"),
  }));

  const presentations: Presentation[] = presentationPages.map((page) => ({
    id: (page as PageObjectResponse).id,
    title: getText(page, "Title"),
    event: getText(page, "Event"),
    location: getText(page, "Location") || undefined,
    date: getDate(page, "Date"),
    type: getText(page, "Type"),
    category: getText(page, "Category"),
    url: getText(page, "URL") || undefined,
  }));

  return {
    personal: {
      name: process.env.CV_NAME ?? "Soohyung Lee",
      title: process.env.CV_TITLE ?? "Ph.D., Research Fellow",
      institution: process.env.CV_INSTITUTION ?? "Center for Accelerator Research, Korea University",
      email: process.env.CV_EMAIL ?? "",
      github: process.env.CV_GITHUB,
      linkedin: process.env.CV_LINKEDIN,
      bio: process.env.CV_BIO,
    },
    experience,
    education,
    skills,
    projects,
    publications,
    presentations,
  };
}
