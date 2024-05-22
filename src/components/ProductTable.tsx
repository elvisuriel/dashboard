// src/components/ProductTable.tsx
import React, { useEffect, useState } from 'react';
import { database } from '../config/firebaseConfig';
import { ref, get } from 'firebase/database';

const ProductTable = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsRef = ref(database, 'products');
                const snapshot = await get(productsRef);
                if (snapshot.exists()) {
                    const productsList = Object.keys(snapshot.val()).map(key => ({
                        id: key,
                        ...snapshot.val()[key],
                    }));
                    setProducts(productsList);
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Product List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
