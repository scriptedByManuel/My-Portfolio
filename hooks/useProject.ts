"use client";

import useSWR from "swr";
import { apiClient } from "@/lib/axios";
import { ApiResponse } from "@/types/apiResponse";
import { Project } from "@/types/project";

const fetcher = async (url: string) => {
  const response = await apiClient.get<ApiResponse<Project>>(url);
  return response.data;
};

export const useProject = (slug: string | null) => {
  const { data, error, isLoading, mutate } = useSWR(
    slug ? `/projects/${slug}` : null,
    () => fetcher(`/projects/${slug}`),
  );

  return {
    project: data?.data ?? null,
    error,
    isLoading,
    mutate,
  };
};
