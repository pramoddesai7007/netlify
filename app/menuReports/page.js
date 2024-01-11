'use client'
import React, { useState, useEffect } from 'react';

const MenuReport = () => {
  const [date, setDate] = useState('');
  const [menuName, setMenuName] = useState('');
  const [menuNames, setMenuNames] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Fetch menu names when the component mounts
    const fetchMenuNames = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu/menus/list');
        const menuNames = await response.json();
        setMenuNames(menuNames);
      } catch (error) {
        console.error('Error fetching menu names', error);
      }
    };

    fetchMenuNames();
  }, []);

  const getOrderReport = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/order/orders/list/menuwise?date=${date}&menuName=${menuName}`);
      const result = await response.json();
      setResult(result);
    } catch (error) {
      console.error('Error fetching order report', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Menu Report</h1>

      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Select Date:</label>
        <input type="date" id="date" className="mt-1 p-2 border rounded w-1/2" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div className="mb-4">
        <label htmlFor="menuName" className="block text-sm font-medium text-gray-700">Select Menu Name:</label>
        <select id="menuName" className="mt-1 p-2 border rounded w-1/2" value={menuName} onChange={(e) => setMenuName(e.target.value)}>
          {menuNames.map((menu, index) => (
            <option key={index} value={menu.name}>
              {menu.name}
            </option>
          ))}
        </select>
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={getOrderReport}>Get Report</button>

      {result && (
        <div className="mt-4">
          <p className="text-lg font-semibold">Menu Counts: {result.menuCounts}</p>
          <p className="text-lg font-semibold">Total Quantity: {result.totalQuantity}</p>
        </div>
      )}
    </div>
  );
};

export default MenuReport;