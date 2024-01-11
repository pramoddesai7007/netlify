"use client";

import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons";

const CreateHotelForm = () => {
  const [formData, setFormData] = useState({
    hotelName: "",
    address: "",
    email: "",
    contactNo: "",
    gstNo: "",
    sacNo: "",
    fssaiNo: "",
    hotelLogo: null,
    qrCode: null,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLogoUploadOpen, setIsLogoUploadOpen] = useState(false);
  const [isQrUploadOpen, setIsQrUploadOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataForUpload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataForUpload.append(key, value);
      });

      const response = await axios.post(
        "http://localhost:5000/api/hotel/create",
        formDataForUpload
      );
      console.log("Hotel created successfully:", response.data);

      // Update success message and show modal
      setSuccessMessage("Hotel created successfully!");
      setShowModal(true);

      // Reset form data
      setFormData({
        hotelName: "",
        address: "",
        email: "",
        contactNo: "",
        gstNo: "",
        sacNo: "",
        fssaiNo: "",
        hotelLogo: null,
        qrCode: null,
      });
    } catch (error) {
      console.error("Error creating hotel:", error);
    }
  };
  const openExcelUpload = () => {
    setIsLogoUploadOpen(true);
  };

  const closeExcelUpload = () => {
    setIsLogoUploadOpen(false);
  };

  const openQrUpload = () => {
    setIsQrUploadOpen(true);
  };

  const closeQrUpload = () => {
    setIsQrUploadOpen(false);
  };

  return (
    <>
      <Navbar />
      <form className="w-1/3 mx-auto p-6 rounded-md hover:shadow-xl mt-20 font-sans border" style={{ boxShadow:'0 0 36px -27px black', backgroundColor:"#ffffff"}}>
        <h2 className="text-xl md:text-2xl font-semibold mb-3 text-orange-500">Create Hotel</h2>

        {/* Hotel Name */}
        <div className="mb-2">
          <label className="block text-sm font-medium ">
            Hotel Name
            <span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            name="hotelName"
            value={formData.hotelName}
            onChange={handleInputChange}
            className="w-full p-1 border rounded-md bg-slate-100 hover:bg-slate-200"
            required
          />
        </div>

        {/* Address */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-black">
            Address
            <span className="text-red-500"> *</span>

          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-1 border rounded-md bg-slate-100 hover:bg-slate-200"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-black">
            Email
            <span className="text-red-500"> *</span>

          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-1 border rounded-md bg-slate-100 hover:bg-slate-200"
            required
          />
        </div>

        {/* Contact No. */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-black">
            Contact No.
            <span className="text-red-500"> *</span>

          </label>
          <input
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleInputChange}
            className="w-full p-1 border rounded-md bg-slate-100 hover:bg-slate-200"
            required
          />
        </div>

        {/* GST No. */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-black">
            GST No.
            <span className="text-red-500"> *</span>

          </label>
          <input
            type="text"
            name="gstNo"
            value={formData.gstNo}
            onChange={handleInputChange}
            className="w-full p-1 border rounded-md bg-slate-100 hover:bg-slate-200"
            required
          />
        </div>

        {/* SAC No. */}

        <div className=" flex  justify-between gap-2">
          <div className="mb-2">
            <label className="block text-sm font-medium text-black ">
              SAC No.
            </label>
            <input
              type="text"
              name="sacNo"
              value={formData.sacNo}
              onChange={handleInputChange}
              className="w-full p-1 border rounded-md bg-slate-100 hover:bg-slate-200"
            //   required
            />
          </div>

          {/* FSSAI No. */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-black">
              FSSAI No.
              <span className="text-red-500"> *</span>

            </label>
            <input
              type="text"
              name="fssaiNo"
              value={formData.fssaiNo}
              onChange={handleInputChange}
              className="w-full p-1 border rounded-md bg-slate-100 hover:bg-slate-200"
              required
            />
          </div>
        </div>
        <div className=" flex justify-between mb-3">
          {/* Hotel Logo */}

          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              className="text-gray font-bold py-1 px-2 md:py-1 md:px-3 rounded-md text-sm border hover:bg-slate-200 bg-slate-100"
              onClick={openExcelUpload}
            >
              <FontAwesomeIcon icon={faUpload} className="mr-1" />
              set logo
            </button>
          </div>

          
          {/* QR Code */}
        
        <div className="flex items-center space-x-2 md:space-x-4 md:ml-2 ">
          <button
            className="text-gray font-bold py-1 px-2 md:py-1 md:px-2 rounded-md text-sm border hover:bg-slate-200 bg-slate-100"
            onClick={openQrUpload}
          >
            <FontAwesomeIcon icon={faUpload} className="mr-1" />
            set QR code
          </button>
        </div>
        </div>
        <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        onClick={handleSubmit}
      >
        Create Hotel
      </button>
    </form>


    {isLogoUploadOpen && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex  items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md max-w-md">
          <h1 className="text-2xl font-semibold mb-6">
            Hotel Logo Upload
          </h1>
          <input
            type="file"
            name="hotelLogo"
            accept="image/*"
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md"
          />

          <button
            onClick={closeExcelUpload}
            className="mt-4 bg-gray-500 text-white p-3 rounded w-full hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    )}

        {isQrUploadOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex  items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md max-w-md">
              <h1 className="text-2xl font-semibold mb-6">Hotel QR Upload</h1>
              <input
                type="file"
                name="qrCode"
                accept="image/*"
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-md"
              />

              <button
                onClick={closeQrUpload}
                className="mt-4 bg-gray-500 text-white p-3 rounded w-full hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white p-4">
                <div className="text-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Success!
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{successMessage}</p>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleCloseModal}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateHotelForm;