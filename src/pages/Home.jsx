import BoatCard from '../components/BoatCard.jsx';
import ExperienceCard from '../components/ExperienceCard.jsx';
import Footer from '../components/Footer.jsx';
import KrabiMap from '../components/KrabiMap.jsx';
import '../components/KrabiMap.css';

const heroHighlights = [
  { title: '98% five-star reviews', subtitle: 'Trusted service' },
  { title: 'Replies within 15 minutes', subtitle: 'Concierge ready' },
  { title: 'Scenic Krabi routes', subtitle: 'Choose your pier' },
  { title: 'Premium fleet', subtitle: 'Inspected & crewed' }
];

const experiences = [
  {
    title: 'Sunset champagne cruise',
    category: 'Evening',
    icon: '🌅',
    description: 'Set sail for golden hour with feel-good playlists, chilled champagne, and crew timing the perfect sunset spot.',
    highlights: ['2.5 hours', 'Curated champagne', "Chef-made canapés"]
  },
  {
    title: 'One-day Krabi island hop',
    category: 'Adventure',
    icon: '🏝️',
    description: 'Catch the breeze on hidden sandbars and snorkel coral with local guides who know the calm, quiet bays.',
    highlights: ['6 hours', 'Snorkel gear included', 'Drone photography']
  },
  {
    title: 'Work onboard, executive style',
    category: 'Corporate',
    icon: '💼',
    description: 'Welcome clients or teams with full concierge service, on-board Wi‑Fi, and chef canapés for smooth, premium meetings.',
    highlights: ['Private steward', 'Ready-to-use sound', 'Scenic sea routes']
  }
];

const boats = [
  {
    name: 'Azure Dawn 42',
    type: 'Luxury catamaran',
    capacity: 12,
    price: 820,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    tags: ['Sunset cruise', 'Premium bar', 'Crewed service']
  },
  {
    name: 'Silver Tide 36',
    type: 'Sport cruiser',
    capacity: 8,
    price: 560,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Day trip', 'Snorkel gear', 'Bluetooth music']
  },
  {
    name: 'Mariner 50',
    type: 'Skydeck yacht',
    capacity: 16,
    price: 1040,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Overnight option', 'Private chef', 'Cabin suites']
  },
  {
    name: 'Coral Whisper 32',
    type: 'Eco cruiser',
    capacity: 6,
    price: 420,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80',
    tags: ['Hybrid-electric', 'Shallow beach stops', 'Local guide']
  }
];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(24,119,242,0.1),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(66,183,42,0.12),transparent_36%)]" />
      <div className="section-shell relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-8">
          <span className="inline-flex items-center rounded-full bg-[#e8f2ff] px-4 py-2 text-sm font-semibold text-[#1877F2] ring-1 ring-[#1877F2]/20">
            Luxury cruises • Krabi with JoinJoy
          </span>
          <h1 className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Sail in style and find your happiest moments in Krabi
          </h1>
          <p className="text-lg text-slate-700 sm:max-w-xl">
            Pick the yacht that fits your vibe. Our concierge team handles every detail, from sunset cruises to private parties.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-5 py-3 text-base font-semibold text-white shadow-md shadow-[#1877F2]/30 transition hover:scale-[1.01]">
              Plan my trip
              <span aria-hidden className="text-xl">→</span>
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-base font-semibold text-[#1877F2] ring-1 ring-[#1877F2]/30 transition hover:bg-[#f0f6ff]">
              See all boats
            </button>
          </div>
          <div className="grid max-w-lg grid-cols-2 gap-4 sm:gap-6">
            {heroHighlights.map((item) => (
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
  return (
    <section id="experiences" className="bg-[#f7f9fb] py-16 sm:py-20">
      <div className="section-shell space-y-10">
        <div className="space-y-3 text-center">
          <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1877F2] ring-1 ring-[#1877F2]/20 shadow-sm">
            Handpicked experiences
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Pick your style and enjoy Krabi with JoinJoy</h2>
          <p className="text-lg text-slate-700 sm:mx-auto sm:max-w-2xl">
            From romantic hangs to team workshops by the sea, our concierge designs the right trip so you only focus on joy.
          </p>
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
  return (
    <section id="boats" className="py-16 sm:py-20">
      <div className="section-shell space-y-12">
        <div className="space-y-3 text-center">
          <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1877F2] ring-1 ring-[#1877F2]/20 shadow-sm">
            Signature fleet
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Choose the boat you love and head out to sea</h2>
          <p className="text-lg text-slate-700 sm:mx-auto sm:max-w-2xl">
            Each boat is inspected, professionally crewed, transparently priced, and can flex to your trip style.
          </p>
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

function Home() {
  return (
    <main>
      <Hero />
      <ExperienceGrid />
      <FleetSection />
      <Footer />
    </main>
  );
}

export default Home;
