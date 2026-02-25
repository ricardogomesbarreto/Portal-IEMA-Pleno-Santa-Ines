"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  getNewsList,
  saveNewsList,
  isLoggedIn,
  setLoggedIn,
  getCurrentUser,
  setCurrentUser,
  logout as doLogout,
} from "../../lib/admin-db";

export default function AdminPage() {
  const router = useRouter();

  const [news, setNews] = useState<any[]>([]);

  // 🔴 DADOS DO ADMIN
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
      return;
    }

    setNews(getNewsList());

    const u = getCurrentUser();
    if (!u) {
      router.replace("/login");
      return;
    }

    setName(u.name || "");
    setEmail(u.email || "");
    setRole(u.role || "");
  }, [router]);

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
          <a href={`/noticia?id=${item.id}`} target="_blank">
            {item.title}
          </a>
        </td>
        <td>{item.author || ""}</td>
        <td>
          <span className="inline-block px-2 py-1 bg-gray-100 rounded">
            {item.category || ""}
          </span>
        </td>
        <td>{item.date || ""}</td>
        <td className="flex gap-2">
          <a className="px-2 py-1 bg-gray-200 rounded" href={`/noticia?id=${item.id}`} target="_blank">
            Ver
          </a>
          <a className="px-2 py-1 bg-blue-600 text-white rounded" href={`/admin/form?id=${item.id}`}>
            Editar
          </a>
          <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => handleDelete(item.id)}>
            Excluir
          </button>
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

  // 🔴 SALVAR PERFIL
  function handleSave(e: React.FormEvent) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const idx = users.findIndex((u: any) => u.email === email);

    if (idx > -1) {
      users[idx].name = name;
      localStorage.setItem("users", JSON.stringify(users));
    }

    const updated = { name, email, role };
    setCurrentUser(updated);

    alert("Perfil atualizado com sucesso!");
  }

  function handleLogout() {
    if (!confirm("Deseja sair?")) return;
    doLogout();
    setLoggedIn(false);
    router.replace("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4">

          <header className="mb-8 flex items-center justify-between">
            <div>
              <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-secondary">
                Painel
              </span>
              <h1 className="font-serif text-3xl font-bold">
                Painel do administrador
              </h1>
              <p className="mt-1 text-muted-foreground">
                IP IEMA Santa Inês — Gerencie notícias e seus dados.
              </p>
            </div>
            <a href="/admin/form" className="rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">
              + Nova notícia
            </a>
          </header>

          {/* 🔴 GRID 2 COLUNAS */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* 👤 PERFIL ADMIN */}
            <div className="bg-card p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4">Dados do Administrador</h2>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Nome</label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                    value={email}
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Tipo</label>
                  <input
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                    value={role}
                    disabled
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="submit" className="px-4 py-2 bg-secondary text-white rounded">
                    Salvar
                  </button>
                  <button type="button" onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded">
                    Sair
                  </button>
                </div>
              </form>
            </div>

            {/* 📰 TABELA DE NOTÍCIAS */}
            <div className="md:col-span-2 overflow-x-auto bg-card rounded shadow">
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
                <tbody>
                  {renderRows()}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}