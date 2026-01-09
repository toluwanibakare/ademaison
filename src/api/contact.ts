import { apiClient } from "./client";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  submissionId: number;
}

export const submitContactForm = (data: ContactFormData) =>
  apiClient<ContactResponse>("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
