"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getNewsList, saveNewsList, isLoggedIn } from "../../../lib/admin-db";

export default function AdminFormPage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
      return;
    }

    if (id) {
      const news = getNewsList();
      const item = news.find((n: any) => String(n.id) === String(id));
      if (item) {
        setTitle(item.title || "");
        setAuthor(item.author || "");
        setCategory(item.category || "");
        setDate(item.date || "");
        setContent(item.content || "");
      }
    }
  }, [id, router]);

  // 💾 SALVAR NOTÍCIA
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const arr = getNewsList();

    if (id) {
      const idx = arr.findIndex((n: any) => String(n.id) === String(id));
      if (idx > -1) {
        arr[idx] = {
          ...arr[idx],
          title,
          author,
          category,
          date,
          content,
        };
      }
    } else {
      arr.push({
        id: Date.now(),
        title,
        author,
        category,
        date,
        content,
      });
    }

    saveNewsList(arr);

    alert("Notícia salva com sucesso!");

    // 🔴 REDIRECIONA PARA HOME
    setTimeout(() => {
      router.replace("/");
    }, 0);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background py-12">
      <div className="w-full max-w-xl bg-card rounded-2xl p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">
          {id ? "Editar Notícia" : "Nova Notícia"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Autor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />

          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <textarea
            className="w-full border rounded px-3 py-2"
            placeholder="Conteúdo"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 bg-muted rounded"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}