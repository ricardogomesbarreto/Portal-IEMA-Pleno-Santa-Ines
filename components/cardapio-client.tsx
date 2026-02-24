"use client";

import { useEffect } from "react";
import { isLoggedIn } from "../lib/admin-db";
import LoginPrompt from "./login-prompt";

const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
const horarios = ["09:10", "12:00", "15:05"];

const WEEKDAYS = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

function formatDateWithWeekday(d: Date) {
  const date = d.toLocaleDateString("pt-BR");
  const weekday = WEEKDAYS[d.getDay()];
  return `${date} (${weekday})`;
}

function ensureGrid(container: HTMLElement | null) {
  if (!container) return;
  container.innerHTML = "";

  // header empty cell
  container.appendChild(document.createElement("div"));

  dias.forEach((d) => {
    const el = document.createElement("div");
    el.className = "header-cell cell";
    el.innerText = d;
    container.appendChild(el);
  });

  horarios.forEach((h) => {
    const time = document.createElement("div");
    time.className = "time-cell cell";
    time.innerText = h;
    container.appendChild(time);

    dias.forEach((d) => {
      const id = `${d}-${h}`;
      const text = localStorage.getItem(id) || "";

      const cell = document.createElement("div");
      cell.className = "cell";

      const editable = document.createElement("div");
      editable.className = "editable";
      editable.setAttribute("data-id", id);
      editable.contentEditable = isLoggedIn() ? "true" : "false";
      editable.innerText = text;

      // mark unsaved when edited; do not auto-save on blur
      editable.oninput = () => {
        const evt = new CustomEvent("cardapio-changed", { detail: { id } });
        window.dispatchEvent(evt);
      };
      editable.onblur = () => {
        // keep local editing only until explicit save
      };

      cell.appendChild(editable);
      container.appendChild(cell);
    });
  });
}

  function isWeekday() {
    const d = new Date().getDay();
    return d >= 1 && d <= 5;
  }

  function saveMenu() {
    if (!isLoggedIn()) {
      alert("Somente gestores logados podem salvar o cardápio.");
      return;
    }
    if (!isWeekday()) {
      if (!confirm("Você não está em dia útil. Deseja continuar salvando?")) return;
    }

    // save grid cells
    const grid = document.getElementById("menu-grid");
    if (grid) {
      // find all editable cells with data-id
      const edits = Array.from(grid.querySelectorAll<HTMLElement>('[data-id]'));
      edits.forEach((el) => {
        const id = el.getAttribute("data-id");
        if (!id) return;
        localStorage.setItem(id, (el.textContent || "").trim());
      });
    }

    // save fila: prefer table representation if present
    const box = document.getElementById("fila-box");
    if (box) {
      const table = box.querySelector("table");
      if (table && table instanceof HTMLTableElement) {
        const rows: string[] = [];
        for (let r = 0; r < table.rows.length; r++) {
          const cells = Array.from(table.rows[r].cells).map((cell) => (cell.textContent || "").trim());
          rows.push(cells.join(", "));
        }
        localStorage.setItem("fila-geral", rows.join("\n"));
      } else {
        const raw = (box.textContent || "").trim();
        if (raw) localStorage.setItem("fila-geral", raw);
      }
    }

    alert("Cardápio salvo com sucesso.");
    // notify other tabs
    window.dispatchEvent(new StorageEvent("storage", { key: "menu-saved", newValue: String(Date.now()) }));
  }

