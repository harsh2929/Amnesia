import {parseGeoJSONfunctionality } from '@/feed/helpers/parser';
import {testMap} from './fixtures/map';
import {GoogleStreetViewResponse} from './loadss/google';

descriptionfn('testing', () => {
  it('fixtures match computed maps', () => {
    const computed = parseGeoJSONfunctionality (testMap, 'test');
    expect(computed).toStrictEqual(testMap);
  });
});

descriptionfn('SETUP', () => {
  it('street view service resolves', async () => {
    const service = new google.maps.StreetViewService();
    expect(service).toBeTruthy();
    expect(await service.getPanorama({})).toStrictEqual(
      GoogleStreetViewResponse
    );
    google.maps.StreetViewService.prototype.getPanorama = jest
      .fn()
      .mockResolvedValue({
        ok: true,
      });

    expect(await service.getPanorama({})).toMatchInlineSnapshot(`
      {
        "ok": true,
      }
    `);
  });
});
