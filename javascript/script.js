window.addEventListener("load", inicio);
let miSistema = new Sistema();

function inicio() {
    document.getElementById("registrarCensista").addEventListener("click", registrar);
    document.getElementById("formRegistroBtn").addEventListener("click", ocultarMostrarRegistro);
}

function registrar() {
    let nombreCensista = document.getElementById("nombreRegistro").value;
    let nombreDeUsuario = document.getElementById("nombreDeUsuarioRegistro").value;
    let contraseniaCensista = document.getElementById("contraseniaRegistro").value;
    let resultado = document.getElementById("mensajesRegistro");
    let mensajes = "";

    if (nombreCensista == "") {
        mensajes = "El nombre no puede estar vacio";
    } else if (nombreDeUsuario == "") {
        mensajes = "El nombre de usuario no puede estar vacio";
    } else if (contraseniaCensista == "") {
        mensajes = "La contrasenia no puede estar vacia";
    } else {
        let cumpleMayuscula = false;
        let cumpleMinuscula = false;
        let cumpleNumero = false;
        if (contraseniaCensista.length >= 5) {
            for (let i = 0; i < contraseniaCensista.length; i++) {
                if (isNaN(contraseniaCensista.charAt(i)) && contraseniaCensista.charAt(i) == contraseniaCensista.charAt(i).toUpperCase()) {
                    cumpleMayuscula = true;
                }
                if (!isNaN(contraseniaCensista.charAt(i))) {
                    cumpleNumero = true;
                }
                if (isNaN(contraseniaCensista.charAt(i)) && contraseniaCensista.charAt(i) == contraseniaCensista.charAt(i).toLowerCase()) {
                    cumpleMinuscula = true;
                }
            }
            if (!cumpleMayuscula) {
                mensajes = "La contraseña debe tener como minimo 1 mayuscula";
            }
            if (!cumpleMinuscula) {
                mensajes = "La contraseña debe tener como minimo 1 minuscula";
            }
            if (!cumpleNumero) {
                mensajes = "La contraseña debe tener como minimo 1 numero";
            }
            if (cumpleMayuscula && cumpleMinuscula && cumpleNumero) {
                let respuesta = miSistema.registrarCensista(nombreCensista, nombreDeUsuario, contraseniaCensista);
                if (respuesta) {
                    document.getElementById("nombreRegistro").value = "";
                    document.getElementById("nombreDeUsuarioRegistro").value = "";
                    document.getElementById("contraseniaRegistro").value = "";

                    mensajes = "Censista registrado correctamente";
                } else {
                    mensajes = "El censista ya existe! No se ha agregado";
                }
            }
        } else {
            mensajes = "La contraseña debe tener como minimo 5 caracteres";
        }
    }
    resultado.innerHTML = mensajes;
}

function ocultarMostrarRegistro() {
    if (document.getElementById("formLogin").hidden == true) {
        document.getElementById("formRegistro").hidden = false;
    } else {
        document.getElementById("formRegistro").hidden = true;
        document.getElementById("formLogin").hidden = false;
    }
}