/*
 * Lazy load permite que as imagens que não estão visíveis no ecrã do utilizador
 * não carreguem. Quando a imagem começa a aparecer no ecrã do utilizador esta
 * função carrega a respectiva imagem dinâmicamente e substitui a do ecrã quando
 * acaba de carregar. Deste modo, tanto o servidor como o cliente, poupam em
 * tempo, sobrecarga no servidor e no terminal do cliente, e uso de bandwidth.
 * Todas as imagens que precisam de ser carregadas com este método devem ter o
 * URI da imagem original no atributo "data-src" e o atributo "src" deve conter
 * o URI de um placeholder leve e invisível (como uma imagem transparente de
 * 1px por 1px em formato gif) para o navegador não apresentar um erro de
 * carregamento de imagem.
*/
function lazyLoad() {
    var i = document.images.length;
    var visible;
    var image;
    var src;

    while (i) {
        i -= 1;
        visible = document.images[i].getBoundingClientRect();
        visible = visible.right >= 0 &&
                  visible.bottom >= 50 &&
                  document.images[i].offsetWidth !== 0 &&
                  document.images[i].offsetHeight !== 0 &&
                  visible.left <= (window.innerWidth || document.documentElement.clientWidth) &&
                  visible.top <= (window.innerHeight || document.documentElement.clientHeight);
        src = document.images[i].dataset ?
              document.images[i].dataset.src :
              document.images[i].getAttribute("data-src");

        if (src && visible) {

            image = new Image();
            image.element = document.images[i];
            image.addEventListener("load", function () {
                this.element.src = this.src;
                if (this.element.dataset) {
                    delete this.element.dataset.src;
                } else {
                    this.element.removeAttribute("data-src");
                }
            }, false);
            image.src = src;

        }

    }

}

function xhr(method, url, callback) {
    var request = new XMLHttpRequest;

    request.addEventListener("load", callback);
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

    mapa.parentNode.classList.toggle("show");

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
}

function navigateHash() {
    var ativarInicio = document.getElementById("ativar_inicio");
    var paginaAtual = document.getElementById("ativar_" + window.location.hash.substring(1));
    var menuAtual = document.querySelector("[for='ativar_" + window.location.hash.substring(1) + "']");

    if (paginaAtual) {

        paginaAtual.checked = true;

        if (menuAtual) {

            document.getElementById("page_title").textContent = document.querySelector("[for='ativar_" + window.location.hash.substring(1) + "']").textContent;
        
        }

    } else if (ativarInicio) {

        ativarInicio.checked = true;

    }

}

window.addEventListener("hashchange", navigateHash, false);
navigateHash();

document.addEventListener("readystatechange", lazyLoad, false);
document.addEventListener("touchmove", lazyLoad, false);
window.addEventListener("hashchange", lazyLoad, false);
window.addEventListener("scroll", lazyLoad, true);
lazyLoad();