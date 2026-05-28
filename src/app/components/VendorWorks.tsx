import { useState } from "react";
import { Plus, Clock, CheckCircle, AlertCircle, Camera, UserCheck, X, ChevronDown } from "lucide-react";

interface VendorWorksProps {
  onNavigate: (screen: string, data?: any) => void;
}

const technicians = [
  { id: 1, name: "Rahul Sharma", status: "active" },
  { id: 2, name: "Sanjay Patel", status: "active" },
  { id: 3, name: "Vikram Singh", status: "inactive" },
];

const initialWorks = [
  { id: 1, customer: "Al-Farooq Mart", type: "Camera Installation", deadline: "Today, 3 PM", status: "In Progress", techId: 1, cameras: 8, address: "MG Road, Bengaluru" },
  { id: 2, customer: "Ravi Steel Works", type: "DVR Replacement", deadline: "Tomorrow, 11 AM", status: "Pending", techId: null, cameras: 4, address: "Industrial Area, Pune" },
  { id: 3, customer: "Green Valley Hotel", type: "4Ch Setup + PTZ", deadline: "Jun 1, 2026", status: "Pending", techId: null, cameras: 16, address: "Linking Road, Mumbai" },
  { id: 4, customer: "Metro Garage", type: "Annual Maintenance", deadline: "Jun 5, 2026", status: "In Progress", techId: 1, cameras: 6, address: "Sector 18, Noida" },
  { id: 5, customer: "City Pharmacy", type: "NVR Upgrade", deadline: "Jun 10, 2026", status: "Pending", techId: null, cameras: 2, address: "Park Street, Kolkata" },
  { id: 6, customer: "Sunrise School", type: "New Installation", deadline: "May 30, 2026", status: "Completed", techId: 2, cameras: 12, address: "Anna Salai, Chennai" },
];

const statusConfig: Record<string, { color: string; bg: string; border: string; icon: any }> = {
  "Pending": { color: "text-amber-400", bg: "bg-amber-500/15", border: "border-amber-500/25", icon: Clock },
  "In Progress": { color: "text-blue-400", bg: "bg-blue-500/15", border: "border-blue-500/25", icon: AlertCircle },
  "Completed": { color: "text-emerald-400", bg: "bg-emerald-500/15", border: "border-emerald-500/25", icon: CheckCircle },
};

const filters = ["All", "Pending", "In Progress", "Completed"];

