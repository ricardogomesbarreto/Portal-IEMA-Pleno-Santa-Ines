import { GraduationCap, Users, BookOpen, Award } from "lucide-react";

const stats = [
  { icon: GraduationCap, value: "4", label: "Cursos Técnicos" },
  { icon: Users, value: "+440", label: "Alunos Matriculados" },
  // { icon: BookOpen, value: "100%", label: "Gratuito" },
  // { icon: Award, value: "95%", label: "Empregabilidade" },
  { icon: Award, value: "4,5 no IDEB", label: "Superando médias nacionais" },
];

export function StatsBar() {
  return (
    <section className="relative z-10 -mt-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className=" gap-4 flex justify-evenly rounded-xl bg-card p-6 shadow-lg md:grid-cols-4 md:gap-8 md:p-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl font-bold text-foreground md:text-3xl">{stat.value}</span>
              <span className="mt-1 text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
