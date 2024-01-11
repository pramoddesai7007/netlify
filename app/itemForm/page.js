'use client'


// components/ItemForm.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const ItemForm = ({ onSubmit, itemToEdit }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    companyName: '',
    unit: 'KG', // Default unit
  });

  useEffect(() => {
    if (itemToEdit) {
      // If editing, populate the form with the existing data
      setFormData({
        itemName: itemToEdit.itemName || '',
        companyName: itemToEdit.companyName || '',
        unit: itemToEdit.unit || 'KG',
      });
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (itemToEdit) {
        // If editing, make a PUT request
        await axios.put(`http://localhost:5000/api/item/items/${itemToEdit._id}`, formData);
      } else {
        // If creating, make a POST request
        await axios.post('http://localhost:5000/api/item/items', formData);
      }

      // Optionally, reset the form after submission
      setFormData({
        itemName: '',
        companyName: '',
        unit: 'KG',
      });

    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="itemName" className="block text-sm font-medium text-gray-600">
          Item Name:
        </label>
        <input
          type="text"
          id="itemName"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-600">
          Company Name:
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="unit" className="block text-sm font-medium text-gray-600">
          Unit:
        </label>
        <select
          id="unit"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="KG">KG</option>
          <option value="NOs">NOs</option>
          <option value="Litre">Litre</option>
          <option value="box">Box</option>
          <option value="cartoon">Cartoon</option>
        </select>
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          {itemToEdit ? 'Save Changes' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
