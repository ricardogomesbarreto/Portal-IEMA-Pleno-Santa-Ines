import { Mail, Phone } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-foreground text-primary-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm">
        <div className="flex items-center gap-4">
          <a
            href="mailto:contato@iema.ma.gov.br"
            className="flex items-center gap-1.5 text-primary-foreground/80 transition-colors hover:text-primary-foreground"
          >
            <Mail className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">contato@iema.ma.gov.br</span>
          </a>
          <a
            href="tel:+559832222222"
            className="flex items-center gap-1.5 text-primary-foreground/80 transition-colors hover:text-primary-foreground"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">(98) 3222-2222</span>
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-primary-foreground/60">Governo do Maranhão</span>
        </div>
      </div>
    </div>
  );
}
