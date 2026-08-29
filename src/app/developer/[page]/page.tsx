"use client";

import { useParams } from "next/navigation";
import Dashboard from "../pages/dashboard";
import MyTask from "../pages/my-task";
import Performance from "../pages/performance";

type PageName =
  | "dashboard"
  | "my-tasks"
  | "performance";

export default function DeveloperDynamicPage() {
  const params = useParams();

  const page = params.page as PageName;

  switch (page) {
    case "my-tasks":
      return <MyTask />;

    case "performance":
      return <Performance />;

    case "dashboard":
    default:
      return <Dashboard />;
  }
}