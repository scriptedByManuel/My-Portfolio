"use client";

import useSWR from "swr";
import { apiClient } from "@/lib/axios";
import { ApiResponse } from "@/types/apiResponse";
import { Project } from "@/types/project";

const fetcher = async (url: string) => {
  const response = await apiClient.get<ApiResponse<Project[]>>(url);
  return response.data;
};

export const useProjects = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/projects",
    () => fetcher("/projects"),
    {
      revalidateOnFocus: true,
    },
  );

  return {
    projects: data?.data ?? [],
    error,
    isLoading,
    mutate,
  };
};
