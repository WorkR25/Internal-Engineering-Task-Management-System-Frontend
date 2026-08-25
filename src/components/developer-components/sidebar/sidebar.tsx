"use client";

import Link from "next/link";

type PageName =
  | "dashboard"
  | "my-tasks"
  | "performance";

interface SidebarProps {
  activePage: PageName;
}

export default function Sidebar({
  activePage,
}: SidebarProps) {
  const navigation: {
    label: string;
    id: PageName;
    href: string;
  }[] = [
    {
      label: "Dashboard",
      id: "dashboard",
      href: "/",
    },
    {
      label: "My Tasks",
      id: "my-tasks",
      href: "#",
    },
    {
      label: "Performance",
      id: "performance",
      href: "/developer/performance-developer/performance",
    },
  ];

  return (
    <aside className="developer-sidebar">
      <div className="developer-sidebar-logo">
        <h1>TaskReview</h1>
      </div>

      <nav className="developer-sidebar-navigation">
        <div className="developer-sidebar-navigation-list">
          {navigation.map((item) => {
            const isActive = activePage === item.id;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`developer-sidebar-link ${
                  isActive
                    ? "developer-sidebar-link-active"
                    : ""
                }`}
              >
                <span className="developer-sidebar-dot">
                  •
                </span>

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="developer-sidebar-user">
        <div className="developer-sidebar-user-avatar">
          KV
        </div>

        <div>
          <p className="developer-sidebar-user-name">
            Karan Verma
          </p>

          <p className="developer-sidebar-user-role">
            DEVELOPER
          </p>
        </div>
      </div>
    </aside>
  );
}