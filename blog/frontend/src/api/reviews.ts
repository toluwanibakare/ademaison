import { apiClient } from "./client";

export interface ReviewData {
  name: string;
  title: string;
  review: string;
  rating: number;
  email?: string; // optional
  consent_for_publication?: boolean;
}

export interface ReviewResponse {
  success: boolean;
  reviewId: number;
}

// Submit a new review
export const submitReview = (data: ReviewData) =>
  apiClient<ReviewResponse>("/api/reviews", {
    method: "POST",
    body: JSON.stringify(data),
  });

// Fetch published reviews (for displaying on the page)
export const getPublishedReviews = () =>
  apiClient<any[]>("/api/reviews", { method: "GET" });
