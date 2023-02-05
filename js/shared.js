"use strict"

/*
File name: shared.js

Purpose: This file is designed to enable live 
functionality of multiple html pages.

Authors: Hayden Korn 31448488 , Sam Rath 32519621, Praveen Ravichandran 32470614, Khanh Nguyen 32498349. 

Last Modified: 21 May 2021
*/





//Keys for Local Storage
const TRIP_DETAILS_INDEX_KEY = "tripDetailsKey";
const BOOKING_SESSION_KEY = "bookingSessionKey";

/*
Class name: tripDetails

attribute(s): initialLocation,finalLocation,stops,distance,pricebookedTime,bookedDate,taxiType,rego

Output(s): instance of this class

Purpose: This class is designed to create multiple instances of this class


*/
class tripDetails
{
	constructor( initialLocation = "", finalLocation = "", stops = "", distance = "", price = "", bookedTime = "", bookedDate = "",taxiType = "", rego = "", start = [], end = [], way = [])
	{
		this._initialLocation = initialLocation;
		this._finalLocation = finalLocation;
		this._stops = stops;
		this._distance = distance;
		this._price = price;
		this._bookedTime = bookedTime;
		this._bookedDate = bookedDate;
		this._taxiType = taxiType;
		this._rego = rego;
		this._start = start;
		this._end = end;
		this._way = way;	
	}
// Get:
	get initialLocation()
	{
		return  this._initialLocation;
	}

	get finalLocation()
	{
		return this._finalLocation;
	}

	get stops()
	{
		return this._stops;
	}

	get distance()
	{
		return this._distance;
	}

	get price()
	{
		return this._price;
	}

	get bookedTime()
	{
		return this._bookedTime;
	}

	get bookedDate()
	{
		return this._bookedDate;
	}
	get taxiType()
	{
		return this._taxiType;
	}
	get rego()
	{
		return this._rego;
	}
	get start()
	{
		return this._start;
	}
	get end()
	{
		return this._end;
	}
	get way()
	{
		return this._way;
	}
//Set:
	set initialLocation(newInitialLocation)
	{
		this._initialLocation = newInitialLocation;
	}

	set finalLocation(newFinalLocation)
	{
		this._finalLocation = newFinalLocation;
	}

	set stops(newStops)
	{
		this._stops = newStops;
	}

	set distance(newDistance)
	{
		this._distance = newDistance;
	}

	set price(newPrice)
	{
		this._price = newPrice;
	}
	
	set taxiType(newTaxiType)
	{
		this._taxiType = newTaxiType
	}
	set start(newStart)
	{
		this._start = newStart
	}
	set end(newEnd)
	{
		this._end = newEnd
	}
	set way(newWay)
	{
		this._way = newWay
	}
	fromData(tripDetailsDataObject)
	{
		this._initialLocation = tripDetailsDataObject._initialLocation
		this._finalLocation = tripDetailsDataObject._finalLocation
		this._bookedDate = tripDetailsDataObject._bookedDate
		this._bookedTime = tripDetailsDataObject._bookedTime
		this._distance = tripDetailsDataObject._distance
		this._stops = tripDetailsDataObject._stops
		this._price = tripDetailsDataObject._price
		this._taxiType = tripDetailsDataObject._taxiType
		this._rego = tripDetailsDataObject._rego
		this._start= tripDetailsDataObject._start
		this._end= tripDetailsDataObject._end
		this._way = tripDetailsDataObject._way
	}
}
/*
Class name: bookingSession

attribute(s): no attributes

Output(s): instance of this class

Purpose: This class is designed to store the instances of the tripDetails class


*/
class bookingSession
{
	constructor(){
		this._bookingSession = []
	}
	get bookingSession(){
		return this._bookingSession
	}
	addtripDetails(newInitialLocation, newFinalLocation, newStops, newDistance, newPrice, newBookedTime, newBookedDate,newTaxiType,newRego,newStart,newEnd,newWay)
	{
		let xxx = new tripDetails(newInitialLocation, newFinalLocation, newStops, newDistance, newPrice, newBookedTime, newBookedDate,newTaxiType,newRego,newStart,newEnd,newWay);
		this._bookingSession.push(xxx)
	}
	removeTripDetails(TRIP_DETAILS_INDEX_KEY)
	{
		this._bookingSession.splice(TRIP_DETAILS_INDEX_KEY)
	}
	getTripDetails(TRIP_DETAILS_INDEX_KEY)
	{
		return this._bookingSession[TRIP_DETAILS_INDEX_KEY]
	}
	fromData(bookingSessionDataObject)
	{
		this._bookingSession = [];
		let data = bookingSessionDataObject._bookingSession
		for(let i=0; i<data.length; i++)
		{
			let trip = new tripDetails()
			trip.fromData(data[i])
			this._bookingSession[i] = trip
		}
	}

}
/*
Function name: checkDataInLocalStorage

Input(s): key

Output(s): boolean value

Purpose: This function is designed to check if there is data in the local storage using
a key and it will return true or false depending on of there is data in it
*/
function checkDataInLocalStorage(key)
{
	if(localStorage.getItem(key) !== null)
	{
		return true;
	}
	else if(localStorage.getItem(key) === null || localStorage.getItem(key) == undefined)
	{
		return false;
	}
}
/*
Function name: updateLocalStorage

Input(s): key and data

Output(s): no output

Purpose: This function is designed to change the data that needs to be inputted 
into a permissible form so that it can be stored properly in the local storage
*/
function updateLocalStorage(key,data)
{
	let jsonString = JSON.stringify(data);
	localStorage.setItem(key,jsonString);
}
/*
Function name: retrieveDataFromLocalStorage

Input(s): key

Output(s): data from local storage

Purpose: This function is designed to retreive the data for a key in the local
storage in an accessible form
*/
function retrieveDataFromLocalStorage(key)
{
	let data = JSON.parse(localStorage.getItem(key));
	return data
}

/*
Function name: toViewAllBooking(),toDetailedBooking(), toHomePage(), toHomePage1()

Input(s): none

Output(s): confirm message

Purpose: Ensure users are happy to redirected to the respective page and takes them to the
respective page

*/
function toViewAllBooking()
{
	if(confirm("Return to View All Booking Page?")==true)
	{
		window.location = "ViewAllBooking.html";
	}
	else
	{
		return;
	}
}

/*
Function name: retrieve

Input(s): KEY

Output(s): data

Purpose: This function is designed to retrieve data and parse 
it from local storage.


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

function toHomePage()
{
	if(confirm("Return to Home Page to edit booking?")==true)
	{
		window.location = "main.html";
	}
	else
	{
		return;
	}
}

function toHomePage1()
{
	if(confirm("Are you sure you want to CLEAR INPUTS?")==true)
	{
		window.location = "main.html";
	}
	else
	{
		return;
	}
}

let theBookingClass = new bookingSession()

if(checkDataInLocalStorage(BOOKING_SESSION_KEY) === true)
{
	let data = retrieveDataFromLocalStorage(BOOKING_SESSION_KEY)
	theBookingClass.fromData(data)
}
else if(checkDataInLocalStorage(BOOKING_SESSION_KEY) === false)
{
	updateLocalStorage(BOOKING_SESSION_KEY,theBookingClass)
}



