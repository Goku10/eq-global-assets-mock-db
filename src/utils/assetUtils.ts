import { Asset, MarkerColors } from '../types/assets';

export const generateAssetTypeColors = (assets: Asset[]): MarkerColors => {
  const assetTypes = [...new Set(assets.map(asset => asset.basic_info.type))];
  
  // Predefined colors for common asset types
  const predefinedColors: Record<string, string> = {
    'Oil Field': '#dc2626', // Red
    'Gas Field': '#2563eb', // Blue
    'Offshore Wind Farm': '#16a34a', // Green
    'Solar Plant': '#eab308', // Yellow
    'Floating Wind Farm': '#059669', // Emerald
    'Gas Processing Plant': '#7c3aed', // Purple
    'Oil Terminal': '#ea580c', // Orange
    'LNG Terminal': '#0891b2', // Cyan
    'Refinery': '#be123c', // Rose
    'Methanol Plant': '#7c2d12', // Amber
    'Gas Project': '#4338ca', // Indigo
    'NGL Plant': '#9333ea', // Violet
    'Oil Development': '#c2410c', // Orange-red
    'Oil Platform': '#b91c1c', // Red-600
  };

  // Fallback colors for any additional types
  const fallbackColors = [
    '#f59e0b', '#10b981', '#f97316', '#06b6d4', '#8b5cf6',
    '#ef4444', '#14b8a6', '#f59e0b', '#3b82f6', '#84cc16'
  ];

  const colors: MarkerColors = {};
  let fallbackIndex = 0;

  assetTypes.forEach(type => {
    if (predefinedColors[type]) {
      colors[type] = predefinedColors[type];
    } else {
      colors[type] = fallbackColors[fallbackIndex % fallbackColors.length];
      fallbackIndex++;
    }
  });

  return colors;
};

export const filterAssets = (
  assets: Asset[],
  searchTerm: string,
  selectedCountry: string,
  selectedType: string,
  selectedPlanetCoverage: string,
  selectedSentinel1Coverage: string,
  selectedSentinel2Coverage: string
): Asset[] => {
  return assets.filter(asset => {
    const matchesSearch = !searchTerm ||
      asset.basic_info.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.location.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.basic_info.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.location.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.operational_data.current_status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCountry = !selectedCountry || asset.location.country === selectedCountry;
    const matchesType = !selectedType || asset.basic_info.type === selectedType;
    const matchesPlanetCoverage = !selectedPlanetCoverage || asset.planet_data_coverage === selectedPlanetCoverage;
    const matchesSentinel1Coverage = !selectedSentinel1Coverage || asset.sentinel_1_coverage === selectedSentinel1Coverage;
    const matchesSentinel2Coverage = !selectedSentinel2Coverage || asset.sentinel_2_coverage === selectedSentinel2Coverage;

    return matchesSearch && matchesCountry && matchesType && matchesPlanetCoverage && matchesSentinel1Coverage && matchesSentinel2Coverage;
  });
};

export const calculateStatistics = (assets: Asset[]) => {
  const countries = new Set(assets.map(asset => asset.location.country));
  const assetTypes = new Set(assets.map(asset => asset.basic_info.type));
  const operationalAssets = assets.filter(asset => 
    asset.operational_data.current_status === 'Operational'
  );

  return {
    totalAssets: assets.length,
    totalCountries: countries.size,
    totalAssetTypes: assetTypes.size,
    operationalAssets: operationalAssets.length,
  };
};