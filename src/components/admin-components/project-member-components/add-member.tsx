"use client";

import { useEffect, useState } from "react";

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

  // Later you can add more developers here
  // {
  //   id: 3,
  //   name: "Rahul Sharma",
  //   role: "Frontend",
  //   tasks: 3,
  //   joined: "joined team Aug 2026",
  //   initials: "RS",
  // },
];

interface AddMemberProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddMember({
  isOpen,
  onClose,
}: AddMemberProps) {
  const [selected, setSelected] = useState(1);
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  /*
   * Prevent background page from scrolling
   * when modal is open.
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /*
   * Don't render modal when closed.
   */
  if (!isOpen) {
    return null;
  }

  /*
   * Search developers
   */
  const filteredDevelopers = developers.filter((developer) =>
    developer.name.toLowerCase().includes(search.toLowerCase())
  );

  /*
   * Find selected developer
   */
  const selectedDeveloper = developers.find(
    (developer) => developer.id === selected
  );

  /*
   * Add developer to project
   */
  const handleAddToProject = () => {
    if (!selectedDeveloper) {
      return;
    }

    setSuccessMessage(
      `${selectedDeveloper.name} added to the project successfully.`
    );

    /*
     * Close modal after success message
     */
    setTimeout(() => {
      setSuccessMessage("");
      onClose();
    }, 1800);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,

        /*
         * Dark transparent background
         */
        backgroundColor: "rgba(17, 24, 39, 0.4)",

        /*
         * Blur background
         */
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",

        /*
         * Prevent background scrolling
         */
        overflow: "hidden",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        padding: "20px",

        boxSizing: "border-box",
      }}
    >
      {/* =========================
          MODAL
      ========================== */}

      <div
        style={{
          width: "385px",
          maxWidth: "100%",

          /*
           * Prevent modal from becoming taller
           * than the screen.
           */
          maxHeight: "calc(100vh - 40px)",

          background: "#ffffff",

          border: "1px solid #e4e6eb",

          borderRadius: "10px",

          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",

          overflow: "hidden",

          fontFamily: "Arial, Helvetica, sans-serif",

          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* =========================
            HEADER
        ========================== */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",

            padding: "16px 17px",

            borderBottom: "1px solid #e8e9ee",

            flexShrink: 0,
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,

                fontSize: "14px",

                fontWeight: 500,

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

                lineHeight: "13px",
              }}
            >
              Payments Platform · showing active Developers not yet on this
              project
            </p>
          </div>

          {/* Close button */}

          <button
            type="button"
            onClick={onClose}
            style={{
              border: "none",

              background: "transparent",

              color: "#a0a7b4",

              fontSize: "18px",

              lineHeight: 1,

              cursor: "pointer",

              padding: 0,

              width: "20px",

              height: "20px",
            }}
          >
            ×
          </button>
        </div>

        {/* =========================
            SEARCH
        ========================== */}

        <div
          style={{
            padding: "15px 17px 0",

            flexShrink: 0,
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

              background: "#ffffff",
            }}
          />
        </div>

        {/* =========================
            AVAILABLE DEVELOPERS TITLE
        ========================== */}

        <div
          style={{
            margin: "11px 17px 7px",

            fontSize: "9px",

            fontWeight: 600,

            color: "#4d5667",

            flexShrink: 0,
          }}
        >
          Available Developers
        </div>

        {/* =========================
            DEVELOPER LIST
            ONLY THIS AREA SCROLLS
        ========================== */}

        <div
          style={{
            margin: 0,

            padding: "0 17px",

            /*
             * Fixed height.
             * Even if there are 50 developers,
             * this area will remain fixed.
             */
            height: "180px",

            /*
             * Enable vertical scrolling
             */
            overflowY: "auto",

            overflowX: "hidden",

            /*
             * Prevent flexbox from shrinking
             */
            flexShrink: 0,

            /*
             * Firefox scrollbar
             */
            scrollbarWidth: "thin",

            scrollbarColor: "#c7c9d1 transparent",

            boxSizing: "border-box",
          }}
        >
          {filteredDevelopers.map((developer) => (
            <button
              type="button"
              key={developer.id}
              onClick={() => {
                setSelected(developer.id);

                /*
                 * Remove previous success message
                 * if another developer is selected.
                 */
                setSuccessMessage("");
              }}
              style={{
                width: "100%",

                height: "43px",

                minHeight: "43px",

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
                  selected === developer.id
                    ? "#f8f7ff"
                    : "#ffffff",

                cursor: "pointer",

                textAlign: "left",

                flexShrink: 0,

                boxSizing: "border-box",
              }}
            >
              {/* =========================
                  DEVELOPER INFO
              ========================== */}

              <div
                style={{
                  display: "flex",

                  alignItems: "center",

                  gap: "9px",

                  minWidth: 0,

                  overflow: "hidden",
                }}
              >
                {/* Initials */}

                <div
                  style={{
                    width: "23px",

                    height: "23px",

                    minWidth: "23px",

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

                    minWidth: 0,

                    overflow: "hidden",
                  }}
                >
                  <strong
                    style={{
                      fontSize: "10px",

                      color: "#273044",

                      fontWeight: 600,

                      whiteSpace: "nowrap",

                      overflow: "hidden",

                      textOverflow: "ellipsis",
                    }}
                  >
                    {developer.name}
                  </strong>

                  <span
                    style={{
                      fontSize: "8px",

                      color: "#7b8495",

                      whiteSpace: "nowrap",

                      overflow: "hidden",

                      textOverflow: "ellipsis",
                    }}
                  >
                    {developer.role} · {developer.tasks} active tasks ·{" "}
                    {developer.joined}
                  </span>
                </div>
              </div>

              {/* =========================
                  RADIO BUTTON
              ========================== */}

              <div
                style={{
                  width: "13px",

                  height: "13px",

                  minWidth: "13px",

                  border:
                    selected === developer.id
                      ? "1.5px solid #625be0"
                      : "1.5px solid #d2d7df",

                  borderRadius: "50%",

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  marginLeft: "8px",
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

          {/* No developers */}

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

        {/* =========================
            SUCCESS MESSAGE
        ========================== */}

        {successMessage && (
          <div
            style={{
              margin: "8px 17px 0",

              padding: "8px 10px",

              borderRadius: "6px",

              background: "#ecfdf3",

              border: "1px solid #bbf7d0",

              color: "#15803d",

              fontSize: "9px",

              fontWeight: 600,

              flexShrink: 0,
            }}
          >
            ✓ {successMessage}
          </div>
        )}

        {/* =========================
            FOOTER
        ========================== */}

        <div
          style={{
            marginTop: "10px",

            padding: "12px 17px",

            borderTop: "1px solid #e8e9ee",

            display: "flex",

            alignItems: "center",

            justifyContent: "space-between",

            gap: "10px",

            flexShrink: 0,
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

              flexShrink: 0,
            }}
          >
            {/* Cancel */}

            <button
              type="button"
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

                whiteSpace: "nowrap",
              }}
            >
              Cancel
            </button>

            {/* Add to Project */}

            <button
              type="button"
              onClick={handleAddToProject}
              disabled={!!successMessage}
              style={{
                padding: "7px 11px",

                borderRadius: "6px",

                fontSize: "9px",

                fontWeight: 600,

                cursor: successMessage
                  ? "default"
                  : "pointer",

                background: successMessage
                  ? "#9ca3af"
                  : "#5147d8",

                border: successMessage
                  ? "1px solid #9ca3af"
                  : "1px solid #5147d8",

                color: "#ffffff",

                whiteSpace: "nowrap",
              }}
            >
              {successMessage ? "Added ✓" : "Add to Project"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}