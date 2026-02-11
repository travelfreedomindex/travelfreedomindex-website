"use client";

import { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// @ts-ignore - Marker exists in runtime but not in type definitions
import { Marker } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { motion, AnimatePresence } from "framer-motion";
import type { PassportRanking } from "@/lib/types";
import { getFlagEmoji } from "@/lib/data";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface InteractiveWorldMapProps {
  data: PassportRanking[];
  viewMode?: "tfi" | "ratfi";
}

interface CountryDetail {
  country: string;
  country_code: string;
  flag: string;
  tfi_rank: number;
  tfi_score: number;
  ratfi_rank: number;
  ratfi_score: number;
}

// Country name mapping to match TopoJSON names with our data
function createCountryNameMap(data: PassportRanking[]) {
  const map = new Map<string, PassportRanking>();
  
  // TopoJSON name aliases for common mismatches
  const nameAliases: Record<string, string> = {
    "united states of america": "united states",
    "usa": "united states",
    "russian federation": "russia",
    "russia": "russia",
    "korea, republic of": "south korea",
    "korea, democratic people's republic of": "north korea",
    "united kingdom": "united kingdom",
    "britain": "united kingdom",
    "czechia": "czech republic",
    "democratic republic of the congo": "dr congo",
    "congo, democratic republic of the": "dr congo",
    "dem. rep. congo": "dr congo",
    "congo (kinshasa)": "dr congo",
    "republic of congo": "congo",
    "congo, republic of the": "congo",
    "congo (brazzaville)": "congo",
    "tanzania, united republic of": "tanzania",
    "côte d'ivoire": "cote d'ivoire",
    "ivory coast": "cote d'ivoire",
    "bosnia and herzegovina": "bosnia and herzegovina",
    "north macedonia": "north macedonia",
    "macedonia": "north macedonia",
    "eswatini": "eswatini",
    "swaziland": "eswatini",
    "greenland": "denmark",
    "central african republic": "central african republic",
    "cent. african rep.": "central african republic",
    "c.a.r.": "central african republic",
    "south sudan": "south sudan",
    "s. sudan": "south sudan",
    "somalia": "somalia",
    "somaliland": "somalia",
    "guyana": "guyana",
    "suriname": "suriname",
  };
  
  data.forEach((country) => {
    const name = country.country.toLowerCase();
    map.set(name, country);
    map.set(name.replace(/\s+/g, ""), country);
    map.set(country.country_code.toLowerCase(), country);
    
    // Add alias mappings
    Object.entries(nameAliases).forEach(([alias, canonical]) => {
      if (name === canonical) {
        map.set(alias, country);
        map.set(alias.replace(/\s+/g, ""), country);
      }
    });
  });
  return map;
}

// Get country coordinates for markers (capital cities approximately)
const countryCoordinates: Record<string, [number, number]> = {
  // Americas
  US: [-95, 37], CA: [-106, 56], MX: [-102, 23], BR: [-47, -14], AR: [-63, -38],
  CL: [-70, -30], CO: [-74, 4], PE: [-77, -12], VE: [-66, 8], EC: [-78, -1],
  BO: [-63, -17], PY: [-58, -23], UY: [-56, -33], CR: [-84, 10], PA: [-79, 9],
  CU: [-77, 22], DO: [-70, 19], JM: [-77, 18], TT: [-61, 11], BS: [-77, 24],
  HT: [-72, 19], SR: [-56, 4], GY: [-59, 5], BZ: [-88, 17], GT: [-90, 15],
  HN: [-86, 15], NI: [-85, 13], SV: [-88, 14], GL: [-42, 72],
  // Europe
  GB: [-3, 54], DE: [10, 51], FR: [2, 46], IT: [12, 41], ES: [-3, 40],
  PT: [-8, 39], NL: [5, 52], BE: [4, 51], CH: [8, 47], AT: [13, 47],
  SE: [18, 60], NO: [8, 60], DK: [10, 56], FI: [25, 64], IE: [-8, 53],
  GR: [22, 39], PL: [19, 52], CZ: [15, 50], HU: [19, 47], RO: [25, 46],
  BG: [25, 43], HR: [16, 45], SI: [14, 46], SK: [19, 49], LT: [25, 55],
  LV: [24, 57], EE: [25, 59], IS: [-18, 65], LU: [6, 50], MT: [14, 36],
  CY: [33, 35], RS: [21, 44], BA: [18, 44], ME: [19, 42], MK: [21, 42],
  AL: [20, 41], UA: [31, 49], BY: [28, 54], MD: [28, 47], RU: [105, 61],
  // Asia
  TM: [59, 40],
  CN: [104, 35], IN: [78, 20], JP: [138, 36], KR: [127, 37], TH: [100, 15],
  VN: [106, 21], MY: [102, 4], SG: [103.8, 1.3], ID: [106, -6], PH: [121, 14],
  BD: [90, 24], PK: [69, 30], LK: [80, 7], NP: [84, 28], MM: [96, 21],
  KH: [105, 12], LA: [103, 18], TW: [121, 24], HK: [114, 22], MN: [107, 47],
  KP: [126, 40], BN: [114, 4], KZ: [66, 48], UZ: [64, 41], AF: [69, 33],
  // Middle East
  SA: [45, 24], AE: [54, 24], QA: [51, 25], KW: [48, 29], BH: [50, 26],
  OM: [58, 21], JO: [36, 31], LB: [35, 34], IL: [35, 31], TR: [35, 39],
  IR: [51, 32], IQ: [44, 33], SY: [38, 35], YE: [48, 15], PS: [35, 32],
  AZ: [47, 40], GE: [44, 42], AM: [45, 40],
  // Africa - North
  EG: [30, 26], MA: [-7, 32], DZ: [3, 28], TN: [10, 34], LY: [17, 27],
  SD: [32, 15], SS: [31, 7],
  // Africa - West
  NG: [8, 9], GH: [-1, 8], CI: [-5, 8], SN: [-14, 14], ML: [-4, 17],
  BF: [-1, 12], NE: [8, 17], TD: [19, 15], MR: [-10, 20], GM: [-15, 13],
  GN: [-9, 10], SL: [-11, 8], LR: [-9, 6], TG: [1, 8], BJ: [2, 9],
  GW: [-15, 12], CV: [-23, 16],
  // Africa - East
  KE: [36, -1], ET: [38, 9], TZ: [35, -6], UG: [32, 1], SO: [46, 5],
  DJ: [42, 11], ER: [39, 15], RW: [30, -2], BI: [29, -3],
  // Africa - Central
  CD: [23, -4], CG: [15, -1], CM: [11, 6], CF: [20, 7], GA: [11, -1],
  GQ: [10, 2], AO: [17, -12], ZM: [28, -13], MW: [34, -13],
  // Africa - Southern
  ZA: [22, -30], BW: [24, -22], NA: [17, -22], ZW: [29, -19], MZ: [35, -18],
  LS: [28, -29], SZ: [31, -26], MG: [47, -19], MU: [57, -20], SC: [55, -5],
  // Oceania
  AU: [133, -27], NZ: [174, -41], FJ: [178, -18], PG: [147, -6], SB: [160, -9],
};


export default function InteractiveWorldMap({ data, viewMode = "tfi" }: InteractiveWorldMapProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryDetail | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string>("");
  const [zoom, setZoom] = useState({ center: [0, 0] as [number, number], scale: 220 });

  const dataMap = useMemo(() => createCountryNameMap(data), [data]);

  // Get color scale based on view mode
  const { colorScale, getCountryColor } = useMemo(() => {
    const scores = data.map((d) =>
      viewMode === "tfi" ? d.level1_score : d.pri_score
    );
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);

    const scale = scaleLinear<string>()
      .domain([minScore, (minScore + maxScore) / 2, maxScore])
      .range(["#e0e7ff", "#818cf8", "#4338ca"]);

    const getColor = (geo: any) => {
      const geoName = geo.properties?.name?.toLowerCase() || "";
      const country =
        dataMap.get(geoName) || dataMap.get(geoName.replace(/\s+/g, ""));

      if (!country) {
        // Log missing countries for debugging
        if (geoName && !geoName.includes("antarctica")) {
          console.log("Missing color for:", geoName, geo.properties?.name);
        }
        return "#e5e7eb";  // Light gray for missing data
      }

      const score = viewMode === "tfi" ? country.level1_score : country.pri_score;
      return scale(score);
    };

    return { colorScale: scale, getCountryColor: getColor };
  }, [data, dataMap, viewMode]);

  const handleCountryClick = (geo: any) => {
    const geoName = geo.properties?.name?.toLowerCase() || "";
    const country =
      dataMap.get(geoName) || dataMap.get(geoName.replace(/\s+/g, ""));

    if (country) {
      setSelectedCountry({
        country: country.country,
        country_code: country.country_code,
        flag: getFlagEmoji(country.country_code),
        tfi_rank: country.level1_rank,
        tfi_score: country.level1_score,
        ratfi_rank: country.pri_rank,
        ratfi_score: country.pri_score,
      });
    }
  };

  // Zoom into dense regions on hover
  const handleCountryHover = (geo: any) => {
    const name = geo.properties.name;
    setHoveredCountry(name);
    
    // Define dense regions that need zoom
    const denseRegions: Record<string, { center: [number, number]; scale: number }> = {
      // Europe
      'Austria': { center: [13, 47], scale: 800 },
      'Belgium': { center: [4, 51], scale: 1000 },
      'Netherlands': { center: [5, 52], scale: 1000 },
      'Luxembourg': { center: [6, 50], scale: 1200 },
      'Switzerland': { center: [8, 47], scale: 800 },
      'Czech Republic': { center: [15, 50], scale: 800 },
      'Slovakia': { center: [19, 49], scale: 800 },
      'Slovenia': { center: [14, 46], scale: 900 },
      'Croatia': { center: [16, 45], scale: 800 },
      'Bosnia and Herzegovina': { center: [18, 44], scale: 900 },
      'Montenegro': { center: [19, 42], scale: 1000 },
      'Albania': { center: [20, 41], scale: 900 },
      'North Macedonia': { center: [21, 42], scale: 1000 },
      'Kosovo': { center: [21, 43], scale: 1200 },
      'Moldova': { center: [28, 47], scale: 900 },
      // Caribbean
      'Jamaica': { center: [-77, 18], scale: 1200 },
      'Haiti': { center: [-72, 19], scale: 1000 },
      'Dominican Republic': { center: [-70, 19], scale: 1000 },
      'Puerto Rico': { center: [-66, 18], scale: 1500 },
      'Trinidad and Tobago': { center: [-61, 11], scale: 1500 },
      'Barbados': { center: [-59, 13], scale: 2000 },
      'Saint Lucia': { center: [-61, 14], scale: 2000 },
      'Grenada': { center: [-61, 12], scale: 2000 },
      // Central America
      'El Salvador': { center: [-88, 14], scale: 1200 },
      'Belize': { center: [-88, 17], scale: 1000 },
      // West Africa
      'Gambia': { center: [-15, 13], scale: 1200 },
      'Guinea-Bissau': { center: [-15, 12], scale: 1000 },
      'Togo': { center: [1, 8], scale: 1000 },
      'Benin': { center: [2, 9], scale: 900 },
      // Middle East
      'Lebanon': { center: [35, 34], scale: 1200 },
      'Israel': { center: [35, 31], scale: 1000 },
      'Palestine': { center: [35, 32], scale: 1200 },
      'Kuwait': { center: [48, 29], scale: 1200 },
      'Bahrain': { center: [50, 26], scale: 2000 },
      'Qatar': { center: [51, 25], scale: 1500 },
      // Central Africa
      'Rwanda': { center: [30, -2], scale: 1200 },
      'Burundi': { center: [29, -3], scale: 1200 },
      // Southern Africa
      'Lesotho': { center: [28, -29], scale: 1200 },
      'Eswatini': { center: [31, -26], scale: 1200 },
      // Asia
      'Singapore': { center: [103.8, 1.3], scale: 2500 },
      'Hong Kong': { center: [114, 22], scale: 1500 },
      'Macau': { center: [113.5, 22.2], scale: 2500 },
      'Brunei': { center: [114, 4], scale: 1200 },
    };

    if (denseRegions[name]) {
      setZoom(denseRegions[name]);
    } else {
      setZoom({ center: [0, 0], scale: 220 });
    }
  };

  // Top countries to show flags for
  const topCountries = useMemo(() => {
    return data
      .filter((c) => countryCoordinates[c.country_code])
      .map((c) => ({
        ...c,
        coordinates: countryCoordinates[c.country_code],
      }));
  }, [data]);

  return (
    <div className="relative w-full bg-gradient-to-b from-slate-50 to-white shadow-2xl overflow-hidden p-0 m-0 -mt-4">
      {/* Mobile Instructions */}
      <div className="md:hidden bg-blue-50 px-4 py-3 text-sm text-blue-800 border-b border-blue-200">
        <p className="font-semibold mb-1">📱 Tap any country to view details</p>
        <p className="text-xs text-blue-600">Pinch to zoom • Drag to pan</p>
      </div>

      {/* Map */}
      <div className="relative p-0 m-0" style={{ height: "70vh", minHeight: "400px", maxHeight: "800px" }}>
        <ComposableMap
          projectionConfig={{
            scale: zoom.scale,
            center: zoom.center,
          }}
          className="w-full h-full transition-all duration-500 ease-in-out touch-pan-y touch-pinch-zoom"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getCountryColor(geo)}
                  stroke="#ffffff"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: {
                      outline: "none",
                      fill: "#7c3aed",
                      cursor: "pointer",
                    },
                    pressed: { outline: "none" },
                  }}
                  onMouseEnter={() => handleCountryHover(geo)}
                  onMouseLeave={() => {
                    setHoveredCountry("");
                    setZoom({ center: [0, 0], scale: 220 });
                  }}
                  onClick={() => handleCountryClick(geo)}
                />
              ))
            }
          </Geographies>

          {/* Flag Markers for Top Countries */}
          {topCountries.map((country) => (
            <Marker
              key={country.country_code}
              coordinates={country.coordinates}
            >
              <g
                className="cursor-pointer hover:scale-125 transition-transform"
                style={{ pointerEvents: "all" }}
                onClick={() => {
                  setSelectedCountry({
                    country: country.country,
                    country_code: country.country_code,
                    flag: getFlagEmoji(country.country_code),
                    tfi_rank: country.level1_rank,
                    tfi_score: country.level1_score,
                    ratfi_rank: country.pri_rank,
                    ratfi_score: country.pri_score,
                  });
                }}
              >
                <circle r={8} fill="white" fillOpacity={0.9} />
                <text
                  textAnchor="middle"
                  y={4}
                  style={{ fontSize: "14px", userSelect: "none" }}
                >
                  {getFlagEmoji(country.country_code)}
                </text>
              </g>
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* Country Detail Panel - Mobile optimized */}
      <AnimatePresence>
        {selectedCountry && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed md:absolute bottom-0 md:top-0 left-0 md:left-auto md:right-0 w-full md:w-80 md:h-full bg-white shadow-2xl overflow-y-auto z-20 max-h-[80vh] md:max-h-full rounded-t-2xl md:rounded-none"
          >
            <button
              onClick={() => setSelectedCountry(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 z-30 bg-white rounded-full p-2 shadow-md"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Mobile drag handle */}
            <div className="md:hidden flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>

            <div className="p-6 space-y-6">
              <div className="text-center">
                <div className="text-6xl mb-3">{selectedCountry.flag}</div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {selectedCountry.country}
                </h3>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h4 className="text-sm font-semibold text-slate-500 mb-3">
                  TRAVEL FREEDOM INDEX (TFI)
                </h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600">Rank</span>
                  <span className="text-2xl font-bold text-indigo-600">
                    #{selectedCountry.tfi_rank}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Score</span>
                  <span className="text-xl font-semibold text-slate-900">
                    {selectedCountry.tfi_score.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h4 className="text-sm font-semibold text-slate-500 mb-3">
                  RECIPROCITY-ADJUSTED INDEX (RATFI)
                </h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600">Rank</span>
                  <span className="text-2xl font-bold text-purple-600">
                    #{selectedCountry.ratfi_rank}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Score</span>
                  <span className="text-xl font-semibold text-slate-900">
                    {selectedCountry.ratfi_score.toFixed(2)}
                  </span>
                </div>
              </div>

              <a
                href={`/country/${selectedCountry.country_code.toLowerCase()}`}
                className="block w-full text-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                View Full Details →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend - Mobile optimized */}
      <div className="absolute bottom-4 left-4 right-4 md:right-auto bg-white/95 backdrop-blur-sm rounded-lg px-3 md:px-4 py-2 md:py-3 shadow-lg">
        <div className="text-xs font-semibold text-slate-700 mb-2">
          {viewMode === "tfi" ? "TFI Score" : "RATFI Score"}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Low</span>
          <div className="flex h-3 flex-1 md:w-32">
            <div className="flex-1 bg-[#e0e7ff]"></div>
            <div className="flex-1 bg-[#c7d2fe]"></div>
            <div className="flex-1 bg-[#a5b4fc]"></div>
            <div className="flex-1 bg-[#818cf8]"></div>
            <div className="flex-1 bg-[#4338ca]"></div>
          </div>
          <span className="text-xs text-slate-500">High</span>
        </div>
        <div className="text-xs text-slate-500 mt-2 hidden md:block">
          Click on flags or countries to view details
        </div>
      </div>
    </div>
  );
}
