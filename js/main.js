"use strict"

/*
File name: main.js

Purpose: This file is designed to enable live 
functionality of the main.html page.

Authors: Hayden Korn 31448488 , Sam Rath 32519621, Praveen Ravichandran 32470614, Khanh Nguyen 32498349. 

Last Modified: 21 May 2021
*/



/*
Function name: calculateDistanceTravelled

Input(s): lat1,lon1,lat2,lon2

Output(s): distance

Purpose: This function is designed to calculate the distance 
between two points, using their coordinates and the haversine formula.


*/
function calculateDistanceTravelled(lat1,lon1,lat2,lon2)
{
  
  const R = 6371;
  const LAT_1_CONVERT = lat1 * Math.PI/180; 
  const LAT_2_CONVERT = lat2 * Math.PI/180;
  const DIFF_LAT = (lat2-lat1) * Math.PI/180;
  const DIFF_LON = (lon2-lon1) * Math.PI/180;
  const A = Math.sin(DIFF_LAT/2) * Math.sin(DIFF_LAT/2) + Math.cos(LAT_1_CONVERT) * Math.cos(LAT_2_CONVERT) * Math.sin(DIFF_LON/2) * Math.sin(DIFF_LON/2);
  const C = 2 * A * Math.tan(Math.sqrt(A),Math.sqrt(1-A));
  let distance = R * C;
  return distance
}


function retrieve1(KEY)
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



/*
Function name: calculateFare

Input(s): Taxi Type, Distance Travelled and Time of Travel

Output(s): distance

Purpose: This function calculates the estimated price based off the the type of vehicle the 
the distance between start and end points and when they are travelling in case of surcharge

*/
function calculateFare(typeOfTaxi,distanceTravelled,timeOfTravel)
{
  const FLAG_RATE = 4.20;
  const CPV_LEVY = 1.10;
  const SUV_LEVY = 3.50;
  const VAN_LEVY = 6.00;
  const MINIBUS_LEVY = 10.00;
  let NIGHT_LEVY = 1.2;
  let price = 0;  
  if(typeOfTaxi == "Sedan")
  {
    if(timeOfTravel >= "17:00" || timeOfTravel <= "09:00")
    {
      price = NIGHT_LEVY * (FLAG_RATE + CPV_LEVY + 1.622 * distanceTravelled);
    }
    else
    {
      price = FLAG_RATE + CPV_LEVY + 1.622 * distanceTravelled;
    }
  }

  else if(typeOfTaxi == "SUV")
  {
    if(timeOfTravel >= "17:00" || timeOfTravel <= "09:00")
    {
      price = NIGHT_LEVY * (SUV_LEVY + FLAG_RATE + CPV_LEVY + 1.622 * distanceTravelled);
    }
    else
    {
      price = SUV_LEVY + FLAG_RATE + CPV_LEVY + 1.622 * distanceTravelled;
    }
  }

  else if(typeOfTaxi == "Van")
  {
    if(timeOfTravel >= "17:00" || timeOfTravel <= "09:00")
    {
      price = NIGHT_LEVY * (VAN_LEVY + FLAG_RATE + CPV_LEVY + 1.622 * distanceTravelled);
    }
    else
    {
      price = VAN_LEVY + FLAG_RATE + CPV_LEVY + 1.622 * distanceTravelled;
    }
  }

  else if(typeOfTaxi == "Minibus")
  {
    if(timeOfTravel >= "17:00" || timeOfTravel <= "09:00")
    {
      price = NIGHT_LEVY * (MINIBUS_LEVY + FLAG_RATE + CPV_LEVY + 1.622 * distanceTravelled);
    }
    else
    {
      price = MINIBUS_LEVY + FLAG_RATE + CPV_LEVY + 1.622 * distanceTravelled;
    }
  }
  return price;
}
const TAXI_LIST_KEY = "taxiListKey"

let taxiList = [];

let taxiList1 = [
	{"rego":"VOV-887","type":"Sedan","available":true},
	{"rego":"OZS-293","type":"Van","available":false},
	{"rego":"WRE-188","type":"SUV","available":true},
	{"rego":"FWZ-490","type":"Sedan","available":true},
	{"rego":"NYE-874","type":"SUV","available":true},
	{"rego":"TES-277","type":"Sedan","available":false},
	{"rego":"GSP-874","type":"SUV","available":false},
	{"rego":"UAH-328","type":"Minibus","available":true},
	{"rego":"RJQ-001","type":"SUV","available":false},
	{"rego":"AGD-793","type":"Minibus","available":false}
];

if(localStorage.getItem("taxiListKey") == null)
{
  taxiList = taxiList1
  updateLocalStorage(TAXI_LIST_KEY,taxiList1)
}
else
{
  taxiList = retrieveDataFromLocalStorage(TAXI_LIST_KEY)

}



