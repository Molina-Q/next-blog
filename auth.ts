import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { saltAndHashPassword } from "./lib/password";
import { getUserFromDb } from "./lib/getUser";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
 
const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {  label: "email", type: "email" },
                password: { label: "password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    let user = null;

                    const { email, password } = await signInSchema.parseAsync(credentials);

                    // logic to salt and hash password
                    const pwHash = saltAndHashPassword(password);

                    // logic to verify if the user exists
                    user = await getUserFromDb(email, pwHash);

                    if (!user) {
                        // No user found, so this is their first attempt to login
                        // meaning this is also the place you could do registration
                        throw new Error("User not found.");
                    }
                    // return user object with their profile data
                    return user;
                } catch (error) {
                    if (error instanceof ZodError) {
                        // Return `null` to indicate that the credentials are invalid
                        console.log("ZodError", error.errors);
                        return null;
                    }
                    console.log("Error", error);
                    return null;
                }
            },
        }),
    ],
});