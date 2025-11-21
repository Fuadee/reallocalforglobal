export const CATEGORY_COLORS = {
  beach: '#ffb347',
  island: '#00b894',
  snorkel: '#0984e3',
  sunset: '#e17055',
};

export const MAP_POINTS = [
  {
    id: 'ao-nang',
    name: 'Ao Nang',
    type: 'beach',
    lat: 8.0404,
    lng: 98.8222,
    highlightTag: 'Starting Point',
    shortDescription: 'Main beach and pier for most JoinJoy trips.',
  },
  {
    id: 'railay',
    name: 'Railay Beach',
    type: 'beach',
    lat: 8.0117,
    lng: 98.8395,
    highlightTag: 'Cliff & Sunset',
    shortDescription: 'Famous cliffs, sunset views, and chill beach vibes.',
  },
  {
    id: 'phi-phi',
    name: 'Phi Phi Islands',
    type: 'island',
    lat: 7.7407,
    lng: 98.7765,
    highlightTag: 'Island Hopping',
    shortDescription: 'Iconic islands with turquoise water and snorkeling.',
  },
  {
    id: 'hong',
    name: 'Hong Island',
    type: 'snorkel',
    lat: 8.1089,
    lng: 98.7021,
    highlightTag: 'Lagoon',
    shortDescription: 'Stunning lagoon with calm water and kayaking.',
  },
  {
    id: 'thale-waek',
    name: 'Thale Waek',
    type: 'snorkel',
    lat: 7.99,
    lng: 98.8144,
    highlightTag: 'Sandbar',
    shortDescription: 'Famous sandbar that appears at low tide.',
  },
  {
    id: 'klong-muang-sunset',
    name: 'Klong Muang Sunset Point',
    type: 'sunset',
    lat: 8.0896,
    lng: 98.9584,
    highlightTag: 'Sunset Cruise',
    shortDescription: 'Golden-hour viewpoint perfect for ending island days.',
  },
];

export const MAP_BOUNDS = [
  [7.4, 98.55],
  [8.4, 99.1],
];

export const MAP_CATEGORIES = [
  { key: 'All', label: 'All' },
  { key: 'Beach', label: 'Beach' },
  { key: 'Island', label: 'Island' },
  { key: 'Snorkel', label: 'Snorkel' },
  { key: 'Sunset', label: 'Sunset' },
];
