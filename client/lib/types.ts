export type DriveStatus = "active" | "completed" | "cancelled";

export type DonationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "COMPLETED"
  | "DELIVERED"
  | "IN_PROGRESS";

export type RequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "IN_PROGRESS"
  | "FULFILLED";

export type UserRole = "ADMIN" | "DONOR" | "RECIPIENT" | "LOGISTICS";

export interface UserSummary {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse extends UserSummary {
  token: string;
}

export interface Drive {
  id: number;
  title: string;
  location: string;
  itemsNeeded: string;
  status: DriveStatus;
}

export interface Donation {
  id: number;
  item: string;
  quantity: number;
  status: DonationStatus | string;
  date: string;
  donor?: Pick<UserSummary, "id" | "name">;
}

export interface RequestItem {
  id: number;
  item: string;
  quantityDescription: string;
  status: RequestStatus | string;
  eta?: string | null;
  recipient?: Pick<UserSummary, "id" | "name">;
}

export interface Feedback {
  id: number;
  rating: number;
  comment?: string;
  userId?: number;
}

export interface ApiErrorResponse {
  message?: string;
  validationErrors?: Record<string, string | undefined>;
}
