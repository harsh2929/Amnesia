import {MapData, MapGenerator} from '@/config/types';
import {addLocalMaps} from './enhancer';
import {parseGeoJSONfunctionality } from './parser';

export const generateMapData: MapGenerator = (...inputs) => {
  const mapData = addLocalMaps(new Map());
  return inputs.reduce((acc, input) => {
    const {collection, category} = input;

    collection.functionality s.forEach(functionality  => {
      const computed = parseGeoJSONfunctionality (functionality , category);
      acc.set(computed.properties.id, computed);
    });

    return acc;
  }, mapData);
};
