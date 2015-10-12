function toggleMenu() {
    document.getElementById("main_page").classList.toggle("show");
}

if (window.navigator.userAgent.indexOf("Android") > -1) {
    document.documentElement.setAttribute("operatingsystem", "Android");
} else if (window.navigator.userAgent.indexOf("iP") > -1) {
    document.documentElement.setAttribute("operatingsystem", "iOS");
}
window.alert(window.navigator.userAgent.indexOf("Android") > -1);