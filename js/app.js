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
            let calzadoFilter = data.filter(data => data.type === 'calzado');
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
        <div class="product-txt">
            <h3 class="nombre-producto">${m.name}</h3>
            <p class="precio">Precio: $ ${m.price}</p>
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
        <div class="product-txt">
            <h3 class="nombre-producto">${m.name}</h3>
            <p class="precio">Precio: $ ${m.price}</p>
            <a href="#" class="agregar-carrito btn-2" data-id="1">Agregar al carrito</a>
        </div>`;
        sectionCalzado.append(article);
    })
}

getData()


document.addEventListener('DOMContentLoaded', function () {
    let carrito = [];
    const listaCarrito = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

    document.addEventListener('click', function (e) {
    if (e.target.classList.contains('agregar-carrito')) {
        e.preventDefault();
        const productoSeleccionado = e.target.parentElement.parentElement;
        agregarProductoAlCarrito(productoSeleccionado);
    }else if (e.target.classList.contains('borrar-producto')) {
        const nombreProducto = e.target.dataset.nombre;
        eliminarProductoDelCarrito(nombreProducto);
    }  
    });

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    function agregarProductoAlCarrito(producto) {
    const productoInfo = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('.nombre-producto').textContent,
        precio: producto.querySelector('.precio').textContent,
    };

    const existe = carrito.some(item => item.nombre === productoInfo.nombre);

    if (!existe) {
        carrito.push(productoInfo);
        actualizarCarrito();
    } else {
        Swal.fire('El producto ya está en el carrito.');
    }
    }
    function eliminarProductoDelCarrito(nombreProducto) {
        carrito = carrito.filter(item => item.nombre !== nombreProducto);
        actualizarCarrito();
    }

    function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    carrito.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${item.imagen}" alt="Producto"></td>
        <td>${item.nombre}</td>
        <td>${item.precio}</td>
        <td><a href="#" class="borrar-producto" data-nombre="${item.nombre}">Eliminar</a></td>
        `;
        listaCarrito.appendChild(row);
    });
    }

    function vaciarCarrito() {
        carrito.length = 0;
        actualizarCarrito();
    }
});



