import {createStore , combineReducers ,  applyMiddleware , compose} from 'redux'

//libreria del widdleware para trabajar con funciones asyn
import thunk from 'redux-thunk';

import { NoteReducer } from '../Reducers/NoteReducer';
import {ReducerAuth} from '../Reducers/ReducerAuth'
import {ValidReducer} from '../Reducers/ValidReducer'

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; // congiguracion preterminda


//asi se le pasan todos lo reducers que vamos a utilizar 
export const Reducers = combineReducers({
    Auth: ReducerAuth,
    Valid: ValidReducer,
    Notes: NoteReducer,
})


//asi se  crea la store que es de donde vamos a optener todos los datos y va contener todos lod reducers
export const store = createStore(
      Reducers,
    //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), //para poder ver redux en el navegador
    composeEnhancers(
        applyMiddleware(thunk) // esta configuracion es para trabjar con funciones asincronas
    ) 
    
    );