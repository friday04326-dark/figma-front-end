import { Clock, CheckCircle, MapPin, ChevronRight, HardHat, Camera, AlertCircle } from "lucide-react";

interface TechDashboardProps {
  userName: string;
  permissions: { billing: boolean; expenses: boolean };
  onNavigate: (screen: string, data?: any) => void;
}

const myJobs = [
  {
    id: 1, customer: "Al-Farooq Mart", type: "Camera Installation",
    address: "MG Road, Bengaluru", deadline: "Today, 3 PM", status: "In Progress",
    cameras: 8, hoursLogged: 2.5,
  },
  {
    id: 4, customer: "Metro Garage", type: "Annual Maintenance",
    address: "Sector 18, Noida", deadline: "Jun 5, 2026", status: "Pending",
    cameras: 6, hoursLogged: 0,
  },
];

const statusConfig: Record<string, { color: string; bg: string; border: string; icon: any }> = {
  "Pending": { color: "text-amber-400", bg: "bg-amber-500/15", border: "border-amber-500/25", icon: Clock },
  "In Progress": { color: "text-blue-400", bg: "bg-blue-500/15", border: "border-blue-500/25", icon: AlertCircle },
  "Completed": { color: "text-emerald-400", bg: "bg-emerald-500/15", border: "border-emerald-500/25", icon: CheckCircle },
};

export function TechDashboard({ userName, permissions, onNavigate }: TechDashboardProps) {
  const firstName = userName.split(" ")[0];

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[#6b7280]" style={{ fontSize: 13 }}>Technician Portal</p>
          <div
            className="px-2.5 py-1 rounded-full flex items-center gap-1.5"
            style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)" }}
          >
            <HardHat size={11} className="text-indigo-400" />
            <span className="text-indigo-400" style={{ fontSize: 11, fontWeight: 600 }}>FIELD MODE</span>
          </div>
        </div>
        <h1 className="text-white" style={{ fontSize: 20 }}>Hi, {firstName} 👷</h1>
      </div>

      {/* Stats strip */}
      <div className="px-5 grid grid-cols-3 gap-3 mb-5">
        <div
          className="rounded-2xl p-3.5 flex flex-col gap-1.5"
          style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}
        >
          <p className="text-indigo-400" style={{ fontWeight: 700, fontSize: 20, lineHeight: 1 }}>{myJobs.length}</p>
          <p className="text-[#6b7280]" style={{ fontSize: 10 }}>My Jobs</p>
        </div>
        <div
          className="rounded-2xl p-3.5 flex flex-col gap-1.5"
          style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.2)" }}
        >
          <p className="text-amber-400" style={{ fontWeight: 700, fontSize: 20, lineHeight: 1 }}>1</p>
          <p className="text-[#6b7280]" style={{ fontSize: 10 }}>Today</p>
        </div>
        <div
          className="rounded-2xl p-3.5 flex flex-col gap-1.5"
          style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}
        >
          <p className="text-emerald-400" style={{ fontWeight: 700, fontSize: 20, lineHeight: 1 }}>2.5h</p>
          <p className="text-[#6b7280]" style={{ fontSize: 10 }}>Logged</p>
        </div>
      </div>

      {/* Permissions banner */}
      <div className="px-5 mb-5">
        <div
          className="rounded-2xl p-3.5"
          style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-[#9ca3af] mb-2" style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>Your Access</p>
          <div className="flex gap-2 flex-wrap">
            <span
              className="px-2.5 py-1 rounded-full flex items-center gap-1.5"
              style={{
                fontSize: 11, fontWeight: 500,
                background: permissions.expenses ? "rgba(14,165,233,0.12)" : "rgba(107,114,128,0.1)",
                color: permissions.expenses ? "#0ea5e9" : "#6b7280",
                border: `1px solid ${permissions.expenses ? "rgba(14,165,233,0.2)" : "rgba(107,114,128,0.15)"}`,
              }}
            >
              {permissions.expenses ? <CheckCircle size={10} /> : <Clock size={10} />}
              Expense Log
            </span>
            <span
              className="px-2.5 py-1 rounded-full flex items-center gap-1.5"
              style={{
                fontSize: 11, fontWeight: 500,
                background: permissions.billing ? "rgba(16,185,129,0.12)" : "rgba(107,114,128,0.1)",
                color: permissions.billing ? "#10b981" : "#6b7280",
                border: `1px solid ${permissions.billing ? "rgba(16,185,129,0.2)" : "rgba(107,114,128,0.15)"}`,
              }}
            >
              {permissions.billing ? <CheckCircle size={10} /> : <Clock size={10} />}
              Billing
            </span>
            {!permissions.billing && (
              <span className="text-[#4b5563]" style={{ fontSize: 10, alignSelf: "center" }}>
                · Ask vendor to enable
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Today's Jobs */}
      <div className="px-5 pb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#9ca3af]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>My Assigned Jobs</p>
          <button className="flex items-center gap-1 text-indigo-400" style={{ fontSize: 13 }} onClick={() => onNavigate("t-jobs")}>
            See all <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {myJobs.map((job) => {
            const cfg = statusConfig[job.status];
            const StatusIcon = cfg.icon;
            return (
              <div
                key={job.id}
                className="rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-transform"
                style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
                onClick={() => onNavigate("t-job-detail", job)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/15 flex items-center justify-center flex-shrink-0">
                    <Camera size={16} className="text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white" style={{ fontWeight: 600, fontSize: 14 }}>{job.customer}</p>
                    <p className="text-[#6b7280]" style={{ fontSize: 12 }}>{job.type} · {job.cameras} cams</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.border}`} style={{ fontSize: 10, fontWeight: 500 }}>
                    <StatusIcon size={9} className={cfg.color} />
                    <span className={cfg.color}>{job.status}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={11} className="text-[#4b5563]" />
                    <span className="text-[#9ca3af] truncate" style={{ fontSize: 11, maxWidth: 160 }}>{job.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={11} className="text-[#4b5563]" />
                    <span className="text-[#9ca3af]" style={{ fontSize: 11 }}>{job.hoursLogged}h logged</span>
                  </div>
                </div>

                {/* Open detail hint */}
                <div className="mt-3 flex items-center justify-center gap-1" style={{ color: "#4b5563", fontSize: 11 }}>
                  <span>Tap to log materials & update status</span>
                  <ChevronRight size={11} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
