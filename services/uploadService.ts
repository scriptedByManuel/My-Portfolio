import { apiClient } from "@/lib/axios";

const uploadService = {
  uploadImage: async (formData: FormData): Promise<{ url: string }> => {
    const response = await apiClient.post<{ url: string }>(
      "/upload/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  },
};

export default uploadService;
