import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LoginPhg } from '../Components/Auth/LoginPhg'
import { RegisterPhg } from '../Components/Auth/RegisterPhg'

export const AuthRouter = () => {
    return (
       <div className ='auth__main'>
         <div className ='auth__box-container'>
            <Switch>
                <Route path='/auth/login'  component = {LoginPhg} />
                <Route path ='/auth/register' component = {RegisterPhg}/>
                <Redirect  to= '/auth/login'/>
            </Switch>
         </div>   
        </div>
    )
}
