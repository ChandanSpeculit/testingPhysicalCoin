import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { API_GATEWAY_URL } from "../config/env-vars";
import { IoLocationOutline, IoLocationSharp, IoMailOutline } from "react-icons/io5";
import { FaPhone, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { Helmet } from "react-helmet";
import DocumentMeta from "react-document-meta";
import Navbar from "../components/Navbar";



const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target; // Using e.target to get name and value
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Preparing the data in the required format
    const dataToSubmit = {
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    };

    try {
      const response = await fetch(
        `${API_GATEWAY_URL}contactusForm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSubmit), // Make sure to stringify the data
        }
      );

      if (!response.ok) throw new Error("Network response was not ok.");

      alert("Message sent successfully!");
      location.reload();
      // Optionally reset the form here
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      alert("Failed to send message.");
    }
  };
  const meta = {
    title: "Contact Us | FiYDAA",
    description: 'Have questions or need to report an issue with FiYDAA? Contact Us. Get support.',
    canonical: 'https://fiydaa.in/About',
    meta: {
      charset: 'utf-8',
      name: {
        keywords: 'contact us,connect,digitalgold,mutualfund'
      }
    }
  }

  // <DocumentMeta {...meta}>
  {/* <Helmet>
        <title>Contact Us | FiYDAA</title>
        <meta property="og:title" content="Contact Us | FiYDAA" />
        <meta name="description" content="Have questions or need to report an issue with FiYDAA? Contact Us. Get support." />
      </Helmet> */}



  // </DocumentMeta>

  function updateMetaTags() {

    const titleElement = document.querySelector("title");
    const metaTitleElement = document.querySelector('meta[name="title"]');
    const descriptionElement = document.querySelector('meta[name="description"]');

    let title = "Contact Us - Fiydaa";
    let description = "Get in touch with Fiydaa";


    titleElement.textContent = title;
    metaTitleElement.setAttribute("content", title);
    descriptionElement.setAttribute("content", description);
  }

  useEffect(() => {
    updateMetaTags();
  })

  return (


    <>
    <Navbar/>
      <h1 className="sm:mx-20  p-6  text-3xl lg:text-5xl leading-10 font-bold">Contact Us</h1>
      <div className="flex flex-col md:flex-row sm:mx-20 sm:my-10">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 p-6 flex flex-col gap-12"
        >

          <p className="text-3xl lg:text-5xl leading-10  font-bold">We'd love to hear from you</p>
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-md font-medium">Your Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-2 mt-1 border rounded-md focus:border-darkBlue hover:border-darkBlue focus:outline-none"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-md font-medium">Email Id</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 mt-1 border rounded-md focus:border-darkBlue hover:border-darkBlue focus:outline-none"
                placeholder="Example@Email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-md font-medium">Message</label>
              <textarea
                name="message"
                className="w-full p-2 mt-1 border rounded-md focus:border-darkBlue hover:border-darkBlue focus:outline-none"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="w-1/3 px-4 py-2 text-white bg-darkBlue rounded-lg hover:scale-110"
          >
            Submit
          </button>
        </form>
        <div className="w-full md:w-1/2 p-6 ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.1336736605776!2d77.0861648749521!3d28.505625689833316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d199e15c24a77%3A0xea26e07a91d25663!2sWeWork%20Vi%20John!5e0!3m2!1sen!2sin!4v1718260264698!5m2!1sen!2sin"
            className="w-full h-96 border-0  rounded-xl"
            allowFullScreen={false}
            loading="eager"

          ></iframe>


          <div className="my-10  sm:my-5 flex flex-col gap-5">

            <div className="flex  items-center gap-5">
              <a
                href="https://maps.app.goo.gl/z3DNbivXwp5ZEEzY9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex  items-center gap-5  hover:underline"
              >
                <div className="size-10 flex justify-center items-center" >
                  <IoLocationOutline className="size-10  " />
                </div>
                <p className=" text-base sm:text-md ">Vi-John Tower, 393, Udyog Vihar Phase 3 Rd, Phase II, Udyog Vihar, Sector 20, Gurugram, Haryana 122016</p>
              </a>
            </div>

            <div className="flex items-center gap-5">
              <a href="mailto:chat@fiydaa.in" className="flex items-center gap-5   hover:underline">
                <div className=" size-10  flex justify-center items-center">
                  <IoMailOutline className="size-8" />

                </div>

                <p className="text-md ">support@fiydaa.in</p>
              </a>
            </div>

            {/* <div className="flex items-center gap-5">
              <a href="tel:+919053037500" className="flex items-center gap-5   hover:underline">
                <div className="size-10  flex justify-center items-center">
                  <FiPhone className="size-8" />

                </div>
                <p className="text-md">+91-9053037500</p>
              </a>
            </div> */}

          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ContactUs;