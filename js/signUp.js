
"use strict" 

var apikey = 'f397622201474be49b7305d05216285e';
/*var latitude = '51.0';
var longitude = '7.0';

var api_url = 'https://api.opencagedata.com/geocode/v1/json'

var request_url = api_url
  + '?'
  + 'key=' + apikey
  + '&q=' + encodeURIComponent(latitude + ',' + longitude)
  + '&pretty=1'
  + '&no_annotations=1';

// see full list of required and optional parameters:
// https://opencagedata.com/api#forward

var request = new XMLHttpRequest();
request.open('GET', request_url, true);

request.onload = function() {
  // see full list of possible response codes:
  // https://opencagedata.com/api#codes

  if (request.status === 200){ 
    // Success!
    var data = JSON.parse(request.responseText);
    alert(data.results[0].formatted); // print the location

  } else if (request.status <= 500){ 
    // We reached our target server, but it returned an error
                         
    console.log("unable to geocode! Response code: " + request.status);
    var data = JSON.parse(request.responseText);
    console.log('error msg: ' + data.status.message);
  } else {
    console.log("server error");
  }
};

request.onerror = function() {
  // There was a connection error of some sort
  console.log("unable to connect to server");        
};

request.send();  // make the request
                           
*/

mapboxgl.accessToken = 'pk.eyJ1IjoiZG9zc3k0NCIsImEiOiJja29qeTB1MWgwNncxMm5rempsdzBjNndtIn0.CnIR5-To0KHr0eAr7v21IA';
let map = new  mapboxgl.Map({
   container: 'map',
  center: [144.9648731,-37.8182711],
  zoom: 16,
  style: 'mapbox://styles/mapbox/streets-v9'
});
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());


let canvas = map.getCanvasContainer();


let start = [];
let end = [];
//let start = [144.9648731,-37.8182711];
//let end = [154.9648731,-37.8182711];

let popup1 = new mapboxgl.Popup({ closeOnClick: false })
let popup2 = new mapboxgl.Popup({ closeOnClick: false })
/*var popup = new mapboxgl.Popup({ closeOnClick: false })
popup.setLngLat([startLong, startLat])
popup.setHTML('<p>Hello World!</p>')
popup.addTo(map);
*/



function StartLocation() {

  let startLocRef = document.getElementById("startAddressInput");
  let startLoc = startLocRef.value;

  let forwardUrl = 'https://api.opencagedata.com/geocode/v1/json?'
  let forwardRequest_url = forwardUrl
  + 'q=' + encodeURIComponent(startLoc)
  + '&key=' + apikey
  + '&pretty=1';
  let request = new XMLHttpRequest();
  request.open('GET', forwardRequest_url, true);

  request.onload = function() {
    // see full list of possible response codes:
    // https://opencagedata.com/api#codes

    if (request.status === 200){ 
      // Success!
      let data = JSON.parse(request.responseText);
      alert(data.results[0].formatted); // print the location
      console.log(data.results[0].geometry);
      let startLat = data.results[0].geometry.lat;
      let startLong= data.results[0].geometry.lng;
      map.jumpTo({center:[startLong,startLat]});
      start = [startLong,startLat]
      setStart(start)
      popup1.setLngLat([startLong, startLat])
      popup1.setHTML(`<h6>Start Location:</h6>\n ${data.results[0].formatted}.`)
      popup1.addTo(map);
    } else if (request.status <= 500){ 
      // We reached our target server, but it returned an error
                           
      console.log("unable to geocode! Response code: " + request.status);
      let data = JSON.parse(request.responseText);
      console.log('error msg: ' + data.status.message);
    } else {
      console.log("server error");
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.log("unable to connect to server");        
  };

  request.send();


  
}



function StopLocation() {

  let stopLocRef = document.getElementById("stopAddressInput");
  let stopLoc = stopLocRef.value;

  let forwardUrl = 'https://api.opencagedata.com/geocode/v1/json?'
  let forwardRequest_url = forwardUrl
  + 'q=' + encodeURIComponent(stopLoc)
  + '&key=' + apikey
  + '&pretty=1';
  let request = new XMLHttpRequest();
  request.open('GET', forwardRequest_url, true);

  request.onload = function() {
    // see full list of possible response codes:
    // https://opencagedata.com/api#codes

    if (request.status === 200){ 
      // Success!
      let data = JSON.parse(request.responseText);
      alert(data.results[0].formatted); // print the location
      console.log(data.results[0].geometry);
      let stopLat = data.results[0].geometry.lat;
      let stopLong= data.results[0].geometry.lng;
      map.jumpTo({center:[stopLong,stopLat]});
      end = [stopLong,stopLat]
      setEnd(end)
      popup2.setLngLat([stopLong, stopLat])
      popup2.setHTML(`<h6>End Location:</h6>\n ${data.results[0].formatted}.`)
      popup2.addTo(map);
    } else if (request.status <= 500){ 
      // We reached our target server, but it returned an error
                           
      console.log("unable to geocode! Response code: " + request.status);
      let data = JSON.parse(request.responseText);
      console.log('error msg: ' + data.status.message);
    } else {
      console.log("server error");
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.log("unable to connect to server");        
  };

  request.send();
}





//let start = [startLong,startLat];
//let end = [stopLong,stopLat];














function getRoute(end) {
  // make a directions request using cycling profile
  // an arbitrary start will always be the same
  // only the end or destination will change
  //var start = [144.9648731,-37.8182711];
  var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

  // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onload = function() {
    var json = JSON.parse(req.response);
    var data = json.routes[0];
    var route = data.geometry.coordinates;
    var geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route
      }
    };
    // if the route already exists on the map, reset it using setData
    if (map.getSource('route')) {
      map.getSource('route').setData(geojson);
    } else { // otherwise, make a new request
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: geojson
            }
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
    }
    // add turn instructions here at the end
  };
  req.send();
}

 /*map.on('load',*/ function setStart(start) {
  // make an initial directions request that
  // starts and ends at the same location
  getRoute(start);

  // Add starting point to the map
  map.addLayer({
    id: 'point',
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: start
          }
        }
        ]
      }
    },
    paint: {
      'circle-radius': 10,
      'circle-color': '#3887be'
    }
  });
  // this is where the code from the next step will go
}/*)*/;

/*map.on('load',*/function setEnd(end) { // change this bit to execute when button is clicked.
 /* var coordsObj = end;
  canvas.style.cursor = '';
  var coords = Object.keys(coordsObj).map(function(key) {
    return coordsObj[key];
  });
  var end = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: coords
      }
    }
    ]
  };*/
  let coords=end;
  if (map.getLayer('end')) {
    map.getSource('end').setData(end);
  } else {
    map.addLayer({
      id: 'end',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: coords
            }
          }]
        }
      },
      paint: {
        'circle-radius': 10,
        'circle-color': '#f30'
      }
    });
  }
  
  getRoute(coords);
}/*)*/;

/*


var start = [144.9648731,-37.8182711];





*/
