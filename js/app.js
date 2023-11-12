const Prendas = [];
const root = document.querySelector('#root');
const sectionIndumentaria = document.querySelector('#Indumentaria');
const sectionCalzado = document.querySelector('#Calzado');

function getData() {
    fetch('./js/helpers/data.json')
        .then(res => {
            if (!res.ok){
                throw new Error ('No se pudo obtner datos.');
            }
            return res.json()
        })
        .then(data => {
            let indumentariaFilter = data.filter(data => data.type === 'indumentaria');
            // showMedia(indumentariaFilter, 'indumentaria');
            let calzadoFilter = data.filter(data => data.type === 'calzado');
            // showMedia(calzadoFilter, 'calzado');
            showIndumentaria(indumentariaFilter);
            showCalzado(calzadoFilter);
        })
        .catch(error => console.log('Ha ocurrido un error:', error)); 
}

function showIndumentaria(data) {

    data.forEach(m => {
        let article = document.createElement('article');
        article.setAttribute('class', 'product');
        article.innerHTML +=
        `<img src=${m.thumbnail} alt="imagen de ${m.name}">
        <div class="product.txt">
        <h3>${m.name}</h3>
        <p>Precio: $ ${m.price}</p>
        <a href="#" class="agregar-carrito btn-2" data-id="1">Agregar al carrito</a>
        </div>`;
        sectionIndumentaria.append(article);
    })
}

function showCalzado(data) {

    data.forEach(m => {
        let article = document.createElement('article');
        article.setAttribute('class', 'product');
        article.innerHTML +=
        `<img src=${m.thumbnail} alt="imagen de ${m.name}">
        <div class="product.txt">
        <h3>${m.name}</h3>
        <p>Precio: $ ${m.price}</p>
        <a href="#" class="agregar-carrito btn-2" data-id="1">Agregar al carrito</a>
        </div>`;
        sectionCalzado.append(article);
    })
}

getData()