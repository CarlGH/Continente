function toggleMenu() {

    document.getElementById("main_page").classList.toggle("show");

}

if (window.navigator.userAgent.indexOf("Android") > -1) {

    document.body.classList.add("Android");

} else if (window.navigator.userAgent.indexOf("iP") > -1) {

    document.body.classList.add("iOS");

}