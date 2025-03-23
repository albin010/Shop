import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from '../home/pages/login/Login';
import Landing from '../home/pages/landing/Landing';
import Main from '../home/pages/main/Main';
import Food from '../home/pages/main/Food';
import Drinks from '../home/pages/main/Drinkes';
import Footer from '../home/pages/footer/Footer';

const HomeRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/main" element={<Main />} />
      <Route path="/food" element={<Food />} />
      <Route path="/Drinks" element={<Drinks />} />
      <Route path="/login" element={<Login />} />
      <Route path="/footer" element={<Footer />} />

    </Routes>
  )
}

export default HomeRouter
