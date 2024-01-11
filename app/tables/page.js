"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faAnglesLeft, faAnglesRight, faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import Square from "../components/square";

const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
            <div
                className="modal-container bg-white w-full md:w-96 p-6 m-4 rounded shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                {/* <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg> */}
                <h1 className="mb-5 text-lg font-semibold text-center text-gray-800 dark:text-gray-400">
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                </h1>
                <p className="text-sm md:text-base text-center text-gray-600 dark:text-gray-400">
                    Delete This Table?
                </p>
                <div className="flex justify-center mt-4 text-sm md:text-base">
                    <button
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md mr-2"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

const Tables = () => {
    const [tables, setTables] = useState([]);
    const [sections, setSections] = useState([]); // Add state for sections
    const [pageNumber, setPageNumber] = useState(0);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [tableInfo, setTableInfo] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [tableToDelete, settableToDelete] = useState(null);

    const router = useRouter();
    const [newTable, setNewTable] = useState({ name: "" });
    const tablesPerPage = 10; // Change this to set the number of tables per page

    const [editTable, setEditTable] = useState(null);
    const [sectionId, setSectionId] = useState(""); // Add state to track the selected section for creating tables


    const handleView = async (tableId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/table/tables/${tableId}`);
            const tableData = response.data;

            // Set the table information in the state
            setTableInfo(tableData);

            // Open the view modal
            setIsViewModalOpen(true);
        } catch (error) {
            console.error("Error fetching table details:", error);
        }
    };


    const handleEdit = (table) => {
        setEditTable(table);
        setIsNewModalOpen(true);
    };


    const handleEditSubmit = async () => {
        try {
            // Ensure a section is selected before updating a table
            if (!editTable.section || !editTable.section._id) {
                console.error("Please select a section before updating the table.");
                return;
            }

            const formData = new FormData();
            formData.append("tableName", editTable.tableName);
            formData.append("sectionId", editTable.section._id); // Add sectionId to FormData

            const response = await axios.patch(
                `http://localhost:5000/api/table/tables/${editTable._id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const updatedTable = response.data;

            // Update the tables state with the updated table
            setTables((prevTables) =>
                prevTables.map((table) =>
                    table._id === updatedTable._id ? updatedTable : table
                )
            );
            setIsNewModalOpen(false);
            setEditTable(null);
        } catch (error) {
            console.error("Error updating table:", error);
        }
    };


    useEffect(() => {
        const fetchTables = async () => {
            try {
                const tablesResponse = await axios.get('http://localhost:5000/api/table/tables');
                setTables(tablesResponse.data);
            } catch (error) {
                console.error('Error fetching tables:', error);
            }
        };

        const fetchSections = async () => {
            try {
                const sectionsResponse = await axios.get('http://localhost:5000/api/section');
                setSections(sectionsResponse.data);
            } catch (error) {
                console.error('Error fetching sections:', error);
            }
        };

        fetchTables();
        fetchSections();
    }, []);



    const handleAddSubmit = async () => {
        try {
            // Ensure a section is selected before creating a table
            if (!sectionId) {
                console.error("Please select a section before adding a table.");
                return;
            }

            const formData = new FormData();
            formData.append("tableName", newTable.name);

            const response = await axios.post(
                `http://localhost:5000/api/table/${sectionId}/tables`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const addedTable = response.data;

            // Update the tables state with the new table
            setTables((prevTables) => [...prevTables, addedTable]);
            setNewTable({
                name: "",
            });
            setIsAddModalOpen(false);
        } catch (error) {
            console.error("Error adding table:", error);
        }
    };

    const displaySectionsForSelection = sections.map((section) => (
        <option key={section._id} value={section._id}>
            {section.name}
        </option>
    ));


    useEffect(() => {
        const fetchtables = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/table/tables');
                console.log(response.data)
                setTables(response.data);
            } catch (error) {
                console.error('Error fetching tables:', error);
            }
        };
        fetchtables();
    }, []);

    const pageCount = Math.ceil(tables.length / tablesPerPage);

    const displaytables = tables
        .slice(pageNumber * tablesPerPage, (pageNumber + 1) * tablesPerPage)
        .map((table, index) => (
            <tr key={table._id} className="hover:bg-gray-100">
                <td className="p-1 border text-center text-orange-900">
                    {pageNumber * tablesPerPage + index + 1}
                </td>
                <td className="p-1 border text-center text-orange-900">{table.tableName}</td>
                <td className="p-1 border text-center text-orange-900">{table.section.name}</td>

                <td className="border py-1 text-center">
                    {/* <button
                        className="text-white mr-3 hover:bg-green-600 focus:outline-none font-sans font-medium border p-1 bg-blue-600 rounded-md px-4 text-sm"
                        onClick={() => handleView(table._id)}
                    >
                        <FontAwesomeIcon icon={faEye} className="cursor-pointer" /> View
                    </button> */}
                    <button
                        className="text-white mr-3 hover:bg-green-600 focus:outline-none font-sans font-medium border p-1 bg-green-600 rounded-md px-4 text-sm"
                        onClick={() => handleEdit(table)}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} className="cursor-pointer" />{" "}
                        Edit
                    </button>
                    <button
                        className="text-white  mr-3 hover:bg-green-800 font-sans focus:outline-none font-medium border p-1 bg-red-700 rounded-md px-4 text-sm"
                        onClick={() => handleDelete(table)}
                    >
                        <FontAwesomeIcon icon={faTrash} className="cursor-pointer" /> Delete
                    </button>
                </td>
            </tr>
        ));

    const home = () => {
        router.push("/dashboard");
    };

    // delete popup
    // delete popup
    const handleDelete = (menu) => {
        // Set the menu to be deleted in the state
        settableToDelete(menu);
        // Open the delete confirmation modal
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            // Proceed with the delete operation
            const response = await axios.delete(
                `http://localhost:5000/api/table/tables/${tableToDelete._id}`
            );
            console.log("Menu deleted successfully:", response.data);

            // Update the menus state by filtering out the deleted menu
            setTables((prevMenus) =>
                prevMenus.filter((m) => m._id !== tableToDelete._id)
            );

            // Close the delete confirmation modal
            setIsDeleteModalOpen(false);
            // Clear the menu to be deleted from the state
            settableToDelete(null);
        } catch (error) {
            console.error("Error deleting menu:", error);
        }
    };
    const cancelDelete = () => {
        // Close the delete confirmation modal without deleting
        setIsDeleteModalOpen(false);
        // Clear the menu to be deleted from the state
        settableToDelete(null);
    };

    return (
        <>
            <Navbar />
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onCancel={cancelDelete}
                onConfirm={confirmDelete}
            />


            <Square />

            <div className="container mx-auto p-8 w-full overflow-x-auto -mt-3  border-gray-300 border-2 shadow-md ">
                <h1 className="text-md font-semibold font-sans  -mt-5">
                    Tables List
                </h1>
                <div className="flex justify-end mb-3 -mt-8">
                    <button
                        className="text-black font-bold py-2 px-4 rounded-full text-l border border-gray-500"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-1" />
                        Add
                    </button>
                </div>

                <table className="min-w-full  border border-gray-300  -mt-2">
                    <thead className="text-sm bg-gray-300 text-gray-700">
                        <tr>
                            <th className="p-1 border">Sr No.</th>
                            <th className="p-1 border">Name</th>
                            <th className="p-1 border">Section Name</th>

                            <th className="p-1 border text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-md font-sans font-bold">{displaytables}</tbody>
                </table>

                <div className="flex flex-col items-center mt-2">
                    <span className="text-xs text-gray-700 dark:text-gray-400">
                        Showing{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {pageNumber * tablesPerPage + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {Math.min((pageNumber + 1) * tablesPerPage, tables.length)}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {tables.length}
                        </span>{" "}
                        tables
                    </span>
                    <div className="inline-flex mt-2 xs:mt-0">
                        <button
                            className=" flex items-center justify-center px-3 h-8 text-xs font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 0))}
                        >
                            <FontAwesomeIcon icon={faAnglesLeft} />
                        </button>
                        <button
                            className="flex items-center justify-center px-3 h-8 text-xs font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            onClick={() =>
                                setPageNumber((prev) => Math.min(prev + 1, pageCount - 1))
                            }
                        >
                            <FontAwesomeIcon icon={faAnglesRight} />
                        </button>
                    </div>
                </div>
            </div>

            {isViewModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-container bg-white w-full md:w-96 p-6 m-4 rounded shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => setIsViewModalOpen(false)}
                        ></button>
                        <div className="p-1 text-sm md:text-base">
                            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-400  text-center">
                                Table Information
                            </h3>
                            {/* Display table information here */}
                            {tableInfo && (
                                <>
                                    <p className="mb-3">
                                        <strong>Table Name:</strong> {tableInfo.tableName}
                                    </p>
                                    <p className="mb-3">
                                        <strong>Section Name:</strong> {tableInfo.section.name}
                                    </p>
                                    {/* Add more details as needed */}
                                </>
                            )}
                            <div className=" text-center text-sm md:text-base">
                                {/* <button
                                    type="button"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                                    onClick={() => setIsViewModalOpen(false)}
                                >
                                    Close
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}





            {isAddModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div
                        className="modal-container bg-white w-full md:w-96 p-6 m-4 rounded shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => setIsAddModalOpen(false)}
                        ></button>
                        <div className="p-1 ">
                            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-400 text-center">
                                Add New table
                            </h3>

                            <div className="mb-4 text-sm md:text-base">
                                <label
                                    htmlFor="newTableName"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="newTableName"
                                    name="newTableName"
                                    value={newTable.name}
                                    onChange={(e) =>
                                        setNewTable({ ...newTable, name: e.target.value })
                                    }
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="sectionSelection"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                >
                                    Section
                                </label>
                                <select
                                    id="sectionSelection"
                                    name="sectionSelection"
                                    value={sectionId}
                                    onChange={(e) => setSectionId(e.target.value)}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md text-sm md:text-base"
                                >
                                    <option value="" disabled>
                                        Select a section
                                    </option>
                                    {displaySectionsForSelection}
                                </select>
                            </div>
                            <div className=" text-center text-sm md:text-base">
                                <button
                                    type="button"
                                    className="border border-gray-400 hover:bg-gray-200  text-gray-700 font-bold py-2 px-4 rounded-full mr-2"
                                    onClick={handleAddSubmit}
                                >
                                    Add
                                </button>
                                <button
                                    type="button"
                                    className="border border-gray-400 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-full"
                                    onClick={() => setIsAddModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {isNewModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div
                        className="modal-container bg-white w-full md:w-96 p-6 m-4 rounded shadow-lg text-sm md:text-base"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => {
                                setIsNewModalOpen(false);
                                setEditTable(null);
                            }}
                        ></button>
                        <div className="p-1 text-sm md:text-base">
                            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-400  text-center">
                                {editTable ? "Edit table" : "Add New table"}
                            </h3>

                            <div className="mb-4">
                                <label
                                    htmlFor="newTableName"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="newTableName"
                                    name="newTableName"
                                    value={editTable ? editTable.tableName : newTable.name}
                                    onChange={(e) => {
                                        if (editTable) {
                                            setEditTable({
                                                ...editTable,
                                                tableName: e.target.value,
                                            });
                                        } else {
                                            setNewTable({
                                                ...newTable,
                                                name: e.target.value,
                                            });
                                        }
                                    }}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                />
                            </div>
                            {editTable && (
                                <div className="mb-4">
                                    <label
                                        htmlFor="sectionSelection"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                    >
                                        Section
                                    </label>
                                    <select
                                        id="sectionSelection"
                                        name="sectionSelection"
                                        value={editTable.section?._id || ""}
                                        onChange={(e) => {
                                            setEditTable({
                                                ...editTable,
                                                section: {
                                                    _id: e.target.value,
                                                    name: e.target.options[e.target.selectedIndex].text,
                                                },
                                            });
                                        }}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    >
                                        <option value="" disabled>
                                            Select a section
                                        </option>
                                        {displaySectionsForSelection}
                                    </select>
                                </div>
                            )}
                            <div className=" text-center text-sm md:text-base">
                                <button
                                    type="button"
                                    className="border border-gray-400 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-full mr-2"
                                    onClick={editTable ? handleEditSubmit : handleAddSubmit}
                                >
                                    {editTable ? "Save" : "Add"}
                                </button>
                                <button
                                    type="button"
                                    className="border border-gray-400 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-full"
                                    onClick={() => {
                                        setIsNewModalOpen(false);
                                        setEditTable(null);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Tables