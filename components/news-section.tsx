import { Calendar, ArrowRight } from "lucide-react";
import LoginPrompt from "./login-prompt";

const news = [
  {
    date: "05 Fev 2026",
    title: "Matriculas abertas para o primeiro semestre de 2026",
    excerpt:
      "As inscricoes para os cursos técnicos do IEMA Pleno Santa Inês estão abertas. Nao perca a oportunidade de garantir sua vaga.",
  },
  {
    date: "28 Jan 2026",
    title: "IEMA conquista prêmio de excelência em educação técnica",
    excerpt:
      "A instituicao foi reconhecida pelo MEC como referencia em ensino profissional no estado do Maranhão.",
  },
  {
    date: "15 Jan 2026",
    title: "Parceria com empresas garante estagio para alunos",
    excerpt:
      "Novo convenio amplia as oportunidades de estagio para estudantes de todos os cursos técnicos.",
  },
];

export function NewsSection() {
  return (
    <section id="noticias" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <LoginPrompt />
        <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-secondary">
              Noticias
            </span>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Fique por dentro
            </h2>
          </div>
          <a
            href="/noticias"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Ver todas as noticias
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {news.map((item) => (
            <article
              key={item.title}
              className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <time>{item.date}</time>
              </div>
              <h3 className="mb-3 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                <span className="text-pretty">{item.title}</span>
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {item.excerpt}
              </p>
              <a
                href="/noticias"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary transition-colors hover:text-secondary/80"
              >
                Ler mais
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
