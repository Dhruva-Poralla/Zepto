
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
import Footer from './components/Footer'
import SingleProduct from './pages/SingleProduct'
import Category from './components/Category'
import CategoryProduct from './pages/CategoryProduct'
import { useCart } from './context/CartContext'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {

  const [location,setLocation] = useState(null);
  const [openDropdown, setDropdown] = useState(false);
  const {cartItem, setCartItem} = useCart()

  const getLocation = async()=>{
    navigator.geolocation.getCurrentPosition(async pos =>{
      const {latitude, longitude} = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      try{
        const location = await axios.get(url);
        const extractAdress = location.data.address;
        setLocation(extractAdress);
        setDropdown(false);
        console.log(extractAdress);
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

  // Load cart from local storage on intail render
  useEffect(()=>{
    const storedCart = localStorage.getItem('cartItem')
    if(storedCart){
      setCartItem(JSON.parse(storedCart));
    }
  },[]);

  // save cart to local storage whenever it changes
  useEffect(()=>{
    localStorage.setItem('cartItem',JSON.stringify(cartItem))
  },[cartItem])

  return (
    <BrowserRouter>
    <Navbar location={location} getlocation={getLocation} openDropdown={openDropdown} setDropdown={setDropdown}/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/products' element={<Products/>} />
      <Route path='/products/:id' element={<SingleProduct/>} />
      <Route path='/category/:category' element={<CategoryProduct/>}/>
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/cart' element={<ProtectedRoute><Cart location={location} getlocation={getLocation} /></ProtectedRoute>} />

    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
