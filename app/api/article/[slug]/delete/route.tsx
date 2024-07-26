
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
    req: NextRequest, 
    { params }: { params: { slug: string } }
) {
    try {
        console.log("params : ", params.slug);

        const article = await db.article.delete({
            where: {
                slug: params.slug
            }
        });

        return NextResponse.json(article);

    } catch (error) {
        console.log("error delete article : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}