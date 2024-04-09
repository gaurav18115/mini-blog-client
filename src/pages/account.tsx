// pages/account.tsx

import {signIn, useSession} from 'next-auth/react';

import Image from 'next/image';
import React, {useEffect, useState} from 'react';

import {useRouter} from "next/router";
import UserService from "@/services/UserService";
import {useNotification} from "@/contexts/NotificationContext";

interface AccountPageProps {

}

const AccountPage: React.FC<AccountPageProps> = ({}) => {
    const router = useRouter();
    const {data: session} = useSession();
    const {showNotification} = useNotification();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {

        if (session?.access_token) {
            console.log("Access Token:", session.access_token);
            // Here you can use session.accessToken to make authenticated requests
            // For example:
            // UserService.getUserProfile(session.accessToken).then(userProfile => {
            //     console.log(userProfile);
            // });
        }
    }, [session]);

    const handleLogoClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Redirect to the search page with the query
        router.push(`/`).then(() => {
            console.log('Routing to Dashboard');
        });
    };

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            redirect: false, // Prevents redirecting to another page
            username,
            password,
        });

        if (result?.error) {
            // Handle error
            showNotification(result.error, "error");
        } else {
            // Successfully signed in
            console.log("Login successful");
            // You might want to redirect the user or perform other actions
        }
    };

    const handleSignUp = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        UserService.signup({username, email, password}).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            console.log("Signup request completed");
        });
    };

    const whenUserIsNotLoggedIn = () => {
        return (
            <main className="flex flex-col justify-center items-center gap-8 mx-6">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Image
                            src="/miniblog-logo.png"
                            alt="Mini Blog Logo"
                            width={180}
                            height={37}
                            priority
                            onClick={handleLogoClick}
                        />
                    </div>
                    <p className="text-lg text-center">You need to be signed in to access this page.</p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <input
                        type="username"
                        placeholder="Username"
                        className="border border-gray-300 px-4 py-2 rounded-xl"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border border-gray-300 px-4 py-2 rounded-xl"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="border border-blue-400 px-6 py-2 hover:bg-blue-50 rounded-xl inline-flex justify-center"
                    >
                        Sign In
                    </button>
                    <a href="#forgot-password" className="text-center text-sm text-blue-600 hover:underline">
                        Forgot password?
                    </a>
                    <button
                        type="button"
                        onClick={handleSignUp}
                        className="border border-blue-400 px-6 py-2 mt-4 hover:bg-blue-50 rounded-xl inline-flex justify-center"
                    >
                        Sign Up
                    </button>
                </form>


            </main>
        );
    }


    const whenUserIsLoggedInUser = () => {
        return (
            <main className="bg-white">
                <div className="flex flex-col flex-grow gap-4 mb-12">


                </div>
            </main>
        );
    }


    // Signed In
    return (
        <main className="min-h-screen">
            {session && session.user ? (
                whenUserIsLoggedInUser()
            ) : (
                whenUserIsNotLoggedIn()
            )}
        </main>
    );
};

export async function getServerSideProps() {


    return {props: {}};
}

export default AccountPage;
