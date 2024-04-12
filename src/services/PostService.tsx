import axios from 'axios';
import {setupCache} from 'axios-cache-interceptor';

import {POSTS_ENDPOINT} from '@/common/api';
import {BlogPost} from "@/types/posts";

const axiosCachedInstance = axios.create();
const isDevelopment = process.env.NODE_ENV === 'development';
const five_minutes = 1000 * 60 * 5;

setupCache(axiosCachedInstance, {
    ttl: isDevelopment ? 1000 : five_minutes,
});


const PostService = {

    async addNewBlogPost(newData: BlogPost, token: string): Promise<BlogPost | null> {
        try {
            const headers = {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            }
            const response = await axios.post(`${POSTS_ENDPOINT}`, newData, {
                headers,
            });
            return response.data as BlogPost;
        } catch (error) {
            console.error(`[BlogPostService.ts] Error creating new blog post: ${error}`);
            return null;
        }
    },

    async getMyBlogPosts(token: string | null | undefined, cache: boolean = true): Promise<BlogPost[] | null> {

        try {
            if (cache) {
                const headers = {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }
                const response = await axiosCachedInstance.get(`${POSTS_ENDPOINT}`, {
                    headers
                });
                return response.data as BlogPost[];
            } else {
                const response = await axios.get(`${POSTS_ENDPOINT}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data as BlogPost[];
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 401) {
                    console.error(`[BlogPostService.ts] Unauthorized request: ${error}`);
                    throw error;
                }
            }
            console.error(`[BlogPostService.ts] Error fetching blog posts: ${error}`);
            return null;
        }
    },

    async getBlogPost(id: string, cache: boolean = true): Promise<BlogPost | null> {
        try {
            if (cache) {
                const response = await axiosCachedInstance.get(`${POSTS_ENDPOINT}${id}`);
                return response.data as BlogPost;
            } else {
                const response = await axios.get(`${POSTS_ENDPOINT}/${id}`);
                return response.data as BlogPost;
            }
        } catch (error) {
            console.error(`[BlogPostService.ts] Error fetching blog posts for ID: ${id}: ${error}`);
            return null;
        }
    },

    async getTopBlogPosts(): Promise<BlogPost[] | null> {
        try {
            const response = await axiosCachedInstance.get(`${POSTS_ENDPOINT}top`);
            return response.data as BlogPost[];
        } catch (error) {
            console.error(`[BlogPostService.ts] Error fetching top blog posts: ${error}`);
            return null;
        }
    },

    async updateBlogPost(postId: string, updateData: BlogPost, token: string): Promise<BlogPost | null> {
        try {
            const headers = {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            }
            const response = await axios.put(`${POSTS_ENDPOINT}${postId}`, updateData, {
                headers
            });
            return response.data as BlogPost;
        } catch (error) {
            console.error(`[BlogPostListService.ts] Error updating blog posts for ID: ${postId}: ${error}`);
            return null;
        }
    },

    async publishBlogPost(postId: string, token: string): Promise<BlogPost | null> {
        try {
            const headers = {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            }
            const response = await axios.post(`${POSTS_ENDPOINT}${postId}/publish`, {}, {
                headers
            });
            return response.data as BlogPost;
        } catch (error) {
            console.error(`[BlogPostListService.ts] Error publishing blog posts for ID: ${postId}: ${error}`);
            return null;
        }
    },


    async searchBlogPosts(searchQuery: string): Promise<BlogPost[]> {
        try {
            const response = await axios.get(`${POSTS_ENDPOINT}search?query=${searchQuery}`);
            return response.data as BlogPost[];
        } catch (error) {
            console.error(`[BlogPostService.ts] Error searching blog posts:${error}`);
            return [];
        }
    },
};

export default PostService;
