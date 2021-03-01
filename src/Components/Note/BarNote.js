import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import { afertSaveData, deletNote, saveNote, UploadNewPiture } from '../../actions/Note'

export const BarNote = () => {

    const dispatch = useDispatch();
    const {active:note ,  lostData} = useSelector(state => state.Notes)

      
    const handleSaveNote = () =>{
      if( note.body || note.title ){
        dispatch (saveNote(note))
        dispatch(afertSaveData()); 
       }else{
         Swal.fire('Erro de envio de datos','Debe llenar correctamnete los campos','warning')
       }   
       
    }

    const startNewFile = ()  => {
         document.getElementById('selectFile').click()
   
        }
   
    const SelcectFile = (e) => {
       const trueFiles = e.target.files[0] //para acder a los datos envidos
       
       if(trueFiles){
         dispatch( UploadNewPiture(trueFiles));
       }
    }   
   
   const deleteNote = () => {
      dispatch(deletNote(note.id))
   }

    return (
        <div className ='Note__Appbar animate__animated animate__fadeInDown'>
             <span>28 de Agosto del 2021</span>
             <input 
               id ='selectFile'
               type ='file'
               style ={{display:'none'}}
               onChange ={SelcectFile}
             />
            <div>
                <button
                className ='btn  btn__danger'
                onClick = {deleteNote}
                disabled ={lostData}
                 >
                 Borrar
                </button>
                <button
                  className='btn '
                  onClick ={startNewFile}
                >
                 Imagen
                </button>
                <button
                   className='btn'
                   onClick = {handleSaveNote}
                >
                  Guardar 
                </button>
            </div>
        </div>
    )
}
