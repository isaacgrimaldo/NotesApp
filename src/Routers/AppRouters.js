import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import {firebase} from '../firebase/firebaseCongif'


import { Journal } from "../Components/Journal/Journal";
import { AuthRouter } from "./AuthRouter";
import { Auth } from "../actions/Auth";
import { PghLoad } from "../Components/PghLoad";
import { RouterPublics } from "./RouterPublics";
import { RouterPrivates } from "./RoutersPrivate";
import { arrayGetNote} from "../actions/Note";

export const AppRouters = () => {

     const [cheking, setcheking] = useState(true)
     const [logged, setlogged] = useState(false)

    const dispatch = useDispatch()

    //para optener lo datos de usuario sin hacer login
    useEffect(() => {
          //esto guarda la ultima autenticacion de una cuenta
          firebase.auth().onAuthStateChanged ( async (user) => {
              //pregunta si hay algo dentro del objeto mandado 
              if(user?.uid){
                dispatch(Auth(user.uid , user.displayName))
                setlogged(true);
                // se optienen las notas y se agreegan al store
                 dispatch( arrayGetNote(user.uid));
               }else{
                   setlogged(false)
               }
               //para verificar si se autentico el usuario
               setcheking(false);
          });
        
    }, [dispatch])


//muestra la pagina de carga
   if(cheking){
        return <PghLoad/>
   }

    return(
        <Router>
            <div>
                <Switch>
                     {
                         (logged)
                          ?<RouterPrivates Auth={logged} component={Journal}  exact  path ='/' />
                          : <RouterPublics  Auth ={logged} component ={AuthRouter}     />
                     }
                    
                     <Redirect to='/'/>
                </Switch>
            </div>
        </Router>
    )
}