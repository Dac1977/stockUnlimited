"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/app/dashboard/productos/data-table-view-options"

// import { labels, availability } from "../productos/data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DataTableToolbarProps<TData extends Record<string, any>> {
    table: Table<TData>
    data: TData[]
    
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      const uniqueIdRubros = getUniqueValues("id_rubros", data);
      const uniqueIdProveedores = getUniqueValues("id_proveedores", data);
      
      console.log("productos unicos",uniqueProduct);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const createOptions = (uniqueValues: string[], icon: any) => {
        return uniqueValues.map((value) => ({
          label: value,
          value: value,
          icon: icon,
        }));
      };
    
      const productoOptions = createOptions(uniqueProduct, null);
      const idRubrosOptions = createOptions(uniqueIdRubros, null);
      const idProveedoresOptions = createOptions(uniqueIdProveedores, null);
      
      console.log("productos options",productoOptions);
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
                        title="producto"
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