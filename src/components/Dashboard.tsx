import React, { useState, useMemo } from 'react';
import { Radar, Menu, X, Shield, Target } from 'lucide-react';
import { Asset, AssetsDatabase } from '../types/assets';
import { generateAssetTypeColors, filterAssets } from '../utils/assetUtils';
import { SearchPanel } from './SearchPanel';
import { StatisticsPanel } from './StatisticsPanel';
import { AssetLegend } from './AssetLegend';
import { AssetSelector } from './AssetSelector';
import { GeospatialMap } from './GeospatialMap';
import { MissionClock } from './MissionClock';
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
    <div className="h-screen flex flex-col" style={{ background: 'linear-gradient(to bottom, #0a0e1a, #111827)' }}>
      {/* Classified Watermark */}
      <div className="classified-watermark">CLASSIFIED</div>

      {/* Header */}
      <header className="glass-panel border-b border-[#00d9ff]/30 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden mr-4 p-2 rounded hover:bg-[#1e293b]/50 transition-all border border-[#00d9ff]/20 hover:border-[#00d9ff]/60"
          >
            {sidebarOpen ? <X className="h-5 w-5 text-[#00d9ff]" /> : <Menu className="h-5 w-5 text-[#00d9ff]" />}
          </button>
          <div className="flex items-center gap-2 mr-4">
            <Target className="h-8 w-8 text-[#00d9ff] neon-text" />
            <Shield className="h-6 w-6 text-[#ffd000]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#00d9ff] neon-text tracking-wider uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>EQUINOR TACTICAL OPS</h1>
            <p className="text-xs text-[#00d9ff]/70 hidden sm:block tracking-widest uppercase" style={{ fontFamily: 'Rajdhani, sans-serif' }}>GLOBAL ASSET SURVEILLANCE NETWORK</p>
          </div>
        </div>
        <MissionClock />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          fixed lg:relative z-20 lg:z-0
          w-80 lg:w-96 glass-panel shadow-lg lg:shadow-none
          h-full lg:h-auto flex-shrink-0
          border-r border-[#00d9ff]/30
        `}>
          <div className="p-6 h-full overflow-y-auto grid-overlay">
            <div className="mb-4 flex items-center gap-2 pb-3 border-b border-[#00d9ff]/20">
              <Radar className="h-5 w-5 text-[#ffd000]" />
              <h2 className="text-sm font-bold text-[#00d9ff] tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>MISSION CONTROL</h2>
            </div>

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

            <div className="mt-6 glass-panel neon-border p-4">
              <h3 className="text-xs font-bold text-[#ffd000] mb-3 tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>INTEL SUMMARY</h3>
              <div className="text-xs text-[#00d9ff] space-y-2 font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                <div className="flex justify-between"><span className="text-[#00d9ff]/70">TOTAL ASSETS:</span> <span className="neon-yellow">{database.metadata.total_assets}</span></div>
                <div className="flex justify-between"><span className="text-[#00d9ff]/70">COUNTRIES:</span> <span className="neon-yellow">{database.metadata.countries}</span></div>
                <div className="flex justify-between"><span className="text-[#00d9ff]/70">ASSET TYPES:</span> <span className="neon-yellow">{database.metadata.asset_types}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 glass-panel border-b border-[#00d9ff]/30">
            <StatisticsPanel assets={assets} filteredAssets={filteredAssets} />
          </div>

          <div className="flex-1 p-6 grid-overlay">
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
          className="lg:hidden fixed inset-0 bg-black bg-opacity-80 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};