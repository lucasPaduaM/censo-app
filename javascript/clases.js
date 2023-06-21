class Sistema {
    constructor() {
        this.usuarios = new Array();
        this.censos = new Array();
        this.usuarioLogueado = null;
    }


    obtenerNombreCensista(idCensista){

        let nombreCensista="";
        let encontrado = false;

        for(let pos=0;pos < this.usuarios.length; pos++){

            let datoCensista = this.usuarios[pos];

            if(idCensista===datoCensista.id && !encontrado){

                encontrado=true;

                 nombreCensista+= this.usuarios[pos].nombre;

            }

        }
        return nombreCensista;
    }

   devolverCantidadDepartamentos(){

    let departamentosTotal = [];

    for(let pos=0; pos < this.censos.length;pos++){

       let datoCenso = this.censos[pos];

        if(datoCenso.validado){

            if(!departamentosTotal.includes(datoCenso.departamento)){

                departamentosTotal.push(datoCenso.departamento);

            }

        }

    }
    return departamentosTotal;
   }

    devolverOcupacionEstudian(nomDepartamento){

        let estudian=0;

        for(let pos=0; pos<this.censos.length;pos++){

            let usuarioDatos= this.censos[pos];

        if(usuarioDatos.departamento==nomDepartamento){

        if(usuarioDatos.ocupacion=="Estudiante"){

            estudian++;
            
        }
        }
    }
        return estudian;
    }


    devolverOcupacionNoTrabaja(nomDepartamento){

        let noTrabaja=0;
        
        for(let pos=0; pos<this.censos.length;pos++){

            let usuarioDatos= this.censos[pos];
        
        if(usuarioDatos.departamento==nomDepartamento)

        if(usuarioDatos.ocupacion=="noTrabaja"){

            noTrabaja++;
            
        }
        }

        return noTrabaja;
    }

    devolverOcupacionDependienteOindependiente(nomDepartamento){

        let dependienteOindependiente=0;
        
        for(let pos=0; pos<this.censos.length;pos++){

            let usuarioDatos= this.censos[pos];

        if(usuarioDatos.departamento==nomDepartamento)

        if(usuarioDatos.ocupacion=="Dependiente" || usuarioDatos.ocupacion=="Independiente"){

            dependienteOindependiente++;
            
        }
        }

        return dependienteOindependiente;
    }



    devolverCensosPendientes(){

        let retorno = new Array();

        for(let pos=0; pos<this.censos.length; pos++){

            let usuarioDatos = this.censos[pos];

            if(usuarioDatos.validado===false){

                retorno.push(usuarioDatos);
                
            }

        }
        return retorno;
    }



    devolverCantidadCensosValidados(){

        let total = 0;

        for(let pos=0; pos<this.censos.length; pos++){

            let usuarioDatos = this.censos[pos];

            if(usuarioDatos.validado){

                total++;
                
            }

        }
        return total;
    }


    devolverCantidadCensosDepartamentos(nomDepartamento){

        let total = 0;

        for(let pos=0; pos<this.censos.length; pos++){

            let usuarioDatos = this.censos[pos];

            if(usuarioDatos.validado){

                if(usuarioDatos.departamento==nomDepartamento){

                    total++

                }

            }

        }
        return total;
    }

    devolverCensosValidados(){

        let retorno = new Array();

        for(let pos=0; pos<this.censos.length; pos++){

            let usuarioDatos = this.censos[pos];

            if(usuarioDatos.validado===true){

                retorno.push(usuarioDatos);
                
            }

        }
        return retorno;
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
        this.registrarCensista("emanuel", "ema", "Ema123");

        //cargar censos
        this.agregarCenso("ferrari", "lamborghini", 25, "55743148", "Montevideo", "Estudiante", true, this.obtenerCensistaRandom());
        this.agregarCenso("joaco", "rodriguez", 55, "44319343", "Montevideo", "Estudiante", true, this.obtenerCensistaRandom());
        this.agregarCenso("pepe", "argento", 65, "55563148", "Montevideo", "Estudiante", false, this.obtenerCensistaRandom());
        this.agregarCenso("ricardo", "fort", 25, "55710148", "Montevideo", "Estudiante", false, this.obtenerCensistaRandom());
        this.agregarCenso("marcelo", "tinelli", 25, "12431489", "Montevideo", "Estudiante", false, this.obtenerCensistaRandom());
        this.agregarCenso("agustin", "ferreira", 29, "563894768", "Artigas", "noTrabaja", true, this.obtenerCensistaRandom());
        this.agregarCenso("luis", "nuñez", 19, "582364298", "Rocha", "Dependiente", true, this.obtenerCensistaRandom());
        this.agregarCenso("karen", "suarez", 39, "384602980", "Maldonado", "Independiente", true, this.obtenerCensistaRandom());
        this.agregarCenso("julieta", "ferrada", 72, "264847309", "San Jose", "noTrabaja", true, this.obtenerCensistaRandom());
        this.agregarCenso("alfonso", "kurl", 18, "523284670", "Artigas", "Estudiante", true, this.obtenerCensistaRandom());
        this.agregarCenso("nicolas", "lemos", 20, "532895647", "Salto", "noTrabaja", true, this.obtenerCensistaRandom());
        this.agregarCenso("martin", "cuello", 19, "563289467", "Salto", "Independiente", false, this.obtenerCensistaRandom());
        this.agregarCenso("mateo", "sosa", 18, "538749368", "Salto", "Dependiente", true, this.obtenerCensistaRandom());
        this.agregarCenso("rodolfo", "añuña", 25, "145394520", "Salto", "noTrabaja", true, this.obtenerCensistaRandom());
        this.agregarCenso("hugo", "gonzales", 28, "458239049", "Montevideo", "noTrabaja", false, this.obtenerCensistaRandom());
        this.agregarCenso("ezequiel", "gomez", 28, "57454432", "Maldonado", "Estudiante", true, this.obtenerCensistaRandom());
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

    obtenerTodoCensista() {

        let retorno = new Array();

        for (let pos = 0; pos < this.usuarios.length; pos++) {

                let datoCenso = this.usuarios[pos];

                retorno.push(datoCenso);

                
            
        }
        return retorno;
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

