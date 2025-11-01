# Complete Project Files for Equinor Assets Dashboard

This document contains all the source code files for the Interactive Geospatial Analytics Dashboard for Equinor Assets.

## Package Configuration

### package.json
```json
{
  "name": "vite-react-typescript-starter",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "deploy": "npm run build"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.57.4",
    "leaflet": "^1.9.4",
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-leaflet": "^4.2.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/leaflet": "^1.9.12",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}
```

## Build Configuration

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### postcss.config.js
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### tsconfig.json
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

### tsconfig.app.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

### tsconfig.node.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

### eslint.config.js
```javascript
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);
```

## HTML Entry Point

### index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Interactive Geospatial Analytics Dashboard for Equinor Assets</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## CSS Styles

### src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## TypeScript Definitions

### src/vite-env.d.ts
```typescript
/// <reference types="vite/client" />
```

## Application Entry Point

### src/main.tsx
```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### src/App.tsx
```typescript
import React from 'react';
import { Dashboard } from './components/Dashboard';

function App() {
  return <Dashboard />;
}

export default App;
```

## Type Definitions

### src/types/assets.ts
```typescript
export interface AssetCoordinates {
  latitude: number;
  longitude: number;
}

export interface AssetLocation {
  country: string;
  region: string;
  coordinates: AssetCoordinates;
  water_depth: string;
  nearby_cities: string;
}

export interface AssetBasicInfo {
  name: string;
  type: string;
  classification: string;
  production_type: string;
}

export interface AssetOperationalData {
  production_capacity: string;
  year_commissioned: number;
  current_status: string;
  development_phase: string;
  estimated_workforce: string;
}

export interface AssetOwnership {
  equinor_share: string;
  primary_contact: string;
}

export interface AssetEnvironmental {
  co2_emissions_intensity: string;
  certifications: string;
}

export interface Asset {
  asset_id: string;
  basic_info: AssetBasicInfo;
  location: AssetLocation;
  operational_data: AssetOperationalData;
  ownership: AssetOwnership;
  environmental: AssetEnvironmental;
  data_quality: string;
}

export interface AssetsSummaryStatistics {
  assets_by_country: Record<string, number>;
  assets_by_type: Record<string, number>;
  assets_by_status: Record<string, number>;
  production_types: Record<string, number>;
}

export interface AssetsMetadata {
  title: string;
  description: string;
  version: string;
  last_updated: string;
  total_assets: number;
  countries: number;
  asset_types: number;
  data_sources: string[];
}

export interface AssetsDatabase {
  metadata: AssetsMetadata;
  summary_statistics: AssetsSummaryStatistics;
  assets: Asset[];
}

export interface MarkerColors {
  [key: string]: string;
}
```

## Utility Functions

### src/utils/assetUtils.ts
```typescript
import { Asset, MarkerColors } from '../types/assets';

export const generateAssetTypeColors = (assets: Asset[]): MarkerColors => {
  const assetTypes = [...new Set(assets.map(asset => asset.basic_info.type))];
  
  // Predefined colors for common asset types
  const predefinedColors: Record<string, string> = {
    'Oil Field': '#dc2626', // Red
    'Gas Field': '#2563eb', // Blue
    'Offshore Wind Farm': '#16a34a', // Green
    'Solar Plant': '#eab308', // Yellow
    'Floating Wind Farm': '#059669', // Emerald
    'Gas Processing Plant': '#7c3aed', // Purple
    'Oil Terminal': '#ea580c', // Orange
    'LNG Terminal': '#0891b2', // Cyan
    'Refinery': '#be123c', // Rose
    'Methanol Plant': '#7c2d12', // Amber
    'Gas Project': '#4338ca', // Indigo
    'NGL Plant': '#9333ea', // Violet
    'Oil Development': '#c2410c', // Orange-red
    'Oil Platform': '#b91c1c', // Red-600
  };

  // Fallback colors for any additional types
  const fallbackColors = [
    '#f59e0b', '#10b981', '#f97316', '#06b6d4', '#8b5cf6',
    '#ef4444', '#14b8a6', '#f59e0b', '#3b82f6', '#84cc16'
  ];

  const colors: MarkerColors = {};
  let fallbackIndex = 0;

  assetTypes.forEach(type => {
    if (predefinedColors[type]) {
      colors[type] = predefinedColors[type];
    } else {
      colors[type] = fallbackColors[fallbackIndex % fallbackColors.length];
      fallbackIndex++;
    }
  });

  return colors;
};

export const filterAssets = (assets: Asset[], searchTerm: string, selectedCountry: string, selectedType: string): Asset[] => {
  return assets.filter(asset => {
    const matchesSearch = !searchTerm || 
      asset.basic_info.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.location.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.basic_info.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.location.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.operational_data.current_status.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCountry = !selectedCountry || asset.location.country === selectedCountry;
    const matchesType = !selectedType || asset.basic_info.type === selectedType;
    
    return matchesSearch && matchesCountry && matchesType;
  });
};

export const calculateStatistics = (assets: Asset[]) => {
  const countries = new Set(assets.map(asset => asset.location.country));
  const assetTypes = new Set(assets.map(asset => asset.basic_info.type));
  const operationalAssets = assets.filter(asset => 
    asset.operational_data.current_status === 'Operational'
  );

  return {
    totalAssets: assets.length,
    totalCountries: countries.size,
    totalAssetTypes: assetTypes.size,
    operationalAssets: operationalAssets.length,
  };
};
```

## React Components

### src/components/Dashboard.tsx
```typescript
import React, { useState, useMemo } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { Asset, AssetsDatabase } from '../types/assets';
import { generateAssetTypeColors, filterAssets } from '../utils/assetUtils';
import { SearchPanel } from './SearchPanel';
import { StatisticsPanel } from './StatisticsPanel';
import { AssetLegend } from './AssetLegend';
import { GeospatialMap } from './GeospatialMap';
import assetsData from '../data/equinor_assets_database.json';

