var today= new Date();
var day = today.getDate();
var month= today.getMonth();
var counter=0;
var city="";

function onclick1() {
    
    var apiCall=""; var apiCall2="";
     city = document.getElementById('cityinput').value;
     apiCall = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=239583b59b5b6ec1233a6edbee0cb1e6';
     apiCall2= 'http://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=239583b59b5b6ec1233a6edbee0cb1e6';    

    if (counter%2==0) {
        apiCall+='&units=metric';
        apiCall2+='&units=metric';
    }

    else {
        apiCall+='&units=imperial';
        apiCall2+='&units=imperial';
    }



    runFunction(apiCall,apiCall2);

}

function changeTemp() {
    apiCall='http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=239583b59b5b6ec1233a6edbee0cb1e6';
    apiCall2= 'http://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=239583b59b5b6ec1233a6edbee0cb1e6';    

    if (counter%2==1) {
     apiCall+='&units=metric';
     apiCall2+='&units=metric';
     counter++;
    }
    else {
        apiCall+='&units=imperial';
        apiCall2+='&units=imperial';
        counter++;
    }
    
    runFunction(apiCall,apiCall2);

}



function changeSymbols() {
if (counter%2==0)
{   
    return "&#176C";
}

else
return "&#176F"
}


function changeWind() {
    if (counter%2==0)
    {   
        return "km/ph";
    }
    
    else
    return "m/ph"
    }


function runFunction(url,url2) {
    var xmlhttp= new XMLHttpRequest();
    var jsonResponse;
xmlhttp.onreadystatechange=function() 
{
    if (xmlhttp.readyState== 4 && xmlhttp.status== 200)
     {
        jsonResponse= xmlhttp.responseText;
        myFunction(jsonResponse);
    }
    
    
    
    }

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
   

        var xmlhttp1= new XMLHttpRequest();
        var jr;
        
        xmlhttp1.onreadystatechange=function() 
{if (xmlhttp1.readyState== 4 && xmlhttp1.status== 200)
     {jr= xmlhttp1.responseText;
        myFunction1(jr);}}

        xmlhttp1.open("GET", url2, true);
        xmlhttp1.send(null);


     }



 function setCurrentDate() {
document.getElementById("nextdaytext").innerHTML = convertDate((today.getDay()+1)%7) + " " + (today.getDate()+1);
document.getElementById("2daytext").innerHTML = convertDate((today.getDay()+2)%7) + " " + (today.getDate()+2);
document.getElementById("3daytext").innerHTML = convertDate((today.getDay()+3)%7) + " " + (today.getDate()+3);
document.getElementById("4daytext").innerHTML = convertDate((today.getDay()+4)%7) + " " + (today.getDate()+4);
document.getElementById("5daytext").innerHTML = convertDate((today.getDay()+5)%7) + " " + (today.getDate()+5);
 }


function convertDate(date) {
    if (date==0) 
    return "Sunday";
    else if (date==1)
    return "Monday";
    else if (date==2)
    return "Tuesday";
    else if (date==3)
    return "Wednesday";
    else if (date==4)
    return "Thursday";
    else if (date==5)
    return "Friday";
    else if (date==6)
    return "Saturday";
}



        function myFunction(response) {

        var arr= JSON.parse(response);
        var temp = parseInt(arr.main.temp); // INT
        var description =  arr.weather[0].description; //String
        var wind = parseInt(arr.wind.speed); // String   
        var pressure = parseInt(arr.main.pressure);
        var humidity = parseInt(arr.main.humidity);

        setBackground(arr.weather[0].main);
        setIcon(arr.weather[0].main,"mainpic");
        setCurrentDate();

  
        document.getElementById("maintemp").innerHTML = temp+ changeSymbols();
        document.getElementById("maincaption").innerHTML = description;    
        document.getElementById("mainwind").innerHTML = wind + " "+ changeWind();     
        document.getElementById("mainpressure").innerHTML = pressure + " hPa"; 
        document.getElementById("mainhumidity").innerHTML = humidity + "% Humidity";    
    }

    function setBackground(description) {
        var video = document.getElementById("myVideo");

        video.pause();

        if (description==="Thunderstorm")
        document.getElementById("vid").src = "Lightning.mp4";  
        else if (description==="Drizzle")
        document.getElementById("vid").src = 'Light Drizzle.mp4';  
        else if (description==="Rain")
        document.getElementById("vid").src = "Rain.mp4";  
        else if (description==="Snow") 
            document.getElementById("vid").src = 'Snow.mp4';  
        else if (description==="Atmosphere")
        document.getElementById("vid").src = "Haze.mp4";  
        else if (description==="Clear")
        document.getElementById("vid").src = "Clear.mp4";  
        else if (description==="Clouds")
        document.getElementById("vid").src = 'clouds.mp4'; 
        else if (description==="Mist")
        document.getElementById("vid").src = "Haze.mp4"; 

        video.load();
        video.play();
    }

    
