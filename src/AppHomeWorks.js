import React from 'react'

// esto nos ayudadra pasar toda infromacion a que necitemos para que la app funciones a todos los componentes que la vaya a consumir 
import {Provider} from 'react-redux'


import { AppRouters } from './Routers/AppRouters'
import { store } from './Store/Store'

export const AppHomeWorks = () => {
    return (
         <Provider store = {store}>
             <AppRouters/>
         </Provider>           
    )
}
