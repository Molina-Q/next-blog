import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const tag = await db.tag.findMany({});
        return NextResponse.json(tag);
    } catch (error) {

        console.error("TAG ERROR:", error);
        return new NextResponse("Article - Unknown Internal Server Error", { status: 500 });
    }
}