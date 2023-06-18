/*
PARA AGREGAR LISTA GENEROS

let UltimoCodigoGenero=1;

class Genero{

constructor(pNombre, pDescripcion){

    this.nombre=pNombre;
    this.descripcion=pDescripcion;
    this.codigo=UltimoCodigoGenero; -> le asigno como codigo el valor actual
    UltimoCodigoGenero ++; -> incremento el contador
}
}

EN CLASE SISTEMA:

class sistema{

    constructor(){

        this.listaGeneros=new Array();

    }

    agregarGenero(pNombre, pDescripcion){

        let unGenero=new Genero(pNombre, pDescripcion),
        this.listaGeneros.push(unGenero);

    }

}

*/

class Sistema {
    constructor() {
        this.listaUsuarios = new Array();
        this.listaCensoPersona = new Array();
        this.censos = new Array();
        this.censosPendientes = new Array();
        this.usuarioLogueado = null;
    }

    agregarCenso(pNombre, pApellido, pEdad, pCi, pDepartamento, pOcupacion, cId) {

        let objPersona = new CensoPersona(pNombre, pApellido, pEdad, pCi, pDepartamento, pOcupacion, cId);
        if (this.buscarCedula(pCi)) {
            this.listaCensoPersona.push(objPersona);
        }
    }

    buscarCi(personaCedula) {

        let encontrado = false;

        for (let pos = 0; pos < this.listaCensoPersona.length && !encontrado; pos++) {

            if (personaCedula == this.listaCensoPersona[pos].pCi) {

                encontrado = true;

                return encontrado;
            }

        }

    }

    eliminarCaracteres(ciPersona) {

        let nuevoString = " ";

        let caracteresEspeciales = "!@#$%^&*()_+=[{};':\"\\|,.<>/?-";

        for (let pos = 0; pos < ciPersona.length; pos++) {

            let caracter = ciPersona.charAt(pos);

            if (caracteresEspeciales.indexOf(caracter) === -1) {

                // indexOf() con === -1 para verificar si es un caracter especial.
                // Retorna -1 si no encuentra caracteres especiales.
                //Armo nuevo string con string limpio.

                nuevoString += caracter;

            }

        }
        return nuevoString;
    }

    registrarCensista(nombre, nombreDeUsuario, contrasenia) {
        if (this.buscarCensista(nombreDeUsuario) == undefined) {

            let nuevoCensista = new Censista();
            nuevoCensista.nombre = nombre;
            nuevoCensista.nombreDeUsuario = nombreDeUsuario;
            nuevoCensista.contrasenia = contrasenia;

            this.listaUsuarios.push(nuevoCensista);

            return true;
        } else {
            return false;
        }
    }

    loguearCensista(nombreDeUsuario, contrasenia) {
        let censistaTemp = new Censista();

        censistaTemp.nombreDeUsuario = nombreDeUsuario;
        censistaTemp.contrasenia = contrasenia;
        0
        let censistaBD = this.buscarCensista(censistaTemp.nombreDeUsuario);

        if (censistaBD != null) {
            if (censistaBD.contrasenia === censistaTemp.contrasenia) {
                this.usuarioLogueado = censistaTemp;
                return true;
            }
        } else {
            return false;
        }
    }

    desloguearse() {
        this.usuarioLogueado = null;
    }

    buscarCensista(nombreDeUsuario) {
        let encontrado = false;
        for (let i = 0; i < this.listaUsuarios.length && !encontrado; i++) {
            if (nombreDeUsuario === this.listaUsuarios[i].nombreDeUsuario) {
                let censistaTemp = this.listaUsuarios[i];
                encontrado = true;
                return censistaTemp;
            }
        }
    }

    cargarCensistas() {
        this.registrarCensista("juan", "juanceto01", "Hola1234");
        this.registrarCensista("josefina", "josefina02", "Hola1234");
    }

    ingresarCenso() {

    }
}
let id = 0;
class Censista {
    constructor() {
        this.nombre = "";
        this.nombreDeUsuario = "";
        this.contrasenia = "";
        this.id = id++;
    }
}

class CensoPersona {
    constructor(pNombre, pApellido, pEdad, pCi, pDepartamento, pOcupacion, cId) {
        this.nombre = pNombre;
        this.apellido = pApellido;
        this.edad = pEdad;
        this.ci = pCi;
        this.departamento = pDepartamento;
        this.ocupacion = pOcupacion;
        this.validado = null;
        this.idCensista = cId;
    }
}