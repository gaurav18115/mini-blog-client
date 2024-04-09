// pages/api/auth/[...nextauth].ts

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {NextApiHandler} from 'next';
import UserService from "@/services/UserService";

const isDevelopment = process.env.NODE_ENV === 'development';
console.log("Loading Auth for", isDevelopment ? 'Development' : 'Production');

const authHandler: NextApiHandler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials) {
                // Use your UserService to authenticate the user
                const user = await UserService.signin(credentials);
                if (user) {
                    return { ...user }; // Must return a user object
                } else {
                    throw new Error('Invalid username or password');
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // If user object exists, it means authentication was successful
            console.log("JWT Callback", user);
            if (user) {
                token.access_token = user.access_token; // Add the user's accessToken to the JWT
            }
            return token;
        },
        async session({ session, token }) {
            // Assign the accessToken from the JWT to the session
            console.log("Session Callback", token);
            session.access_token = token.access_token;
            return session;
        },
    },
});

export default authHandler;
