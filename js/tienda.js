class Tienda {
    constructor(nombre, direccion, telefono, baseDeDatos) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.baseDeDatos = baseDeDatos;
    }
    filtrarProductoPorCategoria(valor, carrito) {
        let espacioProductos = document.getElementsByClassName("contenedorProductos")
        espacioProductos[0].innerHTML = "";
        const encontrado = this.baseDeDatos.filter(producto => producto.categoria == valor);
        this.listarProductos(encontrado, carrito);
    };

    buscarProductoPorId(valorId) {
        const encontrado = this.baseDeDatos.find(producto => producto.idProducto == valorId);
        return encontrado;
    };

    listarProductos(baseDeDatos, carrito) {
        let espacioProductos = document.getElementsByClassName("productos")[0];
        espacioProductos.innerHTML = "";
    
        for (const producto of baseDeDatos) {
            let card = document.createElement("div");
            card.className = "card";
    
            let imagen = document.createElement("img");
            imagen.src = `../image/${producto.img}`;
            imagen.className = "card-img-top-cat";
            imagen.alt = `${producto.descripcionProducto} `;
    
            let cardBody = document.createElement("div");
            cardBody.className = "card-body";
    
            cardBody.innerHTML = `
                <h5 class="card-title">${producto.nombreProducto}</h5>
                <p class="card-text">${producto.descripcionProducto}</p>
                <p class="card-text-2">${producto.descripcionProducto}</p>
                <ul class="list-group list-group-flush" style="padding-left: 2px; padding-right: 2px">
                    <li class="list-group-item" style="display:none"></li> 
                    <div class="botones-talles-mujeres-2">
                        Talles disponibles
                        <div>
                            <button type="button" class="talles-mujeres-2">90</button>
                            <button type="button" class="talles-mujeres-2">105</button>
                            <button type="button" class="talles-mujeres-2">95</button>
                            <button type="button" class="talles-mujeres-2">100</button>
                        </div>
                    </div>
    
                    <li class="list-group-item">
                        Colores disponibles
                        <div>
                            <button type="button" class="btn btn-primary"></button>
                            <button type="button" class="btn btn-secondary"></button>
                            <button type="button" class="btn btn-success"></button>
                            <button type="button" class="btn btn-danger"></button>
                            <button type="button" class="btn btn-warning"></button>
                        </div>
                    </li>
                </ul>
                <ul class="boton-list-colors">
                    <li class="list-group-colors">
                        <p>Colores disponibles</p>
                        <button type="button" class="round-button"></button>
                        <button type="button" class="round-button"></button>
                        <button type="button" class="round-button"></button>
                        <button type="button" class="round-button"></button>
                    </li>
                </ul>

                <h4>$${producto.precio}</h4>
                <button id="${producto.idProducto}" type="button" class="btn btn-primary btnComprar">Comprar</button>
            `;

            cardBody.querySelector('.btnComprar').onclick = function () {
                carrito.agregarAlCarrito(producto);
            };
    
            card.appendChild(imagen);
            card.appendChild(cardBody);
            espacioProductos.appendChild(card);
            btnComprarOnClic(carrito);
        }
    }
    
} 