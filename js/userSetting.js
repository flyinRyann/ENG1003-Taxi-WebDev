





"use strict" 


const START_KEY = "startKey";
const WAY_KEY = "wayKey";
const END_KEY = "endKey";





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

let coord = document.getElementById('coordinates');
let marker = new mapboxgl.Marker({
    draggable: true
    })
    .setLngLat([144.9648731,-37.8182711])
    .addTo(map);
     
    function onDragEnd() {
    let lngLat = marker.getLngLat();
    coord.style.display = 'block';
    coord.innerHTML =
    'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
    }
     
    marker.on('dragend', onDragEnd);

    map.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true
        })
        );

let canvas = map.getCanvasContainer();


let start = [];
let end = [];
let waypoint = [];
let resArr =[];
//let start = [144.9648731,-37.8182711];
//let end = [154.9648731,-37.8182711];

let popup1 = new mapboxgl.Popup({ closeOnClick: false })
let popup2 = new mapboxgl.Popup({ closeOnClick: false })
let popup3 = new mapboxgl.Popup({ closeOnClick: false })
let popup4 = new mapboxgl.Popup({ closeOnClick: false })
let popup5 = new mapboxgl.Popup({ closeOnClick: false })
let popup6 = new mapboxgl.Popup({ closeOnClick: false })
let popup7 = new mapboxgl.Popup({ closeOnClick: false })
let popup8 = new mapboxgl.Popup({ closeOnClick: false })
let popup9 = new mapboxgl.Popup({ closeOnClick: false })
let popup10 = new mapboxgl.Popup({ closeOnClick: false })
let popup11 = new mapboxgl.Popup({ closeOnClick: false })
let popup12 = new mapboxgl.Popup({ closeOnClick: false })
let popup13 = new mapboxgl.Popup({ closeOnClick: false })
let popup14 = new mapboxgl.Popup({ closeOnClick: false })
let popup15 = new mapboxgl.Popup({ closeOnClick: false })
let popup16 = new mapboxgl.Popup({ closeOnClick: false })
let popup17 = new mapboxgl.Popup({ closeOnClick: false })
let popup18 = new mapboxgl.Popup({ closeOnClick: false })
let popup19 = new mapboxgl.Popup({ closeOnClick: false })
let popup20 = new mapboxgl.Popup({ closeOnClick: false })
let popup21 = new mapboxgl.Popup({ closeOnClick: false })
let popup22 = new mapboxgl.Popup({ closeOnClick: false })
let popup23 = new mapboxgl.Popup({ closeOnClick: false })
let popup24 = new mapboxgl.Popup({ closeOnClick: false })
let popup25 = new mapboxgl.Popup({ closeOnClick: false })
let popup26 = new mapboxgl.Popup({ closeOnClick: false })
let popup27 = new mapboxgl.Popup({ closeOnClick: false })


/*var popup = new mapboxgl.Popup({ closeOnClick: false })
popup.setLngLat([startLong, startLat])
popup.setHTML('<p>Hello World!</p>')
popup.addTo(map);
*/



let clLat ;
let clLong;



