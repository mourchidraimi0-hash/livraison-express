export default function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-float absolute -left-10 top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
      <div className="animate-float-slow absolute right-0 top-32 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="animate-float absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-accent/10 blur-2xl [animation-delay:1.5s]" />
    </div>
  );
}
