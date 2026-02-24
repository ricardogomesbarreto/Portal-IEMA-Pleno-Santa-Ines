import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CoursePageContent } from "@/components/course-page-content";
import { Truck, Clock, Users, GraduationCap, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Logistica - IEMA Pleno Santa Inês",
  description:
    "Curso Técnico em Logistica do IEMA Pleno Santa Inês. Planejamento, controle de estoques, transporte, armazenamento e distribuicao de produtos.",
};

export default function LogisticaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main>
        <CoursePageContent
          title="Logistica"
          subtitle="Integrado ao Ensino Médio"
          description="O curso Técnico em Logistica do IEMA Pleno Santa Inês, integrado ao ensino médio, prepara o estudante para compreender e atuar nos processos que movimentam empresas e organizacoes. Ao longo da formação, o aluno desenvolve conhecimentos em planejamento, controle de estoques, transporte, armazenamento e distribuicao de produtos, alem de aprender sobre gestão, organização e tomada de decisoes estrategicas. Com foco na pratica e na realidade do mercado, o curso estimula responsabilidade, organização e visao empreendedora, formando profissionais capazes de otimizar processos e contribuir para a eficiencia das empresas. Uma formação completa para quem deseja ingressar no mercado de trabalho ou seguir carreira na area de gestão e negocios."
          keywords={["Planejamento", "Transporte", "Logistica"]}
          icon={Truck}
          image="/images/curso-logistica.jpg"
          videoSrc="/videos/logistica.mp4"
          duration="3 anos"
          color="hsl(210, 85%, 40%)"
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
                "Introducao a Logistica",
                "Fundamentos de Administração",
                "Matematica Aplicada",
                "Comunicacao Empresarial",
                "Informática Basica",
              ],
            },
            {
              semester: "2º Ano",
              subjects: [
                "Gestão de Estoques",
                "Transporte e Distribuicao",
                "Gestão da Cadeia de Suprimentos",
                "Legislacao Aplicada",
                "Estatistica",
              ],
            },
            {
              semester: "3º Ano",
              subjects: [
                "Armazenagem e Movimentacao",
                "Logistica Reversa",
                "Gestão da Qualidade",
                "Empreendedorismo",
                "Projeto Integrador",
              ],
            },
          ]}
          skills={[
            "Planejamento e controle de estoques",
            "Gestão de transporte e distribuicao",
            "Organização de armazens e centros de distribuicao",
            "Tomada de decisoes estrategicas",
            "Visao empreendedora e gestão de negocios",
            "Otimizacao de processos logisticos",
            "Uso de sistemas de informação logistica",
          ]}
          careerPaths={[
            "Assistente de logistica",
            "Auxiliar de estoque e almoxarifado",
            "Operador de centro de distribuicao",
            "Assistente de compras",
            "Analista de transporte",
            "Empreendedor na area de logistica",
          ]}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
