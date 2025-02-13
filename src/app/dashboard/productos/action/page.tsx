"use client"
import React, { Suspense } from 'react';
import CrearProductoForm from '../../../../components/CrearProductoForm';

const CrearProductoPage: React.FC = () => {
    return (
        <div className="flex-1 p-4">
            <h1 className='text-center'>Crear Producto</h1>
            <Suspense fallback={<div>Loading...</div>}>
            <CrearProductoForm onSubmit={console.log} onCancel={console.log} />
            </Suspense>
        </div>
    );
};

export default CrearProductoPage;