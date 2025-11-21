import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './KrabiMap.css';
import { CATEGORY_COLORS, MAP_BOUNDS, MAP_CATEGORIES, MAP_POINTS } from './krabiMapData';

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

function ZoomController({ selectedCategory, filteredPlaces }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const allBounds = L.latLngBounds(MAP_POINTS.map((place) => [place.lat, place.lng]));
    const filteredBounds = L.latLngBounds(filteredPlaces.map((place) => [place.lat, place.lng]));

    if (selectedCategory === 'All') {
      map.fitBounds(allBounds, { padding: [60, 60], maxZoom: 10 });
    } else if (filteredPlaces.length > 1) {
      map.fitBounds(filteredBounds, { padding: [60, 60], maxZoom: 12 });
    } else if (filteredPlaces.length === 1) {
      const [point] = filteredPlaces;
      map.flyTo([point.lat, point.lng], 14, { duration: 1 });
    }
  }, [map, selectedCategory, filteredPlaces]);

  return null;
}

function KrabiBorderLayer() {
  const map = useMap();

  useEffect(() => {
    if (!map) return undefined;

    let borderLayer;
    let isCancelled = false;

    fetch(`${import.meta.env.BASE_URL}krabi-border.geojson`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load border data');
        }
        return response.json();
      })
      .then((data) => {
        if (isCancelled) return;
        borderLayer = L.geoJSON(data, {
          style: {
            color: '#0099ff',
            weight: 2,
            fillColor: '#e6f4ff',
            fillOpacity: 0.18,
          },
        }).addTo(map);

        if (data.features && data.features.length) {
          map.fitBounds(borderLayer.getBounds().pad(0.08));
        }
      })
      .catch(() => {
        map.fitBounds(MAP_BOUNDS);
      });

    return () => {
      isCancelled = true;
      if (borderLayer) {
        borderLayer.remove();
      }
    };
  }, [map]);

  return null;
}

function MarkerLayer({ places, activePlace, onMarkerSelect }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return undefined;

    const markers = places.map((place) => {
      const marker = L.marker([place.lat, place.lng], {
        icon: createMarkerIcon(place.type, activePlace?.id === place.id),
        riseOnHover: true,
      }).addTo(map);

      marker.on('click', () => {
        onMarkerSelect?.(place);
        const targetZoom = Math.max(map.getZoom(), 11);
        map.flyTo([place.lat, place.lng], targetZoom, { duration: 0.6 });
      });

      marker.bindPopup(
        `<div class="krabi-popup"><strong>${place.name}</strong><p>${place.shortDescription}</p></div>`,
        { closeButton: false },
      );

      return marker;
    });

    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [map, places, activePlace, onMarkerSelect]);

  return null;
}

function MapZoomControl() {
  const map = useMap();

  useEffect(() => {
    if (!map) return undefined;

    const zoomControl = L.control.zoom({ position: 'topright' }).addTo(map);
    const timeout = setTimeout(() => map.invalidateSize(true), 300);

    return () => {
      clearTimeout(timeout);
      zoomControl.remove();
    };
  }, [map]);

  return null;
}

function KrabiMap() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePlace, setActivePlace] = useState(MAP_POINTS[0]);

  const filteredPlaces = useMemo(() => {
    if (selectedCategory === 'All') return MAP_POINTS;
    const normalized = selectedCategory.toLowerCase();
    return MAP_POINTS.filter((place) => place.type === normalized);
  }, [selectedCategory]);

  useEffect(() => {
    if (activePlace && !filteredPlaces.find((place) => place.id === activePlace.id)) {
      setActivePlace(filteredPlaces[0] || null);
    }
  }, [filteredPlaces, activePlace]);

  return (
    <div className="krabi-map-section">
      <div className="krabi-map-topbar">
        <span className="krabi-map-badge">JOINJOY PREMIUM ROUTES</span>
        <h3 className="krabi-map-title">Krabi Highlights</h3>
        <div className="krabi-map-filters relative z-[9999] pointer-events-auto">
          {MAP_CATEGORIES.map((category) => (
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
      </div>

      <div className="krabi-map-wrapper relative z-[1]">
        <MapContainer
          className="krabi-map-container"
          center={[8.0863, 98.9063]}
          zoom={10}
          zoomControl={false}
          maxBounds={MAP_BOUNDS}
          minZoom={8}
          maxZoom={17}
          scrollWheelZoom={!L.Browser.mobile}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution="&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"https://carto.com/attributions\">CARTO</a>"
            maxZoom={19}
          />
          <KrabiBorderLayer />
          <MarkerLayer places={filteredPlaces} activePlace={activePlace} onMarkerSelect={setActivePlace} />
          <ZoomController selectedCategory={selectedCategory} filteredPlaces={filteredPlaces} />
          <MapZoomControl />
        </MapContainer>

        {activePlace && (
          <div className="krabi-info-card">
            <span className="krabi-info-tag">{activePlace.highlightTag}</span>
            <div className="krabi-info-title">{activePlace.name}</div>
            <div className="krabi-info-subtitle">{activePlace.shortDescription}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default KrabiMap;
