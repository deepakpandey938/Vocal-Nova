import React, { useState } from 'react'
import './Sidebar.css'
import { SidebarData } from './SidebarData';

function Sidebar() {
    const [isOpen,setIsOpen]=useState(true);
    const toogleSidebar =()=>{
      setIsOpen(!isOpen)
    }
  return (
    <div className={`sidebar ${isOpen?'open':'closed'}`}>
        <div className="sidebar-header">
            <button className='toggle-btn' onClick={toogleSidebar}>
               <div className={`arrow ${isOpen ? 'left':'right'}`}></div>
            </button>
            <div className='logo'>
      <h2>{isOpen?"My app": ""}</h2>
            </div>
        </div>
        <nav className='nav-manu'>
     <ul>
      {SidebarData?.map((item,index) =>(
        <li key={index}>
          <a href={item.path}>
          <span className="icon-of-sidebar">{item.icon}</span>
            <span className='title-sidebar'>{isOpen? item.title:" "}</span>
          </a>
        </li>
      ))}
     </ul>
        </nav>
    </div>
  )
}

export default Sidebar
