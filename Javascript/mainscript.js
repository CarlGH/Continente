var paginaActual = document.getElementById("ativar_" + window.location.hash);

function toggleMenu() {

    document.body.classList.toggle("show");

}

function navigateMenu(event) {

    window.location.hash = event.target.className;
    document.getElementById("page_title").textContent = event.target.textContent;
    toggleMenu();

    console.log(event);

}

if (paginaActual) {

    paginaActual.checked = true;

} else {

    document.getElementById("ativar_inicio").checked = true;

}