let wow = ""
/*
Function name: checkTaxiAvalibility

Input(s): taxiTyp

Output(s): The string for rego

Purpose: This function is designed to retrieve the input of the taxi type from the user
and return the rego of the taxi if it is availible
*/
function checkTaxiAvalibility(taxiType)
{
  
  for(let i = 0; i>=0 && i<taxiList.length;i++)
  {
    
    if(taxiType == taxiList[i].type)
    {
      if(taxiList[i].available == true)
      {
        taxiList[i].available = false
        updateLocalStorage(TAXI_LIST_KEY,taxiList)
        wow = taxiList[i].rego
        return taxiList[i].rego
      }
      else
      {
        wow = ""
        return "NO"
        
      }
    }
  }
}
let rego = ""
/*
Function name: addTrip

Input(s): no Input

Output(s): No output

Purpose: This function is designed to check the inputs from the user in the main.html page and if the inputs pass the validations
the trip will be booked
*/
function addTrip()
{
  if (confirm("Do you want to make this booking?")== true)
  {
    let startAddressInputRef = document.getElementById("startAddressInput")
    let stopAddressInputRef = document.getElementById("stopAddressInput")
    let timeRef = document.getElementById("time")
    let dateRef = document.getElementById("date")
    let taxiTypeRef = document.getElementById("inputTaxiType")
  
    let startAddress =  startAddressInputRef.value
    let stopAddress = stopAddressInputRef.value
    let time = timeRef.value
    let date = dateRef.value
    let taxiType = taxiTypeRef.value

    let start = retrieve("startKey")
    let end = retrieve("endKey")
    let way = retrieve("wayKey")

    if(time == "")
    {
      return alert("A TIME hasn't been selected, please choose a TIME")
    }
    else if(startAddress == "")
    {
      return alert("A START ADDRESS has not been entered, please enter a START ADDRESS")
    }
    else if(stopAddress == "")
    {
      return alert("A STOP ADDRESS has not been entered, please enter a STOP ADDRESS")
    }
    else if(date == "")
    {
      return alert("A DATE has not been selected, please select a DATE")
    }
    else if(taxiType == "empty")
    {
      return alert("A TAXI TYPE has not been selected, please select a TAXI TYPE")
    }
    else if(checkTaxiAvalibility(taxiType) == "NO")
    {
      return alert("THIS TAXI TYPE IS NOT AVAILIBLE, PLEASE CHOOSE ANOTHER TAXI TYPE")
    }
    else
    {

      rego = wow
    theBookingClass.addtripDetails(startAddress,stopAddress,"stops","distance","price",time,date,taxiType,rego,start,end,way)
    updateLocalStorage(BOOKING_SESSION_KEY,theBookingClass)
    alert("Booking has been made")
    window.location.assign("detailedBooking.html")
    }
  }
  else
  {
    return alert("This Booking HAS NOT been MADE")
  }
};


/*
Function name: UpdateJourneyDescription

Input(s): none

Output(s): same as purpose

Purpose: updates the journey description with the info
provided after the user has confirmed their start and stop address, filled out the
time, date, taxi type and clicks on the "update journey description"

*/
function UpdateJourneyDescription()
{
  let st=retrieve1("startKey");
  let en=retrieve1("endKey");

  let startAddressInputRef = document.getElementById("startAddressInput");
  let stopAddressInputRef = document.getElementById("stopAddressInput");
  let timeRef = document.getElementById("time");
  let dateRef = document.getElementById("date");
  let taxiTypeRef = document.getElementById("inputTaxiType");

  let startAddress =  startAddressInputRef.value;
  let stopAddress = stopAddressInputRef.value;
  let time = timeRef.value;
  let date = dateRef.value;
  let taxiType = taxiTypeRef.value;
  let distanceTravelled = Math.pow(10,7)*calculateDistanceTravelled(st[0],st[1],en[0],en[1]);
  let fare = calculateFare(taxiType,distanceTravelled,time);

  if(document.getElementById("date1").innerHTML!= "Date:")
  {
    document.getElementById("date1").innerHTML = "Date:";
  }
  if(document.getElementById("time1").innerHTML!= "Time")
  {
    document.getElementById("time1").innerHTML = "Time:";
  }
  if(document.getElementById("startingPoint").innerHTML!= "Start Location")
  {
    document.getElementById("startingPoint").innerHTML =  "Start Location:";
  }
  if(document.getElementById("destinationStop").innerHTML!= "Destination")
  {
    document.getElementById("destinationStop").innerHTML =  "Destination";
  }
  if(document.getElementById("taxiType").innerHTML!= "Taxi Type:")
  {
    document.getElementById("taxiType").innerHTML =  "Taxi Type:";
  }
  if(document.getElementById("distance").innerHTML!= "Distance:")
  {
    document.getElementById("distance").innerHTML =  "Distance:";
  }
  if(document.getElementById("fare").innerHTML!= "Fare:")
  {
    document.getElementById("fare").innerHTML =  "Fare:";
  }

  document.getElementById("date1").innerHTML += ("  "+date);
  document.getElementById("time1").innerHTML +=  ("  "+time);
  document.getElementById("startingPoint").innerHTML += ("  "+startAddress);
  document.getElementById("destinationStop").innerHTML += ("  "+ stopAddress);
  document.getElementById("taxiType").innerHTML += ("  "+taxiType);
  document.getElementById("distance").innerHTML += ("  "+distanceTravelled.toFixed(2)+"km");
  document.getElementById("fare").innerHTML += ("  $"+ fare.toFixed(2));
}
