import { useTranslation } from 'react-i18next';
import BoatCard from '../components/BoatCard.jsx';
import ExperienceCard from '../components/ExperienceCard.jsx';
import Footer from '../components/Footer.jsx';
import KrabiMap from '../components/KrabiMap.jsx';
import '../components/KrabiMap.css';

function Hero() {
  const { t } = useTranslation();
  const highlights = t('hero.highlights', { returnObjects: true });

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(24,119,242,0.1),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(66,183,42,0.12),transparent_36%)]" />
      <div className="section-shell relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-8">
          <span className="inline-flex items-center rounded-full bg-[#e8f2ff] px-4 py-2 text-sm font-semibold text-[#1877F2] ring-1 ring-[#1877F2]/20">
            {t('hero.badge')}
          </span>
          <h1 className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="text-lg text-slate-700 sm:max-w-xl">{t('hero.description')}</p>
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-5 py-3 text-base font-semibold text-white shadow-md shadow-[#1877F2]/30 transition hover:scale-[1.01]">
              {t('hero.primaryCta')}
              <span aria-hidden className="text-xl">
                →
              </span>
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-base font-semibold text-[#1877F2] ring-1 ring-[#1877F2]/30 transition hover:bg-[#f0f6ff]">
              {t('hero.secondaryCta')}
            </button>
          </div>
          <div className="grid max-w-lg grid-cols-2 gap-4 sm:gap-6">
            {highlights.map((item) => (
              <div key={item.title} className="card-surface space-y-1 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1877F2]">{item.subtitle}</p>
                <p className="text-lg font-semibold text-slate-900">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative" style={{ width: '100%' }}>
          <KrabiMap />
        </div>
      </div>
    </section>
  );
}

function ExperienceGrid() {
  const { t } = useTranslation();
  const experiences = t('experiences.cards', { returnObjects: true });

  return (
    <section id="experiences" className="bg-[#f7f9fb] py-16 sm:py-20">
      <div className="section-shell space-y-10">
        <div className="space-y-3 text-center">
          <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1877F2] ring-1 ring-[#1877F2]/20 shadow-sm">
            {t('experiences.badge')}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{t('experiences.title')}</h2>
          <p className="text-lg text-slate-700 sm:mx-auto sm:max-w-2xl">{t('experiences.description')}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.title} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FleetSection() {
  const { t } = useTranslation();
  const boats = t('fleet.boats', { returnObjects: true });

  return (
    <section id="boats" className="py-16 sm:py-20">
      <div className="section-shell space-y-12">
        <div className="space-y-3 text-center">
          <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1877F2] ring-1 ring-[#1877F2]/20 shadow-sm">
            {t('fleet.badge')}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{t('fleet.title')}</h2>
          <p className="text-lg text-slate-700 sm:mx-auto sm:max-w-2xl">{t('fleet.description')}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {boats.map((boat) => (
            <BoatCard key={boat.name} boat={boat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { t } = useTranslation();
  const perks = t('cta.perks', { returnObjects: true });
  const tripStyles = t('cta.tripStyles', { returnObjects: true });

  return (
    <section id="cta" className="py-16 sm:py-20">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/80 sm:p-12">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#1877F2]/10 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full bg-[#e8f2ff] px-4 py-2 text-sm font-semibold text-[#1877F2] ring-1 ring-[#1877F2]/20">
                {t('cta.badge')}
              </span>
              <h3 className="text-3xl font-black text-slate-900 sm:text-4xl">{t('cta.title')}</h3>
              <p className="text-lg text-slate-700 sm:max-w-2xl">{t('cta.description')}</p>
              <div className="flex flex-wrap gap-3">
                {perks.map((perk) => (
                  <span key={perk} className="inline-flex items-center gap-2 rounded-full bg-[#f0f6ff] px-4 py-2 text-sm font-semibold text-[#1877F2] ring-1 ring-[#1877F2]/20">
                    {perk}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-[#1877F2]/10 blur-2xl" />
              <div className="relative space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-500">{t('cta.hotlineLabel')}</div>
                    <div className="text-xl font-semibold text-slate-900">{t('cta.hotlineNumber')}</div>
                  </div>
                  <span className="rounded-full bg-[#42B72A]/10 px-3 py-1 text-xs font-semibold text-[#1f7a12] ring-1 ring-[#42B72A]/30">
                    {t('cta.availability')}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block text-sm text-slate-700">
                    {t('cta.tripDate')}
                    <input
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-[#1877F2] focus:outline-none"
                      type="date"
                    />
                  </label>
                  <label className="block text-sm text-slate-700">
                    {t('cta.guestCount')}
                    <input
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-[#1877F2] focus:outline-none"
                      type="number"
                      min="2"
                      max="20"
                      placeholder={t('cta.guestsPlaceholder')}
                    />
                  </label>
                </div>
                <label className="block text-sm text-slate-700">
                  {t('cta.tripStyle')}
                  <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-[#1877F2] focus:outline-none">
                    {tripStyles.map((style) => (
                      <option key={style} className="bg-white">
                        {style}
                      </option>
                    ))}
                  </select>
                </label>
                <button className="w-full rounded-xl bg-[#1877F2] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-[#1877F2]/30 transition hover:scale-[1.01]">
                  {t('cta.submit')}
                </button>
                <p className="text-center text-xs text-slate-500">{t('cta.responseTime')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <main>
      <Hero />
      <ExperienceGrid />
      <FleetSection />
      <CTASection />
      <Footer />
    </main>
  );
}

export default Home;
