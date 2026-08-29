import axiosInstance from "@/configs/axios.config";

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
  const response = await axiosInstance.post<SignInResponse>("/auth/signin", data);

  return response.data;
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
  const response = await axiosInstance.get<CurrentUserResponse>("/auth/me");

  return response.data;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export async function logout(): Promise<LogoutResponse> {
  const response = await axiosInstance.post<LogoutResponse>("/auth/logout");

  return response.data;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface UpdatePasswordResponse {
  success: boolean;
  message: string;
}

export async function updatePassword(
  data: UpdatePasswordRequest
): Promise<UpdatePasswordResponse> {
  const response = await axiosInstance.patch<UpdatePasswordResponse>(
    "/auth/update-password",
    data
  );

  return response.data;
}