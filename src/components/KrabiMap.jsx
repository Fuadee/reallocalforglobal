import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import './KrabiMap.css';
import MapContext from '../utils/MapContext';


const CATEGORY_COLORS = {
  beach: '#ffb347',
  island: '#00b894',
  snorkel: '#0984e3',
  sunset: '#e17055',
};

const PLACES = [
  {
    id: 'ao-nang',
    name: 'Ao Nang',
    type: 'beach',
    coords: [8.0404, 98.8222],
    highlightTag: 'Starting Point',
    shortDescription: 'Main beach and pier for most JoinJoy trips.',
  },
  {
    id: 'railay',
    name: 'Railay Beach',
    type: 'beach',
    coords: [8.0117, 98.8395],
    highlightTag: 'Cliff & Sunset',
    shortDescription: 'Famous cliffs, sunset views, and chill beach vibes.',
  },
  {
    id: 'phi-phi',
    name: 'Phi Phi Islands',
    type: 'island',
    coords: [7.7407, 98.7765],
    highlightTag: 'Island Hopping',
    shortDescription: 'Iconic islands with turquoise water and snorkeling.',
  },
  {
    id: 'hong',
    name: 'Hong Island',
    type: 'snorkel',
    coords: [8.1089, 98.7021],
    highlightTag: 'Lagoon',
    shortDescription: 'Stunning lagoon with calm water and kayaking.',
  },
  {
    id: 'thale-waek',
    name: 'Thale Waek',
    type: 'snorkel',
    coords: [7.99, 98.8144],
    highlightTag: 'Sandbar',
    shortDescription: 'Famous sandbar that appears at low tide.',
  },
  {
  id: 'ao-nang-sunset',
  name: 'Ao Nang Beach Sunset',
  type: 'sunset',
  coords: [8.031669881889947, 98.8216320402158],
  highlightTag: 'Sunset Point',
  shortDescription: 'Iconic Ao Nang sunset with fire shows and a lively beachfront.',
},
{
  id: 'nopparat-sunset',
  name: 'Nopparat Thara Beach Sunset',
  type: 'sunset',
  coords: [8.042996646771988, 98.80915062374889],
  highlightTag: 'Sunset Point',
  shortDescription: 'Quiet sunset spot near the Landmark night market with fewer crowds.',
},
{
  id: 'railay-west-sunset',
  name: 'Railay West Sunset',
  type: 'sunset',
  coords: [8.011867631403003, 98.83779902910392],
  highlightTag: 'Sunset Point',
  shortDescription: 'Magical sunsets surrounded by dramatic limestone cliffs.',
},
{
  id: 'din-daeng-doi',
  name: 'Din Daeng Doi Viewpoint',
  type: 'sunset',
  coords: [8.110198323318548, 98.78414908067876],
  highlightTag: 'Viewpoint',
  shortDescription: 'Hilltop viewpoint offering sunrise, sunset, and sea-fog scenes.',
},
{
  id: 'klong-muang-beach',
  name: 'Klong Muang Beach Sunset',
  type: 'sunset',
  coords: [8.055302121766385, 98.75930705734284],
  highlightTag: 'Sunset Point',
  shortDescription: 'Peaceful beach with calm waves and a relaxed sunset atmosphere.',
},
{
  id: 'tub-kaek-sunset',
  name: 'Tub Kaek Beach Sunset',
  type: 'sunset',
  coords: [8.091723042677, 98.74713314218624],
  highlightTag: 'Sunset Point',
  shortDescription: 'Stunning sunset view facing the Hong Islands in a serene setting.',
},
{
  id: 'khao-thong-hill',
  name: 'Khao Thong Hill Sunset',
  type: 'sunset',
  coords: [8.172984889255703, 98.75259315296445],
  highlightTag: 'Viewpoint Café',
  shortDescription: 'Panoramic sunset viewpoint overlooking Hong Islands with café.',
},
{
  id: 'buffalo-nose-cape',
  name: 'Buffalo Nose Cape',
  type: 'sunset',
  coords: [8.136152250559762, 98.7355327106346],
  highlightTag: 'Adventure Spot',
  shortDescription: 'Dramatic natural stone arches with a remote, scenic sunset view.',
},
{
  id: 'klong-khong-lanta',
  name: 'Klong Khong Beach, Koh Lanta',
  type: 'sunset',
  coords: [7.641664479012308, 99.02819773848144],
  highlightTag: 'Sunset Point',
  shortDescription: 'One of Koh Lanta’s best sunset beaches along a long peaceful shore.',
}

];

