"use client";

import { forwardRef } from "react";

interface TemplateProps {
  playerPhoto: string;
  playerName: string;
  school: string;
}

const C = {
  bg: "#1B3A2D",
  bgDeep: "#132a1f",
  cream: "#F5EDD8",
  creamMid: "rgba(245,237,216,0.55)",
  creamFaint: "rgba(245,237,216,0.22)",
  creamGhost: "rgba(245,237,216,0.1)",
  gold: "#C4973A",
};

function DiamondDivider() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        margin: "9px 0",
      }}
    >
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(to right, transparent, ${C.creamMid})`,
        }}
      />
      <div
        style={{
          width: 6,
          height: 6,
          background: C.creamMid,
          transform: "rotate(45deg)",
          flexShrink: 0,
        }}
      />
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(to left, transparent, ${C.creamMid})`,
        }}
      />
    </div>
  );
}

function Corner({
  top,
  left,
  right,
  bottom,
}: {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        width: 20,
        height: 20,
        borderTop: top !== undefined ? `1.5px solid ${C.creamMid}` : undefined,
        borderBottom:
          bottom !== undefined ? `1.5px solid ${C.creamMid}` : undefined,
        borderLeft:
          left !== undefined ? `1.5px solid ${C.creamMid}` : undefined,
        borderRight:
          right !== undefined ? `1.5px solid ${C.creamMid}` : undefined,
        zIndex: 30,
      }}
    />
  );
}

export const TemplateOne = forwardRef<HTMLDivElement, TemplateProps>(
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
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 28px,
              rgba(255,255,255,0.012) 28px,
              rgba(255,255,255,0.012) 29px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 28px,
              rgba(255,255,255,0.012) 28px,
              rgba(255,255,255,0.012) 29px
            )
          `,
        }}
      >
        {/* Outer border */}
        <div
          style={{
            position: "absolute",
            inset: 10,
            border: `1.5px solid rgba(245,237,216,0.55)`,
            pointerEvents: "none",
            zIndex: 20,
          }}
        />
        {/* Inner border */}
        <div
          style={{
            position: "absolute",
            inset: 17,
            border: `1px solid rgba(245,237,216,0.18)`,
            pointerEvents: "none",
            zIndex: 20,
          }}
        />

        {/* Corner bracket ornaments (inside outer border) */}
        <Corner top={13} left={13} />
        <Corner top={13} right={13} />
        <Corner bottom={13} left={13} />
        <Corner bottom={13} right={13} />

        {/* Content */}
        <div
          style={{
            position: "absolute",
            top: 26,
            left: 26,
            right: 26,
            bottom: 26,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* NEA Logo */}
          <img
            src="/nea-logo.png"
            alt="NEA"
            crossOrigin="anonymous"
            style={{
              width: 70,
              height: 70,
              objectFit: "contain",
              flexShrink: 0,
            }}
          />

          {/* "NORTHEAST AMATEUR INVITATIONAL" below logo */}
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontSize: 8,
              color: C.creamFaint,
              letterSpacing: "0.28em",
              marginTop: 5,
              textAlign: "center",
            }}
          >
            NORTHEAST AMATEUR INVITATIONAL
          </div>

          <DiamondDivider />

          {/* Headline */}
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontWeight: 700,
              fontSize: 28,
              color: C.cream,
              letterSpacing: "0.18em",
              textAlign: "center",
              lineHeight: 1.05,
              flexShrink: 0,
            }}
          >
            SCHEDULED TO APPEAR
          </div>

          <DiamondDivider />

          {/* Photo */}
          <div
            style={{
              width: "100%",
              flex: 1,
              position: "relative",
              border: `1px solid ${C.creamFaint}`,
              overflow: "hidden",
              background: C.bgDeep,
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
                  color: C.creamGhost,
                  gap: 12,
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <rect x="4" y="4" width="40" height="40" rx="2" />
                  <circle cx="17" cy="18" r="5" />
                  <path d="M4 36 L16 24 L26 32 L34 22 L44 36" />
                </svg>
                <div
                  style={{
                    fontFamily: "var(--font-oswald), sans-serif",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                  }}
                >
                  PLAYER PHOTO
                </div>
              </div>
            )}
            {/* subtle bottom vignette on photo */}
            {playerPhoto && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(to bottom, transparent 70%, rgba(19,42,31,0.35) 100%)`,
                  pointerEvents: "none",
                }}
              />
            )}
          </div>

          {/* Player Name area */}
          <div
            style={{
              width: "100%",
              height: 1,
              background: C.creamMid,
              margin: "9px 0",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: 23,
              color: C.cream,
              letterSpacing: "0.04em",
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
              color: C.creamMid,
              marginTop: 3,
              textAlign: "center",
              flexShrink: 0,
            }}
          >
            {school}
          </div>

          {/* Footer */}
          <div
            style={{
              width: "100%",
              height: 1,
              background: C.creamFaint,
              margin: "9px 0",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            <div
              style={{ width: 24, height: 1, background: C.creamFaint }}
            />
            <div
              style={{
                fontFamily: "var(--font-oswald), sans-serif",
                fontSize: 8,
                color: C.creamFaint,
                letterSpacing: "0.22em",
                textAlign: "center",
                lineHeight: 1.9,
              }}
            >
              <div>WANNAMOISETT COUNTRY CLUB  •  JUNE 22–27, 2026</div>
            </div>
            <div
              style={{ width: 24, height: 1, background: C.creamFaint }}
            />
          </div>
        </div>
      </div>
    );
  }
);
TemplateOne.displayName = "TemplateOne";
