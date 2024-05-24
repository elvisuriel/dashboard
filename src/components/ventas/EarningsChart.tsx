import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const EarningsChart = () => {
    const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril'], // Últimos 4 meses
        datasets: [
            {
                label: 'Ganancias',
                data: [200000, 280000, 300000, 250000], // Datos de ejemplo
                fill: false,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,1)',
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
            <Line data={data} options={options} />
        </div>
    );
};

export default EarningsChart;
