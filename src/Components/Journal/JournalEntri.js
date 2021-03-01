import React from 'react';

//para usar moment en cualquier idioma 
import moment from 'moment';
import 'moment/locale/es-mx';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote } from '../../actions/Note';
import Swal from 'sweetalert2';
import { verificacionSave } from '../../Helpers/loadNotes';

export const JournalEntri = ({id , title , body ,  date , url}) => {
    
    const dispatch = useDispatch();
    const {active:CurrentNote} = useSelector(state => state.Notes)
    const {id:userId} = useSelector(state => state.Auth)

    
    const handlerShowNote = async (e) => {
       
        if(CurrentNote?.body || CurrentNote?.title){    
             
            const Verificacion =  await verificacionSave(CurrentNote.id , userId )
                 
             if(Verificacion){
                dispatch(activeNote( id , {
                    date, title , body,  url
                }));

             }else{
                console.log(Verificacion);
                Swal.fire('Erro al guardar los datos','Los datos deben ser guardados','warning')  
             }

        }else if(!CurrentNote){
           dispatch(activeNote( id , {
                date, title , body,  url
            }));  
        }else if(CurrentNote){
            Swal.fire('Accion no restringida','debe llenar por lo menos 1 espacio','warning')
        }
   }

   //react-app-homewors
    return (
        
        <>
          <div className='journal__entri pointer'
            onClick = {handlerShowNote}
          >
              {
                  url &&
               <div className='journal__entri-picture' 
               style={{
                   backgroundSize : 'cover',
                   backgroundImage : `url( ${url})`  
                 }}
           >
           </div>     
              }
                 
              <div className ='journal__entry-body'>
                    <p className="joural__entry-title">
                       {title}
                       {moment().format('h:mm')}
                   </p>
              </div>
              <div className='journal__entry-date-box'>
                      <p className = 'journal__entry-date-day'> {moment().format('dddd')}</p>
                      <p className  ='journal__entry-date-mont-numday'> {moment().format('MMMM D')}</p>
              </div>
         </div>  
        </>
    )
}
