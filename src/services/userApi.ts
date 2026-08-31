import axiosInstance from "@/configs/axios.config";

export interface CreateUserRequest {
  fullName: string;
  email: string;
  password: string;
  roleId: string;
}

export interface CreateUserResponse {
  success: boolean;
  message: string;
  data: unknown;
}

export async function createUser(
  data: CreateUserRequest
): Promise<CreateUserResponse> {
  const response = await axiosInstance.post<CreateUserResponse>(
    "/users",
    data
  );

  return response.data;
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

export interface GetAllUsersResponse {
  success: boolean;
  message: string;
  data: User[];
}

export async function getAllUsers(): Promise<User[]> {
  const response = await axiosInstance.get<GetAllUsersResponse>(
    "/users"
  );

  return response.data.data;
}

export interface UpdateUserRequest {
  fullName?: string;
  email?: string;
  password?: string;
}

export interface UpdateUserResponse {
  success: boolean;
  message: string;
  data: User;
}

export async function updateUser(
  userId: string,
  data: UpdateUserRequest
): Promise<UpdateUserResponse> {
  const response = await axiosInstance.patch<UpdateUserResponse>(
    `/users/${userId}`,
    data
  );

  return response.data;
}