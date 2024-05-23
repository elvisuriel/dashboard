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
                January: 0,
                February: 0,
                March: 0,
                April: 0,
                May: 0,
                June: 0,
                July: 0,
                August: 0,
                September: 0,
                October: 0,
                November: 0,
                December: 0
            };

            onValue(productsRef, (snapshot) => {
                const counts = { ...productCounts };
                snapshot.forEach((childSnapshot) => {
                    const product = childSnapshot.val();
                    const productDate = new Date(product.date);
                    console.log('Product Date:', productDate); // Verificar formato de fecha
                    const monthIndex = productDate.getMonth();
                    const month = new Intl.DateTimeFormat('es', { month: 'long' }).format(productDate);
                    console.log('Month:', month); // Verificar el mes

                    // Contar productos solo para los meses de febrero, marzo, abril y mayo
                    if (monthIndex >= 1 && monthIndex <= 4) {
                        counts[month]++;
                    }
                });

                const lastFourMonths = Object.values(counts).slice(-4); // Últimos 4 meses
                console.log('Product Counts:', lastFourMonths); // Verificar conteo de productos
                setChartData(lastFourMonths);
            });
        };

        fetchProductData();
    }, [currentUser]);

    const data = {
        labels: ['Febrero', 'Marzo', 'Abril', 'Mayo'], // Últimos 4 meses
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
