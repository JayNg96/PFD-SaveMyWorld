$(document).ready(function () {
    const APIKEY = "617ffebf63fbb2763ab02509";

    $("#submit-sign-up").on("click", function (e) {
        let inputFullName = $("#input-fullname").val();
        console.log(inputFullName);
        let inputEmail = $("#input-email").val();
        let inputPassword = $("#input-password").val();

        checkValidity(inputFullName, inputEmail, inputPassword)
    }); 

    function checkValidity(inputFullName, inputEmail, inputPassword){
        var status = true;
        let settings = {
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
                console.log(response);
                for(var i = 0; i < response.length; i++){
                    if(response[i].email == inputEmail){
                        window.alert('Email already in use. Redirecting to login page');
                        window.location.href="login.html"
                        status = false;
                        break;
                    }
                }
        })
        
        if(status){
            var jsondata = {
                "full-name": inputFullName,
                "email": inputEmail,
                "password": inputPassword
            };
            console.log("test3");
            let settings1 = {
                "async": false,
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
            console.log("test4");
            $.ajax(settings1).done(function (response) {
                console.log("test5");
                console.log(response);
                window.alert('Successfully signed up. Redirecting to login page');
                window.location.href="login.html"
            })
            console.log("test6");
        }

    }

})

