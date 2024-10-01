import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { API_GATEWAY_URL } from "../../config/env-vars";
import { Helmet } from "react-helmet";

function KnowledgeSeries() {
  const [blogData, setBlogData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // Start with 3 visible reports

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3); // Load 3 more reports each time
  };

  useEffect(() => {
    fetch(`${API_GATEWAY_URL}augmontInsights`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBlogData(data.body); // Assuming data is an array of blog posts
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Filter data for the "Daily Report" category
  const dailyReportData = blogData.filter(
    (item) => item.category === "Knowledge Series"
  );


  function updateMetaTags() {

    const titleElement = document.querySelector("title");
    const metaTitleElement = document.querySelector('meta[name="title"]');
    const descriptionElement = document.querySelector('meta[name="description"]');

    let title = "FiYDAA Insights | Latest Knowledge Series from FiYDAA";
    let description = "Top knowledge series from the world of gold investments and stock market for first-time and experienced investors";


    titleElement.textContent = title;
    metaTitleElement.setAttribute("content", title);
    descriptionElement.setAttribute("content", description);
  }

  useEffect(() => {
    updateMetaTags();
  })

  return (
    <>
      <section className="relative">
        <div className="px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {dailyReportData.slice(0, visibleCount).map((report, index) => {
              const dateString = report.date;
              const date = new Date(dateString.split("T")[0]);
              const options = { year: "numeric", month: "long", day: "numeric" };
              const formattedDate = date.toLocaleDateString("en-US", options);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div
                    key={index}
                    className="bg-[#F2F3F5] flex flex-col h-[450px] overflow-hidden w-5/6 justify-center mb-20 ml-10 shadow-lg"
                  >
                    <img
                      className="w-full object-cover"
                      src={report.image_url}
                      alt="Content"
                      style={{ height: "200px" }} // Fixed height for the image
                    />
                    <div className="p-4 flex flex-col justify-between flex-grow overflow-y-auto">
                      <div>
                        <h1 className="font-outfit font-bold text-lg lg:text-xl mb-2">
                          {report.title}
                        </h1>
                        <p className="text-gray-500  font-outfit text-sm mb-4">
                          {report.content.split(" ").length > 30
                            ? `${report.content
                              .split(" ")
                              .slice(0, 30)
                              .join(" ")}...`
                            : report.content}
                        </p>
                      </div>
                      <div className="mt-auto">
                        <div className="flex justify-between items-center">
                          <span className="font-outfit text-gray-500 text-sm ">
                            {formattedDate}
                          </span>

                          <Link
                            to={report.read_more_link}
                            target='_blank'
                            className="font-outfit text-black cursor-pointer font-bold"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {visibleCount < dailyReportData.length && (
            <div className="text-right pr-10 py-4">
              <button onClick={loadMore} class="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group mb-10">
                <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#05226b] rounded-full group-hover:w-56 group-hover:h-56"></span>
                <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                <span class="relative font-poppins">Load More</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default KnowledgeSeries;