export const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const database = assetsData as AssetsDatabase;
  const assets = database.assets;

  const assetTypeColors = useMemo(() => generateAssetTypeColors(assets), [assets]);

  const filteredAssets = useMemo(() => 
    filterAssets(assets, searchTerm, selectedCountry, selectedType),
    [assets, searchTerm, selectedCountry, selectedType]
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden mr-4 p-2 rounded-md hover:bg-gray-100"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Globe className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{database.metadata.title}</h1>
            <p className="text-sm text-gray-600 hidden sm:block">{database.metadata.description}</p>
          </div>
        </div>
        <div className="text-sm text-gray-600 hidden md:block">
          Last updated: {database.metadata.last_updated}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          fixed lg:relative z-20 lg:z-0
          w-80 lg:w-96 bg-white shadow-lg lg:shadow-none
          h-full lg:h-auto flex-shrink-0
          border-r border-gray-200
        `}>
          <div className="p-6 h-full overflow-y-auto">
            <SearchPanel
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              assets={assets}
              filteredAssets={filteredAssets}
            />
            
            <AssetLegend assetTypeColors={assetTypeColors} />
            
            <div className="mt-6 bg-white rounded-lg shadow-md p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Quick Stats</h3>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Total Assets: {database.metadata.total_assets}</div>
                <div>Countries: {database.metadata.countries}</div>
                <div>Asset Types: {database.metadata.asset_types}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 bg-white border-b border-gray-200">
            <StatisticsPanel assets={assets} filteredAssets={filteredAssets} />
          </div>
          
          <div className="flex-1 p-6">
            <GeospatialMap
              assets={filteredAssets}
              assetTypeColors={assetTypeColors}
              selectedAsset={selectedAsset}
              setSelectedAsset={setSelectedAsset}
            />
          </div>
        </div>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
```

### src/components/SearchPanel.tsx
```typescript
import React from 'react';
import { Search, MapPin, Factory, Filter } from 'lucide-react';
import { Asset } from '../types/assets';

interface SearchPanelProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  assets: Asset[];
  filteredAssets: Asset[];
}

export const SearchPanel: React.FC<SearchPanelProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCountry,
  setSelectedCountry,
  selectedType,
  setSelectedType,
  assets,
  filteredAssets,
}) => {
  const countries = [...new Set(assets.map(asset => asset.location.country))].sort();
  const assetTypes = [...new Set(assets.map(asset => asset.basic_info.type))].sort();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Search & Filter</h3>
      </div>
      
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search assets, locations, countries..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Country Filter */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* Asset Type Filter */}
        <div className="relative">
          <Factory className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Asset Types</option>
            {assetTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Results Summary */}
        <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
          Showing <span className="font-semibold text-blue-600">{filteredAssets.length}</span> of{' '}
          <span className="font-semibold">{assets.length}</span> assets
        </div>
      </div>
    </div>
  );
};
```

### src/components/StatisticsPanel.tsx
```typescript
import React from 'react';
import { BarChart3, Globe, Factory, Power } from 'lucide-react';
import { Asset } from '../types/assets';
import { calculateStatistics } from '../utils/assetUtils';

interface StatisticsPanelProps {
  assets: Asset[];
  filteredAssets: Asset[];
}

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ assets, filteredAssets }) => {
  const totalStats = calculateStatistics(assets);
  const filteredStats = calculateStatistics(filteredAssets);

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    filteredValue, 
    color 
  }: { 
    icon: React.ComponentType<any>, 
    title: string, 
    value: number, 
    filteredValue: number, 
    color: string 
  }) => (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4" style={{ borderColor: color }}>
      <div className="flex items-center">
        <Icon className="h-8 w-8 mr-3" style={{ color }} />
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {filteredValue}
            {filteredValue !== value && (
              <span className="text-sm text-gray-500 font-normal ml-1">/ {value}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Asset Statistics</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Factory}
          title="Total Assets"
          value={totalStats.totalAssets}
          filteredValue={filteredStats.totalAssets}
          color="#dc2626"
        />
        <StatCard
          icon={Globe}
          title="Countries"
          value={totalStats.totalCountries}
          filteredValue={filteredStats.totalCountries}
          color="#2563eb"
        />
        <StatCard
          icon={BarChart3}
          title="Asset Types"
          value={totalStats.totalAssetTypes}
          filteredValue={filteredStats.totalAssetTypes}
          color="#16a34a"
        />
        <StatCard
          icon={Power}
          title="Operational"
          value={totalStats.operationalAssets}
          filteredValue={filteredStats.operationalAssets}
          color="#eab308"
        />
      </div>
    </div>
  );
};
```

### src/components/AssetLegend.tsx
```typescript
import React from 'react';
import { MarkerColors } from '../types/assets';
import { Layers } from 'lucide-react';

interface AssetLegendProps {
  assetTypeColors: MarkerColors;
}

export const AssetLegend: React.FC<AssetLegendProps> = ({ assetTypeColors }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Layers className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Asset Types Legend</h3>
      </div>
      
      <div className="space-y-2">
        {Object.entries(assetTypeColors).map(([type, color]) => (
          <div key={type} className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full border-2 border-white shadow-sm mr-3 flex-shrink-0"
              style={{ backgroundColor: color }}
            ></div>
            <span className="text-sm text-gray-700">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### src/components/GeospatialMap.tsx
```typescript
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl, LayersControl } from 'react-leaflet';
import { Asset, MarkerColors } from '../types/assets';
import { AssetMarker } from './AssetMarker';
import { AssetDetailPanel } from './AssetDetailPanel';
import 'leaflet/dist/leaflet.css';

interface GeospatialMapProps {
  assets: Asset[];
  assetTypeColors: MarkerColors;
  selectedAsset: Asset | null;
  setSelectedAsset: (asset: Asset | null) => void;
}

export const GeospatialMap: React.FC<GeospatialMapProps> = ({
  assets,
  assetTypeColors,
  selectedAsset,
  setSelectedAsset,
}) => {
  const [mapCenter] = useState<[number, number]>([60, 5]); // Center on Norway
  const [mapZoom] = useState<number>(4);

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const handleCloseDetail = () => {
    setSelectedAsset(null);
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="w-full h-full rounded-lg"
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        
        <LayersControl position="topleft">
          <LayersControl.BaseLayer checked name="ESRI Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              maxZoom={18}
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              maxZoom={19}
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="ESRI Streets">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom"
              maxZoom={18}
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="ESRI Topographic">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
              maxZoom={18}
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {assets.map((asset) => (
          <AssetMarker
            key={asset.asset_id}
            asset={asset}
            color={assetTypeColors[asset.basic_info.type] || '#666666'}
            onAssetClick={handleAssetClick}
          />
        ))}
      </MapContainer>

      {selectedAsset && (
        <AssetDetailPanel
          asset={selectedAsset}
          onClose={handleCloseDetail}
          assetColor={assetTypeColors[selectedAsset.basic_info.type] || '#666666'}
        />
      )}
    </div>
  );
};
```

### src/components/AssetMarker.tsx
```typescript
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Asset } from '../types/assets';

interface AssetMarkerProps {
  asset: Asset;
  color: string;
  onAssetClick: (asset: Asset) => void;
}

export const AssetMarker: React.FC<AssetMarkerProps> = ({ asset, color, onAssetClick }) => {
  const createCustomIcon = (color: string) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${color};
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: transform 0.2s ease;
        "></div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'under development': return 'bg-blue-100 text-blue-800';
      case 'under construction': return 'bg-yellow-100 text-yellow-800';
      case 'decommissioned': return 'bg-gray-100 text-gray-800';
      case 'pre-construction': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Marker
      position={[asset.location.coordinates.latitude, asset.location.coordinates.longitude]}
      icon={createCustomIcon(color)}
      eventHandlers={{
        click: () => onAssetClick(asset),
      }}
    >
      <Popup className="custom-popup" maxWidth={400}>
        <div className="p-4 max-w-sm">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900 pr-2">{asset.basic_info.name}</h3>
            <span 
              className="inline-block w-4 h-4 rounded-full border-2 border-white shadow-sm flex-shrink-0"
              style={{ backgroundColor: color }}
            ></span>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <span className="font-medium text-gray-600 w-20">Type:</span>
              <span className="text-gray-900">{asset.basic_info.type}</span>
            </div>
            
            <div className="flex items-center">
              <span className="font-medium text-gray-600 w-20">Location:</span>
              <span className="text-gray-900">{asset.location.country}</span>
            </div>
            
            <div className="flex items-center">
              <span className="font-medium text-gray-600 w-20">Status:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(asset.operational_data.current_status)}`}>
                {asset.operational_data.current_status}
              </span>
            </div>
            
            <div className="flex items-center">
              <span className="font-medium text-gray-600 w-20">Capacity:</span>
              <span className="text-gray-900">{asset.operational_data.production_capacity}</span>
            </div>
            
            <div className="flex items-center">
              <span className="font-medium text-gray-600 w-20">Year:</span>
              <span className="text-gray-900">{asset.operational_data.year_commissioned}</span>
            </div>

            <div className="flex items-center">
              <span className="font-medium text-gray-600 w-20">Share:</span>
              <span className="text-gray-900">{asset.ownership.equinor_share}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              <strong>Region:</strong> {asset.location.region}
            </p>
            {asset.location.nearby_cities && (
              <p className="text-xs text-gray-600 mt-1">
                <strong>Nearby:</strong> {asset.location.nearby_cities}
              </p>
            )}
          </div>
        </div>
      </Popup>
    </Marker>
  );
};
```

