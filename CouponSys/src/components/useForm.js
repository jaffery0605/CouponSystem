import React,{useEffect,useState} from 'react';


function useForm( initialFieldValues,setCurrentId ) {
    const [values,setValues] = useState(initialFieldValues);
    const [errors,setErrors] = useState({})

    const handleChange = (e) =>{
      const {name,value}=e.target
      console.log(e.target.name);
      setValues({
        ...values,
        [name]: value
      })
    }

    const resetForm=()=>{
        setValues(initialFieldValues)
        setErrors({})
        setCurrentId(0)
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleChange,
        resetForm
    };
}

export default useForm;