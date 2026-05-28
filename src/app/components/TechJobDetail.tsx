import { useState } from "react";
import { ArrowLeft, MapPin, Camera, Clock, Plus, Trash2, CheckCircle, PlayCircle, Package, IndianRupee, Lock } from "lucide-react";

interface TechJobDetailProps {
  job: any;
  permissions: { billing: boolean; expenses: boolean };
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface MaterialItem {
  id: number;
  name: string;
  qty: string;
  price: string;
}

export function TechJobDetail({ job, permissions, onBack, onNavigate }: TechJobDetailProps) {
  const [status, setStatus] = useState<"Pending" | "In Progress" | "Completed">(job?.status || "Pending");
  const [hours, setHours] = useState(String(job?.hoursLogged || "0"));
  const [notes, setNotes] = useState("");
  const [materials, setMaterials] = useState<MaterialItem[]>([
    { id: 1, name: "2MP Dome Camera", qty: "4", price: "1200" },
    { id: 2, name: "CCTV Cable (100m)", qty: "1", price: "800" },
  ]);
  const [nextId, setNextId] = useState(3);
  const [saved, setSaved] = useState(false);

  if (!job) return null;

  const addMaterial = () => {
    setMaterials((prev) => [...prev, { id: nextId, name: "", qty: "1", price: "" }]);
    setNextId((n) => n + 1);
  };

  const updateMaterial = (id: number, key: keyof MaterialItem, value: string) => {
    setMaterials((prev) => prev.map((m) => m.id === id ? { ...m, [key]: value } : m));
  };

  const removeMaterial = (id: number) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  };

  const total = materials.reduce((s, m) => s + (parseFloat(m.qty) || 0) * (parseFloat(m.price) || 0), 0);

  const statusFlow: Array<"Pending" | "In Progress" | "Completed"> = ["Pending", "In Progress", "Completed"];
  const currentIdx = statusFlow.indexOf(status);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const statusColor: Record<string, string> = {
    Pending: "#f59e0b",
    "In Progress": "#3b82f6",
    Completed: "#10b981",
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 flex-shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center active:scale-90 transition-transform"
            style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}
            onClick={onBack}
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-white" style={{ fontSize: 17 }}>{job.customer}</h1>
            <p className="text-[#6b7280]" style={{ fontSize: 13 }}>{job.type}</p>
          </div>
          <div
            className="px-3 py-1.5 rounded-xl"
            style={{
              background: `${statusColor[status]}18`,
              border: `1px solid ${statusColor[status]}35`,
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 600, color: statusColor[status] }}>{status}</span>
          </div>
        </div>

