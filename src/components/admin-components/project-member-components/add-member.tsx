"use client";

import { useEffect, useState } from "react";
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
  const [selectedUserId, setSelectedUserId] = useState("");

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
    error: membersError,
  } = useQuery({
    queryKey: ["project-members", projectId],
    queryFn: () => getProjectMembers(projectId),
    enabled: isOpen && !!projectId,
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
        queryKey: ["projects"],
      });

      setSelectedUserId("");
      setSearch("");
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

  const members = membersResponse?.data || [];

  const developers =
    developersResponse?.data?.filter(
      (developer) =>
        developer.roleId === "2" &&
        developer.isActive !== false &&
        !members.some(
          (member) =>
            Number(member.userId) === Number(developer.id)
        )
    ) || [];

  const filteredDevelopers = developers.filter((developer) => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return true;
    }

    return (
      developer.fullName.toLowerCase().includes(searchValue) ||
      developer.email.toLowerCase().includes(searchValue)
    );
  });

  const handleClose = () => {
    setSelectedUserId("");
    setSearch("");
    addMemberMutation.reset();
    onClose();
  };

  const handleSubmit = () => {
    if (!selectedUserId) {
      return;
    }

    addMemberMutation.mutate();
  };

  const isLoading =
    developersLoading || membersLoading;

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
            aria-label="Close modal"
          >
            ×
          </button>

        </div>

        <div className="modal-body">

          <div className="form-group">

            <label className="form-label">
              Search Developer
            </label>

            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setSelectedUserId("");
              }}
              placeholder="Search by name or email"
              className="form-input"
              disabled={
                isLoading ||
                addMemberMutation.isPending
              }
            />

          </div>

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

              {filteredDevelopers.map((developer) => (
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

          {membersError && (
            <p className="text-sm text-red-600">
              {membersError.message}
            </p>
          )}

          {!isLoading &&
            !developersError &&
            !membersError &&
            filteredDevelopers.length === 0 && (
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