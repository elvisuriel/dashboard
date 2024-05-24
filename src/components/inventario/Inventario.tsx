import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import EarningsChartProduct from './EarningsChartProduct';
import { RiLineChartLine } from 'react-icons/ri';

interface Product {
  id: string;
  name: string;
  price: number;
  amount: number;
}

const Inventario: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showProducts, setShowProducts] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  const handleShowProducts = () => {
    setShowProducts(!showProducts);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    console.log('Inventario component loaded.');
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 mt-10 gap-8">
      <div className="bg-primary-100 p-8 rounded-xl text-gray-300 flex flex-col gap-6 xl:col-span-2">
        <RiLineChartLine className="text-5xl" />
        <span className="text-5xl text-white">Inventario</span>
        <span className="py-1 px-3 bg-primary-300/80 rounded-full">
          Variación respecto al mes anterior
        </span>
        <div className=' bg-slate-300  p-1 rounded-lg'>
          <EarningsChartProduct />
        </div>
      </div>
      <div className="xl:col-span-3 bg-primary-100 p-8 rounded-xl text-gray-300 flex flex-col gap-6">
        <div className="p-4">
          <h1 className="text-3xl mb-6">Inventario</h1>
          <button
            onClick={openModal}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Agregar Producto
          </button>
          <ProductForm
            onAddProduct={handleAddProduct}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        </div>
        <div className="mt-6">
          <button
            onClick={handleShowProducts}
            className="w-44 mb-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {showProducts ? 'Cerrar' : 'Ver productos'}
          </button>
          {showProducts && <ProductTable />}
        </div>
      </div>
    </section>
  );
};

export default Inventario;
