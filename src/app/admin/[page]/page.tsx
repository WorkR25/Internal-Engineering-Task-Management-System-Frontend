"use client";

import { use } from "react";
import Dashboard from "../pages/dashboard";
import TaskBoard from "../pages/TaskBoard";
import TaskDetailReview from "../pages/task-detail-review";
import Reviews from "../pages/reviews";
import Team from "../pages/team";
import Performance from "../pages/performance";
import Project from "../pages/project";

type PageName =
  | "dashboard"
  | "task-board"
  | "task-detail-review"
  | "reviews"
  | "team"
  | "performance"
  | "projects";

interface AdminPageProps {
  params: Promise<{
    page: PageName;
  }>;
}

export default function AdminPage({
  params,
}: AdminPageProps) {
  const { page } = use(params);

  switch (page) {
    case "task-board":
      return <TaskBoard />;

    case "task-detail-review":
      return <TaskDetailReview />;

    case "reviews":
      return <Reviews />;

    case "team":
      return <Team />;

    case "performance":
      return <Performance />;

    case "projects":
      return <Project />;

    case "dashboard":
    default:
      return <Dashboard />;
  }
}