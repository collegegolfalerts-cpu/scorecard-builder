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

const LEFT_W = 210;

export const TemplateFour = forwardRef<HTMLDivElement, TemplateProps>(
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
          display: "flex",
        }}
      >
        {/* Left text panel */}
        <div
          style={{
            width: LEFT_W,
            height: "100%",
            background: C.bgDeep,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "26px 18px 22px",
            boxSizing: "border-box",
            position: "relative",
            zIndex: 5,
          }}
        >
          {/* NEA logo */}
          <img
            src="/nea-logo.png"
            alt="NEA"
            crossOrigin="anonymous"
            style={{ width: 58, height: 58, objectFit: "contain", flexShrink: 0 }}
          />

          {/* Thin divider */}
          <div
            style={{
              width: "70%",
              height: 1,
              background: C.creamFaint,
              margin: "14px 0",
              flexShrink: 0,
            }}
          />

          {/* SCHEDULED TO APPEAR stacked */}
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontWeight: 700,
              fontSize: 25,
              color: C.cream,
              letterSpacing: "0.1em",
              textAlign: "center",
              lineHeight: 1.05,
              flexShrink: 0,
            }}
          >
            SCHED
          </div>
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontWeight: 700,
              fontSize: 25,
              color: C.cream,
              letterSpacing: "0.1em",
              textAlign: "center",
              lineHeight: 1.05,
              flexShrink: 0,
            }}
          >
            ULED
          </div>
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontWeight: 300,
              fontSize: 13,
              color: C.creamMid,
              letterSpacing: "0.3em",
              textAlign: "center",
              lineHeight: 1.5,
              flexShrink: 0,
              marginTop: 4,
            }}
          >
            TO
          </div>
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontWeight: 700,
              fontSize: 25,
              color: C.cream,
              letterSpacing: "0.1em",
              textAlign: "center",
              lineHeight: 1.05,
              flexShrink: 0,
            }}
          >
            APPEAR
          </div>

          <div style={{ flex: 1 }} />

          {/* Player name */}
          <div
            style={{
              width: "100%",
              height: 1,
              background: C.creamFaint,
              marginBottom: 12,
              flexShrink: 0,
            }}
          />
          <div
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: 14,
              color: C.cream,
              textAlign: "center",
              lineHeight: 1.3,
              flexShrink: 0,
              wordBreak: "break-word",
            }}
          >
            {playerName}
          </div>
          <div
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontSize: 11,
              color: C.creamMid,
              textAlign: "center",
              marginTop: 4,
              flexShrink: 0,
              wordBreak: "break-word",
            }}
          >
            {school}
          </div>

          <div
            style={{
              width: "100%",
              height: 1,
              background: C.creamFaint,
              margin: "12px 0",
              flexShrink: 0,
            }}
          />

          {/* Tournament details */}
          <div
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontSize: 7,
              color: C.creamFaint,
              letterSpacing: "0.18em",
              textAlign: "center",
              lineHeight: 2,
              flexShrink: 0,
            }}
          >
            <div>NORTHEAST AMATEUR</div>
            <div>INVITATIONAL</div>
            <div style={{ marginTop: 4 }}>WANNAMOISETT CC</div>
            <div>JUNE 22–27, 2026</div>
          </div>
        </div>

        {/* Right photo panel */}
        <div
          style={{
            flex: 1,
            height: "100%",
            position: "relative",
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
                PLAYER PHOTO
              </div>
            </div>
          )}

          {/* Left-edge gradient to blend into panel */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 60,
              height: "100%",
              background: `linear-gradient(to right, ${C.bgDeep}, transparent)`,
              pointerEvents: "none",
            }}
          />
          {/* Bottom gradient */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
              background: `linear-gradient(to top, rgba(15,34,25,0.55), transparent)`,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Thin vertical accent line between panels */}
        <div
          style={{
            position: "absolute",
            top: 30,
            bottom: 30,
            left: LEFT_W,
            width: 1,
            background: `linear-gradient(to bottom, transparent, ${C.creamFaint} 20%, ${C.creamFaint} 80%, transparent)`,
            zIndex: 10,
          }}
        />
      </div>
    );
  }
);
TemplateFour.displayName = "TemplateFour";
