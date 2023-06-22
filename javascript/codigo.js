window.addEventListener("load", inicio);
let miSistema = new Sistema();

function inicio() {
    miSistema.cargarDatos();
    document.getElementById("registrarCensista").addEventListener("click", registrar);
    document.getElementById("loguearCensista").addEventListener("click", login);
    document.getElementById("formRegistroBtn").addEventListener("click", ocultarMostrarRegistro);
    document.getElementById("formLoginBtn").addEventListener("click", ocultarMostrarLogin);
    document.getElementById("logOutBtn").addEventListener("click", logout);
    document.getElementById("agregarCensado").addEventListener("click", agregarCenso);
    document.getElementById("buscarCensoInvitado").addEventListener("click", formInvitado);
    document.getElementById("btnModCensoInvitado").addEventListener("click", cargarModificarCenso);
    document.getElementById("ModificarCensista").addEventListener("click", modificarCenso);
    document.getElementById("eliminarCensoInvitado").addEventListener("click", deseaEliminarCenso);
    document.getElementById("btnConfirmarEliminarCenso").addEventListener("click", eliminarCenso);
    document.querySelector("#btnListarCensos").addEventListener("click", listarCensosValidos);
    document.querySelector("#btnBuscarVerificarCenso").addEventListener("click", formBuscarCiValidacion);
    document.querySelector("#buscarCensoMenuCensista").addEventListener("click", formBuscarCiValidacion);
    document.querySelector("#btnVerCenso").addEventListener("click", formVerificarCenso);
    document.querySelector("#btnAgregarCenso").addEventListener("click", agregarCenso);
    document.querySelector("#verEstadisticas").addEventListener("click", listarEstadisticas);
    document.querySelector("#btnCambiarCensista").addEventListener("click", cargarDatoSelectCensistas);
    document.querySelector("#btnDestinoMenuModificar").addEventListener("click", cargarDatoSelectUsuarios);
    document.querySelector("#btnDestinoCambiarCensista").addEventListener("click", cambiarCensistaDeCenso);
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
                    console.log("Usuario ingresado: " + miSistema.usuarios[miSistema.usuarios.length - 1].nombreDeUsuario);
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
    setTimeout(() => (resultado.innerHTML = ""), 4000);
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
    let mensaje = "";
    let resultado = document.getElementById("mensajesLogin");
    let flag = false;

    let respuesta = miSistema.loguearCensista(nombreDeUsuario, contraseniaCensista);

    if (nombreDeUsuario == "") {
        mensaje = "El nombre de usuario no puede estar vacio";
    } else if (contraseniaCensista == "") {
        mensaje = "La contraseña no puede estar vacia";
    } else {
        if (respuesta) {
            miSistema.usuarioLogueado = miSistema.buscarCensista(nombreDeUsuario);
            mensaje = "Login exitoso";
            console.log(miSistema.usuarioLogueado);
            flag = true;
            document.getElementById("nombreCensistaH1").innerHTML += miSistema.usuarioLogueado.nombreDeUsuario;
        } else {
            mensaje = "El usuario no existe o la contraseña es incorrecta";
        }
    }
    resultado.innerHTML = mensaje;
    if (flag) {
        document.getElementById("nombreDeUsuarioLogin").value = "";
        document.getElementById("contraseniaLogin").value = "";
        setTimeout(ocultarYMostrarObjLogin, 2400);
    }
    setTimeout(() => (resultado.innerHTML = ""), 4000);
}

function logout() {
    miSistema.desloguearse();
    document.getElementById("logOutBtn").style.display = "none";
    document.getElementById("censistaMenu").style.display = "none";
    document.getElementById("formInvitado").hidden = false;
    document.getElementById("formLoginBtn").style.display = "block";
    document.getElementById("formRegistroBtn").style.display = "block";
    console.log("Usuario logueado: " + miSistema.usuarioLogueado);
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
    //vacio mensajes login
    document.getElementById("mensajesLogin").innerHTML = "";
}

