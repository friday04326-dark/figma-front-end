import { useState } from "react";
import { Plus, HardHat, Phone, CheckCircle, XCircle, X, Shield, IndianRupee, Calculator } from "lucide-react";

interface VendorTeamProps {
  onNavigate: (screen: string, data?: any) => void;
}

interface Technician {
  id: number;
  name: string;
  phone: string;
  status: "active" | "inactive";
  jobsToday: number;
  jobsTotal: number;
  permissions: { billing: boolean; expenses: boolean };
}

const initialTeam: Technician[] = [
  { id: 1, name: "Rahul Sharma", phone: "+91 98765 43210", status: "active", jobsToday: 2, jobsTotal: 18, permissions: { billing: false, expenses: true } },
  { id: 2, name: "Sanjay Patel", phone: "+91 87654 32109", status: "active", jobsToday: 1, jobsTotal: 12, permissions: { billing: true, expenses: true } },
  { id: 3, name: "Vikram Singh", phone: "+91 76543 21098", status: "inactive", jobsToday: 0, jobsTotal: 7, permissions: { billing: false, expenses: false } },
];

export function VendorTeam({ onNavigate }: VendorTeamProps) {
  const [team, setTeam] = useState<Technician[]>(initialTeam);
  const [editTech, setEditTech] = useState<Technician | null>(null);
  const [addModal, setAddModal] = useState(false);
  const [newTech, setNewTech] = useState({ name: "", phone: "" });

  const togglePermission = (techId: number, key: "billing" | "expenses") => {
    setTeam((prev) =>
      prev.map((t) =>
        t.id === techId
          ? { ...t, permissions: { ...t.permissions, [key]: !t.permissions[key] } }
          : t
      )
    );
    if (editTech?.id === techId) {
      setEditTech((prev) => prev ? { ...prev, permissions: { ...prev.permissions, [key]: !prev.permissions[key] } } : null);
    }
  };

  const addTechnician = () => {
    if (!newTech.name || !newTech.phone) return;
    const t: Technician = {
      id: team.length + 1,
      name: newTech.name,
      phone: newTech.phone,
      status: "active",
      jobsToday: 0,
      jobsTotal: 0,
      permissions: { billing: false, expenses: false },
    };
    setTeam((prev) => [...prev, t]);
    setNewTech({ name: "", phone: "" });
    setAddModal(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 flex-shrink-0">
        <h1 className="text-white">My Team</h1>
        <p className="text-[#6b7280]" style={{ fontSize: 14 }}>
          {team.filter((t) => t.status === "active").length} active · {team.length} total technicians
        </p>
      </div>

      {/* Permission legend */}
      <div className="px-5 mb-4 flex-shrink-0">
        <div
          className="rounded-2xl p-3.5 flex items-start gap-3"
          style={{ background: "rgba(14,165,233,0.07)", border: "1px solid rgba(14,165,233,0.15)" }}
        >
          <Shield size={15} className="text-[#0ea5e9] mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[#9ca3af]" style={{ fontSize: 12, lineHeight: 1.5 }}>
              You control what each technician can access. Tap a card to manage permissions.
            </p>
          </div>
        </div>
      </div>

      {/* Team list */}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="flex flex-col gap-3">
          {team.map((tech) => (
            <div
              key={tech.id}
              className="rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-transform"
              style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
              onClick={() => setEditTech(tech)}
            >
              {/* Top row */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                  style={{
                    background: tech.status === "active"
                      ? "linear-gradient(135deg, #4f46e5, #6366f1)"
                      : "rgba(30,41,59,0.8)",
                    fontSize: 16, fontWeight: 700,
                    opacity: tech.status === "active" ? 1 : 0.5,
                  }}
                >
                  {tech.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-white" style={{ fontWeight: 600, fontSize: 14 }}>{tech.name}</p>
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{
                        fontSize: 10, fontWeight: 600,
                        background: tech.status === "active" ? "rgba(16,185,129,0.15)" : "rgba(107,114,128,0.15)",
                        color: tech.status === "active" ? "#10b981" : "#6b7280",
                      }}
                    >
                      {tech.status === "active" ? "● Active" : "○ Inactive"}
                    </span>
                  </div>
                  <p className="text-[#4b5563]" style={{ fontSize: 12 }}>{tech.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-white" style={{ fontWeight: 700, fontSize: 16 }}>{tech.jobsToday}</p>
                  <p className="text-[#4b5563]" style={{ fontSize: 10 }}>today</p>
                </div>
              </div>

              {/* Permission badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span style={{ fontSize: 11, color: "#4b5563" }}>Access:</span>
                <span
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                  style={{
                    fontSize: 10, fontWeight: 500,
                    background: tech.permissions.expenses ? "rgba(14,165,233,0.12)" : "rgba(107,114,128,0.1)",
                    color: tech.permissions.expenses ? "#0ea5e9" : "#4b5563",
                    border: `1px solid ${tech.permissions.expenses ? "rgba(14,165,233,0.2)" : "rgba(107,114,128,0.15)"}`,
                  }}
                >
                  <Calculator size={9} />
                  Expenses
                  {tech.permissions.expenses ? <CheckCircle size={9} /> : <XCircle size={9} />}
                </span>
                <span
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                  style={{
                    fontSize: 10, fontWeight: 500,
                    background: tech.permissions.billing ? "rgba(16,185,129,0.12)" : "rgba(107,114,128,0.1)",
                    color: tech.permissions.billing ? "#10b981" : "#4b5563",
                    border: `1px solid ${tech.permissions.billing ? "rgba(16,185,129,0.2)" : "rgba(107,114,128,0.15)"}`,
                  }}
                >
                  <IndianRupee size={9} />
                  Billing
                  {tech.permissions.billing ? <CheckCircle size={9} /> : <XCircle size={9} />}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button
        className="absolute bottom-24 right-5 w-14 h-14 rounded-2xl flex items-center justify-center active:scale-90 transition-transform z-10"
        style={{ background: "linear-gradient(135deg, #0ea5e9, #06b6d4)", boxShadow: "0 4px 24px rgba(14,165,233,0.45)" }}
        onClick={() => setAddModal(true)}
      >
        <Plus size={24} className="text-white" />
      </button>

      {/* Edit Permissions Modal */}
      {editTech && (
        <div
          className="absolute inset-0 flex items-end z-20"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          onClick={() => setEditTech(null)}
        >
          <div
            className="w-full rounded-t-3xl p-6"
            style={{ background: "#111827" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                  style={{ background: "linear-gradient(135deg, #4f46e5, #6366f1)", fontSize: 15, fontWeight: 700 }}
                >
                  {editTech.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white" style={{ fontWeight: 700, fontSize: 15 }}>{editTech.name}</p>
                  <p className="text-[#4b5563]" style={{ fontSize: 12 }}>{editTech.phone}</p>
                </div>
              </div>
              <button onClick={() => setEditTech(null)}><X size={18} className="text-[#6b7280]" /></button>
            </div>

            <p className="text-[#9ca3af] mb-4" style={{ fontSize: 13 }}>Manage Access Permissions</p>

            {/* Permission toggles */}
            {(["expenses", "billing"] as const).map((key) => {
              const enabled = editTech.permissions[key];
              const label = key === "expenses" ? "Expense Calculator" : "Bill Generation";
              const desc = key === "expenses" ? "Can log materials & calculate costs" : "Can generate & send bills to customers";
              const Icon = key === "expenses" ? Calculator : IndianRupee;
              return (
                <div
                  key={key}
                  className="flex items-center gap-4 p-4 rounded-2xl mb-3 cursor-pointer active:scale-[0.98] transition-transform"
                  style={{
                    background: enabled ? (key === "expenses" ? "rgba(14,165,233,0.1)" : "rgba(16,185,129,0.1)") : "rgba(30,41,59,0.7)",
                    border: `1px solid ${enabled ? (key === "expenses" ? "rgba(14,165,233,0.25)" : "rgba(16,185,129,0.25)") : "rgba(255,255,255,0.06)"}`,
                  }}
                  onClick={() => togglePermission(editTech.id, key)}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: enabled ? (key === "expenses" ? "rgba(14,165,233,0.2)" : "rgba(16,185,129,0.2)") : "rgba(30,41,59,0.8)" }}
                  >
                    <Icon size={17} style={{ color: enabled ? (key === "expenses" ? "#0ea5e9" : "#10b981") : "#4b5563" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white" style={{ fontWeight: 600, fontSize: 14 }}>{label}</p>
                    <p className="text-[#6b7280]" style={{ fontSize: 12 }}>{desc}</p>
                  </div>
                  {/* Toggle */}
                  <div
                    className="w-11 h-6 rounded-full transition-all flex-shrink-0 relative"
                    style={{ background: enabled ? (key === "expenses" ? "#0ea5e9" : "#10b981") : "rgba(255,255,255,0.1)" }}
                  >
                    <div
                      className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
                      style={{ left: enabled ? 24 : 4, boxShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
                    />
                  </div>
                </div>
              );
            })}

            <button
              className="w-full py-3.5 rounded-2xl text-white active:scale-95 transition-transform mt-2"
              style={{ background: "linear-gradient(135deg, #0ea5e9, #06b6d4)", fontWeight: 600, fontSize: 15 }}
              onClick={() => setEditTech(null)}
            >
              Save Permissions
            </button>
          </div>
        </div>
      )}

      {/* Add Technician Modal */}
      {addModal && (
        <div
          className="absolute inset-0 flex items-end z-20"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          onClick={() => setAddModal(false)}
        >
          <div
            className="w-full rounded-t-3xl p-6"
            style={{ background: "#111827" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <p className="text-white" style={{ fontWeight: 700, fontSize: 16 }}>Add Technician</p>
              <button onClick={() => setAddModal(false)}><X size={18} className="text-[#6b7280]" /></button>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-[#9ca3af] mb-1" style={{ fontSize: 12 }}>Full Name</label>
                <div className="relative">
                  <HardHat size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4b5563]" />
                  <input
                    type="text"
                    placeholder="Technician name"
                    value={newTech.name}
                    onChange={(e) => setNewTech((f) => ({ ...f, name: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl text-white placeholder-[#374151] outline-none"
                    style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 14 }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#9ca3af] mb-1" style={{ fontSize: 12 }}>Phone Number</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4b5563]" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={newTech.phone}
                    onChange={(e) => setNewTech((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl text-white placeholder-[#374151] outline-none"
                    style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 14 }}
                  />
                </div>
              </div>
              <p className="text-[#4b5563]" style={{ fontSize: 11 }}>
                Company code <span className="text-[#0ea5e9]">CCTV001</span> will be shared with the technician to register.
              </p>
              <button
                className="w-full py-4 rounded-2xl text-white active:scale-95 transition-transform mt-1"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #06b6d4)", fontWeight: 600, fontSize: 15, boxShadow: "0 4px 20px rgba(14,165,233,0.35)" }}
                onClick={addTechnician}
              >
                Add to Team
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
