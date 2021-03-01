import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import { LoggoutSession } from '../../actions/Auth'
import { beforeSaveData, newNote } from '../../actions/Note'
import { JournalEntris } from './JournalEntris'

export const Sidebar = () => {
    
    const  { name  } = useSelector(state => state.Auth)
    const  {  active  } = useSelector(state => state.Notes)
    const  { lostData  } = useSelector(state => state.Notes)
    const   dispatch = useDispatch()
    

    const handlerLggout = (e) => {
         e.preventDefault();        
         dispatch(LoggoutSession());
    } 

    const handlerNewNote = (e) =>{
        e.preventDefault();
        
        if(active?.body || active?.title){     
            dispatch(beforeSaveData());
           dispatch(newNote());
        }else if(!active){
            dispatch(beforeSaveData());
            dispatch(newNote());
        }else if(active){
            Swal.fire('Accion  restringida','Debe borrar o guardar la nota actual','error')
        }

    };

    return (
       <aside className = 'journal__sidebar animate__animated animate__fadeInLeft'>
           <div className ='journal__sidebar-navbar'>
               <h3 className ='mt-5'>
               <i className="fas fa-address-book"></i>
                   <span> {(name === null ) ?'sin user' : name}</span>
               </h3>
               <button
                className='btn mt-1'
                onClick = {handlerLggout}
               >
                 logout
               </button>
               <div className='journla__new-entry'>
               <button
                 className ="btn"
                 disabled ={lostData}
                 onClick ={handlerNewNote}
                >
               <i className="far fa-calendar-plus fa-5x "
               
                  
               ></i>
                <p className='mt-1'>Nueva Nota</p>
               </button>
               </div>
           </div>
           <JournalEntris/>
       </aside>
    )
}
