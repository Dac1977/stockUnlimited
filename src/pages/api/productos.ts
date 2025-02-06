import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const { id_producto } = req.query;
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
            res.status(200).json(productoWithStringBigInt);
          } else {
            res.status(404).json({ error: 'Product not found' });
          }
        } else {
          const productos = await prisma.productos.findMany();
          const productosWithStringBigInt = productos.map(producto => ({
            ...producto,
            codigo: producto.codigo.toString(),
            codigo_presentacion: producto.codigo_presentacion.toString(),
          }));
          res.status(200).json(productosWithStringBigInt);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products' });
      }
      break;
    case 'POST':
      try {
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
        } = req.body;

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

        res.status(201).json(newProductoWithStringBigInt);
      } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Error creating product' });
      }
      break;
    case 'PUT':
      try {
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
        } = req.body;

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

        res.status(200).json(updatedProductoWithStringBigInt);
      } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Error updating product' });
      }
      break;
    case 'DELETE':
      try {
        const { id_producto } = req.body;
        await prisma.productos.delete({
          where: { id_producto: Number(id_producto) },
        });
        res.status(204).end();
      } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Error deleting product' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}