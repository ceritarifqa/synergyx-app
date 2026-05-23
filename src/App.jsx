import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Menu, X, Sparkles, TrendingUp, ShieldCheck,
  Home, CheckCircle, ArrowRight, User, Users,
  Star, FileText, Send, MessageSquare, PlusCircle, Search,
  Instagram, Linkedin, Globe, MessageCircle, CalendarOff, CalendarCheck, ExternalLink,
  Download, ChevronDown, Heart, Bookmark, Eye, Link, Trophy, Clock, AlertCircle,
  FileCheck, ClipboardList, Pen, BarChart2, Zap, Lock, Mail,
  ArrowLeft, ChevronRight, Wifi, Pencil, Upload, Building2, Image,
  Bell, Activity, TrendingDown
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
    name: "Diah Kusuma Dewi",
    role: "Founder & Community Lead",
    bio: "13 years experienced Business Development and Digital Marketing Strategist. passionate for helping people to #WorklessEarnMoreAnytime Anywhere through Digital-based strategy & Clarity of Self, Career, & Business",
    social: { linkedin: "https://www.linkedin.com/in/diahkusumadewitemankreativ", ig: "https://instagram.com/diahkusumadewi__", web: "https://diahkusumadewi.com" }
  },
  currency: {
    audience: "5.000+ Member aktif, 6K IG Followers, Usia 25-35",
    credibility: "Aktif 2+ Tahun, 30+ Kolaborasi sukses, Rating 4.8/5",
    activation: "Track record 85% target peserta event tercapai",
    network: "Alumni tersebar di 50+ Tech & Creative Company"
  }
};

const MOCK_FULL_PROFILES = {
  1: {
    id:1, brandName:"TechNova Solutions", isVerified:true,
    industry:"Teknologi & SaaS", location:"Jakarta, Indonesia",
    tagline:"Membangun solusi digital enterprise yang skalabel untuk pasar Indonesia.",
    logo:"TN", stats:{connections:342,views:8920,ongoing:7,done:28},
    founder:{name:"Andi Wijaya",role:"CEO & Co-Founder",bio:"Tech entrepreneur dengan pengalaman 10+ tahun di industri SaaS. Co-founder beberapa startup yang telah scale ke ASEAN. Aktif sebagai mentor di berbagai program akselerasi startup nasional.",social:{linkedin:"#",ig:"#",web:"#"}},
    currency:{audience:"50.000+ pengguna aktif platform, newsletter 25K subscribers, 40K IG followers",credibility:"Aktif 5+ tahun, 80+ kolaborasi enterprise, Rating 4.9/5",activation:"Track record 95% event target tercapai, NPS rata-rata 72",network:"Alumni & partner di 150+ perusahaan tech & enterprise nasional"},
    portfolio:[{id:1,title:"Strategic Partner – Gojek Enterprise",partner:"Gojek",status:"Verified Deal"},{id:2,title:"Technology Sponsor – Tech Summit 2025",partner:"Telkom Indonesia",status:"Verified Deal"},{id:3,title:"Media Partner – Indonesia Startup Week",partner:"DailySocial",status:"Verified Deal"}],
    activeCollabs:[{id:1,type:"Sponsorship",scheme:"Fresh Money",title:"Main Sponsor Tech Future Summit 2026",give:"Logo eksklusif di semua aset, 1 slot keynote speaker 15 menit, database 500+ peserta C-Level.",expect:"Pendanaan Rp 15.000.000 via Escrow."}]
  },
  2: {
    id:2, brandName:"Kopi Kenangan Senja", isVerified:false,
    industry:"Food & Beverage", location:"Bandung, Indonesia",
    tagline:"Kopi lokal premium, hadir di 50+ kota Indonesia dengan cita rasa otentik.",
    logo:"KS", stats:{connections:89,views:2340,ongoing:2,done:8},
    founder:{name:"Nabila Rahma",role:"Partnership & Marketing SPV",bio:"Spesialis branding dan marketing digital F&B. Membangun identitas Kopi Kenangan Senja dari nol hingga dikenal secara nasional dengan komunitas pelanggan setia.",social:{linkedin:"#",ig:"#",web:"#"}},
    currency:{audience:"120+ outlet aktif, 30K IG followers, pelanggan usia 18-35",credibility:"Brand lokal terpercaya 3 tahun, 8+ kolaborasi brand sukses",activation:"Campaign promo rata-rata +40% traffic outlet",network:"Ekosistem UMKM F&B Bandung dan Jabodetabek"},
    portfolio:[{id:1,title:"Media Partner – Bandung Creative Week",partner:"Dinas Pariwisata Bandung",status:"Verified Deal"},{id:2,title:"Sponsor – Campus Fair ITB",partner:"BEM ITB",status:"Verified Deal"}],
    activeCollabs:[{id:1,type:"Media Partner",scheme:"Barter Value",title:"Kolaborasi Publikasi Promo Akhir Tahun",give:"Voucher kopi Rp 2.000.000, logo di banner cabang utama.",expect:"2x IG Feed Post, 1x artikel."}]
  },
  3: {
    id:3, brandName:"EduMaster Platform", isVerified:true,
    industry:"Edukasi & EdTech", location:"Surabaya, Indonesia",
    tagline:"Platform sertifikasi IT terkemuka dengan 100.000+ alumni bersertifikat di seluruh Indonesia.",
    logo:"EM", stats:{connections:521,views:15800,ongoing:12,done:65},
    founder:{name:"Rizky Ramadhan",role:"Growth Lead & Co-Founder",bio:"Pakar growth hacking di industri EdTech. Memimpin ekspansi EduMaster dari startup Surabaya hingga menjadi platform edukasi digital terbesar ketiga di Indonesia.",social:{linkedin:"#",ig:"#",web:"https://edumaster.id"}},
    currency:{audience:"100.000+ alumni, database email aktif 85K, WhatsApp blast 45K kontak",credibility:"Platform terakreditasi Kominfo, 65+ mitra perusahaan rekrutmen",activation:"Konversi afiliasi rata-rata 8%, program referral terbukti scalable",network:"Komunitas IT & digital talent tersebar di 34 provinsi Indonesia"},
    portfolio:[{id:1,title:"Strategic Partner – Kominfo Digital Talent",partner:"Kominfo RI",status:"Verified Deal"},{id:2,title:"Afiliasi Program – Tokopedia University",partner:"Tokopedia",status:"Verified Deal"},{id:3,title:"Community Partner – GDG Indonesia",partner:"Google Developer Groups",status:"Verified Deal"}],
    activeCollabs:[{id:1,type:"Strategic Partner",scheme:"Referral",title:"Afiliasi Kelas Sertifikasi IT Nasional",give:"Komisi 20% per peserta terdaftar.",expect:"Blast ke minimum 5.000 kontak aktif."}]
  },
  4: {
    id:4, brandName:"Griya Lestari", isVerified:true,
    industry:"Properti & Real Estate", location:"Tangerang Selatan, Indonesia",
    tagline:"Developer perumahan ramah lingkungan dengan konsep smart living untuk generasi milenial.",
    logo:"GL", stats:{connections:156,views:4250,ongoing:3,done:14},
    founder:{name:"Sarah Ayu Pratiwi",role:"Marketing Manager",bio:"Berpengalaman 8 tahun di marketing properti premium. Spesialis event marketing dan community engagement untuk target market milenial dan Gen Z.",social:{linkedin:"#",ig:"#",web:"https://griyalestari.co.id"}},
    currency:{audience:"Database prospek 15K kontak, 8K IG followers, komunitas homeowner aktif",credibility:"Developer terpercaya 10 tahun, penghargaan Green Building Award 2024",activation:"ROI event marketing rata-rata 3x lipat dari investasi promosi",network:"Partner agen properti 200+ di Jabodetabek dan Jawa Barat"},
    portfolio:[{id:1,title:"Community Partner – Komunitas Gowes BSD",partner:"Gowes BSD",status:"Verified Deal"},{id:2,title:"Sponsor – Green Living Expo 2025",partner:"GIIAS",status:"Verified Deal"}],
    activeCollabs:[{id:1,type:"Community Partner",scheme:"Discount",title:"Fun Bike to Home – Community Support",give:"Diskon 50% booking fee, merchandise, konsumsi.",expect:"Mobilisasi min. 100 member hadir hari H."}]
  },
  5: {
    id:5, brandName:"Local Sounds Festival", isVerified:false,
    industry:"Musik & Entertainment", location:"Yogyakarta, Indonesia",
    tagline:"Merayakan musik indie lokal dan membangun ekosistem musisi Nusantara yang berkelanjutan.",
    logo:"LS", stats:{connections:48,views:1820,ongoing:1,done:3},
    founder:{name:"Dimas Pratama",role:"Festival Director",bio:"Promotor musik indie sejak 2015. Telah mengelola lebih dari 20 festival dan showcase musik independent di Jawa dan Bali dengan total audience 30.000+ penonton.",social:{linkedin:"#",ig:"#",web:"#"}},
    currency:{audience:"Target 5.000 penonton, komunitas pecinta musik indie 12K followers",credibility:"3x festival sukses digelar, coverage media lokal & nasional",activation:"Track record sellout ticket untuk festival sebelumnya",network:"Jaringan 200+ musisi indie, 30+ venue partner Yogyakarta-Bali"},
    portfolio:[{id:1,title:"Music Festival – Indie Jogja 2024",partner:"Self-Produced",status:"Verified Deal"},{id:2,title:"Showcase Partner – Synchronize Pre-event",partner:"Ismaya Group",status:"Verified Deal"}],
    activeCollabs:[{id:1,type:"Lainnya",scheme:"To Be Discussed",title:"Pencarian Ticketing Partner untuk Festival Musik",give:"Eksklusivitas penjualan tiket 5.000 pax, logo di semua materi.",expect:"Sistem e-ticket aman, support gate hari H."}]
  },
  6: {
    id:6, brandName:"Kreasi Nusantara", isVerified:true,
    industry:"Creative Agency & Design", location:"Bali, Indonesia",
    tagline:"Agensi kreatif yang menggabungkan estetika lokal autentik dengan standar visual global.",
    logo:"KN", stats:{connections:213,views:6120,ongoing:5,done:22},
    founder:{name:"Bima Sakti",role:"Creative Director & Founder",bio:"Desainer grafis dan brand strategist dengan pengalaman 12 tahun. Klien mencakup brand lokal hingga FMCG multinasional. Pemenang Indonesian Good Design Award 2024.",social:{linkedin:"#",ig:"#",web:"https://kreasikusantara.id"}},
    currency:{audience:"Portfolio reach 500K+ audience kumulatif, Instagram 18K followers",credibility:"Pemenang Indonesian Good Design Award 2024, 22+ klien korporat",activation:"Delivery on-time rate 98%, client retention rate 85%",network:"Anggota ADGI (Asosiasi Desainer Grafis Indonesia), network 500+ kreator"},
    portfolio:[{id:1,title:"Brand Identity – Startup Unicorn Bali",partner:"Sea Group",status:"Verified Deal"},{id:2,title:"Creative Partner – Bali Spirit Festival",partner:"Bali Spirit",status:"Verified Deal"},{id:3,title:"Visual Direction – Campaign Nasional FMCG",partner:"Unilever Indonesia",status:"Verified Deal"}],
    activeCollabs:[{id:1,type:"Media Partner",scheme:"Barter Value",title:"Kolaborasi Branding & Visual Identity untuk Community Event",give:"Full branding package: logo, banner, social media kit.",expect:"Exposure brand di semua materi event online & offline."}]
  },
  7: {
    id:7, brandName:"Startup Bootcamp ID", isVerified:true,
    industry:"Startup Ecosystem & Training", location:"Jakarta, Indonesia",
    tagline:"Mencetak founder dan product builder berikutnya lewat program intensif berbasis mentorship nyata.",
    logo:"SB", stats:{connections:389,views:10240,ongoing:8,done:41},
    founder:{name:"Lena Hartono",role:"Program Director & Co-Founder",bio:"Mantan VP Product di dua unicorn Indonesia. Kini berfokus membangun ekosistem startup melalui pendidikan intensif, mentorship, dan koneksi langsung ke jaringan investor aktif.",social:{linkedin:"#",ig:"#",web:"https://startupbootcamp.id"}},
    currency:{audience:"5.000+ alumni aktif, LinkedIn newsletter 22K subscriber, komunitas WhatsApp 8K member",credibility:"3 cohort alumni dengan exit startup berhasil, Rating mentor 4.9/5",activation:"Demo Day attendance rata-rata 300+ investor & ecosystem player",network:"Jaringan 200+ investor aktif, 500+ mentor industri, 100+ hiring partner"},
    portfolio:[{id:1,title:"Strategic Partner – Google for Startups",partner:"Google",status:"Verified Deal"},{id:2,title:"Ecosystem Partner – Founders Factory SEA",partner:"Founders Factory",status:"Verified Deal"},{id:3,title:"Demo Day Sponsor – Cohort 12",partner:"MDI Ventures",status:"Verified Deal"}],
    activeCollabs:[{id:1,type:"Sponsorship",scheme:"Fresh Money",title:"Lead Sponsor Demo Day Cohort 14",give:"Branding premium, akses eksklusif 50+ startup pitching, meja networking.",expect:"Pendanaan Rp 25.000.000 via Escrow."}]
  }
};

