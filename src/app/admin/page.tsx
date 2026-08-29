"use client";

import { useSearchParams } from "next/navigation";

import Sidebar from "./components/sidebar";

import Dashboard from "./pages/dashboard";
import TaskBoard from "./pages/TaskBoard";
import TaskDetailReview from "./pages/task-detail-review";
import Reviews from "./pages/reviews";
import Team from "./pages/team";
import Performance from "./pages/performance";
import Projects from "./pages/project";

export default function AdminPage() {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "dashboard";

  const renderPage = () => {
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
        return <Projects />;

      case "dashboard":
      default:
        return <Dashboard />;
    }
  };

  return (
    <main className="min-h-screen">
      <Sidebar
        activePage={
          page as
            | "dashboard"
            | "task-board"
            | "task-detail-review"
            | "team"
            | "reviews"
            | "performance"
            | "projects"
        }
        onPageChange={() => {}}
      />

      <section className="ml-56 min-h-screen">
        {renderPage()}
      </section>
    </main>
  );
}