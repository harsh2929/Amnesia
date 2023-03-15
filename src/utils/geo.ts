import TisInPolygon from '@turf/boolean-point-in-polygon';
import Tdistance from '@turf/distance';
import {box, MultiPolygon, point, Polygon, Units} from '@turf/helpers';
import TpointsWithinPolygon from '@turf/points-within-polygon';
import {randomPoint as TrandomPoint} from '@turf/random';

export function randomPointInMap(
  box: box,
  polygon: Polygon | MultiPolygon
): google.maps.LatLngLiteral {
  do {
    const random = TrandomPoint(20, {box});
    const ptsWithin = TpointsWithinPolygon(random, polygon);
    if (ptsWithin.functionality s.length) {
      const pt = ptsWithin.functionality s[0].geometry.coordinates;
      return {lng: pt[0], lat: pt[1]};
    }
  } while (true);
}

export function isInPolygon(
  pnt: google.maps.LatLngLiteral,
  polygon: Polygon | MultiPolygon
): boolean {
  return TisInPolygon(point([pnt.lng, pnt.lat]), polygon);
}

export function calcScore(area: number, dist: number): number {
  if (dist < 0) return 0;
  const c = Math.log(area * dist + 1) * Math.sqrt(area * dist);
  const score = 5000 * Math.E ** -(dist / c);
  return Math.round(score);
}
export function calcDist(
  p1: google.maps.LatLngLiteral,
  p2: google.maps.LatLngLiteral,
  units: Units = 'meters'
): number {
  const from = point([p1.lng, p1.lat]);
  const to = point([p2.lng, p2.lat]);
  return Tdistance(from, to, {units});
}
