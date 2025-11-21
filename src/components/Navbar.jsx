import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher.jsx';

function Navbar() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#boats', label: t('nav.links.boats') },
    { href: '#experiences', label: t('nav.links.experiences') },
    { href: '#cta', label: t('nav.links.cta') }
  ];

  const whatsappHref = 'https://wa.me/XXXXXXXXXX';

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="section-shell flex h-16 items-center gap-2 sm:gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#1877F2] text-lg font-black text-white shadow-md" aria-label={t('brand.initials')}>
            {t('brand.initials')}
          </div>
          <div className="leading-tight">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#1877F2]">{t('brand.name')}</p>
            <p className="truncate text-lg font-semibold text-slate-900">{t('brand.destination')}</p>
          </div>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium text-slate-700 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <a key={link.href} className="transition hover:text-[#1877F2]" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <div className="md:hidden">
            <LanguageSwitcher size="sm" />
          </div>
          <a
            className="inline-flex items-center rounded-xl bg-[#25D366] px-3 py-2 text-xs font-semibold text-white shadow-md shadow-[#25D366]/30 transition hover:scale-[1.01] hover:bg-[#22c05d] sm:px-4 sm:text-sm"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('nav.whatsapp')}
          </a>
          <div className="hidden items-center gap-2 md:flex lg:gap-3">
            <button className="rounded-xl px-4 py-2 text-sm font-semibold text-[#1877F2] ring-1 ring-[#1877F2]/30 transition hover:bg-[#1877F2]/5">
              {t('nav.login')}
            </button>
            <button className="inline-flex rounded-xl bg-[#1877F2] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#1877F2]/30 transition hover:scale-[1.01]">
              {t('nav.book')}
            </button>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-[#1877F2]/40 hover:text-[#1877F2] md:hidden"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">{isMenuOpen ? t('nav.menuClose') : t('nav.menuOpen')}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`section-shell origin-top transform-gpu transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'max-h-[520px] scale-y-100 opacity-100' : 'max-h-0 scale-y-95 opacity-0'
        }`}
      >
        <div className="mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
          <div className="flex flex-col gap-1 p-4 text-sm font-medium text-slate-800">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="rounded-lg px-3 py-2 transition hover:bg-slate-100 hover:text-[#1877F2]"
                href={link.href}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2 border-t border-slate-100 p-4">
            <button className="inline-flex w-full justify-center rounded-xl px-4 py-2 text-sm font-semibold text-[#1877F2] ring-1 ring-[#1877F2]/25 transition hover:bg-[#1877F2]/5">
              {t('nav.login')}
            </button>
            <button className="inline-flex w-full justify-center rounded-xl bg-[#1877F2] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#1877F2]/30 transition hover:scale-[1.01]">
              {t('nav.book')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
