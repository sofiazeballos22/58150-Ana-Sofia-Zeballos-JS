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




// Objeto JavaScript con países de América Latina
var paisesLatinoamerica = {
    "Argentina": [ "Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego",
    "Tucumán"],
    "Brasil": ["Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahía",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins"],
    // Agrega más países y sus provincias aquí
};

// Clase Persona y array para almacenar objetos de personas registradas
class Persona {
    constructor(nombre, direccion, correo, dni, celular, pais, provincia, password, confirm_password) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.correo = correo;
        this.dni = dni;
        this.celular = celular;
        this.pais = pais;
        this.provincia = provincia;
        this.password = password;
        this.cconfirm_password = confirm_password;
    }
}

const personasRegistradas = [];


if (document.getElementById("pais") && document.getElementById("provincia")) {
    // Las funciones se ejecutarán solo si los elementos con los ID "pais" y "provincia" existen en la página
    function cargarPaises() {
        var paisSelect = document.getElementById("pais");

        for (var pais in paisesLatinoamerica) {
            var option = document.createElement("option");
            option.value = pais;
            option.text = pais;
            paisSelect.add(option);
        }
    }

    function mostrarProvincias() {
        var paisSelect = document.getElementById("pais");
        var provinciaSelect = document.getElementById("provincia");
        var selectedCountry = paisSelect.value;

        // Habilita el select de provincias si se ha seleccionado un país
        provinciaSelect.disabled = selectedCountry === "";

        // Limpia y carga las provincias correspondientes al país seleccionado
        provinciaSelect.innerHTML = ""; // Limpia las opciones existentes

        if (selectedCountry) {
            var provincias = paisesLatinoamerica[selectedCountry];
            provincias.forEach(function (provincia) {
                var option = document.createElement("option");
                option.value = provincia;
                option.text = provincia;
                provinciaSelect.appendChild(option);
            });
        }
    }
    cargarPaises();
}






// Obtén el formulario
const formulario = document.getElementById("formulario-registro-usuarios");

if (formulario) {
// Maneja el evento "submit" del formulario
formulario.addEventListener("submit", function (event) {
    // Cancela el envío del formulario por defecto
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const dni = document.getElementById("dni").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;
    const pais = document.getElementById("pais").value;
    const provincia = document.getElementById("provincia").value;
    const direccion = document.getElementById("direccion").value;
    const celular = document.getElementById("celular").value;

    // Verifica si algún campo está vacío o no cumple con las validaciones HTML
    if (
        nombre === "" ||
        correo === "" ||
        dni === "" ||
        password === "" ||
        confirm_password === "" ||
        pais === "" ||
        provincia === "" ||
        direccion === "" ||
        celular === "" ||
        !formulario.checkValidity() // Verifica las validaciones HTML
    ) {
        // Muestra un mensaje de error
        Swal.fire({
            title: 'Error',
            text: 'Por favor, completa todos los campos correctamente antes de registrarte.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        // Todos los campos están llenos y pasan las validaciones HTML, procede con el registro
        const nuevaPersona = new Persona(nombre, correo, dni, password, confirm_password, pais, provincia, direccion, celular);
        personasRegistradas.push(nuevaPersona);

        // Guarda la información en localStorage
        sessionStorage.setItem('usuarioRegistrado', JSON.stringify(nuevaPersona));

        // Mostrar SweetAlert 2 para confirmación
        Swal.fire({
            title: 'Registro Exitoso',
            text: '¡' + nombre + ' '  + ' ha sido registrado con éxito!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirige a la página de inicio después de registrar
                window.location.href = "../index.html";

                // Actualiza el enlace en el navbar con el nombre del usuario
                const enlaceNavbar = document.getElementById("registrar-usuario-2");
                enlaceNavbar.textContent = nombre; // 
            }
        });
    }
});

}




// Actualiza el enlace en el navbar con el nombre del usuario
const enlaceNavbar = document.getElementById("registrar-usuario-2");
const usuarioRegistrado = JSON.parse(sessionStorage.getItem('usuarioRegistrado'));

if (enlaceNavbar && usuarioRegistrado) {
    enlaceNavbar.textContent = usuarioRegistrado.nombre;
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
    console.log(carrito)
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
    selectFiltroOnChange(carrito);
    carritoOnClick(carrito);
    VaciarCarritoOnClick(carrito);
}

$("#btnFinalizar").click(enviarEmail);

function enviarEmail(e) {
    e.preventDefault();
    $.post("https://jsonplaceholder.typicode.com/posts", JSON.stringify(carrito.productos), function (respuesta, estado) {
        if (estado == "success") {
            $("#alertCompra").fadeIn(2000).fadeOut(2000);
            localStorage.clear();
            for (const producto of carrito.productos) {
                producto.vaciarCantidad()
            }
            carrito.productos = [];
            let contadorCarrito = document.getElementById("contadorCarrito");
            contadorCarrito.innerHTML = 0;
            carrito.listarProductos();
        }
    });




    
}
