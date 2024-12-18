import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CalculatorForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: 'Website-Design', // Default value
    pages: 0,
    hosting: [],
    domain: [],
    officialEmail: '',
    specialRequirements: [],
    features: [],
  });
  const [totalCost, setTotalCost] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [availableFeatures, setAvailableFeatures] = useState([]);

  // Update available features based on project type
  useEffect(() => {
    const featureCosts = {
      "Website-Design": ["corporate", "static", "informative", "e-commerce", "landing page", "dynamic", "responsive", "creative", "custom"],
      "Website-Development": ["B2B", "B2C", "classified site", "online exam system", "portal", "cms"],
      "Application-Development": ["android", "ios", "game", "cloud", "e-commerce", "cryptocurrency", "blockchain", "hotel app", "school app"],
      "Software-Development": ["financial management", "workforce management", "hr", "e-learning", "fleet management", "crm", "operation management", "web portal", "cms", "enterprise resource", "document management", "ar&vr development"]
    };

    setAvailableFeatures(featureCosts[form.type]);
  }, [form.type]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/calculate', form);
      setTotalCost(res.data.totalCost);
      setEstimatedTime(res.data.estimatedTime);
      alert('Cost calculated and email sent!');
    } catch (error) {
      console.error('Error calculating cost:', error);
      alert('An error occurred while calculating the cost.');
    }
  };

  const toggleCheckbox = (field, value) => {
    setForm((prev) => {
      const currentArray = prev[field];
      const updatedArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: updatedArray };
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Website Cost Calculator</h1>

        {/* Form Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Input Fields */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg font-medium text-gray-700">Your Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-medium text-gray-700">Your Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="type" className="text-lg font-medium text-gray-700">Project Type</label>
            <select
              id="type"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Website-Design">Website Design</option>
              <option value="Website-Development">Website Development</option>
              <option value="Application-Development">Application Development</option>
              <option value="Software-Development">Software Development</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="pages" className="text-lg font-medium text-gray-700">Number of Pages</label>
            <input
              id="pages"
              type="number"
              placeholder="Enter number of pages"
              value={form.pages}
              onChange={(e) => setForm({ ...form, pages: Number(e.target.value) })}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Hosting Options */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">Hosting</label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                onChange={() => toggleCheckbox('hosting', 'AWS Hosting')}
                checked={form.hosting.includes('AWS Hosting')}
                className="h-5 w-5 text-blue-500"
              />
              <label className="ml-2 text-gray-700">AWS Hosting</label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                onChange={() => toggleCheckbox('hosting', 'Bluehost Hosting')}
                checked={form.hosting.includes('Bluehost Hosting')}
                className="h-5 w-5 text-blue-500"
              />
              <label className="ml-2 text-gray-700">Bluehost Hosting</label>
            </div>
          </div>

          {/* Domain Options */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">Domain</label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                onChange={() => toggleCheckbox('domain', 'Custom Domain')}
                checked={form.domain.includes('Custom Domain')}
                className="h-5 w-5 text-blue-500"
              />
              <label className="ml-2 text-gray-700">Custom Domain</label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                onChange={() => toggleCheckbox('domain', 'Subdomain')}
                checked={form.domain.includes('Subdomain')}
                className="h-5 w-5 text-blue-500"
              />
              <label className="ml-2 text-gray-700">Subdomain</label>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="officialEmail" className="text-lg font-medium text-gray-700">Official Email</label>
            <input
              id="officialEmail"
              type="email"
              placeholder="Enter your official email"
              value={form.officialEmail}
              onChange={(e) => setForm({ ...form, officialEmail: e.target.value })}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Special Requirements */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">Special Requirements</label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                onChange={() => toggleCheckbox('specialRequirements', 'SEO')}
                checked={form.specialRequirements.includes('SEO')}
                className="h-5 w-5 text-blue-500"
              />
              <label className="ml-2 text-gray-700">SEO</label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                onChange={() => toggleCheckbox('specialRequirements', 'Mobile Optimization')}
                checked={form.specialRequirements.includes('Mobile Optimization')}
                className="h-5 w-5 text-blue-500"
              />
              <label className="ml-2 text-gray-700">Mobile Optimization</label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                onChange={() => toggleCheckbox('specialRequirements', 'Custom Design')}
                checked={form.specialRequirements.includes('Custom Design')}
                className="h-5 w-5 text-blue-500"
              />
              <label className="ml-2 text-gray-700">Custom Design</label>
            </div>
          </div>

          {/* Features Selection */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">Features</label>
            {availableFeatures.map((feature) => (
              <div key={feature} className="flex items-center mt-2">
                <input
                  type="checkbox"
                  onChange={() => toggleCheckbox('features', feature)}
                  checked={form.features.includes(feature)}
                  className="h-5 w-5 text-blue-500"
                />
                <label className="ml-2 text-gray-700">{feature}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="w-full lg:w-1/3 py-3 bg-blue-500 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Calculate Cost
          </button>
        </div>

        {/* Display Results */}
        {totalCost > 0 && (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Total Cost: <span className="text-blue-600">${totalCost}</span>
            </h2>
            <h3 className="text-lg mt-2 text-center">
              Estimated Time: {estimatedTime} days
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorForm;
