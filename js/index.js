//CAMPOS GLOBALES
var permiteSubmit = true;

//FUNCIONES
//Función de comprobación global. Invoca a todo el resto de comprobaciones.
function comprobaciones() {
    permiteSubmit = true; 
    compruebaCampos(); 
    compruebaNif(); 
    compruebaCorreo(); 
    compruebaTelefono(); 
    compruebaFecha(); 
    compruebaTarjeta();
}

//Función para comprobar que todos los campos están rellenos o no son espacios.
//Consulta del método querySelectorAll https://developer.mozilla.org/es/docs/Web/API/Document/querySelectorAll
//Consulta sobre como usar forEach en notación lambda https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
function compruebaCampos() {
    _campos = document.querySelectorAll("fieldset#datos-cliente input");
    let activaAlert = false;
    let campoFocus;
    _campos.forEach(_campo => {
        if (_campo.value.trim() == "") {
            activaAlert = true;
            campoFocus = _campo;
        }
    })
    if(activaAlert){
        alert("Por favor, rellene todos los campos");
            campoFocus.focus();
            return PermiteSubmit = false;
    }
}

//Función para comprobar que el NIF tiene entre 4 y 9 dígitos seguidos de un guión y luego una letra. Para esto se puede usar regex.
//Webs de consulta:
//https://learnxinyminutes.com/docs/pcre/
//https://regex101.com/
//https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
function compruebaNif() {
    var campoNif = document.getElementById("fnif");
    _regexExp = /^\d{4,9}-[a-zA-Z]$/;
    if (!_regexExp.test(campoNif.value)) {
        alert("El NIF debe estar compuesto por entre 4 y 9 dígitos seguidos de un guión y una letra")
        campoNif.focus();
        return permiteSubmit = false;
    }
}

//Comprobación del correo de manera similar a la del NIF usando regex.
function compruebaCorreo() {
    var campoEmail = document.getElementById("femail");
    _regexExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!_regexExp.test(campoEmail.value)) {
        alert("Por favor, introduzca una dirección de correo electrónico válida.")
        campoEmail.focus();
        return permiteSubmit = false;
    }
}

//Comprobación del teléfono.
function compruebaTelefono() {
    var campoTelefono = document.getElementById("ftelefono");
    _regexExp = /^\d{9}$/;
    if (!_regexExp.test(campoTelefono.value)) {
        alert("Por favor, introduzca un número de teléfono válido.")
        campoTelefono.focus();
        return permiteSubmit = false;
    }
}

//Comprobación de la tarjeta bancaria.
function compruebaTarjeta() {
    var campoTarjeta = document.getElementById("ftarjeta");
    var campoCaducidad = document.getElementById("fcaducidad");
    var campoCodigo = document.getElementById("fcodigo");
    _regexExp1 = /\d{16}$/;
    _regexExp2 = /^(1[0-2]|0[1-9])\/\d{2}$/;
    _regexExp3 = /\d{3}$/;
    if (!_regexExp1.test(campoTarjeta.value)) {
        alert("El número de tarjeta debe estar compuesto por 16 dígitos.");
        campoTarjeta.focus();
        return permiteSubmit = false;
    } else {
        if (!_regexExp2.test(campoCaducidad.value)) {
            alert("La fecha de caducidad debe tener el formato MM/AA.");
            campoCaducidad.focus();
            return permiteSubmit = false;
        } else {
            if (!_regexExp3.test(campoCodigo.value)) {
                alert("El código de seguridad debe ser un número de 3 dígitos.");
                _campo.focus();
                return permiteSubmit = false;
            }
        }
    }
}

//Comprobación de la fecha y hora de entrega.
//Hay que transformar los inputs de tipo fecha y hora en un objeto del tipo Date. Se puede hacer capturando los distintos elementos en un array
//y luego usarlo para componer un nuevo objeto Date que se puede comparar con la fecha actual.
function compruebaFecha() {
    var _momentoActual = new Date();
    var _fechaEntrega = document.getElementById("ffentrega").value;
    _fechaEntrega = _fechaEntrega.split("-");
    var _horaEntrega = document.getElementById("fhentrega").value;
    _horaEntrega = _horaEntrega.split(":");
    _m = _fechaEntrega.concat(_horaEntrega);
    _momentoEntrega = new Date(_m[0], _m[1] - 1, _m[2], _m[3], _m[4]);
    if (_momentoEntrega < _momentoActual) {
        alert("La fecha de entrega se encuentra en el pasado. ¡Ojalá pudiéramos viajar en el tiempo para entregar tu pedido! Pero de momento solo viajamos entre planetas");
        return permiteSubmit = false;
    }
}

// Cálculo de las calorias y precio total de la selección del usuario.
function calcula() {
    //Se crean las variables para el total de calorias y precio para luego ir sumando, así como la cantidad de menús para limitar el recorrido del for.
    var total_calorias = 0;
    var total_precio = 0;
    menus = document.getElementsByClassName("calorias");
    var cantidadDeMenus = menus.length;
    //Ahora se navega por los elementos del formulario que contienen los datos que necesitamos y se extraen sus valores.
    for (let i = 0; i < cantidadDeMenus; i++) {
        var caloria = document.getElementsByClassName("calorias").item(i).textContent;
        var precio = document.getElementsByClassName("precio").item(i).textContent;
        precio = parseFloat(precio);  // Con esto se convierte el precio con comas en un nº que separa los decimales con puntos.
        var cantidad = document.getElementsByClassName("input-cantidad").item(i).value;
        //Se actualizan las variables totales con los nuevos valores.
        total_calorias = total_calorias + (caloria * cantidad);
        total_precio = total_precio + (precio * cantidad);
    }
    //Mensaje para informar al usuario. Se reemplazan los puntos del float del precio por comas.
    total_precio = total_precio.toString().replace(/\./g, ',');
    alert("Su selección contiene:\n" + total_calorias + " kcal\n\n y tiene un precio total de:\n" + total_precio + " €.");
}
