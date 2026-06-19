'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { ScorecardData, HoleScore, CustomFont } from '@/types';
import { ScorecardGraphic, CARD_WIDTH } from '@/components/scorecard-graphic';
import { ScoreEditor } from '@/components/score-editor';

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

export default function Home() {
  const [data, setData] = useState<ScorecardData>(DEFAULT_DATA);
  const [customFonts, setCustomFonts] = useState<CustomFont[]>([]);
  const [exporting, setExporting] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);

  const previewPanelRef = useRef<HTMLDivElement>(null);
  const exportRef       = useRef<HTMLDivElement>(null);
  const fontStyleRef    = useRef<HTMLStyleElement | null>(null);

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

  useEffect(() => {
    if (fontStyleRef.current) fontStyleRef.current.remove();
    if (customFonts.length === 0) { fontStyleRef.current = null; return; }
    const css = customFonts.map(f => `@font-face { font-family: '${f.family}'; src: url('${f.dataUrl}'); font-weight: normal; font-style: normal; }`).join('\n');
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    fontStyleRef.current = style;
  }, [customFonts]);

  useEffect(() => {
    if (!data.autoCalcTotals) return;
    const front = data.holes.slice(0, 9).reduce((s, h) => s + h.score, 0);
    const back  = data.holes.slice(9, 18).reduce((s, h) => s + h.score, 0);
    setData(prev => ({ ...prev, frontTotal: front, backTotal: back, totalScore: front + back }));
  }, [data.holes, data.autoCalcTotals]);

  const updateHole = useCallback((index: number, updates: Partial<HoleScore>) => {
    setData(prev => {
      const holes = prev.holes.map((h, i) => i === index ? { ...h, ...updates } : h);
      return { ...prev, holes };
    });
  }, []);

  const handleFontUpload = useCallback((files: FileList) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const id = Math.random().toString(36).slice(2, 10);
        const baseName = file.name.replace(/\.[^.]+$/, '');
        const family = 'cf-' + baseName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() + '-' + id.slice(0, 4);
        setCustomFonts(prev => [...prev, { id, name: baseName.replace(/[-_]/g, ' '), family, dataUrl }]);
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
      const reset = (key: string, def: string) => key === `custom:${removed.family}` ? def : key;
      setData(d => ({ ...d, firstNameFont: reset(d.firstNameFont, 'dancing'), lastNameFont: reset(d.lastNameFont, 'oswald'), scoreFont: reset(d.scoreFont, 'oswald'), tournamentFont: reset(d.tournamentFont, 'oswald-light') }));
      return prev.filter(f => f.id !== id);
    });
  }, []);

  const handleExport = useCallback(async () => {
    const el = exportRef.current;
    if (!el) return;
    setExporting(true);
    try {
      await document.fonts.ready;
      await new Promise(r => setTimeout(r, 400));
      const cardHeight = data.outputFormat === '1080x1440' ? 1440 : 1920;
      const dataUrl = await toPng(el, { width: CARD_WIDTH, height: cardHeight, pixelRatio: 1, cacheBust: true, style: { transform: 'none' } });
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

      {/* ── LEFT: Editor ── */}
      <div className="w-[390px] shrink-0 flex flex-col bg-gray-900 border-r border-gray-800/80 overflow-hidden">
        {/* Header */}
        <div className="shrink-0">
          {/* Gold top accent bar */}
          <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, #C8A951, #f0d080, #C8A951)' }} />
          <div className="px-5 py-4 flex items-center gap-3 border-b border-gray-800/80" style={{ background: 'linear-gradient(to bottom, #1c1c1c, #161616)' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: 'linear-gradient(135deg, #1a3a2a, #0d2018)', border: '1px solid #2a5a3a' }}>⛳</div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight leading-none">Scorecard Builder</h1>
              <p className="text-[11px] text-gray-500 mt-1 leading-none">College Golf · Social Graphics</p>
            </div>
            <div className="ml-auto">
              <div className="text-[10px] font-semibold px-2 py-1 rounded-full border" style={{ color: '#C8A951', borderColor: '#C8A951', opacity: 0.8 }}>
                7 LAYOUTS
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable editor */}
        <div className="flex-1 overflow-y-auto">
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
      </div>

      {/* ── RIGHT: Preview ── */}
      <div className="flex-1 overflow-auto flex flex-col" style={{
        backgroundColor: '#0a0a0c',
        backgroundImage: 'radial-gradient(circle, #1a1a22 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
      }}>
        {/* Preview toolbar */}
        <div className="shrink-0 flex items-center justify-between px-6 py-3.5 border-b border-white/5" style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-gray-300">Live Preview</span>
            </div>
            <span className="text-xs text-gray-600">{data.outputFormat} · {Math.round(previewScale * 100)}%</span>
          </div>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg transition-all disabled:opacity-40"
            style={{ background: exporting ? '#333' : 'linear-gradient(135deg, #16a34a, #15803d)', color: 'white', boxShadow: exporting ? 'none' : '0 4px 14px rgba(22,163,74,0.35)' }}
          >
            {exporting ? (
              <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Exporting…</>
            ) : (
              <>↓ Export PNG</>
            )}
          </button>
        </div>

        {/* Card preview */}
        <div className="flex-1 overflow-auto p-8 flex items-start justify-center">
          <div className="w-full max-w-xl">
            <div ref={previewPanelRef} className="w-full">
              {/* Shadow wrapper */}
              <div style={{
                width: CARD_WIDTH * previewScale,
                height: cardHeight * previewScale,
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(0,0,0,0.9), 0 12px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)',
              }}>
                <div style={{ width: CARD_WIDTH, height: cardHeight, transform: `scale(${previewScale})`, transformOrigin: 'top left', pointerEvents: 'none' }}>
                  <ScorecardGraphic data={data} />
                </div>
              </div>
            </div>

            {/* Format pills below card */}
            <div className="flex items-center justify-center gap-2 mt-5">
              {(['1080x1440', '1080x1920'] as const).map(fmt => (
                <button
                  key={fmt}
                  onClick={() => setData(prev => ({ ...prev, outputFormat: fmt }))}
                  className="text-xs font-semibold px-4 py-2 rounded-full transition-all"
                  style={data.outputFormat === fmt
                    ? { backgroundColor: '#C8A951', color: '#0a0a0a', boxShadow: '0 4px 16px rgba(200,169,81,0.4)' }
                    : { backgroundColor: 'rgba(255,255,255,0.07)', color: '#888', border: '1px solid rgba(255,255,255,0.1)' }
                  }
                >
                  {fmt === '1080x1440' ? '📱 Feed (1080×1440)' : '📲 Story (1080×1920)'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Off-screen export target */}
      <div style={{ position: 'fixed', left: -(CARD_WIDTH * 2 + 100), top: 0, width: CARD_WIDTH, height: cardHeight, overflow: 'hidden', zIndex: -1 }}>
        <div ref={exportRef} style={{ width: CARD_WIDTH, height: cardHeight }}>
          <ScorecardGraphic data={data} />
        </div>
      </div>
    </div>
  );
}
