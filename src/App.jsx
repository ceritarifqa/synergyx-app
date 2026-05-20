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
  { id: 1, brand: "TechNova Solutions", author: "Andi Wijaya", authorRole: "CEO", avatar: "AW", time: "2 jam lalu", narration: "Halo temen-temen ekosistem startup! 👋 Bulan depan TechNova mau ngadain 'Tech Future Summit 2026'. Kita lagi open slot buat Main Sponsor. Cocok banget buat temen-temen B2B yang mau dapetin qualified leads dan exposure premium. Let's connect! 🚀", type: "Sponsorship", scheme: "Fresh Money", title: "Sponsor Utama untuk 'Tech Future Summit 2026'", give: "Logo eksklusif di semua aset, 1 slot keynote speaker 15 menit, database 500+ peserta C-Level.", expect: "Pendanaan senilai Rp 15.000.000 untuk operasional event (Via Escrow).", verified: true, likes: 24, saves: 8, isLiked: false, isSaved: false, connectionPost: true },
  { id: 2, brand: "Kopi Kenangan Senja", author: "Nabila", authorRole: "Partnership SPV", avatar: "NB", time: "5 jam lalu", narration: "Sore semuanya! Tim Kenangan Senja lagi nyari media partner buat support campaign Promo Akhir Tahun. Kita open buat barter value yaa! ☕✨", type: "Media Partner", scheme: "Barter Value", title: "Kolaborasi Publikasi Promo Akhir Tahun", give: "Voucher kopi senilai Rp 2.000.000 untuk tim media, logo di banner cabang utama.", expect: "2x IG Feed Post, 1x Artikel Liputan di website media.", verified: false, likes: 11, saves: 3, isLiked: false, isSaved: false, connectionPost: false },
  { id: 3, brand: "EduMaster Platform", author: "Rizky Ramadhan", authorRole: "Growth Lead", avatar: "RR", time: "1 hari lalu", narration: "Hi leaders! EduMaster lagi ekspansi program Sertifikasi IT. Kita sediain skema komisi yang lumayan banget, tinggal share link unik aja. Ada yang tertarik jadi Strategic Partner? 🤝", type: "Strategic Partner", scheme: "Referral", title: "Afiliasi Kelas Sertifikasi IT Nasional", give: "Komisi 20% (mulai dari Rp 150.000) untuk setiap peserta yang berhasil mendaftar.", expect: "Blast promosi ke database email/WA komunitas partner (minimal 5.000 kontak aktif).", verified: true, likes: 37, saves: 14, isLiked: false, isSaved: false, connectionPost: true },
  { id: 4, brand: "Griya Lestari", author: "Sarah Ayu", authorRole: "Marketing Manager", avatar: "SA", time: "1 hari lalu", narration: "Halo! Griya Lestari lagi cari Community Partner, spesifiknya komunitas gowes atau lari di Jabodetabek. Kita mau bikin event 'Fun Bike to Home'. Gas gak? 🚴‍♀️🏡", type: "Community Partner", scheme: "Discount", title: "Fun Bike to Home - Community Support", give: "Diskon booking fee 50% untuk member komunitas, free merchandise event, dan konsumsi peserta.", expect: "Mobilisasi minimal 100 member komunitas untuk hadir di hari H.", verified: true, likes: 19, saves: 6, isLiked: false, isSaved: false, connectionPost: false },
  { id: 5, brand: "Local Sounds Festival", author: "Dimas", authorRole: "Event Director", avatar: "DM", time: "2 hari lalu", narration: "Urgent! 🚨 Festival musik indie kita bulan depan butuh Ticketing Partner yang reliable. Target 5.000 orang. Yuk platform ticketing lokal merapat! 🎸🎟️", type: "Lainnya", scheme: "To Be Discussed", title: "Pencarian Ticketing Partner untuk Festival Musik", give: "Eksklusivitas penjualan tiket (target 5.000 pax), logo di semua materi promosi festival.", expect: "Sistem e-ticket aman, fee transaksi flat/rendah, support tim gate di hari H.", verified: false, likes: 8, saves: 2, isLiked: false, isSaved: false, connectionPost: false },
];

