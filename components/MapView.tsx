"use client";

import React, { useState, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { PassportRanking } from "@/lib/types";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Mapping of country names from TopoJSON to our alpha-2 codes
// This uses the "name" property from the TopoJSON properties
const createCountryNameMap = (data: PassportRanking[]) => {
  const map = new Map<string, PassportRanking>();
  
  data.forEach(country => {
    // Add the country name as key
    map.set(country.country.toLowerCase(), country);
    // Also add common variations
    const name = country.country.toLowerCase();
    map.set(name.replace(/\s+/g, ''), country); // Remove spaces
  });
  
  return map;
};

interface MapViewProps {
  data: PassportRanking[];
  viewMode: "tfi" | "ratfi" | "comparison";
  searchQuery: string;
  onCountryClick: (code: string) => void;
}

const MapView: React.FC<MapViewProps> = ({
  data,
  viewMode,
  searchQuery,
  onCountryClick,
}) => {
  const [tooltipContent, setTooltipContent] = useState<string>("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Create a map using country names
  const dataMap = createCountryNameMap(data);

  // Determine color scale based on view mode
  const getColorScale = () => {
    if (viewMode === "tfi") {
      // TFI: Higher scores = darker green
      const scores = data.map((d) => d.level1_score);
      return scaleLinear<string>()
        .domain([Math.min(...scores), Math.max(...scores)])
        .range(["#e5f5e0", "#31a354"]);
    } else if (viewMode === "ratfi") {
      // RATFI: Higher scores = darker blue
      const scores = data.map((d) => d.pri_score);
      return scaleLinear<string>()
        .domain([Math.min(...scores), Math.max(...scores)])
        .range(["#deebf7", "#3182bd"]);
    } else {
      // Comparison: Negative = orange, Positive = green
      const diffs = data.map((d) => d.level1_rank - d.pri_rank);
      const maxDiff = Math.max(...diffs.map(Math.abs));
      return scaleLinear<string>()
        .domain([-maxDiff, 0, maxDiff])
        .range(["#fdae6b", "#f7f7f7", "#74c476"]);
    }
  };

  const colorScale = getColorScale();

  const getCountryColor = (geo: any): string => {
    // Try to find country by name from geo.properties
    const geoName = geo.properties?.name?.toLowerCase() || "";
    const country = dataMap.get(geoName) || dataMap.get(geoName.replace(/\s+/g, ''));
    
    if (!country) return "#e0e0e0"; // Gray for countries not in data

    // Highlight searched country
    if (
      searchQuery &&
      country.country.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return "#ff6b6b"; // Red highlight for search
    }

    if (viewMode === "tfi") {
      return colorScale(country.level1_score) as string;
    } else if (viewMode === "ratfi") {
      return colorScale(country.pri_score) as string;
    } else {
      const diff = country.level1_rank - country.pri_rank;
      return colorScale(diff) as string;
    }
  };

  const handleMouseEnter = (
    geo: { id: string; properties: any },
    event: React.MouseEvent<SVGPathElement>
  ) => {
    const geoName = geo.properties?.name?.toLowerCase() || "";
    const country = dataMap.get(geoName) || dataMap.get(geoName.replace(/\s+/g, ''));

    if (country) {
      let content = `<strong>${country.country}</strong><br/>`;
      if (viewMode === "tfi") {
        content += `TFI Rank: #${country.level1_rank}<br/>TFI Score: ${country.level1_score.toFixed(2)}`;
      } else if (viewMode === "ratfi") {
        content += `RATFI Rank: #${country.pri_rank}<br/>RATFI Score: ${country.pri_score.toFixed(2)}`;
      } else {
        const diff = country.level1_rank - country.pri_rank;
        const arrow = diff > 0 ? "↑" : diff < 0 ? "↓" : "→";
        content += `TFI: #${country.level1_rank} ${arrow} RATFI: #${country.pri_rank}<br/>`;
        content += `Change: ${diff > 0 ? "+" : ""}${diff} positions`;
      }
      setTooltipContent(content);
      setTooltipPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  const handleClick = (geo: { id: string; properties: any }) => {
    const geoId = geo.id;
    const country = dataMap.get(geoId);
    if (country) {
      onCountryClick(country.country_code);
    }
  };

  return (
    <div className="relative w-full" style={{ height: "600px" }}>
      <ComposableMap
        projectionConfig={{
          scale: 147,
          center: [0, 20],
        }}
        className="w-full h-full"
      >
        <ZoomableGroup center={[0, 20]} zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => {
                const geoId = geo.id;
                const fillColor = getCountryColor(geo);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    stroke="#ffffff"
                    strokeWidth={0.5}
                    onMouseEnter={(event: React.MouseEvent<SVGPathElement>) => handleMouseEnter(geo, event)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(geo)}
                    style={{
                      default: { outline: "none" },
                      hover: {
                        fill: "#ff6b6b",
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {tooltipContent && (
        <div
          className="absolute bg-gray-900 text-white text-sm p-3 rounded shadow-lg pointer-events-none z-50"
          style={{
            left: `${tooltipPosition.x + 10}px`,
            top: `${tooltipPosition.y + 10}px`,
          }}
          dangerouslySetInnerHTML={{ __html: tooltipContent }}
        />
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
        <div className="text-sm font-semibold mb-2">
          {viewMode === "tfi"
            ? "TFI Score"
            : viewMode === "ratfi"
            ? "RATFI Score"
            : "Rank Change"}
        </div>
        <div className="flex items-center gap-2">
          {viewMode === "comparison" ? (
            <>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-[#fdae6b]"></div>
                <span className="text-xs">Worse</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-[#f7f7f7]"></div>
                <span className="text-xs">Same</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-[#74c476]"></div>
                <span className="text-xs">Better</span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1">
              <div
                className={`w-20 h-4 ${
                  viewMode === "tfi"
                    ? "bg-gradient-to-r from-[#e5f5e0] to-[#31a354]"
                    : "bg-gradient-to-r from-[#deebf7] to-[#3182bd]"
                }`}
              ></div>
              <span className="text-xs ml-2">Low → High</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(MapView);
