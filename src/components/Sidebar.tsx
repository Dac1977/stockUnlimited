"use client"

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
// import { FaRegEdit } from "react-icons/fa";
import { RiProductHuntLine } from "react-icons/ri";
// import { MdEdit } from "react-icons/md";
import { FiTruck } from "react-icons/fi";
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
      <Link href="/dashboard/productos" className={`text-gray-300 hover:text-white ${pathname === '/dashboard/productos' ? 'font-bold text-white'  : ''}`} title="Productos">
      {isCollapsed? <RiProductHuntLine size={30}/> :<h2 className="text-xl font-bold mb-4">{!isCollapsed && 'Productos'}</h2> }
      </Link>
      <ul>
        <li className="mb-2 flex justify-start">
          <Link href="/dashboard/productos/action" className={`text-gray-300 hover:text-white ${pathname === '/dashboard/productos/action' ? 'font-bold text-white'  : ''}`} title="Crear Producto">
            {isCollapsed ? <IoMdAddCircleOutline size={30} /> : 'Crear Producto'}
          </Link>
        </li>
        <li className="mb-2 flex justify-start">
          <Link href="/dashboard/proveedores" className={`text-gray-300 hover:text-white ${pathname === '/dashboard/proveedores' ? 'font-bold text-white' : ''}`} title="Proveedores|">
            {isCollapsed ? <FiTruck size={28} />  :<h2 className="text-xl font-bold mb-4">{!isCollapsed && 'Proveedores'}</h2> }
          </Link>
        </li>
        <li className="mb-2 flex justify-start">
          <Link href="/dashboard/proveedores/action" className={`text-gray-300 hover:text-white ${pathname === '/dashboard/proveedores/action' ? 'font-bold text-white' : ''}`} title="Crear Proveedor">
            {isCollapsed ? <IoMdAddCircleOutline size={30} /> : 'Crear Proveedor'}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;