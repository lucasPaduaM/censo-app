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
        let nuevoCensista = new Censista();

        nuevoCensista.nombre = nombre;
        nuevoCensista.nombreDeUsuario = nombreDeUsuario;
        nuevoCensista.contrasenia = contrasenia;

        if (nuevoCensista != null && this.buscarCensista(nuevoCensista.nombreDeUsuario) == null) {
            this.listaUsuarios.push(nuevoCensista);
            return true;
        } else {
            return false;
        }
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

class Persona {
    constructor() {
        this.nombre = "";
        this.apellido = "";
        this.edad = 0;
        this.ci = 0;
        this.departamento = "";
        this.ocupacion = "";
        this.censada = null;
        this.idCensista = 0;
    }
}