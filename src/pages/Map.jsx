import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const categories = ['All', 'Beach', 'Island', 'Snorkel', 'Sunset'];

const markerData = [
  {
    label: 'Ao Nang Pier',
    coordinate: { latitude: 8.0396, longitude: 98.8295 },
    time: '20 min',
    categories: ['All', 'Beach'],
  },
  {
    label: 'Railay Bay',
    coordinate: { latitude: 8.0125, longitude: 98.8385 },
    time: '35 min',
    categories: ['All', 'Sunset', 'Beach'],
  },
  {
    label: 'Hong Islands',
    coordinate: { latitude: 8.0197, longitude: 98.7062 },
    time: '50 min',
    categories: ['All', 'Island', 'Snorkel'],
  },
  {
    label: 'Chicken Island',
    coordinate: { latitude: 7.9684, longitude: 98.8147 },
    time: '42 min',
    categories: ['All', 'Snorkel', 'Island'],
  },
  {
    label: 'Poda Island',
    coordinate: { latitude: 7.9944, longitude: 98.8033 },
    time: '38 min',
    categories: ['All', 'Sunset', 'Island'],
  },
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

function RouteCard({ duration, notes, title }) {
  return (
    <View style={styles.routeCard}>
      <View style={styles.routeHeader}>
        <Text style={styles.routeTitle}>{title}</Text>
        <Text style={styles.routeBadge}>{duration}</Text>
      </View>
      <Text style={styles.routeNotes}>{notes}</Text>
      <View style={styles.routeActions}>
        <Pressable
          style={[styles.actionButton, styles.primaryButton]}
          hitSlop={12}
          onPress={() => {}}
          pointerEvents="auto"
        >
          <Text style={[styles.actionText, styles.primaryText]}>See timings</Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, styles.secondaryButton]}
          hitSlop={12}
          onPress={() => {}}
          pointerEvents="auto"
        >
          <Text style={[styles.actionText, styles.secondaryText]}>Share with concierge</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function Map() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredMarkers = React.useMemo(
    () =>
      selectedCategory === 'All'
        ? markerData
        : markerData.filter((marker) =>
            marker.categories.includes(selectedCategory),
          ),
    [selectedCategory],
  );

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
        <View style={styles.mapSection} pointerEvents="box-none">
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 8.0101,
              longitude: 98.8086,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            }}
            showsCompass
            showsUserLocation
            showsMyLocationButton
          >
            {filteredMarkers.map((marker) => (
              <Marker key={marker.label} coordinate={marker.coordinate} title={marker.label} description={`${marker.time} away`} />
            ))}
          </MapView>

          <View style={styles.categoryBarContainer} pointerEvents="box-none">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryBar}
              pointerEvents="box-none"
            >
              {categories.map((category) => {
                const isActive = selectedCategory === category;

                return (
                  <Pressable
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    hitSlop={12}
                    style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                    pointerEvents="auto"
                  >
                    <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>{category}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
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
  mapSection: {
    position: 'relative',
    height: 360,
    borderRadius: 16,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  categoryBarContainer: {
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    zIndex: 9999,
    elevation: 9999,
    paddingHorizontal: 10,
  },
  categoryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  categoryChip: {
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    position: 'relative',
    zIndex: 9999,
    elevation: 9999,
  },
  categoryChipActive: {
    backgroundColor: '#ffffff',
    borderColor: '#1877F2',
  },
  categoryText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
  },
  categoryTextActive: {
    color: '#1877F2',
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
