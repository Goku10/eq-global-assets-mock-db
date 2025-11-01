import React from 'react';
import { Search, MapPin, Factory, Filter, Building, Satellite, RotateCcw } from 'lucide-react';
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
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Search & Filter</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          title="Reset all filters"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
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

        {/* All Assets Dropdown */}
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
          >
            <option value="">All Assets</option>
            {sortedAssets.map(asset => (
              <option key={asset.asset_id} value={asset.asset_id}>
                {asset.basic_info.name} ({asset.basic_info.type}) - {asset.location.country}
              </option>
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

        {/* Satellite Coverage Filters */}
        <div className="border-t border-gray-200 pt-4 mt-2">
          <div className="flex items-center mb-3">
            <Satellite className="h-4 w-4 text-blue-600 mr-2" />
            <h4 className="text-sm font-semibold text-gray-900">Satellite Coverage</h4>
          </div>

          <div className="space-y-3">
            {/* Planet Data Coverage */}
            <div className="relative">
              <Satellite className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
                value={selectedPlanetCoverage}
                onChange={(e) => setSelectedPlanetCoverage(e.target.value)}
              >
                <option value="">All Planet Coverage</option>
                {planetCoverages.map(coverage => (
                  <option key={coverage} value={coverage}>{coverage}</option>
                ))}
              </select>
            </div>

            {/* Sentinel-1 Coverage */}
            <div className="relative">
              <Satellite className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
                value={selectedSentinel1Coverage}
                onChange={(e) => setSelectedSentinel1Coverage(e.target.value)}
              >
                <option value="">All Sentinel-1 Coverage</option>
                {sentinel1Coverages.map(coverage => (
                  <option key={coverage} value={coverage}>{coverage}</option>
                ))}
              </select>
            </div>

            {/* Sentinel-2 Coverage */}
            <div className="relative">
              <Satellite className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
                value={selectedSentinel2Coverage}
                onChange={(e) => setSelectedSentinel2Coverage(e.target.value)}
              >
                <option value="">All Sentinel-2 Coverage</option>
                {sentinel2Coverages.map(coverage => (
                  <option key={coverage} value={coverage}>{coverage}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
          Showing <span className="font-semibold text-blue-600">{filteredAssets.length}</span> of{' '}
          <span className="font-semibold">{assets.length}</span> assets
          {selectedAsset && (
            <div className="mt-1 text-blue-600">
              <span className="font-medium">Selected:</span> {
                assets.find(a => a.asset_id === selectedAsset)?.basic_info.name
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};