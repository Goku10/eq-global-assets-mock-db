import React from 'react';
import { MarkerColors } from '../types/assets';
import { Crosshair } from 'lucide-react';

interface AssetLegendProps {
  assetTypeColors: MarkerColors;
}

export const AssetLegend: React.FC<AssetLegendProps> = ({ assetTypeColors }) => {
  return (
    <div className="glass-panel p-6 mt-6">
      <div className="flex items-center mb-4">
        <Crosshair className="h-4 w-4 text-[#ffd000] mr-2" />
        <h3 className="text-xs font-bold text-[#00d9ff] tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>CLASSIFICATION LEGEND</h3>
      </div>

      <div className="space-y-2.5">
        {Object.entries(assetTypeColors).map(([type, color]) => (
          <div key={type} className="flex items-center group hover:bg-[#1e293b]/30 p-1.5 -mx-1.5 transition-colors">
            <div
              className="w-3 h-3 mr-3 flex-shrink-0 border border-[#00d9ff]"
              style={{
                backgroundColor: color,
                transform: 'rotate(45deg)',
                boxShadow: `0 0 8px ${color}`
              }}
            ></div>
            <span className="text-xs text-[#00d9ff] font-semibold tracking-wide uppercase" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};