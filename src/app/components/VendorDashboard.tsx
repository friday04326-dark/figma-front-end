import { Users, Clock, IndianRupee, ChevronRight, Camera, HardHat, CheckCircle, Plus } from "lucide-react";

interface VendorDashboardProps {
  userName: string;
  onNavigate: (screen: string, data?: any) => void;
}

const recentWorks = [
  { id: 1, customer: "Al-Farooq Mart", type: "Camera Installation", tech: "Rahul", status: "In Progress" },
  { id: 2, customer: "Ravi Steel Works", type: "DVR Replacement", tech: null, status: "Pending" },
  { id: 3, customer: "City Pharmacy", type: "Cable Routing", tech: "Sanjay", status: "Completed" },
  { id: 4, customer: "Metro Garage", type: "Annual Maintenance", tech: "Rahul", status: "In Progress" },
];

const statusColors: Record<string, string> = {
  "In Progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Pending": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Completed": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

export function VendorDashboard({ userName, onNavigate }: VendorDashboardProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[#6b7280]" style={{ fontSize: 13 }}>Vendor Portal</p>
          <div
            className="px-2.5 py-1 rounded-full flex items-center gap-1.5"
            style={{ background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.2)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]" style={{ boxShadow: "0 0 6px #0ea5e9" }} />
            <span className="text-[#0ea5e9]" style={{ fontSize: 11, fontWeight: 600 }}>ONLINE</span>
          </div>
        </div>
        <h1 className="text-white" style={{ fontSize: 20 }}>Welcome, {userName.split(" ")[0]} 👋</h1>
      </div>

      {/* Stats row */}
      <div className="px-5 grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Customers", value: "24", icon: Users, color: "#0ea5e9", gradFrom: "rgba(14,165,233,0.18)", gradTo: "rgba(6,182,212,0.10)", borderColor: "rgba(14,165,233,0.25)", screen: "v-customers" },
          { label: "Pending", value: "7", icon: Clock, color: "#f59e0b", gradFrom: "rgba(245,158,11,0.18)", gradTo: "rgba(251,191,36,0.10)", borderColor: "rgba(245,158,11,0.25)", screen: "v-works" },
          { label: "This Month", value: "₹84k", icon: IndianRupee, color: "#10b981", gradFrom: "rgba(16,185,129,0.18)", gradTo: "rgba(52,211,153,0.10)", borderColor: "rgba(16,185,129,0.25)", screen: "v-bills" },
        ].map(({ label, value, icon: Icon, color, gradFrom, gradTo, borderColor, screen }) => (
          <div
            key={label}
            className="rounded-2xl p-3.5 flex flex-col gap-2 cursor-pointer active:scale-95 transition-transform"
            style={{ background: `linear-gradient(135deg, ${gradFrom} 0%, ${gradTo} 100%)`, border: `1px solid ${borderColor}` }}
            onClick={() => onNavigate(screen)}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${color}22` }}>
              <Icon size={15} style={{ color }} />
            </div>
            <div>
              <p className="text-white" style={{ fontWeight: 700, fontSize: 18, lineHeight: 1 }}>{value}</p>
              <p className="text-[#6b7280] mt-1" style={{ fontSize: 10 }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Team Overview strip */}
      <div className="px-5 mb-5">
        <div
          className="rounded-2xl p-4 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
          style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}
          onClick={() => onNavigate("v-team")}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
              <HardHat size={18} className="text-indigo-400" />
            </div>
            <div>
              <p className="text-white" style={{ fontWeight: 600, fontSize: 14 }}>Your Team</p>
              <p className="text-[#6b7280]" style={{ fontSize: 12 }}>3 technicians · 2 active today</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-[#4b5563]" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mb-5">
        <p className="text-[#9ca3af] mb-3" style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Quick Actions</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            className="rounded-2xl p-4 flex items-center gap-3 active:scale-95 transition-transform text-left"
            style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)", boxShadow: "0 4px 16px rgba(14,165,233,0.35)" }}
            onClick={() => onNavigate("v-add-customer")}
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Plus size={18} className="text-white" />
            </div>
            <span className="text-white" style={{ fontWeight: 600, fontSize: 13 }}>Add Customer</span>
          </button>
          <button
            className="rounded-2xl p-4 flex items-center gap-3 active:scale-95 transition-transform text-left"
            style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(99,102,241,0.25)" }}
            onClick={() => onNavigate("v-works")}
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <Camera size={18} className="text-indigo-400" />
            </div>
            <span className="text-white" style={{ fontWeight: 600, fontSize: 13 }}>Create Work</span>
          </button>
        </div>
      </div>

      {/* Recent Works */}
      <div className="px-5 pb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#9ca3af]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Recent Works</p>
          <button className="flex items-center gap-1 text-[#0ea5e9]" style={{ fontSize: 13 }} onClick={() => onNavigate("v-works")}>
            See all <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {recentWorks.map((w) => (
            <div
              key={w.id}
              className="rounded-2xl p-4 flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform"
              style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(255,255,255,0.05)" }}
              onClick={() => onNavigate("v-works")}
            >
              <div className="w-9 h-9 rounded-xl bg-[#0ea5e9]/10 flex items-center justify-center flex-shrink-0">
                <Camera size={16} className="text-[#0ea5e9]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white truncate" style={{ fontWeight: 600, fontSize: 13 }}>{w.customer}</p>
                <p className="text-[#4b5563] truncate" style={{ fontSize: 11 }}>
                  {w.type}
                  {w.tech ? ` · ${w.tech}` : " · Unassigned"}
                </p>
              </div>
              <span className={`px-2 py-0.5 rounded-full border text-xs ${statusColors[w.status]}`} style={{ fontSize: 10, fontWeight: 500, whiteSpace: "nowrap" }}>
                {w.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