function agregarCenso() {

    document.querySelector("#formAgregarCenso").style.display = "block";

    let nombrePersona = document.getElementById("nombrePersona").value;
    let apellidoPersona = document.getElementById("apellidoPersona").value;
    let edadPersona = Number(document.getElementById("edadPersona").value);
    let ciPersona = document.getElementById("ciPersona").value;
    let selectorDepartamento = document.getElementById("selectDepartamentoAgregar").value;
    let selectorOcupacion = document.getElementById("selectOcupacionAgregar").value;
    let resultado = document.getElementById("mensajesAgregar");
    let mensaje = "";

    //variables de validaciones:
    let cumpleNombre = false;
    let cumpleApellido = false;
    let cumpleEdad = false;
    let ciLimpia = miSistema.eliminarCaracteres(ciPersona);

    //validaciones de parametros vacios
    if (nombrePersona == "") {
        mensaje = "El nombre no puede estar vacio";
    } else if (apellidoPersona == "") {
        mensaje = "El apellido no puede estar vacio";
    } else if (edadPersona == 0) {
        mensaje = "La edad no puede estar vacia";
    } else if (ciPersona == "") {
        mensaje = "La cedula no puede estar vacia";
    } else {
        //edad: valor entre 0 y 130
        if (edadPersona < 130 && edadPersona > 0) {
            cumpleEdad = true;
        } else {
            mensaje = "Edad no valida"
        }
        //verifcar que el apellido no tenga numeros
        for (let pos = 0; pos < apellidoPersona.length; pos++) {
            if (!isNaN(apellidoPersona[pos])) {
                mensaje = "Apellido no valido";
            } else {
                cumpleApellido = true;
            }
        }
        //verifcar que el nombre no tenga numeros
        for (let pos = 0; pos < nombrePersona.length; pos++) {
            if (!isNaN(nombrePersona[pos])) {
                mensaje = "Nombre no valido";
            } else {
                cumpleNombre = true;
            }
        }

        if (cumpleNombre && cumpleApellido && cumpleEdad) {
            if (miSistema.usuarioLogueado != null) {
                let datos = miSistema.agregarCenso(nombrePersona, apellidoPersona, edadPersona, ciLimpia, selectorDepartamento, selectorOcupacion, true, miSistema.usuarioLogueado.id);
                //limpio cajas de texto y muestro mensaje de ingreso. 
                if (datos) {
                    nombrePersona = document.getElementById("nombrePersona").value = "";
                    apellidoPersona = document.getElementById("apellidoPersona").value = "";
                    edadPersona = document.getElementById("edadPersona").value = "";
                    ciPersona = document.getElementById("ciPersona").value = "";
                    //muestro mensaje.
                    mensaje = "Censo cargado y asignado al censita logueado";
                } else {
                    mensaje = "Ya existe un censo ingresado con la cedula proporcionada";
                }
            } else {
                idCensitaRandom = miSistema.obtenerCensistaRandom();
                let datos = miSistema.agregarCenso(nombrePersona, apellidoPersona, edadPersona, ciLimpia, selectorDepartamento, selectorOcupacion, false, idCensitaRandom);
                //limpio cajas de texto y muestro mensaje de ingreso. 
                if (datos) {
                    nombrePersona = document.getElementById("nombrePersona").value = "";
                    apellidoPersona = document.getElementById("apellidoPersona").value = "";
                    edadPersona = document.getElementById("edadPersona").value = "";
                    ciPersona = document.getElementById("ciPersona").value = "";
                    //muestro mensaje.
                    mensaje = "Pre censo cargado y asignado a un censita";
                } else {
                    mensaje = "Ya existe un censo ingresado con la cedula proporcionada";
                }
            }
        }
    }
    resultado.innerHTML = mensaje;
    setTimeout(() => (resultado.innerHTML = ""), 4000);
}

