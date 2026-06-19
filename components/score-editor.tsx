'use client';

import { useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Upload, Trash, Image, Download, Plus, ChevronRight } from 'lucide-react';
import { ScorecardData, HoleScore, ScoreIndicator, CustomFont, CardLayout } from '@/types';
import { SCRIPT_FONTS, DISPLAY_FONTS, TOURNAMENT_FONTS, CARD_WIDTH } from '@/components/scorecard-graphic';

// ── Layout Picker ─────────────────────────────────────────────────────────────

const LAYOUTS: { id: CardLayout; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    id: 'classic', label: 'Classic', desc: 'Photo top · scorecard below',
    icon: <svg viewBox="0 0 52 72" fill="none" className="w-full h-full"><rect x="1" y="1" width="50" height="70" rx="2" fill="#1a1a1a" stroke="#333" strokeWidth="1"/><rect x="1" y="1" width="50" height="30" rx="2" fill="#2a4a6a"/><rect x="1" y="28" width="50" height="3" fill="#C8A951"/><rect x="6" y="36" width="40" height="4" rx="1" fill="#C8A951" opacity="0.9"/><rect x="6" y="44" width="26" height="3" rx="1" fill="#444"/><rect x="6" y="51" width="40" height="8" rx="1" fill="#2a2a2a"/><rect x="6" y="62" width="40" height="8" rx="1" fill="#2a2a2a"/></svg>,
  },
  {
    id: 'split', label: 'Side Pillar', desc: 'Photo left · content right',
    icon: <svg viewBox="0 0 52 72" fill="none" className="w-full h-full"><rect x="1" y="1" width="50" height="70" rx="2" fill="#1a1a1a" stroke="#333" strokeWidth="1"/><rect x="1" y="1" width="19" height="70" rx="2" fill="#2a4a6a"/><rect x="20" y="1" width="3" height="70" fill="#C8A951"/><rect x="26" y="8" width="20" height="8" rx="1" fill="#C8A951" opacity="0.9"/><rect x="26" y="20" width="20" height="4" rx="1" fill="#444"/><rect x="26" y="28" width="20" height="14" rx="1" fill="#2a2a2a"/><rect x="26" y="46" width="20" height="14" rx="1" fill="#2a2a2a"/></svg>,
  },
  {
    id: 'full-bleed', label: 'Full Bleed', desc: 'Photo behind everything',
    icon: <svg viewBox="0 0 52 72" fill="none" className="w-full h-full"><rect x="1" y="1" width="50" height="70" rx="2" fill="#2a4a6a" stroke="#333" strokeWidth="1"/><rect x="1" y="37" width="50" height="34" rx="2" fill="#0a0a0aee"/><rect x="1" y="37" width="50" height="3" fill="#C8A951"/><rect x="6" y="43" width="40" height="6" rx="1" fill="#C8A951" opacity="0.85"/><rect x="6" y="53" width="26" height="3" rx="1" fill="#444"/><rect x="6" y="59" width="40" height="6" rx="1" fill="#2a2a2a"/><rect x="6" y="67" width="40" height="1" rx="1" fill="#2a2a2a"/><rect x="6" y="14" width="22" height="5" rx="1" fill="rgba(255,255,255,0.5)"/></svg>,
  },
  {
    id: 'banner', label: 'Banner', desc: 'Thin strip · data-forward',
    icon: <svg viewBox="0 0 52 72" fill="none" className="w-full h-full"><rect x="1" y="1" width="50" height="70" rx="2" fill="#1a1a1a" stroke="#333" strokeWidth="1"/><rect x="1" y="1" width="50" height="17" rx="2" fill="#2a4a6a"/><rect x="1" y="17" width="50" height="3" fill="#C8A951"/><rect x="6" y="23" width="40" height="10" rx="1" fill="#C8A951" opacity="0.8"/><rect x="6" y="36" width="22" height="6" rx="1" fill="#444"/><rect x="32" y="38" width="14" height="4" rx="1" fill="#333"/><rect x="6" y="46" width="40" height="9" rx="1" fill="#2a2a2a"/><rect x="6" y="58" width="40" height="9" rx="1" fill="#2a2a2a"/></svg>,
  },
  {
    id: 'diagonal', label: 'Diagonal', desc: 'Angled slash · bold cut',
    icon: <svg viewBox="0 0 52 72" fill="none" className="w-full h-full"><rect x="1" y="1" width="50" height="70" rx="2" fill="#1a1a1a" stroke="#333" strokeWidth="1"/><polygon points="1,1 51,1 51,22 1,40" fill="#2a4a6a"/><polygon points="1,40 51,22 51,26 1,44" fill="#C8A951"/><rect x="32" y="4" width="16" height="13" rx="1" fill="rgba(255,255,255,0.15)"/><rect x="4" y="28" width="18" height="5" rx="1" fill="rgba(255,255,255,0.3)"/><rect x="4" y="48" width="30" height="7" rx="1" fill="#C8A951" opacity="0.85"/><rect x="4" y="58" width="44" height="5" rx="1" fill="#2a2a2a"/><rect x="4" y="65" width="44" height="5" rx="1" fill="#2a2a2a"/></svg>,
  },
  {
    id: 'broadcast', label: 'Broadcast', desc: 'TV lower-third style',
    icon: <svg viewBox="0 0 52 72" fill="none" className="w-full h-full"><rect x="1" y="1" width="50" height="70" rx="2" fill="#1a1a1a" stroke="#333" strokeWidth="1"/><rect x="1" y="1" width="50" height="36" rx="2" fill="#2a4a6a"/><polygon points="4,24 18,24 18,37 4,37" fill="#C8A951"/><polygon points="15,24 18,24 18,27" fill="#1a1a1a" opacity="0.5"/><rect x="21" y="26" width="16" height="4" rx="1" fill="rgba(255,255,255,0.4)"/><rect x="21" y="32" width="24" height="4" rx="1" fill="rgba(255,255,255,0.25)"/><rect x="1" y="36" width="50" height="3" fill="#C8A951"/><rect x="4" y="42" width="28" height="3" rx="1" fill="#444"/><rect x="36" y="40" width="12" height="7" rx="1" fill="#333"/><rect x="4" y="53" width="44" height="7" rx="1" fill="#2a2a2a"/><rect x="4" y="63" width="44" height="7" rx="1" fill="#2a2a2a"/></svg>,
  },
  {
    id: 'magazine', label: 'Magazine', desc: 'Cover layout · score badge',
    icon: <svg viewBox="0 0 52 72" fill="none" className="w-full h-full"><rect x="1" y="1" width="50" height="70" rx="2" fill="#2a4a6a" stroke="#333" strokeWidth="1"/><rect x="1" y="42" width="50" height="29" fill="#0a0a0acc" rx="1"/><rect x="14" y="20" width="24" height="4" rx="1" fill="rgba(255,255,255,0.5)"/><rect x="9" y="26" width="34" height="8" rx="1" fill="#C8A951" opacity="0.9"/><circle cx="26" cy="44" r="9" fill="transparent" stroke="#C8A951" strokeWidth="2"/><text x="26" y="47" textAnchor="middle" fontSize="7" fill="#C8A951" fontWeight="bold">65</text><rect x="1" y="56" width="50" height="15" rx="1" fill="#111"/><rect x="1" y="56" width="50" height="2" fill="#C8A951"/><rect x="4" y="60" width="44" height="4" rx="1" fill="#2a2a2a"/><rect x="4" y="67" width="44" height="4" rx="1" fill="#2a2a2a"/></svg>,
  },
];

