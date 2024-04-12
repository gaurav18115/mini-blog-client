import React, {useState} from "react";
import {BlogPost} from "@/types/posts";

interface EditablePostProps {
    blogPost: BlogPost;
    onSave: (postData: BlogPost) => void;
    onPublish: () => void;
}

const EditablePostComponent: React.FC<EditablePostProps> = ({blogPost, onSave, onPublish}) => {
    const [title, setTitle] = useState(blogPost.title);
    const [content, setContent] = useState(blogPost.content);
    const [category, setCategory] = useState(blogPost.category);

    const categories = ['General', 'Technology', 'Lifestyle', 'Travel', 'Finance']; // Add your actual categories here

    const handleOnSave = () => {
        onSave({title, content, category});
    };

    return (
        <div>
            <label className="text-md text-gray-200">Title</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <label className="text-md text-gray-200">Category</label>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            >
                {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
            <label className="text-md text-gray-200">Content</label>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
            />
            <button
                onClick={handleOnSave}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2"
            >
                Save as Draft
            </button>
            <button
                onClick={onPublish}
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
                Publish
            </button>
        </div>
    )
}

export default EditablePostComponent;