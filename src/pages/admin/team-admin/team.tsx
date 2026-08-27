"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/admin-components/layout/sidebar";
import AddDeveloperModal from "@/components/admin-components/team-components/add_developer";
import { getAllUsers } from "@/api/user.api";
import styles from "./team.module.css";

type Developer = {
  id: string;
  initials: string;
  name: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";
  tasks: number;
  score: string;
  joined: string;
};

type Filter = "ALL" | "ACTIVE" | "INACTIVE";

const cx = (...classes: string[]) =>
  classes
    .map((className) => styles[className as keyof typeof styles])
    .filter(Boolean)
    .join(" ");

function DeveloperRow({ developer }: { developer: Developer }) {
  const isActive = developer.status === "ACTIVE";

  return (
    <tr className={cx("table-row")}>
      <td className={cx("table-cell")}>
        <div className={cx("dev-info-wrapper")}>
          <div
            className={cx(
              "dev-avatar",
              isActive ? "avatar-active" : "avatar-inactive"
            )}
          >
            {developer.initials}
          </div>

          <div className={cx("dev-text-wrapper")}>
            <p
              className={cx(
                "dev-name",
                isActive ? "name-active" : "name-inactive"
              )}
            >
              {developer.name}
            </p>

            <p className={cx("dev-email")}>{developer.email}</p>
          </div>
        </div>
      </td>

      <td className={cx("table-cell")}>
        <span
          className={cx(
            "status-badge",
            isActive ? "status-active" : "status-inactive"
          )}
        >
          {developer.status}
        </span>
      </td>

      <td className={cx("tasks-cell")}>{developer.tasks}</td>
      <td className={cx("score-cell")}>{developer.score}</td>
      <td className={cx("joined-cell")}>{developer.joined}</td>

      <td className={cx("table-cell-right")}>
        <button type="button" className={cx("btn-secondary")}>
          {isActive ? "Edit" : "Reactivate"}
        </button>
      </td>
    </tr>
  );
}

export default function TeamPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<Filter>("ALL");

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const filters: { label: string; value: Filter }[] = [
    { label: "All", value: "ALL" },
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
  ];

  const developers: Developer[] = users.map((user) => ({
    id: user.id,
    initials: user.fullName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    name: user.fullName,
    email: user.email,
    status: user.status === "ACTIVE" ? "ACTIVE" : "INACTIVE",
    tasks: 0,
    score: "-",
    joined: new Date(user.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  }));

  const filteredDevelopers = developers.filter((developer) => {
    if (selectedFilter === "ALL") {
      return true;
    }

    return developer.status === selectedFilter;
  });

  return (
    <div className={cx("team-container")}>
      <Sidebar activePage="team" onPageChange={() => {}} />

      <main className={cx("main-content")}>
        <header className={cx("header-section")}>
          <div>
            <h1 className={cx("page-title")}>Team</h1>

            <p className={cx("page-subtitle")}>
              {isLoading
                ? "Loading..."
                : `${developers.length} Developer accounts · managed by Admin`}
            </p>
          </div>

          <div className={cx("header-actions")}>
            <button
              type="button"
              className={cx("btn-primary")}
              onClick={() => setIsModalOpen(true)}
            >
              + Add Developer
            </button>

            <div className={cx("admin-badge-wrapper")}>
              <span className={cx("admin-role-text")}>ADMIN</span>
              <div className={cx("admin-avatar")}>AG</div>
            </div>
          </div>
        </header>

        <div className={cx("filters-wrapper")}>
          {filters.map((filter) => {
            const isSelected = selectedFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedFilter(filter.value)}
                className={cx(
                  isSelected
                    ? "filter-btn-active"
                    : "filter-btn-inactive"
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className={cx("table-container")}>
          <table className={cx("team-table")}>
            <thead>
              <tr className={cx("table-head-row")}>
                <th className={cx("table-head-cell")}>Developer</th>
                <th className={cx("table-head-cell")}>Status</th>
                <th className={cx("table-head-cell")}>Active Tasks</th>
                <th className={cx("table-head-cell")}>Avg Review Score</th>
                <th className={cx("table-head-cell")}>Joined</th>
                <th className={cx("table-cell-right")}></th>
              </tr>
            </thead>

            <tbody className={cx("table-body")}>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className={cx("table-cell")}>
                    Loading developers...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={6} className={cx("table-cell")}>
                    {error.message}
                  </td>
                </tr>
              ) : filteredDevelopers.length > 0 ? (
                filteredDevelopers.map((developer) => (
                  <DeveloperRow
                    key={developer.id}
                    developer={developer}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={cx("table-cell")}>
                    No developers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <AddDeveloperModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}