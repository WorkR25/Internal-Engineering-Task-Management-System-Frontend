export interface CreateRoleRequest {
  name: string;
  description: string;
}

export interface CreateRoleResponse {
  success: boolean;
  message: string;
  data: unknown;
}

export async function createRole(
  data: CreateRoleRequest
): Promise<CreateRoleResponse> {
  const response = await fetch("/backend/roles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Failed to create role");
  }

  return result;
}