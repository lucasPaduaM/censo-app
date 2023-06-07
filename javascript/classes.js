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