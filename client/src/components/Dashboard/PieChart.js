import { Chart, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import React from 'react';


Chart.register(ArcElement);

export const IncomeExpensePieChart = ({ income, expense }) => {
    const data = {
        labels: ['Income', 'Expense'],
        datasets: [
            {
                data: [income, expense],
                backgroundColor: ['#4CAF50', '#F44336'], 
            },
        ],
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md w-64">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Income vs Expense</h2>
            <div className="w-48 h-48">
                <Pie data={data} />
            </div>
            <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-sm text-gray-700">Income</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="text-sm text-gray-700">Expense</span>
                </div>
            </div>
        </div>
    );
};
 
