import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen, Users, Award, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface CoursePageContentProps {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  icon: LucideIcon;
  image: string;
  videoSrc?: string;
  duration: string;
  color: string;
  highlights: { icon: LucideIcon; label: string; value: string }[];
  curriculum: { semester: string; subjects: string[] }[];
  skills: string[];
  careerPaths: string[];
}

export function CoursePageContent({
  title,
  subtitle,
  description,
  keywords,
  icon: Icon,
  image,
  videoSrc,
  duration,
  color,
  highlights,
  curriculum,
  skills,
  careerPaths,
}: CoursePageContentProps) {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={`Curso Técnico em ${title}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
          <Link
            href="/#cursos"
            className="mb-6 inline-flex items-center gap-2 rounded-md bg-card/10 px-3 py-1.5 text-sm font-medium text-card backdrop-blur-sm transition-colors hover:bg-card/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar aos cursos
          </Link>
          <div className="flex items-start gap-4">
            <div
              className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl shadow-lg"
              style={{ backgroundColor: color }}
            >
              <Icon className="h-7 w-7 text-card" />
            </div>
            <div>
              <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-card/70">
                Curso Técnico
              </p>
              <h1 className="font-serif text-3xl font-bold text-card md:text-5xl">
                <span className="text-balance">{title}</span>
              </h1>
              <p className="mt-2 text-lg text-card/80">{subtitle}</p>
            </div>
          </div>

          {/* Keywords */}
          <div className="mt-8 flex flex-wrap gap-3">
            {keywords.map((kw) => (
              <span
                key={kw}
                className="rounded-full border border-card/20 bg-card/10 px-4 py-1.5 text-sm font-medium text-card backdrop-blur-sm"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <h.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{h.label}</p>
                  <p className="text-sm font-bold text-foreground">{h.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left: Description + Video */}
            <div className="lg:col-span-2">
              <h2 className="mb-6 font-serif text-2xl font-bold text-foreground md:text-3xl">
                Sobre o Curso
              </h2>
              <p className="text-justify mb-8 text-base leading-relaxed text-muted-foreground">
                {description}
              </p>

              {/* Video */}
              {videoSrc && (
                <div className="mb-12">
                  <h3 className="mb-4 text-lg font-bold text-foreground">
                    Conheça o Curso
                  </h3>
                  <div className="overflow-hidden rounded-xl border border-border shadow-sm">
                    <video
                      controls
                      className="aspect-video w-full bg-foreground"
                      poster={image}
                      preload="metadata"
                    >
                      <source src={videoSrc} type="video/mp4" />
                      Seu navegador nao suporta a reproducao de videos.
                    </video>
                  </div>
                </div>
              )}

              {/* Curriculum */}
              <div>
                <h3 className="mb-6 font-serif text-2xl font-bold text-foreground">
                  Grade Curricular
                </h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {curriculum.map((sem) => (
                    <div
                      key={sem.semester}
                      className="rounded-xl border border-border bg-card p-5 shadow-sm"
                    >
                      <h4
                        className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
                        style={{ color }}
                      >
                        <BookOpen className="h-4 w-4" />
                        {sem.semester}
                      </h4>
                      <ul className="flex flex-col gap-2" role="list">
                        {sem.subjects.map((subj) => (
                          <li
                            key={subj}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span
                              className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                            {subj}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className="lg:col-span-1">
              {/* Skills Card */}
              <div className="mb-6 rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-foreground">
                  Competencias Desenvolvidas
                </h3>
                <ul className="flex flex-col gap-3" role="list">
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 flex-shrink-0"
                        style={{ color }}
                      />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Career Paths */}
              <div className="mb-6 rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-foreground">
                  Áreas de Atuação
                </h3>
                <ul className="flex flex-col gap-3" role="list">
                  {careerPaths.map((path) => (
                    <li
                      key={path}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <Award
                        className="mt-0.5 h-4 w-4 flex-shrink-0"
                        style={{ color }}
                      />
                      {path}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Card */}
              <div
                className="rounded-xl p-6 text-card shadow-sm"
                style={{ backgroundColor: color }}
              >
                <h3 className="mb-2 text-lg font-bold">Interessado?</h3>
                <p className="mb-4 text-sm leading-relaxed text-card/80">
                  Faca sua inscricao e garanta sua vaga no curso Técnico em {title}.
                </p>
                <a
                  href="/#matricula"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-card py-3 text-sm font-bold text-foreground transition-colors hover:bg-card/90"
                >
                  Cadastre-se Agora
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
