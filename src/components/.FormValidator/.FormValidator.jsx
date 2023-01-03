import React from 'react'; 
import { useEffect } from 'react';
import { useCallback } from 'react';

export function FormValidator() {
  const [values, setValues] = React.useState({})
  const [isInputValid, setIsInputValid] = React.useState({})
  const [errors, setErrors] = React.useState({
  });
  const [isValid, setIsValid] = React.useState(false);
  const [isEmpty, setIsEmpty] = React.useState({
    name: true,
    password: true,
    email: true
  })

  function handleChange (e) {
    const {name, value} = e.target;    
    setValues(values => ({...values, [name]: value }));    
  }

  useEffect(() => {
    const nameRegex = /^[öa-zA-Zа-яА-ЯёЁ -\s]+$/
    if (values.name) {
      setIsEmpty({...isEmpty, name: false });
      if (nameRegex.test(String(values.name))) {
        setIsInputValid({...isInputValid, name: true })
        setErrors({...errors, name: '' });
      } else {
        setErrors({...errors, name: 'Имя может содержать буквы, дефис и пробел' })
        setIsInputValid({...isInputValid, name: false })
      }
    } else { 
      if (!isEmpty.name) {
        setErrors({...errors, name: 'Поле не может быть пустым' });
        setIsInputValid({...isInputValid, name: false })
      }
    }
  },[values.name])

  useEffect(() => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (values.email) {
      setIsEmpty({...isEmpty, email: false });
      if (emailRegex.test(String(values.email))) {
        setIsInputValid({...isInputValid, email: true })
        setErrors({...errors, email: '' });
      } else {
        setErrors({...errors, email: 'Введен некорректный email' })
        setIsInputValid({...isInputValid, email: false })
      }
    } else { 
      if (!isEmpty.email) {
        setErrors({...errors, email: 'Поле не может быть пустым' });
        setIsInputValid({...isInputValid, email: false })
      }
    }
  },[values.email])

  useEffect(() => {
    if (values.password) {
      setIsEmpty({...isEmpty, password: false });
        setIsInputValid({...isInputValid, password: true })
        setErrors({...errors, password: '' });
    } else { 
      if (!isEmpty.password) {
        setErrors({...errors, password: 'Поле не может быть пустым' });
        setIsInputValid({...isInputValid, password: false })
      }
    }
  },[values.password])


  useEffect(() => {
    if (isInputValid.name) {
      if (!isInputValid.name || !isInputValid.email || !isInputValid.password) {
        setIsValid(false);
      } else {
      setIsValid(true);
      } 
    } else if (!isInputValid.email || !isInputValid.password) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  },[isInputValid])

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      console.log('memoized')
    },
    [setValues, setErrors, setIsValid]
  );
  
  return { values, handleChange, errors, isValid, resetForm};
}