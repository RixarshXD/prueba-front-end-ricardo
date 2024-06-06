import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
import { db } from "./firebase.js"


// registrar un documento en mi base de datos
export const registrarGuitarra = async(guitarras)=>{
    console.log(guitarras)
    const docRef = await addDoc(collection(db,'guitarras'),guitarras);
};

// obtener los registros de la base de datos 
export const obtenerGuitarras = async ()=>{
    const ref = collection(db,'guitarras');
    const querySnapshot = await getDocs(ref);

    let guitarras = []
    querySnapshot.forEach((doc) => {
        guitarras.push({...doc.data(), id:doc.id})
    }); 
    return guitarras
};
      
// se crea la funcion para actualizar los datos 
export const actualizarGuitarra = async(guitarras,id) => {
    const referencia = doc(db, 'guitarras', id);
    await updateDoc(referencia,guitarras)
};


// eliminar datos registrados
export const eliminarGuitarra = async(id) => {
    const referencia = doc(db, 'guitarras', id);
    await deleteDoc(referencia);
};
