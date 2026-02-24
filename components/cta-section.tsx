import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section id="matricula" className="bg-primary py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h2 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
          <span className="text-balance">Garanta sua vaga no IEMA Pleno Santa Inês</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
          As matriculas para o semestre 2026.1 estao abertas. Inscreva-se agora e comece a construir o seu futuro profissional.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-md bg-secondary px-8 py-3.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
          >
            Inscreva-se agora
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 rounded-md border-2 border-primary-foreground/30 bg-transparent px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/60 hover:bg-primary-foreground/10"
          >
            Fale conosco
          </a>
        </div>
      </div>
    </section>
  );
}
