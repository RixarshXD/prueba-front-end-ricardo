import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
import { db } from "./firebase.js"


// registrar un documento en mi base de datos
export const registrarGuitarra = async(guitarras)=>{
    console.log(guitarras)
    const docRef = await addDoc(collection(db,'guitarras'),guitarras);
}