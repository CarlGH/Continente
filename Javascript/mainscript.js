function toggleMenu() {
    document.getElementById("main_page").classList.toggle("show");
}

if (navigator.userAgent.indexOf("Android") > -1) {
    document.documentElement.setAttribute("operatingSystem", "Android");
} else if (navigator.userAgent.indexOf("iP") > -1) {
    document.documentElement.setAttribute("operatingSystem", "iOS");
}