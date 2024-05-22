import React, { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database'; // Importa las funciones necesarias desde firebase/database

const ProductForm = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productAmount, setProductAmount] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const database = getDatabase(); // Obtén la referencia a la base de datos
            const productsRef = ref(database, 'products'); // Obtén la referencia a la ubicación de los productos
            await push(productsRef, { // Usa la función push para agregar un nuevo producto
                name: productName,
                price: productPrice,
                amount: productAmount
            });
            setProductName('');
            setProductPrice('');
            setProductAmount('');
        } catch (error) {
            console.error('Error al guardar el producto:', error);
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
                placeholder="Cantidad "
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
