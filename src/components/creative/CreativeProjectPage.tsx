"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useInView } from "framer-motion";
import { ProjectDetail } from "@/data/projectsContent";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { MediaCarousel } from "@/components/MediaCarousel";

/* ─── Particle canvas (same as creative portfolio) ─────────────────────── */
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

    const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#06b6d4"];
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.15,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

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
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = "#6366f1";
            ctx.globalAlpha = (1 - dist / 110) * 0.12;
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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-50" />;
}

/* ─── Fade-in wrapper ──────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Glow label ───────────────────────────────────────────────────────── */
function GlowLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,1)]" />
      <span className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em]">{children}</span>
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────────────── */
export default function CreativeProjectPage({ project }: { project: ProjectDetail }) {
  const { scrollYProgress } = useScroll();
  const hasMedia = project.media.length > 0;

  return (
    <div className="relative min-h-screen bg-[#080812] text-white overflow-x-hidden font-[family-name:var(--font-inter)]">
      <ParticleField />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            href="/creative"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold tracking-[0.25em] uppercase text-indigo-400"
        >
          Portfolio
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/20 text-gray-300 text-sm px-4 py-2 rounded-full hover:border-white/40 hover:text-white transition-all"
            >
              <GithubIcon style={{ width: 14, height: 14 }} />
              GitHub
            </a>
          ) : (
            <div className="w-24" />
          )}
        </motion.div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[50vh] flex flex-col justify-end px-8 pt-32 pb-16 max-w-6xl mx-auto">
        {/* Ambient glow */}
        <div
          className="absolute top-16 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none blur-3xl opacity-20"
          style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.6) 0%, transparent 70%)" }}
        />

        <FadeIn delay={0.1}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-6">
            <Link href="/creative" className="hover:text-gray-400 transition-colors">Portfolio</Link>
            <ChevronRight size={12} />
            <Link href="/creative#projects" className="hover:text-gray-400 transition-colors">Projects</Link>
            <ChevronRight size={12} />
            <span className="text-gray-500">{project.title}</span>
          </div>

          {project.subtitle && (
            <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
              {project.subtitle}
            </p>
          )}
          <h1 className="text-5xl md:text-6xl font-black leading-none mb-6">
            <span className="gradient-text">{project.title.split(" ").slice(0, 2).join(" ")}</span>
            {project.title.split(" ").length > 2 && (
              <span className="block text-white">{project.title.split(" ").slice(2).join(" ")}</span>
            )}
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mb-8">
            {project.tagline}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-indigo-500/15 text-indigo-300 px-3 py-1.5 rounded-full border border-indigo-500/25"
              >
                {tag}
              </span>
            ))}
          </div>
        </FadeIn>
      </section>

      <div className="max-w-6xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-8 py-16">
        {/* Sections */}
        <div className="space-y-12">
          {project.sections.map((section, i) => (
            <FadeIn key={section.heading} delay={i * 0.06}>
              <div className="border border-white/8 bg-white/3 backdrop-blur-sm rounded-2xl p-6">
                <GlowLabel>{section.heading}</GlowLabel>

                {Array.isArray(section.body) ? (
                  <ul className="space-y-3 mt-2">
                    {section.body.map((item, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.04 }}
                        className="flex gap-3 text-gray-300 text-sm leading-relaxed"
                      >
                        <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
                          <span className="w-1 h-1 rounded-full bg-indigo-400" />
                        </span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-300 leading-relaxed text-sm mt-2">{section.body}</p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Media at bottom */}
        {hasMedia && (
          <FadeIn delay={0.2} className="mt-16">
            <GlowLabel>Media</GlowLabel>
            <MediaCarousel media={project.media} theme="dark" />
          </FadeIn>
        )}
      </main>

      {/* Footer nav */}
      <footer className="relative z-10 max-w-6xl mx-auto px-8 py-10 border-t border-white/8">
        <div className="flex items-center justify-between">
          <Link
            href="/creative"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Portfolio
          </Link>
          <Link
            href="/creative#projects"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            All Projects
          </Link>
        </div>
      </footer>
    </div>
  );
}
