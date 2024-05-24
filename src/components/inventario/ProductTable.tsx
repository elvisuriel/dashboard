import React, { useEffect, useState } from 'react';
import { database } from '../../config/firebaseConfig';
import { ref, get } from 'firebase/database';
import { useAuth } from '../../providers/AuthProvider';

interface Product {
    id: string;
    name: string;
    price: number;
    amount: number;
}

const ProductTable = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const userId = currentUser?.uid;
                const productsRef = ref(database, `users/${userId}/products`);
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
    }, [currentUser]);

    const productsPerPage = 5;
    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const displayedProducts = products.slice(startIndex, endIndex);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Lista de Productos</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="py-2 px-4 border-b">Articulo</th>
                        <th className="py-2 px-4 border-b">Precio</th>
                        <th className="py-2 px-4 border-b">Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">{product.name}</td>
                            <td className="py-2 px-4 border-b">{product.price}</td>
                            <td className="py-2 px-4 border-b">{product.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    disabled={currentPage === 0}
                >
                    Anterior
                </button>
                <button
                    onClick={() => setCurrentPage((prev) => (endIndex < products.length ? prev + 1 : prev))}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    disabled={endIndex >= products.length}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default ProductTable;
