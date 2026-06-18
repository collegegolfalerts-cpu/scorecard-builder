'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { ScorecardData, HoleScore, CustomFont } from '@/types';
import { ScorecardGraphic, CARD_WIDTH } from '@/components/scorecard-graphic';
import { ScoreEditor } from '@/components/score-editor';

// ── Default state ──────────────────────────────────────────────────────────────

const DEFAULT_HOLES: HoleScore[] = Array.from({ length: 18 }, () => ({ score: 4, indicator: 'none' }));

const DEFAULT_DATA: ScorecardData = {
  playerFirstName: 'Luke',
  playerLastName: 'COYLE',
  tournamentName: '2025 DOGWOOD INVITATIONAL',
  roundName: 'FINAL ROUND',
  totalScore: 65,
  relativeToPar: '-7',
  holes: DEFAULT_HOLES,
  frontTotal: 32,
  backTotal: 33,
  autoCalcTotals: false,
  photoUrl: null,
  logoUrl: null,
  primaryColor: '#C8A951',
  backgroundColor: '#1a1a1a',
  tournamentColor: '#aaaaaa',
  birdieColor: '#EF4444',
  bogeyColor: '#ffffff',
  eagleColor: '#22C55E',
  parColor: '#ffffff',
  doubleBogeyColor: '#ffffff',
  albatrossColor: '#C084FC',
  firstNameFont: 'dancing',
  firstNameSize: 88,
  firstNameX: 46,
  firstNameYPct: 38,
  lastNameFont: 'oswald',
  lastNameSize: 148,
  lastNameXPct: 0,
  scoreFont: 'oswald',
  scoreSize: 300,
  scoreRight: 30,
  scoreTopPct: 8,
  tournamentFont: 'oswald-light',
  tournamentSize: 28,
  roundSize: 22,
  lowerPanelYPct: 44,
  photoYPosition: 20,
  layout: 'classic',
  outputFormat: '1080x1440',
};

// ── Page ───────────────────────────────────────────────────────────────────────

