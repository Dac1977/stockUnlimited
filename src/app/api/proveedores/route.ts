import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  // La funcion GET se encarga de buscar los proveedores que se encuentran en la base de datos.
  // Puede recibir dos parametros en la url: id_proveedor e id_negocio.
  // Si se envia el id_proveedor, se busca solo ese proveedor en particular.
  // Si se envia el id_negocio, se buscan todos los proveedores que pertenecen a ese negocio.
  // Si no se envia ninguno de los dos, se buscan todos los proveedores que hay en la base de datos.
  try {
    const { searchParams } = new URL(request.url);
    const id_proveedor = searchParams.get('id_proveedor');
    const id_negocio = searchParams.get('id_negocio');

    if (id_proveedor) {
      // Busca el proveedor en la base de datos
      const proveedor = await prisma.proveedores.findUnique({
        where: { id_proveedor: Number(id_proveedor) },
      });
      
      if (proveedor) {
        return NextResponse.json({
          ...proveedor,
          cuil: proveedor.cuil.toString(), // Convertir cuil a string
        }, { status: 200 });
      } else {
        return NextResponse.json({ error: 'Proveedor no encontrado' }, { status: 404 });
      }
    } else if (id_negocio) {
      const proveedores = await prisma.proveedores.findMany({
        where: { id_negocio: Number(id_negocio) },
      });
      // Convertir todos los proveedores a un formato serializable
      const proveedoresSerializados = proveedores.map(proveedor => ({
        ...proveedor,
        cuil: proveedor.cuil.toString(), // Convertir cuil a string
      }));
      return NextResponse.json(proveedoresSerializados, { status: 200 });
    } else {
      const proveedores = await prisma.proveedores.findMany();
      // Convertir todos los proveedores a un formato serializable
      const proveedoresSerializados = proveedores.map(proveedor => ({
        ...proveedor,
        cuil: proveedor.cuil.toString(), // Convertir cuil a string
      }));
      return NextResponse.json(proveedoresSerializados, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching proveedores:', error);
    return NextResponse.json({ error: 'Error fetching proveedores' }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id_negocio, 
      proveedor, 
      cuil, 
      contacto, 
      telefono, 
      correo, 
      pedidos_mail, 
      pedidos_telefono, 
      control_stock, 
      dias_preventista, 
      dias_entrega 
    } = body;

    const newProveedor = await prisma.proveedores.create({
      data: {
        id_negocio: parseInt(id_negocio, 10),
        proveedor,
        cuil: BigInt(cuil),
        contacto,
        telefono,
        correo,
        pedidos_mail,
        pedidos_telefono,
        control_stock,
        dias_preventista,
        dias_entrega,
      },
    });

    return NextResponse.json(
      { ...newProveedor, cuil: newProveedor.cuil.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating proveedor:', error);
    return NextResponse.json({ error: 'Error creating proveedor' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id_proveedor = searchParams.get('id_proveedor');
  console.log("id proveedor",id_proveedor);
  if (!id_proveedor) {
    return NextResponse.json({ error: 'No se ha proporcionado el id_proveedor' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { 
      
      id_negocio, 
      proveedor, 
      cuil, 
      contacto, 
      telefono, 
      correo, 
      pedidos_mail, 
      pedidos_telefono, 
      control_stock, 
      dias_preventista, 
      dias_entrega 
    } = body;
    console.log("body", body);
    const updatedProveedor = await prisma.proveedores.update({
      where: { id_proveedor: Number(id_proveedor) },
      data: {
        id_negocio: parseInt(id_negocio, 10),
        proveedor,
        cuil: BigInt(cuil),
        contacto,
        telefono,
        correo,
        pedidos_mail,
        pedidos_telefono,
        control_stock,
        dias_preventista,
        dias_entrega,
      },
    });

    if (!updatedProveedor) {
      return NextResponse.json({ error: 'Proveedor not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...updatedProveedor,
      cuil: updatedProveedor.cuil.toString(), // Convertir cuil a string
    }, { status: 200 });
  } catch (error) {
    console.error('Error updating proveedor:', error);
    return NextResponse.json({ error: 'Error updating proveedor' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_proveedor } = body;
    
    await prisma.proveedores.delete({
      where: { id_proveedor: Number(id_proveedor) },
    });
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting proveedor:', error);
    return NextResponse.json({ error: 'Error deleting proveedor' }, { status: 500 });
  }
}