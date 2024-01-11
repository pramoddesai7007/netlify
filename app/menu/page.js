// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Image from "next/image";
// import * as XLSX from 'xlsx';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faDownload,
//     faSearch,
//     faHouse,
//     faPenToSquare,
//     faPlus,
//     faTrash,
//     faAnglesLeft,
//     faAnglesRight,
//     faUpload,
// } from "@fortawesome/free-solid-svg-icons";
// import Navbar from "../components/Navbar";
// import { useRouter } from "next/navigation";
// import Square from "../components/square";

// const EditModal = ({ isOpen, onCancel, onEdit, menuToEdit }) => {
//     const [editedMenuData, setEditedMenuData] = useState({
//         name: menuToEdit?.name || "",
//         price: menuToEdit?.price || "",
//         uniqueId: menuToEdit?.uniqueId || "",
//         image: null,
//         // mainCategoryId: menuToEdit?.mainCategory._id || "",
//     });

//     const [errorMessage, setErrorMessage] = useState("");

//     useEffect(() => {
//         let timeoutId;

//         if (errorMessage) {
//             timeoutId = setTimeout(() => {
//                 setErrorMessage("");
//             }, 2000);
//         }

//         return () => {
//             // Cleanup the timeout when the component is unmounted or the error message changes
//             clearTimeout(timeoutId);
//         };
//     }, [errorMessage]);

//     const handleInputChange = (e) => {
//         const { name, value, type, files } = e.target;

//         if (type === "file") {
//             setEditedMenuData((prevData) => ({
//                 ...prevData,
//                 [name]: files[0],
//             }));
//         } else {
//             setEditedMenuData((prevData) => ({
//                 ...prevData,
//                 [name]: value,
//             }));
//         }
//     };

//     const handleEdit = async () => {
//         try {
//             const existingMenuWithUniqueId = menus.find(
//                 (menu) =>
//                     menu._id !== menuToEdit._id &&
//                     menu.uniqueId === editedMenuData.uniqueId
//             );
            
//             if (existingMenuWithUniqueId) {
//                 setErrorMessage("MenuId already given to another menu");
//                 return;
//             }


//             const formData = new FormData();
//             formData.append("name", editedMenuData.name);
//             formData.append("price", editedMenuData.price);
//             formData.append("image", editedMenuData.image);
//             formData.append("uniqueId", editedMenuData.uniqueId);

//             const response = await axios.patch(
//                 `http://localhost:5000/api/menu/menus/${menuToEdit._id}`,
//                 formData
//             );

//             console.log("Menu updated successfully:", response.data);
//             onEdit(response.data); // Update the state with the edited menu

//             onCancel(); // Close the edit modal
//         } catch (error) {
//             console.error("Error updating menu:", error);
//             setErrorMessage("MenuId already given to other Menu ! Please try again");
//         }
//     };


//     return (
//         <div
//             className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? "" : "hidden"
//                 }`}
//             style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >
//             <div
//                 className="modal-container bg-white w-72 p-6 rounded shadow-lg"
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-400">
//                     Edit Menu
//                 </h3>
//                 {errorMessage && (
//                     <div className="text-red-500 mb-4">{errorMessage}</div>
//                 )}
//                 <form>
//                     <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
//                         Name
//                     </label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={editedMenuData.name}
//                         onChange={handleInputChange}
//                         className="w-full p-2 mb-4 border rounded-md"
//                     />
//                     <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
//                         MenuId
//                     </label>
//                     <input
//                         type="text"
//                         name="uniqueId"
//                         value={editedMenuData.uniqueId}
//                         onChange={handleInputChange}
//                         className="w-full p-2 mb-4 border rounded-md"
//                     />
//                     <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
//                         Price
//                     </label>
//                     <input
//                         type="text"
//                         name="price"
//                         value={editedMenuData.price}
//                         onChange={handleInputChange}
//                         className="w-full p-2 mb-4 border rounded-md"
//                     />

//                     <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
//                         Image
//                     </label>
//                     <input
//                         type="file"
//                         name="image"
//                         accept="image/*"
//                         onChange={handleInputChange}
//                         className="w-full p-2 mb-4 border rounded-md"
//                     />
//                     <div className="flex justify-between">
//                         <button
//                             type="button"
//                             className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md mt-4"
//                             onClick={onCancel}
//                         >
//                             Close
//                         </button>
//                         <button
//                             type="button"
//                             className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md mt-4"
//                             onClick={handleEdit}
//                         >
//                             Save Changes
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };


// const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
//     if (!isOpen) return null;

//     return (
//         <div
//             className="fixed inset-0 flex items-center justify-center z-50"
//             style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >
//             <div
//                 className="modal-container bg-white w-72 p-6 rounded shadow-lg"
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-400">
//                     Delete
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                     Do you want to delete this Menu ?
//                 </p>
//                 <div className="flex justify-end mt-4">
//                     <button
//                         className=" border border-gray-400 hover:bg-red-400 text-gray font-bold py-2 px-4 rounded-full mr-2"
//                         onClick={onConfirm}
//                     >
//                         Delete
//                     </button>
//                     <button
//                         className=" border border-gray-400 hover:bg-gray-300 text-gray font-bold py-2 px-4 rounded-full "
//                         onClick={onCancel}
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const MenuList = () => {
//     const [menus, setMenus] = useState([]);
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//     const [menuToDelete, setMenuToDelete] = useState(null);
//     const [mainCategories, setMainCategories] = useState([]); // Added state for main categories
//     const [pageNumber, setPageNumber] = useState(0);
//     const [completeImageUrl, setPreviewImageUrl] = useState("");
//     const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
//     const router = useRouter();
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [menuToEdit, setMenuToEdit] = useState(null);
//     const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//     const [menuToView, setMenuToView] = useState(null);
//     const [file, setFile] = useState(null);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [isExcelUploadOpen, setIsExcelUploadOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");

//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//     };

//     const filterMenus = () => {
//         return menus.filter((menu) =>
//             menu.name.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//     };

//     const exportToExcel = () => {
//         // Create an empty worksheet
//         const ws = XLSX.utils.aoa_to_sheet([['name', 'price']]);

//         // Create an empty workbook
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, 'Menu');

