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
        this.censos = new Array();
        this.censosPendientes = new Array();
        this.usuarioLogueado = null;
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

    ingresarCenso(){
        
    }
}
class Censista {
    static idCensista = 0;
    constructor() {
        Censista.idCensista++;
        this.nombre = "";
        this.nombreDeUsuario = "";
        this.contrasenia = "";
        this.id = Censista.idCensista;
    }
}

class CensoPersona {
    constructor() {
        this.nombre = "";
        this.apellido = "";
        this.edad = 0;
        this.ci = 0;
        this.departamento = "";
        this.ocupacion = "";
        this.validado = null;
        this.idCensista = 0;
    }
}