import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CoursePageContent } from "@/components/course-page-content";
import { Briefcase, Clock, Users, GraduationCap, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Administração - IEMA Pleno Santa Inês",
  description:
    "Curso Técnico em Administração do IEMA Pleno Santa Inês. Planejamento, controle financeiro, recursos humanos e atendimento ao cliente.",
};

export default function AdministracaoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main>
        <CoursePageContent
          title="Administração"
          subtitle="Integrado ao Ensino Médio"
          description="No curso técnico de Administração forme-se para atuar na organização e gestão de empresas, desenvolvendo habilidades em planejamento, controle financeiro, recursos humanos e atendimento ao cliente. O curso prepara profissionais aptos a auxiliar na tomada de decisoes, organizar processos administrativos e contribuir para o crescimento de negocios de todos os portes."
          keywords={["Administrar", "Organização", "Gestão"]}
          icon={Briefcase}
          image="/images/curso-administracao.jpg"
          videoSrc="/videos/adm.mp4"
          duration="3 anos"
          color="hsl(215, 25%, 15%)"
          highlights={[
            { icon: Clock, label: "Duracao", value: "3 anos" },
            { icon: Users, label: "Modalidade", value: "Integrado ao E.M." },
            { icon: GraduationCap, label: "Nivel", value: "Técnico" },
            { icon: Building2, label: "Turno", value: "Integral" },
          ]}
          curriculum={[
            {
              semester: "1º Ano",
              subjects: [
                "Fundamentos de Administração",
                "Teoria das Organizações",
                "Comunicacao Empresarial",
                "Matematica Financeira",
                "Informática Aplicada",
              ],
            },
            {
              semester: "2º Ano",
              subjects: [
                "Gestão de Pessoas",
                "Contabilidade Basica",
                "Marketing e Vendas",
                "Legislacao Trabalhista",
                "Atendimento ao Cliente",
              ],
            },
            {
              semester: "3º Ano",
              subjects: [
                "Controle Financeiro",
                "Gestão de Processos",
                "Planejamento Estrategico",
                "Empreendedorismo",
                "Projeto Integrador",
              ],
            },
          ]}
          skills={[
            "Planejamento e organização empresarial",
            "Controle financeiro e orcamentario",
            "Gestão de recursos humanos",
            "Atendimento e relacionamento com clientes",
            "Tomada de decisoes estrategicas",
            "Organização de processos administrativos",
            "Visao empreendedora e lideranca",
          ]}
          careerPaths={[
            "Assistente administrativo",
            "Auxiliar de recursos humanos",
            "Assistente financeiro",
            "Atendente de vendas e marketing",
            "Auxiliar contabil",
            "Empreendedor e gestor de negocios",
          ]}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
