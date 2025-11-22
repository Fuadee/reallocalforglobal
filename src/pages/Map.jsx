import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const markerData = [
  { label: 'Ao Nang Pier', x: '18%', y: '26%', time: '20 min' },
  { label: 'Railay Bay', x: '34%', y: '38%', time: '35 min' },
  { label: 'Hong Islands', x: '70%', y: '34%', time: '50 min' },
  { label: 'Chicken Island', x: '56%', y: '56%', time: '42 min' },
  { label: 'Poda Island', x: '46%', y: '72%', time: '38 min' },
];

const routeOptions = [
  {
    title: 'Sunset champagne loop',
    duration: '2.5 hours',
    notes: 'Glide past Railay and Poda with a golden-hour swim stop.',
  },
  {
    title: 'Island-hop adventure',
    duration: '5 hours',
    notes: 'Hong, Chicken, and Poda with reef snorkel gear ready to go.',
  },
  {
    title: 'Calm bays & picnic',
    duration: '3 hours',
    notes: 'Quiet lagoon anchor with curated picnic setup and music.',
  },
];

function Marker({ label, time, x, y }) {
  return (
    <View style={[styles.marker, { left: x, top: y }]}> 
      <View style={styles.markerDot} />
      <View style={styles.markerLabel}> 
        <Text style={styles.markerTitle}>{label}</Text>
        <Text style={styles.markerTime}>{time} away</Text>
      </View>
    </View>
  );
}

function RouteCard({ duration, notes, title }) {
  return (
    <View style={styles.routeCard}>
      <View style={styles.routeHeader}>
        <Text style={styles.routeTitle}>{title}</Text>
        <Text style={styles.routeBadge}>{duration}</Text>
      </View>
      <Text style={styles.routeNotes}>{notes}</Text>
      <View style={styles.routeActions}>
        <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}> 
          <Text style={[styles.actionText, styles.primaryText]}>See timings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}> 
          <Text style={[styles.actionText, styles.secondaryText]}>Share with concierge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Map() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}> 
      <View style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <Text style={styles.heroTag}>Krabi routes</Text>
          <Text style={styles.heroTitle}>Pick your pier and glide to the islands</Text>
          <Text style={styles.heroSubtitle}>
            Concierge will confirm your pickup pier, captain, and swim stops. Track timing in real time while you sail.
          </Text>
        </View>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1400&q=80',
          }}
          style={styles.mapImage}
          imageStyle={styles.mapImageRadius}
        >
          <View style={styles.mapOverlay}>
            {markerData.map((marker) => (
              <Marker key={marker.label} {...marker} />
            ))}
          </View>
        </ImageBackground>
      </View>

      <View style={styles.routesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEyebrow}>Suggested routes</Text>
          <Text style={styles.sectionTitle}>Choose how long you want to stay out</Text>
          <Text style={styles.sectionSubtitle}>
            Every route includes chilled towels, reef-safe sunscreen, and flexible swim or snorkel stops.
          </Text>
        </View>
        <View style={styles.routeGrid}>
          {routeOptions.map((route) => (
            <RouteCard key={route.title} {...route} />
          ))}
        </View>
      </View>
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
    gap: 20,
  },
  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  heroHeader: {
    gap: 8,
  },
  heroTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#e8f2ff',
    color: '#1877F2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: 30,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
  },
  mapImage: {
    height: 320,
    width: '100%',
    overflow: 'hidden',
  },
  mapImageRadius: {
    borderRadius: 16,
  },
  mapOverlay: {
    flex: 1,
    position: 'relative',
  },
  marker: {
    position: 'absolute',
    alignItems: 'center',
    gap: 6,
  },
  markerDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: '#1877F2',
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  markerLabel: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 2,
  },
  markerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
  markerTime: {
    fontSize: 12,
    color: '#475569',
  },
  routesSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
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
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#334155',
    textAlign: 'center',
    lineHeight: 20,
  },
  routeGrid: {
    gap: 12,
  },
  routeCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 14,
    gap: 10,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  routeTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
    flex: 1,
  },
  routeBadge: {
    backgroundColor: '#1877F2',
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  routeNotes: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  routeActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  primaryButton: {
    backgroundColor: '#1877F2',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#1877F2',
  },
});
