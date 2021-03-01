import { useState } from "react"


export const useFomrValues = (values = {}) => {
  
       const [formsValues, setValues] = useState(values);

        
    const  handlerChangen =({target}) => {
        setValues({
             ...formsValues,
             [target.name]:target.value, // = [name]: value;
        });
  };

  const Reset = (newState = values) => {
      setValues(newState);
  };


      
  return [formsValues , handlerChangen , Reset];
}