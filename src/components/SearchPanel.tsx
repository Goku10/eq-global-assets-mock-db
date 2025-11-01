import React from 'react';
import { Search, MapPin, Crosshair, Target, Building, Satellite, RotateCcw } from 'lucide-react';
import { Asset } from '../types/assets';

interface SearchPanelProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedAsset: string;
  setSelectedAsset: (assetId: string) => void;
  selectedPlanetCoverage: string;
  setSelectedPlanetCoverage: (coverage: string) => void;
  selectedSentinel1Coverage: string;
  setSelectedSentinel1Coverage: (coverage: string) => void;
  selectedSentinel2Coverage: string;
  setSelectedSentinel2Coverage: (coverage: string) => void;
  onResetFilters: () => void;
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
  selectedAsset,
  setSelectedAsset,
  selectedPlanetCoverage,
  setSelectedPlanetCoverage,
  selectedSentinel1Coverage,
  setSelectedSentinel1Coverage,
  selectedSentinel2Coverage,
  setSelectedSentinel2Coverage,
  onResetFilters,
  assets,
  filteredAssets,
}) => {
  const countries = [...new Set(assets.map(asset => asset.location.country))].sort();
  const assetTypes = [...new Set(assets.map(asset => asset.basic_info.type))].sort();
  const planetCoverages = [...new Set(assets.map(asset => asset.planet_data_coverage))].sort();
  const sentinel1Coverages = [...new Set(assets.map(asset => asset.sentinel_1_coverage))].sort();
  const sentinel2Coverages = [...new Set(assets.map(asset => asset.sentinel_2_coverage))].sort();
  const sortedAssets = [...assets].sort((a, b) =>
    a.basic_info.name.localeCompare(b.basic_info.name)
  );

  return (
    <div className="glass-panel p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Target className="h-5 w-5 text-[#ffd000] mr-2" />
          <h3 className="text-sm font-bold text-[#00d9ff] tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>FILTERS</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#00d9ff] glass-panel hover:bg-[#1e293b]/50 border border-[#00d9ff]/30 hover:border-[#ffd000]/60 transition-all uppercase tracking-wider"
          title="Reset all filters"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        >
          <RotateCcw className="h-3 w-3" />
          RESET
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00d9ff]" />
          <input
            type="text"
            placeholder="SEARCH ASSETS..."
            className="w-full pl-10 pr-4 py-2 glass-panel border border-[#00d9ff]/30 focus:border-[#ffd000] focus:outline-none text-[#00d9ff] placeholder-[#00d9ff]/40 text-sm font-semibold tracking-wide uppercase"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Country Filter */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00d9ff]" />
          <select
            className="w-full pl-10 pr-4 py-2 glass-panel border border-[#00d9ff]/30 focus:border-[#ffd000] focus:outline-none text-[#00d9ff] appearance-none text-sm font-semibold tracking-wide uppercase"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">ALL TERRITORIES</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* All Assets Dropdown */}
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00d9ff]" />
          <select
            className="w-full pl-10 pr-4 py-2 glass-panel border border-[#00d9ff]/30 focus:border-[#ffd000] focus:outline-none text-[#00d9ff] appearance-none text-sm font-semibold tracking-wide uppercase"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
          >
            <option value="">ALL ASSETS</option>
            {sortedAssets.map(asset => (
              <option key={asset.asset_id} value={asset.asset_id}>
                {asset.basic_info.name} ({asset.basic_info.type}) - {asset.location.country}
              </option>
            ))}
          </select>
        </div>

        {/* Asset Type Filter */}
        <div className="relative">
          <Crosshair className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00d9ff]" />
          <select
            className="w-full pl-10 pr-4 py-2 glass-panel border border-[#00d9ff]/30 focus:border-[#ffd000] focus:outline-none text-[#00d9ff] appearance-none text-sm font-semibold tracking-wide uppercase"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">ALL CLASSIFICATIONS</option>
            {assetTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Satellite Coverage Filters */}
        <div className="border-t border-[#00d9ff]/30 pt-4 mt-2">
          <div className="flex items-center mb-3">
            <Satellite className="h-4 w-4 text-[#ffd000] mr-2" />
            <h4 className="text-xs font-bold text-[#00d9ff] tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>SATELLITE COVERAGE</h4>
          </div>

          <div className="space-y-3">
            {/* Planet Data Coverage */}
            <div className="relative">
              <Satellite className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00d9ff]" />
              <select
                className="w-full pl-10 pr-4 py-2 glass-panel border border-[#00d9ff]/30 focus:border-[#ffd000] focus:outline-none text-[#00d9ff] appearance-none text-xs font-semibold tracking-wide uppercase"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
                value={selectedPlanetCoverage}
                onChange={(e) => setSelectedPlanetCoverage(e.target.value)}
              >
                <option value="">ALL PLANET COVERAGE</option>
                {planetCoverages.map(coverage => (
                  <option key={coverage} value={coverage}>{coverage}</option>
                ))}
              </select>
            </div>

            {/* Sentinel-1 Coverage */}
            <div className="relative">
              <Satellite className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00d9ff]" />
              <select
                className="w-full pl-10 pr-4 py-2 glass-panel border border-[#00d9ff]/30 focus:border-[#ffd000] focus:outline-none text-[#00d9ff] appearance-none text-xs font-semibold tracking-wide uppercase"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
                value={selectedSentinel1Coverage}
                onChange={(e) => setSelectedSentinel1Coverage(e.target.value)}
              >
                <option value="">ALL SENTINEL-1 COVERAGE</option>
                {sentinel1Coverages.map(coverage => (
                  <option key={coverage} value={coverage}>{coverage}</option>
                ))}
              </select>
            </div>

            {/* Sentinel-2 Coverage */}
            <div className="relative">
              <Satellite className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00d9ff]" />
              <select
                className="w-full pl-10 pr-4 py-2 glass-panel border border-[#00d9ff]/30 focus:border-[#ffd000] focus:outline-none text-[#00d9ff] appearance-none text-xs font-semibold tracking-wide uppercase"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
                value={selectedSentinel2Coverage}
                onChange={(e) => setSelectedSentinel2Coverage(e.target.value)}
              >
                <option value="">ALL SENTINEL-2 COVERAGE</option>
                {sentinel2Coverages.map(coverage => (
                  <option key={coverage} value={coverage}>{coverage}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="text-xs text-[#00d9ff] glass-panel border border-[#00d9ff]/30 p-3 font-semibold tracking-wide" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          <span className="text-[#00d9ff]/70 uppercase">SHOWING</span> <span className="font-bold text-[#ffd000] neon-yellow">{filteredAssets.length}</span> <span className="text-[#00d9ff]/70 uppercase">OF</span>{' '}
          <span className="font-bold text-[#00d9ff]">{assets.length}</span> <span className="text-[#00d9ff]/70 uppercase">ASSETS</span>
          {selectedAsset && (
            <div className="mt-2 text-[#ffd000] border-t border-[#00d9ff]/20 pt-2">
              <span className="font-bold uppercase tracking-wider">SELECTED:</span> {
                assets.find(a => a.asset_id === selectedAsset)?.basic_info.name
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};