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
import { DataTableColumnHeader } from "@/app/dashboard/productos/data-table-column-header"
import Link from "next/link"
export type Proveedores = Prisma.proveedoresGetPayload<object>

export const columns: ColumnDef<Proveedores>[] = [
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const proveedores = row.original

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
                            onClick={() => navigator.clipboard.writeText(proveedores.id_proveedor.toString())}
                        >
                            Copiar ID
                        </DropdownMenuItem>
                        <DropdownMenuItem >
                            <Link href={`/dashboard/proveedores/action/?id_proveedor=${proveedores.id_proveedor}`}>
                            Editar
                            </Link>
                            
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                const confirmDelete = window.confirm(`¿Estás seguro de eliminar el proveedor con ID ${proveedores.id_proveedor}?`);
                                if (confirmDelete) {
                                    fetch(`/api/proveedores`, {
                                        method: 'DELETE',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ id_proveedor: proveedores.id_proveedor }),
                                    })
                                        .then(response => {
                                            if (response.ok) {
                                                window.location.reload();
                                            }
                                        })
                                        .catch(error => {
                                            console.error('Error al eliminar el proveedor:', error);
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
        id: "id_proveedor",    
        accessorKey: "id_proveedor",
        header: "ID Proveedor",
        },
        {   
        id: "proveedor",
        accessorKey: "proveedor",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Proveedor" />
        ),
        cell: ({ row }) => {
            return <div className="flex  items-center">{row.getValue('proveedor')}</div>;
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
          
              return false; // En caso de que no coincida con ninguno de los criterios
          },
        
    },
    {
        id: "cuil",
        accessorKey: "cuil",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="CUIL" />
        ),
        cell: ({ row }) => {
            const cuil = row.getValue("cuil") as string
            return <div className="text-center font-medium">{cuil}</div>
        },
        filterFn: (row, columnId, filterValue) => {
            const cellValue = row.getValue(columnId);
            return filterValue.includes(cellValue as string);
        },
    },
    {
        id: "contacto",
        accessorKey: "contacto",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Contacto" />
        ),
        
        filterFn: (row, columnId, filterValue) => {
            const cellValue = row.getValue(columnId);
            return filterValue.includes(cellValue as string);
        },
    },
    {
        id: "telefono",
        accessorKey: "telefono",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Telefono" />
        ),
        cell: ({ row }) => {
            const telefono = row.getValue("telefono") as string
            return <div className="text-center font-medium">{telefono}</div>
        },
        filterFn: (row, columnId, filterValue) => {
            const cellValue = row.getValue(columnId);
            return filterValue.includes(cellValue as string);
        },
        
    },
    {
        id: "correo",
        accessorKey: "correo",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Correo" />
        ),
        cell: ({ row }) => {
            const correo = row.getValue("correo") as string
            return <div className="text-center font-medium">{correo}</div>
        },
    },
    
    {
        id: "pedidos_mail",
        accessorKey: "pedidos_mail",
        header: ({column}) =>(
            <DataTableColumnHeader column={column} title="Pedidos Mail" />  
        ),
        cell: ({ row }) => {
            const pedidos_mail = row.getValue("pedidos_mail")
            const formatted = pedidos_mail === true ? "Si" : "No"

            return <div className="text-center font-medium">{formatted}</div>
        },
    },
    {
        id:"pedidos_telefono",
        accessorKey: "pedidos_telefono",
        header: ({column}) =>(
            <DataTableColumnHeader column={column} title="Pedidos Telefono" />
        ),
        cell: ({ row }) => {
            const pedidos_telefono =row.getValue("pedidos_telefono")
            const formatted = pedidos_telefono === true ? "Si" : "No"

            return <div className="text-center font-medium">{formatted}</div>
        },
    },
    {
        id: "control_stock",
        accessorKey: "control_stock",
        header: ({column}) =>(
            <DataTableColumnHeader column={column} title="Control Stock" />
        ),
        cell: ({ row }) => {
            const control_stock = (row.getValue("control_stock"))
            const formatted = control_stock === true ? "Si" : "No"

            return <div className="text-center font-medium">{formatted}</div>
        },
    },
    {
        id: "dias_preventista",
        accessorKey: "dias_preventista",
        header: ({column}) =>(<DataTableColumnHeader column={column} title="Días Preventista" />),
        cell: ({ row }) => {
            const dias_preventista = row.getValue("dias_preventista") as string
            const formatted = `${dias_preventista}`

            return <div className="text-center font-medium">{formatted}</div>
        },
    },
    {
        id: "dias_entrega",
        accessorKey: "dias_entrega",
        header: ({column}) =>(
            <DataTableColumnHeader column={column} title="Días Entrega" />
        ),
        cell: ({ row }) => {
            const dias_entrega = row.getValue("dias_entrega") as string
            const formatted = `${dias_entrega}`

            return <div className="text-center font-medium">{formatted}</div>
        },
    },
    // {
    //     id: "mostrar",
    //     accessorKey: "mostrar",
    //     header: ({column}) =>(<DataTableColumnHeader column={column} title="Mostrar" />),
    //     cell: ({ row }) => {
    //         const mostrar = row.getValue("mostrar")
    //         return <div className="text-center font-medium">{mostrar === true ? "si" : "no"}</div>
    //     },
    // },
    
]