const krabiBounds = [
  [7.4, 98.55],
  [8.4, 99.1],
];

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'beach', label: 'Beach' },
  { key: 'island', label: 'Island' },
  { key: 'snorkel', label: 'Snorkel' },
  { key: 'sunset', label: 'Sunset' },
];

const createMarkerIcon = (type, isActive = false) => {
  const color = CATEGORY_COLORS[type] || '#0b69c4';
  return L.divIcon({
    className: 'krabi-marker-wrapper',
    html: `
      <div class="krabi-marker ${isActive ? 'krabi-marker--active' : ''}" style="--marker-color:${color}">
        <span class="krabi-marker-dot"></span>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 26],
    popupAnchor: [0, -20],
  });
};

const fitWithCardPadding = (map, bounds) => {
  map.fitBounds(bounds, {
    paddingTopLeft: [50, 50],
    paddingBottomRight: [50, 220], // เผื่อพื้นที่ card ด้านล่าง
    maxZoom: 12,
  });
};

const Popup = ({ children }) => children;

function Marker({ position, icon, riseOnHover = false, placeType, clusterManager, eventHandlers = {}, children }) {
  const map = useContext(MapContext);

  const popupContent = useMemo(() => {
    let content = null;

    React.Children.forEach(children, (child) => {
      if (child && child.type === Popup) {
        content = ReactDOMServer.renderToStaticMarkup(child.props.children);
      }
    });

    return content;
  }, [children]);

  useEffect(() => {
    if (!map) return undefined;

    const marker = L.marker(position, {
      icon,
      riseOnHover,
      placeType,
    });

    if (eventHandlers && typeof eventHandlers === 'object') {
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        if (typeof handler === 'function') {
          if (event === 'click') {
            marker.__clickHandler = handler;
          }
          marker.on(event, handler);
        }
      });
    }

    if (popupContent) {
      marker.bindPopup(popupContent, { closeButton: false });
    }

    if (clusterManager) {
      clusterManager.addMarker(marker);
    } else {
      marker.addTo(map);
    }

    return () => {
      if (clusterManager) {
        clusterManager.removeMarker(marker);
      }
      marker.remove();
    };
  }, [map, position, icon, riseOnHover, placeType, clusterManager, popupContent, eventHandlers]);

  return null;
}

function ClusteredPlaces({ filteredPlaces, activePlace, setActivePlace }) {
  const map = useContext(MapContext);

  if (!map) return null;

  return (
    <MarkerClusterGroup
      chunkedLoading
      maxClusterRadius={60}
      iconCreateFunction={(cluster) => {
        const markers = cluster.getAllChildMarkers();

        const typeCount = {};
        markers.forEach((marker) => {
          const type = marker.options.placeType;
          typeCount[type] = (typeCount[type] || 0) + 1;
        });

        const markerTypes = Object.keys(typeCount);
        const hasMultipleTypes = markerTypes.length > 1;
        const isAllSelected =
          typeof selectedCategory !== 'undefined' ? selectedCategory === 'all' : hasMultipleTypes;

        if (isAllSelected && hasMultipleTypes) {
          return L.divIcon({
            html: `
             <div class="cluster-bubble" style="
               background: linear-gradient(45deg, #e17055, #00b894, #0984e3, #ffb347);
               border:3px solid white;
               color:white;
               width:40px;height:40px;
               border-radius:50%;
               display:flex;
               justify-content:center;
               align-items:center;
               font-weight:700;
             ">
               ${cluster.getChildCount()}
             </div>
           `,
            className: '',
            iconSize: [40, 40],
          });
        }

        const mainType = Object.entries(typeCount)
          .sort((a, b) => b[1] - a[1])[0][0];

        const color = CATEGORY_COLORS[mainType] || '#444';

        return L.divIcon({
          html: `
           <div class="cluster-bubble" style="
             background:${color};
             border:3px solid white;
             color:white;
             width:40px;height:40px;
             border-radius:50%;
             display:flex;
             justify-content:center;
             align-items:center;
             font-weight:700;
           ">
             ${cluster.getChildCount()}
           </div>
         `,
          className: '',
          iconSize: [40, 40],
        });
      }}
    >
      {filteredPlaces.map((place) => (
        <Marker
          key={place.id}
          position={place.coords}
          icon={createMarkerIcon(place.type, activePlace?.id === place.id)}
          riseOnHover
          placeType={place.type}
          eventHandlers={{
            click: () => {
              setActivePlace(place);
              const targetZoom = Math.max(map.getZoom(), 11);
              map.flyTo(place.coords, targetZoom, { duration: 0.6 });
            },
          }}
        >
          <Popup>
            <div className="krabi-popup">
              <strong>{place.name}</strong>
              <p>{place.shortDescription}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
}

function KrabiMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activePlace, setActivePlace] = useState(PLACES[0]);

  const filteredPlaces = useMemo(
    () => (selectedCategory === 'all' ? PLACES : PLACES.filter((place) => place.type === selectedCategory)),
    [selectedCategory],
  );

  useEffect(() => {
    if (activePlace && !filteredPlaces.find((place) => place.id === activePlace.id)) {
      setActivePlace(filteredPlaces[0] || null);
    }
  }, [filteredPlaces, activePlace]);

  useEffect(() => {
    const container = mapRef.current || document.getElementById('krabiMap');
    if (!container || mapInstanceRef.current) {
      return undefined;
    }

    mapRef.current = container;

    const bounds = L.latLngBounds(krabiBounds);
    const map = L.map(container, {
      center: [8.0863, 98.9063],
      zoom: 10,
      zoomControl: false,
      maxBounds: bounds.pad(0.15),
      minZoom: 8,
      maxZoom: 17,
      scrollWheelZoom: !L.Browser.mobile,
    });

    mapInstanceRef.current = map;
    setMapInstance(map);

    setTimeout(() => {
      map.invalidateSize(true);
    }, 300);

    L.control.zoom({ position: 'topright' }).addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    fetch(`${import.meta.env.BASE_URL}krabi-border.geojson`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load border data');
        }
        return response.json();
      })
      .then((data) => {
        const layer = L.geoJSON(data, {
          style: {
            color: '#0099ff',
            weight: 2,
            fillColor: '#e6f4ff',
            fillOpacity: 0.18,
          },
        }).addTo(map);

        if (data.features && data.features.length) {
          map.fitBounds(layer.getBounds().pad(0.08));
        } else {
          map.fitBounds(bounds);
        }
      })
      .catch(() => {
        map.fitBounds(bounds);
      });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      setMapInstance(null);
    };
  }, []);

  useEffect(() => {
    const map = mapInstance;
    if (!map) return;

    const allBounds = L.latLngBounds(PLACES.map((place) => place.coords));
    const filteredBounds = L.latLngBounds(filteredPlaces.map((place) => place.coords));

    if (selectedCategory === 'all') {
      fitWithCardPadding(map, allBounds);
      return;
    }

    if (filteredPlaces.length > 1) {
      fitWithCardPadding(map, filteredBounds);
    } else if (filteredPlaces.length === 1) {
      const [point] = filteredPlaces;
      map.flyTo(point.coords, 14, { duration: 1 });
      fitWithCardPadding(map, allBounds);
    }
  }, [selectedCategory, filteredPlaces, mapInstance]);

  return (
    <MapContext.Provider value={mapInstance}>
      <div className="krabi-map-section">
        <div className="krabi-map-topbar">
          <span className="krabi-map-badge">JOINJOY PREMIUM ROUTES</span>
          <h3 className="krabi-map-title">Krabi Highlights</h3>
        </div>

        <div className="krabi-map-container">
          <div className="krabi-map-filters">
            {CATEGORIES.map((category) => (
              <button
                key={category.key}
                type="button"
                className={`krabi-filter-button ${selectedCategory === category.key ? 'krabi-filter-button--active' : ''}`}
                onClick={() => setSelectedCategory(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="krabi-map-wrapper">
            <div
              id="krabiMap"
              ref={mapRef}
              className="krabi-map-canvas"
              aria-label="JoinJoy Krabi interactive map"
            />

            {mapInstance && (
              <ClusteredPlaces
                filteredPlaces={filteredPlaces}
                activePlace={activePlace}
                setActivePlace={setActivePlace}
              />
            )}

            {activePlace && (
              <div className="krabi-info-card">
                <span className="krabi-info-tag">{activePlace.highlightTag}</span>
                <div className="krabi-info-title">{activePlace.name}</div>
                <div className="krabi-info-subtitle">{activePlace.shortDescription}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MapContext.Provider>
  );
}

export default KrabiMap;
