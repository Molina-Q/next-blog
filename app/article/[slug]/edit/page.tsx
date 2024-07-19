"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const schema = z.object({
    title: z.string().min(3).max(50),
    content: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

export default function EditArticlePage({ params }: { params: { slug: string } }) {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        content: '',
    });

    useEffect(() => {
        axios.get(`/api/article/${params.slug}`).then((res) => {
            setFormData(res.data);
        }).catch((error) => {
            console.error("ARTICLE", error);
        });
    }, []);

    const [response, setResponse] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationResult = schema.safeParse(formData);
        if (validationResult.success) {
            axios.post(`/api/article/${params.slug}/edit`, formData).then((res) => {
                console.log(res.data);
                setResponse('Article added successfully');
            }).catch((error) => {
                console.error("ARTICLE", error);
            });
            console.log(formData);

        } else {
            console.log(validationResult.error);
            setResponse('Invalid form data');
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
            <form onSubmit={handleSubmit}>
                {response && <div>{response}</div>}
                <div className="mb-4">
                    <label htmlFor="title" className="block font-bold mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className={`border rounded w-full py-2 px-3 bg-slate-800`}
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="content" className="block font-bold  mb-2">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        className={`border rounded w-full py-2 px-3 bg-slate-800 }`}
                        value={formData.content}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="bg-slate-500 hover:bg-sky-950 text-white font-bold py-2 px-4 rounded">
                    Edit Article
                </button>
            </form>
        </div>
    );
};