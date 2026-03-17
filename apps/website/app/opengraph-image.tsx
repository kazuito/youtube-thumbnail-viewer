import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const runtime = "edge";
export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1c1917 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        padding: "80px",
      }}
    >
      {/* YouTube-style icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "88px",
          height: "88px",
          borderRadius: "20px",
          background: "#ff0000",
          marginBottom: "40px",
          boxShadow: "0 0 40px rgba(255,0,0,0.3)",
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: "18px solid transparent",
            borderBottom: "18px solid transparent",
            borderLeft: "32px solid white",
            marginLeft: "8px",
          }}
        />
      </div>

      <h1
        style={{
          color: "white",
          fontSize: "68px",
          fontWeight: "bold",
          margin: "0 0 20px 0",
          letterSpacing: "-2px",
          textAlign: "center",
          lineHeight: 1.1,
        }}
      >
        {SITE_NAME}
      </h1>

      <p
        style={{
          color: "#a8a29e",
          fontSize: "28px",
          margin: "0 0 48px 0",
          textAlign: "center",
          maxWidth: "860px",
          lineHeight: 1.5,
        }}
      >
        {SITE_DESCRIPTION}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 28px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#78716c",
          fontSize: "20px",
        }}
      >
        Chrome Extension · Free
      </div>
    </div>,
    { ...size },
  );
}
