import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl, LayersControl, useMap } from 'react-leaflet';
import { Asset, MarkerColors } from '../types/assets';
import { AssetMarker } from './AssetMarker';
import 'leaflet/dist/leaflet.css';

interface GeospatialMapProps {
  assets: Asset[];
  assetTypeColors: MarkerColors;
  selectedAssetId?: string;
}

const MapController: React.FC<{ selectedAssetId?: string; assets: Asset[] }> = ({ 
  selectedAssetId, 
  assets 
}) => {
  const map = useMap();

  useEffect(() => {
    if (selectedAssetId) {
      const selectedAsset = assets.find(asset => asset.asset_id === selectedAssetId);
      if (selectedAsset) {
        map.setView(
          [selectedAsset.location.coordinates.latitude, selectedAsset.location.coordinates.longitude],
          8,
          { animate: true, duration: 1 }
        );
      }
    }
  }, [selectedAssetId, assets, map]);

  return null;
};

export const GeospatialMap: React.FC<GeospatialMapProps> = ({
  assets,
  assetTypeColors,
  selectedAssetId,
}) => {
  const [mapCenter] = useState<[number, number]>([60, 5]); // Center on Norway
  const [mapZoom] = useState<number>(4);

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="w-full h-full neon-border"
        style={{ background: '#0a0e1a', borderRadius: '2px' }}
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        <MapController selectedAssetId={selectedAssetId} assets={assets} />

        <LayersControl position="topleft">
          <LayersControl.BaseLayer checked name="TACTICAL DARK">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              maxZoom={20}
              className="map-filter-blue"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="SATELLITE OPS">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              maxZoom={18}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="TACTICAL GRID">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              maxZoom={20}
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {assets.map((asset) => (
          <AssetMarker
            key={asset.asset_id}
            asset={asset}
            color={assetTypeColors[asset.basic_info.type] || '#00d9ff'}
          />
        ))}
      </MapContainer>

      {/* Tactical Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none grid-overlay opacity-20 rounded-sm" style={{ mixBlendMode: 'overlay' }}></div>
    </div>
  );
};