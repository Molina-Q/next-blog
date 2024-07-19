"use client"

import Tags from '@/components/Tags';
import { formatDate } from '@/lib/utils';
import axios from 'axios'
import React, { useEffect } from 'react'

export default function articleDetails({ params }: { params: { slug: string } }) {

    const [article, setArticle] = React.useState<Article>();

    useEffect(() => {
        axios.get(`/api/article/${params.slug}`).then((res) => {
            setArticle(res.data);
        }).catch((error) => {
            console.error("ARTICLE", error);
        });
    }, [])

    return (
        <div className='flex flex-col justify-center mx-auto px-[15%] py-10'>
            {article &&
                <article className="p-4 rounded-md flex flex-col gap-4" key={article?.id}>
                    <div>
                        <h2 className="text-xl font-semibold">{article?.title}</h2>
                        <time className="text-sm font-light">{article?.createdAt && formatDate(article?.createdAt)}</time>
                    </div>

                    <div className="line-clamp-2">{article?.content}</div>

                    <Tags article={article!} />

                    <section className='divide-y-[1px]'>
                        {
                            article?.comments.map((comment) => (
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