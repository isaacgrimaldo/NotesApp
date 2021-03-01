import React from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'


import {startGoolgeLogin , loginWhitEmail_Password} from '../../actions/Auth'
import { useFomrValues } from '../../Hooks/useForm'
import {useDispatch , useSelector} from 'react-redux'
import { RemoveError, SetError } from '../../actions/valid'


export const LoginPhg = () => {
         
    const {msgError , usuarioExist , load} = useSelector(state => state.Valid); 

     //asi se puede acceder a las funciones de cada reducer que usamos (con el types)
     const dispatch = useDispatch()

     const [values , handelerSetValues, ]  = useFomrValues({
         email: 'isaac@gmail.com',
         password : '123456',
     })


    const {email, password } = values

    const HandlerOnSubmit = (e) => {
        e.preventDefault()
    
        if( ValidForm() ){
            dispatch(loginWhitEmail_Password(email , password))
        }
    }

    const handlerGoogleStart = () => {
         dispatch(startGoolgeLogin())                      
    }

    const ValidForm = () => {
        if(!validator.isEmail(email)){
            dispatch(SetError('Ingrese un email valido'));
            return false;
        }else if(password < 6){
            dispatch(SetError('ingrese una password valida mayor de 6 caracteres'));
            return false;
        }
       
        dispatch(RemoveError())
        return true 
    }

    return (
        <>
            <h3 className='auth__title' >Login</h3>
            {
              (usuarioExist !== null ) &&(

              <div className ='alert__eroror-from'>
                   {usuarioExist}  
              </div>
              )        
            

            }
            
            {
              (msgError !== null ) &&(

              <div className ='alert__eroror-from'>
                   {msgError}  
              </div>
              )        
            

            }
            
            <hr/>
            <form className ='auth__form animate__animated animate__fadeIn' onSubmit = {HandlerOnSubmit}> 
                <input
                className='auth__input'
                   value = {email} 
                   onChange ={handelerSetValues}
                   type='text'
                   placeholder ='Correo electrico'
                   name='email'
                   autoComplete= 'off'
                />

               <input 
                   className='auth__input'
                   value = {password} 
                   onChange ={handelerSetValues}
                   type='password'
                   placeholder ='Contraseña'
                   name='password'
                   autoComplete= 'off'
                />
                <button
                  type='submit'
                  className ='btn btn-Primary btn__block'
                  disabled ={ load }
                >
                   Entrar   
                </button>
                <hr />
                 <div>
                 <div 
                            className="google-btn"
                            onClick = {handlerGoogleStart}
                        >
                            <div className="google-icon-wrapper">
                                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                            </div>
                            <p className="btn-text">
                                <b>Sign in with google</b>
                            </p>
                        </div>
                 </div>
                  
                 <Link
                   className = 'link'
                   to ='/auth/register'
                 >
                  click si no tines cuenta
                 </Link>
            </form>
            
        </>
    )
}
