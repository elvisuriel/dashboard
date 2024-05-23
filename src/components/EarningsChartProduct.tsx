import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useAuth } from '../providers/AuthProvider';

Chart.register(...registerables);

const EarningsChartProduct = () => {
    const [chartData, setChartData] = useState<number[]>([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchProductData = () => {
            if (!currentUser) return;

            const userId = currentUser.uid;
            const database = getDatabase();
            const productsRef = ref(database, `users/${userId}/products`);

            const productCounts: Record<string, number> = {
                February: 0,
                March: 0,
                abril: 0,
                may: 0
            };

            onValue(productsRef, (snapshot) => {
                const counts = { ...productCounts };
                snapshot.forEach((childSnapshot) => {
                    const product = childSnapshot.val();
                    const productDate = new Date(product.date); // Asegúrate de que el producto tenga un campo de fecha

                    const month = productDate.toLocaleString('default', { month: 'long' });
                    if (counts[month] !== undefined) {
                        counts[month]++;
                    }
                });

                setChartData(Object.values(counts));
            });
        };

        fetchProductData();
    }, [currentUser]);

    const data = {
        labels: ['February', 'March', 'April', 'May',], // Últimos 4 meses en inglés
        datasets: [
            {
                label: 'Cantidad de Productos',
                data: chartData, // Datos obtenidos de la base de datos
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="w-full h-64">
            <Bar data={data} options={options} />
        </div>
    );
};
export default EarningsChartProduct;
