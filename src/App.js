import React from 'react'
import Footer from './Components/Footer/Footer';
import HomePage from './Components/HomePage/HomePage';
import NavBar from './Components/NavBar/NavBar';
import ScoreBoard from './Components/ScoreBoard/ScoreBoard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/scoreboard/:id' element={<ScoreBoard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