export function VendorWorks({ onNavigate }: VendorWorksProps) {
  const [works, setWorks] = useState(initialWorks);
  const [activeFilter, setActiveFilter] = useState("All");
  const [assignModal, setAssignModal] = useState<number | null>(null);
  const [createModal, setCreateModal] = useState(false);
  const [newWork, setNewWork] = useState({ customer: "", type: "", deadline: "", cameras: "" });

  const filtered = works.filter((w) => activeFilter === "All" || w.status === activeFilter);
  const counts: Record<string, number> = {
    All: works.length,
    Pending: works.filter((w) => w.status === "Pending").length,
    "In Progress": works.filter((w) => w.status === "In Progress").length,
    Completed: works.filter((w) => w.status === "Completed").length,
  };

  const assignTech = (workId: number, techId: number) => {
    setWorks((prev) =>
      prev.map((w) => w.id === workId ? { ...w, techId, status: "In Progress" } : w)
    );
    setAssignModal(null);
  };

  const createWork = () => {
    if (!newWork.customer || !newWork.type) return;
    const w = {
      id: works.length + 1,
      customer: newWork.customer,
      type: newWork.type,
      deadline: newWork.deadline || "TBD",
      status: "Pending",
      techId: null,
      cameras: parseInt(newWork.cameras) || 1,
      address: "—",
    };
    setWorks((prev) => [w, ...prev]);
    setNewWork({ customer: "", type: "", deadline: "", cameras: "" });
    setCreateModal(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 flex-shrink-0">
        <h1 className="text-white">Work Orders</h1>
        <p className="text-[#6b7280]" style={{ fontSize: 14 }}>{counts.Pending} pending · {counts["In Progress"]} in progress</p>
      </div>

      {/* Filter Pills */}
      <div className="px-5 mb-4 flex-shrink-0 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className="flex-shrink-0 px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all active:scale-95"
            style={{
              background: activeFilter === f ? "linear-gradient(135deg, #0ea5e9, #06b6d4)" : "rgba(30,41,59,0.7)",
              border: activeFilter === f ? "none" : "1px solid rgba(255,255,255,0.06)",
              fontSize: 13, fontWeight: 500,
              color: activeFilter === f ? "white" : "#9ca3af",
              boxShadow: activeFilter === f ? "0 2px 12px rgba(14,165,233,0.3)" : "none",
            }}
          >
            {f}
            <span
              className="px-1.5 py-0.5 rounded-full"
              style={{
                background: activeFilter === f ? "rgba(255,255,255,0.25)" : "rgba(99,102,241,0.2)",
                fontSize: 10, color: activeFilter === f ? "white" : "#818cf8", fontWeight: 600,
              }}
            >
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      {/* Works list */}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="flex flex-col gap-3">
          {filtered.map((work) => {
            const cfg = statusConfig[work.status];
            const StatusIcon = cfg.icon;
            const tech = technicians.find((t) => t.id === work.techId);
            return (
              <div
                key={work.id}
                className="rounded-2xl p-4"
                style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0ea5e9]/10 flex items-center justify-center flex-shrink-0">
                    <Camera size={16} className="text-[#0ea5e9]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white" style={{ fontWeight: 600, fontSize: 14 }}>{work.customer}</p>
                    <p className="text-[#6b7280]" style={{ fontSize: 12 }}>{work.type} · {work.cameras} cams</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.border}`} style={{ fontSize: 10, fontWeight: 500 }}>
                    <StatusIcon size={9} className={cfg.color} />
                    <span className={cfg.color}>{work.status}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <Clock size={11} className="text-[#4b5563]" />
                    <span className="text-[#9ca3af]" style={{ fontSize: 11 }}>{work.deadline}</span>
                  </div>
                </div>

                {/* Technician Assignment */}
                <div
                  className="rounded-xl px-3 py-2.5 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
                  style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}
                  onClick={() => work.status !== "Completed" && setAssignModal(work.id)}
                >
                  <div className="flex items-center gap-2">
                    <UserCheck size={13} className={tech ? "text-[#0ea5e9]" : "text-[#4b5563]"} />
                    <span style={{ fontSize: 12, color: tech ? "#e2e8f0" : "#4b5563" }}>
                      {tech ? tech.name : "Tap to assign technician"}
                    </span>
                  </div>
                  {work.status !== "Completed" && (
                    <ChevronDown size={13} className="text-[#4b5563]" />
                  )}
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
        onClick={() => setCreateModal(true)}
      >
        <Plus size={24} className="text-white" />
      </button>

      {/* Assign Modal */}
      {assignModal !== null && (
        <div
          className="absolute inset-0 flex items-end z-20"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setAssignModal(null)}
        >
          <div
            className="w-full rounded-t-3xl p-6"
            style={{ background: "#111827" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <p className="text-white" style={{ fontWeight: 700, fontSize: 16 }}>Assign Technician</p>
              <button onClick={() => setAssignModal(null)}>
                <X size={18} className="text-[#6b7280]" />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {technicians.map((tech) => (
                <button
                  key={tech.id}
                  className="flex items-center gap-3 p-4 rounded-2xl active:scale-95 transition-transform text-left"
                  style={{
                    background: tech.status === "active" ? "rgba(30,41,59,0.8)" : "rgba(15,23,42,0.5)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    opacity: tech.status === "active" ? 1 : 0.4,
                  }}
                  disabled={tech.status !== "active"}
                  onClick={() => tech.status === "active" && assignTech(assignModal!, tech.id)}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #4f46e5, #6366f1)", fontSize: 15, fontWeight: 700 }}
                  >
                    {tech.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white" style={{ fontWeight: 600, fontSize: 14 }}>{tech.name}</p>
                    <p style={{ fontSize: 12, color: tech.status === "active" ? "#10b981" : "#6b7280" }}>
                      {tech.status === "active" ? "● Available" : "○ Inactive"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Work Modal */}
      {createModal && (
        <div
          className="absolute inset-0 flex items-end z-20"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setCreateModal(false)}
        >
          <div
            className="w-full rounded-t-3xl p-6"
            style={{ background: "#111827" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <p className="text-white" style={{ fontWeight: 700, fontSize: 16 }}>Create Work Order</p>
              <button onClick={() => setCreateModal(false)}><X size={18} className="text-[#6b7280]" /></button>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { key: "customer", placeholder: "Customer name", label: "Customer" },
                { key: "type", placeholder: "e.g. Camera Installation", label: "Work Type" },
                { key: "deadline", placeholder: "e.g. Jun 15, 2026", label: "Deadline" },
                { key: "cameras", placeholder: "e.g. 8", label: "No. of Cameras" },
              ].map(({ key, placeholder, label }) => (
                <div key={key}>
                  <label className="block text-[#9ca3af] mb-1" style={{ fontSize: 12 }}>{label}</label>
                  <input
                    type={key === "cameras" ? "number" : "text"}
                    placeholder={placeholder}
                    value={newWork[key as keyof typeof newWork]}
                    onChange={(e) => setNewWork((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-[#374151] outline-none"
                    style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 14 }}
                  />
                </div>
              ))}
              <button
                className="w-full py-4 rounded-2xl flex items-center justify-center active:scale-95 transition-transform mt-1"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #06b6d4)", boxShadow: "0 4px 20px rgba(14,165,233,0.35)" }}
                onClick={createWork}
              >
                <span className="text-white" style={{ fontWeight: 600, fontSize: 15 }}>Create Work Order</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
