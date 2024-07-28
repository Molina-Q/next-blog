import { db } from '@/lib/db'
import { saltAndHashPassword } from '@/lib/password'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    req: NextRequest
) {
    try {
        const { email, password } = await req.json();

        console.log("error somewhere");
        
        // Validate the input
        if (!email || !password) {
            return new NextResponse("Email and password are required", { status: 400 });
        }

        const hashedPassword = await saltAndHashPassword(password);

        const user = await db.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        })

        // Return the created user (excluding sensitive information like the password)
        return NextResponse.json(user);
    } catch (error) {
        console.error('Error in signup:', error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
