"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { personalInfo, education, experience, projects, skills } from "@/data/portfolio";
import { Mail, ExternalLink, ChevronDown, Zap, LayoutList } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

/* ─── Animated particles background ─────────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      radius: number; alpha: number; color: string;
    }> = [];

    const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#06b6d4"];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = "#6366f1";
            ctx.globalAlpha = (1 - dist / 120) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        ctx.globalAlpha = 1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-60"
    />
  );
}

/* ─── Typing animation ───────────────────────────────────────────────────── */
function TypeWriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const current = words[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      setText(current.slice(0, charIdx));
      timeout = setTimeout(() => setCharIdx((c) => c + 1), 80);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx >= 0) {
      setText(current.slice(0, charIdx));
      timeout = setTimeout(() => setCharIdx((c) => c - 1), 40);
    } else {
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, words]);

  return (
    <span>
      {text}
      <span className="animate-pulse text-indigo-400">|</span>
    </span>
  );
}

/* ─── Fade-in section wrapper ────────────────────────────────────────────── */
function FadeInSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Skill bar ──────────────────────────────────────────────────────────── */
function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-300 font-medium">{name}</span>
        <span className="text-indigo-400">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function CreativePortfolio() {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  const navItems = ["Hero", "About", "Experience", "Projects", "Skills", "Contact"];

  // Track active section on scroll via IntersectionObserver
  useEffect(() => {
    const sectionIds = navItems.map((n) => n.toLowerCase());
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080812] text-white overflow-x-hidden">
      <ParticleField />

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs font-bold tracking-[0.25em] uppercase text-indigo-400"
        >
          Portfolio
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-2 py-1.5"
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setActiveSection(item.toLowerCase())}
              className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                activeSection === item.toLowerCase()
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item}
            </a>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            href="/"
            className="flex items-center gap-2 border border-white/20 text-gray-300 text-sm px-4 py-2 rounded-full hover:border-white/40 hover:text-white transition-all duration-200"
          >
            <LayoutList size={14} />
            Switch View
          </Link>
        </motion.div>
      </nav>

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-28"
      >
        {/* Glow orb */}
        <motion.div
          style={{
            y: bgY,
            background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)",
          }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-indigo-400 text-sm font-medium tracking-[0.3em] uppercase mb-4"
          >
            Welcome to my universe
          </motion.p>

          <h1 className="text-6xl md:text-8xl font-black mb-4 leading-none">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="block"
            >
              Prakhar
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="block gradient-text"
            >
              Bhardwaj
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-2xl text-gray-400 mb-8 h-8 font-light"
          >
            <TypeWriter
              words={[
                "AI Engineer",
                "LLM Specialist",
                "Computer Vision Expert",
                "ML Systems Builder",
                "CMU Graduate",
              ]}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-gray-500 max-w-xl mx-auto leading-relaxed mb-10"
          >
            Teaching machines to see, learn, and do it better next time.
            From CMU research labs to production AI systems at BNY Mellon and beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="#projects"
              className="group relative flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Zap size={16} />
                View Projects
              </span>
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/20 text-gray-300 hover:text-white hover:border-white/40 px-6 py-3 rounded-full font-medium transition-all duration-300"
            >
              <GithubIcon style={{ width: 16, height: 16 }} />
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/20 text-gray-300 hover:text-white hover:border-white/40 px-6 py-3 rounded-full font-medium transition-all duration-300"
            >
              <LinkedinIcon style={{ width: 16, height: 16 }} />
              LinkedIn
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <FadeInSection>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <GlowLabel>About Me</GlowLabel>
              <h2 className="text-4xl font-bold mt-4 mb-6">
                Building AI that <span className="gradient-text">matters</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                I&apos;m a Mechanical Engineering MS graduate from{" "}
                <span className="text-white font-medium">Carnegie Mellon University</span> (GPA 4.0/4.0)
                with a deep focus on Machine Learning and Computer Vision. My journey spans from
                academic research to building production systems at companies like BNY Mellon and
                Enterprise Solutions.
              </p>
              <p className="text-gray-400 leading-relaxed">
                I specialize in <span className="text-indigo-400">Large Language Models</span>,{" "}
                <span className="text-purple-400">RAG architectures</span>, and{" "}
                <span className="text-pink-400">computer vision pipelines</span>, turning
                cutting-edge research into scalable, production-ready solutions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {education.map((edu) => (
                <motion.div
                  key={edu.institution}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="col-span-2 md:col-span-1 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <div className="text-3xl font-black gradient-text mb-2">{edu.gpa.split(" ")[0]}</div>
                  <div className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-1">GPA</div>
                  <div className="text-sm text-white font-medium">{edu.institution.replace("Carnegie Mellon University", "CMU")}</div>
                  <div className="text-xs text-gray-500 mt-1">{edu.degree.replace("Master of Science in ", "MS ").replace("Bachelor of Engineering in ", "BE ")}</div>
                  <div className="text-xs text-gray-600 mt-1">{edu.period}</div>
                </motion.div>
              ))}
              {[
                { value: "5+", label: "Years in AI/ML" },
                { value: "10+", label: "Projects Shipped" },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center"
                >
                  <div className="text-3xl font-black gradient-text mb-1">{s.value}</div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <FadeInSection>
          <GlowLabel>Career</GlowLabel>
          <h2 className="text-4xl font-bold mt-4 mb-14">
            Where I&apos;ve <span className="gradient-text">worked</span>
          </h2>
        </FadeInSection>

        <div className="space-y-4">
          {experience.map((exp, i) => (
            <FadeInSection key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ x: 6 }}
                className="group relative border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:border-indigo-500/50 hover:bg-white/8 transition-all duration-300"
              >
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-indigo-400 text-sm font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full">{exp.period}</span>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-gray-400 flex gap-2.5">
                      <span className="text-indigo-500 mt-0.5 flex-shrink-0">▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-indigo-500/15 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <FadeInSection>
          <GlowLabel>Work</GlowLabel>
          <h2 className="text-4xl font-bold mt-4 mb-14">
            Things I&apos;ve <span className="gradient-text">built</span>
          </h2>
        </FadeInSection>

        {/* Featured projects */}
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          {featuredProjects.map((project, i) => (
            <FadeInSection key={project.title} delay={i * 0.1} className="h-full">
              <Link href={`/creative/projects/${project.slug}`}>
                <motion.div
                  whileHover={{ y: -6 }}
                  onHoverStart={() => setHoveredProject(project.title)}
                  onHoverEnd={() => setHoveredProject(null)}
                  className="group relative flex flex-col h-full border border-white/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-sm rounded-2xl p-6 overflow-hidden cursor-pointer"
                >
                  {/* Hover glow */}
                  <AnimatePresence>
                    {hoveredProject === project.title && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 pointer-events-none"
                      />
                    )}
                  </AnimatePresence>

                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug pr-4">
                      {project.title}
                    </h3>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-indigo-400 transition-colors flex-shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-white/8 text-gray-300 px-2.5 py-1 rounded-full border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Link>
            </FadeInSection>
          ))}
        </div>

        {/* Other projects grid */}
        <FadeInSection delay={0.3}>
          <h4 className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4">More Projects</h4>
          <div className="grid md:grid-cols-3 gap-3">
            {otherProjects.map((project) => (
              <Link key={project.title} href={`/creative/projects/${project.slug}`}>
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-4 rounded-xl border border-white/8 bg-white/3 hover:border-indigo-500/40 hover:bg-white/6 transition-all duration-300 group"
              >
                <p className="text-sm font-semibold text-white group-hover:text-indigo-300 mb-2">{project.title}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs text-gray-500">{tag}</span>
                  ))}
                </div>
              </motion.div>
              </Link>
            ))}
          </div>
        </FadeInSection>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <FadeInSection>
          <GlowLabel>Expertise</GlowLabel>
          <h2 className="text-4xl font-bold mt-4 mb-14">
            My <span className="gradient-text">toolkit</span>
          </h2>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(skills).map(([category, items], i) => (
            <FadeInSection key={category} delay={i * 0.05}>
              <div className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl p-4 h-full">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="text-xs bg-gradient-to-r from-indigo-500/15 to-purple-500/15 text-gray-300 px-2.5 py-1.5 rounded-lg border border-white/10 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <FadeInSection>
          <div className="relative border border-white/10 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 backdrop-blur-sm rounded-3xl p-12 text-center overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 pointer-events-none" />
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            <GlowLabel centered>Let&apos;s Connect</GlowLabel>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-4">
              Got a project in <span className="gradient-text">mind?</span>
            </h2>
            <p className="text-gray-400 max-w-md mx-auto mb-10">
              Whether it&apos;s building the next AI system, a collaboration, or just talking shop about LLMs, let&apos;s connect.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3.5 rounded-full font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow"
              >
                <Mail size={18} />
                {personalInfo.email}
              </motion.a>
            </div>

            <div className="flex justify-center gap-5">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/30 transition-all"
              >
                <GithubIcon style={{ width: 22, height: 22 }} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/30 transition-all"
              >
                <LinkedinIcon style={{ width: 22, height: 22 }} />
              </motion.a>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 px-6 py-8 text-center">
        <p className="text-gray-600 text-sm flex items-center justify-center gap-1.5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 inline-block"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          DC Metropolitan Area
        </p>
      </footer>

    </div>
  );
}

function GlowLabel({ children, centered = false }: { children: React.ReactNode; centered?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,1)]" />
      <span className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em]">{children}</span>
    </div>
  );
}
