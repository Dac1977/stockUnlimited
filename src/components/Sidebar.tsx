"use client"

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
// import { FaRegEdit } from "react-icons/fa";
import { RiProductHuntLine } from "react-icons/ri";
// import { MdEdit } from "react-icons/md";
const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`h-screen bg-gray-800 text-white p-4 ${isCollapsed ? 'w-16' : 'w-45'}`}>
      <button onClick={toggleSidebar} className="mb-6 ">
        {isCollapsed ? <MdArrowForwardIos /> : <MdArrowBackIosNew />}
      </button>
      <Link href="/productos" className={`text-gray-300 hover:text-white ${pathname === '/productos' ? 'font-bold text-white'  : ''}`} title="Productos">
      {isCollapsed? <RiProductHuntLine size={30}/> :<h2 className="text-xl font-bold mb-4">{!isCollapsed && 'Productos'}</h2> }
      </Link>
      <ul>
        <li className="mb-2 flex justify-start">
          <Link href="/productos/action" className={`text-gray-300 hover:text-white ${pathname === '/productos/action' ? 'font-bold text-white'  : ''}`} title="Crear Producto">
            {isCollapsed ? <IoMdAddCircleOutline size={30} /> : 'Crear Producto'}
          </Link>
        </li>
        {/* <li className="mb-2 flex justify-start">
          <Link href="/productos/editar" className={`text-gray-300 hover:text-white ${pathname === '/productos/editar' ? 'font-bold text-white' : ''}`} title="Editar Producto">
            {isCollapsed ? <MdEdit size={30} /> : 'Editar Producto'}
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;