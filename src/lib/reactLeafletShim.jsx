import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';

const MapContext = createContext(null);

export function useMap() {
  return useContext(MapContext);
}

export function MapContainer({ children, className, style, center = [0, 0], zoom = 13, ...options }) {
  const containerRef = useRef(null);
  const [map, setMap] = useState(null);
  const optionsRef = useRef(options);

  useEffect(() => {
    if (map || !containerRef.current) return undefined;

    const mapInstance = L.map(containerRef.current, {
      center,
      zoom,
      ...optionsRef.current,
    });

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, [map, center, zoom]);

  const content = useMemo(
    () => (
      <MapContext.Provider value={map}>
        <div ref={containerRef} className={className} style={style}>
          {map ? children : null}
        </div>
      </MapContext.Provider>
    ),
    [map, children, className, style],
  );

  return content;
}

export function TileLayer({ url, ...options }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return undefined;

    const layer = L.tileLayer(url, options).addTo(map);
    return () => {
      layer.remove();
    };
  }, [map, url]);

  return null;
}

export function Marker({ position, icon, riseOnHover, eventHandlers = {}, children }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !position) return undefined;

    const marker = L.marker(position, { icon, riseOnHover }).addTo(map);

    Object.entries(eventHandlers).forEach(([event, handler]) => {
      if (typeof handler === 'function') {
        marker.on(event, handler);
      }
    });

    if (children) {
      const popupContent = React.isValidElement(children) ? children.props.children : children;
      if (popupContent) {
        marker.bindPopup(popupContent, { closeButton: false });
      }
    }

    return () => {
      marker.remove();
    };
  }, [map, position, icon, riseOnHover, children, eventHandlers]);

  return null;
}

export function Popup({ children }) {
  return children ?? null;
}

export default {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
};
