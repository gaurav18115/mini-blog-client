import "next-auth";

// This will allow you to use `user.access_token` in the JWT callback
declare module "next-auth" {
    interface User {
        access_token?: string;
    }

    // This will allow you to use `session.access_token` in your components
    interface Session {
        access_token?: string | null;
    }

    // Extending Token interface to include access_token
    interface Token {
        exp: number;
        iat: number;
        access_token?: string;
    }
}
