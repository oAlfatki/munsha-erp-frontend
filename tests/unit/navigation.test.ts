import {describe,it,expect} from 'vitest';
import {APP_ROUTES} from '@/app/router/routes';
import {MENU_ITEMS,menuLeaves} from '@/core/config/menu';
import previous from '../fixtures/pre-separation-routes.json';
describe('central routes preserve original destinations',()=>{
 it('preserves all original URL patterns',()=>expect(APP_ROUTES.map(route=>route.path).sort()).toEqual(previous.routes.map(route=>route.path).sort()));
 it('preserves all 111 menu links and 108 destinations',()=>{const paths=Object.values(MENU_ITEMS).flatMap(menuLeaves).map(item=>item.target!);expect(paths).toHaveLength(111);expect(new Set(paths).size).toBe(108);for(const path of paths)expect(APP_ROUTES.some(route=>route.path===path),path).toBe(true);});
 it('has no duplicate route patterns',()=>expect(new Set(APP_ROUTES.map(route=>route.path)).size).toBe(APP_ROUTES.length));
});
