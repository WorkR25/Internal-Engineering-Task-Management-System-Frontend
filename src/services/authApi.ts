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