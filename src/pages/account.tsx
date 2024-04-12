// pages/account.tsx

import {signIn, signOut, useSession} from 'next-auth/react';
import {jwtDecode} from 'jwt-decode';

import Image from 'next/image';
import React, {useEffect, useState} from 'react';

import {useRouter} from "next/router";
import UserService from "@/services/UserService";
import {useNotification} from "@/contexts/NotificationContext";
import BlogPostsGridComponent from "@/components/BlogPostsGridComponent";
import PostService from "@/services/PostService";
import {BlogPost} from "@/types/posts";

interface DecodedToken {
    exp?: number;
    iat?: number;
    sub?: string;
    // Include other fields as necessary.
}

interface AccountPageProps {

}

const AccountPage: React.FC<AccountPageProps> = ({}) => {
    const router = useRouter();
    const {data: session} = useSession();

    const {showNotification} = useNotification();

    const [email, setEmail] = useState('');
    const [userImage, setUserImage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [myPosts, setMyPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        if (session?.access_token) {
            console.log("Access Token:", session.access_token);
            // Here you can use session.accessToken to make authenticated requests

            const decoded = jwtDecode(session.access_token) as DecodedToken;
            if (decoded.exp && decoded.iat) {
                const remainingTime = decoded.exp - decoded.iat;
                console.log("Remaining Time:", remainingTime);
            }
            setUsername(decoded.sub || '');
            console.log("Decoded Token:", decoded);
        }

    }, [session]);

    useEffect(() => {
        // Get posts by user
        const getPosts = () => {
            PostService.getMyBlogPosts(session?.access_token).then((posts) => {
                console.log("My Posts:", posts);
                setMyPosts(posts || []);
            }).catch((error) => {
                if (error.response && error.response.status === 401) {
                    handleLogout();
                }
            });
        }

        getPosts();
    }, [session?.access_token]);

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

    const handleLogout = async () => {
        await signOut();
        router.reload();
    }

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
        let initials = username ? (username.split(' ').map(name => name[0].toUpperCase())).join('') : "";
        return (
            <main>
                <div className="flex flex-col items-center p-4">
                    <div className="flex justify-end items-center w-full mr-12">

                        {userImage ? (
                            <Image src={userImage} alt="User Profile Icon" className="rounded-full h-10 w-10"/>
                        ) : (
                            <div
                                className="rounded-full h-10 w-10 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 flex justify-center items-center">
                                <span>{initials}</span>
                            </div>
                        )}

                    </div>
                    <hr className="divider w-full border-b border-gray-400 my-4"/>
                </div>
                <div className="px-8 py-4">
                    <BlogPostsGridComponent posts={myPosts}/>
                </div>
            </main>
        );
    }

    // Signed In
    return (
        <main className="min-h-screen">
            {session && session.access_token ? (
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
