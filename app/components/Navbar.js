"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faCogs,
  faTable,
  faUtensils,
  faFileAlt,
  faBuilding,
  faChessBoard,
  faGripHorizontal,
  faGripLines,
  faPercent,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [showBillSetting, setShowBillSetting] = useState(false);
  const [showLink1, setShowLink1] = useState(false);
  const [showLink2, setShowLink2] = useState(false);
  const [showLink3, setShowLink3] = useState(false);

  const [showSubDropdown, setShowSubDropdown] = useState(false);
  const [showMenuMasterDropdown, setShowMenuMasterDropdown] = useState(false);
  const [showGstMasterDropdown, setShowGstMasterDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleMenuMasterDropdownClick = () => {
    setShowMenuMasterDropdown((prev) => !prev);
  };

  const handleGstMasterDropdownClick = () => {
    setShowGstMasterDropdown((prev) => !prev);
  };

  const handleTableMasterClick = () => {
    setShowSubDropdown((prev) => !prev);
  };

  useEffect(() => {
    // Initialize the state on the client side
    setShowBillSetting(false);
    setShowLink1(false);
    setShowLink2(false);
    setShowLink3(false);
    setShowSubDropdown(false);
  }, []);

  const handleBillSettingClick = () => {
    setShowBillSetting((prev) => !prev);
    setShowLink1(false);
    setShowLink2(false);
    setShowLink3(false);
    setShowSubDropdown(false);
  };

  const handleLink1Click = () => {
    setShowLink1((prev) => !prev);
    setShowBillSetting(false);
    setShowLink2(false);
    setShowSubDropdown(false);
  };

  const handleLink2Click = () => {
    setShowLink2((prev) => !prev);
    setShowBillSetting(false);
    setShowLink1(false);
    setShowSubDropdown(false);
  };
  const handleLink3Click = () => {
    setShowLink3((prev) => !prev);
    setShowBillSetting(false);

    setShowLink2(false);
    setShowSubDropdown(false);
  };
  const handleSubDropdownClick = () => {
    setShowSubDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Clicked outside the dropdowns, close them
        setShowBillSetting(false);
        setShowLink1(false);
        setShowLink2(false);
        setShowLink3(false);
        setShowSubDropdown(false);
        setShowMenuMasterDropdown(false);
        setShowGstMasterDropdown(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <div>
    <div className={`main-container ${showSidebar ? "sidebar-open" : ""}`}>
    <aside
      className={`bg-blue-200 text-blue-700 p-4 min-h-screen fixed top-0 left-10 z-20 transform transition-transform ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button onClick={handleToggleSidebar} className="toggle-button float-right">
        <FontAwesomeIcon icon={faGripLines} className="mr-1 -mt-5" />
      </button>


      
          <nav>
            <div className="flex flex-col z-50 mt-3">
              {/* Bill Setting Dropdown */}
              <div className="relative group inline-block mt-3">
                <button
                  onClick={handleBillSettingClick}
                  className="outline-none focus:outline-none px-3 py-1 rounded-md flex items-center text-blue-600 shadow-md"
                >
                  <FontAwesomeIcon icon={faCog} className="mr-1" />
                  <span className="pr-1 font-semibold flex-0 whitespace-nowrap text-center">
                    Bill Setting
                  </span>
                  <span>
                    <svg
                      className={`fill-current h-4 w-4 transform ${
                        showBillSetting ? "rotate-180" : ""
                      } transition duration-150 ease-in-out`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                </button>

                <ul
                  className={`${
                    showBillSetting ? "flex" : "hidden"
                  } flex-col text-black border rounded-md absolute top-0 left-full ml-2 z-30 bg-white`}
                >
                  <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                    <Link href="/hotel">Organisation Details</Link>
                  </li>

                  {/* <li
                    onClick={handleSubDropdownClick}
                    className="relative group px-4 py-1 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                  >
                    Organisation Details
                    <ul
                      className={`${
                        showSubDropdown ? "flex" : "hidden"
                      } flex-col absolute top-0 left-10 ml-2 z-30`}
                    >
                      <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                        Sub-option 1
                      </li>
                      <li className="rounded-md px-4 py-1 hover-bg-gray-100 whitespace-nowrap">
                        Sub-option 2
                      </li>
                    </ul>
                  </li> */}

                  <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                    Greeting Master
                  </li>
                </ul>
              </div>

              {/* Link 1 Dropdown */}
              <div className="relative group inline-block mt-3">
                <button
                  onClick={handleLink1Click}
                  className="outline-none focus:outline-none px-3 py-1 rounded-md flex items-center  text-blue-600 shadow-md"
                >
                  <FontAwesomeIcon icon={faGripLines} className="mr-1" />

                  <span className="pr-1 font-semibold flex-0">Masters</span>
                  <span>
                    <svg
                      className={`fill-current h-4 w-4 transform ${
                        showLink1 ? "rotate-180" : ""
                      } transition duration-150 ease-in-out`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                </button>

                <ul
                  className={`${
                    showLink1 ? "flex" : "hidden"
                  } flex-col bg-white text-black border rounded-md absolute top-0 left-full ml-2 z-30`}
                >
                  <li
                    onClick={handleTableMasterClick}
                    className="relative group px-4 py-1 hover:bg-gray-100 cursor-pointer whitespace-nowrap "
                  >
                    <div className="flex items-center">
                      <span className="rounded-md flex-0 pr-1 hover:bg-gray-100 whitespace-nowrap">
                        Table Master
                      </span>
                      <span>
                        <svg
                          className={`fill-current h-4 w-4 transform ${
                            showSubDropdown ? "rotate-180" : ""
                          } transition duration-150 ease-in-out`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </span>
                    </div>
                    <ul
                      className={`${
                        showSubDropdown ? "flex" : "hidden"
                      } flex-col  border rounded-md absolute top-0 -left-4  z-30 bg-white text-black`}
                    >
                      <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                        <Link href="/section">Table Type Master </Link>
                      </li>
                      <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                        <Link href="/tables">Table Master </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                    <Link href="/acForm">AC Master Order </Link>
                  </li>

                  <div className="relative group inline-block ">
                    <button
                      onClick={handleMenuMasterDropdownClick}
                      className="outline-none focus:outline-none  flex items-center  text-black"
                    >
                      <span className="  rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                        Menu Master
                      </span>
                      <span>
                        <svg
                          className={`fill-current h-4 w-4 transform ${
                            showMenuMasterDropdown ? "rotate-180" : ""
                          } transition duration-150 ease-in-out`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </span>
                    </button>

                    <ul
                      className={`${
                        showMenuMasterDropdown ? "flex" : "hidden"
                      } flex-col  border rounded-md absolute top-0 left-full  z-30 bg-white text-black`}
                    >
                      <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                        <Link href="/main">Menu List</Link>
                      </li>
                      <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                        <Link href="/menu">Sub Menu List</Link>
                      </li>
                      <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                        <Link href="/group">Group Menu</Link>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={handleGstMasterDropdownClick}
                    className="outline-none focus:outline-none  flex items-center  text-black"
                  >
                    <span className="  rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                      GST Master
                    </span>
                    <span>
                      <svg
                        className={`fill-current h-4 w-4 transform ${
                          showGstMasterDropdown ? "rotate-180" : ""
                        } transition duration-150 ease-in-out`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                  </button>
                  <ul
                    className={`${
                      showGstMasterDropdown ? "flex" : "hidden"
                    } flex-col  border rounded-md absolute top-24 left-full  z-30 bg-white text-black`}
                  >
                    <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                      <Link href="/gstForm">GST Master Purchase</Link>
                    </li>
                    <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                      <Link href="/gst">Gst Master Order</Link>
                    </li>
                    <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                      <Link href="/">Discount Master</Link>
                    </li>
                  </ul>
                </ul>
              </div>

              {/* Link 2 Dropdown */}
              <div className="relative group inline-block mt-3">
                <button
                  onClick={handleLink2Click}
                  className="outline-none focus:outline-none px-3 py-1 rounded-md flex items-center  text-white"
                >
                  <span className="pr-1 font-semibold flex-0">Link 2</span>
                  <span>
                    <svg
                      className={`fill-current h-4 w-4 transform ${
                        showLink2 ? "rotate-180" : ""
                      } transition duration-150 ease-in-out`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                </button>

                <ul
                  className={`${
                    showLink2 ? "flex" : "hidden"
                  } flex-col bg-white text-black border rounded-md absolute top-0 left-full ml-2 z-30`}
                >
                  <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                    Option 1
                  </li>
                  <li
                    onClick={handleSubDropdownClick}
                    className="relative group px-4 py-1 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                  >
                    Sub-option
                    <ul
                      className={`${
                        showSubDropdown ? "flex" : "hidden"
                      } flex-col absolute top-0 -left-12 z-30 border rounded-md`}
                    >
                      <li className="rounded-md px-4 py-1 hover-bg-gray-100 whitespace-nowrap">
                        Sub-sub-option 1
                      </li>
                      <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                        Sub-sub-option 2
                      </li>
                    </ul>
                  </li>
                  <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                    Option 2
                  </li>
                </ul>
              </div>

              <div className="relative group inline-block mt-3">
                <button
                  onClick={handleLink3Click}
                  className="outline-none focus:outline-none px-3 py-1 rounded-md flex items-center  text-white"
                >
                  <span className="pr-1 font-semibold flex-0">Link 3</span>
                  <span>
                    <svg
                      className={`fill-current h-4 w-4 transform ${
                        showLink3 ? "rotate-180" : ""
                      } transition duration-150 ease-in-out`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                </button>

                <ul
                  className={`${
                    showLink3 ? "flex" : "hidden"
                  } flex-col bg-white text-black border rounded-md absolute top-0 left-full ml-2 z-30`}
                >
                  <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                    Option 1
                  </li>
                  <li className="relative group px-4 py-1 hover:bg-gray-100 cursor-pointer whitespace-nowrap">
                    Sub-option
                  </li>
                  <li className="rounded-md px-4 py-1 hover:bg-gray-100 whitespace-nowrap">
                    Option 2
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </aside>
      </div>

      {/* Contenido principal */}
    </div>
  );
};

export default Navbar;