### src/components/AssetDetailPanel.tsx
```typescript
import React from 'react';
import { X, MapPin, Factory, Calendar, Users, Zap, Award, Gauge } from 'lucide-react';
import { Asset } from '../types/assets';

interface AssetDetailPanelProps {
  asset: Asset | null;
  onClose: () => void;
  assetColor: string;
}

export const AssetDetailPanel: React.FC<AssetDetailPanelProps> = ({ asset, onClose, assetColor }) => {
  if (!asset) return null;

  const DetailRow = ({ icon: Icon, label, value }: { icon: React.ComponentType<any>, label: string, value: string }) => (
    <div className="flex items-start py-2">
      <Icon className="h-4 w-4 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
      <div className="min-w-0 flex-1">
        <span className="text-sm font-medium text-gray-600">{label}:</span>
        <span className="text-sm text-gray-900 ml-2">{value}</span>
      </div>
    </div>
  );

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'under development': return 'bg-blue-100 text-blue-800';
      case 'under construction': return 'bg-yellow-100 text-yellow-800';
      case 'decommissioned': return 'bg-gray-100 text-gray-800';
      case 'pre-construction': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
          <div className="flex items-start">
            <div 
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm mr-3 mt-0.5 flex-shrink-0"
              style={{ backgroundColor: assetColor }}
            ></div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{asset.basic_info.name}</h2>
              <p className="text-sm text-gray-600">{asset.basic_info.type} • {asset.location.country}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <DetailRow icon={Factory} label="Asset Type" value={asset.basic_info.type} />
              <DetailRow icon={MapPin} label="Classification" value={asset.basic_info.classification} />
              <DetailRow icon={Zap} label="Production Type" value={asset.basic_info.production_type} />
              <div className="flex items-start py-2">
                <Gauge className="h-4 w-4 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(asset.operational_data.current_status)}`}>
                    {asset.operational_data.current_status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Details</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <DetailRow icon={MapPin} label="Country" value={asset.location.country} />
              <DetailRow icon={MapPin} label="Region" value={asset.location.region} />
              <DetailRow icon={MapPin} label="Coordinates" value={`${asset.location.coordinates.latitude}, ${asset.location.coordinates.longitude}`} />
              <DetailRow icon={MapPin} label="Water Depth" value={asset.location.water_depth} />
              <DetailRow icon={MapPin} label="Nearby Cities" value={asset.location.nearby_cities} />
            </div>
          </div>

          {/* Operational Data */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Operational Data</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <DetailRow icon={Gauge} label="Production Capacity" value={asset.operational_data.production_capacity} />
              <DetailRow icon={Calendar} label="Year Commissioned" value={asset.operational_data.year_commissioned.toString()} />
              <DetailRow icon={Factory} label="Development Phase" value={asset.operational_data.development_phase} />
              <DetailRow icon={Users} label="Estimated Workforce" value={asset.operational_data.estimated_workforce} />
            </div>
          </div>

          {/* Ownership & Environmental */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ownership</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <DetailRow icon={Factory} label="Equinor Share" value={asset.ownership.equinor_share} />
                <DetailRow icon={Users} label="Primary Contact" value={asset.ownership.primary_contact} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Environmental</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <DetailRow icon={Zap} label="CO2 Emissions" value={asset.environmental.co2_emissions_intensity} />
                <DetailRow icon={Award} label="Certifications" value={asset.environmental.certifications} />
              </div>
            </div>
          </div>

          {/* Data Quality */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Quality</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center">
                <Award className="h-4 w-4 text-gray-500 mr-3" />
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  asset.data_quality === 'High' ? 'bg-green-100 text-green-800' :
                  asset.data_quality === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {asset.data_quality} Quality
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

## Deployment Configuration

### netlify.toml
```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "max-age=31536000"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "max-age=31536000"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "max-age=31536000"
```

### .github/workflows/deploy.yml
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run build

    - name: Setup Pages
      uses: actions/configure-pages@v4

    - name: Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: './dist'

    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false
```

### dist/_redirects
```
/*    /index.html   200
```

## Asset Database

### src/data/equinor_assets_database.json
```json
{
  "metadata": {
    "title": "Interactive Geospatial Analytics Dashboard for Equinor Assets",
    "description": "Comprehensive visualization of Equinor's global asset portfolio with interactive mapping capabilities",
    "version": "1.0.0",
    "last_updated": "2024-01-15",
    "total_assets": 45,
    "countries": 8,
    "asset_types": 14,
    "data_sources": [
      "Equinor Annual Report 2023",
      "Public Asset Databases",
      "Regulatory Filings",
      "Company Press Releases"
    ]
  },
  "summary_statistics": {
    "assets_by_country": {
      "Norway": 25,
      "United Kingdom": 8,
      "United States": 5,
      "Brazil": 3,
      "Canada": 2,
      "Angola": 1,
      "Algeria": 1
    },
    "assets_by_type": {
      "Oil Field": 15,
      "Gas Field": 12,
      "Offshore Wind Farm": 6,
      "Gas Processing Plant": 4,
      "Oil Terminal": 3,
      "LNG Terminal": 2,
      "Refinery": 2,
      "Solar Plant": 1
    },
    "assets_by_status": {
      "Operational": 32,
      "Under Development": 8,
      "Under Construction": 3,
      "Decommissioned": 2
    },
    "production_types": {
      "Oil & Gas": 35,
      "Renewable Energy": 7,
      "Processing & Refining": 3
    }
  },
  "assets": [
    {
      "asset_id": "EQ_001",
      "basic_info": {
        "name": "Johan Sverdrup",
        "type": "Oil Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "Norway",
        "region": "North Sea",
        "coordinates": {
          "latitude": 58.8833,
          "longitude": 2.7833
        },
        "water_depth": "110-120m",
        "nearby_cities": "Stavanger (140km)"
      },
      "operational_data": {
        "production_capacity": "755,000 boe/d",
        "year_commissioned": 2019,
        "current_status": "Operational",
        "development_phase": "Phase 2 Complete",
        "estimated_workforce": "200-300"
      },
      "ownership": {
        "equinor_share": "42.6%",
        "primary_contact": "Johan Sverdrup Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "0.67 kg CO2/boe",
        "certifications": "ISO 14001, OSPAR"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_002",
      "basic_info": {
        "name": "Troll",
        "type": "Gas Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "Norway",
        "region": "North Sea",
        "coordinates": {
          "latitude": 60.6433,
          "longitude": 3.7167
        },
        "water_depth": "300-345m",
        "nearby_cities": "Bergen (65km)"
      },
      "operational_data": {
        "production_capacity": "120,000 boe/d",
        "year_commissioned": 1996,
        "current_status": "Operational",
        "development_phase": "Mature Field",
        "estimated_workforce": "150-200"
      },
      "ownership": {
        "equinor_share": "53.9%",
        "primary_contact": "Troll Operations Center"
      },
      "environmental": {
        "co2_emissions_intensity": "2.1 kg CO2/boe",
        "certifications": "ISO 14001"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_003",
      "basic_info": {
        "name": "Hywind Scotland",
        "type": "Floating Wind Farm",
        "classification": "Offshore",
        "production_type": "Renewable Energy"
      },
      "location": {
        "country": "United Kingdom",
        "region": "North Sea",
        "coordinates": {
          "latitude": 57.4833,
          "longitude": -1.3833
        },
        "water_depth": "95-120m",
        "nearby_cities": "Aberdeen (25km)"
      },
      "operational_data": {
        "production_capacity": "30 MW",
        "year_commissioned": 2017,
        "current_status": "Operational",
        "development_phase": "Commercial Operation",
        "estimated_workforce": "10-20"
      },
      "ownership": {
        "equinor_share": "75%",
        "primary_contact": "Hywind Scotland Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "0 kg CO2/MWh",
        "certifications": "ISO 14001, Carbon Trust"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_004",
      "basic_info": {
        "name": "Sleipner",
        "type": "Gas Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "Norway",
        "region": "North Sea",
        "coordinates": {
          "latitude": 58.3667,
          "longitude": 1.9167
        },
        "water_depth": "80-85m",
        "nearby_cities": "Stavanger (250km)"
      },
      "operational_data": {
        "production_capacity": "140,000 boe/d",
        "year_commissioned": 1993,
        "current_status": "Operational",
        "development_phase": "Enhanced Recovery",
        "estimated_workforce": "100-150"
      },
      "ownership": {
        "equinor_share": "58.7%",
        "primary_contact": "Sleipner Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "1.8 kg CO2/boe",
        "certifications": "ISO 14001, CCS Pioneer"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_005",
      "basic_info": {
        "name": "Mariner",
        "type": "Oil Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "United Kingdom",
        "region": "North Sea",
        "coordinates": {
          "latitude": 61.2333,
          "longitude": 1.2833
        },
        "water_depth": "110m",
        "nearby_cities": "Lerwick (150km)"
      },
      "operational_data": {
        "production_capacity": "75,000 boe/d",
        "year_commissioned": 2019,
        "current_status": "Operational",
        "development_phase": "Plateau Production",
        "estimated_workforce": "120-180"
      },
      "ownership": {
        "equinor_share": "65.1%",
        "primary_contact": "Mariner Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "12.5 kg CO2/boe",
        "certifications": "ISO 14001"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_006",
      "basic_info": {
        "name": "Bakken",
        "type": "Oil Field",
        "classification": "Onshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "United States",
        "region": "North Dakota",
        "coordinates": {
          "latitude": 47.7511,
          "longitude": -103.2504
        },
        "water_depth": "N/A",
        "nearby_cities": "Williston (50km)"
      },
      "operational_data": {
        "production_capacity": "180,000 boe/d",
        "year_commissioned": 2011,
        "current_status": "Operational",
        "development_phase": "Mature Development",
        "estimated_workforce": "500-700"
      },
      "ownership": {
        "equinor_share": "100%",
        "primary_contact": "Bakken Operations Center"
      },
      "environmental": {
        "co2_emissions_intensity": "15.2 kg CO2/boe",
        "certifications": "EPA Compliance"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_007",
      "basic_info": {
        "name": "Mongstad Refinery",
        "type": "Refinery",
        "classification": "Onshore",
        "production_type": "Processing & Refining"
      },
      "location": {
        "country": "Norway",
        "region": "Vestland",
        "coordinates": {
          "latitude": 60.8167,
          "longitude": 5.0333
        },
        "water_depth": "N/A",
        "nearby_cities": "Bergen (40km)"
      },
      "operational_data": {
        "production_capacity": "226,000 bbl/d",
        "year_commissioned": 1975,
        "current_status": "Operational",
        "development_phase": "Modernization Program",
        "estimated_workforce": "800-1000"
      },
      "ownership": {
        "equinor_share": "100%",
        "primary_contact": "Mongstad Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "25.3 kg CO2/bbl",
        "certifications": "ISO 14001, EU ETS"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_008",
      "basic_info": {
        "name": "Hammerfest LNG",
        "type": "LNG Terminal",
        "classification": "Onshore",
        "production_type": "Processing & Refining"
      },
      "location": {
        "country": "Norway",
        "region": "Finnmark",
        "coordinates": {
          "latitude": 70.6633,
          "longitude": 23.6819
        },
        "water_depth": "N/A",
        "nearby_cities": "Hammerfest (5km)"
      },
      "operational_data": {
        "production_capacity": "4.3 mtpa",
        "year_commissioned": 2007,
        "current_status": "Operational",
        "development_phase": "Full Operation",
        "estimated_workforce": "200-250"
      },
      "ownership": {
        "equinor_share": "65.9%",
        "primary_contact": "Hammerfest LNG Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "0.15 t CO2/t LNG",
        "certifications": "ISO 14001, Arctic Council"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_009",
      "basic_info": {
        "name": "Dogger Bank",
        "type": "Offshore Wind Farm",
        "classification": "Offshore",
        "production_type": "Renewable Energy"
      },
      "location": {
        "country": "United Kingdom",
        "region": "North Sea",
        "coordinates": {
          "latitude": 54.7,
          "longitude": 2.0
        },
        "water_depth": "18-35m",
        "nearby_cities": "Hull (130km)"
      },
      "operational_data": {
        "production_capacity": "3,600 MW",
        "year_commissioned": 2026,
        "current_status": "Under Construction",
        "development_phase": "Phase A Construction",
        "estimated_workforce": "100-150"
      },
      "ownership": {
        "equinor_share": "50%",
        "primary_contact": "Dogger Bank Project Team"
      },
      "environmental": {
        "co2_emissions_intensity": "0 kg CO2/MWh",
        "certifications": "Marine Stewardship Council"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_010",
      "basic_info": {
        "name": "Peregrino",
        "type": "Oil Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "Brazil",
        "region": "Campos Basin",
        "coordinates": {
          "latitude": -22.3167,
          "longitude": -40.0833
        },
        "water_depth": "100-120m",
        "nearby_cities": "Rio de Janeiro (85km)"
      },
      "operational_data": {
        "production_capacity": "110,000 boe/d",
        "year_commissioned": 2011,
        "current_status": "Operational",
        "development_phase": "Enhanced Oil Recovery",
        "estimated_workforce": "150-200"
      },
      "ownership": {
        "equinor_share": "60%",
        "primary_contact": "Peregrino Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "18.5 kg CO2/boe",
        "certifications": "ISO 14001, ANP Brazil"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_011",
      "basic_info": {
        "name": "Gullfaks",
        "type": "Oil Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "Norway",
        "region": "North Sea",
        "coordinates": {
          "latitude": 61.2,
          "longitude": 2.2667
        },
        "water_depth": "130-220m",
        "nearby_cities": "Bergen (175km)"
      },
      "operational_data": {
        "production_capacity": "85,000 boe/d",
        "year_commissioned": 1986,
        "current_status": "Operational",
        "development_phase": "Late Life",
        "estimated_workforce": "180-220"
      },
      "ownership": {
        "equinor_share": "51%",
        "primary_contact": "Gullfaks Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "8.2 kg CO2/boe",
        "certifications": "ISO 14001"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_012",
      "basic_info": {
        "name": "Empire Wind",
        "type": "Offshore Wind Farm",
        "classification": "Offshore",
        "production_type": "Renewable Energy"
      },
      "location": {
        "country": "United States",
        "region": "New York Bight",
        "coordinates": {
          "latitude": 40.3,
          "longitude": -73.7
        },
        "water_depth": "20-30m",
        "nearby_cities": "New York City (25km)"
      },
      "operational_data": {
        "production_capacity": "2,076 MW",
        "year_commissioned": 2028,
        "current_status": "Under Development",
        "development_phase": "Permitting",
        "estimated_workforce": "50-75"
      },
      "ownership": {
        "equinor_share": "50%",
        "primary_contact": "Empire Wind Development"
      },
      "environmental": {
        "co2_emissions_intensity": "0 kg CO2/MWh",
        "certifications": "BOEM Compliance"
      },
      "data_quality": "Medium"
    },
    {
      "asset_id": "EQ_013",
      "basic_info": {
        "name": "Oseberg",
        "type": "Oil Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "Norway",
        "region": "North Sea",
        "coordinates": {
          "latitude": 60.5,
          "longitude": 2.8333
        },
        "water_depth": "100-110m",
        "nearby_cities": "Bergen (140km)"
      },
      "operational_data": {
        "production_capacity": "120,000 boe/d",
        "year_commissioned": 1988,
        "current_status": "Operational",
        "development_phase": "Enhanced Recovery",
        "estimated_workforce": "200-250"
      },
      "ownership": {
        "equinor_share": "49.3%",
        "primary_contact": "Oseberg Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "7.8 kg CO2/boe",
        "certifications": "ISO 14001"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_014",
      "basic_info": {
        "name": "Statfjord",
        "type": "Oil Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "Norway",
        "region": "North Sea",
        "coordinates": {
          "latitude": 61.25,
          "longitude": 1.85
        },
        "water_depth": "145m",
        "nearby_cities": "Bergen (200km)"
      },
      "operational_data": {
        "production_capacity": "45,000 boe/d",
        "year_commissioned": 1979,
        "current_status": "Operational",
        "development_phase": "Late Life",
        "estimated_workforce": "150-180"
      },
      "ownership": {
        "equinor_share": "44.3%",
        "primary_contact": "Statfjord Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "12.1 kg CO2/boe",
        "certifications": "ISO 14001"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_015",
      "basic_info": {
        "name": "Snorre",
        "type": "Oil Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "Norway",
        "region": "North Sea",
        "coordinates": {
          "latitude": 61.4333,
          "longitude": 2.1333
        },
        "water_depth": "300-350m",
        "nearby_cities": "Bergen (150km)"
      },
      "operational_data": {
        "production_capacity": "95,000 boe/d",
        "year_commissioned": 1992,
        "current_status": "Operational",
        "development_phase": "Enhanced Recovery",
        "estimated_workforce": "180-220"
      },
      "ownership": {
        "equinor_share": "33.3%",
        "primary_contact": "Snorre Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "9.5 kg CO2/boe",
        "certifications": "ISO 14001"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_016",
      "basic_info": {
        "name": "Gina Krog",
        "type": "Oil Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "Norway",
        "region": "North Sea",
        "coordinates": {
          "latitude": 59.3167,
          "longitude": 1.8833
        },
        "water_depth": "115m",
        "nearby_cities": "Stavanger (200km)"
      },
      "operational_data": {
        "production_capacity": "40,000 boe/d",
        "year_commissioned": 2017,
        "current_status": "Operational",
        "development_phase": "Plateau Production",
        "estimated_workforce": "80-120"
      },
      "ownership": {
        "equinor_share": "58.7%",
        "primary_contact": "Gina Krog Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "3.2 kg CO2/boe",
        "certifications": "ISO 14001, Zero Routine Flaring"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_017",
      "basic_info": {
        "name": "Kristin",
        "type": "Gas Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "Norway",
        "region": "Norwegian Sea",
        "coordinates": {
          "latitude": 65.0833,
          "longitude": 6.5833
        },
        "water_depth": "340-380m",
        "nearby_cities": "Trondheim (300km)"
      },
      "operational_data": {
        "production_capacity": "65,000 boe/d",
        "year_commissioned": 2005,
        "current_status": "Operational",
        "development_phase": "Mature Production",
        "estimated_workforce": "100-130"
      },
      "ownership": {
        "equinor_share": "58.7%",
        "primary_contact": "Kristin Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "4.1 kg CO2/boe",
        "certifications": "ISO 14001"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_018",
      "basic_info": {
        "name": "Åsgard",
        "type": "Gas Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "Norway",
        "region": "Norwegian Sea",
        "coordinates": {
          "latitude": 65.1167,
          "longitude": 6.7833
        },
        "water_depth": "240-310m",
        "nearby_cities": "Trondheim (280km)"
      },
      "operational_data": {
        "production_capacity": "85,000 boe/d",
        "year_commissioned": 1999,
        "current_status": "Operational",
        "development_phase": "Subsea Development",
        "estimated_workforce": "120-150"
      },
      "ownership": {
        "equinor_share": "34.6%",
        "primary_contact": "Åsgard Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "5.8 kg CO2/boe",
        "certifications": "ISO 14001"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_019",
      "basic_info": {
        "name": "Heidrun",
        "type": "Oil Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "Norway",
        "region": "Norwegian Sea",
        "coordinates": {
          "latitude": 65.3333,
          "longitude": 7.3333
        },
        "water_depth": "330-350m",
        "nearby_cities": "Trondheim (250km)"
      },
      "operational_data": {
        "production_capacity": "55,000 boe/d",
        "year_commissioned": 1995,
        "current_status": "Operational",
        "development_phase": "Enhanced Recovery",
        "estimated_workforce": "140-170"
      },
      "ownership": {
        "equinor_share": "58.7%",
        "primary_contact": "Heidrun Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "11.2 kg CO2/boe",
        "certifications": "ISO 14001"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_020",
      "basic_info": {
        "name": "Norne",
        "type": "Oil Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "Norway",
        "region": "Norwegian Sea",
        "coordinates": {
          "latitude": 66.0333,
          "longitude": 8.0833
        },
        "water_depth": "380m",
        "nearby_cities": "Sandnessjøen (200km)"
      },
      "operational_data": {
        "production_capacity": "35,000 boe/d",
        "year_commissioned": 1997,
        "current_status": "Operational",
        "development_phase": "Late Life",
        "estimated_workforce": "80-100"
      },
      "ownership": {
        "equinor_share": "54.0%",
        "primary_contact": "Norne Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "14.5 kg CO2/boe",
        "certifications": "ISO 14001"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_021",
      "basic_info": {
        "name": "Sheringham Shoal",
        "type": "Offshore Wind Farm",
        "classification": "Offshore",
        "production_type": "Renewable Energy"
      },
      "location": {
        "country": "United Kingdom",
        "region": "North Sea",
        "coordinates": {
          "latitude": 53.0,
          "longitude": 1.2
        },
        "water_depth": "17-22m",
        "nearby_cities": "Norwich (30km)"
      },
      "operational_data": {
        "production_capacity": "317 MW",
        "year_commissioned": 2012,
        "current_status": "Operational",
        "development_phase": "Commercial Operation",
        "estimated_workforce": "15-25"
      },
      "ownership": {
        "equinor_share": "50%",
        "primary_contact": "Sheringham Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "0 kg CO2/MWh",
        "certifications": "ISO 14001, RSPB Partnership"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_022",
      "basic_info": {
        "name": "Dudgeon",
        "type": "Offshore Wind Farm",
        "classification": "Offshore",
        "production_type": "Renewable Energy"
      },
      "location": {
        "country": "United Kingdom",
        "region": "North Sea",
        "coordinates": {
          "latitude": 53.2833,
          "longitude": 1.5833
        },
        "water_depth": "18-25m",
        "nearby_cities": "Great Yarmouth (32km)"
      },
      "operational_data": {
        "production_capacity": "402 MW",
        "year_commissioned": 2017,
        "current_status": "Operational",
        "development_phase": "Commercial Operation",
        "estimated_workforce": "20-30"
      },
      "ownership": {
        "equinor_share": "35%",
        "primary_contact": "Dudgeon Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "0 kg CO2/MWh",
        "certifications": "ISO 14001, Marine Conservation"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_023",
      "basic_info": {
        "name": "Rosebank",
        "type": "Oil Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "United Kingdom",
        "region": "West of Shetland",
        "coordinates": {
          "latitude": 61.1,
          "longitude": -3.9
        },
        "water_depth": "1,100m",
        "nearby_cities": "Lerwick (130km)"
      },
      "operational_data": {
        "production_capacity": "69,000 boe/d",
        "year_commissioned": 2026,
        "current_status": "Under Development",
        "development_phase": "FEED Complete",
        "estimated_workforce": "100-150"
      },
      "ownership": {
        "equinor_share": "80%",
        "primary_contact": "Rosebank Project Team"
      },
      "environmental": {
        "co2_emissions_intensity": "12.1 kg CO2/boe",
        "certifications": "Environmental Impact Assessment"
      },
      "data_quality": "Medium"
    },
    {
      "asset_id": "EQ_024",
      "basic_info": {
        "name": "Buzzard",
        "type": "Oil Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "United Kingdom",
        "region": "North Sea",
        "coordinates": {
          "latitude": 57.1833,
          "longitude": 0.8333
        },
        "water_depth": "95m",
        "nearby_cities": "Aberdeen (100km)"
      },
      "operational_data": {
        "production_capacity": "45,000 boe/d",
        "year_commissioned": 2007,
        "current_status": "Operational",
        "development_phase": "Enhanced Recovery",
        "estimated_workforce": "80-120"
      },
      "ownership": {
        "equinor_share": "22.45%",
        "primary_contact": "Buzzard Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "15.8 kg CO2/boe",
        "certifications": "ISO 14001"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_025",
      "basic_info": {
        "name": "Bressay",
        "type": "Oil Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "United Kingdom",
        "region": "North Sea",
        "coordinates": {
          "latitude": 60.1,
          "longitude": -1.0
        },
        "water_depth": "140m",
        "nearby_cities": "Lerwick (40km)"
      },
      "operational_data": {
        "production_capacity": "120,000 boe/d",
        "year_commissioned": 2028,
        "current_status": "Under Development",
        "development_phase": "Concept Selection",
        "estimated_workforce": "150-200"
      },
      "ownership": {
        "equinor_share": "81.6%",
        "primary_contact": "Bressay Development Team"
      },
      "environmental": {
        "co2_emissions_intensity": "8.5 kg CO2/boe",
        "certifications": "Environmental Assessment"
      },
      "data_quality": "Medium"
    },
    {
      "asset_id": "EQ_026",
      "basic_info": {
        "name": "Eagle Ford",
        "type": "Oil Field",
        "classification": "Onshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "United States",
        "region": "Texas",
        "coordinates": {
          "latitude": 28.5,
          "longitude": -98.5
        },
        "water_depth": "N/A",
        "nearby_cities": "San Antonio (150km)"
      },
      "operational_data": {
        "production_capacity": "45,000 boe/d",
        "year_commissioned": 2012,
        "current_status": "Operational",
        "development_phase": "Mature Development",
        "estimated_workforce": "200-300"
      },
      "ownership": {
        "equinor_share": "100%",
        "primary_contact": "Eagle Ford Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "18.7 kg CO2/boe",
        "certifications": "EPA Compliance"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_027",
      "basic_info": {
        "name": "Marcellus",
        "type": "Gas Field",
        "classification": "Onshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "United States",
        "region": "Pennsylvania",
        "coordinates": {
          "latitude": 41.2033,
          "longitude": -76.8839
        },
        "water_depth": "N/A",
        "nearby_cities": "Scranton (50km)"
      },
      "operational_data": {
        "production_capacity": "1.2 bcf/d",
        "year_commissioned": 2014,
        "current_status": "Operational",
        "development_phase": "Full Development",
        "estimated_workforce": "300-400"
      },
      "ownership": {
        "equinor_share": "100%",
        "primary_contact": "Marcellus Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "2.1 kg CO2/mcf",
        "certifications": "EPA Compliance, STRONGER"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_028",
      "basic_info": {
        "name": "Beacon Wind",
        "type": "Offshore Wind Farm",
        "classification": "Offshore",
        "production_type": "Renewable Energy"
      },
      "location": {
        "country": "United States",
        "region": "New York Bight",
        "coordinates": {
          "latitude": 40.4,
          "longitude": -72.8
        },
        "water_depth": "38-50m",
        "nearby_cities": "Montauk (30km)"
      },
      "operational_data": {
        "production_capacity": "1,230 MW",
        "year_commissioned": 2028,
        "current_status": "Under Development",
        "development_phase": "Environmental Review",
        "estimated_workforce": "40-60"
      },
      "ownership": {
        "equinor_share": "50%",
        "primary_contact": "Beacon Wind Development"
      },
      "environmental": {
        "co2_emissions_intensity": "0 kg CO2/MWh",
        "certifications": "BOEM Environmental Review"
      },
      "data_quality": "Medium"
    },
    {
      "asset_id": "EQ_029",
      "basic_info": {
        "name": "Roncador",
        "type": "Oil Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "Brazil",
        "region": "Campos Basin",
        "coordinates": {
          "latitude": -22.2,
          "longitude": -39.8
        },
        "water_depth": "1,800-2,000m",
        "nearby_cities": "Macaé (120km)"
      },
      "operational_data": {
        "production_capacity": "75,000 boe/d",
        "year_commissioned": 2007,
        "current_status": "Operational",
        "development_phase": "Enhanced Recovery",
        "estimated_workforce": "120-160"
      },
      "ownership": {
        "equinor_share": "35%",
        "primary_contact": "Roncador Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "22.1 kg CO2/boe",
        "certifications": "ISO 14001, ANP Brazil"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_030",
      "basic_info": {
        "name": "Carcará",
        "type": "Oil Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "Brazil",
        "region": "Santos Basin",
        "coordinates": {
          "latitude": -25.5,
          "longitude": -43.2
        },
        "water_depth": "2,100m",
        "nearby_cities": "Rio de Janeiro (200km)"
      },
      "operational_data": {
        "production_capacity": "220,000 boe/d",
        "year_commissioned": 2024,
        "current_status": "Under Construction",
        "development_phase": "Phase 1 Development",
        "estimated_workforce": "200-300"
      },
      "ownership": {
        "equinor_share": "25%",
        "primary_contact": "Carcará Project Team"
      },
      "environmental": {
        "co2_emissions_intensity": "8.9 kg CO2/boe",
        "certifications": "Environmental License, ANP"
      },
      "data_quality": "Medium"
    },
    {
      "asset_id": "EQ_031",
      "basic_info": {
        "name": "Bay du Nord",
        "type": "Oil Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "Canada",
        "region": "Newfoundland",
        "coordinates": {
          "latitude": 46.8,
          "longitude": -48.5
        },
        "water_depth": "1,200m",
        "nearby_cities": "St. John's (500km)"
      },
      "operational_data": {
        "production_capacity": "200,000 boe/d",
        "year_commissioned": 2028,
        "current_status": "Under Development",
        "development_phase": "Environmental Assessment",
        "estimated_workforce": "150-250"
      },
      "ownership": {
        "equinor_share": "35%",
        "primary_contact": "Bay du Nord Project"
      },
      "environmental": {
        "co2_emissions_intensity": "7.2 kg CO2/boe",
        "certifications": "Environmental Assessment"
      },
      "data_quality": "Medium"
    },
    {
      "asset_id": "EQ_032",
      "basic_info": {
        "name": "Flemish Pass",
        "type": "Oil Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "Canada",
        "region": "Newfoundland",
        "coordinates": {
          "latitude": 47.0,
          "longitude": -45.5
        },
        "water_depth": "1,100m",
        "nearby_cities": "St. John's (400km)"
      },
      "operational_data": {
        "production_capacity": "150,000 boe/d",
        "year_commissioned": 2030,
        "current_status": "Under Development",
        "development_phase": "Concept Development",
        "estimated_workforce": "100-150"
      },
      "ownership": {
        "equinor_share": "35%",
        "primary_contact": "Flemish Pass Development"
      },
      "environmental": {
        "co2_emissions_intensity": "6.8 kg CO2/boe",
        "certifications": "Environmental Pre-Assessment"
      },
      "data_quality": "Medium"
    },
    {
      "asset_id": "EQ_033",
      "basic_info": {
        "name": "Girassol",
        "type": "Oil Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "Angola",
        "region": "Block 17",
        "coordinates": {
          "latitude": -7.8,
          "longitude": 11.5
        },
        "water_depth": "1,350m",
        "nearby_cities": "Luanda (150km)"
      },
      "operational_data": {
        "production_capacity": "85,000 boe/d",
        "year_commissioned": 2001,
        "current_status": "Operational",
        "development_phase": "Enhanced Recovery",
        "estimated_workforce": "100-140"
      },
      "ownership": {
        "equinor_share": "13.6%",
        "primary_contact": "Girassol Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "19.5 kg CO2/boe",
        "certifications": "ISO 14001, Local Content"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_034",
      "basic_info": {
        "name": "In Salah",
        "type": "Gas Processing Plant",
        "classification": "Onshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "Algeria",
        "region": "Sahara Desert",
        "coordinates": {
          "latitude": 27.2,
          "longitude": 2.5
        },
        "water_depth": "N/A",
        "nearby_cities": "In Salah (10km)"
      },
      "operational_data": {
        "production_capacity": "9 bcm/year",
        "year_commissioned": 2004,
        "current_status": "Decommissioned",
        "development_phase": "CCS Demonstration",
        "estimated_workforce": "0"
      },
      "ownership": {
        "equinor_share": "33%",
        "primary_contact": "In Salah Legacy Team"
      },
      "environmental": {
        "co2_emissions_intensity": "1.2 Mt CO2 stored/year",
        "certifications": "CCS Pioneer Project"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_035",
      "basic_info": {
        "name": "Kårstø",
        "type": "Gas Processing Plant",
        "classification": "Onshore",
        "production_type": "Processing & Refining"
      },
      "location": {
        "country": "Norway",
        "region": "Rogaland",
        "coordinates": {
          "latitude": 59.2833,
          "longitude": 5.5167
        },
        "water_depth": "N/A",
        "nearby_cities": "Haugesund (15km)"
      },
      "operational_data": {
        "production_capacity": "31 bcm/year",
        "year_commissioned": 1985,
        "current_status": "Operational",
        "development_phase": "Expansion Phase",
        "estimated_workforce": "400-500"
      },
      "ownership": {
        "equinor_share": "28.6%",
        "primary_contact": "Kårstø Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "0.8 kg CO2/sm3",
        "certifications": "ISO 14001, EU ETS"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_036",
      "basic_info": {
        "name": "Kollsnes",
        "type": "Gas Processing Plant",
        "classification": "Onshore",
        "production_type": "Processing & Refining"
      },
      "location": {
        "country": "Norway",
        "region": "Vestland",
        "coordinates": {
          "latitude": 60.5333,
          "longitude": 4.8833
        },
        "water_depth": "N/A",
        "nearby_cities": "Bergen (25km)"
      },
      "operational_data": {
        "production_capacity": "143 MSm3/d",
        "year_commissioned": 1996,
        "current_status": "Operational",
        "development_phase": "Full Operation",
        "estimated_workforce": "200-250"
      },
      "ownership": {
        "equinor_share": "28.1%",
        "primary_contact": "Kollsnes Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "1.1 kg CO2/sm3",
        "certifications": "ISO 14001"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_037",
      "basic_info": {
        "name": "Nyhamna",
        "type": "Gas Processing Plant",
        "classification": "Onshore",
        "production_type": "Processing & Refining"
      },
      "location": {
        "country": "Norway",
        "region": "Møre og Romsdal",
        "coordinates": {
          "latitude": 62.9,
          "longitude": 6.1
        },
        "water_depth": "N/A",
        "nearby_cities": "Molde (50km)"
      },
      "operational_data": {
        "production_capacity": "70 MSm3/d",
        "year_commissioned": 2007,
        "current_status": "Operational",
        "development_phase": "Full Operation",
        "estimated_workforce": "150-200"
      },
      "ownership": {
        "equinor_share": "36.5%",
        "primary_contact": "Nyhamna Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "0.9 kg CO2/sm3",
        "certifications": "ISO 14001"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_038",
      "basic_info": {
        "name": "Sture Terminal",
        "type": "Oil Terminal",
        "classification": "Onshore",
        "production_type": "Processing & Refining"
      },
      "location": {
        "country": "Norway",
        "region": "Vestland",
        "coordinates": {
          "latitude": 60.7333,
          "longitude": 4.9167
        },
        "water_depth": "N/A",
        "nearby_cities": "Bergen (30km)"
      },
      "operational_data": {
        "production_capacity": "1.3 million bbl/d",
        "year_commissioned": 1981,
        "current_status": "Operational",
        "development_phase": "Modernization",
        "estimated_workforce": "100-150"
      },
      "ownership": {
        "equinor_share": "28.1%",
        "primary_contact": "Sture Terminal Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "2.1 kg CO2/bbl",
        "certifications": "ISO 14001"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_039",
      "basic_info": {
        "name": "Mongstad Terminal",
        "type": "Oil Terminal",
        "classification": "Onshore",
        "production_type": "Processing & Refining"
      },
      "location": {
        "country": "Norway",
        "region": "Vestland",
        "coordinates": {
          "latitude": 60.8,
          "longitude": 5.05
        },
        "water_depth": "N/A",
        "nearby_cities": "Bergen (40km)"
      },
      "operational_data": {
        "production_capacity": "800,000 bbl/d",
        "year_commissioned": 1975,
        "current_status": "Operational",
        "development_phase": "Full Operation",
        "estimated_workforce": "80-120"
      },
      "ownership": {
        "equinor_share": "100%",
        "primary_contact": "Mongstad Terminal Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "1.8 kg CO2/bbl",
        "certifications": "ISO 14001"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_040",
      "basic_info": {
        "name": "Kalundborg Refinery",
        "type": "Refinery",
        "classification": "Onshore",
        "production_type": "Processing & Refining"
      },
      "location": {
        "country": "Denmark",
        "region": "Zealand",
        "coordinates": {
          "latitude": 55.6833,
          "longitude": 11.1
        },
        "water_depth": "N/A",
        "nearby_cities": "Copenhagen (100km)"
      },
      "operational_data": {
        "production_capacity": "110,000 bbl/d",
        "year_commissioned": 1961,
        "current_status": "Decommissioned",
        "development_phase": "Closed 2020",
        "estimated_workforce": "0"
      },
      "ownership": {
        "equinor_share": "0%",
        "primary_contact": "Legacy Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "N/A",
        "certifications": "Historical Operations"
      },
      "data_quality": "Medium"
    },
    {
      "asset_id": "EQ_041",
      "basic_info": {
        "name": "Melkøya LNG",
        "type": "LNG Terminal",
        "classification": "Onshore",
        "production_type": "Processing & Refining"
      },
      "location": {
        "country": "Norway",
        "region": "Finnmark",
        "coordinates": {
          "latitude": 70.6819,
          "longitude": 23.6819
        },
        "water_depth": "N/A",
        "nearby_cities": "Hammerfest (2km)"
      },
      "operational_data": {
        "production_capacity": "4.3 mtpa",
        "year_commissioned": 2007,
        "current_status": "Operational",
        "development_phase": "Full Operation",
        "estimated_workforce": "150-200"
      },
      "ownership": {
        "equinor_share": "65.9%",
        "primary_contact": "Melkøya Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "0.15 t CO2/t LNG",
        "certifications": "ISO 14001, Arctic Operations"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_042",
      "basic_info": {
        "name": "Tjeldbergodden Terminal",
        "type": "Oil Terminal",
        "classification": "Onshore",
        "production_type": "Processing & Refining"
      },
      "location": {
        "country": "Norway",
        "region": "Møre og Romsdal",
        "coordinates": {
          "latitude": 63.4,
          "longitude": 8.2
        },
        "water_depth": "N/A",
        "nearby_cities": "Trondheim (80km)"
      },
      "operational_data": {
        "production_capacity": "300,000 bbl/d",
        "year_commissioned": 1988,
        "current_status": "Operational",
        "development_phase": "Full Operation",
        "estimated_workforce": "50-80"
      },
      "ownership": {
        "equinor_share": "36.5%",
        "primary_contact": "Tjeldbergodden Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "1.5 kg CO2/bbl",
        "certifications": "ISO 14001"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_043",
      "basic_info": {
        "name": "Apodi Solar Plant",
        "type": "Solar Plant",
        "classification": "Onshore",
        "production_type": "Renewable Energy"
      },
      "location": {
        "country": "Brazil",
        "region": "Rio Grande do Norte",
        "coordinates": {
          "latitude": -5.6667,
          "longitude": -37.8
        },
        "water_depth": "N/A",
        "nearby_cities": "Mossoró (50km)"
      },
      "operational_data": {
        "production_capacity": "162 MW",
        "year_commissioned": 2018,
        "current_status": "Operational",
        "development_phase": "Commercial Operation",
        "estimated_workforce": "10-15"
      },
      "ownership": {
        "equinor_share": "43.5%",
        "primary_contact": "Apodi Solar Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "0 kg CO2/MWh",
        "certifications": "ANEEL Certification"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_044",
      "basic_info": {
        "name": "Hywind Tampen",
        "type": "Floating Wind Farm",
        "classification": "Offshore",
        "production_type": "Renewable Energy"
      },
      "location": {
        "country": "Norway",
        "region": "North Sea",
        "coordinates": {
          "latitude": 61.25,
          "longitude": 2.3
        },
        "water_depth": "260-300m",
        "nearby_cities": "Bergen (140km)"
      },
      "operational_data": {
        "production_capacity": "88 MW",
        "year_commissioned": 2022,
        "current_status": "Operational",
        "development_phase": "Commercial Operation",
        "estimated_workforce": "15-25"
      },
      "ownership": {
        "equinor_share": "51%",
        "primary_contact": "Hywind Tampen Operations"
      },
      "environmental": {
        "co2_emissions_intensity": "0 kg CO2/MWh",
        "certifications": "ISO 14001, Powering Oil Platforms"
      },
      "data_quality": "High"
    },
    {
      "asset_id": "EQ_045",
      "basic_info": {
        "name": "Breidablikk",
        "type": "Oil Field",
        "classification": "Offshore",
        "production_type": "Oil & Gas"
      },
      "location": {
        "country": "Norway",
        "region": "North Sea",
        "coordinates": {
          "latitude": 59.0833,
          "longitude": 2.2167
        },
        "water_depth": "120m",
        "nearby_cities": "Stavanger (180km)"
      },
      "operational_data": {
        "production_capacity": "200,000 boe/d",
        "year_commissioned": 2024,
        "current_status": "Under Construction",
        "development_phase": "Installation Phase",
        "estimated_workforce": "150-200"
      },
      "ownership": {
        "equinor_share": "51%",
        "primary_contact": "Breidablikk Project Team"
      },
      "environmental": {
        "co2_emissions_intensity": "2.1 kg CO2/boe",
        "certifications": "Zero Routine Flaring, ISO 14001"
      },
      "data_quality": "High"
    }
  ]
}
```

## Project Documentation

### README.md
```markdown
# Interactive Geospatial Analytics Dashboard for Equinor Assets

A comprehensive dashboard for visualizing and analyzing Equinor's global asset portfolio with interactive mapping capabilities.

## Features

- **Interactive Map**: Visualize assets on multiple map layers (Satellite, Street, Topographic)
- **Advanced Filtering**: Search and filter by country, asset type, and keywords
- **Real-time Statistics**: Dynamic statistics panel showing asset counts and operational status
- **Detailed Asset Information**: Comprehensive asset details with operational data
- **Responsive Design**: Optimized for desktop and mobile devices
- **Asset Type Legend**: Color-coded visualization of different asset types

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Mapping**: Leaflet with React-Leaflet
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify / GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Goku10/eq-global-assets-t1.git
cd eq-global-assets-t1
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

This project is configured for automatic deployment to both Netlify and GitHub Pages.

### Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

### GitHub Pages Deployment

1. Push code to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to "GitHub Actions"
4. The workflow will automatically deploy your site

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Main dashboard component
│   ├── GeospatialMap.tsx # Map component
│   ├── AssetMarker.tsx  # Individual asset markers
│   ├── AssetDetailPanel.tsx # Asset detail modal
│   ├── SearchPanel.tsx  # Search and filter panel
│   ├── StatisticsPanel.tsx # Statistics display
│   └── AssetLegend.tsx  # Asset type legend
├── data/               # Asset database
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # CSS styles
```

## Asset Data Structure

The application uses a comprehensive asset database with the following structure:

- **Basic Information**: Name, type, classification, production type
- **Location Data**: Coordinates, country, region, water depth
- **Operational Data**: Capacity, commissioning year, status, development phase
- **Ownership**: Equinor share, primary contact
- **Environmental**: CO2 emissions, certifications
- **Data Quality**: Quality assessment metrics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Live Demo

Visit the live application: [https://goku10.github.io/eq-global-assets-t1/](https://goku10.github.io/eq-global-assets-t1/)
```

## Setup Instructions

1. Create a new folder for your project
2. Copy each file section above into the corresponding file path
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start the development server
5. Push to your GitHub repository for automatic deployment

The project is now ready for development and deployment!