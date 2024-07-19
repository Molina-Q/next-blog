
import { db } from '@/lib/db';
import { slugify } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import React from 'react'


export async function POST(
    req: NextRequest, { params }: { params: { slug: string } }
) {
    try {
        const { title, content } = await req.json();
  

        const article = await db.article.update({
            where: {
                slug: params.slug
            },
            data: {
                title,
                content,
            }
        });

        return NextResponse.json(article);

    } catch (error) {
        console.log("error create Movie : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}