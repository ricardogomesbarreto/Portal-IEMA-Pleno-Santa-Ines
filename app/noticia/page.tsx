import React, { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import NoticiaClient from "@/components/noticia-client";

export default function NoticiaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <Suspense fallback={<main className="flex-1 py-24"><div className="mx-auto max-w-3xl px-4">Carregando...</div></main>}>
        <NoticiaClient />
      </Suspense>

      <SiteFooter />
    </div>
  );
}
