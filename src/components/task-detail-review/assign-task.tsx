"use client";

import { useState } from "react";

const developers = [
  { id: 1, name: "Karan Verma", role: "Backend", tasks: 6, initials: "KV" },
  { id: 2, name: "Neha Patil", role: "Backend", tasks: 3, initials: "NP" },
  { id: 3, name: "Rhea Sen", role: "Full-stack", tasks: 5, initials: "RS" },
  { id: 4, name: "Sahil Das", role: "Backend", tasks: 4, initials: "SD" },
];

export default function AssignTask() {
  const [selected, setSelected] = useState(2);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "370px",
        background: "#ffffff",
        border: "1px solid #e4e6eb",
        borderRadius: "10px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        overflow: "hidden",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "17px",
          borderBottom: "1px solid #e8e9ee",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "14px",
              color: "#172033",
            }}
          >
            Assign Task
          </h2>

          <p
            style={{
              margin: "4px 0 0",
              fontSize: "9px",
              color: "#7b8495",
            }}
          >
            Assign an active project member as the current owner
          </p>
        </div>

        <button
          style={{
            border: "none",
            background: "transparent",
            color: "#a0a7b4",
            fontSize: "20px",
            lineHeight: 1,
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </div>

      <div
        style={{
          margin: "15px 17px 13px",
          padding: "11px",
          border: "1px solid #e4e7ec",
          borderRadius: "8px",
          background: "#fafbfc",
        }}
      >
        <div
          style={{
            marginBottom: "6px",
            fontSize: "12px",
            fontWeight: 600,
            color: "#273044",
          }}
        >
          Add rate limiting to /auth/signin
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            flexWrap: "wrap",
            fontSize: "9px",
            color: "#70798a",
          }}
        >
          <span>Payments Platform</span>
          <span>·</span>
          <span>Due Dec 2, 2026</span>

          <b
            style={{
              marginLeft: "auto",
              padding: "4px 7px",
              borderRadius: "5px",
              background: "#fff3e3",
              color: "#d47b20",
              fontSize: "8px",
            }}
          >
            MEDIUM
          </b>

          <b
            style={{
              padding: "4px 7px",
              borderRadius: "5px",
              background: "#f0f1f4",
              color: "#687184",
              fontSize: "8px",
            }}
          >
            TODO
          </b>
        </div>
      </div>

      <div
        style={{
          margin: "0 17px 7px",
          fontSize: "9px",
          fontWeight: 600,
          color: "#4d5667",
        }}
      >
        Assign to
      </div>

      <div style={{ padding: "0 17px" }}>
        {developers.map((developer) => (
          <button
            key={developer.id}
            onClick={() => setSelected(developer.id)}
            style={{
              width: "100%",
              height: "43px",
              marginBottom: "6px",
              padding: "0 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border:
                selected === developer.id
                  ? "1px solid #756ef0"
                  : "1px solid #e2e5eb",
              borderRadius: "7px",
              background:
                selected === developer.id ? "#f8f7ff" : "#ffffff",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
              }}
            >
              <div
                style={{
                  width: "23px",
                  height: "23px",
                  borderRadius: "50%",
                  background: "#efefff",
                  color: "#5d57b7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "8px",
                  fontWeight: 700,
                }}
              >
                {developer.initials}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                }}
              >
                <strong
                  style={{
                    fontSize: "10px",
                    color: "#273044",
                  }}
                >
                  {developer.name}
                </strong>

                <span
                  style={{
                    fontSize: "8px",
                    color: "#7b8495",
                  }}
                >
                  {developer.role} · {developer.tasks} active tasks
                </span>
              </div>
            </div>

            <div
              style={{
                width: "13px",
                height: "13px",
                border:
                  selected === developer.id
                    ? "1.5px solid #625be0"
                    : "1.5px solid #d2d7df",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {selected === developer.id && (
                <div
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#625be0",
                  }}
                />
              )}
            </div>
          </button>
        ))}
      </div>

      <div
        style={{
          marginTop: "10px",
          padding: "13px 17px",
          borderTop: "1px solid #e8e9ee",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <span
          style={{
            fontSize: "7px",
            color: "#a0a7b4",
          }}
        >
          Only active members of this project are shown
        </span>

        <div
          style={{
            display: "flex",
            gap: "7px",
          }}
        >
          <button
            style={{
              padding: "7px 11px",
              borderRadius: "6px",
              fontSize: "9px",
              fontWeight: 600,
              cursor: "pointer",
              background: "#ffffff",
              border: "1px solid #dfe2e8",
              color: "#606979",
            }}
          >
            Cancel
          </button>

          <button
            style={{
              padding: "7px 11px",
              borderRadius: "6px",
              fontSize: "9px",
              fontWeight: 600,
              cursor: "pointer",
              background: "#5147d8",
              border: "1px solid #5147d8",
              color: "#ffffff",
            }}
          >
            Assign Task
          </button>
        </div>
      </div>
    </div>
  );
}