
import { db } from '@/lib/db';
import { slugify } from '@/lib/utils';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import React from 'react'

interface TagArticleBasic {
    id: string;
    articleId: string;
    tagId: string;
  };

export async function POST(
    req: NextRequest, { params }: { params: { slug: string } }
) {
    try {
        const { title, content, checkedTags } = await req.json();

        const article = await db.article.update({
            where: {
                slug: params.slug
            },
            data: {
                title,
                content,
            }
        });

        const existingTagArticles = await db.tagArticle.findMany({
            where: {
                articleId: article.id
            }
        });

        // if the tag is only in the formData i need to add it
        const tagToAdd = checkedTags.filter((checkedTag: string) => {
            return !existingTagArticles.some((existingTag: TagArticleBasic) => (existingTag.tagId === checkedTag));
        });
        
        // if the tag is only in the database i need to delete it
        const tagToDelete = existingTagArticles.filter((existingTag: TagArticleBasic) => {
            return !checkedTags.some((checkedTag: string) => (existingTag.tagId === checkedTag));
        }); 

        const deletedTags = await Promise.all(tagToDelete.map(async (tagArticle: TagArticleBasic) => (
            db.tagArticle.delete({
                where: {
                    id: tagArticle.id
                }
            })
        )));

        const addedTags = await Promise.all(tagToAdd.map(async (tagId: string) => (
            db.tagArticle.create({
                data: {
                    articleId: article.id,
                    tagId
                }
            })
        )));

        return NextResponse.json([article, deletedTags, addedTags]);

    } catch (error) {
        console.log("error create Movie : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}