"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Prisma } from "@prisma/client"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/app/productos/data-table-column-header"
import Link from "next/link"
export type Producto = Prisma.productosGetPayload<object>

export const columns: ColumnDef<Producto>[] = [
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const productos = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(productos.id_producto.toString())}
                        >
                            Copiar ID
                        </DropdownMenuItem>
                        <DropdownMenuItem >
                            <Link href={`/productos/action/?id_producto=${productos.id_producto}`}>
                            Editar
                            </Link>
                            
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                const confirmDelete = window.confirm(`¿Estás seguro de eliminar el producto con ID ${productos.id_producto}?`);
                                if (confirmDelete) {
                                    fetch(`/api/productos`, {
                                        method: 'DELETE',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ id_producto: productos.id_producto }),
                                    })
                                        .then(response => {
                                            if (response.ok) {
                                                window.location.reload();
                                            }
                                        })
                                        .catch(error => {
                                            console.error('Error al eliminar el producto:', error);
                                        });
                                }
                            }}
                        >
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        },
        {
        id: "codigo",    
        accessorKey: "codigo",
        header: "Código",
        },
        {   
        id: "producto",
        accessorKey: "producto",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Producto" />
        ),
        cell: ({ row }) => {
            return <div className="flex  items-center">{row.getValue('producto')}</div>;
          },
          filterFn: (row, columnId, filterValue) => {
              const cellValue = row.getValue(columnId);
              console.log("Cell Value:", cellValue, "Filter Value:", filterValue);
          
              // Si no hay filtro, muestra todas las filas
              if (!filterValue || (Array.isArray(filterValue) && filterValue.length === 0)) {
                  return true;
              }
          
              // Si el valor de filtro es un string, realiza el filtrado por string
              if (typeof filterValue === 'string') {
                  return (cellValue as string).toLowerCase().includes(filterValue.toLowerCase());
              }
          
              // Si el valor de filtro es un array, verifica si el valor de la celda está en el array
              if (Array.isArray(filterValue)) {
                  return filterValue.includes(cellValue);
              }
          
              return false; // En caso de que no coincida con ningún criterio
          },
        
    },
    {
        id: "codigo_presentacion",
        accessorKey: "codigo_presentacion",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="codigo_presentacion" />
        ),
        cell: ({ row }) => {
            const codigo_presentacion = row.getValue("codigo_presentacion") as string
            return <div className="text-center font-medium">{codigo_presentacion}</div>
        },
        filterFn: (row, columnId, filterValue) => {
            const cellValue = row.getValue(columnId);
            return filterValue.includes(cellValue as string);
        },
    },
    {
        id: "id_rubros",
        accessorKey: "id_rubros",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID Rubros" />
        ),
        
        filterFn: (row, columnId, filterValue) => {
            const cellValue = row.getValue(columnId);
            return filterValue.includes(cellValue as string);
        },
    },
    {
        id: "id_proveedores",
        accessorKey: "id_proveedores",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID Proveedores" />
        ),
        cell: ({ row }) => {
            const id_proveedores = row.getValue("id_proveedores") as string
            return <div className="text-center font-medium">{id_proveedores}</div>
        },
        filterFn: (row, columnId, filterValue) => {
            const cellValue = row.getValue(columnId);
            return filterValue.includes(cellValue as string);
        },
        
    },
    {
        id: "margen",
        accessorKey: "margen",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Margen" />
        ),
        cell: ({ row }) => {
            const margen = parseFloat(row.getValue("margen"))
            return <div className="text-center font-medium">{margen}</div>
        },
    },
    {
        id: "margen_forzar",
        accessorKey: "margen_forzar",
        header :({column}) =>(
            <DataTableColumnHeader column={column} title="Margen Forzar" />
        ),
        cell: ({ row }) => {
            // const margen_forzar = parseFloat(row.getValue("margen_forzar"))
            const mostrar_forzar = row.getValue("margen_forzar")
            return <div className="text-center font-medium">{mostrar_forzar ? "si" : "no"}</div>
        },
    },
    {
        id: "px_costo",
        accessorKey: "px_costo",
        header: ({column}) =>(
            <DataTableColumnHeader column={column} title="Precio Costo" />  
        ),
        cell: ({ row }) => {
            const px_costo = parseFloat(row.getValue("px_costo"))
            const formatted = new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
            }).format(px_costo)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        id: "px_venta",
        accessorKey: "px_venta",
        header: ({column}) =>(
            <DataTableColumnHeader column={column} title="Precio Venta" />
        ),
        cell: ({ row }) => {
            const px_venta = parseFloat(row.getValue("px_venta"))
            const formatted = new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
            }).format(px_venta)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        id: "fecha_rotacion",
        accessorKey: "fecha_rotacion",
        header: ({column}) =>(<DataTableColumnHeader column={column} title="Fecha Rotación" />),
        cell: ({ row }) => {
            const fecha_rotacion = new Date(row.getValue("fecha_rotacion"))
            const adjustedDate = new Date(fecha_rotacion.getTime() + fecha_rotacion.getTimezoneOffset() * 60000)
            const formatted = new Intl.DateTimeFormat("es-AR").format(adjustedDate)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        id: "fecha_update",
        accessorKey: "fecha_update",
        header: ({column}) =>(
            <DataTableColumnHeader column={column} title="Fecha Update" />
        ),
        cell: ({ row }) => {
            const fecha_update = new Date(row.getValue("fecha_update"))
            const adjustedDate = new Date(fecha_update.getTime() + fecha_update.getTimezoneOffset() * 60000)
            const formatted = new Intl.DateTimeFormat("es-AR", {
                dateStyle: "short",
                timeStyle: "short",
            }).format(adjustedDate)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        id: "mostrar",
        accessorKey: "mostrar",
        header: ({column}) =>(<DataTableColumnHeader column={column} title="Mostrar" />),
        cell: ({ row }) => {
            const mostrar = row.getValue("mostrar")
            return <div className="text-center font-medium">{mostrar ? "si" : "no"}</div>
        },
    },
    {
        id: "control_stock",
        accessorKey: "control_stock",
        header: ({column}) =>(<DataTableColumnHeader column={column} title="Control Stock" />),
        cell: ({ row }) => {
            const control_stock = row.getValue("control_stock")
            return <div className="text-center font-medium">{control_stock ? "si" : "no"}</div>
        },
    },
    {
        id: "comprar",
        accessorKey: "comprar",
        header: ({column}) =>(<DataTableColumnHeader column={column} title="Comprar" />),
        cell: ({ row }) => {
            const comprar = row.getValue("comprar")
            return <div className="text-center font-medium">{comprar ? "si" : "no"}</div>
        },
    },
    {
        id: "lista_rapida",
        accessorKey: "lista_rapida",
        header:({column}) =>(<DataTableColumnHeader column={column} title="Lista Rápida" />),
        cell: ({ row }) => {
            const lista_rapida = row.getValue("lista_rapida")
            return <div className="text-center font-medium">{lista_rapida ? "si" : "no"}</div>
        },
    },
    {
        id: "acepta_desc",
        accessorKey: "acepta_desc",
        header: ({column}) =>(<DataTableColumnHeader column={column} title="Acepta Descuento" />),
        cell: ({ row }) => {
            const acepta_desc = row.getValue("acepta_desc")
            return <div className="text-center font-medium">{acepta_desc ? "si" : "no"}</div>
        },
    },
    {
        id: "acepta_ctacte",
        accessorKey: "acepta_ctacte",
        header: ({column}) =>(<DataTableColumnHeader column={column} title="acepta_ctacte"/>),
        cell: ({ row }) => {
            const acepta_ctacte = row.getValue("acepta_ctacte")
            return <div className="text-center font-medium">{acepta_ctacte ? "si" : "no"}</div>
        },
    },
    {
        id: "tags",
        accessorKey: "tags",
        header: ({column}) =>(<DataTableColumnHeader column={column} title="tags"/>),
        
    },
    {
        id: "ranking",
        accessorKey: "ranking",
        header: ({column}) =>(<DataTableColumnHeader column={column} title="ranking"/>),
        cell: ({ row }) => {
            const ranking = row.getValue("ranking") as number
            return <div className="text-center font-medium">{ranking}</div>
        },
    },
    {
        id: "activo",
        accessorKey: "activo",
        header: ({column}) =>(<DataTableColumnHeader column={column} title="Activo" />),
        cell: ({ row }) => {
            const activo = row.getValue("activo")
            return <div className="text-center font-medium">{activo ? "si" : "no"}</div>
        },
    },
    {
        id: "id_negocio",
        accessorKey: "id_negocio",
        header: ({column})=>(<DataTableColumnHeader column={column} title="id_negocio"/>),
    },
]
