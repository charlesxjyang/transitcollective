"use client";

import { Marker } from "react-map-gl/maplibre";
import { TransitBond } from "@/types/bond";
import { cn } from "@/lib/utils";

interface BondMarkerProps {
  bond: TransitBond;
  selected?: boolean;
  onClick?: () => void;
}

export function BondMarker({ bond, selected, onClick }: BondMarkerProps) {
  return (
    <Marker
      longitude={bond.coordinates[0]}
      latitude={bond.coordinates[1]}
      anchor="center"
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        onClick?.();
      }}
    >
      <button
        className={cn(
          "group relative flex items-center justify-center rounded-full border-2 bg-white transition-all duration-300 hover:scale-110",
          selected ? "h-12 w-12" : "h-9 w-9"
        )}
        style={{
          borderColor: bond.color,
          boxShadow: selected
            ? `0 0 12px ${bond.color}80, 0 0 24px ${bond.color}40`
            : `0 0 6px ${bond.color}40`,
        }}
      >
        <span
          className={cn(
            "font-mono font-bold leading-none",
            selected ? "text-[11px]" : "text-[9px]"
          )}
          style={{ color: bond.color }}
        >
          {bond.agencyAbbrev.length > 4
            ? bond.agencyAbbrev.slice(0, 4)
            : bond.agencyAbbrev}
        </span>
        {selected && (
          <span
            className="absolute -bottom-5 whitespace-nowrap rounded bg-white px-1.5 py-0.5 text-[10px] font-semibold shadow-md"
            style={{ color: bond.color }}
          >
            {bond.city}
          </span>
        )}
      </button>
    </Marker>
  );
}
