"use client"
import { ArrowUpDown } from "lucide-react" 
import { ColumnDef } from "@tanstack/react-table"
import { Prisma } from "@prisma/client"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Producto = Prisma.productosGetPayload<{}>
export const Columns: ColumnDef<Producto>[] = [
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
          const productos = row.original
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Codigo</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(productos.codigo.toString())}
                >
                  Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Ver producto</DropdownMenuItem>
                <DropdownMenuItem>Ver detalle</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    {
        accessorKey: "codigo",
        header: "Código",
    },
    
    {
        accessorKey: "producto",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Producto
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        accessorKey: "codigo_presentacion",
        header: "Código Presentación",
        cell: ({ row }) => {
            const codigo_presentacion = row.getValue("codigo_presentacion") as string;
            return <div className="text-center font-medium">{codigo_presentacion}</div>;
        }
    },
    {
        accessorKey: "id_rubros",
        header: "ID Rubros",
    },
    {
        accessorKey: "id_proveedores",
        header: "ID Proveedores",
        cell: ({ row }) => {
            const id_proveedores = row.getValue("id_proveedores") as string;
            return <div className="text-center font-medium">{id_proveedores}</div>;
        }
    },
    {
        accessorKey: "margen",
        header: "Margen",
        cell: ({ row }) => {
            const margen = parseFloat(row.getValue("margen"));
            return <div className="text-center font-medium">{margen}</div>;
        }
    },
    {
        accessorKey: "margen_forzar",
        header: "Margen Forzar",
        cell: ({ row }) => {
            const margen_forzar = parseFloat(row.getValue("margen_forzar"));
            const mostrar_forzar = row.getValue("margen_forzar");
            return <div className="text-center font-medium">{mostrar_forzar ? "si" : "no"}</div>;
        }
    },
    {
        accessorKey: "px_costo",
        header: () => <div className="text-right">Precio Costo</div>,
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
        accessorKey: "px_venta",
        header: () => <div className="text-right">Precio Venta</div>,
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
        accessorKey: "fecha_rotacion",
        header: "Fecha Rotación",
        cell: ({ row }) => {
            const fecha_rotacion = new Date(row.getValue("fecha_rotacion"));
            // Ajustar la fecha para evitar problemas de zona horaria
            const adjustedDate = new Date(fecha_rotacion.getTime() + fecha_rotacion.getTimezoneOffset() * 60000);
            const formatted = new Intl.DateTimeFormat("es-AR").format(adjustedDate);
    
            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "fecha_update",
        header: "Fecha Actualización",
        cell: ({ row }) => {
            const fecha_update = new Date(row.getValue("fecha_update"));
            // Ajustar la fecha para evitar problemas de zona horaria
            const adjustedDate = new Date(fecha_update.getTime() + fecha_update.getTimezoneOffset() * 60000);
            const formatted = new Intl.DateTimeFormat("es-AR", {
                dateStyle: "short",
                timeStyle: "short",
            }).format(adjustedDate);
    
            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "mostrar",
        header: "Mostrar",
        cell: ({ row }) => {
            const mostrar = row.getValue("mostrar");
            return <div className="text-center font-medium">{mostrar ? "si" : "no"}</div>;
        },
    },
    {
        accessorKey: "control_stock",
        header: "Control Stock",
        cell: ({ row }) => {
            const control_stock = row.getValue("control_stock");
            return <div className="text-center font-medium">{control_stock ? "si" : "no"}</div>;
        }
    },
    {
        accessorKey: "comprar",
        header: "Comprar",
        cell: ({ row }) => {
            const comprar = row.getValue("comprar");
            return <div className="text-center font-medium">{comprar ? "si" : "no"}</div>;
        }
    },
    {
        accessorKey: "lista_rapida",
        header: "Lista Rápida",
        cell: ({ row }) => {
            const lista_rapida = row.getValue("lista_rapida");
            return <div className="text-center font-medium">{lista_rapida ? "si" : "no"}</div>;
        }
    },
    {
        accessorKey: "acepta_desc",
        header: "Acepta Descuento",
        cell: ({ row }) => {
            const acepta_desc = row.getValue("acepta_desc");
            return <div className="text-center font-medium">{acepta_desc ? "si" : "no"}</div>;
        }
    },
    {
        accessorKey: "acepta_ctacte",
        header: "Acepta Cuenta Corriente",
        cell: ({ row }) => {
            const acepta_ctacte = row.getValue("acepta_ctacte");
            return <div className="text-center font-medium">{acepta_ctacte ? "si" : "no"}</div>;
        }
    },
    {
        accessorKey: "tags",
        header: "Tags",
    },
    {
        accessorKey: "ranking",
        header: "Ranking",
        cell: ({ row }) => {
            const ranking = row.getValue("ranking") as number;
            return <div className="text-center font-medium">{ranking}</div>;
        }
    },
    {
        accessorKey: "activo",
        header: "Activo",
        cell: ({ row }) => {
            const activo = row.getValue("activo");
            return <div className="text-center font-medium">{activo ? "si" : "no"}</div>;
        }
    },
    {
        accessorKey: "id_negocio",
        header: "ID Negocio",
    },
]
