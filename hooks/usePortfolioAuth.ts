"use client";

import useSWR from "swr";
import { apiClient } from "@/lib/axios";
import { ApiResponse } from "@/types/apiResponse";
import { Admin } from "@/types/auth";

const fetcher = async (url: string) => {
  const response = await apiClient.get<ApiResponse<Admin>>(url);
  return response.data;
};

export const usePortfolioAuth = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/auth/me",
    () => fetcher("/auth/me"),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );

  const login = async (email: string, password: string) => {
    const response = await apiClient.post("/auth/login", { email, password });
    await mutate();
    return response.data;
  };

  const logout = async () => {
    await apiClient.get("/auth/logout");
    mutate(undefined, { revalidate: false });
  };

  return {
    admin: data?.data ?? null,
    error,
    isLoading,
    isAuthenticated: !!data?.data,
    login,
    logout,
    mutate,
  };
};