//         // Generate a binary string from the workbook
//         const wbBinary = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

//         // Convert the binary string to a Blob
//         const blob = new Blob([s2ab(wbBinary)], { type: 'application/octet-stream' });

//         // Create a download link and trigger the download
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = 'menu.xlsx';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     // Helper function to convert a sring to an ArrayBuffer
//     const s2ab = (s) => {
//         const buf = new ArrayBuffer(s.length);
//         const view = new Uint8Array(buf);
//         for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
//         return buf;
//     };

//     const handleEdit = (menu) => {
//         setMenuToEdit(menu);
//         setIsEditModalOpen(true);
//     };

//     const [isNewModalOpen, setIsNewModalOpen] = useState(false);
//     const [newMenuData, setNewMenuData] = useState({
//         name: "",
//         price: "",
//         image: null, // Add the image field
//         // mainCategoryId: "",
//     });

//     const handleDelete = (menu) => {
//         // Set the menu to be deleted in the state
//         setMenuToDelete(menu);
//         // Open the delete confirmation modal
//         setIsDeleteModalOpen(true);
//     };

//     const confirmDelete = async () => {
//         try {
//             // Proceed with the delete operation
//             const response = await axios.delete(
//                 `http://localhost:5000/api/menu/menus/${menuToDelete._id}`
//             );
//             console.log("Menu deleted successfully:", response.data);

//             // Update the menus state by filtering out the deleted menu
//             setMenus((prevMenus) =>
//                 prevMenus.filter((m) => m._id !== menuToDelete._id)
//             );

//             // Close the delete confirmation modal
//             setIsDeleteModalOpen(false);
//             // Clear the menu to be deleted from the state
//             setMenuToDelete(null);
//         } catch (error) {
//             console.error("Error deleting menu:", error);
//         }
//     };

//     const cancelDelete = () => {
//         // Close the delete confirmation modal without deleting
//         setIsDeleteModalOpen(false);
//         // Clear the menu to be deleted from the state
//         setMenuToDelete(null);
//     };


//     const handleInputChange = (e) => {
//         const { name, value, type, files } = e.target;

//         // If the input is a file (image input), set the image field in a different way
//         if (type === "file") {
//             setNewMenuData((prevData) => ({
//                 ...prevData,
//                 [name]: files[0], // Assuming you only want to handle one file
//             }));
//         } else {
//             setNewMenuData((prevData) => ({
//                 ...prevData,
//                 [name]: value,
//             }));
//         }
//     };
//     const openExcelUpload = () => {
//         setIsExcelUploadOpen(true);
//     };

//     const closeExcelUpload = () => {
//         setIsExcelUploadOpen(false);
//     };

//     const [errorMessage, setErrorMessage] = useState(null);

//     // const addNewMenu = async () => {
//     //     try {
//     //         const formData = new FormData();
//     //         formData.append("name", newMenuData.name);
//     //         formData.append("price", newMenuData.price);
//     //         formData.append("image", newMenuData.image);
//     //         formData.append("uniqueId", newMenuData.uniqueId);
//     //         // formData.append("mainCategoryId", newMenuData.mainCategoryId);

//     //         const response = await axios.post(
//     //             `http://localhost:5000/api/menu/menu`,
//     //             formData
//     //         );

//     //         console.log("Menu added successfully:", response.data);
//     //         setMenus((prevMenus) => [...prevMenus, response.data]);

//     //         setNewMenuData({
//     //             name: "",
//     //             price: "",
//     //             image: null,
//     //             uniqueId: "",
//     //             // mainCategoryId: "",
//     //         });

//     //         setIsNewModalOpen(false);
//     //     } catch (error) {
//     //         console.error("Error adding menu:", error);
//     //     }
//     // };
//     const addNewMenu = async () => {
//         try {
//             const formData = new FormData();
//             formData.append("name", newMenuData.name);
//             formData.append("price", newMenuData.price);
//             formData.append("image", newMenuData.image);
//             formData.append("uniqueId", newMenuData.uniqueId);

//             const response = await axios.post(
//                 `http://localhost:5000/api/menu/menu`,
//                 formData
//             );

//             console.log("Menu added successfully:", response.data);
//             setMenus((prevMenus) => [...prevMenus, response.data]);

//             setNewMenuData({
//                 name: "",
//                 price: "",
//                 image: null,
//                 uniqueId: "",
//                 // mainCategoryId: "",
//             });

//             setIsNewModalOpen(false);
//             setErrorMessage(null);
//         } catch (error) {
//             console.error("Error adding menu:", error);

