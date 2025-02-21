"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { bigint, z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  id_negocio: z.number().positive().int(),
  proveedor: z.string().min(2, {
    message: "proveedor must be at least 2 characters.",
  }),
  cuil: z.bigint().positive(),
  contacto: z.string().min(2, {
    message: "contacto must be at least 2 characters.",
  }),
  telefono: z.string().min(2, {
    message: "telefono must be at least 2 characters.",
  }),
  correo: z.string().email().min(2, {
    message: "correo must be a valid email and at least 2 characters.",
  }),
  pedidos_mail: z.boolean(),
  pedidos_telefono: z.boolean(),
  control_stock: z.boolean(),
  dias_preventista: z.string(),
  dias_entrega: z.string(),
});

const CrearProveedorForm = ({ initialData }: { initialData?: any }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id_proveedor = searchParams?.get("id_proveedor");
  console.log("id_proveedor", id_proveedor);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      id_negocio: 0,
      proveedor: "",
      cuil: BigInt(0),
      contacto: "",
      telefono: "",
      correo: "",
      pedidos_mail: false,
      pedidos_telefono: false,
      control_stock: false,
      dias_preventista: "",
      dias_entrega: "",
    },
  });
  useEffect(() => {
    if (id_proveedor) {
      fetch(`/api/proveedores?id_proveedor=${id_proveedor}`)
        .then(response => response.json())
        .then(data => form.reset({ ...data, cuil: BigInt(data.cuil) }));
    }
  }, [id_proveedor, form]);
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log("data", data);
      const response = await fetch("/api/proveedores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          cuil: data.cuil.toString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      toast.success("Proveedor creado exitosamente!");
      router.push('/dashboard/proveedores');
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al crear el proveedor.");
    }
  };
  // const { getValues } = useForm()

  const onUpdate = async () => {
    try {
      const data = form.getValues();
      console.log("data", data);
      const response = await fetch(`/api/proveedores?id_proveedor=${id_proveedor}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          cuil: data.cuil.toString(),
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      toast.success("Proveedor actualizado exitosamente!");
      router.push('/dashboard/proveedores');
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al actualizar el proveedor.");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(id_proveedor ? onUpdate : onSubmit)}
        className="space-y-8"
      >
        <div className="grid grid-cols-4 m-4 gap-8">
          <FormField
            control={form.control}
            name="id_negocio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Negocio</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ID Negocio"
                    type="number"
                    {...field}
                    value={field.value !== undefined ? Number(field.value) : ""}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                  />
                </FormControl>
                <FormDescription>Identificador del negocio.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="proveedor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proveedor</FormLabel>
                <FormControl>
                  <Input placeholder="Proveedor" {...field} />
                </FormControl>
                <FormDescription>Nombre del proveedor.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cuil"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CUIL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="CUIL"
                    value={
                      field.value !== undefined ? field.value.toString() : ""
                    } // Convert bigint to string
                    onChange={(event) =>
                      field.onChange(BigInt(event.target.value))
                    } // Convert string back to bigint
                  />
                </FormControl>
                <FormDescription>CUIL del proveedor.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contacto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del contacto</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del contacto" {...field} />
                </FormControl>
                <FormDescription>
                  Nombre del contacto del proveedor.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefono del contacto</FormLabel>
                <FormControl>
                  <Input placeholder="Telefono del contacto" {...field} />
                </FormControl>
                <FormDescription>
                  Telefono del contacto del proveedor.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="correo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electronico del contacto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Correo electronico del contacto"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Correo electronico del contacto del proveedor.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dias_preventista"
            render={(
              { field } // Ensure field is destructured here
            ) => (
              <FormItem>
                <FormLabel>Días preventista</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ? field.value : undefined}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Días preventista" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Días</SelectLabel>
                        <SelectItem value="L">Lunes</SelectItem>
                        <SelectItem value="Ma">Martes</SelectItem>
                        <SelectItem value="Mi">Miércoles</SelectItem>
                        <SelectItem value="J">Jueves</SelectItem>
                        <SelectItem value="V">Viernes</SelectItem>
                        <SelectItem value="S">Sábado</SelectItem>
                        <SelectItem value="D">Domingo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Días que se le notificará al proveedor para que se prepare
                  para la entrega.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dias_entrega"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dias de entrega</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ? field.value : undefined}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Dias de entrega" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Dias de entrega</SelectLabel>
                        <SelectItem value="L">Lunes</SelectItem>
                        <SelectItem value="Ma">Martes</SelectItem>
                        <SelectItem value="Mi">Miercoles</SelectItem>
                        <SelectItem value="J">Jueves</SelectItem>
                        <SelectItem value="V">Viernes</SelectItem>
                        <SelectItem value="S">Sabado</SelectItem>
                        <SelectItem value="D">Domingo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Dias que se le notificara al proveedor para que entregue los
                  productos.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pedidos_mail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  Enviar pedidos por mail
                </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="ml-2"
                  />
                </FormControl>
                <FormDescription>
                  Si se marca esta casilla, se enviará un mail con el pedido al
                  proveedor.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pedidos_telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  Enviar pedidos por teléfono
                </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="ml-2"
                  />
                </FormControl>
                <FormDescription>
                  Si se marca esta casilla, se enviará un SMS con el pedido al
                  teléfono del proveedor.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="control_stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="font-bold">Control de stock</span>
                </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="ml-2"
                  />
                </FormControl>
                <FormDescription>
                  Si se marca esta casilla, se hara seguimiento del stock de los
                  productos del proveedor.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {id_proveedor ? "Editar" : "Crear proveedor"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CrearProveedorForm;

