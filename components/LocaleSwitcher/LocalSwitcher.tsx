'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n, type Locale } from '@/lib/i18n/i18n-config';
import css from './LocaleSwitcher.module.css';

export default function LocaleSwitcher() {
  const pathname = usePathname();

  if (!pathname) return null;

  const currentLocale = pathname.split('/')[1] as Locale;
  const otherLocale = i18n.locales.find((loc) => loc !== currentLocale) || i18n.defaultLocale;

  const redirectedPathname = pathname.replace(`/${currentLocale}`, `/${otherLocale}`);

  return (
    <Link href={redirectedPathname} className={css.langswitch}>
      {otherLocale.toUpperCase()}
    </Link>
  );
}