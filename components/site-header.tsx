"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout as doLogout } from "../lib/admin-db";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Cursos", href: "/#cursos" },
  { label: "Horários de Aula", href: "/cronograma" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Cardápio", href: "/cardapio" },
  { label: "Noticias", href: "/noticias" },
  { label: "Contato", href: "/#contato" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentName, setCurrentName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const u = getCurrentUser();
      if (u && u.name) setCurrentName(u.name);
    } catch (e) {
      setCurrentName(null);
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo-iema.png"
            alt="IEMA - Instituto Estadual de Educação, Ciencia e Tecnologia do Maranhão"
            width={180}
            height={60}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegacao principal">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          {currentName ? (
            <div className="ml-2 flex items-center gap-3">
              <Link href="/profile" className="text-sm font-semibold text-foreground">
                Olá, {currentName}
              </Link>
              <button
                onClick={() => {
                  doLogout();
                  setCurrentName(null);
                  router.push("/");
                }}
                className="ml-2 rounded-md bg-muted px-3 py-2 text-sm font-medium"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="ml-2 rounded-md bg-secondary px-5 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="rounded-md p-2 text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="border-t border-border bg-card px-4 pb-4 md:hidden" aria-label="Navegacao mobile">
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-md bg-secondary px-5 py-3 text-center text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
            >
              Matricule-se
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
