import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transactionSummary } from '../../store/transactionSlice';
import { IncomeExpensePieChart } from './PieChart';

const SummaryDashboard = () => {
  const dispatch = useDispatch();  
  const { totalIncome, totalExpense } = useSelector((state) => state.transactions);
  const balance = totalIncome - totalExpense;

  useEffect(()=>{
     dispatch(transactionSummary());
  },[dispatch])

  return (
    <div className="flex h-screen bg-gray-100">
   
    <main className="flex-1 flex flex-col">
       
        <section className="p-6 flex flex-wrap space-y-6">
            <div className="flex flex-col sm:flex-row sm:space-x-6 w-full">
                <div className="flex-1 bg-white p-4 shadow rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-700">Total Income</h2>
                    <p className="text-2xl text-green-600 font-bold">₹{totalIncome}</p>
                </div>
                <div className="flex-1 bg-white p-4 shadow rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-700">Total Expense</h2>
                    <p className="text-2xl text-red-600 font-bold">₹{totalExpense}</p>
                </div>
                <div className="flex-1 bg-white p-4 shadow rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-700">Balance</h2>
                    <p className="text-2xl text-blue-600 font-bold">₹{balance}</p>
                </div>
            </div>
            <div className="flex justify-center items-center w-full">
                <div className="bg-white p-4 shadow rounded-lg">
                    <IncomeExpensePieChart income={totalIncome} expense={totalExpense} />
                </div>
            </div>
        </section>
    </main>
</div>
  );
};

export default SummaryDashboard;



