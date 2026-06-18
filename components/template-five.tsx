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
  creamFaint: "rgba(245,237,216,0.2)",
};

const PHOTO_H = 440;
const BAND_H = 72;
const BAND_Y = PHOTO_H - BAND_H;

export const TemplateFive = forwardRef<HTMLDivElement, TemplateProps>(
  ({ playerPhoto, playerName, school }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          width: 540,
          height: 720,
          background: C.bgDeep,
          position: "relative",
          overflow: "hidden",
          userSelect: "none",
        }}
      >
        {/* Photo zone */}
        <div
          style={{
            position: "absolute",
            top: 0,
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
                width="56"
                height="56"
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
                  fontSize: 9,
                  letterSpacing: "0.2em",
                }}
              >
                UPLOAD PLAYER PHOTO
              </div>
            </div>
          )}

          {/* Top vignette */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 120,
              background: `linear-gradient(to bottom, ${C.bgDeep}, transparent)`,
              pointerEvents: "none",
            }}
          />
          {/* Bottom vignette — feeds into the band */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 160,
              background: `linear-gradient(to bottom, transparent, rgba(15,34,25,0.7) 60%, ${C.bgDeep} 100%)`,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Dark green band across the middle */}
        <div
          style={{
            position: "absolute",
            top: BAND_Y,
            left: 0,
            right: 0,
            height: BAND_H,
            background: C.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5,
            borderTop: `1px solid rgba(245,237,216,0.12)`,
            borderBottom: `1px solid rgba(245,237,216,0.12)`,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontWeight: 700,
              fontSize: 30,
              color: C.cream,
              letterSpacing: "0.2em",
              textAlign: "center",
            }}
          >
            SCHEDULED TO APPEAR
          </div>
        </div>

        {/* NEA logo floating above the band */}
        <div
          style={{
            position: "absolute",
            top: BAND_Y - 38,
            right: 30,
            width: 76,
            height: 76,
            borderRadius: "50%",
            background: C.cream,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `3px solid ${C.bg}`,
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
            zIndex: 10,
            overflow: "hidden",
          }}
        >
          <img
            src="/nea-logo.png"
            alt="NEA"
            crossOrigin="anonymous"
            style={{ width: 68, height: 68, objectFit: "contain" }}
          />
        </div>

        {/* Top label */}
        <div
          style={{
            position: "absolute",
            top: 22,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 6,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontSize: 8,
              color: C.creamFaint,
              letterSpacing: "0.28em",
            }}
          >
            NORTHEAST AMATEUR INVITATIONAL  ·  2026
          </div>
        </div>

        {/* Bottom text area */}
        <div
          style={{
            position: "absolute",
            top: BAND_Y + BAND_H,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 40px",
            gap: 6,
          }}
        >
          {/* Divider */}
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 6,
            }}
          >
            <div style={{ flex: 1, height: 1, background: C.creamMid }} />
            <div
              style={{
                width: 5,
                height: 5,
                background: C.creamMid,
                transform: "rotate(45deg)",
              }}
            />
            <div style={{ flex: 1, height: 1, background: C.creamMid }} />
          </div>

          <div
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: 26,
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
              fontSize: 14,
              color: C.creamMid,
              textAlign: "center",
            }}
          >
            {school}
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 10,
            }}
          >
            <div style={{ flex: 1, height: 1, background: C.creamFaint }} />
          </div>

          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontSize: 8.5,
              color: C.creamFaint,
              letterSpacing: "0.22em",
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
TemplateFive.displayName = "TemplateFive";
