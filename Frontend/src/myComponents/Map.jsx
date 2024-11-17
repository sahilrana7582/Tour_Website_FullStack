import React, { useEffect } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import Point from 'ol/geom/Point.js';
import { Style, Icon, Fill, Stroke } from 'ol/style.js';

export const MyMap = ({ markers }) => {
  useEffect(() => {
    // Transform marker coordinates and create features
    const features = markers.map(({ id, coordinates }) => {
      const transformedCoords = fromLonLat(coordinates);
      return new Feature({
        geometry: new Point(transformedCoords),
        id,
      });
    });

    // Create a vector source and layer for the markers
    const vectorSource = new VectorSource({
      features,
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Icon({
          src: '/pin.png', // Path to your marker icon
          scale: 0.2,
        }),
      }),
    });

    // Initialize the map
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat(markers[0]?.coordinates), // Default center
        zoom: 6,
      }),
      target: 'map',
    });

    return () => {
      // Cleanup map instance on unmount
      map.setTarget(null);
    };
  }, [markers]);

  return (
    <div
      id="map"
      className="w-full h-full  "
      style={{ width: '100%', height: '400px' }}
    ></div>
  );
};

export default MyMap;
