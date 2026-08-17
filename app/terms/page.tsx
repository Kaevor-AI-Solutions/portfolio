import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import LegalDoc from '@/components/LegalDoc';
import { TERMS } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Kaevor AI Solutions',
  description:
    'The terms on which you may use the Kaevor AI Solutions website, including intellectual property, permitted use, enquiries and limitation of liability.',
};

export default function TermsPage() {
  return (
    <>
      <LegalDoc doc={TERMS} />
      <Footer />
    </>
  );
}
