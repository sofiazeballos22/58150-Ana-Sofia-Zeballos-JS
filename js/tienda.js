class Tienda {
    constructor(nombre, direccion, telefono, baseDeDatos) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.baseDeDatos = baseDeDatos;
    }
    filtrarProductoPorCategoria(valor, carrito) {
        let espacioProductos = document.getElementsByClassName("productos")
        espacioProductos[0].innerHTML = "";
        const encontrado = this.baseDeDatos.filter(producto => producto.categoria == valor);
        this.listarProductos(encontrado, carrito);
    };
        // Método para manejar los eventos de los botones de talles y colores
        manejarEventosTallesColores() {
            const botonesTallesColores = document.querySelectorAll('.talles-mujeres-2, .btn');
    
            botonesTallesColores.forEach((boton) => {
                boton.addEventListener('click', function() {
                    botonesTallesColores.forEach((b) => b.classList.remove('selector'));
                    this.classList.add('selector');
                });
            });
        }

    buscarProductoPorId(valorId) {
        const encontrado = this.baseDeDatos.find(producto => producto.idProducto == valorId);
        return encontrado;
    };

    listarProductos(encontrado, carrito) {
        let espacioProductos = document.querySelector(".productos");
       // let espacioProductos = document.getElementsByClassName("productos")[0];
        espacioProductos.innerHTML = "";
    
        for (const producto of encontrado) {
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
                        ${
                            producto.categoria === 'Medias' ?
                            // Si es un producto de categoría "Medias"
                            `
                            <button type="button" class="talles-mujeres-2">25</button>
                            <button type="button" class="talles-mujeres-2">30</button>
                            <button type="button" class="talles-mujeres-2">35</button>
                            <button type="button" class="talles-mujeres-2">40</button>
                            `
                            :
                            // Si es cualquier otra categoría de producto
                            `
                            <button type="button" class="talles-mujeres-2">90</button>
                            <button type="button" class="talles-mujeres-2">95</button>
                            <button type="button" class="talles-mujeres-2">100</button>
                            <button type="button" class="talles-mujeres-2">105</button>
                            `
                        }
                        </div>
                    </div>
    
                    <li class="list-group-item">
                        Colores disponibles
                        <div>
                            <button type="button" class="btn style= btn-primary"></button>
                            <button type="button" class="btn style= btn-secondary"></button>
                            <button type="button" class="btn style= btn-info"></button>
                            <button type="button" class="btn style= btn-danger"></button>
                            <button type="button" class="btn style= btn-warning"></button>
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
                <button id="${producto.idProducto}" type="button" class="btn btn-primary btnComprar">Agregar compra</button>
            `;

           

            cardBody.querySelector('.btnComprar').onclick = () => {
                console.log(carrito); // Verificar el valor de carrito antes de agregarAlCarrito
                carrito.agregarAlCarrito(producto);
            };
            
            // cardBody.querySelector('.btnComprar').onclick = function () {
            //     carrito.agregarAlCarrito(producto);
            // };
    
            card.appendChild(imagen);
            card.appendChild(cardBody);
            espacioProductos.appendChild(card);
        }

     // Una vez que se han creado todos los productos, se asignan los eventos
     this.manejarEventosTallesColores();
        
    }
    
} 