"use client";

import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  tableId: string; // Agregamos tableId para diferenciar la cookie de paginación
}

export function DataTablePagination<TData>({ table, tableId }: DataTablePaginationProps<TData>) {
  const cookieName = `${tableId}_pagination`;
  const storedPagination = Cookies.get(cookieName);
  const initialPagination = storedPagination
    ? JSON.parse(storedPagination)
    : { pageIndex: 0, pageSize: 10 };

  const [pageIndex, setPageIndex] = useState<number>(initialPagination.pageIndex);
  const [pageSize, setPageSize] = useState<number>(initialPagination.pageSize);
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(true);
  const rows = table.getRowModel().rows;
  useEffect(() => {
    if (rows.length > 0) {
      setLoading(false);
      const totalPageCount = table.getPageCount();
      if (pageIndex >= totalPageCount) {
        setPageIndex(Math.max(0, totalPageCount - 1));
      }
      table.setPageIndex(pageIndex);
      table.setPageSize(pageSize);
    }
  }, [table, rows.length, pageIndex, pageSize]);

  useEffect(() => {
    Cookies.set(cookieName, JSON.stringify({ pageIndex, pageSize }), { expires: 7 });
    table.setPageIndex(pageIndex);
    table.setPageSize(pageSize);
  }, [table, pageIndex, pageSize, cookieName]);

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} fila(s) seleccionada.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Filas por página</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              const newSize = Number(value);
              setPageSize(newSize);
              table.setPageSize(newSize);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={`${pageSize}`} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {pageIndex + 1} de {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir a la primera página</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setPageIndex((prev) => Math.max(0, prev - 1))}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir a la página previa</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setPageIndex((prev) => Math.min(table.getPageCount() - 1, prev + 1))}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Siguiente página</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir a la última página</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
