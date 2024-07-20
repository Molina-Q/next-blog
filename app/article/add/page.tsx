"use client"

import RoundBtn from '@/components/RoundBtn';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const schema = z.object({
    title: z.string().min(3).max(50),
    content: z.string().min(10),
    checkedTags: z.array(z.string()),
});

type FormData = z.infer<typeof schema>;

const AddArticlePage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        content: '',
        checkedTags: [],
    });

    console.log(formData);

    const [tags, setTags] = useState<Tag[]>([]);

    const [response, setResponse] = useState<string | null>(null);

    const [stateResponse, setStateResponse] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

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
            axios.post('/api/article/add', formData).then((res) => {
                console.log(res.data);
                setResponse('Article added successfully');
                setStateResponse("bg-emerald-700");
            }).catch((error) => {
                console.error("ARTICLE", error);
                setStateResponse("bg-rose-950");
            });
            console.log(formData);

        } else {
            console.log(validationResult.error);
            setResponse('Invalid form data');
            setStateResponse("bg-rose-950");
        }
    };

    useEffect(() => {
        axios.get('/api/tag').then((res) => {
            setTags(res.data);
        }).catch((error) => {
            console.error("TAG", error);
        });
    }, []);

    return (
        <div className="container mx-auto flex flex-col gap-3">
            <h1 className="text-2xl font-bold mb-4">Add New Article</h1>
            <RoundBtn label={"Blog"} link={"/"} />
            {response && <div className={cn(stateResponse, 'mx-auto p-2 rounded-md')}>{response}</div>}
            <form onSubmit={handleSubmit}>
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
                    {
                        tags.map((tag) => (
                            <div className='flex flex-row gap-2' key={tag.id} >
                                <label htmlFor={tag.id} className="block font-bold mb-2">
                                    {tag.name}
                                </label>
                                <input onChange={handleCheckChange} type="checkbox" name="checkedTags" id={tag.id} value={tag.id} />
                            </div>
                        ))
                    }
                </div>

                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Add Article
                </button>
            </form>
        </div>
    );
};

export default AddArticlePage;