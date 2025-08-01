import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Eye,
  Package,
  FileText,
  Pill,
  Printer,
  ScanLine,
  Database,
  Bell,
  Clock,
  BarChart2,
  MessageCircle,
  LogOut,
  X,
  ChevronRight,
  ChevronLeft,
  Files,
} from "lucide-react";

const Icons = {
  Dashboard: LayoutDashboard,
  Users: Users,
  Orders: ClipboardList,
  TrackOrder: Eye,
  Refills: Package,
  Forms: FileText,
  Prescription: Pill,
  Fax: Printer, // Changed from Send to Printer for better representation
  Scanner: ScanLine,
  DataFetch: Database,
  Queue: Bell,
  Activity: Clock,
  Reports: BarChart2,
  Messages: MessageCircle, // Changed from MessageSquare to MessageCircle for distinction
  Logout: LogOut,
  Close: X,
  Expand: ChevronRight,
  Collapse: ChevronLeft,
  Documents: Files,
  Questionnaire: ClipboardList,
};

export default Icons;
