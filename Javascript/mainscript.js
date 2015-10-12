function toggleMenu() {
    document.getElementById("main_page").classList.toggle("show");
}

if (navigator.platform === "Android") {
    document.documentElement.setAttribute("operatingSystem", "Android");
} else if (navigator.platform.indexOf("iP") === 0) {
    document.documentElement.setAttribute("operatingSystem", "iOS");
}