import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { listLeads, updateLead } from "@/lib/leads.functions";
import {
  CheckCircle2,
  Clock,
  XCircle,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/admin/leads")({
  head: () => ({
    meta: [
      { title: "Lead Back Office — Zombie House Buyers" },
      { name: "description", content: "Internal lead management for Zombie House Buyers." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Lead Back Office — Zombie House Buyers" },
      { property: "og:description", content: "Internal lead management." },
    ],
  }),
  component: AdminLeads,
});

type Lead = {
  id: string;
  address: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  factors: string | null;
  sms_consent: boolean;
  status: string;
  notes: string | null;
  created_at: string;
};

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: ReactNode }> = {
  new: { label: "New", color: "bg-red/10 text-red border-red/20", icon: <Clock className="w-3 h-3" /> },
  contacted: { label: "Contacted", color: "bg-blue-50 text-blue-700 border-blue-200", icon: <Phone className="w-3 h-3" /> },
  offer_sent: { label: "Offer Sent", color: "bg-yellow-50 text-yellow-700 border-yellow-200", icon: <Mail className="w-3 h-3" /> },
  closed: { label: "Closed", color: "bg-green-50 text-green-700 border-green-200", icon: <CheckCircle2 className="w-3 h-3" /> },
  dead: { label: "Dead", color: "bg-gray-100 text-gray-500 border-gray-200", icon: <XCircle className="w-3 h-3" /> },
};

function AdminLeads() {
  const [pin, setPin] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [noteText, setNoteText] = useState("");

  const fetchLeads = async (usePin = pin) => {
    setLoading(true);
    try {
      const rows = (await listLeads({ data: { pin: usePin } })) as Lead[];
      setLeads(rows);
      setAuthed(true);
      setError("");
    } catch {
      setError("Incorrect PIN or unable to load leads.");
    }
    setLoading(false);
  };

  const setStatus = async (id: string, status: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
    await updateLead({ data: { pin, id, status } });
  };

  const saveNote = async (id: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes: noteText } : l)));
    setSelected((s) => (s && s.id === id ? { ...s, notes: noteText } : s));
    await updateLead({ data: { pin, id, notes: noteText } });
  };

  const filtered = filter === "all" ? leads : leads.filter((l) => l.status === filter);

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-4">
        <div className="bg-white rounded-[20px] p-10 w-full max-w-sm shadow-2xl text-center">
          <h1 className="font-display text-2xl mb-1">Zombie Houses</h1>
          <p className="text-muted-foreground text-sm mb-6">Lead Back Office</p>
          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchLeads()}
            className="w-full rounded-xl border border-mid px-4 py-3 text-center text-lg tracking-widest mb-4 focus:outline-none focus:border-[#0e0e0e]"
          />
          {error && <p className="text-red text-xs mb-3">{error}</p>}
          <button
            onClick={() => fetchLeads()}
            disabled={loading || !pin}
            className="w-full rounded-lg bg-[#0e0e0e] text-white py-3 font-bold text-sm hover:bg-black transition disabled:opacity-50"
          >
            {loading ? "Checking..." : "Enter"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <div className="bg-[#0e0e0e] text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl">Zombie House Buyers</h1>
          <p className="text-white/50 text-xs">Lead Back Office</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/50 text-sm">{leads.length} total leads</span>
          <button
            onClick={() => fetchLeads()}
            className="text-xs text-white/50 hover:text-white transition border border-white/20 px-3 py-1.5 rounded-lg"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-64px)]">
        <div className="lg:w-[400px] shrink-0 border-r border-mid bg-white flex flex-col">
          <div className="flex gap-1 p-3 border-b border-mid overflow-x-auto">
            {["all", "new", "contacted", "offer_sent", "closed", "dead"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  filter === f ? "bg-[#0e0e0e] text-white" : "text-muted-foreground hover:bg-off"
                }`}
              >
                {f === "all"
                  ? `All (${leads.length})`
                  : `${STATUS_CONFIG[f]?.label} (${leads.filter((l) => l.status === f).length})`}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading && <p className="p-6 text-sm text-muted-foreground">Loading...</p>}
            {!loading && filtered.length === 0 && (
              <p className="p-6 text-sm text-muted-foreground">No leads yet.</p>
            )}
            {filtered.map((lead) => {
              const cfg = STATUS_CONFIG[lead.status] ?? STATUS_CONFIG.new;
              return (
                <button
                  key={lead.id}
                  onClick={() => {
                    setSelected(lead);
                    setNoteText(lead.notes ?? "");
                  }}
                  className={`w-full text-left px-5 py-4 border-b border-mid hover:bg-off transition ${
                    selected?.id === lead.id ? "bg-off" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">
                        {lead.first_name} {lead.last_name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{lead.address}</p>
                    </div>
                    <span
                      className={`shrink-0 inline-flex items-center gap-1 text-[0.6rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg border ${cfg.color}`}
                    >
                      {cfg.icon} {cfg.label}
                    </span>
                  </div>
                  <p className="text-[0.65rem] text-muted-foreground mt-1.5">
                    {new Date(lead.created_at).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {selected ? (
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-2xl">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-display text-2xl">
                    {selected.first_name} {selected.last_name}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    {new Date(selected.created_at).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <select
                  value={selected.status}
                  onChange={(e) => setStatus(selected.id, e.target.value)}
                  className="rounded-xl border border-mid px-3 py-2 text-sm font-semibold bg-white focus:outline-none focus:border-[#0e0e0e] cursor-pointer"
                >
                  {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
                    <option key={val} value={val}>
                      {cfg.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-[18px] border border-mid bg-white p-6 mb-4">
                <h3 className="font-bold text-sm mb-4">Contact Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-sm">{selected.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                    <a href={`tel:${selected.phone}`} className="text-sm font-medium hover:underline">
                      {selected.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                    <a href={`mailto:${selected.email}`} className="text-sm font-medium hover:underline">
                      {selected.email}
                    </a>
                  </div>
                  {selected.sms_consent && (
                    <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                      <CheckCircle2 className="w-3 h-3" /> SMS consent given
                    </div>
                  )}
                </div>
              </div>

              {selected.factors && (
                <div className="rounded-[18px] border border-mid bg-white p-6 mb-4">
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Their Situation
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.factors}</p>
                </div>
              )}

              <div className="rounded-[18px] border border-mid bg-white p-6">
                <h3 className="font-bold text-sm mb-3">Your Notes</h3>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add notes about this lead..."
                  className="w-full rounded-xl border border-mid px-4 py-3 text-sm resize-none h-28 focus:outline-none focus:border-[#0e0e0e]"
                />
                <button
                  onClick={() => saveNote(selected.id)}
                  className="mt-3 rounded-lg bg-[#0e0e0e] text-white px-5 py-2.5 text-sm font-bold hover:bg-black transition"
                >
                  Save Notes
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={`tel:${selected.phone}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-red text-white px-5 py-2.5 text-sm font-bold hover:bg-[#b81830] transition"
                >
                  <Phone className="w-4 h-4" /> Call Now
                </a>
                <a
                  href={`mailto:${selected.email}?subject=Your Cash Offer — Zombie House Buyers`}
                  className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-[#0e0e0e] px-5 py-2.5 text-sm font-bold hover:bg-[#0e0e0e] hover:text-white transition"
                >
                  <Mail className="w-4 h-4" /> Send Email
                </a>
                <button
                  onClick={() => setStatus(selected.id, "contacted")}
                  className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-mid px-5 py-2.5 text-sm font-bold hover:border-[#0e0e0e] transition"
                >
                  Mark Contacted
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground py-20">
            <p className="text-sm">Select a lead to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
