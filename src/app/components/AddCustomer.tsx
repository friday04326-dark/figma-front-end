import { useState } from "react";
import { ArrowLeft, User, Phone, MapPin, Camera, FileText, Check } from "lucide-react";

interface AddCustomerProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function AddCustomer({ onNavigate }: AddCustomerProps) {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    siteDetails: "",
    notes: "",
  });

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      onNavigate("customers");
    }, 1200);
  };

  const isValid = form.name.trim() && form.phone.trim() && form.address.trim();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-4 flex-shrink-0">
        <button
          className="w-10 h-10 rounded-xl flex items-center justify-center active:scale-90 transition-transform"
          style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}
          onClick={() => onNavigate("customers")}
        >
          <ArrowLeft size={18} className="text-white" />
        </button>
        <div>
          <h1 className="text-white">Add Customer</h1>
          <p className="text-[#6b7280]" style={{ fontSize: 13 }}>Fill in customer details</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="flex flex-col gap-4">

          {/* Name */}
          <div>
            <label className="block text-[#9ca3af] mb-2" style={{ fontSize: 13 }}>Customer Name *</label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4b5563]" />
              <input
                type="text"
                placeholder="e.g. Al-Farooq Mart"
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
              <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4b5563]" />
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

          {/* Address */}
          <div>
            <label className="block text-[#9ca3af] mb-2" style={{ fontSize: 13 }}>Site Address *</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-4 top-4 text-[#4b5563]" />
              <textarea
                placeholder="Full address of the site"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                rows={2}
                className="w-full pl-11 pr-4 py-4 rounded-2xl text-white placeholder-[#374151] outline-none resize-none"
                style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 14 }}
              />
            </div>
          </div>

          {/* Site Details */}
          <div>
            <label className="block text-[#9ca3af] mb-2" style={{ fontSize: 13 }}>Site Details</label>
            <div className="relative">
              <Camera size={16} className="absolute left-4 top-4 text-[#4b5563]" />
              <textarea
                placeholder="e.g. 8 cameras, 1 DVR, 500m cable"
                value={form.siteDetails}
                onChange={(e) => update("siteDetails", e.target.value)}
                rows={2}
                className="w-full pl-11 pr-4 py-4 rounded-2xl text-white placeholder-[#374151] outline-none resize-none"
                style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 14 }}
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[#9ca3af] mb-2" style={{ fontSize: 13 }}>Notes</label>
            <div className="relative">
              <FileText size={16} className="absolute left-4 top-4 text-[#4b5563]" />
              <textarea
                placeholder="Any special instructions or notes"
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                rows={3}
                className="w-full pl-11 pr-4 py-4 rounded-2xl text-white placeholder-[#374151] outline-none resize-none"
                style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 14 }}
              />
            </div>
          </div>

          {/* Required hint */}
          <p className="text-[#4b5563]" style={{ fontSize: 12 }}>* Required fields</p>

          {/* Save Button */}
          <button
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
            style={{
              background: isValid
                ? "linear-gradient(135deg, #0ea5e9, #06b6d4)"
                : "rgba(30,41,59,0.6)",
              opacity: isValid ? 1 : 0.5,
              boxShadow: isValid ? "0 4px 24px rgba(14,165,233,0.35)" : "none",
            }}
            onClick={handleSave}
            disabled={!isValid}
          >
            {saved ? (
              <>
                <Check size={18} className="text-white" />
                <span className="text-white" style={{ fontWeight: 600, fontSize: 15 }}>Saved!</span>
              </>
            ) : (
              <span className="text-white" style={{ fontWeight: 600, fontSize: 15 }}>Save Customer</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
