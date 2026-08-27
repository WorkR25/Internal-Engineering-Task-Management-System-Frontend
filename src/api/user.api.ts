export interface CreateUserRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface CreateUserResponse {
  success: boolean;
  message: string;
  data: unknown;
}

export async function createUser(
  data: CreateUserRequest
): Promise<CreateUserResponse> {
  const response = await fetch("/backend/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Failed to create developer account");
  }

  return result;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  roleId: string;
  isActive: boolean;
  mustChangePassword: boolean;
  createdAt: string;
  updatedAt: string;
}
export async function getAllUsers(): Promise<User[]> {
  const response = await fetch("/backend/users", {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Failed to fetch users");
  }

  return result.data;
}