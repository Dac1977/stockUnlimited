"use client"

import React from 'react';
import Sidebar from '../../components/Sidebar';

interface ProductosLayoutProps {
    children: React.ReactNode;
}

const ProductosLayout: React.FC<ProductosLayoutProps> = ({ children }) => {
    return (
        <div className="productos-layout" style={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <main className="content" style={{ flex: 1, overflowY: 'auto' }}>
                {children}
            </main>
        </div>
    );
};

export default ProductosLayout;