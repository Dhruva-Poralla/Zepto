import React, { useContext,useEffect } from 'react'
import { DataContext } from '../context/DataContext'

export default function Category() {
    const { data, fetchAllProducts,categoryOnlyData } = useContext(DataContext);
    
    useEffect(() => {
        fetchAllProducts();
      }, []);

    
  return (
    <div className='bg-[#101829]'>
        <div className="max-w-7xl mx-auto flex gap-4 item-center justify-around px-7 py-4">
            {
                categoryOnlyData.map((item,index)=>{
                    return <div key={index}>
                        <button className='uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer'>{item}</button>
                        </div>
                })
            }
        </div>

    </div>
  )
}
