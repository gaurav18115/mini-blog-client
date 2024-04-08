import React from "react";

interface BlogPost {
    title: string;
    status: string;
    content: string;
    category: string;
    author_name: string;
    id: string;
    created_at: string;
    updated_at: string;
}

const BlogPostsGridComponent: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {posts.map((post) => (
                <div key={post.id} className="rounded-lg border border-gray-200 p-5 shadow-md">
                    <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
                    <p className="mb-3 text-sm text-gray-500">{post.category} - {post.status}</p>
                    <p className="text-gray-700">{post.content}</p>
                    <div className="mt-4 text-sm text-gray-600">
                        <p>Author: {post.author_name}</p>
                        <p>Created: {new Date(post.created_at).toLocaleDateString()}</p>
                        <p>Updated: {new Date(post.updated_at).toLocaleDateString()}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogPostsGridComponent;
