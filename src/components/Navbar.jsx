import { useState, useEffect, useRef } from "react";
import { BellIcon, } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import FiydaaLogo from "../assets/images/navlogo.png";
import { IoArrowBackSharp } from "react-icons/io5";
import { RiArrowDropDownLine, RiArrowDropUpLine, RiCloseLine, RiMenuLine } from "react-icons/ri";
import Modal from "react-modal";
import Qrcode from "../assets/images/qrCodes.png"
Modal.setAppElement("#root");
import Swal from 'sweetalert2'
import "../Pages/Popup/Popup.css";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuOpen2, setMenuOpen2] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Modal visibility state

  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  // console.log(userInfo["custom:uniqueId"])

  const closeAllModals = () => {
    setMenuOpen(false);

  };
  const toggleMenu = () => {
    closeAllModals();
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    closeAllModals();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);

  const dropdownRef = useRef(null);
  const dropdownRef1 = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleDropdown1 = () => setDropdownOpen1(!dropdownOpen1);


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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsappNumber: '',
    state: '',
    city: '',
    incomeSlab: ''
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "whatsappNumber" && value.length > 10) {
      return;
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const sendData = {
      get_or_update: "update",
      formData: formData
    };

    console.log("Sending data:", sendData);
    try {
      const response = await fetch(`https://0qbd8w1lbj.execute-api.ap-south-1.amazonaws.com/dev/saveUserDetailsInDb`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("Response from backend:", data);

      if (data.statusCode === 200) {
        setModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "<span style='color: #4caf50; font-family: Montserrat, sans-serif;'>Congratulations!</span>",
          html: "<span style='font-weight: bold;'>You Are Now On The Exclusive Waitlist For Our App!</span>",
          customClass: {
            popup: 'my-popup'
          }
        });
      } else if (data.statusCode === 201) {
        setModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "<span style='color: #4caf50; font-family: Montserrat, sans-serif;'>Appreciate It!</span>",
          html: "<span style='font-weight: bold;'>You Are Already On The Waitlist!</span>",
          customClass: {
            popup: 'my-popup'
          }
        });
      }
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  const [bannerVisible, setBannerVisible] = useState(true);

  // Check local storage on component mount
  useEffect(() => {
    const isBannerClosed = localStorage.getItem('bannerClosed');
    if (isBannerClosed) {
      setBannerVisible(true);
      // setBannerVisible(false);

    }
  }, []);

  // Handle banner close
  const handleCloseBanner = () => {
    setBannerVisible(false);
    localStorage.setItem('bannerClosed', 'true');
  };





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

    <>
      {bannerVisible && (
        <div className="bg-[#05226b]">
          <div className="max-w-screen-xl mx-auto px-4 py-3 items-center gap-x-4 justify-center text-white sm:flex md:px-8">
            <p className="py-2 font-medium text-xl font-poppins">
              Download the app now and get worth of <span className="text-[#FFDC5C]"> ₹ 100</span> Digital gold free
            </p>
            <button id="DownloadNow" onClick={handleClick} className="font-poppins flex-none inline-block w-full mt-3 py-2 px-3 text-center text-indigo-600 font-medium bg-white duration-150 hover:bg-gray-100 active:bg-gray-200 rounded-lg sm:w-auto sm:mt-0 sm:text-sm">
              Download Now
            </button>

            <button
              onClick={handleCloseBanner}
              style={{ position: 'absolute', top: 10, right: 10, background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem' }}
            >
              &times;
            </button>
          </div>
        </div>
      )}


      <nav className="flex items-center justify-between px-4 py-8 ">

        <div className="sm:hidden">
          <button onClick={toggleMenu} className="text-darkBlue">
            {menuOpen ? <RiCloseLine className="h-6 w-6" /> : <RiMenuLine className="h-6 w-6" />}
          </button>
        </div>
        <Link to="/" onClick={handleLinkClick} className=" sm:ml-0">
          <img
            className="h-12 w-auto"
            src={FiydaaLogo}
            alt="Fiydaa Logo"
          />
        </Link>

        <div className="flex items-center md:gap-12">
          <Link
            to="/feature/Digital-Gold"
            className="hidden sm:block font-Poppins font-semibold hover:scale-110 hover:text-darkBlue text-lg"
          >
            Digital Gold
          </Link>
          <Link
            to="feature/Micro-Investing"
            className="hidden sm:block font-Poppins font-semibold hover:scale-110 hover:text-darkBlue text-lg"
          >
            Micro Investing
          </Link>

          <div className="relative hidden xl:block" ref={dropdownRef1}>
            <button onClick={toggleDropdown1} className="flex items-center font-Poppins font-semibold hover:scale-110 hover:text-darkBlue text-lg">
              <span >Features</span>
              <RiArrowDropDownLine className="size-6" />


            </button>

            {dropdownOpen1 && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-darkBlue rounded-md shadow-lg z-10">
                <Link
                  to="/feature/Mutual-Funds"
                  onClick={toggleDropdown1}
                  className="block px-4 py-2 text-darkBlue hover:bg-darkBlue hover:text-white font-poppins"
                >
                  Mutual Funds
                </Link>
                <Link
                  to="/feature/Virtual-Asset"
                  onClick={toggleDropdown1}
                  className="block px-4 py-2 text-darkBlue hover:bg-darkBlue hover:text-white font-poppins"
                >
                  Virtual Asset
                </Link>
                <Link
                  to="/feature/Credit-Score"
                  onClick={toggleDropdown1}
                  className="block px-4 py-2 text-darkBlue hover:bg-darkBlue hover:text-white font-poppins"
                >
                  Credit Score
                </Link>
                <Link
                  to="/feature/Systematic-Investment-Plan"
                  onClick={toggleDropdown1}
                  className="block px-4 py-2 text-darkBlue hover:bg-darkBlue hover:text-white font-poppins"
                >
                  SIP
                </Link>
              </div>
            )}
          </div>

          <div className="relative hidden xl:block" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="flex items-center font-Poppins font-semibold hover:scale-110 hover:text-darkBlue text-lg">
              <span >Resources</span>
              <RiArrowDropDownLine className="size-6" />


            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-darkBlue rounded-md shadow-lg z-10">
                <Link
                  to="/Blogs"
                  onClick={toggleDropdown}
                  className="block px-4 py-2 text-darkBlue hover:bg-darkBlue hover:text-white font-poppins"
                >
                  Fiydaa Blogs
                </Link>
                <Link
                  to="/Insights/DailyReports"
                  onClick={toggleDropdown}
                  className="block px-4 py-2 text-darkBlue hover:bg-darkBlue hover:text-white font-poppins"
                >
                  Insights
                </Link>
                <Link
                  to="/About"
                  onClick={toggleDropdown}
                  className="block px-4 py-2 text-darkBlue hover:bg-darkBlue hover:text-white font-poppins"
                >
                  About US
                </Link>
                <Link
                  to="/Privacy-Policy"
                  onClick={toggleDropdown}
                  className="block px-4 py-2 text-darkBlue hover:bg-darkBlue hover:text-white font-poppins"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms_condition"
                  onClick={toggleDropdown}
                  className="block px-4 py-2 text-darkBlue hover:bg-darkBlue hover:text-white font-poppins"
                >
                  Terms & Condition
                </Link>
                <Link
                  to="/Contact"
                  onClick={toggleDropdown}
                  className="block px-4 py-2 text-darkBlue hover:bg-darkBlue hover:text-white font-poppins"
                >
                  Contact US
                </Link>
              </div>
            )}
          </div>


          {/* <Link to="/Sip-Calculator" class="px-3 py-2.5 relative rounded group overflow-hidden font-medium  text-blue-900 inline-block">
            <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-[#05226b] group-hover:h-full opacity-90"></span>
            <span class="relative group-hover:text-white">SIP Calculator</span>
          </Link> */}


          <Link to="/Sip-Calculator" class="px-3 py-2 mx-auto text-white bg-blue-900 rounded-full hover:bg-blue-900 md:mx-0 hidden xl:block lg:block">
            SIP Calculator
          </Link>

          {userInfo && (
            <div className="hidden xl:block hover:scale-110 duration-500 hover:duration-500">
              <Link
                // to="/AllProduct"
                // id="GetStartedButton"
                className="px-4 py-2 text-lg text-darkBlue font-medium border border-darkBlue rounded-4xl hover:bg-darkBlue hover:text-white"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Logout
              </Link>
            </div>
          )}

          {userInfo && (
            <div className="hidden xl:block hover:scale-110 duration-500 hover:duration-500">
              <Link
                to="/myOrders"
                // id="GetStartedButton"
                className="px-4 py-2 text-lg text-darkBlue font-medium border border-darkBlue rounded-4xl hover:bg-darkBlue hover:text-white"
              >
                My Orders
              </Link>
            </div>
          )}

          {/* <div className="relative xl:block md:block hidden ">

            <div className="absolute -top-6 -right-9 transform translate-x-1/4 -translate-y-1/4 z-50" >
              <span className="py-1 px-1 rounded-full text-black bg-[#FFDC5C] text-xs font-poppins">Premium</span>
            </div>
            <Link to="/GoldLeasing" class="relative px-5 py-2 font-medium text-white group font-poppins">
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-blue-500 group-hover:bg-blue-700 group-hover:skew-x-12"></span>
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-blue-900 group-hover:bg-blue-900 group-hover:-skew-x-12"></span>
              <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-blue-900 -rotate-12"></span>
              <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-blue-900 -rotate-12"></span>
              <span class="relative">Fiydaa X</span>
            </Link>
          </div> */}
        </div>

        {/* <div className="hidden xl:block hover:scale-110 duration-500 hover:duration-500">
          <button id="GetStartedButton" onClick={handleClick} className="px-4 py-2 text-lg  text-darkBlue font-medium border border-darkBlue rounded-4xl hover:bg-darkBlue hover:text-white "
          >
            Get Started
          </button>
        </div> */}

        {!userInfo && <div className="hidden xl:block hover:scale-110 duration-500 hover:duration-500">
          <Link to="/login" id="GetStartedButton" className="px-4 py-2 text-lg  text-darkBlue font-medium border border-darkBlue rounded-4xl hover:bg-darkBlue hover:text-white "
          >
            login
          </Link>
        </div>
        }

        {userInfo && <div className="hidden xl:block hover:scale-110 duration-500 hover:duration-500">
          <Link to="/AllProduct" id="GetStartedButton" className="px-4 py-2 text-lg  text-darkBlue font-medium border border-darkBlue rounded-4xl hover:bg-darkBlue hover:text-white "
          >
            Get Started
          </Link>
        </div>
        }

        <div className="hidden md:block xl:hidden">
          <button onClick={() => { setMenuOpen2(!menuOpen2) }} className="text-darkBlue">
            {menuOpen2 ? <RiCloseLine className="h-6 w-6" /> : <RiMenuLine className="h-6 w-6" />}
          </button>
        </div>


      </nav >

      {menuOpen && (
        <div className=" w-full sm:hidden bg-white text-darkBlue font-semibold ">
          <Link to="/GoldLeasing" className="block px-4 py-2 hover:font-bold" onClick={toggleMenu}>Fiydaa X</Link>
          <Link to="/feature/Goal-based-Investing" className="block px-4 py-2 hover:font-bold font-poppins" onClick={toggleMenu}>Goal Oriented Investment</Link>
          <Link to="/feature/Digital-Gold" className="block px-4 py-2 hover:font-bold font-poppins" onClick={toggleMenu}>Digital Gold</Link>
          <Link to="/feature/Systematic-Investment-Plan" className="block px-4 py-2 hover:font-bold font-poppins" onClick={toggleMenu}>Gold SIP</Link>
          <Link to="/feature/Mutual-Funds" className="block px-4 py-2 hover:font-bold font-poppins" onClick={toggleMenu}>Mutual Funds</Link>
          <Link to="/feature/Virtual-Asset" className="block px-4 py-2 hover:font-bold font-poppins" onClick={toggleMenu}>Virtual Assets</Link>
          <Link to="/feature/Credit-Score" className="block px-4 py-2 hover:font-bold font-poppins" onClick={toggleMenu}>Credit Score</Link>
          <Link to="/Sip-Calculator" className="block px-4 py-2 hover:font-bold font-poppins" onClick={toggleMenu}>SIP Calculator</Link>
          <Link to="/Blogs" className="block px-4 py-2 hover:font-bold font-poppins" onClick={toggleMenu}>Blogs</Link>
          <Link to="/Insights" className="block px-4 py-2 hover:font-bold font-poppins" onClick={toggleMenu}>Insights</Link>
          <Link to="/About" className="block px-4 py-2 hover:font-bold font-poppins" onClick={toggleMenu}>About US</Link>

        </div>
      )
      }

      {menuOpen2 && (
        <div className=" w-full hidden md:block xl:hidden bg-white text-darkBlue font-semibold ">
          <Link to="/GoldLeasing" className="block px-4 py-2 hover:font-bold" onClick={toggleMenu}>Fiydaa X</Link>
          <Link to="/feature/Goal-based-Investing" className="block px-4 py-2 hover:font-bold font-poppins" onClick={toggleMenu}>Goal Oriented Investment</Link>
          <Link to="/feature/Digital-Gold" className="block px-4 py-2 hover:font-bold font-poppins" onClick={toggleMenu}>Digital Gold</Link>
          <Link to="/feature/Systematic-Investment-Plan" className="block px-4 py-2 hover:font-bold font-poppins" onClick={toggleMenu}>Gold SIP</Link>
          <Link to="/feature/Mutual-Funds" className="block px-4 py-2 hover:font-bold font-poppins" onClick={toggleMenu}>Mutual Funds</Link>
          <Link to="/feature/Virtual-Asset" className="block px-4 py-2 hover:font-bold font-poppins" onClick={toggleMenu}>Virtual Assets</Link>
          <Link to="/feature/Credit-Score" className="block px-4 py-2 hover:font-bold font-poppins" onClick={toggleMenu}>Credit Score</Link>
          <Link to="/Sip-Calculator" className="block px-4 py-2 hover:font-bold font-poppins" onClick={toggleMenu}>SIP Calculator</Link>
          <Link to="/Blogs" className="block px-4 py-2 hover:font-bold font-poppins" onClick={toggleMenu}>Blogs</Link>
          <Link to="/Insights" className="block px-4 py-2 hover:font-bold font-poppins" onClick={toggleMenu}>Insights</Link>
          <Link to="/About" className="block px-4 py-2 hover:font-bold font-poppins" onClick={toggleMenu}>About US</Link>




        </div>
      )
      }


      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#fff',
            borderRadius: '10px',
            maxWidth: '650px',
            padding: '20px',
            border: '1px solid #ddd',
          },
        }}
      >
        <button onClick={closeModal} style={{ position: 'absolute', top: '0px', right: '10px', background: 'transparent', border: 'none', fontSize: '2rem', fontWeight: 'bold', cursor: 'pointer', color: 'red' }}>
          &times;
        </button>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <img
            className="h-11 w-auto"
            src={FiydaaLogo}
            alt="Fiydaa Logo"
          />
          <Typography sx={{ fontFamily: "Poppins", fontSize: 17, fontWeight: 500, mt: 2 }}>
            Join our exclusive, invite only platform.
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 2,
              width: '100%',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  InputProps={{
                    sx: { fontFamily: 'Poppins' },
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: 'Poppins' },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  InputProps={{
                    sx: { fontFamily: 'Poppins' },
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: 'Poppins' },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="whatsappNumber"
                  name="whatsappNumber"
                  label="Whatsapp Number"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: '+91',
                    sx: { fontFamily: 'Poppins' },
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: 'Poppins' },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  name="state"
                  label="State"
                  value={formData.state}
                  onChange={handleChange}
                  InputProps={{
                    sx: { fontFamily: 'Poppins' },
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: 'Poppins' },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  name="city"
                  label="City"
                  value={formData.city}
                  onChange={handleChange}
                  InputProps={{
                    sx: { fontFamily: 'Poppins' },
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: 'Poppins' },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <FormControl fullWidth required>
                  <InputLabel id="income-slab-label" sx={{ fontFamily: "Poppins" }}>
                    Income Slab
                  </InputLabel>
                  <Select
                    labelId="income-slab-label"
                    id="incomeSlab"
                    name="incomeSlab"
                    value={formData.incomeSlab}
                    onChange={handleChange}
                    sx={{ fontFamily: "Poppins" }}
                  >
                    <MenuItem value={"Less than 2.5 Lakhs"}>Less than 2.5 Lakhs</MenuItem>
                    <MenuItem value={"2.5 to 5 Lakhs"}>2.5 to 5 Lakhs</MenuItem>
                    <MenuItem value={"5 to 10 Lakhs"}>5 to 10 Lakhs</MenuItem>
                    <MenuItem value={"10 to 20 Lakhs"}>10 to 20 Lakhs</MenuItem>
                    <MenuItem value={"More than 20 Lakhs"}>More than 20 Lakhs</MenuItem>
                  </Select>
                </FormControl> */}
                <FormControl fullWidth required>
                  <InputLabel id="income-slab-label" sx={{ fontFamily: "Poppins" }}>
                    Income Slab
                  </InputLabel>
                  <Select
                    labelId="income-slab-label"
                    id="incomeSlab"
                    name="incomeSlab"
                    label="Income Slab"
                    value={formData.incomeSlab}
                    onChange={handleChange}
                    sx={{ fontFamily: "Poppins" }}
                  >
                    <MenuItem value={"Less than 2.5 Lakhs"}>Less than 2.5 Lakhs</MenuItem>
                    <MenuItem value={"2.5 to 5 Lakhs"}>2.5 to 5 Lakhs</MenuItem>
                    <MenuItem value={"5 to 10 Lakhs"}>5 to 10 Lakhs</MenuItem>
                    <MenuItem value={"10 to 20 Lakhs"}>10 to 20 Lakhs</MenuItem>
                    <MenuItem value={"More than 20 Lakhs"}>More than 20 Lakhs</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: '#05226b',
                fontFamily: 'Poppins',
                fontWeight: 'bold',
              }}
            >
              Submit
            </Button>

            {/* <Typography sx={{ textAlign: 'center', mt: 2, fontFamily: 'Poppins' , opacity:'0.5'}}>
              ----------------------- OR ----------------------- 
            </Typography> */}
            <Typography sx={{ textAlign: 'center', mt: 2, fontFamily: 'Poppins', fontWeight: 'bold', opacity: '0.6' }}>
              Or
            </Typography>

            <img src={Qrcode} alt="qrode" style={{ marginTop: '20px', width: "95%", margin: 'auto' }} />
          </Box>
        </Box>
      </Modal>

    </>
  );
}