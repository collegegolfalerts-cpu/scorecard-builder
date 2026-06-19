'use client';

import { CSSProperties } from 'react';
import { ScorecardData, ScoreIndicator } from '@/types';

export const CARD_WIDTH = 1080;

// ── Font Definitions ──────────────────────────────────────────────────────────

interface FontDef {
  family: string;
  style?: string;
  weight?: number | string;
  letterSpacing?: number;
}

export const SCRIPT_FONTS: Record<string, { label: string; def: FontDef }> = {
  'dancing':          { label: 'Dancing Script',    def: { family: 'var(--font-dancing), "Dancing Script", cursive', weight: 700 } },
  'great-vibes':      { label: 'Great Vibes',       def: { family: 'var(--font-great-vibes), "Great Vibes", cursive', weight: 400 } },
  'playfair-italic':  { label: 'Playfair Italic',   def: { family: 'var(--font-playfair), "Playfair Display", Georgia, serif', style: 'italic', weight: 400 } },
  'raleway-italic':   { label: 'Raleway Italic',    def: { family: 'var(--font-raleway), Raleway, sans-serif', style: 'italic', weight: 900 } },
  'oswald-condensed': { label: 'Oswald Condensed',  def: { family: 'var(--font-oswald), Oswald, "Arial Narrow", sans-serif', weight: 700, letterSpacing: 2 } },
};

export const DISPLAY_FONTS: Record<string, { label: string; def: FontDef }> = {
  'oswald':        { label: 'Oswald',        def: { family: 'var(--font-oswald), Oswald, "Arial Narrow", sans-serif', weight: 900, letterSpacing: 3 } },
  'bebas-neue':    { label: 'Bebas Neue',    def: { family: 'var(--font-bebas), "Bebas Neue", "Arial Black", Impact, sans-serif', weight: 400, letterSpacing: 4 } },
  'anton':         { label: 'Anton',         def: { family: 'var(--font-anton), Anton, Impact, Arial, sans-serif', weight: 400, letterSpacing: 2 } },
  'teko':          { label: 'Teko',          def: { family: 'var(--font-teko), Teko, "Arial Narrow", sans-serif', weight: 700, letterSpacing: 3 } },
  'raleway-black': { label: 'Raleway Black', def: { family: 'var(--font-raleway), Raleway, sans-serif', weight: 900, letterSpacing: 6 } },
  'playfair-bold': { label: 'Playfair Bold', def: { family: 'var(--font-playfair), "Playfair Display", Georgia, serif', weight: 900, letterSpacing: 2 } },
};

export const TOURNAMENT_FONTS: Record<string, { label: string; def: FontDef }> = {
  'oswald-light':    { label: 'Oswald Light',  def: { family: 'var(--font-oswald), Oswald, sans-serif', weight: 300, letterSpacing: 4 } },
  'raleway-light':   { label: 'Raleway Light', def: { family: 'var(--font-raleway), Raleway, sans-serif', weight: 200, letterSpacing: 6 } },
  'teko-light':      { label: 'Teko',          def: { family: 'var(--font-teko), Teko, sans-serif', weight: 400, letterSpacing: 4 } },
  'playfair-normal': { label: 'Playfair',      def: { family: 'var(--font-playfair), "Playfair Display", Georgia, serif', weight: 400, letterSpacing: 2 } },
};

function applyFont(key: string, map: Record<string, { label: string; def: FontDef }>): CSSProperties {
  if (key.startsWith('custom:')) {
    return { fontFamily: `'${key.slice(7)}', sans-serif`, fontWeight: 400 };
  }
  const entry = map[key];
  if (!entry) return {};
  const { family, style, weight, letterSpacing } = entry.def;
  return {
    fontFamily: family,
    ...(style         ? { fontStyle: style }      : {}),
    ...(weight        ? { fontWeight: weight }     : {}),
    ...(letterSpacing != null ? { letterSpacing }  : {}),
  };
}

// ── Score Cell ────────────────────────────────────────────────────────────────

export function ScoreCell({ score, indicator, color, size = 80 }: {
  score: number; indicator: ScoreIndicator; color: string; size?: number;
}) {
  const pad = Math.floor(size * 0.07);
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', top: 0, left: 0 }} overflow="visible">
        {indicator === 'birdie'       && <circle cx={size/2} cy={size/2} r={size/2-pad} fill="none" stroke={color} strokeWidth={size*0.045} />}
        {indicator === 'eagle'        && <><circle cx={size/2} cy={size/2} r={size/2-pad+size*0.09} fill="none" stroke={color} strokeWidth={size*0.033} /><circle cx={size/2} cy={size/2} r={size/2-pad-size*0.04} fill="none" stroke={color} strokeWidth={size*0.033} /></>}
        {indicator === 'albatross'    && <><circle cx={size/2} cy={size/2} r={size/2-pad+size*0.17} fill="none" stroke={color} strokeWidth={size*0.025} /><circle cx={size/2} cy={size/2} r={size/2-pad+size*0.05} fill="none" stroke={color} strokeWidth={size*0.025} /><circle cx={size/2} cy={size/2} r={size/2-pad-size*0.07} fill="none" stroke={color} strokeWidth={size*0.025} /></>}
        {indicator === 'bogey'        && <rect x={pad} y={pad} width={size-pad*2} height={size-pad*2} fill="none" stroke={color} strokeWidth={size*0.045} />}
        {indicator === 'double-bogey' && <><rect x={-size*0.07} y={-size*0.07} width={size*1.14} height={size*1.14} fill="none" stroke={color} strokeWidth={size*0.033} /><rect x={pad} y={pad} width={size-pad*2} height={size-pad*2} fill="none" stroke={color} strokeWidth={size*0.033} /></>}
      </svg>
      <span style={{ position: 'relative', zIndex: 1, fontSize: Math.floor(size*0.54), fontWeight: 900, color, fontFamily: 'var(--font-oswald), Oswald, "Arial Narrow", Arial, sans-serif', lineHeight: 1, letterSpacing: '-1px' }}>
        {score}
      </span>
    </div>
  );
}

