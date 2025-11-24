import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import './KrabiMap.css';
import MapContext from '../utils/MapContext';
import FiltersContainer from './FiltersContainer';
import { GROUP_COLORS, GROUPS, LOCATIONS, SPECIAL_TAGS } from '../utils/locations';

const krabiBounds = [
  [7.4, 98.55],
  [8.4, 99.1],
];

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

const fitWithCardPadding = (map, bounds) => {
  map.fitBounds(bounds, {
    paddingTopLeft: [50, 90],
    paddingBottomRight: [50, 240],
    maxZoom: 12,
  });
};

const Popup = ({ children }) => children;

const createMarkerIcon = (group, isActive = false) => {
  const color = GROUP_COLORS[group] || '#0b69c4';
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

function ClusteredPlaces({ filteredPlaces, activePlace, setActivePlace, selectedGroup }) {
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
        const isAllSelected = selectedGroup === 'All';

        if (isAllSelected && hasMultipleTypes) {
          return L.divIcon({
            html: `
             <div class="cluster-bubble" style="
               background: linear-gradient(45deg, #f97316, #10b981, #3b82f6, #8b5cf6);
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

        const color = GROUP_COLORS[mainType] || '#444';

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
          position={place.coordinates}
          icon={createMarkerIcon(place.group, activePlace?.id === place.id)}
          riseOnHover
          placeType={place.group}
          eventHandlers={{
            click: () => {
              setActivePlace(place);
              const targetZoom = Math.max(map.getZoom(), 11);
              map.flyTo(place.coordinates, targetZoom, { duration: 0.6 });
            },
          }}
        >
          <Popup>
            <div className="krabi-popup">
              <div className="krabi-popup-heading">
                <strong>{place.name}</strong>
                <span className="krabi-score-badge">{place.score}</span>
              </div>
              <p>{place.shortDescription}</p>
              <div className="krabi-popup-tags">
                <span className="krabi-tag-badge">{place.group}</span>
                {place.tags?.map((tag) => (
                  <span key={tag} className="krabi-tag-badge">
                    {tag}
                  </span>
                ))}
                {place.recommended && <span className="krabi-recommend-pill">JoinJoy Recommend</span>}
              </div>
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
    if (!mapInstance) return;

    const allBounds = L.latLngBounds(locationData.map((place) => place.coordinates));
    const filteredBounds = filteredPlaces.length
      ? L.latLngBounds(filteredPlaces.map((place) => place.coordinates))
      : allBounds;

    if (filteredPlaces.length > 1) {
      fitWithCardPadding(mapInstance, filteredBounds);
    } else if (filteredPlaces.length === 1) {
      const [point] = filteredPlaces;
      mapInstance.flyTo(point.coordinates, 13, { duration: 0.8 });
    } else {
      fitWithCardPadding(mapInstance, allBounds);
    }
  }, [filteredPlaces, mapInstance, locationData]);

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

  return (
    <MapContext.Provider value={mapInstance}>
      <div className="krabi-map-section">
        <div className="krabi-map-topbar">
          <span className="krabi-map-badge">JOINJOY PREMIUM ROUTES</span>
          <h3 className="krabi-map-title">Krabi Highlights</h3>
        </div>

        <div className="krabi-filter-container">
          <FiltersContainer
            groups={GROUPS}
            selectedGroup={selectedGroup}
            onSelectGroup={(group) => {
              setSelectedGroup(group);
            }}
            specialTags={SPECIAL_TAGS}
            selectedTags={selectedTags}
            onToggleTag={(tag) => {
              setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
            }}
            selectedStars={selectedStars}
            onToggleStar={(starKey) => {
              setSelectedStars((prev) =>
                prev.includes(starKey) ? prev.filter((key) => key !== starKey) : [...prev, starKey],
              );
            }}
          />
        </div>

        <div className="krabi-map-stage">
          <div className="krabi-map-wrapper">
            <div
              id="krabiMap"
              ref={mapRef}
              className="krabi-map-container"
              aria-label="JoinJoy Krabi interactive map"
            />

            {mapInstance && (
              <ClusteredPlaces
                filteredPlaces={filteredPlaces}
                activePlace={activePlace}
                setActivePlace={setActivePlace}
                selectedGroup={selectedGroup}
              />
            )}

            {activePlace && (
              <div className="krabi-info-card">
                <div className="krabi-info-card__header">
                  <span className="krabi-info-tag">{activePlace.highlightTag}</span>
                  {activePlace.recommended && <span className="krabi-recommend-pill">JoinJoy Recommend</span>}
                </div>
                <div className="krabi-info-title-row">
                  <div>
                    <div className="krabi-info-title">{activePlace.name}</div>
                    <div className="krabi-info-subtitle">{activePlace.shortDescription}</div>
                  </div>
                  <span className="krabi-score-badge krabi-score-badge--dark">{activePlace.score}</span>
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
            )}
          </div>
        </div>
      </div>
    </MapContext.Provider>
  );
}

export default KrabiMap;
