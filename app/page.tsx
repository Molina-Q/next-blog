"use client"
import { formatDate } from "@/lib/utils";
import axios from "axios";
import { ar } from "date-fns/locale";
import Image from "next/image";
import { useEffect, useState } from "react";
import ArticleCard from "./_components/ArticleCard";
import Link from "next/link";

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
          articles.map((article) =>
            <Link href={`/article/${article.slug}`} key={article.id}>
              <ArticleCard article={article} />
            </Link>
          )
        }
      </div>
    </main>
  );
}
