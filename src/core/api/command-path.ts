import { pathSegment } from '@/core/api/path-segment';

export function commandPath(feature: string, type: string) {

  return `/${pathSegment(feature)}/commands/${pathSegment(type)}`;
}
