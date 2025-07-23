import React, { useContext,useEffect } from 'react'
import { DataContext } from '../context/DataContext'
import { useNavigate } from 'react-router-dom';

export default function Category() {
    const { data, fetchAllProducts,categoryOnlyData } = useContext(DataContext);
    const navigate = useNavigate()
    useEffect(() => {
        fetchAllProducts();
        window.scrollTo(0,0);
      }, []);

    
  return (
    <div className='bg-[#101829]'>
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 item-center justify-center md:justify-around px-7 py-4">
            {
                categoryOnlyData?.slice(1,categoryOnlyData.length).map((item,index)=>{
                    return <div key={index}>
                        <button onClick={()=>navigate(`/category/${item}`)} className='uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer'>{item}</button>
                        </div>
                })
            }
        </div>

    </div>
  )
}