const MOCK_FEED = [
  { id:1, brand:"TechNova Solutions", author:"Andi Wijaya", authorRole:"CEO", avatar:"TN", time:"2 jam lalu", narration:"Halo temen-temen ekosistem startup! 👋 Bulan depan TechNova mau ngadain 'Tech Future Summit 2026'. Kita lagi open slot buat Main Sponsor. Cocok banget buat temen-temen B2B yang mau dapetin qualified leads dan exposure premium. Let's connect! 🚀", type:"Sponsorship", scheme:"Fresh Money", title:"Sponsor Utama untuk 'Tech Future Summit 2026'", give:"Logo eksklusif di semua aset, 1 slot keynote speaker 15 menit, database 500+ peserta C-Level.", expect:"Pendanaan senilai Rp 15.000.000 untuk operasional event (Via Escrow).", verified:true, likes:24, saves:8, isLiked:false, isSaved:false, connectionPost:true },
  { id:2, brand:"Kopi Kenangan Senja", author:"Nabila Rahma", authorRole:"Partnership SPV", avatar:"NB", time:"5 jam lalu", narration:"Sore semuanya! Tim Kenangan Senja lagi nyari media partner buat support campaign Promo Akhir Tahun. Kita open buat barter value yaa! ☕✨", type:"Media Partner", scheme:"Barter Value", title:"Kolaborasi Publikasi Promo Akhir Tahun", give:"Voucher kopi senilai Rp 2.000.000 untuk tim media, logo di banner cabang utama.", expect:"2x IG Feed Post, 1x Artikel Liputan di website media.", verified:false, likes:11, saves:3, isLiked:false, isSaved:false, connectionPost:false },
  { id:3, brand:"EduMaster Platform", author:"Rizky Ramadhan", authorRole:"Growth Lead", avatar:"RR", time:"1 hari lalu", narration:"Hi leaders! EduMaster lagi ekspansi program Sertifikasi IT. Kita sediain skema komisi yang lumayan banget, tinggal share link unik aja. Ada yang tertarik jadi Strategic Partner? 🤝", type:"Strategic Partner", scheme:"Referral", title:"Afiliasi Kelas Sertifikasi IT Nasional", give:"Komisi 20% (mulai dari Rp 150.000) untuk setiap peserta yang berhasil mendaftar.", expect:"Blast promosi ke database email/WA komunitas partner (minimal 5.000 kontak aktif).", verified:true, likes:37, saves:14, isLiked:false, isSaved:false, connectionPost:true },
  { id:4, brand:"Griya Lestari", author:"Sarah Ayu", authorRole:"Marketing Manager", avatar:"SA", time:"1 hari lalu", narration:"Halo! Griya Lestari lagi cari Community Partner, spesifiknya komunitas gowes atau lari di Jabodetabek. Kita mau bikin event 'Fun Bike to Home'. Gas gak? 🚴‍♀️🏡", type:"Community Partner", scheme:"Discount", title:"Fun Bike to Home - Community Support", give:"Diskon booking fee 50% untuk member komunitas, free merchandise event, dan konsumsi peserta.", expect:"Mobilisasi minimal 100 member komunitas untuk hadir di hari H.", verified:true, likes:19, saves:6, isLiked:false, isSaved:false, connectionPost:false },
  { id:5, brand:"Local Sounds Festival", author:"Dimas Pratama", authorRole:"Event Director", avatar:"DM", time:"2 hari lalu", narration:"Urgent! 🚨 Festival musik indie kita bulan depan butuh Ticketing Partner yang reliable. Target 5.000 orang. Yuk platform ticketing lokal merapat! 🎸🎟️", type:"Lainnya", scheme:"To Be Discussed", title:"Pencarian Ticketing Partner untuk Festival Musik", give:"Eksklusivitas penjualan tiket (target 5.000 pax), logo di semua materi promosi festival.", expect:"Sistem e-ticket aman, fee transaksi flat/rendah, support tim gate di hari H.", verified:false, likes:8, saves:2, isLiked:false, isSaved:false, connectionPost:false },
  { id:6, brand:"Kreasi Nusantara", author:"Bima Sakti", authorRole:"Creative Director", avatar:"BS", time:"3 hari lalu", narration:"Halo kreatif-kreatif Indonesia! 🎨 Kreasi Nusantara lagi cari brand/komunitas buat kolaborasi branding project. Kita bisa barter: full visual identity kalian kita kerjain, kalian expose brand kita di event. Win-win! 🤝", type:"Media Partner", scheme:"Barter Value", title:"Kolaborasi Branding & Visual Identity untuk Community Event", give:"Full branding package: logo, banner, social media kit.", expect:"Exposure brand di semua materi event (online & offline).", verified:true, likes:45, saves:18, isLiked:false, isSaved:false, connectionPost:true },
  { id:7, brand:"Startup Bootcamp ID", author:"Lena Hartono", authorRole:"Program Director", avatar:"LH", time:"4 hari lalu", narration:"Hey ecosystem builders! 🚀 Demo Day Cohort 14 hadir bulan depan dengan 50+ startup pitching di depan 200+ investor. Slot Lead Sponsor masih terbuka. Kesempatan langka buat akses dealflow terbaik Indonesia!", type:"Sponsorship", scheme:"Fresh Money", title:"Lead Sponsor Demo Day Cohort 14 – Startup Bootcamp ID", give:"Branding premium, meja networking eksklusif, akses pitching deck 50+ startup.", expect:"Pendanaan Rp 25.000.000 untuk operasional Demo Day via Escrow.", verified:true, likes:52, saves:21, isLiked:false, isSaved:false, connectionPost:false },
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
  proposalReceived:8, proposalSent:12, proposalPending:3, proposalRejected:2,
  proposalApproved:7, accountViews30:3420, totalConnections:128, totalFeedPost:6,
  totalLikes:89, totalSaved:31, totalAppointment:14, totalMeetingDone:11,
  totalDeal:9, totalMouGenerated:9, totalLpjGenerated:7,
  totalSponsorshipFreshMoney:45000000, totalSponsorshipBarter:12
};

const TRAFFIC_DATA = [
  {date:'1 Mei',viewed:180,liked:22,saved:38},{date:'6 Mei',viewed:240,liked:30,saved:52},
  {date:'11 Mei',viewed:310,liked:40,saved:68},{date:'16 Mei',viewed:420,liked:52,saved:90},
  {date:'21 Mei',viewed:540,liked:65,saved:115},{date:'26 Mei',viewed:615,liked:75,saved:132},
  {date:'31 Mei',viewed:660,liked:82,saved:148},
];

