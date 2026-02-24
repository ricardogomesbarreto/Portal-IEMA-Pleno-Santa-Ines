import React, { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import CardapioClient from "@/components/cardapio-client";

export default function CardapioPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <Suspense fallback={<div>Carregando cardápio...</div>}>
            <CardapioClient />
          </Suspense>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
