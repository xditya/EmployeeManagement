import React from 'react'
import { MdNotifications } from "react-icons/md";
const Sidebar = () => {
  return (
    <div className='w-1/5 left-0 absolute top-0 h-full py-10  px-3 border-r border-slate-300'>
        <div className='flex justify-between items-center px-4'>
            <span className='text-2xl font-bold '> Emma</span>
            <div className='border p-2 rounded-sm hover:bg-slate-100 transition-all duration-300 ease-in-out cursor-pointer'><MdNotifications size={25} /></div>
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default Sidebar