// // data-table-toolbar.tsx
"use client"

import { useEffect } from "react"
import Cookies from "js-cookie"
import { Table } from "@tanstack/react-table"
import { X, Download } from "lucide-react"
import * as XLSX from "xlsx"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
//eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DataTableToolbarProps<TData extends Record<string, any>> {
    table: Table<TData>
    data: TData[]
    tableId: string // Agregamos tableId para diferenciar cada tabla
}
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTableToolbar<TData extends Record<string, any>>({
    table,
    data,
    tableId,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    useEffect(() => {
        const savedFilters = Cookies.get(`${tableId}_tableFilters`)
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
    }, [table, tableId])
    const columnFilters = table.getState().columnFilters
    useEffect(() => {
        const filters = columnFilters
        Cookies.set(`${tableId}_tableFilters`, JSON.stringify(filters), { expires: 7 })
    }, [table, columnFilters, tableId])

    const exportToExcel = () => {
      const filteredData = table.getFilteredRowModel().rows.map(row => row.original)
      const worksheet = XLSX.utils.json_to_sheet(filteredData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data")
      XLSX.writeFile(workbook, "tabla_exportada.xlsx")
  }

    return (
        <div className="flex items-center justify-between m-4">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Filtrar..."
                    value={(table.getColumn("proveedor")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("proveedor")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn("proveedor") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("proveedor")}
                        title="Proveedor"
                        options={data.map((item) => ({ label: item.proveedor, value: item.proveedor }))}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => {
                            table.resetColumnFilters()
                            Cookies.remove(`${tableId}_tableFilters`)
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
            <DataTableViewOptions table={table} tableId={tableId} />
        </div>
    )
}
