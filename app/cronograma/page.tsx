import type { Metadata } from "next";
import { TopBar } from "@/components/top-bar";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Cronograma } from "@/components/cronograma";
import { CalendarDays } from "lucide-react";

export const metadata: Metadata = {
  title: "Horários de Aula",
  description:
    "Consulte o cronograma de disciplinas e horarios dos cursos técnicos do IEMA Pleno Santa Inês.",
};

export default function CronogramaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <SiteHeader />

      <main className="flex-1 bg-background">
        {/* Page header */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
                Horarios
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              <span className="text-balance">Horários de Aulas</span>
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Consulte os horarios e disciplinas do seu curso. Gestores podem
              editar, adicionar ou remover aulas diretamente na tabela.
            </p>
          </div>
        </section>

        {/* Schedule content */}
        <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <Cronograma />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
