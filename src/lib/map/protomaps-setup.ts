import maplibregl from "maplibre-gl";
import { Protocol } from "pmtiles";

let protocol: Protocol | null = null;

export function initProtomaps() {
  if (protocol) return;
  protocol = new Protocol();
  maplibregl.addProtocol("pmtiles", protocol.tile);
}

export function cleanupProtomaps() {
  if (!protocol) return;
  maplibregl.removeProtocol("pmtiles");
  protocol = null;
}