function formInvitado() {
    let resultado = document.getElementById("mensajesFormInvitado");
    let ciInvitado = document.getElementById("ciInvitado").value;
    let mensaje = "";
    let respuesta = miSistema.buscarCi(ciInvitado);

    if (ciInvitado == "") {
        mensaje = "Ingrese una cedula";
    } else if (miSistema.verificarValidacionCenso(ciInvitado)) {
        mensaje = "Usted ya ha sido censado";
        document.getElementById("btnsFormInvitado").hidden = true;
    } else if (respuesta && !miSistema.verificarValidacionCenso(ciInvitado)) {
        mensaje = "Ya existe un censo ingresado con la respectiva cedula";
        document.getElementById("formAgregarCenso").hidden = true;
        document.getElementById("btnsFormInvitado").hidden = false;
    } else {
        mensaje = "Usted puede realizar el pre censo"
        document.getElementById("btnsFormInvitado").hidden = true;
        document.getElementById("formAgregarCenso").hidden = false;
    }
    resultado.innerHTML = mensaje;
}

function cargarModificarCenso() {
    document.getElementById("formModificarCenso").hidden = false;
    let ciInvitado = document.getElementById("ciInvitado").value;
    let censoTemp = miSistema.obtenerCenso(ciInvitado);
    let selectDepto = document.getElementById("selectDepartamentoMod");
    let selectOcu = document.getElementById("selectOcupacionMod");

    document.getElementById("nombrePersonaMod").value = censoTemp.nombre;
    document.getElementById("apellidoPersonaMod").value = censoTemp.apellido;
    document.getElementById("edadPersonaMod").value = censoTemp.edad;
    document.getElementById("ciPersonaMod").value = censoTemp.ci;
    selectDepto.value = censoTemp.departamento;
    selectOcu.value = censoTemp.ocupacion;

}

function modificarCenso() {

    let nuevoNombre = document.getElementById("nombrePersonaMod").value;
    let nuevoApellido = document.getElementById("apellidoPersonaMod").value;
    let nuevaEdad = Number(document.getElementById("edadPersonaMod").value);
    let ciInvitado = document.getElementById("ciInvitado").value;
    let nuevaCi = document.getElementById("ciPersonaMod").value;
    let nuevoDepartamento = document.getElementById("selectDepartamentoMod").value;;
    let nuevaOcupacion = document.getElementById("selectOcupacionMod").value;
    let resultado = document.getElementById("mensajesModificar");
    let mensaje = "";

    //variables de validaciones:
    let cumpleNombre = false;
    let cumpleApellido = false;
    let cumpleEdad = false;
    let ciLimpia = miSistema.eliminarCaracteres(nuevaCi);

    //validaciones de parametros vacios
    if (nuevoNombre == "") {
        mensaje = "El nombre no puede estar vacio";
    } else if (nuevoApellido == "") {
        mensaje = "El apellido no puede estar vacio";
    } else if (nuevaEdad == 0) {
        mensaje = "La edad no puede estar vacia";
    } else if (nuevaCi == "") {
        mensaje = "La cedula no puede estar vacia";
    } else {
        //edad: valor entre 0 y 130
        if (nuevaEdad < 130 && nuevaEdad > 0) {
            cumpleEdad = true;
        } else {
            mensaje = "Edad no valida"
        }
        //verifcar que el apellido no tenga numeros
        for (let pos = 0; pos < nuevoApellido.length; pos++) {
            if (!isNaN(nuevoApellido[pos])) {
                mensaje = "Apellido no valido";
            } else {
                cumpleApellido = true;
            }
        }
        //verifcar que el nombre no tenga numeros
        for (let pos = 0; pos < nuevoNombre.length; pos++) {
            if (!isNaN(nuevoNombre[pos])) {
                mensaje = "Nombre no valido";
            } else {
                cumpleNombre = true;
            }
        }

        if (cumpleNombre && cumpleApellido && cumpleEdad) {
            let datos = miSistema.modificarCenso(nuevoNombre, nuevoApellido, nuevaEdad, ciInvitado, ciLimpia, nuevoDepartamento, nuevaOcupacion);
            //limpio cajas de texto y muestro mensaje de ingreso. 
            if (datos) {
                nuevoNombre = document.getElementById("nombrePersonaMod").value = "";
                nuevoApellido = document.getElementById("apellidoPersonaMod").value = "";
                nuevaEdad = document.getElementById("edadPersonaMod").value = "";
                nuevaCi = document.getElementById("ciPersonaMod").value = "";
                //muestro mensaje.
                mensaje = "Censo actualizado";
            }
        }
    }
    resultado.innerHTML = mensaje;
}
function deseaEliminarCenso() {
    document.getElementById("btnConfirmarEliminarCenso").hidden = false;
}

