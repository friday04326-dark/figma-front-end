import { useState } from "react";
import { Plus, Trash2, Calculator, IndianRupee } from "lucide-react";

interface ExpenseCalculatorProps {
  onNavigate: (screen: string, data?: any) => void;
}

interface Component {
  id: number;
  name: string;
  qty: string;
  price: string;
}

export function ExpenseCalculator({ onNavigate }: ExpenseCalculatorProps) {
  const [components, setComponents] = useState<Component[]>([
    { id: 1, name: "2MP Dome Camera", qty: "4", price: "1200" },
    { id: 2, name: "4CH DVR", qty: "1", price: "3500" },
    { id: 3, name: "CCTV Cable (100m)", qty: "2", price: "800" },
  ]);
  const [labor, setLabor] = useState("2000");
  const [nextId, setNextId] = useState(4);

  const addComponent = () => {
    setComponents((prev) => [...prev, { id: nextId, name: "", qty: "1", price: "" }]);
    setNextId((n) => n + 1);
  };

  const removeComponent = (id: number) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
  };

  const updateComponent = (id: number, key: keyof Component, value: string) => {
    setComponents((prev) => prev.map((c) => (c.id === id ? { ...c, [key]: value } : c)));
  };

  const componentTotal = components.reduce((sum, c) => {
    const qty = parseFloat(c.qty) || 0;
    const price = parseFloat(c.price) || 0;
    return sum + qty * price;
  }, 0);

  const laborCharge = parseFloat(labor) || 0;
  const grandTotal = componentTotal + laborCharge;

  const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex-shrink-0">
        <h1 className="text-white">Expense Calculator</h1>
        <p className="text-[#6b7280]" style={{ fontSize: 14 }}>Estimate job cost</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">

        {/* Components Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[#9ca3af]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>Components</p>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl active:scale-95 transition-transform"
              style={{ background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.25)", fontSize: 12, color: "#0ea5e9", fontWeight: 500 }}
              onClick={addComponent}
            >
              <Plus size={12} />
              Add Item
            </button>
          </div>

          {/* Column Headers */}
          <div className="grid gap-2 mb-2 px-1" style={{ gridTemplateColumns: "1fr 52px 80px 32px" }}>
            <span className="text-[#4b5563]" style={{ fontSize: 11 }}>Item</span>
            <span className="text-[#4b5563]" style={{ fontSize: 11 }}>Qty</span>
            <span className="text-[#4b5563]" style={{ fontSize: 11 }}>Price (₹)</span>
            <span />
          </div>

          <div className="flex flex-col gap-2">
            {components.map((comp) => {
              const lineTotal = (parseFloat(comp.qty) || 0) * (parseFloat(comp.price) || 0);
              return (
                <div
                  key={comp.id}
                  className="rounded-2xl p-3"
                  style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="grid gap-2 items-center" style={{ gridTemplateColumns: "1fr 52px 80px 32px" }}>
                    <input
                      type="text"
                      placeholder="Component name"
                      value={comp.name}
                      onChange={(e) => updateComponent(comp.id, "name", e.target.value)}
                      className="text-white placeholder-[#374151] outline-none bg-transparent truncate"
                      style={{ fontSize: 13, fontWeight: 500 }}
                    />
                    <input
                      type="number"
                      min="1"
                      value={comp.qty}
                      onChange={(e) => updateComponent(comp.id, "qty", e.target.value)}
                      className="text-white outline-none rounded-lg px-2 py-1.5 text-center"
                      style={{ fontSize: 13, background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
                    />
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={comp.price}
                      onChange={(e) => updateComponent(comp.id, "price", e.target.value)}
                      className="text-white placeholder-[#374151] outline-none rounded-lg px-2 py-1.5"
                      style={{ fontSize: 13, background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
                    />
                    <button
                      className="w-8 h-8 rounded-lg flex items-center justify-center active:scale-90 transition-transform"
                      style={{ background: "rgba(239,68,68,0.1)" }}
                      onClick={() => removeComponent(comp.id)}
                    >
                      <Trash2 size={13} className="text-red-400" />
                    </button>
                  </div>
                  {lineTotal > 0 && (
                    <p className="text-[#0ea5e9] mt-1 text-right" style={{ fontSize: 11 }}>
                      = {formatINR(lineTotal)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Labor Charge */}
        <div className="mb-5">
          <p className="text-[#9ca3af] mb-3" style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>Labor Charge</p>
          <div
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <IndianRupee size={16} className="text-indigo-400" />
            </div>
            <div className="flex-1">
              <p className="text-[#9ca3af] mb-1" style={{ fontSize: 12 }}>Labor & Miscellaneous</p>
              <div className="flex items-center">
                <span className="text-[#6b7280] mr-1" style={{ fontSize: 16 }}>₹</span>
                <input
                  type="number"
                  min="0"
                  value={labor}
                  onChange={(e) => setLabor(e.target.value)}
                  className="text-white outline-none bg-transparent flex-1"
                  style={{ fontSize: 18, fontWeight: 600 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Totals Summary */}
        <div
          className="rounded-2xl p-5 mb-5"
          style={{
            background: "linear-gradient(135deg, rgba(14,165,233,0.15) 0%, rgba(6,182,212,0.08) 100%)",
            border: "1px solid rgba(14,165,233,0.25)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Calculator size={16} className="text-[#0ea5e9]" />
            <p className="text-[#0ea5e9]" style={{ fontWeight: 600, fontSize: 14 }}>Cost Summary</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[#9ca3af]" style={{ fontSize: 14 }}>Components</span>
              <span className="text-white" style={{ fontWeight: 600, fontSize: 14 }}>{formatINR(componentTotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#9ca3af]" style={{ fontSize: 14 }}>Labor</span>
              <span className="text-white" style={{ fontWeight: 600, fontSize: 14 }}>{formatINR(laborCharge)}</span>
            </div>
            <div
              className="h-px my-1"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />
            <div className="flex items-center justify-between">
              <span className="text-white" style={{ fontWeight: 700, fontSize: 16 }}>Grand Total</span>
              <span style={{ fontWeight: 800, fontSize: 22, background: "linear-gradient(90deg, #0ea5e9, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {formatINR(grandTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Generate Bill Button */}
        <button
          className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
          style={{ background: "linear-gradient(135deg, #0ea5e9, #06b6d4)", boxShadow: "0 4px 24px rgba(14,165,233,0.35)" }}
          onClick={() => onNavigate("bills")}
        >
          <IndianRupee size={18} className="text-white" />
          <span className="text-white" style={{ fontWeight: 600, fontSize: 15 }}>Generate Bill</span>
        </button>
      </div>
    </div>
  );
}
