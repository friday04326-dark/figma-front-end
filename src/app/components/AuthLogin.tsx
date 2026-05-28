import { useState } from "react";
import { ArrowLeft, Phone, Building2, HardHat, Mail, Check } from "lucide-react";

interface AuthLoginProps {
  role: "vendor" | "technician";
  onBack: () => void;
  onSuccess: (role: "vendor" | "technician", name: string) => void;
  onRegister: () => void;
}

export function AuthLogin({ role, onBack, onSuccess, onRegister }: AuthLoginProps) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isVendor = role === "vendor";

  const handleSendOtp = () => {
    if (phone.replace(/\s/g, "").length < 10) {
      setError("Enter a valid 10-digit phone number");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1000);
  };

  const handleVerify = () => {
    if (otp !== "1234") {
      setError("Invalid OTP. Use 1234 for demo.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(role, isVendor ? "Arun Kumar" : "Rahul Sharma");
    }, 800);
  };

  const handleGoogle = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(role, isVendor ? "Arun Kumar" : "Rahul Sharma");
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full px-6">
      {/* Header */}
      <div className="pt-6 pb-6 flex items-center gap-3 flex-shrink-0">
        <button
          className="w-10 h-10 rounded-xl flex items-center justify-center active:scale-90 transition-transform"
          style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}
          onClick={onBack}
        >
          <ArrowLeft size={18} className="text-white" />
        </button>
        <div>
          <h1 className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>Sign In</h1>
          <p className="text-[#6b7280]" style={{ fontSize: 13 }}>
            Continue as {isVendor ? "Vendor" : "Technician"}
          </p>
        </div>
      </div>

      {/* Role Badge */}
      <div
        className="flex items-center gap-3 rounded-2xl p-4 mb-6"
        style={{
          background: isVendor
            ? "rgba(14,165,233,0.1)"
            : "rgba(99,102,241,0.1)",
          border: isVendor
            ? "1px solid rgba(14,165,233,0.2)"
            : "1px solid rgba(99,102,241,0.2)",
        }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: isVendor
              ? "linear-gradient(135deg, #0ea5e9, #06b6d4)"
              : "rgba(99,102,241,0.3)",
          }}
        >
          {isVendor ? (
            <Building2 size={18} className="text-white" />
          ) : (
            <HardHat size={18} className="text-indigo-400" />
          )}
        </div>
        <div>
          <p className="text-white" style={{ fontWeight: 600, fontSize: 14 }}>
            {isVendor ? "Vendor / Company" : "Field Technician"}
          </p>
          <p className="text-[#6b7280]" style={{ fontSize: 12 }}>
            {isVendor ? "Full access to all features" : "Access assigned jobs & logs"}
          </p>
        </div>
      </div>

      <div className="flex-1">
        {step === "phone" ? (
          <div>
            <label className="block text-[#9ca3af] mb-2" style={{ fontSize: 13 }}>Phone Number</label>
            <div className="relative mb-4">
              <div
                className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2"
                style={{ borderRight: "1px solid rgba(255,255,255,0.1)", paddingRight: 10 }}
              >
                <span className="text-[#6b7280]" style={{ fontSize: 14 }}>🇮🇳 +91</span>
              </div>
              <input
                type="tel"
                placeholder="98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-24 pr-4 py-4 rounded-2xl text-white placeholder-[#374151] outline-none"
                style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 15 }}
              />
            </div>

            {error && <p className="text-red-400 mb-3" style={{ fontSize: 13 }}>{error}</p>}

            <button
              className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 mb-4 active:scale-95 transition-transform"
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                opacity: loading ? 0.7 : 1,
                boxShadow: "0 4px 20px rgba(14,165,233,0.35)",
              }}
              onClick={handleSendOtp}
              disabled={loading}
            >
              <Phone size={17} className="text-white" />
              <span className="text-white" style={{ fontWeight: 600, fontSize: 15 }}>
                {loading ? "Sending..." : "Send OTP"}
              </span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
              <span className="text-[#4b5563]" style={{ fontSize: 12 }}>or</span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            </div>

            {/* Google */}
            <button
              className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 mb-6 active:scale-95 transition-transform"
              style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}
              onClick={handleGoogle}
            >
              <Mail size={17} className="text-[#9ca3af]" />
              <span className="text-[#9ca3af]" style={{ fontWeight: 500, fontSize: 15 }}>Continue with Gmail</span>
            </button>

            <p className="text-[#4b5563] text-center" style={{ fontSize: 12 }}>
              Don't have an account?{" "}
              <button className="text-[#0ea5e9]" style={{ fontWeight: 600 }} onClick={onRegister}>
                Register
              </button>
            </p>
          </div>
        ) : (
          <div>
            <p className="text-[#9ca3af] mb-1" style={{ fontSize: 13 }}>OTP sent to +91 {phone}</p>
            <p className="text-[#4b5563] mb-4" style={{ fontSize: 12 }}>Demo OTP: <span className="text-[#0ea5e9] font-medium">1234</span></p>

            <label className="block text-[#9ca3af] mb-2" style={{ fontSize: 13 }}>Enter OTP</label>
            <input
              type="number"
              placeholder="1 2 3 4"
              value={otp}
              onChange={(e) => setOtp(e.target.value.slice(0, 4))}
              className="w-full px-4 py-4 rounded-2xl text-white placeholder-[#374151] outline-none text-center mb-4"
              style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 24, letterSpacing: "0.3em" }}
            />

            {error && <p className="text-red-400 mb-3" style={{ fontSize: 13 }}>{error}</p>}

            <button
              className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 mb-3 active:scale-95 transition-transform"
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                opacity: loading ? 0.7 : 1,
                boxShadow: "0 4px 20px rgba(14,165,233,0.35)",
              }}
              onClick={handleVerify}
              disabled={loading}
            >
              <Check size={17} className="text-white" />
              <span className="text-white" style={{ fontWeight: 600, fontSize: 15 }}>
                {loading ? "Verifying..." : "Verify & Login"}
              </span>
            </button>

            <button
              className="w-full text-center active:opacity-70"
              style={{ color: "#6b7280", fontSize: 13 }}
              onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
            >
              ← Change number
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