const MOCK_PORTFOLIO = [
  { id: 101, title: "Media Partner - Startup Fest 2025", partner: "TechIn Asia", status: "Verified Deal" },
  { id: 102, title: "Sponsorship - Webinar Series", partner: "Bank Jago", status: "Verified Deal" }
];

const MOCK_ACTIVE_COLLABS = [
  { id: 201, type: "Community Partner", scheme: "Barter Value", title: "Kolaborasi Komunitas: Ngabuburit Kreatif", give: "Slot booth gratis, logo on screen, mention MC.", expect: "Membawa minimal 20 member komunitas, 1x IG Post collab.", pdfUrl: "#" }
];

const MOCK_SENT_PROPOSALS = [
  { id: 'SP1', to: "TechNova Solutions", title: "Sponsor Utama – Tech Future Summit 2026", sentAt: "18 Mei 2026", status: "on_review", meetDate: null, meetLink: null },
  { id: 'SP2', to: "EduMaster Platform", title: "Afiliasi Kelas Sertifikasi IT", sentAt: "15 Mei 2026", status: "accepted", meetDate: "22 Mei 2026 • 10:00 WIB", meetLink: "meet.google.com/edu-syx-abc" },
  { id: 'SP3', to: "Kopi Kenangan Senja", title: "Media Partner Promo Akhir Tahun", sentAt: "12 Mei 2026", status: "rejected", meetDate: null, meetLink: null },
];

const MOCK_ANALYTICS = {
  proposalReceived: 8, proposalSent: 12, proposalPending: 3, proposalRejected: 2,
  proposalApproved: 7, accountViews30: 3420, totalConnections: 128, totalFeedPost: 6,
  totalLikes: 89, totalSaved: 31, totalAppointment: 14, totalMeetingDone: 11,
  totalDeal: 9, totalMouGenerated: 9, totalLpjGenerated: 7,
  totalSponsorshipFreshMoney: 45000000, totalSponsorshipBarter: 12
};

