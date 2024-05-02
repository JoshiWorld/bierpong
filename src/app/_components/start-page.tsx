import { JoinTournament } from "./join-tournament";

export function StartPage() {
  return (
    <div className="relative flex h-[50rem] w-full  items-center justify-center bg-white bg-dot-black/[0.2] dark:bg-background dark:bg-dot-white/[0.2]">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-background"></div>
      <JoinTournament />
    </div>
  );
}
