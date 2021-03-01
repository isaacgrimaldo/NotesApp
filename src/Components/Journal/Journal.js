import React from 'react'
import { useSelector } from 'react-redux'
import NotePhg from '../Note/notePhg'
import { Sidebar } from './Sidebar'
import { NotingSelecter } from './NotingSelecter'


export const Journal = () => {
   
     const {active} = useSelector(state => state.Notes)

    return (
        <>
           <div className ='journal__main-content'>
                 <Sidebar/>
                 <main>
                     {
                            (active === null)
                                    ?(<NotingSelecter/>)
                                    : (<NotePhg/>)
                     }    
                 </main>
           </div>
        </>
    )
}
