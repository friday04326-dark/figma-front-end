import { useState } from "react";
import { Bell, Clock, CheckCircle, AlertCircle, Plus, Filter } from "lucide-react";

interface PendingWorksProps {
  onNavigate: (screen: string, data?: any) => void;
}

const works = [
  { id: 1, customer: "Ravi Steel Works", type: "DVR Replacement", deadline: "Today, 3 PM", status: "Pending", priority: "High", cameras: 4 },
  { id: 2, customer: "Metro Garage", type: "Cable Routing", deadline: "Tomorrow, 11 AM", status: "In Progress", priority: "Medium", cameras: 6 },
  { id: 3, customer: "Green Valley Hotel", type: "4Ch Setup + PTZ", deadline: "Jun 1, 2026", status: "Pending", priority: "Medium", cameras: 16 },
  { id: 4, customer: "Al-Farooq Mart", type: "Annual Maintenance", deadline: "Jun 5, 2026", status: "In Progress", priority: "Low", cameras: 8 },
  { id: 5, customer: "City Pharmacy", type: "NVR Upgrade", deadline: "Jun 10, 2026", status: "Pending", priority: "Low", cameras: 2 },
  { id: 6, customer: "Sunrise School", type: "New Installation", deadline: "May 30, 2026", status: "Completed", priority: "High", cameras: 12 },
];

const statusConfig: Record<string, { color: string; bg: string; border: string; icon: any }> = {
  "Pending": { color: "text-amber-400", bg: "bg-amber-500/15", border: "border-amber-500/25", icon: Clock },
  "In Progress": { color: "text-blue-400", bg: "bg-blue-500/15", border: "border-blue-500/25", icon: AlertCircle },
  "Completed": { color: "text-emerald-400", bg: "bg-emerald-500/15", border: "border-emerald-500/25", icon: CheckCircle },
};

const priorityDot: Record<string, string> = {
  "High": "bg-red-500",
  "Medium": "bg-amber-500",
  "Low": "bg-emerald-500",
};

const filters = ["All", "Pending", "In Progress", "Completed"];

export function PendingWorks({ onNavigate }: PendingWorksProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = works.filter((w) => activeFilter === "All" || w.status === activeFilter);

  const counts = {
    All: works.length,
    Pending: works.filter((w) => w.status === "Pending").length,
    "In Progress": works.filter((w) => w.status === "In Progress").length,
    Completed: works.filter((w) => w.status === "Completed").length,
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-white">Pending Works</h1>
            <p className="text-[#6b7280]" style={{ fontSize: 14 }}>{counts.Pending} tasks need attention</p>
          </div>
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center active:scale-90 transition-transform"
            style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Filter size={16} className="text-[#9ca3af]" />
          </button>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="px-5 mb-4 flex-shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="flex-shrink-0 px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all active:scale-95"
              style={{
                background: activeFilter === f
                  ? "linear-gradient(135deg, #0ea5e9, #06b6d4)"
                  : "rgba(30,41,59,0.7)",
                border: activeFilter === f ? "none" : "1px solid rgba(255,255,255,0.06)",
                fontSize: 13,
                fontWeight: 500,
                color: activeFilter === f ? "white" : "#9ca3af",
                boxShadow: activeFilter === f ? "0 2px 12px rgba(14,165,233,0.3)" : "none",
              }}
            >
              {f}
              <span
                className="px-1.5 py-0.5 rounded-full"
                style={{
                  background: activeFilter === f ? "rgba(255,255,255,0.25)" : "rgba(99,102,241,0.2)",
                  fontSize: 10,
                  color: activeFilter === f ? "white" : "#818cf8",
                  fontWeight: 600,
                }}
              >
                {counts[f as keyof typeof counts]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Works List */}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="flex flex-col gap-3">
          {filtered.map((work) => {
            const cfg = statusConfig[work.status];
            const StatusIcon = cfg.icon;
            return (
              <div
                key={work.id}
                className="rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-transform"
                style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-0.5">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${priorityDot[work.priority]}`} />
                      <p className="text-white truncate" style={{ fontWeight: 600, fontSize: 15 }}>{work.customer}</p>
                    </div>
                    <p className="text-[#6b7280]" style={{ fontSize: 13 }}>{work.type}</p>
                  </div>
                  <button
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(14,165,233,0.1)" }}
                  >
                    <Bell size={14} className="text-[#0ea5e9]" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-[#4b5563]" />
                    <span className="text-[#9ca3af]" style={{ fontSize: 12 }}>{work.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#4b5563]" style={{ fontSize: 12 }}>{work.cameras} cams</span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.border}`} style={{ fontSize: 11, fontWeight: 500 }}>
                      <StatusIcon size={10} className={cfg.color} />
                      <span className={cfg.color}>{work.status}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAB */}
      <button
        className="absolute bottom-24 right-5 w-14 h-14 rounded-2xl flex items-center justify-center active:scale-90 transition-transform z-10"
        style={{ background: "linear-gradient(135deg, #0ea5e9, #06b6d4)", boxShadow: "0 4px 24px rgba(14,165,233,0.45)" }}
      >
        <Plus size={24} className="text-white" />
      </button>
    </div>
  );
}
