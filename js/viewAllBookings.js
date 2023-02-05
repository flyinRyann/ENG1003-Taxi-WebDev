"use strict"


/*
File name: viewAllBookings.js

Purpose: This file is designed to enable live 
functionality of the viewAllBookings.html page.

Authors: Hayden Korn 31448488 , Sam Rath 32519621, Praveen Ravichandran 32470614, Khanh Nguyen 32498349. 

Last Modified: 21 May 2021
*/



/*
Function name: retrieveData()

Input(s): KEY

Output(s): Items from localStorage.

Purpose: This function is designed to retrive data from
local storage.
*/ 
function retrieveData(KEY) {
    let data = localStorage.getItem(KEY);
    try 
    {
        data = JSON.parse(data);
    }
    catch (errors) 
    {
        console.log("error");
    }
    finally 
    {
        return data;
    }
};

/*
Function name: buttonForView()

Input(s): bookingStatus

Output(s): none

Purpose: This function is designed to assign the elements in 
the past and present booking array into the HTML file and 
push it on the HTML page itself.


*/
function buttonForView(bookingStatus)
{
    //Define the elements on the HTML page.
    let bookingName1Ref = document.getElementById("booking_name_1");
    let totalNumberOfStops1Ref = document.getElementById("total_number_of_stops_1");
    let pickUpDestination1Ref = document.getElementById("pick_up_destination_1");
    let dropOffDestination1Ref = document.getElementById("drop_off_destination_1");

    let bookingName2Ref = document.getElementById("booking_name_2");
    let totalNumberOfStops2Ref = document.getElementById("total_number_of_stops_2");
    let pickUpDestination2Ref = document.getElementById("pick_up_destination_2");
    let dropOffDestination2Ref = document.getElementById("drop_off_destination_2");

    let bookingName3Ref = document.getElementById("booking_name_3");
    let totalNumberOfStops3Ref = document.getElementById("total_number_of_stops_3");
    let pickUpDestination3Ref = document.getElementById("pick_up_destination_3");
    let dropOffDestination3Ref = document.getElementById("drop_off_destination_3");

    let bookingName4Ref = document.getElementById("booking_name_4");
    let totalNumberOfStops4Ref = document.getElementById("total_number_of_stops_4");
    let pickUpDestination4Ref = document.getElementById("pick_up_destination_4");
    let dropOffDestination4Ref = document.getElementById("drop_off_destination_4");

    let bookingName5Ref = document.getElementById("booking_name_5");
    let totalNumberOfStops5Ref = document.getElementById("total_number_of_stops_5");
    let pickUpDestination5Ref = document.getElementById("pick_up_destination_5");
    let dropOffDestination5Ref = document.getElementById("drop_off_destination_5");

    let backButtonForViewRef = document.getElementById("backButtonForView");
    let nextButtonForViewRef = document.getElementById("nextButtonForView");
    
    pickUpDestination1Ref.innerHTML += bookingStatus[0]._initialLocation
    let currentIndex = 0

    for(let i=currentIndex; i<currentIndex+5; i++)
    {
        if(i==currentIndex)
        {
            //bookingName1Ref.innerHTML += bookingStatus[i]._rego
            //totalNumberOfStops1Ref.innerHTML += bookingStatus[i]._stops
            pickUpDestination1Ref.innerHTML += bookingStatus[i]._initialLocation
            dropOffDestination1Ref.innerHTML += bookingStatus[i]._finalLocation
        }
        
        else if(i==currentIndex+1)
        {
            //bookingName2Ref.innerHTML += bookingStatus[i]._rego
            //totalNumberOfStops2Ref.innerHTML += bookingStatus[i]._stops
            pickUpDestination2Ref.innerHTML += bookingStatus[i]._initialLocation
            dropOffDestination2Ref.innerHTML += bookingStatus[i]._finalLocation
        }
        
        else if(i==currentIndex+2)
        {
            //bookingName3Ref.innerHTML += bookingStatus[i]._rego
            //totalNumberOfStops3Ref.innerHTML += bookingStatus[i]._stops
            pickUpDestination3Ref.innerHTML += bookingStatus[i]._initialLocation
            dropOffDestination3Ref.innerHTML += bookingStatus[i]._finalLocation
        }

        else if(i==currentIndex+3)
        {
            //bookingName2Ref.innerHTML += bookingStatus[i]._rego
            //totalNumberOfStops2Ref.innerHTML += bookingStatus[i]._stops
            pickUpDestination4Ref.innerHTML += bookingStatus[i]._initialLocation
            dropOffDestination4Ref.innerHTML += bookingStatus[i]._finalLocation
        }

        else if(i==currentIndex+4)
        {
            //bookingName2Ref.innerHTML += bookingStatus[i]._rego
            //totalNumberOfStops2Ref.innerHTML += bookingStatus[i]._stops
            pickUpDestination5Ref.innerHTML += bookingStatus[i]._initialLocation
            dropOffDestination5Ref.innerHTML += bookingStatus[i]._finalLocation
        }
    }
    
    
    if(backButtonForViewRef.click == true)
    {
        currentIndex = 0 
        for(i=currentIndex; i>currentIndex-5; i--) // currentIndex = 5
        {
            if(i==currentIndex-1)
            {
                //bookingName5Ref.innerHTML += bookingStatus[i]._rego
                //totalNumberOfStops5Ref.innerHTML += bookingStatus[i]._stops
                pickUpDestination5Ref.innerHTML += bookingStatus[i]._initialLocation
                dropOffDestination5Ref.innerHTML += bookingStatus[i]._finalLocation

            }
            
            else if(i==curentIndex-2)
            {
                //bookingName4Ref.innerHTML += bookingStatus[i]._rego
                //totalNumberOfStops4Ref.innerHTML += bookingStatus[i]._stops
                pickUpDestination4Ref.innerHTML += bookingStatus[i]._initialLocation
                dropOffDestination4Ref.innerHTML += bookingStatus[i]._finalLocation
            }

            else if(i==currentIndex-3)
            {
                //bookingName3Ref.innerHTML += bookingStatus[i]._rego
                //totalNumberOfStops3Ref.innerHTML += bookingStatus[i]._stops
                pickUpDestination3Ref.innerHTML += bookingStatus[i]._initialLocation
                dropOffDestination3Ref.innerHTML += bookingStatus[i]._finalLocation
            }

            else if(i==currentIndex-4)
            {
                //bookingName2Ref.innerHTML += bookingStatus[i]._rego
                //totalNumberOfStops2Ref.innerHTML += bookingStatus[i]._stops
                pickUpDestination2Ref.innerHTML += bookingStatus[i]._initialLocation
                dropOffDestination2Ref.innerHTML += bookingStatus[i]._finalLocation
            }

            else if(i==currentIndex-5)
            {
                //bookingName1Ref.innerHTML += bookingStatus[i]._rego
                //totalNumberOfStops1Ref.innerHTML += bookingStatus[i]._stops
                pickUpDestination1Ref.innerHTML += bookingStatus[i]._initialLocation
                dropOffDestination1Ref.innerHTML += bookingStatus[i]._finalLocation
            }
        }
    }
    
    if(nextButtonForViewRef.onclick == true)
    {
        for(i=currentIndex; i<currentIndex+5; i++)
        {
            if(i==currentIndex)
            {
                //bookingName1Ref.innerHTML += bookingStatus[i]._rego
                //totalNumberOfStops1Ref.innerHTML += bookingStatus[i]._stops
                pickUpDestination1Ref.innerHTML += bookingStatus[i]._initialLocation
                dropOffDestination1Ref.innerHTML += bookingStatus[i]._finalLocation
            }
            
            else if(i==currentIndex+1)
            {
                //bookingName2Ref.innerHTML += bookingStatus[i]._rego
                //totalNumberOfStops2Ref.innerHTML += bookingStatus[i]._stops
                pickUpDestination2Ref.innerHTML += bookingStatus[i]._initialLocation
                dropOffDestination2Ref.innerHTML += bookingStatus[i]._finalLocation
            }
            
            else if(i==currentIndex+2)
            {
                //bookingName3Ref.innerHTML += bookingStatus[i]._rego
                //totalNumberOfStops3Ref.innerHTML += bookingStatus[i]._stops
                pickUpDestination3Ref.innerHTML += bookingStatus[i]._initialLocation
                dropOffDestination3Ref.innerHTML += bookingStatus[i]._finalLocation
            }

            else if(i==currentIndex+3)
            {
                //bookingName2Ref.innerHTML += bookingStatus[i]._rego
                //totalNumberOfStops2Ref.innerHTML += bookingStatus[i]._stops
                pickUpDestination2Ref.innerHTML += bookingStatus[i]._initialLocation
                dropOffDestination2Ref.innerHTML += bookingStatus[i]._finalLocation
            }

            else if(i==currentIndex+4)
            {
                //bookingName2Ref.innerHTML += bookingStatus[i]._rego
                //totalNumberOfStops2Ref.innerHTML += bookingStatus[i]._stops
                pickUpDestination2Ref.innerHTML += bookingStatus[i]._initialLocation
                dropOffDestination2Ref.innerHTML += bookingStatus[i]._finalLocation
            }
            else if(i==currentIndex+5)
            {
                //bookingName1Ref.innerHTML += bookingStatus[i]._rego
                //totalNumberOfStops1Ref.innerHTML += bookingStatus[i]._stops
                pickUpDestination1Ref.innerHTML += bookingStatus[i]._initialLocation
                dropOffDestination1Ref.innerHTML += bookingStatus[i]._finalLocation
            }
        }
    }
};

