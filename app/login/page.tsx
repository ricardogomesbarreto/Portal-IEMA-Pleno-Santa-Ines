"use client";

import { useEffect, useState } from "react";
import { setLoggedIn } from "../../lib/admin-db";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginRole, setLoginRole] = useState("");
  const [loginError, setLoginError] = useState("");

  // Register fields
  const [name, setName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirm, setRegisterConfirm] = useState("");
  const [registerRole, setRegisterRole] = useState("");
  const [registerError, setRegisterError] = useState("");

  useEffect(() => {
    // capture optional `next` param to redirect after successful login
    try {
      const params = new URLSearchParams(window.location.search);
      const next = params.get("next");
      if (next) setNextPath(next);
    } catch (e) {
      // ignore
    }
  }, []);

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegisterError("");

    let pwd = registerPassword.trim();
    const confirm = registerConfirm.trim();
    const email = registerEmail.trim();
    const nm = name.trim();

    if (pwd !== confirm) {
      setRegisterError("As senhas não coincidem.");
      return;
    }
    if (!registerRole) {
      setRegisterError("Selecione se é Aluno ou Gestor.");
      return;
    }
    // role-specific length rules (compare trimmed values)
    if (registerRole === "Aluno" && pwd.length !== 12) {
      setRegisterError("A senha do aluno deve ter exatamente 12 dígitos.");
      return;
    }
    if (registerRole === "Gestor/Professor" && pwd.length !== 8) {
      setRegisterError("A senha do gestor deve ter exatamente 8 caracteres.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u: any) => u.email === email)) {
      setRegisterError("Email já cadastrado.");
      return;
    }

    users.push({ name: nm, email: email, password: pwd, role: registerRole });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Cadastro realizado com sucesso!");
    setIsRegister(false);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const email = loginEmail.trim();
    const pwd = loginPassword.trim();
    const user = users.find((u: any) => u.email === email);
    if (!user) {
      setLoginError("Email não encontrado.");
      return;
    }
    if (user.password !== pwd) {
      setLoginError("Senha incorreta.");
      return;
    }
    if (user.role !== loginRole) {
      setLoginError("Tipo de usuário incorreto.");
      return;
    }

    // mark current user for session and admin flag as needed
    try {
      const mod = await import("../../lib/admin-db");
      mod.setCurrentUser(user);
    } catch (e) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    }

    alert("Login realizado com sucesso como " + loginRole + "!");
    if (loginRole === "gestor") {
      setLoggedIn(true);
      window.location.href = "/profile";
    }
  else {
      if (nextPath && nextPath.startsWith("/")) {
        window.location.href = nextPath;
      } else {
        window.location.href = "/";
      }
    }
  }

  function handleForgot() {
    const email = prompt("Digite seu email cadastrado:");
    if (!email) {
      alert("Você precisa informar um email.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.email === email);
    if (!user) {
      alert("Email não encontrado.");
      return;
    }
    const code = Math.floor(1000 + Math.random() * 9000);
    alert("Um código foi enviado para o email " + email + ": " + code);
    localStorage.setItem("resetCode", JSON.stringify({ email: email, code: code }));
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-sky-600">
      <div className="relative w-full max-w-md p-6">
        {/* blurred background slideshow matching home hero */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="slideshow -z-10">
            <div className="slide" style={{ backgroundImage: "url('/images/hero-school.jpg')" }} />
            <div className="slide" style={{ backgroundImage: "url('/images/hero-school.jpeg')" }} />
            <div className="slide" style={{ backgroundImage: "url('/images/curso-informatica.jpg')" }} />
            <div className="slide" style={{ backgroundImage: "url('/images/curso-agricultura.jpg')" }} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-transparent to-foreground/30" />
        </div>

        <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 max-w-md mx-auto">
          <div className="flex mb-4 rounded-md overflow-hidden border border-card/10">
            <button
              className={`flex-1 p-2 font-bold ${!isRegister ? "bg-secondary text-secondary-foreground" : "bg-transparent text-foreground"}`}
              onClick={() => setIsRegister(false)}
              type="button"
            >
              Login
            </button>
            <button
              className={`flex-1 p-2 font-bold ${isRegister ? "bg-secondary text-secondary-foreground" : "bg-transparent text-foreground"}`}
              onClick={() => setIsRegister(true)}
              type="button"
            >
              Cadastro
            </button>
          </div>

          {!isRegister ? (
            <form onSubmit={handleLogin}>
              <h2 className="text-center text-lg font-semibold mb-4">Entrar</h2>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded px-3 py-2"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Senha"
                  className="w-full border rounded px-3 py-2"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <select
                  className="w-full border rounded px-3 py-2"
                  value={loginRole}
                  onChange={(e) => setLoginRole(e.target.value)}
                  required
                >
                  <option value="">Selecione o tipo de usuário</option>
                  <option value="aluno">Aluno</option>
                  <option value="gestor">Gestor/Professor</option>
                </select>
              </div>
              {loginError && <div className="text-red-600 font-bold mb-2">{loginError}</div>}
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Entrar</button>
              <div className="mt-3 text-center">
                <button type="button" onClick={handleForgot} className="text-sm text-gray-600">
                  Esqueci a Senha
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <h2 className="text-center text-lg font-semibold mb-4">Criar Conta</h2>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Nome"
                  className="w-full border rounded px-3 py-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded px-3 py-2"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Senha"
                  className="w-full border rounded px-3 py-2"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Confirmar Senha"
                  className="w-full border rounded px-3 py-2"
                  value={registerConfirm}
                  onChange={(e) => setRegisterConfirm(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <select
                  className="w-full border rounded px-3 py-2"
                  value={registerRole}
                  onChange={(e) => setRegisterRole(e.target.value)}
                  required
                >
                  <option value="">Selecione o tipo de usuário</option>
                  <option value="aluno">Aluno</option>
                  <option value="gestor">Gestor</option>
                </select>
              </div>
              {registerError && <div className="text-red-600 font-bold mb-2">{registerError}</div>}
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Cadastrar</button>
            </form>
          )}
        </div>

        <style>{`
          .slideshow{ position:relative; width:100%; height:100%; }
          .slide{ position:absolute; inset:0; background-size:cover; background-position:center; opacity:0; transform:scale(1.06); filter:blur(6px) brightness(0.7); animation:fade 16s linear infinite; }
          .slide:nth-child(1){ animation-delay:0s }
          .slide:nth-child(2){ animation-delay:4s }
          .slide:nth-child(3){ animation-delay:8s }
          .slide:nth-child(4){ animation-delay:12s }
          @keyframes fade{ 0%{opacity:0} 6%{opacity:1} 25%{opacity:1} 31%{opacity:0} 100%{opacity:0} }
        `}</style>
      </div>
    </main>
  );
}
