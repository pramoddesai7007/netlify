
'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

const GroupMenu = () => {
  const [mainCategories, setMainCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAddMenus, setSelectedAddMenus] = useState([]);
  const [menuSearchQuery, setMenuSearchQuery] = useState("");
  

  // Fetch all menus
  const fetchAllMenus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/menu/menus/list"
      );
      setMenus(response.data);
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  };

  useEffect(() => {
    fetchAllMenus();
  }, []);

  const handleAddMenuCheckboxChange = (menuId) => {
    const isSelected = selectedAddMenus.includes(menuId);

    if (isSelected) {
      setSelectedAddMenus((prevMenus) =>
        prevMenus.filter((menu) => menu !== menuId)
      );
    } else {
      setSelectedAddMenus((prevMenus) => [...prevMenus, menuId]);
    }
  };

  const setErrorWithDuration = (errorMessage, duration) => {
    setError(errorMessage);

    // Clear the error message after the specified duration (in milliseconds)
    setTimeout(() => {
      clearError();
    }, duration);
  };

  const clearError = () => {
    setError(null);
  };
  const handleAddMenusToCategory = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `http://localhost:5000/api/menu/${selectedMainCategory}/assignmenus`,
        {
          menuIds: selectedAddMenus,
        }
      );

      console.log("Menus added successfully:", response.data);

      // Fetch the updated menus for the selected category
      await fetchMenusForCategory();

      setSelectedAddMenus([]);
      setLoading(false);
    } catch (error) {
      console.error("Error adding menus:", error);
      setErrorWithDuration("Menus are already added.", 2000); // Set error with duration
      setLoading(false);
    }
  };
  // const handleAddMenusToCategory = async () => {
  //   try {
  //     setLoading(true);

  //     const response = await axios.post(
  //       `http://localhost:5000/api/menu/${selectedMainCategory}/assignmenus`,
  //       {
  //         menuIds: selectedAddMenus,
  //       }
  //     );

  //     console.log("Menus added successfully:", response.data);

  //     // Fetch the updated menus for the selected category
  //     await fetchMenusForCategory();

  //     setSelectedAddMenus([]);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error adding menus:", error);
  //     setError("Error adding menus");
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const mainCategoriesResponse = await axios.get(
          "http://localhost:5000/api/main"
        );
        setMainCategories(mainCategoriesResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data from the server");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchMenusForCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/main/${selectedMainCategory}`
      );
      const mainCategory = response.data;

      if (!mainCategory) {
        console.error("Main category not found");
        return;
      }

      setFilteredMenus(mainCategory.menus || []);
    } catch (error) {
      console.error("Error fetching menus for the selected category:", error);
    }
  };

  useEffect(() => {
    if (selectedMainCategory) {
      fetchMenusForCategory();
    }
  }, [selectedMainCategory]);

  const handleMenuCheckboxChange = (menuId) => {
    const isSelected = selectedMenus.includes(menuId);

    if (isSelected) {
      setSelectedMenus((prevMenus) =>
        prevMenus.filter((menu) => menu !== menuId)
      );
    } else {
      setSelectedMenus((prevMenus) => [...prevMenus, menuId]);
    }
  };

  const handleDeleteMenus = async () => {
    try {
      setLoading(true);

      const response = await axios.delete(
        `http://localhost:5000/api/menu/${selectedMainCategory}/removemenus`,
        {
          data: { menuIds: selectedMenus },
        }
      );

      console.log("Menus deletion successful:", response.data);

      // Fetch the updated menus for the selected category
      await fetchMenusForCategory();

      setSelectedMenus([]);
      setLoading(false);
    } catch (error) {
      console.error("Error deleting menus:", error);
      setError("Error deleting menus");
      setLoading(false);
    }
  };

  const router = useRouter();
  const home = () => {
    router.push("/dashboard");
  };

  const filteredMenusForAdd = menus.filter((menu) =>
    menu.name.toLowerCase().includes(menuSearchQuery.toLowerCase())
  );


  return (
    <>
      <Navbar />
      <div className="container text-lg font-sans font-semibold mx-auto p-5 w-full overflow-x-auto border-gray-300 border-1">
        <h1 className="text-xl">Menu Group</h1>
      </div>

      <div className="flex justify-end mb-3 -mt-16 container mx-auto p-5 w-full overflow-x-auto border-gray-300 border-2 shadow-md">
        <FontAwesomeIcon icon={faHouse} onClick={home} className='cursor-pointer text-xl' />
      </div>

      {/* <div className="flex justify-end mb-3 -mt-16 container mx-auto p-5 w-full overflow-x-auto border-gray-300 border-2 shadow-md">
        <FontAwesomeIcon
          icon={faHouse}
          onClick={home}
          className="cursor-pointer text-2xl"
        />
      </div> */}

      <div className="max-w-6xl mx-auto mt-2 p-4 rounded-md shadow-md flex bg-gray-100 font-sans">
        <div className="flex-1 pr-4">
          <div className="mb-4">
            <label
              htmlFor="mainCategory"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Select Main Category:
            </label>
            <select
              id="mainCategory"
              name="mainCategory"
              value={selectedMainCategory}
              onChange={(e) => setSelectedMainCategory(e.target.value)}
              className="mt-1 p-2 w-1/2 border text-sm bg-white rounded-xl focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="" disabled>
                Select Main Category
              </option>
              {mainCategories.map((mainCategory) => (
                <option key={mainCategory._id} value={mainCategory._id}>
                  {mainCategory.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 overflow-y-auto max-h-96">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Menus in Selected Category:
            </label>
            {loading ? (
              <p>Loading menus...</p>
            ) : (
              filteredMenus.map((menu) => (
                <div key={menu._id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`category-menu-${menu._id}`}
                    onChange={() => handleMenuCheckboxChange(menu._id)}
                    checked={selectedMenus.includes(menu._id)}
                    className="mr-2 checkbox text-sm mt-1"
                  />
                  <label className="text-gray-800 text-sm">{menu.name}</label>
                </div>
              ))
            )}
            {filteredMenus.length > 0 && (
              <button
                type="button"
                onClick={handleDeleteMenus}
                className="bg-red-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="cursor-pointer mr-2 text-sm"
                />
                Delete Selected Menus
              </button>
            )}
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="w-96 ml-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Menus to Add:
          </label>
          <div className="flex flex-wrap">
            <input
              type="text"
              placeholder="Search menus..."
              value={menuSearchQuery}
              onChange={(e) => setMenuSearchQuery(e.target.value)}
              className="w-full p-2 border mb-4 text-sm rounded-xl focus:outline-none focus:ring focus:border-blue-300"
            />
            {loading ? (
              <p>Loading menus...</p>
            ) : (
              filteredMenusForAdd.map((menu) => (
                <div key={menu._id} className="flex items-center mb-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/2">
                  <input
                    type="checkbox"
                    id={`add-menu-${menu._id}`}
                    onChange={() => handleAddMenuCheckboxChange(menu._id)}
                    checked={selectedAddMenus.includes(menu._id)}
                    className="mr-2 checkbox text-sm mt-1"
                  />
                  <label htmlFor={`add-menu-${menu._id}`} className="text-sm text-gray-800">
                    {menu.name}
                  </label>
                </div>
              ))
            )}
          </div>

          {menus.length > 0 && (
            <button
              type="button"
              onClick={handleAddMenusToCategory}
              className="bg-green-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
            >
              <FontAwesomeIcon icon={faCheck} className="cursor-pointer mr-2 text-sm" />
              Add Selected Menus
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default GroupMenu;