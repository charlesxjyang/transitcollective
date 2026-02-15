"use client";

import { useRef, useCallback, ReactNode } from "react";
import Map, { MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { createMapStyle } from "@/lib/map/map-styles";

interface TransitMapProps {
  children?: ReactNode;
  onMapLoad?: (map: maplibregl.Map) => void;
  latitude?: number;
  longitude?: number;
  zoom?: number;
}

const US_CENTER = { latitude: 39.5, longitude: -98.0, zoom: 4 };

export function TransitMap({
  children,
  onMapLoad,
  latitude = US_CENTER.latitude,
  longitude = US_CENTER.longitude,
  zoom = US_CENTER.zoom,
}: TransitMapProps) {
  const mapRef = useRef<MapRef>(null);
  const initializedRef = useRef(false);

  const handleLoad = useCallback(() => {
    if (mapRef.current && !initializedRef.current) {
      initializedRef.current = true;
      onMapLoad?.(mapRef.current.getMap());
    }
  }, [onMapLoad]);

  return (
    <Map
      ref={mapRef}
      initialViewState={{ latitude, longitude, zoom }}
      style={{ width: "100%", height: "100%" }}
      mapStyle={createMapStyle()}
      onLoad={handleLoad}
      maxZoom={14}
      minZoom={3}
      attributionControl={false}
    >
      {children}
    </Map>
  );
}