/*
Function name: insertViewAllBookings()

Input(s): none

Output(s): Present Booking List and Past Booking List

Purpose: This function is designed to sort the data retrieved from local
storage and sort it into the correct past booking or present booking array,
by examining their date and time value.
*/

function insertViewAllBookings()
{
    // Retrive booking data from localStorage.
    let bookingData = retrieveData("bookingSessionKey");

    //let pickUpDestination2Ref = document.getElementById("pick_up_destination_2");
    //console.log(bookingData._bookingSession[0])
    //let pickUpDestination2 = pickUpDestination2Ref.value
    //pickUpDestination2Ref.innerHTML += bookingData[0]._initialLocation
    

    // Present time for comparison.
    let time = new Date();
    let timeNow = time.toLocaleTimeString();
    

    // Present date for comparison.
    let date = new Date();
    let dateNow = date.toLocaleDateString("sv-SE");
    console.log(dateNow)

    let pastBooking = [];
    let presentBooking = [];

    // Seperating present booking from past booking.
    for(let i=0; i<bookingData._bookingSession.length; i++)
    {
        if(bookingData._bookingSession[i]._bookedDate < dateNow)
        {
            pastBooking.push(bookingData._bookingSession[i]);
        }
        else if(bookingData._bookingSession[i]._bookedDate = dateNow) //bookingData._bookingSession[i]._bookedTime <= timeNow
        {
            if(bookingData._bookingSession[i]._bookedTime < timeNow)
            {
                pastBooking.push(bookingData._bookingSession[i]);
            }
            else
            {
                presentBooking.push(bookingData._bookingSession[i]);
            }
        
        }

        else if(bookingData._bookingSession[i]._bookedDate > dateNow)
        {
            presentBooking.push(bookingData._bookingSession[i]);
        }
    }
    console.log(pastBooking)
    let historyBookingsRef = document.getElementById("sample3")

    if(historyBookingsRef.value == "scheduled")
    {
        buttonForView(pastBooking)
    }
    else if(historyBookingsRef.value == "commenced")
    { 
        buttonForView(presentBooking)
    }
}


