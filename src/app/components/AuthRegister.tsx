import { useState } from "react";
import { ArrowLeft, User, Phone, Building2, HardHat, Hash, Check } from "lucide-react";

interface AuthRegisterProps {
  onBack: () => void;
  onSuccess: (role: "vendor" | "technician", name: string) => void;
}

export function AuthRegister({ onBack, onSuccess }: AuthRegisterProps) {
  const [form, setForm] = useState({ name: "", phone: "", role: "" as "vendor" | "technician" | "", companyCode: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const isValid =
    form.name.trim() &&
    form.phone.replace(/\s/g, "").length >= 10 &&
    form.role &&
    (form.role === "vendor" || form.companyCode.trim());

  const handleSubmit = () => {
    if (!isValid) return;
    if (form.role === "technician" && form.companyCode.trim().toUpperCase() !== "CCTV001") {
      setError("Invalid company code. Use CCTV001 for demo.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(form.role as "vendor" | "technician", form.name.trim());
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-6 pb-4 flex items-center gap-3 flex-shrink-0">
        <button
          className="w-10 h-10 rounded-xl flex items-center justify-center active:scale-90 transition-transform"
          style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}
          onClick={onBack}
        >
          <ArrowLeft size={18} className="text-white" />
        </button>
        <div>
          <h1 className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>Create Account</h1>
          <p className="text-[#6b7280]" style={{ fontSize: 13 }}>Join CCTV Manager</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="block text-[#9ca3af] mb-2" style={{ fontSize: 13 }}>Full Name *</label>
            <div className="relative">
              <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4b5563]" />
              <input
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full pl-11 pr-4 py-4 rounded-2xl text-white placeholder-[#374151] outline-none"
                style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 14 }}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[#9ca3af] mb-2" style={{ fontSize: 13 }}>Phone Number *</label>
            <div className="relative">
              <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4b5563]" />
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full pl-11 pr-4 py-4 rounded-2xl text-white placeholder-[#374151] outline-none"
                style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 14 }}
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-[#9ca3af] mb-3" style={{ fontSize: 13 }}>I am a... *</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                className="rounded-2xl p-4 flex flex-col items-center gap-2 transition-all active:scale-95"
                style={{
                  background: form.role === "vendor"
                    ? "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(6,182,212,0.12))"
                    : "rgba(30,41,59,0.7)",
                  border: form.role === "vendor"
                    ? "1px solid rgba(14,165,233,0.4)"
                    : "1px solid rgba(255,255,255,0.06)",
                }}
                onClick={() => update("role", "vendor")}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: form.role === "vendor" ? "linear-gradient(135deg, #0ea5e9, #06b6d4)" : "rgba(255,255,255,0.05)" }}
                >
                  <Building2 size={20} className={form.role === "vendor" ? "text-white" : "text-[#4b5563]"} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: form.role === "vendor" ? "#0ea5e9" : "#6b7280" }}>Vendor</span>
                <span style={{ fontSize: 10, color: "#4b5563", textAlign: "center" }}>Shop owner / Manager</span>
              </button>

              <button
                className="rounded-2xl p-4 flex flex-col items-center gap-2 transition-all active:scale-95"
                style={{
                  background: form.role === "technician"
                    ? "rgba(99,102,241,0.15)"
                    : "rgba(30,41,59,0.7)",
                  border: form.role === "technician"
                    ? "1px solid rgba(99,102,241,0.35)"
                    : "1px solid rgba(255,255,255,0.06)",
                }}
                onClick={() => update("role", "technician")}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: form.role === "technician" ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.05)" }}
                >
                  <HardHat size={20} className={form.role === "technician" ? "text-indigo-400" : "text-[#4b5563]"} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: form.role === "technician" ? "#818cf8" : "#6b7280" }}>Technician</span>
                <span style={{ fontSize: 10, color: "#4b5563", textAlign: "center" }}>Field installer</span>
              </button>
            </div>
          </div>

          {/* Company Code — only for technicians */}
          {form.role === "technician" && (
            <div>
              <label className="block text-[#9ca3af] mb-2" style={{ fontSize: 13 }}>Company Code *</label>
              <p className="text-[#4b5563] mb-2" style={{ fontSize: 12 }}>
                Ask your vendor/company for this code. Demo: <span className="text-indigo-400 font-medium">CCTV001</span>
              </p>
              <div className="relative">
                <Hash size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4b5563]" />
                <input
                  type="text"
                  placeholder="e.g. CCTV001"
                  value={form.companyCode}
                  onChange={(e) => update("companyCode", e.target.value.toUpperCase())}
                  className="w-full pl-11 pr-4 py-4 rounded-2xl text-white placeholder-[#374151] outline-none"
                  style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 14, letterSpacing: "0.05em" }}
                />
              </div>
            </div>
          )}

          {error && (
            <div
              className="rounded-xl px-4 py-3"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              <p className="text-red-400" style={{ fontSize: 13 }}>{error}</p>
            </div>
          )}

          <button
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all mt-2"
            style={{
              background: isValid ? "linear-gradient(135deg, #0ea5e9, #06b6d4)" : "rgba(30,41,59,0.6)",
              opacity: isValid ? 1 : 0.5,
              boxShadow: isValid ? "0 4px 24px rgba(14,165,233,0.35)" : "none",
            }}
            onClick={handleSubmit}
            disabled={!isValid || loading}
          >
            <Check size={17} className="text-white" />
            <span className="text-white" style={{ fontWeight: 600, fontSize: 15 }}>
              {loading ? "Creating account..." : "Create Account"}
            </span>
          </button>

          <p className="text-center text-[#4b5563]" style={{ fontSize: 12 }}>
            Already have an account?{" "}
            <button className="text-[#0ea5e9]" style={{ fontWeight: 600 }} onClick={onBack}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
