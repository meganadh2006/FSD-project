import type { DonationFormValues } from "@/components/DonationForm";
import type { DriveFormValues } from "@/components/DriveForm";
import type { FeedbackFormValues } from "@/components/FeedbackForm";
import type { RequestFormValues } from "@/components/RequestForm";
import type { UserFormValues } from "@/components/UserForm";
import type { ApiErrorResponse, Donation, Drive, Feedback, RequestItem, UserSummary } from "@/lib/types";

export const BASE_URL = import.meta.env.VITE_API_URL || "/api";

const getErrorMessage = (
  data: ApiErrorResponse | null,
  text: string,
  statusText: string,
) => {
  if (data?.message) {
    return data.message;
  }

  if (data?.validationErrors && typeof data.validationErrors === "object") {
    const validationMessages = Object.values(data.validationErrors).filter(Boolean);
    if (validationMessages.length > 0) {
      return validationMessages.join(", ");
    }
  }

  return text || statusText;
};

export const apiFetch = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  } catch {
    throw new Error(
      "Unable to reach the server. Make sure the backend is running and try again.",
    );
  }

  const text = await response.text();
  let data: T | null = null;

  try {
    data = text ? (JSON.parse(text) as T) : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    const errorMessage = getErrorMessage(
      data as ApiErrorResponse | null,
      text,
      response.statusText,
    );
    throw new Error(errorMessage);
  }

  return data as T;
};

export const drivesApi = {
  getAll: () => apiFetch<Drive[]>("/drives"),
  getById: (id: number) => apiFetch<Drive>(`/drives/${id}`),
  create: (data: DriveFormValues) =>
    apiFetch<Drive>("/drives", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: DriveFormValues) =>
    apiFetch<Drive>(`/drives/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiFetch<void>(`/drives/${id}`, { method: "DELETE" }),
};

export const donationsApi = {
  getAll: () => apiFetch<Donation[]>("/donations"),
  getById: (id: number) => apiFetch<Donation>(`/donations/${id}`),
  create: (data: DonationFormValues) =>
    apiFetch<Donation>("/donations", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: DonationFormValues) =>
    apiFetch<Donation>(`/donations/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiFetch<void>(`/donations/${id}`, { method: "DELETE" }),
  updateStatus: (id: number, status: string) =>
    apiFetch<Donation>(`/donations/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};

export const requestsApi = {
  getAll: () => apiFetch<RequestItem[]>("/requests"),
  getById: (id: number) => apiFetch<RequestItem>(`/requests/${id}`),
  create: (data: RequestFormValues & { recipient?: { id: number } }) =>
    apiFetch<RequestItem>("/requests", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: RequestFormValues) =>
    apiFetch<RequestItem>(`/requests/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiFetch<void>(`/requests/${id}`, { method: "DELETE" }),
  updateStatus: (id: number, status: string) =>
    apiFetch<RequestItem>(`/requests/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};

export const usersApi = {
  getAll: () => apiFetch<UserSummary[]>("/users"),
  getById: (id: number) => apiFetch<UserSummary>(`/users/${id}`),
  update: (id: number, data: UserFormValues) =>
    apiFetch<UserSummary>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: number) => apiFetch<void>(`/users/${id}`, { method: "DELETE" }),
};

export const feedbackApi = {
  getAll: () => apiFetch<Feedback[]>("/feedback"),
  create: (data: FeedbackFormValues & { userId?: number }) =>
    apiFetch<Feedback>("/feedback", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
