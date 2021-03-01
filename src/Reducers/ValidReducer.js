import { types } from "../Types/types";


const initialState = {
    load : false,
    msgError :null,
    usuarioExist: null,
}

export  const ValidReducer = (state = initialState, action) => {
    switch (action.type) {
        case  types.setError:
              return {
                  ...state,
                  msgError: action.payload,
              }
        case types.setRemoveError:
             return{
                 ...state,
                 msgError: null,
                 usuarioExist:null,
             }    

        case types.UserInexisten:
              return{
                 ...state,
                 usuarioExist:action.payload, 
              }     

        case types.uiStartLoading: 
            return{
                ...state,
                load:true,
            };

         case types.uiFinishLoading:
             return{
                 ...state,
                 load:false,
             };   

              
        default:
             return state;
    }
}
