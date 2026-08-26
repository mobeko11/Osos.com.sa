import { useState, useRef, useEffect, useCallback } from "react";
import logoImg from "../imports/logo_website.png";
import fabLogoImg from "../imports/Frame_8-1.jpg";
import SaudiMapChart from "../imports/Chart17864508649341/index";
import OsosComSa from "../imports/OsosComSa/index";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Menu,
  X,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Shield,
  Award,
  Users,
  Handshake,
  CheckCircle,
  Building2,
  Search,
  FileText,
  ChevronDown,
  GraduationCap,
  Heart,
  Briefcase,
  Play,
  Pause,
  Volume2,
  Eye,
  Layers,
  RefreshCw,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Upload,
  Minus,
  List,
  LayoutGrid,
} from "lucide-react";

// ── Audio Card ────────────────────────────────────────────────────────────────
function AudioCard({
  name,
  province,
  src,
  light = false,
}: {
  name: string;
  province: string;
  src: string;
  light?: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
    } else {
      a.play();
    }
    setPlaying(!playing);
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    a.currentTime = ratio * duration;
  };

  const lc = light ? {
    card: "bg-white border-gray-200 hover:border-[#D4A843]/40",
    avatar: "bg-[#D4A843]/10 border-[#D4A843]/20 group-hover:bg-[#D4A843]/20",
    name: "text-[#0B1B3A]",
    province: "text-[#4B5974]",
    track: "bg-gray-200",
    time: "text-[#4B5974]",
  } : {
    card: "bg-card border-border hover:border-primary/30",
    avatar: "bg-primary/10 border-primary/20 group-hover:bg-primary/20",
    name: "text-foreground",
    province: "text-muted-foreground",
    track: "bg-muted",
    time: "text-muted-foreground",
  };

  return (
    <div className={`border p-6 flex flex-col gap-6 transition-colors duration-300 group ${lc.card}`}>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={() => {
          const a = audioRef.current;
          if (!a) return;
          setCurrent(a.currentTime);
          setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
          setCurrent(0);
        }}
      />

      {/* Client info */}
      <div className="flex items-center gap-4">
        <div className={`w-11 h-11 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${lc.avatar}`}>
          <Volume2 size={16} className="text-[#D4A843]" />
        </div>
        <div>
          <div className={`text-sm font-medium ${lc.name}`}>{name}</div>
          <div className={`text-xs mt-0.5 ${lc.province}`}>{province}</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className={`w-full h-1 cursor-pointer relative group/bar ${lc.track}`} onClick={seek}>
        <div className="h-full bg-[#D4A843] transition-all duration-100" style={{ width: `${progress}%` }} />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#D4A843] rounded-full opacity-0 group-hover/bar:opacity-100 transition-opacity"
          style={{ left: `${progress}%`, transform: "translate(-50%, -50%)" }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={toggle}
          className="w-9 h-9 flex items-center justify-center bg-[#D4A843] text-[#0B1B3A] hover:bg-[#D4A843]/85 transition-colors flex-shrink-0"
          aria-label={playing ? "إيقاف" : "تشغيل"}
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <div className={`text-xs ${lc.time}`} dir="ltr">
          {fmt(current)} / {duration ? fmt(duration) : "—:——"}
        </div>
      </div>
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────
type Page = "home" | "about" | "projects" | "products" | "product-detail" | "news" | "contact" | "careers" | "faq" | "privacy" | "terms";

type Project = {
  id: number;
  slug: string;
  name: string;
  city: string;
  region: string;
  lat: number;
  lng: number;
  propertyType: "villa" | "apartment" | "building" | "other";
  productType: "self-build" | "off-plan" | "ready-unit" | "other";
  status: "available" | "under-construction" | "sold";
  featured: boolean;
  thumbnail: string;
  heroImage: string;
  gallery: string[];
  shortDescription: string;
  description: string[];
  features: { title: string; desc: string }[];
  googleMapsUrl: string;
  startingPrice?: number;
  landArea?: number;
  buildingArea?: number;
  numberOfBuildings?: number;
  totalUnits?: number;
};

type Unit = {
  unitId: string;
  unitNumber: string;
  projectId: number;
  building: string;
  floor: number;
  unitType: string;
  area: number;
  price: number;
  status: "available" | "reserved" | "sold";
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  description: string;
};

const UNIT_STATUS_LABEL: Record<Unit["status"], string> = { available: "متاح", reserved: "محجوز", sold: "مباع" };
const UNIT_STATUS_CLR: Record<Unit["status"], string> = {
  available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  reserved: "bg-amber-50 text-amber-700 border-amber-200",
  sold: "bg-gray-100 text-gray-500 border-gray-200",
};

// ── Images ────────────────────────────────────────────────────────────────────
const HERO_IMG =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1800&h=1000&fit=crop&auto=format";
const INTERIOR_IMG =
  "https://images.unsplash.com/photo-1776362355123-ca966d36e29c?w=1200&h=700&fit=crop&auto=format";
const BUILDING_IMG =
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=700&fit=crop&auto=format";
const POOL_IMG =
  "https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?w=1200&h=700&fit=crop&auto=format";
const CAREERS_IMG =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=700&fit=crop&auto=format";
const LEGAL_IMG =
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=700&fit=crop&auto=format";

// ── Nav items ─────────────────────────────────────────────────────────────────
const NAV_ITEMS: { id: Page; label: string }[] = [
  { id: "home", label: "الرئيسية" },
  { id: "projects", label: "مشاريعنا" },
  { id: "about", label: "من نحن" },
  { id: "products", label: "منتجاتنا" },
  { id: "news", label: "المركز الإعلامي" },
  { id: "contact", label: "تواصل معنا" },
];

// ── Shared helpers ────────────────────────────────────────────────────────────
const displayFont = { fontFamily: "'IBM Plex Sans Arabic', sans-serif" };

function GoldLine() {
  return <div className="h-px w-8 bg-[#D4A843] mb-6 opacity-90" />;
}

function SectionHead({
  tag,
  title,
  sub,
}: {
  tag?: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-6">
      <GoldLine />
      {tag && (
        <p className="text-[#D4A843] text-[10px] tracking-[0.18em] uppercase mb-3 font-medium">
          {tag}
        </p>
      )}
      <h2
        className="text-2xl md:text-3xl leading-snug text-foreground mb-3"
        style={displayFont}
      >
        {title}
      </h2>
      {sub && (
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
          {sub}
        </p>
      )}
    </div>
  );
}

function SectionHeadLight({ tag, title, sub }: { tag?: string; title: string; sub?: string }) {
  return (
    <div className="mb-6">
      
      <h2 className="leading-snug text-[#0B1B3A] mb-3 font-bold text-[36px]" style={displayFont}>{title}</h2>
      {sub && <p className="text-[#4B5974] text-sm leading-relaxed max-w-xl">{sub}</p>}
    </div>
  );
}

function PageHero({
  tag,
  title,
  sub,
  img,
  alt,
  onHome,
}: {
  tag: string;
  title: string;
  sub?: string;
  img: string;
  alt: string;
  onHome?: () => void;
}) {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-[#0B1B3A]">
      <img
        src={img}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover opacity-55 mix-blend-luminosity"
      />
      <div className="absolute inset-0 bg-[#0B1B3A]/72" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        {onHome && (
          <div className="flex items-center gap-2 text-xs mb-4">
            <button
              onClick={onHome}
              className="text-[#D4A843] hover:text-[#D4A843]/75 transition-colors font-medium"
            >
              الرئيسية
            </button>
            <span className="text-white/30">/</span>
            <span className="text-white/55">{tag}</span>
          </div>
        )}
        <h1
          className="text-3xl md:text-4xl lg:text-5xl text-white mb-4"
          style={displayFont}
        >
          {title}
        </h1>
        {sub && (
          <p className="text-white/50 text-sm max-w-xl leading-relaxed">
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FINANCING FORM SECTION
// ─────────────────────────────────────────────────────────────────────────────
function FinancingFormSection() {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    "w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4A843] transition-colors text-[#0B1B3A] placeholder:text-[#6B7A8D]/50";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section className="py-10 md:py-12 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

        {/* ── Left: heading block ── */}
        <div className="lg:col-span-2 lg:sticky lg:top-32">
          <GoldLine />
          <p className="text-primary text-xs tracking-widest uppercase mb-4">تمويل عقاري</p>
          <h2
            className="text-3xl md:text-4xl text-foreground mb-6 leading-snug"
            style={displayFont}
          >
            احسب تمويلك المبدئي
          </h2>
          <p className="text-muted-foreground text-sm leading-[2] mb-6">
            خلّنا نعرف احتياجك ونحسب لك الحل التمويلي المناسب مبدئيًا.
          </p>
          <p className="text-muted-foreground text-sm leading-[2]">
            أدخل بياناتك، وسيتواصل معك أحد المختصين لمراجعة حالتك وتوضيح الخيارات المتاحة.
          </p>
          <div className="mt-10 flex flex-col gap-4">
            {[
              "استشارة مبدئية مجانية",
              "سرية تامة لجميع البيانات",
              "رد خلال 24 ساعة",
            ].map((point) => (
              <div key={point} className="flex items-center gap-3 text-muted-foreground text-sm">
                <CheckCircle size={14} className="text-primary flex-shrink-0" />
                {point}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: form ── */}
        <div className="lg:col-span-3">
          {submitted ? (
            <div className="py-20 text-center">
              <CheckCircle size={44} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl mb-3 text-foreground" style={displayFont}>
                تم استلام طلبك
              </h3>
              <p className="text-muted-foreground text-sm">
                سيتواصل معك أحد مختصينا قريباً لمراجعة حالتك التمويلية.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-2 tracking-wide">
                    الاسم الكامل <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="محمد العمري"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2 tracking-wide">
                    رقم الهاتف <span className="text-primary">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+966 5X XXX XXXX"
                    className={inputClass}
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-2 tracking-wide">
                    العمر <span className="text-primary">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={18}
                    max={65}
                    placeholder="مثال: 32"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2 tracking-wide">
                    الراتب الشهري (ريال) <span className="text-primary">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    placeholder="مثال: 12000"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-muted-foreground mb-2 tracking-wide">
                  جهة العمل <span className="text-primary">*</span>
                </label>
                <select className={`${inputClass} appearance-none cursor-pointer`} required defaultValue="">
                  <option value="" disabled>اختر جهة العمل</option>
                  <option>القطاع العسكري</option>
                  <option>القطاع التعليمي</option>
                  <option>قطاع الصحة</option>
                  <option>القطاع الخاص</option>
                  <option>موظفين الحكومة</option>
                  <option>أخرى</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-muted-foreground mb-2 tracking-wide">
                  ملاحظات إضافية
                </label>
                <textarea
                  rows={4}
                  placeholder="أي تفاصيل تود إضافتها حول وضعك التمويلي أو احتياجك..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Privacy checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <div className="w-4 h-4 border border-border peer-checked:border-primary peer-checked:bg-primary transition-colors" />
                  {agreed && (
                    <svg
                      className="absolute inset-0 w-4 h-4 text-primary-foreground"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3 8l3.5 3.5L13 5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-muted-foreground text-xs leading-relaxed group-hover:text-foreground transition-colors">
                  أوافق على استخدام بياناتي للتواصل معي بشأن الحسبة التمويلية والخدمات ذات الصلة.
                </span>
              </label>

              <button
                type="submit"
                disabled={!agreed}
                className="px-10 py-4 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/85 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                اطلب الحسبة المبدئية
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS DATA
// ─────────────────────────────────────────────────────────────────────────────
const PROP_LABEL: Record<Project["propertyType"], string> = {
  villa: "فيلا",
  apartment: "شقق",
  building: "عمارة",
  other: "أخرى",
};
const PROD_LABEL: Record<Project["productType"], string> = {
  "self-build": "البناء الذاتي",
  "off-plan": "البيع على الخارطة",
  "ready-unit": "وحدات جاهزة",
  other: "أخرى",
};
const STATUS_LABEL: Record<Project["status"], string> = {
  available: "متاح",
  "under-construction": "قيد الإنشاء",
  sold: "مباع",
};
const STATUS_CLR: Record<Project["status"], string> = {
  available: "bg-emerald-900/60 text-emerald-300 border-emerald-700/40",
  "under-construction": "bg-amber-900/60 text-amber-300 border-amber-700/40",
  sold: "bg-gray-800 text-gray-400 border-gray-700/40",
};
const STATUS_CLR_LIGHT: Record<Project["status"], string> = {
  available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "under-construction": "bg-amber-50 text-amber-700 border-amber-200",
  sold: "bg-gray-100 text-gray-500 border-gray-200",
};

const PROJECTS: Project[] = [
  {
    id: 1,
    slug: "villa-yasmine-riyadh",
    name: "فيلا الياسمين",
    city: "الرياض",
    region: "منطقة الرياض",
    lat: 24.7136,
    lng: 46.6753,
    propertyType: "villa",
    productType: "self-build",
    status: "available",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&h=800&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&h=800&fit=crop&auto=format",
    ],
    shortDescription: "فيلا سكنية عصرية بتصميم معماري راقٍ في حي النرجس بالرياض.",
    description: [
      "فيلا الياسمين مشروع سكني متكامل يقع في حي النرجس، أحد أرقى أحياء الرياض الشمالية. يجمع المشروع بين الطابع المعماري العصري والهوية السعودية الأصيلة، ليقدّم بيئة سكنية تليق بتطلعات الأسرة الحديثة.",
      "يمتاز الموقع بقربه من أبرز المرافق الخدمية، ويضمن خصوصية عالية مع إطلالات مفتوحة على المساحات الخضراء المحيطة.",
      "تتضمن الفيلا تشطيبات فاخرة بمواد عالية الجودة، مع إمكانية تخصيص التصميم الداخلي وفق رغبة العميل ضمن نطاق منتج البناء الذاتي.",
    ],
    features: [
      { title: "تصميم معماري مميز", desc: "تصميم يجمع الهوية المحلية بالطابع العصري الأنيق." },
      { title: "موقع استراتيجي", desc: "حي النرجس، على مقربة من الخدمات والمدارس والمرافق." },
      { title: "جودة التنفيذ", desc: "إشراف هندسي كامل وتشطيبات فاخرة بمواد منتقاة." },
      { title: "مساحات مدروسة", desc: "توزيع عملي يلائم احتياجات الأسرة في مختلف مراحلها." },
      { title: "خصوصية وراحة", desc: "تصميم يراعي الخصوصية مع مساحات خارجية خاصة." },
      { title: "قيمة عقارية", desc: "موقع متميز يضمن الاحتفاظ بالقيمة على المدى البعيد." },
    ],
    googleMapsUrl: "https://maps.google.com/?q=24.7136,46.6753",
  },
  {
    id: 2,
    slug: "nur-complex-jeddah",
    name: "مجمع النور السكني",
    city: "جدة",
    region: "منطقة مكة المكرمة",
    lat: 21.5433,
    lng: 39.1728,
    propertyType: "apartment",
    productType: "off-plan",
    status: "under-construction",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1400&h=800&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop&auto=format",
    ],
    shortDescription: "مجمع سكني متكامل يضم وحدات شقق بتشطيبات عالية في شمال جدة.",
    description: [
      "مجمع النور السكني مشروع مبتكر يقع في الشمال الغربي لمدينة جدة، ويتضمن مجموعة متكاملة من الشقق السكنية بمساحات متنوعة تلائم مختلف الاحتياجات.",
      "يوفر المجمع بيئة متكاملة بمرافق مشتركة مدروسة، وبُنية تحتية عالية المستوى، في موقع مميز يجمع بين الهدوء والقرب من مراكز التسوق والخدمات.",
      "يطرح المشروع وحداته بنظام البيع على الخارطة بأسعار تنافسية وخطط دفع مرنة.",
    ],
    features: [
      { title: "وحدات متنوعة", desc: "مساحات تبدأ من الغرفتين حتى أربع غرف لتناسب جميع الأسر." },
      { title: "مرافق مشتركة", desc: "مواقف، ملاعب، ومساحات خضراء مشتركة مصممة باحترافية." },
      { title: "بيع على الخارطة", desc: "خطط دفع مرنة وأسعار تنافسية في مرحلة الإطلاق." },
      { title: "موقع متميز", desc: "شمال جدة، قريب من الطرق الرئيسية والمراكز التجارية." },
    ],
    googleMapsUrl: "https://maps.google.com/?q=21.5433,39.1728",
    startingPrice: 520000,
    landArea: 8500,
    buildingArea: 12400,
    numberOfBuildings: 2,
    totalUnits: 32,
  },
  {
    id: 3,
    slug: "faisal-building-dammam",
    name: "عمارة الفيصل",
    city: "الدمام",
    region: "المنطقة الشرقية",
    lat: 26.4207,
    lng: 50.0888,
    propertyType: "building",
    productType: "off-plan",
    status: "available",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&h=800&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=800&fit=crop&auto=format",
    ],
    shortDescription: "عمارة سكنية استثمارية في قلب الدمام بتصميم عصري وموقع محوري.",
    description: [
      "عمارة الفيصل مشروع استثماري مميز يقع في أحد الأحياء الحيوية بالدمام، يوفر وحدات سكنية بمواصفات راقية مناسبة للتملك والاستثمار على حد سواء.",
      "صُمّمت العمارة وفق أحدث معايير البناء، مع الاهتمام بالكفاءة التشغيلية والجمالية في آنٍ واحد.",
      "يُتاح المشروع حاليًا للحجز ضمن مرحلة البيع على الخارطة بشروط دفع مرنة.",
    ],
    features: [
      { title: "عائد استثماري جيد", desc: "موقع مطلوب يضمن عائدًا إيجاريًا مستقرًا." },
      { title: "تصميم عصري", desc: "واجهات معمارية حديثة ومرافق سكنية متكاملة." },
      { title: "خطط دفع مرنة", desc: "خيارات دفع متعددة تناسب المستثمر والمشتري." },
    ],
    googleMapsUrl: "https://maps.google.com/?q=26.4207,50.0888",
    startingPrice: 380000,
    landArea: 3200,
    buildingArea: 8600,
    numberOfBuildings: 1,
    totalUnits: 24,
  },
  {
    id: 4,
    slug: "villa-classic-khobar",
    name: "فيلا الخبر الكلاسيكية",
    city: "الخبر",
    region: "المنطقة الشرقية",
    lat: 26.2172,
    lng: 50.1971,
    propertyType: "villa",
    productType: "self-build",
    status: "available",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&h=800&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&h=800&fit=crop&auto=format",
    ],
    shortDescription: "فيلا عائلية بطابع كلاسيكي راقٍ في حي هادئ بالخبر.",
    description: [
      "تقع فيلا الخبر الكلاسيكية في أحد الأحياء السكنية الهادئة بمدينة الخبر، وتقدّم نموذجًا متميزًا للسكن العائلي الذي يجمع الرحابة والخصوصية في موقع استراتيجي.",
      "تتميز الفيلا بتشطيبات كلاسيكية مرفّهة مع حديقة خاصة ومواقف سيارات مغطاة، ضمن منتج البناء الذاتي الذي يمنح العميل حرية التخصيص.",
    ],
    features: [
      { title: "حديقة خاصة", desc: "مساحة خضراء واسعة للاسترخاء وأنشطة العائلة." },
      { title: "تشطيبات كلاسيكية", desc: "مواد فاخرة بلمسات معمارية كلاسيكية أنيقة." },
      { title: "خصوصية تامة", desc: "تصميم يضمن الخصوصية الكاملة لأفراد الأسرة." },
    ],
    googleMapsUrl: "https://maps.google.com/?q=26.2172,50.1971",
  },
  {
    id: 5,
    slug: "talal-apartments-abha",
    name: "شقق تلال الخضراء",
    city: "أبها",
    region: "منطقة عسير",
    lat: 18.2164,
    lng: 42.5053,
    propertyType: "apartment",
    productType: "ready-unit",
    status: "available",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&h=800&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop&auto=format",
    ],
    shortDescription: "وحدات سكنية جاهزة بإطلالات خضراء في المناخ الجبلي المعتدل بأبها.",
    description: [
      "شقق تلال الخضراء تقدّم تجربة سكنية مغايرة في قلب مدينة أبها، حيث المناخ المعتدل والطبيعة الجبلية الخلابة، مع وحدات جاهزة للسكن الفوري.",
      "تتوفر الوحدات بمساحات مريحة وتشطيبات عالية الجودة، مع إطلالات مفتوحة على المناطق الخضراء المحيطة.",
    ],
    features: [
      { title: "وحدات جاهزة للتسليم", desc: "سكن فوري دون انتظار مراحل البناء." },
      { title: "إطلالات خضراء", desc: "مناظر طبيعية جميلة تميّز أبها عن سواها." },
      { title: "مناخ معتدل", desc: "استمتع بالهواء النقي والطقس المعتدل على مدار العام." },
    ],
    googleMapsUrl: "https://maps.google.com/?q=18.2164,42.5053",
  },
  {
    id: 6,
    slug: "andalus-villas-madinah",
    name: "مجمع الأندلس",
    city: "المدينة المنورة",
    region: "منطقة المدينة المنورة",
    lat: 24.5247,
    lng: 39.5692,
    propertyType: "villa",
    productType: "ready-unit",
    status: "sold",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&h=600&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1400&h=800&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1641050075956-82a3f0df6100?w=1200&h=800&fit=crop&auto=format",
    ],
    shortDescription: "مجمع فلل راقٍ تم تسليمه بالكامل في المدينة المنورة.",
    description: [
      "مجمع الأندلس كان أحد أنجح مشاريع «أسس» في المدينة المنورة، حيث قدّم نماذج متميزة من الفلل العائلية الجاهزة بتصميم يلائم خصوصية المنطقة.",
      "تم تسليم جميع الوحدات بنجاح لأصحابها، ويُشكّل المشروع نموذجًا للجودة والالتزام بمواعيد التسليم.",
    ],
    features: [
      { title: "تسليم في الموعد", desc: "التزام تام بجدول التسليم المحدد." },
      { title: "تصميم يراعي الخصوصية", desc: "تخطيط يحترم خصوصية الأسرة ومتطلبات الموقع." },
      { title: "مجمع متكامل", desc: "مداخل مشتركة وخدمات موحدة للمجمع." },
    ],
    googleMapsUrl: "https://maps.google.com/?q=24.5247,39.5692",
  },
  {
    id: 7,
    slug: "nakheel-tower-riyadh",
    name: "برج النخيل",
    city: "الرياض",
    region: "منطقة الرياض",
    lat: 24.6877,
    lng: 46.7219,
    propertyType: "building",
    productType: "off-plan",
    status: "under-construction",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&h=800&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=800&fit=crop&auto=format",
    ],
    shortDescription: "برج سكني من 12 طابقًا قيد الإنشاء في موقع محوري بشرق الرياض.",
    description: [
      "برج النخيل مشروع طموح يُنفّذ حاليًا في حي شرق الرياض، ويضم 12 طابقًا سكنيًا بوحدات متنوعة تتراوح بين الاستوديو والشقق الكبيرة.",
      "يُركّز المشروع على الكفاءة المعمارية وتوفير بيئة سكنية عصرية بمرافق متكاملة.",
    ],
    features: [
      { title: "12 طابقًا سكنيًا", desc: "وحدات متنوعة تناسب مختلف الاحتياجات." },
      { title: "مرافق حديثة", desc: "مصاعد، مواقف متعددة الطوابق، وأمن 24 ساعة." },
      { title: "استثمار واعد", desc: "موقع متنامٍ يعد بعوائد استثمارية جيدة." },
    ],
    googleMapsUrl: "https://maps.google.com/?q=24.6877,46.7219",
    startingPrice: 290000,
    landArea: 4200,
    buildingArea: 18000,
    numberOfBuildings: 1,
    totalUnits: 48,
  },
  {
    id: 8,
    slug: "marjan-villa-taif",
    name: "فيلا المرجان",
    city: "الطائف",
    region: "منطقة مكة المكرمة",
    lat: 21.2854,
    lng: 40.4147,
    propertyType: "villa",
    productType: "self-build",
    status: "available",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&h=800&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&auto=format",
    ],
    shortDescription: "فيلا سكنية هادئة في أجواء الطائف المعتدلة ضمن منتج البناء الذاتي.",
    description: [
      "فيلا المرجان تقدّم نموذجًا للسكن الراقي في مدينة الطائف الجبلية، بتصميم يستحضر أجواء الهدوء والخصوصية في بيئة ذات مناخ معتدل.",
      "تُتاح الفيلا ضمن منتج البناء الذاتي مما يمنح العميل مرونة التخصيص الكاملة.",
    ],
    features: [
      { title: "مناخ معتدل", desc: "استمتع بالطائف وهوائها النقي طوال العام." },
      { title: "تخصيص كامل", desc: "منتج البناء الذاتي يمنحك حرية التصميم الداخلي." },
      { title: "خصوصية مطلقة", desc: "موقع هادئ بعيد عن الضجيج في بيئة عائلية." },
    ],
    googleMapsUrl: "https://maps.google.com/?q=21.2854,40.4147",
  },
];

// ─── Units Inventory (off-plan projects) ────────────────────────────────────
const UNITS: Unit[] = [
  // مجمع النور (id:2)
  { unitId: "P2-A101", unitNumber: "A101", projectId: 2, building: "A", floor: 1, unitType: "شقة", area: 120, price: 520000, status: "available", bedrooms: 2, bathrooms: 2, parkingSpaces: 1, description: "شقة بتشطيبات عالية الجودة في الدور الأول مع إطلالة على الحديقة." },
  { unitId: "P2-A102", unitNumber: "A102", projectId: 2, building: "A", floor: 1, unitType: "شقة", area: 155, price: 660000, status: "reserved", bedrooms: 3, bathrooms: 2, parkingSpaces: 1, description: "شقة فسيحة بمطبخ مفتوح وبلكونة واسعة." },
  { unitId: "P2-A201", unitNumber: "A201", projectId: 2, building: "A", floor: 2, unitType: "شقة", area: 120, price: 535000, status: "available", bedrooms: 2, bathrooms: 2, parkingSpaces: 1, description: "شقة في الدور الثاني بإطلالة مفتوحة ومريحة." },
  { unitId: "P2-A202", unitNumber: "A202", projectId: 2, building: "A", floor: 2, unitType: "دوبلكس", area: 190, price: 810000, status: "sold", bedrooms: 4, bathrooms: 3, parkingSpaces: 2, description: "دوبلكس فاخر على الدورين الثاني والثالث مع مجلس منفصل." },
  { unitId: "P2-B101", unitNumber: "B101", projectId: 2, building: "B", floor: 1, unitType: "شقة", area: 135, price: 580000, status: "available", bedrooms: 3, bathrooms: 2, parkingSpaces: 1, description: "شقة من 3 غرف في المبنى B بموقع مميز." },
  { unitId: "P2-B102", unitNumber: "B102", projectId: 2, building: "B", floor: 1, unitType: "شقة", area: 170, price: 730000, status: "available", bedrooms: 3, bathrooms: 3, parkingSpaces: 2, description: "شقة واسعة بثلاث غرف ومطبخ مفتوح." },
  { unitId: "P2-B201", unitNumber: "B201", projectId: 2, building: "B", floor: 2, unitType: "شقة", area: 135, price: 595000, status: "reserved", bedrooms: 3, bathrooms: 2, parkingSpaces: 1, description: "شقة في الدور الثاني بالمبنى B بإضاءة طبيعية ممتازة." },
  { unitId: "P2-B202", unitNumber: "B202", projectId: 2, building: "B", floor: 2, unitType: "شقة", area: 150, price: 645000, status: "available", bedrooms: 3, bathrooms: 2, parkingSpaces: 1, description: "شقة مشمسة ذات تخطيط عملي ومساحات مريحة." },
  // عمارة الفيصل (id:3)
  { unitId: "P3-101", unitNumber: "101", projectId: 3, building: "الرئيسي", floor: 1, unitType: "شقة", area: 110, price: 380000, status: "available", bedrooms: 2, bathrooms: 2, parkingSpaces: 1, description: "شقة في الدور الأول بتشطيبات عصرية." },
  { unitId: "P3-102", unitNumber: "102", projectId: 3, building: "الرئيسي", floor: 1, unitType: "شقة", area: 140, price: 490000, status: "sold", bedrooms: 3, bathrooms: 2, parkingSpaces: 1, description: "شقة 3 غرف في الدور الأول تم بيعها." },
  { unitId: "P3-201", unitNumber: "201", projectId: 3, building: "الرئيسي", floor: 2, unitType: "شقة", area: 110, price: 390000, status: "available", bedrooms: 2, bathrooms: 2, parkingSpaces: 1, description: "شقة في الدور الثاني بإطلالة مفتوحة." },
  { unitId: "P3-202", unitNumber: "202", projectId: 3, building: "الرئيسي", floor: 2, unitType: "شقة", area: 155, price: 540000, status: "reserved", bedrooms: 3, bathrooms: 3, parkingSpaces: 2, description: "شقة 3 غرف فاخرة مع غرفة مستودع ملحقة." },
  { unitId: "P3-301", unitNumber: "301", projectId: 3, building: "الرئيسي", floor: 3, unitType: "شقة", area: 110, price: 400000, status: "available", bedrooms: 2, bathrooms: 2, parkingSpaces: 1, description: "شقة في الدور الثالث ذات إطلالة واسعة." },
  { unitId: "P3-302", unitNumber: "302", projectId: 3, building: "الرئيسي", floor: 3, unitType: "شقة", area: 140, price: 500000, status: "available", bedrooms: 3, bathrooms: 2, parkingSpaces: 1, description: "شقة 3 غرف بموقع مرتفع وإضاءة طبيعية ممتازة." },
  { unitId: "P3-401", unitNumber: "401", projectId: 3, building: "الرئيسي", floor: 4, unitType: "شقة", area: 115, price: 415000, status: "available", bedrooms: 2, bathrooms: 2, parkingSpaces: 1, description: "شقة بنورث في الدور الرابع." },
  { unitId: "P3-402", unitNumber: "402", projectId: 3, building: "الرئيسي", floor: 4, unitType: "بنتهاوس", area: 200, price: 720000, status: "reserved", bedrooms: 4, bathrooms: 3, parkingSpaces: 2, description: "بنتهاوس فسيح في الدور الرابع بتراس خاص." },
  // برج النخيل (id:7)
  { unitId: "P7-301", unitNumber: "301", projectId: 7, building: "الرئيسي", floor: 3, unitType: "استوديو", area: 65, price: 290000, status: "available", bedrooms: 1, bathrooms: 1, parkingSpaces: 1, description: "استوديو متكامل في الدور الثالث." },
  { unitId: "P7-302", unitNumber: "302", projectId: 7, building: "الرئيسي", floor: 3, unitType: "شقة", area: 100, price: 370000, status: "available", bedrooms: 2, bathrooms: 2, parkingSpaces: 1, description: "شقة من غرفتين بتصميم عصري." },
  { unitId: "P7-501", unitNumber: "501", projectId: 7, building: "الرئيسي", floor: 5, unitType: "شقة", area: 105, price: 385000, status: "reserved", bedrooms: 2, bathrooms: 2, parkingSpaces: 1, description: "شقة في الدور الخامس بإطلالة مدينية." },
  { unitId: "P7-502", unitNumber: "502", projectId: 7, building: "الرئيسي", floor: 5, unitType: "شقة", area: 130, price: 475000, status: "sold", bedrooms: 3, bathrooms: 2, parkingSpaces: 1, description: "شقة 3 غرف مباعة في الدور الخامس." },
  { unitId: "P7-701", unitNumber: "701", projectId: 7, building: "الرئيسي", floor: 7, unitType: "شقة", area: 110, price: 405000, status: "available", bedrooms: 2, bathrooms: 2, parkingSpaces: 1, description: "شقة في الدور السابع بإطلالة رائعة." },
  { unitId: "P7-702", unitNumber: "702", projectId: 7, building: "الرئيسي", floor: 7, unitType: "شقة", area: 145, price: 530000, status: "available", bedrooms: 3, bathrooms: 2, parkingSpaces: 2, description: "شقة 3 غرف واسعة في الدور السابع." },
  { unitId: "P7-1001", unitNumber: "1001", projectId: 7, building: "الرئيسي", floor: 10, unitType: "شقة", area: 120, price: 450000, status: "available", bedrooms: 2, bathrooms: 2, parkingSpaces: 1, description: "شقة في الدور العاشر بإطلالة بانورامية." },
  { unitId: "P7-1002", unitNumber: "1002", projectId: 7, building: "الرئيسي", floor: 10, unitType: "بنتهاوس", area: 220, price: 820000, status: "available", bedrooms: 4, bathrooms: 3, parkingSpaces: 2, description: "بنتهاوس في الدور العاشر بإطلالة 360 درجة." },
  // فيلا الياسمين (id:1, self-build, villa واحدة)
  { unitId: "P1-V1", unitNumber: "V1", projectId: 1, building: "الرئيسي", floor: 0, unitType: "فيلا", area: 480, price: 2800000, status: "available", bedrooms: 6, bathrooms: 5, parkingSpaces: 3, description: "فيلا سكنية عصرية بتصميم معماري راقٍ في حي النرجس، مع حديقة خاصة وملحق مستقل وتشطيبات فاخرة." },
  // فيلا الخبر الكلاسيكية (id:4, self-build, فيلا واحدة)
  { unitId: "P4-V1", unitNumber: "V1", projectId: 4, building: "الرئيسي", floor: 0, unitType: "فيلا", area: 520, price: 3200000, status: "available", bedrooms: 7, bathrooms: 5, parkingSpaces: 4, description: "فيلا كلاسيكية راقية بتشطيبات فاخرة وحديقة خاصة وموقف مغطى لأربع سيارات." },
  // مجمع الأندلس (id:6, ready-unit, فلل متعددة — مكتملة البيع)
  { unitId: "P6-V1", unitNumber: "V1", projectId: 6, building: "الرئيسي", floor: 0, unitType: "فيلا", area: 420, price: 1950000, status: "sold", bedrooms: 5, bathrooms: 4, parkingSpaces: 2, description: "فيلا عائلية راقية في مجمع الأندلس — تم البيع." },
  { unitId: "P6-V2", unitNumber: "V2", projectId: 6, building: "الرئيسي", floor: 0, unitType: "فيلا", area: 460, price: 2100000, status: "sold", bedrooms: 6, bathrooms: 4, parkingSpaces: 2, description: "فيلا بتصميم أندلسي مميز وحديقة داخلية — تم البيع." },
  { unitId: "P6-V3", unitNumber: "V3", projectId: 6, building: "الرئيسي", floor: 0, unitType: "فيلا", area: 490, price: 2250000, status: "sold", bedrooms: 6, bathrooms: 5, parkingSpaces: 3, description: "فيلا الزاوية بالمجمع ذات الفناء الواسع — تم البيع." },
  { unitId: "P6-V4", unitNumber: "V4", projectId: 6, building: "الرئيسي", floor: 0, unitType: "فيلا", area: 430, price: 1980000, status: "sold", bedrooms: 5, bathrooms: 4, parkingSpaces: 2, description: "فيلا عائلية مكتملة التجهيز — تم البيع." },
  // شقق تلال الخضراء (id:5, ready-unit, شقق متعددة)
  { unitId: "P5-101", unitNumber: "101", projectId: 5, building: "الرئيسي", floor: 1, unitType: "شقة", area: 130, price: 680000, status: "available", bedrooms: 3, bathrooms: 2, parkingSpaces: 1, description: "شقة بإطلالة على المساحات الخضراء المحيطة." },
  { unitId: "P5-102", unitNumber: "102", projectId: 5, building: "الرئيسي", floor: 1, unitType: "شقة", area: 100, price: 520000, status: "available", bedrooms: 2, bathrooms: 2, parkingSpaces: 1, description: "شقة مريحة في الدور الأول مع مطبخ مفتوح." },
  { unitId: "P5-201", unitNumber: "201", projectId: 5, building: "الرئيسي", floor: 2, unitType: "شقة", area: 130, price: 695000, status: "reserved", bedrooms: 3, bathrooms: 2, parkingSpaces: 1, description: "شقة في الدور الثاني بإطلالة مفتوحة على الجبال." },
  { unitId: "P5-202", unitNumber: "202", projectId: 5, building: "الرئيسي", floor: 2, unitType: "شقة", area: 155, price: 810000, status: "available", bedrooms: 3, bathrooms: 3, parkingSpaces: 2, description: "شقة فسيحة ثلاث غرف مع بلكونة بانورامية." },
  { unitId: "P5-301", unitNumber: "301", projectId: 5, building: "الرئيسي", floor: 3, unitType: "شقة", area: 100, price: 535000, status: "available", bedrooms: 2, bathrooms: 2, parkingSpaces: 1, description: "شقة في الدور الثالث بمناخ معتدل وهواء نقي." },
  { unitId: "P5-302", unitNumber: "302", projectId: 5, building: "الرئيسي", floor: 3, unitType: "دوبلكس", area: 200, price: 1050000, status: "sold", bedrooms: 4, bathrooms: 3, parkingSpaces: 2, description: "دوبلكس فاخر يضم الدور الثالث والرابع." },
  // فيلا المرجان (id:8, self-build, فيلا واحدة)
  { unitId: "P8-V1", unitNumber: "V1", projectId: 8, building: "الرئيسي", floor: 0, unitType: "فيلا", area: 550, price: 3800000, status: "available", bedrooms: 7, bathrooms: 6, parkingSpaces: 4, description: "فيلا فاخرة تجمع الخصوصية والهدوء في أجواء الطائف المعتدلة مع حديقة داخلية واسعة." },
];

function ProjectsCarousel({ light = false }: { light?: boolean }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const total = PROJECTS.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [isPaused, next]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
  };

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };
  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = startX.current - e.clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
  };

  // How many cards visible depends on viewport — we derive this from CSS
  // We use a translate approach: each card is 20% wide (5 visible on desktop)
  // For RTL: moving "next" means sliding right (positive translate in RTL = visual left)
  const cardWidthPct = 100 / 5; // 20% per card on desktop (overridden via CSS vars)
  const translateX = current * cardWidthPct;

  const counter = `${String(current + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  const lc = light ? {
    section: "bg-white",
    heading: "text-[#0B1B3A]",
    sub: "text-[#4B5974]",
    counter: "text-[#4B5974]",
    btn: "bg-white border-gray-200 text-[#0B1B3A] hover:border-[#D4A843] hover:text-[#D4A843]",
    card: "bg-white border-gray-200",
    cardHead: "text-[#0B1B3A]",
    cardMuted: "text-[#4B5974]",
    meta: "bg-gray-100",
    metaLabel: "text-[#8899AA]",
    metaVal: "text-[#0B1B3A]",
    dot: "bg-gray-300 hover:bg-gray-400",
  } : {
    section: "bg-background",
    heading: "text-foreground",
    sub: "text-muted-foreground",
    counter: "text-muted-foreground",
    btn: "bg-card border-border text-foreground hover:border-primary hover:text-primary",
    card: "bg-card border-border",
    cardHead: "text-foreground",
    cardMuted: "text-muted-foreground",
    meta: "bg-accent/40",
    metaLabel: "text-muted-foreground",
    metaVal: "text-foreground",
    dot: "bg-border hover:bg-muted-foreground",
  };

  return (
    <section className={`${lc.section} py-10 md:py-12 overflow-hidden`}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10 flex items-end justify-between gap-4">
        <div>
          <GoldLine />
          <p className="text-[#D4A843] text-xs tracking-widest uppercase mb-3">معرض المشاريع</p>
          <h2 className={`text-3xl md:text-4xl leading-snug ${lc.heading}`} style={displayFont}>
            مشاريعنا
          </h2>
          <p className={`text-sm mt-3 max-w-md leading-relaxed ${lc.sub}`}>
            نستعرض نماذج من مشاريعنا العقارية التي نفخر بها في مختلف مناطق المملكة.
          </p>
        </div>
        {/* Nav controls */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className={`text-xs tracking-widest ${lc.counter}`} dir="ltr">{counter}</span>
          <button onClick={prev} aria-label="المشروع السابق" className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 shadow-sm ${lc.btn}`}>
            <ChevronRight size={18} />
          </button>
          <button onClick={next} aria-label="المشروع التالي" className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 shadow-sm ${lc.btn}`}>
            <ChevronLeft size={18} />
          </button>
        </div>
      </div>

      {/* Carousel track */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); isDragging.current = false; }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex"
          style={{
            transform: `translateX(${translateX}%)`,
            transition: "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            willChange: "transform",
          }}
        >
          {[...PROJECTS, ...PROJECTS].map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              className="flex-shrink-0 px-2"
              style={{ width: "clamp(280px, 20%, 340px)" }}
              aria-hidden={idx >= total}
            >
              <div className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-default" style={{ aspectRatio: "4/3" }}>
                <img src={project.thumbnail} alt={project.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" draggable={false} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/15" />
                {/* Top badges */}
                <div className="absolute top-3 inset-x-3 flex items-start justify-between">
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#0B1B3A]/60 border border-[#D4A843]/50 text-[#D4A843] backdrop-blur-sm">
                    {PROP_LABEL[project.propertyType]}
                  </span>
                  <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border backdrop-blur-sm ${STATUS_CLR[project.status]}`}>
                    {STATUS_LABEL[project.status]}
                  </span>
                </div>
                {/* Bottom content */}
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <h3 className="text-base font-bold text-white mb-1 leading-snug" style={displayFont}>{project.name}</h3>
                  <div className="flex items-center gap-1 text-white/60 text-[11px] mb-3">
                    <MapPin size={10} className="text-[#D4A843] flex-shrink-0" />
                    {project.city} · {project.region}
                  </div>
                  <div className="border-t border-white/10 pt-2.5 flex items-center justify-between">
                    <span className="text-[#D4A843] text-[11px] font-semibold">عرض التفاصيل ←</span>
                    {project.startingPrice && (
                      <span className="text-white/45 text-[10px]">
                        يبدأ من <span className="text-[#D4A843] font-bold">{(project.startingPrice / 1000).toLocaleString("ar-SA")}k</span> ر.س
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-6">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`الانتقال إلى المشروع ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-[#D4A843]" : `w-1.5 ${lc.dot}`}`}
          />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SPA PROJECT CARD
// ─────────────────────────────────────────────────────────────────────────────
function SpaProjectCard({
  project,
  onSelect,
  light = false,
}: {
  project: Project;
  onSelect: (p: Project) => void;
  light?: boolean;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
      style={{ aspectRatio: "4/3" }}
      onClick={() => onSelect(project)}
    >
      {/* Full-bleed image */}
      <img
        src={project.thumbnail}
        alt={project.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/15" />

      {/* Top badges */}
      <div className="absolute top-4 inset-x-4 flex items-start justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full bg-[#0B1B3A]/60 border border-[#D4A843]/50 text-[#D4A843] backdrop-blur-sm">
          {PROP_LABEL[project.propertyType]}
        </span>
        <span className={`text-[10px] font-medium px-2.5 py-1.5 rounded-full border backdrop-blur-sm ${STATUS_CLR[project.status]}`}>
          {STATUS_LABEL[project.status]}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 inset-x-0 p-4">
        <h3 className="text-xl font-bold text-white mb-1.5 leading-snug" style={displayFont}>
          {project.name}
        </h3>
        <div className="flex items-center gap-1.5 text-white/60 text-xs mb-4">
          <MapPin size={11} className="text-[#D4A843] flex-shrink-0" />
          {project.city} · {project.region}
          {project.totalUnits && <><span className="text-white/30 mx-0.5">·</span>{project.totalUnits} وحدة</>}
        </div>
        <div className="flex items-center justify-between border-t border-white/10 pt-3">
          <span className="text-[#D4A843] text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
            عرض التفاصيل ←
          </span>
          {project.startingPrice && (
            <span className="text-white/50 text-[10px]">
              يبدأ من{" "}
              <span className="text-[#D4A843] font-bold text-xs">
                {(project.startingPrice / 1000).toLocaleString("ar-SA")}k
              </span>{" "}
              ر.س
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT DETAIL VIEW
// ─────────────────────────────────────────────────────────────────────────────
function ProjectDetailView({
  project,
  onBack,
  onSelectProject,
  goTo,
}: {
  project: Project;
  onBack: () => void;
  onSelectProject: (p: Project) => void;
  goTo: (p: Page) => void;
}) {
  const [interestOpen, setInterestOpen] = useState(false);
  const [interestUnit, setInterestUnit] = useState<Unit | null>(null);
  const [detailUnit, setDetailUnit] = useState<Unit | null>(null);
  const [activeTab, setActiveTab] = useState("about");
  const [tabFading, setTabFading] = useState(false);

  const projectUnits = UNITS.filter((u) => u.projectId === project.id);
  const openInterest = (u?: Unit) => { setInterestUnit(u ?? null); setInterestOpen(true); };
  const related = PROJECTS.filter(
    (p) => p.id !== project.id &&
      (p.city === project.city || p.propertyType === project.propertyType || p.productType === project.productType)
  ).slice(0, 3);

  const switchTab = (id: string) => {
    if (id === activeTab) return;
    setTabFading(true);
    setTimeout(() => { setActiveTab(id); setTabFading(false); }, 160);
  };

  const tabs = [
    { id: "about", label: "عن المشروع" },
    { id: "features", label: "مزايا المشروع" },
    ...(projectUnits.length > 0 ? [{ id: "units", label: "الوحدات المتاحة" }] : []),
    { id: "location", label: "موقع المشروع" },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-background">
        <img src={project.heroImage} alt={project.name} className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1B3A]/80 via-[#0B1B3A]/40 to-[#0B1B3A]/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/45 text-xs mb-8">
            <button onClick={() => goTo("home")} className="hover:text-white transition-colors">الرئيسية</button>
            <ChevronLeft size={11} className="opacity-40" />
            <button onClick={onBack} className="hover:text-white transition-colors">مشاريعنا</button>
            <ChevronLeft size={11} className="opacity-40" />
            <span className="text-white/80">{project.name}</span>
          </nav>
          <p className="text-primary text-xs tracking-widest uppercase mb-4">مشروع أسس</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6" style={displayFont}>{project.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm mb-4">
            <span className="flex items-center gap-1.5"><MapPin size={13} className="text-[#D4A843]" />{project.city} · {project.region}</span>
            <span className="text-white/30">·</span>
            <span>{PROP_LABEL[project.propertyType]}</span>
            <span className="text-white/30">·</span>
            <span>{PROD_LABEL[project.productType]}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className={`inline-block text-xs px-3 py-1 border ${STATUS_CLR[project.status]}`}>{STATUS_LABEL[project.status]}</span>
            <button
              onClick={() => goTo("products")}
              className="text-[#D4A843] text-xs border-b border-[#D4A843]/30 hover:border-[#D4A843] pb-0.5 transition-colors"
            >
              عرض منتج {PROD_LABEL[project.productType]} ←
            </button>
          </div>
          <div className="flex flex-wrap gap-3 mb-8">
            <button onClick={() => openInterest()}
              className="px-6 py-3 bg-[#D4A843] text-[#0B1B3A] text-sm font-semibold rounded-md hover:bg-[#D4A843]/90 transition-all duration-200">
              طلب اهتمام بالمشروع ←
            </button>
            <button onClick={() => goTo("contact")}
              className="px-6 py-3 border border-white/15 text-white/70 text-sm rounded-md hover:text-white hover:border-white/30 transition-all duration-200">
              تواصل معنا
            </button>
          </div>
          {(project.startingPrice || project.landArea || project.buildingArea) && (
            <div className="flex flex-wrap gap-6 border-t border-white/10 pt-6 mt-2">
              {project.startingPrice && (
                <div><p className="text-white/45 text-xs mb-1">الأسعار تبدأ من</p><p className="text-white text-base font-semibold">{project.startingPrice.toLocaleString("ar-SA")} ريال</p></div>
              )}
              {project.landArea && (
                <div><p className="text-white/45 text-xs mb-1">مساحة الأرض</p><p className="text-white text-base font-semibold">{project.landArea.toLocaleString("ar-SA")} م²</p></div>
              )}
              {project.buildingArea && (
                <div><p className="text-white/45 text-xs mb-1">مساحة البناء</p><p className="text-white text-base font-semibold">{project.buildingArea.toLocaleString("ar-SA")} م²</p></div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Single Tabbed Content Container ── */}
      <section className="py-16 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            {/* Pill Tab Navigation — inside the container */}
            <div className="px-6 pt-4 border-b border-gray-100">
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-px">
                <div className="flex items-center gap-1 bg-[#F7F4EF] rounded-full p-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => switchTab(tab.id)}
                      className={`whitespace-nowrap px-4 py-2 text-sm rounded-full font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-white text-[#D4A843] shadow-sm border border-[#D4A843]/40"
                          : "text-[#8899AA] hover:text-[#0B1B3A]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="flex-1" />
                <button onClick={() => openInterest()}
                  className="hidden sm:flex flex-shrink-0 items-center gap-1.5 mb-1 px-4 py-2 bg-[#D4A843] text-[#0B1B3A] text-xs font-semibold rounded-full hover:bg-[#D4A843]/90 transition-colors">
                  طلب اهتمام ←
                </button>
              </div>
            </div>

            {/* Tab content — fades between views */}
            <div
              style={{ opacity: tabFading ? 0 : 1, transition: "opacity 160ms ease" }}
            >

              {/* Tab: عن المشروع */}
              {activeTab === "about" && (
                <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                  <div className="lg:col-span-3">
                    <GoldLine />
                    <h2 className="text-2xl md:text-3xl mb-4 text-[#0B1B3A]" style={displayFont}>عن المشروع</h2>
                    <div className="space-y-4 text-[#4B5974] leading-[2] text-base">
                      {project.description.map((para, i) => <p key={i}>{para}</p>)}
                    </div>
                  </div>
                  <div className="lg:col-span-2 space-y-0">
                    {[
                      { label: "الموقع", value: `${project.city} · ${project.region}` },
                      { label: "نوع المنشأ", value: PROP_LABEL[project.propertyType] },
                      { label: "المنتج", value: PROD_LABEL[project.productType] },
                      { label: "الحالة", value: STATUS_LABEL[project.status] },
                      ...(project.numberOfBuildings ? [{ label: "عدد المباني", value: `${project.numberOfBuildings} مباني` }] : []),
                      ...(project.totalUnits ? [{ label: "إجمالي الوحدات", value: `${project.totalUnits} وحدة` }] : []),
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between border-b border-gray-100 py-3">
                        <span className="text-[#8899AA] text-sm">{row.label}</span>
                        <span className="text-[#0B1B3A] text-sm font-medium">{row.value}</span>
                      </div>
                    ))}
                    {(project.numberOfBuildings || project.totalUnits) && (
                      <div className="grid grid-cols-2 gap-3 pt-4">
                        {project.numberOfBuildings && (
                          <div className="bg-[#F7F4EF] border border-gray-100 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-[#0B1B3A]" style={displayFont}>{project.numberOfBuildings}</div>
                            <div className="text-xs text-[#8899AA] mt-1">عدد المباني</div>
                          </div>
                        )}
                        {project.totalUnits && (
                          <div className="bg-[#F7F4EF] border border-gray-100 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-[#0B1B3A]" style={displayFont}>{project.totalUnits}</div>
                            <div className="text-xs text-[#8899AA] mt-1">إجمالي الوحدات</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab: مزايا المشروع */}
              {activeTab === "features" && (
                <div className="p-6">
                  <GoldLine />
                  <h2 className="text-2xl md:text-3xl mb-4 text-[#0B1B3A]" style={displayFont}>مزايا المشروع</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {project.features.map((feat, i) => (
                      <div key={i} className="bg-[#F7F4EF] rounded-xl p-6 hover:bg-[#EEF1F6] transition-colors">
                        <div className="w-6 h-px bg-[#D4A843] mb-4" />
                        <h3 className="text-[#0B1B3A] text-sm font-semibold mb-2" style={displayFont}>{feat.title}</h3>
                        <p className="text-[#4B5974] text-sm leading-relaxed">{feat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: الوحدات المتاحة — unchanged components */}
              {activeTab === "units" && projectUnits.length > 0 && (
                <div>
                  {project.productType === "off-plan" && (
                    <OffPlanUnits project={project} units={projectUnits}
                      onDetail={(u) => setDetailUnit(u)} onInterest={(u) => openInterest(u)} />
                  )}
                  {project.productType !== "off-plan" && (
                    <DynamicInventory project={project} units={projectUnits}
                      onDetail={(u) => setDetailUnit(u)} onInterest={(u) => openInterest(u)} />
                  )}
                </div>
              )}

              {/* Tab: موقع المشروع */}
              {activeTab === "location" && (
                <div className="p-6">
                  <GoldLine />
                  <h2 className="text-2xl md:text-3xl mb-2 text-[#0B1B3A]" style={displayFont}>موقع المشروع</h2>
                  <p className="text-[#8899AA] text-sm mb-6">{project.city} · {project.region}</p>
                  <div className="relative overflow-hidden rounded-xl border border-gray-100" style={{ height: 400 }}>
                    <iframe
                      title={`خريطة ${project.name}`}
                      src={`https://maps.google.com/maps?q=${project.lat},${project.lng}&z=15&output=embed`}
                      width="100%" height="100%"
                      style={{ border: 0 }}
                      loading="lazy" allowFullScreen
                    />
                  </div>
                  <div className="mt-4">
                    <a href={project.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#D4A843] text-sm border-b border-[#D4A843]/30 hover:border-[#D4A843] pb-0.5 transition-colors">
                      عرض الاتجاهات ←
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* ── مشاريع قد تهمك ── */}
      {related.length > 0 && (
        <section className="py-10 md:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between gap-4 mb-6">
              <SectionHeadLight tag="مشاريع أخرى" title="مشاريع قد تهمك" />
              <button
                onClick={onBack}
                className="flex-shrink-0 text-[#D4A843] text-sm border-b border-[#D4A843]/25 hover:border-[#D4A843] pb-0.5 transition-colors mb-6"
              >
                عرض جميع المشاريع ←
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((rel) => (
                <SpaProjectCard key={rel.id} project={rel} onSelect={(p) => { onSelectProject(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} light />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-10 md:py-12 bg-background">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-8 h-px bg-primary mx-auto mb-4" />
          <h2 className="text-3xl text-foreground mb-4" style={displayFont}>مهتم بهذا المشروع؟</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            تواصل مع فريق أسس لمعرفة المزيد عن المشروع والخيارات المتاحة.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => openInterest()}
              className="px-10 py-3 bg-[#D4A843] text-[#0B1B3A] text-sm font-semibold rounded-md hover:bg-[#D4A843]/90 transition-all">
              طلب اهتمام بالمشروع ←
            </button>
            <button onClick={() => goTo("contact")}
              className="px-10 py-3 border border-primary/40 text-primary text-sm rounded-md hover:border-primary transition-all">
              تواصل معنا
            </button>
          </div>
        </div>
      </section>

      {/* ── Modals ── */}
      <InterestModal open={interestOpen} onClose={() => setInterestOpen(false)} project={project} defaultUnit={interestUnit} />
      <UnitDetailModal unit={detailUnit} project={project} open={!!detailUnit} onClose={() => setDetailUnit(null)} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS PAGE
// ─────────────────────────────────────────────────────────────────────────────
function ProjectsPage({
  goTo,
  initialProject = null,
  initialProductFilter = null,
}: {
  goTo: (p: Page) => void;
  initialProject?: Project | null;
  initialProductFilter?: Project["productType"] | null;
}) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(initialProject);
  // Pending states — reflect UI selections before Search is pressed
  const [pendingProp, setPendingProp] = useState<Project["propertyType"] | "all">("all");
  const [pendingProd, setPendingProd] = useState<Project["productType"] | "all">(initialProductFilter ?? "all");
  const [pendingStatus, setPendingStatus] = useState<Project["status"] | "all">("all");
  const [pendingCity, setPendingCity] = useState<string>("all");
  // Applied states — used to actually filter the grid
  const [filterProp, setFilterProp] = useState<Project["propertyType"] | "all">("all");
  const [filterProd, setFilterProd] = useState<Project["productType"] | "all">(initialProductFilter ?? "all");
  const [filterStatus, setFilterStatus] = useState<Project["status"] | "all">("all");
  const [filterCity, setFilterCity] = useState<string>("all");
  const [openFilter, setOpenFilter] = useState<"prop" | "prod" | "status" | "city" | null>(null);
  const [activeMapProject, setActiveMapProject] = useState<Project | null>(null);

  const cities = Array.from(new Set(PROJECTS.map((p) => p.city)));

  const filtered = PROJECTS.filter((p) => {
    if (filterProp !== "all" && p.propertyType !== filterProp) return false;
    if (filterProd !== "all" && p.productType !== filterProd) return false;
    if (filterStatus !== "all" && p.status !== filterStatus) return false;
    if (filterCity !== "all" && p.city !== filterCity) return false;
    return true;
  });

  const featured = PROJECTS.find((p) => p.featured) ?? PROJECTS[0];

  const applyFilters = () => {
    setFilterProp(pendingProp);
    setFilterProd(pendingProd);
    setFilterStatus(pendingStatus);
    setFilterCity(pendingCity);
    setOpenFilter(null);
  };

  const resetFilters = () => {
    setPendingProp("all"); setPendingProd("all"); setPendingStatus("all"); setPendingCity("all");
    setFilterProp("all"); setFilterProd("all"); setFilterStatus("all"); setFilterCity("all");
  };

  const hasFilters = filterProp !== "all" || filterProd !== "all" || filterStatus !== "all" || filterCity !== "all";
  const hasPending = pendingProp !== "all" || pendingProd !== "all" || pendingStatus !== "all" || pendingCity !== "all";

  if (selectedProject) {
    return (
      <ProjectDetailView
        project={selectedProject}
        onBack={() => { setSelectedProject(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        onSelectProject={(p) => { setSelectedProject(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        goTo={goTo}
      />
    );
  }

  const propFilters: { val: Project["propertyType"] | "all"; label: string }[] = [
    { val: "all", label: "الكل" },
    { val: "villa", label: "فلل" },
    { val: "apartment", label: "شقق" },
    { val: "building", label: "عمائر" },
    { val: "other", label: "مشاريع أخرى" },
  ];
  const prodFilters: { val: Project["productType"] | "all"; label: string }[] = [
    { val: "all", label: "الكل" },
    { val: "self-build", label: "البناء الذاتي" },
    { val: "off-plan", label: "البيع على الخارطة" },
    { val: "ready-unit", label: "وحدات جاهزة" },
  ];
  const statusFilters: { val: Project["status"] | "all"; label: string }[] = [
    { val: "all", label: "الكل" },
    { val: "available", label: "متاح" },
    { val: "under-construction", label: "قيد الإنشاء" },
    { val: "sold", label: "مباع" },
  ];

  const filterBtnBase = "px-4 py-2 text-xs border transition-all duration-200 whitespace-nowrap";
  const filterBtnActive = "border-[#D4A843] bg-[#D4A843]/10 text-[#D4A843]";
  const filterBtnIdle = "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground";

  return (
    <>
      {/* Hero — dark navy */}
      <PageHero
        tag="مشاريعنا"
        title="مشاريعنا"
        sub="مشاريع نطوّرها بعناية، لتصنع قيمة تتجاوز لحظة البناء."
        img={featured.heroImage}
        alt="مشاريع أسس"
        onHome={() => goTo("home")}
      />

      {/* Filters + Grid — white */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-6">
            <SectionHeadLight tag="المشاريع" title="جميع المشاريع" sub={`${filtered.length} مشروع`} />
          </div>

          {/* Filter bar — full-width dark pill */}
          <div className="relative mb-8">
            {/* Backdrop to close open dropdowns */}
            {openFilter && (
              <div className="fixed inset-0 z-40" onClick={() => setOpenFilter(null)} />
            )}

            <div className="flex items-stretch bg-[#0B1B3A] rounded-2xl shadow-xl overflow-visible">

              {/* المدينة */}
              <div className="relative flex-1 min-w-0">
                <button
                  onClick={() => setOpenFilter(openFilter === "city" ? null : "city")}
                  className="w-full h-full flex items-center justify-between gap-2 px-5 py-4 text-sm transition-colors hover:bg-white/5 rounded-r-2xl"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`truncate font-medium ${pendingCity !== "all" ? "text-[#D4A843]" : "text-white/75"}`}>
                      {pendingCity === "all" ? "المدينة" : pendingCity}
                    </span>
                    <MapPin size={15} className="text-[#D4A843] flex-shrink-0" />
                  </div>
                  <ChevronDown size={13} className={`text-white/30 flex-shrink-0 transition-transform duration-200 ${openFilter === "city" ? "rotate-180" : ""}`} />
                </button>
                {openFilter === "city" && (
                  <div className="absolute top-[calc(100%+8px)] right-0 z-50 bg-[#0B2050] border border-white/10 rounded-xl shadow-2xl py-2 min-w-[160px] max-h-56 overflow-y-auto">
                    {[{ val: "all", label: "جميع المدن" }, ...cities.map(c => ({ val: c, label: c }))].map(({ val, label }) => (
                      <button key={val}
                        onClick={() => { setPendingCity(val); setOpenFilter(null); }}
                        className={`flex items-center justify-between w-full text-right px-4 py-2.5 text-sm transition-colors ${pendingCity === val ? "text-[#D4A843]" : "text-white/65 hover:text-white hover:bg-white/5"}`}
                      >
                        {label}
                        {pendingCity === val && <div className="w-1.5 h-1.5 rounded-full bg-[#D4A843] flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-px bg-white/10 my-3 flex-shrink-0" />

              {/* نوع المنشأ */}
              <div className="relative flex-1 min-w-0">
                <button
                  onClick={() => setOpenFilter(openFilter === "prop" ? null : "prop")}
                  className="w-full h-full flex items-center justify-between gap-2 px-5 py-4 text-sm transition-colors hover:bg-white/5"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`truncate font-medium ${pendingProp !== "all" ? "text-[#D4A843]" : "text-white/75"}`}>
                      {pendingProp === "all" ? "نوع المنشأ" : propFilters.find(f => f.val === pendingProp)?.label}
                    </span>
                    <Building2 size={15} className="text-[#D4A843] flex-shrink-0" />
                  </div>
                  <ChevronDown size={13} className={`text-white/30 flex-shrink-0 transition-transform duration-200 ${openFilter === "prop" ? "rotate-180" : ""}`} />
                </button>
                {openFilter === "prop" && (
                  <div className="absolute top-[calc(100%+8px)] right-0 z-50 bg-[#0B2050] border border-white/10 rounded-xl shadow-2xl py-2 min-w-[150px]">
                    {propFilters.map(({ val, label }) => (
                      <button key={val}
                        onClick={() => { setPendingProp(val); setOpenFilter(null); }}
                        className={`flex items-center justify-between w-full text-right px-4 py-2.5 text-sm transition-colors ${pendingProp === val ? "text-[#D4A843]" : "text-white/65 hover:text-white hover:bg-white/5"}`}
                      >
                        {label}
                        {pendingProp === val && <div className="w-1.5 h-1.5 rounded-full bg-[#D4A843] flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-px bg-white/10 my-3 flex-shrink-0" />

              {/* المنتج */}
              <div className="relative flex-1 min-w-0">
                <button
                  onClick={() => setOpenFilter(openFilter === "prod" ? null : "prod")}
                  className="w-full h-full flex items-center justify-between gap-2 px-5 py-4 text-sm transition-colors hover:bg-white/5"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`truncate font-medium ${pendingProd !== "all" ? "text-[#D4A843]" : "text-white/75"}`}>
                      {pendingProd === "all" ? "نوع المنتج" : prodFilters.find(f => f.val === pendingProd)?.label}
                    </span>
                    <Layers size={15} className="text-[#D4A843] flex-shrink-0" />
                  </div>
                  <ChevronDown size={13} className={`text-white/30 flex-shrink-0 transition-transform duration-200 ${openFilter === "prod" ? "rotate-180" : ""}`} />
                </button>
                {openFilter === "prod" && (
                  <div className="absolute top-[calc(100%+8px)] right-0 z-50 bg-[#0B2050] border border-white/10 rounded-xl shadow-2xl py-2 min-w-[180px]">
                    {prodFilters.map(({ val, label }) => (
                      <button key={val}
                        onClick={() => { setPendingProd(val); setOpenFilter(null); }}
                        className={`flex items-center justify-between w-full text-right px-4 py-2.5 text-sm transition-colors ${pendingProd === val ? "text-[#D4A843]" : "text-white/65 hover:text-white hover:bg-white/5"}`}
                      >
                        {label}
                        {pendingProd === val && <div className="w-1.5 h-1.5 rounded-full bg-[#D4A843] flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-px bg-white/10 my-3 flex-shrink-0" />

              {/* الحالة */}
              <div className="relative flex-1 min-w-0">
                <button
                  onClick={() => setOpenFilter(openFilter === "status" ? null : "status")}
                  className="w-full h-full flex items-center justify-between gap-2 px-5 py-4 text-sm transition-colors hover:bg-white/5"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`truncate font-medium ${pendingStatus !== "all" ? "text-[#D4A843]" : "text-white/75"}`}>
                      {pendingStatus === "all" ? "الحالة" : statusFilters.find(f => f.val === pendingStatus)?.label}
                    </span>
                    <CheckCircle size={15} className="text-[#D4A843] flex-shrink-0" />
                  </div>
                  <ChevronDown size={13} className={`text-white/30 flex-shrink-0 transition-transform duration-200 ${openFilter === "status" ? "rotate-180" : ""}`} />
                </button>
                {openFilter === "status" && (
                  <div className="absolute top-[calc(100%+8px)] right-0 z-50 bg-[#0B2050] border border-white/10 rounded-xl shadow-2xl py-2 min-w-[140px]">
                    {statusFilters.map(({ val, label }) => (
                      <button key={val}
                        onClick={() => { setPendingStatus(val); setOpenFilter(null); }}
                        className={`flex items-center justify-between w-full text-right px-4 py-2.5 text-sm transition-colors ${pendingStatus === val ? "text-[#D4A843]" : "text-white/65 hover:text-white hover:bg-white/5"}`}
                      >
                        {label}
                        {pendingStatus === val && <div className="w-1.5 h-1.5 rounded-full bg-[#D4A843] flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search button */}
              <button
                onClick={applyFilters}
                className="flex items-center gap-2 px-7 py-4 bg-[#D4A843] text-[#0B1B3A] font-bold text-sm rounded-l-2xl hover:bg-[#c49a38] active:bg-[#b38c30] transition-colors flex-shrink-0 whitespace-nowrap"
              >
                <Search size={15} />
                ابحث
              </button>
            </div>

            {/* Reset link */}
            {hasFilters && (
              <div className="flex justify-end mt-3">
                <button onClick={resetFilters} className="flex items-center gap-1.5 text-xs text-[#8899AA] hover:text-[#0B1B3A] transition-colors">
                  <RefreshCw size={11} /> إعادة ضبط الفلاتر
                </button>
              </div>
            )}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#4B5974]">
              <p className="text-lg mb-2">لا توجد مشاريع تطابق الفلاتر المحددة</p>
              <button onClick={resetFilters} className="text-[#D4A843] text-sm hover:underline">إعادة ضبط الفلاتر</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project) => (
                <SpaProjectCard
                  key={project.id}
                  project={project}
                  onSelect={(p) => { setSelectedProject(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  light
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Interactive Map */}
      <ProjectMapSection goToProject={(p) => { setSelectedProject(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} />

    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INTISHAR SECTION — انتشارنا
// ─────────────────────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

function StatCounter({ value, label, prefix = "+", delay = 0 }: { value: number; label: string; prefix?: string; delay?: number }) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setActive(true), delay); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  const count = useCountUp(value, 1800, active);
  const formatted = value >= 1000 ? count.toLocaleString("ar-SA") : count.toString();
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#D4A843] mb-2 tabular-nums" style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontVariantNumeric: "tabular-nums" }} dir="ltr">
        {prefix}{value >= 1000 ? count.toLocaleString("en-US") : count.toString()}
      </div>
      <div className="text-white/55 text-sm tracking-wide">{label}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT MAP SECTION
// ─────────────────────────────────────────────────────────────────────────────

const MAP_PIN_COLOR: Record<Project["status"], string> = {
  available: "#16a34a",
  "under-construction": "#D4A843",
  sold: "#dc2626",
};

const MAP_LEGEND_ITEMS: { status: Project["status"]; label: string }[] = [
  { status: "available", label: "متاح" },
  { status: "under-construction", label: "قيد الإنشاء" },
  { status: "sold", label: "مباع" },
];

function makePinIcon(color: string, isActive = false): L.DivIcon {
  const size = isActive ? 36 : 28;
  const r = isActive ? 11 : 8;
  const border = isActive ? 3 : 2;
  const shadow = isActive ? "drop-shadow(0 4px 8px rgba(0,0,0,0.45))" : "drop-shadow(0 2px 4px rgba(0,0,0,0.30))";
  const svg = `<svg width="${size}" height="${Math.round(size * 1.25)}" viewBox="0 0 ${size} ${Math.round(size * 1.25)}" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter:${shadow}">
    <path d="M${size / 2} 0C${(size * 0.2188).toFixed(1)} 0 0 ${(size * 0.2188).toFixed(1)} 0 ${size / 2}C0 ${(size * 0.8125).toFixed(1)} ${size / 2} ${Math.round(size * 1.25)} ${size / 2} ${Math.round(size * 1.25)}S${size} ${(size * 0.8125).toFixed(1)} ${size} ${size / 2}C${size} ${(size * 0.2188).toFixed(1)} ${(size * 0.7812).toFixed(1)} 0 ${size / 2} 0Z" fill="${color}"/>
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="white" opacity="0.95"/>
    ${isActive ? `<circle cx="${size / 2}" cy="${size / 2}" r="${r - border}" fill="${color}"/>` : ""}
  </svg>`;
  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [size, Math.round(size * 1.25)],
    iconAnchor: [size / 2, Math.round(size * 1.25)],
    popupAnchor: [0, -Math.round(size * 1.25)],
  });
}

function ProjectMapSection({ goToProject }: { goToProject: (p: Project) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<number, L.Marker>>(new Map());
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [23.8859, 45.0792],
      zoom: 5,
      zoomControl: false,
      attributionControl: false,
    });

    // Premium dark/light map tile — CartoDB Positron
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: "bottomleft" }).addTo(map);

    L.control.attribution({ position: "bottomright", prefix: "" })
      .addAttribution('© <a href="https://carto.com">CARTO</a>')
      .addTo(map);

    // Add markers for every project
    PROJECTS.forEach((project) => {
      const color = MAP_PIN_COLOR[project.status];
      const marker = L.marker([project.lat, project.lng], {
        icon: makePinIcon(color, false),
        title: project.name,
        riseOnHover: true,
      }).addTo(map);

      marker.on("click", () => {
        setSelected((prev) => {
          // Reset previous active marker
          if (prev) {
            const prevMarker = markersRef.current.get(prev.id);
            if (prevMarker) prevMarker.setIcon(makePinIcon(MAP_PIN_COLOR[prev.status], false));
          }
          return null;
        });
        setTimeout(() => {
          setSelected(project);
          marker.setIcon(makePinIcon(color, true));
        }, 0);
      });

      markersRef.current.set(project.id, marker);
    });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
  }, []);

  // When selected changes, pan map
  useEffect(() => {
    if (!mapRef.current || !selected) return;
    mapRef.current.flyTo([selected.lat, selected.lng], 10, { duration: 0.8 });
  }, [selected]);

  const handleClose = () => {
    if (selected) {
      const m = markersRef.current.get(selected.id);
      if (m) m.setIcon(makePinIcon(MAP_PIN_COLOR[selected.status], false));
    }
    setSelected(null);
  };

  return (
    <section className="py-10 md:py-12 bg-[#F7F4EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#D4A843]" />
            <span className="text-[#D4A843] text-xs tracking-[0.18em] font-medium uppercase">مواقعنا</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-[#0B1B3A] mb-3 leading-tight" style={displayFont}>
            استكشف مشاريعنا على الخريطة
          </h2>
          <p className="text-[#6B7A8D] text-sm leading-relaxed max-w-xl">
            اكتشف مواقع جميع مشاريعنا المتميزة في المملكة العربية السعودية
          </p>
        </div>

        {/* Map + card wrapper */}
        <div className="relative isolate rounded-2xl overflow-hidden shadow-lg border border-[#D4A843]/15"
          style={{ height: "clamp(380px, 60vh, 640px)" }}>

          {/* Leaflet map container */}
          <div ref={containerRef} className="w-full h-full relative z-0" />

          {/* Legend — bottom-right overlay */}
          <div className="absolute bottom-4 right-4 z-[400] bg-white/95 backdrop-blur-sm rounded-xl shadow-md px-4 py-3 border border-gray-100">
            <p className="text-[10px] font-semibold text-[#0B1B3A] mb-2 tracking-wide">حالة المشاريع</p>
            <div className="space-y-1.5">
              {MAP_LEGEND_ITEMS.map(({ status, label }) => (
                <div key={status} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0 border-2 border-white shadow-sm"
                    style={{ background: MAP_PIN_COLOR[status] }}
                  />
                  <span className="text-[11px] text-[#4B5974]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project count badge — top-right (LTR physical) */}
          <div className="absolute top-4 left-4 z-[400] bg-[#0B1B3A]/90 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2">
            <MapPin size={13} className="text-[#D4A843]" />
            <span className="text-white text-xs font-medium">{PROJECTS.length} مشروع</span>
          </div>

          {/* Project preview card — desktop: left floating panel; mobile: bottom sheet */}
          {selected && (
            <div
              className="absolute z-[500] transition-all duration-300 left-3 bottom-3 w-72 md:bottom-auto md:top-3 md:w-80"
              style={{ direction: "rtl" }}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={selected.heroImage}
                    alt={selected.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <button
                    onClick={handleClose}
                    className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <X size={13} />
                  </button>
                  <div className="absolute bottom-2.5 right-2.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_CLR_LIGHT[selected.status]}`}>
                      {STATUS_LABEL[selected.status]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-[#0B1B3A] font-bold text-sm leading-snug mb-1" style={displayFont}>
                    {selected.name}
                  </h3>
                  <p className="text-[#8899AA] text-xs mb-1 flex items-center gap-1">
                    <MapPin size={10} className="text-[#D4A843] flex-shrink-0" />
                    {selected.city} · {selected.region}
                  </p>
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className="text-[10px] text-[#6B7A8D] bg-[#F7F4EF] px-2 py-0.5 rounded-full">
                      {PROP_LABEL[selected.propertyType]}
                    </span>
                    <span className="text-[10px] text-[#6B7A8D] bg-[#F7F4EF] px-2 py-0.5 rounded-full">
                      {PROD_LABEL[selected.productType]}
                    </span>
                  </div>
                  <button
                    onClick={() => { goToProject(selected); handleClose(); }}
                    className="w-full py-2.5 bg-[#0B1B3A] text-white text-xs font-semibold rounded-xl hover:bg-[#162d55] transition-colors"
                  >
                    عرض المشروع ←
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats row */}
        <div className="mt-10 bg-[#0B1B3A] rounded-2xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCounter value={80}   label="مشروع سكني"  delay={0}   />
          <StatCounter value={100}  label="وحدة سكنية"  delay={120} />
          <StatCounter value={15}   label="سنة خبرة"    delay={240} />
          <StatCounter value={1000} label="عميل"         delay={360} />
        </div>
      </div>
    </section>
  );
}

function IntisharSection() {
  return (
    <section className="bg-[#0B1B3A] py-10 md:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Two-column: map left, content right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-10 md:mb-12">

          {/* LEFT — Saudi map */}
          <div className="order-2 lg:order-2">
            <div className="relative w-full" style={{ paddingBottom: "85%" }}>
              <div className="absolute inset-0">
                <SaudiMapChart />
              </div>
            </div>
          </div>

          {/* RIGHT — text content */}
          <div className="order-1 lg:order-1 text-right">
            <p className="text-[#D4A843] text-[11px] tracking-[0.2em] uppercase mb-4 font-medium">انتشارنا</p>
            <div className="w-8 h-px bg-[#D4A843] -mt-3 mb-4" />
            <h2
              className="text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-snug"
              style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700 }}
            >
              نطوّر مستقبل العقارات في المملكة
            </h2>
            <p className="text-white/50 text-base leading-relaxed max-w-md mr-0">
              فروعنا ومشاريعنا تغطي المملكة بأكملها
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/8 mb-8 md:mb-10" />

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCounter value={80}   label="مشروع سكني"  delay={0}   />
          <StatCounter value={100}  label="وحدة سكنية"  delay={120} />
          <StatCounter value={15}   label="سنة خبرة"    delay={240} />
          <StatCounter value={1000} label="عميل"         delay={360} />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME PROJECTS CAROUSEL
// ─────────────────────────────────────────────────────────────────────────────
function HomeProjectsCarousel({
  goTo,
  goToProject,
}: {
  goTo: (p: Page) => void;
  goToProject: (p: Project) => void;
}) {
  const SORTED = [...PROJECTS].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    const o: Record<Project["status"], number> = { available: 0, "under-construction": 1, sold: 2 };
    return o[a.status] - o[b.status];
  });
  const total = SORTED.length;

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardPx, setCardPx] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (cardRef.current) setCardPx(cardRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  useEffect(() => {
    if (isPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [isPaused, next]);

  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
  };
  const onMouseDown = (e: React.MouseEvent) => { isDragging.current = true; startX.current = e.clientX; };
  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = startX.current - e.clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
  };

  const offset = cardPx ? current * cardPx : 0;

  return (
    <section className="py-10 md:py-12 bg-white overflow-hidden">
      {/* Header row */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <GoldLine />
          <p className="text-[#D4A843] text-xs tracking-widest uppercase mb-3">معرض المشاريع</p>
          <h2 className="text-3xl md:text-4xl leading-snug text-[#0B1B3A]" style={displayFont}>مشاريعنا</h2>
          <p className="text-[#4B5974] text-sm mt-2 max-w-md leading-relaxed">
            مشاريع نطوّرها بعناية، لتصنع قيمة تتجاوز لحظة البناء.
          </p>
          <p className="text-[#8899AA] text-xs mt-1">
            استكشف مجموعة من مشاريع أسس في مختلف مناطق المملكة.
          </p>
        </div>
        {/* Arrows + counter */}
        <div className="flex items-center gap-3 flex-shrink-0 self-end pb-1">
          <span className="text-xs text-[#8899AA] tracking-widest tabular-nums" dir="ltr">
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            onClick={prev}
            aria-label="المشروع السابق"
            className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#0B1B3A] hover:border-[#D4A843] hover:text-[#D4A843] active:scale-95 transition-all duration-200 shadow-sm"
          >
            <ChevronRight size={17} />
          </button>
          <button
            onClick={next}
            aria-label="المشروع التالي"
            className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#0B1B3A] hover:border-[#D4A843] hover:text-[#D4A843] active:scale-95 transition-all duration-200 shadow-sm"
          >
            <ChevronLeft size={17} />
          </button>
        </div>
      </div>

      {/* Carousel track */}
      <div
        className="relative select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); isDragging.current = false; }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ cursor: "grab" }}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(${offset}px)`,
            transition: "transform 0.62s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            willChange: "transform",
            paddingInlineStart: "max(24px, calc((100vw - 80rem) / 2 + 24px))",
          }}
        >
          {[...SORTED, ...SORTED].map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              ref={idx === 0 ? cardRef : undefined}
              className="flex-shrink-0 w-[86vw] sm:w-[46vw] lg:w-[31vw]"
              style={{ paddingInlineEnd: "20px" }}
              aria-hidden={idx >= total}
            >
              <div
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                style={{ aspectRatio: "4/3" }}
                onClick={() => goToProject(project)}
              >
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/15" />
                {/* Top badges */}
                <div className="absolute top-3 inset-x-3 flex items-start justify-between">
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#0B1B3A]/60 border border-[#D4A843]/50 text-[#D4A843] backdrop-blur-sm">
                    {PROP_LABEL[project.propertyType]}
                  </span>
                  <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border backdrop-blur-sm ${STATUS_CLR[project.status]}`}>
                    {STATUS_LABEL[project.status]}
                  </span>
                </div>
                {/* Bottom content */}
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <h3 className="text-base font-bold text-white mb-1 leading-snug" style={displayFont}>{project.name}</h3>
                  <div className="flex items-center gap-1 text-white/60 text-[11px] mb-3">
                    <MapPin size={10} className="text-[#D4A843] flex-shrink-0" />
                    {project.city} · {project.region}
                    {project.totalUnits && <><span className="text-white/30 mx-0.5">·</span>{project.totalUnits} وحدة</>}
                  </div>
                  <div className="border-t border-white/10 pt-2.5 flex items-center justify-between">
                    <span className="text-[#D4A843] text-[11px] font-semibold">عرض التفاصيل ←</span>
                    {project.startingPrice && (
                      <span className="text-white/45 text-[10px]">
                        يبدأ من <span className="text-[#D4A843] font-bold">{(project.startingPrice / 1000).toLocaleString("ar-SA")}k</span> ر.س
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 mt-8 flex justify-center">
        <button
          onClick={() => goTo("projects")}
          className="text-sm text-[#D4A843] border border-[#D4A843]/30 px-8 py-3 hover:bg-[#D4A843] hover:text-[#0B1B3A] transition-all duration-300"
        >
          عرض جميع المشاريع ←
        </button>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────
function HomePage({ goTo, goToProject, goToProductDetail }: { goTo: (p: Page) => void; goToProject: (p: Project) => void; goToProductDetail: (id: string) => void }) {
  return (
    <>
      {/* ① HERO — dark navy */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-[#0B1B3A]">
        <img src={HERO_IMG} alt="مبنى عقاري فاخر" className="absolute inset-0 w-full h-full object-cover opacity-55 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-[#0B1B3A]/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center"><GoldLine /></div>
            <p className="text-[#D4A843] text-xs tracking-widest uppercase mb-6">أسسٌ راسخة... وقيمةٌ تدوم.</p>
            <h1 className="text-5xl md:text-6xl lg:text-6xl leading-tight mb-8 text-white font-bold" style={displayFont}>
              مشاريع نصممها بعناية، وننفذها بإتقان، ونبنيها لتدوم.
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
              نساعدك على استكشاف خيارات التمويل العقاري المناسبة واختيار المنتج الأنسب لاحتياجك بثقة واحترافية.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={() => goTo("projects")} className="px-8 py-3 bg-[#D4A843] text-[#0B1B3A] text-sm font-semibold rounded-md hover:bg-[#D4A843]/90 transition-all duration-300">
                استكشف المشاريع
              </button>
              <button onClick={() => goTo("products")} className="px-8 py-3 border border-white/25 text-white text-sm rounded-md hover:border-white/60 hover:bg-white/5 transition-all duration-300">
                اكتشف المنتجات
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/25">
          <div className="w-px h-10 bg-white/15" />
          <ChevronDown size={15} />
        </div>
      </section>

      {/* ② WHY US — white */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <SectionHeadLight
              tag="نبذة عنا"
              title="نساعدك تأخذ الخطوة بثقة"
              sub="شركة متخصصة في الحلول التمويلية والعقارية، نساعد العملاء على استكشاف خيارات التمويل المناسبة ومتابعة الإجراءات باحترافية."
            />
            <button onClick={() => goTo("about")} className="self-start md:self-end text-[#D4A843] text-sm border-b border-[#D4A843]/25 hover:border-[#D4A843] pb-0.5 transition-colors whitespace-nowrap mb-6">
              اعرف أكثر عنّا ←
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Eye size={20} />, title: "وضوح من البداية", desc: "نعرّفك بالخيارات المتاحة والشروط قبل أي خطوة." },
              { icon: <Layers size={20} />, title: "حلول متعددة", desc: "تمويل عقاري، بناء ذاتي، فلل جاهزة وغيرها." },
              { icon: <RefreshCw size={20} />, title: "متابعة مستمرة", desc: "فريق يتابع معك كل مراحل الإجراء." },
              { icon: <MapPin size={20} />, title: "خبرة بالسوق المحلي", desc: "فهم عميق لاحتياجات السوق العقاري السعودي." },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-white rounded-xl border border-[#D4A843]/35 hover:border-[#D4A843]/70 transition-colors duration-300">
                <div className="w-9 h-9 bg-[#D4A843]/10 rounded-lg flex items-center justify-center text-[#D4A843] mb-4">{item.icon}</div>
                <h3 className="text-base mb-2 text-[#0B1B3A] font-semibold" style={displayFont}>{item.title}</h3>
                <p className="text-[#4B5974] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ③ PRODUCTS — light surface */}
      <section className="py-10 md:py-12 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
            <SectionHeadLight tag="منتجاتنا" title="منتجاتنا" sub="اختر المنتج الذي يناسب احتياجك، ونحن نساعدك في معرفة الخيارات المتاحة." />
            <button onClick={() => goTo("products")} className="self-start md:self-end text-[#D4A843] text-sm border-b border-[#D4A843]/25 hover:border-[#D4A843] pb-0.5 transition-colors whitespace-nowrap mb-6">
              عرض جميع المنتجات ←
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.filter((p) => p.status === "active").map((product) => (
              <div key={product.id} onClick={() => goToProductDetail(product.id)} className="cursor-pointer">
                <ProductCard product={product} goToProductDetail={goToProductDetail} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ④ PROJECTS CAROUSEL — white */}
      <HomeProjectsCarousel goTo={goTo} goToProject={goToProject} />

      {/* ⑤ MAP — cream */}
      <ProjectMapSection goToProject={goToProject} />

      {/* (IntisharSection removed — stats moved into ProjectMapSection) */}

      {/* ⑥ VALUE PROP — white */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative h-80 lg:h-[440px] overflow-hidden rounded-xl order-last lg:order-first shadow-md">
            <img src={INTERIOR_IMG} alt="مساحة داخلية فاخرة" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </div>
          <div>
            <SectionHeadLight
              tag="نبني اليوم ما يصنع قيمة الغد"
              title="مشروعك القادم يبدأ من أسس"
              sub="تواصل معنا لنتعرف على احتياجك، ونستكشف معًا المنتج العقاري المناسب."
            />
            <ul className="space-y-4 mb-6">
              {["مشاريع تُبنى بجودة تدوم", "حلول عقارية بوضوح وشفافية", "قيمة تتجاوز اليوم إلى المستقبل"].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#4B5974] text-sm">
                  <CheckCircle size={15} className="text-[#D4A843] mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button onClick={() => goTo("contact")} className="px-8 py-3 bg-[#0B1B3A] text-white text-sm rounded-md hover:bg-[#0B1B3A]/85 transition-all duration-300">
              ابدأ رحلتك معنا
            </button>
          </div>
        </div>
      </section>

      {/* ⑥ TESTIMONIALS — white */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeadLight tag="آراء العملاء" title="ماذا يقول عنا عملائنا" sub="نترك التجربة لعملائنا... وهم يروونها لكم" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "محمد العتيبي", province: "الرياض" },
              { name: "خالد الشمري", province: "القصيم" },
              { name: "عبدالله الزهراني", province: "جدة" },
              { name: "سعد المطيري", province: "المدينة المنورة" },
              { name: "فيصل الدوسري", province: "الدمام" },
              { name: "يوسف القحطاني", province: "أبها" },
            ].map((client) => (
              <AudioCard key={client.name} name={client.name} province={client.province} src="" light />
            ))}
          </div>
        </div>
      </section>

      {/* ⑦ NEWS PREVIEW — light surface */}
      <section className="py-10 md:py-12 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between gap-4 mb-6">
            <SectionHeadLight tag="المركز الإعلامي" title="آخر المستجدات والرؤى العقارية" sub="تابع أحدث أخبار أسس وأبرز التحليلات في السوق العقاري السعودي." />
            <button onClick={() => goTo("news")} className="flex-shrink-0 flex items-center gap-2 text-[#0B1B3A] text-sm border border-gray-300 px-6 py-2.5 rounded-md hover:border-[#D4A843] hover:text-[#D4A843] transition-all duration-200 mb-6">اقرأ المزيد<ChevronLeft size={14} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.slice(0, 3).map((article) => (
              <article key={article.id} className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-[#D4A843]/30 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => goTo("news")}>
                <div className="overflow-hidden aspect-[16/10]">
                  <img src={article.img} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
                <div className="p-6">
                  <span className="text-[#D4A843] text-[10px] tracking-widest uppercase mb-3 block font-medium">{article.category}</span>
                  <h3 className="text-[#0B1B3A] text-base font-semibold mb-3 leading-snug group-hover:text-[#D4A843] transition-colors" style={displayFont}>{article.title}</h3>
                  <p className="text-[#4B5974] text-sm leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-[#8899AA] text-xs">{article.date}</span>
                    <span className="text-[#D4A843] text-xs flex items-center gap-1 group-hover:gap-2 transition-all duration-200">اقرأ المقال <ChevronLeft size={12} /></span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ⑧ CTA STRIP — white */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-10 h-px bg-[#D4A843] mx-auto mb-4" />
          <h2 className="text-3xl text-[#0B1B3A] mb-4" style={displayFont}>جاهز للبدء؟</h2>
          <p className="text-[#4B5974] text-base leading-relaxed mb-6">
            تواصل معنا وسيساعدك فريقنا في اختيار المنتج المناسب واتخاذ خطوتك الأولى نحو التملك.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => goTo("contact")} className="px-10 py-3 bg-[#0B1B3A] text-white text-sm rounded-md hover:bg-[#0B1B3A]/85 transition-colors">
              تواصل معنا
            </button>
            <button onClick={() => goTo("products")} className="px-10 py-3 bg-[#D4A843] text-[#0B1B3A] text-sm font-semibold rounded-md hover:bg-[#D4A843]/90 transition-all duration-300">
              استعرض المنتجات
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT PAGE
// ─────────────────────────────────────────────────────────────────────────────
function AboutPage({ goTo }: { goTo: (p: Page) => void }) {
  return (
    <>
      {/* ① HERO */}
      <PageHero
        tag="من نحن"
        title="نبني على أسسٍ تستحق أن تبقى"
        sub="أصالةٌ في الهوية، صرامةٌ في التنفيذ، وقيمةٌ تدوم."
        img={POOL_IMG}
        alt="عقار فاخر"
        onHome={() => goTo("home")}
      />

      {/* ② ABOUT CARDS — two equal-height cards */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

            {/* Card 1 — عن أسس (dark navy) */}
            <div className="bg-[#0B1B3A] rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <p className="text-[#D4A843] text-[10px] tracking-[0.2em] uppercase mb-4 font-medium">عن أسس</p>
                <div className="w-8 h-px bg-[#D4A843] mb-6" />
                <p className="text-white/80 text-base leading-[2] mb-6">
                  «أسس» هي المطوّر العقاري الذي يجمع أصالة العمارة العربية بصرامة الهندسة العالمية — فيبني ما يستحق أن يبقى. نؤمن أن التطوير العقاري لا يقتصر على بناء الجدران، بل يبدأ من فهم المكان، ويستمر بجودة التنفيذ، وينتهي بقيمة حقيقية يعيشها الإنسان.
                </p>
              </div>
              {/* Mini metrics row */}
              <div className="border-t border-white/10 pt-8 grid grid-cols-3 gap-4">
                {[
                  { num: "80+", label: "مشروع سكني" },
                  { num: "1,200+", label: "وحدة سكنية" },
                  { num: "15+", label: "سنة خبرة" },
                ].map(({ num, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-[#D4A843] mb-1" style={displayFont}>{num}</div>
                    <div className="text-white/45 text-[11px] leading-snug">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2 — Vision + 2×2 metrics (warm cream) */}
            <div className="bg-[#F7F4EF] rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <p className="text-[#D4A843] text-[10px] tracking-[0.2em] uppercase mb-4 font-medium">رؤيتنا</p>
                <div className="w-8 h-px bg-[#D4A843] mb-6" />
                <p className="text-[#0B1B3A]/75 text-base leading-[2] mb-6">
                  نطوّر مشاريع تجمع بين الهوية، الجودة، والدقة؛ لنصنع أماكن لا تواكب احتياجات اليوم فحسب، بل تحتفظ بقيمتها للمستقبل. هدفنا ليس أن نبني أكثر، بل أن نبني أفضل — وأن نترك خلف كل مشروع قيمة تستحق أن تبقى.
                </p>
              </div>
              {/* 2×2 metric grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { num: "80+", label: "مشروع سكني" },
                  { num: "1,200+", label: "وحدة سكنية" },
                  { num: "15+", label: "سنة خبرة" },
                  { num: "1,100+", label: "عميل راضي" },
                ].map(({ num, label }) => (
                  <div key={label} className="bg-white rounded-xl p-4 border border-[#D4A843]/20">
                    <div className="text-2xl font-bold text-[#0B1B3A] mb-1" style={displayFont}>{num}</div>
                    <div className="text-[#6B7A8D] text-xs">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ③ VALUES — white */}
      <section className="py-10 md:py-12 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-6">
            <GoldLine />
            <p className="text-[#D4A843] text-[10px] tracking-[0.18em] uppercase mb-3 font-medium">قيمنا</p>
            <h2 className="text-2xl md:text-3xl text-[#0B1B3A] mb-3" style={displayFont}>المبادئ التي نبني عليها</h2>
            <p className="text-[#6B7A8D] text-sm max-w-lg">أربعة مبادئ تحكم كل قرار نتخذه وكل مشروع نُنجزه.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "الرسوخ",    desc: "نَعِد بما ننفّذ، وننفّذ بما يدوم." },
              { num: "02", title: "الإتقان",   desc: "التفاصيل الصغيرة هي سمعتنا الكبيرة." },
              { num: "03", title: "الشفافية",  desc: "أرقام واضحة وعقود بلا هوامش رمادية." },
              { num: "04", title: "الريادة",   desc: "نبني ما يسبق السوق لا ما يلحق به." },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-xl p-8 border border-[#D4A843]/25 hover:border-[#D4A843]/60 hover:shadow-md transition-all duration-300 flex flex-col">
                <span className="text-[#D4A843] text-[10px] tracking-widest font-semibold mb-4">{v.num}</span>
                <div className="w-6 h-px bg-[#D4A843] mb-4" />
                <h3 className="text-lg font-semibold text-[#0B1B3A] mb-3" style={displayFont}>{v.title}</h3>
                <p className="text-[#6B7A8D] text-sm leading-[1.85] mt-auto">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ④ WORK METHOD */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-6">
            <GoldLine />
            <p className="text-[#D4A843] text-[10px] tracking-[0.18em] uppercase mb-3 font-medium">منهجيتنا</p>
            <h2 className="text-2xl md:text-3xl text-[#0B1B3A] mb-3" style={displayFont}>منهج العمل</h2>
            <p className="text-[#6B7A8D] text-sm max-w-lg">من الفكرة إلى المكان الذي يستحق أن يبقى.</p>
          </div>

          {/* Desktop: horizontal steps with connector. Mobile: vertical cards. */}
          <div className="hidden md:block">
            {/* Connector track */}
            <div className="relative mb-0">
              <div className="absolute top-[28px] right-[12.5%] left-[12.5%] h-px bg-[#D4A843]/25" />
              <div className="grid grid-cols-4 gap-6">
                {[
                  { num: "01", Icon: Search,      title: "نفهم",   desc: "نفهم احتياجات السوق والمكان والمستخدم قبل أن تبدأ عملية التطوير." },
                  { num: "02", Icon: FileText,     title: "نخطط",  desc: "نحوّل الرؤية إلى خطط واضحة تجمع بين الجدوى، التصميم، والجودة." },
                  { num: "03", Icon: Building2,    title: "نطوّر", desc: "ننفّذ المشاريع بدقة عالية، مع متابعة مستمرة لكل تفاصيل العمل." },
                  { num: "04", Icon: CheckCircle,  title: "نسلّم", desc: "نسلّم مشاريع متكاملة تحقق الوعد وتحافظ على قيمتها للمستقبل." },
                ].map(({ num, Icon, title, desc }) => (
                  <div key={num} className="flex flex-col items-center text-center">
                    {/* Step icon with number */}
                    <div className="relative mb-6 z-10">
                      <div className="w-14 h-14 rounded-full bg-white border-2 border-[#D4A843]/50 flex items-center justify-center shadow-sm">
                        <Icon size={20} className="text-[#D4A843]" />
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#D4A843] text-[#0B1B3A] text-[10px] font-bold flex items-center justify-center">{num.replace("0","")}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#0B1B3A] mb-3" style={displayFont}>{title}</h3>
                    <p className="text-[#6B7A8D] text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="md:hidden space-y-0">
            {[
              { num: "01", Icon: Search,      title: "نفهم",   desc: "نفهم احتياجات السوق والمكان والمستخدم قبل أن تبدأ عملية التطوير." },
              { num: "02", Icon: FileText,     title: "نخطط",  desc: "نحوّل الرؤية إلى خطط واضحة تجمع بين الجدوى، التصميم، والجودة." },
              { num: "03", Icon: Building2,    title: "نطوّر", desc: "ننفّذ المشاريع بدقة عالية، مع متابعة مستمرة لكل تفاصيل العمل." },
              { num: "04", Icon: CheckCircle,  title: "نسلّم", desc: "نسلّم مشاريع متكاملة تحقق الوعد وتحافظ على قيمتها للمستقبل." },
            ].map(({ num, Icon, title, desc }, idx, arr) => (
              <div key={num} className="flex gap-6">
                {/* Left: icon + line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-[#D4A843]/50 flex items-center justify-center shadow-sm relative z-10">
                    <Icon size={18} className="text-[#D4A843]" />
                  </div>
                  {idx < arr.length - 1 && <div className="w-px flex-1 bg-[#D4A843]/20 my-2" />}
                </div>
                {/* Right: content */}
                <div className={`pb-8 ${idx === arr.length - 1 ? "" : ""}`}>
                  <span className="text-[#D4A843] text-[10px] font-bold tracking-widest">{num}</span>
                  <h3 className="text-base font-bold text-[#0B1B3A] mb-2 mt-1" style={displayFont}>{title}</h3>
                  <p className="text-[#6B7A8D] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑤ CTA BANNER */}
      <section className="bg-[#0B1B3A] py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-8 h-px bg-[#D4A843] mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-6 leading-snug" style={displayFont}>
              نبني مجتمعات سكنية أكثر وضوحًا وراحة
            </h2>
            <p className="text-white/50 text-sm md:text-base leading-[2] max-w-xl mx-auto mb-6">
              تواصل معنا لمعرفة المزيد عن مشاريع أسس، الوحدات المتاحة، وخيارات السكن المناسبة لك.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => goTo("contact")}
                className="px-10 py-3 bg-[#D4A843] text-[#0B1B3A] text-sm font-bold rounded-md hover:bg-[#C49733] transition-all duration-300"
              >
                تواصل معنا
              </button>
              <button
                onClick={() => goTo("products")}
                className="px-10 py-3 border border-white/20 text-white/80 text-sm rounded-md hover:border-white/40 hover:text-white transition-all duration-300"
              >
                استكشف المنتجات
              </button>
              <button
                onClick={() => goTo("projects")}
                className="px-10 py-3 border border-white/20 text-white/80 text-sm rounded-md hover:border-white/40 hover:text-white transition-all duration-300"
              >
                استعرض المشاريع
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTS PAGE
// ─────────────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: "self-build",
    title: "البناء الذاتي",
    tagline: "ابنِ منزلك على أرضك بالطريقة التي تريدها",
    status: "active" as const,
    productFilter: "self-build" as Project["productType"],
    desc: "تمويل مراحل بناء العقار على أرض يمتلكها المستفيد، بما يساعده على إنشاء منزله وفق احتياجه وتصوره. تتم مراحل التمويل وفق نسب الإنجاز والشروط المعتمدة للمنتج.",
    img: "https://images.unsplash.com/photo-1693639767415-27ff64ce4da2?w=900&h=600&fit=crop&auto=format",
    features: [
      { icon: "Wallet", title: "تمويل مرحلي", desc: "يُصرف التمويل على دفعات مرتبطة بنسب إنجاز البناء الفعلي، مما يحمي حقوقك." },
      { icon: "PenTool", title: "حرية التصميم", desc: "تصمّم منزلك وفق احتياجاتك الخاصة وتشرف على تنفيذه بالمواصفات التي تريدها." },
      { icon: "ClipboardList", title: "متابعة المراحل", desc: "نتابع معك كل مرحلة من مراحل البناء ونوفر الدعم الإداري والتوثيقي المطلوب." },
      { icon: "FileCheck", title: "إجراءات مبسّطة", desc: "نُيسّر عليك كافة الإجراءات المرتبطة بالتمويل من التقديم حتى إتمام البناء." },
    ],
  },
  {
    id: "off-plan",
    title: "البيع على الخارطة",
    tagline: "احجز وحدتك قبل اكتمال البناء بأسعار تنافسية",
    status: "active" as const,
    productFilter: "off-plan" as Project["productType"],
    desc: "خيار لتملك وحدة عقارية قيد الإنشاء ضمن مشروع محدد، قبل اكتمال أعمال البناء. يتيح للمستفيد اختيار وحدة مناسبة ضمن المشاريع والخيارات المتاحة.",
    img: "https://images.unsplash.com/photo-1721244654394-36a7bc2da288?w=900&h=600&fit=crop&auto=format",
    features: [
      { icon: "TrendingUp", title: "قيمة مبكرة", desc: "الشراء قبل اكتمال المشروع يمنحك أسعاراً تفضيلية وفرصة لتحقيق عائد عند الاكتمال." },
      { icon: "Layers", title: "خيارات متنوعة", desc: "اختر من بين وحدات ومشاريع متعددة تختلف في المساحات والتشطيبات والمواقع." },
      { icon: "ShieldCheck", title: "شفافية كاملة", desc: "نوفر لك كامل تفاصيل المشروع ومراحله ومخططاته قبل توقيع عقد التملك." },
      { icon: "BadgeCheck", title: "ضمانات واضحة", desc: "عقود موثقة ومعتمدة تحفظ حقوقك في مراحل البناء وعند التسليم النهائي." },
    ],
  },
  {
    id: "ready-unit",
    title: "الوحدات الجاهزة",
    tagline: "انتقل إلى منزلك الجاهز دون انتظار",
    status: "active" as const,
    productFilter: "ready-unit" as Project["productType"],
    desc: "حل مناسب لمن يبحث عن شقة أو فيلا قائمة وجاهزة للسكن، دون الحاجة إلى الانتظار حتى اكتمال البناء. نوفر خيارات عقارية متنوعة بحسب المشاريع والوحدات المتاحة.",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&h=600&fit=crop&auto=format",
    features: [
      { icon: "KeyRound", title: "تسليم فوري", desc: "وحدات مكتملة وجاهزة للانتقال إليها فور إتمام إجراءات التعاقد والتمويل." },
      { icon: "Building2", title: "فلل وشقق", desc: "طيف واسع من الخيارات السكنية يشمل الفلل المستقلة والشقق بمختلف المساحات." },
      { icon: "MapPin", title: "مواقع مميزة", desc: "وحدات في أحياء راقية ومواقع استراتيجية تضمن قيمة عقارية متنامية." },
      { icon: "CreditCard", title: "حلول تمويلية", desc: "برامج تمويل مرنة مرتبطة بأهليتك تساعدك على التملك بخطوات واضحة وميسورة." },
    ],
  },
  {
    id: "other",
    title: "منتجات أخرى قادمة",
    tagline: "نعمل على تطوير حلول عقارية جديدة لتلبية احتياجاتك",
    status: "coming-soon" as const,
    productFilter: null,
    desc: "نعمل باستمرار على تطوير وإضافة منتجات عقارية جديدة لتلبية احتياجات السوق والعملاء. تابعنا للتعرف على المنتجات والخيارات التي سيتم إطلاقها مستقبلًا.",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=600&fit=crop&auto=format",
    features: [],
  },
];

const PRODUCT_STEPS: Record<string, { step: string; title: string; desc: string }[]> = {
  "self-build": [
    { step: "01", title: "اختر أرضك", desc: "تحقق من ملكيتك للأرض وجاهزيتها للبناء وتوفر المستندات المطلوبة." },
    { step: "02", title: "تقدّم بطلبك", desc: "أرسل طلب التمويل مع الوثائق اللازمة وانتظر الموافقة الأولية." },
    { step: "03", title: "ابدأ البناء", desc: "استلم دفعات التمويل مرتبطةً بنسب إنجاز البناء الفعلي." },
    { step: "04", title: "استلم منزلك", desc: "أتمم مراحل البناء وفق الجدول وسلّم المستندات النهائية لاستلام منزلك." },
  ],
  "off-plan": [
    { step: "01", title: "اختر مشروعك", desc: "استعرض المشاريع المتاحة واختر الوحدة والمساحة المناسبة لك." },
    { step: "02", title: "احجز وحدتك", desc: "سجّل اهتمامك وأتمم إجراءات الحجز والتعاقد المبدئي." },
    { step: "03", title: "تابع الإنشاء", desc: "تابع مراحل البناء وتطور المشروع حتى اكتماله." },
    { step: "04", title: "استلم وحدتك", desc: "أتمم إجراءات التسليم النهائي واستلم وحدتك الجاهزة." },
  ],
  "ready-unit": [
    { step: "01", title: "استعرض الخيارات", desc: "تصفّح الوحدات الجاهزة المتاحة في مشاريعنا وقارن بينها." },
    { step: "02", title: "زر الوحدة", desc: "تواصل معنا لترتيب جولة معاينة ميدانية للوحدة التي تناسبك." },
    { step: "03", title: "أتمم الإجراءات", desc: "اكمل متطلبات التعاقد وترتيبات التمويل بمساعدة فريقنا." },
    { step: "04", title: "انتقل لمنزلك", desc: "استلم مفاتيحك وانتقل لمنزلك الجاهز فور إتمام التعاقد." },
  ],
};

const PRODUCT_ABOUT: Record<string, { headline: string; body: string; who: string }> = {
  "self-build": {
    headline: "بنِ منزلك على أرضك بالأسلوب الذي تريده",
    body: "البناء الذاتي هو منتج تمويلي يمنح مالك الأرض القدرة على تشييد منزله وفق تصوره واحتياجاته الخاصة. يُصرف التمويل على دفعات مرتبطة بنسب الإنجاز الفعلي، مما يضمن سير البناء بصورة منظمة ومحمية.",
    who: "مناسب لمن يمتلك أرضاً ويرغب في بناء منزله بالمواصفات التي يختارها، مع مرونة في الميزانية والجدول الزمني.",
  },
  "off-plan": {
    headline: "تملّك وحدتك قبل اكتمال البناء بأسعار تنافسية",
    body: "البيع على الخارطة يتيح للمستفيد تملك وحدة عقارية ضمن مشروع قيد الإنشاء قبل اكتماله، بأسعار أفضل من الوحدات الجاهزة. يمنحك هذا الخيار فرصة اختيار موقع وحدتك مبكراً والاستفادة من ارتفاع قيمتها عند الاكتمال.",
    who: "مناسب لمن يرغب في الاستثمار العقاري طويل المدى أو تأمين وحدة بأسعار تفضيلية قبل إتمام البناء.",
  },
  "ready-unit": {
    headline: "منزلك الجاهز بانتظارك",
    body: "الوحدات الجاهزة توفر حلاً مباشراً لمن يبحث عن سكن جاهز دون انتظار. تشمل خياراتنا فللاً وشققاً مكتملة في مواقع متميزة، جاهزة للاستلام فور إتمام إجراءات التعاقد والتمويل.",
    who: "مناسب لمن يحتاج إلى سكن فوري أو يرغب في تملك عقار جاهز في موقع استراتيجي دون التعامل مع مراحل البناء.",
  },
};

function ProductCard({ product, goToProductDetail }: { product: typeof PRODUCTS[0]; goToProductDetail: (id: string) => void }) {
  const isSoon = product.status === "coming-soon";
  return (
    <div className="group relative overflow-hidden border border-border bg-white rounded-xl hover:border-[#D4A843]/40 hover:shadow-lg transition-all duration-300 flex flex-col">
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={product.img}
          alt={product.title}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${isSoon ? "opacity-50 grayscale" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {isSoon && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-black/50 border border-white/20 text-white/80 text-xs px-4 py-1.5 tracking-widest backdrop-blur-sm rounded-md">قريباً</span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-base text-[#0B1B3A] mb-2 font-semibold leading-snug" style={displayFont}>{product.title}</h3>
        <p className="text-[#6B7A8D] text-xs leading-relaxed mb-4 flex-1 line-clamp-3">{product.desc}</p>
        {!isSoon && (
          <button onClick={() => goToProductDetail(product.id)} className="self-start text-[#D4A843] text-xs border-b border-[#D4A843]/25 hover:border-[#D4A843] pb-0.5 transition-colors">
            استكشف {product.title} ←
          </button>
        )}
      </div>
    </div>
  );
}

// Icon map for product features
const PROD_ICON: Record<string, React.ReactNode> = {
  Wallet: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>,
  PenTool: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
  ClipboardList: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>,
  FileCheck: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>,
  TrendingUp: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  Layers: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  ShieldCheck: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
  BadgeCheck: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>,
  KeyRound: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>,
  Building2: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>,
  MapPin: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  CreditCard: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>,
};

function ProductsPage({ goTo, goToWithProductFilter, goToProductDetail }: { goTo: (p: Page) => void; goToWithProductFilter: (f: Project["productType"]) => void; goToProductDetail: (id: string) => void }) {
  const active = PRODUCTS.filter(p => p.status === "active");
  const soon = PRODUCTS.find(p => p.status === "coming-soon")!;

  return (
    <>
      {/* ① HERO */}
      <PageHero
        tag="منتجاتنا"
        title="منتجاتنا"
        sub="حلول عقارية متنوعة صُممت لتمنحك خيارات تناسب احتياجاتك وتطلعاتك."
        img={BUILDING_IMG}
        alt="منتجات عقارية"
        onHome={() => goTo("home")}
      />

      {/* ② Product sections — alternating bg */}
      {active.map((product, i) => {
        const isEven = i % 2 === 0;
        const bg = isEven ? "bg-white" : "bg-[#F7F4EF]";

        const imgEl = (
          <div className="relative overflow-hidden rounded-2xl shadow-md aspect-[4/3] w-full">
            <img
              src={product.img}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A]/30 via-transparent to-transparent" />
            <div className="absolute bottom-5 right-5">
              <span className="bg-white/90 backdrop-blur-sm text-[#0B1B3A] text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide shadow-sm">
                {product.title}
              </span>
            </div>
          </div>
        );

        const contentEl = (
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#D4A843]" />
              <span className="text-[#D4A843] text-xs tracking-[0.18em] font-medium">0{i + 1}</span>
            </div>
            <h2 className="text-3xl md:text-4xl text-[#0B1B3A] mb-3 leading-tight" style={displayFont}>
              {product.title}
            </h2>
            <p className="text-[#D4A843] text-sm font-medium mb-4 leading-snug">{product.tagline}</p>
            <p className="text-[#4B5974] text-sm leading-[1.9] mb-6 max-w-lg">{product.desc}</p>

            {/* Feature cards 2×2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {product.features.map((feat) => (
                <div
                  key={feat.title}
                  className="bg-white border border-[#D4A843]/20 rounded-xl p-4 flex flex-col gap-2.5 hover:border-[#D4A843]/50 hover:shadow-sm transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#D4A843]/10 flex items-center justify-center text-[#D4A843] flex-shrink-0">
                    {PROD_ICON[feat.icon]}
                  </div>
                  <div>
                    <p className="text-[#0B1B3A] text-sm font-semibold mb-1">{feat.title}</p>
                    <p className="text-[#6B7A8D] text-xs leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => goToProductDetail(product.id)}
                className="flex items-center gap-2 px-6 py-3 bg-[#0B1B3A] text-white text-sm rounded-lg hover:bg-[#162d55] transition-colors duration-200 group"
              >
                استكشف المنتج
                <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
              </button>
              <button
                onClick={() => product.productFilter && goToWithProductFilter(product.productFilter)}
                className="flex items-center gap-2 px-5 py-3 border border-[#0B1B3A]/20 text-[#0B1B3A] text-sm rounded-lg hover:border-[#D4A843] hover:text-[#D4A843] transition-colors duration-200"
              >
                استعرض المشاريع
              </button>
            </div>
          </div>
        );

        return (
          <section key={product.id} className={`py-10 md:py-12 px-6 ${bg}`}>
            <div className="max-w-7xl mx-auto">
              {/* Mobile: image top, content below — Desktop: alternating */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* In RTL: order-1 = right side, order-2 = left side */}
                <div className={`${isEven ? "lg:order-1" : "lg:order-2"} order-1`}>{imgEl}</div>
                <div className={`${isEven ? "lg:order-2" : "lg:order-1"} order-2`}>{contentEl}</div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ③ COMING SOON */}
      <section className="py-10 md:py-12 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-dashed border-[#D4A843]/40 bg-[#F7F4EF] p-8 md:p-12">
            {/* Subtle decorative circle */}
            <div className="absolute -left-16 -top-16 w-64 h-64 bg-[#D4A843]/5 rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-[#D4A843]" />
                  <span className="text-[#D4A843] text-xs tracking-[0.18em] font-medium">04</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-[#D4A843]/10 border border-[#D4A843]/25 rounded-full px-4 py-1.5 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843] animate-pulse" />
                  <span className="text-[#D4A843] text-xs font-semibold tracking-wide">قريباً</span>
                </div>
                <h2 className="text-2xl md:text-3xl text-[#0B1B3A] mb-3 leading-snug" style={displayFont}>{soon.title}</h2>
                <p className="text-[#4B5974] text-sm leading-[1.9] max-w-xl">{soon.tagline}</p>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={() => goTo("contact")}
                  className="flex items-center gap-2 border border-[#0B1B3A]/20 text-[#0B1B3A] text-sm px-6 py-3 rounded-lg hover:border-[#D4A843] hover:text-[#D4A843] transition-colors duration-200"
                >
                  تواصل معنا للاستفسار
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ④ CTA banner */}
      <section className="py-10 bg-[#0B1B3A] px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-8 h-px bg-[#D4A843] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl text-white mb-4 leading-snug" style={displayFont}>
            تحدّث مع مستشارينا العقاريين
          </h2>
          <p className="text-white/60 text-sm mb-6 leading-relaxed">
            سيساعدك فريقنا في اختيار المنتج الأنسب لاحتياجك والإجابة على جميع استفساراتك بكل شفافية.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => goTo("contact")}
              className="px-8 py-3 bg-[#D4A843] text-[#0B1B3A] text-sm font-semibold rounded-lg hover:bg-[#D4A843]/90 transition-colors"
            >
              تواصل معنا
            </button>
            <button
              onClick={() => goTo("projects")}
              className="px-8 py-3 border border-white/20 text-white text-sm rounded-lg hover:border-white/50 transition-colors"
            >
              تصفّح مشاريعنا
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT DETAIL PAGE
// ─────────────────────────────────────────────────────────────────────────────
function ProductDetailPage({
  productId,
  goTo,
  goToProject,
  goToWithProductFilter,
}: {
  productId: string;
  goTo: (p: Page) => void;
  goToProject: (p: Project) => void;
  goToWithProductFilter: (f: Project["productType"]) => void;
}) {
  const product = PRODUCTS.find((p) => p.id === productId);
  const projectsRef = useRef<HTMLDivElement>(null);

  if (!product || product.status === "coming-soon") return null;

  const relatedProjects = PROJECTS.filter((p) => p.productType === product.productFilter);
  const steps = PRODUCT_STEPS[productId] ?? [];
  const about = PRODUCT_ABOUT[productId];
  const SHOW_LIMIT = 6;
  const visibleProjects = relatedProjects.slice(0, SHOW_LIMIT);

  const scrollToProjects = () =>
    projectsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      {/* ① HERO */}
      <section className="relative min-h-[560px] md:min-h-[640px] flex flex-col justify-end overflow-hidden">
        <img
          src={product.img}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A]/95 via-[#0B1B3A]/55 to-[#0B1B3A]/20" />
        {/* Breadcrumb */}
        <div className="absolute top-24 right-6 md:right-8 flex items-center gap-2 text-white/50 text-xs">
          <button onClick={() => goTo("home")} className="hover:text-white transition-colors">الرئيسية</button>
          <span>/</span>
          <button onClick={() => goTo("products")} className="hover:text-white transition-colors">منتجاتنا</button>
          <span>/</span>
          <span className="text-white/80">{product.title}</span>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10 md:pb-12 w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#D4A843]" />
            <span className="text-[#D4A843] text-xs tracking-[0.18em] font-medium uppercase">منتجاتنا</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4 leading-tight" style={displayFont}>
            {product.title}
          </h1>
          <p className="text-white/70 text-base md:text-lg mb-3 max-w-xl leading-relaxed">{product.tagline}</p>
          <p className="text-white/50 text-sm max-w-lg leading-relaxed mb-6">{product.desc}</p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={scrollToProjects}
              className="flex items-center gap-2 px-7 py-3.5 bg-[#D4A843] text-[#0B1B3A] text-sm font-bold rounded-xl hover:bg-[#c49a38] transition-colors"
            >
              استكشف المشاريع ←
            </button>
            <button
              onClick={() => goTo("contact")}
              className="flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white text-sm rounded-xl hover:border-white/60 hover:bg-white/5 transition-colors"
            >
              تواصل معنا
            </button>
          </div>
        </div>
      </section>

      {/* ② ABOUT */}
      {about && (
        <section className="py-10 md:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Text — right in RTL */}
              <div className="lg:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-[#D4A843]" />
                  <span className="text-[#D4A843] text-xs tracking-[0.18em] font-medium">ما هو {product.title}؟</span>
                </div>
                <h2 className="text-2xl md:text-3xl text-[#0B1B3A] mb-4 leading-snug font-bold" style={displayFont}>
                  {about.headline}
                </h2>
                <p className="text-[#4B5974] text-sm leading-[1.95] mb-6">{about.body}</p>
                <div className="bg-[#F7F4EF] border-r-4 border-[#D4A843] rounded-lg p-4">
                  <p className="text-[#0B1B3A] text-xs font-semibold mb-1">مناسب لـ</p>
                  <p className="text-[#4B5974] text-sm leading-relaxed">{about.who}</p>
                </div>
              </div>
              {/* Image — left in RTL */}
              <div className="lg:order-2">
                <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3]">
                  <img src={product.img} alt={product.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A]/30 via-transparent to-transparent" />
                  <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-sm text-[#0B1B3A] text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                    {product.title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ③ FEATURES */}
      {product.features.length > 0 && (
        <section className="py-10 md:py-12 bg-[#F7F4EF]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#D4A843]" />
                <span className="text-[#D4A843] text-xs tracking-[0.18em] font-medium">المميزات</span>
              </div>
              <h2 className="text-2xl md:text-3xl text-[#0B1B3A] font-bold leading-snug" style={displayFont}>
                لماذا {product.title}؟
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.features.map((feat) => (
                <div
                  key={feat.title}
                  className="bg-white border border-[#D4A843]/15 rounded-2xl p-6 flex flex-col gap-4 hover:border-[#D4A843]/40 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#D4A843]/10 flex items-center justify-center text-[#D4A843]">
                    {PROD_ICON[feat.icon]}
                  </div>
                  <div>
                    <p className="text-[#0B1B3A] text-sm font-semibold mb-2">{feat.title}</p>
                    <p className="text-[#6B7A8D] text-xs leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ④ HOW IT WORKS */}
      {steps.length > 0 && (
        <section className="py-10 md:py-12 bg-[#0B1B3A]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#D4A843]" />
                <span className="text-[#D4A843] text-xs tracking-[0.18em] font-medium">العملية</span>
              </div>
              <h2 className="text-2xl md:text-3xl text-white font-bold leading-snug" style={displayFont}>
                كيف تعمل؟
              </h2>
            </div>
            {/* Desktop: horizontal row; Mobile: vertical list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
              {steps.map((s, idx) => (
                <div key={s.step} className="relative flex lg:flex-col gap-5 lg:gap-4 pb-8 lg:pb-0 lg:px-6 lg:first:pr-0 lg:last:pl-0">
                  {/* Connector line (desktop) */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-5 left-0 w-full h-px bg-white/10" style={{ right: "-50%" }} />
                  )}
                  {/* Number */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#D4A843]/15 border border-[#D4A843]/30 flex items-center justify-center text-[#D4A843] font-bold text-sm z-10">
                    {s.step}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">{s.title}</p>
                    <p className="text-white/50 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                  {/* Vertical connector (mobile) */}
                  {idx < steps.length - 1 && (
                    <div className="lg:hidden absolute right-5 top-10 bottom-0 w-px bg-white/10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ⑤ RELATED PROJECTS */}
      <section ref={projectsRef} className="py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#D4A843]" />
                <span className="text-[#D4A843] text-xs tracking-[0.18em] font-medium">المشاريع</span>
              </div>
              <h2 className="text-2xl md:text-3xl text-[#0B1B3A] font-bold leading-snug" style={displayFont}>
                مشاريع {product.title}
              </h2>
              <p className="text-[#6B7A8D] text-sm mt-2">
                استكشف المشاريع المرتبطة بهذا المنتج واختر المشروع المناسب لك.
              </p>
            </div>
            {relatedProjects.length > SHOW_LIMIT && product.productFilter && (
              <button
                onClick={() => goToWithProductFilter(product.productFilter!)}
                className="self-start md:self-end flex items-center gap-2 text-sm text-[#D4A843] border border-[#D4A843]/30 px-5 py-2.5 rounded-lg hover:bg-[#D4A843]/5 hover:border-[#D4A843] transition-colors whitespace-nowrap"
              >
                عرض جميع المشاريع ←
              </button>
            )}
          </div>

          {visibleProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProjects.map((project) => (
                <SpaProjectCard
                  key={project.id}
                  project={project}
                  onSelect={(p) => { goToProject(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  light
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-gray-200 rounded-2xl">
              <p className="text-[#8899AA] text-sm">لا توجد مشاريع متاحة لهذا المنتج حالياً.</p>
            </div>
          )}
        </div>
      </section>

      {/* ⑥ CTA BANNER */}
      <section className="py-10 md:py-12 bg-[#0B1B3A] px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-8 h-px bg-[#D4A843] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl text-white font-bold mb-4 leading-snug" style={displayFont}>
            جاهز تبدأ رحلتك العقارية؟
          </h2>
          <p className="text-white/55 text-sm mb-6 leading-relaxed">
            تواصل معنا لمعرفة المزيد عن {product.title} والمشاريع والخيارات المتاحة.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => goTo("contact")}
              className="px-8 py-3.5 bg-[#D4A843] text-[#0B1B3A] text-sm font-bold rounded-xl hover:bg-[#c49a38] transition-colors"
            >
              تواصل معنا
            </button>
            <button
              onClick={scrollToProjects}
              className="px-8 py-3.5 border border-white/25 text-white text-sm rounded-xl hover:border-white/50 hover:bg-white/5 transition-colors"
            >
              استكشف المشاريع
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// METHODOLOGY PAGE (placeholder banner only — page replaced by NEWS)
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// NEWS & INSIGHTS PAGE
// ─────────────────────────────────────────────────────────────────────────────
type Article = {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  img: string;
  content: string[];
};

const NEWS_CATEGORIES = ["الكل", "أخبار أسس", "مشاريعنا", "السوق العقاري", "رؤى عقارية", "فعاليات ومشاركات"];

const ARTICLES: Article[] = [
  {
    id: 1,
    title: "كيف تختار منتج التمويل العقاري المناسب لك؟",
    category: "رؤى عقارية",
    excerpt: "دليل عملي يساعدك على فهم الفوارق بين منتجات التمويل المتاحة في السوق السعودي واختيار الأنسب لوضعك.",
    date: "١٠ يوليو ٢٠٢٥",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop&auto=format",
    content: [
      "يُعدّ اختيار منتج التمويل العقاري المناسب من أهم القرارات التي يتخذها الفرد في حياته، إذ يرتبط ارتباطاً وثيقاً بالوضع المالي الحالي والأهداف المستقبلية.",
      "تتنوع منتجات التمويل في السوق السعودي بين البناء الذاتي لمن يمتلك أرضاً، والبيع على الخارطة لمن يبحث عن فرصة استثمارية مبكرة، وشراء الوحدات الجاهزة لمن يريد السكن الفوري.",
      "قبل اتخاذ قرارك، احرص على دراسة نسبة التمويل المتاحة، ومدة السداد، وشروط البنك أو الجهة الممولة. كما يُنصح بالاستعانة بمستشار متخصص لمقارنة الخيارات بموضوعية.",
    ],
  },
  {
    id: 2,
    title: "أبرز مؤشرات السوق العقاري السعودي في النصف الأول من 2025",
    category: "السوق العقاري",
    excerpt: "نظرة تحليلية على أداء القطاع العقاري خلال الأشهر الستة الأولى من العام الجاري وتوقعات النصف الثاني.",
    date: "٢٢ يونيو ٢٠٢٥",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=500&fit=crop&auto=format",
    content: [
      "شهد القطاع العقاري السعودي حراكاً ملحوظاً خلال النصف الأول من عام 2025، تجلّى في ارتفاع الطلب على الوحدات السكنية في المدن الكبرى.",
      "تُشير بيانات الهيئة العامة للعقار إلى نمو ملموس في صفقات البيع والشراء، لا سيما في قطاع الفلل والشقق متوسطة المساحة التي تستهدف شريحة الأسر الشابة.",
      "من المتوقع أن يستمر هذا الزخم خلال النصف الثاني مع توسّع برامج الإسكان الحكومية ودعم التمويل العقاري للمواطنين.",
    ],
  },
  {
    id: 3,
    title: "نموذج مشروع: فيلا سكنية بتمويل البناء الذاتي في الرياض",
    category: "مشاريعنا",
    excerpt: "نستعرض تجربة أحد عملائنا من البداية حتى تسلّم مفاتيح منزله الجديد عبر منتج البناء الذاتي.",
    date: "٥ يونيو ٢٠٢٥",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=500&fit=crop&auto=format",
    content: [
      "تُعدّ تجربة بناء المنزل من الصفر من أكثر التجارب إثراءً وأكثرها تعقيداً في الوقت ذاته. في هذا المقال، نستعرض رحلة عميلنا منذ تقديم الطلب حتى استلام مفاتيح بيته.",
      "بدأت الرحلة بدراسة مبدئية شاملة لوضعه المالي وتحديد مقدار التمويل المناسب، ثم اختيار المقاول المناسب والبدء في مراحل البناء المتتالية.",
      "انتهت الرحلة باستلام العميل لمنزله الجديد بعد 18 شهراً من انطلاق المشروع، مع التزام تام بالميزانية والجدول الزمني المحدد.",
    ],
  },
  {
    id: 4,
    title: "مشاركتنا في ملتقى التطوير العقاري السعودي 2025",
    category: "فعاليات ومشاركات",
    excerpt: "لمحة عن مشاركة فريقنا في الملتقى السنوي للتطوير العقاري وأبرز ما دار من نقاشات ورؤى.",
    date: "١٨ مايو ٢٠٢٥",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop&auto=format",
    content: [
      "شارك فريقنا في النسخة السنوية من ملتقى التطوير العقاري السعودي الذي جمع نخبة من المختصين والمطورين والممولين في القطاع.",
      "تناولت الجلسات مستجدات التمويل العقاري ورؤية 2030 وأثرها على القطاع السكني، فضلاً عن ورش عمل تطبيقية حول تقييم المشاريع وإدارة المخاطر.",
      "خرجنا من الملتقى بشبكة علاقات أثرى وأفكار جديدة نعمل على تطبيقها في خدماتنا لعملائنا.",
    ],
  },
  {
    id: 5,
    title: "التمويل العقاري ورؤية 2030: أين نحن الآن؟",
    category: "السوق العقاري",
    excerpt: "مراجعة لأثر مبادرات رؤية 2030 على منظومة التمويل العقاري ونسب التملك السكني في المملكة.",
    date: "٢ مايو ٢٠٢٥",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=500&fit=crop&auto=format",
    content: [
      "منذ إطلاق رؤية 2030، شهد قطاع الإسكان السعودي تحولات جوهرية، أبرزها ارتفاع نسبة التملك السكني للمواطنين بشكل ملحوظ.",
      "أسهمت برامج مثل سكني وصندوق التنمية العقارية في تمكين شريحة واسعة من المواطنين من الوصول إلى التمويل العقاري بشروط ميسرة.",
      "لا يزال الطريق طويلاً، لكن المؤشرات تؤكد أن المملكة تسير بخطى ثابتة نحو تحقيق أهداف الإسكان المحددة في الرؤية.",
    ],
  },
  {
    id: 6,
    title: "ما الفرق بين الرهن العقاري والتأجير التمويلي؟",
    category: "رؤى عقارية",
    excerpt: "شرح مبسّط للفروق الجوهرية بين صيغتَي التمويل الأكثر شيوعاً لمساعدتك على اتخاذ قرار مدروس.",
    date: "١٤ أبريل ٢٠٢٥",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop&auto=format",
    content: [
      "يُعدّ الرهن العقاري والتأجير التمويلي من أكثر صيغ التمويل استخداماً في السوق السعودي، ولكل منهما خصائصه وشروطه التي تناسب أنواعاً مختلفة من العملاء.",
      "في الرهن العقاري، يمتلك العميل العقار فور إتمام الصفقة مع رهنه للبنك ضماناً للتمويل، بينما في التأجير التمويلي يستأجر العميل العقار مع خيار التملك في نهاية المدة.",
      "تعتمد أفضلية أحدهما على وضعك المالي الحالي، وطبيعة العقار، والهدف من الشراء سواء كان للسكن أو الاستثمار.",
    ],
  },
  {
    id: 7,
    title: "إطلاق خدمة الحسبة المبدئية عبر الموقع",
    category: "أخبار أسس",
    excerpt: "نُطلق اليوم خدمة جديدة تتيح للعملاء الحصول على حسبة تمويلية مبدئية إلكترونياً في دقائق.",
    date: "١ أبريل ٢٠٢٥",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&auto=format",
    content: [
      "استجابةً لطلبات عملائنا المتزايدة، أطلقنا خدمة الحسبة المبدئية الإلكترونية التي تُمكّن كل مستخدم من الحصول على تقدير أولي لقدرته التمويلية بدون الحاجة لزيارة المكتب.",
      "تعتمد الخدمة على إدخال بيانات بسيطة كالراتب والالتزامات الشهرية والعمر لتقديم صورة أولية واضحة عن نطاق التمويل المتاح.",
      "تبقى الحسبة مبدئية وتستلزم مراجعة متخصصة للحصول على قرار نهائي، لكنها تساعد العميل على البدء بتصور واقعي لخياراته.",
    ],
  },
  {
    id: 8,
    title: "نموذج مشروع: شقق سكنية بالبيع على الخارطة في جدة",
    category: "مشاريعنا",
    excerpt: "نستعرض تجربة استثمارية ناجحة عبر منتج البيع على الخارطة في مدينة جدة قبل اكتمال المشروع.",
    date: "١٥ مارس ٢٠٢٥",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=500&fit=crop&auto=format",
    content: [
      "يُمثّل الاستثمار في مشاريع البيع على الخارطة فرصة لتملّك وحدات سكنية بأسعار ما قبل الإنشاء، مما يُتيح هامش ربح محتملاً عند اكتمال المشروع.",
      "في هذا المقال نستعرض تجربة أحد عملائنا الذين أقدموا على شراء شقة في مشروع سكني بجدة في مرحلة الخارطة، وكيف رافقناه طوال مراحل العملية.",
      "تكمن أهمية الاستشارة المتخصصة في هذا النوع من الاستثمار في التحقق من مصداقية المطوّر وضمانات التسليم وشروط العقد بدقة.",
    ],
  },
  {
    id: 9,
    title: "نصائح قبل التقدم لطلب التمويل العقاري",
    category: "رؤى عقارية",
    excerpt: "خطوات عملية تساعدك على تحسين ملفك الائتماني وزيادة فرص قبول طلب التمويل.",
    date: "٢٨ فبراير ٢٠٢٥",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop&auto=format",
    content: [
      "قبل التقدم لطلب التمويل العقاري، ثمة خطوات تحضيرية تزيد من فرص القبول وتُحسّن شروط التمويل المقدمة لك.",
      "أبرز هذه الخطوات: تسوية أي التزامات متأخرة، وتقليل نسبة الاستقطاع الشهري الحالية، والتأكد من استقرار مصدر الدخل لمدة كافية.",
      "كذلك يُنصح بمراجعة سجلك الائتماني لدى شركة سمة مسبقاً والتأكد من خلوّه من أي أخطاء قد تؤثر سلباً على تقييمك.",
    ],
  },
];

function NewsPage({ goTo }: { goTo: (p: Page) => void }) {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filtered = activeCategory === "الكل"
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === activeCategory);

  if (selectedArticle) {
    const related = ARTICLES.filter(
      (a) => a.id !== selectedArticle.id && a.category === selectedArticle.category
    ).slice(0, 3);

    return (
      <>
        <PageHero
          tag={selectedArticle.category}
          title={selectedArticle.title}
          sub={selectedArticle.date}
          img={selectedArticle.img}
          alt={selectedArticle.title}
          onHome={() => goTo("home")}
        />
        <section className="py-10 px-6 max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-[#8899AA] text-xs mb-6">
            <button onClick={() => goTo("home")} className="hover:text-[#0B1B3A] transition-colors">الرئيسية</button>
            <ChevronLeft size={11} className="opacity-40" />
            <button onClick={() => setSelectedArticle(null)} className="hover:text-[#0B1B3A] transition-colors">المركز الإعلامي</button>
            <ChevronLeft size={11} className="opacity-40" />
            <span className="text-[#0B1B3A] truncate max-w-[200px]">{selectedArticle.title}</span>
          </nav>
          <div className="rounded-xl overflow-hidden mb-8 shadow-md">
            <img
              src={selectedArticle.img}
              alt={selectedArticle.title}
              className="w-full h-72 object-cover"
            />
          </div>
          <div className="space-y-4">
            {selectedArticle.content.map((para, i) => (
              <p key={i} className="text-muted-foreground text-base leading-[2]">{para}</p>
            ))}
          </div>

          {related.length > 0 && (
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="text-foreground text-lg mb-4" style={displayFont}>مقالات ذات صلة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => { setSelectedArticle(a); window.scrollTo(0, 0); }}
                    className="text-right group"
                  >
                    <div className="overflow-hidden mb-3 rounded-lg">
                      <img src={a.img} alt={a.title} className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <span className="text-primary text-[10px] tracking-widest uppercase">{a.category}</span>
                    <p className="text-foreground text-sm font-medium mt-1 leading-snug group-hover:text-primary transition-colors">{a.title}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      </>
    );
  }

  return (
    <>
      {/* ① HERO — dark navy */}
      <PageHero
        tag="المركز الإعلامي"
        title="كن علي اطلاع علي آخر الاخبار"
        sub="اكتشف آخر أخبار أسس، وتعرّف على أبرز المستجدات والرؤى في القطاع العقاري السعودي."
        img={INTERIOR_IMG}
        alt="أخبار ورؤى عقارية"
        onHome={() => goTo("home")}
      />

      {/* ② ARTICLES — white */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {NEWS_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 text-sm transition-all duration-200 border ${
                  activeCategory === cat
                    ? "bg-[#0B1B3A] text-white border-[#0B1B3A]"
                    : "bg-white text-[#4B5974] border-gray-200 hover:border-[#D4A843]/50 hover:text-[#0B1B3A]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article) => (
              <article
                key={article.id}
                className="group border border-gray-200 bg-white hover:border-[#D4A843]/40 hover:shadow-md transition-all duration-300 cursor-pointer"
                onClick={() => { setSelectedArticle(article); window.scrollTo(0, 0); }}
              >
                <div className="overflow-hidden aspect-[16/10]">
                  <img src={article.img} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
                <div className="p-6">
                  <span className="text-[#D4A843] text-[10px] tracking-widest uppercase mb-3 block">{article.category}</span>
                  <h3 className="text-[#0B1B3A] text-base font-semibold mb-3 leading-snug group-hover:text-[#D4A843] transition-colors" style={displayFont}>
                    {article.title}
                  </h3>
                  <p className="text-[#4B5974] text-sm leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-[#8899AA] text-xs">{article.date}</span>
                    <span className="text-[#D4A843] text-xs flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                      اقرأ المزيد <ChevronLeft size={12} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-[#4B5974] text-sm">
              لا توجد مقالات في هذا التصنيف حالياً.
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT FORM — reusable component
// ─────────────────────────────────────────────────────────────────────────────
function ContactForm({ initialType = "" }: { initialType?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fields, setFields] = useState({
    name: "", phone: "", email: "", type: initialType, message: "",
  });

  const set = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fields.name.trim()) e.name = "الاسم مطلوب";
    if (!fields.phone.trim()) e.phone = "رقم الجوال مطلوب";
    else if (!/^[\d\s+\-()]{7,15}$/.test(fields.phone)) e.phone = "رقم الجوال غير صحيح";
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "البريد الإلكتروني غير صحيح";
    if (!fields.type) e.type = "نوع الاستفسار مطلوب";
    if (!fields.message.trim()) e.message = "الرسالة مطلوبة";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const inputBase = "w-full bg-white border px-4 py-3 text-sm focus:outline-none transition-colors text-[#0B1B3A] placeholder:text-[#6B7A8D]/50";
  const inp = (k: keyof typeof fields) => `${inputBase} ${errors[k] ? "border-red-500/60" : "border-border focus:border-primary"}`;

  if (submitted) return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
      <CheckCircle size={48} className="text-primary" />
      <h3 className="text-xl text-foreground" style={displayFont}>تم إرسال طلبك بنجاح</h3>
      <p className="text-muted-foreground text-sm max-w-xs">سيتم التعامل مع بياناتك بسرية والتواصل معك في أقرب وقت ممكن.</p>
      <button onClick={() => { setSubmitted(false); setFields({ name:"", phone:"", email:"", type:"", message:"" }); }} className="mt-2 text-primary text-sm underline underline-offset-4">إرسال طلب جديد</button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-muted-foreground mb-2 tracking-wide">الاسم <span className="text-primary">*</span></label>
          <input type="text" value={fields.name} onChange={set("name")} placeholder="محمد العمري" className={inp("name")} />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-2 tracking-wide">رقم الجوال <span className="text-primary">*</span></label>
          <input type="tel" value={fields.phone} onChange={set("phone")} placeholder="05XXXXXXXX" className={inp("phone")} dir="ltr" />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <label className="block text-xs text-muted-foreground mb-2 tracking-wide">البريد الإلكتروني <span className="text-muted-foreground/50">(اختياري)</span></label>
        <input type="email" value={fields.email} onChange={set("email")} placeholder="example@email.com" className={inp("email")} dir="ltr" />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-xs text-muted-foreground mb-2 tracking-wide">نوع الاستفسار <span className="text-primary">*</span></label>
        <select value={fields.type} onChange={set("type")} className={inp("type") + " appearance-none cursor-pointer"}>
          <option value="" disabled>اختر نوع الاستفسار</option>
          {["استفسار عام","استفسار عن المنتجات","طلب حسبة تمويلية","استفسار عن مشروع","استفسار عن فرع","أخرى"].map((o) => <option key={o}>{o}</option>)}
        </select>
        {errors.type && <p className="text-red-400 text-xs mt-1">{errors.type}</p>}
      </div>
      <div>
        <label className="block text-xs text-muted-foreground mb-2 tracking-wide">الرسالة <span className="text-primary">*</span></label>
        <textarea rows={4} value={fields.message} onChange={set("message")} placeholder="اكتب استفساركم هنا..." className={inp("message") + " resize-none"} />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/85 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? <><span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />جاري الإرسال...</> : "إرسال الطلب"}
      </button>
      <p className="text-muted-foreground text-xs text-center leading-relaxed">سيتم التعامل مع بياناتك بسرية والتواصل معك في أقرب وقت ممكن.</p>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BRANCHES DATA
// ─────────────────────────────────────────────────────────────────────────────
const BRANCHES = [
  { id: 0, name: "المقر الرئيسي", city: "الرياض", district: "حي العليا", street: "طريق الملك فهد", phone: "9200XXXXX", hours: "الأحد – الخميس، 9:00 ص – 5:00 م", lat: 24.7136, lng: 46.6753, mapsUrl: "https://maps.google.com/?q=24.7136,46.6753" },
  { id: 1, name: "فرع جدة",      city: "جدة",    district: "حي الروضة",   street: "شارع الأمير محمد بن عبدالعزيز", phone: "9200XXXXX", hours: "الأحد – الخميس، 9:00 ص – 5:00 م", lat: 21.5433, lng: 39.1728, mapsUrl: "https://maps.google.com/?q=21.5433,39.1728" },
  { id: 2, name: "فرع الدمام",   city: "الدمام",  district: "حي الشاطئ",   street: "طريق الملك عبدالعزيز",           phone: "9200XXXXX", hours: "الأحد – الخميس، 9:00 ص – 5:00 م", lat: 26.4207, lng: 50.0888, mapsUrl: "https://maps.google.com/?q=26.4207,50.0888" },
  { id: 3, name: "فرع مكة",     city: "مكة المكرمة", district: "حي العزيزية", street: "شارع إبراهيم الخليل",          phone: "9200XXXXX", hours: "الأحد – الخميس، 9:00 ص – 5:00 م", lat: 21.3891, lng: 39.8579, mapsUrl: "https://maps.google.com/?q=21.3891,39.8579" },
  { id: 4, name: "فرع المدينة المنورة", city: "المدينة المنورة", district: "حي قربان", street: "طريق الملك عبدالله",   phone: "9200XXXXX", hours: "الأحد – الخميس، 9:00 ص – 5:00 م", lat: 24.4672, lng: 39.6024, mapsUrl: "https://maps.google.com/?q=24.4672,39.6024" },
];

const SOCIAL_LINKS = [
  { label: "سناب شات", href: "#", d: "M12.206 1c-2.036 0-5.538 1.068-5.538 5.357v1.52l-1.312.024c-.312 0-.626.14-.626.5s.234.616.626.616l1.312.024v.996c0 .26-.364 1.272-.91 2.296-.312.596-.624 1.084-.91 1.46-.286.376-.572.56-.858.56-.244 0-.374-.072-.556-.072-.208 0-.39.16-.39.392 0 .288.182.516.39.64.494.284 1.326.468 2.216.668.208.048.338.12.338.304 0 .208-.182.48-.182.736 0 .284.26.548.676.548.286 0 .546-.128.858-.128.338 0 .754.176 1.326.472.598.312 1.3.792 2.21.792.91 0 1.612-.48 2.21-.792.572-.296.988-.472 1.326-.472.312 0 .572.128.858.128.416 0 .676-.264.676-.548 0-.256-.182-.528-.182-.736 0-.184.13-.256.338-.304.89-.2 1.722-.384 2.216-.668.208-.124.39-.352.39-.64 0-.232-.182-.392-.39-.392-.182 0-.312.072-.556.072-.286 0-.572-.184-.858-.56-.286-.376-.598-.864-.91-1.46-.546-1.024-.91-2.036-.91-2.296v-.996l1.312-.024c.392 0 .626-.256.626-.616s-.314-.5-.626-.5l-1.312-.024v-1.52C17.744 2.068 14.242 1 12.206 1z" },
  { label: "تيك توك",   href: "#", d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.77a4.85 4.85 0 01-1-.08z" },
  { label: "إنستغرام",  href: "#", d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  { label: "تويتر / X", href: "#", d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
];

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT PAGE
// ─────────────────────────────────────────────────────────────────────────────
function ContactPage({ goTo }: { goTo: (p: Page) => void }) {
  const [openBranch, setOpenBranch] = useState<number>(0);
  const activeBranch = BRANCHES[openBranch];

  return (
    <>
      <PageHero
        tag="تواصل معنا"
        title="لديك استفسار؟ لنبدأ من هنا."
        sub="أخبرنا بطبيعة احتياجك وسيتواصل معك أحد مستشارينا في أقرب وقت ممكن."
        img={POOL_IMG}
        alt="تواصل معنا"
        onHome={() => goTo("home")}
      />

      {/* ── Two-column contact section ── */}
      <section className="py-10 md:py-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* RIGHT — Form */}
          <div>
            <GoldLine />
            <p className="text-primary text-xs tracking-widest uppercase mb-3">راسلنا</p>
            <h2 className="text-2xl text-foreground mb-4" style={displayFont}>أرسل استفسارك</h2>
            <ContactForm />
          </div>

          {/* LEFT — Contact info */}
          <div className="flex flex-col gap-8">
            <div>
              <GoldLine />
              <p className="text-primary text-xs tracking-widest uppercase mb-3">معلومات التواصل</p>
              <h2 className="text-2xl text-foreground mb-4" style={displayFont}>تواصل معنا مباشرة</h2>
            </div>

            {/* Working hours */}
            <div className="flex gap-4 p-6 border border-border bg-card">
              <div className="text-primary mt-0.5 flex-shrink-0"><FileText size={18} /></div>
              <div>
                <div className="text-sm font-medium text-foreground mb-1">أوقات العمل</div>
                <div className="text-muted-foreground text-xs">الأحد – الخميس</div>
                <div className="text-muted-foreground text-xs">9:00 صباحًا – 5:00 مساءً</div>
              </div>
            </div>

            {/* Location */}
            <div className="flex gap-4 p-6 border border-border bg-card">
              <div className="text-primary mt-0.5 flex-shrink-0"><MapPin size={18} /></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground mb-1">الموقع الرئيسي</div>
                <div className="text-muted-foreground text-xs mb-0.5">المقر الرئيسي — الرياض</div>
                <div className="text-muted-foreground text-xs mb-0.5">{BRANCHES[0].district}، {BRANCHES[0].street}</div>
                <a href={BRANCHES[0].mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary text-xs mt-2 hover:underline">
                  عرض الموقع على الخريطة <ChevronLeft size={11} />
                </a>
              </div>
            </div>

            {/* Email */}
            <a href="mailto:info@example.com" className="flex gap-4 p-6 border border-border bg-card hover:border-primary/40 transition-colors group">
              <div className="text-primary mt-0.5 flex-shrink-0"><Mail size={18} /></div>
              <div>
                <div className="text-sm font-medium text-foreground mb-1 group-hover:text-primary transition-colors">البريد الإلكتروني</div>
                <div className="text-muted-foreground text-xs" dir="ltr">info@example.com</div>
              </div>
            </a>

            {/* Phone */}
            <a href="tel:9200XXXXX" className="flex gap-4 p-6 border border-border bg-card hover:border-primary/40 transition-colors group">
              <div className="text-primary mt-0.5 flex-shrink-0"><Phone size={18} /></div>
              <div>
                <div className="text-sm font-medium text-foreground mb-1 group-hover:text-primary transition-colors">الرقم الموحد</div>
                <div className="text-muted-foreground text-xs" dir="ltr">9200XXXXX</div>
              </div>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer" className="flex gap-4 p-6 border border-border bg-card hover:border-primary/40 transition-colors group">
              <div className="text-primary mt-0.5 flex-shrink-0"><MessageCircle size={18} /></div>
              <div>
                <div className="text-sm font-medium text-foreground mb-1 group-hover:text-primary transition-colors">واتساب</div>
                <div className="text-muted-foreground text-xs">تواصل معنا عبر واتساب</div>
              </div>
            </a>

            {/* Social */}
            <div className="p-6 border border-border bg-card">
              <div className="text-sm font-medium text-foreground mb-4">تابعنا على مواقع التواصل</div>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(({ label, href, d }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-200">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={d} /></svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Branches section — white ── */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeadLight
            tag="فروعنا"
            title="فروعنا في جميع أنحاء المملكة"
            sub="نخدمك من خلال شبكة فروعنا المنتشرة في مختلف مناطق المملكة."
          />

          {/* Map embed */}
          <div className="w-full h-72 md:h-96 border border-gray-200 overflow-hidden mb-6 bg-gray-50">
            <iframe
              title="خريطة الفروع"
              src={`https://maps.google.com/maps?q=${activeBranch.lat},${activeBranch.lng}&z=14&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Branch accordion */}
          <div className="divide-y divide-gray-100 border border-gray-200">
            {BRANCHES.map((branch, idx) => (
              <div key={branch.id}>
                <button
                  onClick={() => setOpenBranch(openBranch === idx ? -1 : idx)}
                  className="w-full flex items-center justify-between px-6 py-4 text-right hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <MapPin size={15} className="text-[#D4A843] flex-shrink-0" />
                    <span className={`text-sm font-medium transition-colors ${openBranch === idx ? "text-[#D4A843]" : "text-[#0B1B3A] group-hover:text-[#D4A843]"}`}>
                      {branch.name}
                    </span>
                    <span className="text-[#4B5974] text-xs">{branch.city}</span>
                  </div>
                  <ChevronDown
                    size={15}
                    className={`text-gray-400 transition-transform duration-200 ${openBranch === idx ? "rotate-180 text-[#D4A843]" : ""}`}
                  />
                </button>
                {openBranch === idx && (
                  <div className="px-6 pb-6 pt-2 bg-gray-50">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                      <div>
                        <div className="text-[#8899AA] text-xs uppercase tracking-wide mb-1">الموقع</div>
                        <div className="text-[#0B1B3A] text-sm">{branch.district}، {branch.street}</div>
                      </div>
                      <div>
                        <div className="text-[#8899AA] text-xs uppercase tracking-wide mb-1">رقم الفرع</div>
                        <div className="text-[#0B1B3A] text-sm" dir="ltr">{branch.phone}</div>
                      </div>
                      <div>
                        <div className="text-[#8899AA] text-xs uppercase tracking-wide mb-1">أوقات العمل</div>
                        <div className="text-[#0B1B3A] text-sm">{branch.hours}</div>
                      </div>
                    </div>
                    <a
                      href={branch.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 border border-[#D4A843] text-[#D4A843] text-xs hover:bg-[#D4A843] hover:text-[#0B1B3A] transition-all duration-200"
                    >
                      <MapPin size={12} />
                      الاتجاهات
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT FAB
// ─────────────────────────────────────────────────────────────────────────────
function ContactFAB({ goTo }: { goTo: (p: Page) => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Ordered bottom-to-top (index 0 = closest to FAB, appears first on open)
  const actions = [
    {
      label: "تواصل معنا",
      ariaLabel: "تواصل معنا",
      Icon: Mail,
      onClick: () => { goTo("contact"); setOpen(false); },
    },
    {
      label: "واتساب",
      ariaLabel: "واتساب",
      Icon: MessageCircle,
      onClick: () => { window.open("https://wa.me/966500000000", "_blank", "noopener,noreferrer"); setOpen(false); },
    },
    {
      label: "اتصل بنا",
      ariaLabel: "اتصل بنا",
      Icon: Phone,
      onClick: () => { window.open("tel:+966500000000"); setOpen(false); },
    },
  ] as const;

  return (
    <>
      {/* Click-outside backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Speed-dial shell — anchored bottom-right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-start gap-3">

        {/* ── Main FAB ── */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "إغلاق" : "تواصل معنا"}
          aria-expanded={open}
          aria-haspopup="true"
          className="relative w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A843] focus-visible:ring-offset-2 transition-all duration-300"
          style={{
            boxShadow: open
              ? "0 6px 28px rgba(212,168,67,0.28), 0 2px 8px rgba(11,27,58,0.12)"
              : "0 4px 20px rgba(11,27,58,0.18), 0 1px 4px rgba(11,27,58,0.08)",
            borderColor: open ? "rgba(212,168,67,0.5)" : undefined,
          }}
        >
          {/* Logo — shown when closed */}
          <span
            className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{
              opacity: open ? 0 : 1,
              transform: open ? "scale(0.65) rotate(90deg)" : "scale(1) rotate(0deg)",
            }}
          >
            <img src={fabLogoImg} alt="أسس" className="w-9 h-9 object-contain" />
          </span>
          {/* X — shown when open */}
          <span
            className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "scale(1) rotate(0deg)" : "scale(0.65) rotate(-90deg)",
            }}
          >
            <X size={20} className="text-[#0B1B3A]" />
          </span>
        </button>

        {/* ── Action items ── rendered after FAB → appear above (flex-col-reverse) */}
        {actions.map(({ label, ariaLabel, Icon, onClick }, i) => (
          <div
            key={label}
            className="flex flex-row-reverse items-center gap-2.5"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0) scale(1)" : "translateY(10px) scale(0.94)",
              pointerEvents: open ? "auto" : "none",
              transition: "opacity 0.25s ease, transform 0.25s ease",
              transitionDelay: open ? `${i * 58}ms` : "0ms",
            }}
          >
            {/* Circle icon button — stays on the right (near edge) */}
            <button
              onClick={onClick}
              aria-label={ariaLabel}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#0B1B3A] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A843] active:scale-95"
              style={{ boxShadow: "0 2px 10px rgba(11,27,58,0.12)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#D4A843";
                (e.currentTarget as HTMLButtonElement).style.color = "#D4A843";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(212,168,67,0.22)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "";
                (e.currentTarget as HTMLButtonElement).style.color = "";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 10px rgba(11,27,58,0.12)";
              }}
            >
              <Icon size={18} />
            </button>
            {/* Label pill — appears to the left of the icon */}
            <div
              className="bg-white border border-gray-100 px-4 py-2 text-sm text-[#0B1B3A] whitespace-nowrap font-medium"
              style={{
                boxShadow: "0 2px 12px rgba(11,27,58,0.10)",
                ...displayFont,
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INTEREST MODAL
// ─────────────────────────────────────────────────────────────────────────────
function InterestModal({
  open, onClose, project, defaultUnit,
}: {
  open: boolean; onClose: () => void;
  project: Project; defaultUnit?: Unit | null;
}) {
  const projectUnits = UNITS.filter((u) => u.projectId === project.id && u.status === "available");
  const [fields, setFields] = useState({ name: "", phone: "", unitId: defaultUnit?.unitId ?? "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) { setFields((f) => ({ ...f, unitId: defaultUnit?.unitId ?? "" })); setSubmitted(false); setErrors({}); }
  }, [open, defaultUnit]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fields.name.trim()) e.name = "الاسم مطلوب";
    if (!fields.phone.trim()) e.phone = "رقم الهاتف مطلوب";
    else if (!/^[\d\s+\-()]{7,15}$/.test(fields.phone)) e.phone = "رقم الهاتف غير صحيح";
    if (!consent) e.consent = "يجب الموافقة على الشروط";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(); setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false); setSubmitted(true);
  };

  if (!open) return null;

  const inp = (k: string) =>
    `w-full bg-white border px-4 py-3 text-sm focus:outline-none transition-colors text-[#0B1B3A] placeholder:text-[#8899AA]/50 ${errors[k] ? "border-red-400" : "border-gray-200 focus:border-[#D4A843]"}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={onClose}>
      <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg text-[#0B1B3A]" style={displayFont}>طلب اهتمام بالمشروع</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
        </div>
        {submitted ? (
          <div className="flex flex-col items-center py-12 text-center gap-4 px-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
              <CheckCircle size={32} className="text-emerald-600" />
            </div>
            <h3 className="text-lg text-[#0B1B3A]" style={displayFont}>تم استلام طلبك بنجاح</h3>
            <p className="text-[#4B5974] text-sm leading-relaxed">سيتواصل معك فريقنا قريباً.</p>
            <button onClick={onClose} className="mt-2 px-6 py-2 bg-[#D4A843] text-white text-sm hover:bg-[#C49733] transition-colors">إغلاق</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">
            <p className="text-[#4B5974] text-sm leading-relaxed -mt-1">سجّل بياناتك وسيتواصل معك فريقنا لمساعدتك ومعرفة الوحدات المتاحة.</p>
            {/* Project (read-only) */}
            <div>
              <label className="block text-xs text-[#8899AA] mb-2">المشروع</label>
              <div className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-[#0B1B3A]">{project.name}</div>
            </div>
            {/* Unit selector */}
            {projectUnits.length > 0 && (
              <div>
                <label className="block text-xs text-[#4B5974] mb-2">الوحدة <span className="text-[#8899AA]">(اختياري)</span></label>
                <select value={fields.unitId} onChange={(e) => setFields((f) => ({ ...f, unitId: e.target.value }))}
                  className="w-full bg-white border border-gray-200 focus:border-[#D4A843] px-4 py-3 text-sm focus:outline-none text-[#0B1B3A] appearance-none cursor-pointer">
                  <option value="">اختر وحدة (اختياري)</option>
                  {projectUnits.map((u) => (
                    <option key={u.unitId} value={u.unitId}>وحدة {u.unitNumber} — {u.unitType} · {u.area} م²</option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="block text-xs text-[#4B5974] mb-2">الاسم <span className="text-[#D4A843]">*</span></label>
              <input type="text" value={fields.name} onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))} placeholder="محمد العمري" className={inp("name")} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-xs text-[#4B5974] mb-2">رقم الهاتف <span className="text-[#D4A843]">*</span></label>
              <input type="tel" value={fields.phone} onChange={(e) => setFields((f) => ({ ...f, phone: e.target.value }))} placeholder="05XXXXXXXX" dir="ltr" className={inp("phone")} />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#D4A843]" />
                <span className="text-xs text-[#4B5974] leading-relaxed">
                  أوافق على <span className="text-[#D4A843]">الشروط والأحكام وسياسة الخصوصية</span>.
                  {" "}يُعدّ هذا الطلب استفساراً عن المشروع وليس حجزاً رسمياً.
                </span>
              </label>
              {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent}</p>}
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-4 bg-[#D4A843] text-white text-sm font-medium hover:bg-[#C49733] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />جاري الإرسال...</> : "إرسال الطلب"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIT DETAIL MODAL
// ─────────────────────────────────────────────────────────────────────────────
// ─── UNIT IMAGE CARD ─────────────────────────────────────────────────────────
function UnitImageCard({
  unit, imgSrc, onDetail,
}: {
  unit: Unit;
  imgSrc: string;
  onDetail: (u: Unit) => void;
}) {
  const isSold = unit.status === "sold";
  return (
    <div
      className="relative overflow-hidden rounded-2xl cursor-pointer group aspect-[4/3] select-none"
      onClick={() => onDetail(unit)}
    >
      {/* Image */}
      <img
        src={imgSrc}
        alt={`وحدة ${unit.unitNumber}`}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06] ${isSold ? "grayscale-[40%]" : ""}`}
      />
      {/* Always-on gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      {/* Hover dark overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Status badge — top right */}
      <div className="absolute top-3 right-3 z-10">
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${
          unit.status === "available" ? "bg-emerald-500/90 text-white" :
          unit.status === "reserved"  ? "bg-amber-500/90 text-white" :
                                        "bg-black/60 text-white/80"
        }`}>
          {UNIT_STATUS_LABEL[unit.status]}
        </span>
      </div>

      {/* Bottom info — always visible */}
      <div className="absolute bottom-0 inset-x-0 p-4 z-10">
        <p className="text-white/60 text-[11px] mb-0.5">{unit.unitType}</p>
        <p className="text-white font-bold text-lg leading-tight" style={displayFont}>وحدة {unit.unitNumber}</p>
        <p className="text-white/50 text-xs mt-1">{unit.bedrooms} غرف · {unit.area} م²</p>
      </div>

      {/* Desktop CTA — on hover, centered */}
      {!isSold && (
        <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <span className="px-5 py-2.5 bg-[#D4A843] text-[#0B1B3A] text-sm font-bold rounded-xl shadow-lg">
            عرض التفاصيل
          </span>
        </div>
      )}

      {/* Mobile CTA — always visible bottom-left */}
      {!isSold && (
        <div className="absolute bottom-4 left-4 md:hidden z-10">
          <span className="px-3 py-1.5 bg-[#D4A843] text-[#0B1B3A] text-xs font-bold rounded-lg shadow">
            عرض التفاصيل
          </span>
        </div>
      )}
    </div>
  );
}

// ─── UNIT DETAIL MODAL ───────────────────────────────────────────────────────
function UnitDetailModal({
  unit, project, open, onClose,
}: {
  unit: Unit | null; project: Project; open: boolean; onClose: () => void; onInterest?: (u: Unit) => void;
}) {
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [formFields, setFormFields] = useState({ name: "", phone: "", email: "", notes: "" });
  const [formSent, setFormSent] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const touchX = useRef(0);

  // Body scroll lock
  useEffect(() => {
    if (open) { document.body.style.overflow = "hidden"; }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Reset gallery + form when unit changes
  useEffect(() => { setGalleryIdx(0); setFormSent(false); setFormFields({ name: "", phone: "", email: "", notes: "" }); }, [unit]);

  if (!open || !unit) return null;

  const imgs = project.gallery.length > 0 ? project.gallery : ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&h=600&fit=crop"];
  const total = imgs.length;
  const prev = () => setGalleryIdx((i) => (i - 1 + total) % total);
  const next = () => setGalleryIdx((i) => (i + 1) % total);

  const setField = (k: keyof typeof formFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormFields((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.name.trim() || !formFields.phone.trim()) return;
    setFormLoading(true);
    setTimeout(() => { setFormLoading(false); setFormSent(true); }, 1200);
  };

  const inpCls = "w-full bg-[#F7F4EF] border border-[#D4A843]/20 px-3 py-2.5 text-sm text-[#0B1B3A] placeholder:text-[#8899AA]/60 focus:outline-none focus:border-[#D4A843] rounded-lg";

  const infoRow = (label: string, value: string | number) => (
    <div key={String(label)} className="flex justify-between items-center border-b border-gray-100 py-2.5 last:border-0">
      <span className="text-xs text-[#8899AA]">{label}</span>
      <span className="text-xs font-medium text-[#0B1B3A] text-left">{value}</span>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/75 p-0 md:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:max-w-5xl md:rounded-2xl shadow-2xl flex flex-col max-h-[95vh] md:max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Modal header bar ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <p className="text-xs text-[#8899AA]">{unit.unitType} · {project.name}</p>
            <h2 className="text-lg text-[#0B1B3A] font-semibold leading-tight" style={displayFont}>
              وحدة {unit.unitNumber}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${UNIT_STATUS_CLR[unit.status]}`}>
              {UNIT_STATUS_LABEL[unit.status]}
            </span>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-gray-500">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1 min-h-0">

          {/* ── Image Gallery ── */}
          <div className="relative select-none bg-black">
            {/* Main image */}
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "16/7" }}
              onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                const diff = touchX.current - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
              }}
            >
              <img
                src={imgs[galleryIdx]}
                alt={`وحدة ${unit.unitNumber} — صورة ${galleryIdx + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
                key={galleryIdx}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
              {/* Counter */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                {galleryIdx + 1} / {total}
              </div>
            </div>

            {/* Nav arrows */}
            {total > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
                <button
                  onClick={next}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
              </>
            )}

            {/* Thumbnails */}
            {total > 1 && (
              <div className="flex items-center gap-2 p-3 bg-black/80 overflow-x-auto scrollbar-none">
                {imgs.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setGalleryIdx(i)}
                    className={`flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden transition-all duration-200 ${
                      i === galleryIdx ? "ring-2 ring-[#D4A843] opacity-100" : "opacity-40 hover:opacity-70"
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Two-column content ── */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-0 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-gray-100">

            {/* ── Right: Unit details ── */}
            <div className="p-6 space-y-6">

              {/* Quick metrics */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "المساحة", value: unit.area, unit: "م²" },
                  { label: "الغرف", value: unit.bedrooms, unit: "غرف" },
                  { label: "دورات المياه", value: unit.bathrooms, unit: "" },
                  { label: "المواقف", value: unit.parkingSpaces, unit: "" },
                ].map((m) => (
                  <div key={m.label} className="bg-[#F7F4EF] rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-[#0B1B3A]" style={displayFont}>{m.value}</p>
                    <p className="text-[10px] text-[#8899AA] mt-0.5">{m.label}</p>
                    {m.unit && <p className="text-[10px] text-[#D4A843]">{m.unit}</p>}
                  </div>
                ))}
              </div>

              {/* Unit info */}
              <div>
                <h3 className="text-sm font-semibold text-[#0B1B3A] mb-3" style={displayFont}>معلومات الوحدة</h3>
                <div className="bg-[#F7F4EF] rounded-xl px-4 py-1">
                  {infoRow("اسم الوحدة", `وحدة ${unit.unitNumber}`)}
                  {infoRow("رقم الوحدة", unit.unitNumber)}
                  {infoRow("نوع الوحدة", unit.unitType)}
                  {infoRow("الدور", unit.floor === 0 ? "الأرضي" : `الدور ${unit.floor}`)}
                  {infoRow("عدد الغرف", `${unit.bedrooms} غرف`)}
                  {infoRow("الحالة", UNIT_STATUS_LABEL[unit.status])}
                </div>
              </div>

              {/* Project info */}
              <div>
                <h3 className="text-sm font-semibold text-[#0B1B3A] mb-3" style={displayFont}>معلومات المشروع</h3>
                <div className="bg-[#F7F4EF] rounded-xl px-4 py-1">
                  {infoRow("اسم المشروع", project.name)}
                  {infoRow("نوع المنشأ", PROP_LABEL[project.propertyType])}
                  {infoRow("نوع المنتج", PROD_LABEL[project.productType])}
                  {infoRow("حالة المشروع", STATUS_LABEL[project.status])}
                  {infoRow("الموقع", `${project.city} · ${project.region}`)}
                </div>
              </div>

              {/* Area details */}
              <div>
                <h3 className="text-sm font-semibold text-[#0B1B3A] mb-3" style={displayFont}>تفاصيل المساحة</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "مساحة الوحدة", value: `${unit.area} م²` },
                    { label: "المساحة الإضافية", value: "—" },
                    { label: "المساحة الإجمالية", value: `${unit.area} م²` },
                  ].map((m) => (
                    <div key={m.label} className="bg-[#F7F4EF] rounded-xl p-4 text-center">
                      <p className="text-base font-bold text-[#0B1B3A]" style={displayFont}>{m.value}</p>
                      <p className="text-[10px] text-[#8899AA] mt-1 leading-snug">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              {unit.description && (
                <div>
                  <h3 className="text-sm font-semibold text-[#0B1B3A] mb-2" style={displayFont}>وصف الوحدة</h3>
                  <p className="text-sm text-[#4B5974] leading-relaxed">{unit.description}</p>
                </div>
              )}

              {/* Floor plan button */}
              <div className="border border-[#D4A843]/25 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-[#D4A843]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText size={18} className="text-[#D4A843]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0B1B3A]">مخطط الوحدة</p>
                  <p className="text-xs text-[#8899AA] mt-0.5">سيتوفر مخطط الوحدة قريباً</p>
                </div>
                <button className="flex-shrink-0 text-xs border border-[#D4A843]/40 text-[#D4A843] px-3 py-1.5 rounded-lg hover:bg-[#D4A843]/5 transition-colors">
                  عرض المخطط
                </button>
              </div>

            </div>

            {/* ── Left: Price + Interest form ── */}
            <div className="p-6 flex flex-col gap-6 bg-white">

              {/* Price block */}
              <div className="bg-[#0B1B3A] rounded-2xl p-5">
                <p className="text-white/55 text-xs mb-1">السعر</p>
                {unit.price > 0 ? (
                  <p className="text-[#D4A843] text-2xl font-bold leading-tight" style={displayFont}>
                    {unit.price.toLocaleString("ar-SA")}
                    <span className="text-base font-normal text-white/50 mr-1">ريال</span>
                  </p>
                ) : (
                  <p className="text-white text-lg font-medium">السعر عند الطلب</p>
                )}
              </div>

              <div className="h-px bg-gray-100" />

              {/* Interest form */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-[#0B1B3A] mb-4" style={displayFont}>طلب الاهتمام</h3>

                {formSent ? (
                  <div className="flex flex-col items-center text-center py-8 gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      <CheckCircle size={22} className="text-emerald-600" />
                    </div>
                    <p className="text-[#0B1B3A] font-medium text-sm">تم إرسال طلبك بنجاح</p>
                    <p className="text-[#8899AA] text-xs leading-relaxed">
                      سيتواصل معك فريقنا قريباً بخصوص وحدة {unit.unitNumber} في مشروع {project.name}.
                    </p>
                    <button onClick={() => setFormSent(false)} className="text-[#D4A843] text-xs border-b border-[#D4A843]/30 pb-0.5 hover:border-[#D4A843] transition-colors mt-2">
                      إرسال طلب آخر
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Hidden metadata */}
                    <input type="hidden" value={project.name} />
                    <input type="hidden" value={unit.unitNumber} />

                    <div>
                      <label className="block text-xs text-[#8899AA] mb-1.5">الاسم الكامل <span className="text-[#D4A843]">*</span></label>
                      <input
                        type="text"
                        value={formFields.name}
                        onChange={setField("name")}
                        placeholder="محمد العمري"
                        required
                        className={inpCls}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#8899AA] mb-1.5">رقم الجوال <span className="text-[#D4A843]">*</span></label>
                      <input
                        type="tel"
                        value={formFields.phone}
                        onChange={setField("phone")}
                        placeholder="05xxxxxxxx"
                        required
                        dir="ltr"
                        className={inpCls}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#8899AA] mb-1.5">البريد الإلكتروني <span className="text-[#8899AA]/60 font-normal">(اختياري)</span></label>
                      <input
                        type="email"
                        value={formFields.email}
                        onChange={setField("email")}
                        placeholder="example@email.com"
                        dir="ltr"
                        className={inpCls}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#8899AA] mb-1.5">ملاحظات <span className="text-[#8899AA]/60 font-normal">(اختياري)</span></label>
                      <textarea
                        value={formFields.notes}
                        onChange={setField("notes")}
                        placeholder="أي استفسار أو ملاحظة..."
                        rows={3}
                        className={`${inpCls} resize-none`}
                      />
                    </div>

                    {/* Associated info display */}
                    <div className="bg-[#F7F4EF] rounded-xl p-3 text-xs text-[#6B7A8D] space-y-1">
                      <p className="flex justify-between"><span>المشروع</span><span className="text-[#0B1B3A] font-medium">{project.name}</span></p>
                      <p className="flex justify-between"><span>رقم الوحدة</span><span className="text-[#0B1B3A] font-medium">{unit.unitNumber}</span></p>
                      <p className="flex justify-between"><span>نوع الوحدة</span><span className="text-[#0B1B3A] font-medium">{unit.unitType}</span></p>
                    </div>

                    <button
                      type="submit"
                      disabled={formLoading || !formFields.name.trim() || !formFields.phone.trim()}
                      className="w-full py-3 bg-[#D4A843] text-[#0B1B3A] text-sm font-bold rounded-xl hover:bg-[#C49733] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {formLoading ? (
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : "إرسال طلب الاهتمام"}
                    </button>

                    <p className="text-[10px] text-[#8899AA] text-center leading-relaxed">
                      بالإرسال، أنت توافق على{" "}
                      <span className="text-[#D4A843] cursor-pointer">سياسة الخصوصية</span>
                      {" "}وشروط الاستخدام.
                    </p>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OFF-PLAN UNITS SECTION
// ─────────────────────────────────────────────────────────────────────────────
type UnitView = "grid" | "list" | "compact";

function OffPlanUnits({
  project, units, onDetail, onInterest,
}: {
  project: Project; units: Unit[];
  onDetail: (u: Unit) => void; onInterest: (u: Unit) => void;
}) {
  const [search, setSearch] = useState("");
  const [building, setBuilding] = useState("");
  const [floorF, setFloorF] = useState("");
  const [statusF, setStatusF] = useState("");
  const [sort, setSort] = useState("");
  const [view, setView] = useState<UnitView>("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const buildings = [...new Set(units.map((u) => u.building))];
  const floors = [...new Set(units.map((u) => u.floor))].sort((a, b) => a - b);

  const filtered = units
    .filter((u) => {
      if (search && !u.unitNumber.toLowerCase().includes(search.toLowerCase())) return false;
      if (building && u.building !== building) return false;
      if (floorF && u.floor !== Number(floorF)) return false;
      if (statusF && u.status !== statusF) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "area-asc") return a.area - b.area;
      if (sort === "area-desc") return b.area - a.area;
      if (sort === "unit") return a.unitNumber.localeCompare(b.unitNumber, "ar");
      const so: Record<Unit["status"], number> = { available: 0, reserved: 1, sold: 2 };
      return so[a.status] - so[b.status];
    });

  const clearFilters = () => { setSearch(""); setBuilding(""); setFloorF(""); setStatusF(""); setSort(""); };
  const hasFilters = search || building || floorF || statusF || sort;

  const selectCls = "bg-white border border-gray-200 px-3 py-2 text-sm text-[#0B1B3A] focus:outline-none focus:border-[#D4A843] appearance-none cursor-pointer min-w-0";

  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Filters bar */}
        <div className="border border-gray-100 bg-[#F7F4EF] mb-6">
          {/* Mobile toggle */}
          <button className="md:hidden w-full flex items-center justify-between px-4 py-4 text-sm text-[#0B1B3A]"
            onClick={() => setFiltersOpen((o) => !o)}>
            <span>البحث والتصفية</span>
            <ChevronDown size={16} className={`text-[#D4A843] transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
          </button>

          <div className={`${filtersOpen ? "block" : "hidden"} md:block px-4 pb-4 pt-0 md:pt-4`}>
            <div className="flex flex-wrap gap-3">
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث برقم الوحدة"
                className="bg-white border border-gray-200 px-3 py-2 text-sm text-[#0B1B3A] placeholder:text-[#8899AA]/60 focus:outline-none focus:border-[#D4A843] w-full sm:w-48" />
              {buildings.length > 1 && (
                <select value={building} onChange={(e) => setBuilding(e.target.value)} className={selectCls}>
                  <option value="">جميع المباني</option>
                  {buildings.map((b) => <option key={b} value={b}>المبنى {b}</option>)}
                </select>
              )}
              <select value={floorF} onChange={(e) => setFloorF(e.target.value)} className={selectCls}>
                <option value="">جميع الأدوار</option>
                {floors.map((f) => <option key={f} value={f}>الدور {f}</option>)}
              </select>
              <select value={statusF} onChange={(e) => setStatusF(e.target.value)} className={selectCls}>
                <option value="">جميع الحالات</option>
                <option value="available">متاح</option>
                <option value="reserved">محجوز</option>
                <option value="sold">مباع</option>
              </select>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className={selectCls}>
                <option value="">ترتيب حسب الحالة</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="area-asc">المساحة: من الأصغر</option>
                <option value="area-desc">المساحة: من الأكبر</option>
                <option value="unit">رقم الوحدة</option>
              </select>
              {hasFilters && (
                <button onClick={clearFilters} className="px-3 py-2 text-sm text-[#D4A843] border border-[#D4A843]/30 hover:bg-[#D4A843]/5 transition-colors">مسح الفلاتر</button>
              )}
            </div>
          </div>
        </div>

        {/* Results bar + view switcher */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-[#8899AA]">
            {filtered.length} وحدة تطابق خيارات البحث
          </span>
          <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
            {([
              ["compact", <Minus size={15} />],
              ["list",    <List size={15} />],
              ["grid",    <LayoutGrid size={15} />],
            ] as [UnitView, React.ReactNode][]).map(([v, icon]) => (
              <button key={v} onClick={() => setView(v)} title={v}
                className={`px-3 py-2 transition-colors ${view === v ? "bg-[#D4A843] text-[#0B1B3A]" : "text-[#8899AA] hover:text-[#0B1B3A]"}`}>
                {icon}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center gap-4 border border-gray-100">
            <p className="text-[#8899AA]">لم نجد وحدات مطابقة لخيارات البحث</p>
            <button onClick={clearFilters} className="text-[#D4A843] text-sm underline underline-offset-4">مسح الفلاتر</button>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((u, i) => (
              <UnitImageCard
                key={u.unitId}
                unit={u}
                imgSrc={project.gallery[i % project.gallery.length]}
                onDetail={onDetail}
              />
            ))}
          </div>
        ) : view === "list" ? (
          <div className="border border-gray-100 overflow-hidden rounded-xl">
            <div className="hidden md:grid grid-cols-7 gap-0 bg-gray-50 border-b border-gray-100">
              {["الوحدة","المبنى","المساحة","الغرف","الطابق","الحالة","الإجراءات"].map((h) => (
                <div key={h} className="px-4 py-3 text-xs text-[#8899AA] font-medium">{h}</div>
              ))}
            </div>
            {filtered.map((u, i) => (
              <div key={u.unitId} className={`grid grid-cols-2 md:grid-cols-7 gap-0 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                <div className="px-4 py-3"><span className="font-medium text-[#0B1B3A] text-sm">{u.unitNumber}</span></div>
                <div className="px-4 py-3 text-sm text-[#8899AA]">{u.building}</div>
                <div className="px-4 py-3 text-sm text-[#8899AA]">{u.area} م²</div>
                <div className="px-4 py-3 text-sm text-[#8899AA]">{u.bedrooms}</div>
                <div className="px-4 py-3 text-sm text-[#8899AA]">{u.floor}</div>
                <div className="px-4 py-3"><span className={`text-xs px-2 py-0.5 border ${UNIT_STATUS_CLR[u.status]}`}>{UNIT_STATUS_LABEL[u.status]}</span></div>
                <div className="px-4 py-3 flex gap-2 col-span-2 md:col-span-1">
                  <button onClick={() => onDetail(u)} className="text-xs px-3 py-1.5 border border-gray-200 text-[#0B1B3A] hover:border-[#D4A843]/40 transition-colors whitespace-nowrap">عرض</button>
                  {u.status === "available" && (
                    <button onClick={() => onInterest(u)} className="text-xs px-3 py-1.5 bg-[#D4A843] text-[#0B1B3A] font-semibold hover:bg-[#D4A843]/85 transition-colors">اهتمام</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Compact view */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {filtered.map((u) => (
              <div key={u.unitId} className="flex items-center justify-between border border-gray-100 bg-white px-4 py-3 hover:border-[#D4A843]/30 transition-colors rounded-lg">
                <div>
                  <span className="font-medium text-[#0B1B3A] text-sm" style={displayFont}>وحدة {u.unitNumber}</span>
                  <span className="text-[#8899AA] text-xs mr-2">{u.unitType} · {u.area} م² · {u.bedrooms} غرف</span>
                  <div className="mt-0.5"><span className={`text-xs px-1.5 py-0.5 border ${UNIT_STATUS_CLR[u.status]}`}>{UNIT_STATUS_LABEL[u.status]}</span></div>
                </div>
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <button onClick={() => onDetail(u)} className="text-xs px-2.5 py-1 border border-gray-200 text-[#0B1B3A] hover:border-[#D4A843]/40 transition-colors">التفاصيل</button>
                  {u.status === "available" && (
                    <button onClick={() => onInterest(u)} className="text-xs px-2.5 py-1 bg-[#D4A843] text-[#0B1B3A] font-semibold hover:bg-[#D4A843]/85 transition-colors">اهتمام</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DYNAMIC INVENTORY — non-off-plan project display
// ─────────────────────────────────────────────────────────────────────────────

function SingleStructureSection({
  unit,
  project,
  onDetail,
}: {
  unit: Unit;
  project: Project;
  onDetail: (u: Unit) => void;
}) {
  return (
    <div className="p-6">
      <div className="max-w-md mx-auto">
        <UnitImageCard
          unit={unit}
          imgSrc={project.gallery[0] ?? project.heroImage}
          onDetail={onDetail}
        />
      </div>
    </div>
  );
}

function VillaListingSection({
  project,
  units,
  onDetail,
}: {
  project: Project;
  units: Unit[];
  onDetail: (u: Unit) => void;
  onInterest: (u: Unit) => void;
}) {
  const [statusFilter, setStatusFilter] = useState<Unit["status"] | "all">("all");
  const statuses: { value: Unit["status"] | "all"; label: string }[] = [
    { value: "all", label: "الكل" },
    { value: "available", label: "متاح" },
    { value: "reserved", label: "محجوز" },
    { value: "sold", label: "مباع" },
  ];
  const available = statuses.filter((s) => s.value === "all" || units.some((u) => u.status === s.value));
  const filtered = statusFilter === "all" ? units : units.filter((u) => u.status === statusFilter);
  return (
    <div className="p-6">
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 items-center justify-between mb-6">
        <div className="flex flex-wrap gap-2">
          {available.map((s) => (
            <button
              key={s.value}
              onClick={() => setStatusFilter(s.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                statusFilter === s.value
                  ? "bg-[#0B1B3A] text-white border-[#0B1B3A]"
                  : "bg-white text-[#6B7A8D] border-gray-200 hover:border-[#0B1B3A]/40"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <span className="text-sm text-[#8899AA]">{filtered.length} وحدة</span>
      </div>
      {/* Image cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((u, i) => (
          <UnitImageCard
            key={u.unitId}
            unit={u}
            imgSrc={project.gallery[i % project.gallery.length] ?? project.heroImage}
            onDetail={onDetail}
          />
        ))}
      </div>
    </div>
  );
}

function DynamicInventory({
  project,
  units,
  onDetail,
  onInterest,
}: {
  project: Project;
  units: Unit[];
  onDetail: (u: Unit) => void;
  onInterest: (u: Unit) => void;
}) {
  if (units.length === 1) {
    return (
      <SingleStructureSection
        unit={units[0]}
        project={project}
        onDetail={onDetail}
      />
    );
  }
  if (project.propertyType === "villa") {
    return (
      <VillaListingSection
        project={project}
        units={units}
        onDetail={onDetail}
        onInterest={onInterest}
      />
    );
  }
  return (
    <OffPlanUnits
      project={project}
      units={units}
      onDetail={onDetail}
      onInterest={onInterest}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CAREERS PAGE
// ─────────────────────────────────────────────────────────────────────────────
const JOBS = [
  {
    id: 1,
    title: "مهندس معماري",
    summary: "تصميم المخططات المعمارية والإشراف على تنفيذها وفق أعلى معايير الجودة.",
    description: "نبحث عن مهندس معماري ذي خبرة وشغف بتصميم الفراغات السكنية عالية الجودة. ستكون مسؤولاً عن رسم وتطوير المخططات المعمارية للمشاريع الجديدة وضمان انسجامها مع رؤية أسس وأعلى المعايير المهنية.",
    duties: ["تصميم المخططات المعمارية الكاملة للمشاريع السكنية", "التنسيق مع المهندسين الإنشائيين والمقاولين", "مراجعة التصاميم للتأكد من مطابقتها للمواصفات", "إعداد التقارير الفنية وعروض التصميم للعملاء"],
    requirements: ["بكالوريوس هندسة معمارية أو ما يعادلها", "خبرة لا تقل عن 3 سنوات في التصميم المعماري", "إجادة برامج AutoCAD وRevit وSketchUp", "مهارات تواصل وعرض عالية"],
    type: "دوام كامل", mode: "حضوري", location: "الرياض",
  },
  {
    id: 2,
    title: "مستشار مبيعات عقاري",
    summary: "تقديم الحلول العقارية للعملاء ومتابعة كافة مراحل عملية البيع حتى الإغلاق.",
    description: "نبحث عن مستشار مبيعات عقاري محترف يمتلك قدرة عالية على بناء العلاقات وإتمام الصفقات. ستعمل على تقديم المنتجات العقارية لأسس وتوجيه العملاء خلال رحلة الشراء بأكملها.",
    duties: ["تقديم منتجات أسس العقارية للعملاء المستهدفين", "بناء خطط بيع فعّالة وتحقيق الأهداف الشهرية", "متابعة العملاء وإدارة مراحل الصفقة بالكامل", "إعداد تقارير المبيعات وتحليل السوق"],
    requirements: ["خبرة لا تقل عن سنتين في المبيعات العقارية", "شهادة جامعية في إدارة الأعمال أو ما يعادلها", "مهارات تفاوض واتصال ممتازة", "رخصة فال العقارية ميزة إضافية"],
    type: "دوام كامل", mode: "حضوري", location: "الرياض",
  },
  {
    id: 3,
    title: "مدير مشروع",
    summary: "الإشراف الكامل على تنفيذ المشاريع العقارية من مرحلة التخطيط حتى التسليم النهائي.",
    description: "نحتاج إلى مدير مشروع محترف يقود تنفيذ مشاريعنا السكنية الكبرى بكفاءة وجودة عالية. ستكون المرجع الرئيسي لجميع أطراف المشروع وتضمن تحقيق الأهداف في الوقت والميزانية المحددين.",
    duties: ["إدارة المشاريع من الصفر حتى التسليم", "التنسيق بين المقاولين والاستشاريين والعملاء", "مراقبة الجدول الزمني والميزانية وإعداد التقارير", "ضمان مطابقة جودة التنفيذ للمواصفات المعتمدة"],
    requirements: ["بكالوريوس هندسة مدنية أو معمارية", "خبرة لا تقل عن 5 سنوات في إدارة مشاريع التطوير العقاري", "شهادة PMP ميزة إضافية", "مهارات قيادية وتنظيمية عالية"],
    type: "دوام كامل", mode: "حضوري", location: "الرياض",
  },
  {
    id: 4,
    title: "محاسب مالي",
    summary: "إدارة العمليات المحاسبية والمالية ودعم الفريق في اتخاذ القرارات المالية الصحيحة.",
    description: "نبحث عن محاسب مالي دقيق ومنظم للانضمام إلى فريقنا المالي. ستتولى مسؤولية متابعة العمليات المحاسبية اليومية وإعداد التقارير المالية الدورية ودعم توافق الشركة مع الأنظمة واللوائح المالية.",
    duties: ["تسجيل ومتابعة العمليات المالية اليومية", "إعداد القوائم المالية والتقارير الشهرية والسنوية", "التنسيق مع المراجعين الخارجيين وهيئة الزكاة والضريبة", "دعم الفريق في إعداد الميزانيات والتوقعات المالية"],
    requirements: ["بكالوريوس محاسبة أو مالية", "خبرة لا تقل عن 3 سنوات في المحاسبة أو التدقيق", "إجادة برامج المحاسبة (SAP أو ما يعادله)", "شهادة CPA أو SOCPA ميزة"],
    type: "دوام كامل", mode: "حضوري", location: "الرياض",
  },
];

function JobApplicationModal({ job, onClose, goTo }: { job: typeof JOBS[0]; onClose: () => void; goTo: (p: Page) => void }) {
  const cvRef = useRef<HTMLInputElement>(null);
  const portfolioRef = useRef<HTMLInputElement>(null);
  const [fields, setFields] = useState({ name: "", email: "", phone: "", gender: "", nationality: "", city: "", degree: "", notes: "" });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const set = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  const handleFile = (setter: (f: File) => void, errKey: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ok = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!ok.includes(file.type)) { setErrors((p) => ({ ...p, [errKey]: "يُقبل فقط PDF أو DOC أو DOCX" })); return; }
    if (file.size > 5 * 1024 * 1024) { setErrors((p) => ({ ...p, [errKey]: "الحجم لا يتجاوز 5 ميغابايت" })); return; }
    setter(file);
    setErrors((p) => { const n = { ...p }; delete n[errKey]; return n; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!fields.name.trim()) errs.name = "مطلوب";
    if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = "بريد إلكتروني غير صحيح";
    if (!fields.phone.trim()) errs.phone = "مطلوب";
    if (!cvFile) errs.cv = "يرجى رفع السيرة الذاتية";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  const inp = (k: string) =>
    `w-full bg-[#F7F4EF] border px-3.5 py-2.5 text-sm focus:outline-none transition-colors text-[#0B1B3A] placeholder:text-[#8899AA]/60 rounded-lg ${errors[k] ? "border-red-400" : "border-gray-200 focus:border-[#D4A843]"}`;

  const lbl = "block text-xs text-[#6B7A8D] mb-1.5 font-medium";

  return (
    <>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes slideUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* ── Overlay: scrollable on mobile so tall content is reachable ── */}
      <div
        className="fixed inset-0 z-50 overflow-y-auto"
        style={{ backgroundColor: "rgba(11,27,58,0.78)", backdropFilter: "blur(4px)", animation: "fadeIn 200ms ease", WebkitOverflowScrolling: "touch" }}
        onClick={onClose}
      >
        {/* Centering wrapper — min-h-full keeps overlay backdrop full screen */}
        <div className="flex min-h-full items-start md:items-center justify-center p-2 sm:p-4 py-4 sm:py-8">

          {/* ── Modal card ── */}
          <div
            className="relative w-full max-w-5xl rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden"
            style={{ animation: "slideUp 240ms ease" }}
            onClick={(e) => e.stopPropagation()}
          >

            {/* ── Mobile-only sticky top bar with close ── */}
            <div className="md:hidden sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-[#0B1B3A] border-b border-white/10">
              <p className="text-[#D4A843] text-xs font-medium tracking-wide truncate ml-3">{job.title}</p>
              <button
                onClick={onClose}
                aria-label="إغلاق"
                className="w-9 h-9 flex-shrink-0 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X size={17} />
              </button>
            </div>

            {/* ── Two-column body ── */}
            {/* On desktop: fixed height + each column scrolls. On mobile: natural height, overlay scrolls. */}
            <div className="flex flex-col md:flex-row md:max-h-[88vh]">

              {/* LEFT — Job details */}
              <div className="w-full md:w-[44%] bg-[#0B1B3A] text-white md:overflow-y-auto flex-shrink-0">
                <div className="p-6 sm:p-8 md:p-10">

                  {/* Header */}
                  <div className="mb-6">
                    <p className="text-[#D4A843] text-[10px] tracking-widest uppercase mb-3 font-medium">فرصة وظيفية</p>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug" style={displayFont}>{job.title}</h2>
                    <div className="flex flex-wrap gap-2">
                      {[job.type, job.mode, job.location].map((tag) => (
                        <span key={tag} className="text-[11px] px-3 py-1 rounded-full border border-[#D4A843]/40 text-[#D4A843] font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* About */}
                  <div className="mb-6">
                    <p className="text-[#D4A843] text-xs font-semibold mb-3 tracking-wide">نبذة عن الوظيفة</p>
                    <p className="text-white/65 text-sm leading-[1.9]">{job.description}</p>
                  </div>

                  {/* Duties */}
                  <div className="mb-6">
                    <p className="text-[#D4A843] text-xs font-semibold mb-3 tracking-wide">المهام والمسؤوليات</p>
                    <ul className="space-y-2.5">
                      {job.duties.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-sm text-white/65">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843] mt-1.5 flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div className="mb-6">
                    <p className="text-[#D4A843] text-xs font-semibold mb-3 tracking-wide">المتطلبات</p>
                    <ul className="space-y-2.5">
                      {job.requirements.map((r) => (
                        <li key={r} className="flex items-start gap-2.5 text-sm text-white/65">
                          <CheckCircle size={13} className="text-[#D4A843] mt-0.5 flex-shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Info grid */}
                  <div className="border-t border-white/10 pt-4 space-y-3">
                    {[
                      { label: "نوع العمل", value: job.type },
                      { label: "نظام العمل", value: job.mode },
                      { label: "الموقع", value: job.location },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="text-xs text-white/40">{label}</span>
                        <span className="text-xs text-white font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT — Application form */}
              <div className="w-full md:w-[56%] bg-white md:overflow-y-auto">

                {/* Desktop sticky close strip */}
                <div className="hidden md:flex items-center justify-end px-6 pt-4 sticky top-0 bg-white z-10 border-b border-gray-50 pb-2">
                  <button
                    onClick={onClose}
                    aria-label="إغلاق"
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#0B1B3A] hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    <X size={15} />
                  </button>
                </div>

                <div className="p-6 sm:p-8 md:px-9 md:pb-10 md:pt-6">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center min-h-[360px] text-center gap-6">
                      <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
                        <CheckCircle size={36} className="text-emerald-500" />
                      </div>
                      <h3 className="text-xl text-[#0B1B3A] font-semibold" style={displayFont}>تم إرسال طلبك بنجاح!</h3>
                      <p className="text-[#6B7A8D] text-sm max-w-xs leading-relaxed">
                        سيتواصل معك فريقنا في أقرب وقت ممكن إذا توافقت مؤهلاتك مع متطلبات الوظيفة.
                      </p>
                      <button onClick={onClose} className="mt-2 px-8 py-2.5 bg-[#D4A843] text-white text-sm rounded-lg hover:bg-[#C49733] transition-colors">
                        إغلاق
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-[#0B1B3A] mb-1" style={displayFont}>قدم على الوظيفة</h3>
                        <p className="text-[#6B7A8D] text-xs">أكمل النموذج أدناه وسنتواصل معك قريباً</p>
                      </div>

                      <form onSubmit={handleSubmit} noValidate className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={lbl}>الاسم الكامل <span className="text-[#D4A843]">*</span></label>
                            <input type="text" value={fields.name} onChange={set("name")} placeholder="محمد العمري" className={inp("name")} />
                            {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
                          </div>
                          <div>
                            <label className={lbl}>البريد الإلكتروني <span className="text-[#D4A843]">*</span></label>
                            <input type="email" value={fields.email} onChange={set("email")} placeholder="example@mail.com" dir="ltr" className={inp("email")} />
                            {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={lbl}>رقم الجوال <span className="text-[#D4A843]">*</span></label>
                            <input type="tel" value={fields.phone} onChange={set("phone")} placeholder="05XXXXXXXX" dir="ltr" className={inp("phone")} />
                            {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>}
                          </div>
                          <div>
                            <label className={lbl}>الجنس</label>
                            <select value={fields.gender} onChange={set("gender")} className={inp("gender") + " appearance-none cursor-pointer"}>
                              <option value="">اختر</option>
                              <option value="male">ذكر</option>
                              <option value="female">أنثى</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={lbl}>الجنسية</label>
                            <input type="text" value={fields.nationality} onChange={set("nationality")} placeholder="سعودي / غير سعودي" className={inp("nationality")} />
                          </div>
                          <div>
                            <label className={lbl}>الموقع / المدينة</label>
                            <input type="text" value={fields.city} onChange={set("city")} placeholder="الرياض" className={inp("city")} />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={lbl}>الدرجة العلمية</label>
                            <select value={fields.degree} onChange={set("degree")} className={inp("degree") + " appearance-none cursor-pointer"}>
                              <option value="">اختر</option>
                              {["دبلوم", "بكالوريوس", "ماجستير", "دكتوراه", "أخرى"].map((d) => <option key={d}>{d}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className={lbl}>التخصص الوظيفي المطلوب</label>
                            <input type="text" readOnly value={job.title} className={`${inp("position")} bg-[#F7F4EF] cursor-default`} />
                          </div>
                        </div>

                        {/* CV Upload */}
                        <div>
                          <label className={lbl}>السيرة الذاتية <span className="text-[#D4A843]">*</span></label>
                          <input ref={cvRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFile(setCvFile, "cv")} className="hidden" />
                          <button type="button" onClick={() => cvRef.current?.click()}
                            className={`w-full flex items-center gap-3 border-2 border-dashed px-4 py-4 rounded-lg hover:bg-[#F7F4EF] transition-colors text-right ${errors.cv ? "border-red-300" : "border-gray-200 hover:border-[#D4A843]"}`}>
                            <Upload size={16} className="text-[#D4A843] flex-shrink-0" />
                            <div className="min-w-0">
                              {cvFile
                                ? <span className="text-sm text-[#0B1B3A] font-medium truncate block">{cvFile.name}</span>
                                : <><div className="text-sm text-[#0B1B3A]">رفع السيرة الذاتية</div><div className="text-[11px] text-[#8899AA]">PDF, DOC, DOCX — الحد 5MB</div></>}
                            </div>
                          </button>
                          {errors.cv && <p className="text-red-500 text-[11px] mt-1">{errors.cv}</p>}
                        </div>

                        {/* Portfolio Upload */}
                        <div>
                          <label className={lbl}>ملف الأعمال <span className="text-[#6B7A8D] font-normal">(اختياري)</span></label>
                          <input ref={portfolioRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFile(setPortfolioFile, "portfolio")} className="hidden" />
                          <button type="button" onClick={() => portfolioRef.current?.click()}
                            className="w-full flex items-center gap-3 border-2 border-dashed border-gray-200 px-4 py-4 rounded-lg hover:bg-[#F7F4EF] hover:border-[#D4A843] transition-colors text-right">
                            <Upload size={16} className="text-[#D4A843] flex-shrink-0" />
                            <div className="min-w-0">
                              {portfolioFile
                                ? <span className="text-sm text-[#0B1B3A] font-medium truncate block">{portfolioFile.name}</span>
                                : <><div className="text-sm text-[#0B1B3A]">رفع ملف الأعمال</div><div className="text-[11px] text-[#8899AA]">PDF, DOC, DOCX — الحد 5MB</div></>}
                            </div>
                          </button>
                        </div>

                        {/* Notes */}
                        <div>
                          <label className={lbl}>ملاحظات <span className="text-[#6B7A8D] font-normal">(اختياري)</span></label>
                          <textarea rows={3} value={fields.notes} onChange={set("notes")} placeholder="أي ملاحظات إضافية تودّ مشاركتها..."
                            className="w-full bg-[#F7F4EF] border border-gray-200 focus:border-[#D4A843] px-3.5 py-2.5 text-sm focus:outline-none text-[#0B1B3A] placeholder:text-[#8899AA]/60 resize-none rounded-lg" />
                        </div>

                        <button type="submit" disabled={loading}
                          className="w-full py-3 bg-[#D4A843] text-white text-sm font-semibold rounded-lg hover:bg-[#C49733] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 mt-2">
                          {loading
                            ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />جاري الإرسال...</>
                            : "إرسال طلب التقديم"}
                        </button>

                        <p className="text-[#8899AA] text-[11px] text-center pb-1">
                          بالتقديم توافق على{" "}
                          <button type="button" onClick={() => goTo("privacy")} className="text-[#D4A843] underline underline-offset-2">سياسة الخصوصية</button>
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CareersPage({ goTo }: { goTo: (p: Page) => void }) {
  const [applyJob, setApplyJob] = useState<typeof JOBS[0] | null>(null);

  return (
    <>
      <PageHero tag="انضم إلى الفريق" title="انضم إلى فريق أسس"
        sub="نؤمن بأن الكفاءات هي أساس كل مشروع ناجح. انضم إلى بيئة عمل احترافية تُقدّر الإبداع وتُعلي من شأن التميز."
        img={CAREERS_IMG} alt="الوظائف" onHome={() => goTo("home")} />

      {/* ① لماذا أسس؟ */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-6">
            <GoldLine />
            <p className="text-[#D4A843] text-[10px] tracking-[0.18em] uppercase mb-3 font-medium">فريقنا</p>
            <h2 className="text-2xl md:text-3xl text-[#0B1B3A] mb-3 leading-snug" style={displayFont}>لماذا أسس؟</h2>
            <p className="text-[#6B7A8D] text-sm max-w-xl">أكثر من مجرد وظيفة — بيئة تنمو فيها وتصنع أثراً حقيقياً.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: Layers,      title: "بيئة تنمو فيها",     desc: "مساحة حقيقية للتعلم والتطور وتحويل الطموح إلى إنجاز." },
              { Icon: Building2,   title: "مشاريع تصنع أثرًا",  desc: "كن جزءًا من مشاريع تترك أثراً في المشهد العقاري." },
              { Icon: Users,       title: "فريق واحد",           desc: "نعمل بروح الفريق، ونجمع الخبرات المختلفة لصناعة نتائج أفضل." },
              { Icon: Award,       title: "فرص تتطور معك",      desc: "نؤمن بتطوير الأشخاص بقدر إيماننا بتطوير المشاريع." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex flex-col p-6 bg-white rounded-xl border border-[#D4A843]/30 hover:border-[#D4A843]/60 hover:shadow-md transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-[#D4A843]/10 flex items-center justify-center text-[#D4A843] mb-4 flex-shrink-0">
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-semibold text-[#0B1B3A] mb-2.5" style={displayFont}>{title}</h3>
                <p className="text-[#6B7A8D] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ② الوظائف المتاحة */}
      <section className="py-10 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-6">
            <GoldLine />
            <p className="text-[#D4A843] text-[10px] tracking-[0.18em] uppercase mb-3 font-medium">انضم إلينا</p>
            <h2 className="text-2xl md:text-3xl text-[#0B1B3A] mb-3 leading-snug" style={displayFont}>فرص متاحة</h2>
            <p className="text-[#6B7A8D] text-sm max-w-xl">نبحث عن كفاءات تُضيف قيمة حقيقية لفريقنا ومشاريعنا.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {JOBS.map((job) => (
              <div key={job.id} className="bg-white rounded-xl border border-[#D4A843]/25 p-6 flex flex-col hover:border-[#D4A843]/60 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#0B1B3A] mb-1.5" style={displayFont}>{job.title}</h3>
                    <p className="text-[#6B7A8D] text-sm leading-relaxed line-clamp-2">{job.summary}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#D4A843]/10 flex items-center justify-center text-[#D4A843] flex-shrink-0">
                    <Briefcase size={17} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100">
                  {[job.type, job.mode, job.location].map((tag) => (
                    <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-[#F7F4EF] text-[#6B7A8D] font-medium border border-gray-200">{tag}</span>
                  ))}
                  <button
                    onClick={() => setApplyJob(job)}
                    className="mr-auto text-[11px] px-4 py-1 rounded-full bg-[#D4A843] text-white font-semibold hover:bg-[#C49733] transition-colors"
                  >
                    تقدم الآن ←
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {applyJob && <JobApplicationModal job={applyJob} onClose={() => setApplyJob(null)} goTo={goTo} />}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ PAGE
// ─────────────────────────────────────────────────────────────────────────────
const FAQ_CATEGORIES = [
  {
    id: "finance", title: "التمويل العقاري",
    items: [
      { q: "ما هي الحلول التمويلية التي تقدمها أسس؟", a: "تقدم أسس روائد الإعمار مجموعة من الحلول التمويلية بالتعاون مع جهات التمويل العقاري المعتمدة في المملكة، وتوفر أدوات تقدير تمويلية مبدئية لمساعدتك في اتخاذ قرار مدروس." },
      { q: "كيف أعرف المنتج العقاري المناسب لي؟", a: "يمكنك التواصل مع فريق المبيعات الذي سيرشدك إلى الحل الأمثل بحسب وضعك المالي واحتياجاتك السكنية، أو استخدام أداة الحسبة التمويلية للحصول على تقدير مبدئي." },
      { q: "هل يمكنني الحصول على حسبة تمويلية مبدئية؟", a: "نعم، يتيح موقعنا إمكانية إجراء حسبة تمويلية مبدئية. هذه الحسبة تقديرية ومرجعية ولا تمثل موافقة تمويلية نهائية أو التزاماً من الشركة أو جهة التمويل." },
      { q: "ما البيانات المطلوبة لإجراء الحسبة التمويلية؟", a: "يتطلب نموذج الحسبة التمويلية معلومات أساسية مثل الراتب الشهري ومبلغ التمويل المطلوب ومدة السداد. وقد تختلف المتطلبات بحسب جهة التمويل." },
      { q: "كم تستغرق إجراءات التمويل؟", a: "تختلف مدة الإجراءات من حالة إلى أخرى بحسب جهة التمويل والبيانات المقدمة. يعمل فريقنا على تسهيل هذه الإجراءات بأكبر قدر ممكن من الكفاءة." },
    ],
  },
  {
    id: "products", title: "منتجاتنا",
    items: [
      { q: "ما هو منتج البناء الذاتي؟", a: "البناء الذاتي هو منتج يتيح للعميل امتلاك أرض والبناء عليها وفق المخططات والمواصفات المعتمدة من أسس، مع توفير الدعم الفني والإشرافي طوال مراحل البناء." },
      { q: "ما هو البيع على الخارطة؟", a: "هو منتج يمكّنك من حجز وحدتك العقارية في مرحلة التخطيط أو قبل اكتمال البناء، وغالباً بأسعار تنافسية مقارنةً بالوحدات الجاهزة." },
      { q: "ما المقصود بالوحدات الجاهزة؟", a: "الوحدات الجاهزة هي عقارات مكتملة البناء والتشطيب وجاهزة للتسليم الفوري، وتناسب من يرغب في الانتقال أو الاستثمار دون انتظار." },
      { q: "هل توجد منتجات عقارية أخرى مستقبلاً؟", a: "تسعى أسس دائماً إلى توسيع محفظة منتجاتها لتلبية احتياجات مختلف العملاء. يمكنك متابعة أحدث مشاريعنا عبر الموقع أو التواصل مع فريقنا للمزيد." },
    ],
  },
  {
    id: "projects-faq", title: "المشاريع",
    items: [
      { q: "أين تقع مشاريع أسس؟", a: "تنتشر مشاريع أسس في عدة مناطق ومدن بالمملكة العربية السعودية. يمكنك الاطلاع على الخريطة التفاعلية في صفحة مشاريعنا لاستعراض مواقع كل مشروع." },
      { q: "هل يمكن زيارة المشروع؟", a: "نعم، يمكنك التواصل مع فريق المبيعات لترتيب زيارة ميدانية للمشاريع المتاحة. ويسعدنا استقبالك والإجابة على جميع استفساراتك." },
      { q: "كيف أعرف حالة المشروع؟", a: "تُوضح صفحة كل مشروع على موقعنا حالته الراهنة، سواء كان متاحاً للبيع أو قيد الإنشاء أو مكتمل البيع. يمكنك أيضاً التواصل معنا للاستفسار عن أي مشروع." },
      { q: "هل المشاريع متاحة للبيع أو قيد الإنشاء؟", a: "يتباين وضع كل مشروع، وتجد التفاصيل موضحة في صفحة المشاريع. بعض مشاريعنا متاح للبيع الفوري، وبعضها قيد الإنشاء مع إمكانية الحجز المبكر." },
    ],
  },
  {
    id: "contact-faq", title: "التواصل",
    items: [
      { q: "كيف يمكنني التواصل مع أسس؟", a: "يمكنك التواصل معنا عبر الهاتف أو واتساب أو البريد الإلكتروني، أو من خلال نموذج التواصل في صفحة 'تواصل معنا'." },
      { q: "أين توجد فروع الشركة؟", a: "يمكنك الاطلاع على مواقع فروعنا في صفحة 'تواصل معنا' التي تعرض خريطة تفاعلية وعناوين جميع المكاتب." },
      { q: "هل يمكنني تقديم طلب من خلال الموقع؟", a: "نعم، يتيح موقعنا تقديم طلب استفسار مباشر، وسيتواصل معك ممثل المبيعات في أقرب وقت ممكن." },
    ],
  },
];

function FAQPage({ goTo }: { goTo: (p: Page) => void }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState(FAQ_CATEGORIES[0].id);

  const scrollTo = (id: string) => {
    const el = document.getElementById(`faq-${id}`);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveCat(id);
  };

  return (
    <>
      <PageHero tag="الأسئلة الشائعة" title="إجابات على أكثر الأسئلة شيوعاً"
        sub="جمعنا لك أهم الأسئلة المتعلقة بمنتجاتنا وحلولنا العقارية لتكون الصورة أوضح قبل اتخاذ قرارك."
        img={INTERIOR_IMG} alt="الأسئلة الشائعة" onHome={() => goTo("home")} />

      {/* Category tabs — sticky below nav */}
      <div className="bg-background/95 backdrop-blur-sm border-b border-border/30 px-6 sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto flex gap-0 overflow-x-auto">
          {FAQ_CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => scrollTo(cat.id)}
              className={`px-4 py-4 text-sm whitespace-nowrap border-b-2 transition-colors flex-shrink-0 ${activeCat === cat.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      <section className="py-10 bg-background">
        <div className="max-w-3xl mx-auto px-6 space-y-10">
          {FAQ_CATEGORIES.map((cat) => (
            <div key={cat.id} id={`faq-${cat.id}`} className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-2 h-2 bg-primary flex-shrink-0" />
                <h2 className="text-base text-foreground" style={displayFont}>{cat.title}</h2>
                <div className="h-px flex-1 bg-border/40" />
              </div>
              <div className="space-y-px">
                {cat.items.map((item, i) => {
                  const key = `${cat.id}-${i}`;
                  const isOpen = openKey === key;
                  return (
                    <div key={key} className="border border-border/50 bg-card overflow-hidden">
                      <button
                        onClick={() => { setOpenKey(isOpen ? null : key); setActiveCat(cat.id); }}
                        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-right hover:bg-white/5 transition-colors">
                        <span className="text-sm text-foreground leading-relaxed" style={displayFont}>{item.q}</span>
                        <ChevronDown size={16} className={`text-primary flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: isOpen ? "500px" : "0px" }}>
                        <div className="px-6 pb-4">
                          <div className="w-full h-px bg-border/30 mb-4" />
                          <p className="text-sm text-muted-foreground leading-[1.9]">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="p-6 border border-border/50 bg-card text-center">
            <GoldLine />
            <h3 className="text-xl text-foreground mb-3" style={displayFont}>لم تجد إجابة على سؤالك؟</h3>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">فريقنا جاهز للإجابة على جميع استفساراتك عبر قنوات التواصل المتاحة.</p>
            <button onClick={() => goTo("contact")}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground text-sm hover:bg-primary/85 transition-colors">
              تواصل معنا <ChevronLeft size={14} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRIVACY PAGE
// ─────────────────────────────────────────────────────────────────────────────
type LegalSec = { id: string; title: string; paras: string[]; bullets?: string[]; paras2?: string[] };

const PRIVACY_SECTIONS: LegalSec[] = [
  {
    id: "prv-intro", title: "مقدمة",
    paras: [
      "تلتزم شركة أسس روائد الإعمار للتطوير العقاري بحماية خصوصية المتعاملين معها وزوار موقعها الإلكتروني. تُوضح هذه السياسة طريقة جمعنا للبيانات الشخصية واستخدامها وحمايتها، تماشياً مع نظام حماية البيانات الشخصية السعودي واللوائح التنظيمية المعمول بها في المملكة العربية السعودية.",
      "باستخدامك للموقع أو تقديمك لأي من نماذجه، فإنك توافق على الشروط الواردة في هذه السياسة. نوصي بقراءة هذه الوثيقة بعناية قبل تقديم أي بيانات شخصية.",
    ],
  },
  {
    id: "prv-collected", title: "البيانات التي يتم جمعها",
    paras: ["قد تجمع شركة أسس بعض البيانات الشخصية من خلال تفاعلك مع الموقع، وذلك عبر القنوات التالية:"],
    bullets: [
      "نماذج التواصل والاستفسار: الاسم، رقم الجوال، البريد الإلكتروني، نوع الاستفسار.",
      "نموذج طلب الحسبة التمويلية: البيانات المالية الأساسية للتقدير المبدئي.",
      "نموذج التوظيف: الاسم، بيانات التواصل، المسمى الوظيفي، الخبرة، والسيرة الذاتية.",
      "بيانات تقنية: عنوان IP، نوع المتصفح، بيانات الجلسة لأغراض تحسين أداء الموقع.",
      "ملفات تعريف الارتباط (Cookies) في حال كانت مفعّلة.",
    ],
  },
  {
    id: "prv-purpose", title: "الغرض من جمع البيانات",
    paras: ["تُجمع البيانات الشخصية لأغراض محددة ومشروعة تشمل:"],
    bullets: [
      "الرد على الاستفسارات وطلبات التواصل.",
      "إعداد الحسبة التمويلية المبدئية وتقديم المنتج المناسب.",
      "التواصل مع العملاء المحتملين لتقديم الخدمات العقارية.",
      "معالجة طلبات التوظيف وتقييم المرشحين.",
      "تحسين تجربة الموقع وأدائه.",
    ],
  },
  {
    id: "prv-usage", title: "كيفية استخدام البيانات",
    paras: [
      "تُستخدم البيانات الشخصية التي تُقدمها حصراً للأغراض المشروعة والمحددة التي يُعلم بها المستخدم وقت الجمع.",
      "لا تُستخدم بياناتك لأغراض تجارية من طرف ثالث دون إذن صريح منك.",
    ],
  },
  {
    id: "prv-protection", title: "حماية البيانات",
    paras: [
      "تلتزم شركة أسس باتخاذ التدابير التقنية والتنظيمية المناسبة لحماية بياناتك الشخصية من الوصول غير المصرح به أو الاستخدام أو الإفصاح.",
      "تقتصر إمكانية الوصول إلى بياناتك على موظفي الشركة الذين تستدعي طبيعة عملهم ذلك.",
    ],
  },
  {
    id: "prv-sharing", title: "مشاركة البيانات",
    paras: ["قد تتم مشاركة بياناتك مع أطراف أخرى في الحالات التالية:"],
    bullets: [
      "جهات التمويل العقاري المعتمدة عند الحاجة لإتمام طلب التمويل.",
      "مزودي الخدمات التقنية الضروريين لتشغيل الموقع وفق اتفاقيات سرية مُلزمة.",
      "الجهات الحكومية أو النظامية حين يقتضي ذلك الواجب القانوني.",
    ],
  },
  {
    id: "prv-rights", title: "حقوق صاحب البيانات",
    paras: ["وفق نظام حماية البيانات الشخصية السعودي، يحق لك:"],
    bullets: [
      "الاطلاع على البيانات الشخصية التي تحتفظ بها الشركة.",
      "طلب تصحيح أي بيانات غير دقيقة.",
      "طلب حذف بياناتك وفق الاشتراطات النظامية.",
      "الاعتراض على استخدام بياناتك في حالات معينة.",
    ],
    paras2: ["للممارسة هذه الحقوق، يرجى التواصل معنا عبر البريد الإلكتروني الرسمي."],
  },
  {
    id: "prv-retention", title: "الاحتفاظ بالبيانات",
    paras: [
      "تحتفظ الشركة بالبيانات الشخصية للمدة اللازمة لتحقيق الأغراض التي جُمعت من أجلها، مع مراعاة المتطلبات النظامية والاشتراطات القانونية ذات الصلة.",
      "تختلف مدة الاحتفاظ بحسب نوع البيانات والغرض منها.",
    ],
  },
  {
    id: "prv-cookies", title: "ملفات تعريف الارتباط",
    paras: [
      "قد يستخدم الموقع ملفات تعريف الارتباط (Cookies) لتحسين تجربة التصفح وجمع بيانات إحصائية مجهولة الهوية تساعد في تحسين أداء الموقع.",
      "يمكنك ضبط إعدادات متصفحك لرفض ملفات تعريف الارتباط، مع العلم بأن ذلك قد يؤثر على بعض وظائف الموقع.",
    ],
  },
  {
    id: "prv-updates", title: "تحديث سياسة الخصوصية",
    paras: [
      "تحتفظ شركة أسس بحق تحديث هذه السياسة في أي وقت. سيُشار إلى تاريخ آخر تحديث في الجزء العلوي من الصفحة.",
      "آخر تحديث: أغسطس 2026.",
    ],
  },
  {
    id: "prv-contact", title: "التواصل بخصوص الخصوصية",
    paras: ["لأي استفسار يتعلق بخصوصيتك أو بياناتك الشخصية، يرجى التواصل معنا:"],
    bullets: ["البريد الإلكتروني: info@osos.sa", "الرقم الموحد: 9200XXXXX"],
    paras2: [
      "ملاحظة: المحتوى الوارد في هذه السياسة للأغراض التعريفية، ويُوصى بمراجعتها واعتمادها من مستشار قانوني مختص قبل نشرها الرسمي.",
    ],
  },
];

function LegalLayout({
  tag, title, breadcrumb, sections, heroImg, goTo,
}: {
  tag: string; title: string; breadcrumb: string;
  sections: LegalSec[]; heroImg: string;
  goTo: (p: Page) => void;
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  };

  return (
    <>
      <PageHero tag={tag} title={title} img={heroImg} alt={title} onHome={() => goTo("home")} />

      <section className="py-10 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* TOC — right side in RTL */}
            <div className="lg:w-60 shrink-0">
              <div className="sticky top-28">
                <p className="text-primary text-xs tracking-widest uppercase mb-4">المحتويات</p>
                <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                  {sections.map((s) => (
                    <button key={s.id} onClick={() => scrollTo(s.id)}
                      className={`text-right text-sm px-3 py-2 whitespace-nowrap lg:whitespace-normal transition-colors border-r-2 lg:border-r-2 lg:border-b-0 flex-shrink-0 ${activeId === s.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`}>
                      {s.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {sections.map((s, idx) => (
                <div key={s.id} id={s.id} className={`scroll-mt-24 ${idx < sections.length - 1 ? "mb-8 pb-8 border-b border-border/30" : ""}`}>
                  <h2 className="text-xl text-foreground mb-4" style={displayFont}>{s.title}</h2>
                  <div className="space-y-3 text-sm text-muted-foreground leading-[1.9]">
                    {s.paras.map((p, i) => <p key={i}>{p}</p>)}
                    {s.bullets && (
                      <ul className="space-y-2 my-3">
                        {s.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {s.paras2?.map((p, i) => <p key={`p2-${i}`} className="text-muted-foreground/70 text-xs italic mt-3">{p}</p>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PrivacyPage({ goTo }: { goTo: (p: Page) => void }) {
  return (
    <LegalLayout
      tag="الخصوصية" title="سياسة الخصوصية"
      breadcrumb="سياسة الخصوصية"
      sections={PRIVACY_SECTIONS} heroImg={LEGAL_IMG} goTo={goTo}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TERMS PAGE
// ─────────────────────────────────────────────────────────────────────────────
const TERMS_SECTIONS: LegalSec[] = [
  {
    id: "trm-intro", title: "١. مقدمة",
    paras: [
      "يُعدّ هذا الموقع الإلكتروني ملكاً لشركة أسس روائد الإعمار للتطوير العقاري. باستخدامك لهذا الموقع فإنك توافق على الالتزام بهذه الشروط والأحكام.",
      "يُرجى قراءة هذه الوثيقة بعناية قبل استخدام أي خدمة من خدمات الموقع. في حال عدم موافقتك على هذه الشروط، يُرجى الامتناع عن استخدام الموقع.",
    ],
  },
  {
    id: "trm-usage", title: "٢. استخدام الموقع",
    paras: ["يُوافق المستخدم على استخدام الموقع بصورة مشروعة وقانونية. ويُحظر:"],
    bullets: [
      "استخدام الموقع لأي غرض غير مشروع أو مخالف للأنظمة السعودية المعمول بها.",
      "نشر أو نقل أي محتوى ضار أو مسيء أو مضلل.",
      "محاولة الوصول غير المصرح به إلى أنظمة الموقع أو قواعد بياناته.",
    ],
  },
  {
    id: "trm-content", title: "٣. المعلومات والمحتوى",
    paras: [
      "المعلومات المنشورة على الموقع عن المنتجات والمشاريع والخدمات هي لأغراض تعريفية وتسويقية فحسب.",
      "التفاصيل النهائية للمنتجات والمشاريع والأسعار تخضع للعقود والاتفاقيات الرسمية المعتمدة، وتتقدم على أي معلومات منشورة في الموقع.",
    ],
  },
  {
    id: "trm-products", title: "٤. المنتجات والخدمات",
    paras: ["تقدم شركة أسس روائد الإعمار منتجات عقارية متنوعة، منها:"],
    bullets: [
      "البناء الذاتي: يتيح للعميل البناء على أرضه وفق مواصفات معتمدة.",
      "البيع على الخارطة: حجز وحدات عقارية قبل اكتمال البناء.",
      "الوحدات الجاهزة: عقارات مكتملة وجاهزة للتسليم.",
      "منتجات مستقبلية: قد تُطلق الشركة منتجات إضافية وفق خططها التوسعية.",
    ],
    paras2: ["تخضع تفاصيل كل منتج للعقود والاتفاقيات الرسمية المعتمدة."],
  },
  {
    id: "trm-calculator", title: "٥. الحسبة التمويلية",
    paras: [
      "أي حسبة أو تقدير تمويلي يتم من خلال الموقع هو تقديري ومبدئي فحسب، ولا يمثل موافقة تمويلية نهائية أو التزاماً من الشركة أو أي جهة تمويل.",
      "الموافقة النهائية على التمويل تعتمد على المعايير والسياسات الخاصة بجهة التمويل المختارة ومتطلباتها.",
    ],
  },
  {
    id: "trm-projects", title: "٦. المشاريع والأسعار",
    paras: [
      "حالة المشاريع والأسعار والتوافر المعروضة على الموقع قد تتغير دون إشعار مسبق.",
      "المعلومات النهائية المتعلقة بالمشاريع والأسعار تعتمد على البيانات والعقود الرسمية.",
    ],
  },
  {
    id: "trm-ip", title: "٧. الملكية الفكرية",
    paras: ["جميع محتويات الموقع من شعار وصور ونصوص وتصميم وهوية بصرية هي ملك حصري لشركة أسس روائد الإعمار للتطوير العقاري."],
    bullets: [
      "يُحظر نسخ أي محتوى أو إعادة نشره أو استخدامه تجارياً دون إذن كتابي مسبق.",
      "استخدام الشعار أو الهوية البصرية بأي شكل غير مصرح به يُعدّ انتهاكاً لحقوق الملكية الفكرية.",
    ],
  },
  {
    id: "trm-external", title: "٨. الروابط الخارجية",
    paras: [
      "قد يحتوي الموقع على روابط لمواقع خارجية. لا تتحمل شركة أسس أي مسؤولية عن محتوى هذه المواقع أو سياسات الخصوصية المعمول بها فيها.",
      "يتحمل المستخدم المسؤولية الكاملة عند انتقاله إلى أي موقع خارجي.",
    ],
  },
  {
    id: "trm-liability", title: "٩. حدود المسؤولية",
    paras: [
      "تبذل شركة أسس روائد الإعمار جهودها لضمان دقة المعلومات المنشورة على الموقع، غير أنها لا تضمن خلوّها من الأخطاء في جميع الأوقات.",
      "يُنصح بمراجعة هذا البند واعتماده قانونياً من مستشار مختص قبل النشر الرسمي.",
    ],
  },
  {
    id: "trm-amendments", title: "١٠. التعديلات",
    paras: [
      "تحتفظ شركة أسس بحق تحديث محتوى الموقع أو هذه الشروط والأحكام في أي وقت وفقاً للأنظمة المعمول بها.",
      "يُعدّ استمرارك في استخدام الموقع بعد أي تحديث موافقةً ضمنية على الشروط المُحدَّثة.",
    ],
  },
  {
    id: "trm-law", title: "١١. القانون والاختصاص",
    paras: [
      "تخضع هذه الشروط والأحكام للأنظمة واللوائح المعمول بها في المملكة العربية السعودية.",
      "يُنصح بمراجعة هذا البند واعتماده من مستشار قانوني مختص في الأنظمة السعودية قبل النشر الرسمي.",
    ],
  },
  {
    id: "trm-contact", title: "١٢. التواصل",
    paras: ["لأي استفسار يتعلق بهذه الشروط والأحكام، يرجى التواصل مع الشركة عبر:"],
    bullets: ["البريد الإلكتروني: info@osos.sa", "الرقم الموحد: 9200XXXXX"],
  },
];

function TermsPage({ goTo }: { goTo: (p: Page) => void }) {
  return (
    <LegalLayout
      tag="الشروط والأحكام" title="الشروط والأحكام"
      breadcrumb="الشروط والأحكام"
      sections={TERMS_SECTIONS} heroImg={LEGAL_IMG} goTo={goTo}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [pendingProject, setPendingProject] = useState<Project | null>(null);
  const [pendingProductFilter, setPendingProductFilter] = useState<Project["productType"] | null>(null);
  const [pendingProductId, setPendingProductId] = useState<string>("self-build");
  const [projectsKey, setProjectsKey] = useState(0);

  const goTo = (p: Page) => {
    setPendingProject(null);
    setPendingProductFilter(null);
    if (p === "projects") setProjectsKey((k) => k + 1);
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToProject = (project: Project) => {
    setPendingProject(project);
    setPendingProductFilter(null);
    setPage("projects");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToWithProductFilter = (filter: Project["productType"]) => {
    setPendingProject(null);
    setPendingProductFilter(filter);
    setPage("projects");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToProductDetail = (id: string) => {
    setPendingProductId(id);
    setPage("product-detail");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 w-full z-50 bg-[#0B1B3A]/97 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => goTo("home")} className="flex-shrink-0">
            <img
              src={logoImg}
              alt="شركة أسس"
              className="h-[58px] w-auto object-contain"
            />
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((n) => {
              const isActive = page === n.id || (page === "product-detail" && n.id === "products");
              return (
                <button
                  key={n.id}
                  onClick={() => goTo(n.id)}
                  className={`text-sm transition-colors duration-200 relative ${
                    isActive ? "text-[#D4A843]" : "text-white/55 hover:text-white"
                  }`}
                >
                  {n.label}
                  {isActive && (
                    <span className="absolute -bottom-1 right-0 left-0 h-px bg-[#D4A843] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => goTo("contact")}
              className="hidden md:block px-6 py-2 bg-[#D4A843] text-[#0B1B3A] text-xs font-semibold rounded-md hover:bg-[#D4A843]/90 transition-all duration-200"
            >
              تواصل معنا
            </button>
            <button
              className="md:hidden text-white/70 p-1 hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="القائمة"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#0B1B3A] border-t border-white/5">
            <div className="px-6 py-3 flex flex-col">
              {NAV_ITEMS.map((n) => (
                <button
                  key={n.id}
                  onClick={() => goTo(n.id)}
                  className={`text-right text-sm py-3 border-b border-white/5 last:border-0 transition-colors ${
                    page === n.id
                      ? "text-[#D4A843]"
                      : "text-white/55 hover:text-white"
                  }`}
                >
                  {n.label}
                </button>
              ))}
              <button
                onClick={() => { goTo("contact"); setMenuOpen(false); }}
                className="mt-3 mb-2 w-full py-3 bg-[#D4A843] text-[#0B1B3A] text-sm font-semibold rounded-md"
              >
                تواصل معنا
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── Pages ── */}
      <main className="pt-[72px]">
        {page === "home" && <HomePage goTo={goTo} goToProject={goToProject} goToProductDetail={goToProductDetail} />}
        {page === "about" && <AboutPage goTo={goTo} />}
        {page === "projects" && <ProjectsPage key={projectsKey} goTo={goTo} initialProject={pendingProject} initialProductFilter={pendingProductFilter} />}
        {page === "products" && <ProductsPage goTo={goTo} goToWithProductFilter={goToWithProductFilter} goToProductDetail={goToProductDetail} />}
        {page === "product-detail" && <ProductDetailPage productId={pendingProductId} goTo={goTo} goToProject={goToProject} goToWithProductFilter={goToWithProductFilter} />}
        {page === "news" && <NewsPage goTo={goTo} />}
        {page === "contact" && <ContactPage goTo={goTo} />}
        {page === "careers" && <CareersPage goTo={goTo} />}
        {page === "faq" && <FAQPage goTo={goTo} />}
        {page === "privacy" && <PrivacyPage goTo={goTo} />}
        {page === "terms" && <TermsPage goTo={goTo} />}
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#0B1B3A] pt-8 pb-8 px-6">
        <div className="max-w-7xl mx-auto">

          {/* ── 3 Columns ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/8">

            {/* Column 1 — Brand */}
            <div>
              <img src={logoImg} alt="أسس روائد الإعمار" className="h-14 w-auto object-contain mb-6" style={{ filter: "brightness(0) invert(1)" }} />
              <p className="text-white/50 text-sm leading-[1.95] max-w-xs">
                نطوّر مشاريع عقارية تجمع أصالة العمارة العربية بدقة الهندسة العالمية، لنصنع قيمة تدوم.
              </p>
            </div>

            {/* Column 2 — Links */}
            <div>
              <p className="text-white/40 text-[11px] tracking-[0.18em] uppercase mb-6 font-medium">روابط مهمة</p>
              <div className="flex flex-col gap-3">
                {([
                  { id: "home",     label: "الرئيسية" },
                  { id: "projects", label: "مشاريعنا" },
                  { id: "products", label: "منتجاتنا" },
                  { id: "news",     label: "المركز الإعلامي" },
                  { id: "faq",      label: "الأسئلة الشائعة" },
                  { id: "careers",  label: "وظائف" },
                ] as { id: Page; label: string }[]).map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => goTo(id)}
                    className="text-right text-sm text-white/50 hover:text-[#D4A843] transition-colors w-fit"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3 — Contact */}
            <div>
              <p className="text-white/40 text-[11px] tracking-[0.18em] uppercase mb-6 font-medium">تواصل معنا</p>
              <div className="flex flex-col gap-4 mb-6">
                <a href="tel:+966500000000" className="flex items-center gap-3 text-white/50 hover:text-[#D4A843] text-sm transition-colors">
                  <Phone size={14} className="text-[#D4A843] flex-shrink-0" />
                  <span dir="ltr">+966 50 000 0000</span>
                </a>
                <a href="mailto:info@osos.sa" className="flex items-center gap-3 text-white/50 hover:text-[#D4A843] text-sm transition-colors">
                  <Mail size={14} className="text-[#D4A843] flex-shrink-0" />
                  info@osos.sa
                </a>
                <div className="flex items-start gap-3 text-white/50 text-sm">
                  <MapPin size={14} className="text-[#D4A843] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">فروع في جميع أنحاء المملكة العربية السعودية</span>
                </div>
                <div className="flex items-start gap-3 text-white/50 text-sm">
                  <Clock size={14} className="text-[#D4A843] flex-shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <p>الأحد – الخميس: 9 ص – 5 م</p>
                    <p className="text-white/30 text-xs mt-0.5">الجمعة – السبت: مغلق</p>
                  </div>
                </div>
              </div>
              {/* Social icons */}
              <div className="flex items-center gap-5">
                {SOCIAL_LINKS.map(({ label, href, d }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#D4A843] hover:border-[#D4A843]/40 transition-colors">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Partner / Certification logos ── */}
          <OsosComSa />

          {/* ── Bottom bar ── */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="flex items-center gap-5">
              <button onClick={() => goTo("privacy")} className="text-white/30 hover:text-white/60 transition-colors text-[12px]">
                سياسة الخصوصية
              </button>
              <span className="text-white/15">—</span>
              <button onClick={() => goTo("terms")} className="text-white/30 hover:text-white/60 transition-colors text-[12px]">
                الشروط والأحكام
              </button>
            </div>
            <span className="text-white/25 text-[11px]">
              © 2026 أسس روائد الإعمار للتطوير العقاري — جميع الحقوق محفوظة
            </span>
          </div>

        </div>
      </footer>

      {/* ── Global Contact FAB ── */}
      <ContactFAB goTo={goTo} />
    </div>
  );
}
