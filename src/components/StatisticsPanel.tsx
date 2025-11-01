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