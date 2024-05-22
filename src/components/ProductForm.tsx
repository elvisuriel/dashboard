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
}
const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
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

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nombre del producto"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Cantidad"
                value={productAmount}
                onChange={(e) => setProductAmount(e.target.value)}
            />
            <input
                type="text"
                placeholder="Precio del producto"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
            />
            <button type="submit">Agregar Producto</button>
        </form>
    );
};

export default ProductForm;
