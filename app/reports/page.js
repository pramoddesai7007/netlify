'use client'

// pages/Orders.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Reports = () => {
  const [originalOrders, setOriginalOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/order/orders');
      const ordersWithTableNames = await Promise.all(
        response.data.map(async (order) => {
          const tableResponse = await axios.get(`http://localhost:5000/api/table/tables/${order.tableId}`);
          return {
            ...order,
            tableName: tableResponse.data.tableName || 'Unknown Table',
          };
        })
      );
      setOrders(ordersWithTableNames);
      setOriginalOrders(ordersWithTableNames);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Error fetching orders');
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const filteredOrders = originalOrders.filter((order) => {
      const orderDate = new Date(order.orderDate).toISOString().split('T')[0];
      const start = startDate || '0000-01-01';
      const end = endDate || '9999-12-31';
      return orderDate >= start && orderDate <= end;
    });

    setOrders(filteredOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handlePrint = () => {
    const printContent = orders.map((order) => ({
      tableName: order.tableName,
      items: order.items.map((item) => `${item.name} x ${item.quantity} - Rs.${item.price * item.quantity}`),
      total: order.total,
    }));
  
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
    };
  
    const startDateFormatted = formatDate(startDate);
    const endDateFormatted = formatDate(endDate);
    const dateRange = startDate && endDate ? `(${startDateFormatted} to ${endDateFormatted})` : '(All Dates)';
  
    const printableContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Table Reports</title>
        <style>
          @page {
            margin: 5mm; /* Adjust the margin as needed */
          }
          body {
            font-family: Arial, sans-serif;
            margin: 2px;
            padding: 0;
            margin-bottom: 5px;
            font-size: 10px; /* Adjust the font size as needed */
          }
          .report-header {
            text-align: center;
            font-size: 14px; /* Adjust the font size as needed */
            font-weight: bold;
            margin-bottom: 10px;
          }
          .date-range {
            text-align: center;
            font-size: 10px; /* Adjust the font size as needed */
            margin-bottom: 10px;
          }
          .report-item {
            margin-bottom: -5px; /* Adjust the margin as needed */
          }
          .item-list {
            margin-top: -5px; /* Adjust the margin as needed */
            margin-bottom: -5px;
          }
        </style>
      </head>
      <body>
        <div class="report-header">
          Table Reports
        </div>
        <div class="date-range">
          Date Range: ${dateRange}
        </div>
        <div class="report-content">
          ${printContent.map((content, index) => {
            return `
              <div class="report-item">
                <h2>${content.tableName}</h2>
                <div class="item-list">
                  ${content.items.map((item) => `<p>${item}</p>`).join('')}
                </div>
                <p>Total: Rs. ${content.total}</p>
                <hr />
              </div>
            `;
          }).join('')}
        </div>
      </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');

  if (!printWindow) {
    alert("Please allow pop-ups to print the report.");
    return;
  }

  printWindow.document.write(printableContent);
  printWindow.document.close();
  printWindow.print();
  printWindow.close();
};  
  

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 p-8 bg-white rounded-md shadow-md font-sans">
        <h1 className="text-xl font-bold mb-6">Table Reports</h1>
        <div className="mb-6 flex items-center">
          <label className="mr-2 text-gray-600">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-md p-2 text-gray-700"
          />
          <label className="mx-2 text-gray-600">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-md p-2 text-gray-700"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>



        {loading ? (
          <p className="text-gray-700">Loading orders...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className='bg-blue-500 text-white'>
                <tr>
                  <th className="px-6 py-3  text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                    SR No
                  </th>
                  <th className="px-6 py-3  text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-6 py-3  text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3  text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                    Table
                  </th>
                  <th className="px-6 py-3  text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3  text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                    Subtotal
                  </th>
                  <th className="px-6 py-3  text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                    CGST(Rs.)
                  </th>
                  <th className="px-6 py-3  text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                    SGST(Rs.)
                  </th>
                  <th className="px-6 py-3  text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                    Grand Total(Rs.)
                  </th>

                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {new Date(order.orderDate).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {order._id.slice(5, 12)}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {order.tableName}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <ul>
                        {order.items.map((item) => (
                          <li key={item._id}>
                            {item.quantity} x {item.name} - Rs.{item.price * item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {order.subtotal} Rs.
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {order.CGST}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {order.SGST}
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {order.total}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Reports;