function eliminarCenso() {
    let ciInvitado = document.getElementById("ciInvitado").value;
    let respuesta = miSistema.eliminarCenso(ciInvitado);
    let resultado = document.getElementById("mensajesFormInvitado");
    let mensajes = "";
    if (respuesta) {
        mensajes = "Censo eliminado correctamente";
    } else {
        mensajes = "El censo no existe";
    }
    resultado.innerHTML = mensajes;
}

function listarCensosValidos(){

let tablaHTML ="<table>";

tablaHTML+="<tr><th>N° Censo</th><th>Cedula</th><th>Nombre</th><th>Apellido</th><th>Edad</th><th>Departamento</th><th>Censista a cargo</th>";

let lista = miSistema.devolverCensosValidados();

for (let pos=0; pos < lista.length; pos++){

    let idCensista= lista[pos].idCensista;

    let usuarioDatos = lista[pos];

    tablaHTML+=`<tr><td>${pos}</td><td>${usuarioDatos.ci}</td><td>${usuarioDatos.nombre}</td><td>${usuarioDatos.apellido}</td><td>${usuarioDatos.edad}</td><td>${usuarioDatos.departamento}</td><td>${miSistema.obtenerNombreCensista(idCensista)}</td>`;

}

document.querySelector("#mensajeCensosPendientes").innerHTML = tablaHTML;

document.querySelector("#listaCensosPendientes").style.display = "block";


}


function formBuscarCiValidacion() {
    
    document.querySelector("#formBuscarCiValidacion").style.display="block";

    let resultado = document.getElementById("mensajesFormBuscarCenso");
    let ciInvitado = document.getElementById("ciBuscar").value;
    let mensaje = "";
    let respuesta = miSistema.buscarCi(ciInvitado);

    if (ciInvitado == "") {
        mensaje = "Ingrese una cedula";
    } else if (respuesta && miSistema.verificarValidacionCenso(ciInvitado)) {
        mensaje = "El censo correspondiente al documento ya fue validado!";
        document.getElementById("formAgregarCenso").hidden = true;
        document.getElementById("btnsFormBuscarCiValidacion").hidden = true;
    } else {
       
        mensaje = "Censo sin validar!"
        document.getElementById("btnsFormBuscarCiValidacion").hidden = false;
        
    }
    resultado.innerHTML = mensaje;
}


function listarEstadisticas(){

    let tablaHTML =`<table id="tabla-estadisticasIndex">`;

    tablaHTML+="<tr><th>Departamento</th><th>Estudian</th><th>No Trabajan</th><th>Dependientes o independientes</th><th>Porcentaje total de censados</th>";
    
    let listaDepartamentos = miSistema.devolverCantidadDepartamentos();

    

    for (let pos=0; pos < listaDepartamentos.length; pos++){

        let unDepartamento = listaDepartamentos[pos];

        let totalCensoDepto= miSistema.devolverCantidadCensosDepartamentos(unDepartamento);

        let totalCensosApp= miSistema.devolverCantidadCensosValidados();

        let porcentaje =totalCensoDepto*100/totalCensosApp;

        tablaHTML+=`<tr><td>${unDepartamento}</td><td>${miSistema.devolverOcupacionEstudian(unDepartamento)}</td><td>${miSistema.devolverOcupacionNoTrabaja(unDepartamento)}</td><td>${miSistema.devolverOcupacionDependienteOindependiente(unDepartamento)}</td><td>${porcentaje.toFixed(2)}</td>`;
    
    }
    
    document.querySelector("#mensajeEstadisticasCenso").innerHTML = tablaHTML;

}


