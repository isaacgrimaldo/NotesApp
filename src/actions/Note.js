import Swal from "sweetalert2";
import { db } from "../firebase/firebaseCongif";
import { loadNotes } from "../Helpers/loadNotes";
import { loadNewFiles } from "../Helpers/uploadFile";
import { types } from "../Types/types";

export const newNote = () => {
      
    //cuando se le llama al dispatch este tiene 2 argumentos que envia  1. el dispach , 2. El store 
     return async (dispatch , getState) =>{
            
         const {id} = getState().Auth
         
         const NewNote = {
             title:'',
             body:'',
             date: new Date().getTime(),
         };

            await  db.collection(`${id}/jourlnal/notes`).add(NewNote)
                .then( async(res) => {
                    Swal.fire('Nueva nota', 'se creo una nueva nota', 'info')  
                    dispatch(activeNote(res.id, NewNote ))
                    const showNewNote = await loadNotes(id);
                    dispatch( setNotes(showNewNote));
                } )
     } 
};

export const activeNote = ( id , note) => ({
    
    type:types.activeNote,
    payload:{
        id,
        ...note
    }

});



//optencion de nota de fire base
export const arrayGetNote = (id) => {
    return async (dispatch) => {
       
        const notes =  await loadNotes(id);
        dispatch(setNotes(notes));
    }
}



// Control de muestra de notas en el state
export const setNotes = (notes) => {
    return {
      type:types.setAllNotes,
      payload: notes,
    } 
};


//guarda las los cambio de las notas 
export const saveNote = (note) => {
    return async (dispatch , getState ) => {
        
    if(!note.url) {
        delete note.url
    }
        const { id } = getState().Auth
        const noteToFirestore = {...note};
        delete noteToFirestore.id;
                                                  //actulizar componentes
        await db.doc(`${id}/jourlnal/notes/${note.id}`).update(noteToFirestore)
        
        Swal.fire('Guardado','Se guradaron correctamnete los datos', 'success');
        dispatch( updateNote( note.id , note));
    }
}

export const updateNote = (id ,  note) => {
    return {
        type:types.updateNote,
        payload:{
           id, 
            note:{
                ...note,
                id,
            }
        }
    }

};


//no se crea una nueva tarea si la pasada esta sin guardar 
export const beforeSaveData = () => {
    return{
        type:types.ErrorSavedata,
        payload: true,
    }
}


//vuelve a habilitar el boton de crear una nueva nota 
export const afertSaveData = () => {
    return{
        type:types.ErrorSavedata,
        payload: false,
    }
}

export const UploadNewPiture = (file) =>{
   return async (dispatch  ,  getState) =>{
         
      const {active:note} = getState().Notes;
      

      Swal.fire({
           title:'Subiendo...',
           text:'subiendo la imagen',
           allowEnterKey: false,
           onBeforeOpen: () =>{
               Swal.showLoading();
           }
       });

      const cloutlynUrl = await loadNewFiles(file);
      note.url = cloutlynUrl;  
      dispatch(activeNote(note.id , note));

      Swal.close();

   }
}


//borrar notas 
export const deletNote = (idNote) => {
    return  async (dispatch , getState) => {

        const { id } = getState().Auth;

       await db.doc(`${id}/jourlnal/notes/${idNote}`).delete()
              .then( x => {
                  Swal.fire('Nota borrara', 'Sea Borrado la nota','success')
              })
           
        dispatch(ShowListAct(idNote));
    }

};



export const ShowListAct = (id) => {
   return {
       type: types.deletNote,
       payload: id,
   }
} 