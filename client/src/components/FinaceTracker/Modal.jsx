import React from "react";

const Modal = ({ isOpen, onClose, onSubmit, formData, handleChange }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4 text-center">Add Entry</h2>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <input
              type="date"
              name="date"
              value={formData.date ? new Date(formData.date).toISOString().split('T')[0]:formData.date}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            >
              <option value="">Category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Bills">Bills</option>
              <option value="Others">Others</option>
            </select>
            <input
              type="text"
              name="notes"
              placeholder="Notes (optional)"
              value={formData.notes}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white py-2 px-4 rounded shadow mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded shadow"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
