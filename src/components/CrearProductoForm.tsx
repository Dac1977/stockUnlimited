"use client"

import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';

const productoSchema = z.object({
  codigo: z.string().nonempty("El código es requerido").max(7, "El código no puede tener más de 7 caracteres"),
  producto: z.string().nonempty("El nombre del producto es requerido").max(30, "El nombre no puede tener más de 30 caracteres"),
  codigo_presentacion: z.string().nonempty("El código de presentación es requerido").max(30, "El código de presentación no puede tener más de 30 caracteres"),
  id_rubros: z.string().nonempty("El ID de rubros es requerido").max(4, "El ID de rubros no puede tener más de 4 caracteres"),
  id_proveedores: z.string().nonempty("El ID de proveedores es requerido"),
  margen: z.string().max(4, "El margen no puede tener más de 4 caracteres").optional(),
  margen_forzar: z.boolean(),
  px_costo: z.string().optional(),
  px_venta: z.string().optional(),
  fecha_rotacion: z.string().optional(),
  mostrar: z.boolean(),
  control_stock: z.boolean(),
  comprar: z.boolean(),
  lista_rapida: z.boolean(),
  acepta_desc: z.boolean(),
  acepta_ctacte: z.boolean(),
  tags: z.string().optional(),
  ranking: z.union([z.string(), z.number()]).optional(),
  activo: z.boolean(),
  id_negocio: z.union([z.string().nonempty("El ID de negocio es requerido").max(7, "El ID de negocio no puede tener más de 7 caracteres"), z.number()]),
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CrearProductoForm: React.FC<{ onSubmit: (data: any) => void, onCancel: () => void, initialData?: any }> = ({ onSubmit, onCancel, initialData }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    codigo: '',
    producto: '',
    codigo_presentacion: '',
    id_rubros: '',
    id_proveedores: '',
    margen: '',
    margen_forzar: false,
    px_costo: '',
    px_venta: '',
    fecha_rotacion: '',
    mostrar: true,
    control_stock: true,
    comprar: true,
    lista_rapida: false,
    acepta_desc: true,
    acepta_ctacte: true,
    tags: '',
    ranking: '',
    activo: true,
    id_negocio: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const searchParams = useSearchParams();
  const id_producto = searchParams?.get("id_producto");
  console.log("ID", id_producto);
  useEffect(() => {
    if (id_producto) {
      fetch(`/api/productos?id_producto=${id_producto}`)
        .then(response => response.json())
        .then(data => setFormData(data));
    }
  }, [id_producto]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prevState => {
      const updatedFormData = {
        ...prevState,
        [name]: newValue,
      };

      // Validar los datos del formulario
      const result = productoSchema.safeParse(updatedFormData);
      if (!result.success) {
        const fieldErrors: { [key: string]: string } = {};
        result.error.errors.forEach(error => {
          if (error.path.length > 0) {
            fieldErrors[error.path[0]] = error.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setErrors({});
      }

      return updatedFormData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);

    // Validar los datos del formulario
    const result = productoSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach(error => {
        if (error.path.length > 0) {
          fieldErrors[error.path[0]] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      const response = await fetch(initialData ? `/api/productos/${initialData.id_producto}` : '/api/productos', {
        method: initialData ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        onSubmit(data);
        router.push('dashboard/productos');
      } else {
        console.error('Error al crear o actualizar el producto');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const handleCancel = () => {
    setFormData(initialData ?? {});
    setErrors({});
    onCancel();
  };

  const handleUpdate = async () => {
    if (id_producto) {
      try {
        // Asegúrate de pasar el ID del producto correctamente en la URL
        const response = await fetch(`/api/productos?id_producto=${id_producto}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), // Los datos a actualizar
        });
  
        // Verifica que la respuesta sea exitosa
        if (response.ok) {
          // const data = await response.json(); // Obtén el producto actualizado
          router.push('/dashboard/productos');
          
        } else {
          console.error('Error al actualizar el producto:', response.statusText);
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }

    }
  };
  
  

  return (
    <form onSubmit={handleSubmit} className="p-2 grid grid-cols-4 gap-2">
      <div className="mb-2">
        <label className="block text-gray-700">Código</label>
        <input
          type="text"
          name="codigo"
          value={formData.codigo ?? ''}
          onChange={handleChange}
          className="w-full p-1 border border-gray-300 rounded"
        />
        {errors.codigo && <p className="text-red-500 text-sm">{errors.codigo}</p>}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Producto</label>
        <input
          type="text"
          name="producto"
          value={formData.producto ?? ''}
          onChange={handleChange}
          className="w-full p-1 border border-gray-300 rounded"
        />
        {errors.producto && <p className="text-red-500 text-sm">{errors.producto}</p>}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Código Presentación</label>
        <input
          type="text"
          name="codigo_presentacion"
          value={formData.codigo_presentacion ?? ''}
          onChange={handleChange}
          className="w-full p-1 border border-gray-300 rounded"
        />
        {errors.codigo_presentacion && <p className="text-red-500 text-sm">{errors.codigo_presentacion}</p>}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">ID Rubros</label>
        <input
          type="text"
          name="id_rubros"
          value={formData.id_rubros ?? ''}
          onChange={handleChange}
          className="w-full p-1 border border-gray-300 rounded"
        />
        {errors.id_rubros && <p className="text-red-500 text-sm">{errors.id_rubros}</p>}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">ID Proveedores</label>
        <input
          type="text"
          name="id_proveedores"
          value={formData.id_proveedores ?? ''}
          onChange={handleChange}
          className="w-full p-1 border border-gray-300 rounded"
        />
        {errors.id_proveedores && <p className="text-red-500 text-sm">{errors.id_proveedores}</p>}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Margen</label>
        <input
          type="text"
          name="margen"
          value={formData.margen ?? ''}
          onChange={handleChange}
          className="w-full p-1 border border-gray-300 rounded"
        />
        {errors.margen && <p className="text-red-500 text-sm">{errors.margen}</p>}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Precio Costo</label>
        <input
          type="text"
          name="px_costo"
          value={formData.px_costo ?? ''}
          onChange={handleChange}
          className="w-full p-1 border border-gray-300 rounded"
        />
        {errors.px_costo && <p className="text-red-500 text-sm">{errors.px_costo}</p>}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Precio Venta</label>
        <input
          type="text"
          name="px_venta"
          value={formData.px_venta ?? ''}
          onChange={handleChange}
          className="w-full p-1 border border-gray-300 rounded"
        />
        {errors.px_venta && <p className="text-red-500 text-sm">{errors.px_venta}</p>}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Fecha Rotación</label>
        <input
          type="date"
          name="fecha_rotacion"
          value={formData.fecha_rotacion ?? ''}
          onChange={handleChange}
          className="w-full p-1 border border-gray-300 rounded"
        />
        {errors.fecha_rotacion && <p className="text-red-500 text-sm">{errors.fecha_rotacion}</p>}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Tags</label>
        <input
          type="text"
          name="tags"
          value={formData.tags ?? ''}
          onChange={handleChange}
          className="w-full p-1 border border-gray-300 rounded"
        />
        {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Ranking</label>
        <input
          type="text"
          name="ranking"
          value={formData.ranking ?? ''}
          onChange={handleChange}
          className="w-full p-1 border border-gray-300 rounded"
        />
        {errors.ranking && <p className="text-red-500 text-sm">{errors.ranking}</p>}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">ID Negocio</label>
        <input
          type="text"
          name="id_negocio"
          value={formData.id_negocio ?? ''}
          onChange={handleChange}
          className="w-full p-1 border border-gray-300 rounded"
        />
        {errors.id_negocio && <p className="text-red-500 text-sm">{errors.id_negocio}</p>}
      </div>
      <div className="mb-2 col-span-4 grid grid-cols-4 gap-2">
        <div>
          <label className="block text-gray-700">Margen Forzar</label>
          <input
            type="checkbox"
            name="margen_forzar"
            checked={formData.margen_forzar}
            onChange={handleChange}
            className="mr-2"
          />
          {errors.margen_forzar && <p className="text-red-500 text-sm">{errors.margen_forzar}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Mostrar</label>
          <input
            type="checkbox"
            name="mostrar"
            checked={formData.mostrar}
            onChange={handleChange}
            className="mr-2"
          />
          {errors.mostrar && <p className="text-red-500 text-sm">{errors.mostrar}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Control Stock</label>
          <input
            type="checkbox"
            name="control_stock"
            checked={formData.control_stock}
            onChange={handleChange}
            className="mr-2"
          />
          {errors.control_stock && <p className="text-red-500 text-sm">{errors.control_stock}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Comprar</label>
          <input
            type="checkbox"
            name="comprar"
            checked={formData.comprar}
            onChange={handleChange}
            className="mr-2"
          />
          {errors.comprar && <p className="text-red-500 text-sm">{errors.comprar}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Lista Rápida</label>
          <input
            type="checkbox"
            name="lista_rapida"
            checked={formData.lista_rapida}
            onChange={handleChange}
            className="mr-2"
          />
          {errors.lista_rapida && <p className="text-red-500 text-sm">{errors.lista_rapida}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Acepta Descuento</label>
          <input
            type="checkbox"
            name="acepta_desc"
            checked={formData.acepta_desc}
            onChange={handleChange}
            className="mr-2"
          />
          {errors.acepta_desc && <p className="text-red-500 text-sm">{errors.acepta_desc}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Acepta Cuenta Corriente</label>
          <input
            type="checkbox"
            name="acepta_ctacte"
            checked={formData.acepta_ctacte}
            onChange={handleChange}
            className="mr-2"
          />
          {errors.acepta_ctacte && <p className="text-red-500 text-sm">{errors.acepta_ctacte}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Activo</label>
          <input
            type="checkbox"
            name="activo"
            checked={formData.activo}
            onChange={handleChange}
            className="mr-2"
          />
          {errors.activo && <p className="text-red-500 text-sm">{errors.activo}</p>}
        </div>
      </div>
      <div className="flex justify-end col-span-4">
        <button type="button" onClick={handleCancel} className="bg-red-500 text-white p-2 rounded mr-2">
          Cancelar
        </button>
        <button
  type="submit"
  className="bg-blue-500 text-white p-2 rounded"
  onClick={(e) => {
    e.preventDefault(); // Para evitar el comportamiento predeterminado del botón
    if (id_producto) {
      handleUpdate(); // Si existe id_producto, actualiza el producto
    } else {
      handleSubmit(e); // Pass the event argument to handleSubmit
    }
  }}
>
  {id_producto ? 'Actualizar' : 'Crear'}
</button>

      </div>
    </form>
  );
};

export default CrearProductoForm;