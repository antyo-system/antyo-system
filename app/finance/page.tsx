"use client";

import { useState, useEffect } from "react";
import { getTransactions, addTransaction } from "@/app/lib/storage";
import { Transaction } from "@/app/lib/types";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  PieChart,
  Tag,
} from "lucide-react";

export default function FinancePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");

  // New Transaction Form State
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState<Transaction["category"]>("needs");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setTransactions(getTransactions());
  }, []);

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;

    const created = addTransaction({
      title,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().slice(0, 10),
      notes,
    });

    setTransactions([created, ...transactions]);
    setTitle("");
    setAmount("");
    setNotes("");
    setShowModal(false);
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netCashflow = totalIncome - totalExpense;

  const filteredTx = transactions.filter((t) => {
    if (filter === "income") return t.type === "income";
    if (filter === "expense") return t.type === "expense";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Finance & Wealth OS
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Cashflow management, monthly budget allocations, and net worth tracking.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4" />
          <span>Record Transaction</span>
        </button>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Net Cashflow */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Monthly Net Cashflow
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            Rp {netCashflow.toLocaleString("id-ID")}
          </div>
          <span className="mt-1 block text-[11px] text-zinc-500">Income minus Expenses</span>
        </div>

        {/* Total Income */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Total Inflow (Income)
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <ArrowDownRight className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-extrabold text-blue-600 dark:text-blue-400">
            Rp {totalIncome.toLocaleString("id-ID")}
          </div>
          <span className="mt-1 block text-[11px] text-zinc-500">Active & Passive earnings</span>
        </div>

        {/* Total Expense */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Total Outflow (Expenses)
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-extrabold text-rose-600 dark:text-rose-400">
            Rp {totalExpense.toLocaleString("id-ID")}
          </div>
          <span className="mt-1 block text-[11px] text-zinc-500">Needs, Wants & Investments</span>
        </div>

        {/* Savings & Investments Ratio */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Investment Rate
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
              <PieChart className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-extrabold text-purple-600 dark:text-purple-400">
            {totalIncome > 0
              ? `${Math.round(
                  (transactions
                    .filter((t) => t.category === "investment" || t.category === "savings")
                    .reduce((sum, t) => sum + t.amount, 0) /
                    totalIncome) *
                    100
                )}%`
              : "0%"}
          </div>
          <span className="mt-1 block text-[11px] text-zinc-500">Savings & Assets allocation</span>
        </div>
      </div>

      {/* Transactions Feed Section */}
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col justify-between gap-4 pb-4 border-b border-zinc-100 sm:flex-row sm:items-center dark:border-zinc-800">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Financial Ledger & History
          </h2>

          <div className="flex items-center gap-2">
            {(["all", "income", "expense"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  filter === f
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {filteredTx.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 transition-all hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-zinc-700"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold text-xs ${
                    tx.type === "income"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"}
                </div>

                <div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {tx.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="rounded-md bg-zinc-200 px-2 py-0.5 text-[10px] font-semibold uppercase text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {tx.category}
                    </span>
                    <span className="text-[10px] text-zinc-400">{tx.date}</span>
                    {tx.notes && <span className="text-[10px] text-zinc-500">({tx.notes})</span>}
                  </div>
                </div>
              </div>

              <div
                className={`text-sm font-extrabold ${
                  tx.type === "income"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-zinc-900 dark:text-zinc-100"
                }`}
              >
                {tx.type === "income" ? "+" : "-"} Rp {tx.amount.toLocaleString("id-ID")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <form
            onSubmit={handleCreateTransaction}
            className="w-full max-w-md space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Record New Transaction
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType("expense")}
                className={`rounded-xl p-2.5 text-xs font-bold transition-all ${
                  type === "expense"
                    ? "bg-rose-600 text-white"
                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                }`}
              >
                Expense (-)
              </button>
              <button
                type="button"
                onClick={() => setType("income")}
                className={`rounded-xl p-2.5 text-xs font-bold transition-all ${
                  type === "income"
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                }`}
              >
                Income (+)
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Transaction Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. SaaS Client Payment or Cloud Servers"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Amount (IDR)
              </label>
              <input
                type="number"
                required
                min="1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 500000"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              >
                <option value="needs">Needs (Fixed & Utilities)</option>
                <option value="wants">Wants (Lifestyle & Gear)</option>
                <option value="savings">Savings / Reserve</option>
                <option value="investment">Investment & Assets</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Notes (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Invoice #204"
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
                className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
              >
                Save Record
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
