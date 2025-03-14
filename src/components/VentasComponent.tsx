"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";




interface Producto {
  acepta_ctacte: boolean;
  acepta_desc: boolean;
  activo: boolean;
  codigo: string;
  codigo_presentacion: string;
  comprar: boolean;
  control_stock: boolean;
  fecha_rotacion: string;
  fecha_update: string;
  id_negocio: number;
  id_producto: number;
  id_proveedores: string;
  id_rubros: string;
  lista_rapida: boolean;
  margen: string;
  margen_forzar: boolean;
  mostrar: boolean;
  producto: string;
  px_costo: string;
  px_venta: string;
  ranking: number;
  tags: string;
  cantidad: number;
} 

interface Cliente {
  usuario: string;
  id_cliente: number;
}

export default function VentasComponent() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Producto | null>(null);
  const [listaProductos, setListaProductos] = useState<Producto[]>([]);
  const [listaClientes, setListaClientes] = useState<Cliente[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  
  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json())
      .then((data) => setListaProductos(data));

    fetch("/api/clientes")
      .then((res) => res.json())
      .then((data) => setListaClientes(data));
  }, []);

  const form = useForm({
    defaultValues: {
      id_producto: 0,
      producto: "",
      cantidad: 1,
      px_venta: 0,
      cliente: "",
      forma_pago: "",
      px_costo: 0,
    },
  });
 console.log(listaProductos)
 const agregarProducto = (values: any) => {
    if (values.id_producto === 0) {
      toast.error("No ha seleccionado un producto.");
      return;
    }
    if (values.cantidad === 0 ) {
      toast.error("No ha ingresado una cantidad de productos.");
      return;
    }
    if (values.id_producto && values.cantidad > 0) {
      setProductos((prev) => [...prev, values]);
      form.reset({ id_producto: 0, producto: "", cantidad: 0, px_venta: 0, cliente: form.getValues("cliente"), forma_pago: form.getValues("forma_pago"), px_costo: 0 });
      setSelected(null);
    }
  };

  const eliminarProducto = (index: number) => {
    setProductos((prev) => prev.filter((_, i) => i !== index));
  };
  const costoTotal = productos.reduce(
    (acc, producto) => acc + producto.cantidad * parseFloat(producto.px_costo),
    0
  );
  const totalVenta = productos.reduce(
    (acc, producto) => acc + producto.cantidad * parseFloat(producto.px_venta),
    0
  );

  const cancelarVenta = () => {
    setProductos([]);
  };

  const imputarVenta = async () => {
    if (productos.length === 0) {
      toast.error("No hay productos en la venta.");
      return;
    }
  
    try {
      const res = await fetch("/api/ventas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_turno: 1,
          id_negocio: "321",
          id_cliente: 123,
          id_pago: 457,
          id_transaccion: 789,
          fecha: new Date().toISOString(),
          costo_total: costoTotal.toFixed(2),
          venta_total: totalVenta.toFixed(2),
          estado: "1",
          variacion_venta: "5",
          variacion_peso: "2",
        }),
      });
  
      if (!res.ok) throw new Error("Error al cargar la venta.");
  
      const data = await res.json(); // Espera la respuesta
      const id_comprobante = data.id_comprobante;
  
      const renglonesRes = await fetch("/api/ventas/renglones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          productos.map((producto, index) => ({
            id_renglon: index + 1,
            id_comprobante: id_comprobante.toString(), // Ahora se usa correctamente
            id_producto: producto.id_producto,
            cantidad: producto.cantidad.toString(),
            px_costo: producto.px_costo.toString(),
            px_venta: producto.px_venta.toString(),
          }))
        ),
      });
  
      if (!renglonesRes.ok) throw new Error("Error al imputar la venta.");
  
      toast.success("Venta imputada con éxito.");
      setProductos([]);
    } catch (error) {
      toast.error("Error al imputar la venta.");
    }
  };
  
 
 console.log(productos);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cargar Venta</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(agregarProducto)}
            className="space-y-4"
          >
            <div className="flex gap-4">
              {/* Selección de producto */}
              <FormField
                control={form.control}
                name="producto"
                render={({ field }) => (
                  <FormItem className="w-[200px]">
                    <FormLabel>Producto</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {selected
                            ? selected.producto
                            : "Selecciona un producto"}
                          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Buscar producto..."
                            onValueChange={setSearch}
                          />
                          <CommandList>
                            {listaProductos
                              .filter((p) =>
                                p.producto
                                  .toLowerCase()
                                  .includes(search.toLowerCase())
                              )
                              .map((producto) => (
                                <CommandItem
                                  key={producto.id_producto}
                                  value={producto.producto}
                                  onSelect={() => {
                                    setSelected(producto);
                                    form.setValue(
                                      "producto",
                                      producto.producto
                                    );
                                    form.setValue(
                                      "id_producto",
                                      producto.id_producto
                                    );
                                    form.setValue("px_venta", parseFloat(producto.px_venta));
                                    setOpen(false);
                                    form.setValue("px_costo", parseFloat(producto.px_costo));
                                  }}
                                >
                                  {producto.producto}
                                </CommandItem>
                              ))}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cliente */}
              <FormField
                control={form.control}
                name="cliente"
                render={({ field }) => (
                  <FormItem className="w-[180px]">
                    <FormLabel>Cliente</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un Cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        {listaClientes.map((cliente) => (
                          <SelectItem
                            key={cliente.id_cliente}
                            value={cliente.usuario}
                          >
                            {cliente.usuario}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Forma de pago */}
              <FormField
                control={form.control}
                name="forma_pago"
                render={({ field }) => (
                  <FormItem className="w-[200px]">
                    <FormLabel>Forma de Pago</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Forma de Pago" />
                      </SelectTrigger>
                      <SelectContent>
                        {["efectivo", "tarjeta", "transferencia"].map((forma) => (
                          <SelectItem key={forma} value={forma}>
                            {forma}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cantidad */}
              <FormField
                control={form.control}
                name="cantidad"
                render={({ field }) => (
                  <FormItem className="w-[80px]">
                    <FormLabel>Cantidad</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step={1}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Precio */}
              <FormField
                control={form.control}
                name="px_venta"
                render={({ field }) => (
                  <FormItem className="w-[100px]">
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Agregar</Button>
            </div>
          </form>
        </Form>

        {/* Tabla de productos agregados */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Precio Unitario</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((producto, index) => (
              <TableRow key={index}>
                <TableCell>{producto.producto}</TableCell>
                <TableCell>{producto.cantidad}</TableCell>
                <TableCell>${producto.px_venta}</TableCell>
                <TableCell>
                  ${(producto.cantidad * parseFloat(producto.px_venta)).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => eliminarProducto(index)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Total */}
        <div className="flex justify-end mt-4 text-lg font-semibold">
          Total: ${totalVenta.toFixed(2)}
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="default" onClick={cancelarVenta}>
            Cancelar
          </Button>
          <Button variant="imputar" onClick={imputarVenta}>
            Imputar Venta
          </Button>
          <Button variant="destructive" onClick={() => console.log("Facturar Venta")}>
            Facturar Venta
          </Button>
          <Toaster />
        </div>
      </CardContent>
    </Card>
  );
}
