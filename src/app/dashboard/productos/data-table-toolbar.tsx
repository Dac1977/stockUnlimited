"use client"

import { useEffect } from "react"
import Cookies from "js-cookie"
import { Table } from "@tanstack/react-table"
import { X, Download } from "lucide-react"
import * as XLSX from "xlsx" // Importar xlsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/app/dashboard/productos/data-table-view-options"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
//eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DataTableToolbarProps<TData extends Record<string, any>> {
    table: Table<TData>
    data: TData[]
}
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTableToolbar<TData extends Record<string, any>>({
    table,
    data,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    // Leer filtros desde la cookie al montar
    useEffect(() => {
        const savedFilters = Cookies.get("tableFilters")
        if (savedFilters) {
            try {
                const parsedFilters = JSON.parse(savedFilters)
                parsedFilters.forEach((filter: { id: string, value: string }) => {
                    table.getColumn(filter.id)?.setFilterValue(filter.value)
                })
            } catch (error) {
                console.error("Error parsing filters from cookie:", error)
            }
        }
    }, [table])
    const columnFilters = table.getState().columnFilters
    // Guardar filtros en la cookie cuando cambian
    useEffect(() => {
        const filters = table.getState().columnFilters
        Cookies.set("tableFilters", JSON.stringify(filters), { expires: 7 }) // Guarda por 7 días
    }, [table,columnFilters])

    const getUniqueValues = (columnId: string, data: TData[]) => {
        const values = Array.from(new Set(data.map(row => row[columnId]).flat()))
        return values
    }

    const uniqueProduct = getUniqueValues("producto", data)
    const uniqueIdRubros = getUniqueValues("id_rubros", data)
    const uniqueIdProveedores = getUniqueValues("id_proveedores", data)

    const createOptions = (uniqueValues: string[]) => {
        return uniqueValues.map(value => ({
            label: value,
            value: value
        }))
    }

    const productoOptions = createOptions(uniqueProduct)
    const idRubrosOptions = createOptions(uniqueIdRubros)
    const idProveedoresOptions = createOptions(uniqueIdProveedores)

    const exportToExcel = () => {
      const filteredData = table.getFilteredRowModel().rows.map(row => row.original) // Obtener datos filtrados
      const worksheet = XLSX.utils.json_to_sheet(filteredData) // Convertir a hoja de Excel
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data") // Agregar hoja
      XLSX.writeFile(workbook, "tabla_exportada.xlsx") // Descargar archivo
  }

    return (
        <div className="flex items-center justify-between m-4">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Filter products..."
                    value={(table.getColumn("producto")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("producto")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn("producto") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("producto")}
                        title="Producto"
                        options={productoOptions}
                    />
                )}
                {table.getColumn("id_proveedores") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("id_proveedores")}
                        title="Proveedores"
                        options={idProveedoresOptions}
                    />
                )}
                {table.getColumn("id_rubros") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("id_rubros")}
                        title="Rubros"
                        options={idRubrosOptions}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => {
                            table.resetColumnFilters()
                            Cookies.remove("tableFilters") // Eliminar la cookie al resetear
                        }}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X />
                    </Button>
                )}
                <Button
                    variant="outline"
                    onClick={exportToExcel}
                    className="h-8 px-2 lg:px-3"
                >
                    Exportar a Excel <Download className="ml-2 h-4 w-4" />
                </Button>
            </div>
            <DataTableViewOptions table={table} />
            
        </div>
    )
}
