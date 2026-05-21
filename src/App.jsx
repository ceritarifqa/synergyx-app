import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Sparkles, TrendingUp, ShieldCheck,
  LineChart, Home, CheckCircle, ArrowRight, User, Users,
  Star, FileText, Send, MessageSquare, PlusCircle, Search,
  Instagram, Linkedin, Globe, MessageCircle, CalendarOff, CalendarCheck, ExternalLink,
  Download, ChevronDown, Heart, Bookmark, Eye, Link, Trophy, Clock, AlertCircle,
  FileCheck, ClipboardList, Pen, BarChart2, Zap, Lock, Mail,
  ArrowLeft, ChevronRight, Wifi, Pencil, Upload, Building2, Image
} from 'lucide-react';

// ─────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────
const MOCK_USER = {
  brandName: "Teman Kreativ",
  isVerified: true,
  industry: "Komunitas & Edukasi",
  location: "Jakarta, Indonesia",
  tagline: "Pusat jejaring kreator dan profesional muda Indonesia.",
  logo: "TK",
  stats: { connections: 128, views: 3420, ongoing: 3, done: 12 },
  founder: {
    name: "Budi Santoso",
    role: "Founder & Community Lead",
    bio: "Membangun ekosistem kreatif sejak 2018. Fokus pada kolaborasi lintas industri dan pemberdayaan talenta lokal.",
    social: { linkedin: "#", ig: "#", web: "https://budisantoso.id" }
  },
  currency: {
    audience: "5.000+ Member aktif, 6K IG Followers, Usia 25-35",
    credibility: "Aktif 2+ Tahun, 30+ Kolaborasi sukses, Rating 4.8/5",
    activation: "Track record 85% target peserta event tercapai",
    network: "Alumni tersebar di 50+ Tech & Creative Company"
  }
};

const MOCK_FEED = [
  { id: 1, partnerId: 1, brand: "TechNova Solutions", author: "Andi Wijaya", authorRole: "CEO", avatar: "TN", time: "2 jam lalu", narration: "Halo temen-temen ekosistem startup! 👋 Bulan depan TechNova mau ngadain 'Tech Future Summit 2026'. Kita lagi open slot buat Main Sponsor. Cocok banget buat temen-temen B2B yang mau dapetin qualified leads dan exposure premium. Let's connect! 🚀", type: "Sponsorship", scheme: "Fresh Money", title: "Sponsor Utama untuk 'Tech Future Summit 2026'", give: "Logo eksklusif di semua aset, 1 slot keynote speaker 15 menit, database 500+ peserta C-Level.", expect: "Pendanaan senilai Rp 15.000.000 untuk operasional event (Via Escrow).", verified: true, likes: 24, saves: 8, isLiked: false, isSaved: false, connectionPost: true },
  { id: 2, partnerId: 2, brand: "Kopi Kenangan Senja", author: "Nabila", authorRole: "Partnership SPV", avatar: "KS", time: "5 jam lalu", narration: "Sore semuanya! Tim Kenangan Senja lagi nyari media partner buat support campaign Promo Akhir Tahun. Kita open buat barter value yaa! ☕✨", type: "Media Partner", scheme: "Barter Value", title: "Kolaborasi Publikasi Promo Akhir Tahun", give: "Voucher kopi senilai Rp 2.000.000 untuk tim media, logo di banner cabang utama.", expect: "2x IG Feed Post, 1x Artikel Liputan di website media.", verified: false, likes: 11, saves: 3, isLiked: false, isSaved: false, connectionPost: false },
  { id: 3, partnerId: 3, brand: "EduMaster Platform", author: "Rizky Ramadhan", authorRole: "Growth Lead", avatar: "EM", time: "1 hari lalu", narration: "Hi leaders! EduMaster lagi ekspansi program Sertifikasi IT. Kita sediain skema komisi yang lumayan banget, tinggal share link unik aja. Ada yang tertarik jadi Strategic Partner? 🤝", type: "Strategic Partner", scheme: "Referral", title: "Afiliasi Kelas Sertifikasi IT Nasional", give: "Komisi 20% (mulai dari Rp 150.000) untuk setiap peserta yang berhasil mendaftar.", expect: "Blast promosi ke database email/WA komunitas partner (minimal 5.000 kontak aktif).", verified: true, likes: 37, saves: 14, isLiked: false, isSaved: false, connectionPost: true },
  { id: 4, partnerId: 4, brand: "Griya Lestari", author: "Sarah Ayu", authorRole: "Marketing Manager", avatar: "GL", time: "1 hari lalu", narration: "Halo! Griya Lestari lagi cari Community Partner, spesifiknya komunitas gowes atau lari di Jabodetabek. Kita mau bikin event 'Fun Bike to Home'. Gas gak? 🚴‍♀️🏡", type: "Community Partner", scheme: "Discount", title: "Fun Bike to Home - Community Support", give: "Diskon booking fee 50% untuk member komunitas, free merchandise event, dan konsumsi peserta.", expect: "Mobilisasi minimal 100 member komunitas untuk hadir di hari H.", verified: true, likes: 19, saves: 6, isLiked: false, isSaved: false, connectionPost: false },
  { id: 5, partnerId: 5, brand: "Local Sounds Festival", author: "Dimas", authorRole: "Event Director", avatar: "LS", time: "2 hari lalu", narration: "Urgent! 🚨 Festival musik indie kita bulan depan butuh Ticketing Partner yang reliable. Target 5.000 orang. Yuk platform ticketing lokal merapat! 🎸🎟️", type: "Lainnya", scheme: "To Be Discussed", title: "Pencarian Ticketing Partner untuk Festival Musik", give: "Eksklusivitas penjualan tiket (target 5.000 pax), logo di semua materi promosi festival.", expect: "Sistem e-ticket aman, fee transaksi flat/rendah, support tim gate di hari H.", verified: false, likes: 8, saves: 2, isLiked: false, isSaved: false, connectionPost: false },
  { id: 6, partnerId: 6, brand: "Kreanova Agency", author: "Maya Putri", authorRole: "Business Dev", avatar: "KA", time: "2 hari lalu", narration: "Hey brand owner! Kreanova lagi buka slot Co-Branding buat brand lokal yang siap naik kelas. Kita full handle dari strategi sampai eksekusi kreatif. Interested? 🎨✨", type: "Strategic Partner", scheme: "Barter Value", title: "Co-Branding Campaign untuk Brand Lokal Naik Kelas", give: "Full branding package Rp 25.000.000, exposure ke 35K audiens, case study publik.", expect: "Testimonial + 3x monthly content collab", verified: true, likes: 45, saves: 18, isLiked: false, isSaved: false, connectionPost: true },
  { id: 7, partnerId: 7, brand: "HealthFirst Indonesia", author: "Dr. Fajar", authorRole: "Community Partnership", avatar: "HF", time: "3 hari lalu", narration: "Hai komunitas profesional! HealthFirst lagi cari partner komunitas untuk program Wellness Wednesday. Cocok buat komunitas yang peduli work-life balance. 🏥💪", type: "Community Partner", scheme: "Barter Value", title: "Wellness Wednesday — Corporate Health Partner", give: "Akses health check gratis untuk 50 member komunitas", expect: "Promosi ke database komunitas min. 3.000 profesional", verified: true, likes: 31, saves: 9, isLiked: false, isSaved: false, connectionPost: false }
];

const MOCK_SENT_PROPOSALS = [
  { id: 'SP1', to: "TechNova Solutions", title: "Sponsor Utama – Tech Future Summit 2026", sentAt: "18 Mei 2026", status: "on_review", meetDate: null, meetLink: null },
  { id: 'SP2', to: "EduMaster Platform", title: "Afiliasi Kelas Sertifikasi IT", sentAt: "15 Mei 2026", status: "accepted", meetDate: "22 Mei 2026 • 10:00 WIB", meetLink: "meet.google.com/edu-syx-abc" },
  { id: 'SP3', to: "Kopi Kenangan Senja", title: "Media Partner Promo Akhir Tahun", sentAt: "12 Mei 2026", status: "rejected", meetDate: null, meetLink: null },
];

const MOCK_PORTFOLIO = [
  { id: 101, title: "Media Partner - Startup Fest 2025", partner: "TechIn Asia", status: "Verified Deal" },
  { id: 102, title: "Sponsorship - Webinar Series", partner: "Bank Jago", status: "Verified Deal" }
];

const MOCK_ACTIVE_COLLABS = [
  { id: 201, type: "Community Partner", scheme: "Barter Value", title: "Kolaborasi Komunitas: Ngabuburit Kreatif", give: "Slot booth gratis, logo on screen, mention MC.", expect: "Membawa minimal 20 member komunitas, 1x IG Post collab." }
];

