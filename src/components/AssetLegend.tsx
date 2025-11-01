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