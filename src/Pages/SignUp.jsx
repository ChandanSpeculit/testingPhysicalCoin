import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import loginImage from "../assets/images/Login_Left_Image.png";
import logo from "../assets/images/logoWhite.png";
import { API_GATEWAY_URL } from "../config/env-vars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const stateData = [
    {
      id: "joXp8X42",
      name: "Andaman and Nicobar",
    },
    {
      id: "o59RxqAQ",
      name: "Andhra Pradesh",
    },
    {
      id: "KR9akqW1",
      name: "Arunachal Pradesh",
    },
    {
      id: "aBqv490L",
      name: "Assam",
    },
    {
      id: "Pa7zeqvV",
      name: "Bihar",
    },
    {
      id: "Kd9BkXpM",
      name: "Chandigarh",
    },
    {
      id: "1LqK87VP",
      name: "Chhattisgarh",
    },
    {
      id: "QD9xRq5g",
      name: "Dadra & Nagar Haveli",
    },
    {
      id: "vk9G5qM3",
      name: "Daman and Diu",
    },
    {
      id: "bv9Z17l0",
      name: "Delhi",
    },
    {
      id: "0VX6A9LZ",
      name: "Goa",
    },
    {
      id: "B1qVZqPG",
      name: "Gujarat",
    },
    {
      id: "eE72O9nm",
      name: "Haryana",
    },
    {
      id: "awXwn9lA",
      name: "Himachal Pradesh",
    },
    {
      id: "xEq3d7Lo",
      name: "Jammu and Kashmir",
    },
    {
      id: "Do7Wjq3d",
      name: "Jharkhand",
    },
    {
      id: "eyqMQqYd",
      name: "Karnataka",
    },
    {
      id: "62Xg57W0",
      name: "Kerala",
    },
    {
      id: "lk7J5qPr",
      name: "Ladakh",
    },
    {
      id: "gyqOP7mY",
      name: "Lakshadweep",
    },
    {
      id: "JyX5zqMW",
      name: "Madhya Pradesh",
    },
    {
      id: "ep9kJ7Px",
      name: "Maharashtra",
    },
    {
      id: "J271B9aj",
      name: "Manipur",
    },
    {
      id: "Be9AP72w",
      name: "Meghalaya",
    },
    {
      id: "ZVXe5Xov",
      name: "Mizoram",
    },
    {
      id: "BJXdYqYZ",
      name: "Nagaland",
    },
    {
      id: "AR7YPqDj",
      name: "Orissa",
    },
    {
      id: "LQ78NXmy",
      name: "Puducherry",
    },
    {
      id: "WV906qDv",
      name: "Punjab",
    },
    {
      id: "PJ7nDXlY",
      name: "Rajasthan",
    },
    {
      id: "YO9jE73B",
      name: "Sikkim",
    },
    {
      id: "mVqoM9DM",
      name: "Tamil Nadu",
    },
    {
      id: "zy94Vq4k",
      name: "Telangana",
    },
    {
      id: "1GXDR72L",
      name: "Tripura",
    },
    {
      id: "Q27L87bD",
      name: "Uttar Pradesh",
    },
    {
      id: "eN9bY7Do",
      name: "Uttarakhand",
    },
    {
      id: "wk9PrqnK",
      name: "West Bengal",
    },
  ];

  const LeftContainer = () => {
    return (
      <div className="w-2/5 hidden lg:flex lg:flex-col items-center justify-center bg-gradient-to-r from-newDarkGold via-newLightGold to-newDarkGold ">
        <h1 className="text-5xl text-newDarkBlue font-poppins font-semibold">Join Fiydaa</h1>
        <img src={loginImage} alt="Your Image" className="  w-64 h-auto  " />
      </div>
    );
  };


  const location = useLocation();
  const { redirectTo } = location.state || {};
  // console.log('Redirecting back to:', redirectTo);

  React.useEffect(() => {
    if (redirectTo) {
      // console.log('Redirecting back to:', redirectTo);
    }
  }, [redirectTo]);


  const RightContainer = () => {
    const navigate = useNavigate();
    const [selectedState, setSelectedState] = useState(""); // State for selected state
    const [mobileNumber, setMobileNumber] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [message, setMessage] = useState("");
    const [resendActive, setResendActive] = useState(false);
    const [timer, setTimer] = useState(30);
    const [loading, setLoading] = useState(false);

    const handleMobileNumberChange = (e) => {
      setMobileNumber(e.target.value);
    };

    const handleStateChange = (e) => {
      setSelectedState(e.target.value);
    };

    const handleOtpChange = (e) => {
      setOtp(e.target.value);
    };

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };

    const cleanedPhoneNumber = mobileNumber.startsWith("+91")
      ? mobileNumber.slice(3)
      : mobileNumber;

    const handleSignUp = async () => {
      setLoading(true);
      setTimer(30);
      const phoneNumberRegex = /^[0-9]{10}$/;
      if (!phoneNumberRegex.test(cleanedPhoneNumber)) {
        setMessage("Mobile Number");
        setLoading(false);
        return;
      }

      // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // if (!emailRegex.test(email.toLowerCase())) {
      //   setMessage("Email");

      //   return;
      // }

      if (selectedState === "") {
        setMessage("Selected State");
        setLoading(false);
        return;

      }
      if (!isChecked) {
        setMessage("Terms");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `${API_GATEWAY_URL}auth/passwordless_signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phoneNumber: "+91" + cleanedPhoneNumber,
              // email: email.toLowerCase(),
              selectedState: selectedState,
            }),
          }
        );

        const data = await response.json();
        console.log("parase", data);
        const parsedBody = JSON.parse(data.body);

        console.log("result", parsedBody);
        if (parsedBody.result) {
          setOtpSent(true);
        } else {
          alert("User already exist with this mobile number");
          if (
            parsedBody.message == 'User already exists' ||
            parsedBody.message == 'Email already exists'
          ) {
            navigate('/Login');
            alert(
              'Please Login User already exists with this Phone Number/Email Address',
            );


          } else if (parsedBody.message == 'Phone number not verified') {
            console.log('User phone number not verified');
            // const phnNumber = response.data.phone_number;
            try {
              const response = await fetch(
                `${API_GATEWAY_URL}auth/cogni_resendsignupotp`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: "+91" + cleanedPhoneNumber,
                  }),
                }
              );
            } catch (error) {
              console.error('Error signing up:', error);
            }
            alert('Account not verified , Please verify your account');

            setOtpSent(true);
          }

        }
      } catch (error) {
        console.error("Error signing up:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleVerify = async () => {
      const requestBody = {
        uniqueId: cleanedPhoneNumber,
        phone_number: "+91" + cleanedPhoneNumber, // Add user's phone number here
        consent_name: "Terms & Condition and Privacy Policy", // Assuming 'consentPolicy' is the name of the consent
        consent_status: "Yes", // 'Yes' or 'No' based on consentChecked
      };

      try {
        const response = fetch(
          `${API_GATEWAY_URL}save_concent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );
      } catch (error) {
        console.error("Error saving consent:", error.message);
        // Handle error scenarios
      }

      try {
        const response = await fetch(
          `${API_GATEWAY_URL}auth/passwordless_signOtpVerify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: "+91" + cleanedPhoneNumber,
              code: otp,
            }),
          }
        );

        const data = await response.json();

        let loginResponse = await data.body.token;
        let userd = await data.body.userdata;
        console.log(data);

        console.log(JSON.parse(data.body))
        let body = JSON.parse(data.body);


        console.log(body.result);
        console.log(body.message);
        // let result = JSON.parse(data)

        if (body.result === true) {
          console.log("success signup");
          await window.localStorage.setItem("userToken", body.token);
          await window.localStorage.setItem("userInfo", JSON.stringify(body.userdata));
          if (redirectTo) {
            navigate(redirectTo, { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        }
        // navigation.navigate("Home");
        else {
          alert(body.message);
        }
      } catch (error) {
        console.error("Error signing up:", error);
      }
    };

    const handleResend = async () => {
      setResendActive(false);
      setTimer(30);
      try {
        const response = await fetch(
          `${API_GATEWAY_URL}auth/cogni_resendsignupotp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: "+91" + cleanedPhoneNumber,
            }),
          }
        );

        const data = await response.json();
        console.log(data);

        if (data.result) {
          // alert(data.message);
        } else {
          // alert(data.message);
        }
      } catch (error) {
        console.error("Error signing up:", error);
      }
    };

    useEffect(() => {
      let intervalId;
      if (timer > 0 && !resendActive) {
        // Start the countdown timer if it's not active
        intervalId = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      } else if (timer === 0 && !resendActive) {
        // Activate the resend button after 30 seconds
        setResendActive(true);
      }

      // Clean up the interval
      return () => clearInterval(intervalId);
    }, [timer, resendActive]);

    return (
      <div className="bg-gradient-to-r from-newDarkBlue via-newLightBlue to-newDarkBlue  flex-1 flex flex-col pt-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg text-white ml-4"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className=""
          />
          Back
        </Link>
        <img src={logo} alt="logo" className="w-48 h-auto ml-4  sm:ml-16 my-12 sm:mt-16 sm:mb-12" />
        <h1 className="text-3xl sm:4xl lg:text-4xl leading-relaxed font-medium mb-4 text-newDarkGold ml-4 mr-2 sm:ml-16 sm:mr-24 font-poppins" >
          Sign up now to Start Investing
        </h1>
        <h2 className="text-sm font-regular font-poppins mb-10 text-newLightGold ml-4 mr-2 sm:ml-16">
          Welcome to Fiydaa family, Provide details to create your account
        </h2>

        {/* <div className="flex mb-4">
          <button className="flex-1 bg-darkBlue text-white px-4 py-2 rounded-md mr-4 cursor-default ">
            Sign Up
          </button>
          <Link
            to="/login"
            className="flex justify-center items-center flex-1 bg-white text-darkBlue px-4 py-2 rounded-md border border-darkBlue mr-4 hover:shadow-xl hover:ease-in-out duration-500  hover:bg-darkBlue hover:text-white hover:scale-105"
          >
            Login
          </Link>
        </div> */}

        {!otpSent && (
          <div className="mx-4 sm:ml-16 sm:mr-32">
            <label className="text-newDarkGold text-lg font-poppins ">
              Mobile Number *
            </label>
            <div className="w-full md:w-2/3 mt-2 mb-4 p-2 flex gap-3 md:gap-2  items-center border-2 border-newDarkGold rounded-xl">
              <p className="text-newDarkGold text-xl ">+91 |</p>
              <input
                type="text"
                placeholder="85788773880"
                value={mobileNumber}
                onChange={handleMobileNumberChange}
                maxLength={10}
                className=" bg-inherit text-xl font-inter text-white  focus:outline-none placeholder:font-thin placeholder:text-md placeholder:text-slate-400 focus:border-none  "
              />
            </div>
            {message === "Mobile Number" && (
              <p className="text-red-500 mb-2 font-normal text-sm">
                Please Enter a valid Mobile Number
              </p>
            )}

            <div className="flex-row mt-8 mb-4  ">

              {/* <label className="text-newDarkGold text-lg font-poppins ">
                Select State
              </label> */}
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="bg-white px-5 py-2 rounded-xl  border-2 border-newDarkGold"
              >
                <option value="">Select State</option>
                {stateData.map((state) => (
                  <option key={state.id} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            {message === "Selected State" && (
              <p className="text-red-500 mb-2 font-normal text-sm">
                Please Select a state
              </p>
            )}
            <div className="flex items-center mb-10">
              <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">

                <p
                  className="font-normal text-sm text-newDarkGold items-center hover:text-newLightGold"
                  htmlFor="termsCheckbox"
                >
                  <input
                    id="termsCheckbox"
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="mr-2  ring-newDarkGold"
                  />
                  Terms & Conditions
                </p>
              </Link>

            </div>
            {message === "Terms" && (
              <p className="text-red-500 font-normal text-sm">
                Please accept the terms & condition
              </p>
            )}
            {/* <p className="text-red-500 mb-4 font-normal text-sm">{message}</p> */}
            <div className="flex mb-4">
              <button
                onClick={handleSignUp}
                className={`w-2/5 bg-gradient-to-r from-newDarkGold via-newLightGold to-newDarkGold text-newLightBlue font-poppins font-medium px-6 py-2 rounded-md flex items-center justify-center h-12 ${loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}>
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-newDarkBlue"  // Set color to newDarkBlue
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>

                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </div>
        )}

        {otpSent && (
          <div className="mx-4 sm:ml-16 sm:mr-32">
            <label className="text-newDarkGold text-lg font-poppins">
              OTP
            </label>
            <div className="w-full md:w-2/3 mt-2 mb-4 p-2  border-2 border-newDarkGold rounded-xl">

              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={handleOtpChange}
                className=" bg-inherit text-xl font-inter text-white  focus:outline-none placeholder:font-thin placeholder:text-md placeholder:text-slate-400 focus:border-none  "
              />
            </div>

            <div className="flex mb-10">
              <button
                onClick={handleResend}
                disabled={!resendActive} // Disable the button when it's not active
                className={`text-newDarkGold ${!resendActive && "opacity-50 cursor-not-allowed" // Apply styles when button is disabled
                  }`}
              >
                {resendActive ? "Resend OTP" : `Resend OTP (${timer}s)`}
              </button>
            </div>
            <div className="flex mb-4">
              <button
                onClick={handleVerify}
                className="w-3/5 sm:w-2/5 bg-gradient-to-r from-newDarkGold via-newLightGold to-newDarkGold text-newLightBlue font-poppins font-medium px-6 py-2 rounded-md"
              >
                Submit OTP
              </button>
            </div>
          </div>
        )}

        <Link
          to="/login"
          className=" ml-4 mr-4 mb-8 sm:ml-16 text-newDarkGold font-poppins font-medium hover:text-newLightGold "
        >
          Already have an account ? Click to login
        </Link>
      </div>
    );
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex-1 lg:flex sm:h-auto bg-grey justify-between min-h-screen ">
        <LeftContainer />
        <RightContainer />

      </div>
    </>
  );
};

export default SignUp;