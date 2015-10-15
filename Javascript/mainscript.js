
function toggleMenu() {

    document.body.classList.toggle("show");

}

function navigateMenu(event) {

    window.location.hash = event.target.className;
    document.getElementById("page_title").textContent = event.target.textContent;

    toggleMenu();

}

function navigateHash() {
    var paginaActual = document.getElementById("ativar_" + window.location.hash.substring(1));

    if (paginaActual) {

        paginaActual.checked = true;

    } else {

        document.getElementById("ativar_inicio").checked = true;

    }

}

window.addEventListener("hashchange", navigateHash, false);

navigateHash();