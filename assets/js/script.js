import { registrarGuitarra } from "./promesas.js";

window.addEventListener('load',()=>{
    document.getElementById('btnColor').addEventListener('click',cambiarColor);
    document.getElementById('btnEnviar').addEventListener('click',registroGuitarra)
    // document.getElementById('').addEventListener('click',);
});

// funcion para cambiar color de la pagina
const cambiarColor = ()=>{
    // obtengo el id de mi html
    let body = document.getElementById('colorFondo');
    // obtengo el id de mi archivo css para poder hacerle cambios 
    let fuente = document.getElementById('fuenteh1');

    // ahora valido los colores 
    if (body.style.backgroundColor === 'rgb(114, 118, 119)') {
        body.style.backgroundColor = '#222'; 
        fuente.style.color = 'white'

    } else {
        body.style.backgroundColor = 'rgb(114, 118, 119)'; 
        fuente.style.color = 'black';
    };

    // le cambio la fuente al <h1> de mi html
    fuente.style.fontSize = '50px';
};





// registrar una guitarra
const registroGuitarra = ()=>{
    // recupero el elemento 
    let eModelo = document.getElementById('modelo');
    let eCuerdas = document.getElementById('cuerdas');
    let eTrastes = document.getElementById('trastes');
    let ePuente = document.getElementById('puente');
    let eColor = document.getElementById('color');
    let eMicrofonos = document.getElementById('microfonos');
    let eFalla = document.getElementById('checboxFalla');
    let eDesteñida = document.getElementById('checboxDesteñida');
    let eDaños = document.getElementById('checboxDaños');
    let eComentarios = document.getElementById('textarea')

    // ahora recupero el valor de los elementos
    let vModelo = eModelo.value;
    let vCuerdas = eCuerdas.value;
    let vTrastes = eTrastes.value;
    let vPuente = ePuente.value;
    let vColor = eColor.value;
    let vMicrofonos = eMicrofonos.value;
    let vComentarios = eComentarios.value;

    // ahora ingreso todo a un diccionario para llevarlo a la base de datos

    let objeto = {
        modelo:vModelo,
        cuerdas:vCuerdas,
        trastes:vTrastes,
        puente:vPuente,
        color:vColor,
        microfonos:vMicrofonos,
        comentarios:vComentarios,
    };

    // verifico si los checked estan marcados para ingresarlos a mi base de datos
    // los checkbox marcados los voy añadiendo a la variable objeto para que vayan a la base de datos 
    if (eFalla.checked) {
        objeto.falla = eFalla.value;
    }
    if (eDesteñida.checked) {
        objeto.desteñida = eDesteñida.value;
    }
    if (eDaños.checked) {
        objeto.daños = eDaños.value;
    };
    // llamo a la funcion de las promesas para realizar el registro en la base de datos
    registrarGuitarra(objeto).then(()=>{
        alert('se ha registrado')

        // hago el alert para decirle al usuario que se registró con exito
    }).catch((e)=>{
        // en caso de algun error muestro el error en la consola
        console.log(e)
    });
};