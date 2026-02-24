import Image from "next/image";
import Link from "next/link";
import { Truck, Monitor, Briefcase, Sprout, Clock, ArrowRight } from "lucide-react";

const courses = [
  {
    title: "Logística",
    href: "/cursos/logistica",
    description:
      "Forme-se para atuar na gestão de cadeias de suprimentos, transporte, armazenagem e distribuição. O curso prepara profissionais aptos a otimizar processos logísticos em empresas de todos os portes.",
    icon: Truck,
    image: "/images/curso-logistica.jpg",
    duration: "3 anos",
    areas: ["Planejamento", "Transporte", "Logística"],
  },
  {
    title: "Informática para Internet",
    href: "/cursos/informatica",
    description:
      "Desenvolva habilidades em programação web, design de interfaces e bancos de dados. O curso forma profissionais capazes de criar sites, sistemas web e aplicativos modernos.",
    icon: Monitor,
    image: "/images/curso-informatica.jpg",
    duration: "3 anos",
    areas: ["Banco de Dados", "Programação", "Design Web"],
  },
  {
    title: "Administração",
    href: "/cursos/administracao",
    description:
      "Aprenda a gerenciar negócios, recursos humanos, finanças e marketing. O curso prepara líderes e gestores para o mercado de trabalho com visão estratégica e prática.",
    icon: Briefcase,
    image: "/images/curso-administracao.jpg",
    duration: "3 anos",
    areas: ["Administração", "Organização", "Gestão"],
  },
  {
    title: "Agricultura",
    href: "/cursos/agricultura",
    description:
      "Capacite-se para atuar no agronegócio com técnicas modernas de cultivo, manejo sustentável e gestão rural. O curso une conhecimento técnico com práticas de campo.",
    icon: Sprout,
    image: "/images/curso-agricultura.jpg",
    duration: "3 anos",
    areas: ["Cultivo Sustentável", "Agroecologia", "Gestão Rural"],
  },
];

export function CoursesSection() {
  return (
    <section id="cursos" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-14 max-w-2xl">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-secondary">
            Nossos Cursos
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">Formação técnica para o mercado de trabalho</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Oferecemos quatro cursos técnicos gratuitos, com infraestrutura moderna e corpo docente qualificado.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course.title}
              className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={`Curso Técnico em ${course.title}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/20 transition-colors group-hover:bg-foreground/10" />
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-card shadow-md">
                  <course.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <h3 className="text-xl font-bold text-foreground">{course.title}</h3>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {course.description}
                </p>
                <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Duração: {course.duration}</span>
                </div>
                <div className="mb-5 flex flex-wrap gap-2">
                  {course.areas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {area}
                    </span>
                  ))}
                </div>
                <Link
                  href={course.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary transition-colors hover:text-secondary/80"
                >
                  Saiba mais
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
