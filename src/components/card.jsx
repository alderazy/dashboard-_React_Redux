export default function card({ children }) {
  return (
    <div className="rounded-lg p-3 w-full h-full shadow bg-[var(--card)]">
      {children}
    </div>
  );
}
