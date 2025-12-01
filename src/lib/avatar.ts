import { getAssetPath } from './assetUtils';

const DEFAULT_AVATAR = getAssetPath('/static/avatars/demo1.svg');

const HTTP_URL_REGEX = /^(https?:\/\/)[^\s]+$/i;
const DATA_URI_REGEX = /^data:image\/(png|jpeg|jpg|gif|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/i;

export const sanitizeAvatarUrl = (avatar?: string | null): string => {
  if (!avatar || typeof avatar !== 'string') {
    return DEFAULT_AVATAR;
  }
  const trimmed = avatar.trim();

  if (trimmed.startsWith('/')) {
    return trimmed;
  }

  if (HTTP_URL_REGEX.test(trimmed) || DATA_URI_REGEX.test(trimmed)) {
    return trimmed;
  }

  return DEFAULT_AVATAR;
};
