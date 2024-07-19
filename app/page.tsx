"use client"
import { formatDate } from "@/lib/utils";
import axios from "axios";
import { ar } from "date-fns/locale";
import Image from "next/image";
import { useEffect, useState } from "react";
import ArticleCard from "./_components/ArticleCard";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    axios.get("/api/article").then((res) => {
      setArticles(res.data);
    }).catch((error) => {
      console.error("ARTICLE", error);
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col  justify-between p-24 bg-slate-950">
      <h1 className="text-3xl font-semibold pb-10">Blog</h1>
      <div className="flex flex-col gap-7">
        {
          articles.map((article) => (
            <article className="border border-slate-600 p-4 rounded-md flex flex-col gap-4 hover:bg-slate-800" key={article.id}>
              <div>
                <h2 className="text-xl font-semibold">{article.title}</h2>
                <time className="text-sm font-light">{formatDate(article.createdAt)}</time>
              </div>

              <div className="line-clamp-2">{article.content}</div>

              <div className="flex flex-row gap-2">
                {article.tags.map((tag) => (
                  <span className="text-sm border border-slate-500 bg-slate-700 rounded-md px-3 py-[1px]" key={tag.tag.id}>{tag.tag.name}</span>
                ))}
              </div>

              <ArticleCard article={article} />
            </article>
          ))
        }
      </div>
    </main>
  );
}
