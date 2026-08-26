"use client";
import "./project-detail.css";

type Member = {
  initials: string;
  name: string;
  focus: string;
  joined: string;
};

type RecentTask = {
  title: string;
  status: string;
  assignee: string;
  statusColor: string;
};

type Project = {
  id: number;
  name: string;
  status: "ACTIVE" | "PLANNING" | "COMPLETED";
  openTasks: number;
  targetEnd: string;
  description: string;
  startDate: string;
  targetEndDate: string;
  createdBy: string;
  completed: number;
  inReview: number;
  members: Member[];
  recentTasks: RecentTask[];
};

type ProjectDetailProps = {
  project: Project;
  onBack: () => void;
};

export default function ProjectDetail({
  project,
  onBack,
}: ProjectDetailProps) {
  return (
    <div className="project-detail-container">

      {/* HEADER */}

      <div className="project-detail-header">

        <div>

          <button
            type="button"
            onClick={onBack}
            className="project-detail-back"
          >
            ← Back to Projects
          </button>

          <p className="project-detail-subtitle">
            Projects
          </p>

          <div className="project-detail-title-wrapper">

            <h1 className="project-detail-title">
              {project.name}
            </h1>

            <span className="project-detail-status">
              {project.status}
            </span>

          </div>

        </div>

        <div className="project-detail-actions">

          <button
            type="button"
            className="project-detail-secondary-button"
          >
            Edit Project
          </button>

          <button
            type="button"
            className="project-detail-primary-button"
          >
            + Add Member
          </button>

          <div className="project-detail-admin">

            <span>
              ADMIN
            </span>

            <div className="project-detail-avatar">
              AG
            </div>

          </div>

        </div>

      </div>

      {/* BODY */}

      <div className="project-detail-body">

        {/* PROJECT INFORMATION */}

        <div className="project-detail-meta-card">

          <p className="project-detail-description">
            {project.description}
          </p>

          <div className="project-detail-meta">

            <p>
              Started{" "}
              <span>
                {project.startDate}
              </span>
            </p>

            <p>
              Target End{" "}
              <span>
                {project.targetEndDate}
              </span>
            </p>

            <p>
              Created by{" "}
              <span>
                {project.createdBy}
              </span>
            </p>

          </div>

        </div>

        {/* STATS */}

        <div className="project-detail-stats">

          <div className="project-detail-stat-card">
            <h3>Open Tasks</h3>
            <p>{project.openTasks}</p>
          </div>

          <div className="project-detail-stat-card">
            <h3>In Review</h3>
            <p>{project.inReview}</p>
          </div>

          <div className="project-detail-stat-card">
            <h3>Completed</h3>
            <p>{project.completed}</p>
          </div>

          <div className="project-detail-stat-card">
            <h3>Members</h3>
            <p>{project.members.length}</p>
          </div>

        </div>

        {/* BOTTOM SECTION */}

        <div className="project-detail-bottom">

          {/* MEMBERS */}

          <div className="project-detail-table-card">

            <div className="project-detail-card-header">

              <h2>
                Members
              </h2>

              <p>
                {project.members.length} active · removal preserves
                membership history
              </p>

            </div>

            <table className="project-detail-members-table">

              <thead>

                <tr>
                  <th>Developer</th>
                  <th>Focus</th>
                  <th>Joined</th>
                  <th></th>
                </tr>

              </thead>

              <tbody>

                {project.members.map((member) => (

                  <tr key={member.name}>

                    <td>

                      <div className="project-detail-member">

                        <div className="project-detail-member-avatar">
                          {member.initials}
                        </div>

                        <span>
                          {member.name}
                        </span>

                      </div>

                    </td>

                    <td>
                      {member.focus}
                    </td>

                    <td>
                      {member.joined}
                    </td>

                    <td className="project-detail-remove-cell">

                      <button
                        type="button"
                        className="project-detail-remove-button"
                      >
                        Remove
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* RECENT TASKS */}

          <div className="project-detail-tasks-card">

            <div className="project-detail-card-header project-detail-card-header-flex">

              <div>

                <h2>
                  Recent Tasks
                </h2>

                <p>
                  Latest activity
                </p>

              </div>

              <button
                type="button"
                className="project-detail-outline-button"
              >
                Open Board
              </button>

            </div>

            <div className="project-detail-task-list">

              {project.recentTasks.length === 0 ? (

                <p className="project-detail-no-tasks">
                  No recent tasks.
                </p>

              ) : (

                project.recentTasks.map((task) => (

                  <div
                    key={task.title}
                    className="project-detail-task-item"
                  >

                    <p>
                      {task.title}
                    </p>

                    <div>

                      <span
                        className={`project-detail-task-status ${task.statusColor}`}
                      >
                        {task.status}
                      </span>

                      <span>
                        {task.assignee}
                      </span>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}