import {useTranslations} from 'next-intl';
import Hero from '@/components/layout/Hero';
import Features from '@/components/layout/Features';
import Pricing from '@/components/layout/Pricing';
 
export default function Home() {
  const t = useTranslations();
 
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
    </>
  );
}