function LayoutPicker({ value, onChange }: { value: CardLayout; onChange: (v: CardLayout) => void }) {
  return (
    <div className="p-4 border-b border-gray-800/60">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest">Layout</p>
        <span className="text-[10px] text-gray-600 font-medium">{LAYOUTS.find(l => l.id === value)?.desc}</span>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-2">
        {LAYOUTS.slice(0, 4).map(l => <LayoutBtn key={l.id} l={l} active={value === l.id} onClick={() => onChange(l.id)} />)}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {LAYOUTS.slice(4).map(l => <LayoutBtn key={l.id} l={l} active={value === l.id} onClick={() => onChange(l.id)} />)}
      </div>
    </div>
  );
}

function LayoutBtn({ l, active, onClick }: { l: typeof LAYOUTS[0]; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all group ${active ? 'border-yellow-500/60 bg-yellow-500/8 shadow-sm' : 'border-gray-700/60 bg-gray-800/40 hover:border-gray-500 hover:bg-gray-800/80'}`}
      style={active ? { borderColor: '#C8A951aa', backgroundColor: '#C8A95108' } : {}}>
      <div className={`w-9 h-12 transition-opacity ${active ? 'opacity-100' : 'opacity-50 group-hover:opacity-75'}`}>{l.icon}</div>
      <span className={`text-[10px] font-semibold leading-tight text-center ${active ? 'text-yellow-400' : 'text-gray-500'}`} style={active ? { color: '#C8A951' } : {}}>{l.label}</span>
    </button>
  );
}

// ── Slider ────────────────────────────────────────────────────────────────────

function Slider({ label, value, min, max, step = 1, onChange, unit = '', secondaryValue }: {
  label: string; value: number; min: number; max: number; step?: number;
  onChange: (v: number) => void; unit?: string; secondaryValue?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-xs font-mono font-semibold" style={{ color: '#C8A951' }}>{value}{unit}{secondaryValue ? ` · ${secondaryValue}` : ''}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full h-1 rounded-full cursor-pointer bg-gray-700"
        style={{ WebkitAppearance: 'none', appearance: 'none', accentColor: '#C8A951' }}
      />
    </div>
  );
}

// ── Font Select ───────────────────────────────────────────────────────────────

function FontSelect({ label, value, builtins, customFonts, onChange }: {
  label: string; value: string;
  builtins: Record<string, { label: string }>;
  customFonts: CustomFont[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-gray-400">{label}</Label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full text-sm bg-gray-800/80 border border-gray-700/60 rounded-lg px-2.5 py-2 text-gray-200 focus:outline-none focus:border-gray-500 transition-colors">
        {customFonts.length > 0 ? (
          <><optgroup label="✦ Custom Fonts">{customFonts.map(f => <option key={`custom:${f.family}`} value={`custom:${f.family}`}>★ {f.name}</option>)}</optgroup>
          <optgroup label="Built-in Fonts">{Object.entries(builtins).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</optgroup></>
        ) : Object.entries(builtins).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
      </select>
    </div>
  );
}

// ── Color Picker ──────────────────────────────────────────────────────────────

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3 bg-gray-800/40 rounded-xl px-3 py-2.5 border border-gray-700/40">
      <span className="text-xs text-gray-400 flex-1 min-w-0">{label}</span>
      <div className="flex items-center gap-2 shrink-0">
        <div className="relative">
          <div className="w-7 h-7 rounded-lg border-2 border-gray-600 cursor-pointer overflow-hidden" style={{ backgroundColor: value }}>
            <input type="color" value={value} onChange={e => onChange(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
          </div>
        </div>
        <input type="text" value={value}
          onChange={e => { if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) onChange(e.target.value); }}
          className="w-20 font-mono text-xs bg-gray-900/60 border border-gray-700/60 rounded-lg px-2 py-1.5 text-gray-200 focus:outline-none focus:border-gray-500 text-center"
          maxLength={7}
        />
      </div>
    </div>
  );
}

// ── Hole Row ──────────────────────────────────────────────────────────────────

const INDICATOR_COLORS: Record<ScoreIndicator, string> = {
  none: '#6b7280', birdie: '#EF4444', eagle: '#22C55E',
  albatross: '#C084FC', bogey: '#9ca3af', 'double-bogey': '#f97316',
};

const INDICATOR_LABELS: Record<ScoreIndicator, string> = {
  none: '— Par', birdie: '○ Birdie', eagle: '◎ Eagle',
  albatross: '⊚ Albatross', bogey: '□ Bogey', 'double-bogey': '⊡ Dbl Bogey',
};

function HoleRow({ holeNumber, hole, onChange }: { holeNumber: number; hole: HoleScore; onChange: (u: Partial<HoleScore>) => void }) {
  const color = INDICATOR_COLORS[hole.indicator];
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: '#1a1a1a' }}>
        <span className="text-[10px] font-bold text-gray-500">{holeNumber}</span>
      </div>
      <input type="number" value={hole.score} min={1} max={20}
        onChange={e => onChange({ score: parseInt(e.target.value) || 1 })}
        className="w-10 text-center text-sm font-bold bg-gray-800/80 border border-gray-700/60 rounded-lg py-1.5 text-white focus:outline-none focus:border-gray-500 shrink-0"
      />
      <select value={hole.indicator} onChange={e => onChange({ indicator: e.target.value as ScoreIndicator })}
        className="flex-1 text-xs bg-gray-800/80 border border-gray-700/60 rounded-lg px-2 py-1.5 focus:outline-none focus:border-gray-500 min-w-0 font-medium"
        style={{ color }}>
        {(Object.entries(INDICATOR_LABELS) as [ScoreIndicator, string][]).map(([k, v]) => (
          <option key={k} value={k} style={{ color: INDICATOR_COLORS[k] }}>{v}</option>
        ))}
      </select>
    </div>
  );
}

// ── Section Card ──────────────────────────────────────────────────────────────

function SectionCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-700/40 overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-800/60 border-b border-gray-700/40">
        <span className="text-sm">{icon}</span>
        <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">{title}</span>
      </div>
      <div className="p-3 space-y-3 bg-gray-800/20">
        {children}
      </div>
    </div>
  );
}

// ── Color Presets ─────────────────────────────────────────────────────────────

const PRESETS = [
  { name: 'Navy',    bg: '#1C2541', primary: '#4a7fa5', colors: { backgroundColor: '#1C2541', primaryColor: '#4a7fa5', tournamentColor: '#A0B8D8', parColor: '#ffffff', birdieColor: '#EF4444', eagleColor: '#22C55E', bogeyColor: '#ffffff', doubleBogeyColor: '#ffffff', albatrossColor: '#C084FC' } },
  { name: 'Red',     bg: '#f0ede6', primary: '#8B0000', colors: { backgroundColor: '#f0ede6', primaryColor: '#8B0000', tournamentColor: '#444444', parColor: '#222222', birdieColor: '#cc0000', eagleColor: '#0a7a0a', bogeyColor: '#222222', doubleBogeyColor: '#222222', albatrossColor: '#7c3aed' } },
  { name: 'Masters', bg: '#0d3b2e', primary: '#C9A84C', colors: { backgroundColor: '#0d3b2e', primaryColor: '#C9A84C', tournamentColor: '#8fbea0', parColor: '#ffffff', birdieColor: '#C9A84C', eagleColor: '#ffffff', bogeyColor: '#ffffff', doubleBogeyColor: '#ffffff', albatrossColor: '#f9a8d4' } },
  { name: 'Steel',   bg: '#0f1923', primary: '#6CB4E4', colors: { backgroundColor: '#0f1923', primaryColor: '#6CB4E4', tournamentColor: '#90b8cc', parColor: '#e0e8f0', birdieColor: '#ff6b6b', eagleColor: '#51cf66', bogeyColor: '#e0e8f0', doubleBogeyColor: '#e0e8f0', albatrossColor: '#cc5de8' } },
  { name: 'Carbon',  bg: '#212121', primary: '#e5e5e5', colors: { backgroundColor: '#212121', primaryColor: '#e5e5e5', tournamentColor: '#9e9e9e', parColor: '#e5e5e5', birdieColor: '#ff5252', eagleColor: '#69f0ae', bogeyColor: '#e5e5e5', doubleBogeyColor: '#e5e5e5', albatrossColor: '#ea80fc' } },
  { name: 'Gold',    bg: '#1a1400', primary: '#FFD700', colors: { backgroundColor: '#1a1400', primaryColor: '#FFD700', tournamentColor: '#c9a84c', parColor: '#ffffff', birdieColor: '#FFD700', eagleColor: '#ffffff', bogeyColor: '#ffffff', doubleBogeyColor: '#ffffff', albatrossColor: '#ff6b9d' } },
];

// ── Editor ────────────────────────────────────────────────────────────────────

interface EditorProps {
  data: ScorecardData;
  setData: React.Dispatch<React.SetStateAction<ScorecardData>>;
  updateHole: (index: number, updates: Partial<HoleScore>) => void;
  customFonts: CustomFont[];
  onFontUpload: (files: FileList) => void;
  onFontRename: (id: string, name: string) => void;
  onFontRemove: (id: string) => void;
  onExport: () => void;
  exporting: boolean;
}

export function ScoreEditor({ data, setData, updateHole, customFonts, onFontUpload, onFontRename, onFontRemove, onExport, exporting }: EditorProps) {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef  = useRef<HTMLInputElement>(null);
  const fontInputRef  = useRef<HTMLInputElement>(null);

  const cardHeight = data.outputFormat === '1080x1440' ? 1440 : 1920;
  const update = (u: Partial<ScorecardData>) => setData(prev => ({ ...prev, ...u }));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'photoUrl' | 'logoUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setData(prev => ({ ...prev, [field]: reader.result as string }));
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="pb-10">
      <LayoutPicker value={data.layout ?? 'classic'} onChange={v => update({ layout: v })} />

      <div className="p-3">
        <Tabs defaultValue="player">
          <TabsList className="w-full grid grid-cols-5 mb-4 p-1 rounded-xl bg-gray-800/60 border border-gray-700/40">
            {[
              { value: 'player',  icon: '👤', label: 'Player' },
              { value: 'scores',  icon: '⛳', label: 'Scores' },
              { value: 'type',    icon: 'Aa', label: 'Type'   },
              { value: 'colors',  icon: '🎨', label: 'Colors' },
              { value: 'format',  icon: '↓',  label: 'Export' },
            ].map(tab => (
              <TabsTrigger key={tab.value} value={tab.value}
                className="flex flex-col items-center gap-0.5 py-2 rounded-lg text-[10px] font-semibold data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-500 transition-all">
                <span className="text-sm leading-none">{tab.icon}</span>
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ───── PLAYER ───── */}
          <TabsContent value="player" className="space-y-3 mt-0">
            <SectionCard title="Player Info" icon="🏌️">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-400">First Name</Label>
                  <Input value={data.playerFirstName} onChange={e => update({ playerFirstName: e.target.value })} placeholder="Luke" className="bg-gray-900/60 border-gray-700/60 text-white h-9 text-sm rounded-lg" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-400">Last Name</Label>
                  <Input value={data.playerLastName} onChange={e => update({ playerLastName: e.target.value })} placeholder="COYLE" className="bg-gray-900/60 border-gray-700/60 text-white h-9 text-sm rounded-lg" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-gray-400">Tournament Name</Label>
                <Input value={data.tournamentName} onChange={e => update({ tournamentName: e.target.value })} placeholder="2025 DOGWOOD INVITATIONAL" className="bg-gray-900/60 border-gray-700/60 text-white h-9 text-sm rounded-lg" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-gray-400">Round</Label>
                <Input value={data.roundName} onChange={e => update({ roundName: e.target.value })} placeholder="FINAL ROUND" className="bg-gray-900/60 border-gray-700/60 text-white h-9 text-sm rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-400">Total Score</Label>
                  <Input type="number" value={data.totalScore} onChange={e => update({ totalScore: parseInt(e.target.value) || 0 })} readOnly={data.autoCalcTotals} className="bg-gray-900/60 border-gray-700/60 text-white h-9 text-sm rounded-lg" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-400">Score to Par</Label>
                  <Input value={data.relativeToPar} onChange={e => update({ relativeToPar: e.target.value })} placeholder="-7" className="bg-gray-900/60 border-gray-700/60 text-white h-9 text-sm rounded-lg" />
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Player Photo" icon="📷">
              {data.photoUrl ? (
                <div className="relative group rounded-xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={data.photoUrl} alt="Player" className="w-full h-40 object-cover object-top" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button onClick={() => photoInputRef.current?.click()} className="bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-3 py-2 rounded-lg backdrop-blur-sm transition-colors">Change</button>
                    <button onClick={() => update({ photoUrl: null })} className="bg-red-500/80 hover:bg-red-500 text-white text-xs font-medium px-3 py-2 rounded-lg backdrop-blur-sm transition-colors flex items-center gap-1"><Trash className="w-3 h-3" />Remove</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => photoInputRef.current?.click()} className="w-full border-2 border-dashed border-gray-600 hover:border-gray-400 rounded-xl py-8 flex flex-col items-center gap-3 text-gray-500 hover:text-gray-300 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gray-800 group-hover:bg-gray-700 flex items-center justify-center transition-colors">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-center"><p className="text-xs font-medium">Upload player photo</p><p className="text-[11px] text-gray-600 mt-0.5">JPG, PNG, HEIC supported</p></div>
                </button>
              )}
              <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={e => handleFileUpload(e, 'photoUrl')} />
            </SectionCard>

            <SectionCard title="Tournament Logo" icon="🏆">
              {data.logoUrl ? (
                <div className="flex items-center gap-3 bg-gray-900/40 rounded-xl p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={data.logoUrl} alt="Logo" className="h-14 w-14 object-contain rounded-lg" />
                  <div className="flex-1"><p className="text-xs font-medium text-gray-300">Logo uploaded</p><button onClick={() => logoInputRef.current?.click()} className="text-[11px] mt-1 transition-colors" style={{ color: '#C8A951' }}>Change logo</button></div>
                  <button onClick={() => update({ logoUrl: null })} className="bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg p-2 transition-colors"><Trash className="w-3.5 h-3.5" /></button>
                </div>
              ) : (
                <button onClick={() => logoInputRef.current?.click()} className="w-full border-2 border-dashed border-gray-600 hover:border-gray-400 rounded-xl py-5 flex items-center justify-center gap-3 text-gray-500 hover:text-gray-300 transition-all">
                  <Image className="w-5 h-5" /><span className="text-xs font-medium">Upload tournament logo</span>
                </button>
              )}
              <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={e => handleFileUpload(e, 'logoUrl')} />
            </SectionCard>
          </TabsContent>

          {/* ───── SCORES ───── */}
          <TabsContent value="scores" className="mt-0 space-y-3">
            <div className="flex items-center justify-between bg-gray-800/40 rounded-xl px-4 py-3 border border-gray-700/40">
              <div>
                <p className="text-xs font-semibold text-gray-200">Auto-calculate totals</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Sums your hole scores automatically</p>
              </div>
              <Switch checked={data.autoCalcTotals} onCheckedChange={v => update({ autoCalcTotals: v })} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Front 9 */}
              <div className="rounded-xl border border-gray-700/40 overflow-hidden">
                <div className="text-center py-2 bg-gray-800/60 border-b border-gray-700/40">
                  <span className="text-xs font-bold text-gray-300 tracking-widest">FRONT 9</span>
                </div>
                <div className="p-2 space-y-1.5 bg-gray-800/20">
                  {data.holes.slice(0, 9).map((hole, i) => <HoleRow key={i} holeNumber={i + 1} hole={hole} onChange={u => updateHole(i, u)} />)}
                </div>
                <div className="px-2 py-2 bg-gray-800/40 border-t border-gray-700/40 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400">OUT</span>
                  {data.autoCalcTotals
                    ? <span className="text-sm font-black" style={{ color: '#C8A951' }}>{data.frontTotal}</span>
                    : <input type="number" value={data.frontTotal} onChange={e => update({ frontTotal: parseInt(e.target.value) || 0 })} className="w-12 text-center text-sm font-black bg-transparent border-b border-gray-600 focus:border-yellow-500 focus:outline-none" style={{ color: '#C8A951' }} />}
                </div>
              </div>

              {/* Back 9 */}
              <div className="rounded-xl border border-gray-700/40 overflow-hidden">
                <div className="text-center py-2 bg-gray-800/60 border-b border-gray-700/40">
                  <span className="text-xs font-bold text-gray-300 tracking-widest">BACK 9</span>
                </div>
                <div className="p-2 space-y-1.5 bg-gray-800/20">
                  {data.holes.slice(9, 18).map((hole, i) => <HoleRow key={i + 9} holeNumber={i + 10} hole={hole} onChange={u => updateHole(i + 9, u)} />)}
                </div>
                <div className="px-2 py-2 bg-gray-800/40 border-t border-gray-700/40 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400">IN</span>
                  {data.autoCalcTotals
                    ? <span className="text-sm font-black" style={{ color: '#C8A951' }}>{data.backTotal}</span>
                    : <input type="number" value={data.backTotal} onChange={e => update({ backTotal: parseInt(e.target.value) || 0 })} className="w-12 text-center text-sm font-black bg-transparent border-b border-gray-600 focus:border-yellow-500 focus:outline-none" style={{ color: '#C8A951' }} />}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="rounded-xl bg-gray-800/30 border border-gray-700/40 p-3">
              <p className="text-[11px] font-semibold text-gray-400 mb-2 uppercase tracking-wider">Score Indicators</p>
              <div className="grid grid-cols-3 gap-y-1.5 gap-x-2">
                {(Object.entries(INDICATOR_LABELS) as [ScoreIndicator, string][]).map(([k, v]) => (
                  <div key={k} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: INDICATOR_COLORS[k] }} />
                    <span className="text-[10px] text-gray-500">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ───── TYPOGRAPHY ───── */}
          <TabsContent value="type" className="mt-0 space-y-3">
            {/* Custom fonts */}
            <div className="rounded-xl border border-gray-700/40 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2.5 bg-gray-800/60 border-b border-gray-700/40">
                <div className="flex items-center gap-2"><span className="text-sm">✦</span><span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Custom Fonts</span></div>
                <button onClick={() => fontInputRef.current?.click()} className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition-colors" style={{ backgroundColor: '#C8A95120', color: '#C8A951', border: '1px solid #C8A95140' }}>
                  <Plus className="w-3 h-3" /> Upload
                </button>
              </div>
              <div className="p-3 bg-gray-800/20">
                <input ref={fontInputRef} type="file" accept=".ttf,.otf,.woff,.woff2" multiple className="hidden" onChange={e => { if (e.target.files?.length) { onFontUpload(e.target.files); e.target.value = ''; } }} />
                {customFonts.length === 0 ? (
                  <button onClick={() => fontInputRef.current?.click()} className="w-full border-2 border-dashed border-gray-600 hover:border-gray-400 rounded-xl py-5 flex flex-col items-center gap-2 text-gray-500 hover:text-gray-300 transition-all">
                    <Upload className="w-5 h-5" /><span className="text-xs">TTF · OTF · WOFF · WOFF2</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    {customFonts.map(font => (
                      <div key={font.id} className="flex items-center gap-2 bg-gray-900/40 rounded-lg px-2.5 py-2">
                        <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center shrink-0 border border-gray-700" style={{ fontFamily: `'${font.family}', sans-serif` }}><span className="text-base text-gray-300">Aa</span></div>
                        <div className="flex-1 min-w-0">
                          <input type="text" value={font.name} onChange={e => onFontRename(font.id, e.target.value)} className="w-full text-xs bg-transparent text-gray-100 font-medium border-b border-gray-700 focus:border-yellow-500 focus:outline-none pb-0.5" style={{ '--tw-border-opacity': 1 } as React.CSSProperties} />
                          <p className="text-[10px] text-gray-600 mt-0.5 font-mono truncate">{font.family}</p>
                        </div>
                        <button onClick={() => onFontRemove(font.id)} className="text-gray-600 hover:text-red-400 transition-colors"><Trash className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                    <button onClick={() => fontInputRef.current?.click()} className="w-full text-[11px] text-gray-600 hover:text-gray-400 py-1.5 flex items-center justify-center gap-1 transition-colors"><Plus className="w-3 h-3" /> Add another font</button>
                  </div>
                )}
              </div>
            </div>

            <SectionCard title="First Name" icon="✍️">
              <FontSelect label="Font" value={data.firstNameFont} builtins={SCRIPT_FONTS} customFonts={customFonts} onChange={v => update({ firstNameFont: v })} />
              <Slider label="Size" value={data.firstNameSize} min={40} max={180} onChange={v => update({ firstNameSize: v })} unit="px" />
              <Slider label="Position X" value={data.firstNameX} min={0} max={CARD_WIDTH - 100} onChange={v => update({ firstNameX: v })} unit="px" />
              <Slider label="Position Y" value={data.firstNameYPct} min={10} max={65} step={0.5} onChange={v => update({ firstNameYPct: v })} unit="%" secondaryValue={`${Math.round((data.firstNameYPct / 100) * cardHeight)}px`} />
            </SectionCard>

            <SectionCard title="Last Name" icon="🔤">
              <FontSelect label="Font" value={data.lastNameFont} builtins={DISPLAY_FONTS} customFonts={customFonts} onChange={v => update({ lastNameFont: v })} />
              <Slider label="Size" value={data.lastNameSize} min={60} max={260} onChange={v => update({ lastNameSize: v })} unit="px" />
              <Slider label="Indent from left" value={data.lastNameXPct} min={0} max={40} step={0.5} onChange={v => update({ lastNameXPct: v })} unit="%" />
            </SectionCard>

            <SectionCard title="Score Number" icon="#️⃣">
              <FontSelect label="Font" value={data.scoreFont} builtins={DISPLAY_FONTS} customFonts={customFonts} onChange={v => update({ scoreFont: v })} />
              <Slider label="Size" value={data.scoreSize} min={100} max={400} onChange={v => update({ scoreSize: v })} unit="px" />
              <Slider label="From right edge" value={data.scoreRight} min={0} max={400} onChange={v => update({ scoreRight: v })} unit="px" />
              <Slider label="From top" value={data.scoreTopPct} min={5} max={50} step={0.5} onChange={v => update({ scoreTopPct: v })} unit="%" />
            </SectionCard>

            <SectionCard title="Tournament Text" icon="📋">
              <FontSelect label="Font" value={data.tournamentFont} builtins={TOURNAMENT_FONTS} customFonts={customFonts} onChange={v => update({ tournamentFont: v })} />
              <div className="grid grid-cols-2 gap-3">
                <Slider label="Tournament size" value={data.tournamentSize} min={16} max={60} onChange={v => update({ tournamentSize: v })} unit="px" />
                <Slider label="Round size" value={data.roundSize} min={12} max={48} onChange={v => update({ roundSize: v })} unit="px" />
              </div>
            </SectionCard>

            <SectionCard title="Layout Controls" icon="⚙️">
              <Slider label="Panel start (Classic)" value={data.lowerPanelYPct} min={30} max={65} step={0.5} onChange={v => update({ lowerPanelYPct: v })} unit="%" />
              <Slider label="Photo vertical crop" value={data.photoYPosition} min={0} max={100} onChange={v => update({ photoYPosition: v })} unit="%" />
            </SectionCard>
          </TabsContent>

          {/* ───── COLORS ───── */}
          <TabsContent value="colors" className="mt-0 space-y-3">
            <SectionCard title="Layout Colors" icon="🖌️">
              <ColorPicker label="Primary / Name" value={data.primaryColor}    onChange={v => update({ primaryColor: v })} />
              <ColorPicker label="Background"     value={data.backgroundColor} onChange={v => update({ backgroundColor: v })} />
              <ColorPicker label="Text / Labels"  value={data.tournamentColor} onChange={v => update({ tournamentColor: v })} />
            </SectionCard>

            <SectionCard title="Score Indicator Colors" icon="🎯">
              <ColorPicker label="Par / Default"  value={data.parColor}         onChange={v => update({ parColor: v })} />
              <ColorPicker label="Birdie ○"        value={data.birdieColor}      onChange={v => update({ birdieColor: v })} />
              <ColorPicker label="Eagle ◎"         value={data.eagleColor}       onChange={v => update({ eagleColor: v })} />
              <ColorPicker label="Albatross ⊚"     value={data.albatrossColor}   onChange={v => update({ albatrossColor: v })} />
              <ColorPicker label="Bogey □"         value={data.bogeyColor}       onChange={v => update({ bogeyColor: v })} />
              <ColorPicker label="Dbl Bogey ⊡"     value={data.doubleBogeyColor} onChange={v => update({ doubleBogeyColor: v })} />
            </SectionCard>

            {/* Color Presets */}
            <div className="rounded-xl border border-gray-700/40 overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-800/60 border-b border-gray-700/40">
                <span className="text-sm">✨</span>
                <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Quick Presets</span>
              </div>
              <div className="p-3 grid grid-cols-3 gap-2 bg-gray-800/20">
                {PRESETS.map(p => (
                  <button
                    key={p.name}
                    onClick={() => setData(prev => ({ ...prev, ...p.colors }))}
                    className="relative overflow-hidden rounded-xl border border-white/10 hover:border-white/25 transition-all hover:scale-105 group"
                    style={{ background: `linear-gradient(135deg, ${p.bg} 0%, ${p.primary} 100%)` }}
                  >
                    <div className="px-2 py-3 text-center">
                      <span className="text-[11px] font-bold text-white drop-shadow-md">{p.name}</span>
                    </div>
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors rounded-xl" />
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ───── EXPORT ───── */}
          <TabsContent value="format" className="mt-0 space-y-3">
            <SectionCard title="Output Format" icon="📐">
              <div className="grid grid-cols-2 gap-2">
                {(['1080x1440', '1080x1920'] as const).map(fmt => (
                  <button key={fmt} onClick={() => update({ outputFormat: fmt })}
                    className="py-4 rounded-xl border text-sm font-medium transition-all flex flex-col items-center gap-1"
                    style={data.outputFormat === fmt
                      ? { backgroundColor: '#C8A95115', borderColor: '#C8A951', color: '#C8A951', boxShadow: '0 4px 20px rgba(200,169,81,0.2)' }
                      : { backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)', color: '#6b7280' }}>
                    <span className="text-xl">{fmt === '1080x1440' ? '📱' : '📲'}</span>
                    <span className="font-bold text-xs">{fmt.replace('x', ' × ')}</span>
                    <span className="text-[10px] opacity-70">{fmt === '1080x1440' ? 'Feed Post' : 'Story / Reel'}</span>
                  </button>
                ))}
              </div>
            </SectionCard>

            <button onClick={onExport} disabled={exporting}
              className="w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2.5 disabled:opacity-40"
              style={{ background: exporting ? '#374151' : 'linear-gradient(135deg, #16a34a, #15803d)', color: 'white', boxShadow: exporting ? 'none' : '0 6px 24px rgba(22,163,74,0.35)' }}>
              {exporting ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Generating PNG…</>
              ) : (
                <><Download className="w-4 h-4" />Download {data.outputFormat} PNG</>
              )}
            </button>

            <div className="rounded-xl bg-gray-800/30 border border-gray-700/40 p-4 space-y-2">
              <p className="text-xs font-semibold text-gray-300">💡 Export Tips</p>
              <ul className="space-y-1.5">
                {['Full resolution 1080px PNG, ready to post', 'All 7 layouts export at full quality', 'Custom fonts are embedded in the image', 'Use Feed format for grid posts, Story for reels'].map(tip => (
                  <li key={tip} className="flex items-start gap-2 text-[11px] text-gray-500">
                    <ChevronRight className="w-3 h-3 mt-0.5 shrink-0 text-gray-600" />{tip}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
