"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProjectMember,
  getDevelopers,
  getProjectMembers,
} from "@/api/project-member.api";
import "./add-member.css";

type AddMemberProps = {
  isOpen: boolean;
  onClose: () => void;
  projectId: number;
  projectName: string;
};

export default function AddMember({
  isOpen,
  onClose,
  projectId,
  projectName,
}: AddMemberProps) {
  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const {
    data: developersResponse,
    isLoading: developersLoading,
    error: developersError,
  } = useQuery({
    queryKey: ["developers"],
    queryFn: getDevelopers,
    enabled: isOpen,
  });

  const {
    data: membersResponse,
    isLoading: membersLoading,
  } = useQuery({
    queryKey: ["project-members", projectId],
    queryFn: () => getProjectMembers(projectId),
    enabled: isOpen,
  });

  const developers = useMemo(() => {
    return (developersResponse?.data ?? []).filter(
      (developer) =>
        String(developer.roleId) === "2" &&
        developer.isActive
    );
  }, [developersResponse]);

  const members = useMemo(() => {
    return membersResponse?.data ?? [];
  }, [membersResponse]);

  const availableDevelopers = useMemo(() => {
    const memberIds = new Set(
      members.map((member) => Number(member.userId))
    );

    const searchValue = search.trim().toLowerCase();

    return developers.filter((developer) => {
      if (memberIds.has(Number(developer.id))) {
        return false;
      }

      if (!searchValue) {
        return true;
      }

      return (
        developer.fullName.toLowerCase().includes(searchValue) ||
        developer.email.toLowerCase().includes(searchValue)
      );
    });
  }, [developers, members, search]);

  const addMemberMutation = useMutation({
    mutationFn: () => {
      if (selectedUserId === null) {
        throw new Error("Please select a developer");
      }

      return addProjectMember(projectId, {
        userId: selectedUserId,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project-members", projectId],
      });

      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      setSearch("");
      setSelectedUserId(null);
      onClose();
    },
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const getInitials = (name: string) => {
    if (!name) {
      return "DU";
    }

    return name
      .trim()
      .split(/\s+/)
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleClose = () => {
    if (addMemberMutation.isPending) {
      return;
    }

    setSearch("");
    setSelectedUserId(null);
    addMemberMutation.reset();
    onClose();
  };

  const handleSubmit = () => {
    if (
      selectedUserId === null ||
      addMemberMutation.isPending
    ) {
      return;
    }

    addMemberMutation.mutate();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">

        <div className="modal-header">

          <div>
            <h2 className="modal-title">
              Add Project Member
            </h2>

            <p className="modal-subtitle">
              Add a developer to {projectName}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="modal-close-btn"
            aria-label="Close"
          >
            ×
          </button>

        </div>

        <div className="modal-body">

          <div className="form-group">

            <label
              htmlFor="developer-search"
              className="form-label"
            >
              Search Developer
            </label>

            <input
              id="developer-search"
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setSelectedUserId(null);
              }}
              placeholder="Search developer by name or email"
              className="form-input"
              disabled={
                developersLoading ||
                membersLoading ||
                addMemberMutation.isPending
              }
            />

          </div>

          <div className="developer-section">

            <label className="form-label">
              Select Developer
            </label>

            <div className="developer-list">

              {developersLoading || membersLoading ? (

                <div className="developer-empty">
                  Loading developers...
                </div>

              ) : developersError ? (

                <div className="developer-error">
                  {developersError.message}
                </div>

              ) : availableDevelopers.length === 0 ? (

                <div className="developer-empty">
                  {search.trim()
                    ? "No developer found."
                    : "No developers available."}
                </div>

              ) : (

                availableDevelopers.map((developer) => {

                  const isSelected =
                    selectedUserId === Number(developer.id);

                  return (
                    <label
                      key={developer.id}
                      className={`developer-option ${
                        isSelected
                          ? "developer-option-selected"
                          : ""
                      }`}
                    >

                      <input
                        type="radio"
                        name="developer"
                        value={developer.id}
                        checked={isSelected}
                        onChange={() =>
                          setSelectedUserId(
                            Number(developer.id)
                          )
                        }
                        className="developer-radio-input"
                        disabled={addMemberMutation.isPending}
                      />

                      <div className="developer-avatar">
                        {getInitials(developer.fullName)}
                      </div>

                      <div className="developer-info">

                        <p className="developer-name">
                          {developer.fullName}
                        </p>

                        <p className="developer-email">
                          {developer.email}
                        </p>

                      </div>

                      <span
                        className={`developer-radio ${
                          isSelected
                            ? "developer-radio-selected"
                            : ""
                        }`}
                      >
                        {isSelected && (
                          <span className="developer-radio-dot" />
                        )}
                      </span>

                    </label>
                  );
                })

              )}

            </div>

          </div>

          {addMemberMutation.isError && (
            <p className="form-error">
              {addMemberMutation.error instanceof Error
                ? addMemberMutation.error.message
                : "Failed to add member"}
            </p>
          )}

        </div>

        <div className="modal-footer">

          <button
            type="button"
            onClick={handleClose}
            className="btn-cancel"
            disabled={addMemberMutation.isPending}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="btn-submit"
            disabled={
              selectedUserId === null ||
              addMemberMutation.isPending
            }
          >
            {addMemberMutation.isPending
              ? "Adding..."
              : "Add to Project"}
          </button>

        </div>

      </div>
    </div>
  );
}