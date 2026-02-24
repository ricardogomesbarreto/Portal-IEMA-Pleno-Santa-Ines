import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CoursePageContent } from "@/components/course-page-content";
import { Sprout, Clock, Users, GraduationCap, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Agricultura - IEMA Pleno Santa Inês",
  description:
    "Curso Técnico em Agricultura do IEMA Pleno Santa Inês. Técnicas modernas de cultivo, manejo sustentavel e gestão rural.",
};

export default function AgriculturaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main>
        <CoursePageContent
          title="Agricultura"
          subtitle="Integrado ao Ensino Médio"
          description="O curso Técnico em Agricultura do IEMA Pleno Santa Inês capacita o estudante para atuar no agronegocio com técnicas modernas de cultivo, manejo sustentavel e gestão rural. A formação integra conhecimentos teoricos e praticos, preparando profissionais para planejar, executar e monitorar atividades agricolas com responsabilidade ambiental. O aluno aprende sobre solos, irrigacao, culturas regionais, agroecologia e gestão de propriedades rurais, tornando-se apto a contribuir para o desenvolvimento sustentavel do campo."
          keywords={["Cultivo Sustentavel", "Agroecologia", "Gestão Rural"]}
          icon={Sprout}
          image="/images/curso-agricultura.jpg"
          videoSrc="/videos/agricultura.mp4"
          duration="3 anos"
          color="hsl(145, 60%, 32%)"
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
                "Introducao a Agricultura",
                "Ciencia do Solo",
                "Botanica Aplicada",
                "Ecologia e Meio Ambiente",
                "Informática Rural",
              ],
            },
            {
              semester: "2º Ano",
              subjects: [
                "Culturas Regionais",
                "Irrigacao e Drenagem",
                "Agroecologia",
                "Mecanizacao Agricola",
                "Manejo Integrado de Pragas",
              ],
            },
            {
              semester: "3º Ano",
              subjects: [
                "Gestão de Propriedades Rurais",
                "Agroindustria",
                "Topografia e Geoprocessamento",
                "Empreendedorismo Rural",
                "Projeto Integrador",
              ],
            },
          ]}
          skills={[
            "Técnicas modernas de cultivo e plantio",
            "Manejo sustentavel do solo e recursos hidricos",
            "Praticas de agroecologia e producao organica",
            "Gestão e administração de propriedades rurais",
            "Uso de tecnologias aplicadas ao campo",
            "Planejamento de safras e producao agricola",
            "Consciencia ambiental e desenvolvimento sustentavel",
          ]}
          careerPaths={[
            "Técnico agricola",
            "Assistente de gestão rural",
            "Extensionista rural",
            "Técnico em agroecologia",
            "Auxiliar de agroindustria",
            "Empreendedor rural",
          ]}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
