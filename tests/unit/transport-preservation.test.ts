import { submitParty } from '@/features/parties/api/parties-api';
import { mapPartyInput } from '@/features/parties/mapper/parties-mapper';
import { it, vi, expect, afterEach } from 'vitest';
import expected from '../fixtures/baseline-transport.json';
import { axiosInstance as apiClient } from '@/core/api/apiClient';
import examples from '../fixtures/command-examples.json';
import owners from '../fixtures/command-service-map.json';
const modules = import.meta.glob('../../src/features/**/*-service.ts', { eager: true }) as Record<
  string,
  Record<string, Function>
>;
const captured: Record<string, unknown> = {};
const originalAdapter = apiClient.defaults.adapter;
afterEach(() => {
  apiClient.defaults.adapter = originalAdapter;
  vi.unstubAllGlobals();
});
for (const [type, [owner, service]] of Object.entries(owners))
  it(type, async () => {
    vi.stubGlobal('document', { documentElement: { lang: 'ar' } });
    apiClient.defaults.adapter = async (config) => {
      if (config.method === 'post')
        captured[type] = { url: config.url, method: config.method, body: JSON.parse(config.data) };
      return {
        data:
          config.method === 'post'
            ? { isSuccess: true, data: { revision: 1 } }
            : { state: {}, revision: 1 },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    };
    const sample = examples[type as keyof typeof examples];
    if (owner === 'parties' && service === 'saveParty')
      await submitParty(mapPartyInput(sample.data), { id: sample.id, revision: sample.revision });
    else {
      const candidates = Object.values(modules).filter(
        (module) => typeof module[service] === 'function',
      );
      expect(candidates, service + ' has one domain owner').toHaveLength(1);
      await candidates[0][service](sample.data, { id: sample.id, revision: sample.revision });
    }
    expect(captured[type]).toEqual(expected[type as keyof typeof expected]);
  });
