import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id_rubro = searchParams.get('id_rubro');
    const id_negocio = searchParams.get('id_negocio');

    if (id_rubro) {
      const rubro = await prisma.rubros.findUnique({
        where: { id_rubro: Number(id_rubro) },
      });
      
      if (rubro) {
        return NextResponse.json(rubro, { status: 200 });
      } else {
        return NextResponse.json({ error: 'Rubro not found' }, { status: 404 });
      }
    } else if (id_negocio) {
      const rubros = await prisma.rubros.findMany({
        where: { id_negocio: Number(id_negocio) },
      });
      return NextResponse.json(rubros, { status: 200 });
    } else {
      const rubros = await prisma.rubros.findMany();
      return NextResponse.json(rubros, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching rubros:', error);
    return NextResponse.json({ error: 'Error fetching rubros' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id_negocio, 
      rubro, 
      margen 
    } = body;

    const newRubro = await prisma.rubros.create({
      data: {
        id_negocio: parseInt(id_negocio, 10),
        rubro,
        margen: margen ? parseFloat(margen) : 0.00,
      },
    });

    return NextResponse.json(newRubro, { status: 201 });
  } catch (error) {
    console.error('Error creating rubro:', error);
    return NextResponse.json({ error: 'Error creating rubro' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id_rubro, 
      id_negocio, 
      rubro, 
      margen 
    } = body;

    const updatedRubro = await prisma.rubros.update({
      where: { id_rubro: Number(id_rubro) },
      data: {
        id_negocio: parseInt(id_negocio, 10),
        rubro,
        margen: margen ? parseFloat(margen) : 0.00,
      },
    });

    return NextResponse.json(updatedRubro, { status: 200 });
  } catch (error) {
    console.error('Error updating rubro:', error);
    return NextResponse.json({ error: 'Error updating rubro' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_rubro } = body;
    
    await prisma.rubros.delete({
      where: { id_rubro: Number(id_rubro) },
    });
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting rubro:', error);
    return NextResponse.json({ error: 'Error deleting rubro' }, { status: 500 });
  }
}