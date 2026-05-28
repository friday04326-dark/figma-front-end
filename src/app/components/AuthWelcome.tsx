import { Camera, Building2, HardHat, ChevronRight, Shield } from "lucide-react";

interface AuthWelcomeProps {
  onRole: (role: "vendor" | "technician") => void;
  onLogin: (role: "vendor" | "technician") => void;
}

export function AuthWelcome({ onRole, onLogin }: AuthWelcomeProps) {
  return (
    <div className="flex flex-col h-full px-6">
      {/* Logo area */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5"
          style={{
            background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
            boxShadow: "0 8px 32px rgba(14,165,233,0.4)",
          }}
        >
          <Camera size={36} className="text-white" />
        </div>
        <h1 className="text-white text-center" style={{ fontSize: 26, fontWeight: 700 }}>
          CCTV Manager
        </h1>
        <p className="text-[#6b7280] text-center mt-2" style={{ fontSize: 14, maxWidth: 240, lineHeight: 1.6 }}>
          Smart business management for CCTV professionals
        </p>

        {/* Version badge */}
        <div
          className="mt-3 px-3 py-1 rounded-full"
          style={{ background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.25)" }}
        >
          <span className="text-[#0ea5e9]" style={{ fontSize: 11, fontWeight: 600 }}>V1 · Field Edition</span>
        </div>
      </div>

      {/* Role Selection */}
      <div className="pb-10">
        <p className="text-[#4b5563] text-center mb-5" style={{ fontSize: 13 }}>
          Choose your role to continue
        </p>

        {/* Vendor Button */}
        <button
          className="w-full rounded-2xl p-4 mb-3 flex items-center gap-4 active:scale-95 transition-transform"
          style={{
            background: "linear-gradient(135deg, rgba(14,165,233,0.18) 0%, rgba(6,182,212,0.10) 100%)",
            border: "1px solid rgba(14,165,233,0.3)",
          }}
          onClick={() => onLogin("vendor")}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #0ea5e9, #06b6d4)", boxShadow: "0 4px 12px rgba(14,165,233,0.35)" }}
          >
            <Building2 size={22} className="text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-white" style={{ fontWeight: 700, fontSize: 15 }}>Vendor / Company</p>
            <p className="text-[#6b7280]" style={{ fontSize: 12, marginTop: 2 }}>Manage team, jobs, billing & customers</p>
          </div>
          <ChevronRight size={18} className="text-[#0ea5e9]" />
        </button>

        {/* Technician Button */}
        <button
          className="w-full rounded-2xl p-4 mb-6 flex items-center gap-4 active:scale-95 transition-transform"
          style={{
            background: "rgba(30,41,59,0.7)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          onClick={() => onLogin("technician")}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)" }}
          >
            <HardHat size={22} className="text-indigo-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-white" style={{ fontWeight: 700, fontSize: 15 }}>Technician</p>
            <p className="text-[#6b7280]" style={{ fontSize: 12, marginTop: 2 }}>View jobs, log materials & update status</p>
          </div>
          <ChevronRight size={18} className="text-[#6b7280]" />
        </button>

        {/* Register link */}
        <div className="flex items-center justify-center gap-1.5">
          <Shield size={12} className="text-[#4b5563]" />
          <span className="text-[#4b5563]" style={{ fontSize: 12 }}>New user?</span>
          <button
            className="text-[#0ea5e9]"
            style={{ fontSize: 12, fontWeight: 600 }}
            onClick={() => onRole("vendor")}
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
}
