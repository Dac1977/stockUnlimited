"use client"
import React from 'react'
import { columns } from "./colums";
import { DataTable } from "./data-table";

interface Proveedor {
  id_proveedor: number
  id_negocio: number
  proveedor: string
  cuil: bigint
  contacto: string
  telefono: string
  correo: string
  pedidos_mail: boolean
  pedidos_telefono: boolean
  control_stock: boolean
  dias_preventista: string
  dias_entrega: string
  
  
}
const ProveedoresPage = () => {
  const [proveedores, setProveedores] = React.useState<Proveedor[]>([])
  const fetchProveedores = async () => {
    const response = await fetch('/api/proveedores')
    const data = await response.json()
    setProveedores(data)
  }
  React.useEffect(() => {
    fetchProveedores()
  }, [])

  console.log(proveedores)
  return (
    <div className='text-center'>
      <h1 className='text-3xl font-bold m-4'> Tabla de Proveedores</h1>
      <DataTable columns={columns} data={proveedores || []} tableId="proveedoresTable" />
    </div>
  )
}

export default ProveedoresPage