'use client'

// pages/ItemListPage.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import ItemForm from '../itemForm/page';


const ItemListPage = () => {
  const [items, setItems] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    // Fetch the list of items when the component mounts
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/item/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error.message);
    }
  };

  const handleEditClick = (item) => {
    // Open the edit modal and set the item to edit
    setIsEditModalOpen(true);
    setItemToEdit(item);
  };

  const handleDeleteClick = async (itemId) => {
    try {
      // Make a DELETE request to delete the item
      await axios.delete(`http://localhost:5000/api/item/items/${itemId}`);
      
      // Refresh the item list
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };


  
  const handleEditSubmit = async (formData) => {
    try {
      // Make an API request using Axios to update the item data
      await axios.put(`http://localhost:5000/api/item/items/${itemToEdit._id}`, formData);
  
      // Update the local state with edited item data after the API call is successful
      setItems((prevItems) =>
        prevItems.map((item) => (item._id === itemToEdit._id ? { ...item, ...formData } : item))
      );
  
      // Close the edit modal immediately after a successful API call
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };
  
  

  const handleAddItemClick = () => {
    // Open the edit modal with null item (indicating a new item to create)
    setIsEditModalOpen(true);
    setItemToEdit(null);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Item List</h1>

      <button
        onClick={handleAddItemClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Add Item
      </button>

      {/* Item List */}
      <div className="mt-4">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Item Name</th>
              <th className="border border-gray-300 p-2">Company Name</th>
              <th className="border border-gray-300 p-2">Unit</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td className="border border-gray-300 p-2">{item.itemName}</td>
                <td className="border border-gray-300 p-2">{item.companyName}</td>
                <td className="border border-gray-300 p-2">{item.unit}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300 ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal fixed inset-0 flex items-center justify-center">
          <div className="modal-overlay absolute w-full h-full bg-gray-800 opacity-50"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
            >
              <span className="bg-red-500 rounded-full h-6 w-6 flex items-center justify-center font-semibold">
                &times;
              </span>
              <span className="mt-1">Close</span>
            </div>

            <div className="py-4 text-left px-6">
              <h2 className="text-2xl font-semibold">{itemToEdit ? 'Edit Item' : 'Add Item'}</h2>
              <ItemForm onSubmit={handleEditSubmit} itemToEdit={itemToEdit} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemListPage;
