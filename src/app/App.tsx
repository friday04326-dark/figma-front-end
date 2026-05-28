import { useState } from "react";
import {
  Home, Users, Camera, HardHat, FileText, Calculator,
  Building2, LogOut, User,
} from "lucide-react";

// Auth screens
import { AuthWelcome } from "./components/AuthWelcome";
import { AuthLogin } from "./components/AuthLogin";
import { AuthRegister } from "./components/AuthRegister";

// Vendor screens
import { VendorDashboard } from "./components/VendorDashboard";
import { VendorWorks } from "./components/VendorWorks";
import { VendorTeam } from "./components/VendorTeam";

// Technician screens
import { TechDashboard } from "./components/TechDashboard";
import { TechJobDetail } from "./components/TechJobDetail";

// Shared screens
import { Customers } from "./components/Customers";
import { AddCustomer } from "./components/AddCustomer";
import { ExpenseCalculator } from "./components/ExpenseCalculator";
import { Billing } from "./components/Billing";

type AppPhase = "welcome" | "login" | "register" | "vendor" | "technician";
type VendorScreen = "v-home" | "v-customers" | "v-add-customer" | "v-works" | "v-expenses" | "v-bills";
type TechScreen = "t-home" | "t-jobs" | "t-job-detail" | "t-expenses" | "t-billing" | "t-profile";
type AnyScreen = VendorScreen | TechScreen;

interface TechPermissions {
  billing: boolean;
  expenses: boolean;
}

// Default permissions per role demo
const TECH_PERMISSIONS: TechPermissions = { billing: false, expenses: true };

