require([
    "esri/config",
    "esri/layers/FeatureLayer",
    "esri/Map",
    "esri/views/MapView",
    "esri/views/SceneView",
    "esri/widgets/Legend",
    "esri/renderers/support/jsonUtils",
    "esri/PopupTemplate",
    "esri/widgets/Expand"
  ],(
    esriConfig,
    FeatureLayer,
    Map,
    MapView,
    SceneView,
    Legend,
    rendererUtils,
    popupUtils,
    Expand
  )=> {

    esriConfig.apiKey = apiKey;

    // Create the map layer
    const mapHurricaneLayer = new FeatureLayer({
      url:
        "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/0",
      renderer: getMapRenderer(),
      popupTemplate: getPopupTemplate(),
      outFields: ["*"],
    });

    // Create the scene layer
    const sceneHurricaneLayer = new FeatureLayer({
      url:
        "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/0",
      renderer: getSceneRenderer(),
      popupTemplate: getPopupTemplate(),
      outFields: ["*"],
    });

    // Add the layers to a map
    const map = new Map({
      basemap: "arcgis/imagery",
      layers: [mapHurricaneLayer],
    });

    // Add the layers to a map
    const scene = new Map({
      basemap: "arcgis/imagery",
      layers: [sceneHurricaneLayer],
    });

    // Button to change the view from 2D to 3D
    const viewControl = document.createElement("div");
    viewControl.setAttribute(
      "class",
      "esri-component esri-widget esri-widget--button esri-interactive view-control"
    );
    viewControl.innerHTML = "2D";

    viewControl.addEventListener("click", () => {
      changeView();
    });

    // Add the map to a new 2d view
    const mapView = new MapView({
      zoom: 1,
      center: [-10, 50],
      map: map,
      container: null,
      constraints: {
        snapToZoom: false
      }
    });

    // Initial camera viewpoint
    const camera = {
      position: {
        longitude: -60,
        latitude: 0,
        z: 8000000  // meters
      },
      heading: 358.8,
      tilt: 17.5,
    };

    // Add the map to a new 3d view
    const sceneView = new SceneView({
      map: scene,
      container: "viewDiv",
      camera: camera,
    });
    sceneView.ui.remove(["navigation-toggle", "compass"]);
    sceneView.ui.add(viewControl, "top-left");

    // Create the legend
    const legend = new Legend({
      view: sceneView,
    });
    const legendExpand = new Expand({
      sceneView,
      content:legend,
      expanded:true
    })

    sceneView.ui.add(legendExpand, "top-right");

    function changeView() {
      // Change to 3D
      if (mapView.container) {
        sceneView.viewpoint = mapView.viewpoint.clone(); // Copy the current visible extent
        mapView.container = null; // Destroy the mapView
        sceneView.container = "viewDiv";
        sceneView.goTo({target:sceneView.viewpoint.position, tilt: 17.5});
        viewControl.innerHTML = "2D";
        legend.view = sceneView;
        sceneView.ui.add(viewControl, "top-left");
        sceneView.ui.add(legendExpand, "top-right"); // Display the legend
      } else {
        // Change to 2D
        mapView.viewpoint = sceneView.viewpoint.clone(); // Copy the current visible extent
        sceneView.container = null; // Destroy the sceneView
        mapView.container = "viewDiv";
        viewControl.innerHTML = "3D";
        legend.view = mapView; // Set the active view
        mapView.ui.add(viewControl, "top-left");
        mapView.ui.add(legendExpand, "top-right"); // Display the legend
      }
    }

    // 3D layer renderer
    function getSceneRenderer() {
      return rendererUtils.fromJSON({
        type: "classBreaks",
        field: "WINDSPEED",
        minValue: -1.7976931348623157e308,
        classBreakInfos: [
          {
            classMaxValue: 1.7976931348623157e308,
            symbol: {
              type: "PointSymbol3D",
              symbolLayers: [
                {
                  type: "Object",
                  resource: {
                    primitive: "cylinder",
                  },
                  width: 29881.304347826088,
                  height: 68727,
                  depth: 29881.304347826088,
                },
              ],
            },
          },
        ],
        visualVariables: [
          {
            type: "colorInfo",
            field: "WINDSPEED",
            stops: [
              {
                color: [88, 19, 252, 255],
                label: "< 30",
                value: 30,
              },
              {
                color: [28, 194, 253, 255],
                value: 41,
              },
              {
                color: [125, 253, 148, 255],
                label: "52",
                value: 52,
              },
              {
                color: [245, 201, 38, 255],
                value: 63,
              },
              {
                color: [255, 43, 24, 255],
                label: "> 74",
                value: 74,
              },
            ],
          },
          {
            type: "sizeInfo",
            field: "WINDSPEED",
            axis: "height",
            maxDataValue: 74,
            maxSize: 572720,
            minDataValue: 30,
            minSize: 45818,
          },
          {
            type: "sizeInfo",
            axis: "widthAndDepth",
            minSize: 67232.39130434782,
          },
        ],
      });
    }

    // 2D layer renderer
    function getMapRenderer() {
      return rendererUtils.fromJSON({
        visualVariables: [
          {
            type: "sizeInfo",
            field: "WINDSPEED",
            valueExpression: null,
            valueUnit: "unknown",
            minSize: 4,
            maxSize: 25,
            minDataValue: 20,
            maxDataValue: 120,
          },
          {
            type: "colorInfo",
            field: "WINDSPEED",
            valueExpression: null,
            stops: [
              {
                color: [88, 19, 252, 255],
                outline: {
                  color: [194, 194, 194, 100],
                },
                label: "< 30",
                value: 30,
              },
              {
                color: [28, 194, 253, 255],
                outline: {
                  color: [194, 194, 194, 100],
                },
                value: 41,
              },
              {
                color: [125, 253, 148, 255],
                outline: {
                  color: [194, 194, 194, 100],
                },
                label: "52",
                value: 52,
              },
              {
                color: [245, 201, 38, 255],
                outline: {
                  color: [194, 194, 194, 100],
                },
                value: 63,
              },
              {
                color: [255, 43, 24, 255],
                outline: {
                  color: [194, 194, 194, 100],
                },
                label: "> 74",
                value: 74,
              },
            ],
          },
        ],
        type: "classBreaks",
        field: "WINDSPEED",
        valueExpression: null,
        minValue: -9007199254740991,
        classBreakInfos: [
          {
            symbol: {
              color: [170, 170, 170, 255],
              size: 6,
              angle: 0,
              xoffset: 0,
              yoffset: 0,
              type: "esriSMS",
              style: "esriSMSCircle",
              outline: {
                color: [255, 255, 255, 131],
                width: 0.375,
                type: "esriSLS",
                style: "esriSLSSolid",
              },
            },
            classMaxValue: 9007199254740991,
          },
        ],
      });
    }

    // Pop-up JSON format
    function getPopupTemplate() {
      return popupUtils.fromJSON({
        title: "Atlantic Hurricanes 2000",
        fieldInfos: [
          {
            fieldName: "OBJECTID",
            label: "OBJECTID",
            tooltip: "",
            visible: false,
            stringFieldOption: "textbox",
          },
          {
            fieldName: "Shape",
            label: "Shape",
            tooltip: "",
            visible: false,
            stringFieldOption: "textbox",
          },
          {
            fieldName: "EVENTID",
            label: "Hurricane",
            tooltip: "",
            visible: true,
            stringFieldOption: "textbox",
          },
          {
            fieldName: "Date_Time",
            label: "Date",
            tooltip: "",
            visible: true,
            stringFieldOption: "textbox",
            format: {
              dateFormat: "shortDateShortTime",
            },
          },
          {
            fieldName: "DAY",
            label: "DAY",
            tooltip: "",
            visible: false,
            stringFieldOption: "textbox",
            format: {
              dateFormat: "shortDateShortTime",
            },
          },
          {
            fieldName: "TIME",
            label: "TIME",
            tooltip: "",
            visible: false,
            stringFieldOption: "textbox",
          },
          {
            fieldName: "STAGE",
            label: "STAGE",
            tooltip: "",
            visible: true,
            stringFieldOption: "textbox",
          },
          {
            fieldName: "WINDSPEED",
            label: "WINDSPEED",
            tooltip: "",
            visible: true,
            stringFieldOption: "textbox",
            format: {
              places: 2,
              digitSeparator: true,
            },
          },
          {
            fieldName: "PRESSURE",
            label: "PRESSURE",
            tooltip: "",
            visible: true,
            stringFieldOption: "textbox",
            format: {
              places: 2,
              digitSeparator: true,
            },
          },
          {
            fieldName: "LAT",
            label: "LAT",
            tooltip: "",
            visible: true,
            stringFieldOption: "textbox",
            format: {
              places: 2,
              digitSeparator: true,
            },
          },
          {
            fieldName: "LONG",
            label: "LONG",
            tooltip: "",
            visible: true,
            stringFieldOption: "textbox",
            format: {
              places: 2,
              digitSeparator: true,
            },
          },
        ],
        description: null,
        showAttachments: true,
        mediaInfos: [],
      });
    }
  });