//             let errorMessage = "Error adding menu. Please try again later.";

//             if (error.response && error.response.status === 400) {
//                 const specificErrorMessage = error.response.data.message;
//                 if (specificErrorMessage.includes("uniqueId")) {
//                     errorMessage = "Menu ID is already taken.";
//                 }
//             }

//             // Set the error message state
//             setErrorMessage(errorMessage);

//             // Automatically clear the error message after 2 seconds
//             setTimeout(() => {
//                 setErrorMessage(null);
//             }, 2000);

//         }
//     };

//     useEffect(() => {
//         const fetchMenus = async () => {
//             try {
//                 const response = await axios.get(
//                     "http://localhost:5000/api/menu/menus/list"
//                 );
//                 setMenus(response.data);
//             } catch (error) {
//                 console.error("Error fetching menus:", error);
//             }
//         };

//         fetchMenus();
//     }, []);

//     const handleFileUpload = async () => {
//         try {
//             if (!file) {
//                 console.error("No file selected");
//                 return;
//             }

//             const formData = new FormData();
//             formData.append("file", file);

//             // Make a POST request to the backend endpoint
//             const response = await axios.post(
//                 "http://localhost:5000/api/menu/upload-excel",
//                 formData
//             );

//             console.log(response.data); // Handle the response data as needed
//         } catch (error) {
//             console.error("Error uploading file:", error.message);
//         }
//     };
//     const menusPerPage = 10; // Change this to set the number of menus per page

//     const pageCount = Math.ceil(menus.length / menusPerPage);

//     const displayMenus = filterMenus()
//         .slice(pageNumber * menusPerPage, (pageNumber + 1) * menusPerPage)
//         .map((menu, index) => (
//             <tr key={menu._id} className="hover:bg-gray-100">
//                 <td className="p-1 border text-center text-gray">
//                     {pageNumber * menusPerPage + index + 1}
//                 </td>
//                 <td className="pl-4 border text-left text-gray">{menu.name}</td>
//                 <td className="pl-4 border text-center text-gray text-red-600">{menu.uniqueId}</td>
//                 <td className="p-1 border text-center text-gray">{menu.price}</td>

//                 <td className="border py-1 text-center">
//                     <button
//                         className="text-gray-600 mr-3  focus:outline-none font-sans font-medium border border-gray-400 p-1 rounded-full px-4 text-sm"
//                         onClick={() => handleEdit(menu)}
//                     >
//                         <FontAwesomeIcon
//                             icon={faPenToSquare}
//                             color="orange"
//                             className="cursor-pointer"
//                         />{" "}
//                         Edit
//                     </button>
//                     <button
//                         className="text-gray-600 mr-3 font-sans focus:outline-none font-medium border border-gray-400 p-1  rounded-full px-3 text-sm"
//                         onClick={() => handleDelete(menu)}
//                     >
//                         <FontAwesomeIcon
//                             icon={faTrash}
//                             color="red"
//                             className="cursor-pointer"
//                         />{" "}
//                         Delete
//                     </button>
//                 </td>
//             </tr>
//         ));

//     const home = () => {
//         router.push("/dashboard");
//     };

//     const modalContent = (
//         <div
//             className="modal-container bg-white w-72 p-6 rounded shadow-lg"
//             onClick={(e) => e.stopPropagation()}
//         >
//             <div className="p-1 text-center">
//                 <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-400">
//                     Add New Menu
//                 </h3>
//                 {errorMessage && (
//                     <div className="text-red-500 mt-2">{errorMessage}</div>
//                 )}
//                 <form>
//                     <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
//                         Name
//                     </label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={newMenuData.name}
//                         onChange={handleInputChange}
//                         className="w-full p-2 mb-4 border rounded-md"
//                         required
//                     />
//                     <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
//                         MenuId
//                     </label>
//                     <input
//                         type="text"
//                         name="uniqueId"
//                         value={newMenuData.uniqueId}
//                         onChange={handleInputChange}
//                         className="w-full p-2 mb-4 border rounded-md"
//                         required
//                     />
//                     <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
//                         Price
//                     </label>
//                     <input
//                         type="text"
//                         name="price"
//                         value={newMenuData.price}
//                         onChange={handleInputChange}
//                         className="w-full p-2 mb-4 border rounded-md"
//                         required
//                     />

//                     <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
//                         Image
//                     </label>
//                     <input
//                         type="file"
//                         name="image"
//                         accept="image/*"
//                         onChange={handleInputChange}
//                         className="w-full p-2 mb-4 border rounded-md"
//                     />
//                     <div className="flex justify-between">
//                         <button
//                             type="button"
//                             className="border boder-gray-400 hover:bg-gray-300 text-gray font-semibold py-2 px-4 rounded-full mt-4"
//                             onClick={addNewMenu}
//                         >
//                             Add Menu
//                         </button>
//                         <button
//                             type="button"
//                             className="border boder-gray-400 hover:bg-gray-300 text-gray font-semibold py-2 px-4 rounded-full mt-4"
//                             onClick={() => setIsNewModalOpen(false)}
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );

//     return (
//         <>
//             <Navbar />

//             <DeleteConfirmationModal
//                 isOpen={isDeleteModalOpen}
//                 onCancel={cancelDelete}
//                 onConfirm={confirmDelete}
//             />

//             <Square />

