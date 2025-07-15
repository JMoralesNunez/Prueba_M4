let isAuth = localStorage.getItem("auth");

if (isAuth != "true") {
    window.location = "../../assets/others/login.html"
}