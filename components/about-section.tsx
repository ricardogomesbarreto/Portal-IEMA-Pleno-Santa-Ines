import { CheckCircle2 } from "lucide-react";

const highlights = [
  "Ensino 100% gratuito e de qualidade",
  "Laboratorios modernos e equipados",
  "Corpo docente altamente qualificado",
  "Parceria com empresas do mercado",
  "Programa de estagio garantido",
  "Certificado reconhecido pelo MEC",
];

export function AboutSection() {
  return (
    <section id="sobre" className="bg-muted py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-secondary">
              Sobre o IEMA
            </span>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              <span className="text-balance">
                Transformando vidas atraves da educação técnica
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              O Instituto Estadual de Educação, Ciencia e Tecnologia do Maranhão (IEMA) e uma instituicao do Governo do Estado que oferece educação profissional e tecnologica gratuita e de qualidade, preparando jovens para o mercado de trabalho e para a vida.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Nosso compromisso e com a formação integral do estudante, aliando conhecimento técnico, valores eticos e habilidades praticas que fazem a diferenca na carreira profissional.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <h3 className="mb-6 text-lg font-bold text-foreground">
              Por que estudar no IEMA Santa Inês?
            </h3>
            <ul className="grid gap-4 sm:grid-cols-2" role="list">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
