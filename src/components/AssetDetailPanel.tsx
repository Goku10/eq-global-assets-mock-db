import React from 'react';
import { X, MapPin, Factory, Calendar, Users, Zap, Award, Gauge, Satellite } from 'lucide-react';
import { Asset } from '../types/assets';

interface AssetDetailPanelProps {
  asset: Asset | null;
  onClose: () => void;
  assetColor: string;
}

export const AssetDetailPanel: React.FC<AssetDetailPanelProps> = ({ asset, onClose, assetColor }) => {
  if (!asset) return null;

  const DetailRow = ({ icon: Icon, label, value }: { icon: React.ComponentType<any>, label: string, value: string }) => (
    <div className="flex items-start py-2">
      <Icon className="h-4 w-4 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
      <div className="min-w-0 flex-1">
        <span className="text-sm font-medium text-gray-600">{label}:</span>
        <span className="text-sm text-gray-900 ml-2">{value}</span>
      </div>
    </div>
  );

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'under development': return 'bg-blue-100 text-blue-800';
      case 'under construction': return 'bg-yellow-100 text-yellow-800';
      case 'decommissioned': return 'bg-gray-100 text-gray-800';
      case 'pre-construction': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
          <div className="flex items-start">
            <div 
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm mr-3 mt-0.5 flex-shrink-0"
              style={{ backgroundColor: assetColor }}
            ></div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{asset.basic_info.name}</h2>
              <p className="text-sm text-gray-600">{asset.basic_info.type} • {asset.location.country}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <DetailRow icon={Factory} label="Asset Type" value={asset.basic_info.type} />
              <DetailRow icon={MapPin} label="Classification" value={asset.basic_info.classification} />
              <DetailRow icon={Zap} label="Production Type" value={asset.basic_info.production_type} />
              <div className="flex items-start py-2">
                <Gauge className="h-4 w-4 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(asset.operational_data.current_status)}`}>
                    {asset.operational_data.current_status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Details</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <DetailRow icon={MapPin} label="Country" value={asset.location.country} />
              <DetailRow icon={MapPin} label="Region" value={asset.location.region} />
              <DetailRow icon={MapPin} label="Coordinates" value={`${asset.location.coordinates.latitude}, ${asset.location.coordinates.longitude}`} />
              <DetailRow icon={MapPin} label="Water Depth" value={asset.location.water_depth} />
              <DetailRow icon={MapPin} label="Nearby Cities" value={asset.location.nearby_cities} />
            </div>
          </div>

          {/* Operational Data */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Operational Data</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <DetailRow icon={Gauge} label="Production Capacity" value={asset.operational_data.production_capacity} />
              <DetailRow icon={Calendar} label="Year Commissioned" value={asset.operational_data.year_commissioned.toString()} />
              <DetailRow icon={Factory} label="Development Phase" value={asset.operational_data.development_phase} />
              <DetailRow icon={Users} label="Estimated Workforce" value={asset.operational_data.estimated_workforce} />
            </div>
          </div>

          {/* Ownership & Environmental */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ownership</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <DetailRow icon={Factory} label="Equinor Share" value={asset.ownership.equinor_share} />
                <DetailRow icon={Users} label="Primary Contact" value={asset.ownership.primary_contact} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Environmental</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <DetailRow icon={Zap} label="CO2 Emissions" value={asset.environmental.co2_emissions_intensity} />
                <DetailRow icon={Award} label="Certifications" value={asset.environmental.certifications} />
              </div>
            </div>
          </div>

          {/* Data Quality */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Quality</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center">
                <Award className="h-4 w-4 text-gray-500 mr-3" />
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  asset.data_quality === 'High' ? 'bg-green-100 text-green-800' :
                  asset.data_quality === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {asset.data_quality} Quality
                </span>
              </div>
            </div>
          </div>

          {/* Satellite Coverage */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Satellite Coverage</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <DetailRow icon={Satellite} label="Planet Data" value={asset.planet_data_coverage} />
              <DetailRow icon={Satellite} label="Sentinel-1" value={asset.sentinel_1_coverage} />
              <DetailRow icon={Satellite} label="Sentinel-2" value={asset.sentinel_2_coverage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};