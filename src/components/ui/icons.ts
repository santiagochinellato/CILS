import {
  LineChart,
  Receipt,
  Users,
  Scale,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Building2,
  Clock,
  Layers,
  Medal,
  Layers3,
  Handshake,
  Award,
  MessageSquare,
  Quote,
  Star,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Landmark,
  BarChart3,
  BarChart2,
  History,
  Verified,
  ShieldCheck,
  BadgeCheck,
  Circle,
  PieChart,
  Timer,
  Users2,
  MailPlus,
  FileText,
  Linkedin,
  Facebook,
  Instagram,
  MessageCircle,
  Sun,
  Moon
} from 'lucide-react';

export const icons = {
  // Core services
  contable: LineChart,
  impositivo: Receipt,
  laboral: Users,
  societaria: Scale,
  // Contact
  direccion: MapPin,
  telefono: Phone,
  email: Mail,
  fecha: Calendar,
  edificio: Building2,
  reloj: Clock,
  capas: Layers,
  // About / valores
  excelencia: Medal,
  integral: Layers3,
  etica: Handshake,
  calidad: Award,
  // UI
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  arrowRight: ArrowRight,
  landmark: Landmark,
  barChart3: BarChart3,
  barChart2: BarChart2,
  history: History,
  verified: Verified,
  shieldCheck: ShieldCheck,
  badgeCheck: BadgeCheck,
  circle: Circle,
  pieChart: PieChart,
  timer: Timer,
  users2: Users2,
  mailPlus: MailPlus,
  fileText: FileText,
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
  whatsapp: MessageCircle,
  star: Star,
  quote: Quote,
  // Theme
  sun: Sun,
  moon: Moon,
} as const;

export type IconName = keyof typeof icons;

// Helpers: derive icon from strings used in config
export function iconForService(title: string): IconName {
  const key = title.trim().toLowerCase();
  if (key.startsWith('contab')) return 'contable';
  if (key.startsWith('imposit')) return 'impositivo';
  if (key.startsWith('labor')) return 'laboral';
  if (key.startsWith('societ')) return 'societaria';
  return 'barChart3';
}

export function iconForStat(label: string): IconName {
  const k = label.toLowerCase();
  if (k.includes('año')) return 'history';
  if (k.includes('empresa')) return 'edificio';
  if (k.includes('área') || k.includes('especial')) return 'capas';
  if (k.includes('24/7') || k.includes('soporte') || k.includes('disponible')) return 'timer';
  return 'badgeCheck';
}
