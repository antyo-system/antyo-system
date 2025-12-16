const systemBlocks = [
  {
    title: "Capture signals fast",
    points: [
      "Tiny check-ins for Time & Story to avoid tracking fatigue.",
      "Pull only the domains you explicitly enable (Finance, Health, Relationships).",
      "Default opt-out for everything else until trust is earned.",
    ],
  },
  {
    title: "Compute a unified state",
    points: [
      "One source of truth that merges signals into an operator-friendly model.",
      "Azul handles prioritization, constraints, and trade-offs.",
      "Azel keeps the pacing humane so you don’t burn out.",
    ],
  },
  {
    title: "Decide + act with a game layer",
    points: [
      "Every output is a next best action: quest, mission, or nudge.",
      "XP, streaks, and rewards keep momentum without feeling like surveillance.",
      "Automation is optional and only unlocked after trust is established.",
    ],
  },
];

const alphaOutcomes = [
  {
    title: "Day 1–7",
    headline: "Stabilize your loop",
    details: [
      "Integrate Time + Story for immediate clarity.",
      "Baseline your energy and attention windows.",
      "See a single dashboard for constraints and commitments.",
    ],
  },
  {
    title: "Week 2–4",
    headline: "Compound execution",
    details: [
      "Quests that ladder into a weekly operating rhythm.",
      "Azul suggests trade-offs; Azel guards recovery and emotional debt.",
      "Optional automation for routines once you trust the system.",
    ],
  },
  {
    title: "Beyond",
    headline: "Adaptive partner",
    details: [
      "Cross-domain insight: finance stress ↔ sleep ↔ calendar.",
      "Sabbath Mode ensures you always have a safe shutdown switch.",
      "Investors get signal on engagement and retention without vanity metrics.",
    ],
  },
];

const credibility = [
  {
    title: "Operators-first",
    desc: "Built for founders, researchers, and builders who already run tight systems and want a faster, calmer loop.",
  },
  {
    title: "Local-first trust",
    desc: "Data stays under your control. You decide what to share and when. Sabbath Mode pauses everything in one tap.",
  },
  {
    title: "AI that knows its lane",
    desc: "Azul plans, Azel protects. No generic dashboards—just decisions and protection against burnout.",
  },
];

