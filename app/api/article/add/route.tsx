
import { db } from '@/lib/db';
import { slugify } from '@/lib/utils';
import { NextResponse } from 'next/server';
import React from 'react'


export async function POST(
    req: Request
) {
    try {
        const { title, content } = await req.json();
  

        const article = await db.article.create({
            data: {
                title,
                content,
                slug: slugify(title),
            }
        });

        return NextResponse.json(article);

    } catch (error) {
        console.log("error create Movie : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}