"use client"

import Tags from '@/components/Tags';
import { formatDate } from '@/lib/utils';
import axios from 'axios'
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function articleDetails({ params }: { params: { slug: string } }) {
    const router = useRouter();

    const [article, setArticle] = React.useState<Article>();

    useEffect(() => {
        axios.get(`/api/article/${params.slug}`).then((res) => {
            setArticle(res.data);
        }).catch((error) => {
            console.error("ARTICLE", error);
        });
    }, [])

    const handleDelete = async (e: React.MouseEvent<HTMLParagraphElement>) => {
        axios.delete(`/api/article/${e.currentTarget.id}/delete`).then((res) => {
            console.log(res.data);
            router.push('/');
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className='flex flex-col justify-center mx-auto px-[15%] py-10'>
            {article &&
                <article className="p-4 rounded-md flex flex-col gap-4" key={article?.id}>
                    <div>
                        <h2 className="text-xl font-semibold">{article?.title}</h2>
                        <time className="text-sm font-light">{article?.createdAt && formatDate(article?.createdAt)}</time>
                        <p onClick={handleDelete} id={article.slug} className='cursor-pointer hover:underline w-fit'>Delete</p>
                    </div>

                    <div className="line-clamp-2">{article?.content}</div>

                    <Tags article={article!} />

                    <section className='divide-y-[1px]'>
                        {
                            article.comments.length === 0
                                ? <h3 className='text-lg font-semibold'>No comments yet</h3>
                                : article.comments.map((comment) => (
                                    <div key={comment.id} className="p-4 flex justify-between">
                                        <p>{comment.content}</p>
                                        <time className='text-sm'>{formatDate(comment.createdAt)}</time>
                                    </div>
                                ))

                        }
                    </section>
                </article>
            }
        </div>
    )
}