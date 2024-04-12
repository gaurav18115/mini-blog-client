import React from "react";
import {BlogPost} from "@/types/posts";
import Link from "next/link";

const BlogPostsGridComponent: React.FC<{ posts: BlogPost[] }> = ({posts}) => {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {posts.map((post) => (
                <Link href={`/edit-a-post/${post.id}`} key={post.id}>
                    <div key={post.id} className="rounded-lg border border-gray-200 p-5 shadow-md">
                        <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
                        <p className="mb-3 text-sm text-gray-500">{post.category} - {post.status}</p>
                        <p className="text-gray-700">{post.content}</p>
                        <div className="mt-4 text-sm text-gray-600">
                            <p>Author: {post.author_name}</p>
                            {post.created_at && (
                                <p>Created: {new Date(post.created_at).toLocaleDateString()}</p>
                            )}
                            {post.updated_at && (
                                <p>Updated: {new Date(post.updated_at).toLocaleDateString()}</p>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default BlogPostsGridComponent;
