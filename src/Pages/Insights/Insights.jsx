import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
function Insights() {
  const links = [
    { text: "Daily Reports", to: "/Insights/DailyReports" },
    { text: "Weekly Blogs", to: "/Insights/WeeklyBlog" },
    { text: "Knowledge Series", to: "/Insights/KnowledgeSeries" },
    { text: "News and Updates", to: "/Insights/NewsandUpdate" },
    { text: "Media", to: "/Insights/Media" },
  ];

  function updateMetaTags() {

    const titleElement = document.querySelector("title");
    const metaTitleElement = document.querySelector('meta[name="title"]');
    const descriptionElement = document.querySelector('meta[name="description"]');

    let title = "FiYDAA Insights | Latest News and Updates from FiYDAA";
    let description = "Top news and updates from the world of gold investments and stock market for first-time and experienced investors";


    titleElement.textContent = title;
    metaTitleElement.setAttribute("content", title);
    descriptionElement.setAttribute("content", description);
  }

  useEffect(() => {
    updateMetaTags();
  })

  return (
    <>
      <Navbar />

      <div className="flex justify-center w-full  min-h-[800px]">
        <div className="w-11/12 border-none sm:w-full">
          <div className="flex justify-center mt-5 text-3xl text-black font-bold font-[Gilroy]">
            <h3 className="font-outfit font-poppins">INSIGHTS</h3>
          </div>

          <div className="lg:flex lg:flex-row md:flex md:flex-row justify-center text-center font-bold my-4 sm:flex-row  sm:items-center">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "m-2 sm:block text-2xl text-[#05226b]"
                    : "hover:scale-110 m-2 sm:block text-black"
                }
              >
                <button className="font-outfit text-center m-10 mb-2 sm:block font-poppins">
                  {link.text}
                </button>
              </NavLink>
            ))}
          </div>

          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />

    </>
  );
}

export default Insights;