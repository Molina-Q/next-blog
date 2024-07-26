import { db } from '@/lib/db';
import { slugify } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    req: NextRequest
) {
    try {
        const { title, content, checkedTags } = await req.json();

        const article = await db.article.create({
            data: {
                title,
                content,
                slug: slugify(title),
            }
        });

        const tagArticles: unknown[] = [];
        {
            checkedTags.map(async (tag: string) => {
                const tagArticle = await db.tagArticle.create({
                    data: {
                        tagId: tag,
                        articleId: article.id,
                    }
                });
                tagArticles.push(tagArticle);
            })
        }

        return NextResponse.json([article, tagArticles]);

    } catch (error) {
        console.log("error create Movie : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}