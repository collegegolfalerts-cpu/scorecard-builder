"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home, Search, Info, Play, ChevronRight,
  ArrowLeft, Clock, Star, Users, Video,
  FolderOpen, Bookmark
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────
type Screen = 'splash' | 'home' | 'browse' | 'program' | 'player' | 'search' | 'about'
type TabType = 'home' | 'browse' | 'search' | 'about'

interface Program {
  id: number
  school: string
  conference: string
  videoCount: number
  abbrev: string
  color: string
  bgColor: string
  description: string
}

interface VideoItem {
  id: number
  title: string
  duration: string
  programId: number
  description: string
  views: string
  date: string
}

// ─── Data ─────────────────────────────────────────────────────────────
const PROGRAMS: Program[] = [
  { id: 1, school: "Oklahoma State", conference: "Big 12", videoCount: 14, abbrev: "OSU", color: "#FF6B00", bgColor: "#2A1500", description: "The Cowboys have won more NCAA team championships than any other program in college golf history. Under head coach Alan Bratton, OSU continues to set the standard for excellence in college golf." },
  { id: 2, school: "Stanford", conference: "Pac-12", videoCount: 9, abbrev: "STAN", color: "#B83232", bgColor: "#1E0000", description: "The Cardinal have produced some of the greatest names in golf, including Tiger Woods, Tom Watson, and Notah Begay. Stanford's tradition of academic and athletic excellence is unmatched." },
  { id: 3, school: "Texas Tech", conference: "Big 12", videoCount: 7, abbrev: "TTU", color: "#CC2222", bgColor: "#1A0000", description: "The Red Raiders compete at the highest level of college golf in the Big 12 Conference, producing PGA Tour players and competing for national championships year after year." },
  { id: 4, school: "Augusta University", conference: "Peach Belt", videoCount: 11, abbrev: "AU", color: "#4488CC", bgColor: "#001529", description: "Augusta University is steeped in golf tradition, competing in the shadow of Augusta National Golf Club with one of the most unique program identities in college golf." },
  { id: 5, school: "Pepperdine", conference: "WCC", videoCount: 6, abbrev: "PEPP", color: "#0088CC", bgColor: "#001A29", description: "The Waves compete with one of the most scenic practice facilities in all of college golf, overlooking the Pacific Ocean in Malibu, California." },
  { id: 6, school: "Vanderbilt", conference: "SEC", videoCount: 8, abbrev: "VU", color: "#9A8060", bgColor: "#1A1208", description: "The Commodores are a perennial contender in the ultra-competitive SEC, combining academic prestige with elite golf competition in Nashville." },
  { id: 7, school: "University of Texas", conference: "Big 12", videoCount: 12, abbrev: "UT", color: "#CC6000", bgColor: "#1A0D00", description: "The Longhorns have a rich tradition in college golf with national championship pedigree and a history of developing some of the PGA Tour's biggest names." },
  { id: 8, school: "Georgia Tech", conference: "ACC", videoCount: 5, abbrev: "GT", color: "#B8A85A", bgColor: "#1A1600", description: "The Yellow Jackets are an ACC powerhouse with a proud golfing heritage, located in the heart of Atlanta near world-class golf facilities." },
]

