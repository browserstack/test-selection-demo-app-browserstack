// Static user profile data for test/demo use
import { getAssetPath } from '../lib/assetUtils';

export const userProfiles = [
  {
    userId: 1,
    email: 'demo1@example.com',
    password: 'Qw!@d..**~cwcw',
    name: 'Demo One',
    avatar: getAssetPath('/static/avatars/demo1.svg')
  },
  {
    userId: 2,
    email: 'demo2@example.com',
    password: '@qqwdSC1eEem__o12',
    name: 'Demo Two',
    avatar: getAssetPath('/static/avatars/demo2.svg')
  },
  {
    userId: 3,
    email: 'testuser@example.com',
    password: 'test!!1-23Z~ww',
    name: 'Test User',
    avatar: getAssetPath('/static/avatars/testuser.svg')
  }
];
