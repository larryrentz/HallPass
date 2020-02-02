// Just the same way to initialize as always...
map = new Mazemap.Map({
    "container": "map",
    "campuses": 89,
    "center": {
        "lng": -82.343916,
        "lat": 29.647942
    },
    "zoom": 18,
    "zLevel": 1,
    "scrollZoom": true,
    "doubleClickZoom": true,
    "touchZoomRotate": true
});

/**var floorplan = document.createElement("floorplan");
floorplan.src="OnePass/mapmaze_js_api/Marston_Floor_3.png";
var src = document.getElementById("floorplan");
src.appendChild(floorplan);

var pplMarker = document.createElement("pplMarker");
pplMarker.src="OnePass/mapmaze_js_api/Marston_Floor_3.png";
var src = document.getElementById("pplMarker");
src.appendChild(pplMarker);
*/
var CUSTOM_FEATURES = [
    {
        type: "Feature",
        properties: { zLevel: 1, name: 'Demo Floor' },
        geometry: {
            type: "Polygon",
            coordinates: [ [  [-82.343662, 29.647695],
                            [-82.343661, 29.648036],
                            [-82.343761, 29.648028],
                            [-82.343890,29.648098],
                            [-82.344072, 29.648089],
                            [-82.344083, 29.648024],
                            [-82.344179, 29.648022],
                            [-82.344193,29.647863],
                            [-82.344241, 29.647690],
                            [ -82.343662, 29.647695] ] ]
        }
    }
];

map.on('load', function(){
    //map.setView([-82.34, 29.64], 12);
    map.setCenter([-82.343916, 29.647942 ]);
    map.addLayer({
        id: 'custom-polygon-layer',
        type: "fill",
        source: {
            type: 'geojson',
            data: null,
        },
        paint: {
            "fill-color": "#fc0",
            "fill-outline-color": "red"
        }
    }),
    map.addLayer({
        id: 'floorplan',
        icon: 'Marston_Floor_3.png',
        scrollWheelZoom: false,
        center: {lat: -82.343916, lng: 29.647942},
        zoom: 18,
        zLevel: 1,
        maxZoom: 22
    });

map.layerEventHandler.on('click', 'custom-polygon-layer', (e, features) => {
        console.log('@@@ clicked custom-polygon-layer features: ', features);
        var topFeature = features[0];
        alert("you clicked feature named: " + topFeature.properties.name);
    });

    map.on('zlevel', redrawPolygons);
    redrawPolygons();

});



function redrawPolygons() {
    var zLevel = map.getZLevel();

    var filteredFeatures = CUSTOM_FEATURES.filter( feature => feature.properties.zLevel === zLevel );

    map.getSource("custom-polygon-layer").setData({type: "FeatureCollection", features: filteredFeatures});
}

// Add zoom and rotation controls to the map.
map.addControl(new Mazemap.mapboxgl.NavigationControl());


function pointToLayer(feature, latlng){

    var pplIcon = Maze.icon({
        icon: 'People_Location-512.png',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15],
    });

    return Maze.marker(latlng, {
        icon: icon,
        zLevel: feature.properties.zLevel || 0,
        offZOpacity: icon === pplIcon ? 1 : 0.4
    });
};

function popupFunc(layer){
    return layer.feature.properties.name;
};

var realtimeDataLayerPPL = Maze.geoJSON({
    "type": "FeatureCollection",
    "featured": []},
     { pointToLayer: pointToLayer}).bindPopup(popupFunc).addTo(map);

function updateJsonData(json, layer){
    layer.clearLayers();
    layer.addData(json);
}


function fetchRealtimeData(url, layer){
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        updateJsonData(json, layer);
    });
};

//Generate a mock feature that has a moving position based on time
function getMovingFeature(){
    var time = performance.now();
};

var dataLayers = {
    "Persons": realtimeDataLayerPPL
};

var control = Maze.control.layers([], 
    dataLayers, {position: 'topleft', collapsed: false}).addTo(map);

fetchRealtimeData('../example-assets/example-iot-asset-tracking-realtime-data.json', realtimeDataLayerPPL);
//fetchRealtimeData('../example-assets/example-iot-asset-tracking-realtime-data-ivpump.json', realtimeDataLayerIVPump);
//fetchRealtimeData('../example-assets/example-iot-asset-tracking-realtime-data.json', realtimeDataLayerWheelchairs);

// Returns a linear moving point along the line between startLatLng and endLatLng given a speed factor
function calcLinearLatLng(startLatLng, endLatLng, speed){

    var startPoint = map.project(startLatLng);
    var endPoint = map.project(endLatLng);

    var dX = endPoint.x - startPoint.x;
    var dY = endPoint.y - startPoint.y;

    var now = performance.now();

    var lengthTime = speed * 1000;

    var timeFraction = (now % lengthTime) / lengthTime;

    var fractionX = dX * timeFraction;
    var fractionY = dY * timeFraction;

    var fractionPoint = Maze.point(fractionX, fractionY);


    //Alternate the direction
    var direction = Math.floor( now / lengthTime) % 2 ;

    var calcPoint;
    if(direction){
        calcPoint = endPoint.subtract(fractionPoint);
    }else{
        calcPoint = startPoint.add(fractionPoint);
    }
    var calcLatLng = map.unproject(calcPoint);

    return calcLatLng;
}


function calcCompleteAmbulanceJson(){
    if(isZooming){
        return;
    }
    var featured = [];

    var latlngFeatures = [
        {	start: {lat: -82.343890, lng: 29.648098},
            end: {lat: -82.344179, lng: 29.648022},
            speed: 10
        },
        {	start: {lat: -82.343662,  lng: 29.647695},
            end: {lat: -82.344179,  lng: 29.648022},
            speed: 30
        },
    ];

    var i, latlng, json;
    for(i = 0; i < latlngFeatures.length; i++){
        latlng = calcLinearLatLng(latlngFeatures[i].start, latlngFeatures[i].end, latlngFeatures[i].speed);
        json = {
            "type": "Feature",
            "properties":{
                "zLevel": 0,
                "type": "people",
                "name": 'People'
            }, 
            "geometry": {
                "type": "Point",
                "coordinates": [
                    latlng.lng,
                    latlng.lat
                ]}};

        featured.push(json);
    }

    var geoJson = {
        "type": "FeatureCollection",
        "featured": featured
    };

    realtimeDataLayerPPL.clearLayers();
    realtimeDataLayerPPL.addData(geoJson)

}

// Hack for skipping the marker calculation when zooming
var isZooming = false;
map.on('zoomstart', function(){ isZooming = true;});
map.on('zoomend reset moveend', function(){ isZooming = false;});

setInterval(calcCompleteAmbulanceJson, 100);




