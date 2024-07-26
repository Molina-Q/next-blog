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

// import { db } from '@/lib/db'
// import type { NextApiRequest, NextApiResponse } from 'next'

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     if (req.method !== 'POST') {
//         return res.status(400).json('Method not allowed')
//     }

//     try {
//         const { email, password } = req.body

//         // Validate the input
//         if (!email || !password) {
//             return res.status(400).json({ message: 'Email and password are required' })
//         }

//         // Create the user
//         const user = await db.user.create({
//             data: {
//                 email,
//                 password,
//             },
//         })


//         // Return the created user (excluding sensitive information like the password)
//         res.status(201).json({ user: { id: user.id, email: user.email } })
//     } catch (error) {
//         console.error('Error in signup:', error)
//         res.status(500).json({ message: 'Error creating user' })
//     }
// }