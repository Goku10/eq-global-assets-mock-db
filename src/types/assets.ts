export interface AssetCoordinates {
  latitude: number;
  longitude: number;
}

export interface AssetLocation {
  country: string;
  region: string;
  coordinates: AssetCoordinates;
  water_depth: string;
  nearby_cities: string;
}

export interface AssetBasicInfo {
  name: string;
  type: string;
  classification: string;
  production_type: string;
}

export interface AssetOperationalData {
  production_capacity: string;
  year_commissioned: number;
  current_status: string;
  development_phase: string;
  estimated_workforce: string;
}

export interface AssetOwnership {
  equinor_share: string;
  primary_contact: string;
}

export interface AssetEnvironmental {
  co2_emissions_intensity: string;
  certifications: string;
}

export interface Asset {
  asset_id: string;
  basic_info: AssetBasicInfo;
  location: AssetLocation;
  operational_data: AssetOperationalData;
  ownership: AssetOwnership;
  environmental: AssetEnvironmental;
  data_quality: string;
  planet_data_coverage: string;
  sentinel_1_coverage: string;
  sentinel_2_coverage: string;
}

export interface AssetsSummaryStatistics {
  assets_by_country: Record<string, number>;
  assets_by_type: Record<string, number>;
  assets_by_status: Record<string, number>;
  production_types: Record<string, number>;
}

export interface AssetsMetadata {
  title: string;
  description: string;
  version: string;
  last_updated: string;
  total_assets: number;
  countries: number;
  asset_types: number;
  data_sources: string[];
}

export interface AssetsDatabase {
  metadata: AssetsMetadata;
  summary_statistics: AssetsSummaryStatistics;
  assets: Asset[];
}

export interface MarkerColors {
  [key: string]: string;
}