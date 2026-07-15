import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NotFound() {
  const { isAuthenticated } = useAuth();

  return (
    <div
      className="qf-grid-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 24,
        background: "var(--qf-bg-deep)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(64px, 14vw, 120px)",
          fontWeight: 900,
          color: "var(--qf-cyan)",
          textShadow: "0 0 40px var(--qf-cyan-dim)",
          letterSpacing: 4,
          lineHeight: 1,
        }}
      >
        404
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          color: "var(--qf-text-muted)",
          letterSpacing: 2,
          marginTop: 16,
          marginBottom: 32,
        }}
      >
        SECTOR NOT FOUND — THIS ROUTE IS OUTSIDE THE PERIMETER
      </div>
      <Link
        to={isAuthenticated ? "/dashboard" : "/"}
        className="qf-btn qf-btn-primary"
        style={{ fontSize: 13 }}
      >
        {isAuthenticated ? "← RETURN TO DASHBOARD" : "← RETURN HOME"}
      </Link>
    </div>
  );
}
