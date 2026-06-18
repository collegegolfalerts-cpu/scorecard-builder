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
  creamMid: "rgba(245,237,216,0.6)",
  creamFaint: "rgba(245,237,216,0.22)",
};

export const TemplateSix = forwardRef<HTMLDivElement, TemplateProps>(
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
        {/* Full-bleed photo */}
        {playerPhoto ? (
          <img
            src={playerPhoto}
            style={{
              position: "absolute",
              inset: 0,
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
              position: "absolute",
              inset: 0,
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

        {/* Top gradient (header zone) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 140,
            background: `linear-gradient(to bottom, rgba(15,34,25,0.9) 0%, rgba(15,34,25,0.3) 70%, transparent 100%)`,
            pointerEvents: "none",
          }}
        />

        {/* Bottom gradient (text zone) */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 320,
            background: `linear-gradient(to bottom, transparent 0%, rgba(15,34,25,0.7) 30%, rgba(15,34,25,0.92) 60%, ${C.bgDeep} 100%)`,
            pointerEvents: "none",
          }}
        />

        {/* NEA logo — top left */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 22,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "rgba(245,237,216,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            zIndex: 10,
            boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
          }}
        >
          <img
            src="/nea-logo.png"
            alt="NEA"
            crossOrigin="anonymous"
            style={{ width: 54, height: 54, objectFit: "contain" }}
          />
        </div>

        {/* Top right: tournament label */}
        <div
          style={{
            position: "absolute",
            top: 32,
            right: 22,
            textAlign: "right",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontSize: 8,
              color: C.creamFaint,
              letterSpacing: "0.22em",
              lineHeight: 2,
            }}
          >
            <div>NORTHEAST AMATEUR</div>
            <div>INVITATIONAL</div>
          </div>
        </div>

        {/* Bottom text */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0 36px 30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          {/* SCHEDULED */}
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontWeight: 700,
              fontSize: 58,
              color: C.cream,
              letterSpacing: "0.06em",
              lineHeight: 0.95,
              textAlign: "center",
            }}
          >
            SCHEDULED
          </div>
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontWeight: 300,
              fontSize: 30,
              color: C.creamMid,
              letterSpacing: "0.26em",
              lineHeight: 1.2,
              textAlign: "center",
            }}
          >
            TO APPEAR
          </div>

          {/* Divider */}
          <div
            style={{
              width: "100%",
              height: 1,
              background: C.creamMid,
              margin: "14px 0 12px",
            }}
          />

          {/* Name */}
          <div
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: 26,
              color: C.cream,
              letterSpacing: "0.04em",
              textAlign: "center",
              lineHeight: 1.1,
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
              marginTop: 5,
              textAlign: "center",
            }}
          >
            {school}
          </div>

          {/* Details */}
          <div
            style={{
              width: "100%",
              height: 1,
              background: C.creamFaint,
              margin: "14px 0 10px",
            }}
          />
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontSize: 8,
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
TemplateSix.displayName = "TemplateSix";
