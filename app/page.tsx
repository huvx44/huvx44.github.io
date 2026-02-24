import { getCVData } from "@/lib/notion";
import CVHeader from "@/components/CVHeader";
import CVTabs from "@/components/CVTabs";

export const revalidate = false;

export default async function Home() {
  const cv = await getCVData();

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <CVHeader personal={cv.personal} />
      <CVTabs cv={cv} />
    </main>
  );
}
