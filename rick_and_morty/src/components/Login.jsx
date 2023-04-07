import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export default function Login({login}) {
  const [inputs, setInputs ] = useState({
    email : "",
    password : "",
  })
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  })

  function validate(inputs) {
    const errors = {}
    if(!inputs.email) {
      errors.email = "There must be an email"
    }
    if(!inputs.password) {
      errors.password = "There must be a password"
    }
    if(inputs.email && !regexEmail.test(inputs.email)){
      errors.email = "There must be a valid email"
    }
    if(inputs.password && !regexPassword.test(inputs.password)){
      errors.password = "There must be a valid password"
    }
    return errors;
  }

  function handleChange(e) {  
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...inputs,
      [e.target.name]: e.target.value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const aux = Object.keys(errors)
    if(aux.length === 0) {
      setInputs({
        email: "",
        password: ""
      })
      setErrors({
        email: "",
        password: ""
      })
      login(inputs);
      return alert("Ok")
    }
    return alert("ERROR")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email: </label>
        <input name="email" value={inputs.email} onChange={handleChange} placeholder=""></input>
        <p className="danger">{errors.email}</p>
        <label>Password: </label>
        <input name="password" value={inputs.password} onChange={handleChange} placeholder=""></input>
        <p className="danger">{errors.password}</p>
        {
          Object.keys(errors).length === 0 ? (
            <Link to="/home">
              <button type="submit">Login</button>
            </Link>
          ) : null
        }
      </form>
    </div>
  );
}