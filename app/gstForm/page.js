'use client'


import { useState, useEffect } from 'react';
import axios from 'axios';

const GSTForm = () => {
  const [gstPercentage, setGSTPercentage] = useState('');
  const [gstList, setGSTList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchGSTList();
  }, []);

  const fetchGSTList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/gst/list');
      setGSTList(response.data || []);
    } catch (error) {
      console.error('Error fetching GST list:', error.message);
    }
  };

  const handleInputChange = (e) => {
    setGSTPercentage(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/gst/create', { gstPercentage });
      fetchGSTList();
      setGSTPercentage('');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error;
        setErrorMessage(errorMessage);
        setShowModal(true);
      } else {
        console.error('Error submitting GST form:', error.message);
      }
    }
  };

  const handleDeleteClick = async (gstId) => {
    try {
      await axios.delete(`http://localhost:5000/api/gst/gst/${gstId}`);
      fetchGSTList();
    } catch (error) {
      console.error('Error deleting GST information:', error.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setErrorMessage('');
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleFormSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="gstPercentage" className="block text-sm font-medium text-gray-600">
            GST Percentage:
          </label>
          <input
            type="text"
            id="gstPercentage"
            name="gstPercentage"
            value={gstPercentage}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Save
          </button>
        </div>
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-2">List of GST Percentages:</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">GST Percentage</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {gstList.map((gst) => (
              <tr key={gst._id}>
                <td className="border border-gray-300 p-2">{gst.gstPercentage}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleDeleteClick(gst._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Error</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                X
              </button>
            </div>
            <p className="text-red-500">{errorMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GSTForm;
