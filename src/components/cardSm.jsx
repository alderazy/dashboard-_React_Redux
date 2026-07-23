export default function card({ bg, IconF, title, p, IconT }) {
  return (
    <div className="rounded-lg p-3 shadow border mt-3 border-[var(--border)] flex justify-between items-center w-full h-full shadow bg-[var(--card)]">
      <div className="flex">
        <div
          className="h-14 w-14 rounded-full  grid place-content-center text-[var(--text-muted)]"
          style={bg}
        >
          {IconF}
        </div>
        <div className="ms-2">
          <h3 className="text-[var(--text-heading)] mb-1">{title}</h3>
          <p className="text-[var(--text)]">{p}</p>
        </div>
      </div>

      {IconT}
    </div>
  );
}
