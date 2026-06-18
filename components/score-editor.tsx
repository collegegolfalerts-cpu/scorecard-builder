'use client';

import { useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Upload, Trash, Image, Download, Plus } from 'lucide-react';
import { ScorecardData, HoleScore, ScoreIndicator, CustomFont, CardLayout } from '@/types';
import { SCRIPT_FONTS, DISPLAY_FONTS, TOURNAMENT_FONTS, CARD_WIDTH } from '@/components/scorecard-graphic';

// ── Layout Picker ─────────────────────────────────────────────────────────────

const LAYOUTS: { id: CardLayout; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    id: 'classic', label: 'Classic', desc: 'Photo top · scorecard panel below',
    icon: (
      <svg viewBox="0 0 52 72" fill="none" className="w-full h-full">
        <rect x="1" y="1" width="50" height="70" rx="2" fill="#1a1a1a" stroke="#444" strokeWidth="1"/>
        <rect x="1" y="1" width="50" height="30" rx="2" fill="#3a5a7a"/>
        <rect x="1" y="28" width="50" height="3" fill="#C8A951"/>
        <rect x="6" y="36" width="40" height="4" rx="1" fill="#C8A951" opacity="0.9"/>
        <rect x="6" y="44" width="26" height="3" rx="1" fill="#555"/>
        <rect x="6" y="51" width="40" height="8" rx="1" fill="#333"/>
        <rect x="6" y="62" width="40" height="8" rx="1" fill="#333"/>
      </svg>
    ),
  },
  {
    id: 'split', label: 'Side Pillar', desc: 'Photo left column · content right',
    icon: (
      <svg viewBox="0 0 52 72" fill="none" className="w-full h-full">
        <rect x="1" y="1" width="50" height="70" rx="2" fill="#1a1a1a" stroke="#444" strokeWidth="1"/>
        <rect x="1" y="1" width="19" height="70" rx="2" fill="#3a5a7a"/>
        <rect x="20" y="1" width="3" height="70" fill="#C8A951"/>
        <rect x="26" y="8" width="20" height="8" rx="1" fill="#C8A951" opacity="0.9"/>
        <rect x="26" y="20" width="20" height="4" rx="1" fill="#555"/>
        <rect x="26" y="28" width="20" height="14" rx="1" fill="#333"/>
        <rect x="26" y="46" width="20" height="14" rx="1" fill="#333"/>
      </svg>
    ),
  },
  {
    id: 'full-bleed', label: 'Full Bleed', desc: 'Photo behind everything · frosted panel',
    icon: (
      <svg viewBox="0 0 52 72" fill="none" className="w-full h-full">
        <rect x="1" y="1" width="50" height="70" rx="2" fill="#3a5a7a" stroke="#444" strokeWidth="1"/>
        <rect x="1" y="37" width="50" height="34" rx="2" fill="#0a0a0aee"/>
        <rect x="1" y="37" width="50" height="3" fill="#C8A951"/>
        <rect x="6" y="43" width="40" height="6" rx="1" fill="#C8A951" opacity="0.85"/>
        <rect x="6" y="53" width="26" height="3" rx="1" fill="#555"/>
        <rect x="6" y="59" width="40" height="6" rx="1" fill="#333"/>
        <rect x="6" y="67" width="40" height="1" rx="1" fill="#333"/>
        <rect x="6" y="14" width="22" height="5" rx="1" fill="rgba(255,255,255,0.5)"/>
      </svg>
    ),
  },
  {
    id: 'banner', label: 'Banner', desc: 'Thin photo strip · data-forward panel',
    icon: (
      <svg viewBox="0 0 52 72" fill="none" className="w-full h-full">
        <rect x="1" y="1" width="50" height="70" rx="2" fill="#1a1a1a" stroke="#444" strokeWidth="1"/>
        <rect x="1" y="1" width="50" height="17" rx="2" fill="#3a5a7a"/>
        <rect x="1" y="17" width="50" height="3" fill="#C8A951"/>
        <rect x="6" y="23" width="40" height="10" rx="1" fill="#C8A951" opacity="0.8"/>
        <rect x="6" y="36" width="22" height="6" rx="1" fill="#555"/>
        <rect x="32" y="38" width="14" height="4" rx="1" fill="#444"/>
        <rect x="6" y="46" width="40" height="9" rx="1" fill="#333"/>
        <rect x="6" y="58" width="40" height="9" rx="1" fill="#333"/>
      </svg>
    ),
  },
  {
    id: 'diagonal', label: 'Diagonal', desc: 'Angled photo cut · bold accent slash',
    icon: (
      <svg viewBox="0 0 52 72" fill="none" className="w-full h-full">
        <rect x="1" y="1" width="50" height="70" rx="2" fill="#1a1a1a" stroke="#444" strokeWidth="1"/>
        {/* Photo trapezoid */}
        <polygon points="1,1 51,1 51,22 1,40" fill="#3a5a7a"/>
        {/* Accent stripe */}
        <polygon points="1,40 51,22 51,26 1,44" fill="#C8A951"/>
        {/* Score top-right */}
        <rect x="32" y="4" width="16" height="13" rx="1" fill="rgba(255,255,255,0.2)"/>
        {/* First name bottom-left of photo */}
        <rect x="4" y="28" width="18" height="5" rx="1" fill="rgba(255,255,255,0.35)"/>
        {/* Last name */}
        <rect x="4" y="48" width="30" height="7" rx="1" fill="#C8A951" opacity="0.85"/>
        {/* Scorecard rows */}
        <rect x="4" y="58" width="44" height="5" rx="1" fill="#333"/>
        <rect x="4" y="65" width="44" height="5" rx="1" fill="#333"/>
      </svg>
    ),
  },
  {
    id: 'broadcast', label: 'Broadcast', desc: 'TV lower-third · score bug · Golf Channel feel',
    icon: (
      <svg viewBox="0 0 52 72" fill="none" className="w-full h-full">
        <rect x="1" y="1" width="50" height="70" rx="2" fill="#1a1a1a" stroke="#444" strokeWidth="1"/>
        {/* Photo top 50% */}
        <rect x="1" y="1" width="50" height="36" rx="2" fill="#3a5a7a"/>
        {/* Score bug — colored rect in photo zone */}
        <polygon points="4,24 18,24 18,37 4,37" fill="#C8A951"/>
        {/* Notch corner on bug */}
        <polygon points="15,24 18,24 18,27" fill="#1a1a1a" opacity="0.5"/>
        {/* Player name text to right of bug */}
        <rect x="21" y="26" width="16" height="4" rx="1" fill="rgba(255,255,255,0.45)"/>
        <rect x="21" y="32" width="24" height="4" rx="1" fill="rgba(255,255,255,0.3)"/>
        {/* Accent bar */}
        <rect x="1" y="36" width="50" height="3" fill="#C8A951"/>
        {/* Tournament + score to par */}
        <rect x="4" y="42" width="28" height="3" rx="1" fill="#555"/>
        <rect x="36" y="40" width="12" height="7" rx="1" fill="#444"/>
        {/* Scorecard rows */}
        <rect x="4" y="53" width="44" height="7" rx="1" fill="#333"/>
        <rect x="4" y="63" width="44" height="7" rx="1" fill="#333"/>
      </svg>
    ),
  },
  {
    id: 'magazine', label: 'Magazine', desc: 'Centered cover typography · score badge',
    icon: (
      <svg viewBox="0 0 52 72" fill="none" className="w-full h-full">
        {/* Full bleed photo */}
        <rect x="1" y="1" width="50" height="70" rx="2" fill="#3a5a7a" stroke="#444" strokeWidth="1"/>
        {/* Dark vignette gradient at bottom */}
        <rect x="1" y="42" width="50" height="29" fill="#0a0a0acc" rx="1"/>
        {/* Centered first name */}
        <rect x="14" y="20" width="24" height="4" rx="1" fill="rgba(255,255,255,0.55)"/>
        {/* Centered last name */}
        <rect x="9" y="26" width="34" height="8" rx="1" fill="#C8A951" opacity="0.9"/>
        {/* Circular score badge */}
        <circle cx="26" cy="44" r="9" fill="transparent" stroke="#C8A951" strokeWidth="2"/>
        <rect x="22" y="41" width="8" height="7" rx="1" fill="transparent"/>
        <text x="26" y="47" textAnchor="middle" fontSize="7" fill="#C8A951" fontWeight="bold">65</text>
        {/* Bottom strip */}
        <rect x="1" y="56" width="50" height="15" rx="1" fill="#111"/>
        <rect x="1" y="56" width="50" height="2" fill="#C8A951"/>
        <rect x="4" y="60" width="44" height="4" rx="1" fill="#333"/>
        <rect x="4" y="67" width="44" height="4" rx="1" fill="#333"/>
      </svg>
    ),
  },
];