export default function App() {
  const [phase, setPhase] = useState<AppPhase>("welcome");
  const [loginRole, setLoginRole] = useState<"vendor" | "technician">("vendor");
  const [userName, setUserName] = useState("");
  const [screen, setScreen] = useState<AnyScreen>("v-home");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [techPermissions] = useState<TechPermissions>(TECH_PERMISSIONS);

  const navigate = (target: string, data?: any) => {
    if (target === "t-job-detail" && data) setSelectedJob(data);
    setScreen(target as AnyScreen);
  };

  const handleLoginSuccess = (role: "vendor" | "technician", name: string) => {
    setUserName(name);
    if (role === "vendor") {
      setPhase("vendor");
      setScreen("v-home");
    } else {
      setPhase("technician");
      setScreen("t-home");
    }
  };

  const handleLogout = () => {
    setPhase("welcome");
    setUserName("");
    setSelectedJob(null);
  };

  // ── Auth phase ──────────────────────────────────────────────────────────────
  const renderAuth = () => {
    if (phase === "welcome")
      return (
        <AuthWelcome
          onRole={(r) => { setLoginRole(r); setPhase("register"); }}
          onLogin={(r) => { setLoginRole(r); setPhase("login"); }}
        />
      );
    if (phase === "login")
      return (
        <AuthLogin
          role={loginRole}
          onBack={() => setPhase("welcome")}
          onSuccess={handleLoginSuccess}
          onRegister={() => setPhase("register")}
        />
      );
    if (phase === "register")
      return (
        <AuthRegister
          onBack={() => setPhase("welcome")}
          onSuccess={handleLoginSuccess}
        />
      );
    return null;
  };

  // ── Vendor screens ───────────────────────────────────────────────────────────
  const renderVendorScreen = () => {
    switch (screen) {
      case "v-home":      return <VendorDashboard userName={userName} onNavigate={navigate} />;
      case "v-customers": return <Customers onNavigate={navigate} />;
      case "v-add-customer": return <AddCustomer onNavigate={(s) => navigate(s === "customers" ? "v-customers" : s)} />;
      case "v-works":     return <VendorWorks onNavigate={navigate} />;
      case "v-expenses":  return <ExpenseCalculator onNavigate={(s) => navigate(s === "bills" ? "v-bills" : s)} />;
      case "v-bills":     return <Billing onNavigate={navigate} />;
      default:            return <VendorDashboard userName={userName} onNavigate={navigate} />;
    }
  };

  const vendorNav = [
    { id: "v-home",      label: "Home",      icon: Home },
    { id: "v-customers", label: "Customers", icon: Users },
    { id: "v-works",     label: "Works",     icon: Camera },
    { id: "v-expenses",  label: "Expenses",  icon: Calculator },
    { id: "v-bills",     label: "Bills",     icon: FileText },
  ];

  const vendorActiveTab = screen === "v-add-customer" ? "v-customers" : screen;

  // ── Technician screens ───────────────────────────────────────────────────────
  const renderTechScreen = () => {
    switch (screen) {
      case "t-home":
        return (
          <TechDashboard
            userName={userName}
            permissions={techPermissions}
            onNavigate={navigate}
          />
        );
      case "t-jobs":
        return (
          <TechDashboard
            userName={userName}
            permissions={techPermissions}
            onNavigate={navigate}
          />
        );
      case "t-job-detail":
        return (
          <TechJobDetail
            job={selectedJob}
            permissions={techPermissions}
            onBack={() => setScreen("t-home")}
            onNavigate={navigate}
          />
        );
      case "t-expenses":
        return techPermissions.expenses
          ? <ExpenseCalculator onNavigate={(s) => navigate(s === "bills" ? "t-billing" : s)} />
          : <PermissionDenied message="Expense logging not enabled" onBack={() => setScreen("t-home")} />;
      case "t-billing":
        return techPermissions.billing
          ? <Billing onNavigate={navigate} />
          : <PermissionDenied message="Bill generation not enabled" onBack={() => setScreen("t-home")} />;
      case "t-profile":
        return (
          <TechProfile
            userName={userName}
            permissions={techPermissions}
            onLogout={handleLogout}
          />
        );
      default:
        return (
          <TechDashboard
            userName={userName}
            permissions={techPermissions}
            onNavigate={navigate}
          />
        );
    }
  };

  const techNav = [
    { id: "t-home",     label: "Home",     icon: Home },
    { id: "t-jobs",     label: "My Jobs",  icon: Camera },
    { id: "t-expenses", label: "Log",      icon: Calculator },
    { id: "t-billing",  label: "Bills",    icon: FileText },
    { id: "t-profile",  label: "Profile",  icon: User },
  ];

  const techActiveTab = screen === "t-job-detail" ? "t-jobs" : screen;

  // ── Shell ────────────────────────────────────────────────────────────────────
  const isVendor = phase === "vendor";
  const isTech = phase === "technician";
  const isAuth = !isVendor && !isTech;
  const nav = isVendor ? vendorNav : techNav;
  const activeTab = isVendor ? vendorActiveTab : techActiveTab;
  const accentColor = isVendor ? "#0ea5e9" : "#818cf8";
  const accentGrad = isVendor ? "linear-gradient(135deg, #0ea5e9, #06b6d4)" : "linear-gradient(135deg, #4f46e5, #6366f1)";

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#060913" }}
    >
      {/* Phone frame */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: "min(390px, 100vw)",
          height: "min(844px, 100vh)",
          background: "#0d1117",
          borderRadius: "clamp(0px, calc((100vw - 390px) * 9999), 2.5rem)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 40px 100px rgba(0,0,0,0.85)",
        }}
      >
        {/* Status bar */}
        <div
          className="flex items-center justify-between px-6 py-2 flex-shrink-0 z-10"
          style={{ background: "rgba(13,17,23,0.98)" }}
        >
          <span className="text-white" style={{ fontSize: 12, fontWeight: 600 }}>9:41</span>
          <div className="flex items-center gap-1.5">
            {/* Signal bars */}
            <div className="flex items-end gap-0.5">
              {[3, 4, 5, 6].map((h) => (
                <div key={h} className="bg-white rounded-sm" style={{ width: 3, height: h, opacity: 0.9 }} />
              ))}
            </div>
            {/* WiFi */}
            <svg width="15" height="11" viewBox="0 0 15 11" fill="white" opacity="0.9">
              <path d="M7.5 2C9.5 2 11.3 2.8 12.6 4.1L13.8 2.9C12.1 1.1 9.9 0 7.5 0C5.1 0 2.9 1.1 1.2 2.9L2.4 4.1C3.7 2.8 5.5 2 7.5 2Z"/>
              <path d="M7.5 4.5C8.8 4.5 10 5 10.9 5.9L12.1 4.7C10.8 3.4 9.2 2.5 7.5 2.5C5.8 2.5 4.2 3.4 2.9 4.7L4.1 5.9C5 5 6.2 4.5 7.5 4.5Z"/>
              <circle cx="7.5" cy="9.5" r="1.5"/>
            </svg>
            {/* Battery */}
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.35"/>
              <rect x="2" y="2" width="17" height="8" rx="2" fill="white"/>
              <path d="M23 4v4a2 2 0 000-4z" fill="white" fillOpacity="0.4"/>
            </svg>
          </div>
        </div>

        {/* Role header bar — only when logged in */}
        {!isAuth && (
          <div
            className="flex items-center justify-between px-5 py-2.5 flex-shrink-0 z-10"
            style={{
              background: isVendor
                ? "linear-gradient(90deg, rgba(14,165,233,0.12), rgba(6,182,212,0.06))"
                : "linear-gradient(90deg, rgba(79,70,229,0.12), rgba(99,102,241,0.06))",
              borderBottom: `1px solid ${isVendor ? "rgba(14,165,233,0.12)" : "rgba(99,102,241,0.12)"}`,
            }}
          >
            <div className="flex items-center gap-2">
              {isVendor ? (
                <Building2 size={14} className="text-[#0ea5e9]" />
              ) : (
                <HardHat size={14} className="text-indigo-400" />
              )}
              <span style={{ fontSize: 12, fontWeight: 600, color: isVendor ? "#0ea5e9" : "#818cf8" }}>
                {isVendor ? "Vendor Portal" : "Technician Portal"}
              </span>
              <span className="text-[#4b5563]" style={{ fontSize: 12 }}>· {userName}</span>
            </div>
            <button
              className="flex items-center gap-1 active:opacity-70"
              style={{ color: "#4b5563", fontSize: 11 }}
              onClick={handleLogout}
            >
              <LogOut size={12} />
              <span>Logout</span>
            </button>
          </div>
        )}

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isVendor
              ? "radial-gradient(ellipse 70% 22% at 50% 0%, rgba(14,165,233,0.08) 0%, transparent 60%)"
              : isTech
              ? "radial-gradient(ellipse 70% 22% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 60%)"
              : "radial-gradient(ellipse 70% 22% at 50% 0%, rgba(14,165,233,0.06) 0%, transparent 60%)",
          }}
        />

        {/* Main content */}
        <div
          className="flex-1 overflow-hidden relative"
          style={{ paddingBottom: isAuth ? 0 : 80 }}
        >
          {isAuth && renderAuth()}
          {isVendor && renderVendorScreen()}
          {isTech && renderTechScreen()}
        </div>

        {/* Bottom nav — only when logged in */}
        {!isAuth && (
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              background: "rgba(10,14,20,0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderTop: `1px solid ${isVendor ? "rgba(14,165,233,0.1)" : "rgba(99,102,241,0.1)"}`,
              height: 80,
            }}
          >
            <div className="flex items-center justify-around h-full px-2">
              {nav.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                // For technician, check permission-gated tabs
                const isLocked = isTech && (
                  (id === "t-expenses" && !techPermissions.expenses) ||
                  (id === "t-billing" && !techPermissions.billing)
                );
                return (
                  <button
                    key={id}
                    className="flex flex-col items-center gap-1 flex-1 py-2 transition-transform active:scale-90 relative"
                    onClick={() => !isLocked && navigate(id)}
                  >
                    <div
                      className="w-10 h-9 rounded-xl flex items-center justify-center transition-all"
                      style={{
                        background: isActive
                          ? isVendor
                            ? "rgba(14,165,233,0.18)"
                            : "rgba(99,102,241,0.18)"
                          : "transparent",
                      }}
                    >
                      <Icon
                        size={19}
                        style={{ color: isActive ? accentColor : isLocked ? "#2d3748" : "#4b5563" }}
                        strokeWidth={isActive ? 2.5 : 1.8}
                      />
                      {/* Lock dot for gated tabs */}
                      {isLocked && (
                        <div
                          className="absolute top-1 right-3 w-2 h-2 rounded-full"
                          style={{ background: "#374151", border: "1px solid #1f2937" }}
                        />
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? accentColor : isLocked ? "#2d3748" : "#4b5563",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Inline helper components ──────────────────────────────────────────────────

function PermissionDenied({ message, onBack }: { message: string; onBack: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
      >
        <span style={{ fontSize: 28 }}>🔒</span>
      </div>
      <p className="text-white mb-2" style={{ fontWeight: 600, fontSize: 16 }}>Access Restricted</p>
      <p className="text-[#6b7280] mb-6" style={{ fontSize: 14, lineHeight: 1.6 }}>
        {message}. Ask your vendor/company to grant you this permission.
      </p>
      <button
        className="px-6 py-3 rounded-2xl active:scale-95 transition-transform"
        style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)", color: "#9ca3af", fontSize: 14 }}
        onClick={onBack}
      >
        ← Go Back
      </button>
    </div>
  );
}

function TechProfile({
  userName,
  permissions,
  onLogout,
}: {
  userName: string;
  permissions: TechPermissions;
  onLogout: () => void;
}) {
  const items = [
    { label: "Expense Logging", enabled: permissions.expenses },
    { label: "Bill Generation", enabled: permissions.billing },
  ];

  return (
    <div className="flex flex-col h-full px-5 overflow-y-auto">
      <div className="pt-6 pb-4">
        <h1 className="text-white">My Profile</h1>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center py-6 mb-4">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-white mb-3"
          style={{ background: "linear-gradient(135deg, #4f46e5, #6366f1)", fontSize: 30, fontWeight: 700, boxShadow: "0 8px 24px rgba(99,102,241,0.35)" }}
        >
          {userName.charAt(0)}
        </div>
        <p className="text-white" style={{ fontWeight: 700, fontSize: 18 }}>{userName}</p>
        <div
          className="mt-2 px-3 py-1 rounded-full flex items-center gap-1.5"
          style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)" }}
        >
          <HardHat size={12} className="text-indigo-400" />
          <span className="text-indigo-400" style={{ fontSize: 11, fontWeight: 600 }}>Field Technician</span>
        </div>
      </div>

      {/* Permissions */}
      <div
        className="rounded-2xl p-4 mb-4"
        style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p className="text-[#9ca3af] mb-3" style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Access Permissions
        </p>
        {items.map(({ label, enabled }) => (
          <div key={label} className="flex items-center justify-between py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <span className="text-[#9ca3af]" style={{ fontSize: 14 }}>{label}</span>
            <span
              className="px-2.5 py-1 rounded-full"
              style={{
                fontSize: 11, fontWeight: 600,
                background: enabled ? "rgba(16,185,129,0.12)" : "rgba(107,114,128,0.12)",
                color: enabled ? "#10b981" : "#6b7280",
              }}
            >
              {enabled ? "Enabled" : "Disabled"}
            </span>
          </div>
        ))}
      </div>

      <button
        className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform mt-auto mb-4"
        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
        onClick={onLogout}
      >
        <LogOut size={17} className="text-red-400" />
        <span className="text-red-400" style={{ fontWeight: 600, fontSize: 15 }}>Logout</span>
      </button>
    </div>
  );
}
