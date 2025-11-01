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
        className="w-full h-full rounded-lg"
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        <MapController selectedAssetId={selectedAssetId} assets={assets} />
        
        <LayersControl position="topleft">
          <LayersControl.BaseLayer checked name="ESRI Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              maxZoom={18}
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              maxZoom={19}
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="ESRI Streets">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom"
              maxZoom={18}
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="ESRI Topographic">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
              maxZoom={18}
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {assets.map((asset) => (
          <AssetMarker
            key={asset.asset_id}
            asset={asset}
            color={assetTypeColors[asset.basic_info.type] || '#666666'}
          />
        ))}
      </MapContainer>
    </div>
  );
};