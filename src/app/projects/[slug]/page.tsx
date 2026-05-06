import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, projectDetails } from "@/data/projectsContent";
import { ArrowLeft, ExternalLink, Check } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { MediaCarousel } from "@/components/MediaCarousel";

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

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const hasMedia = project.media.length > 0;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-[family-name:var(--font-inter)]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="flex items-center justify-between px-8 py-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Portfolio
          </Link>
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-gray-900">Portfolio</span>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-full hover:border-gray-400 hover:text-gray-900 transition-all"
            >
              <GithubIcon style={{ width: 14, height: 14 }} />
              View on GitHub
            </a>
          )}
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-4xl mx-auto px-8 pt-16 pb-10">
        {project.subtitle && (
          <p className="text-indigo-600 text-sm font-medium tracking-widest uppercase mb-3">
            {project.subtitle}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-5">
          {project.title}
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-2xl">
          {project.tagline}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              <GithubIcon style={{ width: 15, height: 15 }} />
              GitHub Repository
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-8">
        <hr className="border-gray-100" />
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-8 py-12">
        {/* Sections */}
        <div className="space-y-10">
          {project.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                {section.heading}
              </h2>
              {Array.isArray(section.body) ? (
                <ul className="space-y-2.5">
                  {section.body.map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-700 text-sm leading-relaxed">
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                        <Check size={11} className="text-gray-500" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 leading-relaxed text-sm">{section.body}</p>
              )}
            </section>
          ))}
        </div>

        {/* Media at bottom */}
        {hasMedia && (
          <div className="mt-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
              Media
            </h2>
            <MediaCarousel media={project.media} theme="light" />
          </div>
        )}
      </main>

      {/* Footer nav */}
      <footer className="max-w-4xl mx-auto px-8 py-10 border-t border-gray-100 mt-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Portfolio
          </Link>
          <Link
            href="/#projects"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            All Projects
          </Link>
        </div>
      </footer>
    </div>
  );
}
