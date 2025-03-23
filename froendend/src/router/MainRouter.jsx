import React from 'react';
import Home from '../home/App';
import { Routes, Route } from 'react-router-dom';
import Admin from '../admin/App';

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="admin/*" element={<Admin />} />
    </Routes>
  );
};

export default MainRouter;
