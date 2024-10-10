import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import FiydaaLogo from "../assets/images/navlogo.png";
import Modal from "react-modal";
Modal.setAppElement("#root");
import "../Pages/Popup/Popup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {


  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  // console.log(userInfo["custom:uniqueId"])


  const [state, setState] = useState(false)

  const [showBanner, setShowBanner] = useState(true);

  // Replace javascript:void(0) paths with your paths
  const navigation = [
    { title: "Features", path: "/" },
    { title: "About Us", path: "/About" },
    { title: "Insights", path: "/Insights" },
    // { title: "My Orders", path: "/myorders" }
  ]



  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);

  const dropdownRef = useRef(null);
  const dropdownRef1 = useRef(null);



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
        setDropdownOpen1(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const [bannerVisible, setBannerVisible] = useState(true);

  // Check local storage on component mount
  useEffect(() => {
    const isBannerClosed = localStorage.getItem('bannerClosed');
    if (isBannerClosed) {
      setBannerVisible(true);
    }
  }, []);



  return (

    <>



      {showBanner && <div className="bg-gradient-to-r from-newDarkGold via-newLightGold to-newDarkGold">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-start justify-between text-white sm:items-center md:px-8">
          <div className="flex-1 justify-center flex items-start gap-x-4 sm:items-center">
            <div className="flex-none p-1.5 px-4 rounded-full bg-newDarkBlue flex items-center justify-center font-medium text-sm">
              New
            </div>
            <p className="font-medium p-2 text-newDarkBlue">
              We just launched a new version of our website!

            </p>
          </div>
          <button onClick={() => { setShowBanner(false) }} className="p-2 rounded-lg duration-150  ring-offset-2 focus:ring">
            <FontAwesomeIcon icon={faXmark} className="text-newDarkBlue" />
          </button>
        </div>
      </div>}



      <nav className="bg-white border-b w-full md:static md:text-sm md:border-none">
        <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/">
              <img
                src={FiydaaLogo}
                width={120}
                height={50}
                alt="Fiydaa Logo"
              />
            </Link>
            <div className="md:hidden">
              <button className="text-gray-500 hover:text-gray-800"
                onClick={() => setState(!state)}
              >
                {
                  state ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  )
                }
              </button>
            </div>
          </div>
          <div className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
            <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              {
                navigation.map((item, idx) => {
                  return (
                    <li key={idx} className="text-gray-700 hover:text-indigo-600">
                      <Link to={item.path} className="block">
                        {item.title}
                      </Link>
                    </li>
                  )
                })
              }
              {userInfo &&
                <li>
                  <Link to="/myOrders" className="block py-3 px-4 font-medium text-center text-white bg-newDarkBlue hover:bg-newLightBlue rounded-lg shadow md:inline">
                    My Orders
                  </Link>
                </li>}
              <span className='hidden w-px h-6 bg-gray-300 md:block'></span>
              {!userInfo && <div className='space-y-3 items-center gap-x-6 md:flex md:space-y-0'>
                <li>
                  <Link to="/Login" className="block py-3 text-center text-gray-700 hover:text-newLightBlue border rounded-lg md:border-none">
                    Log in
                  </Link>
                </li>
                <li>
                  <Link to="/Signup" className="block py-3 px-4 font-medium text-center text-white bg-newDarkBlue hover:bg-newLightBlue rounded-lg shadow md:inline">
                    Sign up
                  </Link>
                </li>
              </div>
              }

              {userInfo && (
                <li>
                  <Link
                    onClick={() => {
                      localStorage.clear();  // Clear local storage to sign the user out
                      navigate("/");         // Navigate to the home page
                      window.location.reload();  // Reload the page to fully reset the state
                    }}
                    className="block py-3 px-4 font-medium text-center text-white bg-newDarkBlue hover:bg-newLightBlue rounded-lg shadow md:inline"
                  >
                    Sign out
                  </Link>
                </li>
              )}

            </ul>
          </div>
        </div>
      </nav>

    </>
  );
}