"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getNewsList, saveNewsList, isLoggedIn, setLoggedIn, getSiteConfig } from "../../lib/admin-db";

export default function AdminPage() {
  const router = useRouter();
  const [news, setNews] = useState<any[]>([]);
  const [siteConfig, setSiteConfig] = useState<any>({});

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }
    setNews(getNewsList());
    setSiteConfig(getSiteConfig());
  }, []);

  function renderRows() {
    if (!news || news.length === 0) {
      return (
        <tr>
          <td colSpan={5} className="text-center p-6">
            Nenhuma notícia publicada ainda.
          </td>
        </tr>
      );
    }

    return news.map((item) => (
      <tr key={item.id}>
        <td>
          <a href={`/noticia?id=${item.id}`} target="_blank" rel="noreferrer">{item.title}</a>
        </td>
        <td>{item.author || ""}</td>
        <td><span className="inline-block px-2 py-1 bg-gray-100 rounded">{item.category || ""}</span></td>
        <td>{item.date || ""}</td>
        <td className="flex gap-2">
          <a className="px-2 py-1 bg-gray-200 rounded" href={`/noticia?id=${item.id}`} target="_blank" rel="noreferrer">Ver</a>
          <a className="px-2 py-1 bg-blue-600 text-white rounded" href={`/admin/form?id=${item.id}`}>Editar</a>
          <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => handleDelete(item.id)}>Excluir</button>
        </td>
      </tr>
    ));
  }

  function handleDelete(id: any) {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    const arr = getNewsList();
    const idx = arr.findIndex((it: any) => String(it.id) === String(id));
    if (idx > -1) {
      arr.splice(idx, 1);
      saveNewsList(arr);
      setNews([...arr]);
    }
  }

  function handleLogout() {
    if (!confirm("Deseja sair?")) return;
    setLoggedIn(false);
    router.push("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-secondary">Painel</span>
              <h1 className="font-serif text-3xl font-bold">Painel do administrador</h1>
              <p className="mt-1 text-muted-foreground">IP IEMA Santa Inês — Gerencie as notícias publicadas.</p>
            </div>
            <div className="flex gap-3 items-center">
              <a href="/admin/form" className="inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">+ Nova notícia</a>
              <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm">Sair</button>
            </div>
          </header>

          <section>
            <div className="overflow-x-auto bg-card rounded shadow">
              <table className="w-full text-left table-auto">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3">Título</th>
                    <th className="px-4 py-3">Redator</th>
                    <th className="px-4 py-3">Categoria</th>
                    <th className="px-4 py-3">Data</th>
                    <th className="px-4 py-3">Ações</th>
                  </tr>
                </thead>
                <tbody id="news-tbody">
                  {renderRows()}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
