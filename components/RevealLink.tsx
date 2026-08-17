'use client';

import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { useReveal } from '@/lib/hooks';

type Props = { index?: number } & ComponentPropsWithoutRef<typeof Link>;

/** Reveal-on-scroll `next/link` — kept separate so server components never have to
 *  pass a component reference across the RSC boundary. */
export default function RevealLink({ index = 0, ...rest }: Props) {
  const ref = useReveal<HTMLAnchorElement>(index);
  return <Link ref={ref} data-reveal="" {...rest} />;
}
