import { useState } from "react";
import { FileText, Download, Share2, Check, Camera, Wrench, IndianRupee } from "lucide-react";

interface BillingProps {
  onNavigate: (screen: string, data?: any) => void;
}

const bills = [
  {
    id: "INV-2026-041",
    customer: "Al-Farooq Mart",
    phone: "+91 98765 43210",
    address: "MG Road, Bengaluru",
    date: "27 May 2026",
    items: [
      { name: "2MP Dome Camera", qty: 8, price: 1200 },
      { name: "8CH DVR", qty: 1, price: 6500 },
      { name: "CCTV Cable (500m)", qty: 1, price: 3200 },
      { name: "Power Supply Unit", qty: 2, price: 450 },
    ],
    labor: 3500,
    status: "Paid",
  },
  {
    id: "INV-2026-040",
    customer: "City Pharmacy",
    phone: "+91 76543 21098",
    address: "Park Street, Kolkata",
    date: "24 May 2026",
    items: [
      { name: "2MP Bullet Camera", qty: 2, price: 1100 },
      { name: "4CH DVR", qty: 1, price: 3500 },
      { name: "CCTV Cable (100m)", qty: 1, price: 800 },
    ],
    labor: 1500,
    status: "Pending",
  },
];

export function Billing({ onNavigate }: BillingProps) {
  const [selectedBill, setSelectedBill] = useState<typeof bills[0] | null>(null);
  const [generated, setGenerated] = useState(false);

  const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  if (selectedBill) {
    const itemsTotal = selectedBill.items.reduce((s, i) => s + i.qty * i.price, 0);
    const grandTotal = itemsTotal + selectedBill.labor;

    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-5 pt-6 pb-4 flex items-center gap-3 flex-shrink-0">
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center active:scale-90 transition-transform"
            style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}
            onClick={() => { setSelectedBill(null); setGenerated(false); }}
          >
            <span className="text-white" style={{ fontSize: 18 }}>←</span>
          </button>
          <div>
            <h1 className="text-white">Invoice</h1>
            <p className="text-[#6b7280]" style={{ fontSize: 13 }}>{selectedBill.id}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-6">
          {/* Invoice Card */}
          <div
            className="rounded-3xl overflow-hidden mb-4"
            style={{ background: "rgba(15,23,42,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Invoice Header Gradient */}
            <div className="px-5 py-5" style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(6,182,212,0.1))" }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0ea5e9] flex items-center justify-center">
                      <Camera size={16} className="text-white" />
                    </div>
                    <span className="text-white" style={{ fontWeight: 700, fontSize: 15 }}>CCTV Manager</span>
                  </div>
                  <p className="text-[#0ea5e9]" style={{ fontWeight: 600, fontSize: 13 }}>{selectedBill.id}</p>
                  <p className="text-[#6b7280]" style={{ fontSize: 12 }}>{selectedBill.date}</p>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium ${selectedBill.status === "Paid" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"}`}
                >
                  {selectedBill.status}
                </span>
              </div>
            </div>

            <div className="px-5 py-4">
              {/* Customer Info */}
              <div className="mb-4 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-[#4b5563] mb-2" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>Bill To</p>
                <p className="text-white" style={{ fontWeight: 600, fontSize: 15 }}>{selectedBill.customer}</p>
                <p className="text-[#6b7280]" style={{ fontSize: 13 }}>{selectedBill.phone}</p>
                <p className="text-[#6b7280]" style={{ fontSize: 13 }}>{selectedBill.address}</p>
              </div>

              {/* Items */}
              <div className="mb-4 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-[#4b5563] mb-3" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>Items</p>
                <div className="flex flex-col gap-2.5">
                  {selectedBill.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex-1 min-w-0 pr-2">
                        <p className="text-white truncate" style={{ fontSize: 13, fontWeight: 500 }}>{item.name}</p>
                        <p className="text-[#4b5563]" style={{ fontSize: 11 }}>{item.qty} × {formatINR(item.price)}</p>
                      </div>
                      <span className="text-[#9ca3af]" style={{ fontSize: 13, fontWeight: 500 }}>{formatINR(item.qty * item.price)}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5">
                      <Wrench size={12} className="text-[#4b5563]" />
                      <p className="text-[#9ca3af]" style={{ fontSize: 13 }}>Labor Charge</p>
                    </div>
                    <span className="text-[#9ca3af]" style={{ fontSize: 13, fontWeight: 500 }}>{formatINR(selectedBill.labor)}</span>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-white" style={{ fontWeight: 700, fontSize: 16 }}>Total Amount</span>
                <span style={{ fontWeight: 800, fontSize: 22, background: "linear-gradient(90deg, #0ea5e9, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {formatINR(grandTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <button
              className="py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
              style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Download size={16} className="text-[#9ca3af]" />
              <span className="text-[#9ca3af]" style={{ fontWeight: 500, fontSize: 14 }}>Download</span>
            </button>
            <button
              className="py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
              style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Share2 size={16} className="text-[#9ca3af]" />
              <span className="text-[#9ca3af]" style={{ fontWeight: 500, fontSize: 14 }}>Share</span>
            </button>
          </div>

          <button
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
            style={{ background: "linear-gradient(135deg, #0ea5e9, #06b6d4)", boxShadow: "0 4px 24px rgba(14,165,233,0.35)" }}
            onClick={() => { setGenerated(true); }}
          >
            {generated ? (
              <><Check size={18} className="text-white" /><span className="text-white" style={{ fontWeight: 600, fontSize: 15 }}>Bill Sent!</span></>
            ) : (
              <><IndianRupee size={18} className="text-white" /><span className="text-white" style={{ fontWeight: 600, fontSize: 15 }}>Send to Customer</span></>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex-shrink-0">
        <h1 className="text-white">Billing</h1>
        <p className="text-[#6b7280]" style={{ fontSize: 14 }}>{bills.length} invoices</p>
      </div>

      {/* Summary */}
      <div className="px-5 mb-5 flex-shrink-0">
        <div
          className="rounded-2xl p-4 flex items-center justify-between"
          style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.15), rgba(6,182,212,0.08))", border: "1px solid rgba(14,165,233,0.2)" }}
        >
          <div>
            <p className="text-[#9ca3af]" style={{ fontSize: 13 }}>Total Billed</p>
            <p className="text-white" style={{ fontWeight: 700, fontSize: 20 }}>₹38,450</p>
          </div>
          <div className="text-right">
            <p className="text-[#9ca3af]" style={{ fontSize: 13 }}>Pending</p>
            <p className="text-amber-400" style={{ fontWeight: 700, fontSize: 20 }}>₹7,950</p>
          </div>
          <div className="text-right">
            <p className="text-[#9ca3af]" style={{ fontSize: 13 }}>Paid</p>
            <p className="text-emerald-400" style={{ fontWeight: 700, fontSize: 20 }}>₹30,500</p>
          </div>
        </div>
      </div>

      {/* Bills List */}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <p className="text-[#9ca3af] mb-3" style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>Recent Invoices</p>
        <div className="flex flex-col gap-3">
          {bills.map((bill) => {
            const total = bill.items.reduce((s, i) => s + i.qty * i.price, 0) + bill.labor;
            return (
              <div
                key={bill.id}
                className="rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-transform"
                style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
                onClick={() => setSelectedBill(bill)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0ea5e9]/10 flex items-center justify-center">
                      <FileText size={18} className="text-[#0ea5e9]" />
                    </div>
                    <div>
                      <p className="text-white" style={{ fontWeight: 600, fontSize: 14 }}>{bill.customer}</p>
                      <p className="text-[#4b5563]" style={{ fontSize: 12 }}>{bill.id} · {bill.date}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-xl text-xs font-medium ${bill.status === "Paid" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25" : "bg-amber-500/15 text-amber-400 border border-amber-500/25"}`}
                  >
                    {bill.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6b7280]" style={{ fontSize: 13 }}>{bill.items.length} items + labor</span>
                  <span className="text-white" style={{ fontWeight: 700, fontSize: 16 }}>{formatINR(total)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* New Invoice FAB */}
      <button
        className="absolute bottom-24 right-5 w-14 h-14 rounded-2xl flex items-center justify-center active:scale-90 transition-transform z-10"
        style={{ background: "linear-gradient(135deg, #0ea5e9, #06b6d4)", boxShadow: "0 4px 24px rgba(14,165,233,0.45)" }}
        onClick={() => onNavigate("expenses")}
      >
        <FileText size={22} className="text-white" />
      </button>
    </div>
  );
}
