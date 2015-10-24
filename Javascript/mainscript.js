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
    request.open(method, url, true);
    //request.send();
    return request;

}

function backMenu(element) {
    var menu = document.getElementById("menu_button");

    menu.classList.add("back");
    menu.subPage = element;

}

/*function searchProducts() {
    var request; // nao funciona CORS
    var url = "http://www.continente.pt/stores/continente/_vti_bin/eCsfServices/SearchServices.svc/GetQuerySuggestions";
    
    function processResult() {
        console.log(request);
    }

    request = xhr("POST", url, processResult);
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.send({"request": {"Query": "mel"}});

}*/

function openMap(event) {
    var lojas = document.getElementById("mapa_lojas");

    if (lojas) {

        lojas.classList.remove("hide");
        backMenu(lojas);

    } else {

        lojas = document.createElement("iframe");
        lojas.id = "mapa_lojas";
        lojas.src = "Paginas/googlemap.html";
        lojas.height = "100%";
        lojas.width = "100%";
        lojas.setAttribute("frameborder", 0);
        //mapa.appendChild(lojas);
        //console.log(event);
        event.parentNode.appendChild(lojas);
        backMenu(lojas);

    }

    event.parentNode.classList.toggle("show");

}

function openStores(event) {
    var lista = document.getElementById("lojas_lista");
    var request;

    function processResult() {
        var data = JSON.parse(request.response).GetRetailStoresResult.Result;
        var i = data.length;
        var nome;

        function sortArray(previous, next) {
            previous = previous.Region || previous.Name;
            next = next.Region || next.Name;

            return previous.localeCompare(next);

        }

        data.sort(sortArray);
        data.reverse();

        while (i) {
            i -= 1;

            if (data[i].Region) {

                name = data[i].Region;

            } else {

                name = data[i].Name.split(" -")[0];

            }

            name = name.trim();

            if (lista[name]) {

                lista[name].push(data[i]);

            } else {

                lista[name] = [data[i]];
                lista.textContent += "<li>" + name + "</li>";

            }

        }

        lista.innerHTML = lista.textContent;
        event.parentNode.appendChild(lista);
        //event.parentNode.classList.toggle("show");
        backMenu(lista);

    }

    if (lista) {

        lista.classList.remove("hide");
        backMenu(lista);

    } else {

        lista = document.createElement("div");
        lista.id = "lojas_lista";
        request = xhr("GET",
                      "http://m.folhetos.continente.pt/scripts/get_stores.php",
                      processResult);
        request.send();

    }

}

function toggleMenu(event) {

    if (event.target.subPage) {

        event.target.subPage.classList.add("hide");
        event.target.classList.remove("back");
        delete event.target.subPage;

    } else {

        document.body.classList.toggle("show");

    }

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
    var hash = window.location.hash.substring(1);
    var ativarInicio = document.getElementById("ativar_inicio");
    var paginaAtual = document.getElementById("ativar_" + hash);
    var menuAtual = document.querySelector("[for='ativar_" + hash + "']");

    if (paginaAtual) {

        paginaAtual.checked = true;

        if (menuAtual) {

            document.getElementById("page_title").textContent = document.querySelector("[for='ativar_" + hash + "']").textContent;
        
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