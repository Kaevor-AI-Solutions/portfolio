import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import LegalDoc from '@/components/LegalDoc';
import { PRIVACY } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Privacy Policy — Kaevor AI Solutions',
  description:
    'What Kaevor AI Solutions collects when you use the contact form, why we hold it, how long we keep it, and the rights you have over it.',
};

export default function PrivacyPage() {
  return (
    <>
      <LegalDoc doc={PRIVACY} />
      <Footer />
    </>
  );
}
