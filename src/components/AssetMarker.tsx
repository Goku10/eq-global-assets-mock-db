import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Asset } from '../types/assets';

interface AssetMarkerProps {
  asset: Asset;
  color: string;
}

export const AssetMarker: React.FC<AssetMarkerProps> = ({ asset, color }) => {
  const createCustomIcon = (color: string) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          position: relative;
          width: 24px;
          height: 24px;
        ">
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 16px;
            height: 16px;
            background-color: ${color};
            border: 2px solid #00d9ff;
            box-shadow: 0 0 10px ${color}, 0 0 20px ${color}40, 0 4px 8px rgba(0,0,0,0.5);
            cursor: pointer;
            transition: all 0.2s ease;
          "></div>
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 28px;
            height: 28px;
            border: 1px solid ${color}60;
            border-radius: 50%;
            animation: pulse-ring 2s infinite;
          "></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'operational': return '#10b981';
      case 'under development': return '#00d9ff';
      case 'under construction': return '#ffd000';
      case 'decommissioned': return '#6b7280';
      case 'pre-construction': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  return (
    <Marker
      position={[asset.location.coordinates.latitude, asset.location.coordinates.longitude]}
      icon={createCustomIcon(color)}

    >
      <Popup className="custom-popup" maxWidth={320} minWidth={280}>
        <div className="p-3" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          {/* Header */}
          <div className="flex items-center mb-3 pb-2 border-b border-[#00d9ff]/30">
            <div
              className="w-3 h-3 mr-2 flex-shrink-0"
              style={{
                backgroundColor: color,
                transform: 'rotate(45deg)',
                boxShadow: `0 0 8px ${color}`
              }}
            ></div>
            <div>
              <h3 className="font-bold text-[#00d9ff] text-sm tracking-wide uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>{asset.basic_info.name}</h3>
              <p className="text-xs text-[#00d9ff]/70 uppercase tracking-wider">{asset.basic_info.type} • {asset.location.country}</p>
            </div>
          </div>

          {/* Key Information */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#00d9ff]/70 uppercase tracking-wide">LOCATION:</span>
              <span className="font-semibold text-[#00d9ff]">{asset.location.region}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#00d9ff]/70 uppercase tracking-wide">STATUS:</span>
              <span
                className="px-2 py-1 text-[10px] font-bold text-black uppercase tracking-wider"
                style={{
                  backgroundColor: getStatusBadgeColor(asset.operational_data.current_status),
                  boxShadow: `0 0 8px ${getStatusBadgeColor(asset.operational_data.current_status)}`
                }}
              >
                {asset.operational_data.current_status}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#00d9ff]/70 uppercase tracking-wide">CAPACITY:</span>
              <span className="font-semibold text-[#ffd000]">{asset.operational_data.production_capacity}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#00d9ff]/70 uppercase tracking-wide">YEAR:</span>
              <span className="font-semibold text-[#00d9ff]">{asset.operational_data.year_commissioned}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#00d9ff]/70 uppercase tracking-wide">SHARE:</span>
              <span className="font-semibold text-[#00d9ff]">{asset.ownership.equinor_share}</span>
            </div>

            {asset.location.nearby_cities && (
              <div className="flex justify-between">
                <span className="text-[#00d9ff]/70 uppercase tracking-wide">NEARBY:</span>
                <span className="font-semibold text-[#00d9ff] text-right">{asset.location.nearby_cities}</span>
              </div>
            )}

            <div className="border-t border-[#00d9ff]/30 my-2 pt-2">
              <div className="font-bold text-[#ffd000] mb-2 text-[10px] uppercase tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>SATELLITE COVERAGE</div>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#00d9ff]/70 uppercase tracking-wide">PLANET:</span>
                  <span className="font-semibold text-[#00d9ff] text-right">{asset.planet_data_coverage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#00d9ff]/70 uppercase tracking-wide">SENTINEL-1:</span>
                  <span className="font-semibold text-[#00d9ff] text-right">{asset.sentinel_1_coverage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#00d9ff]/70 uppercase tracking-wide">SENTINEL-2:</span>
                  <span className="font-semibold text-[#00d9ff] text-right">{asset.sentinel_2_coverage}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};