//             <div className="container mx-auto p-2 w-full -mt-2 overflow-x-auto  border-gray-300 border-2 shadow-md font-sans ">
//                 <div className="flex items-center justify-between mb-1">
//                     <h1 className="text-md font-semibold font-sans">Hotel Menu</h1>
//                     <div className="flex justify-center">
//                         <div className="relative mx-auto text-gray-600 justify-center  right-3 flex float-right">
//                             <input
//                                 className="border-2 border-gray-300  pl-2   rounded-2xl bg-white h-9 text-sm focus:outline-none "
//                                 id="searchInput"
//                                 type="text"
//                                 name="searchInput"
//                                 placeholder="Search"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />

//                             <button type="submit" className="absolute right-0 top-2  mr-2">
//                                 <FontAwesomeIcon
//                                     icon={faSearch}
//                                     className="text-gray-700 "
//                                 />
//                             </button>
//                         </div>
//                         <div className=" float-left flex justify-between  relative  right-2">
//                             <button
//                                 className="text-gray font-bold py-1 px-1  rounded-md text-sm  border  border-gray-400 hover:bg-gray-300 "
//                                 onClick={exportToExcel}
//                             // onClick={openExcelUpload}
//                             >
//                                 <FontAwesomeIcon icon={faDownload} className="mr-1" />
//                                 export
//                             </button>
//                             <button
//                                 className="text-gray font-bold py-1 px-1  rounded-md text-sm  border ml-2 border-gray-400 hover:bg-gray-300 "
//                                 onClick={openExcelUpload}
//                             >
//                                 <FontAwesomeIcon icon={faUpload} className="mr-1" />
//                                 Import
//                             </button>

//                             <button
//                                 className=" text-gray font-bold py-2 px-2 rounded-full text-sm  ml-1  border border-gray-400 hover:bg-gray-300"
//                                 onClick={() => setIsNewModalOpen(true)}
//                             >
//                                 <FontAwesomeIcon icon={faPlus} className="" />
//                                 Add
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <table className="min-w-full border border-gray-300 ">
//                     <thead className="text-sm bg-gray-300 text-gray-700">
//                         <tr>
//                             <th className="p-1 border">Sr No.</th>
//                             <th className="p-1 border">Name</th>
//                             <th className="p-1 border">MenuID</th>
//                             <th className="p-1 border">Price</th>
//                             {/* <th className="p-2 border">Category</th> */}
//                             {/* <th className="p-2 border text-center">Image</th> */}
//                             <th className="p-1 border text-center">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="text-md font-sans font-bold">{displayMenus}</tbody>
//                 </table>

