
mapboxgl.accessToken = 'pk.eyJ1IjoiZGNhdXN0aW4iLCJhIjoiY2s2M3Z3cGNzMHNndzNrbW1sNWhsc3VqMyJ9.weYN7D1hVI-ZKDCuj5tdzQ';

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-82.343916, 29.647942], // starting position
    zoom: 19, // starting zoom
    //interactive: false
});

map.addControl(new mapboxgl.NavigationControl());
var slider = document.getElementById('slider');
var sliderValue = document.getElementById('slider-value');
var marker = new mapboxgl.Marker();

map.on('load', function() {
    map.loadImage(
        'C://Users/Joni Austin/Documents/GitHub/OnePass/mapmaze_js_api/People_Location-512.png',
        function(error, image) {
        if (error) throw error;
        map.addImage('cat', image);
        map.addSource('point', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': [
        {
        'type': 'Feature',
        'geometry': {
        'type': 'Point',
        'coordinates': [-82.343916, 29.647942]
        }
        }
        ]
        }
        });
        map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'point',
        'layout': {
        'icon-image': 'cat',
        'icon-size': 0.1
        }
        });
        }
        );
   


function animateMarker(timestamp){
    var radius = 20;
    marker.setLngLat([
        Math.cos(timestamp/1000) *radius,
        Math.sin(timestamp/ 1000) * radius
    ]);
    marker.addTo(map);
    requestAnimationFrame(animateMarker);
}
requestAnimationFrame(animateMarker);

 });/**

//Popup
map.on('load', function() {
    map.setStyle('mapbox://styles/mapbox/dark-v10');
    map.loadImage(
            'C://Users/Joni Austin/Documents/GitHub/OnePass/mapmaze_js_api/People_Location-512.png',
            function(error, image) {
                if (error) throw error;
            map.addImage('person', image);
            map.addSource('point', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [{
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-82.343916, 29.647942]
                                    }
                            }
                        ]
                    } 
            });
            map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'point',
                'layout': {
                    'icon-image': 'person',
                    'icon-size': 0.25
                    }  
            });

map.addSource('person' ,{
    'type': 'geojson',
    'data': {
    'type': 'FeatureCollection',
    'features': [{
        'type': 'Feature',
        'properties': {
            'description':
            '<strong>James Doe</strong><p> ID: 2204, STATUS: Active</p>',
            'icon': 'person',
            'icon-size': .1
            },
        'geometry': {
            'type': 'Point',
            'coordinates': [-82.34389, 29.64807]
                }
            }, { 
        
    'type': 'Feature',
    'properties': {
        'description':
        '<strong>Jordan Lang</strong><p>ID: 2214, STATUS: Active.</p>',
        'icon': 'theatre'
        },
    'geometry': {
        'type': 'Point',
        'coordinates': [-82.34405, 29.648112]
            }
        }
       ]
   }
});

//Marston floor plan!! 
    map.addSource('layout', {
        'type': 'raster',
        'url': 'C:/Users/Joni Austin/Documents/GitHub/OnePass/mapmaze_js_api/Marston_Floor_3.png'
    .addLayer({
        'id': 'layoutt',
        'source': 'layout',
        'type': 'raster'
        })
      });         
        slider.addEventListener('layoutt', function(e) {
        // Adjust the layers opacity. layer here is arbitrary - this could
        // be another layer name found in your style or a custom layer
        // added on the fly using `addSource`.
        map.setPaintProperty(
        'layout',
        'raster-opacity',
        parseInt(e.target.value, 10) / 100
        );
         
        // Value indicator
        sliderValue.textContent = e.target.value + '%';
        });


});     
    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', 'places', function(e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;
     
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
     
    new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(map);
    });
     
    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', function() {
    map.getCanvas().style.cursor = 'pointer';
    });
     
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', function() {
    map.getCanvas().style.cursor = '';
    });

});

*/