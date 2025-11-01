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
      case 'operational': return '#10b981';
      case 'under development': return '#3b82f6';
      case 'under construction': return '#f59e0b';
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
      <Popup className="custom-popup" maxWidth={300} minWidth={250}>
        <div className="p-2">
          {/* Header */}
          <div className="flex items-center mb-3">
            <div 
              className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
              style={{ backgroundColor: color }}
            ></div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{asset.basic_info.name}</h3>
              <p className="text-xs text-gray-600">{asset.basic_info.type} • {asset.location.country}</p>
            </div>
          </div>

          {/* Key Information */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium text-gray-900">{asset.location.region}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status:</span>
              <span 
                className="px-2 py-1 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: getStatusBadgeColor(asset.operational_data.current_status) }}
              >
                {asset.operational_data.current_status}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Capacity:</span>
              <span className="font-medium text-gray-900">{asset.operational_data.production_capacity}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Year:</span>
              <span className="font-medium text-gray-900">{asset.operational_data.year_commissioned}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Share:</span>
              <span className="font-medium text-gray-900">{asset.ownership.equinor_share}</span>
            </div>
            
            {asset.location.nearby_cities && (
              <div className="flex justify-between">
                <span className="text-gray-600">Nearby:</span>
                <span className="font-medium text-gray-900 text-right">{asset.location.nearby_cities}</span>
              </div>
            )}

            <div className="border-t border-gray-200 my-2 pt-2">
              <div className="font-semibold text-gray-700 mb-1">Satellite Coverage</div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Planet:</span>
                  <span className="font-medium text-gray-900 text-right text-xs">{asset.planet_data_coverage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sentinel-1:</span>
                  <span className="font-medium text-gray-900 text-right text-xs">{asset.sentinel_1_coverage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sentinel-2:</span>
                  <span className="font-medium text-gray-900 text-right text-xs">{asset.sentinel_2_coverage}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};