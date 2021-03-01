import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote } from '../../actions/Note';
import { useFomrValues } from '../../Hooks/useForm';
import { BarNote } from './BarNote'

export default function NotePhg() {
   
    const {active:note} = useSelector(state => state.Notes);
    const dispatch = useDispatch()
    

    const [values,  setValuesForm , Reset ] = useFomrValues(note);
     
   const {title , body , url} = values ;

   const noteId = useRef(note.id)


    useEffect(() => {
       //para cambiar el valor de la nota 
       if(note.id !== noteId.current){
         Reset( note);
         noteId.current = note.id
       }

    }, [note , Reset])


    useEffect(() => {

       //para actializar los valores en el active
      dispatch(activeNote(values.id , values))
   

    }, [values ,  dispatch])

    const ResetForm = (e) => {
       e.preventDefault()
    }
    return (
        <div className = 'Note__bar-content'>
            <BarNote/>
           <div className='note__content animate__animated animate__fadeInUp'>
             <form className ='note__content  animate__animated animate__fadeInUp ' onSubmit={ResetForm}>
                <input
                
                  type='text'
                  placeholder ='¿ Que Tarea es ?'
                  className='note__title-input'
                  name ='title'
                  value = {title} 
                  onChange = {setValuesForm}
                />
                <textarea
                   placeholder='¿ Que tienes que hacer ?'
                   autoComplete = 'off'
                   className='note__texrareas'
                   name ='body'
                  value = {body} 
                  onChange = {setValuesForm}
                >
                </textarea>
                <div className='note__img'>
                    {
                       url &&
                       (
                        <img
                        src = {url}
                        alt ='una imagen'
                      />
                       )  
                    } 
                </div> 
             </form>           
           </div>
        </div>
    )
}