//                 <div className="flex flex-col items-center mt-1">
//                     <span className="text-xs text-gray-700 dark:text-gray-400">
//                         Showing{" "}
//                         <span className="font-semibold text-gray-900 dark:text-white">
//                             {pageNumber * menusPerPage + 1}
//                         </span>{" "}
//                         to{" "}
//                         <span className="font-semibold text-gray-900 dark:text-white">
//                             {Math.min((pageNumber + 1) * menusPerPage, menus.length)}
//                         </span>{" "}
//                         of{" "}
//                         <span className="font-semibold text-gray-900 dark:text-white">
//                             {menus.length}
//                         </span>{" "}
//                         Menus
//                     </span>
//                     <div className="inline-flex mt-1 xs:mt-0">
//                         <button
//                             className={`${pageNumber === 0
//                                 ? "opacity-50 cursor-not-allowed"
//                                 : "hover:bg-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
//                                 } flex items-center justify-center px-3 h-8 text-xs font-medium text-white bg-gray-800 border-gray-700 rounded-s`}
//                             onClick={() => setPageNumber((prev) => Math.max(prev - 1, 0))}
//                             disabled={pageNumber === 0}
//                         >
//                             <FontAwesomeIcon icon={faAnglesLeft} />
//                         </button>
//                         <button
//                             className={`${pageNumber === pageCount - 1
//                                 ? "opacity-50 cursor-not-allowed"
//                                 : "hover:bg-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
//                                 } flex items-center justify-center px-3 h-8 text-xs font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e`}
//                             onClick={() =>
//                                 setPageNumber((prev) => Math.min(prev + 1, pageCount - 1))
//                             }
//                             disabled={pageNumber === pageCount - 1}
//                         >
//                             <FontAwesomeIcon icon={faAnglesRight} />
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {isPreviewModalOpen && (
//                 <div
//                     className="fixed inset-0 flex items-center justify-center z-50 m-1"
//                     style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//                 >
//                     <div
//                         className="modal-container bg-white w-72 p-6 rounded shadow-lg"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <button
//                             type="button"
//                             className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                             onClick={() => setIsPreviewModalOpen(false)}
//                         ></button>
//                         <div className="p-1 text-center">
//                             <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-400">
//                                 Image Preview
//                             </h3>
//                             <Image
//                                 src={completeImageUrl}
//                                 alt="Preview"
//                                 width={500}
//                                 height={500}
//                             />
//                             <button
//                                 type="button"
//                                 className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded-full mt-4 mr-2"
//                                 onClick={() => setIsPreviewModalOpen(false)}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {isNewModalOpen && (
//                 <div
//                     className="fixed inset-0 flex items-center justify-center z-50 m-1"
//                     style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//                 >
//                     {modalContent}
//                 </div>
//             )}

//             {isEditModalOpen && (
//                 <EditModal
//                     isOpen={isEditModalOpen}
//                     onCancel={() => {
//                         setIsEditModalOpen(false);
//                         setMenuToEdit(null);
//                     }}
//                     onEdit={(editedMenu) => {
//                         // Update the menus state with the edited menu
//                         setMenus((prevMenus) =>
//                             prevMenus.map((menu) =>
//                                 menu._id === editedMenu._id ? editedMenu : menu
//                             )
//                         );
//                     }}
//                     menuToEdit={menuToEdit}
//                     mainCategories={mainCategories}
//                 />
//             )}

//             {isExcelUploadOpen && (
//                 <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex  items-center justify-center">
//                     <div className="bg-white p-8 rounded shadow-md max-w-md">
//                         <h1 className="text-2xl font-semibold mb-6">Excel File Upload</h1>
//                         <input
//                             type="file"
//                             onChange={handleFileChange}
//                             className="mb-4 p-3 border border-gray-300 rounded w-full"
//                         />
//                         <button
//                             onClick={() => {
//                                 handleFileUpload();
//                                 closeExcelUpload();
//                             }}
//                             className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600"
//                         >
//                             Upload To Excel
//                         </button>
//                         <button
//                             onClick={closeExcelUpload}
//                             className="mt-4 bg-gray-500 text-white p-3 rounded w-full hover:bg-gray-600"
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {isViewModalOpen && (
//                 <div
//                     className={`fixed inset-0 flex items-center justify-center z-50 ${isViewModalOpen ? "" : "hidden"
//                         }`}
//                     style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//                 >
//                     <div className="modal-container bg-white w-96 p-8 rounded-md shadow-lg m-1">
//                         <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-400">
//                             View Menu
//                         </h3>
//                         <div className="text-center">
//                             <p className="text-gray-600 mb-2">
//                                 <span className="font-semibold">Name:</span> {menuToView?.name}
//                             </p>
//                             <p className="text-gray-600 mb-2">
//                                 <span className="font-semibold">Price:</span>{" "}
//                                 {menuToView?.price}
//                             </p>
//                             <p className="text-gray-600 mb-2">
//                                 <span className="font-semibold">Category:</span>{" "}
//                                 {menuToView?.mainCategory?.name}
//                             </p>
//                             <p className="text-gray-600 mb-4">
//                                 <span className="font-semibold">Image:</span>{" "}
//                                 {menuToView?.imageUrl ? (
//                                     <img
//                                         src={`http://localhost:5000/${menuToView.imageUrl}`}
//                                         alt="Menu"
//                                         className="max-w-full max-h-32 mt-2 rounded-md shadow-md"
//                                     />
//                                 ) : (
//                                     "Not Available"
//                                 )}
//                             </p>
//                         </div>
//                         <div className="flex justify-end">
//                             <button
//                                 type="button"
//                                 className="border border-gray-400 hover:bg-gray-300 text-gray font-bold py-2 px-4 rounded-full mr-2"
//                                 onClick={() => setIsViewModalOpen(false)}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default MenuList;

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDownload,
    faSearch,
    faHouse,
    faPenToSquare,
    faPlus,
    faTrash,
    faAnglesLeft,
    faAnglesRight,
    faUpload,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import Square from "../components/square";

const EditModal = ({ isOpen, onCancel, onEdit, menuToEdit }) => {
    const [editedMenuData, setEditedMenuData] = useState({
        name: menuToEdit?.name || "",
        price: menuToEdit?.price || "",
        uniqueId: menuToEdit?.uniqueId || "",
        image: null,
        // mainCategoryId: menuToEdit?.mainCategory._id || "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let timeoutId;

        if (errorMessage) {
            timeoutId = setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }

        return () => {
            // Cleanup the timeout when the component is unmounted or the error message changes
            clearTimeout(timeoutId);
        };
    }, [errorMessage]);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            setEditedMenuData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
        } else {
            setEditedMenuData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleEdit = async () => {
        try {
            const formData = new FormData();
            formData.append("name", editedMenuData.name);
            formData.append("price", editedMenuData.price);
            formData.append("image", editedMenuData.image);
            formData.append("uniqueId", editedMenuData.uniqueId);
            // formData.append("mainCategoryId", editedMenuData.mainCategoryId);
    
            const response = await axios.patch(
                `http://localhost:5000/api/menu/menus/${menuToEdit._id}`,
                formData
            );
    
            console.log("Menu updated successfully:", response.data);
            onEdit(response.data); // Update the state with the edited menu
    
            onCancel(); // Close the edit modal
        } catch (error) {
            console.error("Error updating menu:", error);
    
            if (error.response && error.response.status === 400) {
                const specificErrorMessage = error.response.data.message;
    
                // Ensure specificErrorMessage is defined before using includes
                if (specificErrorMessage && specificErrorMessage.includes("uniqueId")) {
                    setErrorMessage("Error adding menu. Please try again later."); // Update the error message state
                } else {
                    setErrorMessage("Menu ID is already taken"); // Update the error message state
                }
            }
        }
    };
    

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? "" : "hidden"
                }`}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
            <div
                className="modal-container bg-white w-72 p-6 rounded shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-400">
                    Edit Menu
                </h3>
                {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
                <form>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={editedMenuData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 mb-4 border rounded-md"
                    />
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                        MenuId
                    </label>
                    <input
                        type="text"
                        name="uniqueId"
                        value={editedMenuData.uniqueId}
                        onChange={handleInputChange}
                        className="w-full p-2 mb-4 border rounded-md"
                    />
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                        Price
                    </label>
                    <input
                        type="text"
                        name="price"
                        value={editedMenuData.price}
                        onChange={handleInputChange}
                        className="w-full p-2 mb-4 border rounded-md"
                    />

                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                        Image
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleInputChange}
                        className="w-full p-2 mb-4 border rounded-md"
                    />
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md mt-4"
                            onClick={onCancel}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md mt-4"
                            onClick={handleEdit}
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
            <div
                className="modal-container bg-white w-72 p-6 rounded shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-400">
                    Delete
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Do you want to delete this Menu ?
                </p>
                <div className="flex justify-end mt-4">
                    <button
                        className=" border border-gray-400 hover:bg-red-400 text-gray font-bold py-2 px-4 rounded-full mr-2"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                    <button
                        className=" border border-gray-400 hover:bg-gray-300 text-gray font-bold py-2 px-4 rounded-full "
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const MenuList = () => {
    const [menus, setMenus] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [menuToDelete, setMenuToDelete] = useState(null);
    const [mainCategories, setMainCategories] = useState([]); // Added state for main categories
    const [pageNumber, setPageNumber] = useState(0);
    const [completeImageUrl, setPreviewImageUrl] = useState("");
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const router = useRouter();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [menuToEdit, setMenuToEdit] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [menuToView, setMenuToView] = useState(null);
    const [file, setFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isExcelUploadOpen, setIsExcelUploadOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const filterMenus = () => {
        return menus.filter((menu) =>
            menu.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const exportToExcel = () => {
        // Create an empty worksheet
        const ws = XLSX.utils.aoa_to_sheet([['name', 'price']]);

        // Create an empty workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Menu');

        // Generate a binary string from the workbook
        const wbBinary = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

        // Convert the binary string to a Blob
        const blob = new Blob([s2ab(wbBinary)], { type: 'application/octet-stream' });

        // Create a download link and trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'menu.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Helper function to convert a sring to an ArrayBuffer
    const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    };

    const handleEdit = (menu) => {
        setMenuToEdit(menu);
        setIsEditModalOpen(true);
    };

    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [newMenuData, setNewMenuData] = useState({
        name: "",
        price: "",
        image: null, // Add the image field
        // mainCategoryId: "",
    });

    const handleDelete = (menu) => {
        // Set the menu to be deleted in the state
        setMenuToDelete(menu);
        // Open the delete confirmation modal
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            // Proceed with the delete operation
            const response = await axios.delete(
                `http://localhost:5000/api/menu/menus/${menuToDelete._id}`
            );
            console.log("Menu deleted successfully:", response.data);

            // Update the menus state by filtering out the deleted menu
            setMenus((prevMenus) =>
                prevMenus.filter((m) => m._id !== menuToDelete._id)
            );

            // Close the delete confirmation modal
            setIsDeleteModalOpen(false);
            // Clear the menu to be deleted from the state
            setMenuToDelete(null);
        } catch (error) {
            console.error("Error deleting menu:", error);
        }
    };

    const cancelDelete = () => {
        // Close the delete confirmation modal without deleting
        setIsDeleteModalOpen(false);
        // Clear the menu to be deleted from the state
        setMenuToDelete(null);
    };


    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;

        // If the input is a file (image input), set the image field in a different way
        if (type === "file") {
            setNewMenuData((prevData) => ({
                ...prevData,
                [name]: files[0], // Assuming you only want to handle one file
            }));
        } else {
            setNewMenuData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    const openExcelUpload = () => {
        setIsExcelUploadOpen(true);
    };

    const closeExcelUpload = () => {
        setIsExcelUploadOpen(false);
    };

    const [errorMessage, setErrorMessage] = useState(null);

    // const addNewMenu = async () => {
    //     try {
    //         const formData = new FormData();
    //         formData.append("name", newMenuData.name);
    //         formData.append("price", newMenuData.price);
    //         formData.append("image", newMenuData.image);
    //         formData.append("uniqueId", newMenuData.uniqueId);
    //         // formData.append("mainCategoryId", newMenuData.mainCategoryId);

    //         const response = await axios.post(
    //             `http://localhost:5000/api/menu/menu`,
    //             formData
    //         );

    //         console.log("Menu added successfully:", response.data);
    //         setMenus((prevMenus) => [...prevMenus, response.data]);

    //         setNewMenuData({
    //             name: "",
    //             price: "",
    //             image: null,
    //             uniqueId: "",
    //             // mainCategoryId: "",
    //         });

    //         setIsNewModalOpen(false);
    //     } catch (error) {
    //         console.error("Error adding menu:", error);
    //     }
    // };
    const addNewMenu = async () => {
        try {
            const formData = new FormData();
            formData.append("name", newMenuData.name);
            formData.append("price", newMenuData.price);
            formData.append("image", newMenuData.image);
            formData.append("uniqueId", newMenuData.uniqueId);

            const response = await axios.post(
                `http://localhost:5000/api/menu/menu`,
                formData
            );

            console.log("Menu added successfully:", response.data);
            setMenus((prevMenus) => [...prevMenus, response.data]);

            setNewMenuData({
                name: "",
                price: "",
                image: null,
                uniqueId: "",
                // mainCategoryId: "",
            });

            setIsNewModalOpen(false);
            setErrorMessage(null);
        } catch (error) {
            console.error("Error adding menu:", error);

            let errorMessage = "Error adding menu. Please try again later.";

            if (error.response && error.response.status === 400) {
                const specificErrorMessage = error.response.data.message;
                if (specificErrorMessage.includes("uniqueId")) {
                    errorMessage = "Menu ID is already taken.";
                }
            }

            // Set the error message state
            setErrorMessage(errorMessage);

            // Automatically clear the error message after 2 seconds
            setTimeout(() => {
                setErrorMessage(null);
            }, 2000);

        }
    };

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/menu/menus/list"
                );
                setMenus(response.data);
            } catch (error) {
                console.error("Error fetching menus:", error);
            }
        };

        fetchMenus();
    }, []);

    const handleFileUpload = async () => {
        try {
            if (!file) {
                console.error("No file selected");
                return;
            }

            const formData = new FormData();
            formData.append("file", file);

            // Make a POST request to the backend endpoint
            const response = await axios.post(
                "http://localhost:5000/api/menu/upload-excel",
                formData
            );

            console.log(response.data); // Handle the response data as needed
        } catch (error) {
            console.error("Error uploading file:", error.message);
        }
    };
    const menusPerPage = 10; // Change this to set the number of menus per page

    const pageCount = Math.ceil(menus.length / menusPerPage);

    const displayMenus = filterMenus()
        .slice(pageNumber * menusPerPage, (pageNumber + 1) * menusPerPage)
        .map((menu, index) => (
            <tr key={menu._id} className="hover:bg-gray-100">
                <td className="p-1 border text-center text-gray">
                    {pageNumber * menusPerPage + index + 1}
                </td>
                <td className="pl-4 border text-left text-gray">{menu.name}</td>
                <td className="pl-4 border text-center text-gray text-red-600">{menu.uniqueId}</td>
                <td className="p-1 border text-center text-gray">{menu.price}</td>

                <td className="border py-1 text-center">
                    <button
                        className="text-gray-600 mr-3  focus:outline-none font-sans font-medium border border-gray-400 p-1 rounded-full px-4 text-sm"
                        onClick={() => handleEdit(menu)}
                    >
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            color="orange"
                            className="cursor-pointer"
                        />{" "}
                        Edit
                    </button>
                    <button
                        className="text-gray-600 mr-3 font-sans focus:outline-none font-medium border border-gray-400 p-1  rounded-full px-3 text-sm"
                        onClick={() => handleDelete(menu)}
                    >
                        <FontAwesomeIcon
                            icon={faTrash}
                            color="red"
                            className="cursor-pointer"
                        />{" "}
                        Delete
                    </button>
                </td>
            </tr>
        ));

    const home = () => {
        router.push("/dashboard");
    };

    const modalContent = (
        <div
            className="modal-container bg-white w-72 p-6 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="p-1 text-center">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-400">
                    Add New Menu
                </h3>
                {errorMessage && (
                    <div className="text-red-500 mt-2">{errorMessage}</div>
                )}
                <form>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={newMenuData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 mb-4 border rounded-md"
                        required
                    />
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                        MenuId
                    </label>
                    <input
                        type="text"
                        name="uniqueId"
                        value={newMenuData.uniqueId}
                        onChange={handleInputChange}
                        className="w-full p-2 mb-4 border rounded-md"
                        required
                    />
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                        Price
                    </label>
                    <input
                        type="text"
                        name="price"
                        value={newMenuData.price}
                        onChange={handleInputChange}
                        className="w-full p-2 mb-4 border rounded-md"
                        required
                    />

                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                        Image
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleInputChange}
                        className="w-full p-2 mb-4 border rounded-md"
                    />
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="border boder-gray-400 hover:bg-gray-300 text-gray font-semibold py-2 px-4 rounded-full mt-4"
                            onClick={addNewMenu}
                        >
                            Add Menu
                        </button>
                        <button
                            type="button"
                            className="border boder-gray-400 hover:bg-gray-300 text-gray font-semibold py-2 px-4 rounded-full mt-4"
                            onClick={() => setIsNewModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <>
            <Navbar />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onCancel={cancelDelete}
                onConfirm={confirmDelete}
            />

            <Square />

            <div className="container mx-auto p-2 w-full -mt-2 overflow-x-auto  border-gray-300 border-2 shadow-md font-sans ">
                <div className="flex items-center justify-between mb-1">
                    <h1 className="text-md font-semibold font-sans">Hotel Menu</h1>
                    <div className="flex justify-center">
                        <div className="relative mx-auto text-gray-600 justify-center  right-3 flex float-right">
                            <input
                                className="border-2 border-gray-300  pl-2   rounded-2xl bg-white h-9 text-sm focus:outline-none "
                                id="searchInput"
                                type="text"
                                name="searchInput"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                            <button type="submit" className="absolute right-0 top-2  mr-2">
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="text-gray-700 "
                                />
                            </button>
                        </div>
                        <div className=" float-left flex justify-between  relative  right-2">
                            <button
                                className="text-gray font-bold py-1 px-1  rounded-md text-sm  border  border-gray-400 hover:bg-gray-300 "
                                onClick={exportToExcel}
                            // onClick={openExcelUpload}
                            >
                                <FontAwesomeIcon icon={faDownload} className="mr-1" />
                                export
                            </button>
                            <button
                                className="text-gray font-bold py-1 px-1  rounded-md text-sm  border ml-2 border-gray-400 hover:bg-gray-300 "
                                onClick={openExcelUpload}
                            >
                                <FontAwesomeIcon icon={faUpload} className="mr-1" />
                                Import
                            </button>

                            <button
                                className=" text-gray font-bold py-2 px-2 rounded-full text-sm  ml-1  border border-gray-400 hover:bg-gray-300"
                                onClick={() => setIsNewModalOpen(true)}
                            >
                                <FontAwesomeIcon icon={faPlus} className="" />
                                Add
                            </button>
                        </div>
                    </div>
                </div>
                <table className="min-w-full border border-gray-300 ">
                    <thead className="text-sm bg-gray-300 text-gray-700">
                        <tr>
                            <th className="p-1 border">Sr No.</th>
                            <th className="p-1 border">Name</th>
                            <th className="p-1 border">MenuID</th>
                            <th className="p-1 border">Price</th>
                            {/* <th className="p-2 border">Category</th> */}
                            {/* <th className="p-2 border text-center">Image</th> */}
                            <th className="p-1 border text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-md font-sans font-bold">{displayMenus}</tbody>
                </table>

                <div className="flex flex-col items-center mt-1">
                    <span className="text-xs text-gray-700 dark:text-gray-400">
                        Showing{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {pageNumber * menusPerPage + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {Math.min((pageNumber + 1) * menusPerPage, menus.length)}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {menus.length}
                        </span>{" "}
                        Menus
                    </span>
                    <div className="inline-flex mt-1 xs:mt-0">
                        <button
                            className={`${pageNumber === 0
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
                                } flex items-center justify-center px-3 h-8 text-xs font-medium text-white bg-gray-800 border-gray-700 rounded-s`}
                            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 0))}
                            disabled={pageNumber === 0}
                        >
                            <FontAwesomeIcon icon={faAnglesLeft} />
                        </button>
                        <button
                            className={`${pageNumber === pageCount - 1
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
                                } flex items-center justify-center px-3 h-8 text-xs font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e`}
                            onClick={() =>
                                setPageNumber((prev) => Math.min(prev + 1, pageCount - 1))
                            }
                            disabled={pageNumber === pageCount - 1}
                        >
                            <FontAwesomeIcon icon={faAnglesRight} />
                        </button>
                    </div>
                </div>
            </div>

            {isPreviewModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 m-1"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div
                        className="modal-container bg-white w-72 p-6 rounded shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => setIsPreviewModalOpen(false)}
                        ></button>
                        <div className="p-1 text-center">
                            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-400">
                                Image Preview
                            </h3>
                            <Image
                                src={completeImageUrl}
                                alt="Preview"
                                width={500}
                                height={500}
                            />
                            <button
                                type="button"
                                className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded-full mt-4 mr-2"
                                onClick={() => setIsPreviewModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isNewModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 m-1"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    {modalContent}
                </div>
            )}

            {isEditModalOpen && (
                <EditModal
                    isOpen={isEditModalOpen}
                    onCancel={() => {
                        setIsEditModalOpen(false);
                        setMenuToEdit(null);
                    }}
                    onEdit={(editedMenu) => {
                        // Update the menus state with the edited menu
                        setMenus((prevMenus) =>
                            prevMenus.map((menu) =>
                                menu._id === editedMenu._id ? editedMenu : menu
                            )
                        );
                    }}
                    menuToEdit={menuToEdit}
                    mainCategories={mainCategories}
                />
            )}

            {isExcelUploadOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex  items-center justify-center">
                    <div className="bg-white p-8 rounded shadow-md max-w-md">
                        <h1 className="text-2xl font-semibold mb-6">Excel File Upload</h1>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="mb-4 p-3 border border-gray-300 rounded w-full"
                        />
                        <button
                            onClick={() => {
                                handleFileUpload();
                                closeExcelUpload();
                            }}
                            className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600"
                        >
                            Upload To Excel
                        </button>
                        <button
                            onClick={closeExcelUpload}
                            className="mt-4 bg-gray-500 text-white p-3 rounded w-full hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {isViewModalOpen && (
                <div
                    className={`fixed inset-0 flex items-center justify-center z-50 ${isViewModalOpen ? "" : "hidden"
                        }`}
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div className="modal-container bg-white w-96 p-8 rounded-md shadow-lg m-1">
                        <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-400">
                            View Menu
                        </h3>
                        <div className="text-center">
                            <p className="text-gray-600 mb-2">
                                <span className="font-semibold">Name:</span> {menuToView?.name}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <span className="font-semibold">Price:</span>{" "}
                                {menuToView?.price}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <span className="font-semibold">Category:</span>{" "}
                                {menuToView?.mainCategory?.name}
                            </p>
                            <p className="text-gray-600 mb-4">
                                <span className="font-semibold">Image:</span>{" "}
                                {menuToView?.imageUrl ? (
                                    <img
                                        src={`http://localhost:5000/${menuToView.imageUrl}`}
                                        alt="Menu"
                                        className="max-w-full max-h-32 mt-2 rounded-md shadow-md"
                                    />
                                ) : (
                                    "Not Available"
                                )}
                            </p>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="border border-gray-400 hover:bg-gray-300 text-gray font-bold py-2 px-4 rounded-full mr-2"
                                onClick={() => setIsViewModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MenuList;