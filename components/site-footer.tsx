import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

const footerLinks = {
  cursos: [
    { label: "Logistica", href: "/cursos/logistica" },
    { label: "Informática para Internet", href: "/cursos/informatica" },
    { label: "Administração", href: "/cursos/administracao" },
    { label: "Agricultura", href: "/cursos/agricultura" },
  ],
  institucional: [
    { label: "Sobre o IEMA Pleno Santa Inês", href: "#sobre" },
    { label: "Corpo Docente", href: "#" },
    { label: "Infraestrutura", href: "#" },
    { label: "Noticias", href: "/noticias" },
  ],
  aluno: [
    { label: "Portal do Aluno", href: "#" },
    { label: "Calendário Acadêmico", href: "#" },
    { label: "Biblioteca Virtual", href: "#" },
    { label: "Documentos", href: "#" },
  ],
};

export function SiteFooter() {
  return (
    <footer id="contato" className="bg-foreground text-card">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Logo & Contact */}
          <div className="lg:col-span-1">
            <Image
              src="/images/logo-iema.png"
              alt="IEMA"
              width={160}
              height={53}
              className="mb-6 h-10 w-auto brightness-0 invert"
            />
            <p className="mb-6 text-sm leading-relaxed text-card/70">
              Instituto Estadual de Educação, Ciência e Tecnologia do Maranhão
            </p>
            <ul className="flex flex-col gap-3" role="list">
              <li className="flex items-start gap-2.5 text-sm text-card/70">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>Av. dos Portugueses, s/n - Vila Bacanga, São Luís - MA</span>
              </li>
              <li>
                <a href="tel:+559832222222" className="flex items-center gap-2.5 text-sm text-card/70 transition-colors hover:text-card">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>(98) 3222-2222</span>
                </a>
              </li>
              <li>
                <a href="mailto:contato@iema.ma.gov.br" className="flex items-center gap-2.5 text-sm text-card/70 transition-colors hover:text-card">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>contato@iema.ma.gov.br</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Link Columns */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-card/50">
              Cursos
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {footerLinks.cursos.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-card/70 transition-colors hover:text-card">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-card/50">
              Institucional
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {footerLinks.institucional.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-card/70 transition-colors hover:text-card">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-card/50">
              Área do Aluno
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {footerLinks.aluno.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-card/70 transition-colors hover:text-card">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-card/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-card/50 md:flex-row">
          <p>2026 Arkadia Systems. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-card">Política de Privacidade</a>
            <a href="#" className="transition-colors hover:text-card">Acessibilidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
