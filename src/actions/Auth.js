import { types } from "../Types/types";


//para libreria de mensaje de error
import Swal  from 'sweetalert2'

//para importar las configuracion de las base de datos
import {firebase, googleAuthProvider} from '../firebase/firebaseCongif'
import { finishLoadding, startLoadding } from "./valid";


//ejemplo de funcion asyncona que gracias la Middleware de thuk podemos relizar 
export const PAsync = (id , user) => {
    return (dispatch) =>  {
        setTimeout(() => {
            
             dispatch(Auth(id , user))
        }, 3500);
    }
}

//auht por email ,  name  , password
export const startRegisterWith_NA_EM_PAS = ( username , email , password ) => {
     return (dispatch) =>{
               
        //para crear un nuevo usuario con los datos mandandados
        firebase.auth().createUserWithEmailAndPassword(email , password)
        .then( async ({user}) => {
              
            //cambia los datos del usuacrio antes de registrarlo
            await user.updateProfile({
                displayName: username
            });
              
             dispatch(Auth(user.uid , user.displayName))
        } )
        .catch((e) => {
            Swal.fire('Error' , e.message , 'error')
        })
     }
}



//auth de google
export const startGoolgeLogin = () => {
   
    ///esta es la conguracion basica de las autentificacion  
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider) // return una promise
        .then(({user}) => {
            dispatch(Auth(user.uid, user.email ))
        })
    }
}



//login email password

export  const loginWhitEmail_Password = (email ,  password) => {
    return (dispatch) =>{
         dispatch(startLoadding()); 
        //para buscar un usuario con el email y la password
         firebase.auth().signInWithEmailAndPassword(email , password)
         .then( ({user}) => {
              dispatch(finishLoadding())
              dispatch(Auth(user.uid , user.displayName));
              
         })
         .catch( (e) => {
               Swal.fire('Error',e.message , 'error')
         });
    }
}; 



export const Auth = (id , userName ) => {
    return{
        type: types.login,
        payload:{
            id,
            userName,
        }
    }
};

export const Loggout = () => {
    return {
        type:types.logout
    }
};

export const LoggoutSession = () => {
    
    return async(dispatch) => {

        //metodo para que el usuario salga de la  session         
       await firebase.auth().signOut()
            .then( x => {
                dispatch(notesReset());
                dispatch(Loggout()); 
            })
    }
}; 


//estado de las notas incial
export const  notesReset = () =>{ 
   return{
       type: types.resetNotes,
   }
}





/* Actions
 *  
 * en esta carpeta se pordra estalecer que va a realizar casa dispach que mandemos
 * 
 */