import { apiClient } from "./client";

export const getBlogs = async () => {
    return apiClient<any>("/api/blogs");
};

export const getBlogBySlug = async (slug: string) => {
    return apiClient<any>(`/api/blogs/${slug}`);
};

export const createBlog = async (blogData: any) => {
    return apiClient<any>("/api/blogs", {
        method: "POST",
        body: JSON.stringify(blogData),
    });
};

export const likeBlog = async (blogId: number) => {
    return apiClient<any>(`/api/blogs/${blogId}/like`, {
        method: "POST",
    });
};

export const addComment = async (blogId: number, commentData: any) => {
    return apiClient<any>(`/api/blogs/${blogId}/comments`, {
        method: "POST",
        body: JSON.stringify(commentData),
    });
};
