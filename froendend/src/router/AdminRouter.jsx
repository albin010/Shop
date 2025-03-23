import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Adminpage from '../admin/pages/admin/Adminpage';
import Menu from '../admin/pages/menu/Menu';
import Item from '../admin/pages/item/Item';
import View from '../admin/pages/view/View';



const AdminRouter = () => {
  return (
    <Routes>
      <Route path='/*' element={<Adminpage/>}/>
      <Route path='/menu' element={<Menu/>}/>
      <Route path='/item' element={<Item/>}/>
      <Route path='/view' element={<View/>}/>
    </Routes>
  )
}

export default AdminRouter