const VIDEOS: VideoItem[] = [
  { id: 1, title: "2024–25 Season Recap", duration: "24:30", programId: 1, description: "Follow the Cowboys through their landmark 2024–25 season, from fall tournaments to the national championship in Scottsdale.", views: "12.4K", date: "May 2025" },
  { id: 2, title: "Road to the NCAA Championship", duration: "31:15", programId: 1, description: "An inside look at the Cowboys' journey through the regional and national championship, featuring behind-the-scenes access.", views: "8.7K", date: "Jun 2025" },
  { id: 3, title: "Meet the Team: Fall 2024", duration: "18:45", programId: 1, description: "Get to know the 2024–25 Oklahoma State golf team — their goals, their stories, and their path to the top.", views: "5.2K", date: "Sep 2024" },
  { id: 4, title: "Inside Stanford Golf", duration: "22:10", programId: 2, description: "A rare inside look at the Stanford Cardinal golf program — the facilities, the culture, and what makes it unlike any other.", views: "9.1K", date: "Apr 2025" },
  { id: 5, title: "Cardinal Season Preview 2024–25", duration: "15:30", programId: 2, description: "Head coach Conrad Ray breaks down the upcoming season and introduces the newest members of the Stanford squad.", views: "4.3K", date: "Sep 2024" },
  { id: 6, title: "Texas Tech Golf: A New Era", duration: "19:20", programId: 3, description: "The Red Raiders enter a new chapter in their program's history with a young roster and championship aspirations.", views: "3.8K", date: "Mar 2025" },
  { id: 7, title: "Raiders on the Road", duration: "27:45", programId: 3, description: "Follow the Red Raiders as they compete in marquee tournaments across the country during the spring 2025 season.", views: "2.9K", date: "Apr 2025" },
]

const CONFERENCES = ["All", "Big 12", "SEC", "ACC", "Pac-12", "WCC", "Peach Belt"]

