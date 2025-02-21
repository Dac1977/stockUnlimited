
"use client"

import { useEffect, useState } from "react"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Table } from "@tanstack/react-table"
import { Settings2 } from "lucide-react"
import Cookies from "js-cookie"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface DataTableViewOptionsProps<TData> {
    table: Table<TData>
    tableId: string // ID único para diferenciar cada tabla
}

export function DataTableViewOptions<TData>({ table, tableId }: DataTableViewOptionsProps<TData>) {
    const cookieName = `${tableId}_columnVisibility` // Nombre único de la cookie
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({})

    useEffect(() => {
        const storedVisibility = Cookies.get(cookieName)
        if (storedVisibility) {
            const parsedVisibility = JSON.parse(storedVisibility)
            setColumnVisibility(parsedVisibility)

            // Aplicar visibilidad guardada a la tabla
            Object.keys(parsedVisibility).forEach((columnId) => {
                table.getColumn(columnId)?.toggleVisibility(parsedVisibility[columnId])
            })
        }
    }, [table, cookieName])

    const handleColumnToggle = (columnId: string, isVisible: boolean) => {
        setColumnVisibility((prevVisibility) => {
            const newVisibility = { ...prevVisibility, [columnId]: isVisible }
            Cookies.set(cookieName, JSON.stringify(newVisibility), { expires: 7 })
            return newVisibility
        })

        table.getColumn(columnId)?.toggleVisibility(isVisible)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex">
                    <Settings2 />
                    Ver
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px] overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
                <DropdownMenuLabel>Ver/Ocultar columnas</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                    .getAllColumns()
                    .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                    .map((column) => (
                        <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={columnVisibility[column.id] ?? column.getIsVisible()}
                            onCheckedChange={(value) => handleColumnToggle(column.id, !!value)}
                        >
                            {column.id}
                        </DropdownMenuCheckboxItem>
                    ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
