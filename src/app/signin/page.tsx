"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getCurrentUser, signIn } from "@/services/authApi";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/authSlice";
import { ADMIN, DEVELOPER } from "@/constants/role.constant";
import { Eye, EyeOff } from "lucide-react";
import styles from "./page.module.css";

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
    <div className={styles.signinContainer}>
      <div className={styles.leftPane}>
        <div>
          <h1 className={styles.brandTitle}>TaskReview</h1>

          <p className={styles.subtitle}>
            Internal Engineering Task & Review System
          </p>

          <h2 className={styles.headline}>
            One source of truth for engineering work, from assignment to review.
          </h2>

          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>

              <span className={styles.featureText}>
                Ownership, deadlines and submissions visible and auditable across every project.
              </span>
            </li>

            <li className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>

              <span className={styles.featureText}>
                Objective review scoring across six dimensions for every PR submission.
              </span>
            </li>

            <li className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>

              <span className={styles.featureText}>
                Full task activity history and developer performance analytics.
              </span>
            </li>
          </ul>
        </div>

        <div className={styles.footerText}>
          © 2026 Internal Engineering Platform
        </div>
      </div>

      <div className={styles.rightPane}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Sign in</h2>

          <p className={styles.formDescription}>
            Access is provisioned by your Admin. No public sign-up.
          </p>

          <form
            className={styles.formWrapper}
            onSubmit={handleSubmit(handleSignIn)}
            noValidate
          >
            <div>
              <label className={styles.inputLabel}>
                Email
              </label>

              <input
                type="email"
                placeholder="arijit.ganguly@company.com"
                className={styles.textInput}
                {...register("email")}
              />

              {errors.email && (
                <p className={styles.signinError}>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className={styles.inputLabel}>
                Password
              </label>

              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  className={styles.textInput}
                  {...register("password")}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className={styles.passwordToggle}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className={styles.signinError}>
                  {errors.password.message}
                </p>
              )}
            </div>

            {signInMutation.isError && (
              <p className={styles.signinError}>
                {signInMutation.error.message}
              </p>
            )}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={signInMutation.isPending}
            >
              {signInMutation.isPending
                ? "Signing in..."
                : "Sign In"}
            </button>
          </form>

          <div className={styles.dividerContainer}>
            <div className={styles.dividerLineWrapper}>
              <div className={styles.dividerLine}></div>
            </div>

            <div className={styles.dividerTextWrapper}>
              <span className={styles.dividerText}>
                Need Access
              </span>
            </div>
          </div>

          <p className={styles.helpText}>
            Forgot your password or don&apos;t have an account yet?
            <br />
            Contact your workspace Admin to get provisioned.
          </p>
        </div>
      </div>
    </div>
  );
}