"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAllUsers } from "@/api/user.api";

type Task = {
  id?: number;
  title: string;
  priority: string;
  developer: string | null;
  deadline: string;
};

type AssignTaskProps = {
  open: boolean;
  task: Task | null;
  onClose: () => void;
  onAssigned?: (developerName: string) => void;
};

const assignTaskSchema = z.object({
  developerId: z
    .string()
    .min(1, "Please select a developer to assign this task."),
});

type AssignTaskFormValues = z.infer<typeof assignTaskSchema>;

export default function AssignTask({
  open,
  task,
  onClose,
  onAssigned,
}: AssignTaskProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<AssignTaskFormValues>({
    resolver: zodResolver(assignTaskSchema),
    defaultValues: {
      developerId: "",
    },
  });

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["developers"],
    queryFn: getAllUsers,
    enabled: open,
  });

  const developers = users.filter(
    (user) => user.isActive && user.roleId === "2"
  );

  useEffect(() => {
    if (open) {
      reset({
        developerId: "",
      });
    }
  }, [open, task, reset]);

  if (!open || !task) {
    return null;
  }

  const onSubmit = (data: AssignTaskFormValues) => {
    const selectedDeveloper = developers.find(
      (developer) => developer.id === data.developerId
    );

    if (!selectedDeveloper) {
      return;
    }

    onAssigned?.(selectedDeveloper.fullName);

    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="w-[370px] overflow-hidden rounded-[10px] border border-[#e4e6eb] bg-white font-sans shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        <div className="flex items-start justify-between border-b border-[#e8e9ee] px-[17px] py-[17px]">
          <div>
            <h2 className="text-[14px] text-[#172033]">
              Assign Task
            </h2>

            <p className="mt-1 text-[9px] text-[#7b8495]">
              Assign an active project member as the current owner
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer border-none bg-transparent text-[20px] leading-none text-[#a0a7b4] hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div className="mx-[17px] mb-[13px] mt-[15px] rounded-[8px] border border-[#e4e7ec] bg-[#fafbfc] p-[11px]">
          <div className="mb-[6px] text-[12px] font-semibold text-[#273044]">
            {task.title}
          </div>

          <div className="flex flex-wrap items-center gap-[5px] text-[9px] text-[#70798a]">
            <span>Payments Platform</span>
            <span>·</span>
            <span>Due {task.deadline}</span>

            <b className="ml-auto rounded-[5px] bg-[#fff3e3] px-[7px] py-1 text-[8px] text-[#d47b20]">
              {task.priority}
            </b>

            <b className="rounded-[5px] bg-[#f0f1f4] px-[7px] py-1 text-[8px] text-[#687184]">
              TODO
            </b>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-[17px] mb-[7px] text-[9px] font-semibold text-[#4d5667]">
            Assign to
          </div>

          {isLoading && (
            <div className="px-[17px] py-4 text-[9px] text-[#7b8495]">
              Loading developers...
            </div>
          )}

          {isError && (
            <p className="px-[17px] py-4 text-[9px] font-medium text-red-600">
              Failed to load developers.
            </p>
          )}

          {!isLoading && !isError && developers.length === 0 && (
            <p className="px-[17px] py-4 text-[9px] text-[#7b8495]">
              No active developers found.
            </p>
          )}

          {!isLoading && !isError && developers.length > 0 && (
            <Controller
              name="developerId"
              control={control}
              render={({ field }) => (
                <div className="px-[17px]">
                  {developers.map((developer) => {
                    const isSelected =
                      field.value === developer.id;

                    const initials = developer.fullName
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();

                    return (
                      <button
                        type="button"
                        key={developer.id}
                        onClick={() => field.onChange(developer.id)}
                        className={`mb-[6px] flex h-[43px] w-full cursor-pointer items-center justify-between rounded-[7px] border px-[10px] text-left ${
                          isSelected
                            ? "border-[#756ef0] bg-[#f8f7ff]"
                            : "border-[#e2e5eb] bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-[9px]">
                          <div className="flex h-[23px] w-[23px] items-center justify-center rounded-full bg-[#efefff] text-[8px] font-bold text-[#5d57b7]">
                            {initials}
                          </div>

                          <div className="flex flex-col gap-[2px]">
                            <strong className="text-[10px] text-[#273044]">
                              {developer.fullName}
                            </strong>

                            <span className="text-[8px] text-[#7b8495]">
                              Developer
                            </span>
                          </div>
                        </div>

                        <div
                          className={`flex h-[13px] w-[13px] items-center justify-center rounded-full border-[1.5px] ${
                            isSelected
                              ? "border-[#625be0]"
                              : "border-[#d2d7df]"
                          }`}
                        >
                          {isSelected && (
                            <div className="h-[7px] w-[7px] rounded-full bg-[#625be0]" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            />
          )}

          {errors.developerId && (
            <p className="mx-[17px] mb-[8px] text-[8px] font-medium text-red-600">
              {errors.developerId.message}
            </p>
          )}

          <div className="mt-[10px] flex items-center justify-between gap-[10px] border-t border-[#e8e9ee] px-[17px] py-[13px]">
            <span className="text-[7px] text-[#a0a7b4]">
              Only active members of this project are shown
            </span>

            {!isSubmitSuccessful ? (
              <div className="flex gap-[7px]">
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer rounded-[6px] border border-[#dfe2e8] bg-white px-[11px] py-[7px] text-[9px] font-semibold text-[#606979] hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={developers.length === 0}
                  className="cursor-pointer rounded-[6px] border border-[#5147d8] bg-[#5147d8] px-[11px] py-[7px] text-[9px] font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Assign Task
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                <span>✓</span>
                Task Assigned successfully
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}