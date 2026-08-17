import Image from 'next/image';

/** Brand lockup — concentric-ring mark + KAEVOR AI wordmark. Light artwork: dark surfaces only. */
const SRC = '/assets/application/dark-theme-logo-lockup.png';
const RATIO = 1232 / 240; // intrinsic artwork dimensions

export default function Logo({
  height = 26,
  className,
  priority = false,
}: {
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={SRC}
      alt="Kaevor AI"
      width={Math.round(height * RATIO)}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
