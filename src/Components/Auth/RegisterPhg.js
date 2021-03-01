import React from 'react'
import { Link } from 'react-router-dom'
import  validator from 'validator'
import {useDispatch , useSelector} from 'react-redux'

import {useFomrValues} from '../../Hooks/useForm'
import {SetError ,  RemoveError} from '../../actions/valid'
import { startRegisterWith_NA_EM_PAS } from '../../actions/Auth'


export const RegisterPhg = () => {
 
  //para optener los datos del store
  const {msgError} = useSelector(state => state.Valid)
  
  const dispatch = useDispatch();

   const [values , setValuesForm] = useFomrValues({
      name: '',
      email:'',
      password: '',
      password2: ''

   })

   const {name , email , password , password2} = values;
   
   const handlerOnSubmit = (e) => {
      e.preventDefault();

  

      if( isFormValid() ){
           dispatch(RemoveError());
           dispatch(startRegisterWith_NA_EM_PAS(name , email , password))
      }
      
   };

   const isFormValid = () => {
       
       if(name.trim().length === 0 ){
         dispatch(SetError('Error de en el nombre de usuario'));
         return false;

       }else if(!validator.isEmail(email)){
        dispatch(SetError('Error en el email de usuario'));
        return false;  

       }else if( password !== password2 || password.length < 6 || password2.length < 6  ){
        dispatch(SetError('Error en el password de usuario'));   
        return false
       }


       return true;
   };

    return (
        <>
            <h3 className='auth__title' >Registro</h3>
            <hr/>
              {
                 msgError != null &&(
                   
                   <div className = "alert__eroror-from" >
                        {msgError}
                   </div>
                 )

              }
             <div className ='animate__animated animate__fadeIn'>       
            <form className ='auth__form ' onSubmit ={handlerOnSubmit}> 
                
            <input
                className='auth__input' 
                   type='text'
                   placeholder ='Nombre de usuario'
                   name='name'
                   value={name}
                   onChange ={setValuesForm}
                   autoComplete= 'off'
                />
                
                <input
                className='auth__input' 
                   type='text'
                   placeholder ='Correo electrico'
                   name='email'
                   value={email}
                   onChange ={setValuesForm}
                   autoComplete= 'off'
                />

               <input 
                   className='auth__input'
                   type='password'
                   placeholder ='Contraseña'
                   name='password'
                   value={password}
                   onChange ={setValuesForm}
                   autoComplete= 'off'
                />

               <input
                className='auth__input' 
                   type='password'
                   placeholder ='Confrime la contraseña'
                   name='password2'
                   value={password2}
                   onChange ={setValuesForm}
                   autoComplete= 'off'
                />

                <button
                  type='submit'
                  className ='btn btn-Primary btn__block'
                >
                    Resgritrar   
                </button>
                <hr />
                  
                 <Link
                   className = 'link'
                   to ='/auth/login'
                 >
                   ¿Ya estas regristrado?
                 </Link>
            </form>
            </div>
        </>
    )
}