/*
Function name: insertViewAllBookings()

Input(s): displayed info

*/

function displayJourneyDescriptionforViewAllBooking()
{   
    let bookingData1  = retrieveData("bookingSessionKey")
    if( document.getElementById("inputBookingIndex").value == "0")
    {
        document.getElementById("data1").innerHTML += bookingData1._bookingSession[0]._bookedDate;
        document.getElementById("time1").innerHTML += bookingData1._bookingSession[0]._bookedTime;
        document.getElementById("startingPoint1").innerHTML += bookingData1._bookingSession[0]._initialLocation;
        document.getElementById("destinationStop1").innerHTML += bookingData1._bookingSession[0]._finalLocation;
        document.getElementById("taxiType1").innerHTML += bookingData1._bookingSession[0]._taxiType;
        document.getElementById("distance1").innerHTML += bookingData1._bookingSession[0]._distance;
        document.getElementById("fare1").innerHTML += bookingData1._bookingSession[0]._price;
    }
    if( document.getElementById("inputBookingIndex").value == "1")
    {
        document.getElementById("data1").innerHTML += bookingData1._bookingSession[1]._bookedDate;
        document.getElementById("time1").innerHTML += bookingData1._bookingSession[1]._bookedTime;
        document.getElementById("startingPoint1").innerHTML += bookingData1._bookingSession[1]._initialLocation;
        document.getElementById("destinationStop1").innerHTML += bookingData1._bookingSession[1]._finalLocation;
        document.getElementById("taxiType1").innerHTML += bookingData1._bookingSession[1]._taxiType;
        document.getElementById("distance1").innerHTML += bookingData1._bookingSession[1]._distance;
        document.getElementById("fare1").innerHTML += bookingData1._bookingSession[1]._price;
    }
    if( document.getElementById("inputBookingIndex").value == "2")
    {
        document.getElementById("data1").innerHTML += bookingData1._bookingSession[2]._bookedDate;
        document.getElementById("time1").innerHTML += bookingData1._bookingSession[2]._bookedTime;
        document.getElementById("startingPoint1").innerHTML += bookingData1._bookingSession[2]._initialLocation;
        document.getElementById("destinationStop1").innerHTML += bookingData1._bookingSession[2]._finalLocation;
        document.getElementById("taxiType1").innerHTML += bookingData1._bookingSession[2]._taxiType;
        document.getElementById("distance1").innerHTML += bookingData1._bookingSession[2]._distance;
        document.getElementById("fare1").innerHTML += bookingData1._bookingSession[2]._price;
    }
    if( document.getElementById("inputBookingIndex").value == "3")
    {
        document.getElementById("data1").innerHTML += bookingData1._bookingSession[3]._bookedDate;
        document.getElementById("time1").innerHTML += bookingData1._bookingSession[3]._bookedTime;
        document.getElementById("startingPoint1").innerHTML += bookingData1._bookingSession[3]._initialLocation;
        document.getElementById("destinationStop1").innerHTML += bookingData1._bookingSession[3]._finalLocation;
        document.getElementById("taxiType1").innerHTML += bookingData1._bookingSession[3]._taxiType;
        document.getElementById("distance1").innerHTML += bookingData1._bookingSession[3]._distance;
        document.getElementById("fare1").innerHTML += bookingData1._bookingSession[3]._price;
    }
    if( document.getElementById("inputBookingIndex").value == "4")
    {
        document.getElementById("data1").innerHTML += bookingData1._bookingSession[4]._bookedDate;
        document.getElementById("time1").innerHTML += bookingData1._bookingSession[4]._bookedTime;
        document.getElementById("startingPoint1").innerHTML += bookingData1._bookingSession[4]._initialLocation;
        document.getElementById("destinationStop1").innerHTML += bookingData1._bookingSession[4]._finalLocation;
        document.getElementById("taxiType1").innerHTML += bookingData1._bookingSession[4]._taxiType;
        document.getElementById("distance1").innerHTML += bookingData1._bookingSession[4]._distance;
        document.getElementById("fare1").innerHTML += bookingData1._bookingSession[4]._price;
    }
}


window.onload = function()
{
    insertViewAllBookings()
}

/*
Pseudocode:
1. Access local storage.
2. Turn this data into an array.
3. Sort the array into two seperate array.
    3.1. One for past booking.
    3.2. One for present/future booking.
4. If user select to see present booking (check button id).
    4.1. Take 3-4 items from the array and append it into the proper box on html.
5. If user select to see past booking (check button id).
    5.1. Take 3-4 items from the array and appendit to the proper box on html.
6. If user clicks next.
    6.1 Append the next three items into the boxes.
7. If user clicks back.
    7.1 Append the previous three items into the boxes.
*/
let bookingIndex = index

function toDetailedBooking(index)
{
    window.location = "detailedBooking.html"
    
}