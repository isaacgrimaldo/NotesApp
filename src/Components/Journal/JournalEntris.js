import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntri } from './JournalEntri';

export const JournalEntris = () => {
      
     const { notes } = useSelector( state => state.Notes) 

     return (
        <div className='joutnal__Entris animate__animated animate__fadeInLeft'> 
            
            {
                notes.map( notes =>(
                    (notes.body  || notes.title)
                    ? (<JournalEntri key ={notes.id} {...notes}  />)
                    :''
                ))
            }
        </div>
    )
}
