import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import {Route, Routes} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'
import ViewFood from './Pages/View/ViewFood/Viewfood'
import ViewPrice from './Pages/View/ViewPrice/Viewprice'
import AddFood from './Pages/Add/AddFood/Addfood'
import ViewRestaurant from './Pages/View/ViewRestaurant/ViewRestaurant'
import Addrestaurant from './Pages/Add/AddRestaurant/AddRestaurant'

const App = () => {
  
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/video/:categoryId/:videoId' element={<Video/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/viewfood' element={<ViewFood/>}/>
        <Route path='/viewprice' element={<ViewPrice/>}/>
        <Route path='/addfood' element={<AddFood/>}/>
        <Route path='/viewrestaurant' element={<ViewRestaurant/>}/>
        <Route path='/addrestaurant'element={<Addrestaurant/>}/>
      </Routes>
    </div>
  )
}

export default App