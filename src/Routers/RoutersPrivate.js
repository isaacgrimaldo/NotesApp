import React  from 'react'
import { Redirect, Route } from 'react-router-dom'
import  PropTypes from 'prop-types';

export const RouterPrivates = ({
    Auth,
    component: Component,
    ...rest
}) => {

    return (
        <Route 
           {...rest}
           component ={(props) => (
               (Auth)
                 ?(<Component {...props}/>)
                 :(<Redirect to ='/auth/login'/>)
           )}
        />    
    )
}


RouterPrivates.propTypes ={
    Auth: PropTypes.bool.isRequired,
    component : PropTypes.func.isRequired,
}