// ── Shared helpers ────────────────────────────────────────────────────────────

function gc(indicator: ScoreIndicator, d: ScorecardData): string {
  return ({ albatross: d.albatrossColor, eagle: d.eagleColor, birdie: d.birdieColor, bogey: d.bogeyColor, 'double-bogey': d.doubleBogeyColor, none: d.parColor })[indicator];
}

function PhotoBg({ data, style }: { data: ScorecardData; style?: CSSProperties }) {
  const base: CSSProperties = { width: '100%', height: '100%', objectFit: 'cover', objectPosition: `center ${data.photoYPosition}%`, display: 'block' };
  if (data.photoUrl) return <img src={data.photoUrl} alt="Player" style={{ ...base, ...style }} />;
  return (
    <div style={{ width: '100%', height: '100%', background: `linear-gradient(155deg, #0a1628 0%, #1a3a5e 55%, ${data.backgroundColor} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.15)' }}>
        <div style={{ fontSize: 54, marginBottom: 8 }}>⛳</div>
        <div style={{ fontSize: 26, letterSpacing: 6, fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>UPLOAD PHOTO</div>
      </div>
    </div>
  );
}

function Logo({ data, top = 36, right = 36, size = 115 }: { data: ScorecardData; top?: number; right?: number; left?: number; size?: number }) {
  if (!data.logoUrl) return null;
  return (
    <div style={{ position: 'absolute', top, right, width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.7))', zIndex: 10 }}>
      <img src={data.logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
  );
}

function ScoreRow({ label, holes, total, data, size, padH }: { label: string; holes: ScorecardData['holes']; total: number; data: ScorecardData; size: number; padH: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: padH, paddingRight: padH }}>
      <div style={{ width: Math.floor(size * 1.1), flexShrink: 0, fontSize: Math.floor(size * 0.28), fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontWeight: 500, color: data.tournamentColor, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.75 }}>{label}</div>
      {holes.map((hole, i) => <ScoreCell key={i} score={hole.score} indicator={hole.indicator} color={gc(hole.indicator, data)} size={size} />)}
      <div style={{ width: Math.floor(size * 1.1), flexShrink: 0, textAlign: 'center', fontSize: Math.floor(size * 0.65), fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontWeight: 900, color: data.primaryColor, lineHeight: 1 }}>{total}</div>
    </div>
  );
}

function ParBlock({ data, pad }: { data: ScorecardData; pad: number }) {
  return (
    <div style={{ paddingLeft: pad, paddingRight: pad, display: 'flex', alignItems: 'baseline', gap: 22 }}>
      <span style={{ fontSize: 158, fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontWeight: 900, color: data.primaryColor, letterSpacing: -5, lineHeight: 1 }}>{data.relativeToPar}</span>
      <span style={{ fontSize: 36, fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontWeight: 300, color: data.tournamentColor, letterSpacing: 5, textTransform: 'uppercase', opacity: 0.8 }}>
        {data.relativeToPar.startsWith('-') ? 'UNDER PAR' : 'OVER PAR'}
      </span>
    </div>
  );
}

// ── LAYOUT 1: Classic ─────────────────────────────────────────────────────────

function LayoutClassic({ data }: { data: ScorecardData }) {
  const H     = data.outputFormat === '1080x1440' ? 1440 : 1920;
  const is19  = H === 1920;
  const PAD   = 46;
  const CELL  = 80;

  const panelTop   = Math.floor((data.lowerPanelYPct / 100) * H);
  const photoH     = Math.floor(H * 0.54);
  const fnTop      = Math.floor((data.firstNameYPct / 100) * H);
  const scoreTop   = Math.floor((data.scoreTopPct   / 100) * H);
  const lnLeft     = Math.floor((data.lastNameXPct  / 100) * CARD_WIDTH);

  const fnCSS  = applyFont(data.firstNameFont, SCRIPT_FONTS);
  const lnCSS  = applyFont(data.lastNameFont,  DISPLAY_FONTS);
  const scCSS  = applyFont(data.scoreFont,     DISPLAY_FONTS);
  const trCSS  = applyFont(data.tournamentFont, TOURNAMENT_FONTS);

  return (
    <div style={{ width: CARD_WIDTH, height: H, position: 'relative', overflow: 'hidden', backgroundColor: data.backgroundColor }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: photoH, overflow: 'hidden' }}>
        <PhotoBg data={data} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: `linear-gradient(to bottom, transparent 0%, ${data.backgroundColor}99 55%, ${data.backgroundColor} 100%)` }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 45%, transparent 70%)' }} />
      </div>

      {/* Ghost score */}
      <div style={{ position: 'absolute', top: scoreTop - 10, right: data.scoreRight - 20, lineHeight: 1, userSelect: 'none' }}>
        <span style={{ fontSize: data.scoreSize + 50, ...scCSS, color: 'rgba(255,255,255,0.05)', letterSpacing: -12, display: 'block', lineHeight: 1 }}>{data.totalScore}</span>
      </div>
      {/* Score */}
      <div style={{ position: 'absolute', top: scoreTop, right: data.scoreRight, lineHeight: 1, userSelect: 'none' }}>
        <span style={{ fontSize: data.scoreSize, ...scCSS, color: '#ffffff', letterSpacing: -8, display: 'block', lineHeight: 1, textShadow: '0 6px 40px rgba(0,0,0,0.7)' }}>{data.totalScore}</span>
      </div>
      {/* First name */}
      <div style={{ position: 'absolute', top: fnTop, left: data.firstNameX, userSelect: 'none' }}>
        <span style={{ fontSize: data.firstNameSize, ...fnCSS, color: '#ffffff', display: 'block', lineHeight: 1, textShadow: '2px 2px 20px rgba(0,0,0,0.95)' }}>{data.playerFirstName}</span>
      </div>

      {/* Lower panel */}
      <div style={{ position: 'absolute', top: panelTop, left: 0, right: 0, bottom: 0, backgroundColor: data.backgroundColor }}>
        <div style={{ height: 6, backgroundColor: data.primaryColor }} />
        <div style={{ paddingLeft: lnLeft || PAD, paddingRight: PAD, paddingTop: 16 }}>
          <span style={{ fontSize: data.lastNameSize, ...lnCSS, color: data.primaryColor, display: 'block', lineHeight: 0.92, textTransform: 'uppercase' }}>{data.playerLastName}</span>
        </div>
        <div style={{ paddingLeft: PAD + 2, paddingTop: 14 }}>
          <span style={{ fontSize: data.tournamentSize, ...trCSS, color: data.tournamentColor, textTransform: 'uppercase', display: 'block' }}>{data.tournamentName}</span>
        </div>
        {data.roundName && <div style={{ paddingLeft: PAD + 2, paddingTop: 5 }}><span style={{ fontSize: data.roundSize, ...trCSS, color: data.tournamentColor, opacity: 0.72, textTransform: 'uppercase' }}>{data.roundName}</span></div>}
        <div style={{ height: 1, backgroundColor: data.primaryColor, opacity: 0.28, margin: `${is19 ? 22 : 17}px ${PAD}px` }} />
        <ScoreRow label="FRONT" holes={data.holes.slice(0,9)}  total={data.frontTotal} data={data} size={CELL} padH={PAD} />
        <div style={{ marginTop: 8 }}><ScoreRow label="BACK" holes={data.holes.slice(9)} total={data.backTotal}  data={data} size={CELL} padH={PAD} /></div>
        {is19 && <><div style={{ height: 1, backgroundColor: data.primaryColor, opacity: 0.2, margin: `50px ${PAD}px 40px` }} /><ParBlock data={data} pad={PAD} /></>}
      </div>

      <Logo data={data} />
    </div>
  );
}

// ── LAYOUT 2: Split ───────────────────────────────────────────────────────────

function LayoutSplit({ data }: { data: ScorecardData }) {
  const H        = data.outputFormat === '1080x1440' ? 1440 : 1920;
  const is19     = H === 1920;
  const PHOTO_W  = 400;
  const PAD      = 36;
  const CELL     = 54;
  const LABEL_W  = 68;

  const fnCSS  = applyFont(data.firstNameFont, SCRIPT_FONTS);
  const lnCSS  = applyFont(data.lastNameFont,  DISPLAY_FONTS);
  const scCSS  = applyFont(data.scoreFont,     DISPLAY_FONTS);
  const trCSS  = applyFont(data.tournamentFont, TOURNAMENT_FONTS);

  const scoreSize   = Math.min(data.scoreSize, 240);
  const lastNameSize = Math.min(data.lastNameSize, 130);

  return (
    <div style={{ width: CARD_WIDTH, height: H, position: 'relative', overflow: 'hidden', backgroundColor: data.backgroundColor, display: 'flex' }}>
      {/* Photo column */}
      <div style={{ width: PHOTO_W, height: H, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <PhotoBg data={data} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '65%', height: '100%', background: `linear-gradient(to right, transparent, ${data.backgroundColor}cc 65%, ${data.backgroundColor} 100%)` }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '12%', background: `linear-gradient(to bottom, ${data.backgroundColor}60, transparent)` }} />
        <div style={{ position: 'absolute', bottom: Math.floor(H * 0.08), left: 22, userSelect: 'none' }}>
          <span style={{ fontSize: Math.min(data.firstNameSize * 0.7, 72), ...fnCSS, color: '#ffffff', display: 'block', lineHeight: 1, textShadow: '2px 2px 16px rgba(0,0,0,0.9)' }}>{data.playerFirstName}</span>
        </div>
      </div>

      {/* Accent bar */}
      <div style={{ width: 5, backgroundColor: data.primaryColor, flexShrink: 0 }} />

      {/* Content panel */}
      <div style={{ flex: 1, height: H, backgroundColor: data.backgroundColor, position: 'relative', overflow: 'hidden' }}>
        {/* Ghost */}
        <div style={{ position: 'absolute', top: -30, right: -10, userSelect: 'none', pointerEvents: 'none' }}>
          <span style={{ fontSize: scoreSize + 80, ...scCSS, color: 'rgba(255,255,255,0.04)', letterSpacing: -10, display: 'block', lineHeight: 1 }}>{data.totalScore}</span>
        </div>

        <div style={{ paddingLeft: PAD, paddingTop: is19 ? 80 : 52 }}>
          <span style={{ fontSize: scoreSize, ...scCSS, color: data.primaryColor, letterSpacing: -6, display: 'block', lineHeight: 1 }}>{data.totalScore}</span>
        </div>
        <div style={{ paddingLeft: PAD + 4, paddingTop: 6, display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span style={{ fontSize: 38, fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontWeight: 300, color: data.tournamentColor, letterSpacing: 3 }}>{data.relativeToPar}</span>
          <span style={{ fontSize: 20, fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontWeight: 200, color: data.tournamentColor, letterSpacing: 4, textTransform: 'uppercase', opacity: 0.6 }}>{data.relativeToPar.startsWith('-') ? 'UNDER PAR' : 'OVER PAR'}</span>
        </div>
        <div style={{ height: 1, backgroundColor: data.primaryColor, opacity: 0.3, margin: `${is19 ? 30 : 20}px ${PAD}px` }} />
        <div style={{ paddingLeft: PAD, paddingRight: PAD }}>
          <span style={{ fontSize: lastNameSize, ...lnCSS, color: data.primaryColor, display: 'block', lineHeight: 0.9, textTransform: 'uppercase' }}>{data.playerLastName}</span>
        </div>
        <div style={{ paddingLeft: PAD, paddingTop: is19 ? 20 : 12 }}>
          <span style={{ fontSize: Math.min(data.tournamentSize, 26), ...trCSS, color: data.tournamentColor, textTransform: 'uppercase', display: 'block' }}>{data.tournamentName}</span>
        </div>
        {data.roundName && <div style={{ paddingLeft: PAD, paddingTop: 6 }}><span style={{ fontSize: Math.min(data.roundSize, 20), ...trCSS, color: data.tournamentColor, opacity: 0.65, textTransform: 'uppercase' }}>{data.roundName}</span></div>}
        <div style={{ height: 1, backgroundColor: data.primaryColor, opacity: 0.22, margin: `${is19 ? 36 : 22}px ${PAD}px` }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: PAD, paddingRight: PAD }}>
          <div style={{ width: LABEL_W, flexShrink: 0, fontSize: 18, fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontWeight: 500, color: data.tournamentColor, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.7 }}>FRONT</div>
          {data.holes.slice(0,9).map((h, i) => <ScoreCell key={i} score={h.score} indicator={h.indicator} color={gc(h.indicator, data)} size={CELL} />)}
          <div style={{ width: LABEL_W, flexShrink: 0, textAlign: 'center', fontSize: 40, fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontWeight: 900, color: data.primaryColor, lineHeight: 1 }}>{data.frontTotal}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: PAD, paddingRight: PAD, marginTop: 8 }}>
          <div style={{ width: LABEL_W, flexShrink: 0, fontSize: 18, fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontWeight: 500, color: data.tournamentColor, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.7 }}>BACK</div>
          {data.holes.slice(9).map((h, i) => <ScoreCell key={i+9} score={h.score} indicator={h.indicator} color={gc(h.indicator, data)} size={CELL} />)}
          <div style={{ width: LABEL_W, flexShrink: 0, textAlign: 'center', fontSize: 40, fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontWeight: 900, color: data.primaryColor, lineHeight: 1 }}>{data.backTotal}</div>
        </div>
      </div>

      {data.logoUrl && <div style={{ position: 'absolute', top: 28, right: 28, width: 96, height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))', zIndex: 10 }}><img src={data.logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>}
    </div>
  );
}

// ── LAYOUT 3: Full Bleed ──────────────────────────────────────────────────────

function LayoutFullBleed({ data }: { data: ScorecardData }) {
  const H       = data.outputFormat === '1080x1440' ? 1440 : 1920;
  const is19    = H === 1920;
  const PAD     = 52;
  const CELL    = 78;
  const PANEL_Y = Math.floor(H * 0.47);

  const fnCSS  = applyFont(data.firstNameFont, SCRIPT_FONTS);
  const lnCSS  = applyFont(data.lastNameFont,  DISPLAY_FONTS);
  const scCSS  = applyFont(data.scoreFont,     DISPLAY_FONTS);
  const trCSS  = applyFont(data.tournamentFont, TOURNAMENT_FONTS);

  const fnTop    = Math.floor((data.firstNameYPct / 100) * H);
  const scoreTop = Math.floor((data.scoreTopPct   / 100) * H);

  return (
    <div style={{ width: CARD_WIDTH, height: H, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }}><PhotoBg data={data} /></div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 35%, ${data.backgroundColor}e0 65%, ${data.backgroundColor} 100%)` }} />

      {/* Ghost score */}
      <div style={{ position: 'absolute', top: scoreTop - 15, right: data.scoreRight - 25, userSelect: 'none', pointerEvents: 'none' }}>
        <span style={{ fontSize: data.scoreSize + 60, ...scCSS, color: 'rgba(255,255,255,0.06)', letterSpacing: -12, display: 'block', lineHeight: 1 }}>{data.totalScore}</span>
      </div>
      <div style={{ position: 'absolute', top: scoreTop, right: data.scoreRight, userSelect: 'none' }}>
        <span style={{ fontSize: data.scoreSize, ...scCSS, color: '#ffffff', letterSpacing: -8, display: 'block', lineHeight: 1, textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}>{data.totalScore}</span>
      </div>
      <div style={{ position: 'absolute', top: fnTop, left: data.firstNameX, userSelect: 'none' }}>
        <span style={{ fontSize: data.firstNameSize, ...fnCSS, color: '#ffffff', display: 'block', lineHeight: 1, textShadow: '2px 2px 18px rgba(0,0,0,0.95)' }}>{data.playerFirstName}</span>
      </div>

      {/* Frosted panel */}
      <div style={{ position: 'absolute', top: PANEL_Y, left: 0, right: 0, bottom: 0, backgroundColor: `${data.backgroundColor}ee` }}>
        <div style={{ height: 5, backgroundColor: data.primaryColor }} />
        <div style={{ paddingLeft: PAD, paddingRight: PAD, paddingTop: 14 }}>
          <span style={{ fontSize: Math.min(data.lastNameSize, 160), ...lnCSS, color: data.primaryColor, display: 'block', lineHeight: 0.9, textTransform: 'uppercase' }}>{data.playerLastName}</span>
        </div>
        <div style={{ paddingLeft: PAD, paddingTop: 12 }}>
          <span style={{ fontSize: data.tournamentSize, ...trCSS, color: data.tournamentColor, textTransform: 'uppercase', display: 'block' }}>{data.tournamentName}</span>
        </div>
        {data.roundName && <div style={{ paddingLeft: PAD, paddingTop: 5 }}><span style={{ fontSize: data.roundSize, ...trCSS, color: data.tournamentColor, opacity: 0.65, textTransform: 'uppercase' }}>{data.roundName}</span></div>}
        <div style={{ height: 1, backgroundColor: data.primaryColor, opacity: 0.3, margin: `${is19 ? 22 : 16}px ${PAD}px` }} />
        <ScoreRow label="FRONT" holes={data.holes.slice(0,9)} total={data.frontTotal} data={data} size={CELL} padH={PAD} />
        <div style={{ marginTop: 8 }}><ScoreRow label="BACK" holes={data.holes.slice(9)} total={data.backTotal} data={data} size={CELL} padH={PAD} /></div>
        {is19 && <><div style={{ height: 1, backgroundColor: data.primaryColor, opacity: 0.18, margin: `44px ${PAD}px 36px` }} /><ParBlock data={data} pad={PAD} /></>}
      </div>

      <Logo data={data} />
    </div>
  );
}

// ── LAYOUT 4: Banner ──────────────────────────────────────────────────────────

function LayoutBanner({ data }: { data: ScorecardData }) {
  const H      = data.outputFormat === '1080x1440' ? 1440 : 1920;
  const is19   = H === 1920;
  const PHOTO_H = Math.floor(H * 0.28);
  const PAD    = 46;
  const CELL   = 80;

  const fnCSS  = applyFont(data.firstNameFont, SCRIPT_FONTS);
  const lnCSS  = applyFont(data.lastNameFont,  DISPLAY_FONTS);
  const scCSS  = applyFont(data.scoreFont,     DISPLAY_FONTS);
  const trCSS  = applyFont(data.tournamentFont, TOURNAMENT_FONTS);

  return (
    <div style={{ width: CARD_WIDTH, height: H, position: 'relative', overflow: 'hidden', backgroundColor: data.backgroundColor }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: PHOTO_H, overflow: 'hidden' }}>
        <PhotoBg data={data} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: `linear-gradient(to bottom, transparent, ${data.backgroundColor})` }} />
        <div style={{ position: 'absolute', bottom: 22, left: PAD, userSelect: 'none' }}>
          <span style={{ fontSize: Math.min(data.firstNameSize * 0.72, 80), ...fnCSS, color: '#ffffff', display: 'block', lineHeight: 1, textShadow: '2px 2px 16px rgba(0,0,0,0.95)' }}>{data.playerFirstName}</span>
        </div>
        <div style={{ position: 'absolute', bottom: 10, right: PAD, userSelect: 'none', textAlign: 'right' }}>
          <span style={{ fontSize: Math.min(data.scoreSize * 0.65, 200), ...scCSS, color: '#ffffff', letterSpacing: -5, display: 'block', lineHeight: 1, textShadow: '0 4px 24px rgba(0,0,0,0.8)' }}>{data.totalScore}</span>
          <span style={{ fontSize: 20, fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontWeight: 300, color: 'rgba(255,255,255,0.75)', letterSpacing: 4, textTransform: 'uppercase' }}>TOTAL</span>
        </div>
      </div>

      <div style={{ position: 'absolute', top: PHOTO_H, left: 0, right: 0, height: 6, backgroundColor: data.primaryColor }} />

      <div style={{ position: 'absolute', top: PHOTO_H + 6, left: 0, right: 0, bottom: 0, backgroundColor: data.backgroundColor }}>
        <div style={{ position: 'absolute', top: -30, right: -15, userSelect: 'none', pointerEvents: 'none' }}>
          <span style={{ fontSize: Math.min(data.scoreSize * 1.1, 360), ...scCSS, color: 'rgba(255,255,255,0.04)', letterSpacing: -12, display: 'block', lineHeight: 1 }}>{data.totalScore}</span>
        </div>
        <div style={{ paddingLeft: PAD, paddingRight: PAD, paddingTop: is19 ? 40 : 24 }}>
          <span style={{ fontSize: data.lastNameSize, ...lnCSS, color: data.primaryColor, display: 'block', lineHeight: 0.88, textTransform: 'uppercase' }}>{data.playerLastName}</span>
        </div>
        <div style={{ paddingLeft: PAD, paddingRight: PAD, paddingTop: is19 ? 24 : 14, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span style={{ fontSize: 70, fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontWeight: 900, color: data.primaryColor, letterSpacing: -2, lineHeight: 1 }}>{data.relativeToPar}</span>
            <span style={{ fontSize: 22, fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontWeight: 200, color: data.tournamentColor, letterSpacing: 4, textTransform: 'uppercase', opacity: 0.7 }}>{data.relativeToPar.startsWith('-') ? 'UNDER PAR' : 'OVER PAR'}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: data.tournamentSize * 0.8, ...trCSS, color: data.tournamentColor, textTransform: 'uppercase' }}>{data.tournamentName}</div>
            {data.roundName && <div style={{ fontSize: data.roundSize * 0.8, ...trCSS, color: data.tournamentColor, opacity: 0.6, textTransform: 'uppercase', marginTop: 4 }}>{data.roundName}</div>}
          </div>
        </div>
        <div style={{ height: 1, backgroundColor: data.primaryColor, opacity: 0.28, margin: `${is19 ? 30 : 18}px ${PAD}px` }} />
        <ScoreRow label="FRONT" holes={data.holes.slice(0,9)} total={data.frontTotal} data={data} size={CELL} padH={PAD} />
        <div style={{ marginTop: 8 }}><ScoreRow label="BACK" holes={data.holes.slice(9)} total={data.backTotal} data={data} size={CELL} padH={PAD} /></div>
        {is19 && <><div style={{ height: 1, backgroundColor: data.primaryColor, opacity: 0.18, margin: `50px ${PAD}px 38px` }} /><ParBlock data={data} pad={PAD} /></>}
      </div>

      {data.logoUrl && <div style={{ position: 'absolute', top: PHOTO_H + 24, right: 36, width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))', zIndex: 10 }}><img src={data.logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>}
    </div>
  );
}

