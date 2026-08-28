export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  success: boolean;
  message: string;
  data: null;
}

export async function signIn(data: SignInRequest): Promise<SignInResponse> {
  const response = await fetch("/backend/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Failed to sign in");
  }

  return result;
}

export interface Role {
  id: string;
  name: string;
  description: string;
}

export interface CurrentUser {
  id: string;
  fullName: string;
  email: string;
  role: Role;
}

export interface CurrentUserResponse {
  success: boolean;
  message: string;
  data: CurrentUser;
}

export async function getCurrentUser(): Promise<CurrentUserResponse> {
  const response = await fetch("/backend/auth/me", {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Failed to fetch current user");
  }

  return result;
}
export interface LogoutResponse {
  success: boolean;
  message: string;
}

export async function logout(): Promise<LogoutResponse> {
  const response = await fetch("/backend/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Failed to logout");
  }

  return result;
}