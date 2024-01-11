'use client'

// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Waiter = () => {
  const [waiters, setWaiters] = useState([]);
  const [waiterData, setWaiterData] = useState({
    waiterName: '',
    address: '',
    contactNumber: '',
  });

  const [editingWaiter, setEditingWaiter] = useState(null);

  useEffect(() => {
    const fetchWaiters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/waiter');
        setWaiters(response.data);
      } catch (error) {
        console.error('Error fetching waiters:', error);
      }
    };

    fetchWaiters();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWaiterData({
      ...waiterData,
      [name]: value,
    });
  };

  const handleAddWaiter = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/waiter', waiterData);
      setWaiters([...waiters, response.data]);
      setWaiterData({
        waiterName: '',
        address: '',
        contactNumber: '',
      });
    } catch (error) {
      console.error('Error adding waiter:', error);
    }
  };

  const handleEditWaiter = async (waiterId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/waiter/${waiterId}`, waiterData);
      const updatedWaiters = waiters.map((waiter) =>
        waiter._id === waiterId ? response.data : waiter
      );
      setWaiters(updatedWaiters);
      setWaiterData({
        waiterName: '',
        address: '',
        contactNumber: '',
      });
      setEditingWaiter(null);
    } catch (error) {
      console.error('Error editing waiter:', error);
    }
  };

  const handleDeleteWaiter = async (waiterId) => {
    try {
      await axios.delete(`http://localhost:5000/api/waiter/${waiterId}`);
      const updatedWaiters = waiters.filter((waiter) => waiter._id !== waiterId);
      setWaiters(updatedWaiters);
    } catch (error) {
      console.error('Error deleting waiter:', error);
    }
  };

  const handleSetEditWaiter = (waiter) => {
    setWaiterData(waiter);
    setEditingWaiter(waiter._id);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md my-8 font-sans">
      <h2 className="text-3xl font-semibold text-orange-500 mb-6">Add Waiter</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Waiter Name:</label>
        <input
          type="text"
          name="waiterName"
          value={waiterData.waiterName}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Address:</label>
        <input
          type="text"
          name="address"
          value={waiterData.address}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          value={waiterData.contactNumber}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      {editingWaiter ? (
        <button
          onClick={() => handleEditWaiter(editingWaiter)}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:border-orange-300 mr-2"
        >
          Update Waiter
        </button>
      ) : (
        <button
          onClick={handleAddWaiter}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300 mr-2"
        >
          Add Waiter
        </button>
      )}

      <h2 className="text-3xl font-semibold text-orange-500 my-6">Waiters List</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left">Waiter Name</th>
            <th className="text-left">Address</th>
            <th className="text-left">Contact Number</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {waiters.map((waiter) => (
            <tr key={waiter._id}>
              <td>{waiter.waiterName}</td>
              <td>{waiter.address}</td>
              <td>{waiter.contactNumber}</td>
              <td>
                <button
                  onClick={() => handleSetEditWaiter(waiter)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteWaiter(waiter._id)}
                  className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Waiter;
