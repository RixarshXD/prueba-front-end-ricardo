import { registrarGuitarra } from "./promesas.js";

window.addEventListener('load',()=>{
    document.getElementById('btnColor').addEventListener('click',cambiarColor);
    document.getElementById('btnEnviar').addEventListener('click',registroGuitarra)
    // document.getElementById('').addEventListener('click',);
});

const cambiarColor = ()=>{
    // funcion para cambiar el color de la pagina
    const boton = document.getElementById('colorFondo');
    boton.style.backgroundColor = 'rgb(114, 118, 119)';
    // boton.style.color

    // funcion para cambiar el tamaño de la fuente
    const fuente = document.getElementById('fuenteh1');
    fuente.style.fontSize = '50px';
    fuente.style.color = 'black';
}

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
    let vFalla = eFalla.value;
    let vDesteñida = eDesteñida.value;
    let vDaños = eDaños.value;
    let vComentarios = eComentarios.value;

    // ahora ingreso todo a un diccionario para llevarlo a la base de datos

    let objeto = {
        modelo:vModelo,
        cuerdas:vCuerdas,
        trastes:vTrastes,
        puente:vPuente,
        color:vColor,
        microfonos:vMicrofonos,
        falla:vFalla,
        desteñida:vDesteñida,
        daños:vDaños,
        comentarios:vComentarios,
    };
    registrarGuitarra(objeto).then(()=>{
        alert('se ha registrado')
    }).catch((e)=>{
        console.log(e)
    });

};