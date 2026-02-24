"use client";

import { useRef, useState } from "react";
import { isLoggedIn } from "../lib/admin-db";
import {
  GraduationCap,
  ShieldCheck,
  Upload,
  FileText,
  Download,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LoginPrompt from "./login-prompt";

const DEFAULT_PDF = "/cronograma-18-02-2026.pdf";

export function Cronograma() {
  // role is determined by login state; only logged-in gestores may edit
  const role = isLoggedIn() ? "gestor" : "aluno";
  const [pdfUrl, setPdfUrl] = useState(DEFAULT_PDF);
  const [fileName, setFileName] = useState("cronograma-18-02-2026.pdf");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || file.type !== "application/pdf") return;
    const url = URL.createObjectURL(file);
    setPdfUrl(url);
    setFileName(file.name);
  }

  return (
    <div className="flex flex-col gap-6">
      <LoginPrompt />
      {/* Controls bar */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Role indicator (login required for gestor actions) */}
          <div className="flex items-center gap-2 rounded-lg bg-muted p-1">
            <div className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground">
              <GraduationCap className="h-4 w-4" />
              Aluno
            </div>
            <div className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium ${role === "gestor" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
              <ShieldCheck className="h-4 w-4" />
              Gestor
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* File info */}
          <div className="flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4 shrink-0" />
            <span className="max-w-[200px] truncate">{fileName}</span>
          </div>

          {/* Download */}
          <Button variant="outline" size="sm" asChild className="bg-transparent">
            <a href={pdfUrl} download={fileName}>
              <Download className="mr-1.5 h-4 w-4" />
              Baixar
            </a>
          </Button>

          {/* Fullscreen */}
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent"
            onClick={() => window.open(pdfUrl, "_blank")}
          >
            <Maximize2 className="mr-1.5 h-4 w-4" />
            Tela cheia
          </Button>

          {/* Upload - gestor only (requires login) */}
          {role === "gestor" && isLoggedIn() && (
            <>
              <Button
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-1.5 h-4 w-4" />
                Substituir PDF
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                className="hidden"
                aria-label="Upload novo cronograma em PDF"
              />
            </>
          )}
        </div>
      </div>

      {/* PDF Frame */}
      <div className="overflow-hidden rounded-xl border-2 border-border bg-card shadow-sm">
        {/* Frame header */}
        <div className="flex items-center gap-3 border-b border-border bg-muted/40 px-5 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-destructive/60" />
            <span className="h-3 w-3 rounded-full bg-amber-400/60" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/60" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {fileName}
          </span>
        </div>

        {/* PDF embed */}
        <div className="relative w-full" style={{ height: "80vh", minHeight: "600px" }}>
          <object
            data={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
            type="application/pdf"
            className="h-full w-full"
            aria-label="Cronograma de Aulas"
          >
            {/* Fallback when browser blocks embedded PDF */}
            <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-muted/30 p-8 text-center">
              <div className="rounded-2xl border-2 border-dashed border-border p-8">
                <FileText className="mx-auto h-16 w-16 text-muted-foreground/50" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-semibold text-foreground">
                  Nao foi possivel exibir o PDF no navegador
                </p>
                <p className="text-sm text-muted-foreground">
                  Seu navegador bloqueou a visualizacao do PDF. Use os botoes abaixo para acessar o cronograma.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button asChild>
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                    <Maximize2 className="mr-1.5 h-4 w-4" />
                    Abrir PDF em nova aba
                  </a>
                </Button>
                <Button variant="outline" asChild className="bg-transparent">
                  <a href={pdfUrl} download={fileName}>
                    <Download className="mr-1.5 h-4 w-4" />
                    Baixar PDF
                  </a>
                </Button>
              </div>
            </div>
          </object>
        </div>
      </div>

      {/* Helper text */}
      <p className="text-center text-xs text-muted-foreground">
        {role === "gestor"
          ? "Como gestor, voce pode substituir o cronograma clicando em \"Substituir PDF\" acima."
          : "Consulte o cronograma acima. Para baixar, clique em \"Baixar\". Para ver em tela cheia, clique em \"Tela cheia\"."}
      </p>
    </div>
  );
}