const formatRp = (n) => 'Rp ' + Number(n).toLocaleString('id-ID');
const generateMeetLink = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const seg = () => Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `meet.google.com/${seg()}-${seg()}-${seg()}`;
};

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
// ── DASHBOARD VIEW ───────────────────────────────────
const DashboardView = () => {
  const metrics = [
    {label:"Proposal Received",value:MOCK_ANALYTICS.proposalReceived,color:"text-blue-600",bg:"bg-blue-50",icon:"⬇️"},
    {label:"Proposal Sent",value:MOCK_ANALYTICS.proposalSent,color:"text-indigo-600",bg:"bg-indigo-50",icon:"⬆️"},
    {label:"Proposal Pending",value:MOCK_ANALYTICS.proposalPending,color:"text-amber-600",bg:"bg-amber-50",icon:"⏳"},
    {label:"Proposal Rejected",value:MOCK_ANALYTICS.proposalRejected,color:"text-red-600",bg:"bg-red-50",icon:"❌"},
    {label:"Proposal Approved",value:MOCK_ANALYTICS.proposalApproved,color:"text-emerald-600",bg:"bg-emerald-50",icon:"✅"},
    {label:"Account Views (30 Hari)",value:MOCK_ANALYTICS.accountViews30.toLocaleString(),color:"text-purple-600",bg:"bg-purple-50",icon:"👁️"},
    {label:"Total Koneksi",value:MOCK_ANALYTICS.totalConnections,color:"text-amber-700",bg:"bg-amber-50",icon:"🤝"},
    {label:"Total Feed Post",value:MOCK_ANALYTICS.totalFeedPost,color:"text-gray-600",bg:"bg-gray-100",icon:"📝"},
    {label:"Total Like Feed",value:MOCK_ANALYTICS.totalLikes,color:"text-red-500",bg:"bg-red-50",icon:"❤️"},
    {label:"Total Saved Feed",value:MOCK_ANALYTICS.totalSaved,color:"text-amber-700",bg:"bg-amber-50",icon:"🔖"},
    {label:"Total Appointment",value:MOCK_ANALYTICS.totalAppointment,color:"text-teal-600",bg:"bg-teal-50",icon:"📅"},
    {label:"Meeting & Notulensi",value:MOCK_ANALYTICS.totalMeetingDone,color:"text-blue-500",bg:"bg-blue-50",icon:"🎥"},
    {label:"Total Deal",value:MOCK_ANALYTICS.totalDeal,color:"text-amber-700",bg:"bg-amber-50",icon:"🏆"},
    {label:"Total MoU/PKS",value:MOCK_ANALYTICS.totalMouGenerated,color:"text-emerald-600",bg:"bg-emerald-50",icon:"📋"},
    {label:"Total LPJ",value:MOCK_ANALYTICS.totalLpjGenerated,color:"text-emerald-600",bg:"bg-emerald-50",icon:"📊"},
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
          <p className="text-2xl md:text-3xl font-['Cardo'] font-bold text-emerald-400">{Math.round(MOCK_ANALYTICS.totalDeal/MOCK_ANALYTICS.proposalSent*100)}%</p>
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
  // Sidebar right panel for MoU/LPJ
  const [rightPanel, setRightPanel] = useState(null); // null | 'mou' | 'lpj'
  // Saved MoU/LPJ data (global so it persists across tabs)
  const [savedMou, setSavedMou] = useState(null);
  const [savedLpj, setSavedLpj] = useState(null);
  // Deal status for incoming proposal
  const [incomingDealStatus, setIncomingDealStatus] = useState('new'); // new|scheduling|scheduled|deal|mou|lpj|done
  const [meetInfo, setMeetInfo] = useState(null);
  const [meetTranscript, setMeetTranscript] = useState(null);
  const [viewingProfile, setViewingProfile] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const navigateTo = (view) => { setCurrentView(view); setIsMobileMenuOpen(false); setRightPanel(null); window.scrollTo(0, 0); };
  const toggleLike = (id) => setFeedItems(f => f.map(x => x.id === id ? { ...x, isLiked: !x.isLiked, likes: x.isLiked ? x.likes - 1 : x.likes + 1 } : x));
  const toggleSave = (id) => setFeedItems(f => f.map(x => x.id === id ? { ...x, isSaved: !x.isSaved, saves: x.isSaved ? x.saves - 1 : x.saves + 1 } : x));

  const handleConnect = (user) => {
    setConnectedUsers(prev => [...prev, user.brand]);
    setViewingProfile(null);
    alert('Permintaan koneksi terkirim ke ' + user.brand + '!');
  };

  const filteredFeed = feedItems.filter(x => {
    if (filterConn && !x.connectionPost) return false;
    if (filterType && x.type.toLowerCase() !== filterType.toLowerCase()) return false;
    if (filterScheme && !x.scheme.toLowerCase().includes(filterScheme.toLowerCase())) return false;
    if (searchQ && !x.brand.toLowerCase().includes(searchQ.toLowerCase()) && !x.title.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  });

  const isAppView = ['feed','profile','create','proposals','chat','testimoni','mou','lpj'].includes(currentView);

  // ── SIDEBAR LEFT ──────────────────────────────
  const Sidebar = () => (
    <div className="hidden md:flex w-56 bg-[#0F1A2F] border-r border-[#C5A869]/20 h-screen sticky top-0 flex-col py-5 px-3 shadow-xl z-20 flex-shrink-0">
      <div className="flex items-center gap-2 cursor-pointer mb-7 px-2" onClick={() => navigateTo('feed')}>
        <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 100 100" fill="none"><path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#C5A869" strokeWidth="4" fill="none"/><path d="M50 18L82 50L50 82L18 50L50 18Z" fill="#2D4066" opacity="0.9"/></svg>
        <span className="text-lg font-bold tracking-wider text-[#C5A869] font-['Cardo']">SynergyX</span>
      </div>
      <div className="flex flex-col gap-1">
        {[
          { id: 'feed', icon: <Home className="w-4 h-4"/>, label: 'Discovery Feed' },
          { id: 'dashboard', icon: <BarChart2 className="w-4 h-4"/>, label: 'Dashboard' },
          { id: 'profile', icon: <User className="w-4 h-4"/>, label: 'Profil Bisnis' },
          { id: 'proposals', icon: <MessageSquare className="w-4 h-4"/>, label: 'Kelola Proposal' },
        ].map(item => (
          <button key={item.id} onClick={() => navigateTo(item.id)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${currentView === item.id ? 'bg-[#C5A869] text-[#0F1A2F] shadow-lg' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'}`}>
            {item.icon} {item.label}
          </button>
        ))}
        <div className="my-2 border-t border-[#2D4066]/50"/>
        <p className="px-3 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Interaksi Partner</p>
        <button onClick={() => navigateTo('chat')} className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${currentView === 'chat' ? 'bg-[#C5A869] text-[#0F1A2F]' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'}`}>
          <div className="flex items-center gap-3"><MessageCircle className="w-4 h-4"/> Pesan / Chat</div>
          <div className="w-2 h-2 rounded-full bg-red-500"/>
        </button>
        <button onClick={() => navigateTo('testimoni')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${currentView === 'testimoni' ? 'bg-[#C5A869] text-[#0F1A2F]' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'}`}>
          <Star className="w-4 h-4"/> Rating & Testimoni
        </button>
        <div className="my-2 border-t border-[#2D4066]/50"/>
        <p className="px-3 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Dokumen</p>
        <button onClick={() => { navigateTo('proposals'); setRightPanel('mou'); }} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${rightPanel==='mou' ? 'bg-[#C5A869] text-[#0F1A2F]' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'}`}>
          <Pencil className="w-4 h-4"/> Input MoU
        </button>
        <button onClick={() => { navigateTo('proposals'); setRightPanel('lpj'); }} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${rightPanel==='lpj' ? 'bg-[#C5A869] text-[#0F1A2F]' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'}`}>
          <FileText className="w-4 h-4"/> Input LPJ
        </button>
      </div>
      <div className="mt-auto pt-4">
        <button onClick={() => navigateTo('create')} className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0F1A2F] font-bold text-sm hover:scale-105 transition-transform shadow-lg">
          <PlusCircle className="w-4 h-4"/> Buat Peluang
        </button>
      </div>
    </div>
  );

  // ── MOBILE HEADER ──────────────────────────────
  const MobileHeader = () => (
    <div className="md:hidden fixed top-0 w-full z-50 bg-[#0F1A2F] border-b border-[#C5A869]/20 h-14 flex items-center justify-between px-4 shadow-md">
      <div className="flex items-center gap-2" onClick={() => navigateTo('feed')}>
        <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none"><path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#C5A869" strokeWidth="4" fill="none"/><path d="M50 18L82 50L50 82L18 50L50 18Z" fill="#2D4066" opacity="0.9"/></svg>
        <span className="text-base font-bold text-[#C5A869] font-['Cardo']">SynergyX</span>
      </div>
      <button className="text-[#C5A869] p-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
      </button>
    </div>
  );

  // ── COLLAB CARD ────────────────────────────────
  const CollabCard = ({ data, onApply }) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 hover:shadow-xl hover:shadow-[#0F1A2F]/5 transition-all duration-300 mb-4">
      {data.connectionPost && (
        <div className="flex items-center gap-1.5 text-[10px] text-[#C5A869] font-bold uppercase tracking-widest mb-2">
          <Link className="w-3 h-3"/> Dari Koneksi Anda
        </div>
      )}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <button onClick={() => setViewingProfile(data)} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#0F1A2F] to-[#2D4066] flex items-center justify-center font-bold text-[#C5A869] text-sm md:text-base flex-shrink-0 hover:ring-2 hover:ring-[#C5A869] transition-all cursor-pointer">{data.avatar}</button>
          <div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setViewingProfile(data)} className="text-[#0F1A2F] font-bold text-sm hover:text-[#C5A869] transition-colors">{data.brand}</button>
              {data.verified && <CheckCircle className="w-3.5 h-3.5 text-blue-500"/>}
            </div>
            <p className="text-xs text-gray-400">{data.author} • {data.authorRole}</p>
          </div>
        </div>
        <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{data.time}</span>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{data.narration}</p>
      <div className="bg-[#FDFBF7] border border-[#C5A869]/30 rounded-xl p-4 mb-4 border-l-4 border-l-[#C5A869]">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#0F1A2F] text-white">{data.type}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#C5A869]/10 text-[#AA7C11] border border-[#C5A869]/30">{data.scheme}</span>
        </div>
        <h3 className="text-base md:text-lg font-['Cardo'] font-bold text-[#0F1A2F] mb-3">{data.title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
            <span className="text-xs text-[#C5A869] font-bold block mb-1">Benefit Mitra:</span>
            <p className="text-xs text-gray-600 leading-relaxed">{data.give}</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
            <span className="text-xs text-[#0F1A2F] font-bold block mb-1">Kewajiban Mitra:</span>
            <p className="text-xs text-gray-600 leading-relaxed">{data.expect}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => toggleLike(data.id)} className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${data.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}>
            <Heart className={`w-4 h-4 ${data.isLiked ? 'fill-current' : ''}`}/> {data.likes}
          </button>
          <button onClick={() => toggleSave(data.id)} className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${data.isSaved ? 'text-[#C5A869]' : 'text-gray-400 hover:text-[#C5A869]'}`}>
            <Bookmark className={`w-4 h-4 ${data.isSaved ? 'fill-current' : ''}`}/> {data.saves}
          </button>
        </div>
        <button onClick={() => onApply(data)} className="flex items-center gap-2 px-4 py-2 bg-[#0F1A2F] text-white text-xs font-bold rounded-lg hover:bg-[#1E2D4A] transition-colors shadow-md">
          <Send className="w-3.5 h-3.5"/> Ajukan Proposal
        </button>
      </div>
    </div>
  );

  // ── LANDING ────────────────────────────────────
  const LandingView = () => (
    <div className="min-h-screen bg-[#0A1628] relative flex flex-col overflow-hidden">
      <div className="absolute top-0 right-0 w-96 md:w-[600px] h-96 md:h-[600px] rounded-full bg-gradient-to-bl from-[#C5A869]/10 to-transparent blur-3xl pointer-events-none"/>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A2744_1px,transparent_1px),linear-gradient(to_bottom,#1A2744_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none"/>
      <header className="relative z-10 flex justify-between items-center px-5 md:px-10 py-5">
        <div className="flex items-center gap-3">
          <svg className="w-8 h-8 md:w-9 md:h-9" viewBox="0 0 100 100" fill="none"><path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#C5A869" strokeWidth="4" fill="none"/><path d="M50 18L82 50L50 82L18 50L50 18Z" fill="#1A2744" opacity="0.9"/></svg>
          <span className="text-xl md:text-2xl font-bold tracking-wider text-[#C5A869] font-['Cardo']">SynergyX</span>
        </div>
        <button onClick={() => navigateTo('login')} className="text-sm font-bold text-[#C5A869] border border-[#C5A869]/40 px-4 py-2 rounded-lg hover:bg-[#C5A869]/10 transition">Sign In</button>
      </header>
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 py-16 md:py-24">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A869]/10 border border-[#C5A869]/30 text-[#C5A869] text-xs font-bold tracking-wider uppercase mb-7">
          <Sparkles className="w-3.5 h-3.5"/> Ekosistem Kolaborasi B2B Terkurasi
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-['Cardo'] font-bold text-white leading-tight mb-5 max-w-4xl">
          Cari Mitra Kolaborasi?<br/><span className="text-[#C5A869]">Selesaikan dalam Hitungan Menit.</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg mb-8 max-w-2xl leading-relaxed">
          Platform satu pintu untuk mempertemukan agensi, brand, Community, dan pihak-pihak kemitraan strategis. Kami menyederhanakan proses kolaborasi agar Anda bisa fokus menutup deal lebih cepat dan mencapai target pertumbuhan bisnis dengan lebih terukur.
        </p>
        <div className="mt-2 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full text-left">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3 text-red-400"><AlertCircle className="w-5 h-5"/><span className="font-bold text-xs uppercase tracking-wide">Pain Point</span></div>
            {['Sulit menemukan mitra yang relevan & terpercaya','Tidak ada jaminan komitmen & pembayaran aman','Proses negosiasi manual, lambat, dan rawan miskomunikasi'].map(t => (
              <div key={t} className="flex items-start gap-2 mb-2"><span className="text-red-400 mt-0.5 flex-shrink-0">✕</span><span className="text-sm text-gray-300">{t}</span></div>
            ))}
          </div>
          <div className="bg-[#C5A869]/5 border border-[#C5A869]/20 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3 text-[#C5A869]"><CheckCircle className="w-5 h-5"/><span className="font-bold text-xs uppercase tracking-wide">Solusi SynergyX</span></div>
            {['Discovery feed kolaborasi B2B yang dikurasi dan terverifikasi','Escrow system untuk keamanan dana sponsorship','MoU digital, LPJ, e-Sign & auto-scheduling meeting'].map(t => (
              <div key={t} className="flex items-start gap-2 mb-2"><span className="text-[#C5A869] mt-0.5 flex-shrink-0">✓</span><span className="text-sm text-gray-200">{t}</span></div>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => navigateTo('register')} className="px-7 py-3.5 rounded-xl bg-[#C5A869] text-[#0F1A2F] font-bold tracking-wide shadow-xl hover:-translate-y-1 transition-all duration-300 text-base flex items-center justify-center gap-2">
            Daftar ke SynergyX <ArrowRight className="w-4 h-4"/>
          </button>
          <button onClick={() => navigateTo('login')} className="px-7 py-3.5 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition text-base">
            Lihat Demo
          </button>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
          {[['500+','Bisnis Terdaftar'],['1.200+','Kolaborasi Berhasil'],['Rp 2M+','Dana via Escrow']].map(([val, label]) => (
            <div key={label}>
              <div className="text-2xl font-['Cardo'] font-bold text-[#C5A869]">{val}</div>
              <div className="text-xs text-gray-400 font-medium mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  // ── LOGIN ──────────────────────────────────────
  const LoginView = () => (
    <div className="min-h-screen flex bg-[#FDFBF7]">
      <div className="hidden lg:flex w-1/2 bg-[#0F1A2F] flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2D4066_1px,transparent_1px),linear-gradient(to_bottom,#2D4066_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20"/>
        <div className="relative z-10 text-center px-12">
          <svg className="w-20 h-20 mx-auto mb-8" viewBox="0 0 100 100" fill="none"><path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#FFE194" strokeWidth="4" fill="none"/><path d="M50 18L82 50L50 82L18 50L50 18Z" fill="#2D4066" opacity="0.9"/></svg>
          <h2 className="text-3xl md:text-4xl font-['Cardo'] font-bold text-white mb-4">Welcome to SynergyX</h2>
          <p className="text-gray-400 text-base">Platform B2B eksklusif untuk kolaborasi dan kemitraan strategis.</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-10 relative">
        <button onClick={() => navigateTo('landing')} className="absolute top-6 left-6 text-gray-400 hover:text-[#0F1A2F] flex items-center gap-1 text-sm font-medium">
          <ArrowLeft className="w-4 h-4"/> Kembali
        </button>
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-[#0F1A2F]/5 border border-gray-100">
          <div className="text-center mb-8">
            <div className="flex lg:hidden items-center justify-center gap-2 mb-4">
              <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none"><path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#C5A869" strokeWidth="4" fill="none"/><path d="M50 18L82 50L50 82L18 50L50 18Z" fill="#2D4066" opacity="0.9"/></svg>
              <span className="text-xl font-bold text-[#C5A869] font-['Cardo']">SynergyX</span>
            </div>
            <h3 className="text-2xl font-['Cardo'] font-bold text-[#0F1A2F] mb-2">Masuk ke Akun</h3>
            <p className="text-sm text-gray-500">Lanjutkan ekspansi bisnis Anda hari ini.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); navigateTo('feed'); }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Alamat Email</label>
              <input type="email" placeholder="nama@perusahaan.com" className="w-full bg-[#FDFBF7] border border-gray-200 text-[#0F1A2F] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869] focus:ring-1 focus:ring-[#C5A869]"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Kata Sandi</label>
              <input type="password" placeholder="••••••••" className="w-full bg-[#FDFBF7] border border-gray-200 text-[#0F1A2F] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869] focus:ring-1 focus:ring-[#C5A869]"/>
            </div>
            <button type="submit" className="w-full py-3.5 rounded-xl bg-[#0F1A2F] text-white font-bold hover:bg-[#1E2D4A] shadow-lg transition-all">Sign In</button>
          </form>
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"/></div>
            <div className="relative flex justify-center"><span className="px-2 bg-white text-gray-500 text-xs font-medium">ATAU</span></div>
          </div>
          <button onClick={() => navigateTo('feed')} className="mt-5 w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 font-bold hover:bg-gray-50 transition-colors text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );


  // ── REGISTER / VERIFIKASI VIEW ─────────────────
  const RegisterView = () => {
    const [step, setStep] = useState(1);
    const [accType, setAccType] = useState('');
    const [docUploaded, setDocUploaded] = useState(false);
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="flex items-center gap-2 justify-center mb-8">
            <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none"><path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#C5A869" strokeWidth="4" fill="none"/><path d="M50 18L82 50L50 82L18 50L50 18Z" fill="#2D4066" opacity="0.9"/></svg>
            <span className="text-xl font-bold text-[#C5A869] font-['Cardo']">SynergyX</span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1,2,3].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? "bg-[#0F1A2F] text-white" : "bg-gray-200 text-gray-400"}`}>{step > s ? <CheckCircle className="w-4 h-4"/> : s}</div>
                {s < 3 && <div className={`w-12 h-0.5 ${step > s ? "bg-[#C5A869]" : "bg-gray-200"}`}/>}
              </div>
            ))}
          </div>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            {step === 1 && (
              <div>
                <h3 className="text-2xl font-['Cardo'] font-bold text-[#0F1A2F] mb-2">Buat Akun SynergyX</h3>
                <p className="text-sm text-gray-500 mb-6">Isi data dasar profil Anda</p>
                <div className="space-y-4">
                  {[["Nama Brand / Entitas","text","Teman Kreativ"],["Email","email","hello@temankreativ.id"],["Password","password","••••••••"]].map(([label,type,ph]) => (
                    <div key={label}><label className="text-xs font-bold text-gray-600 uppercase block mb-1.5">{label}</label>
                    <input type={type} placeholder={ph} className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869]"/></div>
                  ))}
                  <button onClick={() => setStep(2)} className="w-full py-3.5 bg-[#0F1A2F] text-white font-bold rounded-xl hover:bg-[#1E2D4A] transition">Lanjut →</button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h3 className="text-2xl font-['Cardo'] font-bold text-[#0F1A2F] mb-2">Pilih Tipe Akun</h3>
                <p className="text-sm text-gray-500 mb-6">Tentukan tipe entitas untuk verifikasi dokumen</p>
                <div className="space-y-3 mb-6">
                  {[
                    {type:"bisnis",icon:<Building2 className="w-5 h-5"/>,title:"Bisnis / Perusahaan",desc:"Upload NIB atau link domain website resmi"},
                    {type:"komunitas",icon:<Users className="w-5 h-5"/>,title:"Komunitas / Organisasi",desc:"Upload Impact Report atau bukti rekam jejak kegiatan"},
                    {type:"individu",icon:<User className="w-5 h-5"/>,title:"Individu / Profesional",desc:"Upload KTP sebagai identitas resmi"},
                  ].map(opt => (
                    <button key={opt.type} onClick={() => setAccType(opt.type)} className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${accType === opt.type ? "border-[#C5A869] bg-[#FDFBF7]" : "border-gray-200 hover:border-gray-300"}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${accType === opt.type ? "bg-[#C5A869]/20 text-[#AA7C11]" : "bg-gray-100 text-gray-500"}`}>{opt.icon}</div>
                      <div><p className="font-bold text-sm text-[#0F1A2F]">{opt.title}</p><p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p></div>
                      {accType === opt.type && <CheckCircle className="w-5 h-5 text-[#C5A869] ml-auto flex-shrink-0"/>}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-xl">← Kembali</button>
                  <button onClick={() => { if(accType) setStep(3); }} className={`flex-1 py-3 font-bold rounded-xl transition ${accType ? "bg-[#0F1A2F] text-white hover:bg-[#1E2D4A]" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>Lanjut →</button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h3 className="text-2xl font-['Cardo'] font-bold text-[#0F1A2F] mb-2">Upload Dokumen Verifikasi</h3>
                <p className="text-sm text-gray-500 mb-6">
                  {accType === "bisnis" && "Upload NIB atau masukkan link domain website resmi."}
                  {accType === "komunitas" && "Upload Impact Report atau bukti rekam jejak kegiatan."}
                  {accType === "individu" && "Upload foto KTP yang jelas dan terbaca."}
                </p>
                <div className="space-y-4 mb-6">
                  {accType === "bisnis" && (
                    <div><label className="text-xs font-bold text-gray-600 uppercase block mb-1.5">Link Website Resmi (Alternatif NIB)</label>
                    <input type="url" placeholder="https://namaentitas.com" className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869]"/></div>
                  )}
                  <div>
                    <label className="text-xs font-bold text-gray-600 uppercase block mb-1.5">
                      {accType === "bisnis" ? "Upload NIB (PDF)" : accType === "komunitas" ? "Upload Impact Report (PDF)" : "Upload KTP (JPG/PNG)"}
                    </label>
                    <div onClick={() => setDocUploaded(true)} className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${docUploaded ? "border-emerald-400 bg-emerald-50" : "border-gray-300 hover:border-[#C5A869] hover:bg-[#FDFBF7]"}`}>
                      {docUploaded
                        ? <div><CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2"/><p className="text-sm font-bold text-emerald-700">Dokumen berhasil di-upload!</p></div>
                        : <div><Upload className="w-8 h-8 text-gray-400 mx-auto mb-2"/><p className="text-sm font-medium text-gray-500">Klik untuk upload</p><p className="text-xs text-gray-400 mt-1">Maks. 5MB • PDF, JPG, PNG</p></div>
                      }
                    </div>
                  </div>
                </div>
                {docUploaded && <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4"><p className="text-xs text-amber-700 font-medium">⏳ Dokumen diverifikasi tim SynergyX dalam 1×24 jam. Badge <strong>Verified</strong> aktif setelah selesai.</p></div>}
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-xl">← Kembali</button>
                  <button onClick={() => navigateTo("feed")} className="flex-1 py-3 bg-[#0F1A2F] text-white font-bold rounded-xl hover:bg-[#1E2D4A] transition">Mulai Gunakan →</button>
                </div>
              </div>
            )}
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">Sudah punya akun? <button onClick={() => navigateTo("login")} className="text-[#C5A869] font-bold hover:underline">Sign In</button></p>
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
            {currentView === 'feed' && <FeedView/>}
            {currentView === 'dashboard' && <DashboardView/>}
            {currentView === 'profile' && <ProfileView/>}
            {currentView === 'create' && <CreateCollabView/>}
            {currentView === 'proposals' && <ProposalsView/>}
            {currentView === 'chat' && <ChatView/>}
            {currentView === 'testimoni' && <TestimoniView/>}
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