import { apiClient } from "@/lib/axios";
import { ApiResponse } from "@/types/apiResponse";
import { Project, ProjectFormValues } from "@/types/project";

const projectService = {
  getAllProjects: async (): Promise<ApiResponse<Project[]>> => {
    const response = await apiClient.get<ApiResponse<Project[]>>("/projects");
    return response.data;
  },

  getProjectBySlug: async (
    slug: string,
  ): Promise<ApiResponse<Project>> => {
    const response = await apiClient.get<ApiResponse<Project>>(
      `/projects/${slug}`,
    );
    return response.data;
  },

  createProject: async (
    payload: ProjectFormValues,
  ): Promise<ApiResponse<Project>> => {
    const response = await apiClient.post<ApiResponse<Project>>(
      "/projects",
      payload,
    );
    return response.data;
  },

  updateProject: async (
    id: string,
    payload: ProjectFormValues,
  ): Promise<ApiResponse<Project>> => {
    const response = await apiClient.put<ApiResponse<Project>>(
      `/projects/${id}`,
      payload,
    );
    return response.data;
  },

  deleteProject: async (id: string): Promise<ApiResponse<Project>> => {
    const response = await apiClient.delete<ApiResponse<Project>>(
      `/projects/${id}`,
    );
    return response.data;
  },
};

export default projectService;
