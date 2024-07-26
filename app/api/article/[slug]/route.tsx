import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    
    if (!params || typeof params.slug !== 'string') {
        console.error("Invalid or missing slug parameter");
        return new NextResponse("Invalid request: missing slug", { status: 400 });
    }

    try {
        const article = await db.article.findUnique({
            where: {
                slug: params.slug
            },
            include: {
                comments: {
                    include: {
                        user: true
                    }
                },
                tags: {
                    include: {
                        tag: true
                    }
                }
            }
        });

        if (!article) {
            console.log(`Article with slug '${params.slug}' not found.`);
            return new NextResponse("Article not found", { status: 404 });
        }
        
        return NextResponse.json(article);
    } catch (error) {
        console.error("ARTICLE ERROR:", error);

        if (error instanceof Error) {
            return new NextResponse(`Article - Internal Server Error: ${error.message}`, { status: 500 });
        }
        return new NextResponse("Article - Unknown Internal Server Error", { status: 500 });
    }
}