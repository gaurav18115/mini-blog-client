// pages/account.tsx

import {useSession} from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

import {useRouter} from "next/router";

interface AccountPageProps {

}

const AccountPage: React.FC<AccountPageProps> = ({}) => {
    const router = useRouter();

    const {data: session} = useSession();

    const handleLogoClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Redirect to the search page with the query
        router.push(`/`).then(() => {
            console.log('Routing to Dashboard');
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

                <div className="text-center">
                    <button
                        className="border border-blue-400 px-6 py-4 hover:bg-blue-50 rounded-xl inline-flex justify-center"
                        onClick={() => {
                        }}>
                    </button>
                </div>
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
