import PomodoroTimer from "./components/pomodoro-timer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex flex-1 w-full max-w-md flex-col items-center justify-center px-6 py-16">
        <h1 className="mb-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Pomodoro Timer
        </h1>
        <PomodoroTimer />
      </main>
    </div>
  );
}
