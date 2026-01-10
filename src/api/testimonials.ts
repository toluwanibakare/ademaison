import { apiClient } from "./client";

export interface Testimonial {
  id: number;
  name: string;
  title: string;
  quote: string;
  rating: number;
  created_at: string;
}

export interface RatingSummary {
  totalReviews: number;
  averageRating: string;
}

export interface TestimonialSubmitData {
  name: string;
  title: string;
  review: string;
  rating: number;
}

export interface TestimonialsResponse {
  success: boolean;
  testimonials: Testimonial[];
}

export interface RatingSummaryResponse {
  success: boolean;
  summary: RatingSummary;
}

export interface SubmitResponse {
  success: boolean;
  message: string;
}

// Get all approved testimonials
export const getTestimonials = () =>
  apiClient<TestimonialsResponse>("/api/testimonials", { method: "GET" });

// Get rating summary
export const getRatingSummary = () =>
  apiClient<RatingSummaryResponse>("/api/testimonials/summary", { method: "GET" });

// Submit a new testimonial
export const submitTestimonial = (data: TestimonialSubmitData) =>
  apiClient<SubmitResponse>("/api/testimonials", {
    method: "POST",
    body: JSON.stringify(data),
  });
