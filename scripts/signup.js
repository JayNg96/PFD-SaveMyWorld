$(document).ready(function () {
    const APIKEY = "617ffebf63fbb2763ab02509";

    $("#submit-sign-up").on("click", function (e) {
        let inputFullName = $("#input-fullname").val();
        let inputEmail = $("#input-email").val();
        let inputPassword = $("#input-password").val();

        if(checkValidity(inputEmail)==true){
            console.log("test1");
            addAccount(inputFullName, inputEmail, inputPassword);
        }
    });

    function addAccount(inputFullName, inputEmail, inputPassword){
        console.log("test2")
        var jsondata = {
            "full-name": inputFullName,
            "email": inputEmail,
            "password": inputPassword
        };
        console.log("test3");
        var settings = {
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
        console.log("test4");
        $.ajax(settings).done(function (response) {
            console.log(response);
            window.alert('Successfully signed up. Redirecting to login page');
            window.location.href="login.html"
        });
        console.log("test5");
    }

    function checkValidity(inputEmail){
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
                console.log("return response");

                for(var i = 0; i < response.length; i++){
                    if(response[i].email == inputEmail){
                        window.alert('Email already in use. Redirecting to login page');
                        window.location.href="login.html"
                        status = false;
                        break;
                    }
                }
        })
        return status;

    }

})

