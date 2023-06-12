window.addEventListener("load", inicio);
let miSistema = new Sistema();

function inicio() {
    miSistema.cargarCensistas();
    document.getElementById("registrarCensista").addEventListener("click", registrar);
    document.getElementById("loguearCensista").addEventListener("click", login);
    document.getElementById("formRegistroBtn").addEventListener("click", ocultarMostrarRegistro);
    document.getElementById("formLoginBtn").addEventListener("click", ocultarMostrarLogin);
    document.getElementById("logOutBtn").addEventListener("click", logout);
}

function registrar() {
    let nombreCensista = document.getElementById("nombreRegistro").value;
    let nombreDeUsuario = document.getElementById("nombreDeUsuarioRegistro").value;
    let contraseniaCensista = document.getElementById("contraseniaRegistro").value;
    let resultado = document.getElementById("mensajesRegistro");
    let mensajes = "";
    let flag = false;
    nombreCensista = nombreCensista.trim();
    nombreDeUsuario = nombreDeUsuario.trim();
    contraseniaCensista = contraseniaCensista.trim();
    nombreDeUsuario = nombreDeUsuario.toLowerCase();
    resultado.style.display = "block";

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
                    console.log("Usuario ingresado: " + miSistema.listaUsuarios[miSistema.listaUsuarios.length - 1].nombreDeUsuario);
                    flag = true;
                } else {
                    mensajes = "El censista ya existe! No se ha agregado";
                }
            }
        } else {
            mensajes = "La contraseña debe tener como minimo 5 caracteres";
        }
    }
    resultado.innerHTML = mensajes;
    if (flag) {
        setTimeout(() => (document.getElementById("mensajesRegistro").innerHTML = ""), 2400);
    }
}

function ocultarMostrarRegistro() {
    if (document.getElementById("formRegistro").hidden == true) {
        document.getElementById("formRegistro").hidden = false;
        document.getElementById("formLogin").hidden = true;
    } else {
        document.getElementById("formRegistro").hidden = true;
    }
}

function ocultarMostrarLogin() {
    if (document.getElementById("formLogin").hidden == true) {
        document.getElementById("formLogin").hidden = false;
        document.getElementById("formRegistro").hidden = true;
    } else {
        document.getElementById("formLogin").hidden = true;
    }
}

function login() {
    let nombreDeUsuario = document.getElementById("nombreDeUsuarioLogin").value;
    let contraseniaCensista = document.getElementById("contraseniaLogin").value;
    let mensajeErr = "";
    let mensajes = document.getElementById("mensajesLogin");

    let respuesta = miSistema.loguearCensista(nombreDeUsuario, contraseniaCensista);

    if (nombreDeUsuario == "") {
        mensajeErr = "El nombre de usuario no puede estar vacio";
    } else if (contraseniaCensista == "") {
        mensajeErr = "La contraseña no puede estar vacia";
    } else {
        if (respuesta) {
            miSistema.usuarioLogueado = miSistema.buscarCensista(nombreDeUsuario);
            document.getElementById("nombreDeUsuarioLogin").value = "";
            document.getElementById("contraseniaLogin").value = "";
            ocultarYMostrarObjLogin();
            document.getElementById("nombreCensistaH1").innerHTML += " " + nombreDeUsuario;
            console.log("login exitoso");
            console.log("Usuario logueado: " + miSistema.usuarioLogueado.nombreDeUsuario);
        } else {
            mensajeErr = "El usuario no existe o la contraseña es incorrecta";
        }
    }
    mensajes.innerHTML = mensajeErr;
}

function logout() {
    miSistema.desloguearse();
    document.getElementById("logOutBtn").style.display = "none";
    document.getElementById("censistaMenu").style.display = "none";
    document.getElementById("formInvitado").hidden = false;
    document.getElementById("formLoginBtn").style.display = "block";
    document.getElementById("formRegistroBtn").style.display = "block";
    console.log("Usuario logueado" + miSistema.usuarioLogueado);
}

function ocultarYMostrarObjLogin() {
    //muestro panel de censista logueado
    document.getElementById("censistaMenu").style.display = "block";
    //oculto formulario login
    document.getElementById("formLogin").hidden = true;
    //oculto formulario invitado ya que el censista se logueo
    document.getElementById("formInvitado").hidden = true;
    //oculto btn login y registrar ya que el censista se logueo
    document.getElementById("formLoginBtn").style.display = "none";
    document.getElementById("formRegistroBtn").style.display = "none";
    //muestro boton log out
    document.getElementById("logOutBtn").style.display = "block";
}