import { Users, Clock, DollarSign, Plus, ChevronRight, Camera, Wrench, AlertCircle } from "lucide-react";

interface DashboardProps {
  onNavigate: (screen: string, data?: any) => void;
}

const recentWorks = [
  { id: 1, customer: "Al-Farooq Mart", type: "Camera Installation", status: "In Progress", time: "2h ago" },
  { id: 2, customer: "Ravi Steel Works", type: "DVR Replacement", status: "Pending", time: "5h ago" },
  { id: 3, customer: "City Pharmacy", type: "Cable Routing", status: "Completed", time: "1d ago" },
  { id: 4, customer: "Green Valley Hotel", type: "4Ch Setup", status: "Pending", time: "2d ago" },
];

const statusColors: Record<string, string> = {
  "In Progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Pending": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Completed": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <p className="text-[#6b7280] text-sm">Wednesday, 27 May 2026</p>
        <h1 className="text-white mt-0.5">Good morning, Technician</h1>
      </div>

      {/* Stats Cards */}
      <div className="px-5 grid grid-cols-3 gap-3 mb-5">
        <div
          className="rounded-2xl p-4 flex flex-col gap-2 cursor-pointer active:scale-95 transition-transform"
          style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.18) 0%, rgba(6,182,212,0.10) 100%)", border: "1px solid rgba(14,165,233,0.25)" }}
          onClick={() => onNavigate("customers")}
        >
          <div className="w-8 h-8 rounded-xl bg-[#0ea5e9]/20 flex items-center justify-center">
            <Users size={16} className="text-[#0ea5e9]" />
          </div>
          <div>
            <p className="text-white text-xl" style={{ fontWeight: 700, lineHeight: 1 }}>24</p>
            <p className="text-[#6b7280] mt-1" style={{ fontSize: 11 }}>Customers</p>
          </div>
        </div>

        <div
          className="rounded-2xl p-4 flex flex-col gap-2 cursor-pointer active:scale-95 transition-transform"
          style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.18) 0%, rgba(251,191,36,0.10) 100%)", border: "1px solid rgba(245,158,11,0.25)" }}
          onClick={() => onNavigate("works")}
        >
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <Clock size={16} className="text-amber-400" />
          </div>
          <div>
            <p className="text-white text-xl" style={{ fontWeight: 700, lineHeight: 1 }}>7</p>
            <p className="text-[#6b7280] mt-1" style={{ fontSize: 11 }}>Pending</p>
          </div>
        </div>

        <div
          className="rounded-2xl p-4 flex flex-col gap-2 cursor-pointer active:scale-95 transition-transform"
          style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(52,211,153,0.10) 100%)", border: "1px solid rgba(16,185,129,0.25)" }}
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center">
            <DollarSign size={16} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-white text-xl" style={{ fontWeight: 700, lineHeight: 1 }}>₹84k</p>
            <p className="text-[#6b7280] mt-1" style={{ fontSize: 11 }}>Earnings</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mb-5">
        <p className="text-[#9ca3af] mb-3" style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>Quick Actions</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            className="rounded-2xl p-4 flex items-center gap-3 active:scale-95 transition-transform text-left"
            style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)", boxShadow: "0 4px 20px rgba(14,165,233,0.35)" }}
            onClick={() => onNavigate("add-customer")}
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Plus size={18} className="text-white" />
            </div>
            <span className="text-white" style={{ fontWeight: 600, fontSize: 14 }}>Add Customer</span>
          </button>

          <button
            className="rounded-2xl p-4 flex items-center gap-3 active:scale-95 transition-transform text-left"
            style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(99,102,241,0.3)" }}
            onClick={() => onNavigate("works")}
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <Wrench size={18} className="text-indigo-400" />
            </div>
            <span className="text-white" style={{ fontWeight: 600, fontSize: 14 }}>New Work</span>
          </button>

          <button
            className="rounded-2xl p-4 flex items-center gap-3 active:scale-95 transition-transform text-left"
            style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(245,158,11,0.3)" }}
            onClick={() => onNavigate("expenses")}
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Camera size={18} className="text-amber-400" />
            </div>
            <span className="text-white" style={{ fontWeight: 600, fontSize: 14 }}>Estimate Job</span>
          </button>

          <button
            className="rounded-2xl p-4 flex items-center gap-3 active:scale-95 transition-transform text-left"
            style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(16,185,129,0.3)" }}
            onClick={() => onNavigate("bills")}
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <DollarSign size={18} className="text-emerald-400" />
            </div>
            <span className="text-white" style={{ fontWeight: 600, fontSize: 14 }}>Generate Bill</span>
          </button>
        </div>
      </div>

      {/* Recent Works */}
      <div className="px-5 pb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#9ca3af]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>Recent Works</p>
          <button className="flex items-center gap-1 text-[#0ea5e9]" style={{ fontSize: 13 }} onClick={() => onNavigate("works")}>
            See all <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {recentWorks.map((work) => (
            <div
              key={work.id}
              className="rounded-2xl p-4 flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform"
              style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}
              onClick={() => onNavigate("works")}
            >
              <div className="w-10 h-10 rounded-xl bg-[#0ea5e9]/10 flex items-center justify-center flex-shrink-0">
                <Camera size={18} className="text-[#0ea5e9]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white truncate" style={{ fontWeight: 600, fontSize: 14 }}>{work.customer}</p>
                <p className="text-[#6b7280] truncate" style={{ fontSize: 12 }}>{work.type}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className={`px-2 py-0.5 rounded-full border text-xs ${statusColors[work.status]}`} style={{ fontSize: 11, fontWeight: 500 }}>
                  {work.status}
                </span>
                <span className="text-[#4b5563]" style={{ fontSize: 11 }}>{work.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
