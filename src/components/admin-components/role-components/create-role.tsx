"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createRole } from "../../../api/role.api";
import "./create-role.css";

const createRoleSchema = z.object({
  roleName: z
    .string()
    .trim()
    .min(1, "Role name is required")
    .min(3, "Role name must be at least 3 characters"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
});

type CreateRoleFormValues = z.infer<typeof createRoleSchema>;

interface CreateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateRoleModal({ isOpen, onClose }: CreateRoleModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateRoleFormValues>({
    resolver: zodResolver(createRoleSchema),
  });

  const createRoleMutation = useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        reset();
        onClose();
      }, 2000);
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

  if (!isOpen) return null;

  const handleCreateRole = (data: CreateRoleFormValues) => {
    createRoleMutation.mutate({
      name: data.roleName,
      description: data.description,
    });
  };

  const handleClose = () => {
    setIsSuccess(false);
    createRoleMutation.reset();
    reset();
    onClose();
  };

  return (
    <div className="create-role-overlay">
      <div className="create-role-card">

        <div className="create-role-header">
          <div className="create-role-header-content">
            <h1>Create New Role</h1>
            <p>Define permissions and access levels for your team</p>
          </div>
          <button onClick={handleClose} className="create-role-close">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {isSuccess ? (
          <div className="create-role-success">
            <div className="create-role-success-icon">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3>Role Created Successfully!</h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleCreateRole)} noValidate>
            <div className="create-role-form">
              <div className="create-role-field">
                <label>Role Name</label>
                <input
                  type="text"
                  placeholder="e.g. Lead Engineer"
                  aria-invalid={!!errors.roleName}
                  {...register("roleName")}
                />
                {errors.roleName && (
                  <p className="create-role-error">{errors.roleName.message}</p>
                )}
              </div>

              <div className="create-role-field-description">
                <label>Description</label>
                <textarea
                  placeholder="Briefly describe the responsibilities..."
                  rows={3}
                  aria-invalid={!!errors.description}
                  {...register("description")}
                />
                {errors.description && (
                  <p className="create-role-error">{errors.description.message}</p>
                )}
              </div>

              {createRoleMutation.isError && (
                <p className="create-role-error">
                  {createRoleMutation.error.message}
                </p>
              )}
            </div>

            <div className="create-role-footer">
              <div className="create-role-actions">
                <button type="button" onClick={handleClose} className="create-role-cancel">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createRoleMutation.isPending}
                  className="create-role-submit"
                >
                  {createRoleMutation.isPending ? "Creating..." : "Create Role"}
                </button>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}