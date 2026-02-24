"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, setCurrentUser, logout as doLogout } from "../../lib/admin-db";

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) {
      router.push("/login");
      return;
    }
    setName(u.name || "");
    setEmail(u.email || "");
    setRole(u.role || "");
  }, []);

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
    alert("Perfil atualizado.");
  }

  function handleLogout() {
    doLogout();
    router.push("/");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background py-12">
      <div className="w-full max-w-md bg-card rounded-2xl p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">Editar Perfil</h1>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input className="w-full border rounded px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email (não editável)</label>
            <input className="w-full border rounded px-3 py-2 bg-gray-100" value={email} disabled />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Conta</label>
            <input className="w-full border rounded px-3 py-2 bg-gray-100" value={role} disabled />
          </div>

          <div className="flex gap-3 justify-end">
            <button type="button" onClick={handleLogout} className="px-4 py-2 bg-muted rounded">Sair</button>
            <button type="submit" className="px-4 py-2 bg-secondary text-secondary-foreground rounded">Salvar</button>
          </div>
        </form>
      </div>
    </main>
  );
}
