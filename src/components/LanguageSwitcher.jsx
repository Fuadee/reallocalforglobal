import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { languageOptions } from '../i18n.js';

const sizeClasses = {
  sm: 'px-2.5 py-2 text-xs',
  md: 'px-3 py-2 text-sm'
};

function LanguageSwitcher({ size = 'md' }) {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const current = languageOptions.find((option) => option.code === i18n.language) || languageOptions[0];

  return (
    <div className="relative shrink-0" ref={menuRef}>
      <button
        type="button"
        className={`inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 shadow-sm transition hover:border-[#1877F2]/40 hover:text-[#1877F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2] ${sizeClasses[size]}`}
        aria-label={t('nav.language')}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM4.41 12a5.97 5.97 0 01-.14-1H5.6c.05.7.16 1.37.3 2.01-.56-.27-1.07-.61-1.49-1.01zm6.95-3h-2.7a13.4 13.4 0 01.12-1h2.46c.07.32.1.66.12 1zm-2.58 1h2.8a13.5 13.5 0 01-.14 1h-2.52a12.22 12.22 0 01-.14-1zm-1.17 0c-.02.34.01.68.04 1H5.6a5.96 5.96 0 01.01-1h2zm0-1h-2a5.96 5.96 0 01.11-1h1.81c-.04.34-.07.67-.08 1zm3.71-2H9.7a11.44 11.44 0 01.49-1.4A6.04 6.04 0 0111.32 6zm-1.91 0H7.8c.15-.5.33-.98.54-1.4.37.23.72.5 1.07.82-.04.19-.08.38-.11.58zm-.69 8c-.3-.37-.56-.83-.77-1.36h1.5c.09.47.2.92.34 1.36h-1.07zM8 12H6.22a13.4 13.4 0 01-.3-2H7.9c.05.7.16 1.37.3 2zM7.9 9H5.92c.05-.7.16-1.37.3-2H8c-.05.66-.09 1.33-.1 2zm3.74-2h2.08a5.97 5.97 0 01.11 1h-2.3a12.5 12.5 0 00-.1-1zm2.19-1h-1.81a11.43 11.43 0 00-.49-1.4c.5.24.97.54 1.38.9.35.3.65.64.92 1.02zm-3.11 8c.15-.47.27-.97.35-1.53h2.12c-.34.6-.77 1.12-1.28 1.53h-1.19z" />
        </svg>
        <span className="font-semibold tracking-wide">{current.label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/80">
          {languageOptions.map((option) => (
            <button
              key={option.code}
              type="button"
              className={`flex w-full items-center justify-between px-3 py-2 text-sm font-medium transition hover:bg-[#f0f6ff] ${
                option.code === current.code ? 'text-[#1877F2]' : 'text-slate-700'
              }`}
              onClick={() => {
                i18n.changeLanguage(option.code);
                if (typeof window !== 'undefined') {
                  localStorage.setItem('i18nextLng', option.code);
                }
                setIsOpen(false);
              }}
            >
              <span className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#1877F2]/10 text-xs font-semibold text-[#1877F2] ring-1 ring-[#1877F2]/20">
                  {option.label}
                </span>
                {option.name}
              </span>
              {option.code === current.code && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.42l2.543 2.544 6.543-6.544a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
