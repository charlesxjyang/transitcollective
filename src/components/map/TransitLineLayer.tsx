"use client";

import { useEffect } from "react";
import { useMap } from "react-map-gl/maplibre";
import { transitLines } from "@/lib/data/transit-lines";

const SOURCE_ID = "transit-lines";

export function TransitLineLayer() {
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) return;
    const m = map.getMap();

    function addLayers() {
      if (m.getSource(SOURCE_ID)) return;

      m.addSource(SOURCE_ID, {
        type: "geojson",
        data: transitLines,
      });

      // Glow layer (wide, translucent)
      m.addLayer({
        id: "transit-lines-glow",
        type: "line",
        source: SOURCE_ID,
        paint: {
          "line-color": ["get", "color"],
          "line-width": 10,
          "line-opacity": 0.15,
          "line-blur": 8,
        },
      });

      // Core line (thin, solid)
      m.addLayer({
        id: "transit-lines-core",
        type: "line",
        source: SOURCE_ID,
        paint: {
          "line-color": ["get", "color"],
          "line-width": 3,
          "line-opacity": 0.7,
        },
      });
    }

    if (m.isStyleLoaded()) {
      addLayers();
    } else {
      m.on("style.load", addLayers);
    }

    return () => {
      m.off("style.load", addLayers);
      try {
        if (m.getStyle()) {
          if (m.getLayer("transit-lines-core")) m.removeLayer("transit-lines-core");
          if (m.getLayer("transit-lines-glow")) m.removeLayer("transit-lines-glow");
          if (m.getSource(SOURCE_ID)) m.removeSource(SOURCE_ID);
        }
      } catch {
        // Map already removed during navigation
      }
    };
  }, [map]);

  return null;
}
