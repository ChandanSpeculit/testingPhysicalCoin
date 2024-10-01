import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
  faLinkedin,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import navbarLogo from "../assets/images/navbarlogo.png";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import playStoreButton from "../assets/images/Play Store.png";
import appStoreButton from "../assets/images/App Store.png"

function Footer() {
  const handleClick = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    let url;

    // Detect iOS
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      url = 'https://apps.apple.com/in/app/fiydaa-fintech-hub-by-speculit/id6475651556';
    }
    // Detect Android
    else if (/android/i.test(userAgent)) {
      url = 'https://play.google.com/store/apps/details?id=com.fiydaa&pcampaignid=web_share';
    }
    // Detect macOS
    else if (navigator.platform.toLowerCase().includes('mac')) {
      url = 'https://apps.apple.com/in/app/fiydaa-fintech-hub-by-speculit/id6475651556';
    }
    // Default to Play Store for other platforms (e.g., Windows)
    else {
      url = 'https://play.google.com/store/apps/details?id=com.fiydaa&pcampaignid=web_share';
    }

    window.open(url, '_blank');
  };

  return (
    <div className="bg-[#263238] text-white py-10">
      <div className=" px-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:pl-20 sm:items-center ">
        <div className="mb-4">
          <img
            src={navbarLogo}
            alt="Fiydaa Logo"
            className="w-1/2 sm:w-1/2 md:w-1/3 mb-2 mx-auto sm:mx-0"
          />
          <p className=" text-center md:text-left lg:text-left">
            Copyright © 2024 CWC
          </p>

          <p className="text-center md:text-left lg:text-left">
            All rights reserved
          </p>
          <p className="text-center md:text-left lg:text-left">
            1ST FLOOR, 945/3, Pachranga Bazar, Panipat, Haryana, 132103
          </p>

          <div className="flex space-x-4 mt-5 justify-center items-center sm:justify-start ">
            <Link
              to="https://www.facebook.com/share/sH8PDwhjNnz2UJvt/?mibextid=qi2Omg"
              target="_blank"
              rel="noopener noreferrer">
              <div
                className="bg-blue-600 p-2 rounded-full inline-flex items-center justify-center lg:justify-left lg:items-left"
                style={{ width: "40px", height: "40px" }}
              >

                <FontAwesomeIcon
                  icon={faFacebookF}
                  size="lg"
                  className="text-white"
                />
              </div>
            </Link>

            {/* <Link
              to="/twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="bg-gray-600 p-2 rounded-full inline-flex items-center justify-center"
                style={{ width: "40px", height: "40px" }}
              >

                <FontAwesomeIcon
                  icon={faTwitter}
                  size="lg"
                  className="text-white"
                />
              </div>
            </Link> */}

            <Link
              to="https://www.instagram.com/fiydaaofficial/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="bg-gray-600 p-2 rounded-full inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600"
                style={{ width: "40px", height: "40px" }}
              >

                <FontAwesomeIcon
                  icon={faInstagram}
                  size="lg"
                  className="text-white"
                />
              </div>
            </Link>

            <Link
              to="https://www.youtube.com/@thefiydaaexperience"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="bg-red-600 p-2 rounded-full inline-flex items-center justify-center"
                style={{ width: "40px", height: "40px" }}
              >

                <FontAwesomeIcon
                  icon={faYoutube}
                  size="lg"
                  className="text-white"
                />
              </div>
            </Link>

            <Link
              to="https://www.linkedin.com/company/fiydaa/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="bg-blue-400 p-2 rounded-full inline-flex items-center justify-center"
                style={{ width: "40px", height: "40px" }}
              >

                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  size="lg"
                  className="text-white"
                />
              </div>
            </Link>

          </div>
        </div>

        <div className=" flex gap-10 md:justify-start font-poppins">
          <div className=" ">
            <h5 className=" font-normal mb-2 text-left ">
              Company
            </h5>
            <ul className="list-none font-semibold">
              <li>
                <Link
                  to="/About"
                  className="block text-left  hover:text-blue-500"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/insights"
                  className="block text-left hover:text-blue-500"
                >
                  Insights
                </Link>
              </li>

              <li>
                <Link
                  to="/feature/Learn-Finance"
                  className="block text-left  hover:text-blue-500"
                >
                  Fiydaa Edu
                </Link>
              </li>
              <li>
                <Link
                  to="/terms_condition"
                  className="block text-left  hover:text-blue-500"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/Privacy-Policy"
                  // target="_blank"
                  className="block text-left  hover:text-blue-500"
                >
                  Privacy Policy
                </Link>
              </li>
              {/* <li>
              <Link
                to="/pricing"
                className="block text-center md:text-left lg:text-left hover:text-blue-500"
              >
                Pricing
              </Link>
            </li> */}
              {/* <li>
              <Link
                to="/testimonials"
                className="block text-center md:text-left lg:text-left hover:text-blue-500"
              >
                Testimonials
              </Link>
            </li> */}
            </ul>
          </div>

          <div className="md:text-left font-poppins">
            <h5 className="font-normal mb-2">
              Features
            </h5>
            <ul className="list-none font-semibold">
              <li>
                <Link
                  to="/feature/Digital-Gold"
                  className="block   hover:text-blue-500"
                >
                  Digital Gold
                </Link>
              </li>



              <li>
                <Link
                  to="/feature/Systematic-Investment-Plan"
                  className="block   hover:text-blue-500"
                >
                  High Returns SIP
                </Link>
              </li>
              <li>
                <Link
                  to="feature/Credit-Score"
                  className="block   hover:text-blue-500"
                >
                  Credit Score
                </Link>
              </li>
              <li>
                <div className="relative xl:block md:block hidden ">

                  <div className="absolute mt-1 -right-14 transform translate-x-1/4 -translate-y-1/4 z-50" >
                    <span className="py-0 px-1 rounded-full text-black bg-[#FFDC5C] text-xs font-poppins">Coming Soon</span>
                  </div>
                  <Link
                    to="/feature/Mutual-Funds"
                    className="block   hover:text-blue-500 font-poppins"
                  >
                    Mutual Funds
                  </Link>
                </div>

              </li>
              <li>
                <div className="relative xl:block md:block hidden ">

                  <div className="absolute mt-1 -right-14 transform translate-x-1/4 -translate-y-1/4 z-50" >
                    <span className="py-0 px-1 rounded-full text-black bg-[#FFDC5C] text-xs font-poppins">Coming Soon</span>
                  </div>
                  <Link
                    to="/feature/Virtual-Asset"
                    className="block  hover:text-blue-500"
                  >
                    Virtual Assets
                  </Link>
                </div>

              </li>
            </ul>
          </div>
        </div>


        <div className="flex gap-5 justify-center sm:justify-start">
          <a
            href="https://play.google.com/store/apps/details?id=com.fiydaa&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
            id='PlayStoreButton'

          >
            <img
              src={playStoreButton}
              alt="Play Store"
              className="h-12 sm:h-16"
            />
          </a>
          <a
            href="https://apps.apple.com/in/app/fiydaa-fintech-hub-by-speculit/id6475651556"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
            id='AppleStoreButton'

          >
            <img
              src={appStoreButton}
              alt="App Store"
              className="h-12 sm:h-16"
            />
          </a>
        </div>


        {/* <div className="">
          <p className="font-bold mb-2 text-center md:text-left lg:text-left">
            Stay Up to Date
          </p>

          <div className="relative min-w-[200px] ">
            <input
              type="text"
              placeholder="Your email address"
              className="pl-4 pr-10 py-2 rounded bg-[#D9D9D9] text-black w-full"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <FontAwesomeIcon
                icon={faPaperPlane}
                size="lg"
                className="text-[#263238] cursor-pointer"
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Footer;
