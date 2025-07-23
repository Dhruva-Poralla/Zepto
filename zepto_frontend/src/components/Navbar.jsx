import { Link, NavLink } from "react-router-dom";
import { MapPin } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useCart } from "../context/CartContext";
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi'
import ResponsiveMenu from "./ResponsiveMenu";


export default function Navbar({ location, getlocation, openDropdown, setDropdown }) {
  
  const {cartItem} = useCart();
  const [openNav,setOpenNav]= useState(false)

  const toggleDropdown = () => {
    setDropdown(!openDropdown);
  };
  return (
    <div className="bg-white py-3 shadow-2xl px-4 md:px-0">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* logo section */}

        <div className="flex gap-7">
          <Link to="/">
            <h1 className="font-bold text-3xl">
              <span className="text-red-500 font-serif">Z</span>epto
            </h1>
          </Link>
          <div className="md:flex gap-1 text-gray-700 cursor-pointer items-center hidden">
            <MapPin className="text-red-500" />
            <span className="font-semibold">
              {location ? (
                <div className="-space-y-3">
                  <p>{location.country}</p>
                  <p>{location.state}</p>
                </div>
              ) : (
                "Add Address"
              )}
            </span>
            <FaCaretDown onClick={toggleDropdown} />
          </div>
          {openDropdown ? (
            <div
              className="w-[250px] h-max fixed z-50 top-16 left-60 bg-white shadow-2xl
            border-2 p-5 rounded-md border-gray-200"
            >
              <h1 className="font-semibold mb-4 text-xl flex justify-between">
                Change Location{" "}
                <span onClick={toggleDropdown}>
                  <CgClose />
                </span>
              </h1>
              <button
                className="bg-red-500 rounded-md hover:bg-red-400 px-3 py-1 text-white cursor-pointer"
                onClick={getlocation}
              >
                Detect My Location
              </button>
            </div>
          ) : null}
        </div>

        {/* menu section */}
        <nav className="flex gap-7 items-center">
          <ul className="md:flex list-none gap-7 text-xl font-semibold items-center hidden">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Products</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>
          <Link to="/cart" className="relative">
            <IoCartOutline className="h-7 w-7" />
            <span className="bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white">
              {cartItem?.length}
            </span>
          </Link>
          <div className="hidden md:block">
            <SignedOut>
              <SignInButton className="bg-red-500 rounded-md cursor-pointer px-3 py-1 text-white" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          {
             openNav ? <HiMenuAlt3 onClick={()=>setOpenNav(false)} className='h-7 w-7 md:hidden'/>:<HiMenuAlt1 
                        onClick={()=>setOpenNav(true)}
                        className='h-7 w-7 md:hidden'/>
          }
        </nav>
      </div>
      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav}/>
    </div>
  );
}
