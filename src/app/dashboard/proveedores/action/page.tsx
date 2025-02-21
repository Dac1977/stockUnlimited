"use client"
import React from 'react'
import CrearProveedorForm from '../../../../components/CrearProveedorForm'
import { Suspense } from 'react'

const CreateProveedorPage:React.FC = () => {
  return (
    <div>
        <h1 className='text-center'>Crear Proveedor</h1>
        <Suspense fallback={<div>Loading...</div>}>
        <CrearProveedorForm />
        </Suspense>
    </div>
  )
}
export default CreateProveedorPage