// filepath: /home/diego/Documentos/GitHub/stockunlimited/src/components/Navbar.tsx
"use client"
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link href="/">Stock Unlimited</Link>
        </div>
        <div className="space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">Inicio</Link>
          <Link href="/dashboard/productos" className="text-gray-300 hover:text-white">Productos</Link>
          <Link href="/dashboard/proveedores" className="text-gray-300 hover:text-white">Proveedores</Link>
          <Link href="/dashboard/clientes" className="text-gray-300 hover:text-white">Clientes</Link>
          <Link href="/contacto" className="text-gray-300 hover:text-white">Contacto</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;