const tienda = new Tienda('Kyros Lencería', 'Barrio los Pinos, Idelfonso de las Muniecas 2554', 4885548, baseDeDatos);
const carrito = new Carrito([]);
tienda.listarProductos(tienda.baseDeDatos);
verificarLocalStorage(carrito);

$(document).ready(function () {
    btnComprarOnClic(carrito);
    eventosBotones(carrito);
});
document.addEventListener('DOMContentLoaded', function () {
 

    const btnCarrito = document.getElementById('btnCarrito');
  
    btnCarrito.addEventListener('click', function () {
      const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
      myModal.show();
    });
  });
class Producto {
    constructor(idProducto, nombreProducto, marcaProducto, categoria, descripcionProducto, precio, img, cantidad) {
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.marcaProducto = marcaProducto;
        this.categoria = categoria;
        this.descripcionProducto = descripcionProducto;
        this.precio = precio;
        this.img = img;
        this.cantidad= cantidad || 1;
    }
    agregarCantidad(valor){
        this.cantidad += valor
    }
    subTotal(){
        return this.cantidad * this.precio;
    }
    vaciarCantidad(){
        this.cantidad = 1;
    }
    modificarCantidad(valor){
        this.cantidad = valor
    }
}





function btnComprarOnClic(carrito) {
    let botones = document.getElementsByClassName('btnComprar');
    for (const boton of botones) {
        boton.onclick = function () {
            let producto = tienda.buscarProductoPorId(boton.id);
            carrito.agregarAlCarrito(producto);
        }
    }
}


function selectFiltroOnChange(carrito) {
    let filtroProductos = document.getElementById('filtroCategorias')
    filtroProductos.addEventListener('change', function () {
        if (this.value != "Todos") {
            tienda.filtrarProductoPorCategoria(this.value, carrito);
        } else {
            tienda.listarProductos(tienda.baseDeDatos, carrito);
        }
    })
}

function verificarLocalStorage(carrito) {
    if ('carrito' in localStorage) {
        const productosStorage = JSON.parse(localStorage.getItem("carrito"));
        for (const producto of productosStorage) {
            const found = baseDeDatos.find(p => p.idProducto == producto.idProducto)
            found.modificarCantidad(producto.cantidad)
            carrito.productos.push(found);
        }
    } else {
        carrito.productos = [];
    }
    let contadorCarrito = document.getElementById("contadorCarrito");
    contadorCarrito.innerHTML = contadorCarritos();
}
function carritoOnClick(carrito) {
    let btnCarrito = document.getElementById('btnCarrito')
    btnCarrito.onclick = function () {
        carrito.listarProductos(carrito)
    }
}


function VaciarCarritoOnClick(carrito) {
    let btnVaciar = document.getElementById('btnVaciarCarrito')
    btnVaciar.onclick = function () {
        localStorage.clear();
        for (const producto of carrito.productos) {
            producto.vaciarCantidad()
        }
        carrito.productos = [];
        let contadorCarrito = document.getElementById("contadorCarrito");
        contadorCarrito.innerHTML = 0;
        carrito.listarProductos();

    }
}

function eventosBotones(carrito) {
    btnComprarOnClic(carrito);
    selectFiltroOnChange(carrito);
    carritoOnClick(carrito);
    VaciarCarritoOnClick(carrito);
}

$("#btnFinalizar").click(enviarEmail);

function enviarEmail(e) {
    e.preventDefault();
    $.post("https://jsonplaceholder.typicode.com/posts", JSON.stringify(carrito.productos), function (respuesta, estado) {
        if (estado == "success") {
            // Calcular el total de la compra
            let total = 0;
            for (const producto of carrito.productos) {
                total += producto.subTotal();
            }

            // Mostrar mensaje de confirmación con SweetAlert
            Swal.fire({
                title: 'Compra confirmada',
                html: `¡Gracias por tu compra!<br>El total es: $${total.toFixed(2)}`,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Eliminar el carrito del localStorage
                    localStorage.removeItem('Carrito');

                    // Reiniciar la lista de productos del carrito
                    for (const producto of carrito.productos) {
                        producto.vaciarCantidad();
                    }
                    carrito.productos = [];

                    // Actualizar la interfaz, por ejemplo, mostrando el carrito vacío
                    let contadorCarrito = document.getElementById("contadorCarrito");
                    contadorCarrito.innerHTML = 0;
                    carrito.listarProductos();
                }
            });
        }
    });
}



