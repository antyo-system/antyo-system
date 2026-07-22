"use client";

import { useState, useEffect } from "react";
import { getContacts, addContact } from "@/app/lib/storage";
import { Contact } from "@/app/lib/types";
import { Users, UserPlus, Heart, MessageSquare, Shield, Clock } from "lucide-react";

export default function RelationshipPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showModal, setShowModal] = useState(false);

  // New Contact State
  const [name, setName] = useState("");
  const [tier, setTier] = useState<Contact["tier"]>("inner_circle");
  const [role, setRole] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setContacts(getContacts());
  }, []);

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const created = addContact({
      name,
      tier,
      role: role || "Network Connection",
      lastContactDate: new Date().toISOString().slice(0, 10),
      healthStatus: "healthy",
      notes,
    });

    setContacts([created, ...contacts]);
    setName("");
    setRole("");
    setNotes("");
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Relationship & Social Network OS
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Nurturing inner-circle connections, mentor touchpoints, and meaningful relationships.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-purple-700"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add Connection</span>
        </button>
      </div>

      {/* Network Tier Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs font-semibold text-zinc-500">Inner Circle</span>
          <div className="mt-2 text-2xl font-extrabold text-purple-600 dark:text-purple-400">
            {contacts.filter((c) => c.tier === "inner_circle").length} Connections
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs font-semibold text-zinc-500">Mentors & Advisors</span>
          <div className="mt-2 text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {contacts.filter((c) => c.tier === "mentor").length} Connections
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs font-semibold text-zinc-500">Close Friends & Network</span>
          <div className="mt-2 text-2xl font-extrabold text-blue-600 dark:text-blue-400">
            {contacts.filter((c) => c.tier === "close_friend" || c.tier === "network").length} Connections
          </div>
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.map((c) => (
          <div
            key={c.id}
            className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-sm font-bold text-white shadow-md">
                    {c.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {c.name}
                    </h3>
                    <span className="text-[11px] text-zinc-500">{c.role}</span>
                  </div>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${
                    c.healthStatus === "healthy"
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
                      : "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400"
                  }`}
                >
                  {c.healthStatus}
                </span>
              </div>

              {c.notes && (
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  "{c.notes}"
                </p>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-[11px] text-zinc-500 dark:border-zinc-800">
              <span className="font-semibold capitalize text-purple-600 dark:text-purple-400">
                {c.tier.replace("_", " ")}
              </span>
              <span>Last Touchpoint: {c.lastContactDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <form
            onSubmit={handleCreateContact}
            className="w-full max-w-md space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Add Network Connection
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Role / Context
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Design Lead or Investment Mentor"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Relationship Tier
              </label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as any)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              >
                <option value="inner_circle">Inner Circle</option>
                <option value="close_friend">Close Friend</option>
                <option value="mentor">Mentor / Advisor</option>
                <option value="network">Professional Network</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Touchpoint Notes (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Monthly catchup call scheduled"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-700"
              >
                Save Connection
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
