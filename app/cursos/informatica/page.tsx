import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CoursePageContent } from "@/components/course-page-content";
import { Monitor, Clock, Users, GraduationCap, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Informática para Internet - IEMA Pleno Santa Inês",
  description:
    "Curso de Informática para Internet do IEMA Pleno Santa Inês. Programação, desenvolvimento web, segurança digital e inteligência artificial.",
};

export default function InformaticaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main>
        <CoursePageContent
          title="Informática para Internet"
          subtitle="Integrado ao Ensino Médio"
          description="O curso de Informática para Internet do IEMA Pleno Santa Inês prepara os estudantes para criar e desenvolver tecnologias, como sites, sistemas, banco de dados e até inteligência artificial. Durante o curso, os alunos aprendem programação, desenvolvimento web, segurança digital e inovação, transformando ideias em soluções digitais. Além da formação técnica integrada ao ensino médio, o curso também prepara para o mercado de trabalho e para a universidade."
          keywords={["Banco de Dados", "Programação", "Design"]}
          icon={Monitor}
          image="/images/curso-informatica.jpg"
          videoSrc="/videos/programacao para web.mp4"
          duration="3 anos"
          color="hsl(355, 80%, 48%)"
          highlights={[
            { icon: Clock, label: "Duração", value: "3 anos" },
            { icon: Users, label: "Modalidade", value: "Integrado ao E.M." },
            { icon: GraduationCap, label: "Nível", value: "Técnico" },
            { icon: Building2, label: "Turno", value: "Integral" },
          ]}
          curriculum={[
            {
              semester: "1º Ano",
              subjects: [
                "Lógica de Programação",
                "Introdução à Informática",
                "Design Web (HTML/CSS)",
                "Matemática Computacional",
                "Inglês Técnico",
              ],
            },
            {
              semester: "2º Ano",
              subjects: [
                "Programação Web (HTML/CSS/JS)",
                "Banco de Dados",
                "Design de Interfaces (UI/UX)",
                "Redes de Computadores",
                "Manutenção de Computadores",
              ],
            },
            {
              semester: "3º Ano",
              subjects: [
                "Frameworks e Bibliotecas Web",
                "Inteligência Artificial",
                "Desenvolvimento de Sistemas",
                "Empreendedorismo Digital",
                "Projeto Integrador",
              ],
            },
          ]}
          skills={[
            "Desenvolvimento de sites e sistemas web",
            "Programação em linguagens modernas",
            "Criação e gerenciamento de banco de dados",
            "Design de interfaces e experiência do usuário",
            "Segurança digital e proteção de dados",
            "Noções de inteligência artificial",
            "Resolução de problemas com lógica computacional",
          ]}
          careerPaths={[
            "Desenvolvedor web front-end e back-end",
            "Administrador de banco de dados",
            "Designer de interfaces digitais",
            "Analista de suporte técnico",
            "Desenvolvedor de sistemas",
            "Empreendedor na área de tecnologia",
          ]}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
