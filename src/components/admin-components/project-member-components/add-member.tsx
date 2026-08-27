"use client";

import { useEffect, useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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
  const [selectedUserId, setSelectedUserId] = useState("");

  const queryClient = useQueryClient();

  const {
    data: developersResponse,
    isLoading: isDevelopersLoading,
    error: developersError,
  } = useQuery({
    queryKey: ["developers"],
    queryFn: getDevelopers,
    enabled: isOpen,
  });

  const {
    data: membersResponse,
    isLoading: isMembersLoading,
  } = useQuery({
    queryKey: ["project-members", projectId],
    queryFn: () => getProjectMembers(projectId),
    enabled: isOpen,
  });

  const addMemberMutation = useMutation({
    mutationFn: () =>
      addProjectMember(projectId, {
        userId: Number(selectedUserId),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project-members", projectId],
      });

      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });

      queryClient.invalidateQueries({
        queryKey: ["developers"],
      });

      setSelectedUserId("");
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

  useEffect(() => {
    if (!isOpen) {
      setSelectedUserId("");
      addMemberMutation.reset();
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const allUsers = developersResponse?.data || [];

  const currentMembers = membersResponse?.data || [];

  const memberUserIds = new Set(
    currentMembers.map((member) => Number(member.userId))
  );

  const developers = allUsers.filter((developer) => {
    const role =
      typeof developer.role === "string"
        ? developer.role
        : "";

    return (
      role.toUpperCase() === "DEVELOPER" &&
      !memberUserIds.has(Number(developer.id))
    );
  });

  const isLoading =
    isDevelopersLoading || isMembersLoading;

  const handleClose = () => {
    if (addMemberMutation.isPending) {
      return;
    }

    setSelectedUserId("");
    addMemberMutation.reset();
    onClose();
  };

  const handleSubmit = () => {
    if (!selectedUserId || addMemberMutation.isPending) {
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
              Add Member
            </h2>

            <p className="modal-subtitle">
              Add a developer to {projectName}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="modal-close-btn"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="modal-body">

          <div className="form-group">
            <label className="form-label">
              Select Developer
            </label>

            <select
              value={selectedUserId}
              onChange={(event) =>
                setSelectedUserId(event.target.value)
              }
              className="form-input"
              disabled={
                isLoading ||
                addMemberMutation.isPending
              }
            >
              <option value="">
                {isLoading
                  ? "Loading developers..."
                  : "Select developer"}
              </option>

              {developers.map((developer) => (
                <option
                  key={developer.id}
                  value={developer.id}
                >
                  {developer.fullName} ({developer.email})
                </option>
              ))}
            </select>
          </div>

          {developersError && (
            <p className="text-sm text-red-600">
              {developersError.message}
            </p>
          )}

          {!isLoading &&
            !developersError &&
            developers.length === 0 && (
              <p className="text-sm text-gray-500">
                No developers available.
              </p>
            )}

          {addMemberMutation.isError && (
            <p className="text-sm text-red-600">
              {addMemberMutation.error.message}
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
              !selectedUserId ||
              addMemberMutation.isPending ||
              isLoading
            }
          >
            {addMemberMutation.isPending
              ? "Adding..."
              : "Add Member"}
          </button>

        </div>

      </div>
    </div>
  );
}