// ─── Splash Screen ────────────────────────────────────────────────────
function SplashScreen({ onEnter }: { onEnter: () => void }) {
  useEffect(() => {
    const t = setTimeout(onEnter, 2800)
    return () => clearTimeout(t)
  }, [onEnter])

  return (
    <div
      className="h-full flex flex-col items-center justify-center bg-[#0A1628] cursor-pointer"
      onClick={onEnter}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-24 h-24 rounded-3xl bg-[#C9A84C] flex items-center justify-center shadow-lg shadow-[#C9A84C]/20">
          <span className="text-[#0A1628] text-5xl font-black tracking-tighter">F</span>
        </div>
        <div className="flex flex-col items-center gap-2 mt-2">
          <h1 className="text-[#F5F5F0] text-4xl font-black tracking-[0.12em] uppercase">Fairway</h1>
          <div className="w-28 h-px bg-[#C9A84C]" />
          <p className="text-[#C9A84C] text-[11px] tracking-[0.22em] uppercase font-semibold mt-1">
            The Home of College Golf
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-10 flex flex-col items-center gap-1"
        >
          <p className="text-[#9AA5B4] text-[10px] tracking-[0.25em] uppercase">Presented by</p>
          <p className="text-[#F5F5F0] text-2xl font-black tracking-[0.18em]">STIFEL</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ─── Bottom Navigation ────────────────────────────────────────────────
function BottomNav({ activeTab, onTabChange }: { activeTab: TabType; onTabChange: (t: TabType) => void }) {
  const tabs: { id: TabType; label: string; Icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', Icon: Home },
    { id: 'browse', label: 'Browse', Icon: FolderOpen },
    { id: 'search', label: 'Search', Icon: Search },
    { id: 'about', label: 'About', Icon: Info },
  ]
  return (
    <div className="flex border-t border-[#2D3E50] bg-[#0A1628] flex-shrink-0">
      {tabs.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={cn(
            "flex-1 flex flex-col items-center gap-1 py-3 transition-colors",
            activeTab === id ? "text-[#C9A84C]" : "text-[#9AA5B4]"
          )}
        >
          <Icon className="w-5 h-5" />
          <span className="text-[10px] font-medium">{label}</span>
        </button>
      ))}
    </div>
  )
}

// ─── Video Thumbnail Card ─────────────────────────────────────────────
function VideoThumb({ video, program, onSelect }: { video: VideoItem; program: Program; onSelect: () => void }) {
  return (
    <button onClick={onSelect} className="flex items-start gap-3 w-full text-left active:opacity-70">
      <div
        className="relative flex-shrink-0 w-28 h-16 rounded-lg flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: program.bgColor }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
        </div>
        <div className="absolute bottom-1 right-1 bg-black/70 rounded px-1">
          <span className="text-white text-[10px] font-medium">{video.duration}</span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[#F5F5F0] text-sm font-medium leading-snug line-clamp-2">{video.title}</p>
        <p className="text-[#9AA5B4] text-xs mt-1">{program.school}</p>
        <p className="text-[#9AA5B4] text-xs">{video.views} views · {video.date}</p>
      </div>
    </button>
  )
}

// ─── Section Header ───────────────────────────────────────────────────
function SectionHeader({ label, onSeeAll }: { label: string; onSeeAll?: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-1 h-4 bg-[#C9A84C] rounded-full" />
        <span className="text-[#C9A84C] text-[11px] font-bold tracking-[0.18em] uppercase">{label}</span>
      </div>
      {onSeeAll && (
        <button onClick={onSeeAll} className="flex items-center gap-0.5">
          <span className="text-[#9AA5B4] text-xs">See All</span>
          <ChevronRight className="w-3 h-3 text-[#9AA5B4]" />
        </button>
      )}
    </div>
  )
}

// ─── Home Screen ─────────────────────────────────────────────────────
function HomeScreen({ onNav, onProgram, onVideo }: {
  onNav: (s: Screen) => void
  onProgram: (p: Program) => void
  onVideo: (v: VideoItem) => void
}) {
  const featured = VIDEOS[0]
  const featProg = PROGRAMS.find(p => p.id === featured.programId)!
  const recent = VIDEOS.slice(1, 4)

  return (
    <div className="flex flex-col h-full bg-[#0A1628]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2D3E50] flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#C9A84C] flex items-center justify-center">
            <span className="text-[#0A1628] text-sm font-black">F</span>
          </div>
          <span className="text-[#F5F5F0] text-base font-bold tracking-widest uppercase">Fairway</span>
        </div>
        <button onClick={() => onNav('search')}>
          <Search className="w-5 h-5 text-[#9AA5B4]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Featured */}
        <div className="px-4 pt-4">
          <SectionHeader label="Featured" />
          <button
            onClick={() => onVideo(featured)}
            className="w-full mt-3 rounded-2xl overflow-hidden relative"
          >
            <div
              className="w-full relative"
              style={{ paddingBottom: "56.25%", backgroundColor: featProg.bgColor }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-black/40 border-2 border-white/30 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-bold text-sm leading-snug">{featured.title}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <div
                    className="w-4 h-4 rounded flex items-center justify-center"
                    style={{ backgroundColor: featProg.color + "30", border: `1px solid ${featProg.color}` }}
                  >
                    <span className="text-[7px] font-black" style={{ color: featProg.color }}>{featProg.abbrev}</span>
                  </div>
                  <span className="text-white/70 text-xs">{featProg.school}</span>
                  <span className="text-white/30">·</span>
                  <Clock className="w-3 h-3 text-white/60" />
                  <span className="text-white/70 text-xs">{featured.duration}</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Recently Added */}
        <div className="px-4 pt-5">
          <SectionHeader label="Recently Added" onSeeAll={() => onNav('browse')} />
          <div className="mt-3 space-y-4">
            {recent.map(v => (
              <VideoThumb
                key={v.id}
                video={v}
                program={PROGRAMS.find(p => p.id === v.programId)!}
                onSelect={() => onVideo(v)}
              />
            ))}
          </div>
        </div>

        {/* Browse Programs */}
        <div className="px-4 pt-5">
          <SectionHeader label="Browse Programs" onSeeAll={() => onNav('browse')} />
          <div className="flex gap-3 mt-3 overflow-x-auto pb-2">
            {PROGRAMS.map(p => (
              <button
                key={p.id}
                onClick={() => onProgram(p)}
                className="flex-shrink-0 flex flex-col items-center gap-2 w-[68px]"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: p.bgColor, border: `1px solid ${p.color}50` }}
                >
                  <span className="font-black text-[11px]" style={{ color: p.color }}>{p.abbrev}</span>
                </div>
                <span className="text-[#9AA5B4] text-[9px] text-center leading-tight line-clamp-2">{p.school}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stifel Banner */}
        <div className="mx-4 mt-5 mb-6 rounded-2xl bg-[#1C2B3A] border border-[#2D3E50] p-4 flex items-center gap-4">
          <div className="flex-1">
            <p className="text-[#9AA5B4] text-[9px] tracking-[0.2em] uppercase font-semibold">Presented by</p>
            <p className="text-[#F5F5F0] text-2xl font-black tracking-widest mt-0.5">STIFEL</p>
            <p className="text-[#9AA5B4] text-[10px] mt-1 leading-snug">Invested in the future of collegiate golf</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/25 flex items-center justify-center flex-shrink-0">
            <Star className="w-5 h-5 text-[#C9A84C]" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Browse Screen ────────────────────────────────────────────────────
function BrowseScreen({ onProgram, filter, setFilter }: {
  onProgram: (p: Program) => void
  filter: string
  setFilter: (c: string) => void
}) {
  const filtered = filter === 'All' ? PROGRAMS : PROGRAMS.filter(p => p.conference === filter)

  return (
    <div className="flex flex-col h-full bg-[#0A1628]">
      <div className="px-4 py-3 border-b border-[#2D3E50] flex-shrink-0">
        <h2 className="text-[#F5F5F0] text-xl font-bold">Programs</h2>
        <p className="text-[#9AA5B4] text-xs mt-0.5">{PROGRAMS.length} programs on Fairway</p>
      </div>
      {/* Conference chips */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto border-b border-[#2D3E50] flex-shrink-0">
        {CONFERENCES.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all",
              filter === c
                ? "bg-[#C9A84C] text-[#0A1628] border-[#C9A84C]"
                : "bg-transparent text-[#9AA5B4] border-[#2D3E50]"
            )}
          >
            {c}
          </button>
        ))}
      </div>
      {/* List */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#2D3E50]">
        {filtered.map(p => (
          <button
            key={p.id}
            onClick={() => onProgram(p)}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-[#1C2B3A]"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: p.bgColor, border: `1px solid ${p.color}40` }}
            >
              <span className="font-black text-xs" style={{ color: p.color }}>{p.abbrev}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#F5F5F0] text-sm font-semibold">{p.school}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[#9AA5B4] text-xs">{p.conference}</span>
                <span className="text-[#2D3E50]">·</span>
                <Video className="w-3 h-3 text-[#9AA5B4]" />
                <span className="text-[#9AA5B4] text-xs">{p.videoCount} videos</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#2D3E50] flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Program Screen ───────────────────────────────────────────────────
function ProgramScreen({ program, videos, onBack, onVideo }: {
  program: Program
  videos: VideoItem[]
  onBack: () => void
  onVideo: (v: VideoItem) => void
}) {
  const [tab, setTab] = useState<'videos' | 'about'>('videos')
  const displayVideos = videos.length > 0 ? videos : [
    { id: 90, title: "2024–25 Season Recap", duration: "24:30", programId: program.id, description: "Season overview", views: "6.1K", date: "May 2025" },
    { id: 91, title: "Meet the Team", duration: "18:15", programId: program.id, description: "Meet the squad", views: "3.4K", date: "Sep 2024" },
    { id: 92, title: "Tournament Highlights", duration: "22:45", programId: program.id, description: "Best moments", views: "4.2K", date: "Apr 2025" },
  ]

  return (
    <div className="flex flex-col h-full bg-[#0A1628]">
      {/* Header */}
      <div className="relative flex-shrink-0" style={{ backgroundColor: program.bgColor, minHeight: 140 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" />
        <button onClick={onBack} className="relative z-10 p-3">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="relative z-10 px-4 pb-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
            style={{ backgroundColor: program.color + "20", border: `2px solid ${program.color}` }}
          >
            <span className="font-black text-xl" style={{ color: program.color }}>{program.abbrev}</span>
          </div>
          <h1 className="text-white text-xl font-bold">{program.school}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-white/70 text-xs font-medium">{program.conference}</span>
            <span className="text-white/30">·</span>
            <span className="text-white/70 text-xs">{program.videoCount} Videos</span>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-[#2D3E50] flex-shrink-0">
        {(['videos', 'about'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 py-3 text-sm font-semibold capitalize transition-colors",
              tab === t ? "text-[#C9A84C] border-b-2 border-[#C9A84C]" : "text-[#9AA5B4]"
            )}
          >
            {t === 'videos' ? `Videos (${displayVideos.length})` : 'About'}
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {tab === 'videos' && (
          <div className="divide-y divide-[#2D3E50]">
            {displayVideos.map(v => (
              <button
                key={v.id}
                onClick={() => onVideo(v)}
                className="w-full flex items-start gap-3 p-4 text-left active:bg-[#1C2B3A]"
              >
                <div
                  className="relative w-28 h-16 rounded-lg flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: program.bgColor }}
                >
                  <Play className="w-6 h-6 text-white/70 fill-white/70" />
                  <div className="absolute bottom-1 right-1 bg-black/70 rounded px-1">
                    <span className="text-white text-[10px]">{v.duration}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#F5F5F0] text-sm font-medium leading-snug">{v.title}</p>
                  <p className="text-[#9AA5B4] text-xs mt-1">{v.views} views</p>
                  <p className="text-[#9AA5B4] text-xs">{v.date}</p>
                </div>
              </button>
            ))}
          </div>
        )}
        {tab === 'about' && (
          <div className="p-4 space-y-4">
            <p className="text-[#9AA5B4] text-sm leading-relaxed">{program.description}</p>
            <div className="space-y-3 pt-2 border-t border-[#2D3E50]">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-[#9AA5B4]" />
                <div>
                  <p className="text-[#9AA5B4] text-xs">Conference</p>
                  <p className="text-[#F5F5F0] text-sm font-semibold">{program.conference}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Video className="w-4 h-4 text-[#9AA5B4]" />
                <div>
                  <p className="text-[#9AA5B4] text-xs">Videos on Fairway</p>
                  <p className="text-[#F5F5F0] text-sm font-semibold">{program.videoCount}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Video Player Screen ──────────────────────────────────────────────
function PlayerScreen({ video, program, onBack }: {
  video: VideoItem
  program: Program
  onBack: () => void
}) {
  const [tapped, setTapped] = useState(false)
  const related = VIDEOS.filter(v => v.id !== video.id).slice(0, 3)

  return (
    <div className="flex flex-col h-full bg-[#0A1628]">
      {/* Video Area */}
      <div
        className="relative w-full flex-shrink-0"
        style={{ paddingBottom: "56.25%", backgroundColor: program.bgColor }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/50" />
        <button onClick={onBack} className="absolute top-3 left-3 z-20 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {!tapped ? (
            <button
              onClick={() => setTapped(true)}
              className="w-16 h-16 rounded-full bg-black/40 border-2 border-white/40 flex items-center justify-center backdrop-blur-sm"
            >
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            </button>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              <p className="text-white/60 text-xs">Loading video...</p>
              <p className="text-white/30 text-[10px]">Streaming from YouTube / Vimeo</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-2 right-2 z-10">
          <div className="bg-black/70 rounded px-1.5 py-0.5">
            <span className="text-white text-[11px] font-medium">{video.duration}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Video info */}
        <div className="p-4 border-b border-[#2D3E50]">
          <h2 className="text-[#F5F5F0] text-base font-bold leading-snug">{video.title}</h2>
          <div className="flex items-center gap-2 mt-2">
            <div
              className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: program.bgColor, border: `1px solid ${program.color}` }}
            >
              <span className="text-[7px] font-black" style={{ color: program.color }}>{program.abbrev}</span>
            </div>
            <span className="text-[#9AA5B4] text-xs">{program.school}</span>
            <span className="text-[#2D3E50]">·</span>
            <Clock className="w-3 h-3 text-[#9AA5B4]" />
            <span className="text-[#9AA5B4] text-xs">{video.duration}</span>
            <span className="text-[#2D3E50]">·</span>
            <span className="text-[#9AA5B4] text-xs">{video.views} views</span>
          </div>
          <p className="text-[#9AA5B4] text-xs mt-2 leading-relaxed">{video.description}</p>
        </div>

        {/* Stifel placement */}
        <div className="mx-4 mt-4 rounded-xl bg-[#1C2B3A] border border-[#2D3E50] p-3 flex items-center gap-3">
          <div>
            <p className="text-[#9AA5B4] text-[9px] tracking-[0.2em] uppercase">Presented by</p>
            <p className="text-[#F5F5F0] text-lg font-black tracking-widest mt-0.5">STIFEL</p>
          </div>
          <p className="ml-auto text-[#9AA5B4] text-[9px] text-right leading-relaxed">Invested in the<br />future of golf</p>
        </div>

        {/* Related */}
        <div className="p-4">
          <SectionHeader label="More Videos" />
          <div className="mt-3 space-y-4">
            {related.map(v => (
              <VideoThumb
                key={v.id}
                video={v}
                program={PROGRAMS.find(p => p.id === v.programId)!}
                onSelect={() => { }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Search Screen ────────────────────────────────────────────────────
function SearchScreen({ query, setQuery, onProgram }: {
  query: string
  setQuery: (q: string) => void
  onProgram: (p: Program) => void
}) {
  const results = query.length > 0
    ? PROGRAMS.filter(p =>
      p.school.toLowerCase().includes(query.toLowerCase()) ||
      p.conference.toLowerCase().includes(query.toLowerCase())
    )
    : PROGRAMS

  return (
    <div className="flex flex-col h-full bg-[#0A1628]">
      <div className="px-4 pt-4 pb-3 border-b border-[#2D3E50] flex-shrink-0">
        <h2 className="text-[#F5F5F0] text-xl font-bold mb-3">Search</h2>
        <div className="flex items-center gap-2 bg-[#1C2B3A] border border-[#2D3E50] rounded-xl px-3 py-2.5">
          <Search className="w-4 h-4 text-[#9AA5B4] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search programs, conferences..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="bg-transparent text-[#F5F5F0] text-sm flex-1 outline-none placeholder:text-[#9AA5B4]"
          />
        </div>
      </div>
      {query.length === 0 && (
        <div className="px-4 py-3 border-b border-[#2D3E50] flex-shrink-0">
          <p className="text-[#9AA5B4] text-[10px] font-semibold tracking-widest uppercase mb-2">Browse by Conference</p>
          <div className="flex flex-wrap gap-2">
            {CONFERENCES.filter(c => c !== 'All').map(c => (
              <button
                key={c}
                onClick={() => setQuery(c)}
                className="px-3 py-1.5 rounded-full bg-[#1C2B3A] border border-[#2D3E50] text-[#9AA5B4] text-xs font-medium"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex-1 overflow-y-auto divide-y divide-[#2D3E50]">
        {results.map(p => (
          <button
            key={p.id}
            onClick={() => onProgram(p)}
            className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-[#1C2B3A]"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: p.bgColor, border: `1px solid ${p.color}40` }}
            >
              <span className="font-black text-[10px]" style={{ color: p.color }}>{p.abbrev}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#F5F5F0] text-sm font-semibold">{p.school}</p>
              <p className="text-[#9AA5B4] text-xs">{p.conference} · {p.videoCount} videos</p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#2D3E50] flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── About Screen ─────────────────────────────────────────────────────
function AboutScreen() {
  return (
    <div className="flex flex-col h-full bg-[#0A1628]">
      <div className="px-4 py-3 border-b border-[#2D3E50] flex-shrink-0">
        <h2 className="text-[#F5F5F0] text-xl font-bold">About</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Mission */}
        <div>
          <SectionHeader label="Our Mission" />
          <p className="text-[#9AA5B4] text-sm leading-relaxed mt-3">
            Fairway is the home of college golf — a dedicated platform where programs tell their stories, fans follow the sport they love, and the next generation of professional golfers is discovered.
          </p>
        </div>

        {/* Stifel block */}
        <div className="rounded-2xl bg-[#1C2B3A] border border-[#2D3E50] p-5">
          <p className="text-[#9AA5B4] text-[9px] tracking-[0.25em] uppercase font-semibold">Presenting Sponsor</p>
          <p className="text-[#F5F5F0] text-3xl font-black tracking-widest mt-2">STIFEL</p>
          <div className="w-10 h-px bg-[#C9A84C] mt-2 mb-3" />
          <p className="text-[#9AA5B4] text-xs leading-relaxed">
            Fairway is proudly presented by Stifel — committed to investing in the future of collegiate golf and the student-athletes who represent the next generation of the sport.
          </p>
        </div>

        {/* Haskins Foundation */}
        <div>
          <SectionHeader label="Presented By" />
          <div className="mt-3 flex items-center gap-3 bg-[#1C2B3A] rounded-xl p-3 border border-[#2D3E50]">
            <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <div>
              <p className="text-[#F5F5F0] text-sm font-semibold">Haskins Award Foundation</p>
              <p className="text-[#9AA5B4] text-xs">Home of the Haskins & ANNIKA Awards</p>
            </div>
          </div>
        </div>

        {/* Submit CTA */}
        <div>
          <SectionHeader label="For Programs" />
          <p className="text-[#9AA5B4] text-sm mt-3 mb-4 leading-relaxed">
            Is your program on Fairway? Submit your content and reach fans, recruits, and the golf community nationwide.
          </p>
          <button className="w-full py-4 rounded-2xl bg-[#C9A84C] text-[#0A1628] text-sm font-black tracking-wider">
            SUBMIT YOUR PROGRAM
          </button>
        </div>

        <div className="flex justify-center gap-5 pt-2 pb-6">
          <button className="text-[#9AA5B4] text-xs">Contact</button>
          <span className="text-[#2D3E50]">·</span>
          <button className="text-[#9AA5B4] text-xs">Privacy</button>
          <span className="text-[#2D3E50]">·</span>
          <button className="text-[#9AA5B4] text-xs">Terms</button>
        </div>
      </div>
    </div>
  )
}

// ─── Root App Component ───────────────────────────────────────────────
export function FairwayApp() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [prevScreen, setPrevScreen] = useState<Screen>('home')
  const [activeTab, setActiveTab] = useState<TabType>('home')
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [confFilter, setConfFilter] = useState('All')

  const go = useCallback((s: Screen) => {
    setPrevScreen(screen)
    setScreen(s)
    if (['home', 'browse', 'search', 'about'].includes(s)) {
      setActiveTab(s as TabType)
    }
  }, [screen])

  const handleTab = (tab: TabType) => {
    setActiveTab(tab)
    setScreen(tab as Screen)
  }

  const showNav = !['splash', 'player'].includes(screen)

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#0A1628]">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, x: screen === 'splash' ? 0 : 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="flex-1 overflow-hidden min-h-0"
        >
          {screen === 'splash' && <SplashScreen onEnter={() => go('home')} />}
          {screen === 'home' && (
            <HomeScreen
              onNav={go}
              onProgram={p => { setSelectedProgram(p); go('program') }}
              onVideo={v => { setSelectedVideo(v); go('player') }}
            />
          )}
          {screen === 'browse' && (
            <BrowseScreen
              onProgram={p => { setSelectedProgram(p); go('program') }}
              filter={confFilter}
              setFilter={setConfFilter}
            />
          )}
          {screen === 'program' && selectedProgram && (
            <ProgramScreen
              program={selectedProgram}
              videos={VIDEOS.filter(v => v.programId === selectedProgram.id)}
              onBack={() => go(prevScreen === 'home' ? 'home' : 'browse')}
              onVideo={v => { setSelectedVideo(v); go('player') }}
            />
          )}
          {screen === 'player' && selectedVideo && (
            <PlayerScreen
              video={selectedVideo}
              program={PROGRAMS.find(p => p.id === selectedVideo.programId)!}
              onBack={() => go(selectedProgram ? 'program' : 'home')}
            />
          )}
          {screen === 'search' && (
            <SearchScreen
              query={searchQuery}
              setQuery={setSearchQuery}
              onProgram={p => { setSelectedProgram(p); go('program') }}
            />
          )}
          {screen === 'about' && <AboutScreen />}
        </motion.div>
      </AnimatePresence>

      {showNav && <BottomNav activeTab={activeTab} onTabChange={handleTab} />}
    </div>
  )
}
