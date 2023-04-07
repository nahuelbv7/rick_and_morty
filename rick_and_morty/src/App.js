import axios from "axios";

import React, { useState } from 'react';
import './App.css';
import Cards from './components/Cards.jsx';
import NavBar from './components/NavBar.jsx';

import { Routes, Route } from "react-router-dom";
import About from "./components/Abouts";
import Detail from "./components/Detail";
import Login from "./components/Login";

export function App() {
  const [characters, setCharacters] = useState([]);

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
      <NavBar onSearch={onSearch}/>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Cards onClose={onClose} characters={characters} />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/detail:id" element={<Detail />}></Route>
      </Routes>
      
    </div>
  );
}

export default App;