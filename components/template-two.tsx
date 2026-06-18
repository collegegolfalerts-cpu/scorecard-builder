"use client";

import { forwardRef } from "react";

interface TemplateProps {
  playerPhoto: string;
  playerName: string;
  school: string;
}

const C = {
  bg: "#1B3A2D",
  bgDeep: "#0f2219",
  cream: "#F5EDD8",
  creamMid: "rgba(245,237,216,0.55)",
  creamFaint: "rgba(245,237,216,0.22)",
};

const PHOTO_H = 395;

export const TemplateTwo = forwardRef<HTMLDivElement, TemplateProps>(
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
        }}
      >
        {/* Thin top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 28,
            background: C.bgDeep,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontSize: 7.5,
              color: C.creamFaint,
              letterSpacing: "0.28em",
            }}
          >
            NORTHEAST AMATEUR INVITATIONAL  ·  EST. 1962  ·  2026
          </div>
        </div>

        {/* Photo zone */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 0,
            right: 0,
            height: PHOTO_H,
            overflow: "hidden",
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
                background: `linear-gradient(160deg, #2A5040 0%, #1B3A2D 60%, #0f2219 100%)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: C.creamFaint,
                gap: 14,
              }}
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              >
                <rect x="4" y="4" width="40" height="40" rx="2" />
                <circle cx="17" cy="18" r="5" />
                <path d="M4 36 L16 24 L26 32 L34 22 L44 36" />
              </svg>
              <div
                style={{
                  fontFamily: "var(--font-oswald), sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                }}
              >
                UPLOAD PLAYER PHOTO
              </div>
            </div>
          )}

          {/* Bottom gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to bottom, transparent 30%, rgba(27,58,45,0.55) 65%, ${C.bg} 100%)`,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* NEA Logo — floating circle at junction */}
        <div
          style={{
            position: "absolute",
            top: 28 + PHOTO_H - 48,
            left: "50%",
            transform: "translateX(-50%)",
            width: 96,
            height: 96,
            borderRadius: "50%",
            background: C.cream,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `3px solid ${C.bg}`,
            boxShadow: "0 4px 24px rgba(0,0,0,0.45)",
            zIndex: 10,
            overflow: "hidden",
          }}
        >
          <img
            src="/nea-logo.png"
            alt="NEA"
            crossOrigin="anonymous"
            style={{ width: 88, height: 88, objectFit: "contain" }}
          />
        </div>

        {/* Text zone */}
        <div
          style={{
            position: "absolute",
            top: 28 + PHOTO_H + 54,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 44px 22px",
          }}
        >
          {/* SCHEDULED */}
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontWeight: 700,
              fontSize: 52,
              color: C.cream,
              letterSpacing: "0.08em",
              lineHeight: 1,
              textAlign: "center",
            }}
          >
            SCHEDULED
          </div>
          {/* TO APPEAR */}
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontWeight: 300,
              fontSize: 26,
              color: C.creamMid,
              letterSpacing: "0.3em",
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            TO APPEAR
          </div>

          {/* Divider */}
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              margin: "12px 0",
            }}
          >
            <div
              style={{ flex: 1, height: 1, background: C.creamMid }}
            />
            <div
              style={{
                width: 5,
                height: 5,
                background: C.creamMid,
                transform: "rotate(45deg)",
              }}
            />
            <div
              style={{ flex: 1, height: 1, background: C.creamMid }}
            />
          </div>

          {/* Player Name */}
          <div
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: 24,
              color: C.cream,
              letterSpacing: "0.04em",
              textAlign: "center",
            }}
          >
            {playerName}
          </div>
          <div
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontSize: 13,
              color: C.creamMid,
              marginTop: 4,
              textAlign: "center",
            }}
          >
            {school}
          </div>

          <div style={{ flex: 1 }} />

          {/* Footer */}
          <div
            style={{
              width: "100%",
              height: 1,
              background: C.creamFaint,
              marginBottom: 9,
            }}
          />
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontSize: 8,
              color: C.creamFaint,
              letterSpacing: "0.24em",
              textAlign: "center",
              lineHeight: 2,
            }}
          >
            <div>WANNAMOISETT COUNTRY CLUB  •  JUNE 22–27, 2026</div>
          </div>
        </div>
      </div>
    );
  }
);
TemplateTwo.displayName = "TemplateTwo";
