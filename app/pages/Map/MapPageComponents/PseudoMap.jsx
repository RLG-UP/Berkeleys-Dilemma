import React, { useEffect } from 'react';

function PseudoMap() {
  useEffect(() => {
    // Dynamically load the ArcGIS API script
    const script = document.createElement('script');
    script.src = 'https://js.arcgis.com/4.29/';
    script.onload = () => {
      // Initialize the map after the ArcGIS API is loaded
      initializeMap();
    };
    document.head.appendChild(script);

    // Dynamically load the map-listener.js file
    const listenerScript = document.createElement('script');
    listenerScript.src = './MapPageComponents/map-listeners.js'; // Adjust the path accordingly
    listenerScript.onload = () => {
      console.log('map-listener.js loaded successfully');
    };
    document.head.appendChild(listenerScript);

    // Clean up on component unmount
    return () => {
      document.head.removeChild(script);
      document.head.removeChild(listenerScript);
    };
  }, []);

  const initializeMap = () => {
    window.require([
      'esri/config',
      'esri/Map',
      'esri/views/MapView',
      'esri/views/SceneView',
      'esri/widgets/Home',
      'esri/widgets/Legend',
      'esri/widgets/Expand',
    ], (esriConfig, Map, MapView, SceneView, Home, Legend, Expand) => {
      esriConfig.apiKey = 'your-api-key';
      const map = new Map({
        basemap: 'arcgis/imagery',
      });

      const mapView = new MapView({
        container: 'mapViewDiv',
        map: map,
        center: [-10, 50],
        zoom: 4,
      });

      const sceneView = new SceneView({
        container: 'sceneViewDiv',
        map: map,
        camera: {
          position: { longitude: -60, latitude: 0, z: 8000000 },
          heading: 358.8,
          tilt: 17.5,
        },
      });

      const homeWidget = new Home({ view: mapView });
      mapView.ui.add(homeWidget, 'top-left');

      const legend = new Legend({ view: mapView });
      const legendExpand = new Expand({ content: legend, view: mapView });
      mapView.ui.add(legendExpand, 'top-left');
    });
  };

  return (
    <>
      <div id="mapViewDiv" style={{ width: '100vw', height: '50vh' }}></div>
      <div id="sceneViewDiv" style={{ width: '100vw', height: '50vh', display: 'none' }}></div>
    </>
  );
}

export default PseudoMap;
