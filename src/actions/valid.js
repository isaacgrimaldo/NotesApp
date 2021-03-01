import { types } from "../Types/types"


export const RemoveError = () => {
   return {
       type: types.setRemoveError
   }
}


export const SetError = (msgError) => {
    return {
        type: types.setError,
        payload: msgError, 
    }  
} 

export const ValidUserExisten = () =>{
    return{
        type:types.UserInexisten,
        payload:'Email o Password incorrecto ',
    }
}

export const startLoadding = () => {
    return{
        type :types.uiStartLoading,
    } 
}

export const finishLoadding = () => {
    return{
        type: types.uiFinishLoading,
    }
}