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

    // obtengo el id "colorFondo" de mi HTML
    let body = document.getElementById('colorFondo');

    // obtengo el id de mi archivo css para poder hacerle cambios 
    let fuente = document.getElementById('fuenteh1');

    // aqui valido los colores para poder cambiarlos 
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

// esta funcion valida los campos vacios y cambia el color del borde a rojo y manda una alerta 
const validarDatos = (vModelo, vCuerdas, vPuente) => {
    let seleccionado = true;

    // verifico si el vModelo está vacio 
    if (!vModelo) {
        // si está vacio le cambio el estilo al borde a rojo
        document.getElementById('modelo').style.border = '2px solid red';
        seleccionado = false;
    } else {
        // si no está vacio le quita el color del borde
        document.getElementById('modelo').style.border = '';
    }

    // verifico si vCuerdas está vacio
    if (!vCuerdas) {
         // si está vacio le cambio el estilo al borde a rojo
        document.getElementById('cuerdas').style.border = '2px solid red';
        seleccionado = false;
    } else {
        // si no está vacio le quita el color del borde
        document.getElementById('cuerdas').style.border = '';
    }

    // verifico si vPuente está vacio 
    if (!vPuente) {
         // si está vacio le cambio el estilo al borde a rojo
        document.getElementById('puente').style.border = '2px solid red';
        seleccionado = false;
    } else {
        // si no está vacio le quita el color del borde
        document.getElementById('puente').style.border = '';
    }

    if (!seleccionado) {
        alert('Los campos en rojo son obligatorios.');
    }
    return seleccionado
};

// esta funcion registra un elemento 
const registroGuitarra = ()=>{

    // en esta seccion recupero los elementos 
    let eModelo = document.getElementById('modelo');
    let eCuerdas = document.getElementById('cuerdas');
    let eTrastes = document.getElementById('trastes');
    let ePuente = document.getElementById('puente');
    let eColor = document.getElementById('color');
    let eMicrofonos = document.getElementById('microfonos');
    let eComentarios = document.getElementById('textarea');
    let eFalla = document.getElementById('checboxFalla');
    let eDesteñida = document.getElementById('checboxDesteñida');
    let eDaño = document.getElementById('checboxDaños');

    // teniendo los elementos ahora les doy un valor
    let vModelo = eModelo.value;
    let vCuerdas = eCuerdas.value;
    let vTrastes = eTrastes.value;
    let vPuente = ePuente.value;
    let vColor = eColor.value;
    let vMicrofonos = eMicrofonos.value;
    let vComentarios = eComentarios.value;

    // recupero los checkbox y valido si estan marcados
    let cFalla = eFalla.checked;
    let cDesteñida = eDesteñida.checked;
    let cDaño = eDaño.checked;


    // aqui valido los datos campos modelo, cuerdas y puente
    if (!validarDatos(vModelo, vCuerdas, vPuente)) {
        // aqui detengo el registro si falta algun dato
        return;
    }

    // ahora ingreso todo a un diccionario para llevarlo a la base de datos
    let objeto = {

        // aqui ingresan los inputs
        modelo:vModelo,
        cuerdas:vCuerdas,
        trastes:vTrastes,
        puente:vPuente,
        color:vColor,
        microfonos:vMicrofonos,
        comentarios:vComentarios,

        // aqui ingresan los checkbox
        falla:cFalla,
        desteñida:cDesteñida,
        daños:cDaño,
    };

    // llamo a la funcion de las promesas para realizar el registro en la base de datos
    registrarGuitarra(objeto).then(()=>{
        alert('se ha registrado una guitarra.')
        recuperarDatos(); // recupero los datos para ingresarlos a la tabla (la actualizo)
        // hago el alert para decirle al usuario que se registró con exito
    }).catch((error)=>{
        // en caso de algun error muestro el error en la consola
        console.log(error)
    });
};





// actualizar guitarras
const actualizaGuitarra = () => {
    let eModelo = document.getElementById('UPDmodelo');
    let eCuerdas = document.getElementById('UPDcuerdas');
    let eTrastes = document.getElementById('UPDtrastes');
    let ePuente = document.getElementById('UPDpuente');
    let eColor = document.getElementById('UPDcolor');
    let eMicrofonos = document.getElementById('UPDmicrofonos');
    let eFalla = document.getElementById('UPDchecboxFalla');
    let eDesteñida = document.getElementById('UPDchecboxDesteñida');
    let eDaño = document.getElementById('UPDchecboxDaños');
    let eComentarios = document.getElementById('UPDtextarea');

    // ahora recupero el valor de los elementos
    let vModelo = eModelo.value;
    let vCuerdas = eCuerdas.value;
    let vTrastes = eTrastes.value;
    let vPuente = ePuente.value;
    let vColor = eColor.value;
    let vMicrofonos = eMicrofonos.value;
    let cFalla = eFalla.checked;
    let cDesteñida = eDesteñida.checked;
    let cDaño = eDaño.checked;
    let vComentarios = eComentarios.value;

 
    // ahora ingreso todo a un diccionario para llevarlo a la base de datos
    let objeto = {

        // aqui ingresan los inputs
        modelo:vModelo,
        cuerdas:vCuerdas,
        trastes:vTrastes,
        puente:vPuente,
        color:vColor,
        microfonos:vMicrofonos,
        comentarios:vComentarios,

        // aqui ingresan los checkbox
        falla:cFalla,
        desteñida:cDesteñida,
        daños:cDaño,
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

            // operador ternario si el elemento retorna true me da "si" y si retorna false retorna "no"
            estructura += '<td>' + (g.falla ? 'si' : 'no') + '</td>';
            estructura += '<td>' + (g.desteñida ? 'si' : 'no') + '</td>';
            estructura += '<td>' + (g.daños ? 'si' : 'no') + '</td>'

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
                document.getElementById('UPDchecboxFalla').checked = g.falla;
                document.getElementById('UPDchecboxDesteñida').checked = g.desteñida;
                document.getElementById('UPDchecboxDaños').checked = g.daños;
                document.getElementById('UPDtextarea').value = g.comentarios;
                document.getElementById('btnActualizar').value = g.id;
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
