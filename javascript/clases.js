class Sistema {
    constructor() {
        this.usuarios = new Array();
        this.censos = new Array();
        this.usuarioLogueado = null;
    }

    //metodo que registra censista si el mismo no existe
    registrarCensista(nombre, nombreDeUsuario, contrasenia) {
        if (this.buscarCensista(nombreDeUsuario) == undefined) {

            let nuevoCensista = new Censista(nombre, nombreDeUsuario, contrasenia);
            this.usuarios.push(nuevoCensista);

            return true;
        } else {
            return false;
        }
    }

    //metodo agregar censo
    agregarCenso(nombre, apellido, edad, ci, departamento, ocupacion, pValidado, idCensista) {

        let objPersona = new CensoPersona(nombre, apellido, edad, ci, departamento, ocupacion, pValidado, idCensista);
        if (this.buscarCi(ci)) {
            return false;
        } else {
            this.censos.push(objPersona);
            return true;
        }
    }

    //carga censistas temporalmente
    cargarDatos() {
        //cargar censistas
        this.registrarCensista("juan", "juanceto01", "Hola1234");
        this.registrarCensista("josefina", "joseff", "Hola1234");
        this.registrarCensista("enrique", "enrique9", "Hola1234");
        this.registrarCensista("gabino", "gabino20", "Hola1234");
        this.registrarCensista("luis", "luis18", "Hola1234");
        this.registrarCensista("analaura", "ana-12", "Hola1234");
        this.registrarCensista("manuel", "manuu77", "Hola1234");
        this.registrarCensista("ernesto", "erne29", "Hola1234");

        //cargar censos
        this.agregarCenso("ferrari", "lamborghini", 25, "55743148", "Montevideo", "Estudiante", true, this.obtenerCensistaRandom());
        this.agregarCenso("joaco", "rodriguez", 55, "44319343", "Montevideo", "Estudiante", false, this.obtenerCensistaRandom());
        this.agregarCenso("pepe", "argento", 65, "55563148", "Montevideo", "Estudiante", false, this.obtenerCensistaRandom());
        this.agregarCenso("ricardo", "fort", 25, "55710148", "Montevideo", "Estudiante", false, this.obtenerCensistaRandom());
        this.agregarCenso("marcelo", "tinelli", 25, "12431489", "Montevideo", "Estudiante", false, this.obtenerCensistaRandom());

    }

    //metodo que loguea censista existente
    loguearCensista(nombreDeUsuario, contrasenia) {

        let censistaTemp = new Censista("", nombreDeUsuario, contrasenia);
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

    //metodo que busca si existe o no una cedula recibida por parametro y retorna un booleano dependiendo si la encuentra o no
    buscarCi(personaCedula) {
        let encontrado = false;
        for (let pos = 0; pos < this.censos.length && !encontrado; pos++) {
            if (personaCedula == this.censos[pos].ci) {
                encontrado = true;
                return encontrado;
            }
        }
    }

    //metodo que retorna el id de un censita al azar
    obtenerCensistaRandom() {
        return this.usuarios[(Math.floor(Math.random() * this.usuarios.length))].id;
    }

    obtenerCenso(cedula) {
        for (let i = 0; i < this.censos.length; i++) {
            if (this.censos[i].ci === cedula) {
                let censoTemp = this.censos[i];
                return censoTemp;
            }
        }
    }

    //metodo que busca censista por nombre de usuario y retorna un booleano dependiendo de si este existe o no
    buscarCensista(nombreDeUsuario) {
        let encontrado = false;
        for (let i = 0; i < this.usuarios.length && !encontrado; i++) {
            if (nombreDeUsuario === this.usuarios[i].nombreDeUsuario) {
                let censistaTemp = this.usuarios[i];
                encontrado = true;
                return censistaTemp;
            }
        }
    }

    verificarValidacionCenso(cedula) {
        let valido = false;
        for (let i = 0; i < this.censos.length && !valido; i++) {
            if (this.censos[i].ci === cedula && this.censos[i].validado == true) {
                valido = true;
            }
        }
        return valido;
    }

    modificarCenso(nuevoNombre, nuevoApellido, nuevaEdad, ciAntigua, nuevaCi, nuevoDepartamento, nuevaOcupacion) {
        let actualizado = false;
        for (let i = 0; i < this.censos.length && !actualizado; i++) {
            if (this.censos[i].ci === ciAntigua) {
                this.censos[i].nombre = nuevoNombre;
                this.censos[i].apellido = nuevoApellido;
                this.censos[i].edad = nuevaEdad;
                this.censos[i].ci = nuevaCi;
                this.censos[i].departamento = nuevoDepartamento;
                this.censos[i].ocupacion = nuevaOcupacion;
                actualizado = true;
            }
        }
        return actualizado;
    }

    //metodo que desloguea al usuario anteriormente logueado
    desloguearse() {
        this.usuarioLogueado = null;
    }

    //metodo que elimina caracteres especiales de la cedula
    eliminarCaracteres(ciPersona) {
        let nuevoString = "";
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

    eliminarCenso(cedula) {
        let eliminado = false;
        for (let i = 0; i < this.censos.length && !eliminado; i++) {
            if (this.censos[i].ci === cedula) {
                this.censos.splice(i, 1);
                eliminado = true;
            }
        }
        return eliminado;
    }
}
let id = 0;
class Censista {
    constructor(pNombre, pNombreDeUsuario, pContrasenia) {
        this.nombre = pNombre;
        this.nombreDeUsuario = pNombreDeUsuario;
        this.contrasenia = pContrasenia;
        this.id = id++;
    }
}

class CensoPersona {
    constructor(pNombre, pApellido, pEdad, pCi, pDepartamento, pOcupacion, pValidado, cId) {
        this.nombre = pNombre;
        this.apellido = pApellido;
        this.edad = pEdad;
        this.ci = pCi;
        this.departamento = pDepartamento;
        this.ocupacion = pOcupacion;
        this.validado = pValidado;
        this.idCensista = cId;
    }
}