"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getNewsList } from "../../lib/admin-db";
import Link from "next/link";

export default function NoticiasPage() {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    setList(getNewsList());
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'newsList') setList(getNewsList());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-secondary">Noticias</span>
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Fique por dentro</h2>
            </div>
            <Link href="/admin/form" className="inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">+ Nova notícia</Link>
          </div>

          <div className="grid gap-6">
            {list.length === 0 && (
              <div className="p-6 bg-card rounded">Nenhuma notícia publicada ainda.</div>
            )}

            {list.map((item) => (
              <article key={item.id} className="bg-card rounded shadow p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold"><Link href={`/noticia?id=${item.id}`}>{item.title}</Link></h2>
                    <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{item.date}</div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">Por {item.author || 'Desconhecido'}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link href={`/noticia?id=${item.id}`} className="px-3 py-2 bg-secondary text-secondary-foreground rounded">Ver</Link>
                  <Link href={`/admin/form?id=${item.id}`} className="px-3 py-2 bg-primary text-primary-foreground rounded">Editar</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
