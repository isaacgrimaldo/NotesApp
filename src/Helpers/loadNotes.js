import { db } from "../firebase/firebaseCongif"


export const  loadNotes = async(id) =>{
       
    //se hace una peticion a firebase par optener la infromacion con el id del usuario y la apuntacion a la coleccion de la base de datos
   const getNotes  = await  db.collection(`${id}/jourlnal/notes`).get();
   const note = []; 
  
   // se le integran los valores al array
        getNotes.forEach(GetNotasArray => {
             note.push({
                 id: GetNotasArray.id,
                 ...GetNotasArray.data(),
             })
        })
   return note;
}


export const verificacionSave = async(noteId , userId) =>{
   
     let verific = false;
     const req=   await db.doc(`/${userId}/jourlnal/notes/${noteId}`).get()
     const Data =  req.data();


     if( !Data.body && !Data.title){
           verific = false;
     }else{
           verific = true;
     }

     return verific;

}