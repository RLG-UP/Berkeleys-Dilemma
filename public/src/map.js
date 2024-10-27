require([
    "esri/config",
    "esri/Map",
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/ScaleBar",
    "esri/widgets/Legend"
  ], function(esriConfig, Map, WebMap, MapView, ScaleBar, Legend) {

  esriConfig.apiKey = apiKey;

  const webmap = new WebMap({
    portalItem: {
      id: "dd332182f75e4dbabcd7dc467364e594"
    }
  });

  const view = new MapView({
    container: "viewDiv",
    map: webmap
  });

  const scalebar = new ScaleBar({
    view: view
  });

  view.ui.add(scalebar, "bottom-left");

  const legend = new Legend({
    view: view
  });
  view.ui.add(legend, "top-right");

});
