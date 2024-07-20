"use client"

import axios from 'axios';
import { title } from 'process';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const schema = z.object({
    title: z.string().min(3).max(50),
    content: z.string().min(10),
    checkedTags: z.array(z.string()),
});

type FormData = z.infer<typeof schema>;

export default function EditArticlePage({ params }: { params: { slug: string } }) {
    const [tags, setTags] = useState<Tag[]>([]);

    const [article, setArticle] = useState<Article>();

    const [formData, setFormData] = useState<FormData>({
        title: '',
        content: '',
        checkedTags: [''],
    });

    useEffect(() => {
        axios.get(`/api/article/${params.slug}`).then((res) => {
            setFormData({
                title: res.data.title,
                content: res.data.content,
                checkedTags: res.data.tags.map((tag: { tagId: Tag }) => tag.tagId)
            });
            setArticle(res.data);
        }).catch((error) => {
            console.error("ARTICLE", error);
        });

        axios.get('/api/tag').then((res) => {
            setTags(res.data);
        }).catch((error) => {
            console.error("TAG", error);
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

    const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            checkedTags: checked
                ? [...prev.checkedTags, value] // if true add the value to the array
                : prev.checkedTags.filter(tag => tag !== value) // if false remove using filter
        }));
    }

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

                <div>
                    {tags && article &&
                        tags.map((tag) => (
                            <div className='flex flex-row gap-2' key={tag.id} >
                                <label htmlFor={tag.id} className="block font-bold mb-2">
                                    {tag.name}
                                </label>
                                <input
                                    onChange={handleCheckChange}
                                    type="checkbox"
                                    name="checkedTags"
                                    id={tag.id}
                                    value={tag.id}
                                    checked={formData!.checkedTags.some(articleTag => articleTag === tag.id)}
                                />
                            </div>
                        ))
                    }
                </div>

                <button type="submit" className="bg-slate-500 hover:bg-sky-950 text-white font-bold py-2 px-4 rounded">
                    Edit Article
                </button>
            </form>
        </div>
    );
};