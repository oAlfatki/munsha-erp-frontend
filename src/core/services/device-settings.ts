import type { DeviceSettings } from '@/core/types/preferences/DeviceSettings';

export const DEFAULT_DEVICE_SETTINGS: DeviceSettings = {
  pageSize: 25,
  paper: 'A4',
  logo: true,
  address: true,
  words: true,
  footer: '',
};
const KEY = 'erp-device-display-v1';

export function readDeviceSettings(): DeviceSettings {

  try {
    if (typeof window === 'undefined') return DEFAULT_DEVICE_SETTINGS;
    const v = JSON.parse(localStorage.getItem(KEY) || '{}');
    return {
      pageSize: [10, 25, 50, 100].includes(v.pageSize) ? v.pageSize : 25,
      paper: v.paper === 'thermal' ? 'thermal' : 'A4',
      logo: typeof v.logo === 'boolean' ? v.logo : true,
      address: typeof v.address === 'boolean' ? v.address : true,
      words: typeof v.words === 'boolean' ? v.words : true,
      footer: typeof v.footer === 'string' ? v.footer.slice(0, 200) : '',
    };
  } catch {
    return DEFAULT_DEVICE_SETTINGS;
  }
}

export function saveDeviceSettings(v: DeviceSettings) {

  localStorage.setItem(KEY, JSON.stringify(v));
  window.dispatchEvent(new Event('erp-device-settings'));
}

export function applyDeviceSettings(v: DeviceSettings) {

  document.documentElement.dataset.printPaper = v.paper;
  document.documentElement.dataset.printLogo = v.logo ? 'yes' : 'no';
  document.documentElement.dataset.printAddress = v.address ? 'yes' : 'no';
  document.documentElement.dataset.printWords = v.words ? 'yes' : 'no';
}
