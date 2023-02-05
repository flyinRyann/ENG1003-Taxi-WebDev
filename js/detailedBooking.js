"use strict"

/*
File name: detailedBooking.js

Purpose: This file is designed to enable live 
functionality of the detailedBooking.html page.

Authors: Hayden Korn 31448488 , Sam Rath 32519621, Praveen Ravichandran 32470614, Khanh Nguyen 32498349. 

Last Modified: 21 May 2021
*/

var apikey = 'f397622201474be49b7305d05216285e';
mapboxgl.accessToken = 'pk.eyJ1IjoiZG9zc3k0NCIsImEiOiJja29qeTB1MWgwNncxMm5rempsdzBjNndtIn0.CnIR5-To0KHr0eAr7v21IA';





/*

     let booking1 = retrieve("bookingSessionKey");
     let start1 = booking1._start;
     let end1 = booking1._end;
     let way1 = booking1._way;
*/

function retrieve(KEY)
{
    let data = localStorage.getItem(KEY);

    try {
        data = JSON.parse(data);
    }
    catch (errors) {
        console.log("error")
    }
    finally {

        return data;
    }

};

      let start1 = retrieve("startKey")
      let end1 = retrieve("endKey")
      let way1 = retrieve("wayKey")
     




/*
Function name: rememberStart

Input(s): startLoc

Output(s): 

Purpose: This function is designed to retrieve a location and update 
the map accordingly.


*/
     
function rememberStart(startLoc){

    let api_url = 'https://api.opencagedata.com/geocode/v1/json?'
    let request_url = api_url
    + 'q=' + encodeURIComponent(startLoc[1]+ ',' + startLoc[0])
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
      map.jumpTo({center:[startLong,startLat]});
      start = [startLong,startLat]
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


  
};




/*
Function name: rememberStop

Input(s): stopLoc

Output(s): 

Purpose: This function is designed to retrieve a location and update 
the map accordingly.


*/
function rememberStop(stopLoc) {
  
    let api_url = 'https://api.opencagedata.com/geocode/v1/json?'
    let request_url = api_url
    + 'q=' + encodeURIComponent(stopLoc[1]+ ',' + stopLoc[0])
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
        alert(`Your End Location: ${data.results[0].formatted}`); // print the location
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
  



  //let j=0; 
  //let wayLongArr =[];
  //let wayLatArr =[];
  // possible for loop wayLoc[i] for length way1...




  /*
Function name: rememberWay

Input(s): wayLoc

Output(s): 

Purpose: This function is designed to retrieve a location and update 
the map accordingly.


*/
  function rememberWay(wayLoc) {
  
    
    let api_url = 'https://api.opencagedata.com/geocode/v1/json?'
    let request_url = api_url
    + 'q=' + encodeURIComponent(wayLoc[1]+ ',' + wayLoc[0])
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
          setWaypoint(waypoint)
          //resArr.push(data.results[0].formatted.toString())
          //resArr.push("empty index")
          /*popup3.setLngLat([wayLong, wayLat])
          //console.log(resArr[i])
          popup3.setHTML(`<h6>Waypoint Location:</h6>\n ${data.results[0].formatted}.`)
          popup3.addTo(map)*/
          popup3.setLngLat([wayLong, wayLat])
          popup3.setHTML(`<h6>Waypoint Location:</h6>\n ${data.results[0].formatted}.`)
          popup3.addTo(map);
          //console.log(`resArr=${resArr}`)
          /*for( j;j<2; j++){
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
          };*/
  
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



rememberStart(start1)
rememberStop(end1)
rememberWay(way1)




/*Function name: clearAllBookings

Input(s): key and index

Output(s): no output

Purpose: This function is designed to remove a booking 
*/
function clearAllBookings(key,index)
{
    localStorage.removeItem(key,bookingSession[index])
}





