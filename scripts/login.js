$(document).ready(function () {
    const APIKEY = "617ffebf63fbb2763ab02509";

    var z = sessionStorage.getItem("loginStatus");
    console.log(z);

    $("#submit-login").on("click", function (e) {
        let inputEmail = $("#input-email").val();
        let inputPassword = $("#input-password").val();

        checkValidity(inputEmail, inputPassword);

    });

    function checkValidity(inputEmail, inputPassword){
        sessionStorage.setItem("loginStatus" , "loggedOut");
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
                        if(response[i].password == inputPassword){
                            window.alert('Login Successful');
                            window.location.href="index.html"
                            sessionStorage.setItem("loginStatus" , "loggedIn")
                            sessionStorage.setItem("user_id", response[i]._id);
                            sessionStorage.setItem("full_name", response[i].full_name);
                            sessionStorage.setItem("email", response[i].email);
                            sessionStorage.setItem("password", response[i].password);
                            sessionStorage.setItem("cart", response[i].cart);
                            sessionStorage.setItem("points", response[i].points);
                            break;
                        }
                    }
                }
                var status = sessionStorage.getItem("loginStatus");
                if(status == "loggedOut")
                {
                    window.alert('Wrong password and/or email. Please try again');
                    document.getElementById('input-email').value = "";
                    document.getElementById('input-password').value = "";
                }
        })
    }
})