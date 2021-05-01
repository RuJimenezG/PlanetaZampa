//CAMPOS GLOBALES
var permiteSubmit = true;

function compruebaCampos(){
    campos = document.querySelectorAll("fieldset#datos-cliente input");
    campos.forEach(campo => {
        if (campo.value.trim() == "") {
            alert ("Por favor, rellene todos los campos");
            campo.focus();
            return PermiteSubmit = false;
        }
    })
}

//Comprueba que el NIF tiene entre 4 y 9 dígitos seguidos de un guión y luego una letra. Para esto se puede usar regex. Ayudas  aquí debajo:
//https://learnxinyminutes.com/docs/pcre/
//https://regex101.com/
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
//Comprobación de la fecha y hora de entrega.
function compruebaFecha() {
    var _fechaActual = new Date();
    var _horaActual = _fechaActual.getTime();
    // a fecha entrega le tengo que dar un string dentro de new Date en plan new Date (año,mes,dia,hora,minutos,segundos). Vamos a parsear el input!
    var _fechaEntrega = document.getElementById("ffentrega").value;
    _fechaEntrega = _fechaEntrega.split("-");
    var _horaEntrega = document.getElementById("fhentrega").value;
    _horaEntrega = _horaEntrega.split(":");
    _m = _fechaEntrega.concat(_horaEntrega);
    _ano = _m[0];
    _mes = _m[1]-1;
    _dia = _m[2];
    _hora = _m[3];
    _minutos = _m[4];
    _momentoEntrega = new Date (_ano,_mes,_dia,_hora,_minutos);
    //var _momentoEntrega = new Date (_fechaEntrega,getHours(_horaEntrega),getMinutes(_horaEntrega));
    if (_momentoEntrega < _fechaActual) {
        alert("La fecha de entrega se encuentra en el pasado. ¡Ojalá pudiéramos viajar en el tiempo para entregar tu pedido! Pero de momento solo viajamos entre planetas");
        return permiteSubmit = false;
    }
}


// Cálculo de las calorias y precio total de la selección del usuario.
function calcula() {
        //Se crean las variables para el total de calorias y precio para luego ir sumando, así como la cantidad de menús para limitar el recorrido del for.
        var total_calorias = 0;
        var total_precio = 0;
        menus =  document.getElementsByName("calorias");
        var cantidadDeMenus =menus.length; 
        //Ahora se navega por los elementos del formulario que contienen los datos que necesitamos y se extraen sus valores.
        for (let i = 0; i < cantidadDeMenus; i++) {
            var caloria = document.getElementsByName("calorias").item(i).textContent;
            var precio = document.getElementsByName("precio").item(i).textContent;
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
