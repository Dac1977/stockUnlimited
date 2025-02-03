"use client"
import React, { useEffect, useState } from 'react';
import { Producto, Columns } from "./colums";
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
    <div>
      <h1 className="text-center">Productos</h1>
      {/* Renderiza los productos aquí */}
      <DataTable columns={Columns} data={productos || []} />
    </div>
  );
};

export default ProductosPage;