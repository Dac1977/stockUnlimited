"use client"
import React from 'react';
import CrearProductoForm from '../../../components/CrearProductoForm';

const CrearProductoPage: React.FC = () => {
    return (
        <div className="flex-1 p-4">
            <h1 className='text-center'>Crear Producto</h1>
            <CrearProductoForm onSubmit={console.log} onCancel={console.log} />
        </div>
    );
};

export default CrearProductoPage;