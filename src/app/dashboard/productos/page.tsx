"use client"
import React, { useEffect, useState } from 'react';
import { Producto, columns } from "./colums";
import { DataTable } from "./data-table";
const ProductosPage: React.FC = () => {
  const [productos, setProductos] = useState<Producto[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/productos`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setProductos(null);
      }
    }

    fetchData();
  }, []);

  console.log(productos);

  return (
    <div className='text-center'>
      <h1 className='text-3xl font-bold m-4'>Productos</h1>
     
      <DataTable columns={columns} data={productos || []} />
    </div>
  );
};

export default ProductosPage;