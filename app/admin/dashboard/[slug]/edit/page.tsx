"use client";

import { use } from "react";
import { useProject } from "@/hooks/useProject";
import ProjectForm from "@/components/admin/project-form";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const { project, isLoading, error } = useProject(slug);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="h-64 bg-muted animate-pulse rounded-lg" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load project</p>
      </div>
    );
  }

  return <ProjectForm mode="edit" defaultValues={project} />;
}
