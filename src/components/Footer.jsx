import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="section-shell flex flex-col items-center justify-between gap-4 text-sm text-slate-600 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1877F2] text-base font-black text-white shadow-sm">
            {t('brand.initials')}
          </div>
          <span>{t('footer.brand')}</span>
        </div>
        <div className="flex items-center gap-4">
          <a className="transition hover:text-[#1877F2]" href="#">
            {t('footer.instagram')}
          </a>
          <a className="transition hover:text-[#1877F2]" href="#">
            {t('footer.facebook')}
          </a>
          <a className="transition hover:text-[#1877F2]" href="#">
            {t('footer.terms')}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
