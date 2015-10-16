function xhr(method, url, callback) {
    var request = new XMLHttpRequest;

    request.addEventListener("load", callback);
    //request.open("GET", "http://m.folhetos.continente.pt/scripts/get_stores.php", true);
    request.open("GET", url, true);
    request.send();

}

function openMap(event) {
    var mapa = document.getElementById("mapa");
    var lojas = document.getElementById("mapa_lojas");

    if (!lojas) {

        lojas = document.createElement("iframe");
        lojas.id = "mapa_lojas";
        lojas.src = "Paginas/googlemap.html";
        lojas.height = "100%";
        lojas.width = "100%";
        lojas.setAttribute("frameborder", 0);
        mapa.appendChild(lojas);
        console.log(event);

    }

    mapa.classList.toggle("show");

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