function formVerificarCenso(cedula){
    

    document.querySelector("#formVerificarCenso").style.display="block";

    let tablaHTML ="<table>";

    let posCenso= miSistema.obtenerCenso(cedula);

    let datosCenso= miSistema.censos[posCenso];

    tablaHTML+="<tr><th>Cedula</th><th>Nombre</th><th>Apellido</th><th>Edad</th><th>Ocupacion</th><th>Departamento</th>";

    tablaHTML+=`<tr><td>${datosCenso.ci}</td><td>${datosCenso.nombre}</td><td>${datosCenso.apellido}</td><td>${datosCenso.edad}</td><td>${datosCenso.ocupacion}</td><td>${datosCenso.departamento}</td>`;

    document.querySelector("#mensajeDatosCenso").innerHTML = tablaHTML;
}


function comboDesplegableParaCambio(){

let comboCensista = "<select>";

let datosCensista = miSistema.obtenerTodoCensista();

//iteracion para comboCensista
for(let pos=0; pos<datosCensista.length;pos++){

let datoPos = datosCensista[pos];

comboCensista += `<option value="${datoPos.id}">${datoPos.nombre}</option>`;

}
document.querySelector("#mensajeCambiarDeCenso").innerHTML= comboCensista;

return comboCensista;
}


function listarDatosParaModificarCensista(){

    document.querySelector("#mnuCambiarDeCensista").style.display="block";

    document.querySelector("#listaCensosPendientes").style.display="none";

    let tablaHTML ="<table>";

tablaHTML+="<tr><th>Cedula</th><th>Nombre</th><th>Apellido</th><th>Edad</th><th>Departamento</th>";

let lista = miSistema.devolverCensoSeleccionado();

for (let pos=0; pos < lista.length; pos++){

    let idCensista= lista[pos].idCensista;

    let usuarioDato = lista[pos];

    tablaHTML+=`<tr><td>${usuarioDato.ci}</td><td>${usuarioDato.nombre}</td><td>${usuarioDato.apellido}</td><td>${usuarioDato.edad}</td><td>${usuarioDato.departamento}</td>`;

}

document.querySelector("#mensajeCambiarDeCenso").innerHTML = tablaHTML;

}


function cambiarCensistaDeCenso(){


let datosDelCenso = document.querySelector("#selListaCensos").value;

cargarDatoSelectCensistas("selListaCensos");
            let censoTemp = miSistema.obtenerCenso(); 
            let posCenso = miSistema.obtenerCenso(censoTemp.ci);
            document.querySelector("#selListaCensos").selectedIndex = posCenso;
            
}




function cargarDatoSelectCensistas() {

    listarCensosValidos();

    let miSelector = document.querySelector("#selListaCensos");

    miSelector.innerHTML = "";

    let datosPersona = miSistema.devolverCensosValidados();

    for(let pos=0; pos < datosPersona.length; pos++){
    
    let unCenso= datosPersona[pos];

    miSelector.innerHTML += `<option value="${pos}">N°${pos} | ${unCenso.nombre}</option>`



    
    }

    

}

function cargarDatoSelectUsuarios() {

    listarDatosParaModificarCensista();

    let miSelector = document.querySelector("#selListaUsuarios");

    miSelector.innerHTML = "";

    let datosUsuarios = miSistema.usuarios;

    for(let pos=0; pos < datosUsuarios.length; pos++){
    
    let unUsuario= datosUsuarios[pos];

    miSelector.innerHTML += `<option value="${pos}">N°${pos} | ${unUsuario.nombre}</option>`



    
    }

    

}