export default function Home() {
  const [data, setData] = useState<ScorecardData>(DEFAULT_DATA);
  const [customFonts, setCustomFonts] = useState<CustomFont[]>([]);
  const [exporting, setExporting] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);

  const previewPanelRef = useRef<HTMLDivElement>(null);
  const exportRef       = useRef<HTMLDivElement>(null);
  const fontStyleRef    = useRef<HTMLStyleElement | null>(null);

  // ── Auto-scale preview to panel width ─────────────────────────────────────
  useEffect(() => {
    const panel = previewPanelRef.current;
    if (!panel) return;
    const ro = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width;
      setPreviewScale(w / CARD_WIDTH);
    });
    ro.observe(panel);
    return () => ro.disconnect();
  }, []);

  // ── Inject @font-face rules when customFonts change ────────────────────────
  useEffect(() => {
    if (fontStyleRef.current) fontStyleRef.current.remove();
    if (customFonts.length === 0) { fontStyleRef.current = null; return; }

    const css = customFonts.map(f => `
      @font-face {
        font-family: '${f.family}';
        src: url('${f.dataUrl}');
        font-weight: normal;
        font-style: normal;
      }
    `).join('\n');

    const style = document.createElement('style');
    style.id = 'custom-fonts-injected';
    style.textContent = css;
    document.head.appendChild(style);
    fontStyleRef.current = style;
  }, [customFonts]);

  // ── Auto-calc totals ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!data.autoCalcTotals) return;
    const front = data.holes.slice(0, 9).reduce((s, h) => s + h.score, 0);
    const back  = data.holes.slice(9, 18).reduce((s, h) => s + h.score, 0);
    setData(prev => ({ ...prev, frontTotal: front, backTotal: back, totalScore: front + back }));
  }, [data.holes, data.autoCalcTotals]);

  // ── Hole update helper ─────────────────────────────────────────────────────
  const updateHole = useCallback((index: number, updates: Partial<HoleScore>) => {
    setData(prev => {
      const holes = prev.holes.map((h, i) => i === index ? { ...h, ...updates } : h);
      return { ...prev, holes };
    });
  }, []);

  // ── Custom font upload ─────────────────────────────────────────────────────
  const handleFontUpload = useCallback((files: FileList) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const id = Math.random().toString(36).slice(2, 10);
        const baseName = file.name.replace(/\.[^.]+$/, '');
        const family = 'cf-' + baseName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() + '-' + id.slice(0, 4);
        const displayName = baseName.replace(/[-_]/g, ' ');
        const font: CustomFont = { id, name: displayName, family, dataUrl };
        setCustomFonts(prev => [...prev, font]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFontRename = useCallback((id: string, name: string) => {
    setCustomFonts(prev => prev.map(f => f.id === id ? { ...f, name } : f));
  }, []);

  const handleFontRemove = useCallback((id: string) => {
    setCustomFonts(prev => {
      const removed = prev.find(f => f.id === id);
      if (!removed) return prev;
      const resetKey = (key: string, def: string) => key === `custom:${removed.family}` ? def : key;
      setData(d => ({
        ...d,
        firstNameFont:  resetKey(d.firstNameFont,  'dancing'),
        lastNameFont:   resetKey(d.lastNameFont,   'oswald'),
        scoreFont:      resetKey(d.scoreFont,      'oswald'),
        tournamentFont: resetKey(d.tournamentFont, 'oswald-light'),
      }));
      return prev.filter(f => f.id !== id);
    });
  }, []);

  // ── Export ─────────────────────────────────────────────────────────────────
  const handleExport = useCallback(async () => {
    const el = exportRef.current;
    if (!el) return;
    setExporting(true);
    try {
      await document.fonts.ready;
      await new Promise(r => setTimeout(r, 400));
      const cardHeight = data.outputFormat === '1080x1440' ? 1440 : 1920;
      const dataUrl = await toPng(el, {
        width: CARD_WIDTH, height: cardHeight,
        pixelRatio: 1, cacheBust: true,
        style: { transform: 'none' },
      });
      const link = document.createElement('a');
      link.download = `scorecard-${data.playerFirstName.toLowerCase()}-${data.playerLastName.toLowerCase()}-${data.outputFormat}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
      alert('Export failed — please try again.');
    } finally {
      setExporting(false);
    }
  }, [data]);

  const cardHeight = data.outputFormat === '1080x1440' ? 1440 : 1920;

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      {/* ── LEFT: Editor panel ── */}
      <div className="w-[380px] shrink-0 bg-gray-900 border-r border-gray-800 overflow-y-auto">
        <div className="p-4 border-b border-gray-800 bg-gray-900/80 sticky top-0 z-10 backdrop-blur">
          <h1 className="text-base font-bold text-white tracking-tight">⛳ Scorecard Builder</h1>
          <p className="text-xs text-gray-400 mt-0.5">Professional golf scorecard graphics</p>
        </div>
        <ScoreEditor
          data={data}
          setData={setData}
          updateHole={updateHole}
          customFonts={customFonts}
          onFontUpload={handleFontUpload}
          onFontRename={handleFontRename}
          onFontRemove={handleFontRemove}
          onExport={handleExport}
          exporting={exporting}
        />
      </div>

      {/* ── RIGHT: Preview panel ── */}
      <div className="flex-1 overflow-auto bg-gray-950 p-6 flex items-start justify-center">
        <div className="w-full max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gray-800 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-300 border border-gray-700">
              {data.outputFormat} &nbsp;·&nbsp; {Math.round(previewScale * 100)}% preview
            </div>
            <button onClick={handleExport} disabled={exporting}
              className="text-xs bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
              {exporting ? 'Exporting…' : '↓ Export PNG'}
            </button>
          </div>

          {/* Scaled preview */}
          <div ref={previewPanelRef} className="w-full">
            <div style={{ width: CARD_WIDTH, height: cardHeight, transform: `scale(${previewScale})`, transformOrigin: 'top left', pointerEvents: 'none' }}>
              <ScorecardGraphic data={data} />
            </div>
            <div style={{ height: cardHeight * previewScale }} />
          </div>
        </div>
      </div>

      {/* ── OFF-SCREEN export target ── */}
      <div style={{ position: 'fixed', left: -(CARD_WIDTH * 2 + 100), top: 0, width: CARD_WIDTH, height: cardHeight, overflow: 'hidden', zIndex: -1 }}>
        <div ref={exportRef} style={{ width: CARD_WIDTH, height: cardHeight }}>
          <ScorecardGraphic data={data} />
        </div>
      </div>
    </div>
  );
}
