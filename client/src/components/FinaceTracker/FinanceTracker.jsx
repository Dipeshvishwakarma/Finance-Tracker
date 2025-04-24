import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTransaction, editTransaction, deleteTransaction, setFilters, fetchTransactions,setCurrentPage } from "../../store/transactionSlice";
import Modal from "./Modal";

const FinanceTracker = () => {
    const { transactions, filters, pagination} = useSelector((state) => state.transactions);
    const dispatch = useDispatch();
    useEffect(() => { 
        dispatch(fetchTransactions({ page: pagination.currentPage, filters: filters }));
        console.log("filter changed");
        
      }, [dispatch,pagination.currentPage,filters,filters.dateRange]);
    
    const [formData, setFormData] = useState({
        id: null,
        title: "",
        amount: "",
        type: "Income",
        date: "",
        category: "",
        notes: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const ITEMS_PER_PAGE = 10;

    // Filtered Transactions
    // const filteredEntries = transactions
    // .filter((entry) => {
    //   // Apply filters only if they have values
    //   console.log(filters);
      
    //   if (filters.type && entry.type !== filters.type) return false;
    //   if (filters.dateRange.start && new Date(entry.date) < new Date(filters.dateRange.start)) return false;
    //   if (filters.dateRange.end && new Date(entry.date) > new Date(filters.dateRange.end)) return false;
    //   if (filters.category && entry.category !== filters.category) return false;
    //   if (filters.search && !entry.title.toLowerCase().includes(filters.search.toLowerCase()) && !entry.category.toLowerCase().includes(filters.search.toLowerCase())) {
    //     return false;
    //   }
    //   return true;
    // });
    
    // const paginatedEntries = filteredEntries.slice(
    //     (currentPage - 1) * ITEMS_PER_PAGE,
    //     currentPage * ITEMS_PER_PAGE
    // );
   
  
  const totalPages = Math.ceil(pagination.totalTransactions / ITEMS_PER_PAGE);
  

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        dispatch(setFilters({ [name]: value }));
        dispatch(setCurrentPage(1));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('formData',formData._id);
        
        if (formData._id) {
            dispatch(editTransaction(formData));
        } else {
            dispatch(addTransaction(formData));
        }
        setFormData({
            id: null,
            title: "",
            amount: "",
            type: "Income",
            date: "",
            category: "",
            notes: "",
        });
        setIsModalOpen(false);
    };

    const handleEdit = (transaction) => {
        setFormData(transaction);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {  
        dispatch(deleteTransaction(id));
        dispatch(fetchTransactions({ page: pagination.currentPage, filters: filters }));
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded shadow mb-4"
            >
                Add Entry
            </button>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                formData={formData}
                handleChange={handleChange}
            />

            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <div className="flex items-center gap-4 flex-wrap">
                    <select
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                        className="flex-1 h-12 p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        <option value="">All Types</option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>

                    <input
                        type="date"
                        name="dateRange.start"
                        onChange={(e) =>
                            dispatch(setFilters({ dateRange: { ...filters.dateRange, start: e.target.value } }))
                        }
                        className="flex-1 h-12 p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                    />

                    <input
                        type="date"
                        name="dateRange.end"
                        onChange={(e) =>
                            dispatch(setFilters({ dateRange: { ...filters.dateRange, end: e.target.value } }))
                        }
                        className="flex-1 h-12 p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                    />

                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="flex-1 h-12 p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        <option value="">All Categories</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Bills">Bills</option>
                        <option value="Others">Others</option>
                    </select>
                    <input
                        type="text"
                        name="search"
                        placeholder="Search by Title or Category"
                        value={filters.search}
                        onChange={handleFilterChange}
                        className="flex-1 h-12 p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md mb-4 overflow-x-auto">
                <table className="table-auto w-full text-left">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Type</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions?.map((entry, index) => (
                            <tr key={entry._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                <td className="px-4 py-2">{(pagination.currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                                <td className="px-4 py-2">{entry.title}</td>
                                <td className="px-4 py-2">{entry.amount}</td>
                                <td className="px-4 py-2">{entry.type}</td>
                                <td className="px-4 py-2">{new Date(entry.date).toISOString().split('T')[0]}</td>
                                <td className="px-4 py-2">{entry.category}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleEdit(entry)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded shadow mr-2 hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(entry._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded shadow hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => dispatch(setCurrentPage(index + 1))}
                        className={`px-3 py-2 mx-1 rounded ${pagination.currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FinanceTracker;