/*let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  */
  
  /*
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
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
      alert(`Your Start Location: ${data.results[0].formatted}`); // print the location
      console.log(data.results[0].geometry);
      let startLat = data.results[0].geometry.lat;
      let startLong= data.results[0].geometry.lng;
      map.jumpTo({center:[startLong,startLat]});
      start = [startLong,startLat]

      updateLocalStorage(START_KEY,start);

      console.log(`Address=${start}`)
      console.log(start);
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
function success(pos) {
    let crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

      clLat =crd.latitude;
      clLong =crd.longitude;
console.log("clLat ="+clLat)
console.log("clLong ="+clLong)

  };

  function getCL(){
    navigator.geolocation.getCurrentPosition(success);
  };

  navigator.geolocation.getCurrentPosition(success);
  //console.log(`clStart Latitude : ${clLat}`);
  //console.log(`cl Start Longitude: ${clLong}`);

function clStart(start) 
{
    
    

      let api_url = 'https://api.opencagedata.com/geocode/v1/json?'
      let request_url = api_url
      + 'q=' + encodeURIComponent(clLat+ ',' + clLong)
      + '&key=' + apikey
      + '&pretty=1';
   
   
    /*
    let startLocRef = document.getElementById("startAddressInput");
  let startLoc = startLocRef.value;

  let forwardUrl = 'https://api.opencagedata.com/geocode/v1/json?'
  let forwardRequest_url = forwardUrl
  + 'q=' + encodeURIComponent(startLoc)
  + '&key=' + apikey
  + '&pretty=1';

  */


  let request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  request.onload = function() {
    // see full list of possible response codes:
    // https://opencagedata.com/api#codes

    if (request.status === 200){ 
      // Success!
      let data = JSON.parse(request.responseText);
      alert(`Your Start Location: ${data.results[0].formatted}`); // print the location
      console.log(data.results[0].geometry);
      let startLat = data.results[0].geometry.lat;
      let startLong= data.results[0].geometry.lng;
      console.log(data.results)
      map.jumpTo({center:[startLong,startLat]});
      start = [startLong,startLat]
      end = [startLong,startLat]
      console.log(`cl start coords=${start}`)
      console.log(start);
      console.log(`start[0]=${start[0]}`)
      console.log(`start[1]=${start[1]}`)
      console.log(`end[0]=${end[0]}`)
      console.log(`end[1]=${end[1]}`)
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
            coordinates: route// here add more coords
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


  

};


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
      alert(`Your End Location: ${data.results[0].formatted}`); // print the location
      console.log(data.results[0].geometry);
      let stopLat = data.results[0].geometry.lat;
      let stopLong= data.results[0].geometry.lng;
      map.jumpTo({center:[stopLong,stopLat]});
      end = [stopLong,stopLat]

      updateLocalStorage(END_KEY,end);

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
  console.log(`start[0]=${start[0]}`)
  console.log(`start[1]=${start[1]}`)
  console.log(`end[0]=${end[0]}`)
  console.log(`end[1]=${end[1]}`)
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
        coordinates: route// here add more coords
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

function routeWaypoint(waypoint){
    console.log(`waypoint length =${waypoint.length}\n (waypoint length[0]) =${waypoint[0]}(waypoint length[1]) =${waypoint[1]}`)
/*
let wayLong=waypoint[0];
let wayLat=waypoint[12];


    for(let i=1;i<11;i++){
        
        /*else if(i!=0){
        wayLong+=waypoint[i];
        }
        wayLong+=waypoint[i];
        console.log(`wayLong=${wayLong}`)
    }
    for(let i=13;i<23;i++){
        
        /*else if(i!=0){
        wayLat+=waypoint[i];
        }
        wayLat+=waypoint[i];
        console.log(`wayLat=${wayLat}`)
    }

    let wayArray = [wayLong,wayLat];

    console.log(wayArray);
    console.log(`wayArray length =${wayArray.length}`)
    */

    let url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start[0] + ',' + start[1] + ';';
    for(let i=0;i<(waypoint.length);i++)
    {
        console.log(`i=${i}`);
        console.log(waypoint);
        console.log(`waypoint[i]=${waypoint[i]}\nwaypoint[i+1]=${waypoint[i+1]} `);
    url+=waypoint[i] + ',' + waypoint[i+1] + ';';
    i++;
    }
    url+=end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;
//console.log(url);
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
        coordinates: route// here add more coords
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
    /*console.log(end)
    console.log(start)
    mapboxNavigation.requestRoutes(
        RouteOptions.builder()
    
            .accessToken(MAPBOX_TOKEN)
    
            .coordinates(listOf(start, end))
    
            .geometries(RouteUrl.GEOMETRY_POLYLINE6)
            .profile(RouteUrl.PROFILE_DRIVING)
            .build()
    )*/
    
};


function setWaypoint(point){
    let coordin=point;
  if (map.getLayer('point')) {
    map.getSource('point').setData(point);
  } else {
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
              coordinates: coordin
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
    
routeWaypoint(coordin)
};


let j=0; 
//let wayLongArr =[];
//let wayLatArr =[];

function AddWaypoint() {

    let wayLocRef = document.getElementById("waypointAddressInput");
    let wayLoc = wayLocRef.value;
  
    let forwardUrl = 'https://api.opencagedata.com/geocode/v1/json?'
    let forwardRequest_url = forwardUrl
    + 'q=' + encodeURIComponent(wayLoc)
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
        alert(`Your Waypoint Location: ${data.results[0].formatted}`); // print the location
        console.log(data.results[0].geometry);
        let wayLat = data.results[0].geometry.lat;
        let wayLong= data.results[0].geometry.lng;
           // wayLongArr.push(wayLong);
           // wayLatArr.push(wayLat);

        map.jumpTo({center:[wayLong,wayLat]});
        //let waypoint1;
         //waypoint1= wayLong,wayLat;
         waypoint.push(wayLong)
         waypoint.push(wayLat)
        console.log(waypoint);

        updateLocalStorage(WAY_KEY,waypoint);

        setWaypoint(waypoint)
        //resArr.push(data.results[0].formatted.toString())
        //resArr.push("empty index")
        /*popup3.setLngLat([wayLong, wayLat])
        //console.log(resArr[i])
        popup3.setHTML(`<h6>Waypoint Location:</h6>\n ${data.results[0].formatted}.`)
        popup3.addTo(map)*/
        
        //console.log(`resArr=${resArr}`)
        for( j;j<2; j++){
          if (j=0)  {
        popup3.setLngLat([wayLong, wayLat])
        popup3.setHTML(`<h6>Waypoint Location:</h6>\n ${data.results[0].formatted}.`)
        popup3.addTo(map);
        break
          }
          if (j=1)  {
            popup4.setLngLat([wayLong, wayLat])
            popup4.setHTML(`<h6>Waypoint Location:</h6>\n ${data.results[0].formatted}.`)
            popup4.addTo(map);
            break
              }
        };

        /*
        if(i=0){
        popup3.setLngLat([wayLong, wayLat])
        //console.log(resArr[i])
        popup3.setHTML(`<h6>Waypoint Location:</h6>\n ${data.results[0].formatted}.`)
        popup3.addTo(map)
        break
        }/*
       if(i=2){
        popup4.setLngLat([wayLong, wayLat])
        popup4.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup4.addTo(map)
        break
       }
       if(i=4){
        popup5.setLngLat([wayLong, wayLat])
        popup5.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup5.addTo(map)
       }
       if(i=6){
        popup6.setLngLat([waypoint[i],waypoint[i+1]])
        popup6.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup6.addTo(map)
       }
       if(i=8){
        popup7.setLngLat([waypoint[i],waypoint[i+1]])
        popup7.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup7.addTo(map)
       }
       if(i=10){
        popup8.setLngLat([waypoint[i],waypoint[i+1]])
        popup8.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup8.addTo(map)
       }
       if(i=12){
        popup9.setLngLat([waypoint[i],waypoint[i+1]])
        popup9.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup9.addTo(map)
       }
       if(i=14){
        popup10.setLngLat([waypoint[i],waypoint[i+1]])
        popup10.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup10.addTo(map)
       }
       if(i=16){
        popup11.setLngLat([waypoint[i],waypoint[i+1]])
        popup11.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup11.addTo(map)
       }
       if(i=18){
        popup12.setLngLat([waypoint[i],waypoint[i+1]])
        popup12.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup12.addTo(map)
       }
       if(i=20){
        popup13.setLngLat([waypoint[i],waypoint[i+1]])
        popup13.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup13.addTo(map)
       }
       if(i=22){
        popup14.setLngLat([waypoint[i],waypoint[i+1]])
        popup14.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup14.addTo(map)
       }
       if(i=24){
        popup15.setLngLat([waypoint[i],waypoint[i+1]])
        popup15.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup15.addTo(map)
       }
       if(i=26){
        popup16.setLngLat([waypoint[i],waypoint[i+1]])
        popup16.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup16.addTo(map)
       }
       if(i=28){
        popup17.setLngLat([waypoint[i],waypoint[i+1]])
        popup17.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup17.addTo(map)
       }
       if(i=30){
        popup18.setLngLat([waypoint[i],waypoint[i+1]])
        popup18.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup18.addTo(map)
       }
       if(i=32){
        popup19.setLngLat([waypoint[i],waypoint[i+1]])
        popup19.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup19.addTo(map)
       }if(i=34){
        popup20.setLngLat([waypoint[i],waypoint[i+1]])
        popup20.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup20.addTo(map)
       }if(i=36){
        popup21.setLngLat([waypoint[i],waypoint[i+1]])
        popup21.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup21.addTo(map)
       }
       if(i=38){
        popup22.setLngLat([waypoint[i],waypoint[i+1]])
        popup22.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup22.addTo(map)
       }
       if(i=40){
        popup23.setLngLat([waypoint[i],waypoint[i+1]])
        popup23.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup23.addTo(map)
       }
       if(i=42){
        popup24.setLngLat([waypoint[i],waypoint[i+1]])
        popup24.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup24.addTo(map)
       }
       if(i=44){
        popup25.setLngLat([waypoint[i],waypoint[i+1]])
        popup25.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup25.addTo(map)
       }
       if(i=46){
        popup26.setLngLat([waypoint[i],waypoint[i+1]])
        popup26.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup26.addTo(map)
       }
       if(i=48){
        popup27.setLngLat([waypoint[i],waypoint[i+1]])
        popup27.setHTML(`<h6>Waypoint Location:</h6>\n ${resArr[i]}.`)
        popup27.addTo(map)
       }*/



        
        
        

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

/*
console.log(start)
console.log(end)
console.log(waypoint)
*/


/*


var start = [144.9648731,-37.8182711];

*/




function clEnd() 
{

};
function clWay() 
{

};
function pinStart() 
{

};
function pinEnd() 
{

};
function pinWay() 
{

};









