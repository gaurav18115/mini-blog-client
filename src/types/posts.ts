
// Notification
export type Notification = {
    message: string;
    type: string;
}

// BlogPost

export type BlogPost = {
    id?: string;
    author_name?: string;
    title: string;
    content: string;
    category: string;
    status?: string;
    created_at?: string;
    updated_at?: string;
}