// ── LAYOUT 5: Diagonal ────────────────────────────────────────────────────────
//  Photo fills a bold angled trapezoid, accent stripe slashes across the card,
//  content lives in the dark zone below — very dynamic sports graphic feel.

function LayoutDiagonal({ data }: { data: ScorecardData }) {
  const H     = data.outputFormat === '1080x1440' ? 1440 : 1920;
  const is19  = H === 1920;
  const PAD   = 46;
  const CELL  = 80;
  const ACC   = 9; // accent stripe height

  // The diagonal cuts from right side at diagR to left side at diagL
  const diagR     = Math.floor(H * 0.34); // right edge of photo (lower)
  const diagL     = Math.floor(H * 0.57); // left edge of photo (higher on page, larger y)
  const contentY  = diagL + ACC + 10;

  const fnCSS  = applyFont(data.firstNameFont, SCRIPT_FONTS);
  const lnCSS  = applyFont(data.lastNameFont,  DISPLAY_FONTS);
  const scCSS  = applyFont(data.scoreFont,     DISPLAY_FONTS);
  const trCSS  = applyFont(data.tournamentFont, TOURNAMENT_FONTS);

  // Photo clipped to a rising trapezoid (left side extends lower than right)
  const photoClip = `polygon(0px 0px, ${CARD_WIDTH}px 0px, ${CARD_WIDTH}px ${diagR}px, 0px ${diagL}px)`;

  return (
    <div style={{ width: CARD_WIDTH, height: H, position: 'relative', overflow: 'hidden', backgroundColor: data.backgroundColor }}>

      {/* Photo — clipped to diagonal trapezoid */}
      <div style={{ position: 'absolute', inset: 0, clipPath: photoClip }}>
        <PhotoBg data={data} />
        {/* Darkening so text pops */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, rgba(0,0,0,0.25) 0%, transparent 55%)' }} />
      </div>

      {/* Diagonal accent stripe — rendered as SVG polygon */}
      <svg style={{ position: 'absolute', inset: 0, width: CARD_WIDTH, height: H, zIndex: 3 }} viewBox={`0 0 ${CARD_WIDTH} ${H}`}>
        <polygon
          points={`0,${diagL}  ${CARD_WIDTH},${diagR}  ${CARD_WIDTH},${diagR + ACC}  0,${diagL + ACC}`}
          fill={data.primaryColor}
        />
      </svg>

      {/* Score — upper-right of photo area */}
      <div style={{ position: 'absolute', top: Math.floor(H * 0.05), right: 50, userSelect: 'none', zIndex: 4 }}>
        <span style={{ fontSize: Math.min(data.scoreSize, 290), ...scCSS, color: '#ffffff', letterSpacing: -8, display: 'block', lineHeight: 1, textShadow: '0 4px 30px rgba(0,0,0,0.7)' }}>{data.totalScore}</span>
        <span style={{ fontSize: 26, fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontWeight: 200, color: 'rgba(255,255,255,0.7)', letterSpacing: 5, textTransform: 'uppercase', textAlign: 'right', display: 'block', marginTop: -4 }}>{data.relativeToPar} &nbsp;·&nbsp; {data.relativeToPar.startsWith('-') ? 'UNDER' : 'OVER'}</span>
      </div>

      {/* First name — lower-left of photo, just above the diagonal */}
      <div style={{ position: 'absolute', top: Math.floor(diagL * 0.7), left: PAD, userSelect: 'none', zIndex: 4 }}>
        <span style={{ fontSize: Math.min(data.firstNameSize, 96), ...fnCSS, color: '#ffffff', display: 'block', lineHeight: 1, textShadow: '2px 2px 16px rgba(0,0,0,0.95)' }}>{data.playerFirstName}</span>
      </div>

      {/* Content panel — below the diagonal */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: contentY, bottom: 0, backgroundColor: data.backgroundColor, zIndex: 2 }}>
        <div style={{ paddingLeft: PAD, paddingTop: 18, paddingRight: PAD }}>
          <span style={{ fontSize: Math.min(data.lastNameSize, 154), ...lnCSS, color: data.primaryColor, display: 'block', lineHeight: 0.9, textTransform: 'uppercase' }}>{data.playerLastName}</span>
        </div>
        <div style={{ paddingLeft: PAD, paddingTop: 10, display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span style={{ fontSize: data.tournamentSize, ...trCSS, color: data.tournamentColor, textTransform: 'uppercase' }}>{data.tournamentName}</span>
          {data.roundName && <span style={{ fontSize: data.roundSize, ...trCSS, color: data.tournamentColor, opacity: 0.6, textTransform: 'uppercase' }}>· {data.roundName}</span>}
        </div>
        <div style={{ height: 1, backgroundColor: data.primaryColor, opacity: 0.28, margin: `${is19 ? 28 : 16}px ${PAD}px` }} />
        <ScoreRow label="FRONT" holes={data.holes.slice(0,9)} total={data.frontTotal} data={data} size={CELL} padH={PAD} />
        <div style={{ marginTop: 8 }}><ScoreRow label="BACK" holes={data.holes.slice(9)} total={data.backTotal} data={data} size={CELL} padH={PAD} /></div>
        {is19 && <><div style={{ height: 1, backgroundColor: data.primaryColor, opacity: 0.18, margin: `48px ${PAD}px 36px` }} /><ParBlock data={data} pad={PAD} /></>}
      </div>

      {/* Logo — upper left, in photo zone */}
      {data.logoUrl && (
        <div style={{ position: 'absolute', top: 28, left: 36, width: 96, height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))', zIndex: 4 }}>
          <img src={data.logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      )}
    </div>
  );
}

// ── LAYOUT 6: Broadcast ───────────────────────────────────────────────────────
//  Mimics live TV broadcast graphics — a bold colored score "bug" anchors the
//  bottom-left of the photo, player name flanks it, thick accent bar separates
//  the broadcast-style scorecard panel below. Golf Channel energy.

function LayoutBroadcast({ data }: { data: ScorecardData }) {
  const H       = data.outputFormat === '1080x1440' ? 1440 : 1920;
  const is19    = H === 1920;
  const PHOTO_H = Math.floor(H * 0.50);
  const PAD     = 44;
  const CELL    = 80;
  const BUG_W   = 210;
  const BUG_H   = 175;
  const bugTop  = PHOTO_H - BUG_H;

  const fnCSS  = applyFont(data.firstNameFont, SCRIPT_FONTS);
  const lnCSS  = applyFont(data.lastNameFont,  DISPLAY_FONTS);
  const scCSS  = applyFont(data.scoreFont,     DISPLAY_FONTS);
  const trCSS  = applyFont(data.tournamentFont, TOURNAMENT_FONTS);

  return (
    <div style={{ width: CARD_WIDTH, height: H, position: 'relative', overflow: 'hidden', backgroundColor: data.backgroundColor }}>

      {/* Photo */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: PHOTO_H, overflow: 'hidden' }}>
        <PhotoBg data={data} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))' }} />
      </div>

      {/* Score bug — solid colored rectangle, bottom-left of photo */}
      <div style={{
        position: 'absolute', top: bugTop, left: PAD, zIndex: 5,
        width: BUG_W, height: BUG_H,
        backgroundColor: data.primaryColor,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* notch: small triangle cut from top-right corner via clip-path */}
        <div style={{
          position: 'absolute', inset: 0,
          clipPath: 'polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 0 100%)',
          backgroundColor: data.primaryColor,
        }} />
        <span style={{ position: 'relative', fontSize: 108, ...scCSS, color: data.backgroundColor, letterSpacing: -5, display: 'block', lineHeight: 1 }}>{data.totalScore}</span>
        <span style={{ position: 'relative', fontSize: 19, fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontWeight: 300, color: data.backgroundColor, letterSpacing: 6, textTransform: 'uppercase', opacity: 0.85 }}>TOTAL</span>
      </div>

      {/* Player name — right of bug, over photo bottom */}
      <div style={{ position: 'absolute', top: bugTop + 22, left: PAD + BUG_W + 22, zIndex: 4, userSelect: 'none' }}>
        <span style={{ fontSize: Math.min(data.firstNameSize * 0.62, 66), ...fnCSS, color: '#ffffff', display: 'block', lineHeight: 1.1, textShadow: '2px 2px 12px rgba(0,0,0,0.85)' }}>{data.playerFirstName}</span>
        <span style={{ fontSize: Math.min(data.lastNameSize * 0.6, 95), ...lnCSS, color: '#ffffff', display: 'block', lineHeight: 0.9, textTransform: 'uppercase', textShadow: '2px 2px 12px rgba(0,0,0,0.85)', marginTop: 6 }}>{data.playerLastName}</span>
      </div>

      {/* Thick accent divider */}
      <div style={{ position: 'absolute', top: PHOTO_H, left: 0, right: 0, height: 8, backgroundColor: data.primaryColor, zIndex: 3 }} />

      {/* Lower panel */}
      <div style={{ position: 'absolute', top: PHOTO_H + 8, left: 0, right: 0, bottom: 0, backgroundColor: data.backgroundColor }}>
        {/* Tournament / round + score to par row */}
        <div style={{ paddingLeft: PAD, paddingRight: PAD, paddingTop: 16, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: data.tournamentSize, ...trCSS, color: data.tournamentColor, textTransform: 'uppercase', display: 'block' }}>{data.tournamentName}</span>
            {data.roundName && <span style={{ fontSize: data.roundSize, ...trCSS, color: data.tournamentColor, opacity: 0.65, textTransform: 'uppercase', marginTop: 4, display: 'block' }}>{data.roundName}</span>}
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: 58, fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontWeight: 900, color: data.primaryColor, letterSpacing: -2, lineHeight: 1, display: 'block' }}>{data.relativeToPar}</span>
            <span style={{ fontSize: 19, fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontWeight: 200, color: data.tournamentColor, letterSpacing: 4, textTransform: 'uppercase', opacity: 0.7 }}>{data.relativeToPar.startsWith('-') ? 'UNDER PAR' : 'OVER PAR'}</span>
          </div>
        </div>
        <div style={{ height: 1, backgroundColor: data.primaryColor, opacity: 0.25, margin: `${is19 ? 22 : 14}px ${PAD}px` }} />
        <ScoreRow label="FRONT" holes={data.holes.slice(0,9)} total={data.frontTotal} data={data} size={CELL} padH={PAD} />
        <div style={{ marginTop: 8 }}><ScoreRow label="BACK" holes={data.holes.slice(9)} total={data.backTotal} data={data} size={CELL} padH={PAD} /></div>
        {is19 && <><div style={{ height: 1, backgroundColor: data.primaryColor, opacity: 0.18, margin: `48px ${PAD}px 36px` }} /><ParBlock data={data} pad={PAD} /></>}
      </div>

      {/* Logo — upper right in photo */}
      <Logo data={data} top={28} right={36} size={100} />
    </div>
  );
}

