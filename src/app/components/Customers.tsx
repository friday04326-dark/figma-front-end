import { useState } from "react";
import { Search, Plus, Phone, MapPin, ChevronRight, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface CustomersProps {
  onNavigate: (screen: string, data?: any) => void;
}

const customers = [
  { id: 1, name: "Al-Farooq Mart", phone: "+91 98765 43210", address: "MG Road, Bengaluru", status: "Active", cameras: 8 },
  { id: 2, name: "Ravi Steel Works", phone: "+91 87654 32109", address: "Industrial Area, Pune", status: "Pending", cameras: 4 },
  { id: 3, name: "City Pharmacy", phone: "+91 76543 21098", address: "Park Street, Kolkata", status: "Active", cameras: 2 },
  { id: 4, name: "Green Valley Hotel", phone: "+91 65432 10987", address: "Linking Road, Mumbai", status: "Maintenance", cameras: 16 },
  { id: 5, name: "Sunrise School", phone: "+91 54321 09876", address: "Anna Salai, Chennai", status: "Active", cameras: 12 },
  { id: 6, name: "Metro Garage", phone: "+91 43210 98765", address: "Sector 18, Noida", status: "Pending", cameras: 6 },
];

const statusConfig: Record<string, { icon: any; color: string; bg: string; border: string }> = {
  "Active": { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/15", border: "border-emerald-500/25" },
  "Pending": { icon: Clock, color: "text-amber-400", bg: "bg-amber-500/15", border: "border-amber-500/25" },
  "Maintenance": { icon: AlertCircle, color: "text-blue-400", bg: "bg-blue-500/15", border: "border-blue-500/25" },
};

export function Customers({ onNavigate }: CustomersProps) {
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex-shrink-0">
        <h1 className="text-white">Customers</h1>
        <p className="text-[#6b7280]" style={{ fontSize: 14 }}>{customers.length} total customers</p>
      </div>

      {/* Search */}
      <div className="px-5 mb-4 flex-shrink-0">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4b5563]" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-white placeholder-[#4b5563] outline-none"
            style={{
              background: "rgba(30,41,59,0.8)",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: 14,
            }}
          />
        </div>
      </div>

      {/* Customer List */}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="flex flex-col gap-3">
          {filtered.map((customer) => {
            const cfg = statusConfig[customer.status];
            const StatusIcon = cfg.icon;
            return (
              <div
                key={customer.id}
                className="rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-transform"
                style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
                onClick={() => onNavigate("customer-detail", customer)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #0ea5e9, #06b6d4)", fontSize: 16, fontWeight: 700 }}
                    >
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white" style={{ fontWeight: 600, fontSize: 15 }}>{customer.name}</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border mt-1 ${cfg.bg} ${cfg.border}`} style={{ fontSize: 11 }}>
                        <StatusIcon size={10} className={cfg.color} />
                        <span className={cfg.color} style={{ fontWeight: 500 }}>{customer.status}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#0ea5e9]" style={{ fontWeight: 700, fontSize: 15 }}>{customer.cameras}</p>
                    <p className="text-[#4b5563]" style={{ fontSize: 11 }}>cameras</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-[#4b5563] flex-shrink-0" />
                    <span className="text-[#9ca3af]" style={{ fontSize: 13 }}>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-[#4b5563] flex-shrink-0" />
                    <span className="text-[#9ca3af] truncate" style={{ fontSize: 13 }}>{customer.address}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-[#1e293b] flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-[#4b5563]" />
              </div>
              <p className="text-[#6b7280]">No customers found</p>
            </div>
          )}
        </div>
      </div>

      {/* FAB */}
      <button
        className="absolute bottom-24 right-5 w-14 h-14 rounded-2xl flex items-center justify-center active:scale-90 transition-transform z-10"
        style={{ background: "linear-gradient(135deg, #0ea5e9, #06b6d4)", boxShadow: "0 4px 24px rgba(14,165,233,0.45)" }}
        onClick={() => onNavigate("v-add-customer")}
      >
        <Plus size={24} className="text-white" />
      </button>
    </div>
  );
}
