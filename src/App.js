import React from 'react'
import Footer from './Components/Footer/Footer';
// import HomePage from './Components/HomePage/HomePage';
import HomePage2 from './Components/HomePage/HomePage2'
import ScoreBoard2 from './Components/ScoreBoard/ScoreBoard2'
import NavBar from './Components/NavBar/NavBar';
// import ScoreBoard from './Components/ScoreBoard/ScoreBoard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes } from 'react-router-dom';
import PlayerDetails from './Components/PlayerDetsils/PlayerDetails';


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* <Route path='/' element={<HomePage />} /> */}
        <Route path='/' element={<HomePage2 />} />
        {/* <Route path='/scoreboard/:id' element={<ScoreBoard />} /> */}
        <Route path='/scoreboard/:id' element={<ScoreBoard2 />} />
        <Route path='/player' element={<PlayerDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