// ── LAYOUT 7: Magazine ────────────────────────────────────────────────────────
//  Full-bleed photo behind everything. Player name CENTERED in large typography.
//  Score displayed in a glowing circular badge, centered on the card.
//  Scorecard lives in a solid dark strip at the bottom — like a Golf Digest cover.

function LayoutMagazine({ data }: { data: ScorecardData }) {
  const H        = data.outputFormat === '1080x1440' ? 1440 : 1920;
  const is19     = H === 1920;
  const PAD      = 46;
  const CELL     = 72;
  const BADGE_D  = 186;
  const STRIP_Y  = Math.floor(H * 0.69);

  const fnCSS  = applyFont(data.firstNameFont, SCRIPT_FONTS);
  const lnCSS  = applyFont(data.lastNameFont,  DISPLAY_FONTS);
  const scCSS  = applyFont(data.scoreFont,     DISPLAY_FONTS);
  const trCSS  = applyFont(data.tournamentFont, TOURNAMENT_FONTS);

  const badgeLeft = Math.floor(CARD_WIDTH / 2 - BADGE_D / 2);
  const badgeCY   = Math.floor(H * 0.555); // center y
  const badgeTop  = badgeCY - BADGE_D / 2;

  return (
    <div style={{ width: CARD_WIDTH, height: H, position: 'relative', overflow: 'hidden', backgroundColor: data.backgroundColor }}>

      {/* Full-bleed photo */}
      <div style={{ position: 'absolute', inset: 0 }}><PhotoBg data={data} /></div>

      {/* Radial spotlight vignette (darkens edges) */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 50% 38%, transparent 30%, rgba(0,0,0,0.55) 100%)' }} />

      {/* Heavy bottom gradient → feeds into strip */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 30%, ${data.backgroundColor}bb 58%, ${data.backgroundColor}f5 72%, ${data.backgroundColor} 100%)` }} />

      {/* Logo — top center */}
      {data.logoUrl && (
        <div style={{ position: 'absolute', top: 32, left: CARD_WIDTH / 2 - 55, width: 110, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.8))', zIndex: 5 }}>
          <img src={data.logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      )}

      {/* First name — centered */}
      <div style={{ position: 'absolute', top: Math.floor(H * 0.30), left: 0, right: 0, textAlign: 'center', userSelect: 'none', zIndex: 3 }}>
        <span style={{ fontSize: Math.min(data.firstNameSize, 112), ...fnCSS, color: '#ffffff', lineHeight: 1, textShadow: '2px 2px 24px rgba(0,0,0,0.8), 0 0 60px rgba(0,0,0,0.5)' }}>{data.playerFirstName}</span>
      </div>

      {/* Last name — centered, below first name */}
      <div style={{ position: 'absolute', top: Math.floor(H * 0.38), left: PAD, right: PAD, textAlign: 'center', userSelect: 'none', zIndex: 3 }}>
        <span style={{ fontSize: Math.min(data.lastNameSize, 145), ...lnCSS, color: data.primaryColor, display: 'block', lineHeight: 0.9, textTransform: 'uppercase', textShadow: '0 4px 24px rgba(0,0,0,0.65)' }}>{data.playerLastName}</span>
      </div>

      {/* Score badge — glowing circle, centered */}
      <div style={{
        position: 'absolute', top: badgeTop, left: badgeLeft,
        width: BADGE_D, height: BADGE_D, borderRadius: '50%',
        border: `5px solid ${data.primaryColor}`,
        backgroundColor: `${data.backgroundColor}dd`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 0 0 1px ${data.primaryColor}33, 0 0 40px ${data.primaryColor}55, 0 8px 40px rgba(0,0,0,0.7)`,
        zIndex: 4,
      }}>
        <span style={{ fontSize: 82, ...scCSS, color: data.primaryColor, letterSpacing: -4, lineHeight: 1 }}>{data.totalScore}</span>
        <span style={{ fontSize: 22, fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontWeight: 300, color: data.tournamentColor, letterSpacing: 3, textTransform: 'uppercase', marginTop: -2 }}>{data.relativeToPar}</span>
      </div>

      {/* Solid dark strip at bottom — scorecard lives here */}
      <div style={{ position: 'absolute', top: STRIP_Y, left: 0, right: 0, bottom: 0, backgroundColor: data.backgroundColor, zIndex: 2 }}>
        <div style={{ height: 5, backgroundColor: data.primaryColor }} />

        {/* Tournament — centered */}
        <div style={{ paddingTop: 14, paddingLeft: PAD, paddingRight: PAD, textAlign: 'center' }}>
          <span style={{ fontSize: data.tournamentSize * 0.85, ...trCSS, color: data.tournamentColor, textTransform: 'uppercase', display: 'block' }}>{data.tournamentName}</span>
          {data.roundName && <span style={{ fontSize: data.roundSize * 0.85, ...trCSS, color: data.tournamentColor, opacity: 0.6, textTransform: 'uppercase', marginTop: 4, display: 'block' }}>{data.roundName}</span>}
        </div>

        <div style={{ height: 1, backgroundColor: data.primaryColor, opacity: 0.25, margin: `${is19 ? 24 : 15}px ${PAD}px` }} />

        <ScoreRow label="FRONT" holes={data.holes.slice(0,9)} total={data.frontTotal} data={data} size={CELL} padH={PAD} />
        <div style={{ marginTop: 6 }}><ScoreRow label="BACK" holes={data.holes.slice(9)} total={data.backTotal} data={data} size={CELL} padH={PAD} /></div>

        {is19 && (
          <>
            <div style={{ height: 1, backgroundColor: data.primaryColor, opacity: 0.18, margin: '48px 46px 38px' }} />
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 22 }}>
              <span style={{ fontSize: 130, fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontWeight: 900, color: data.primaryColor, letterSpacing: -5, lineHeight: 1 }}>{data.relativeToPar}</span>
              <span style={{ fontSize: 30, fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontWeight: 300, color: data.tournamentColor, letterSpacing: 5, textTransform: 'uppercase', opacity: 0.8 }}>
                {data.relativeToPar.startsWith('-') ? 'UNDER PAR' : 'OVER PAR'}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main Switch ───────────────────────────────────────────────────────────────

export function ScorecardGraphic({ data }: { data: ScorecardData }) {
  const layout = data.layout ?? 'classic';
  if (layout === 'split')      return <LayoutSplit      data={data} />;
  if (layout === 'full-bleed') return <LayoutFullBleed  data={data} />;
  if (layout === 'banner')     return <LayoutBanner     data={data} />;
  if (layout === 'diagonal')   return <LayoutDiagonal   data={data} />;
  if (layout === 'broadcast')  return <LayoutBroadcast  data={data} />;
  if (layout === 'magazine')   return <LayoutMagazine   data={data} />;
  return <LayoutClassic data={data} />;
}
