import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const clients = await prisma.clientes.findMany();
      const clientsWithStringBigInt = clients.map(client => ({
        ...client,
        cuil: client.cuil?.toString(),
      }));
      res.status(200).json(clientsWithStringBigInt);
    } catch (error) {
      console.error('Error fetching clients:', error);
      res.status(500).json({ error: 'Error fetching clients' });
    }
  } else if (req.method === 'POST') {
    console.log('Request body:', req.body);
    const { id_negocio, usuario, password, correo, telefono, cuil, ctacte, acosto, descuento, pin } = req.body;

    if (!id_negocio || !usuario || !password || !correo || !telefono || !cuil || ctacte === undefined || acosto === undefined || descuento === undefined) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    if (pin < 0 || pin > 255) {
      res.status(400).json({ error: 'Pin must be between 0 and 255' });
      return;
    }

    try {
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

      res.status(201).json(clientWithStringBigInt);
    } catch (error) {
      console.error('Error creating client:', error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      res.status(500).json({ error: 'Error creating client', details: (error as any).message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}