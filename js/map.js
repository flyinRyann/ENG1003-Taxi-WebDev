
"use strict" 
/*
File name: map.js

Purpose: This file is designed to enable live 
functionality of the map on multiple html page.

Authors: Hayden Korn 31448488 , Sam Rath 32519621, Praveen Ravichandran 32470614, Khanh Nguyen 32498349. 

Last Modified: 21 May 2021
*/

const START_KEY = "startKey";
const WAY_KEY = "wayKey";
const END_KEY = "endKey";





var apikey = 'f397622201474be49b7305d05216285e';


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


let popup1 = new mapboxgl.Popup({ closeOnClick: false })
let popup2 = new mapboxgl.Popup({ closeOnClick: false })
let popup3 = new mapboxgl.Popup({ closeOnClick: false })
let popup4 = new mapboxgl.Popup({ closeOnClick: false })






let clLat ;
let clLong;

 





/*
Function name: StartLocation

Input(s): 

Output(s): 

Purpose: This function is designed to update 
the map accordingly with the user's input.


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

      updateLocalStorage("startKey",start);

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
  

/*
Function name: clStart

Input(s): start

Output(s): 

Purpose: This function is designed to update 
the map accordingly with the user's input.


*/
function clStart(start) 
{
    
    

      let api_url = 'https://api.opencagedata.com/geocode/v1/json?'
      let request_url = api_url
      + 'q=' + encodeURIComponent(clLat+ ',' + clLong)
      + '&key=' + apikey
      + '&pretty=1';
   


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




/*
Function name: StopLocation

Input(s): 

Output(s): 

Purpose: This function is designed to update 
the map accordingly with the user's input.


*/

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

      updateLocalStorage("endKey",end);

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
















/*
Function name: getRoute

Input(s): end

Output(s): 

Purpose: This function is designed to update 
the map accordingly with the user's input.


*/
function getRoute(end) {
 
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
/*
Function name: setStart

Input(s): start

Output(s): 

Purpose: This function is designed to update 
the map accordingly with the user's input.


*/
 function setStart(start) {
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
};

/*
Function name: setEnd

Input(s): end

Output(s): 

Purpose: This function is designed to update 
the map accordingly with the user's input.


*/function setEnd(end) { 
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
};

/*
Function name: routeWaypoint

Input(s): waypoint

Output(s): 

Purpose: This function is designed to update 
the map accordingly with the user's input.


*/
function routeWaypoint(waypoint){
    console.log(`waypoint length =${waypoint.length}\n (waypoint length[0]) =${waypoint[0]}(waypoint length[1]) =${waypoint[1]}`)


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
    
    
};

/*
Function name: setWaypoint

Input(s): point

Output(s): 

Purpose: This function is designed to update 
the map accordingly with the user's input.


*/
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

/*
Function name: AddWaypoint

Input(s): 

Output(s): 

Purpose: This function is designed to update 
the map accordingly with the user's input.


*/
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

        updateLocalStorage("wayKey",waypoint);

        setWaypoint(waypoint)
       
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




//Functions to be completed in the future
// they will allow greater functionality for the user's selected locations
/*
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
*/