function setIcon(description, id) {
if (description==="Thunderstorm")
document.getElementById(id).src = "Thunderstorms.png";  
else if (description==="Drizzle")
document.getElementById(id).src = 'Slight Drizzle.png';  
else if (description==="Rain")
document.getElementById(id).src = "Drizzle.png";  
else if (description==="Snow")
document.getElementById(id).src = 'Snow.png';  
else if (description==="Atmosphere")
document.getElementById(id).src = "Haze.png";  
else if (description==="Clear")
document.getElementById(id).src = "Sunny.png";  
else if (description==="Clouds")
document.getElementById(id).src = 'Cloudy.png'; 
else if (description==="Mist")
document.getElementById("mainpic").src = "Haze.png";  
}

// Find all index of date
function findDateIndex(date,weatherObj) {
 var arr=[];
    for (let i=0;i<weatherObj.list.length; i++) {
      var string = parseInt(weatherObj.list[i].dt_txt.substring(8,10));
      if (string==date) {
        arr.push(i);
      } 
        
    } //FOr loop
return arr;
}

function setHourlyTemp (jsonObj) {
    var temp= parseInt(jsonObj.list[2].main.temp);
    var temp1= parseInt(jsonObj.list[5].main.temp);
    var temp2= parseInt(jsonObj.list[7].main.temp);
    document.getElementById("next3hour").innerHTML = temp+ changeSymbols();
    document.getElementById("next6hour").innerHTML = temp1+ changeSymbols();
    document.getElementById("next9hour").innerHTML = temp2+ changeSymbols();

}


function setNextTemp(arr, id, jsonObj) {

    var temp= parseInt(jsonObj.list[arr[0]].main.temp);
    document.getElementById(id+'daytemp').innerHTML = "Morning: "+temp+ changeSymbols();
    var temp1= parseInt(jsonObj.list[arr[2]].main.temp);
    document.getElementById(id+'daywind').innerHTML = "Evening: " + temp1+ changeSymbols();
    var temp2= parseInt(jsonObj.list[arr[4]].main.temp);
    document.getElementById(id+'dayper').innerHTML ="Night: " + temp2+ changeSymbols();

    var description = jsonObj.list[arr[0]].weather[0].main;
    setIcon(description,id+"daypic");
    var description = jsonObj.list[arr[0]].weather[0].description;
    document.getElementById(id+"daycap").innerHTML=description;

}


function myFunction1(response) {

    var reg=28;

  if (month=1)
  reg=28;
    else  if (month%2==0) 
reg=31;
else if (month%2==1)
reg=30;



    var arr= JSON.parse(response);
    var tempArr1=findDateIndex((day+1)%reg,arr);
    var tempArr2=findDateIndex((day+2)%reg,arr);
    var tempArr3=findDateIndex((day+3)%reg,arr);
    var tempArr4=findDateIndex((day+4)%reg,arr);
    var tempArr5=findDateIndex((day+5)%reg,arr);
    
    setHourlyTemp(arr);
    setNextTemp(tempArr1, "next", arr);
    setNextTemp(tempArr2, "two", arr);
    setNextTemp(tempArr3, "3", arr);
    setNextTemp(tempArr4, "4", arr);
    setNextTemp(tempArr5, "5", arr);
    

}
