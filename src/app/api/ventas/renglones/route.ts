import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id_renglon = searchParams.get('id_renglon');
    const id_comprobante = searchParams.get('id_comprobante');
    const id_negocio = searchParams.get('id_negocio');
    

    if (id_renglon) {
      // Busca el proveedor en la base de datos
      const renglon = await prisma.ventas_renglones.findUnique({
        where: { id_renglon: Number(id_renglon) },
      });
      
      if (renglon) {
        return NextResponse.json({
          ...renglon,
          id_comprobante: renglon.id_comprobante.toString(),
        }, { status: 200 });
      } else {
        return NextResponse.json({ error: 'Renglon no encontrado' }, { status: 404 });
      }
    } else if (!id_renglon) {
      const renglones = await prisma.ventas_renglones.findMany({
        where: { id_comprobante: Number(id_comprobante) },
      });
      // Convertir todos los renglones a un formato serializable
      const renglonesSerializados = renglones.map(renglon => ({
        ...renglon,
        id_comprobante: renglon.id_comprobante.toString(), // Convertir BigInt a String
    }));
      return NextResponse.json(renglonesSerializados, { status: 200 });
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

// export async function POST(request: NextRequest) {
//     try {
//       const body = await request.json();
//       console.log('Datos recibidos:', body);
  
//       const { id_comprobante, id_producto, cantidad, px_costo, px_venta } = body;
  
//       // Validación de datos requeridos
//       if (!id_comprobante || !id_producto || !cantidad || !px_costo || !px_venta) {
//         return NextResponse.json(
//           { error: 'Todos los campos son obligatorios' },
//           { status: 400 }
//         );
//       }
  
//       // Crear registro en la base de datos
//       const venta = await prisma.ventas_renglones.create({
//         data: {
//           id_comprobante: Number(id_comprobante),
//           id_producto: Number(id_producto),
//           cantidad: cantidad, // Ya es string
//           px_costo: px_costo, // Ya es string
//           px_venta: px_venta, // Ya es string
//         },
//       });
  
//       return NextResponse.json(
//         { ...venta, id_comprobante: venta.id_comprobante.toString() }, 
//         { status: 201 }
//       );
//     } catch (error) {
//       console.error('Error en el POST:', error);
//       return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
//     }
//   }
export async function POST(request: NextRequest) {
  try {
      // Recibir el cuerpo de la solicitud como un array de objetos
      const body = await request.json();
      console.log('Datos recibidos:', body);

      // Validar que el cuerpo sea un array
      if (!Array.isArray(body)) {
          return NextResponse.json(
              { error: 'Se esperaba un array de objetos' },
              { status: 400 }
          );
      }

      // Validar cada objeto del array
      for (const item of body) {
          const { id_comprobante, id_producto, cantidad, px_costo, px_venta } = item;
          
          // Validación de datos requeridos
          if (!id_comprobante || !id_producto || !cantidad || !px_costo || !px_venta) {
              return NextResponse.json(
                  { error: 'Todos los campos son obligatorios en cada objeto' },
                  { status: 400 }
              );
          }
      }

      // Crear múltiples registros en la base de datos
      const ventas = await prisma.ventas_renglones.createMany({
          data: body.map(item => ({
              id_comprobante: Number(item.id_comprobante),
              id_producto: Number(item.id_producto),
              cantidad: item.cantidad, // Ya es string
              px_costo: item.px_costo, // Ya es string
              px_venta: item.px_venta, // Ya es string
          })),
      });

      return NextResponse.json(
          { message: 'Ventas creadas exitosamente', ventas },
          { status: 201 }
      );
  } catch (error) {
      console.error('Error en el POST:', error);
      return NextResponse.json(
          { error: 'Error interno del servidor' },
          { status: 500 }
      );
  }
}
  

