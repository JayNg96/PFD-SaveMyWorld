var loginStatus = sessionStorage.getItem("loginStatus");

updateButtons()

function signUp(id) {
    if (loginStatus == "loggedIn") {
        let event = getEventData();
        event.push(id);
        console.log(event)
        saveEvent(event);
        updateButtons()
    }
    else {
        alert("Please login to sign up for an event");
    }

};

function saveEvent(event) {
    sessionStorage.setItem("event", JSON.stringify(event));

    let userId = sessionStorage.getItem("userId");
    let username = sessionStorage.getItem("username");
    let password = sessionStorage.getItem("password");
    let cart = sessionStorage.getItem("cart");

    let jsondata = {
        "username": username,
        "password": password,
        "cart": cart,
        "event": JSON.stringify(event),
    };
    console.log(userId);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://savetheearth-c589.restdb.io/rest/registered-accounts/${userId}`,
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY2,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

function getEventData() {
    if (loginStatus == "loggedIn" && sessionStorage.getItem("event").length != 0) {
        return JSON.parse(sessionStorage.getItem("event"));
    }
    else {
        return [];
    }
};

function updateButtons() {
    let event = getEventData();
    console.log(event.length);
    event.forEach(element => {
        let name = String(element);
        document.getElementById(name).setAttribute("onClick", "displayAlert();")
        document.getElementById(name).innerHTML = "done";
    })
}

function displayAlert() {
    alert("You have already signed up for this event")
}
