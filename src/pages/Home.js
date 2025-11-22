import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const heroHighlights = [
  { title: '98% five-star reviews', subtitle: 'Trusted service' },
  { title: 'Replies within 15 minutes', subtitle: 'Concierge ready' },
  { title: 'Scenic Krabi routes', subtitle: 'Choose your pier' },
  { title: 'Premium fleet', subtitle: 'Inspected & crewed' },
];

const experiences = [
  {
    title: 'Sunset champagne cruise',
    category: 'Evening',
    icon: '🌅',
    description:
      'Set sail for golden hour with feel-good playlists, chilled champagne, and crew timing the perfect sunset spot.',
    highlights: ['2.5 hours', 'Curated champagne', "Chef-made canapés"],
  },
  {
    title: 'One-day Krabi island hop',
    category: 'Adventure',
    icon: '🏝️',
    description:
      'Catch the breeze on hidden sandbars and snorkel coral with local guides who know the calm, quiet bays.',
    highlights: ['6 hours', 'Snorkel gear included', 'Drone photography'],
  },
  {
    title: 'Work onboard, executive style',
    category: 'Corporate',
    icon: '💼',
    description:
      'Welcome clients or teams with full concierge service, on-board Wi‑Fi, and chef canapés for smooth, premium meetings.',
    highlights: ['Private steward', 'Ready-to-use sound', 'Scenic sea routes'],
  },
];

const boats = [
  {
    name: 'Azure Dawn 42',
    type: 'Luxury catamaran',
    capacity: 12,
    price: 820,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    tags: ['Sunset cruise', 'Premium bar', 'Crewed service'],
  },
  {
    name: 'Silver Tide 36',
    type: 'Sport cruiser',
    capacity: 8,
    price: 560,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Day trip', 'Snorkel gear', 'Bluetooth music'],
  },
  {
    name: 'Mariner 50',
    type: 'Skydeck yacht',
    capacity: 16,
    price: 1040,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Overnight option', 'Private chef', 'Cabin suites'],
  },
  {
    name: 'Coral Whisper 32',
    type: 'Eco cruiser',
    capacity: 6,
    price: 420,
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80',
    tags: ['Hybrid-electric', 'Shallow beach stops', 'Local guide'],
  },
];

function HighlightCard({ subtitle, title }) {
  return (
    <View style={styles.highlightCard}>
      <Text style={styles.highlightSubtitle}>{subtitle}</Text>
      <Text style={styles.highlightTitle}>{title}</Text>
    </View>
  );
}

function ExperienceCard({ experience }) {
  return (
    <View style={styles.experienceCard}>
      <Text style={styles.experienceCategory}>{experience.category}</Text>
      <Text style={styles.experienceTitle}>
        {experience.icon} {experience.title}
      </Text>
      <Text style={styles.experienceDescription}>{experience.description}</Text>
      <View style={styles.badgeRow}>
        {experience.highlights.map((highlight) => (
          <View key={highlight} style={styles.badge}>
            <Text style={styles.badgeText}>{highlight}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function BoatCard({ boat }) {
  return (
    <View style={styles.boatCard}>
      <Image source={{ uri: boat.image }} style={styles.boatImage} />
      <View style={styles.boatContent}>
        <View style={styles.boatHeader}>
          <Text style={styles.boatName}>{boat.name}</Text>
          <Text style={styles.boatRating}>★ {boat.rating.toFixed(1)}</Text>
        </View>
        <Text style={styles.boatType}>{boat.type}</Text>
        <Text style={styles.boatDetails}>
          {boat.capacity} guests • ${boat.price} / trip
        </Text>
        <View style={styles.badgeRow}>
          {boat.tags.map((tag) => (
            <View key={tag} style={styles.badge}>
              <Text style={styles.badgeText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function Hero() {
  return (
    <View style={styles.heroSection}>
      <Text style={styles.heroEyebrow}>Luxury cruises • Krabi with JoinJoy</Text>
      <Text style={styles.heroTitle}>Sail in style and find your happiest moments in Krabi</Text>
      <Text style={styles.heroSubtitle}>
        Pick the yacht that fits your vibe. Our concierge team handles every detail, from sunset cruises to private parties.
      </Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.primaryButton]}>
          <Text style={[styles.buttonText, styles.primaryButtonText]}>Plan my trip</Text>
          <Text style={[styles.buttonText, styles.primaryButtonText]}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>See all boats</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.highlightGrid}>
        {heroHighlights.map((item) => (
          <HighlightCard key={item.title} subtitle={item.subtitle} title={item.title} />
        ))}
      </View>
    </View>
  );
}

function ExperienceGrid() {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionEyebrow}>Handpicked experiences</Text>
        <Text style={styles.sectionTitle}>Pick your style and enjoy Krabi with JoinJoy</Text>
        <Text style={styles.sectionSubtitle}>
          From romantic hangs to team workshops by the sea, our concierge designs the right trip so you only focus on joy.
        </Text>
      </View>
      <View style={styles.cardGrid}>
        {experiences.map((experience) => (
          <ExperienceCard key={experience.title} experience={experience} />
        ))}
      </View>
    </View>
  );
}

function FleetSection() {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionEyebrow}>Signature fleet</Text>
        <Text style={styles.sectionTitle}>Choose the boat you love and head out to sea</Text>
        <Text style={styles.sectionSubtitle}>
          Each boat is inspected, professionally crewed, transparently priced, and can flex to your trip style.
        </Text>
      </View>
      <View style={styles.cardGrid}>
        {boats.map((boat) => (
          <BoatCard key={boat.name} boat={boat} />
        ))}
      </View>
    </View>
  );
}

export default function Home() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <Hero />
      <ExperienceGrid />
      <FleetSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  screenContent: {
    padding: 20,
    gap: 24,
  },
  heroSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  heroEyebrow: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#e8f2ff',
    color: '#1877F2',
    fontWeight: '600',
    fontSize: 14,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  primaryButton: {
    backgroundColor: '#1877F2',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  secondaryButtonText: {
    color: '#1877F2',
    fontWeight: '700',
  },
  buttonText: {
    fontSize: 15,
  },
  highlightGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  highlightCard: {
    flex: 1,
    minWidth: 140,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 4,
  },
  highlightSubtitle: {
    fontSize: 12,
    color: '#1877F2',
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionHeader: {
    gap: 8,
    alignItems: 'center',
  },
  sectionEyebrow: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#e8f2ff',
    color: '#1877F2',
    fontWeight: '700',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 15,
    color: '#334155',
    textAlign: 'center',
    lineHeight: 22,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  experienceCard: {
    flex: 1,
    minWidth: 220,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  experienceCategory: {
    color: '#1877F2',
    fontWeight: '700',
    fontSize: 13,
  },
  experienceTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
  },
  experienceDescription: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#e8f2ff',
  },
  badgeText: {
    color: '#1877F2',
    fontWeight: '700',
    fontSize: 12,
  },
  boatCard: {
    flex: 1,
    minWidth: 220,
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  boatImage: {
    width: '100%',
    height: 140,
  },
  boatContent: {
    padding: 12,
    gap: 6,
  },
  boatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boatName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
  },
  boatRating: {
    fontSize: 14,
    color: '#1877F2',
    fontWeight: '700',
  },
  boatType: {
    fontSize: 14,
    color: '#334155',
  },
  boatDetails: {
    fontSize: 14,
    color: '#64748b',
  },
});
