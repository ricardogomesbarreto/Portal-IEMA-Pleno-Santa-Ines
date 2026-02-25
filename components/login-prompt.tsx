"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { isLoggedIn } from "../lib/admin-db";

export default function LoginPrompt() {
  const [mounted, setMounted] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLogged(isLoggedIn());
  }, []);

  if (!mounted) return null;
  if (logged) return null;

  return (
    <div className="mb-4 rounded-md border border-border bg-card/50 p-3 text-sm text-foreground">
      <span className="mr-2">
        Para editar conteúdo (cardápio, cronograma, notícias), faça login como Gestor/Professor.
      </span>
      <Link href="/login" className="font-semibold text-secondary ml-2">
        Entrar
      </Link>
    </div>
  );
}
