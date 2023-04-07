import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './App.css';
import Cards from './components/Cards.jsx';
import NavBar from './components/NavBar.jsx';

import { Routes, Route } from "react-router-dom";
import About from "./components/Abouts";
import Detail from "./components/Detail";
import Login from "./components/Login";

export function App() {

  const navigate = useNavigate();
  const [access, setAccess] = useState(false);
  const EMAIL = 'nahuel@gmail.com';
  const PASSWORD = 'Nahuel1234';
  
 
  const [characters, setCharacters] = useState([]);
  const location = useLocation();
  
  function login(inputs) {
    if (inputs.password === PASSWORD && inputs.email === EMAIL) {
       setAccess(true);
       navigate('/home');
    }
 }

 function logout() {
     setAccess(false);
     navigate('/');
 }

 useEffect(() => {
    !access && navigate("/");
 },[access]);


  function onSearch(id) {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
      if (data.name) {
         let exist = characters.find((character)=> character.id === data.id)
         if(exist){
            alert("ya existe")
         }else{
            setCharacters((oldChars) => [...oldChars, data]);
         }

      } else {
        window.alert('¡No hay personajes con este ID!');
      }
    });
  }

  function onClose(id) {
    setCharacters((oldChars) => {
      return oldChars.filter((character) => character.id !== id)
   });
  }

  return (
    <div className='App'>
      {
        location.pathname === "/" ? null : <NavBar logout={logout} onSearch={onSearch}/>
      }
      
      <Routes>
        <Route path="/" element={<Login login={login}/>}></Route>
        <Route path="/home" element={<Cards onClose={onClose} characters={characters} />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
      </Routes>
      
    </div>
  );
}

export default App;