function lazyLoad() {
    var images = document.getElementsByTagName("img");
    var i = images.length;
    var imageList = [];

    function loadImages() {
        var j = imageList.length;
        var visible;
        var image;
        var src;
console.info("loadImages");
        while (j) {
            j -= 1;
            visible = imageList[j].getBoundingClientRect();
            if (imageList[j].offsetWidth !== 0 &&
                imageList[j].offsetHeight !== 0 &&
                visible.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                visible.left <= (window.innerWidth || document.documentElement.clientWidth) &&
                visible.bottom >= 50 &&
                visible.right >= 0) {
                src = imageList[j].getAttribute("data-src");
                image = new Image();
                image.onload = function () {
                    this.element.src = this.src;
                    console.log(this.element, this);
                }
                image.src = src;
                image.element = imageList[j]
                console.log(j, src);
            }
        }

    }

    while (i) {
        i -= 1;
        imageList.push(images[i]);
    }
    console.log(imageList);

    document.addEventListener("touchmove", loadImages, false);
    window.addEventListener("scroll", loadImages, true);
    window.addEventListener("hashchange", loadImages, false);
    loadImages();
}

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
lazyLoad();