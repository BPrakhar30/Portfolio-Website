"use client";

import Link from "next/link";
import { personalInfo, education, experience, projects, skills } from "@/data/portfolio";
import { Mail, MapPin, ExternalLink, ArrowRight, LayoutTemplate } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function SimplePortfolio() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-[family-name:var(--font-inter)]">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="flex items-center justify-between px-8 py-5">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-gray-900">Portfolio</span>
          <div className="hidden md:flex items-center gap-7 text-sm text-gray-600">
            {["About", "Experience", "Projects", "Skills", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-gray-900 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
          <Link
            href="/creative"
            className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-full hover:border-gray-400 hover:text-gray-900 transition-all duration-200 font-medium"
          >
            <LayoutTemplate size={14} />
            Switch View
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 pt-20 pb-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="flex-1">
            <p className="text-indigo-600 text-sm font-medium tracking-widest uppercase mb-3">
              AI Engineer & ML Specialist
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-5">
              Prakhar<br />Bhardwaj
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-xl mb-8">
              {personalInfo.bio}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                <Mail size={15} />
                Get in Touch
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors"
              >
                <GithubIcon style={{ width: 15, height: 15 }} />
                GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors"
              >
                <LinkedinIcon style={{ width: 15, height: 15 }} />
                LinkedIn
              </a>
            </div>
          </div>
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 min-w-fit">
            {[
              { value: "4.0", label: "CMU GPA" },
              { value: "5+", label: "Years Experience" },
              { value: "10+", label: "Projects" },
              { value: "3", label: "Publications / Demos" },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-xl p-5 text-center border border-gray-100">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8">
        <hr className="border-gray-100" />
      </div>

      {/* About / Education */}
      <section id="about" className="max-w-7xl mx-auto px-8 py-16">
        <SectionHeading number="01" title="Education" />
        <div className="grid md:grid-cols-2 gap-5 mt-8">
          {education.map((edu) => (
            <div key={edu.institution} className="border border-gray-100 rounded-2xl p-6 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.institution}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{edu.period}</p>
                </div>
                <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                  GPA {edu.gpa}
                </span>
              </div>
              <p className="text-sm text-gray-700 font-medium">{edu.degree}</p>
              {edu.focus && (
                <p className="text-xs text-indigo-600 mt-1">Focus: {edu.focus}</p>
              )}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {edu.courses.map((c) => (
                  <span key={c} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="max-w-7xl mx-auto px-8 py-16">
        <SectionHeading number="02" title="Experience" />
        <div className="mt-8 space-y-0">
          {experience.map((exp, i) => (
            <div key={i} className="relative pl-8 pb-10 last:pb-0">
              {/* Timeline line */}
              <div className="absolute left-0 top-2 bottom-0 w-px bg-gray-100" />
              <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-indigo-500" />

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{exp.role}</h3>
                  <p className="text-indigo-600 text-sm font-medium">{exp.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{exp.period}</p>
                  <p className="text-xs text-gray-400">{exp.location}</p>
                </div>
              </div>
              <ul className="space-y-1.5 mb-3">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-indigo-400 mt-1 flex-shrink-0">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {exp.tags.map((tag) => (
                  <span key={tag} className="bg-indigo-50 text-indigo-600 text-xs px-2 py-0.5 rounded font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-7xl mx-auto px-8 py-16">
        <SectionHeading number="03" title="Featured Projects" />
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8 grid-rows-[auto] auto-rows-fr">
          {featuredProjects.map((project) => (
            <Link
              key={project.title}
              href={`/projects/${project.slug}`}
              className="group flex flex-col border border-gray-100 rounded-2xl p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900 text-lg leading-snug group-hover:text-indigo-700 transition-colors">{project.title}</h3>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-indigo-500 transition-colors ml-3 flex-shrink-0 mt-1" />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Other Projects */}
        <div className="mt-8">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">More Projects</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {otherProjects.map((project) => (
              <Link
                key={project.title}
                href={`/projects/${project.slug}`}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-300 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate group-hover:text-indigo-700 transition-colors">{project.title}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs text-gray-400">{tag}</span>
                    ))}
                  </div>
                </div>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-gray-600 transition-colors ml-3 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-7xl mx-auto px-8 py-16">
        <SectionHeading number="04" title="Skills" />
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors"
            >
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">{category}</h4>
              <div className="flex flex-wrap gap-1.5">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-lg font-medium border border-gray-200 hover:border-gray-400 hover:text-gray-900 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-7xl mx-auto px-8 py-16">
        <div className="bg-gray-50 rounded-3xl p-10 text-center">
          <SectionHeading number="05" title="Get In Touch" centered />
          <p className="text-gray-500 mt-4 max-w-md mx-auto">
            Whether it&apos;s a project collaboration, job opportunity, or just a chat about AI, my inbox is open.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              <Mail size={16} />
              {personalInfo.email}
            </a>
          </div>
          <div className="flex justify-center gap-4 mt-5">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors">
              <GithubIcon style={{ width: 20, height: 20 }} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors">
              <LinkedinIcon style={{ width: 20, height: 20 }} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-8 py-8 border-t border-gray-100">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <MapPin size={13} />
          <span>DC Metropolitan Area</span>
        </div>
      </footer>

    </div>
  );
}

function SectionHeading({
  number,
  title,
  centered = false,
}: {
  number: string;
  title: string;
  centered?: boolean;
}) {
  return (
    <div className={`flex items-center gap-4 ${centered ? "justify-center" : ""}`}>
      <span className="text-xs font-bold text-indigo-400 font-[family-name:var(--font-mono)]">{number}</span>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
}
