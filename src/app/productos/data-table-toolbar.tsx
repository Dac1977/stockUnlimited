"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/app/productos/data-table-view-options"

import { labels, availability } from "../productos/data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData extends Record<string, any>> {
    table: Table<TData>
    data: TData[]
    
}

export function DataTableToolbar<TData extends Record<string, any>>({
    table,
    data,
    
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0
    console.log("columna productos",data)
    const getUniqueValues = (columnId: string, data: TData[]) => {
      const values = data.map((row: TData) => row[columnId])
        ? Array.from(
          new Set(
            // Aplanar el array y obtener los valores únicos, incluyendo vacíos
            data.map((row) => row[columnId])
              .map((item: any) => {
                // Convertir claves vacías en 'sin completar'
                if (Array.isArray(item) && item.length === 0) {
                  return null;
                }
                return item;
              })
             .flat() // Aplanar nuevamente después de dividir claves combinadas
          )
        )
        : [];
      return values;
    };
      const uniqueProduct = getUniqueValues("producto", data);
      
      console.log("productos unicos",uniqueProduct);
      const createOptions = (uniqueValues: string[], icon: any) => {
        return uniqueValues.map((value) => ({
          label: value,
          value: value,
          icon: icon,
        }));
      };
    
      const productoOptions = createOptions(uniqueProduct, null);
      console.log("productos options",productoOptions);
    return (
        <div className="flex items-center justify-between">
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
                        title="producto"
                        options={productoOptions}
                    />
                )}
                {/* {table.getColumn("availability") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("availability")}
                        title="Availability"
                        options={availability}
                    />
                )} */}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    )
}