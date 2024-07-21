"use client"
import Tags from "@/components/Tags";
import { formatDate } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {

    const handleDelete = async () => {
        axios.delete(`/api/article/${article.slug}/delete`).then((res) => {
            console.log(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <article className="border border-slate-600 p-4 rounded-md flex flex-col gap-4 hover:bg-slate-800" key={article.id}>
            <div>
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold">{article.title}</h2>
                    <div className="flex gap-4">
                        <Link href={`/article/${article.slug}/edit`}>
                            <p className="text-sm font-light">edit</p>
                        </Link>
                        <p onClick={handleDelete}>
                            <p className="text-sm font-black text-red-700">X</p>
                        </p>
                    </div>
                </div>
                <time className="text-sm font-light">{formatDate(article.createdAt)}</time>
            </div>

            <div className="line-clamp-2">{article.content}</div>

            <Tags article={article} />
        </article>
    )
}

export default ArticleCard;
