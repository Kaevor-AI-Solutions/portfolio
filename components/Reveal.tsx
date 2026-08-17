'use client';

import type { ComponentPropsWithoutRef, ElementType, Ref } from 'react';
import { useReveal } from '@/lib/hooks';

type RevealProps<T extends ElementType> = {
  as?: T;
  index?: number;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

export default function Reveal<T extends ElementType = 'div'>({
  as,
  index = 0,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useReveal<HTMLElement>(index);

  return <Tag ref={ref as Ref<HTMLElement>} data-reveal="" {...rest} />;
}