const PUBLISHED_FUNNEL = [
  {label:'RECEIVED',value:156,pct:'100%'},{label:'APPROVED',value:112,pct:'71.8%'},
  {label:'REJECT',value:42,pct:'26.9%'},{label:'APPT',value:28,pct:'17.9%'},
  {label:'DEAL',value:17,pct:'10.9%'},{label:'NOT\nDEAL',value:11,pct:'7.1%'},
  {label:'PKS',value:15,pct:'9.6%'},{label:'ACTIVE\nCOLLAB',value:9,pct:'5.8%'},
  {label:'LPJ',value:6,pct:'3.8%'},{label:'DONE',value:4,pct:'2.6%'},
];
const SENT_FUNNEL = [
  {label:'RECEIVED',value:22,pct:'100%'},{label:'REJECT',value:8,pct:'36.4%'},
  {label:'APPT',value:15,pct:'68.2%'},{label:'NOT\nDEAL',value:6,pct:'27.3%'},
  {label:'DEAL',value:9,pct:'40.9%'},{label:'PKS',value:6,pct:'27.3%'},
  {label:'ACTIVE\nCOLLAB',value:5,pct:'22.7%'},{label:'LPJ',value:4,pct:'18.2%'},
  {label:'DONE',value:3,pct:'13.6%'},
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
  const [viewingProfile, setViewingProfile] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [fullProfileData, setFullProfileData] = useState(null);
  const [showVerificationBanner, setShowVerificationBanner] = useState(false);
  const [viewHistory, setViewHistory] = useState([]);
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const navigateTo = (view, data) => {
    if (view === 'view-profile' && data) setFullProfileData(data);
    setViewHistory(prev => [...prev, currentView]);
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    setRightPanel(null);
    window.scrollTo(0, 0);
  };

  const navigateBack = () => {
    const prev = viewHistory[viewHistory.length - 1];
    if (prev) {
      setViewHistory(h => h.slice(0, -1));
      setCurrentView(prev);
      setRightPanel(null);
      window.scrollTo(0, 0);
    } else {
      navigateTo('feed');
    }
  };

  const handleRegisterComplete = () => {
    setShowVerificationBanner(true);
    navigateTo('feed');
  };

  const toggleLike = (id) => setFeedItems(f => f.map(x => x.id === id ? { ...x, isLiked: !x.isLiked, likes: x.isLiked ? x.likes - 1 : x.likes + 1 } : x));
  const toggleSave = (id) => setFeedItems(f => f.map(x => x.id === id ? { ...x, isSaved: !x.isSaved, saves: x.isSaved ? x.saves - 1 : x.saves + 1 } : x));
  const handleConnect = (brand) => { setConnectedUsers(prev => [...prev, brand]); alert('Permintaan koneksi terkirim ke ' + brand + '!'); };

  const filteredFeed = feedItems.filter(x => {
    if (filterConn && !x.connectionPost) return false;
    if (filterType && x.type.toLowerCase() !== filterType.toLowerCase()) return false;
    if (filterScheme && !x.scheme.toLowerCase().includes(filterScheme.toLowerCase())) return false;
    if (searchQ && !x.brand.toLowerCase().includes(searchQ.toLowerCase()) && !x.title.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  });

  const isAppView = ['feed','profile','create','proposals','chat','testimoni','mou','lpj','view-profile'].includes(currentView);

  // ── VERIFICATION BANNER ──────────────────────
  const VerificationBanner = () => (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex items-center gap-3 flex-shrink-0">
      <Bell className="w-4 h-4 text-amber-600 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="text-xs font-bold text-amber-800">Akun belum terverifikasi. </span>
        <span className="text-xs text-amber-700">Lengkapi dokumen verifikasi di Profil → Edit Profil dalam <strong>30 hari</strong>, atau akun akan dinonaktifkan. Postingan akun unverified tampil lebih rendah di feed.</span>
      </div>
      <button onClick={() => setShowVerificationBanner(false)} className="text-amber-500 hover:text-amber-700 flex-shrink-0"><X className="w-4 h-4" /></button>
    </div>
  );

  // ── SIDEBAR ──────────────────────────────────
  const Sidebar = () => (
    <div className="hidden md:flex w-56 bg-[#0F1A2F] border-r border-[#C5A869]/20 h-screen sticky top-0 flex-col py-5 px-3 shadow-xl z-20 flex-shrink-0">
      <div className="flex items-center gap-2 cursor-pointer mb-7 px-2" onClick={() => navigateTo('feed')}>
        <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 100 100" fill="none"><path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#C5A869" strokeWidth="4" fill="none" /><path d="M50 18L82 50L50 82L18 50L50 18Z" fill="#2D4066" opacity="0.9" /></svg>
        <span className="text-lg font-bold tracking-wider text-[#C5A869] font-['Cardo']">SynergyX</span>
      </div>
      <div className="flex flex-col gap-1">
        {[
          { id: 'feed', icon: <Home className="w-4 h-4" />, label: 'Discovery Feed' },
          { id: 'dashboard', icon: <BarChart2 className="w-4 h-4" />, label: 'Dashboard' },
          { id: 'profile', icon: <User className="w-4 h-4" />, label: 'Profil Bisnis' },
          { id: 'proposals', icon: <MessageSquare className="w-4 h-4" />, label: 'Kelola Proposal' },
        ].map(item => (
          <button key={item.id} onClick={() => navigateTo(item.id)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${currentView === item.id ? 'bg-[#C5A869] text-[#0F1A2F] shadow-lg font-bold' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'}`}>
            {item.icon} {item.label}
          </button>
        ))}
        <div className="my-2 border-t border-[#2D4066]/50" />
        <p className="px-3 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Interaksi Partner</p>
        <button onClick={() => navigateTo('chat')} className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${currentView === 'chat' ? 'bg-[#C5A869] text-[#0F1A2F]' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'}`}>
          <div className="flex items-center gap-3"><MessageCircle className="w-4 h-4" /> Pesan / Chat</div>
          <div className="w-2 h-2 rounded-full bg-red-500" />
        </button>
        <button onClick={() => navigateTo('testimoni')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${currentView === 'testimoni' ? 'bg-[#C5A869] text-[#0F1A2F]' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'}`}>
          <Star className="w-4 h-4" /> Rating & Testimoni
        </button>
        <div className="my-2 border-t border-[#2D4066]/50" />
        <p className="px-3 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Dokumen</p>
        <button onClick={() => { navigateTo('proposals'); setRightPanel('mou'); }} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${rightPanel === 'mou' ? 'bg-[#C5A869] text-[#0F1A2F]' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'}`}>
          <Pencil className="w-4 h-4" /> Input MoU
        </button>
        <button onClick={() => { navigateTo('proposals'); setRightPanel('lpj'); }} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${rightPanel === 'lpj' ? 'bg-[#C5A869] text-[#0F1A2F]' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'}`}>
          <FileText className="w-4 h-4" /> Input LPJ
        </button>
      </div>
      <div className="mt-auto pt-4 space-y-2">
        <button onClick={() => navigateTo('create')} className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0F1A2F] font-bold text-sm hover:scale-105 transition-transform shadow-lg">
          <PlusCircle className="w-4 h-4" /> Buat Peluang
        </button>
        <button onClick={() => { if (window.confirm('Yakin ingin keluar?')) navigateTo('landing'); }} className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-[#C5A869]/30 text-gray-400 font-medium text-sm hover:bg-red-900/20 hover:text-red-400 hover:border-red-400/30 transition-all">
          <ArrowLeft className="w-4 h-4" /> Log Out
        </button>
      </div>
    </div>
  );

  // ── MOBILE HEADER ────────────────────────────
  const MobileHeader = () => (
    <div className="md:hidden fixed top-0 w-full z-50 bg-[#0F1A2F] border-b border-[#C5A869]/20 h-14 flex items-center justify-between px-4 shadow-md">
      <div className="flex items-center gap-2" onClick={() => navigateTo('feed')}>
        <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none"><path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#C5A869" strokeWidth="4" fill="none" /><path d="M50 18L82 50L50 82L18 50L50 18Z" fill="#2D4066" opacity="0.9" /></svg>
        <span className="text-base font-bold text-[#C5A869] font-['Cardo']">SynergyX</span>
      </div>
      <button className="text-[#C5A869] p-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
    </div>
  );

  // ── COLLAB CARD ──────────────────────────────
  const CollabCard = ({ data, onApply }) => {
    const handleViewProfile = () => {
      const profile = MOCK_FULL_PROFILES[data.id];
      if (profile) navigateTo('view-profile', profile);
    };
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 hover:shadow-xl hover:shadow-[#0F1A2F]/5 transition-all duration-300 mb-4">
        {data.connectionPost && (
          <div className="flex items-center gap-1.5 text-[10px] text-[#C5A869] font-bold uppercase tracking-widest mb-2">
            <Link className="w-3 h-3" /> Dari Koneksi Anda
          </div>
        )}
        {!data.verified && (
          <div className="flex items-center gap-1.5 text-[10px] text-amber-500 font-medium mb-2">
            <AlertCircle className="w-3 h-3" /> Akun belum terverifikasi — visibilitas lebih rendah di feed
          </div>
        )}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <button onClick={handleViewProfile} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#0F1A2F] to-[#2D4066] flex items-center justify-center font-bold text-[#C5A869] text-sm md:text-base flex-shrink-0 hover:ring-2 hover:ring-[#C5A869] transition-all cursor-pointer">
              {data.avatar}
            </button>
            <div>
              <div className="flex items-center gap-1.5">
                <button onClick={handleViewProfile} className="text-[#0F1A2F] font-bold text-sm hover:text-[#C5A869] transition-colors">{data.brand}</button>
                {data.verified && <CheckCircle className="w-3.5 h-3.5 text-blue-500" />}
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
              <Heart className={`w-4 h-4 ${data.isLiked ? 'fill-current' : ''}`} /> {data.likes}
            </button>
            <button onClick={() => toggleSave(data.id)} className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${data.isSaved ? 'text-[#C5A869]' : 'text-gray-400 hover:text-[#C5A869]'}`}>
              <Bookmark className={`w-4 h-4 ${data.isSaved ? 'fill-current' : ''}`} /> {data.saves}
            </button>
          </div>
          <button onClick={() => onApply(data)} className="flex items-center gap-2 px-4 py-2 bg-[#0F1A2F] text-white text-xs font-bold rounded-lg hover:bg-[#1E2D4A] transition-colors shadow-md">
            <Send className="w-3.5 h-3.5" /> Ajukan Proposal
          </button>
        </div>
      </div>
    );
  };

  // ── LANDING ──────────────────────────────────
  const LandingView = () => (
    <div className="min-h-screen bg-[#0A1628] relative flex flex-col overflow-hidden">
      <div className="absolute top-0 right-0 w-96 md:w-[600px] h-96 md:h-[600px] rounded-full bg-gradient-to-bl from-[#C5A869]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A2744_1px,transparent_1px),linear-gradient(to_bottom,#1A2744_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
      <header className="relative z-10 flex justify-between items-center px-5 md:px-10 py-5">
        <div className="flex items-center gap-3">
          <svg className="w-8 h-8 md:w-9 md:h-9" viewBox="0 0 100 100" fill="none"><path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#C5A869" strokeWidth="4" fill="none" /><path d="M50 18L82 50L50 82L18 50L50 18Z" fill="#1A2744" opacity="0.9" /></svg>
          <span className="text-xl md:text-2xl font-bold tracking-wider text-[#C5A869] font-['Cardo']">SynergyX</span>
        </div>
        <button onClick={() => navigateTo('login')} className="text-sm font-bold text-[#C5A869] border border-[#C5A869]/40 px-4 py-2 rounded-lg hover:bg-[#C5A869]/10 transition">Sign In</button>
      </header>
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 py-16 md:py-24">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A869]/10 border border-[#C5A869]/30 text-[#C5A869] text-xs font-bold tracking-wider uppercase mb-7">
          <Sparkles className="w-3.5 h-3.5" /> Ekosistem Kolaborasi B2B Terkurasi
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-['Cardo'] font-bold text-white leading-tight mb-5 max-w-4xl">
          Cari Mitra Kolaborasi?<br /><span className="text-[#C5A869]">Selesaikan dalam Hitungan Menit.</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg mb-8 max-w-2xl leading-relaxed">Platform satu pintu untuk mempertemukan agensi, brand, Community, dan pihak-pihak kemitraan strategis.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => navigateTo('register')} className="px-7 py-3.5 rounded-xl bg-[#C5A869] text-[#0F1A2F] font-bold tracking-wide shadow-xl hover:-translate-y-1 transition-all duration-300 text-base flex items-center justify-center gap-2">
            Daftar ke SynergyX <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => navigateTo('login')} className="px-7 py-3.5 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition text-base">Lihat Demo</button>
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

  // ── LOGIN ─────────────────────────────────────
  const LoginView = () => (
    <div className="min-h-screen flex bg-[#FDFBF7]">
      <div className="hidden lg:flex w-1/2 bg-[#0F1A2F] flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2D4066_1px,transparent_1px),linear-gradient(to_bottom,#2D4066_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20" />
        <div className="relative z-10 text-center px-12">
          <svg className="w-20 h-20 mx-auto mb-8" viewBox="0 0 100 100" fill="none"><path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#FFE194" strokeWidth="4" fill="none" /><path d="M50 18L82 50L50 82L18 50L50 18Z" fill="#2D4066" opacity="0.9" /></svg>
          <h2 className="text-3xl md:text-4xl font-['Cardo'] font-bold text-white mb-4">Welcome to SynergyX</h2>
          <p className="text-gray-400 text-base">Platform B2B eksklusif untuk kolaborasi dan kemitraan strategis.</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-10 relative">
        <button onClick={() => navigateTo('landing')} className="absolute top-6 left-6 text-gray-400 hover:text-[#0F1A2F] flex items-center gap-1 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-[#0F1A2F]/5 border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-['Cardo'] font-bold text-[#0F1A2F] mb-2">Masuk ke Akun</h3>
            <p className="text-sm text-gray-500">Lanjutkan ekspansi bisnis Anda hari ini.</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Alamat Email</label>
              <input type="email" placeholder="nama@perusahaan.com" className="w-full bg-[#FDFBF7] border border-gray-200 text-[#0F1A2F] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869] focus:ring-1 focus:ring-[#C5A869]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Kata Sandi</label>
              <input type="password" placeholder="••••••••" className="w-full bg-[#FDFBF7] border border-gray-200 text-[#0F1A2F] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869] focus:ring-1 focus:ring-[#C5A869]" />
            </div>
            <button onClick={() => navigateTo('feed')} className="w-full py-3.5 rounded-xl bg-[#0F1A2F] text-white font-bold hover:bg-[#1E2D4A] shadow-lg transition-all">Sign In</button>
          </div>
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center"><span className="px-2 bg-white text-gray-500 text-xs font-medium">ATAU</span></div>
          </div>
          <button onClick={() => navigateTo('feed')} className="mt-5 w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 font-bold hover:bg-gray-50 transition-colors text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
            Sign in with Google
          </button>
          <p className="text-center text-sm text-gray-500 mt-6">Belum punya akun? <button onClick={() => navigateTo('register')} className="text-[#C5A869] font-bold hover:underline">Daftar</button></p>
        </div>
      </div>
    </div>
  );

  // ── REGISTER (SIMPLIFIED — no doc upload at signup) ──
  const RegisterView = () => (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 justify-center mb-8">
          <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none"><path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#C5A869" strokeWidth="4" fill="none" /><path d="M50 18L82 50L50 82L18 50L50 18Z" fill="#2D4066" opacity="0.9" /></svg>
          <span className="text-xl font-bold text-[#C5A869] font-['Cardo']">SynergyX</span>
        </div>
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <h3 className="text-2xl font-['Cardo'] font-bold text-[#0F1A2F] mb-1">Buat Akun SynergyX</h3>
          <p className="text-sm text-gray-500 mb-6">Mulai ekosistem kolaborasi B2B Anda hari ini.</p>
          <div className="space-y-4">
            {[["Nama Brand / Entitas","text","Teman Kreativ"],["Email","email","hello@brand.com"],["Password","password","Minimal 8 karakter"]].map(([label,type,ph]) => (
              <div key={label}>
                <label className="text-xs font-bold text-gray-600 uppercase block mb-1.5">{label}</label>
                <input type={type} placeholder={ph} className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869]" />
              </div>
            ))}
            <button onClick={handleRegisterComplete} className="w-full py-3.5 bg-[#0F1A2F] text-white font-bold rounded-xl hover:bg-[#1E2D4A] transition shadow-lg">Daftar Sekarang →</button>
          </div>
          <div className="my-5 relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center"><span className="px-2 bg-white text-gray-500 text-xs">ATAU</span></div>
          </div>
          <button onClick={handleRegisterComplete} className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 font-bold hover:bg-gray-50 transition text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
            Daftar dengan Google
          </button>
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>ℹ️ Verifikasi Akun:</strong> Setelah daftar, lengkapi upload dokumen verifikasi (NIB/KTP/Impact Report) di <em>Profil → Edit Profil</em> dalam <strong>30 hari</strong>. Akun yang belum terverifikasi memiliki visibilitas feed lebih rendah dan akan dinonaktifkan jika melewati batas waktu.
            </p>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">Sudah punya akun? <button onClick={() => navigateTo('login')} className="text-[#C5A869] font-bold hover:underline">Sign In</button></p>
      </div>
    </div>
  );

  // ── FEED VIEW ────────────────────────────────
  const FeedView = () => (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto w-full">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-['Cardo'] font-bold text-[#0F1A2F]">Discovery Feed</h2>
        <p className="text-gray-500 text-sm mt-1">Temukan peluang kolaborasi terbaru yang dikurasi untuk industri Anda.</p>
      </div>
      <div className="bg-white border border-gray-100 p-3 md:p-4 rounded-2xl shadow-sm mb-5 flex flex-col gap-3">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Cari nama brand atau kata kunci..." className="w-full bg-[#FDFBF7] border border-gray-200 text-[#0F1A2F] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#C5A869]" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="flex-1 min-w-[130px] bg-white border border-gray-200 text-gray-700 font-medium rounded-xl px-3 py-2 text-sm focus:outline-none cursor-pointer">
            <option value="">Semua Tipe</option>
            {['Media Partner','Community Partner','Strategic Partner','Sponsorship','Lainnya'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={filterScheme} onChange={e => setFilterScheme(e.target.value)} className="flex-1 min-w-[130px] bg-white border border-gray-200 text-gray-700 font-medium rounded-xl px-3 py-2 text-sm focus:outline-none cursor-pointer">
            <option value="">Semua Skema</option>
            {[['Barter','Barter Value'],['Fresh','Fresh Money'],['Referral','Referral'],['Discount','Discount'],['Discussed','To Be Discussed']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <button onClick={() => setFilterConn(v => !v)} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold border transition-all ${filterConn ? 'bg-[#0F1A2F] text-white border-[#0F1A2F]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#0F1A2F]'}`}>
            <Link className="w-3.5 h-3.5" /> Koneksi
          </button>
        </div>
      </div>
      <div>
        {filteredFeed.length === 0
          ? <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-3xl"><Search className="w-10 h-10 text-gray-300 mx-auto mb-3" /><h4 className="text-base font-bold text-gray-500 mb-1">Tidak ditemukan</h4><p className="text-sm text-gray-400">Coba ubah filter pencarian Anda.</p></div>
          : filteredFeed.map(card => <CollabCard key={card.id} data={card} onApply={(data) => { setSelectedCard(data); setShowProposalModal(true); }} />)
        }
      </div>
    </div>
  );

  // ── VIEW PROFILE (Full profile of feed partners) ──
  const ViewProfileView = () => {
    if (!fullProfileData) { navigateTo('feed'); return null; }
    const p = fullProfileData;
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full space-y-5">
        <button onClick={navigateBack} className="flex items-center gap-2 text-gray-500 hover:text-[#0F1A2F] transition-colors font-medium text-sm">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Feed
        </button>
        {/* Header Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          <div className="h-28 md:h-36 bg-gradient-to-r from-[#0F1A2F] to-[#2D4066] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/cubes.png)' }} />
          </div>
          <div className="px-5 md:px-8 pb-6 relative">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white border-4 border-white shadow-xl text-[#0F1A2F] flex items-center justify-center text-2xl md:text-3xl font-['Cardo'] font-bold absolute -top-8 md:-top-10">{p.logo}</div>
            <div className="mt-10 md:mt-14 flex flex-col sm:flex-row justify-between items-start gap-3">
              <div>
                <h3 className="text-xl md:text-2xl font-['Cardo'] font-bold text-[#0F1A2F] flex items-center gap-2">
                  {p.brandName}
                  {p.isVerified ? <CheckCircle className="w-5 h-5 text-blue-500" /> : <AlertCircle className="w-5 h-5 text-amber-400" />}
                  {!p.isVerified && <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Belum Terverifikasi</span>}
                </h3>
                <p className="text-[#C5A869] font-bold text-xs tracking-wide uppercase mt-1">{p.industry} • {p.location}</p>
                <p className="text-gray-600 mt-3 font-medium italic text-sm">"{p.tagline}"</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => handleConnect(p.brandName)} className="px-4 py-2 bg-[#0F1A2F] text-white rounded-lg text-sm font-bold hover:bg-[#1E2D4A] transition-colors flex items-center gap-2">
                  <Users className="w-4 h-4" /> Connect
                </button>
                <button onClick={() => { setSelectedCard({ ...p, avatar: p.logo, author: p.founder.name, authorRole: p.founder.role, title: p.activeCollabs[0]?.title || '', give: p.activeCollabs[0]?.give || '', expect: p.activeCollabs[0]?.expect || '', type: p.activeCollabs[0]?.type || '', scheme: p.activeCollabs[0]?.scheme || '' }); setShowProposalModal(true); }} className="px-4 py-2 border-2 border-[#0F1A2F] text-[#0F1A2F] rounded-lg text-sm font-bold hover:bg-[#0F1A2F] hover:text-white transition-colors flex items-center gap-2">
                  <Send className="w-4 h-4" /> Kirim Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Profil Views', value: p.stats.views.toLocaleString(), icon: <Eye className="w-4 h-4 text-[#C5A869]" />, sub: 'Total dilihat' },
            { label: 'Partnership Aktif', value: p.stats.ongoing, icon: <BarChart2 className="w-4 h-4 text-[#C5A869]" />, sub: 'On going' },
            { label: 'Partnership Selesai', value: p.stats.done, icon: <Trophy className="w-4 h-4 text-[#C5A869]" />, sub: 'Verified deals' },
            { label: 'Total Koneksi', value: p.stats.connections, icon: <Users className="w-4 h-4 text-[#C5A869]" />, sub: 'Di ekosistem' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">{s.icon}<span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">{s.label}</span></div>
              <div className="text-xl md:text-2xl font-['Cardo'] font-bold text-[#0F1A2F]">{s.value}</div>
              <div className="text-[11px] text-gray-400 mt-1">{s.sub}</div>
            </div>
          ))}
        </div>
        {/* Founder — first before currency */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-lg flex flex-col md:flex-row items-start gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0F1A2F] to-[#2D4066] flex items-center justify-center shrink-0 shadow-inner">
            <User className="w-9 h-9 text-[#C5A869]" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl md:text-2xl font-['Cardo'] font-bold text-[#0F1A2F]">{p.founder.name}</h4>
            <p className="text-sm font-bold text-[#C5A869] mb-3">{p.founder.role}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{p.founder.bio}</p>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <a href={p.founder.social.linkedin || '#'} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-[#0F1A2F]/5 text-[#0F1A2F] rounded-lg text-xs font-bold hover:bg-[#0F1A2F]/10 transition"><Linkedin className="w-3 h-3" /> LinkedIn</a>
              <a href={p.founder.social.ig || '#'} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-[#0F1A2F]/5 text-[#0F1A2F] rounded-lg text-xs font-bold hover:bg-[#0F1A2F]/10 transition"><Instagram className="w-3 h-3" /> Instagram</a>
              <a href={p.founder.social.web} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-[#C5A869]/10 text-[#AA7C11] border border-[#C5A869]/30 rounded-lg text-xs font-bold hover:bg-[#C5A869]/20 transition"><Globe className="w-3 h-3" /> Website</a>
              <a href={`https://www.google.com/search?q=${encodeURIComponent(p.founder.name + ' ' + p.brandName)}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-[#C5A869]/10 text-[#AA7C11] border border-[#C5A869]/30 rounded-lg text-xs font-bold hover:bg-[#C5A869]/20 transition"><Search className="w-3 h-3" /> Track Record</a>
            </div>
          </div>
        </div>
        {/* Collaboration Currency */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-lg">
          <h4 className="text-lg md:text-xl font-['Cardo'] font-bold text-[#0F1A2F] mb-4">Collaboration Currency</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: <Users className="w-4 h-4 text-[#C5A869]" />, label: 'Audience Asset', val: p.currency.audience },
              { icon: <Star className="w-4 h-4 text-[#C5A869]" />, label: 'Credibility Asset', val: p.currency.credibility },
              { icon: <TrendingUp className="w-4 h-4 text-[#C5A869]" />, label: 'Activation Asset', val: p.currency.activation },
              { icon: <Activity className="w-4 h-4 text-[#C5A869]" />, label: 'Network Asset', val: p.currency.network },
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
          <h4 className="text-lg md:text-xl font-['Cardo'] font-bold text-[#0F1A2F] mb-4">Portofolio Kolaborasi</h4>
          <div className="grid sm:grid-cols-2 gap-4">
            {p.portfolio.map(item => (
              <div key={item.id} className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-50 relative">
                <ShieldCheck className="w-4 h-4 text-emerald-500 absolute top-4 right-4" />
                <h5 className="text-sm font-bold text-[#0F1A2F] mb-1 pr-6">{item.title}</h5>
                <p className="text-xs font-medium text-gray-500">Mitra: {item.partner}</p>
                <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-500/20 px-2.5 py-1 rounded-md uppercase tracking-wide">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Active Collabs */}
        <div className="bg-[#FDFBF7] rounded-3xl p-6 md:p-8 border border-gray-200 border-dashed">
          <h4 className="text-lg md:text-xl font-['Cardo'] font-bold text-[#0F1A2F] mb-5">Peluang Kolaborasi yang Dibuka</h4>
          {p.activeCollabs.map(item => (
            <div key={item.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between gap-4 md:items-center">
              <div className="flex-1">
                <div className="flex gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-[#0F1A2F] text-white">{item.type}</span>
                  <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-[#C5A869]/10 text-[#AA7C11] border border-[#C5A869]/30">{item.scheme}</span>
                </div>
                <h5 className="font-['Cardo'] font-bold text-[#0F1A2F] text-base mb-1">{item.title}</h5>
                <p className="text-sm text-gray-500"><strong>Benefit:</strong> {item.give}</p>
              </div>
              <button onClick={() => { setSelectedCard({ ...p, avatar: p.logo, author: p.founder.name, authorRole: p.founder.role, title: item.title, give: item.give, expect: item.expect || '-', type: item.type, scheme: item.scheme }); setShowProposalModal(true); }} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#0F1A2F] text-white text-xs font-bold rounded-xl hover:bg-[#1E2D4A] transition-colors flex-shrink-0">
                <Send className="w-4 h-4" /> Ajukan Proposal
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── PROFILE VIEW (Founder moved BEFORE Currency) ──
  const ProfileView = () => (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={navigateBack} className="flex items-center gap-1.5 text-gray-400 hover:text-[#0F1A2F] transition-colors text-sm font-medium"><ArrowLeft className="w-4 h-4" /> Kembali</button>
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl font-['Cardo'] font-bold text-[#0F1A2F]">Profil Etalase Bisnis</h2>
        <p className="text-gray-500 text-sm mt-1">Kredibilitas bisnis Anda di SynergyX.</p>
      </div>
      {/* Header */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
        <div className="h-28 md:h-36 bg-gradient-to-r from-[#0F1A2F] to-[#2D4066] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/cubes.png)' }} />
        </div>
        <div className="px-5 md:px-8 pb-6 relative">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white border-4 border-white shadow-xl text-[#0F1A2F] flex items-center justify-center text-2xl md:text-3xl font-['Cardo'] font-bold absolute -top-8 md:-top-10">{MOCK_USER.logo}</div>
          <div className="mt-10 md:mt-14 flex flex-col sm:flex-row justify-between items-start gap-3">
            <div>
              <h3 className="text-xl md:text-2xl font-['Cardo'] font-bold text-[#0F1A2F] flex items-center gap-2">{MOCK_USER.brandName} <CheckCircle className="w-5 h-5 text-blue-500" /></h3>
              <p className="text-[#C5A869] font-bold text-xs tracking-wide uppercase mt-1">{MOCK_USER.industry} • {MOCK_USER.location}</p>
              <p className="text-gray-600 mt-3 font-medium italic text-sm">"{MOCK_USER.tagline}"</p>
            </div>
            <button onClick={() => setShowEditProfile(true)} className="px-5 py-2 border-2 border-[#0F1A2F] text-[#0F1A2F] rounded-lg text-sm font-bold hover:bg-[#0F1A2F] hover:text-white transition-colors flex-shrink-0">Edit Profil</button>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Profil Views', value: MOCK_USER.stats.views.toLocaleString(), icon: <Eye className="w-4 h-4 text-[#C5A869]" />, sub: '+124 minggu ini' },
          { label: 'Partnership Aktif', value: MOCK_USER.stats.ongoing, icon: <BarChart2 className="w-4 h-4 text-[#C5A869]" />, sub: 'On going' },
          { label: 'Partnership Selesai', value: MOCK_USER.stats.done, icon: <Trophy className="w-4 h-4 text-[#C5A869]" />, sub: 'Verified deals' },
          { label: 'Rating', value: '4.8/5', icon: <Star className="w-4 h-4 text-[#C5A869]" />, sub: 'Dari 30+ deal' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">{s.icon}<span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">{s.label}</span></div>
            <div className="text-xl md:text-2xl font-['Cardo'] font-bold text-[#0F1A2F]">{s.value}</div>
            <div className="text-[11px] text-gray-400 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
      {/* ★ FOUNDER — moved HERE, before Currency */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-lg flex flex-col md:flex-row items-start gap-5">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0F1A2F] to-[#2D4066] flex items-center justify-center shrink-0 shadow-inner">
          <User className="w-9 h-9 text-[#C5A869]" />
        </div>
        <div className="flex-1">
          <h4 className="text-xl md:text-2xl font-['Cardo'] font-bold text-[#0F1A2F]">{MOCK_USER.founder.name}</h4>
          <p className="text-sm font-bold text-[#C5A869] mb-3">{MOCK_USER.founder.role}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{MOCK_USER.founder.bio}</p>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <a href={MOCK_USER.founder.social.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-[#0F1A2F]/5 text-[#0F1A2F] rounded-lg text-xs font-bold hover:bg-[#0F1A2F]/10 transition"><Linkedin className="w-3 h-3" /> LinkedIn</a>
            <a href={MOCK_USER.founder.social.ig} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-[#0F1A2F]/5 text-[#0F1A2F] rounded-lg text-xs font-bold hover:bg-[#0F1A2F]/10 transition"><Instagram className="w-3 h-3" /> Instagram</a>
            <a href={MOCK_USER.founder.social.web} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-[#C5A869]/10 text-[#AA7C11] border border-[#C5A869]/30 rounded-lg text-xs font-bold hover:bg-[#C5A869]/20 transition"><Globe className="w-3 h-3" /> Website</a>
            <a href={`https://www.google.com/search?q=${encodeURIComponent(MOCK_USER.founder.name)}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-[#C5A869]/10 text-[#AA7C11] border border-[#C5A869]/30 rounded-lg text-xs font-bold hover:bg-[#C5A869]/20 transition"><Search className="w-3 h-3" /> Track Record</a>
          </div>
        </div>
      </div>
      {/* Why Collab */}
      <div className="bg-[#0F1A2F] rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A869]/10 rounded-full blur-2xl" />
        <h4 className="text-lg md:text-2xl font-['Cardo'] font-bold text-white mb-5">Mengapa Bekerja Sama dengan Kami?</h4>
        <div className="space-y-4">
          {[
            { icon: <ShieldCheck className="w-4 h-4 text-[#C5A869]" />, title: 'Kredibilitas Terpercaya', desc: 'Dipimpin oleh sosok yang rekam jejaknya terverifikasi. Kami memprioritaskan transparansi dan tata kelola profesional.' },
            { icon: <Users className="w-4 h-4 text-[#C5A869]" />, title: 'Akses Langsung ke Target Market', desc: 'Mitra kami mendapatkan eksposur organik ke lebih dari 5.000+ member aktif ekosistem kreatif.' },
          ].map(item => (
            <div key={item.title} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-[#C5A869]/20 flex items-center justify-center shrink-0 mt-0.5">{item.icon}</div>
              <div><h5 className="font-bold text-[#FFE194] text-sm">{item.title}</h5><p className="text-gray-300 text-sm mt-1 leading-relaxed">{item.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
      {/* ★ COLLABORATION CURRENCY — now AFTER founder */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-lg">
        <h4 className="text-lg md:text-xl font-['Cardo'] font-bold text-[#0F1A2F] mb-4">Collaboration Currency</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: <Users className="w-4 h-4 text-[#C5A869]" />, label: 'Audience Asset', val: MOCK_USER.currency.audience },
            { icon: <Star className="w-4 h-4 text-[#C5A869]" />, label: 'Credibility Asset', val: MOCK_USER.currency.credibility },
            { icon: <TrendingUp className="w-4 h-4 text-[#C5A869]" />, label: 'Activation Asset', val: MOCK_USER.currency.activation },
            { icon: <Activity className="w-4 h-4 text-[#C5A869]" />, label: 'Network Asset', val: MOCK_USER.currency.network },
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
              <ShieldCheck className="w-4 h-4 text-emerald-500 absolute top-4 right-4" />
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
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // ── CREATE COLLAB VIEW ────────────────────────
  const CreateCollabView = () => (
    <div className="p-4 md:p-6 lg:p-8 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={navigateBack} className="flex items-center gap-1.5 text-gray-400 hover:text-[#0F1A2F] transition-colors text-sm font-medium"><ArrowLeft className="w-4 h-4" /> Kembali</button>
      </div>
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
            <input type="text" placeholder="Misal: Dicari Media Partner untuk Tech Summit..." className="w-full bg-[#FDFBF7] border border-gray-200 text-[#0F1A2F] font-medium rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869]" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#0F1A2F] mb-2 uppercase flex items-center gap-2">Narasi Kasual <span className="bg-gray-100 text-gray-400 px-2 py-0.5 rounded text-[10px] normal-case">Lebih Humanis</span></label>
            <textarea rows="3" placeholder="Sapa calon mitramu dengan santai..." className="w-full bg-[#FDFBF7] border border-gray-200 text-[#0F1A2F] font-medium rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#C5A869] mb-2 uppercase">Yang Kami Berikan</label>
              <textarea rows="4" placeholder="Benefit untuk mitra..." className="w-full bg-[#FDFBF7] border border-[#C5A869]/30 text-[#0F1A2F] font-medium rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869]" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0F1A2F] mb-2 uppercase">Yang Kami Harapkan</label>
              <textarea rows="4" placeholder="Kewajiban / Syarat mitra..." className="w-full bg-[#FDFBF7] border border-gray-200 text-[#0F1A2F] font-medium rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869]" required />
            </div>
          </div>
          <button type="submit" className="w-full py-3.5 rounded-xl bg-[#0F1A2F] text-white font-bold tracking-wider hover:bg-[#1E2D4A] shadow-xl transition-all">Publish ke Feed</button>
        </form>
      </div>
    </div>
  );

  // ── MoU PANEL ────────────────────────────────
  const MouPanel = () => {
    const isDeal = ["deal","mou","lpj","done"].includes(incomingDealStatus);
    const [form, setForm] = useState(savedMou || { eventName:"", date:"", venue:"", benefit:"", obligation:"", value:"", partnerName:"", partnerPic:"", partnerRole:"" });
    const [mouSigned, setMouSigned] = useState(false);
    const handleSign = () => {
      const filled = ["eventName","date","venue","benefit","obligation","value"].every(k => form[k].trim());
      if (!filled) { alert("Lengkapi semua field wajib."); return; }
      setMouSigned(true); setSavedMou({ ...form, signed: true }); setIncomingDealStatus("mou");
      alert("✅ PKS/MoU ditandatangani & PDF digenerate! Email konfirmasi dikirim ke kedua PIC.");
    };
    return (
      <div className="w-full md:w-80 lg:w-96 bg-white border-l border-gray-200 flex flex-col h-full overflow-hidden flex-shrink-0">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#FDFBF7]">
          <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-[#C5A869]" /><h3 className="font-bold text-[#0F1A2F] text-sm">Input PKS / MoU</h3></div>
          <button onClick={() => setRightPanel(null)} className="text-gray-400 hover:text-[#0F1A2F]"><X className="w-4 h-4" /></button>
        </div>
        {!isDeal && <div className="m-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2"><Lock className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" /><div><p className="text-xs font-bold text-amber-800">Generate & e-Sign Terkunci</p><p className="text-xs text-amber-700 mt-0.5">Aktif setelah status <strong>DEAL</strong>. Anda bisa isi & simpan draft.</p></div></div>}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
            <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wide mb-2">Auto-Populate dari Profil</p>
            <div className="space-y-1 text-xs text-blue-800">
              <p><strong>Pihak 1:</strong> {MOCK_USER.brandName}</p>
              <p><strong>Perwakilan:</strong> {MOCK_USER.founder.name} — {MOCK_USER.founder.role}</p>
              <p><strong>Tipe:</strong> Sponsorship • Fresh Money</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 space-y-2">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">Identitas Pihak Kedua (Mitra)</p>
            {[["partnerName","Nama Brand/Perusahaan"],["partnerPic","Nama PIC"],["partnerRole","Jabatan PIC"]].map(([k,label]) => (
              <div key={k}><label className="text-[10px] text-gray-500 block mb-1">{label}</label>
                <input type="text" value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C5A869]" /></div>
            ))}
          </div>
          <div className="bg-[#FDFBF7] rounded-xl p-3 space-y-2 border border-gray-200">
            <p className="text-[10px] font-bold text-[#0F1A2F] uppercase tracking-wide">Pasal 1 — Ruang Lingkup Kegiatan</p>
            {[["eventName","Nama Event / Kegiatan","text","Tech Summit 2026"],["date","Tanggal Pelaksanaan","date",""],["venue","Lokasi / Venue","text","Jakarta Convention Center"],["value","Nilai Kerjasama","text","Rp 15.000.000"]].map(([k,label,type,ph]) => (
              <div key={k}><label className="text-[10px] text-gray-500 block mb-1">{label} <span className="text-red-400">*</span></label>
                <input type={type} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} placeholder={ph} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C5A869]" /></div>
            ))}
          </div>
          <div className="bg-[#FDFBF7] rounded-xl p-3 space-y-2 border border-gray-200">
            <p className="text-[10px] font-bold text-[#0F1A2F] uppercase tracking-wide">Pasal 2-3 — Hak & Kewajiban</p>
            {[["benefit","Benefit untuk Mitra (Pasal 2)","Logo di semua aset, slot speaker, dsb..."],["obligation","Kewajiban Mitra (Pasal 3)","2x IG Post, 1 artikel, dsb..."]].map(([k,label,ph]) => (
              <div key={k}><label className="text-[10px] text-gray-500 block mb-1">{label} <span className="text-red-400">*</span></label>
                <textarea rows="3" value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} placeholder={ph} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C5A869] resize-none" /></div>
            ))}
          </div>
          <div className="bg-[#C5A869]/5 rounded-xl p-3 border border-[#C5A869]/20">
            <p className="text-[10px] font-bold text-[#AA7C11] uppercase tracking-wide mb-2">Pasal 4 — Escrow (Auto)</p>
            <p className="text-xs text-gray-600">Termin I (DP 50%): H+5 hari kerja setelah PKS sign.</p>
            <p className="text-xs text-gray-600 mt-1">Termin II: Setelah LPJ diverifikasi platform.</p>
          </div>
          {mouSigned && <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3"><p className="text-xs font-bold text-emerald-700 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> PKS/MoU ditandatangani secara digital.</p></div>}
        </div>
        <div className="p-4 border-t border-gray-100 space-y-2">
          <button onClick={() => { setSavedMou(form); alert("Draft PKS disimpan!"); }} className="w-full py-2.5 border-2 border-[#0F1A2F] text-[#0F1A2F] font-bold text-sm rounded-xl hover:bg-[#0F1A2F] hover:text-white transition-all">Simpan Draft</button>
          {isDeal && !mouSigned
            ? <button onClick={handleSign} className="w-full py-2.5 bg-[#0F1A2F] text-white font-bold text-sm rounded-xl hover:bg-[#1E2D4A] transition-all flex items-center justify-center gap-2"><Pen className="w-3.5 h-3.5 text-[#C5A869]" /> Tandatangani & Generate PDF PKS</button>
            : mouSigned
              ? <button className="w-full py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2"><Download className="w-3.5 h-3.5" /> Download PDF PKS</button>
              : <button disabled className="w-full py-2.5 bg-gray-200 text-gray-400 font-bold text-sm rounded-xl cursor-not-allowed flex items-center justify-center gap-2"><Lock className="w-3.5 h-3.5" /> Generate & e-Sign (Terkunci)</button>
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
      setLpjDone(true); setSavedLpj({ ...form, submitted: true }); setIncomingDealStatus("lpj");
      alert("✅ LPJ disubmit! PDF digenerate & email dikirim ke kedua PIC. Pencairan Escrow dalam proses.");
    };
    return (
      <div className="w-full md:w-80 lg:w-96 bg-white border-l border-gray-200 flex flex-col h-full overflow-hidden flex-shrink-0">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#FDFBF7]">
          <div className="flex items-center gap-2"><ClipboardList className="w-4 h-4 text-[#C5A869]" /><h3 className="font-bold text-[#0F1A2F] text-sm">Input LPJ</h3></div>
          <button onClick={() => setRightPanel(null)} className="text-gray-400 hover:text-[#0F1A2F]"><X className="w-4 h-4" /></button>
        </div>
        {!isDeal && <div className="m-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2"><Lock className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" /><div><p className="text-xs font-bold text-amber-800">Submit LPJ Terkunci</p><p className="text-xs text-amber-700 mt-0.5">Aktif setelah status <strong>DEAL</strong>. Anda bisa isi & simpan draft.</p></div></div>}
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
                <input type={type} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C5A869]" /></div>
            ))}
          </div>
          <div className="bg-[#FDFBF7] rounded-xl p-3 space-y-2 border border-gray-200">
            <p className="text-[10px] font-bold text-[#0F1A2F] uppercase tracking-wide">II. Kinerja & Pembuktian Komitmen</p>
            <div><label className="text-[10px] text-gray-500 block mb-1">Ringkasan Realisasi Kewajiban <span className="text-red-400">*</span></label>
              <textarea rows="4" value={form.report} onChange={e => setForm({ ...form, report: e.target.value })} placeholder="Jelaskan realisasi setiap kewajiban yang disepakati dalam PKS..." className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C5A869] resize-none" /></div>
            {[["peserta","Jumlah Peserta / Kehadiran (Opsional)"],["reach","Total Reach / Impression (Opsional)"]].map(([k,label]) => (
              <div key={k}><label className="text-[10px] text-gray-500 block mb-1">{label}</label>
                <input type="text" value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} placeholder="e.g. 250 orang / 15.000 views" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C5A869]" /></div>
            ))}
            <div><label className="text-[10px] text-gray-500 block mb-1.5">Rating Pengalaman Kolaborasi</label>
              <div className="flex gap-2">{[1,2,3,4,5].map(n => (<button key={n} onClick={() => setForm({ ...form, rating: String(n) })} className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${Number(form.rating) >= n ? "bg-[#C5A869] text-[#0F1A2F]" : "bg-gray-100 text-gray-400"}`}>⭐</button>))}</div></div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
            <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide mb-1">IV. Trigger Pencairan Escrow</p>
            <p className="text-xs text-emerald-800">Submit LPJ akan membuka kunci pelunasan 50% dana yang tertahan di Escrow (maks H+5 hari kerja setelah verifikasi).</p>
          </div>
          {lpjDone && <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3"><p className="text-xs font-bold text-emerald-700 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> LPJ disubmit & PDF digenerate.</p></div>}
        </div>
        <div className="p-4 border-t border-gray-100 space-y-2">
          <button onClick={() => { setSavedLpj(form); alert("Draft LPJ disimpan!"); }} className="w-full py-2.5 border-2 border-[#0F1A2F] text-[#0F1A2F] font-bold text-sm rounded-xl hover:bg-[#0F1A2F] hover:text-white transition-all">Simpan Draft</button>
          {isDeal && !lpjDone
            ? <button onClick={handleSubmit} className="w-full py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"><Send className="w-3.5 h-3.5" /> Submit LPJ & Generate PDF</button>
            : lpjDone
              ? <button className="w-full py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2"><Download className="w-3.5 h-3.5" /> Download PDF LPJ</button>
              : <button disabled className="w-full py-2.5 bg-gray-200 text-gray-400 font-bold text-sm rounded-xl cursor-not-allowed flex items-center justify-center gap-2"><Lock className="w-3.5 h-3.5" /> Submit LPJ (Terkunci)</button>
          }
        </div>
      </div>
    );
  };

  // ── PROPOSALS VIEW ────────────────────────────
  const ProposalsView = () => {
    const [tab, setTab] = useState('masuk');
    const [meetDate, setMeetDate] = useState('');
    const [meetTime, setMeetTime] = useState('');
    const [partnerEmail, setPartnerEmail] = useState('');
    const [showMeetModal, setShowMeetModal] = useState(false);
    const STEPS = ['Proposal Masuk','Jadwal Meeting','DEAL','MoU','LPJ','Selesai'];
    const stepIndex = { new:0, scheduling:1, scheduled:1, deal:2, mou:3, lpj:4, done:5 };
    const currentStep = stepIndex[incomingDealStatus] ?? 0;
    const handleGenerateMeet = () => {
      if (!meetDate || !meetTime || !partnerEmail) { alert('Lengkapi tanggal, waktu, dan email partner.'); return; }
      const link = generateMeetLink();
      setMeetInfo({ date: meetDate, time: meetTime, link, email: partnerEmail });
      setIncomingDealStatus('scheduled'); setShowMeetModal(true);
    };
    const handleMeetingDone = () => {
      setMeetTranscript({ date: meetInfo?.date || '22 Mei 2026', participants: ['Budi Santoso (Teman Kreativ)', 'Reza (Digital Startups ID)'], summary: 'Meeting membahas skema barter value untuk kolaborasi media partner. Kedua pihak sepakat dengan 2x IG Feed Post dan 1 artikel liputan.', keyPoints: ['Skema barter value disepakati kedua pihak','Teman Kreativ: 2x IG Feed Post + 1 Artikel','Digital Startups ID: Voucher kopi Rp 2.000.000 + logo di banner','Timeline pelaksanaan: bulan depan','PIC masing-masing akan sign MoU dalam 3 hari kerja'], transcript: 'Budi: Halo Reza, terima kasih sudah join meeting ini...\nReza: Sama-sama Mas Budi. Kita langsung ke intinya ya...\n[dst - transcript otomatis tersimpan dari rekaman Google Meet]' });
    };
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-1"><button onClick={navigateBack} className="flex items-center gap-1.5 text-gray-400 hover:text-[#0F1A2F] transition-colors text-sm font-medium"><ArrowLeft className="w-4 h-4" /> Kembali</button></div>
        <div className="mb-6"><h2 className="text-2xl md:text-3xl font-['Cardo'] font-bold text-[#0F1A2F]">Manajemen Proposal</h2><p className="text-gray-500 text-sm mt-1">Kelola permohonan kerjasama, jadwal meeting, dan status Escrow.</p></div>
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          {[['masuk','Masuk (1)'],['terkirim','Terkirim (3)'],['deal','Deal & Escrow (1)']].map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)} className={`pb-3 px-4 md:px-6 text-sm font-bold whitespace-nowrap transition-all ${tab === t ? 'text-[#0F1A2F] border-b-2 border-[#0F1A2F]' : 'text-gray-400 hover:text-[#0F1A2F]'}`}>{label}</button>
          ))}
        </div>
        {tab === 'masuk' && (
          <div className="space-y-5">
            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Progress Tracking</h4>
              <div className="flex items-start">
                {STEPS.map((s, i) => (
                  <div key={s} className="flex-1 flex flex-col items-center relative">
                    {i < STEPS.length - 1 && (<div className={`absolute top-3.5 left-1/2 w-full h-0.5 z-0 transition-colors duration-500 ${i < currentStep ? 'bg-[#C5A869]' : 'bg-gray-200'}`} />)}
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center z-10 text-xs font-bold transition-all duration-300 ${i < currentStep ? 'bg-[#C5A869] border-[#C5A869] text-[#0F1A2F]' : i === currentStep ? 'bg-[#0F1A2F] border-[#0F1A2F] text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                      {i < currentStep ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <p className={`text-[9px] font-bold text-center mt-1.5 leading-tight max-w-[48px] ${i === currentStep ? 'text-[#0F1A2F]' : i < currentStep ? 'text-[#C5A869]' : 'text-gray-400'}`}>{s}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-5 md:p-7">
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base border border-blue-100 flex-shrink-0">DS</div>
                  <div><h4 className="text-[#0F1A2F] font-bold text-base">Digital Startups ID</h4><p className="text-xs font-bold text-gray-500 mt-0.5">Proposal untuk: <span className="text-[#C5A869]">Media Partner Promo</span></p></div>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold uppercase tracking-widest flex-shrink-0">Baru</span>
              </div>
              <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-gray-200 mb-5 relative">
                <div className="absolute -left-2 top-5 w-3.5 h-3.5 rotate-45 bg-[#FDFBF7] border-l border-b border-gray-200" />
                <p className="text-sm text-gray-700 leading-relaxed font-medium italic">"Halo Teman Kreativ, kami sangat tertarik dengan sistem barter value ini. Ekosistem kami punya 20.000+ subscriber newsletter aktif B2B."</p>
              </div>
              {incomingDealStatus === 'new' && (
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-4 py-2.5 border-2 border-gray-200 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors"><CalendarOff className="w-4 h-4" /> Tolak</button>
                  <button onClick={() => navigateTo('chat')} className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 border border-blue-200 text-sm font-bold rounded-xl hover:bg-blue-100 transition-colors"><MessageCircle className="w-4 h-4" /> Chat PIC</button>
                  <button onClick={() => setIncomingDealStatus('scheduling')} className="flex items-center gap-2 px-4 py-2.5 bg-[#0F1A2F] text-white text-sm font-bold rounded-xl hover:bg-[#1E2D4A] shadow-lg ml-auto transition-all">
                    <CalendarCheck className="w-4 h-4 text-[#C5A869]" /> Terima & Jadwalkan Meeting
                  </button>
                </div>
              )}
              {incomingDealStatus === 'scheduling' && (
                <div className="mt-4 border-t border-gray-100 pt-5">
                  <h5 className="font-bold text-[#0F1A2F] mb-4 flex items-center gap-2 text-sm"><CalendarCheck className="w-4 h-4 text-[#C5A869]" /> Atur Jadwal Meeting</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    {[['date','Tanggal','date',meetDate,setMeetDate],['time','Waktu (WIB)','time',meetTime,setMeetTime],['email','Email Partner','email',partnerEmail,setPartnerEmail]].map(([id,label,type,val,setter]) => (
                      <div key={id}><label className="text-[10px] font-bold text-gray-600 uppercase block mb-1.5">{label}</label><input type={type} value={val} onChange={e => setter(e.target.value)} placeholder={type==='email'?'pic@partner.com':''} className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#C5A869]" /></div>
                    ))}
                  </div>
                  <button onClick={handleGenerateMeet} className="flex items-center gap-2 px-5 py-2.5 bg-[#0F1A2F] text-white text-sm font-bold rounded-xl hover:bg-[#1E2D4A] shadow-lg transition-all">
                    <Zap className="w-4 h-4 text-[#C5A869]" /> Generate Link GMeet & Kirim Email
                  </button>
                </div>
              )}
              {['scheduled','deal','mou','lpj','done'].includes(incomingDealStatus) && (
                <div className="mt-4 border-t border-gray-100 pt-5 space-y-4">
                  {meetInfo && (
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">
                      <p className="text-xs text-blue-600 font-bold uppercase mb-2">📅 Meeting Terjadwal</p>
                      <p className="text-sm font-bold text-[#0F1A2F]">{meetInfo.date} • {meetInfo.time} WIB</p>
                      <a href="#" className="text-sm text-blue-600 flex items-center gap-1 mt-1 font-medium hover:underline"><ExternalLink className="w-3.5 h-3.5" /> {meetInfo.link}</a>
                      <p className="text-xs text-gray-400 mt-1">Undangan telah dikirim ke email kedua belah pihak secara otomatis.</p>
                    </div>
                  )}
                  {incomingDealStatus === 'scheduled' && (
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button onClick={() => { handleMeetingDone(); }} className="flex items-center gap-2 px-4 py-2.5 border-2 border-blue-300 text-blue-700 text-sm font-bold rounded-xl hover:bg-blue-50 transition-colors">
                        <Wifi className="w-4 h-4" /> Meeting Done & Simpan Notulensi
                      </button>
                      <button onClick={() => setIncomingDealStatus('deal')} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0F1A2F] text-sm font-bold rounded-xl hover:scale-105 transition-transform shadow-lg ml-auto">
                        <CheckCircle className="w-4 h-4" /> Confirm DEAL 🤝
                      </button>
                    </div>
                  )}
                  {meetTranscript && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-3"><Wifi className="w-4 h-4 text-[#C5A869]" /><h5 className="font-bold text-[#0F1A2F] text-sm">Ringkasan Notulensi Meeting</h5><span className="ml-auto text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Auto-saved</span></div>
                      <p className="text-xs text-gray-500 mb-2"><strong>Tanggal:</strong> {meetTranscript.date} | <strong>Peserta:</strong> {meetTranscript.participants.join(', ')}</p>
                      <div className="bg-[#FDFBF7] p-3 rounded-xl mb-3"><p className="text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Ringkasan</p><p className="text-xs text-gray-700 leading-relaxed">{meetTranscript.summary}</p></div>
                      <div className="bg-[#FDFBF7] p-3 rounded-xl mb-3"><p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Poin Kesepakatan</p>{meetTranscript.keyPoints.map((pt,i) => (<div key={i} className="flex items-start gap-2 mb-1.5"><span className="text-[#C5A869] mt-0.5 flex-shrink-0 text-xs">✓</span><span className="text-xs text-gray-700">{pt}</span></div>))}</div>
                      <div className="flex gap-2"><span className="text-xs text-emerald-600 font-bold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Email dikirim ke semua peserta</span><button className="ml-auto flex items-center gap-1.5 text-xs font-bold text-[#0F1A2F] border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50"><Download className="w-3 h-3" /> Download PDF</button></div>
                    </div>
                  )}
                  {['deal','mou','lpj','done'].includes(incomingDealStatus) && (
                    <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#C5A869]/10 border border-[#C5A869]/40 p-4 rounded-2xl">
                      <div className="flex items-center gap-2 mb-1"><CheckCircle className="w-5 h-5 text-[#C5A869]" /><h5 className="font-bold text-[#0F1A2F]">DEAL Terkonfirmasi! 🎉</h5></div>
                      <p className="text-xs text-gray-600">Kedua pihak telah sepakat. MoU dan LPJ kini dapat di-generate. Lanjutkan ke Input MoU di sidebar kiri.</p>
                      <div className="flex gap-2 mt-3">
                        <button onClick={() => setRightPanel('mou')} className="flex items-center gap-1.5 px-3 py-2 bg-[#0F1A2F] text-white text-xs font-bold rounded-lg hover:bg-[#1E2D4A] transition-colors"><Pencil className="w-3.5 h-3.5" /> Buka Input MoU</button>
                        <button onClick={() => setRightPanel('lpj')} className="flex items-center gap-1.5 px-3 py-2 border border-[#0F1A2F] text-[#0F1A2F] text-xs font-bold rounded-lg hover:bg-[#0F1A2F] hover:text-white transition-colors"><FileText className="w-3.5 h-3.5" /> Buka Input LPJ</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {tab === 'terkirim' && (
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-[#FDFBF7] flex items-center justify-between"><h4 className="font-bold text-[#0F1A2F]">Rekap Proposal Terkirim</h4><span className="text-xs text-gray-400 font-medium">{MOCK_SENT_PROPOSALS.length} proposal</span></div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead><tr className="border-b border-gray-100 bg-[#FDFBF7]">{['Ditujukan Ke','Judul','Tanggal Kirim','Status','Detail'].map(h => (<th key={h} className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">{h}</th>))}</tr></thead>
                <tbody>{MOCK_SENT_PROPOSALS.map(p => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-[#FDFBF7] transition">
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0F1A2F] to-[#2D4066] text-[#C5A869] text-[10px] font-bold flex items-center justify-center flex-shrink-0">{p.to.slice(0,2).toUpperCase()}</div><span className="text-sm font-bold text-[#0F1A2F] hidden sm:block">{p.to}</span></div></td>
                    <td className="px-4 py-3"><p className="text-sm text-gray-700 font-medium max-w-[160px] truncate">{p.title}</p></td>
                    <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{p.sentAt}</td>
                    <td className="px-4 py-3">{p.status==='on_review'&&<span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-amber-100 text-amber-600 uppercase"><Clock className="w-3 h-3"/> On Review</span>}{p.status==='accepted'&&<span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 uppercase"><CheckCircle className="w-3 h-3"/> Diterima</span>}{p.status==='rejected'&&<span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-red-100 text-red-600 uppercase"><X className="w-3 h-3"/> Ditolak</span>}</td>
                    <td className="px-4 py-3">{p.status==='accepted'&&p.meetDate?(<div className="text-xs"><p className="font-bold text-[#0F1A2F]">{p.meetDate}</p><a href="#" className="text-blue-600 flex items-center gap-1 mt-0.5 hover:underline font-medium"><ExternalLink className="w-3 h-3"/>{p.meetLink}</a></div>):<span className="text-xs text-gray-400">—</span>}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 'deal' && (
          <div className="bg-white border-2 border-[#C5A869]/30 rounded-3xl p-5 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A869]/10 rounded-bl-full pointer-events-none" />
            <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-3">
              <div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Tipe: Sponsorship — Fresh Money</span><h4 className="text-[#0F1A2F] font-bold text-xl mb-1">Tech Future Summit 2026</h4><p className="text-sm text-gray-500 font-medium">Mitra: TechNova Solutions</p></div>
              <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-50 text-amber-600 px-3 py-1.5 rounded-full border border-amber-200">Active Deal</span>
            </div>
            <div className="bg-[#FDFBF7] p-5 rounded-2xl border border-gray-200 mb-5">
              <div className="flex justify-between items-center mb-2"><span className="text-sm font-bold text-gray-600">Total Nilai Sponsorship</span><span className="text-xl md:text-2xl font-['Cardo'] font-bold text-[#0F1A2F]">{formatRp(15000000)}</span></div>
              <div className="text-xs text-amber-700 font-bold mb-4 border-t border-gray-200 pt-3 flex items-start gap-1.5"><AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0"/><span>Nominal &gt; Rp 5 juta: DP 50% ({formatRp(7500000)}) maks H+5 hari kerja MoU sign. Pelunasan {formatRp(7500000)} setelah LPJ disubmit.</span></div>
              <div className="space-y-3">
                {[{label:`DP 50% — ${formatRp(7500000)}`,sub:'Deadline: H+5 hari kerja dari MoU sign',paid:false,key:'dp'},{label:`Pelunasan 50% — ${formatRp(7500000)}`,sub:'Setelah LPJ disubmit, maks H+5 hari kerja',paid:false,key:'full',locked:true}].map(item=>(
                  <div key={item.key} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-50 flex-shrink-0">{item.locked?<Lock className="w-4 h-4 text-gray-400"/>:<Clock className="w-4 h-4 text-amber-600"/>}</div><div><p className="text-sm font-bold text-[#0F1A2F]">{item.label}</p><p className="text-xs text-gray-400">{item.sub}</p></div></div>
                    {item.locked?<span className="text-xs text-gray-400 font-medium">Terkunci</span>:<button className="text-xs font-bold px-3 py-1.5 bg-[#0F1A2F] text-white rounded-lg hover:bg-[#1E2D4A] transition">Konfirmasi Bayar</button>}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium leading-relaxed p-4 bg-[#FDFBF7] rounded-xl border border-gray-200"><span className="text-[#0F1A2F] font-bold">INFO SISTEM:</span> Dana akan ditransfer ke rekening Escrow PT SynergyX dan ditahan hingga LPJ diverifikasi.</p>
          </div>
        )}
        {showMeetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-7 max-w-sm w-full shadow-2xl text-center border-t-4 border-[#0F1A2F]">
              <div className="w-14 h-14 bg-[#FDFBF7] rounded-full mx-auto flex items-center justify-center mb-4 border border-gray-100"><CalendarCheck className="w-7 h-7 text-[#0F1A2F]"/></div>
              <h3 className="text-xl font-['Cardo'] font-bold text-[#0F1A2F] mb-2">Meeting Terjadwal!</h3>
              <p className="text-gray-500 text-sm mb-5">Undangan kalender & link GMeet telah otomatis dikirimkan ke kedua belah pihak.</p>
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl mb-5 text-left">
                <p className="text-xs text-blue-600 font-bold uppercase mb-1">Detail Pertemuan</p>
                <p className="text-sm text-[#0F1A2F] font-bold mb-1">{meetInfo?.date} • {meetInfo?.time} WIB</p>
                <a href="#" className="text-sm text-blue-600 hover:underline flex items-center gap-1 font-medium"><ExternalLink className="w-3.5 h-3.5"/> {meetInfo?.link}</a>
              </div>
              <button onClick={() => setShowMeetModal(false)} className="w-full py-3 bg-[#0F1A2F] text-white font-bold rounded-xl hover:bg-[#1E2D4A] transition-colors text-sm">Tutup</button>
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
        <div className={`${activeChat !== null ? 'hidden md:flex' : 'flex'} md:w-64 lg:w-72 flex-col bg-white border-r border-gray-200 flex-shrink-0`}>
          <div className="p-4 border-b border-gray-100 bg-[#FDFBF7]"><h2 className="font-['Cardo'] font-bold text-[#0F1A2F] text-lg mb-3">Pesan / Chat PIC</h2><div className="relative"><Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/><input type="text" placeholder="Cari partner..." className="w-full bg-white border border-gray-200 text-[#0F1A2F] rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[#C5A869]"/></div></div>
          <div className="flex-1 overflow-y-auto">{chatContacts.map((c, i) => (<div key={c.name} onClick={() => setActiveChat(i)} className={`p-4 border-b border-gray-50 cursor-pointer flex gap-3 items-center hover:bg-gray-50 transition-colors ${activeChat === i ? 'bg-[#FDFBF7] border-l-2 border-l-[#C5A869]' : ''}`}><div className="relative flex-shrink-0"><div className={`w-10 h-10 rounded-full ${c.color} font-bold flex items-center justify-center text-sm`}>{c.av}</div>{c.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"/>}</div><div className="flex-1 min-w-0"><div className="flex justify-between items-center"><h5 className="font-bold text-sm text-[#0F1A2F] truncate">{c.name}</h5><span className="text-[10px] text-gray-400 flex-shrink-0 ml-1">{c.time}</span></div><p className="text-xs text-gray-400 truncate">{c.role} • {c.last}</p></div>{c.dot && <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"/>}</div>))}</div>
        </div>
        <div className={`${activeChat === null ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-[#FDFBF7]/40 overflow-hidden`}>
          <div className="p-3 md:p-4 border-b border-gray-200 bg-white flex items-center justify-between gap-3 flex-shrink-0">
            <div className="flex items-center gap-3"><button className="md:hidden text-gray-500 hover:text-[#0F1A2F] p-1" onClick={() => setActiveChat(null)}><ArrowLeft className="w-5 h-5"/></button><div className="relative flex-shrink-0"><div className={`w-9 h-9 rounded-full ${chatContacts[activeChat ?? 0]?.color} font-bold flex items-center justify-center text-sm`}>{chatContacts[activeChat ?? 0]?.av}</div>{chatContacts[activeChat ?? 0]?.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"/>}</div><div><h4 className="font-bold text-sm text-[#0F1A2F]">{chatContacts[activeChat ?? 0]?.name}</h4><p className="text-xs text-emerald-500 font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"/> {chatContacts[activeChat ?? 0]?.online ? 'Online' : 'Offline'} • {chatContacts[activeChat ?? 0]?.role}</p></div></div>
            <div className="flex items-center gap-2"><button className="text-xs font-bold text-[#C5A869] border border-[#C5A869]/30 px-3 py-1.5 rounded-lg hover:bg-[#C5A869]/10 transition hidden sm:block">Lihat Profil</button><button onClick={() => navigateTo('proposals')} className="text-xs font-bold text-[#0F1A2F] border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition hidden sm:flex items-center gap-1.5"><FileCheck className="w-3.5 h-3.5"/> Proposal</button></div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">{messages.map(msg => (<div key={msg.id} className={`flex items-end gap-2 ${msg.mine ? 'flex-row-reverse' : 'flex-row'}`}>{!msg.mine && (<div className={`w-7 h-7 rounded-full ${chatContacts[activeChat ?? 0]?.color} font-bold flex items-center justify-center text-xs flex-shrink-0`}>{chatContacts[activeChat ?? 0]?.av}</div>)}<div className={`max-w-[75%] md:max-w-[65%] px-4 py-2.5 rounded-2xl ${msg.mine ? 'bg-[#0F1A2F] text-white rounded-br-sm' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'}`}><p className="text-sm leading-relaxed">{msg.text}</p><span className={`text-[10px] mt-1 block ${msg.mine ? 'text-gray-400 text-right' : 'text-gray-400'}`}>{msg.time}</span></div></div>))}<div ref={messagesEndRef}/></div>
          <div className="p-3 md:p-4 bg-white border-t border-gray-200 flex-shrink-0"><div className="flex gap-2 items-end"><div className="flex-1 bg-[#FDFBF7] border border-gray-200 rounded-2xl px-4 py-2.5 focus-within:border-[#C5A869] transition-colors"><textarea value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} placeholder="Ketik pesan... (Enter untuk kirim)" rows={1} className="w-full bg-transparent text-[#0F1A2F] text-sm focus:outline-none resize-none" style={{ maxHeight: '80px', overflowY: 'auto' }}/></div><button onClick={sendMessage} className="w-10 h-10 bg-[#0F1A2F] text-white rounded-xl flex items-center justify-center hover:bg-[#1E2D4A] transition-colors flex-shrink-0"><Send className="w-4 h-4"/></button></div></div>
        </div>
      </div>
    );
  };

  // ── TESTIMONI VIEW ────────────────────────────
  const TestimoniView = () => (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-1"><button onClick={navigateBack} className="flex items-center gap-1.5 text-gray-400 hover:text-[#0F1A2F] transition-colors text-sm font-medium"><ArrowLeft className="w-4 h-4" /> Kembali</button></div>
      <div className="mb-6"><h2 className="text-2xl md:text-3xl font-['Cardo'] font-bold text-[#0F1A2F]">Rating & Testimoni</h2><p className="text-gray-500 text-sm mt-1">Ulasan dari partner yang telah bekerjasama dengan Anda.</p></div>
      <div className="bg-[#0F1A2F] rounded-3xl p-6 md:p-8 mb-6 text-white flex flex-col md:flex-row items-center gap-6 shadow-xl">
        <div className="text-center flex-shrink-0"><div className="text-4xl md:text-5xl font-['Cardo'] font-bold text-[#FFE194] mb-2">4.8</div><div className="flex gap-1 justify-center mb-1 text-[#C5A869]">{[1,2,3,4].map(i=><Star key={i} className="w-4 h-4 fill-current"/>)}<Star className="w-4 h-4 fill-current opacity-50"/></div><p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Dari 30+ Deal</p></div>
        <div className="flex-1 md:border-l border-[#2D4066] md:pl-6"><h4 className="text-lg font-bold mb-2">Kredibilitas Top-Tier! 🌟</h4><p className="text-sm text-gray-300 leading-relaxed">Partner sangat puas dengan komitmen dan profesionalitas dalam mengeksekusi Collaboration Card yang di-publish.</p></div>
      </div>
      <div className="space-y-4">
        {[{av:'TA',name:'TechIn Asia',stars:5,text:'Kerjasama berjalan sangat smooth! Timnya responsif banget dan deliver apa yang dijanjikan tanpa kurang satu pun. Definitly will collab again.'},{av:'BJ',name:'Bank Jago',stars:4,text:'ROI sponsorship cukup memuaskan. Target akuisisi user baru dari event ini tercapai 85%. Escrow system SynergyX juga bikin kita sebagai sponsor merasa secure.'}].map(r=>(
          <div key={r.name} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-3"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-sm">{r.av}</div><div><h5 className="font-bold text-sm text-[#0F1A2F]">{r.name}</h5><p className="text-xs text-emerald-600 font-medium">Verified Deal Partner</p></div></div><div className="flex gap-0.5 text-[#C5A869]">{Array.from({length:5}).map((_,i)=><Star key={i} className={`w-3.5 h-3.5 ${i<r.stars?'fill-current':''}`}/>)}</div></div>
            <p className="text-sm text-gray-600 italic">"{r.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );

  // ── DASHBOARD (Standalone full-screen with own sidebar) ──
  const DashboardView = () => {
    const [dashTab, setDashTab] = useState('overview');
    const sidebarItems = [
      { id:'overview', icon:<Home className="w-4 h-4"/>, label:'Overview' },
      { id:'published', icon:<Upload className="w-4 h-4"/>, label:'Proposal Published' },
      { id:'sent', icon:<Send className="w-4 h-4"/>, label:'Proposal Sent' },
      { id:'connections', icon:<Users className="w-4 h-4"/>, label:'Connections' },
      { id:'appointments', icon:<CalendarCheck className="w-4 h-4"/>, label:'Appointments' },
      { id:'deals', icon:<Trophy className="w-4 h-4"/>, label:'Deals & Collaboration' },
      { id:'reports', icon:<BarChart2 className="w-4 h-4"/>, label:'Reports' },
      { id:'saved', icon:<Bookmark className="w-4 h-4"/>, label:'Saved Insights' },
    ];

    const FunnelBars = ({ data, maxVal }) => (
      <div>
        <div className="flex items-end gap-px mb-1" style={{ height: '110px' }}>
          {data.map(item => (
            <div key={item.label} className="flex flex-col items-center justify-end flex-1 min-w-0">
              <span className="text-[8px] font-bold text-[#0F1A2F] mb-0.5 leading-none">{item.value}</span>
              <div className="w-full bg-[#C5A869] rounded-t-sm" style={{ height: `${(item.value / maxVal) * 100}px`, minHeight: '3px' }} />
            </div>
          ))}
        </div>
        <div className="flex gap-px">
          {data.map(item => (
            <div key={item.label} className="flex-1 text-center min-w-0">
              <div className="text-[8px] text-gray-500 font-semibold">{item.pct}</div>
              <div className="text-[7px] text-gray-400 leading-tight whitespace-pre-line">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className="flex min-h-screen bg-[#F8F7F4] font-['Inter']">
        {/* Dashboard own sidebar */}
        <div className="w-52 bg-[#0F1A2F] flex flex-col py-5 px-3 flex-shrink-0 min-h-screen">
          <div className="flex items-center gap-2 cursor-pointer mb-6 px-2" onClick={() => navigateTo('feed')}>
            <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 100 100" fill="none"><path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#C5A869" strokeWidth="4" fill="none"/><path d="M50 18L82 50L50 82L18 50L50 18Z" fill="#2D4066" opacity="0.9"/></svg>
            <span className="text-lg font-bold tracking-wider text-[#C5A869] font-['Cardo']">SynergyX</span>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            {sidebarItems.map(item => (
              <button key={item.id} onClick={() => setDashTab(item.id)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${dashTab === item.id ? 'bg-[#C5A869] text-[#0F1A2F] font-bold' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'}`}>
                {item.icon} {item.label}
              </button>
            ))}
          </div>
          <div className="border-t border-[#2D4066]/50 pt-4">
            <div className="flex items-center gap-2 px-2 mb-2">
              <div className="w-9 h-9 rounded-full bg-[#C5A869] text-[#0F1A2F] font-bold text-sm flex items-center justify-center flex-shrink-0">TK</div>
              <div><p className="text-white font-bold text-xs">Teman Kreativ</p><div className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-blue-400"/><span className="text-[9px] text-blue-400">Verified Account</span></div></div>
            </div>
            <div className="px-2"><span className="text-gray-400 text-[10px]">Plan: </span><span className="text-white font-bold text-[10px]">Pro</span></div>
            <button className="text-[#C5A869] text-[10px] font-bold hover:underline px-2">Upgrade Plan</button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          {dashTab === 'overview' ? (
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-xl font-bold text-[#0F1A2F]">Analytics Overview</h1>
                  <p className="text-xs text-gray-500 mt-0.5">Track your collaboration performance and proposal journey</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
                    <CalendarCheck className="w-3.5 h-3.5"/> 1 - 31 Mei 2025 <ChevronDown className="w-3 h-3"/>
                  </button>
                  <button className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
                    <Download className="w-3.5 h-3.5"/> Export Report
                  </button>
                </div>
              </div>

              {/* Top 4 Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                {[
                  { icon:<Eye className="w-5 h-5 text-[#C5A869]"/>, label:'Total Proposal Published', value:24, change:'+20%' },
                  { icon:<Send className="w-5 h-5 text-[#C5A869]"/>, label:'Total Proposal Sent', value:18, change:'+12%' },
                  { icon:<Users className="w-5 h-5 text-[#C5A869]"/>, label:'Total Deal (Published)', value:9, change:'+29%' },
                  { icon:<Star className="w-5 h-5 text-[#C5A869]"/>, label:'Total Deal (Sent)', value:7, change:'+16%' },
                ].map(stat => (
                  <div key={stat.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-9 h-9 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0">{stat.icon}</div>
                      <span className="text-xs text-gray-500 font-medium leading-tight">{stat.label}</span>
                    </div>
                    <div className="text-3xl font-['Cardo'] font-bold text-[#0F1A2F]">{stat.value}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-emerald-500"/>
                      <span className="text-xs font-bold text-emerald-500">{stat.change}</span>
                      <span className="text-xs text-gray-400">dari bulan lalu</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Two Funnels */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
                {/* Published Funnel */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-[#0F1A2F] text-sm">Funnel Proposal Published</h3>
                    <button className="text-xs text-[#C5A869] font-bold hover:underline">View full report →</button>
                  </div>
                  <FunnelBars data={PUBLISHED_FUNNEL} maxVal={156} />
                  <div className="grid grid-cols-4 gap-2 border-t border-gray-100 pt-3 mt-3">
                    {[
                      { label:'Conversion Rate\n(Received→Deal)', value:'10.9%', sub:'17 / 156' },
                      { label:'Deal Rate\n(Approved→Deal)', value:'15.2%', sub:'17 / 112' },
                      { label:'Collaboration\nSuccess Rate', value:'26.7%', sub:'4 / 15' },
                      { label:'Avg Time\nto Done', value:'36 hari', sub:'↑ 6 hari lebih cepat', up:true },
                    ].map(m => (
                      <div key={m.label} className="text-center">
                        <div className="text-xs font-bold text-[#0F1A2F] font-['Cardo']">{m.value}</div>
                        <div className="text-[8px] text-gray-400 whitespace-pre-line leading-tight mt-0.5">{m.label}</div>
                        <div className={`text-[8px] font-semibold mt-0.5 ${m.up ? 'text-emerald-500' : 'text-gray-400'}`}>{m.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Sent Funnel */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-[#0F1A2F] text-sm">Funnel Proposal Sent</h3>
                    <button className="text-xs text-[#C5A869] font-bold hover:underline">View full report →</button>
                  </div>
                  <FunnelBars data={SENT_FUNNEL} maxVal={22} />
                  <div className="grid grid-cols-4 gap-2 border-t border-gray-100 pt-3 mt-3">
                    {[
                      { label:'Appointment Rate\n(Received→Appt)', value:'68.2%', sub:'15 / 22' },
                      { label:'Deal Rate\n(Appt→Deal)', value:'60.0%', sub:'9 / 15' },
                      { label:'Collaboration\nSuccess Rate', value:'50.0%', sub:'3 / 6' },
                      { label:'Avg Time\nto Done', value:'42 hari', sub:'↑ 8 hari lebih cepat', up:true },
                    ].map(m => (
                      <div key={m.label} className="text-center">
                        <div className="text-xs font-bold text-[#0F1A2F] font-['Cardo']">{m.value}</div>
                        <div className="text-[8px] text-gray-400 whitespace-pre-line leading-tight mt-0.5">{m.label}</div>
                        <div className={`text-[8px] font-semibold mt-0.5 ${m.up ? 'text-emerald-500' : 'text-gray-400'}`}>{m.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom 3 cols */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Traffic */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-[#0F1A2F] text-sm mb-0.5">Traffic</h3>
                  <p className="text-[10px] text-gray-400 mb-3">(Hanya untuk Proposal Published)</p>
                  <div className="flex gap-3 mb-4">
                    {[{l:'Total Viewed',v:'5.842',c:'+18%'},{l:'Total Liked',v:'732',c:'+15%'},{l:'Total Saved',v:'1.246',c:'+22%'}].map(t=>(
                      <div key={t.l} className="flex-1 min-w-0">
                        <p className="text-[9px] text-gray-400 leading-tight">{t.l}</p>
                        <p className="font-bold text-[#0F1A2F] text-sm font-['Cardo']">{t.v}</p>
                        <p className="text-[9px] font-bold text-emerald-500">{t.c}</p>
                      </div>
                    ))}
                  </div>
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={TRAFFIC_DATA} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                      <XAxis dataKey="date" tick={{ fontSize: 8 }} axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip contentStyle={{ fontSize: '10px', padding: '4px 8px' }} />
                      <Line type="monotone" dataKey="viewed" stroke="#0F1A2F" strokeWidth={1.5} dot={false} />
                      <Line type="monotone" dataKey="liked" stroke="#C5A869" strokeWidth={1.5} dot={false} />
                      <Line type="monotone" dataKey="saved" stroke="#22c55e" strokeWidth={1.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="flex gap-3 mt-2">
                    {[{l:'Viewed',c:'#0F1A2F'},{l:'Liked',c:'#C5A869'},{l:'Saved',c:'#22c55e'}].map(l=>(
                      <div key={l.l} className="flex items-center gap-1">
                        <div className="w-3 h-0.5 rounded-full" style={{ background: l.c }} />
                        <span className="text-[9px] text-gray-500">{l.l}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Performing */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-[#0F1A2F] text-xs leading-tight">Top Performing Published Opportunities</h3>
                    <button className="text-[10px] text-[#C5A869] font-bold hover:underline whitespace-nowrap ml-2">View all →</button>
                  </div>
                  {[
                    { init:'TFS\n2025', bg:'bg-amber-100', tc:'text-amber-800', title:'Tech Future Summit 2025', type:'Sponsorship · TechNova Solutions', v:1240, l:185, s:312, a:24 },
                    { init:'KKF', bg:'bg-blue-100', tc:'text-blue-800', title:'Kampus Kreatif Fest', type:'Media Partner · Teman Kreativ', v:980, l:142, s:201, a:18 },
                    { init:'WDM', bg:'bg-gray-800', tc:'text-white', title:'Workshop Digital Marketing', type:'Community Partner · EduMaster', v:850, l:98, s:156, a:15 },
                  ].map(item => (
                    <div key={item.title} className="flex items-center gap-3 mb-4 last:mb-0">
                      <div className={`w-11 h-11 rounded-xl ${item.bg} ${item.tc} text-[8px] font-bold flex items-center justify-center flex-shrink-0 text-center whitespace-pre-line leading-tight`}>{item.init}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#0F1A2F] truncate">{item.title}</p>
                        <p className="text-[9px] text-gray-400">{item.type}</p>
                        <div className="flex gap-2 mt-0.5">
                          <span className="text-[9px] text-gray-500 flex items-center gap-0.5"><Eye className="w-2.5 h-2.5"/> {item.v.toLocaleString()}</span>
                          <span className="text-[9px] text-gray-500 flex items-center gap-0.5"><Heart className="w-2.5 h-2.5"/> {item.l}</span>
                          <span className="text-[9px] text-gray-500 flex items-center gap-0.5"><Bookmark className="w-2.5 h-2.5"/> {item.s}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-lg font-bold text-[#0F1A2F] font-['Cardo']">{item.a}</div>
                        <div className="text-[9px] text-gray-400">Applied</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary General Insight */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-[#0F1A2F] text-sm mb-4">Summary General Insight</h3>
                  {[
                    { icon:<div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center text-xs font-bold text-[#C5A869]">Rp</div>, label:'Total Sponsorship Nominal\n(Barter & Fresh Money) Generated', value:'Rp 45.000.000' },
                    { icon:<div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center"><Users className="w-4 h-4 text-[#C5A869]"/></div>, label:'TOTAL DEAL', value:'16' },
                    { icon:<div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center"><FileText className="w-4 h-4 text-[#C5A869]"/></div>, label:'TOTAL MOU', value:'9' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3 mb-4 last:mb-0">
                      {item.icon}
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] text-gray-400 whitespace-pre-line leading-tight">{item.label}</p>
                        <p className="text-base font-bold text-[#0F1A2F] font-['Cardo']">{item.value}</p>
                      </div>
                      {/* Mini trend sparkline */}
                      <svg width="48" height="24" viewBox="0 0 48 24" fill="none" className="flex-shrink-0">
                        <polyline points="0,20 10,16 20,11 30,7 40,4 48,2" stroke="#C5A869" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-right text-[10px] text-gray-400 mt-4">Data diperbarui: 31 Mei 2025 23:59 WIB</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[60vh]">
              <div className="text-center p-8">
                <BarChart2 className="w-12 h-12 text-gray-300 mx-auto mb-3"/>
                <h3 className="font-bold text-gray-500 text-lg mb-1">Segera Hadir</h3>
                <p className="text-sm text-gray-400">Fitur <strong>{sidebarItems.find(s=>s.id===dashTab)?.label}</strong> sedang dalam pengembangan.</p>
                <button onClick={() => setDashTab('overview')} className="mt-4 px-4 py-2 bg-[#0F1A2F] text-white text-xs font-bold rounded-lg hover:bg-[#1E2D4A] transition">← Kembali ke Overview</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── EDIT PROFILE MODAL ────────────────────────
  const EditProfileModal = () => {
    const PROVINSI_KOTA = {
      "DKI Jakarta": ["Jakarta Pusat","Jakarta Utara","Jakarta Barat","Jakarta Selatan","Jakarta Timur"],
      "Jawa Barat": ["Bandung","Bekasi","Bogor","Depok","Cimahi","Sukabumi","Tasikmalaya"],
      "Jawa Tengah": ["Semarang","Solo","Yogyakarta","Magelang","Salatiga","Pekalongan"],
      "Jawa Timur": ["Surabaya","Malang","Sidoarjo","Gresik","Mojokerto","Pasuruan"],
      "Bali": ["Denpasar","Badung","Gianyar","Tabanan","Buleleng"],
      "Sulawesi Selatan": ["Makassar","Gowa","Maros","Palopo"],
      "Sumatera Utara": ["Medan","Deli Serdang","Binjai","Tebing Tinggi"],
      "Lainnya": ["Kota Lainnya"],
    };
    const [form, setForm] = useState({
      entityName: MOCK_USER.brandName,
      entityType: "Komunitas",
      email: "hello@temankreativ.id",
      whatsapp: "08123456789",
      description: MOCK_USER.tagline,
      provinsi: "DKI Jakarta",
      kota: "Jakarta Selatan",
      founderName: MOCK_USER.founder.name,
      founderLinkedin: MOCK_USER.founder.social.linkedin,
      founderIG: MOCK_USER.founder.social.ig,
      founderWeb: MOCK_USER.founder.social.web,
      audience: MOCK_USER.currency.audience,
      credibility: MOCK_USER.currency.credibility,
      activation: MOCK_USER.currency.activation,
      network: MOCK_USER.currency.network,
      verifyType: "komunitas",
      verifyFile: null,
      verifyWebsite: "",
    });
    const [logoPreviewLocal, setLogoPreviewLocal] = useState(null);
    const [verifyFileName, setVerifyFileName] = useState("");

    const kotaList = PROVINSI_KOTA[form.provinsi] || [];
    const entityTypes = ["Bisnis Jasa","Bisnis Produk","Komunitas","Agency","Individu"];
    const verifyTypeMap = { bisnis: "NIB atau Link Domain Website Resmi", komunitas: "Bukti Rekam Jejak / Impact Report", individu: "KTP" };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[95vh] flex flex-col shadow-2xl border border-gray-100">
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#FDFBF7] rounded-t-3xl flex-shrink-0">
            <div>
              <h2 className="text-xl font-['Cardo'] font-bold text-[#0F1A2F]">Edit Profil Bisnis</h2>
              <p className="text-xs text-gray-500 mt-0.5">Lengkapi profil untuk meningkatkan kredibilitas di SynergyX</p>
            </div>
            <button onClick={() => setShowEditProfile(false)} className="text-gray-400 hover:text-[#0F1A2F] p-1"><X className="w-5 h-5" /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Logo Upload */}
            <div>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Logo / Foto Profil</p>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0F1A2F] to-[#2D4066] flex items-center justify-center text-[#C5A869] text-2xl font-['Cardo'] font-bold flex-shrink-0 overflow-hidden border-4 border-gray-100 shadow">
                  {logoPreviewLocal ? <img src={logoPreviewLocal} alt="logo" className="w-full h-full object-cover" /> : MOCK_USER.logo}
                </div>
                <label className="cursor-pointer flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-[#C5A869]/50 rounded-xl text-sm font-bold text-[#AA7C11] hover:bg-[#C5A869]/5 transition">
                  <Upload className="w-4 h-4" /> Upload Logo
                  <input type="file" accept="image/*" className="hidden" onChange={e => {
                    const f = e.target.files[0];
                    if (f) { const r = new FileReader(); r.onload = ev => setLogoPreviewLocal(ev.target.result); r.readAsDataURL(f); }
                  }} />
                </label>
                <p className="text-xs text-gray-400">PNG, JPG. Maks 2MB</p>
              </div>
            </div>

            {/* Identitas Entitas */}
            <div>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Identitas Entitas</p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1 font-medium">Nama Entitas <span className="text-red-400">*</span></label>
                  <input type="text" value={form.entityName} onChange={e => setForm({...form, entityName: e.target.value})} className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C5A869]" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1 font-medium">Jenis Entitas <span className="text-red-400">*</span></label>
                  <select value={form.entityType} onChange={e => setForm({...form, entityType: e.target.value, verifyType: ['Bisnis Jasa','Bisnis Produk','Agency'].includes(e.target.value) ? 'bisnis' : e.target.value === 'Individu' ? 'individu' : 'komunitas'})} className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C5A869]">
                    {entityTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1 font-medium">Email Aktif <span className="text-red-400">*</span></label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C5A869]" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1 font-medium">No. WhatsApp Aktif <span className="text-red-400">*</span></label>
                    <input type="text" value={form.whatsapp} onChange={e => setForm({...form, whatsapp: e.target.value})} className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C5A869]" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1 font-medium">Deskripsi / Tagline Entitas</label>
                  <textarea rows="2" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C5A869] resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1 font-medium">Provinsi <span className="text-red-400">*</span></label>
                    <select value={form.provinsi} onChange={e => setForm({...form, provinsi: e.target.value, kota: PROVINSI_KOTA[e.target.value]?.[0] || ''})} className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C5A869]">
                      {Object.keys(PROVINSI_KOTA).map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1 font-medium">Kota / Kabupaten <span className="text-red-400">*</span></label>
                    <select value={form.kota} onChange={e => setForm({...form, kota: e.target.value})} className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C5A869]">
                      {kotaList.map(k => <option key={k}>{k}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Founder */}
            <div>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Data Founder / PIC Utama</p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1 font-medium">Nama Founder / PIC <span className="text-red-400">*</span></label>
                  <input type="text" value={form.founderName} onChange={e => setForm({...form, founderName: e.target.value})} className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C5A869]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    ["Instagram","founderIG","https://instagram.com/username"],
                    ["LinkedIn","founderLinkedin","https://linkedin.com/in/..."],
                    ["Personal Website","founderWeb","https://namakamu.com"],
                  ].map(([label, key, ph]) => (
                    <div key={key}>
                      <label className="text-xs text-gray-500 block mb-1 font-medium">{label}</label>
                      <input type="url" value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})} placeholder={ph} className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#C5A869]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Collaboration Currency */}
            <div>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Collaboration Currency</p>
              <p className="text-xs text-gray-400 mb-3">Ceritakan nilai yang bisa kamu tawarkan ke mitra — ini yang membuat brand kamu menarik di mata calon partner.</p>
              <div className="space-y-3">
                {[
                  ["audience","Audience Asset","Contoh: 5.000+ member aktif, 10K IG followers, usia 25-35. Isi dengan jumlah dan karakteristik audiens yang kamu miliki."],
                  ["credibility","Credibility Asset","Contoh: Brand aktif 3 tahun, 20+ kolaborasi sukses, rating 4.8/5. Isi dengan rekam jejak dan kredibilitas yang bisa diverifikasi."],
                  ["activation","Activation Asset","Contoh: Track record 80% target peserta event tercapai. Isi dengan kemampuan mobilisasi & eksekusi programmu."],
                  ["network","Network Asset","Contoh: Alumni tersebar di 50+ perusahaan tech. Isi dengan jaringan/koneksi strategis yang kamu punya."],
                ].map(([key, label, hint]) => (
                  <div key={key} className="bg-[#FDFBF7] border border-gray-200 rounded-xl p-3">
                    <label className="text-xs font-bold text-[#0F1A2F] block mb-1">{label}</label>
                    <p className="text-[10px] text-gray-400 mb-2">{hint}</p>
                    <input type="text" value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C5A869]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Verifikasi Akun */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <p className="text-sm font-bold text-amber-800">Verifikasi Akun</p>
                <span className="ml-auto text-[10px] bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-bold uppercase">Wajib dalam 30 hari</span>
              </div>
              <p className="text-xs text-amber-700 mb-3">
                Akun terverifikasi mendapat <strong>visibilitas lebih tinggi di feed</strong> dan badge kepercayaan. 
                Dokumen yang diperlukan untuk jenis entitas <strong className="text-amber-900">{form.entityType}</strong>:
              </p>
              <div className="bg-white border border-amber-200 rounded-xl p-3 mb-3">
                <p className="text-xs font-bold text-[#0F1A2F] mb-1">
                  {form.verifyType === 'bisnis' && "📄 Upload NIB (Nomor Induk Berusaha)"}
                  {form.verifyType === 'komunitas' && "📊 Upload Bukti Rekam Jejak / Impact Report"}
                  {form.verifyType === 'individu' && "🪪 Upload KTP"}
                </p>
                <p className="text-[10px] text-gray-500 mb-2">
                  {form.verifyType === 'bisnis' && "Atau masukkan link domain website resmi perusahaan (domain berbayar, bukan subdomain gratis)."}
                  {form.verifyType === 'komunitas' && "Laporan kegiatan rutin, metrik dampak sosial, atau dokumentasi program yang sudah berjalan (PDF/foto)."}
                  {form.verifyType === 'individu' && "KTP atas nama Anda sebagai individu profesional yang mendaftar."}
                </p>
                <label className="cursor-pointer flex items-center gap-2 px-3 py-2 border border-dashed border-amber-300 rounded-lg text-xs font-bold text-amber-700 hover:bg-amber-50 transition w-fit">
                  <Upload className="w-3.5 h-3.5" /> {verifyFileName || "Pilih File..."}
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={e => { if (e.target.files[0]) setVerifyFileName(e.target.files[0].name); }} />
                </label>
                {form.verifyType === 'bisnis' && (
                  <div className="mt-2">
                    <p className="text-[10px] text-gray-400 mb-1">Atau masukkan URL website resmi:</p>
                    <input type="url" value={form.verifyWebsite} onChange={e => setForm({...form, verifyWebsite: e.target.value})} placeholder="https://perusahaananda.com" className="w-full bg-[#FDFBF7] border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C5A869]" />
                  </div>
                )}
              </div>
              <p className="text-[10px] text-amber-600 font-medium">⏳ Proses verifikasi membutuhkan 1-3 hari kerja setelah dokumen dikirim.</p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-gray-100 flex gap-3 flex-shrink-0 bg-[#FDFBF7] rounded-b-3xl">
            <button onClick={() => setShowEditProfile(false)} className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-bold text-sm rounded-xl hover:bg-gray-50 transition">Batal</button>
            <button onClick={() => { alert("Profil berhasil disimpan!"); setShowEditProfile(false); }} className="flex-1 py-3 bg-[#0F1A2F] text-white font-bold text-sm rounded-xl hover:bg-[#1E2D4A] transition shadow-lg">Simpan Perubahan</button>
          </div>
        </div>
      </div>
    );
  };

  // ── RENDER ─────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FDFBF7] font-['Inter'] text-slate-800">
      {currentView === 'landing' && <LandingView />}
      {currentView === 'login' && <LoginView />}
      {currentView === 'register' && <RegisterView />}
      {/* Dashboard is full-screen, own layout */}
      {currentView === 'dashboard' && <DashboardView />}

      {isAppView && (
        <div className="flex max-w-screen-2xl mx-auto min-h-screen">
          <Sidebar />
          <MobileHeader />
          <div className="flex flex-col flex-1 min-w-0 pt-14 md:pt-0">
            {showVerificationBanner && <VerificationBanner />}
            <main className={`flex-1 overflow-y-auto ${currentView === 'chat' ? '' : 'pb-10'}`}>
              {currentView === 'feed' && <FeedView />}
              {currentView === 'profile' && <ProfileView />}
              {currentView === 'create' && <CreateCollabView />}
              {currentView === 'proposals' && <ProposalsView />}
              {currentView === 'chat' && <ChatView />}
              {currentView === 'testimoni' && <TestimoniView />}
              {currentView === 'view-profile' && <ViewProfileView />}
            </main>
          </div>
          {rightPanel === 'mou' && <div className="hidden md:flex"><MouPanel /></div>}
          {rightPanel === 'lpj' && <div className="hidden md:flex"><LpjPanel /></div>}
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="w-64 bg-[#0F1A2F] h-full p-5 flex flex-col gap-2 shadow-2xl overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-5">
              <svg className="w-7 h-7" viewBox="0 0 100 100" fill="none"><path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#C5A869" strokeWidth="4" fill="none"/><path d="M50 18L82 50L50 82L18 50L50 18Z" fill="#2D4066" opacity="0.9"/></svg>
              <span className="text-lg font-bold text-[#C5A869] font-['Cardo']">SynergyX</span>
            </div>
            {[{id:'feed',icon:<Home className="w-4 h-4"/>,label:'Feed'},{id:'dashboard',icon:<BarChart2 className="w-4 h-4"/>,label:'Dashboard'},{id:'profile',icon:<User className="w-4 h-4"/>,label:'Profil'},{id:'proposals',icon:<MessageSquare className="w-4 h-4"/>,label:'Proposal'},{id:'chat',icon:<MessageCircle className="w-4 h-4"/>,label:'Chat PIC'},{id:'testimoni',icon:<Star className="w-4 h-4"/>,label:'Testimoni'}].map(item=>(
              <button key={item.id} onClick={() => navigateTo(item.id)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-300 hover:bg-[#2D4066]/30 hover:text-white text-left">{item.icon}{item.label}</button>
            ))}
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 ml-2 mt-3">Dokumen</p>
            <button onClick={() => { navigateTo('proposals'); setRightPanel('mou'); }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-300 hover:bg-[#2D4066]/30 hover:text-white text-left"><Pencil className="w-4 h-4"/> Input MoU</button>
            <button onClick={() => { navigateTo('proposals'); setRightPanel('lpj'); }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-300 hover:bg-[#2D4066]/30 hover:text-white text-left"><FileText className="w-4 h-4"/> Input LPJ</button>
            <div className="mt-5">
              <button onClick={() => navigateTo('create')} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[#0F1A2F] bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] font-bold text-sm"><PlusCircle className="w-4 h-4"/> Buat Peluang</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfile && <EditProfileModal />}

      {/* Proposal Modal */}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-gray-100 rounded-3xl w-full max-w-lg p-6 md:p-8 relative shadow-2xl">
            <button onClick={() => setShowProposalModal(false)} className="absolute top-5 right-5 text-gray-400 hover:text-[#0F1A2F]"><X className="w-5 h-5"/></button>
            <h2 className="text-xl md:text-2xl font-['Cardo'] font-bold text-[#0F1A2F] mb-1">Ajukan Proposal</h2>
            <p className="text-sm text-gray-500 mb-5 font-medium">ke <strong className="text-[#C5A869]">{selectedCard?.brand || selectedCard?.brandName}</strong></p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Penawaran Anda (Elevator Pitch)</label>
                <textarea rows="4" className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl p-4 text-[#0F1A2F] font-medium text-sm focus:outline-none focus:border-[#C5A869]" placeholder="Jelaskan secara singkat mengapa Anda cocok sebagai partner..."/>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#FDFBF7] rounded-xl border border-gray-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0F1A2F] to-[#2D4066] text-[#C5A869] font-bold flex items-center justify-center text-sm flex-shrink-0">{selectedCard?.avatar || selectedCard?.logo}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-[#0F1A2F] flex items-center gap-1">{selectedCard?.brand || selectedCard?.brandName} {selectedCard?.verified && <CheckCircle className="w-3.5 h-3.5 text-blue-500"/>}</p>
                  <p className="text-xs text-gray-500">{selectedCard?.author || selectedCard?.founder?.name} • {selectedCard?.authorRole || selectedCard?.founder?.role}</p>
                </div>
              </div>
              <button onClick={() => { alert('Proposal terkirim!'); setShowProposalModal(false); }} className="w-full py-3.5 bg-[#0F1A2F] text-white font-bold rounded-xl mt-2 hover:bg-[#1E2D4A] shadow-lg transition-all">Kirim Sekarang</button>
              <p className="text-xs text-center text-gray-500 font-medium">Profil bisnis Anda akan otomatis terlampir pada proposal ini.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