        {/* Job info */}
        <div
          className="rounded-2xl p-3.5 flex flex-col gap-2"
          style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-[#4b5563] flex-shrink-0" />
            <span className="text-[#9ca3af]" style={{ fontSize: 13 }}>{job.address}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Camera size={12} className="text-[#4b5563]" />
              <span className="text-[#9ca3af]" style={{ fontSize: 12 }}>{job.cameras} cameras</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-[#4b5563]" />
              <span className="text-[#9ca3af]" style={{ fontSize: 12 }}>{job.deadline}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Status Update */}
        <div className="mb-5">
          <p className="text-[#9ca3af] mb-3" style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Update Status</p>
          <div className="flex gap-2">
            {statusFlow.map((s, i) => {
              const isActive = s === status;
              const isPast = i < currentIdx;
              return (
                <button
                  key={s}
                  className="flex-1 py-3 rounded-xl text-center transition-all active:scale-95"
                  style={{
                    background: isActive
                      ? `${statusColor[s]}22`
                      : isPast ? "rgba(16,185,129,0.08)" : "rgba(30,41,59,0.7)",
                    border: `1px solid ${isActive ? `${statusColor[s]}40` : isPast ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)"}`,
                    fontSize: 11, fontWeight: isActive ? 700 : 500,
                    color: isActive ? statusColor[s] : isPast ? "#10b981" : "#6b7280",
                  }}
                  onClick={() => setStatus(s)}
                >
                  {s === "Pending" ? "Pending" : s === "In Progress" ? "In Progress" : "✓ Done"}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hours Worked */}
        <div className="mb-5">
          <p className="text-[#9ca3af] mb-3" style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Hours Worked</p>
          <div
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-500/15 flex items-center justify-center">
              <Clock size={16} className="text-indigo-400" />
            </div>
            <div className="flex-1">
              <p className="text-[#9ca3af]" style={{ fontSize: 12 }}>Total hours on site</p>
              <div className="flex items-center gap-1 mt-0.5">
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="text-white outline-none bg-transparent"
                  style={{ fontSize: 20, fontWeight: 700, width: 60 }}
                />
                <span className="text-[#6b7280]" style={{ fontSize: 14 }}>hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Materials Used (only if expenses permission) */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[#9ca3af]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Materials Used
            </p>
            {permissions.expenses ? (
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl active:scale-95 transition-transform"
                style={{ background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.25)", fontSize: 11, color: "#0ea5e9", fontWeight: 500 }}
                onClick={addMaterial}
              >
                <Plus size={11} />
                Add Item
              </button>
            ) : (
              <div className="flex items-center gap-1" style={{ color: "#4b5563", fontSize: 11 }}>
                <Lock size={10} />
                <span>No access</span>
              </div>
            )}
          </div>

          {!permissions.expenses ? (
            <div
              className="rounded-2xl p-5 flex flex-col items-center gap-2"
              style={{ background: "rgba(15,23,42,0.6)", border: "1px dashed rgba(255,255,255,0.08)" }}
            >
              <Lock size={20} className="text-[#4b5563]" />
              <p className="text-[#6b7280] text-center" style={{ fontSize: 13 }}>Expense logging not permitted</p>
              <p className="text-[#4b5563] text-center" style={{ fontSize: 11 }}>Ask your vendor to enable this access</p>
            </div>
          ) : (
            <>
              {/* Column headers */}
              <div className="grid gap-2 mb-2 px-1" style={{ gridTemplateColumns: "1fr 50px 72px 28px" }}>
                <span className="text-[#4b5563]" style={{ fontSize: 10 }}>Item</span>
                <span className="text-[#4b5563]" style={{ fontSize: 10 }}>Qty</span>
                <span className="text-[#4b5563]" style={{ fontSize: 10 }}>Price ₹</span>
                <span />
              </div>
              <div className="flex flex-col gap-2">
                {materials.map((m) => {
                  const line = (parseFloat(m.qty) || 0) * (parseFloat(m.price) || 0);
                  return (
                    <div
                      key={m.id}
                      className="rounded-xl p-3"
                      style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <div className="grid gap-2 items-center" style={{ gridTemplateColumns: "1fr 50px 72px 28px" }}>
                        <input
                          type="text"
                          placeholder="Item name"
                          value={m.name}
                          onChange={(e) => updateMaterial(m.id, "name", e.target.value)}
                          className="text-white placeholder-[#374151] outline-none bg-transparent truncate"
                          style={{ fontSize: 12, fontWeight: 500 }}
                        />
                        <input
                          type="number"
                          min="1"
                          value={m.qty}
                          onChange={(e) => updateMaterial(m.id, "qty", e.target.value)}
                          className="text-white outline-none rounded-lg px-2 py-1 text-center"
                          style={{ fontSize: 12, background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
                        />
                        <input
                          type="number"
                          min="0"
                          placeholder="0"
                          value={m.price}
                          onChange={(e) => updateMaterial(m.id, "price", e.target.value)}
                          className="text-white placeholder-[#374151] outline-none rounded-lg px-2 py-1"
                          style={{ fontSize: 12, background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
                        />
                        <button
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ background: "rgba(239,68,68,0.1)" }}
                          onClick={() => removeMaterial(m.id)}
                        >
                          <Trash2 size={11} className="text-red-400" />
                        </button>
                      </div>
                      {line > 0 && (
                        <p className="text-[#0ea5e9] mt-1 text-right" style={{ fontSize: 10 }}>
                          = ₹{line.toLocaleString("en-IN")}
                        </p>
                      )}
                    </div>
                  );
                })}
                {/* Materials total */}
                {total > 0 && (
                  <div
                    className="rounded-xl px-4 py-3 flex items-center justify-between"
                    style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.15)" }}
                  >
                    <span className="text-[#9ca3af]" style={{ fontSize: 13 }}>Materials Total</span>
                    <span className="text-[#0ea5e9]" style={{ fontWeight: 700, fontSize: 15 }}>
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Notes */}
        <div className="mb-5">
          <p className="text-[#9ca3af] mb-2" style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Site Notes</p>
          <textarea
            placeholder="Any observations, issues, or instructions from the site..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-4 py-3.5 rounded-2xl text-white placeholder-[#374151] outline-none resize-none"
            style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.06)", fontSize: 13 }}
          />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <button
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
            style={{ background: "linear-gradient(135deg, #4f46e5, #6366f1)", boxShadow: "0 4px 20px rgba(99,102,241,0.35)" }}
            onClick={handleSave}
          >
            {saved ? (
              <><CheckCircle size={17} className="text-white" /><span className="text-white" style={{ fontWeight: 600, fontSize: 15 }}>Saved!</span></>
            ) : (
              <><PlayCircle size={17} className="text-white" /><span className="text-white" style={{ fontWeight: 600, fontSize: 15 }}>Save Progress</span></>
            )}
          </button>

          {permissions.billing && (
            <button
              className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
              style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}
              onClick={() => onNavigate("t-billing")}
            >
              <IndianRupee size={17} className="text-emerald-400" />
              <span className="text-emerald-400" style={{ fontWeight: 600, fontSize: 15 }}>Generate Bill</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
