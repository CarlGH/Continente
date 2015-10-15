function xhr(method, url, callback) {
    var request = new XMLHttpRequest;

    request.addEventListener("load", callback);
    //request.open("GET", "http://m.folhetos.continente.pt/scripts/get_stores.php", true);
    request.open("GET", url, true);
    request.send();

}

function openMap(event) {
    /*var googleApi = document.createElement("script");
    var googleJsApi = document.createElement("script");
    var mapaLojas = document.createElement("script");

    googleApi.setAttribute("type", "text/javascript");
    googleApi.src = "http://maps.googleapis.com/maps/api/js?sensor=false";
    googleJsApi.setAttribute("type", "text/javascript");
    googleJsApi.src = "http://www.google.com/jsapi";
    mapaLojas.setAttribute("type", "text/javascript");
    mapaLojas.src = "Javascript/mapalojas.js";

    event.parentNode.appendChild(googleApi);
    event.parentNode.appendChild(googleJsApi);
    event.parentNode.appendChild(mapaLojas);*/

    //document.getElementById("mapa_lojas").src = "http://m.folhetos.continente.pt/lojas_fenix.html";
    var mapa = document.getElementById("mapa_lojas");
    if (!mapa.src) {
        mapa.src = "Paginas/googlemap.html";
        console.log(event);
    }
    document.getElementById("mapa").classList.toggle("show");

}

function toggleMenu() {

    document.body.classList.toggle("show");

}
function closeMenu() {

    document.body.classList.remove("show");

}

function navigateMenu(event) {

    window.location.hash = event.target.className;
    document.getElementById("page_title").textContent = event.target.textContent;

    closeMenu();
    console.log(event);
}

function navigateHash() {
    var paginaAtual = document.getElementById("ativar_" + window.location.hash.substring(1));
    var menuAtual = document.querySelector("[for='ativar_" + window.location.hash.substring(1) + "']");

    if (paginaAtual) {

        paginaAtual.checked = true;

        if (menuAtual) {

            document.getElementById("page_title").textContent = document.querySelector("[for='ativar_" + window.location.hash.substring(1) + "']").textContent;
        
        }

    } else {

        document.getElementById("ativar_inicio").checked = true;

    }

}

window.addEventListener("hashchange", navigateHash, false);

navigateHash();
