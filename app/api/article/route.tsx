
import { db } from '@/lib/db';
import { slugify } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
    req: NextRequest
) {
    try {
        const { id } = await req.json();

        const article = await db.article.delete({
            where: {  
                id: id
            }
        });

        return NextResponse.json(article);

    } catch (error) {
        console.log("error create Movie : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}