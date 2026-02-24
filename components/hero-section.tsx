import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-school.jpeg"
          alt="Campus do IEMA Pleno Santa Inês"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-36">
        <div className="max-w-2xl">
          <span className="mb-4 inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
            Governo do Maranhão
          </span>
          <h1 className="font-serif text-4xl font-bold leading-tight text-card md:text-5xl lg:text-6xl">
            <span className="text-balance">
              Educação técnica de qualidade para o seu futuro
            </span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-card/80 md:text-xl">
            O IEMA Pleno Santa Inês oferece cursos técnicos que preparam voce para o mercado de trabalho com excelencia e inovacao.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#cursos"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-8 py-3.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
            >
              Conheça nossos cursos
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#sobre"
              className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-card/30 bg-transparent px-8 py-3.5 text-sm font-semibold text-card transition-colors hover:border-card/60 hover:bg-card/10"
            >
              Saiba mais
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