export default function CardapioClient() {
  const todayLabel = formatDateWithWeekday(new Date());

  useEffect(() => {
    const grid = document.getElementById("menu-grid");
    ensureGrid(grid);

    const box = document.getElementById("fila-box");
    function isWeekday() {
      const d = new Date().getDay();
      return d >= 1 && d <= 5;
    }
    const canEditFila = isLoggedIn() && isWeekday();

    // build editable table for fila
    function parseFila(text: string) {
      return text
        .split("\n")
        .map((r) => r.split(",").map((c) => c.trim()).filter(Boolean))
        .filter((row) => row.length > 0);
    }

    function renderFilaTable(container: HTMLElement | null) {
      if (!container) return;
      container.innerHTML = "";

      // 12 salas (101-112) com suas posições na fila
      const NUM_SALAS = 12;
      let salas: [string, string][] = [];
      
      // Load stored data or use defaults
      const raw = localStorage.getItem("fila-geral") || "";
      if (raw) {
        const lines = raw.split("\n");
        lines.forEach((line) => {
          const [sala, pos] = line.split(",").map((s) => s.trim());
          if (sala && pos) salas.push([sala, pos]);
        });
      }
      
      // Fill with defaults (salas 101-112 at positions 1-12)
      while (salas.length < NUM_SALAS) {
        const idx = salas.length;
        const salaKey = String(101 + idx);
        const pos = salas.find(([s]) => s === salaKey)?.[1] || String(idx + 1);
        salas.push([salaKey, pos]);
      }
      
      // Garantir apenas 12 linhas
      salas = salas.slice(0, NUM_SALAS);

      // card wrapper to match home page design
      const card = document.createElement("div");
      card.className = "w-full bg-white p-4 rounded-2xl shadow-sm border border-card/10";

      // caption / hint
      if (canEditFila) {
        const hint = document.createElement("div");
        hint.className = "text-xs text-card/70 mb-3";
        hint.innerText = "Edição disponível para Gestor/Professor em dias úteis.";
        card.appendChild(hint);
      }

      // date label
      const dateLabel = document.createElement("div");
      dateLabel.className = "text-xs text-muted-foreground mb-3";
      dateLabel.innerText = `Data: ${formatDateWithWeekday(new Date())}`;
      card.appendChild(dateLabel);

      const tableWrap = document.createElement("div");
      tableWrap.className = "overflow-x-auto rounded-lg";

      const table = document.createElement("table");
      table.className = "w-full table-auto border-collapse text-sm";

      // thead
      const thead = document.createElement("thead");
      const thr = document.createElement("tr");
      ["Turma", "Posição da Fila Por Turma"].forEach((label, idx) => {
        const th = document.createElement("th");
        const alignment = idx === 1 ? "text-center" : "text-left";
        th.className = `border-b border-card/10 bg-muted/10 px-3 py-2 ${alignment} text-xs font-semibold text-muted-foreground`;
        th.innerText = label;
        thr.appendChild(th);
      });
      thead.appendChild(thr);
      table.appendChild(thead);

      const tbody = document.createElement("tbody");

      salas.forEach(([salaKey, salaPos], rowIndex) => {
        const tr = document.createElement("tr");
        tr.setAttribute("data-sala", salaKey);
        
        // allow dragging rows to reorder
        if (canEditFila) {
          tr.draggable = true;
          tr.ondragstart = (ev) => {
            ev.dataTransfer?.setData("text/sala", salaKey);
            tr.classList.add("opacity-50");
          };
          tr.ondragend = () => tr.classList.remove("opacity-50");
          tr.ondragover = (ev) => ev.preventDefault();
          tr.ondrop = (ev) => {
            ev.preventDefault();
            const srcSala = ev.dataTransfer?.getData("text/sala");
            if (!srcSala) return;
            
            // swap positions between source and target sala
            const srcRow = tbody.querySelector(`tr[data-sala='${srcSala}']`);
            if (!srcRow) return;
            
            const srcPosInput = srcRow.querySelector(".sala-pos");
            const tgtPosInput = tr.querySelector(".sala-pos");
            
            if (srcPosInput && tgtPosInput) {
              const a = srcPosInput.textContent || "";
              const b = tgtPosInput.textContent || "";
              srcPosInput.textContent = b;
              tgtPosInput.textContent = a;
              window.dispatchEvent(new CustomEvent("cardapio-changed", { detail: { swapped: true } }));
            }
          };
        }

        // Turma column
        const tdSala = document.createElement("td");
        tdSala.className = "border border-card/10 p-3 align-middle bg-white font-semibold";
        tdSala.innerText = String(rowIndex + 1);
        tr.appendChild(tdSala);

        // Position column
        const tdPos = document.createElement("td");
        tdPos.className = "border border-card/10 p-3 align-middle bg-white text-center";

        if (canEditFila) {
          const input = document.createElement("div");
          input.className = "sala-pos editable-cell px-2 py-1 rounded-md text-sm min-w-[60px] text-center bg-white hover:bg-muted/5";
          input.contentEditable = "true";
          input.innerText = salaPos;
          input.oninput = () => {
            window.dispatchEvent(new CustomEvent("cardapio-changed", { detail: { sala: salaKey } }));
          };
          tdPos.appendChild(input);
        } else {
          const span = document.createElement("div");
          span.className = "px-2 py-1 text-center";
          span.innerText = salaPos;
          tdPos.appendChild(span);
        }

        tr.appendChild(tdPos);
        tbody.appendChild(tr);
      });

      table.appendChild(tbody);
      tableWrap.appendChild(table);
      card.appendChild(tableWrap);
      container.appendChild(card);
    }

    function saveFilaFromTable(table: HTMLTableElement) {
      const rows: string[] = [];
      // tbody has rows with data-sala attribute; each row has 2 cells: Sala name, Position
      const tbody = table.querySelector("tbody");
      if (!tbody) return;
      
      Array.from(tbody.querySelectorAll("tr")).forEach((tr: Element) => {
        const tr_el = tr as HTMLTableRowElement;
        const sala = tr_el.getAttribute("data-sala") || "";
        const pos = (tr_el.cells[1]?.textContent || "").trim();
        if (sala) {
          rows.push(`${sala}, ${pos}`);
        }
      });
      localStorage.setItem("fila-geral", rows.join("\n"));
    }

    renderFilaTable(box);

    // listen for storage updates from other tabs
    function onStorage(e: StorageEvent) {
      if (!e.key) return;
      if (e.key === "fila-geral") {
        // rebuild the table when fila changes in other tabs
        renderFilaTable(box);
      } else {
        // any cell change -> rebuild grid
        const gridEl = document.getElementById("menu-grid");
        ensureGrid(gridEl);
      }
    }

    // listen for edits to mark unsaved
    function onChanged() {
      const ind = document.getElementById("unsaved-indicator");
      if (ind) ind.classList.remove("hidden");
    }

    window.addEventListener("cardapio-changed", onChanged as EventListener);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("cardapio-changed", onChanged as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  // dynamic load html2pdf from CDN then run
  async function downloadPDF() {
    if (!window.hasOwnProperty("html2pdf")) {
      await new Promise<void>((res, rej) => {
        const s = document.createElement("script");
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
        s.onload = () => res();
        s.onerror = () => rej();
        document.head.appendChild(s);
      });
    }
    // @ts-ignore
    if (window.html2pdf) {
      // limit to main area for nicer PDF
      const el = document.querySelector("main") || document.body;
      // @ts-ignore
      window.html2pdf().from(el).save("cardapio-iema.pdf");
    } else {
      window.print();
    }
  }

  function shareWhats() {
    // build text from grid + fila
    let text = "Cardápio IEMA\n\n";
    const grid = document.getElementById("menu-grid");
    if (grid) {
      // read rows: first row is headers
      const cells = Array.from(grid.querySelectorAll(".cell, .header-cell, .time-cell"));
      // crude formatting
      text += cells.map((c) => (c.textContent || "").trim()).join(" | ");
    }
    const fila = localStorage.getItem("fila-geral") || "";
    if (fila) text += `\n\nOrdem da Fila:\n${fila}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  return (
    <div>
      <LoginPrompt />
      <header className="relative mx-auto max-w-7xl px-4 py-12 md:py-20 rounded-3xl shadow mb-6 flex justify-between items-center bg-foreground/70">
        <h1 className="text-xl font-black">Admin - Cardápio IEMA — <span className="text-sm font-normal">{todayLabel}</span></h1>
        <div className="space-x-2">
          <button onClick={downloadPDF} className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90">Baixar PDF</button>
          <button onClick={shareWhats} className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-card/30 bg-transparent px-4 py-2 text-sm font-semibold text-card transition-colors hover:border-card/60 hover:bg-card/10">WhatsApp</button>
          <button
            id="save-menu-btn"
            onClick={() => {
              saveMenu();
              const ind = document.getElementById("unsaved-indicator");
              if (ind) ind.classList.add("hidden");
            }}
            disabled={!isLoggedIn() || !isWeekday()}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Salvar
          </button>
          <span id="unsaved-indicator" className="ml-2 text-sm font-semibold text-orange-600 hidden">Alterações não salvas</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 rounded-3xl shadow-xl">
        <div id="menu-grid" className="grid-menu" />
      </main>

      <section className="max-w-7xl mx-auto mt-6 bg-white p-6 rounded-3xl shadow-xl">
        <h2 className="text-lg font-black text-blue-800 mb-4">Ordem da Fila - Almoço</h2>
        <div id="fila-box" className="border-2 border-gray-300 rounded-xl p-4 bg-gray-50 whitespace-pre-line editable" />
      </section>

      <style>{`
        .grid-menu{
          display:grid;
          grid-template-columns:120px repeat(5,minmax(0,1fr));
          gap:0;
          border:2px solid rgba(0,0,0,0.06);
        }

        .cell{
          border-right:2px solid rgba(0,0,0,0.06);
          border-bottom:2px solid rgba(0,0,0,0.06);
          padding:10px;
          min-height:70px;
        }

        .header-cell{
          font-weight:900;
          text-align:center;
          background:linear-gradient(90deg, rgba(59,130,246,0.12), rgba(99,102,241,0.06));
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .time-cell{
          font-weight:bold;
          background:#f3f4f6;
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .editable{
          outline:none;
          width:100%;
          height:100%;
          white-space:pre-line;
        }

        @media (max-width: 1024px) {
          .grid-menu{ grid-template-columns:100px repeat(5,minmax(0,1fr)); }
          .cell{ min-height:64px; padding:8px; }
        }

        @media (max-width: 640px) {
          .grid-menu{ grid-template-columns:80px repeat(2,minmax(0,1fr)); overflow:auto; }
          .cell{ min-height:56px; padding:6px; }
          .header-cell{ font-size:0.85rem; }
        }
            .editable-cell:focus{
              outline:2px solid rgba(59,130,246,0.2);
              box-shadow:0 0 0 4px rgba(59,130,246,0.04);
            }
            .editable-cell{ min-height:30px; }
            .drag-placeholder{ background:rgba(59,130,246,0.04); border:2px dashed rgba(59,130,246,0.12); }
            tr.opacity-50{ opacity:0.5 }
      `}</style>
    </div>
  );
}
