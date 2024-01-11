'use client'
import { faLayerGroup, faObjectGroup, faBellConcierge, faListUl, faTableCellsLarge, faTableList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";


const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div>
        <section className="text-gray-600 body-font m-5 p-5 justify-center mt-36 font-sans">
          
          <div className="container px-5 py-20 mx-auto">

            <div className="flex flex-wrap -m-4">
              <div className="lg:w-1/6 md:w-1/2 p-4 w-full">
                <Link href="/section">
                  <div className="relative h-32 rounded overflow-hidden shadow-md bg-gray-100 flex flex-col items-center justify-center text-center">
                    <div className=" rounded-full bg-blue-300 p-4"> <FontAwesomeIcon icon={faLayerGroup} size="2xl" color="blue" /></div>
                    <div className="mt-4">
                      <h3 className="text-gray font-semibold mb-1">Sections</h3>
                    </div>
                  </div>
                </Link>
              </div>


              <div className="lg:w-1/6 md:w-1/2 p-4 w-full">
                <Link href="/tables">
                  <div className="relative h-32 rounded overflow-hidden shadow-md bg-gray-100 flex flex-col items-center justify-center text-center">
                    <div className=" rounded-full bg-blue-300 p-4"> <FontAwesomeIcon icon={faTableCellsLarge} size="2xl" color="blue" /></div>
                    <div className="mt-4">
                      <h3 className="text-gray font-semibold mb-1">Tables</h3>
                    </div>
                  </div>
                </Link>
              </div>



              <div className="lg:w-1/6 md:w-1/2 p-4 w-full">
                <Link href="/main">
                  <div className="relative h-32 rounded overflow-hidden shadow-md bg-gray-100 flex flex-col items-center justify-center text-center">
                    <div className=" rounded-full bg-blue-300 p-4"> <FontAwesomeIcon icon={faTableList} size="2xl" color="blue" /></div>
                    <div className="mt-4">
                      <h3 className="text-gray font-semibold mb-1"> Main Menu </h3>
                    </div>
                  </div>
                </Link>
              </div>



              <div className="lg:w-1/6 md:w-1/2 p-4 w-full">
                <Link href="/menu">
                  <div className="relative h-32 rounded overflow-hidden shadow-md bg-gray-100 flex flex-col items-center justify-center text-center">
                    <div className=" rounded-full bg-blue-300 p-4"> <FontAwesomeIcon icon={faListUl} size="2xl" color="blue" /></div>
                    <div className="mt-4">
                      <h3 className="text-gray font-semibold mb-1">Menu List</h3>
                    </div>
                  </div>
                </Link>
              </div>


              <div className="lg:w-1/6 md:w-1/2 p-4 w-full">
                <Link href="/group">
                  <div className="relative h-32 rounded overflow-hidden shadow-md bg-gray-100 flex flex-col items-center justify-center text-center">
                    <div className=" rounded-full bg-blue-300 p-4"> <FontAwesomeIcon icon={faObjectGroup} size="2xl" color="blue" /></div>
                    <div className="mt-4">
                      <h3 className="text-gray font-semibold mb-1">Group Menu</h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="lg:w-1/6 md:w-1/2 p-4 w-full">
                <Link href="/bill">
                  <div className="relative h-32 rounded overflow-hidden shadow-md bg-gray-100 flex flex-col items-center justify-center text-center">
                    <div className=" rounded-full bg-blue-300 p-4"> <FontAwesomeIcon icon={faBellConcierge} size="2xl" color="blue" /></div>
                    <div className="mt-4">
                      <h3 className="text-gray font-semibold mb-1">Order</h3>
                    </div>
                  </div>
                </Link>
              </div>
              
              <div className="lg:w-1/6 md:w-1/2 p-4 w-full">
                <Link href="/bill">
                  <div className="relative h-32 rounded overflow-hidden shadow-md bg-gray-100 flex flex-col items-center justify-center text-center">
                    <div className=" rounded-full bg-blue-300 p-4"> <FontAwesomeIcon icon={faBellConcierge} size="2xl" color="blue" /></div>
                    <div className="mt-4">
                      <h3 className="text-gray font-semibold mb-1">Order</h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="lg:w-1/6 md:w-1/2 p-4 w-full">
                <Link href="/bill">
                  <div className="relative h-32 rounded overflow-hidden shadow-md bg-gray-100 flex flex-col items-center justify-center text-center">
                    <div className=" rounded-full bg-blue-300 p-4"> <FontAwesomeIcon icon={faBellConcierge} size="2xl" color="blue" /></div>
                    <div className="mt-4">
                      <h3 className="text-gray font-semibold mb-1">Order</h3>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="lg:w-1/6 md:w-1/2 p-4 w-full">
                <Link href="/bill">
                  <div className="relative h-32 rounded overflow-hidden shadow-md bg-gray-100 flex flex-col items-center justify-center text-center">
                    <div className=" rounded-full bg-blue-300 p-4"> <FontAwesomeIcon icon={faBellConcierge} size="2xl" color="blue" /></div>
                    <div className="mt-4">
                      <h3 className="text-gray font-semibold mb-1">Order</h3>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="lg:w-1/6 md:w-1/2 p-4 w-full">
                <Link href="/bill">
                  <div className="relative h-32 rounded overflow-hidden shadow-md bg-gray-100 flex flex-col items-center justify-center text-center">
                    <div className=" rounded-full bg-blue-300 p-4"> <FontAwesomeIcon icon={faBellConcierge} size="2xl" color="blue" /></div>
                    <div className="mt-4">
                      <h3 className="text-gray font-semibold mb-1">Order</h3>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="lg:w-1/6 md:w-1/2 p-4 w-full">
                <Link href="/bill">
                  <div className="relative h-32 rounded overflow-hidden shadow-md bg-gray-100 flex flex-col items-center justify-center text-center">
                    <div className=" rounded-full bg-blue-300 p-4"> <FontAwesomeIcon icon={faBellConcierge} size="2xl" color="blue" /></div>
                    <div className="mt-4">
                      <h3 className="text-gray font-semibold mb-1">Order</h3>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="lg:w-1/6 md:w-1/2 p-4 w-full">
                <Link href="/bill">
                  <div className="relative h-32 rounded overflow-hidden shadow-md bg-gray-100 flex flex-col items-center justify-center text-center">
                    <div className=" rounded-full bg-blue-300 p-4"> <FontAwesomeIcon icon={faBellConcierge} size="2xl" color="blue" /></div>
                    <div className="mt-4">
                      <h3 className="text-gray font-semibold mb-1">Order</h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard