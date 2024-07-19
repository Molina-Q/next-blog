"use client"
import { formatDate } from "@/lib/utils";
import axios from "axios";
import { ar } from "date-fns/locale";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {

    return (

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

            <div className="flex flex-row gap-2">
                {article.tags.map((tag) => (
                    <span className="text-sm border border-slate-500 bg-slate-700 rounded-md px-3 py-[1px]" key={tag.tag.id}>{tag.tag.name}</span>
                ))}
            </div>
        </article>
    )
}

export default ArticleCard;
