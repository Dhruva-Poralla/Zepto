
import './App.css'
import { BrowserRouter,Route , Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {

  const [location,setLocation] = useState(null);
  const [openDropdown, setDropdown] = useState(false);

  const getLocation = async()=>{
    navigator.geolocation.getCurrentPosition(async pos =>{
      const {latitude, longitude} = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      try{
        const location = await axios.get(url);
        const extractAdress = location.data.address;
        setLocation(extractAdress);
        setDropdown(false);
        // console.log(extractAdress);
      }
      catch (error)
      {
        console.log(error);
      }
    })
  }

  useEffect(()=>{
    getLocation();
  },[])

  return (
    <BrowserRouter>
    <Navbar location={location} getlocation={getLocation} openDropdown={openDropdown} setDropdown={setDropdown}/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/products' element={<Products/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/cart' element={<Cart/>} />

    </Routes>
    </BrowserRouter>
  )
}

export default App
