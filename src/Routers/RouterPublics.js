import React  from 'react'
import { Redirect, Route } from 'react-router-dom'
import  PropTypes from 'prop-types';

export const RouterPublics = ({
    Auth,
    component: Component,
    ...rest
}) => {

    return (
        <Route 
           {...rest}
           component ={(props) => (
               (!Auth)
                 ?(<Component {...props}/>)
                 :(<Redirect to ='/'/>)
           )}
        />    
    )
}


RouterPublics.propTypes ={
    Auth: PropTypes.bool.isRequired,
    component : PropTypes.func.isRequired,
}