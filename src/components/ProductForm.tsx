import React, { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import Swal from 'sweetalert2';

interface Product {
    id: number;
    name: string;
    price: number;
}

interface ProductFormProps {
    onAddProduct: (newProduct: Product) => void;
    isOpen: boolean;
    onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct, isOpen, onClose }) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productAmount, setProductAmount] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const database = getDatabase();
            const productsRef = ref(database, 'products');
            await push(productsRef, {
                name: productName,
                price: productPrice,
                amount: productAmount
            });
            setProductName('');
            setProductPrice('');
            setProductAmount('');

            // Mostrar la alerta de éxito
            Swal.fire({
                title: '¡Producto agregado!',
                text: 'El producto se ha agregado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });

            // Cerrar el modal después de agregar el producto
            onClose();
        } catch (error) {
            console.error('Error al guardar el producto:', error);

            // Mostrar la alerta de error
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al guardar el producto.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4 w-full max-w-lg">
                <h2 className="text-2xl mb-4">Agregar Producto</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nombre del producto"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Cantidad"
                        value={productAmount}
                        onChange={(e) => setProductAmount(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Precio del producto"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Agregar Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