const formatRp = (n) => 'Rp ' + Number(n).toLocaleString('id-ID');
const generateMeetLink = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const seg = () => Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `meet.google.com/${seg()}-${seg()}-${seg()}`;
};

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [feedItems, setFeedItems] = useState(MOCK_FEED);
  const [filterType, setFilterType] = useState('');
  const [filterScheme, setFilterScheme] = useState('');
  const [filterConn, setFilterConn] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [rightPanel, setRightPanel] = useState(null);
  const [savedMou, setSavedMou] = useState(null);
  const [savedLpj, setSavedLpj] = useState(null);
  const [incomingDealStatus, setIncomingDealStatus] = useState('new');
  const [meetInfo, setMeetInfo] = useState(null);
  const [meetTranscript, setMeetTranscript] = useState(null);
  // ── CHANGED V8: viewingPartnerProfile sekarang menyimpan full partner object (bukan popup) ──
  const [viewingPartnerProfile, setViewingPartnerProfile] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [logoPreview, setLogoPreview] = useState(null);
  // ── NEW V8: isVerified state untuk simulasi notifikasi verifikasi ──
  const [isVerified] = useState(true); // set false untuk lihat warning banner

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    setRightPanel(null);
    // ── CHANGED V8: Reset partner profile view saat navigasi ──
    setViewingPartnerProfile(null);
    window.scrollTo(0, 0);
  };

  const toggleLike = (id) => setFeedItems(f => f.map(x => x.id === id ? { ...x, isLiked: !x.isLiked, likes: x.isLiked ? x.likes - 1 : x.likes + 1 } : x));
  const toggleSave = (id) => setFeedItems(f => f.map(x => x.id === id ? { ...x, isSaved: !x.isSaved, saves: x.isSaved ? x.saves - 1 : x.saves + 1 } : x));

  const filteredFeed = feedItems.filter(x => {
    if (filterConn && !x.connectionPost) return false;
    if (filterType && x.type.toLowerCase() !== filterType.toLowerCase()) return false;
    if (filterScheme && !x.scheme.toLowerCase().includes(filterScheme.toLowerCase())) return false;
    if (searchQ && !x.brand.toLowerCase().includes(searchQ.toLowerCase()) && !x.title.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  });

  // ── CHANGED V8: Dashboard ditambahkan ke isAppView ──
  const isAppView = ['feed', 'profile', 'create', 'proposals', 'chat', 'testimoni', 'dashboard'].includes(currentView);

  // ── SIDEBAR ──────────────────────────────────
  // CHANGED V8: Dashboard sekarang ada di sidebar dan bisa diklik
  const Sidebar = () => (
    <div className="hidden md:flex w-56 bg-[#0F1A2F] border-r border-[#C5A869]/20 h-screen sticky top-0 flex-col py-5 px-3 shadow-xl z-20 flex-shrink-0">
      <div className="flex items-center gap-2 cursor-pointer mb-7 px-2" onClick={() => navigateTo('feed')}>
        <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 100 100" fill="none">
          <path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#C5A869" strokeWidth="4" fill="none"/>
          <path d="M50 18L82 50L50 82L18 50L50 18Z" fill="#2D4066" opacity="0.9"/>
        </svg>
        <span className="text-lg font-bold tracking-wider text-[#C5A869] font-['Cardo']">SynergyX</span>
      </div>

      <div className="flex flex-col gap-1">
        {[
          { id: 'feed', icon: '🏠', label: 'Discovery Feed' },
          { id: 'dashboard', icon: '📊', label: 'Dashboard' }, // FIXED V8: sekarang aktif
          { id: 'profile', icon: '👤', label: 'Profil Bisnis' },
          { id: 'proposals', icon: '💬', label: 'Kelola Proposal' },
        ].map(item => (
          <button key={item.id} onClick={() => navigateTo(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              currentView === item.id ? 'bg-[#C5A869] text-[#0F1A2F] shadow-lg' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'
            }`}>
            <span>{item.icon}</span> {item.label}
          </button>
        ))}

        <div className="my-2 border-t border-[#2D4066]/50"/>
        <p className="px-3 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Interaksi Partner</p>

        <button onClick={() => navigateTo('chat')}
          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            currentView === 'chat' ? 'bg-[#C5A869] text-[#0F1A2F]' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'
          }`}>
          <div className="flex items-center gap-3"><span>💬</span> Pesan / Chat</div>
          <div className="w-2 h-2 rounded-full bg-red-500"/>
        </button>

        <button onClick={() => navigateTo('testimoni')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            currentView === 'testimoni' ? 'bg-[#C5A869] text-[#0F1A2F]' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'
          }`}>
          <span>⭐</span> Rating & Testimoni
        </button>

        <div className="my-2 border-t border-[#2D4066]/50"/>
        <p className="px-3 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Dokumen</p>

        <button onClick={() => { navigateTo('proposals'); setRightPanel('mou'); }}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            rightPanel === 'mou' ? 'bg-[#C5A869] text-[#0F1A2F]' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'
          }`}>
          <span>✏️</span> Input MoU
        </button>

        <button onClick={() => { navigateTo('proposals'); setRightPanel('lpj'); }}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            rightPanel === 'lpj' ? 'bg-[#C5A869] text-[#0F1A2F]' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'
          }`}>
          <span>📋</span> Input LPJ
        </button>
      </div>

      <div className="mt-auto pt-4">
        <button onClick={() => navigateTo('create')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0F1A2F] font-bold text-sm hover:scale-105 transition-transform shadow-lg">
          ＋ Buat Peluang
        </button>
      </div>
    </div>
  );

  // ── DASHBOARD VIEW ────────────────────────────
  // FIXED V8: Dashboard sekarang fully functional dengan semua 15 metrik
  const DashboardView = () => {
    const metrics = [
      { label: "Proposal Received",       value: MOCK_ANALYTICS.proposalReceived,                      icon: "⬇️", color: "text-blue-600",    bg: "bg-blue-50" },
      { label: "Proposal Sent",           value: MOCK_ANALYTICS.proposalSent,                          icon: "⬆️", color: "text-indigo-600",  bg: "bg-indigo-50" },
      { label: "Proposal Pending",        value: MOCK_ANALYTICS.proposalPending,                       icon: "⏳", color: "text-amber-600",   bg: "bg-amber-50" },
      { label: "Proposal Rejected",       value: MOCK_ANALYTICS.proposalRejected,                      icon: "❌", color: "text-red-600",     bg: "bg-red-50" },
      { label: "Proposal Approved",       value: MOCK_ANALYTICS.proposalApproved,                      icon: "✅", color: "text-emerald-600", bg: "bg-emerald-50" },
      { label: "Account Views (30 Hari)", value: MOCK_ANALYTICS.accountViews30.toLocaleString(),       icon: "👁️", color: "text-purple-600",  bg: "bg-purple-50" },
      { label: "Total Koneksi",           value: MOCK_ANALYTICS.totalConnections,                      icon: "🤝", color: "text-amber-700",   bg: "bg-amber-50" },
      { label: "Total Feed Post",         value: MOCK_ANALYTICS.totalFeedPost,                         icon: "📝", color: "text-gray-600",    bg: "bg-gray-100" },
      { label: "Total Like Feed",         value: MOCK_ANALYTICS.totalLikes,                            icon: "❤️", color: "text-red-500",     bg: "bg-red-50" },
      { label: "Total Saved Feed",        value: MOCK_ANALYTICS.totalSaved,                            icon: "🔖", color: "text-amber-700",   bg: "bg-amber-50" },
      { label: "Total Appointment",       value: MOCK_ANALYTICS.totalAppointment,                      icon: "📅", color: "text-teal-600",    bg: "bg-teal-50" },
      { label: "Meeting & Notulensi",     value: MOCK_ANALYTICS.totalMeetingDone,                      icon: "🎥", color: "text-blue-500",    bg: "bg-blue-50" },
      { label: "Total Deal",              value: MOCK_ANALYTICS.totalDeal,                             icon: "🏆", color: "text-amber-700",   bg: "bg-amber-50" },
      { label: "Total MoU/PKS",           value: MOCK_ANALYTICS.totalMouGenerated,                     icon: "📋", color: "text-emerald-600", bg: "bg-emerald-50" },
      { label: "Total LPJ",               value: MOCK_ANALYTICS.totalLpjGenerated,                     icon: "📊", color: "text-emerald-600", bg: "bg-emerald-50" },
    ];
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto w-full">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-['Cardo'] font-bold text-[#0F1A2F]">Dashboard & Analitik</h2>
          <p className="text-gray-500 text-sm mt-1">Ringkasan performa akun dan aktivitas kolaborasi Anda.</p>
        </div>
        <div className="bg-[#0F1A2F] rounded-3xl p-6 mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-xs text-gray-400 uppercase font-bold mb-2">Total Sponsorship Fresh Money</p>
            <p className="text-2xl md:text-3xl font-['Cardo'] font-bold text-[#FFE194]">{formatRp(MOCK_ANALYTICS.totalSponsorshipFreshMoney)}</p>
            <p className="text-xs text-gray-400 mt-1">via Escrow SynergyX</p>
          </div>
          <div className="flex-1 bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-xs text-gray-400 uppercase font-bold mb-2">Total Barter Deals</p>
            <p className="text-2xl md:text-3xl font-['Cardo'] font-bold text-[#C5A869]">{MOCK_ANALYTICS.totalSponsorshipBarter} Deal</p>
            <p className="text-xs text-gray-400 mt-1">Barter Value Partnership</p>
          </div>
          <div className="flex-1 bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-xs text-gray-400 uppercase font-bold mb-2">Deal Rate</p>
            <p className="text-2xl md:text-3xl font-['Cardo'] font-bold text-emerald-400">
              {Math.round(MOCK_ANALYTICS.totalDeal / MOCK_ANALYTICS.proposalSent * 100)}%
            </p>
            <p className="text-xs text-gray-400 mt-1">Dari total proposal terkirim</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {metrics.map(m => (
            <div key={m.label} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-8 h-8 rounded-xl ${m.bg} flex items-center justify-center mb-3 text-base`}>{m.icon}</div>
              <div className="text-xl font-['Cardo'] font-bold text-[#0F1A2F]">{m.value}</div>
              <div className="text-[11px] text-gray-500 font-medium mt-1 leading-tight">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── LANDING VIEW ──────────────────────────────
  const LandingView = () => (
    <div className="min-h-screen bg-[#0A1628] relative flex flex-col overflow-hidden">
      {/* ... sama seperti V7, tidak diubah ... */}
      <header className="relative z-10 flex justify-between items-center px-5 md:px-10 py-5">
        <div className="flex items-center gap-3">
          <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
            <path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#C5A869" strokeWidth="4" fill="none"/>
            <path d="M50 18L82 50L50 82L18 50L50 18Z" fill="#1A2744" opacity="0.9"/>
          </svg>
          <span className="text-2xl font-bold tracking-wider text-[#C5A869] font-['Cardo']">SynergyX</span>
        </div>
        <button onClick={() => navigateTo('login')}
          className="text-sm font-bold text-[#C5A869] border border-[#C5A869]/40 px-4 py-2 rounded-lg hover:bg-[#C5A869]/10 transition">
          Sign In
        </button>
      </header>
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 py-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A869]/10 border border-[#C5A869]/30 text-[#C5A869] text-xs font-bold uppercase mb-7">
          ✦ Ekosistem Kolaborasi B2B Terkurasi
        </div>
        <h1 className="text-4xl md:text-6xl font-['Cardo'] font-bold text-white leading-tight mb-5 max-w-4xl">
          Cari Mitra Kolaborasi?<br/><span className="text-[#C5A869]">Selesaikan dalam Hitungan Menit.</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg mb-8 max-w-2xl leading-relaxed">
          Platform satu pintu untuk mempertemukan agensi, brand, komunitas, dan pihak kemitraan strategis.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => navigateTo('register')}
            className="px-7 py-3.5 rounded-xl bg-[#C5A869] text-[#0F1A2F] font-bold shadow-xl hover:-translate-y-1 transition-all duration-300 text-base">
            Daftar ke SynergyX →
          </button>
          <button onClick={() => navigateTo('login')}
            className="px-7 py-3.5 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition text-base">
            Lihat Demo
          </button>
        </div>
      </section>
    </div>
  );

  // ── LOGIN VIEW ────────────────────────────────
  // CHANGED V8: Langsung email + Google, tanpa pilihan tipe akun
  const LoginView = () => (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-['Cardo'] font-bold text-[#0F1A2F] mb-2">Masuk ke Akun</h3>
          <p className="text-sm text-gray-500">Lanjutkan ekspansi bisnis Anda hari ini.</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); navigateTo('feed'); }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Alamat Email</label>
            <input type="email" placeholder="nama@perusahaan.com"
              className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869]"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Kata Sandi</label>
            <input type="password" placeholder="••••••••"
              className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869]"/>
          </div>
          <button type="submit"
            className="w-full py-3.5 rounded-xl bg-[#0F1A2F] text-white font-bold hover:bg-[#1E2D4A] shadow-lg transition-all">
            Sign In
          </button>
        </form>
        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"/></div>
          <div className="relative flex justify-center"><span className="px-2 bg-white text-gray-500 text-xs font-medium">ATAU</span></div>
        </div>
        <button onClick={() => navigateTo('feed')}
          className="mt-5 w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 font-bold hover:bg-gray-50 transition-colors text-sm">
          Sign in with Google
        </button>
        <p className="text-center text-sm text-gray-500 mt-6">
          Belum punya akun? <button onClick={() => navigateTo('register')} className="text-[#C5A869] font-bold hover:underline">Daftar</button>
        </p>
      </div>
    </div>
  );

  // ── REGISTER VIEW ─────────────────────────────
  // CHANGED V8: Disederhanakan — hanya email/Google.
  // Verifikasi dokumen dipindahkan ke Edit Profil.
  // Ada peringatan 1 bulan batas verifikasi.
  const RegisterView = () => {
    const [done, setDone] = useState(false);
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="flex items-center gap-2 justify-center mb-8">
            <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none">
              <path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#C5A869" strokeWidth="4" fill="none"/>
            </svg>
            <span className="text-xl font-bold text-[#C5A869] font-['Cardo']">SynergyX</span>
          </div>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            {!done ? (
              <>
                <h3 className="text-2xl font-['Cardo'] font-bold text-[#0F1A2F] mb-2">Buat Akun SynergyX</h3>
                <p className="text-sm text-gray-500 mb-4">Mulai perjalanan kolaborasi bisnis Anda.</p>

                {/* NEW V8: Warning 1 bulan verifikasi */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
                  ⏰ <strong>Penting:</strong> Setelah mendaftar, Anda memiliki <strong>1 bulan</strong> untuk
                  melengkapi verifikasi dokumen di halaman <strong>Edit Profil</strong>. Akun yang belum
                  terverifikasi akan memiliki visibilitas lebih rendah di feed dan akan dinonaktifkan jika
                  melewati batas waktu.
                </div>

                <div className="space-y-4">
                  {[["Nama Brand / Entitas","text","Teman Kreativ"],["Email","email","hello@brand.id"],["Password","password","••••••••"]].map(([label,type,ph]) => (
                    <div key={label}>
                      <label className="text-xs font-bold text-gray-600 uppercase block mb-1.5">{label}</label>
                      <input type={type} placeholder={ph}
                        className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869]"/>
                    </div>
                  ))}
                  <button onClick={() => setDone(true)}
                    className="w-full py-3.5 bg-[#0F1A2F] text-white font-bold rounded-xl hover:bg-[#1E2D4A] transition">
                    Daftar Sekarang →
                  </button>
                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"/></div>
                    <div className="relative flex justify-center"><span className="px-2 bg-white text-gray-500 text-xs">ATAU</span></div>
                  </div>
                  <button onClick={() => setDone(true)}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 font-bold hover:bg-gray-50 text-sm">
                    Daftar dengan Google
                  </button>
                </div>
              </>
            ) : (
              /* Success state: arahkan ke Edit Profil untuk upload dokumen */
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-full mx-auto flex items-center justify-center mb-4 text-3xl">✅</div>
                <h3 className="text-xl font-['Cardo'] font-bold text-[#0F1A2F] mb-2">Akun Berhasil Dibuat!</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Selamat datang di SynergyX! Segera lengkapi verifikasi dokumen di <strong>Edit Profil</strong> dalam
                  1 bulan agar akun Anda mendapat visibilitas penuh di feed.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-left text-sm text-amber-800">
                  <p className="font-bold mb-2">📋 Dokumen yang dibutuhkan:</p>
                  <p>• <strong>Bisnis/Perusahaan:</strong> NIB atau link domain resmi</p>
                  <p>• <strong>Komunitas/Organisasi:</strong> Impact Report / bukti kegiatan</p>
                  <p>• <strong>Individu:</strong> Upload KTP</p>
                </div>
                <button onClick={() => navigateTo("feed")}
                  className="w-full py-3.5 bg-[#0F1A2F] text-white font-bold rounded-xl hover:bg-[#1E2D4A] transition">
                  Mulai Gunakan SynergyX →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ── FEED VIEW ─────────────────────────────────
  const FeedView = () => (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto w-full">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-['Cardo'] font-bold text-[#0F1A2F]">Discovery Feed</h2>
        <p className="text-gray-500 text-sm mt-1">Temukan peluang kolaborasi terbaru yang dikurasi untuk industri Anda.</p>
      </div>
      <div className="bg-white border border-gray-100 p-3 md:p-4 rounded-2xl shadow-sm mb-5 flex flex-col gap-3">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
          <input type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Cari nama brand atau kata kunci..." className="w-full bg-[#FDFBF7] border border-gray-200 text-[#0F1A2F] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#C5A869]"/>
        </div>
        <div className="flex gap-2 flex-wrap">
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="flex-1 min-w-[130px] bg-white border border-gray-200 text-gray-700 font-medium rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#C5A869] cursor-pointer">
            <option value="">Semua Tipe</option>
            {['Media Partner','Community Partner','Strategic Partner','Sponsorship','Lainnya'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={filterScheme} onChange={e => setFilterScheme(e.target.value)} className="flex-1 min-w-[130px] bg-white border border-gray-200 text-gray-700 font-medium rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#C5A869] cursor-pointer">
            <option value="">Semua Skema</option>
            {[['Barter','Barter Value'],['Fresh','Fresh Money'],['Referral','Referral'],['Discount','Discount'],['Discussed','To Be Discussed']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <button onClick={() => setFilterConn(v => !v)} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold border transition-all ${filterConn ? 'bg-[#0F1A2F] text-white border-[#0F1A2F]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#0F1A2F]'}`}>
            <Link className="w-3.5 h-3.5"/> Koneksi
          </button>
        </div>
      </div>
      <div>
        {filteredFeed.length === 0
          ? <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-3xl">
              <Search className="w-10 h-10 text-gray-300 mx-auto mb-3"/>
              <h4 className="text-base font-bold text-gray-500 mb-1">Tidak ditemukan</h4>
              <p className="text-sm text-gray-400">Coba ubah filter pencarian Anda.</p>
            </div>
          : filteredFeed.map(card => <CollabCard key={card.id} data={card} onApply={(data) => { setSelectedCard(data); setShowProposalModal(true); }}/>)
        }
      </div>
    </div>
  );

  // ── PROFILE VIEW ──────────────────────────────
  const ProfileView = () => (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full space-y-5">
      <div>
        <h2 className="text-2xl md:text-3xl font-['Cardo'] font-bold text-[#0F1A2F]">Profil Etalase Bisnis</h2>
        <p className="text-gray-500 text-sm mt-1">Kredibilitas bisnis Anda di SynergyX.</p>
      </div>
{/* NEW V8: Verification warning banner — tampil jika belum verified */}
      {!isVerified && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-4 items-start">
          <span className="text-2xl">⚠️</span>
          <div className="flex-1">
            <p className="font-bold text-amber-800 text-sm">Akun Belum Terverifikasi — Sisa 24 Hari</p>
            <p className="text-amber-700 text-xs mt-1 leading-relaxed">
              Segera upload dokumen verifikasi. Akun yang tidak terverifikasi dalam 1 bulan akan dinonaktifkan,
              dan post Anda di feed mendapat visibilitas lebih rendah dari akun verified.
            </p>
            <button className="mt-3 px-4 py-2 bg-amber-800 text-white text-xs font-bold rounded-lg hover:bg-amber-900 transition">
              Upload Dokumen Sekarang
            </button>
          </div>
        </div>
      )}

      
      {/* Header */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
        <div className="h-28 md:h-36 bg-gradient-to-r from-[#0F1A2F] to-[#2D4066] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage:'url(https://www.transparenttextures.com/patterns/cubes.png)'}}/>
        </div>
        <div className="px-5 md:px-8 pb-6 relative">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white border-4 border-white shadow-xl text-[#0F1A2F] flex items-center justify-center text-2xl md:text-3xl font-['Cardo'] font-bold absolute -top-8 md:-top-10">{MOCK_USER.logo}</div>
          <div className="mt-10 md:mt-14 flex flex-col sm:flex-row justify-between items-start gap-3">
            <div>
              <h3 className="text-xl md:text-2xl font-['Cardo'] font-bold text-[#0F1A2F] flex items-center gap-2">{MOCK_USER.brandName} <CheckCircle className="w-5 h-5 text-blue-500"/></h3>
              <p className="text-[#C5A869] font-bold text-xs tracking-wide uppercase mt-1">{MOCK_USER.industry} • {MOCK_USER.location}</p>
              <p className="text-gray-600 mt-3 font-medium italic text-sm">"{MOCK_USER.tagline}"</p>
            </div>
            <button className="px-5 py-2 border-2 border-[#0F1A2F] text-[#0F1A2F] rounded-lg text-sm font-bold hover:bg-[#0F1A2F] hover:text-white transition-colors flex-shrink-0">Pencil Profil</button>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Profil Views', value: MOCK_USER.stats.views.toLocaleString(), icon: <Eye className="w-4 h-4 text-[#C5A869]"/>, sub: '+124 minggu ini' },
          { label: 'Partnership Aktif', value: MOCK_USER.stats.ongoing, icon: <BarChart2 className="w-4 h-4 text-[#C5A869]"/>, sub: 'On going' },
          { label: 'Partnership Selesai', value: MOCK_USER.stats.done, icon: <Trophy className="w-4 h-4 text-[#C5A869]"/>, sub: 'Verified deals' },
          { label: 'Rating', value: '4.8/5', icon: <Star className="w-4 h-4 text-[#C5A869]"/>, sub: 'Dari 30+ deal' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">{s.icon}<span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">{s.label}</span></div>
            <div className="text-xl md:text-2xl font-['Cardo'] font-bold text-[#0F1A2F]">{s.value}</div>
            <div className="text-[11px] text-gray-400 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
      {/* Why Collab */}
      <div className="bg-[#0F1A2F] rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A869]/10 rounded-full blur-2xl"/>
        <h4 className="text-lg md:text-2xl font-['Cardo'] font-bold text-white mb-5">Mengapa Bekerja Sama dengan Kami?</h4>
        <div className="space-y-4">
          {[
            { icon: <ShieldCheck className="w-4 h-4 text-[#C5A869]"/>, title: 'Kredibilitas Terpercaya', desc: 'Dipimpin oleh sosok yang rekam jejaknya terverifikasi. Kami memprioritaskan transparansi dan tata kelola profesional.' },
            { icon: <Users className="w-4 h-4 text-[#C5A869]"/>, title: 'Akses Langsung ke Target Market', desc: 'Mitra kami mendapatkan eksposur organik ke lebih dari 5.000+ member aktif ekosistem kreatif.' },
          ].map(item => (
            <div key={item.title} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-[#C5A869]/20 flex items-center justify-center shrink-0 mt-0.5">{item.icon}</div>
              <div><h5 className="font-bold text-[#FFE194] text-sm">{item.title}</h5><p className="text-gray-300 text-sm mt-1 leading-relaxed">{item.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
      {/* Collaboration Currency */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-lg">
        <h4 className="text-lg md:text-xl font-['Cardo'] font-bold text-[#0F1A2F] mb-4">Collaboration Currency</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: <Users className="w-4 h-4 text-[#C5A869]"/>, label: 'Audience Asset', val: MOCK_USER.currency.audience },
            { icon: <Star className="w-4 h-4 text-[#C5A869]"/>, label: 'Credibility Asset', val: MOCK_USER.currency.credibility },
            { icon: <TrendingUp className="w-4 h-4 text-[#C5A869]"/>, label: 'Activation Asset', val: MOCK_USER.currency.activation },
            { icon: <LineChart className="w-4 h-4 text-[#C5A869]"/>, label: 'Network Asset', val: MOCK_USER.currency.network },
          ].map(c => (
            <div key={c.label} className="bg-[#FDFBF7] p-4 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-2 text-[#0F1A2F] mb-1">{c.icon}<span className="font-bold text-sm">{c.label}</span></div>
              <p className="text-sm text-gray-600">{c.val}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Portfolio */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-lg">
        <h4 className="text-lg md:text-xl font-['Cardo'] font-bold text-[#0F1A2F] mb-4">Portofolio Kolaborasi Sukses</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          {MOCK_PORTFOLIO.map(item => (
            <div key={item.id} className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-50 relative">
              <ShieldCheck className="w-4 h-4 text-emerald-500 absolute top-4 right-4"/>
              <h5 className="text-sm font-bold text-[#0F1A2F] mb-1 pr-6">{item.title}</h5>
              <p className="text-xs font-medium text-gray-500">Mitra: {item.partner}</p>
              <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-500/20 px-2.5 py-1 rounded-md uppercase tracking-wide">{item.status}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Active Collabs */}
      <div className="bg-[#FDFBF7] rounded-3xl p-6 md:p-8 border border-gray-200 border-dashed">
        <div className="flex justify-between items-center mb-5">
          <h4 className="text-lg md:text-xl font-['Cardo'] font-bold text-[#0F1A2F]">Peluang Kolaborasi yang Sedang Dibuka</h4>
          <span className="bg-[#0F1A2F] text-white text-xs font-bold px-3 py-1 rounded-full">{MOCK_ACTIVE_COLLABS.length} Aktif</span>
        </div>
        {MOCK_ACTIVE_COLLABS.map(item => (
          <div key={item.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between gap-4 md:items-center">
            <div className="flex-1">
              <div className="flex gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-[#0F1A2F] text-white">{item.type}</span>
                <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-[#C5A869]/10 text-[#AA7C11] border border-[#C5A869]/30">{item.scheme}</span>
              </div>
              <h5 className="font-['Cardo'] font-bold text-[#0F1A2F] text-base mb-1">{item.title}</h5>
              <p className="text-sm text-gray-500"><strong>Benefit:</strong> {item.give}</p>
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#0F1A2F] text-[#0F1A2F] text-xs font-bold rounded-xl hover:bg-[#0F1A2F] hover:text-white transition-colors flex-shrink-0">
              <Download className="w-4 h-4"/> Download PDF
            </button>
          </div>
        ))}
      </div>
      {/* Founder */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-lg flex flex-col md:flex-row items-start gap-5">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0F1A2F] to-[#2D4066] flex items-center justify-center shrink-0 shadow-inner">
          <User className="w-9 h-9 text-[#C5A869]"/>
        </div>
        <div className="flex-1">
          <h4 className="text-xl md:text-2xl font-['Cardo'] font-bold text-[#0F1A2F]">{MOCK_USER.founder.name}</h4>
          <p className="text-sm font-bold text-[#C5A869] mb-3">{MOCK_USER.founder.role}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{MOCK_USER.founder.bio}</p>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <a href="#" className="flex items-center gap-2 px-3 py-1.5 bg-[#0F1A2F]/5 text-[#0F1A2F] rounded-lg text-xs font-bold hover:bg-[#0F1A2F]/10 transition"><Linkedin className="w-3 h-3"/> LinkedIn</a>
            <a href="#" className="flex items-center gap-2 px-3 py-1.5 bg-[#0F1A2F]/5 text-[#0F1A2F] rounded-lg text-xs font-bold hover:bg-[#0F1A2F]/10 transition"><Instagram className="w-3 h-3"/> Instagram</a>
            <a href={MOCK_USER.founder.social.web} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-[#C5A869]/10 text-[#AA7C11] border border-[#C5A869]/30 rounded-lg text-xs font-bold hover:bg-[#C5A869]/20 transition"><Globe className="w-3 h-3"/> Website</a>
            <a href={`https://www.google.com/search?q=${encodeURIComponent(MOCK_USER.founder.name)}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-[#C5A869]/10 text-[#AA7C11] border border-[#C5A869]/30 rounded-lg text-xs font-bold hover:bg-[#C5A869]/20 transition"><Search className="w-3 h-3"/> Track Record</a>
          </div>
        </div>
      </div>
    </div>
  );

  // ── CREATE VIEW ────────────────────────────────
  const CreateCollabView = () => (
    <div className="p-4 md:p-6 lg:p-8 max-w-2xl mx-auto w-full">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-['Cardo'] font-bold text-[#0F1A2F]">Buat Peluang Baru</h2>
        <p className="text-gray-500 text-sm mt-1">Buat Collaboration Card untuk di-publish ke Feed.</p>
      </div>
      <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-5 md:p-8">
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert('Peluang berhasil di-publish!'); navigateTo('feed'); }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Tipe Kerjasama</label>
              <select className="w-full bg-[#FDFBF7] border border-gray-200 text-[#0F1A2F] font-medium rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869]">
                <option>Sponsorship</option><option>Media Partner</option><option>Community Partner</option><option>Strategic Partner</option><option>Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Skema</label>
              <select className="w-full bg-[#FDFBF7] border border-gray-200 text-[#0F1A2F] font-medium rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869]">
                <option>Fresh Money (via Escrow)</option><option>Barter Value</option><option>Referral (Komisi)</option><option>Discount</option><option>To Be Discussed</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Judul Peluang</label>
            <input type="text" placeholder="Misal: Dicari Media Partner untuk Tech Summit..." className="w-full bg-[#FDFBF7] border border-gray-200 text-[#0F1A2F] font-medium rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869]" required/>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#0F1A2F] mb-2 uppercase flex items-center gap-2">Narasi Kasual <span className="bg-gray-100 text-gray-400 px-2 py-0.5 rounded text-[10px] normal-case">Lebih Humanis</span></label>
            <textarea rows="3" placeholder="Sapa calon mitramu dengan santai..." className="w-full bg-[#FDFBF7] border border-gray-200 text-[#0F1A2F] font-medium rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869]"/>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#C5A869] mb-2 uppercase">Yang Kami Berikan</label>
              <textarea rows="4" placeholder="Benefit untuk mitra..." className="w-full bg-[#FDFBF7] border border-[#C5A869]/30 text-[#0F1A2F] font-medium rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869]" required/>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0F1A2F] mb-2 uppercase">Yang Kami Harapkan</label>
              <textarea rows="4" placeholder="Kewajiban / Syarat mitra..." className="w-full bg-[#FDFBF7] border border-gray-200 text-[#0F1A2F] font-medium rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869]" required/>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Lampirkan Dokumen (Opsional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center hover:bg-gray-50 cursor-pointer transition-colors">
              <FileText className="w-7 h-7 text-gray-400 mx-auto mb-2"/>
              <p className="text-sm font-medium text-gray-500">Upload PDF Proposal Lengkap (Maks. 5MB)</p>
            </div>
          </div>
          <button type="submit" className="w-full py-3.5 rounded-xl bg-[#0F1A2F] text-white font-bold tracking-wider hover:bg-[#1E2D4A] shadow-xl transition-all">Publish ke Feed</button>
        </form>
      </div>
    </div>
  );

  // ── MoU / PKS PANEL ──────────────────────────
  const MouPanel = () => {
    const isDeal = ["deal","mou","lpj","done"].includes(incomingDealStatus);
    const [form, setForm] = useState(savedMou || {
      eventName:"", date:"", venue:"", benefit:"", obligation:"", value:"",
      partnerName:"", partnerPic:"", partnerRole:""
    });
    const [mouSigned, setMouSigned] = useState(false);
    const handleSign = () => {
      const filled = ["eventName","date","venue","benefit","obligation","value"].every(k => form[k].trim());
      if (!filled) { alert("Lengkapi semua field wajib."); return; }
      setMouSigned(true);
      setSavedMou({...form, signed:true});
      setIncomingDealStatus("mou");
      alert("✅ PKS/MoU ditandatangani & PDF digenerate! Email konfirmasi dikirim ke kedua PIC.");
    };
    return (
      <div className="w-full md:w-80 lg:w-96 bg-white border-l border-gray-200 flex flex-col h-full overflow-hidden flex-shrink-0">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#FDFBF7]">
          <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-[#C5A869]"/><h3 className="font-bold text-[#0F1A2F] text-sm">Input PKS / MoU</h3></div>
          <button onClick={() => setRightPanel(null)} className="text-gray-400 hover:text-[#0F1A2F]"><X className="w-4 h-4"/></button>
        </div>
        {!isDeal && <div className="m-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2"><Lock className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0"/><div><p className="text-xs font-bold text-amber-800">Generate & e-Sign Terkunci</p><p className="text-xs text-amber-700 mt-0.5">Aktif setelah status <strong>DEAL</strong>. Anda bisa isi & simpan draft.</p></div></div>}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
            <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wide mb-2">Auto-Populate dari Profil</p>
            <div className="space-y-1 text-xs text-blue-800">
              <p><strong>Pihak 1:</strong> {MOCK_USER.brandName}</p>
              <p><strong>Perwakilan:</strong> {MOCK_USER.founder.name} — {MOCK_USER.founder.role}</p>
              <p><strong>Tipe:</strong> Sponsorship • Fresh Money</p>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wide block mb-1.5">Upload Logo Entitas (PKS & LPJ)</label>
            <div onClick={() => { setLogoPreview("uploaded"); setLogoFile("logo.png"); }} className={`border-2 border-dashed rounded-xl p-3 text-center cursor-pointer transition-all ${logoPreview ? "border-emerald-400 bg-emerald-50" : "border-gray-300 hover:border-[#C5A869]"}`}>
              {logoPreview ? <div className="flex items-center justify-center gap-2 text-emerald-700 text-xs font-bold"><CheckCircle className="w-4 h-4"/> Logo berhasil di-upload</div>
                : <div><Image className="w-5 h-5 text-gray-400 mx-auto mb-1"/><p className="text-xs text-gray-500">Klik upload logo (PNG/SVG)</p></div>}
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 space-y-2">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">Identitas Pihak Kedua (Mitra)</p>
            {[["partnerName","Nama Brand/Perusahaan"],["partnerPic","Nama PIC"],["partnerRole","Jabatan PIC"]].map(([k,label]) => (
              <div key={k}><label className="text-[10px] text-gray-500 block mb-1">{label}</label>
              <input type="text" value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C5A869]"/></div>
            ))}
          </div>
          <div className="bg-[#FDFBF7] rounded-xl p-3 space-y-2 border border-gray-200">
            <p className="text-[10px] font-bold text-[#0F1A2F] uppercase tracking-wide">Pasal 1 — Ruang Lingkup Kegiatan</p>
            {[["eventName","Nama Event / Kegiatan","text","Tech Summit 2026"],["date","Tanggal Pelaksanaan","date",""],["venue","Lokasi / Venue","text","Jakarta Convention Center"],["value","Nilai Kerjasama","text","Rp 15.000.000"]].map(([k,label,type,ph]) => (
              <div key={k}><label className="text-[10px] text-gray-500 block mb-1">{label} <span className="text-red-400">*</span></label>
              <input type={type} value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})} placeholder={ph} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C5A869]"/></div>
            ))}
          </div>
          <div className="bg-[#FDFBF7] rounded-xl p-3 space-y-2 border border-gray-200">
            <p className="text-[10px] font-bold text-[#0F1A2F] uppercase tracking-wide">Pasal 2-3 — Hak & Kewajiban</p>
            {[["benefit","Benefit untuk Mitra (Pasal 2)","Logo di semua aset, slot speaker, dsb..."],["obligation","Kewajiban Mitra (Pasal 3)","2x IG Post, 1 artikel, dsb..."]].map(([k,label,ph]) => (
              <div key={k}><label className="text-[10px] text-gray-500 block mb-1">{label} <span className="text-red-400">*</span></label>
              <textarea rows="3" value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})} placeholder={ph} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C5A869] resize-none"/></div>
            ))}
          </div>
          <div className="bg-[#C5A869]/5 rounded-xl p-3 border border-[#C5A869]/20">
            <p className="text-[10px] font-bold text-[#AA7C11] uppercase tracking-wide mb-2">Pasal 4 — Escrow (Auto)</p>
            <p className="text-xs text-gray-600">Termin I (DP 50%): H+5 hari kerja setelah PKS sign.</p>
            <p className="text-xs text-gray-600 mt-1">Termin II: Setelah LPJ diverifikasi platform.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-1">Pasal 5-7 — Ketentuan Legal (Auto)</p>
            <p className="text-xs text-gray-500">Kerahasiaan • Penyelesaian Sengketa • Pengesahan Elektronik via e-Sign SynergyX.</p>
          </div>
          {mouSigned && <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3"><p className="text-xs font-bold text-emerald-700 flex items-center gap-2"><CheckCircle className="w-4 h-4"/> PKS/MoU ditandatangani secara digital.</p><p className="text-xs text-emerald-600 mt-1">PDF tersimpan & siap didownload.</p></div>}
        </div>
        <div className="p-4 border-t border-gray-100 space-y-2">
          <button onClick={() => { setSavedMou(form); alert("Draft PKS disimpan!"); }} className="w-full py-2.5 border-2 border-[#0F1A2F] text-[#0F1A2F] font-bold text-sm rounded-xl hover:bg-[#0F1A2F] hover:text-white transition-all">Simpan Draft</button>
          {isDeal && !mouSigned
            ? <button onClick={handleSign} className="w-full py-2.5 bg-[#0F1A2F] text-white font-bold text-sm rounded-xl hover:bg-[#1E2D4A] transition-all flex items-center justify-center gap-2"><Pen className="w-3.5 h-3.5 text-[#C5A869]"/> Tandatangani & Generate PDF PKS</button>
            : mouSigned
              ? <button className="w-full py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2"><Download className="w-3.5 h-3.5"/> Download PDF PKS</button>
              : <button disabled className="w-full py-2.5 bg-gray-200 text-gray-400 font-bold text-sm rounded-xl cursor-not-allowed flex items-center justify-center gap-2"><Lock className="w-3.5 h-3.5"/> Generate & e-Sign (Terkunci)</button>
          }
        </div>
      </div>
    );
  };

  // ── LPJ PANEL ────────────────────────────────
  const LpjPanel = () => {
    const isDeal = ["deal","mou","lpj","done"].includes(incomingDealStatus);
    const [form, setForm] = useState(savedLpj || { actualDate:"", actualVenue:"", report:"", peserta:"", reach:"", rating:"5" });
    const [lpjDone, setLpjDone] = useState(false);
    const handleSubmit = () => {
      if (!form.actualDate || !form.actualVenue || !form.report) { alert("Lengkapi field wajib."); return; }
      setLpjDone(true);
      setSavedLpj({...form, submitted:true});
      setIncomingDealStatus("lpj");
      alert("✅ LPJ disubmit! PDF digenerate & email dikirim ke kedua PIC. Pencairan Escrow dalam proses.");
    };
    return (
      <div className="w-full md:w-80 lg:w-96 bg-white border-l border-gray-200 flex flex-col h-full overflow-hidden flex-shrink-0">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#FDFBF7]">
          <div className="flex items-center gap-2"><ClipboardList className="w-4 h-4 text-[#C5A869]"/><h3 className="font-bold text-[#0F1A2F] text-sm">Input LPJ</h3></div>
          <button onClick={() => setRightPanel(null)} className="text-gray-400 hover:text-[#0F1A2F]"><X className="w-4 h-4"/></button>
        </div>
        {!isDeal && <div className="m-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2"><Lock className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0"/><div><p className="text-xs font-bold text-amber-800">Submit LPJ Terkunci</p><p className="text-xs text-amber-700 mt-0.5">Aktif setelah status <strong>DEAL</strong>. Anda bisa isi & simpan draft.</p></div></div>}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
            <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wide mb-2">Auto-Populate dari PKS</p>
            <div className="space-y-1 text-xs text-blue-800">
              <p><strong>Pihak 1:</strong> {MOCK_USER.brandName}</p>
              <p><strong>Mitra:</strong> {savedMou?.partnerName || "Digital Startups ID"}</p>
              <p><strong>Kegiatan:</strong> {savedMou?.eventName || "(dari PKS)"}</p>
              <p><strong>Nilai Kontrak:</strong> {savedMou?.value || "(dari PKS)"}</p>
            </div>
          </div>
          {savedMou?.obligation && <div className="bg-amber-50 border border-amber-100 rounded-xl p-3"><p className="text-[10px] font-bold text-amber-700 uppercase tracking-wide mb-1">Kewajiban dari PKS (Referensi)</p><p className="text-xs text-amber-800">{savedMou.obligation}</p></div>}
          <div className="bg-[#FDFBF7] rounded-xl p-3 space-y-2 border border-gray-200">
            <p className="text-[10px] font-bold text-[#0F1A2F] uppercase tracking-wide">I. Realisasi Pelaksanaan</p>
            {[["actualDate","Tanggal Pelaksanaan Aktual","date"],["actualVenue","Venue Aktual","text"]].map(([k,label,type]) => (
              <div key={k}><label className="text-[10px] text-gray-500 block mb-1">{label} <span className="text-red-400">*</span></label>
              <input type={type} value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C5A869]"/></div>
            ))}
          </div>
          <div className="bg-[#FDFBF7] rounded-xl p-3 space-y-2 border border-gray-200">
            <p className="text-[10px] font-bold text-[#0F1A2F] uppercase tracking-wide">II. Kinerja & Pembuktian Komitmen</p>
            <div><label className="text-[10px] text-gray-500 block mb-1">Ringkasan Realisasi Kewajiban <span className="text-red-400">*</span></label>
            <textarea rows="4" value={form.report} onChange={e => setForm({...form,report:e.target.value})} placeholder="Jelaskan realisasi setiap kewajiban yang disepakati dalam PKS..." className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C5A869] resize-none"/></div>
            {[["peserta","Jumlah Peserta / Kehadiran (Opsional)"],["reach","Total Reach / Impression (Opsional)"]].map(([k,label]) => (
              <div key={k}><label className="text-[10px] text-gray-500 block mb-1">{label}</label>
              <input type="text" value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})} placeholder="e.g. 250 orang / 15.000 views" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C5A869]"/></div>
            ))}
            <div><label className="text-[10px] text-gray-500 block mb-1.5">Rating Pengalaman Kolaborasi</label>
            <div className="flex gap-2">{[1,2,3,4,5].map(n => (<button key={n} onClick={() => setForm({...form,rating:String(n)})} className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${Number(form.rating) >= n ? "bg-[#C5A869] text-[#0F1A2F]" : "bg-gray-100 text-gray-400"}`}>⭐</button>))}</div></div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wide block mb-1.5">Upload Dokumentasi Bukti</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-[#C5A869] transition"><Upload className="w-5 h-5 text-gray-400 mx-auto mb-1"/><p className="text-xs text-gray-500">Foto, Screenshot, PDF (Maks. 5MB)</p></div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
            <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide mb-1">IV. Trigger Pencairan Escrow</p>
            <p className="text-xs text-emerald-800">Submit LPJ akan membuka kunci pelunasan 50% dana yang tertahan di Escrow (maks H+5 hari kerja setelah verifikasi).</p>
          </div>
          {lpjDone && <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3"><p className="text-xs font-bold text-emerald-700 flex items-center gap-2"><CheckCircle className="w-4 h-4"/> LPJ disubmit & PDF digenerate.</p></div>}
        </div>
        <div className="p-4 border-t border-gray-100 space-y-2">
          <button onClick={() => { setSavedLpj(form); alert("Draft LPJ disimpan!"); }} className="w-full py-2.5 border-2 border-[#0F1A2F] text-[#0F1A2F] font-bold text-sm rounded-xl hover:bg-[#0F1A2F] hover:text-white transition-all">Simpan Draft</button>
          {isDeal && !lpjDone
            ? <button onClick={handleSubmit} className="w-full py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"><Send className="w-3.5 h-3.5"/> Submit LPJ & Generate PDF</button>
            : lpjDone
              ? <button className="w-full py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2"><Download className="w-3.5 h-3.5"/> Download PDF LPJ</button>
              : <button disabled className="w-full py-2.5 bg-gray-200 text-gray-400 font-bold text-sm rounded-xl cursor-not-allowed flex items-center justify-center gap-2"><Lock className="w-3.5 h-3.5"/> Submit LPJ (Terkunci)</button>
          }
        </div>
      </div>
    );
  };

  // ── PROPOSALS VIEW ─────────────────────────────
  const ProposalsView = () => {
    const [tab, setTab] = useState('masuk');
    const [meetDate, setMeetDate] = useState('');
    const [meetTime, setMeetTime] = useState('');
    const [partnerEmail, setPartnerEmail] = useState('');
    const [showMeetModal, setShowMeetModal] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('waiting_dp');
    const DEAL_NOMINAL = 15000000;

    const STEPS = ['Proposal Masuk','Jadwal Meeting','DEAL','MoU','LPJ','Selesai'];
    const stepIndex = { new:0, scheduling:1, scheduled:1, deal:2, mou:3, lpj:4, done:5 };
    const currentStep = stepIndex[incomingDealStatus] ?? 0;

    const handleGenerateMeet = () => {
      if (!meetDate || !meetTime || !partnerEmail) { alert('Lengkapi tanggal, waktu, dan email partner.'); return; }
      const link = generateMeetLink();
      setMeetInfo({ date: meetDate, time: meetTime, link, email: partnerEmail });
      setIncomingDealStatus('scheduled');
      setShowMeetModal(true);
    };

    const handleMeetingDone = () => {
      // Auto-generate transcript summary & send email
      setMeetTranscript({
        date: meetInfo?.date || '22 Mei 2026',
        participants: ['Budi Santoso (Teman Kreativ)', 'Reza (Digital Startups ID)'],
        summary: 'Meeting membahas skema barter value untuk kolaborasi media partner. Kedua pihak sepakat dengan 2x IG Feed Post dan 1 artikel liputan. Teman Kreativ akan mendapatkan voucher kopi senilai Rp 2.000.000.',
        keyPoints: ['Skema barter value disepakati kedua pihak','Teman Kreativ: 2x IG Feed Post + 1 Artikel','Digital Startups ID: Voucher kopi Rp 2.000.000 + logo di banner','Timeline pelaksanaan: bulan depan','PIC masing-masing akan sign MoU dalam 3 hari kerja'],
        transcript: 'Budi: Halo Reza, terima kasih sudah join meeting ini...\nReza: Sama-sama Mas Budi. Kita langsung ke intinya ya...\n[dst - transcript otomatis tersimpan dari rekaman Google Meet]'
      });
    };

    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-['Cardo'] font-bold text-[#0F1A2F]">Manajemen Proposal</h2>
          <p className="text-gray-500 text-sm mt-1">Kelola permohonan kerjasama, jadwal meeting, dan status Escrow.</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          {[['masuk','Masuk (1)'],['terkirim','Terkirim (3)'],['deal','Deal & Escrow (1)']].map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)} className={`pb-3 px-4 md:px-6 text-sm font-bold whitespace-nowrap transition-all ${tab === t ? 'text-[#0F1A2F] border-b-2 border-[#0F1A2F]' : 'text-gray-400 hover:text-[#0F1A2F]'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* ── TAB: MASUK ── */}
        {tab === 'masuk' && (
          <div className="space-y-5">
            {/* Progress Tracker */}
            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Progress Tracking</h4>
              <div className="flex items-start">
                {STEPS.map((s, i) => (
                  <div key={s} className="flex-1 flex flex-col items-center relative">
                    {i < STEPS.length - 1 && (
                      <div className={`absolute top-3.5 left-1/2 w-full h-0.5 z-0 transition-colors duration-500 ${i < currentStep ? 'bg-[#C5A869]' : 'bg-gray-200'}`}/>
                    )}
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center z-10 text-xs font-bold transition-all duration-300 ${i < currentStep ? 'bg-[#C5A869] border-[#C5A869] text-[#0F1A2F]' : i === currentStep ? 'bg-[#0F1A2F] border-[#0F1A2F] text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                      {i < currentStep ? <CheckCircle className="w-3.5 h-3.5"/> : i === 2 ? <CheckCircle className="w-3 h-3"/> : i + 1}
                    </div>
                    <p className={`text-[9px] font-bold text-center mt-1.5 leading-tight max-w-[48px] ${i === currentStep ? 'text-[#0F1A2F]' : i < currentStep ? 'text-[#C5A869]' : 'text-gray-400'}`}>{s}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Incoming Proposal Card */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-5 md:p-7">
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base border border-blue-100 flex-shrink-0">DS</div>
                  <div>
                    <h4 className="text-[#0F1A2F] font-bold text-base">Digital Startups ID</h4>
                    <p className="text-xs font-bold text-gray-500 mt-0.5">Proposal untuk: <span className="text-[#C5A869]">Media Partner Promo</span></p>
                  </div>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold uppercase tracking-widest flex-shrink-0">Baru</span>
              </div>

              {/* Elevator Pitch */}
              <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-gray-200 mb-5 relative">
                <div className="absolute -left-2 top-5 w-3.5 h-3.5 rotate-45 bg-[#FDFBF7] border-l border-b border-gray-200"/>
                <p className="text-sm text-gray-700 leading-relaxed font-medium italic">"Halo Teman Kreativ, kami sangat tertarik dengan sistem barter value ini. Ekosistem kami punya 20.000+ subscriber newsletter aktif B2B."</p>
              </div>

              {/* Action Buttons by status */}
              {incomingDealStatus === 'new' && (
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-4 py-2.5 border-2 border-gray-200 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors"><CalendarOff className="w-4 h-4"/> Tolak</button>
                  <button onClick={() => navigateTo('chat')} className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 border border-blue-200 text-sm font-bold rounded-xl hover:bg-blue-100 transition-colors"><MessageCircle className="w-4 h-4"/> Chat PIC</button>
                  <button onClick={() => setIncomingDealStatus('scheduling')} className="flex items-center gap-2 px-4 py-2.5 bg-[#0F1A2F] text-white text-sm font-bold rounded-xl hover:bg-[#1E2D4A] shadow-lg ml-auto transition-all">
                    <CalendarCheck className="w-4 h-4 text-[#C5A869]"/> Terima & Jadwalkan Meeting
                  </button>
                </div>
              )}

              {incomingDealStatus === 'scheduling' && (
                <div className="mt-4 border-t border-gray-100 pt-5">
                  <h5 className="font-bold text-[#0F1A2F] mb-4 flex items-center gap-2 text-sm"><CalendarCheck className="w-4 h-4 text-[#C5A869]"/> Atur Jadwal Meeting</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    {[['date','Tanggal','date',meetDate,setMeetDate],['time','Waktu (WIB)','time',meetTime,setMeetTime],['email','Email Partner','email',partnerEmail,setPartnerEmail]].map(([id,label,type,val,setter]) => (
                      <div key={id}>
                        <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1.5">{label}</label>
                        <input type={type} value={val} onChange={e => setter(e.target.value)} placeholder={type==='email'?'pic@partner.com':''} className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#C5A869]"/>
                      </div>
                    ))}
                  </div>
                  <button onClick={handleGenerateMeet} className="flex items-center gap-2 px-5 py-2.5 bg-[#0F1A2F] text-white text-sm font-bold rounded-xl hover:bg-[#1E2D4A] shadow-lg transition-all">
                    <Zap className="w-4 h-4 text-[#C5A869]"/> Generate Link GMeet & Kirim Email
                  </button>
                </div>
              )}

              {/* After Scheduled */}
              {['scheduled','deal','mou','lpj','done'].includes(incomingDealStatus) && (
                <div className="mt-4 border-t border-gray-100 pt-5 space-y-4">
                  {/* Meeting Info */}
                  {meetInfo && (
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">
                      <p className="text-xs text-blue-600 font-bold uppercase mb-2">📅 Meeting Terjadwal</p>
                      <p className="text-sm font-bold text-[#0F1A2F]">{meetInfo.date} • {meetInfo.time} WIB</p>
                      <a href="#" className="text-sm text-blue-600 flex items-center gap-1 mt-1 font-medium hover:underline"><ExternalLink className="w-3.5 h-3.5"/> {meetInfo.link}</a>
                      <p className="text-xs text-gray-400 mt-1">Undangan telah dikirim ke email kedua belah pihak secara otomatis.</p>
                    </div>
                  )}

                  {/* Meeting Done + DEAL button (only when scheduled) */}
                  {incomingDealStatus === 'scheduled' && (
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button onClick={() => { handleMeetingDone(); setIncomingDealStatus('scheduled'); }} className="flex items-center gap-2 px-4 py-2.5 border-2 border-blue-300 text-blue-700 text-sm font-bold rounded-xl hover:bg-blue-50 transition-colors">
                        <Wifi className="w-4 h-4"/> Meeting Done & Simpan Notulensi
                      </button>
                      <button onClick={() => setIncomingDealStatus('deal')} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0F1A2F] text-sm font-bold rounded-xl hover:scale-105 transition-transform shadow-lg ml-auto">
                        <CheckCircle className="w-4 h-4"/> Confirm DEAL 🤝
                      </button>
                    </div>
                  )}

                  {/* Transcript/Notulensi (shown after meeting done) */}
                  {meetTranscript && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Wifi className="w-4 h-4 text-[#C5A869]"/>
                        <h5 className="font-bold text-[#0F1A2F] text-sm">Ringkasan Notulensi Meeting</h5>
                        <span className="ml-auto text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Auto-saved</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2"><strong>Tanggal:</strong> {meetTranscript.date} | <strong>Peserta:</strong> {meetTranscript.participants.join(', ')}</p>
                      <div className="bg-[#FDFBF7] p-3 rounded-xl mb-3">
                        <p className="text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Ringkasan</p>
                        <p className="text-xs text-gray-700 leading-relaxed">{meetTranscript.summary}</p>
                      </div>
                      <div className="bg-[#FDFBF7] p-3 rounded-xl mb-3">
                        <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Poin Kesepakatan</p>
                        {meetTranscript.keyPoints.map((pt,i) => (
                          <div key={i} className="flex items-start gap-2 mb-1.5">
                            <span className="text-[#C5A869] mt-0.5 flex-shrink-0 text-xs">✓</span>
                            <span className="text-xs text-gray-700">{pt}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xs text-emerald-600 font-bold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5"/> Email dikirim ke semua peserta</span>
                        <button className="ml-auto flex items-center gap-1.5 text-xs font-bold text-[#0F1A2F] border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                          <Download className="w-3 h-3"/> Download PDF
                        </button>
                      </div>
                    </div>
                  )}

                  {/* DEAL confirmed badge */}
                  {['deal','mou','lpj','done'].includes(incomingDealStatus) && (
                    <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#C5A869]/10 border border-[#C5A869]/40 p-4 rounded-2xl">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-5 h-5 text-[#C5A869]"/>
                        <h5 className="font-bold text-[#0F1A2F]">DEAL Terkonfirmasi! 🎉</h5>
                      </div>
                      <p className="text-xs text-gray-600">Kedua pihak telah sepakat. MoU dan LPJ kini dapat di-generate. Lanjutkan ke Input MoU di sidebar kiri.</p>
                      <div className="flex gap-2 mt-3">
                        <button onClick={() => setRightPanel('mou')} className="flex items-center gap-1.5 px-3 py-2 bg-[#0F1A2F] text-white text-xs font-bold rounded-lg hover:bg-[#1E2D4A] transition-colors">
                          <Pencil className="w-3.5 h-3.5"/> Buka Input MoU
                        </button>
                        <button onClick={() => setRightPanel('lpj')} className="flex items-center gap-1.5 px-3 py-2 border border-[#0F1A2F] text-[#0F1A2F] text-xs font-bold rounded-lg hover:bg-[#0F1A2F] hover:text-white transition-colors">
                          <FileText className="w-3.5 h-3.5"/> Buka Input LPJ
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB: TERKIRIM ── */}
        {tab === 'terkirim' && (
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-[#FDFBF7] flex items-center justify-between">
              <h4 className="font-bold text-[#0F1A2F]">Rekap Proposal Terkirim</h4>
              <span className="text-xs text-gray-400 font-medium">{MOCK_SENT_PROPOSALS.length} proposal</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead><tr className="border-b border-gray-100 bg-[#FDFBF7]">
                  {['Ditujukan Ke','Judul','Tanggal Kirim','Status','Detail'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {MOCK_SENT_PROPOSALS.map(p => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-[#FDFBF7] transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0F1A2F] to-[#2D4066] text-[#C5A869] text-[10px] font-bold flex items-center justify-center flex-shrink-0">{p.to.slice(0,2).toUpperCase()}</div>
                          <span className="text-sm font-bold text-[#0F1A2F] hidden sm:block">{p.to}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3"><p className="text-sm text-gray-700 font-medium max-w-[160px] truncate">{p.title}</p></td>
                      <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{p.sentAt}</td>
                      <td className="px-4 py-3">
                        {p.status === 'on_review' && <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-amber-100 text-amber-600 uppercase"><Clock className="w-3 h-3"/> On Review</span>}
                        {p.status === 'accepted' && <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 uppercase"><CheckCircle className="w-3 h-3"/> Diterima</span>}
                        {p.status === 'rejected' && <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-red-100 text-red-600 uppercase"><X className="w-3 h-3"/> Ditolak</span>}
                      </td>
                      <td className="px-4 py-3">
                        {p.status === 'accepted' && p.meetDate ? (
                          <div className="text-xs">
                            <p className="font-bold text-[#0F1A2F]">{p.meetDate}</p>
                            <a href="#" className="text-blue-600 flex items-center gap-1 mt-0.5 hover:underline font-medium"><ExternalLink className="w-3 h-3"/>{p.meetLink}</a>
                          </div>
                        ) : <span className="text-xs text-gray-400">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB: DEAL & ESCROW ── */}
        {tab === 'deal' && (
          <div className="bg-white border-2 border-[#C5A869]/30 rounded-3xl p-5 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A869]/10 rounded-bl-full pointer-events-none"/>
            <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-3">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Tipe: Sponsorship — Fresh Money</span>
                <h4 className="text-[#0F1A2F] font-bold text-xl mb-1">Tech Future Summit 2026</h4>
                <p className="text-sm text-gray-500 font-medium">Mitra: TechNova Solutions</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-50 text-amber-600 px-3 py-1.5 rounded-full border border-amber-200">Active Deal</span>
            </div>
            <div className="bg-[#FDFBF7] p-5 rounded-2xl border border-gray-200 mb-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-gray-600">Total Nilai Sponsorship</span>
                <span className="text-xl md:text-2xl font-['Cardo'] font-bold text-[#0F1A2F]">{formatRp(15000000)}</span>
              </div>
              <div className="text-xs text-amber-700 font-bold mb-4 border-t border-gray-200 pt-3 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0"/><span>Nominal {'>'} Rp 5 juta: DP 50% ({formatRp(7500000)}) maks H+5 hari kerja MoU sign. Pelunasan {formatRp(7500000)} setelah LPJ disubmit.</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: `DP 50% — ${formatRp(7500000)}`, sub: 'Deadline: H+5 hari kerja dari MoU sign', paid: false, key: 'dp' },
                  { label: `Pelunasan 50% — ${formatRp(7500000)}`, sub: 'Setelah LPJ disubmit, maks H+5 hari kerja', paid: false, key: 'full', locked: true },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-50 flex-shrink-0">
                        {item.locked ? <Lock className="w-4 h-4 text-gray-400"/> : <Clock className="w-4 h-4 text-amber-600"/>}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0F1A2F]">{item.label}</p>
                        <p className="text-xs text-gray-400">{item.sub}</p>
                      </div>
                    </div>
                    {item.locked ? <span className="text-xs text-gray-400 font-medium">Terkunci</span>
                      : <button className="text-xs font-bold px-3 py-1.5 bg-[#0F1A2F] text-white rounded-lg hover:bg-[#1E2D4A] transition">Konfirmasi Bayar</button>}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium leading-relaxed p-4 bg-[#FDFBF7] rounded-xl border border-gray-200">
              <span className="text-[#0F1A2F] font-bold">INFO SISTEM:</span> Dana akan ditransfer ke rekening Escrow PT SynergyX dan ditahan hingga LPJ diverifikasi.
            </p>
          </div>
        )}

        {/* Meeting Scheduled Toast Modal */}
        {showMeetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-7 max-w-sm w-full shadow-2xl text-center border-t-4 border-[#0F1A2F]">
              <div className="w-14 h-14 bg-[#FDFBF7] rounded-full mx-auto flex items-center justify-center mb-4 border border-gray-100">
                <CalendarCheck className="w-7 h-7 text-[#0F1A2F]"/>
              </div>
              <h3 className="text-xl font-['Cardo'] font-bold text-[#0F1A2F] mb-2">Meeting Terjadwal!</h3>
              <p className="text-gray-500 text-sm mb-5">Undangan kalender & link GMeet telah otomatis dikirimkan ke kedua belah pihak.</p>
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl mb-5 text-left">
                <p className="text-xs text-blue-600 font-bold uppercase mb-1">Detail Pertemuan</p>
                <p className="text-sm text-[#0F1A2F] font-bold mb-1">{meetInfo?.date} • {meetInfo?.time} WIB</p>
                <a href="#" className="text-sm text-blue-600 hover:underline flex items-center gap-1 font-medium"><ExternalLink className="w-3.5 h-3.5"/> {meetInfo?.link}</a>
              </div>
              <button onClick={() => setShowMeetModal(false)} className="w-full py-3 bg-[#0F1A2F] text-white font-bold rounded-xl hover:bg-[#1E2D4A] transition-colors text-sm">
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── CHAT VIEW ─────────────────────────────────
  const ChatView = () => {
    const [activeChat, setActiveChat] = useState(0);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
      { id:1, from:'DS', text:'Halo mas Budi, terkait proposal Media Partner yang kami kirim, apakah jadwal event-nya fixed di tanggal 25?', time:'10:45', mine:false },
      { id:2, from:'me', text:'Halo Reza! Betul, tanggal 25 sudah fixed. Kami sudah booking venue-nya. Kapan bisa kita lanjut diskusi detail teknisnya?', time:'10:52', mine:true },
      { id:3, from:'DS', text:'Siap banget! Kita bisa setup call besok jam 10 pagi ya? Saya mau ajak Head of Marketing kita juga.', time:'10:55', mine:false },
      { id:4, from:'me', text:'Oke deal! Saya akan kirimkan invite Google Meet ke email kamu.', time:'10:58', mine:true },
    ]);
    const messagesEndRef = useRef(null);
    const chatContacts = [
      { av:'DS', name:'Digital Startups ID', role:'Reza - PIC', last:'Siap banget! Kita bisa setup...', time:'10:55', online:true, dot:true, color:'bg-blue-100 text-blue-700' },
      { av:'TN', name:'TechNova Solutions', role:'Andi - CEO', last:'Sip, MoU sudah kita review ya.', time:'Kemarin', online:false, dot:false, color:'bg-purple-100 text-purple-700' },
    ];

    const sendMessage = () => {
      if (!message.trim()) return;
      setMessages(prev => [...prev, { id: Date.now(), from:'me', text:message, time: new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'}), mine:true }]);
      setMessage('');
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior:'smooth' }), 50);
    };

    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages]);

    return (
      <div className="flex flex-col md:flex-row h-[calc(100vh-3.5rem)] md:h-screen overflow-hidden">
        {/* Contact List */}
        <div className={`${activeChat !== null ? 'hidden md:flex' : 'flex'} md:w-64 lg:w-72 flex-col bg-white border-r border-gray-200 flex-shrink-0`}>
          <div className="p-4 border-b border-gray-100 bg-[#FDFBF7]">
            <h2 className="font-['Cardo'] font-bold text-[#0F1A2F] text-lg mb-3">Pesan / Chat PIC</h2>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
              <input type="text" placeholder="Cari partner..." className="w-full bg-white border border-gray-200 text-[#0F1A2F] rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[#C5A869]"/>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chatContacts.map((c, i) => (
              <div key={c.name} onClick={() => setActiveChat(i)} className={`p-4 border-b border-gray-50 cursor-pointer flex gap-3 items-center hover:bg-gray-50 transition-colors ${activeChat === i ? 'bg-[#FDFBF7] border-l-2 border-l-[#C5A869]' : ''}`}>
                <div className="relative flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full ${c.color} font-bold flex items-center justify-center text-sm`}>{c.av}</div>
                  {c.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"/>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h5 className="font-bold text-sm text-[#0F1A2F] truncate">{c.name}</h5>
                    <span className="text-[10px] text-gray-400 flex-shrink-0 ml-1">{c.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{c.role} • {c.last}</p>
                </div>
                {c.dot && <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"/>}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${activeChat === null ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-[#FDFBF7]/40 overflow-hidden`}>
          {/* Chat Header */}
          <div className="p-3 md:p-4 border-b border-gray-200 bg-white flex items-center justify-between gap-3 flex-shrink-0">
            <div className="flex items-center gap-3">
              <button className="md:hidden text-gray-500 hover:text-[#0F1A2F] p-1" onClick={() => setActiveChat(null)}>
                <ArrowLeft className="w-5 h-5"/>
              </button>
              <div className="relative flex-shrink-0">
                <div className={`w-9 h-9 rounded-full ${chatContacts[activeChat ?? 0]?.color} font-bold flex items-center justify-center text-sm`}>{chatContacts[activeChat ?? 0]?.av}</div>
                {chatContacts[activeChat ?? 0]?.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"/>}
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0F1A2F]">{chatContacts[activeChat ?? 0]?.name}</h4>
                <p className="text-xs text-emerald-500 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"/> {chatContacts[activeChat ?? 0]?.online ? 'Online' : 'Offline'} • {chatContacts[activeChat ?? 0]?.role}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs font-bold text-[#C5A869] border border-[#C5A869]/30 px-3 py-1.5 rounded-lg hover:bg-[#C5A869]/10 transition hidden sm:block">Lihat Profil</button>
              <button onClick={() => navigateTo('proposals')} className="text-xs font-bold text-[#0F1A2F] border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition hidden sm:flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5"/> Proposal
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className={`flex items-end gap-2 ${msg.mine ? 'flex-row-reverse' : 'flex-row'}`}>
                {!msg.mine && (
                  <div className={`w-7 h-7 rounded-full ${chatContacts[activeChat ?? 0]?.color} font-bold flex items-center justify-center text-xs flex-shrink-0`}>
                    {chatContacts[activeChat ?? 0]?.av}
                  </div>
                )}
                <div className={`max-w-[75%] md:max-w-[65%] px-4 py-2.5 rounded-2xl ${msg.mine ? 'bg-[#0F1A2F] text-white rounded-br-sm' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'}`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <span className={`text-[10px] mt-1 block ${msg.mine ? 'text-gray-400 text-right' : 'text-gray-400'}`}>{msg.time}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}/>
          </div>

          {/* Input */}
          <div className="p-3 md:p-4 bg-white border-t border-gray-200 flex-shrink-0">
            <div className="flex gap-2 items-end">
              <div className="flex-1 bg-[#FDFBF7] border border-gray-200 rounded-2xl px-4 py-2.5 focus-within:border-[#C5A869] transition-colors">
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Ketik pesan... (Enter untuk kirim)"
                  rows={1}
                  className="w-full bg-transparent text-[#0F1A2F] text-sm focus:outline-none resize-none"
                  style={{ maxHeight: '80px', overflowY: 'auto' }}
                />
              </div>
              <button onClick={sendMessage} className="w-10 h-10 bg-[#0F1A2F] text-white rounded-xl flex items-center justify-center hover:bg-[#1E2D4A] transition-colors flex-shrink-0">
                <Send className="w-4 h-4"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── TESTIMONI VIEW ─────────────────────────────
  const TestimoniView = () => (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-['Cardo'] font-bold text-[#0F1A2F]">Rating & Testimoni</h2>
        <p className="text-gray-500 text-sm mt-1">Ulasan dari partner yang telah bekerjasama dengan Anda.</p>
      </div>
      <div className="bg-[#0F1A2F] rounded-3xl p-6 md:p-8 mb-6 text-white flex flex-col md:flex-row items-center gap-6 shadow-xl">
        <div className="text-center flex-shrink-0">
          <div className="text-4xl md:text-5xl font-['Cardo'] font-bold text-[#FFE194] mb-2">4.8</div>
          <div className="flex gap-1 justify-center mb-1 text-[#C5A869]">
            {[1,2,3,4].map(i => <Star key={i} className="w-4 h-4 fill-current"/>)}
            <Star className="w-4 h-4 fill-current opacity-50"/>
          </div>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Dari 30+ Deal</p>
        </div>
        <div className="flex-1 md:border-l border-[#2D4066] md:pl-6">
          <h4 className="text-lg font-bold mb-2">Kredibilitas Top-Tier! 🌟</h4>
          <p className="text-sm text-gray-300 leading-relaxed">Partner sangat puas dengan komitmen dan profesionalitas dalam mengeksekusi Collaboration Card yang di-publish.</p>
        </div>
      </div>
      <div className="space-y-4">
        {[
          { av:'TA', name:'TechIn Asia', stars:5, text:'Kerjasama berjalan sangat smooth! Timnya responsif banget dan deliver apa yang dijanjikan tanpa kurang satu pun. Definitly will collab again.' },
          { av:'BJ', name:'Bank Jago', stars:4, text:'ROI sponsorship cukup memuaskan. Target akuisisi user baru dari event ini tercapai 85%. Escrow system SynergyX juga bikin kita sebagai sponsor merasa secure.' },
        ].map(r => (
          <div key={r.name} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-sm">{r.av}</div>
                <div>
                  <h5 className="font-bold text-sm text-[#0F1A2F]">{r.name}</h5>
                  <p className="text-xs text-emerald-600 font-medium">Verified Deal Partner</p>
                </div>
              </div>
              <div className="flex gap-0.5 text-[#C5A869]">
                {Array.from({length:5}).map((_,i) => <Star key={i} className={`w-3.5 h-3.5 ${i < r.stars ? 'fill-current' : ''}`}/>)}
              </div>
            </div>
            <p className="text-sm text-gray-600 italic">"{r.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );

  // ── RENDER ─────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FDFBF7] font-['Inter'] text-slate-800">
      {currentView === 'landing' && <LandingView/>}
      {currentView === 'login' && <LoginView/>}
      {currentView === 'register' && <RegisterView/>}

      {isAppView && (
        <div className="flex max-w-screen-2xl mx-auto min-h-screen">
          <Sidebar/>
          <MobileHeader/>
          
          <main className={`flex-1 min-w-0 pt-14 md:pt-0 overflow-y-auto ${currentView === 'chat' ? '' : 'pb-10'}`}>
            {viewingPartnerProfile ? (
              <PartnerProfileView partner={viewingPartnerProfile}/>
            ) : (
              <>
                {currentView === 'feed' && <FeedView/>}
                {currentView === 'dashboard' && <DashboardView/>}
                {currentView === 'profile' && <ProfileView/>}
                {currentView === 'create' && <CreateCollabView/>}
                {currentView === 'proposals' && <ProposalsView/>}
                {currentView === 'chat' && <ChatView/>}
                {currentView === 'testimoni' && <TestimoniView/>}
              </>
            )}
          </main>
          {/* Right Panel — MoU/LPJ */}
          {rightPanel === 'mou' && <div className="hidden md:flex"><MouPanel/></div>}
          {rightPanel === 'lpj' && <div className="hidden md:flex"><LpjPanel/></div>}
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="w-64 bg-[#0F1A2F] h-full p-5 flex flex-col gap-2 shadow-2xl overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-5">
              <svg className="w-7 h-7" viewBox="0 0 100 100" fill="none"><path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#C5A869" strokeWidth="4" fill="none"/><path d="M50 18L82 50L50 82L18 50L50 18Z" fill="#2D4066" opacity="0.9"/></svg>
              <span className="text-lg font-bold text-[#C5A869] font-['Cardo']">SynergyX</span>
            </div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 ml-2">Navigasi</p>
            {[
              { id:'feed', icon:<Home className="w-4 h-4"/>, label:'Feed' },
              { id:'dashboard', icon:<BarChart2 className="w-4 h-4"/>, label:'Dashboard' },
              { id:'profile', icon:<User className="w-4 h-4"/>, label:'Profil' },
              { id:'proposals', icon:<MessageSquare className="w-4 h-4"/>, label:'Proposal' },
              { id:'chat', icon:<MessageCircle className="w-4 h-4"/>, label:'Chat PIC' },
              { id:'testimoni', icon:<Star className="w-4 h-4"/>, label:'Testimoni' },
            ].map(item => (
              <button key={item.id} onClick={() => navigateTo(item.id)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-300 hover:bg-[#2D4066]/30 hover:text-white text-left">
                {item.icon}{item.label}
              </button>
            ))}
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 ml-2 mt-3">Dokumen</p>
            <button onClick={() => { navigateTo('proposals'); setRightPanel('mou'); }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-300 hover:bg-[#2D4066]/30 hover:text-white text-left">
              <Pencil className="w-4 h-4"/> Input MoU
            </button>
            <button onClick={() => { navigateTo('proposals'); setRightPanel('lpj'); }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-300 hover:bg-[#2D4066]/30 hover:text-white text-left">
              <FileText className="w-4 h-4"/> Input LPJ
            </button>
            <div className="mt-5">
              <button onClick={() => navigateTo('create')} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[#0F1A2F] bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] font-bold text-sm">
                <PlusCircle className="w-4 h-4"/> Buat Peluang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Proposal Modal */}
      {viewingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="h-20 bg-gradient-to-r from-[#0F1A2F] to-[#2D4066] relative">
              <button onClick={() => setViewingProfile(null)} className="absolute top-3 right-3 text-white/60 hover:text-white"><X className="w-5 h-5"/></button>
            </div>
            <div className="px-6 pb-6 relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0F1A2F] to-[#2D4066] border-4 border-white text-[#C5A869] font-bold text-xl flex items-center justify-center absolute -top-8 shadow-lg">{viewingProfile.avatar}</div>
              <div className="mt-10">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-[#0F1A2F]">{viewingProfile.brand}</h3>
                  {viewingProfile.verified && <CheckCircle className="w-4 h-4 text-blue-500"/>}
                </div>
                <p className="text-xs text-[#C5A869] font-bold uppercase tracking-wide mb-1">{viewingProfile.industry} • {viewingProfile.accountType || 'bisnis'}</p>
                <p className="text-sm text-gray-600 mb-4">{viewingProfile.author} — {viewingProfile.authorRole}</p>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[['24','Feed Post'],['128','Koneksi'],['4.8','Rating']].map(([v,l]) => (
                    <div key={l} className="text-center bg-[#FDFBF7] rounded-xl p-3 border border-gray-100">
                      <div className="text-lg font-bold text-[#0F1A2F] font-['Cardo']">{v}</div>
                      <div className="text-[10px] text-gray-500 font-medium">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleConnect(viewingProfile)} className="flex-1 py-2.5 bg-[#0F1A2F] text-white font-bold text-sm rounded-xl hover:bg-[#1E2D4A] transition flex items-center justify-center gap-2">
                    <Users className="w-4 h-4"/> Connect
                  </button>
                  <button onClick={() => setViewingProfile(null)} className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 font-bold text-sm rounded-xl hover:bg-gray-50 transition">Tutup</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-gray-100 rounded-3xl w-full max-w-lg p-6 md:p-8 relative shadow-2xl">
            <button onClick={() => setShowProposalModal(false)} className="absolute top-5 right-5 text-gray-400 hover:text-[#0F1A2F]"><X className="w-5 h-5"/></button>
            <h2 className="text-xl md:text-2xl font-['Cardo'] font-bold text-[#0F1A2F] mb-1">Ajukan Proposal</h2>
            <p className="text-sm text-gray-500 mb-5 font-medium">ke <strong className="text-[#C5A869]">{selectedCard?.brand}</strong></p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Penawaran Anda (Elevator Pitch)</label>
                <textarea rows="4" className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl p-4 text-[#0F1A2F] font-medium text-sm focus:outline-none focus:border-[#C5A869]" placeholder="Jelaskan secara singkat mengapa Anda cocok sebagai partner..."/>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#FDFBF7] rounded-xl border border-gray-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0F1A2F] to-[#2D4066] text-[#C5A869] font-bold flex items-center justify-center text-sm flex-shrink-0">{selectedCard?.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-[#0F1A2F] flex items-center gap-1">{selectedCard?.brand} {selectedCard?.verified && <CheckCircle className="w-3.5 h-3.5 text-blue-500"/>}</p>
                  <p className="text-xs text-gray-500">{selectedCard?.author} • {selectedCard?.authorRole}</p>
                </div>
                <button onClick={() => { setShowProposalModal(false); setViewingProfile(selectedCard); }} className="text-xs font-bold text-[#C5A869] border border-[#C5A869]/30 px-3 py-1.5 rounded-lg hover:bg-[#C5A869]/10 flex items-center gap-1 flex-shrink-0"><Eye className="w-3 h-3"/> Lihat Profil</button>
              </div>
              <button onClick={() => { alert('Proposal terkirim!'); setShowProposalModal(false); }} className="w-full py-3.5 bg-[#0F1A2F] text-white font-bold rounded-xl mt-2 hover:bg-[#1E2D4A] shadow-lg transition-all">
                Kirim Sekarang
              </button>
              <p className="text-xs text-center text-gray-500 font-medium">Profil bisnis Anda akan otomatis terlampir pada proposal ini.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
