import React, { useState, useMemo } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { Asset, AssetsDatabase } from '../types/assets';
import { generateAssetTypeColors, filterAssets } from '../utils/assetUtils';
import { SearchPanel } from './SearchPanel';
import { StatisticsPanel } from './StatisticsPanel';
import { AssetLegend } from './AssetLegend';
import { AssetSelector } from './AssetSelector';
import { GeospatialMap } from './GeospatialMap';
import assetsData from '../data/equinor_assets_database_with_verified_coverage.json';

export const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPlanetCoverage, setSelectedPlanetCoverage] = useState('');
  const [selectedSentinel1Coverage, setSelectedSentinel1Coverage] = useState('');
  const [selectedSentinel2Coverage, setSelectedSentinel2Coverage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState('');

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCountry('');
    setSelectedType('');
    setSelectedAssetId('');
    setSelectedPlanetCoverage('');
    setSelectedSentinel1Coverage('');
    setSelectedSentinel2Coverage('');
  };

  const database = assetsData as AssetsDatabase;
  const assets = database.assets;

  const assetTypeColors = useMemo(() => generateAssetTypeColors(assets), [assets]);

  const filteredAssets = useMemo(() =>
    filterAssets(assets, searchTerm, selectedCountry, selectedType, selectedPlanetCoverage, selectedSentinel1Coverage, selectedSentinel2Coverage),
    [assets, searchTerm, selectedCountry, selectedType, selectedPlanetCoverage, selectedSentinel1Coverage, selectedSentinel2Coverage]
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
            <h1 className="text-2xl font-bold text-gray-900">Equinor Global Assets - Satellite Coverage Mock Dashboard (Dummy Data)</h1>
            <p className="text-sm text-gray-600 hidden sm:block">Comprehensive geospatial tracking with satellite coverage analysis</p>
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
              selectedAsset={selectedAssetId}
              setSelectedAsset={setSelectedAssetId}
              selectedPlanetCoverage={selectedPlanetCoverage}
              setSelectedPlanetCoverage={setSelectedPlanetCoverage}
              selectedSentinel1Coverage={selectedSentinel1Coverage}
              setSelectedSentinel1Coverage={setSelectedSentinel1Coverage}
              selectedSentinel2Coverage={selectedSentinel2Coverage}
              setSelectedSentinel2Coverage={setSelectedSentinel2Coverage}
              onResetFilters={handleResetFilters}
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
              selectedAssetId={selectedAssetId}
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