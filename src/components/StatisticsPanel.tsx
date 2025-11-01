import React from 'react';
import { Target, Globe, Crosshair, Activity } from 'lucide-react';
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
    <div className="glass-panel p-4 border-l-2 hover:border-l-4 transition-all" style={{ borderColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-[#00d9ff]/70 tracking-widest uppercase mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>{title}</p>
          <p className="text-3xl font-bold mission-clock" style={{ color, fontFamily: 'Orbitron, sans-serif' }}>
            {filteredValue}
            {filteredValue !== value && (
              <span className="text-sm text-[#00d9ff]/50 font-normal ml-1">/ {value}</span>
            )}
          </p>
        </div>
        <Icon className="h-10 w-10 opacity-30" style={{ color }} />
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center mb-4">
        <Activity className="h-5 w-5 text-[#ffd000] mr-2" />
        <h3 className="text-sm font-bold text-[#00d9ff] tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>TACTICAL OVERVIEW</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Target}
          title="TOTAL ASSETS"
          value={totalStats.totalAssets}
          filteredValue={filteredStats.totalAssets}
          color="#ff3838"
        />
        <StatCard
          icon={Globe}
          title="TERRITORIES"
          value={totalStats.totalCountries}
          filteredValue={filteredStats.totalCountries}
          color="#00d9ff"
        />
        <StatCard
          icon={Crosshair}
          title="CLASSIFICATIONS"
          value={totalStats.totalAssetTypes}
          filteredValue={filteredStats.totalAssetTypes}
          color="#16a34a"
        />
        <StatCard
          icon={Activity}
          title="OPERATIONAL"
          value={totalStats.operationalAssets}
          filteredValue={filteredStats.operationalAssets}
          color="#ffd000"
        />
      </div>
    </div>
  );
};