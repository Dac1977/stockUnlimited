import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.



export const productSchema = z.object({
    id_producto: z.number(),
    codigo: z.bigint(),
    producto: z.string().max(30),
    codigo_presentacion: z.bigint(),
    id_rubros: z.string().max(30),
    id_proveedores: z.string().max(30),
    margen: z.number().optional(),
    margen_forzar: z.boolean().default(false),
    px_costo: z.number().optional(),
    px_venta: z.number().optional(),
    fecha_rotacion: z.date().optional(),
    fecha_update: z.date().default(new Date()),
    mostrar: z.boolean().default(true),
    control_stock: z.boolean().default(true),
    comprar: z.boolean().default(true),
    lista_rapida: z.boolean().default(false),
    acepta_desc: z.boolean().default(true),
    acepta_ctacte: z.boolean().default(true),
    tags: z.string().max(256),
    ranking: z.number().optional(),
    activo: z.boolean().default(true),
    id_negocio: z.number(),
});

export type ProductTable = z.infer<typeof productSchema>;