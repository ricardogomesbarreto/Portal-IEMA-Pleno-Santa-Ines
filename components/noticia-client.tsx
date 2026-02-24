"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getNewsList, getSiteConfig } from "../lib/admin-db";

export default function NoticiaClient() {
  const params = useSearchParams();
  const [item, setItem] = useState<any | null>(null);
  const [siteCfg, setSiteCfg] = useState<any>({});

  useEffect(() => {
    setSiteCfg(getSiteConfig());
    const id = params.get("id");
    if (!id) return;
    const list = getNewsList();
    const found = list.find((it: any) => String(it.id) === String(id));
    if (found) setItem(found);
  }, [params]);

  if (!item) {
    return (
      <div className="flex-1 flex items-center justify-center py-24">
        <div className="max-w-3xl mx-auto p-6 bg-card rounded-lg shadow">
          <h2 className="text-xl font-semibold">Notícia não encontrada</h2>
          <p className="mt-2 text-muted-foreground">A notícia solicitada não foi localizada.</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    const lines = (item.content || "").split(/\n\n|\r\n\r\n/);
    return lines.map((line: string, idx: number) => {
      const mImg = line.match(/\[IMAGEM:(https?:\/\/[^\]]+)\]/i);
      const mVid = line.match(/\[VIDEO:(https?:\/\/[^\]]+)\]/i);
      if (mImg) return (
        <div key={idx} className="mb-6">
          <img src={mImg[1]} alt="imagem" className="w-full rounded-md object-cover" />
        </div>
      );
      if (mVid) {
        const vid = mVid[1];
        const y = vid.match(/[?&]v=([\w-]+)/);
        const embed = y ? `https://www.youtube.com/embed/${y[1]}` : vid;
        return (
          <div key={idx} className="mb-6">
            <div className="aspect-video w-full rounded overflow-hidden">
              <iframe src={embed} title="video" frameBorder={0} allowFullScreen className="w-full h-full"></iframe>
            </div>
          </div>
        );
      }
      return <p key={idx} className="mb-4 leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: line.replace(/\n/g, '<br>') }} />;
    });
  };

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <article className="bg-card rounded-xl shadow-lg overflow-hidden">
          {item.imageUrl && (
            <div className="w-full h-64 sm:h-96 relative bg-gray-800">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="p-8 md:p-12">
            <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
              {item.category && <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs">{item.category}</span>}
              <time className="text-xs">{item.date}</time>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">{item.title}</h1>
            {item.subtitle && <p className="text-lg text-muted-foreground mb-6">{item.subtitle}</p>}

            <div className="prose max-w-none text-justify">{renderContent()}</div>

            <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Por <strong>{item.author || 'Desconhecido'}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <a href="/noticias" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">← Voltar às notícias</a>
                <a href={`/visualizador?id=${item.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-secondary">Abrir visualizador</a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
