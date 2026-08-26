"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./assign-task.css";

const developers = [
  { id: 1, name: "Karan Verma", role: "Backend", tasks: 6, initials: "KV" },
  { id: 2, name: "Neha Patil", role: "Backend", tasks: 3, initials: "NP" },
  { id: 3, name: "Rhea Sen", role: "Full-stack", tasks: 5, initials: "RS" },
  { id: 4, name: "Sahil Das", role: "Backend", tasks: 4, initials: "SD" },
];

type Task = {
  title: string;
  priority: string;
  developer: string | null;
  deadline: string;
};

type AssignTaskProps = {
  open: boolean;
  task: Task | null;
  onClose: () => void;
};

// zod schema — developerId required (must select someone before submit)
const assignTaskSchema = z.object({
  developerId: z
    .number({ message: "Please select a developer to assign this task." })
    .min(1, "Please select a developer to assign this task."),
});

type AssignTaskFormValues = z.infer<typeof assignTaskSchema>;

export default function AssignTask({ open, task, onClose }: AssignTaskProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<AssignTaskFormValues>({
    resolver: zodResolver(assignTaskSchema),
    defaultValues: {
      developerId: undefined as unknown as number,
    },
  });

  // reset form state whenever the modal is (re)opened for a new task
  useEffect(() => {
    if (open) {
      reset({ developerId: undefined as unknown as number });
    }
  }, [open, task, reset]);

  if (!open || !task) return null;

  const onSubmit = (data: AssignTaskFormValues) => {
    // TODO: replace with real API call using data.developerId
    console.log("Assigning task to developer:", data.developerId);

    setTimeout(() => {
      onClose();
    }, 2200);
  };

  return (
    <div className="assign-task-modal">
      <div className="assign-task-header">
        <div>
          <h2 className="assign-task-title">Assign Task</h2>

          <p className="assign-task-subtitle">
            Assign an active project member as the current owner
          </p>
        </div>

        <button type="button" className="close-button" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="task-info">
        <div className="task-name">{task.title}</div>

        <div className="task-meta">
          <span>Payments Platform</span>
          <span>·</span>
          <span>Due {task.deadline}</span>

          <b className="priority-badge">{task.priority}</b>

          <b className="status-badge">TODO</b>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="assign-label">Assign to</div>

        <Controller
          name="developerId"
          control={control}
          render={({ field }) => (
            <div className="developer-list">
              {developers.map((developer) => {
                const isSelected = field.value === developer.id;

                return (
                  <button
                    type="button"
                    key={developer.id}
                    onClick={() => field.onChange(developer.id)}
                    className={`developer-button ${
                      isSelected ? "developer-button-selected" : ""
                    }`}
                  >
                    <div className="developer-info">
                      <div className="developer-avatar">
                        {developer.initials}
                      </div>

                      <div className="developer-details">
                        <strong className="developer-name">
                          {developer.name}
                        </strong>

                        <span className="developer-role">
                          {developer.role} · {developer.tasks} active tasks
                        </span>
                      </div>
                    </div>

                    <div
                      className={`radio-button ${
                        isSelected ? "radio-button-selected" : ""
                      }`}
                    >
                      {isSelected && <div className="radio-dot" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        />

        {errors.developerId && (
          <p className="assign-error-message">{errors.developerId.message}</p>
        )}

        <div className="assign-task-footer">
          <span className="footer-note">
            Only active members of this project are shown
          </span>

          <div className="footer-actions">
            {!isSubmitSuccessful && (
              <>
                <button type="button" className="cancel-button" onClick={onClose}>
                  Cancel
                </button>

                <button type="submit" className="assign-button">
                  Assign Task
                </button>
              </>
            )}
          </div>

          {isSubmitSuccessful && (
            <div className="assign-success-message">
              <span>✓</span> Task Assigned successfully
            </div>
          )}
        </div>
      </form>
    </div>
  );
}