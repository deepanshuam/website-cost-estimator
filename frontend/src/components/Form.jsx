import React, { useState } from 'react';
import axios from 'axios';

const CalculatorForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    pages: 0,
    features: [],
  });
  const [totalCost, setTotalCost] = useState(0);

  const handleSubmit = async () => {
    const res = await axios.post('http://localhost:5000/api/calculate', form);
    setTotalCost(res.data.totalCost);
    alert('Cost calculated and email sent!');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Website Cost Calculator</h1>

        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Your Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Your Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="pages" className="block text-lg font-medium text-gray-700">Number of Pages</label>
          <input
            id="pages"
            type="number"
            placeholder="Enter number of pages"
            onChange={(e) => setForm({ ...form, pages: Number(e.target.value) })}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            onChange={() => setForm({ ...form, features: [...form.features, 'SEO'] })}
            className="h-5 w-5 text-blue-500"
          />
          <label className="ml-2 text-lg text-gray-700">SEO</label>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="w-full py-3 px-6 bg-blue-500 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Calculate Cost
          </button>
        </div>

        {totalCost > 0 && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">Total Cost: <span className="text-blue-600">${totalCost}</span></h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorForm;
