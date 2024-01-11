'use client'

// components/PurchaseForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PurchaseForm = () => {
    const [itemTotals, setItemTotals] = useState({});
    const [lastItemIndex, setLastItemIndex] = useState(-1);
    const [stockQty, setStockQty] = useState('');
    const [discount, setDiscount] = useState(''); // Step 1
    const [grandTotal, setGrandTotal] = useState(''); // New state for grand total
    const [gstAmount, setGstAmount] = useState(0);


    const [formData, setFormData] = useState({
        billNo: '',
        vendor: '',
        itemName: '',
        quantity: '',
        unit: '',
        pricePerQty: '',
        gst: '',
        paidAmount:''
    });

    const [vendors, setVendors] = useState([]);
    const [products, setProducts] = useState([]);
    const [units, setUnits] = useState([]);
    const [gsts, setGsts] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Fetch stock quantity for the selected product
        const fetchStockQty = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/purchase/purchase/stockQty?itemName=${formData.itemName}`);
                console.log("stock Quantity",response.data.stockQty)
                setStockQty(response.data.stockQty);
            } catch (error) {
                console.error('Error fetching stock quantity:', error);
            }
        };

        if (formData.itemName) {
            fetchStockQty();
        }
    }, [formData.itemName]);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/supplier/suppliers');
                setVendors(response.data);
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };
        fetchVendors();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/item/items');
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching Products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchGSTList = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/gst/list');
                setGsts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching Products:', error);
            }
        };

        fetchGSTList();
    }, []);


    useEffect(() => {
        const fetchUnitList = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/unit/units');
                setUnits(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching Products:', error);
            }
        };

        fetchUnitList();
    }, []);


    useEffect(() => {
        const subtotal = Object.values(itemTotals).reduce((total, itemTotal) => total + (itemTotal || 0), 0);
        const discountAmount = parseFloat(discount) || 0;
        const calculatedGrandTotal = subtotal - discountAmount;

        setGrandTotal(calculatedGrandTotal.toFixed(2));
    }, [itemTotals, discount]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'discount') {
            setDiscount(value);
        } else if (name === 'paidAmount') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value !== undefined ? value : '',
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
        console.log('Updated itemName:', formData.itemName);

    };



    useEffect(() => {
        const newItemTotal = calculateItemTotal(formData);
        setItemTotals((prevItemTotals) => ({
            ...prevItemTotals,
            [formData.itemName]: newItemTotal,
        }));
    }, [formData, discount]);


    
    const handleAddItem = () => {
        // Validate that all required fields are filled
        if (!formData.billNo || !formData.vendor || !formData.itemName || !formData.quantity || !formData.unit || !formData.pricePerQty || !formData.gst) {
            console.error('Please fill in all required fields.');
            return;
        }
    
        const newItem = createNewItem(formData);
        const { subtotal, gstAmount: itemGstAmount } = calculateItemTotal(newItem);
    
        // Accumulate the GST amount
        setGstAmount((prevGstAmount) => prevGstAmount + itemGstAmount);
    
        setItems((prevItems) => [...prevItems, newItem]);
        setFormData({
            billNo: formData.billNo,
            vendor: formData.vendor,
            itemName: '',
            quantity: '',
            unit: '',
            pricePerQty: '',
            gst: '',
            paidAmount: formData.paidAmount, // Retain paidAmount

        });
        setLastItemIndex((prevLastItemIndex) => prevLastItemIndex + 1);
    };
    
    // Helper function to create a new item object
    const createNewItem = (formData) => ({
        billNo: formData.billNo,
        vendor: formData.vendor,
        itemName: formData.itemName,
        quantity: formData.quantity,
        unit: formData.unit,
        pricePerQty: formData.pricePerQty,
        gst: formData.gst,
    });
    
    


    const calculateItemTotal = (item) => {
        const subtotal = parseFloat(item.quantity) * parseFloat(item.pricePerQty);
        const gstAmount = (subtotal * parseFloat(item.gst)) / 100;
        return subtotal + gstAmount;
    };



    const handleSaveAndPrint = async () => {
        try {
            // Calculate the GST amount based on the individual items
            const calculatedSubtotal = parseFloat(
                Object.values(itemTotals).reduce((total, itemTotal) => total + (itemTotal || 0), 0).toFixed(2)
            );
            const calculatedGstAmount = parseFloat(gstAmount).toFixed(2);
                
            const formattedItems = items.map((item) => ({
                productName: item.itemName,
                quantity: parseFloat(item.quantity),
                unit: item.unit,
                pricePerQty: parseFloat(item.pricePerQty),
            }));

            const data = {
                billNo: formData.billNo || '', // Provide a default value to prevent undefined
                vendor: formData.vendor || '', // Provide a default value to prevent undefined
                subtotal: isNaN(calculatedSubtotal) ? 0 : calculatedSubtotal,
                gstAmount: isNaN(calculatedGstAmount) ? 0 : calculatedGstAmount,
                paidAmount: parseFloat(formData.paidAmount || 0).toFixed(2),
                discount: parseFloat(discount || 0).toFixed(2),
                items: formattedItems, // Include the items array in the data
            };
    
            console.log(data);
    
            // Make a POST request to save the bill
            const response = await axios.post('http://localhost:5000/api/purchase/purchase/savebill', data);
    
            // Handle the response as needed (e.g., show success message)
            console.log('Bill saved successfully:', response.data);
            
            const updatedStockResponse = await axios.get(`http://localhost:5000/api/purchase/purchase/stockQty?itemName=${formData.itemName}`);
            setStockQty(updatedStockResponse.data.stockQty);
            // Reset the form and item list after saving
            setFormData({
                billNo: '',
                vendor: '',
                itemName: '',
                quantity: '',
                unit: '',
                pricePerQty: '',
                gst: '',
                paidAmount: '',
            });
            setItems([]);
            setItemTotals({});
            setGstAmount(0); // Reset the GST amount
        } catch (error) {
            console.error('Error saving the bill:', error.response ? error.response.data : error.message);
            // Handle the error (e.g., show an error message)
        }
    };
    


    useEffect(() => {
        if (lastItemIndex !== -1) {
            // Initialize itemTotals with empty objects for each item in items array
            const initialItemTotals = items.reduce((totals, item) => {
                totals[item.itemName] = calculateItemTotal(item);
                return totals;
            }, {});
            setItemTotals(initialItemTotals);
            setLastItemIndex(-1); // Reset lastItemIndex
        }
    }, [items, lastItemIndex]);


    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md font-sans">
            <h2 className="text-2xl font-semibold mb-6">Purchase Bill Form</h2>

            {/* Add Item Form */}
            <div className="mb-5">
                <div className="grid grid-cols-3 gap-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Bill Number</label>
                        <input
                            type="text"
                            name="billNo"
                            value={formData.billNo}
                            onChange={handleInputChange}
                            className="mt-1 p-1 w-full border rounded-md text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Vendor Name</label>
                        <select
                            name="vendor"
                            value={formData.vendor}
                            onChange={handleInputChange}
                            className="mt-1 p-1 w-full border rounded-md text-sm"
                            required
                        >
                            <option value="" disabled>
                                Select Vendor
                            </option>
                            {vendors.map((vendor) => (
                                <option key={vendor._id} value={vendor.vendorName}>
                                    {vendor.vendorName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Product Name</label>
                        <select
                            name="itemName"
                            value={formData.itemName}
                            onChange={handleInputChange}
                            className="mt-1 p-1 w-full border rounded-md text-sm"
                            required
                        >
                            <option value="" disabled>
                                Select Product
                            </option>
                            {products.map((product) => (
                                <option key={product._id} value={product.itemName}>
                                    {product.itemName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Stock Quantity</label>
                        <input
                            type="text"
                            value={stockQty}
                            className="mt-1 p-1 w-full border rounded-md text-sm bg-gray-100"
                            readOnly
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Quantity</label>
                        <input
                            type="text"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            className="mt-1 p-1 w-full border rounded-md text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Unit</label>
                        <select
                            name="unit"
                            value={formData.unit}
                            onChange={handleInputChange}
                            className="mt-1 p-1 w-full border rounded-md text-sm"
                            required
                        >
                            <option value="" disabled>
                                Select Unit
                            </option>
                            {units.map((unit) => (
                                <option key={unit._id} value={unit.unit}>
                                    {unit.unit}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Price Per Unit</label>
                        <input
                            type="text"
                            name="pricePerQty"
                            value={formData.pricePerQty}
                            onChange={handleInputChange}
                            className="mt-1 p-1 w-full border rounded-md text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">GST</label>
                        <select
                            name="gst"
                            value={formData.gst}
                            onChange={handleInputChange}
                            className="mt-1 p-1 w-full border rounded-md text-sm"
                            required
                        >
                            <option value="" disabled>
                                Select GST
                            </option>
                            {gsts.map((gst) => (
                                <option key={gst._id} value={gst.gstPercentage}>
                                    {gst.gstPercentage}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-600">
                        Total for {formData.itemName}
                    </label>
                    <input
                        type="text"
                        value={itemTotals[formData.itemName] ? itemTotals[formData.itemName].toFixed(2) : '0.00'}
                        className="mt-1 p-1 w-1/3 border rounded-md text-sm bg-gray-100"
                        readOnly
                    />
                </div>

                <button
                    type="button"
                    onClick={handleAddItem}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Add Item
                </button>
            </div>

            {/* Display Added Items */}
            <div>
                <h3 className="text-xl font-semibold mb-4">Added Items</h3>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-1 border">SR No.</th>
                            <th className="p-1 border">Item Name</th>
                            <th className="p-1 border">Quantity</th>
                            <th className="p-1 border">Unit</th>
                            <th className="p-1 border">Price Per Qty</th>
                            <th className="p-1 border">Total</th> {/* New column for total */}
                            {/* Add more columns for other item details */}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td className="p-1 border text-center">{index + 1}</td>
                                <td className="p-1 border text-center">{item.itemName}</td>
                                <td className="p-1 border text-center">{item.quantity}</td>
                                <td className="p-1 border text-center">{item.unit}</td>
                                <td className="p-1 border text-center">{item.pricePerQty}</td>
                                <td className="p-1 border text-center">{calculateItemTotal(item).toFixed(2)}</td>
                                {/* Add more columns for other item details */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600">SubTotal</label>
                <input
                    type="text"
                    value={Object.values(itemTotals).reduce((total, itemTotal) => total + (itemTotal || 0), 0).toFixed(2)}
                    className="mt-1 p-1 w-full border rounded-md text-sm bg-gray-100"
                    readOnly
                />
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600">Discount</label>
                <input
                    type="text"
                    name="discount"
                    value={discount}
                    onChange={handleInputChange}
                    className="mt-1 p-1 w-full border rounded-md text-sm"
                />
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600">Grand Total</label>
                <input
                    type="text"
                    value={grandTotal}
                    className="mt-1 p-1 w-full border rounded-md text-sm bg-gray-100"
                    readOnly
                />
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600">Paid Amount</label>
                <input
                    type="text"
                    name="paidAmount"
                    value={formData.paidAmount}
                    onChange={handleInputChange}
                    className="mt-1 p-1 w-full border rounded-md text-sm"
                />
            </div>

            {/* Balance */}
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600">Balance</label>
                <input
                    type="text"
                    // value={(parseFloat(Object.values(itemTotals).reduce((total, itemTotal) => total + (itemTotal || 0), 0).toFixed(2)) - parseFloat(formData.discount || 0) - parseFloat(formData.paidAmount || 0)).toFixed(2)}
                    value={(parseFloat(grandTotal) - parseFloat(formData.paidAmount || 0)).toFixed(2)}
                    className="mt-1 p-1 w-full border rounded-md text-sm bg-gray-100"
                    readOnly
                />
            </div>
            {/* Save and Print Button */}
            <div>
                <button
                    type="button"
                    onClick={handleSaveAndPrint}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                >
                    Save Bill
                </button>
            </div>
        </div>
    );
};

export default PurchaseForm;
