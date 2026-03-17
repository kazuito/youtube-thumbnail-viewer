import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const runtime = "edge";
export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const iconData = await fetch(
    new URL("../public/icon.png", import.meta.url),
  ).then((res) => res.arrayBuffer());

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
      {/** biome-ignore lint/performance/noImgElement: We can't use Next.js Image component here */}
      <img
        src={iconData as unknown as string}
        width={120}
        height={120}
        style={{ marginBottom: "40px", borderRadius: "20px" }}
        alt=""
      />

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
          color: "#eee",
          fontSize: "20px",
        }}
      >
        Chrome Extension · Free
      </div>
    </div>,
    { ...size },
  );
}
