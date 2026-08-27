"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn, getCurrentUser } from "../../api/auth.api";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/authSlice";
import { ADMIN, DEVELOPER } from "../../contants/role.constant"; // Double-check spelling of "constants"
import { Eye, EyeOff } from "lucide-react";
import "./signin.css";

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: async () => {
      // signin response has no user data — must fetch it separately
      const currentUserResult = await getCurrentUser();
      dispatch(setUser(currentUserResult.data));

      const roleName = currentUserResult.data.role.name;

      if (roleName === ADMIN) {
        router.push("/admin/dashboard");
      } else if (roleName === DEVELOPER) {
        router.push("/developer/dashboard");
      } else {
        router.push("/");
      }
    },
  });

  const handleSignIn = (data: SignInFormValues) => {
    signInMutation.mutate(data);
  };

  return (
    <div className="signin-container">
      <div className="left-pane">
        <div>
          <h1 className="brand-title">TaskReview</h1>
          <p className="subtitle">Internal Engineering Task & Review System</p>
          <h2 className="headline">
            One source of truth for engineering work, from assignment to review.
          </h2>
          <ul className="feature-list">
            <li className="feature-item">
              <span className="check-icon">✓</span>
              <span className="feature-text">
                Ownership, deadlines and submissions visible and auditable across every project.
              </span>
            </li>
            <li className="feature-item">
              <span className="check-icon">✓</span>
              <span className="feature-text">
                Objective review scoring across six dimensions for every PR submission.
              </span>
            </li>
            <li className="feature-item">
              <span className="check-icon">✓</span>
              <span className="feature-text">
                Full task activity history and developer performance analytics.
              </span>
            </li>
          </ul>
        </div>
        <div className="footer-text">© 2026 Internal Engineering Platform</div>
      </div>

      <div className="right-pane">
        <div className="form-container">
          <h2 className="form-title">Sign in</h2>
          <p className="form-description">
            Access is provisioned by your Admin. No public sign-up.
          </p>

          <form className="form-wrapper" onSubmit={handleSubmit(handleSignIn)} noValidate>
            <div>
              <label className="input-label">Email</label>
              <input
                type="email"
                placeholder="arijit.ganguly@company.com"
                className="text-input"
                {...register("email")}
              />
              {errors.email && <p className="signin-error">{errors.email.message}</p>}
            </div>

            <div>
              <label className="input-label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  className="text-input pr-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="signin-error">{errors.password.message}</p>}
            </div>

            {signInMutation.isError && (
              <p className="signin-error">{signInMutation.error.message}</p>
            )}

            <button type="submit" className="submit-button" disabled={signInMutation.isPending}>
              {signInMutation.isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="divider-container">
            <div className="divider-line-wrapper">
              <div className="divider-line"></div>
            </div>
            <div className="divider-text-wrapper">
              <span className="divider-text">Need Access</span>
            </div>
          </div>

          <p className="help-text">
            Forgot your password or don't have an account yet?
            <br />
            Contact your workspace Admin to get provisioned.
          </p>
        </div>
      </div>
    </div>
  );
}