function LayoutPicker({ value, onChange }: { value: CardLayout; onChange: (v: CardLayout) => void }) {
  return (
    <div className="px-4 pt-3 pb-3 border-b border-gray-800">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Layout</p>
      <div className="grid grid-cols-4 gap-2 mb-2">
        {/* First row: 4 layouts */}
        {LAYOUTS.slice(0, 4).map(l => (
          <LayoutBtn key={l.id} l={l} active={value === l.id} onClick={() => onChange(l.id)} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {/* Second row: 3 new layouts */}
        {LAYOUTS.slice(4).map(l => (
          <LayoutBtn key={l.id} l={l} active={value === l.id} onClick={() => onChange(l.id)} />
        ))}
      </div>
      <p className="text-[11px] text-gray-500 mt-2 text-center leading-tight">{LAYOUTS.find(l => l.id === value)?.desc}</p>
    </div>
  );
}

function LayoutBtn({ l, active, onClick }: { l: typeof LAYOUTS[0]; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all group ${
        active ? 'border-blue-500 bg-blue-600/15 shadow shadow-blue-900/30' : 'border-gray-700 bg-gray-800/60 hover:border-gray-500 hover:bg-gray-800'
      }`}
    >
      <div className={`w-9 h-12 transition-opacity ${active ? 'opacity-100' : 'opacity-55 group-hover:opacity-80'}`}>{l.icon}</div>
      <span className={`text-[10px] font-semibold leading-tight text-center ${active ? 'text-blue-300' : 'text-gray-400'}`}>{l.label}</span>
    </button>
  );
}

// ── Slider ────────────────────────────────────────────────────────────────────

function Slider({ label, value, min, max, step = 1, onChange, unit = '', secondaryValue }: {
  label: string; value: number; min: number; max: number; step?: number;
  onChange: (v: number) => void; unit?: string; secondaryValue?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-baseline">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-xs font-mono text-gray-300">{value}{unit}{secondaryValue ? ` · ${secondaryValue}` : ''}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full cursor-pointer accent-blue-500 bg-gray-700"
        style={{ WebkitAppearance: 'none', appearance: 'none' }}
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
        className="w-full text-sm bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-gray-200 focus:outline-none focus:border-gray-500"
      >
        {customFonts.length > 0 ? (
          <>
            <optgroup label="Custom Fonts">{customFonts.map(f => <option key={`custom:${f.family}`} value={`custom:${f.family}`}>★ {f.name}</option>)}</optgroup>
            <optgroup label="Built-in Fonts">{Object.entries(builtins).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</optgroup>
          </>
        ) : (
          Object.entries(builtins).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)
        )}
      </select>
    </div>
  );
}

// ── Color Picker ──────────────────────────────────────────────────────────────

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-xs text-gray-400 w-28 shrink-0">{label}</span>
      <input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0.5 bg-transparent" />
      <input type="text" value={value} onChange={e => { if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) onChange(e.target.value); }}
        className="w-24 font-mono text-xs bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-gray-200 focus:outline-none focus:border-gray-500" maxLength={7}
      />
    </div>
  );
}

// ── Hole Row ──────────────────────────────────────────────────────────────────

function HoleRow({ holeNumber, hole, onChange }: { holeNumber: number; hole: HoleScore; onChange: (u: Partial<HoleScore>) => void }) {
  return (
    <div className="flex items-center gap-1.5 py-0.5">
      <span className="text-xs text-gray-500 w-5 text-right shrink-0 font-mono">{holeNumber}</span>
      <input type="number" value={hole.score} min={1} max={20} onChange={e => onChange({ score: parseInt(e.target.value) || 1 })}
        className="w-11 text-center text-sm font-bold bg-gray-800 border border-gray-700 rounded px-1 py-1 text-white focus:outline-none focus:border-gray-500" />
      <select value={hole.indicator} onChange={e => onChange({ indicator: e.target.value as ScoreIndicator })}
        className="flex-1 text-xs bg-gray-800 border border-gray-700 rounded px-1.5 py-1.5 text-gray-200 focus:outline-none focus:border-gray-500 min-w-0">
        <option value="none">— Par</option>
        <option value="birdie">○ Birdie</option>
        <option value="eagle">◎ Eagle</option>
        <option value="albatross">⊚ Albatross</option>
        <option value="bogey">□ Bogey</option>
        <option value="double-bogey">⊡ Dbl Bogey</option>
      </select>
    </div>
  );
}

// ── Section Header ────────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 mt-5 mb-2.5">
      <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">{title}</span>
      <div className="flex-1 h-px bg-gray-700/60" />
    </div>
  );
}

// ── Color Presets ─────────────────────────────────────────────────────────────

const PRESETS = [
  { name: 'Navy Dark',     colors: { backgroundColor: '#1C2541', primaryColor: '#4a7fa5', tournamentColor: '#A0B8D8', parColor: '#ffffff', birdieColor: '#EF4444', eagleColor: '#22C55E', bogeyColor: '#ffffff', doubleBogeyColor: '#ffffff', albatrossColor: '#C084FC' } },
  { name: 'Classic Red',   colors: { backgroundColor: '#f0ede6', primaryColor: '#8B0000', tournamentColor: '#444444', parColor: '#222222', birdieColor: '#cc0000', eagleColor: '#0a7a0a', bogeyColor: '#222222', doubleBogeyColor: '#222222', albatrossColor: '#7c3aed' } },
  { name: 'Masters Green', colors: { backgroundColor: '#0d3b2e', primaryColor: '#C9A84C', tournamentColor: '#8fbea0', parColor: '#ffffff', birdieColor: '#C9A84C', eagleColor: '#ffffff', bogeyColor: '#ffffff', doubleBogeyColor: '#ffffff', albatrossColor: '#f9a8d4' } },
  { name: 'Steel Blue',    colors: { backgroundColor: '#0f1923', primaryColor: '#6CB4E4', tournamentColor: '#90b8cc', parColor: '#e0e8f0', birdieColor: '#ff6b6b', eagleColor: '#51cf66', bogeyColor: '#e0e8f0', doubleBogeyColor: '#e0e8f0', albatrossColor: '#cc5de8' } },
  { name: 'Charcoal',      colors: { backgroundColor: '#212121', primaryColor: '#e5e5e5', tournamentColor: '#9e9e9e', parColor: '#e5e5e5', birdieColor: '#ff5252', eagleColor: '#69f0ae', bogeyColor: '#e5e5e5', doubleBogeyColor: '#e5e5e5', albatrossColor: '#ea80fc' } },
  { name: 'Gold Rush',     colors: { backgroundColor: '#1a1400', primaryColor: '#FFD700', tournamentColor: '#c9a84c', parColor: '#ffffff', birdieColor: '#FFD700', eagleColor: '#ffffff', bogeyColor: '#ffffff', doubleBogeyColor: '#ffffff', albatrossColor: '#ff6b9d' } },
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
      {/* Layout picker — persistent above all tabs */}
      <LayoutPicker value={data.layout ?? 'classic'} onChange={v => update({ layout: v })} />

      <div className="p-4 pt-3">
        <Tabs defaultValue="player">
          <TabsList className="w-full grid grid-cols-5 mb-4 bg-gray-800/80">
            <TabsTrigger value="player" className="text-xs data-[state=active]:bg-gray-600">Player</TabsTrigger>
            <TabsTrigger value="scores" className="text-xs data-[state=active]:bg-gray-600">Scores</TabsTrigger>
            <TabsTrigger value="type"   className="text-xs data-[state=active]:bg-gray-600">Type</TabsTrigger>
            <TabsTrigger value="colors" className="text-xs data-[state=active]:bg-gray-600">Colors</TabsTrigger>
            <TabsTrigger value="format" className="text-xs data-[state=active]:bg-gray-600">Export</TabsTrigger>
          </TabsList>

          {/* ───── PLAYER ───── */}
          <TabsContent value="player" className="space-y-3 mt-0">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label className="text-xs text-gray-400">First Name</Label><Input value={data.playerFirstName} onChange={e => update({ playerFirstName: e.target.value })} placeholder="Luke" className="bg-gray-800 border-gray-700 text-white h-8 text-sm" /></div>
              <div className="space-y-1.5"><Label className="text-xs text-gray-400">Last Name</Label><Input value={data.playerLastName} onChange={e => update({ playerLastName: e.target.value })} placeholder="COYLE" className="bg-gray-800 border-gray-700 text-white h-8 text-sm" /></div>
            </div>
            <div className="space-y-1.5"><Label className="text-xs text-gray-400">Tournament Name</Label><Input value={data.tournamentName} onChange={e => update({ tournamentName: e.target.value })} placeholder="2025 DOGWOOD INVITATIONAL" className="bg-gray-800 border-gray-700 text-white h-8 text-sm" /></div>
            <div className="space-y-1.5"><Label className="text-xs text-gray-400">Round Description</Label><Input value={data.roundName} onChange={e => update({ roundName: e.target.value })} placeholder="FINAL ROUND" className="bg-gray-800 border-gray-700 text-white h-8 text-sm" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label className="text-xs text-gray-400">Total Score</Label><Input type="number" value={data.totalScore} onChange={e => update({ totalScore: parseInt(e.target.value) || 0 })} readOnly={data.autoCalcTotals} className="bg-gray-800 border-gray-700 text-white h-8 text-sm" /></div>
              <div className="space-y-1.5"><Label className="text-xs text-gray-400">Score to Par</Label><Input value={data.relativeToPar} onChange={e => update({ relativeToPar: e.target.value })} placeholder="-7" className="bg-gray-800 border-gray-700 text-white h-8 text-sm" /></div>
            </div>
            <Separator className="bg-gray-700/60" />
            <div className="space-y-1.5">
              <Label className="text-xs text-gray-400">Player Photo</Label>
              {data.photoUrl ? (
                <div className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={data.photoUrl} alt="Player" className="w-full h-36 object-cover rounded-lg object-top" />
                  <button onClick={() => update({ photoUrl: null })} className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"><Trash className="w-3 h-3" /></button>
                  <button onClick={() => photoInputRef.current?.click()} className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">Change</button>
                </div>
              ) : (
                <button onClick={() => photoInputRef.current?.click()} className="w-full border-2 border-dashed border-gray-600 hover:border-blue-500/60 rounded-lg py-7 flex flex-col items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors group">
                  <Upload className="w-7 h-7 group-hover:scale-110 transition-transform" /><span className="text-xs">Click to upload player photo</span>
                </button>
              )}
              <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={e => handleFileUpload(e, 'photoUrl')} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-gray-400">Tournament Logo (overlay)</Label>
              {data.logoUrl ? (
                <div className="flex items-center gap-3 bg-gray-800/60 rounded-lg p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={data.logoUrl} alt="Logo" className="h-12 w-12 object-contain rounded" />
                  <div className="flex-1"><p className="text-xs text-gray-300">Logo uploaded</p><button onClick={() => logoInputRef.current?.click()} className="text-xs text-blue-400 hover:text-blue-300 mt-0.5">Change</button></div>
                  <button onClick={() => update({ logoUrl: null })} className="bg-red-600/80 hover:bg-red-500 text-white rounded p-1.5"><Trash className="w-3 h-3" /></button>
                </div>
              ) : (
                <button onClick={() => logoInputRef.current?.click()} className="w-full border-2 border-dashed border-gray-600 hover:border-blue-500/60 rounded-lg py-4 flex items-center justify-center gap-2 text-gray-400 hover:text-gray-200 transition-colors">
                  <Image className="w-4 h-4" /><span className="text-xs">Upload logo / tournament badge</span>
                </button>
              )}
              <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={e => handleFileUpload(e, 'logoUrl')} />
            </div>
          </TabsContent>

          {/* ───── SCORES ───── */}
          <TabsContent value="scores" className="mt-0">
            <div className="flex items-center justify-between mb-3">
              <div><p className="text-xs font-medium text-gray-300">Auto-calculate totals</p><p className="text-xs text-gray-500">Sum hole scores → front/back/total</p></div>
              <Switch checked={data.autoCalcTotals} onCheckedChange={v => update({ autoCalcTotals: v })} />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div>
                <div className="text-xs font-semibold text-gray-300 mb-1.5 text-center tracking-wider">FRONT 9</div>
                {data.holes.slice(0, 9).map((hole, i) => <HoleRow key={i} holeNumber={i + 1} hole={hole} onChange={u => updateHole(i, u)} />)}
                <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-gray-700/60">
                  <span className="text-xs text-gray-500 w-5 text-right font-mono">OUT</span>
                  {data.autoCalcTotals
                    ? <span className="w-11 text-center text-sm font-bold text-green-400 py-1 bg-green-900/20 rounded">{data.frontTotal}</span>
                    : <input type="number" value={data.frontTotal} onChange={e => update({ frontTotal: parseInt(e.target.value) || 0 })} className="w-11 text-center text-sm font-bold bg-green-900/20 border border-green-800/50 rounded px-1 py-1 text-green-400 focus:outline-none" />}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-300 mb-1.5 text-center tracking-wider">BACK 9</div>
                {data.holes.slice(9, 18).map((hole, i) => <HoleRow key={i + 9} holeNumber={i + 10} hole={hole} onChange={u => updateHole(i + 9, u)} />)}
                <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-gray-700/60">
                  <span className="text-xs text-gray-500 w-5 text-right font-mono">IN</span>
                  {data.autoCalcTotals
                    ? <span className="w-11 text-center text-sm font-bold text-green-400 py-1 bg-green-900/20 rounded">{data.backTotal}</span>
                    : <input type="number" value={data.backTotal} onChange={e => update({ backTotal: parseInt(e.target.value) || 0 })} className="w-11 text-center text-sm font-bold bg-green-900/20 border border-green-800/50 rounded px-1 py-1 text-green-400 focus:outline-none" />}
                </div>
              </div>
            </div>
            <Separator className="bg-gray-700/60 my-3" />
            <div className="bg-gray-800/40 rounded-lg p-3 space-y-1">
              <p className="text-xs text-gray-300 font-medium">Indicators</p>
              <div className="grid grid-cols-2 gap-1 text-xs text-gray-400"><span>⊚ Albatross</span><span>◎ Eagle</span><span>○ Birdie</span><span>— Par</span><span>□ Bogey</span><span>⊡ Dbl Bogey</span></div>
            </div>
          </TabsContent>

          {/* ───── TYPOGRAPHY ───── */}
          <TabsContent value="type" className="mt-0">
            {/* Custom Font Upload */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-3 mb-1">
              <div className="flex items-center justify-between mb-2">
                <div><p className="text-xs font-semibold text-white">Custom Fonts</p><p className="text-xs text-gray-500 mt-0.5">TTF · OTF · WOFF · WOFF2</p></div>
                <button onClick={() => fontInputRef.current?.click()} className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"><Plus className="w-3 h-3" /> Upload Font</button>
              </div>
              <input ref={fontInputRef} type="file" accept=".ttf,.otf,.woff,.woff2" multiple className="hidden" onChange={e => { if (e.target.files?.length) { onFontUpload(e.target.files); e.target.value = ''; } }} />
              {customFonts.length === 0 ? (
                <button onClick={() => fontInputRef.current?.click()} className="w-full mt-1 border-2 border-dashed border-gray-600 hover:border-blue-500/50 rounded-lg py-5 flex flex-col items-center gap-1.5 text-gray-500 hover:text-gray-300 transition-colors group">
                  <Upload className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span className="text-xs">Drop font files here or click to browse</span>
                </button>
              ) : (
                <div className="space-y-1.5 mt-2">
                  {customFonts.map(font => (
                    <div key={font.id} className="flex items-center gap-2 bg-gray-700/60 rounded-lg px-2.5 py-2">
                      <div className="w-10 h-10 rounded bg-gray-900 flex items-center justify-center shrink-0 border border-gray-600" style={{ fontFamily: `'${font.family}', sans-serif` }}><span className="text-lg text-gray-200">Aa</span></div>
                      <div className="flex-1 min-w-0">
                        <input type="text" value={font.name} onChange={e => onFontRename(font.id, e.target.value)} className="w-full text-xs bg-transparent text-gray-100 font-medium border-b border-gray-600 focus:border-blue-500 focus:outline-none pb-0.5" />
                        <p className="text-xs text-gray-500 mt-0.5 font-mono truncate">{font.family}</p>
                      </div>
                      <button onClick={() => onFontRemove(font.id)} className="text-gray-500 hover:text-red-400 transition-colors shrink-0"><Trash className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                  <button onClick={() => fontInputRef.current?.click()} className="w-full text-xs text-gray-500 hover:text-gray-300 py-1.5 flex items-center justify-center gap-1 transition-colors"><Plus className="w-3 h-3" /> Add another font</button>
                </div>
              )}
            </div>

            <SectionHeader title="First Name" />
            <div className="space-y-3">
              <FontSelect label="Font" value={data.firstNameFont} builtins={SCRIPT_FONTS} customFonts={customFonts} onChange={v => update({ firstNameFont: v })} />
              <Slider label="Size" value={data.firstNameSize} min={40} max={180} onChange={v => update({ firstNameSize: v })} unit="px" />
              <Slider label="Position X" value={data.firstNameX} min={0} max={CARD_WIDTH - 100} onChange={v => update({ firstNameX: v })} unit="px" />
              <Slider label="Position Y" value={data.firstNameYPct} min={10} max={65} step={0.5} onChange={v => update({ firstNameYPct: v })} unit="%" secondaryValue={`${Math.round((data.firstNameYPct / 100) * cardHeight)}px`} />
            </div>

            <SectionHeader title="Last Name" />
            <div className="space-y-3">
              <FontSelect label="Font" value={data.lastNameFont} builtins={DISPLAY_FONTS} customFonts={customFonts} onChange={v => update({ lastNameFont: v })} />
              <Slider label="Size" value={data.lastNameSize} min={60} max={260} onChange={v => update({ lastNameSize: v })} unit="px" />
              <Slider label="Indent (left)" value={data.lastNameXPct} min={0} max={40} step={0.5} onChange={v => update({ lastNameXPct: v })} unit="%" />
            </div>

            <SectionHeader title="Score Number" />
            <div className="space-y-3">
              <FontSelect label="Font" value={data.scoreFont} builtins={DISPLAY_FONTS} customFonts={customFonts} onChange={v => update({ scoreFont: v })} />
              <Slider label="Size" value={data.scoreSize} min={100} max={400} onChange={v => update({ scoreSize: v })} unit="px" />
              <Slider label="From Right Edge" value={data.scoreRight} min={0} max={400} onChange={v => update({ scoreRight: v })} unit="px" />
              <Slider label="From Top" value={data.scoreTopPct} min={5} max={50} step={0.5} onChange={v => update({ scoreTopPct: v })} unit="%" />
            </div>

            <SectionHeader title="Tournament Text" />
            <div className="space-y-3">
              <FontSelect label="Font" value={data.tournamentFont} builtins={TOURNAMENT_FONTS} customFonts={customFonts} onChange={v => update({ tournamentFont: v })} />
              <div className="grid grid-cols-2 gap-3">
                <Slider label="Tournament" value={data.tournamentSize} min={16} max={60} onChange={v => update({ tournamentSize: v })} unit="px" />
                <Slider label="Round" value={data.roundSize} min={12} max={48} onChange={v => update({ roundSize: v })} unit="px" />
              </div>
            </div>

            <SectionHeader title="Photo & Panel" />
            <div className="space-y-3">
              <Slider label="Panel start (Classic)" value={data.lowerPanelYPct} min={30} max={65} step={0.5} onChange={v => update({ lowerPanelYPct: v })} unit="%" />
              <Slider label="Photo vertical crop" value={data.photoYPosition} min={0} max={100} onChange={v => update({ photoYPosition: v })} unit="%" />
            </div>
          </TabsContent>

          {/* ───── COLORS ───── */}
          <TabsContent value="colors" className="mt-0 space-y-3">
            <div className="space-y-2.5">
              <p className="text-xs text-gray-400 font-medium mt-1">Layout Colors</p>
              <ColorPicker label="Primary / Name"  value={data.primaryColor}    onChange={v => update({ primaryColor: v })} />
              <ColorPicker label="Background"      value={data.backgroundColor} onChange={v => update({ backgroundColor: v })} />
              <ColorPicker label="Tournament Text" value={data.tournamentColor} onChange={v => update({ tournamentColor: v })} />
            </div>
            <Separator className="bg-gray-700/60" />
            <div className="space-y-2.5">
              <p className="text-xs text-gray-400 font-medium">Score Colors</p>
              <ColorPicker label="Par / Default"  value={data.parColor}         onChange={v => update({ parColor: v })} />
              <ColorPicker label="Birdie ○"        value={data.birdieColor}      onChange={v => update({ birdieColor: v })} />
              <ColorPicker label="Eagle ◎"         value={data.eagleColor}       onChange={v => update({ eagleColor: v })} />
              <ColorPicker label="Albatross ⊚"     value={data.albatrossColor}   onChange={v => update({ albatrossColor: v })} />
              <ColorPicker label="Bogey □"         value={data.bogeyColor}       onChange={v => update({ bogeyColor: v })} />
              <ColorPicker label="Dbl Bogey ⊡"     value={data.doubleBogeyColor} onChange={v => update({ doubleBogeyColor: v })} />
            </div>
            <Separator className="bg-gray-700/60" />
            <div>
              <p className="text-xs text-gray-400 font-medium mb-2">Color Presets</p>
              <div className="grid grid-cols-3 gap-2">
                {PRESETS.map(p => (
                  <button key={p.name} onClick={() => setData(prev => ({ ...prev, ...p.colors }))}
                    className="text-xs py-2 px-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 border border-gray-600 hover:border-gray-400 transition-colors font-medium">
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ───── EXPORT ───── */}
          <TabsContent value="format" className="mt-0 space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-gray-400 font-medium">Output Format</Label>
              <div className="grid grid-cols-2 gap-2">
                {(['1080x1440', '1080x1920'] as const).map(fmt => (
                  <button key={fmt} onClick={() => update({ outputFormat: fmt })}
                    className={`py-3.5 rounded-xl border text-sm font-medium transition-all ${data.outputFormat === fmt ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/40' : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-400'}`}>
                    <div className="font-bold">{fmt.replace('x', ' × ')}</div>
                    <div className="text-xs opacity-70 mt-0.5">{fmt === '1080x1440' ? 'Portrait — Feed' : 'Story — Reel'}</div>
                  </button>
                ))}
              </div>
            </div>
            <Separator className="bg-gray-700/60" />
            <button onClick={onExport} disabled={exporting}
              className="w-full py-3.5 rounded-xl bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              {exporting ? 'Exporting…' : `Download ${data.outputFormat} PNG`}
            </button>
            <div className="bg-gray-800/40 rounded-lg p-3 space-y-1">
              <p className="text-xs text-gray-300 font-medium">Notes</p>
              <ul className="text-xs text-gray-500 space-y-0.5 list-disc list-inside">
                <li>Full resolution PNG (1080px wide)</li>
                <li>All 7 layouts export at full quality</li>
                <li>1080×1440 for feed · 1080×1920 for stories</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
