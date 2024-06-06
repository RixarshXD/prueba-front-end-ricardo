import { actualizarGuitarra, eliminarGuitarra, obtenerGuitarras, registrarGuitarra } from "./promesas.js";

window.addEventListener('load',()=>{
    document.getElementById('btnColor').addEventListener('click',cambiarColor);
    document.getElementById('btnEnviar').addEventListener('click',registroGuitarra);
    recuperarDatos();
    document.getElementById('btnActualizar').addEventListener('click',actualizaGuitarra);
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
        recuperarDatos(); // recupero los datos para ingresarlos a la tabla (la actualizo)

        // hago el alert para decirle al usuario que se registró con exito
    }).catch((error)=>{
        // en caso de algun error muestro el error en la consola
        console.log(error)
    });
};


// actualizar guitarras
const actualizaGuitarra = () => {
    let eModelo = document.getElementById('modelo');
    let eCuerdas = document.getElementById('cuerdas');
    let eTrastes = document.getElementById('trastes');
    let ePuente = document.getElementById('puente');
    let eColor = document.getElementById('color');
    let eMicrofonos = document.getElementById('microfonos');
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

    let id = document.getElementById('btnActualizar').value;
    actualizarGuitarra(objeto,id).then(() => {
        alert('se ha actualizado la guitarra');
        recuperarDatos();
    }).catch((error) => {
        console.log(error)
    });
};

// traer los datos de la base datos para mostrarlos
const recuperarDatos = () => {
    obtenerGuitarras().then((guitarra) => {
        let estructura = '';
        console.log(guitarra);

        // genero la estructura para el html
        guitarra.forEach((g) => {
            estructura += '</tr>'
            estructura += '<td>'+g.modelo+'</td>';
            estructura += '<td>'+g.cuerdas+'</td>';
            estructura += '<td>'+g.trastes+'</td>';
            estructura += '<td>'+g.puente+'</td>';
            estructura += '<td>'+g.color+'</td>';
            estructura += '<td>'+g.microfonos+'</td>';
            estructura += '<td>'+g.falla+'</td>';
            estructura += '<td>'+g.desteñida+'</td>';
            estructura += '<td>'+g.daños+'</td>';
            estructura += '<td>'+g.comentarios+'</td>';

            // genero botones de actualizar y eliminar para los registros en la tabla 
            estructura += '<td><button id="UPD'+g.id+'">Actualizar</button></td>';
            estructura += '<td><button id="DEL'+g.id+'">Eliminar</button></td>';
            estructura += '</tr>';
        });
        // muestro la estructura en la consola
        console.log(estructura);
        // inserto la estructura en el html
        document.getElementById('tbGuitarras').innerHTML = estructura
        guitarra.forEach((g) => {
            let elemento = document.getElementById('UPD'+g.id);
            elemento.addEventListener('click', () => {

                document.getElementById('UPDmodelo').value = g.modelo;
                document.getElementById('UPDcuerdas').value = g.cuerdas;
                document.getElementById('UPDtrastes').value = g.trastes;
                document.getElementById('UPDpuente').value = g.puente;
                document.getElementById('UPDcolor').value = g.color;
                document.getElementById('UPDmicrofonos').value = g.microfonos;
                document.getElementById('UPDchecboxFalla').value = g.falla;
                document.getElementById('UPDchecboxDesteñida').value = g.desteñida;
                document.getElementById('UPDchecboxDaños').value = g.daños;
                document.getElementById('UPDcomentarios').value = g.comentarios;
            });
            let eliminarElemento = document.getElementById('DEL'+g.id);
            eliminarElemento.addEventListener('click', () => {
                eliminar(g.id);
            });
        });
    }).catch((error) => {
        console.log(error)
    })
};

// eliminacion de las guitarras
const eliminar = (id) => {
    eliminarGuitarra(id).then(() => {
        alert('Se eliminó la guitarra correctamente');
        recuperarDatos(); // Actualizar la tabla después de eliminar
    }).catch((error) => {
        console.log(error);
    });
};