const roadmap = [
  {
    phase: "Phase 1",
    title: "Core Life OS (in progress)",
    bullets: [
      "Unified user state with Time + Story modules",
      "XP + streaks + quests to keep momentum",
      "Local-first storage with transparent controls",
    ],
  },
  {
    phase: "Phase 2",
    title: "Personal AI agents",
    bullets: [
      "Deeper Azul/Azel coaching tuned to your constraints",
      "Pattern detection across domains without extra tracking",
      "Personalized missions with human-level guardrails",
    ],
  },
  {
    phase: "Phase 3",
    title: "Automation & environment",
    bullets: [
      "Optional integrations for calendars, finance, wearables",
      "Routines and triggers you can turn on/off per domain",
      "IoT & ambient direction once trust is proven",
    ],
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-280px] h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-[-220px] top-[120px] h-[520px] w-[520px] rounded-full bg-[#72f5ff]/10 blur-3xl" />
        <div className="absolute left-[-180px] top-[380px] h-[440px] w-[440px] rounded-full bg-[#7c6bff]/10 blur-3xl" />
      </div>

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
            <a className="hover:text-white" href="#system">System</a>
            <a className="hover:text-white" href="#trust">Trust</a>
            <a className="hover:text-white" href="#roadmap">Roadmap</a>
            <a className="hover:text-white" href="#alpha">Alpha</a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#waitlist"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Request access
            </a>
          </div>
        </div>
      </header>

      {/* ====== HERO ====== */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-16 md:pt-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
            <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
            Alpha access open • Operators first • Privacy-forward
          </div>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            The adaptive Life OS that turns your signals into decisions you can execute now.
          </h1>

          <p className="mt-5 max-w-3xl text-pretty text-base leading-relaxed text-white/70 md:text-lg">
            ANTYO unifies time, money, health, relationships, and story into a single feedback loop. Azul handles
            strategy. Azel safeguards sustainability. You stay in control with explicit consent and Sabbath Mode.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#waitlist"
              className="rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Join the early cohort
            </a>
            <a
              href="#system"
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
            >
              See the system map
            </a>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <StatCard title="Single source of truth" desc="Unified user state across Time • Finance • Health • Relationships • Story" />
            <StatCard title="Dual AI companions" desc="Azul (strategy) + Azel (emotion) for decisions that respect constraints" />
            <StatCard title="Trust-first" desc="Per-domain consent, transparent data awareness, Sabbath Mode safe switch" />
          </div>
        </div>
      </section>

      {/* ====== PROBLEM ====== */}
      <section id="problem" className="border-t border-white/10 bg-white/5">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeader
            kicker="STEP 2 — THE TENSION"
            title="Your life stack is fragmented. Your data is loud but not actionable."
            subtitle="Dashboards don’t drive action. ANTYO is built for operators who want a faster loop—not more tracking."
          />

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <Friction text="Context switching between calendar, finance, health, and notes burns decision energy." />
              <Friction text="You collect data, but nothing translates into the next best action." />
              <Friction text="Systems feel extractive. Control and consent are bolted on, not foundational." />
              <Friction text="Motivation spikes then dies because feedback loops are slow and invisible." />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.6)]">
              <div className="text-sm font-semibold text-white">The opportunity</div>
              <p className="mt-3 text-sm text-white/70">
                A life-aware system that is trusted, fast, and human. One loop that turns signals into guidance, keeps
                you accountable with a game layer, and pauses instantly when you need space.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <MiniCard title="Less tracking" desc="Start with Time + Story so the loop stabilizes without data overload." />
                <MiniCard title="More action" desc="Guidance shows up as quests and missions, not charts." />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SYSTEM ====== */}
      <section id="system" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeader
            kicker="STEP 3 — SYSTEM"
            title="Signal → State → Guidance → Action → Adaptation"
            subtitle="Every block is designed for speed, clarity, and consent. Optional automation unlocks only after trust is earned."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {systemBlocks.map((block) => (
              <GlowCard key={block.title} title={block.title} points={block.points} />
            ))}
          </div>

          <div className="mt-10 grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 md:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="text-sm font-semibold text-white">What this feels like</div>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li>• Default capture is minimal. Azul uses constraints, not your whole digital exhaust.</li>
                <li>• Azel monitors recovery, burnout risk, and emotional debt before you crash.</li>
                <li>• Quests and streaks keep tension and reward aligned with your actual state.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-white/70">
{String.raw`USER ACTIONS ──► SIGNALS (opt-in)
       │
       ▼
UNIFIED STATE ──► Azul + Azel insight
       │
       ▼
NEXT BEST ACTION (quest / mission)
       │
       ▼
GAME LAYER (XP / streaks / rewards)
       │
       ▼
OPTIONAL AUTOMATION (when you trust it)`}
            </div>
          </div>
        </div>
      </section>

      {/* ====== CREDIBILITY ====== */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeader
            kicker="STEP 4 — WHY THIS WINS"
            title="Designed for builders who can’t afford sloppy systems"
            subtitle="Attention is the scarce resource. ANTYO reduces friction, adds FOMO-worthy momentum, and keeps you in control."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {credibility.map((item) => (
              <StatCard key={item.title} title={item.title} desc={item.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* ====== ALPHA OUTCOMES ====== */}
      <section id="alpha" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeader
            kicker="STEP 5 — ALPHA COHORT"
            title="Prove the loop. Protect the human."
            subtitle="We’re running a tight alpha with people who want a calmer, faster operating rhythm. Each cohort adds features only when trust is proven."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {alphaOutcomes.map((item) => (
              <OutcomeCard key={item.title} {...item} />
            ))}
          </div>

          <div className="mt-10 grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 md:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="text-sm font-semibold text-white">Eligibility</div>
              <p className="mt-2 text-sm text-white/70">
                Operators, founders, and researchers who value high agency and clear consent. Early adopters get direct
                input on feature sequencing and automation unlocks.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
                <Tag>Limited seats</Tag>
                <Tag>Weekly feedback loop</Tag>
                <Tag>No dark patterns</Tag>
                <Tag>Sabbath Mode guarantee</Tag>
              </div>
            </div>
            <div className="rounded-xl border border-emerald-300/30 bg-emerald-300/10 p-4 text-sm text-emerald-50">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Access window</span>
                <span className="text-xs uppercase tracking-wide">Now</span>
              </div>
              <p className="mt-2 text-sm text-emerald-100/80">
                50 early operator seats. We prioritize people shipping weekly and willing to stress-test the loop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== TRUST ====== */}
      <section id="trust" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeader
            kicker="STEP 6 — TRUST"
            title="Control is the product"
            subtitle="ANTYO must feel like an assistant, not a surveillance system. Data autonomy and emotional safety are built-in, not add-ons."
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Check text="Per-domain consent (enable/disable Time, Finance, Health, Relationships, Story)" />
              <Check text="Transparent data awareness (see what’s collected and why it matters)" />
              <Check text="Local-first mindset before any cloud expansion" />
              <Check text="Sabbath Mode pauses data, AI, gamification, and automation with one switch" />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-sm font-semibold">Sabbath Mode</div>
                  <p className="mt-2 text-sm text-white/70">One switch that pauses the system — so you can breathe.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/70">SAFE SWITCH</div>
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
              <p className="mt-4 text-xs text-white/50">You are always the owner. The system adapts to your consent.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== ROADMAP ====== */}
      <section id="roadmap" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeader
            kicker="STEP 7 — ROADMAP"
            title="Prove the core loop. Then earn automation."
            subtitle="We release in deliberate stages to keep trust intact and compound retention."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {roadmap.map((item) => (
              <RoadmapCard key={item.title} phase={item.phase} title={item.title} items={item.bullets} />
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6" id="waitlist">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="text-sm font-semibold">Early-stage development</div>
                <p className="mt-2 text-sm text-white/70">
                  Want updates or want to collaborate? Leave your contact, role, and the problem you want solved first.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                <input
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 sm:w-[220px]"
                  placeholder="Email (or Discord)"
                />
                <input
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 sm:w-[180px]"
                  placeholder="Your role"
                />
                <button className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
                  Request access
                </button>
              </div>
            </div>

            <div className="mt-5 text-xs text-white/50">
              Collaboration welcome: engineers, AI researchers, designers. We prioritize builders who ship.
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
              <a className="hover:text-white" href="#system">System</a>
              <a className="hover:text-white" href="#trust">Trust</a>
              <a className="hover:text-white" href="#roadmap">Roadmap</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ====== Small UI parts ====== */

function StatCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/70">{desc}</div>
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

function Friction({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/30 p-4">
      <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-white/15 ring-1 ring-white/10" />
      <div className="text-sm text-white/70">{text}</div>
    </div>
  );
}

function GlowCard({ title, points }: { title: string; points: string[] }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-black/40 p-6">
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/10 blur-3xl transition duration-500 group-hover:scale-125" />
      <div className="relative z-10">
        <div className="text-sm font-semibold text-white">{title}</div>
        <ul className="mt-3 space-y-2 text-sm text-white/70">
          {points.map((point) => (
            <li key={point}>• {point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SectionHeader({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  return (
    <div className="space-y-2">
      <div className="text-xs font-semibold tracking-widest text-white/50">{kicker}</div>
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      <p className="max-w-3xl text-sm text-white/70 md:text-base">{subtitle}</p>
    </div>
  );
}

function OutcomeCard({ title, headline, details }: { title: string; headline: string; details: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="text-xs font-semibold tracking-widest text-white/50">{title}</div>
      <div className="mt-2 text-lg font-semibold text-white">{headline}</div>
      <ul className="mt-3 space-y-2 text-sm text-white/70">
        {details.map((detail) => (
          <li key={detail}>• {detail}</li>
        ))}
      </ul>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">{children}</span>;
}

function Check({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/30 p-4">
      <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-white/15 ring-1 ring-white/10" />
      <div className="text-sm text-white/70">{text}</div>
    </div>
  );
}

function RoadmapCard({ phase, title, items }: { phase: string; title: string; items: string[] }) {
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
