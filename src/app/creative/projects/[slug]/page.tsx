import { notFound } from "next/navigation";
import CreativeProjectPage from "@/components/creative/CreativeProjectPage";
import { getProjectBySlug, projectDetails } from "@/data/projectsContent";

export async function generateStaticParams() {
  return projectDetails.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Prakhar Bhardwaj`,
    description: project.tagline,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <CreativeProjectPage project={project} />;
}
