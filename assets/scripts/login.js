var APIKEY = "617ffebf63fbb2763ab02509";

$("#invalid").hide();
$(".loader").hide(); 

//Login button
$("#login-btn").on("click", function () {  
  $(".loader").show();
    setTimeout(function(){
      $(".loader").fadeOut("slow"); 
    }, 2000);  
    let username = $("#username").val();
    let password = $("#password").val();

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://savetheearth-c589.restdb.io/rest/registered-accounts",
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
              sessionStorage.setItem("userId", response[j]._id);
              sessionStorage.setItem("username", response[j].username);
              sessionStorage.setItem("password", response[j].password)
              sessionStorage.setItem("cart", response[j].cart);
              window.location.replace("../../index.html");
            }
            else
            {
              $("#invalid").show();
            }
        }
      });
})
