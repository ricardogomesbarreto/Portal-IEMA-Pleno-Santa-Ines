import React, { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import AdminFormClient from "@/components/admin-form-client";

export default function AdminFormPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <Suspense fallback={<div>Carregando...</div>}>
            <AdminFormClient />
          </Suspense>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
