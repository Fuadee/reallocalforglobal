import React, { useEffect, useMemo, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import FiltersContainer from './FiltersContainer';
import { GROUP_COLORS, GROUPS, LOCATIONS, SPECIAL_TAGS } from '../utils/locations';
import './Map.css';

const MAP_CENTER = [8.043, 98.915];
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

const scoreToStars = (score) => {
  if (score >= 90) return 5;
  if (score >= 82) return 4;
  if (score >= 74) return 3;
  if (score >= 66) return 2;
  return 1;
};

const prepareLocations = (locations) =>
  locations.map((location) => {
    const baseTags = Array.isArray(location.tags) ? [...location.tags] : [];
    const tags = new Set(baseTags);

    const shuffled = [...SPECIAL_TAGS].sort(() => Math.random() - 0.5);
    const count = Math.floor(Math.random() * 2) + 1; // 1-2 special tags
    shuffled.slice(0, count).forEach((tag) => tags.add(tag));

    const score =
      typeof location.score === 'number' && !Number.isNaN(location.score)
        ? location.score
        : Math.floor(Math.random() * 41) + 60;

    return {
      ...location,
      score,
      tags: Array.from(tags),
    };
  });

function filterLocations(locations, selectedGroup, selectedTags, selectedStars) {
  let result = [...locations];

  if (selectedGroup && selectedGroup !== 'All') {
    result = result.filter((location) => location.group === selectedGroup);
  }

  if (selectedTags.length) {
    result = result.filter((location) =>
      location.tags && location.tags.some((tag) => selectedTags.includes(tag)),
    );
  }

  if (selectedStars.length) {
    const targets = selectedStars.map((star) => Number(star.split('-')[1]));
    result = result.filter((location) => targets.includes(scoreToStars(location.score)));
  }

  return result.sort((a, b) => b.score - a.score);
}

const toLngLat = ([lat, lng]) => [lng, lat];

// const buildPopupHtml = (place) => `
//   <div class="krabi-popup">
//     <div class="krabi-popup-heading">
//       <strong>${place.name}</strong>
//       <span class="krabi-score-badge">${place.score}</span>
//     </div>
//     <p>${place.shortDescription}</p>
//     <div class="krabi-popup-tags">
//       <span class="krabi-tag-badge">${place.group}</span>
//       ${(place.tags || [])
//         .map((tag) => `<span class="krabi-tag-badge">${tag}</span>`)
//         .join('')}
//       ${place.recommended ? '<span class="krabi-recommend-pill">JoinJoy Recommend</span>' : ''}
//     </div>
//   </div>
// `;

function Map() {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const mapInstanceRef = useRef(null);
  const filtersRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedStars, setSelectedStars] = useState(['star-5']);
  const [activePlace, setActivePlace] = useState(null);

  const locationData = useMemo(() => prepareLocations(LOCATIONS), []);

  const filteredPlaces = useMemo(
    () => filterLocations(locationData, selectedGroup, selectedTags, selectedStars),
    [locationData, selectedGroup, selectedTags, selectedStars],
  );

  useEffect(() => {
    if (!activePlace && filteredPlaces.length) {
      setActivePlace(filteredPlaces[0]);
      return;
    }
    if (activePlace && !filteredPlaces.find((place) => place.id === activePlace.id)) {
      setActivePlace(filteredPlaces[0] || null);
    }
  }, [filteredPlaces, activePlace]);

  useEffect(() => {
    if (mapInstanceRef.current) return undefined;

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: MAP_STYLE,
      center: toLngLat(MAP_CENTER),
      zoom: 10.5,
      minZoom: 7,
      maxZoom: 17,
      cooperativeGestures: false,
      dragPan: true,
      touchZoomRotate: true,
      scrollZoom: true,
      interactive: true,
      attributionControl: false,
    });

    mapRef.current.style.pointerEvents = "auto";

    map.getCanvas().style.touchAction = "pan-x pan-y";
    map.getCanvas().style.pointerEvents = "auto";

    map.on('touchstart', (e) => {
      e.originalEvent.stopImmediatePropagation();
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.addControl(new maplibregl.ScaleControl({ unit: 'metric' }), 'bottom-right');

    map.on('load', () => {
      setMapReady(true);
      map.resize();

      fetch(`${import.meta.env.BASE_URL}krabi-border.geojson`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to load border data');
          }
          return response.json();
        })
        .then((data) => {
          if (!map.getSource('krabi-border')) {
            map.addSource('krabi-border', {
              type: 'geojson',
              data,
            });

            map.addLayer({
              id: 'krabi-border-fill',
              type: 'fill',
              source: 'krabi-border',
              paint: {
                'fill-color': '#e6f4ff',
                'fill-opacity': 0.18,
              },
            });

            map.addLayer({
              id: 'krabi-border-line',
              type: 'line',
              source: 'krabi-border',
              paint: {
                'line-color': '#0099ff',
                'line-width': 2,
              },
            });
          }

          if (data.features && data.features.length) {
            const bounds = new maplibregl.LngLatBounds();
            data.features.forEach((feature) => {
              const coords = feature.geometry.coordinates.flat(2);
              for (let i = 0; i < coords.length; i += 2) {
                bounds.extend([coords[i], coords[i + 1]]);
              }
            });
            map.fitBounds(bounds, { padding: 40 });
          }
        })
        .catch(() => {
          map.flyTo({ center: toLngLat(MAP_CENTER), zoom: 10.5 });
        });
    });

    mapInstanceRef.current = map;

    return () => {
      markersRef.current.forEach(({ marker}) => {
        marker.remove();
        //popup.remove();
      });
      markersRef.current = [];
      map.remove();
      mapInstanceRef.current = null;
      setMapReady(false);
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapReady) return;
    if (!filteredPlaces.length) {
      map.flyTo({ center: toLngLat(MAP_CENTER), zoom: 10.5, essential: true });
      return;
    }

    const bounds = new maplibregl.LngLatBounds();
    filteredPlaces.forEach((place) => bounds.extend(toLngLat(place.coordinates)));

    map.fitBounds(bounds, {
      padding: { top: 80, right: 60, bottom: 200, left: 60 },
      maxZoom: 12,
      duration: 800,
      essential: true,
    });
  }, [filteredPlaces, mapReady]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapReady) return;

    markersRef.current.forEach(({ marker}) => {
      marker.remove();
      //popup.remove();
    });
    markersRef.current = [];

    filteredPlaces.forEach((place) => {
      const markerElement = document.createElement('button');
      markerElement.type = 'button';
      markerElement.className = 'krabi-marker';
      markerElement.style.setProperty('--marker-color', GROUP_COLORS[place.group] || '#0b69c4');

      //const popup = new maplibregl.Popup({ closeButton: false, offset: 16 }).setHTML(buildPopupHtml(place));

      const marker = new maplibregl.Marker({ element: markerElement, anchor: 'bottom' })
        .setLngLat(toLngLat(place.coordinates))
        //.setPopup(popup)
        .addTo(map);

      markerElement.addEventListener('click', (event) => {
        event.stopPropagation();
        setActivePlace(place);
        //if (!popup.isOpen()) {
        //popup.addTo(map);
        //}
        map.flyTo({
          center: toLngLat(place.coordinates),
          zoom: Math.max(map.getZoom(), 11),
          speed: 0.8,
          essential: true,
        });
      });

      markersRef.current.push({ id: place.id, marker, element: markerElement });
    });
  }, [filteredPlaces, mapReady]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!mapReady || !activePlace || !map) return;

    markersRef.current.forEach(({ id, element, marker }) => {
      if (id === activePlace.id) {
        element.classList.add('krabi-marker--active');
        // if (!popup.isOpen()) {
        //   popup.setLngLat(marker.getLngLat()).addTo(map);
        // }
      } else {
        element.classList.remove('krabi-marker--active');
        // if (popup.isOpen()) {
        // //  popup.remove();
        // }
      }
    });
  }, [activePlace, mapReady]);




  // const googleMapsUrl =
  //   activePlace && activePlace.coordinates
  //     ? `https://www.google.com/maps/search/?api=1&query=${activePlace.coordinates[0]},${activePlace.coordinates[1]}`
  //     : '#';

  return (
    <section className="map-section">
      <div className="krabi-map-topbar">
        <span className="krabi-map-badge">JOINJOY PREMIUM ROUTES</span>
        <h3 className="krabi-map-title">Krabi Highlights</h3>
      </div>


      <div className="filter-container" aria-label="Krabi map filters">
      
        <FiltersContainer
          groups={GROUPS}
          selectedGroup={selectedGroup}
          onSelectGroup={(group) => setSelectedGroup(group)}
          specialTags={SPECIAL_TAGS}
          selectedTags={selectedTags}
          onToggleTag={(tag) =>
            setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
          }
          selectedStars={selectedStars}
          onToggleStar={(starKey) =>
            setSelectedStars((prev) =>
              prev.includes(starKey) ? prev.filter((key) => key !== starKey) : [...prev, starKey],
            )
          }
          containerRef={filtersRef}
        />
      </div>




      <div className="map-wrapper">
        <div className="map-canvas" ref={mapRef} aria-label="JoinJoy Krabi interactive map" />

        {activePlace && (
          <>
            <div className="krabi-info-card">
              <div className="krabi-info-card__header">
                <div className="header-left">
                  <span className="krabi-info-tag">{activePlace.highlightTag}</span>
                  {activePlace.recommended && (
                    <span className="krabi-recommend-pill">JoinJoy Recommend</span>
                  )}
                </div>
              </div>
              <div className="krabi-info-title-row">
                <div className="krabi-info-title">{activePlace.name}</div>
                <span className="krabi-score-badge krabi-score-badge--dark">{activePlace.score}</span>
              </div>
              <div className="krabi-info-subtitle">{activePlace.shortDescription}</div>
              <div className="krabi-info-actions">
                <span className="explore-more-text">Explore More</span>

                {activePlace.facebook && (
                  <a href={activePlace.facebook} target="_blank" rel="noopener noreferrer">
                    <img src="https://cdn.simpleicons.org/facebook/ffffff" alt="facebook" className="social-icon" />
                  </a>
                )}

                {activePlace.tiktok && (
                  <a href={activePlace.tiktok} target="_blank" rel="noopener noreferrer">
                    <img src="https://cdn.simpleicons.org/tiktok/ffffff" alt="tiktok" className="social-icon" />
                  </a>
                )}

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${activePlace.coordinates[0]},${activePlace.coordinates[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="https://cdn.simpleicons.org/googlemaps/ffffff" alt="google maps" className="social-icon" />
                </a>
              </div>
              <div className="krabi-info-tags">
                <span className="krabi-tag-badge">{activePlace.group}</span>
                {activePlace.tags?.map((tag) => (
                  <span key={tag} className="krabi-tag-badge">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* <div className="absolute left-1/2 bottom-6 -translate-x-1/2 flex flex-col items-center mt-5 gap-3 mb-20">
              <p className="text-lg font-semibold text-slate-700">
                Explore {activePlace.name} More
              </p>

              <div className="flex items-center gap-4">
                {activePlace.facebook && (
                  <a
                    href={activePlace.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 w-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-105 transition"
                  >
                    <img
                      src="https://cdn.simpleicons.org/facebook"
                      className="h-6 w-6"
                      alt="Facebook"
                    />
                  </a>
                )}

                {activePlace.tiktok && (
                  <a
                    href={activePlace.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 w-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-105 transition"
                  >
                    <img
                      src="https://cdn.simpleicons.org/tiktok"
                      className="h-6 w-6"
                      alt="TikTok"
                    />
                  </a>
                )}

                <a
                  href={
                    activePlace.googleMapUrl
                      || `https://www.google.com/maps/search/?api=1&query=${activePlace.coordinates[0]},${activePlace.coordinates[1]}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 w-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-105 transition"
                >
                  <img
                    src="https://www.svgrepo.com/download/271100/google-maps.svg"
                    className="h-6 w-6"
                    alt="Google Maps"
                  />
                </a>
              </div>
            </div> */}
          </>
        )}
      </div>






     




    </section>
  );
}

export default Map;
