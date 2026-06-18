"use client";

import { forwardRef } from "react";

interface TemplateProps {
  playerPhoto: string;
  playerName: string;
  school: string;
}

const C = {
  bg: "#F5EDD8",
  bgAlt: "#EDE0C4",
  green: "#1B3A2D",
  greenMid: "rgba(27,58,45,0.55)",
  greenFaint: "rgba(27,58,45,0.22)",
  cream: "#F5EDD8",
  creamMid: "rgba(245,237,216,0.65)",
};

const BORDER = 15;
const HEADER_H = 72;
const FOOTER_H = 56;

function SmallDivider() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        margin: "7px 0",
      }}
    >
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(to right, transparent, ${C.greenMid})`,
        }}
      />
      <div
        style={{
          width: 5,
          height: 5,
          background: C.greenMid,
          transform: "rotate(45deg)",
          flexShrink: 0,
        }}
      />
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(to left, transparent, ${C.greenMid})`,
        }}
      />
    </div>
  );
}

export const TemplateThree = forwardRef<HTMLDivElement, TemplateProps>(
  ({ playerPhoto, playerName, school }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          width: 540,
          height: 720,
          background: C.bg,
          position: "relative",
          overflow: "hidden",
          userSelect: "none",
          backgroundImage: `radial-gradient(rgba(27,58,45,0.06) 1px, transparent 1px)`,
          backgroundSize: "18px 18px",
        }}
      >
        {/* Thick outer dark green border */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: `${BORDER}px solid ${C.green}`,
            pointerEvents: "none",
            zIndex: 20,
          }}
        />
        {/* Thin inner cream line inside border */}
        <div
          style={{
            position: "absolute",
            inset: BORDER + 4,
            border: `1px solid ${C.greenFaint}`,
            pointerEvents: "none",
            zIndex: 20,
          }}
        />

        {/* Header bar */}
        <div
          style={{
            position: "absolute",
            top: BORDER,
            left: BORDER,
            right: BORDER,
            height: HEADER_H,
            background: C.green,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontWeight: 600,
              fontSize: 11,
              color: C.cream,
              letterSpacing: "0.24em",
              textAlign: "center",
            }}
          >
            NORTHEAST AMATEUR INVITATIONAL
          </div>
          <div
            style={{ width: 50, height: 1, background: "rgba(245,237,216,0.3)" }}
          />
          <div
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontSize: 11,
              color: C.creamMid,
              letterSpacing: "0.15em",
            }}
          >
            Est. 1962
          </div>
        </div>

        {/* Footer bar */}
        <div
          style={{
            position: "absolute",
            bottom: BORDER,
            left: BORDER,
            right: BORDER,
            height: FOOTER_H,
            background: C.green,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontSize: 9,
              color: C.creamMid,
              letterSpacing: "0.24em",
              textAlign: "center",
              lineHeight: 1.9,
            }}
          >
            <div>WANNAMOISETT COUNTRY CLUB</div>
            <div>JUNE 22–27, 2026</div>
          </div>
        </div>

        {/* Inner content area */}
        <div
          style={{
            position: "absolute",
            top: BORDER + HEADER_H,
            bottom: BORDER + FOOTER_H,
            left: BORDER + 28,
            right: BORDER + 28,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "14px 0",
          }}
        >
          {/* Logo */}
          <img
            src="/nea-logo.png"
            alt="NEA"
            crossOrigin="anonymous"
            style={{
              width: 62,
              height: 62,
              objectFit: "contain",
              flexShrink: 0,
            }}
          />

          <SmallDivider />

          {/* SCHEDULED */}
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontWeight: 700,
              fontSize: 36,
              color: C.green,
              letterSpacing: "0.1em",
              lineHeight: 1,
              textAlign: "center",
              flexShrink: 0,
            }}
          >
            SCHEDULED
          </div>
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontWeight: 300,
              fontSize: 19,
              color: C.greenMid,
              letterSpacing: "0.3em",
              lineHeight: 1.2,
              textAlign: "center",
              flexShrink: 0,
            }}
          >
            TO APPEAR
          </div>

          <SmallDivider />

          {/* Photo */}
          <div
            style={{
              width: "100%",
              flex: 1,
              position: "relative",
              border: `2px solid ${C.green}`,
              overflow: "hidden",
              background: "#d5cab5",
              flexShrink: 1,
            }}
          >
            {playerPhoto ? (
              <img
                src={playerPhoto}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: C.greenFaint,
                  gap: 12,
                }}
              >
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <rect x="4" y="4" width="40" height="40" rx="2" />
                  <circle cx="17" cy="18" r="5" />
                  <path d="M4 36 L16 24 L26 32 L34 22 L44 36" />
                </svg>
                <div
                  style={{
                    fontFamily: "var(--font-oswald), sans-serif",
                    fontSize: 9,
                    letterSpacing: "0.18em",
                  }}
                >
                  PLAYER PHOTO
                </div>
              </div>
            )}
          </div>

          <SmallDivider />

          {/* Player Name */}
          <div
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: 22,
              color: C.green,
              letterSpacing: "0.03em",
              textAlign: "center",
              lineHeight: 1.15,
              flexShrink: 0,
            }}
          >
            {playerName}
          </div>
          <div
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontSize: 12,
              color: C.greenMid,
              marginTop: 3,
              textAlign: "center",
              flexShrink: 0,
            }}
          >
            {school}
          </div>
        </div>
      </div>
    );
  }
);
TemplateThree.displayName = "TemplateThree";
