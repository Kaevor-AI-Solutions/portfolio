/** Concentric-ring mark — the "flow settling into structure" motif in static form. */
export default function Logo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="10" stroke="#3ED0C4" strokeWidth="1.1" opacity=".3" />
      <circle cx="11" cy="11" r="6.3" stroke="#3ED0C4" strokeWidth="1.1" opacity=".6" />
      <circle cx="11" cy="11" r="2.3" fill="#3ED0C4" />
    </svg>
  );
}
