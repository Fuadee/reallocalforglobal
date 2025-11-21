import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import MapContext from './MapContext';

class SimpleClusterGroup {
  constructor(options = {}) {
    this.options = {
      chunkedLoading: false,
      maxClusterRadius: 60,
      spiderfyDistanceMultiplier: 1,
      iconCreateFunction: null,
      ...options,
    };

    this._map = null;
    this._markers = new Set();
    this._clusterLayer = L.layerGroup();
    this._spiderLayer = L.layerGroup();

    this._rebuildClusters = this._rebuildClusters.bind(this);
  }

  addMarker(marker) {
    this._markers.add(marker);
    if (this._map) {
      this._rebuildClusters();
    }
  }

  removeMarker(marker) {
    if (this._markers.has(marker)) {
      this._markers.delete(marker);
    }
    if (this._map) {
      this._rebuildClusters();
    }
  }

  clearLayers() {
    this._clusterLayer.clearLayers();
    this._spiderLayer.clearLayers();
  }

  addTo(map) {
    this._map = map;
    this._clusterLayer.addTo(map);
    this._spiderLayer.addTo(map);
    this._rebuildClusters();

    map.on('zoomend', this._rebuildClusters);
    map.on('moveend', this._rebuildClusters);

    return this;
  }

  remove() {
    if (this._map) {
      this._map.off('zoomend', this._rebuildClusters);
      this._map.off('moveend', this._rebuildClusters);
    }

    this.clearLayers();
    this._clusterLayer.remove();
    this._spiderLayer.remove();
    this._map = null;
  }

  _rebuildClusters() {
    if (!this._map) return;

    this.clearLayers();

    const clusters = [];
    const radius = this.options.maxClusterRadius ?? 60;

    this._markers.forEach((marker) => {
      const point = this._map.latLngToLayerPoint(marker.getLatLng());

      let targetCluster = clusters.find((cluster) => cluster.point.distanceTo(point) <= radius);

      if (!targetCluster) {
        targetCluster = { markers: [], point: point.clone() };
        clusters.push(targetCluster);
      } else {
        const count = targetCluster.markers.length;
        targetCluster.point = new L.Point(
          (targetCluster.point.x * count + point.x) / (count + 1),
          (targetCluster.point.y * count + point.y) / (count + 1),
        );
      }

      targetCluster.markers.push(marker);
    });

    clusters.forEach((cluster) => {
      if (cluster.markers.length === 1) {
        this._clusterLayer.addLayer(cluster.markers[0]);
        return;
      }

      const clusterApi = {
        getAllChildMarkers: () => cluster.markers,
        getChildCount: () => cluster.markers.length,
      };

      const centerLatLng = this._map.layerPointToLatLng(cluster.point);
      const icon = this.options.iconCreateFunction
        ? this.options.iconCreateFunction(clusterApi)
        : L.divIcon({
            className: 'krabi-cluster-icon',
            html:
              '<div style="background:#2d3436;color:#fff;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:700;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.25);">' +
              cluster.markers.length +
              '</div>',
            iconSize: [40, 40],
            iconAnchor: [20, 20],
          });

      const clusterMarker = L.marker(centerLatLng, { icon, interactive: true });
      clusterMarker.on('click', () => this._handleClusterClick(cluster, centerLatLng));

      this._clusterLayer.addLayer(clusterMarker);
    });
  }

  _handleClusterClick(cluster, centerLatLng) {
    if (!this._map) return;

    const zoom = this._map.getZoom();
    const maxZoom = this._map.getMaxZoom();

    if (zoom < maxZoom) {
      this._map.flyTo(centerLatLng, Math.min(zoom + 2, maxZoom), { duration: 0.35 });
      return;
    }

    this._spiderfy(cluster, centerLatLng);
  }

  _spiderfy(cluster, centerLatLng) {
    this._spiderLayer.clearLayers();

    const total = cluster.markers.length;
    const centerPoint = this._map.latLngToLayerPoint(centerLatLng);
    const radius = 35 * (this.options.spiderfyDistanceMultiplier || 1);
    const angleStep = (Math.PI * 2) / total;

    cluster.markers.forEach((marker, index) => {
      const angle = angleStep * index;
      const targetPoint = new L.Point(
        centerPoint.x + radius * Math.cos(angle),
        centerPoint.y + radius * Math.sin(angle),
      );
      const targetLatLng = this._map.layerPointToLatLng(targetPoint);

      const line = L.polyline([centerLatLng, targetLatLng], {
        color: '#666',
        weight: 1,
        opacity: 0.7,
        interactive: false,
      });

      const spiderMarker = L.marker(targetLatLng, marker.options);
      if (marker.__clickHandler) {
        spiderMarker.on('click', marker.__clickHandler);
      }

      const popup = marker.getPopup ? marker.getPopup() : null;
      if (popup) {
        spiderMarker.bindPopup(popup.getContent(), popup.options);
      }

      this._spiderLayer.addLayer(line);
      this._spiderLayer.addLayer(spiderMarker);
    });
  }
}

function MarkerClusterGroup({ children, chunkedLoading = true, maxClusterRadius = 60, iconCreateFunction }) {
  const map = useContext(MapContext);
  const managerRef = useRef(null);
  const [managerState, setManagerState] = useState(null);

  useEffect(() => {
    if (!map) return undefined;

    const manager = new SimpleClusterGroup({
      chunkedLoading,
      maxClusterRadius,
      iconCreateFunction,
    });

    manager.addTo(map);
    managerRef.current = manager;
    setManagerState(manager);

    return () => {
      manager.remove();
      managerRef.current = null;
      setManagerState(null);
    };
  }, [map, chunkedLoading, maxClusterRadius, iconCreateFunction]);

  const wrappedChildren = useMemo(() => {
    if (!children) return null;

    return React.Children.map(children, (child) =>
      child ? React.cloneElement(child, { clusterManager: managerState }) : child,
    );
  }, [children, managerState]);

  return <>{wrappedChildren}</>;
}

export default MarkerClusterGroup;
