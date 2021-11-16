/*var APIKEY = "617ffebf63fbb2763ab02509";

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://savetheearth-c589.restdb.io/rest/event-signup",
    "method": "GET",
    "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
    }
} 
$.ajax(settings).done(function (response) {
    //Check if user and password match in RestDb
    for (let j = 0; j < response.length; j++) {
        if(username == response[j].username && password == response[j].password){
          sessionStorage.setItem("loginStatus", "loggedIn");
          sessionStorage.setItem("username", response[j].username);
          window.location.replace("../../index.html");
        }
        else
        {
          $("#invalid").show();
        }
    }
  });*/