import { z } from "zod";

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  category: string;
  image: string;
  demo_link: string;
  github_link: string;
  createdAt: string;
  updatedAt: string;
}

export const projectFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title is too long"),
  description: z.string().min(1, "Description is required"),
  tags: z
    .array(z.string().min(1, "Tag cannot be empty"))
    .min(1, "At least one tag is required"),
  category: z.string().min(1, "Category is required"),
  image: z.string().optional(),
  demo_link: z
    .string()
    .min(1, "Demo link is required")
    .url("Invalid demo URL format"),
  github_link: z
    .string()
    .min(1, "GitHub link is required")
    .url("Invalid GitHub URL format"),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
