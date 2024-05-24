import React from 'react';
import EarningsChart from './EarningsChart';
import { RiLineChartLine } from 'react-icons/ri';

const Ventas: React.FC = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 mt-10 gap-8">
            <div className="bg-primary-100 p-8 rounded-xl text-gray-300 flex flex-col gap-6 xl:col-span-2">
                <RiLineChartLine className="text-5xl" />
                <h4 className="text-2xl">Abril</h4>
                <span className="text-5xl text-white">$ 250,000</span>
                <span className="py-1 px-3 bg-primary-300/80 rounded-full">
                    - 10% Ganancias
                </span>
                <div className=' bg-slate-300  p-1 rounded-lg'>
                    <EarningsChart />
                </div>
            </div>
            <div className="xl:col-span-3 bg-primary-100 p-8 rounded-xl text-gray-300 flex flex-col gap-6">
                <div className="p-4">
                    <h1 className="text-3xl mb-6">Ventas</h1>
                </div>
            </div>
        </section>
    );
};

export default Ventas;
