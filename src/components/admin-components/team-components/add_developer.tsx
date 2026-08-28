"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../../../api/user.api";
import "./add_developer.css";

const addDeveloperSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type AddDeveloperFormValues = z.infer<typeof addDeveloperSchema>;

interface AddDeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function generateTemporaryPassword() {
  const characters =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";

  const length = 12;
  let password = "";

  const values = new Uint32Array(length);
  crypto.getRandomValues(values);

  for (let index = 0; index < length; index++) {
    password += characters[values[index] % characters.length];
  }

  return password;
}

export default function AddDeveloperModal({
  isOpen,
  onClose,
}: AddDeveloperModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [tempPassword, setTempPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddDeveloperFormValues>({
    resolver: zodResolver(addDeveloperSchema),
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      setIsSuccess(true);

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["developers"],
      });

      setTimeout(() => {
        setIsSuccess(false);
        setShowPassword(false);
        setTempPassword("");
        reset();
        createUserMutation.reset();
        onClose();
      }, 3000);
    },
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTempPassword(generateTemporaryPassword());
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

  const handleCreateAccount = (data: AddDeveloperFormValues) => {
    createUserMutation.mutate({
      fullName: data.fullName,
      email: data.email,
      password: tempPassword,
    });
  };

  const handleClose = () => {
    setIsSuccess(false);
    setShowPassword(false);
    setTempPassword("");
    createUserMutation.reset();
    reset();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">

        <div className="modal-header">

          <div>
            <h2 className="modal-title">
              Add Developer
            </h2>

            <p className="modal-subtitle">
              There is no public sign-up — accounts are created by Admin only
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="modal-close-btn"
            aria-label="Close modal"
          >
            <svg
              className="modal-close-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

        </div>

        {isSuccess ? (

          <div className="success-container">

            <div className="success-icon-wrapper">

              <svg
                className="success-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>

            </div>

            <h3 className="success-title">
              Account Created Successfully!
            </h3>

            <p className="success-message">
              The developer account has been created successfully.
            </p>

          </div>

        ) : (

          <form onSubmit={handleSubmit(handleCreateAccount)}>

            <div className="modal-body">

              <div className="form-group">

                <label className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Priyanka Iyer"
                  className="form-input"
                  {...register("fullName")}
                />

                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.fullName.message}
                  </p>
                )}

              </div>

              <div className="form-group">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="priyanka.iyer@company.com"
                  className="form-input"
                  {...register("email")}
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}

              </div>

              <div className="form-group">

                <label className="form-label-dark">
                  Temporary Password
                </label>

                <div className="password-field-wrapper">

                  <input
                    type={showPassword ? "text" : "password"}
                    value={tempPassword}
                    readOnly
                    className="password-input"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="password-toggle"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (

                      <svg
                        className="password-toggle-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3l18 18M10.58 10.58A2 2 0 0113.42 13.42M9.88 5.09A9.77 9.77 0 0112 4.5c5.25 0 9.27 4.5 10.5 7.5a18.2 18.2 0 01-3.04 4.62M6.61 6.61C4.73 7.91 3.34 9.7 1.5 12c1.23 3 5.25 7.5 10.5 7.5 1.45 0 2.78-.27 3.96-.72"
                        />
                      </svg>

                    ) : (

                      <svg
                        className="password-toggle-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>

                    )}
                  </button>

                  <span className="password-badge">
                    Auto-generated
                  </span>

                </div>

              </div>

              <div className="info-box">

                <svg
                  className="info-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <p className="info-text">
                  The Developer must change this password on first
                  sign-in. It won't be shown again after this account
                  is created — share it securely.
                </p>

              </div>

              {createUserMutation.isError && (
                <p className="text-sm text-red-600">
                  {createUserMutation.error.message}
                </p>
              )}

            </div>

            <div className="modal-footer">

              <div className="footer-meta">
                Role: DEVELOPER · Status: Active
              </div>

              <div className="footer-actions">

                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-cancel"
                  disabled={createUserMutation.isPending}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    createUserMutation.isPending ||
                    !tempPassword
                  }
                  className="btn-submit"
                >
                  {createUserMutation.isPending
                    ? "Creating..."
                    : "Create Account"}
                </button>

              </div>

            </div>

          </form>

        )}

      </div>
    </div>
  );
}