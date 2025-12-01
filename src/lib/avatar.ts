import { getAssetPath } from './assetUtils';

const DEFAULT_AVATAR = getAssetPath('/static/avatars/demo1.svg');

const HTTP_URL_REGEX = /^(https?:\/\/)[^\s]+$/i;
const DATA_URI_REGEX = /^data:image\/(png|jpeg|jpg|gif|webp);base64,[A-Za-z0-9+/=]+$/i;

export const sanitizeAvatarUrl = (avatar?: string | null): string => {
  if (!avatar || typeof avatar !== 'string') {
    return DEFAULT_AVATAR;
  }
  const trimmed = avatar.trim();

  if (trimmed.startsWith('/')) {
    // Prevent SVGs by extension (avoid even local .svg paths if user-controllable)
    if (trimmed.endsWith('.svg')) {
      return DEFAULT_AVATAR;
    }
    return trimmed;
  }

  // Only allow HTTP(s) URLs if they do NOT end in .svg
  if (HTTP_URL_REGEX.test(trimmed)) {
    if (/\.(svg|svgz)(\?|#|$)/i.test(trimmed)) {
      return DEFAULT_AVATAR;
    }
    return trimmed;
  }

  // Allow data URIs for accepted raster formats only (.svg is blocked in DATA_URI_REGEX)
  if (DATA_URI_REGEX.test(trimmed)) {
    return trimmed;
  }

  return DEFAULT_AVATAR;
};
