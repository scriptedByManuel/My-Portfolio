import { apiClient } from "@/lib/axios";
import { ApiResponse } from "@/types/apiResponse";
import { Admin, LoginFormValues } from "@/types/auth";

const authService = {
  login: async (
    payload: LoginFormValues,
  ): Promise<{ message: string; admin: Admin }> => {
    const response = await apiClient.post<{ message: string; admin: Admin }>(
      "/auth/login",
      payload,
    );
    return response.data;
  },

  register: async (
    payload: LoginFormValues,
  ): Promise<{ message: string; admin: Admin }> => {
    const response = await apiClient.post<{ message: string; admin: Admin }>(
      "/auth/register",
      payload,
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.get("/auth/logout");
  },
};

export default authService;
