import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id_producto = searchParams.get('id_producto');

    if (id_producto) {
      const producto = await prisma.productos.findUnique({
        where: { id_producto: Number(id_producto) },
      });
      
      if (producto) {
        const productoWithStringBigInt = {
          ...producto,
          codigo: producto.codigo.toString(),
          codigo_presentacion: producto.codigo_presentacion.toString(),
        };
        return NextResponse.json(productoWithStringBigInt, { status: 200 });
      } else {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
    } else {
      const productos = await prisma.productos.findMany();
      const productosWithStringBigInt = productos.map(producto => ({
        ...producto,
        codigo: producto.codigo.toString(),
        codigo_presentacion: producto.codigo_presentacion.toString(),
      }));
      return NextResponse.json(productosWithStringBigInt, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      codigo,
      producto,
      codigo_presentacion,
      id_rubros,
      id_proveedores,
      margen,
      margen_forzar,
      px_costo,
      px_venta,
      fecha_rotacion,
      mostrar,
      control_stock,
      comprar,
      lista_rapida,
      acepta_desc,
      acepta_ctacte,
      tags,
      ranking,
      activo,
      id_negocio,
    } = body;

    const newProducto = await prisma.productos.create({
      data: {
        codigo: BigInt(codigo),
        producto,
        codigo_presentacion: BigInt(codigo_presentacion),
        id_rubros,
        id_proveedores,
        margen: margen ? parseFloat(margen) : null,
        margen_forzar,
        px_costo: px_costo ? parseFloat(px_costo) : null,
        px_venta: px_venta ? parseFloat(px_venta) : null,
        fecha_rotacion: fecha_rotacion ? new Date(fecha_rotacion) : null,
        mostrar,
        control_stock,
        comprar,
        lista_rapida,
        acepta_desc,
        acepta_ctacte,
        tags,
        ranking: ranking ? parseInt(ranking, 10) : null,
        activo,
        id_negocio: parseInt(id_negocio, 10),
      },
    });

    const newProductoWithStringBigInt = {
      ...newProducto,
      codigo: newProducto.codigo.toString(),
      codigo_presentacion: newProducto.codigo_presentacion.toString(),
    };

    return NextResponse.json(newProductoWithStringBigInt, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id_producto,
      codigo,
      producto,
      codigo_presentacion,
      id_rubros,
      id_proveedores,
      margen,
      margen_forzar,
      px_costo,
      px_venta,
      fecha_rotacion,
      mostrar,
      control_stock,
      comprar,
      lista_rapida,
      acepta_desc,
      acepta_ctacte,
      tags,
      ranking,
      activo,
      id_negocio,
    } = body;

    const updatedProducto = await prisma.productos.update({
      where: { id_producto: Number(id_producto) },
      data: {
        codigo: BigInt(codigo),
        producto,
        codigo_presentacion: BigInt(codigo_presentacion),
        id_rubros,
        id_proveedores,
        margen: margen ? parseFloat(margen) : null,
        margen_forzar,
        px_costo: px_costo ? parseFloat(px_costo) : null,
        px_venta: px_venta ? parseFloat(px_venta) : null,
        fecha_rotacion: fecha_rotacion ? new Date(fecha_rotacion) : null,
        mostrar,
        control_stock,
        comprar,
        lista_rapida,
        acepta_desc,
        acepta_ctacte,
        tags,
        ranking: ranking ? parseInt(ranking, 10) : null,
        activo,
        id_negocio: parseInt(id_negocio, 10),
      },
    });

    const updatedProductoWithStringBigInt = {
      ...updatedProducto,
      codigo: updatedProducto.codigo.toString(),
      codigo_presentacion: updatedProducto.codigo_presentacion.toString(),
    };

    return NextResponse.json(updatedProductoWithStringBigInt, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_producto } = body;
    
    await prisma.productos.delete({
      where: { id_producto: Number(id_producto) },
    });
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
  }
}