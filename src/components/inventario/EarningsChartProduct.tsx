import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useAuth } from '../../providers/AuthProvider';
import Loader from '../Loader';

Chart.register(...registerables);

const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const EarningsChartProduct: React.FC = () => {
    const [chartData, setChartData] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchProductData = () => {
            if (!currentUser) return;

            const userId = currentUser.uid;
            const database = getDatabase();
            const productsRef = ref(database, `users/${userId}/products`);

            const productCounts: Record<string, number> = {
                Enero: 0,
                Febrero: 0,
                Marzo: 0,
                Abril: 0,
                Mayo: 0,
                Junio: 0,
                Julio: 0,
                Agosto: 0,
                Septiembre: 0,
                Octubre: 0,
                Noviembre: 0,
                Diciembre: 0
            };

            onValue(productsRef, (snapshot) => {
                const counts = { ...productCounts };
                snapshot.forEach((childSnapshot) => {
                    const product = childSnapshot.val();
                    const productDate = new Date(product.date);
                    const monthIndex = productDate.getMonth();
                    const monthName = monthNames[monthIndex];

                    // Contar productos solo para los meses de febrero, marzo, abril, y mayo
                    if (monthIndex >= 1 && monthIndex <= 4) {
                        counts[monthName] += product.amount;
                    }
                });

                // Obtener los datos de los últimos cuatro meses en el orden correcto
                const lastFourMonths = ['Febrero', 'Marzo', 'Abril', 'Mayo'].map(month => counts[month]);
                setChartData(lastFourMonths);
                setLoading(false);
            });
        };

        fetchProductData();
    }, [currentUser]);

    const data = {
        labels: ['Febrero', 'Marzo', 'Abril', 'Mayo'], // Últimos 4 meses (incluyendo Mayo)
        datasets: [
            {
                label: 'Cantidad de Productos',
                data: chartData, // Datos obtenidos de la base de datos
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: '#15e4e4',
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
            {loading ? (
                <Loader />
            ) : (
                <Bar data={data} options={options} />
            )}
        </div>
    );
};

export default EarningsChartProduct;
