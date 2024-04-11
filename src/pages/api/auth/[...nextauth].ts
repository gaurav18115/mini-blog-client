// pages/api/auth/[...nextauth].ts

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {NextApiHandler} from 'next';
import UserService from "@/services/UserService";
import {jwtDecode} from "jwt-decode";

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
            if (user) {
                console.log('JWT Callback user', user);
                token.access_token = user.access_token; // Add the user's accessToken to the JWT
            } else {
                console.log('JWT Callback token', token);
            }
            return token;
        },
        async session({ session, token }) {
            // Assign the accessToken from the JWT to the session
            console.log("Session Callback token", token);
            session.access_token = token.access_token as string;

            // Decode jwt
            const decoded = jwtDecode(token.access_token as string);
            console.log("Session Callback decoded", decoded); // { sub: 'grao', exp: 1712853588 }

            // Check if expired
            const now = Date.now() / 1000;
            if (decoded.exp && decoded.exp < now) {
                console.log("Session Callback token expired");
                session.access_token = null;
                return session;
            }

            return session;
        },
    },
});

export default authHandler;
