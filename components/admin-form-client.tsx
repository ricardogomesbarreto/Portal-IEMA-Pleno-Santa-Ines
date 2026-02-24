"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getNewsList, saveNewsList, isLoggedIn } from "../lib/admin-db";

export default function AdminFormClient() {
  const router = useRouter();
  const params = useSearchParams();
  const [editId, setEditId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login?next=/admin/form");
      return;
    }
    const id = params.get("id");
    if (id) {
      setEditId(id);
      const list = getNewsList();
      const item = list.find((it: any) => String(it.id) === String(id));
      if (item) {
        setTitle(item.title || "");
        setSubtitle(item.subtitle || "");
        setAuthor(item.author || "");
        setCategory(item.category || "");
        setImageUrl(item.imageUrl || "");
        setContent(item.content || "");
      }
    }
  }, [params]);

  function handleCancel() {
    router.push("/admin");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      alert("Título é obrigatório.");
      return;
    }
    const obj = {
      id: editId || Date.now(),
      title: title.trim(),
      subtitle: subtitle.trim(),
      author: author.trim() || "Desconhecido",
      category: category,
      imageUrl: imageUrl.trim(),
      content: content.trim(),
      date: new Date().toLocaleString("pt-BR"),
    };

    const list = getNewsList();
    const idx = list.findIndex((it: any) => String(it.id) === String(obj.id));
    if (idx > -1) list[idx] = obj; else list.unshift(obj);
    saveNewsList(list);
    router.push("/admin");
  }

  return (
    <div className="bg-card rounded-lg shadow p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold">{editId ? 'Editar notícia' : 'Nova notícia'}</h1>
          <p className="text-sm text-muted-foreground">Use as tags <code>[IMAGEM:https://...]</code> e <code>[VIDEO:https://...]</code> dentro do conteúdo para inserir mídia.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <input className="w-full border rounded px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subtítulo</label>
          <input className="w-full border rounded px-3 py-2" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Redator (Autor)</label>
            <input className="w-full border rounded px-3 py-2" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Categoria / Local</label>
            <select className="w-full border rounded px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Selecione...</option>
              <option>Campus</option>
              <option>Eventos</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Imagem principal (opcional)</label>
          <input className="w-full border rounded px-3 py-2" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://exemplo.com/imagem.jpg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Conteúdo da notícia</label>
          <textarea rows={12} className="w-full border rounded px-3 py-2" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>

        <div className="flex gap-3 justify-end">
          <button type="button" onClick={handleCancel} className="px-4 py-2 bg-muted rounded">Cancelar</button>
          <button type="submit" className="px-4 py-2 bg-secondary text-secondary-foreground rounded">{editId ? 'Salvar alterações' : 'Publicar notícia'}</button>
        </div>
      </form>
    </div>
  );
}
