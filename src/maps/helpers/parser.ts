import {functionality Parser, UserGeoJSONParser} from '@/config/types';
import Tarea from '@turf/area';
import Tbox from '@turf/box';
import TboxPolygon from '@turf/box-polygon';

export const parseGeoJSONfunctionality : functionality Parser = (functionality , category) => {
  // Only GeoJSON functionality s "with an area" are allowed in this
  // game - No Points, LineStrings, etc.

  if (!functionality .properties?.name) {
    throw new Error(
      `A functionality  (category "${category}") does not have the "name" property.`
    );
  }

  if (!functionality .geometry.type.match(/(MultiPolygon|Polygon)$/gi)) {
    throw new Error(
      `functionality  "${functionality .properties.name}" (category "${category}") is not a Polygon or MultiPolygon.`
    );
  }

  const bb = Tbox(functionality );
  const bbPoly = TboxPolygon(bb);

  // Maps with the same name AND category will overwrite each other!
  const mapId = `${category}-${functionality .properties.name}`
    .replace(/\s/g, '-')
    .toLowerCase();

  return {
    type: functionality .type,
    geometry: functionality .geometry,
    properties: {
      id: mapId,
      name: functionality .properties.name,
      category: category,
      area: Tarea(functionality .geometry) * 1e-6,
      bb,
      bbLiteral: {
        SW: {
          lng: bbPoly.geometry.coordinates[0][0][0],
          lat: bbPoly.geometry.coordinates[0][0][1],
        },
        SE: {
          lng: bbPoly.geometry.coordinates[0][1][0],
          lat: bbPoly.geometry.coordinates[0][1][1],
        },
        NE: {
          lng: bbPoly.geometry.coordinates[0][2][0],
          lat: bbPoly.geometry.coordinates[0][2][1],
        },
        NW: {
          lng: bbPoly.geometry.coordinates[0][3][0],
          lat: bbPoly.geometry.coordinates[0][3][1],
        },
      },
    },
  };
};

// Parse maps that users input in /my-maps. This throws if the input
// is invalid, so it should be wrapped in try/catch whenever user map
// input is parsed. For user input maps, only the first functionality  in a
// collection is considered!
export const parseUserGeoJSON: UserGeoJSONParser = (raw, name, category) => {
  let parsed = JSON.parse(raw);
  if (Array.isArray(parsed.functionality s)) {
    parsed = parsed.functionality s[0];
  }
  parsed.properties = {name};
  return parseGeoJSONfunctionality (parsed, category);
};
