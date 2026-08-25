"use client";


import { useState } from "react";

const developers = [
  {
    id: 1,
    name: "Vikram Rao",
    role: "Backend",
    tasks: 2,
    joined: "joined team Jul 2026",
    initials: "VR",
  },
  {
    id: 2,
    name: "Ishita Malhotra",
    role: "QA",
    tasks: 1,
    joined: "joined team Aug 2026",
    initials: "IM",
  },
];
interface AddMemberProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddMember({ isOpen, onClose }: AddMemberProps) {
  const [selected, setSelected] = useState(1);
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  
  const filteredDevelopers = developers.filter((developer) =>
    developer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    
    <div 
    style={{
    position: "fixed",
    inset: 0,
    zIndex: 50,
    backgroundColor: "rgba(17, 24, 39, 0.4)", // Semi-transparent dark overlay
    backdropFilter: "blur(4px)", // This creates the actual blur effect
  }}
    >

    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "385px",
        background: "#ffffff",
        border: "1px solid #e4e6eb",
        borderRadius: "10px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        overflow: "hidden",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "16px 17px",
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
            Add Project Member
          </h2>

          <p
            style={{
              margin: "4px 0 0",
              fontSize: "9px",
              color: "#7b8495",
            }}
          >
            Payments Platform · showing active Developers not yet on this
            project
          </p>
        </div>

        <button
          onClick={onClose}
          style={{
            border: "none",
            background: "transparent",
            color: "#a0a7b4",
            fontSize: "18px",
            lineHeight: 1,
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </div>

      {/* Search */}
      <div
        style={{
          padding: "15px 17px 0",
        }}
      >
        <input
          type="text"
          placeholder="Search Developers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            height: "30px",
            boxSizing: "border-box",
            padding: "0 10px",
            border: "1px solid #dfe3ea",
            borderRadius: "6px",
            outline: "none",
            fontSize: "9px",
            color: "#273044",
          }}
        />
      </div>

      {/* Available Developers */}
      <div
        style={{
          margin: "11px 17px 7px",
          fontSize: "9px",
          fontWeight: 600,
          color: "#4d5667",
        }}
      >
        Available Developers
      </div>

      {/* Developer List */}
      <div style={{ padding: "0 17px" }}>
        {filteredDevelopers.map((developer) => (
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
            {/* Developer Information */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
              }}
            >
              {/* Initials */}
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

              {/* Name + Details */}
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
                  {developer.role} · {developer.tasks} active tasks ·{" "}
                  {developer.joined}
                </span>
              </div>
            </div>

            {/* Radio Button */}
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

        {filteredDevelopers.length === 0 && (
          <div
            style={{
              padding: "12px",
              textAlign: "center",
              fontSize: "9px",
              color: "#9aa1ae",
            }}
          >
            No developers found
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "10px",
          padding: "12px 17px",
          borderTop: "1px solid #e8e9ee",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        {/* Already Members */}
        <span
          style={{
            maxWidth: "205px",
            fontSize: "7px",
            lineHeight: "10px",
            color: "#a0a7b4",
          }}
        >
          Karan Verma, Sahil Das, Neha Patil, Rhea Sen
          <br />
          and Aman Thakur are already members
        </span>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "7px",
          }}
        >
          <button
            onClick={onClose}
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
            Add to Project
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}