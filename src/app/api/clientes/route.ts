import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const clients = await prisma.clientes.findMany();
    const clientsWithStringBigInt = clients.map(client => ({
      ...client,
      cuil: client.cuil?.toString(),
    }));
    return NextResponse.json(clientsWithStringBigInt, { status: 200 });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json({ error: 'Error fetching clients' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id_negocio, 
      usuario, 
      password, 
      correo, 
      telefono, 
      cuil, 
      ctacte, 
      acosto, 
      descuento, 
      pin 
    } = body;

    // Validaciones
    if (!id_negocio || !usuario || !password || !correo || !telefono || !cuil || 
        ctacte === undefined || acosto === undefined || descuento === undefined) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (pin < 0 || pin > 255) {
      return NextResponse.json({ error: 'Pin must be between 0 and 255' }, { status: 400 });
    }

    const client = await prisma.clientes.create({
      data: {
        id_negocio,
        usuario,
        password,
        correo,
        telefono,
        cuil,
        ctacte,
        acosto,
        descuento,
        pin,
      },
    });

    const clientWithStringBigInt = {
      ...client,
      cuil: client.cuil?.toString(),
    };

    return NextResponse.json(clientWithStringBigInt, { status: 201 });
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json({ 
      error: 'Error creating client', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}