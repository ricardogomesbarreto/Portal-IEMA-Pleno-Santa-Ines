"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getCurrentUser,
  setCurrentUser,
  logout as doLogout,
  getNewsList,
} from "../../lib/admin-db";

export default function ProfilePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [photo, setPhoto] = useState("");
  const [newsCount, setNewsCount] = useState(0);

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) {
      router.replace("/login");
      return;
    }

    setName(u.name || "");
    setEmail(u.email || "");
    setRole(u.role || "");
    setPhoto(u.photo || "");

    const news = getNewsList();
    setNewsCount(news.length);
  }, [router]);

  function handleUpload(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPhoto(base64);

      const updated = {
        name,
        email,
        role,
        photo: base64,
      };

      setCurrentUser(updated);
    };

    reader.readAsDataURL(file);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const idx = users.findIndex((u: any) => u.email === email);

    if (idx > -1) {
      users[idx].name = name;
      users[idx].photo = photo;
      localStorage.setItem("users", JSON.stringify(users));
    }

    const updated = { name, email, role, photo };
    setCurrentUser(updated);

    alert("Perfil atualizado!");
  }

  function handleLogout() {
    doLogout();
    router.replace("/");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background py-12">
      <div className="w-full max-w-2xl bg-card rounded-2xl p-6 shadow">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Perfil do Administrador
        </h1>

        {/* FOTO */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={photo || "/images/default-user.png"}
            className="w-32 h-32 rounded-full object-cover border"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="mt-3"
          />
        </div>

        {/* CONTADOR */}
        <div className="bg-muted p-4 rounded mb-6 text-center">
          <p className="text-lg font-semibold">
            📰 Notícias publicadas: {newsCount}
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">

          <div>
            <label>Nome</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              className="w-full border rounded px-3 py-2 bg-gray-100"
              value={email}
              disabled
            />
          </div>

          <div>
            <label>Tipo</label>
            <input
              className="w-full border rounded px-3 py-2 bg-gray-100"
              value={role}
              disabled
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">

            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Ir para o Painel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-secondary text-white rounded"
            >
              Salvar
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Sair
            </button>

          </div>

        </form>

      </div>
    </main>
  );
}