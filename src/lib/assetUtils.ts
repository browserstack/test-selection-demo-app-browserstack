// Utility function to get the correct asset path based on environment
export const getAssetPath = (assetPath: string) => {
  // Remove leading slash from assetPath, but always add one between base and asset
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${assetPath.replace(/^\//, '')}`;
};
