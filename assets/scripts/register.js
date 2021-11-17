var APIKEY = "617ffebf63fbb2763ab02509";

$("#registered").hide();
$("#invalid").hide();
$("#invalid-fill").hide();
$("#invalid-email").hide();

//Register button
$("#register-btn").on("click", function () { 
  let email = $("email").val();
  let username = $("#username").val();
  let password = $("#password").val();
  let c_password = $("#c-password").val();

  var status = true;
  let settings1 = {
    "async": true,
    "crossDomain": true,
    "url": "https://savetheearth-c589.restdb.io/rest/registered-accounts",
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
    },
}

$.ajax(settings).done(function (response) {
  for(var i = 0; i < response.length; i++){
      if(response[i].email == email){
          $("#invalid-email").show();
          break;
      }
  }
})

  function register(email, username, password, c_password){
    //Validation check
  if(username == "" || password == "" || c_password == ""){
    $("#invalid-fill").show();
  }
  else if(password != c_password){
    $("#invalid").show();
  }
  else
  {
    $("#registered").show();
    let jsondata = {
      "username":username,
      "password":password,
      "cart":""
    };
    
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://savetheearth-c589.restdb.io/rest/registered-accounts",
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(jsondata)
    }
  
    $.ajax(settings).done(function (response) {
    })
  }
  }
  
})