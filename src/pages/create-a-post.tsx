import React, {useEffect, useState} from 'react';
import PostService from "@/services/PostService";
import {useSession} from "next-auth/react";
import {useNotification} from "@/contexts/NotificationContext";
import {useRouter} from "next/router";
import {BlogPost} from "@/types/posts";
import {jwtDecode} from "jwt-decode";
import EditablePostComponent from "@/components/EditablePostComponent";

interface CreatePostProps {
    blogPost: BlogPost;
}

const CreatePost: React.FC<CreatePostProps> = ({blogPost}) => {

    const {data: session} = useSession();
    const {showNotification} = useNotification();
    const router = useRouter();

    const [postId, setPostId] = useState('');

    useEffect(() => {
        if (session?.access_token) {
            const decodedToken = jwtDecode(session.access_token);
            if (decodedToken.sub !== blogPost.author_name) {
                showNotification('You are not the author of this post.', 'error');
                router.replace('/account').then(r => console.log('Redirecting to login'));
            }
        }
    });

    const onSave = (postData: BlogPost) => {
        if (session?.access_token) {
            PostService.addNewBlogPost(postData, session.access_token).then((response) => {
                console.log('Post updated:', response);
                if (response?.id)  setPostId(response?.id);
                showNotification('Post saved successfully.', 'success');
            });
        } else {
            showNotification('Please login to save the post.', 'error');
        }
        router.push('/account').then(r => console.log('Redirecting to login'));
    };

    const onPublish = () => {
        if (session?.access_token) {
            PostService.publishBlogPost(postId, session.access_token).then((response) => {
                console.log('Post published:', response);
            });
        } else {
            showNotification('Please login to publish the post.', 'error');
            router.push('/account').then(r => console.log('Redirecting to login'));
        }

    };

    return (
        <div className="min-h-screen max-w-4xl mx-auto p-5">
            <h1 className="text-2xl font-semibold mb-4">Create New Post</h1>

            <EditablePostComponent blogPost={blogPost} onSave={onSave} onPublish={onPublish} />
        </div>
    )

}

export async function getServerSideProps(ctx: { query: { postId: any; }; }) {

    return {
        props: {}
    };
}


export default CreatePost;