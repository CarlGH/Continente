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