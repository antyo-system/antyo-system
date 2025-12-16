export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* ====== Top Bar ====== */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/10 ring-1 ring-white/10" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide">ANTYO SYSTEM</div>
              <div className="text-xs text-white/60">Autonomous Life Optimization Platform</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a className="hover:text-white" href="#problem">Problem</a>
            <a className="hover:text-white" href="#solution">Solution</a>
            <a className="hover:text-white" href="#how">How it works</a>
            <a className="hover:text-white" href="#trust">Trust</a>
            <a className="hover:text-white" href="#roadmap">Roadmap</a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#cta"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </header>

      {/* ====== HERO (Step 1: The Promise) ====== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-[-180px] top-[120px] h-[420px] w-[420px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute left-[-180px] top-[260px] h-[420px] w-[420px] rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-16 pt-16 md:pt-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
            <span className="h-2 w-2 rounded-full bg-white/50" />
            Life Operating System • AI + Gamification • Local-first mindset
          </div>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            A Life OS to optimize{" "}
            <span className="text-white/70">
              time, money, health, relationships, and story
            </span>{" "}
            — guided by AI.
          </h1>

          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/70 md:text-lg">
            ANTYO System helps you turn daily life into a clear feedback loop:
            collect signals (only what you allow), unify your state, get guidance,
            and execute with a game-like system that keeps you consistent.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row" id="cta">
            <a
              href="#waitlist"
              className="rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-black hover:bg-white/90"
            >
              Join Waitlist
            </a>
            <a
              href="#how"
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-white/10"
            >
              See how it works
            </a>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <StatCard title="5 Life Systems" desc="Time • Finance • Health • Relationships • Story" />
            <StatCard title="2 AI Companions" desc="Azul (strategy) • Azel (sustainability)" />
            <StatCard title="Trust-first" desc="Transparent control + Sabbath Mode switch" />
          </div>
        </div>
      </section>

      {/* ====== Step 2: The Problem ====== */}
      <section id="problem" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <div className="text-xs font-semibold tracking-widest text-white/50">STEP 2 — THE PROBLEM</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Modern life is managed across disconnected apps.
              </h2>
              <p className="mt-4 text-white/70">
                Your calendar, finance tracker, notes, fitness app, and chats are
                separate. That creates scattered data, low self-awareness, and
                no real optimization loop.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-sm font-semibold text-white">Symptoms you feel</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li>• You track a lot, but still feel “stuck”.</li>
                <li>• Goals are vague, progress is invisible.</li>
                <li>• Motivation spikes → then collapses.</li>
                <li>• No single place that reflects your real state.</li>
                <li>• Systems feel like surveillance, not support.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Step 3: The Solution ====== */}
      <section id="solution" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <div className="text-xs font-semibold tracking-widest text-white/50">STEP 3 — THE SOLUTION</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                One unified system — five domains — one feedback loop.
              </h2>
              <p className="mt-4 text-white/70">
                ANTYO turns life into an integrated loop: <span className="text-white">Signal → State → Guidance → Action</span>.
                You decide what is collected and analyzed.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Pill title="Time" desc="Focus, planning, execution" />
                <Pill title="Finance" desc="Spending, saving, runway" />
                <Pill title="Health" desc="Sleep, movement, energy" />
                <Pill title="Relationships" desc="Rhythm, care, conflict" />
                <Pill title="Story" desc="Identity, reflection, meaning" />
                <Pill title="Gamification" desc="XP, quests, streaks, rewards" />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-sm font-semibold text-white">Two companions, two modes</h3>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">Azul</div>
                    <div className="text-xs text-white/60">Strategy & Optimization</div>
                  </div>
                  <p className="mt-2 text-sm text-white/70">
                    Helps you set constraints, prioritize, and build systems that scale.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">Azel</div>
                    <div className="text-xs text-white/60">Emotion & Sustainability</div>
                  </div>
                  <p className="mt-2 text-sm text-white/70">
                    Keeps you human: pacing, recovery, emotional clarity, and long-run consistency.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="text-xs font-semibold tracking-widest text-white/60">Simple promise</div>
                  <p className="mt-2 text-sm text-white/70">
                    <span className="text-white">Not more tracking.</span> A clearer loop that helps you act—without feeling watched.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Step 4: How It Works (Simple) ====== */}
      <section id="how" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="text-xs font-semibold tracking-widest text-white/50">STEP 4 — HOW IT WORKS</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Fast loop, minimal friction.
          </h2>
          <p className="mt-4 max-w-3xl text-white/70">
            The goal is speed: capture signal quickly, compute a single “user state”, then output the next best action.
            Automation is optional and always permission-based.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-sm font-semibold text-white">The loop (5 blocks)</h3>
              <ol className="mt-4 space-y-3 text-sm text-white/70">
                <li><span className="text-white">1) Capture</span> — small signals from the domains you enable.</li>
                <li><span className="text-white">2) Unify</span> — build a single user state (one source of truth).</li>
                <li><span className="text-white">3) Interpret</span> — Azul & Azel generate insight and guidance.</li>
                <li><span className="text-white">4) Execute</span> — quests + missions that drive action.</li>
                <li><span className="text-white">5) Adapt</span> — update the state based on outcomes (feedback).</li>
              </ol>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-sm font-semibold text-white">Rough system diagram</h3>
              <p className="mt-2 text-sm text-white/60">
                (This is the “fast & automatable” architecture at a glance.)
              </p>

              <pre className="mt-4 overflow-auto rounded-xl border border-white/10 bg-black/50 p-4 text-xs leading-relaxed text-white/80">
{String.raw`USER ACTIONS
   │
   ▼
SIGNALS (opt-in)
(Time / Finance / Health / Relationships / Story)
   │
   ▼
UNIFIED USER STATE  ──►  (single source of truth)
   │
   ├──► INSIGHT ENGINE (Azul + Azel)
   │         │
   │         ▼
   ├──► NEXT BEST ACTION (plan / mission / nudge)
   │         │
   │         ▼
   ├──► GAME LAYER (XP / quests / streaks)
   │         │
   │         ▼
   └──► AUTOMATION (optional)
            - schedule tasks
            - environment triggers
            - integrations (later)
`}
              </pre>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <MiniCard
              title="Make it faster"
              desc="Default input is minimal. Start with Time + Story. Add domains only if needed."
            />
            <MiniCard
              title="Make it smarter"
              desc="Unify signals into one state. Insight uses state—no scattered dashboards."
            />
            <MiniCard
              title="Make it automatable"
              desc="Only after you trust the loop: optional triggers, routines, and integrations."
            />
          </div>
        </div>
      </section>

      {/* ====== Step 5: Trust + Control ====== */}
      <section id="trust" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <div className="text-xs font-semibold tracking-widest text-white/50">STEP 5 — TRUST</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Control is not a feature. It’s the core.
              </h2>
              <p className="mt-4 text-white/70">
                ANTYO must feel like an assistant, not a surveillance system. You can always see what’s collected, why,
                and you can pause everything anytime.
              </p>

              <div className="mt-6 space-y-3">
                <Check text="Per-domain control (enable/disable each life system)" />
                <Check text="Transparent data awareness (what’s used + how it affects outputs)" />
                <Check text="Local-first mindset (build trust before cloud)" />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-sm font-semibold">Sabbath Mode</div>
                  <p className="mt-2 text-sm text-white/70">
                    One switch that pauses the system — so you can breathe.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/70">
                  SAFE SWITCH
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">
                <div className="font-semibold text-white">Pauses:</div>
                <ul className="mt-2 space-y-2">
                  <li>• Data collection</li>
                  <li>• AI analysis</li>
                  <li>• Gamification</li>
                  <li>• Automation</li>
                </ul>
              </div>

              <p className="mt-4 text-xs text-white/50">
                You are always the owner. The system adapts to your consent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Roadmap (simple) ====== */}
      <section id="roadmap" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="text-xs font-semibold tracking-widest text-white/50">ROADMAP</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Build the core loop first. Then scale.
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <RoadmapCard
              phase="Phase 1"
              title="Core Life OS (local-first)"
              items={[
                "Unified user state model",
                "Time + Story modules",
                "Basic quests & feedback",
              ]}
            />
            <RoadmapCard
              phase="Phase 2"
              title="Personal AI Agents"
              items={[
                "Azul/Azel deeper coaching",
                "Personalized missions",
                "Cross-domain pattern detection",
              ]}
            />
            <RoadmapCard
              phase="Phase 3"
              title="Automation & Smart Environment"
              items={[
                "Optional integrations",
                "Routines & triggers",
                "IoT / wearable direction",
              ]}
            />
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6" id="waitlist">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="text-sm font-semibold">Early-stage development</div>
                <p className="mt-2 text-sm text-white/70">
                  Want updates or want to collaborate? Leave your contact and what you do.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                <input
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 sm:w-[260px]"
                  placeholder="Email (or Discord)"
                />
                <button className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90">
                  Request access
                </button>
              </div>
            </div>

            <div className="mt-5 text-xs text-white/50">
              Collaboration welcome: engineers, AI researchers, designers.
            </div>
          </div>
        </div>
      </section>

      {/* ====== Footer ====== */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="text-sm text-white/60">
              © {new Date().getFullYear()} ANTYO System • Built for the distracted. Loved by the obsessed.
            </div>
            <div className="flex items-center gap-4 text-sm text-white/60">
              <a className="hover:text-white" href="#problem">Problem</a>
              <a className="hover:text-white" href="#solution">Solution</a>
              <a className="hover:text-white" href="#trust">Trust</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ====== Small UI parts (inline, no extra files) ====== */

function StatCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/70">{desc}</div>
    </div>
  );
}

function Pill({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs text-white/60">{desc}</div>
    </div>
  );
}

function MiniCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="text-sm font-semibold">{title}</div>
      <p className="mt-2 text-sm text-white/70">{desc}</p>
    </div>
  );
}

function Check({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/30 p-4">
      <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-white/15 ring-1 ring-white/10" />
      <div className="text-sm text-white/70">{text}</div>
    </div>
  );
}

function RoadmapCard({
  phase,
  title,
  items,
}: {
  phase: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="text-xs font-semibold tracking-widest text-white/50">{phase}</div>
      <div className="mt-2 text-lg font-semibold">{title}</div>
      <ul className="mt-4 space-y-2 text-sm text-white/70">
        {items.map((it) => (
          <li key={it}>• {it}</li>
        ))}
      </ul>
    </div>
  );
}
