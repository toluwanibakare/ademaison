const API_BASE_URL = "http://localhost:5000/api";

export const getBlogs = async () => {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    return response.json();
};

export const getBlogBySlug = async (slug: string) => {
    const response = await fetch(`${API_BASE_URL}/blogs/${slug}`);
    return response.json();
};

export const createBlog = async (blogData: any) => {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
    });
    return response.json();
};

export const likeBlog = async (blogId: number) => {
    const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/like`, {
        method: "POST",
    });
    return response.json();
};

export const addComment = async (blogId: number, commentData: any) => {
    const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
    });
    return response.json();
};
