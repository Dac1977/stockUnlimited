import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id_comprobante = searchParams.get('id_comprobante');
    const id_negocio = searchParams.get('id_negocio');
    

    if (id_comprobante) {
      // Busca el proveedor en la base de datos
      const venta = await prisma.ventas.findUnique({
        where: { id_comprobante: Number(id_comprobante) },
      });
      
      if (venta) {
        return NextResponse.json({
          ...venta,
          
        }, { status: 200 });
      } else {
        return NextResponse.json({ error: 'Venta no encontrada' }, { status: 404 });
      }
    } else if (!id_comprobante) {
      const ventas = await prisma.ventas.findMany({
        where: { id_negocio: Number(id_negocio) },
      });
      // Convertir todos los proveedores a un formato serializable
      const ventasSerializados = ventas.map(venta => ({
        ...venta,
        id_comprobante: venta.id_comprobante.toString(), // Convertir BigInt a String
        id_negocio: venta.id_negocio.toString(), // Convertir BigInt a String
    }));
      return NextResponse.json(ventasSerializados, { status: 200 });
    } else {
      const ventas = await prisma.ventas.findMany();
      // Convertir todos los proveedores a un formato serializable
      const ventasSerializados = ventas.map(venta => ({
        ...venta,
        id_comprobante: venta.id_comprobante.toString(), // Convertir BigInt a String
        id_negocio: venta.id_negocio.toString(), // Convertir BigInt a String
    }));
      return NextResponse.json(ventasSerializados, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching ventas:', error);
    return NextResponse.json({ error: 'Error fetching ventas' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id_turno,
      id_negocio,
      id_cliente,
      id_pago,
      id_transaccion,
      fecha,
      costo_total,
      venta_total,
      estado,
      variacion_venta,
      variacion_peso,
    } = body;
    console.log("body", body)
    const newVenta = await prisma.ventas.create({
      data: {
        id_turno: parseInt(id_turno, 10),
        id_negocio: parseInt(id_negocio, 10),
        id_cliente: parseInt(id_cliente, 10),
        id_pago: parseInt(id_pago, 10),
        id_transaccion: id_transaccion ? parseInt(id_transaccion, 10) : null,
        fecha,
        costo_total,
        venta_total,
        estado,
        variacion_venta,
        variacion_peso,
      },
    });

    return NextResponse.json({
        ...newVenta,
        id_comprobante: newVenta.id_comprobante.toString(),
        id_turno: newVenta.id_turno.toString(),
        id_negocio: newVenta.id_negocio.toString(),
        id_cliente: newVenta.id_cliente.toString(),
        id_pago: newVenta.id_pago.toString(),
        id_transaccion: newVenta.id_transaccion?.toString(), // Manejar caso null
    }, { status: 201 });
} catch (error: unknown) {
    if (error instanceof Error) {
        console.error('Error creating venta:', error.message);
        return NextResponse.json({ error: 'Error creating venta', details: error.message }, { status: 500 });
    } else {
        console.error('Error creating venta:', error);
        return NextResponse.json({ error: 'Error creating venta', details: 'Unknown error' }, { status: 500 });
    }
}
}
export async function PUT(request: NextRequest) {
    try {
      const body = await request.json();
      const { id_comprobante, id_negocio, ...rest } = body;
      const updatedVenta = await prisma.ventas.update({
        where: { id_comprobante: Number(id_comprobante) },
        data: {...rest, id_negocio: parseInt(id_negocio, 10)},
      });
      return NextResponse.json({
        ...updatedVenta,
        id_comprobante: updatedVenta.id_comprobante.toString(),
        id_turno: updatedVenta.id_turno.toString(),
        id_negocio: updatedVenta.id_negocio.toString(),
        id_cliente: updatedVenta.id_cliente.toString(),
        id_pago: updatedVenta.id_pago.toString(),
        id_transaccion: updatedVenta.id_transaccion?.toString(), 
      }, { status: 200 });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error updating venta:', error.message);
        return NextResponse.json({ error: 'Error updating venta', details: error.message }, { status: 500 });
      } else {
        console.error('Error updating venta:', error);
        return NextResponse.json({ error: 'Error updating venta', details: 'Unknown error' }, { status: 500 });
      }
    }
  }

  export async function DELETE(request: NextRequest) {
    try {
      const { id_comprobante } = await request.json();
      const deletedVenta = await prisma.ventas.delete({
        where: { id_comprobante: Number(id_comprobante) },
      });
      return NextResponse.json({
        ...deletedVenta,
        id_comprobante: deletedVenta.id_comprobante.toString(),
        id_turno: deletedVenta.id_turno.toString(),
        id_negocio: deletedVenta.id_negocio.toString(),
        id_cliente: deletedVenta.id_cliente.toString(),
        id_pago: deletedVenta.id_pago.toString(),
        id_transaccion: deletedVenta.id_transaccion?.toString(), 
      }, { status: 200 });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error deleting venta:', error.message);
        return NextResponse.json({ error: 'Error deleting venta', details: error.message }, { status: 500 });
      } else {
        console.error('Error deleting venta:', error);
        return NextResponse.json({ error: 'Error deleting venta', details: 'Unknown error' }, { status: 500 });
      }
    }
  }
