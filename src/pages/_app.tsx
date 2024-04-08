import '@/app/globals.css';
import React from "react";
import App, {AppContext, AppProps} from "next/app";

import Head from "next/head";
import Script from "next/script";

import {SessionProvider} from 'next-auth/react';


import Notification from "@/components/NotificationComponent";
import {NotificationProvider} from "@/contexts/NotificationContext";
import BackgroundBlurComponent from "@/components/BackgroundBlurComponent";

function MyApp({Component, pageProps}: AppProps) {
    const {
        title,
        description,
        keywords,
        ogTitle,
        ogDescription,
        ogImage,
        ogUrl,
        canonicalUrl
    } = pageProps;


    let author = 'miniblog.com';
    let ogType = 'website';
    let googleAnalyticsId = 'G-R7KOBE24SA';

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords}/>
                <meta name="author" content={author}/>

                {/*Open Graph Tags*/}
                <meta property="og:title" content={ogTitle}/>
                <meta property="og:description" content={ogDescription}/>
                <meta property="og:image" content={ogImage}/>
                <meta property="og:url" content={ogUrl}/>
                <meta property="og:type" content={ogType}/>

                {/*Canonical Tag*/}
                <link rel="canonical" href={canonicalUrl}/>


            </Head>
            {/* Google Analytics */}
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}></Script>
            <Script
                id="google-analytics-script"
                dangerouslySetInnerHTML={{
                    __html: `
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());

                          gtag('config', '${googleAnalyticsId}');
                        `,
                }}
            />
            <SessionProvider session={pageProps.session}>
                <NotificationProvider>
                    <Notification/>
                    <BackgroundBlurComponent />
                    <Component {...pageProps} />
                </NotificationProvider>
            </SessionProvider>
        </>
    );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);
    // Populate your pageProps with default or global values for your site here, if necessary
    return {...appProps};
}

export default MyApp;
