"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ImagePlus, X, Loader2, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { projectFormSchema, ProjectFormValues, Project } from "@/types/project";
import projectService from "@/services/projectService";
import uploadService from "@/services/uploadService";

interface ProjectFormProps {
  mode: "create" | "edit";
  defaultValues?: Project;
}

export default function ProjectForm({ mode, defaultValues }: ProjectFormProps) {
  const router = useRouter();
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    defaultValues?.image ?? null,
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema) as never,
    defaultValues: defaultValues
      ? {
          title: defaultValues.title,
          description: defaultValues.description,
          tags: defaultValues.tags,
          category: defaultValues.category,
          image: defaultValues.image,
          demo_link: defaultValues.demo_link,
          github_link: defaultValues.github_link,
        }
      : {
          title: "",
          description: "",
          tags: [""],
          category: "",
          image: "",
          demo_link: "",
          github_link: "",
        },
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control: control as never,
    name: "tags" as never,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      let imageUrl = data.image;

      if (photoFile) {
        const imgFormData = new FormData();
        imgFormData.append("image", photoFile);
        const imgResponse = await uploadService.uploadImage(imgFormData);
        imageUrl = imgResponse.url;
      }

      if (!imageUrl) {
        toast.error("Please upload a project image");
        return;
      }

      const payload = { ...data, image: imageUrl };

      if (mode === "create") {
        await projectService.createProject(payload);
        toast.success("Project created successfully!");
      } else {
        await projectService.updateProject(defaultValues!._id, payload);
        toast.success("Project updated successfully!");
      }

      router.push("/admin/dashboard");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : `Failed to ${mode} project`;
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">
            {mode === "create" ? "Create Project" : "Edit Project"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Project Title</Label>
                  <Input
                    {...register("title")}
                    placeholder="e.g., TrendFlow E-Commerce App"
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    {...register("description")}
                    className="h-24"
                    placeholder="Describe your project..."
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    {...register("category")}
                    placeholder="e.g., E-Commerce, Dashboard, Full-Stack"
                  />
                  {errors.category && (
                    <p className="text-sm text-destructive">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Tags</CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendTag("")}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Tag
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {tagFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      {...register(`tags.${index}` as const)}
                      placeholder={`Tag ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTag(index)}
                      disabled={tagFields.length === 1}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                {errors.tags && (
                  <p className="text-sm text-destructive">
                    {errors.tags.message}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Demo Link</Label>
                  <Input
                    {...register("demo_link")}
                    placeholder="https://your-project.vercel.app"
                  />
                  {errors.demo_link && (
                    <p className="text-sm text-destructive">
                      {errors.demo_link.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>GitHub Link</Label>
                  <Input
                    {...register("github_link")}
                    placeholder="https://github.com/username/repo"
                  />
                  {errors.github_link && (
                    <p className="text-sm text-destructive">
                      {errors.github_link.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden bg-muted/30 group">
                  {previewImage ? (
                    <>
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          setPhotoFile(null);
                          setValue("image", "");
                        }}
                        className="absolute top-2 right-2 bg-destructive text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <Label
                      htmlFor="project-image"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <ImagePlus className="h-8 w-8 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Upload Image
                      </span>
                    </Label>
                  )}
                  <input
                    id="project-image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                {errors.image && (
                  <p className="text-sm text-destructive mt-2">
                    {errors.image.message}
                  </p>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {mode === "create" ? "Create Project" : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
