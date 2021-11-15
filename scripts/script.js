var loggedIn = sessionStorage.getItem("loginStatus");
if (loggedIn == "loggedIn"){
    document.querySelector("#sign-up-dropdown").removeAttribute('href');
    var user = sessionStorage.getItem("full_name");
    console.log(user);
    document.querySelector("#sign-up-dropdown").innerHTML = user;
    document.querySelector("#login-dropdown").innerHTML = "Sign Out";
}