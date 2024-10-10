import React, { useEffect, useState } from "react";
// import Footer from "../../../components/Footer";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { API_GATEWAY_URL } from "../config/env-vars";

import loginImage from "../assets/images/Login_Left_Image.png";
import logo from "../assets/images/logoWhite.png";
// import IndianFlagWithPinCode from "../assets/images/IndianFlagWithPinCode.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaArrowLeftLong, FaFacebookF } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Modal, Box, Typography, Button } from '@mui/material';

const Login = () => {
  const LeftContainer = () => {
    return (
      <div className="w-2/5 hidden lg:flex lg:flex-col items-center justify-center bg-gradient-to-r from-newDarkGold via-newLightGold to-newDarkGold ">
        <h1 className="text-5xl text-newDarkBlue font-poppins font-semibold">Start Investing</h1>
        <img src={loginImage} alt="Your Image" className="  w-64 h-auto  " />
      </div>
    );
  };

  const RightContainer = () => {
    const navigate = useNavigate();
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [isEmail, setIsEmail] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [resendActive, setResendActive] = useState(false);
    const [timer, setTimer] = useState(30);
    const [loading, setLoading] = useState(false); // Add loading state
    const location = useLocation();
    const { redirectTo } = location.state || {};

    // Log the redirectTo parameter if it exists
    React.useEffect(() => {
      if (redirectTo) {
        console.log('Redirecting back to:', redirectTo);
      }
    }, [redirectTo]);

    const handleMobileNumberChange = (e) => {
      setMobileNumber(e.target.value);
    };

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };

    const handleOtpChange = (e) => {
      setOtp(e.target.value);
    };

    const handleModeChange = () => {
      setEmail("");
      setMobileNumber("");
      setIsEmail(!isEmail);
    };

    const isValidPhoneNumber = () => {
      return /^[0-9]{10}$/.test(mobileNumber);
    };

    const isValidEmail = () => {
      // You can use a more sophisticated email validation regex here
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleLogin = async () => {
      setLoading(true);
      try {
        if (
          !isEmail && !isValidPhoneNumber()
        ) {
          alert("Enter a valid phone number");
          return;
          setLoading(false);
        }

        const requestObject = !isEmail
          ? {
            request: {
              userAttributes: {
                phone_number: "+91" + mobileNumber,
              },
            },
          }
          : {
            request: {
              userAttributes: {
                email: email,
              },
            },
          };

        const response = await fetch(
          `${API_GATEWAY_URL}auth/create-auth-challenge`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestObject),
          }
        );

        console.log("API Response:", response);
        // const testResponse = await response.json();

        // console.log(testResponse)

        const loginResponse = await response.json();

        const parsedLoginResponse = JSON.parse(loginResponse.body)

        // console.log(JSON.parse(loginResponse.body))

        if (parsedLoginResponse.error) {

          if (
            parsedLoginResponse.error.includes("UserNotFoundException")
          ) {
            console.log("User does not exist");
            alert("User not found");
            navigate("/signup", { replace: true });
          } else {
            alert("An error occurred: " + errorResponse.error);
          }
        } else {
          // const loginResponse = await response.json();

          setOtpSent(true);
          setTimer(30);
          console.log("login otp sent");
        }
      } catch (error) {
        console.error("API Error:", error);
        alert("error occured");
      } finally {
        setLoading(false);
      }
    };

    const handleAlternateLogin = async () => {
      try {
        const response = await fetch(`${API_GATEWAY_URL}auth/alternate_email_login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        console.log(data.error)

        if (response.ok) {
          // If the API call was successful
          if (data.publicChallengeParameters && data.publicChallengeParameters.otp_delivery === 'email') {
            alert('OTP Sent Check your email for the OTP.');
            setOtpSent(true);
          } else {
            alert('Unverfied,  Your email is not verified.');
          }
        } else {
          // If there was an error with the API call
          alert(`Error, ${data.error} || Something went wrong`);
        }
      } catch (error) {
        // If there was a network error
        alert('Network Error Please check your internet connection.');
      }
    }


    const handleVerify = async () => {
      setLoading(true);
      try {
        console.log(otp);
        const response = await fetch(
          `${API_GATEWAY_URL}auth/verify-auth-challenge`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              request: {
                userAttributes: {
                  [isEmail ? "email" : "phone_number"]: isEmail
                    ? email
                    : "+91" + mobileNumber,
                },
                challengeAnswer: otp,
              },
            }),
          }
        );

        const responseData = await response.json();
        console.log("resi", responseData);
        console.log("133");
        let loginResponse = await responseData.token;
        let userd = await responseData.userdata;
        console.log(userd);
        if (responseData.answerCorrect) {
          // setTokenAndInfo(responseData.token, responseData.userdata);
          console.log("OTP verification successful");
          console.log("kk", loginResponse);

          window.localStorage.setItem("userToken", loginResponse);
          window.localStorage.setItem("userInfo", JSON.stringify(userd));

          if (redirectTo) {
            navigate(redirectTo, { replace: true });
          } else {
            navigate("/", { replace: true });
          }
          window.location.reload();
          console.log("login success");
        } else {
          console.log("OTP verification failed");
          alert(
            "Verification Failed The entered OTP is incorrect. Please try again."
          );
        }
      } catch (error) {
        console.error("Error verifying OTP:", error.message);
        alert(
          "Error An error occurred while verifying OTP. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    const handleResend = async () => {
      setResendActive(false);
      setTimer(30);

      const requestObject = {
        request: {
          userAttributes: {
            [isEmail ? "email" : "phone_number"]: isEmail
              ? email
              : "+91" + mobileNumber,
          },
        },
      };

      try {
        const response = await fetch(
          `${API_GATEWAY_URL}auth/create-auth-challenge`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestObject),
          }
        );

        console.log("API Response:", await response.json());
      } catch (error) {
        console.error("Error resending OTP:", error.message);
      }
    };

    const handleKeyPressLogin = (e) => {
      if (e.key === "Enter") {
        handleLogin();
      }
    };

    const handleKeyPressOtp = (e) => {
      if (e.key === "Enter") {
        handleVerify();
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
      <div className=" bg-gradient-to-r from-newDarkBlue via-newLightBlue to-newDarkBlue  flex-1 flex flex-col pt-10   ">
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



        <img src={logo} alt="logo" className="w-48 h-auto ml-4  sm:ml-16 my-12 sm:mt-16 sm:mb-12  " />
        <h1 className="text-3xl sm:4xl lg:text-4xl leading-relaxed font-medium mb-4 text-newDarkGold ml-4 mr-2 sm:ml-16 sm:mr-24 font-poppins" >
          What's your contact details ?
        </h1>
        <h2 className="text-sm font-regular font-poppins mb-10 text-newLightGold ml-4 mr-2 sm:ml-16">
          Welcome Back, Please login to your account
        </h2>
        {/* <div className="flex mb-4">
          <button className="flex-1 bg-darkBlue text-white px-4 py-2 rounded-md mr-4 cursor-default ">
            Login
          </button>
          <Link
            to="/Signup"
            className="flex justify-center items-center flex-1 bg-white text-darkBlue px-4 py-2 rounded-md border border-darkBlue mr-4 hover:shadow-xl hover:ease-in-out duration-500  hover:bg-darkBlue hover:text-white hover:scale-105 "
          >
            SignUp
          </Link>
        </div> */}

        {!otpSent && (
          <>
            {!isEmail && (
              <div className="mx-4 sm:ml-16 sm:mr-32 ">
                <label className="text-newDarkGold text-lg font-poppins ">
                  Mobile Number *
                </label>
                <div className=" w-full md:w-2/3  mt-2 mb-4 p-2 flex gap-3 md:gap-2   items-center border-2 border-newDarkGold rounded-xl">

                  <p className=" text-newDarkGold text-xl ">+91 |</p>
                  <input
                    type="text"
                    placeholder="85788773880"
                    value={mobileNumber}
                    onChange={handleMobileNumberChange}
                    maxLength={10}
                    onKeyDown={handleKeyPressLogin}
                    required
                    className=" bg-inherit text-xl font-inter text-white  focus:outline-none placeholder:font-thin placeholder:text-md placeholder:text-slate-400 focus:border-none  "
                  />
                </div>
                <button
                  onClick={handleModeChange}
                  className="flex  mb-10 text-newDarkGold text-lg font-poppins underline hover:text-newLightGold"
                >
                  Use Email to login
                </button>
              </div>
            )}

            {isEmail && (
              <div className="mx-4 sm:ml-16 sm:mr-32">
                <label className="text-newDarkGold text-lg font-poppins ">
                  Email *
                </label>
                <div className="w-full md:w-2/3 mt-2 mb-4 p-2  border-2 border-newDarkGold rounded-xl">

                  <input
                    type="email"
                    placeholder="robert.langster@gmail.com"
                    value={email}
                    onChange={handleEmailChange}
                    onKeyDown={handleKeyPressLogin}
                    className="w-full bg-inherit text-xl font-inter text-white  focus:outline-none placeholder:font-thin placeholder:text-md placeholder:text-slate-400 focus:border-none  "
                  />
                </div>
                <button
                  onClick={handleModeChange}
                  className="flex  mb-10 text-newDarkGold text-lg font-poppins underline hover:text-newLightGold"
                >
                  Use Mobile Number
                </button>
              </div>
            )}

            <div className="flex mb-4 ml-4 sm:ml-16">
              <button
                onClick={isEmail ? handleAlternateLogin : handleLogin} disabled={loading}
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
                  "Login"
                )}
              </button>
            </div>
          </>
        )
        }

        {
          otpSent && (
            <div className="mx-4 sm:ml-16 sm:mr-32 ">
              <label className="text-newDarkGold text-lg font-poppins">
                OTP
              </label>
              <div className="w-full md:w-2/3 mt-2 mb-4 p-2  border-2 border-newDarkGold rounded-xl">
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  onKeyDown={handleKeyPressOtp}
                  maxLength={6}
                  className=" bg-inherit text-xl font-inter text-white  focus:outline-none placeholder:font-thin placeholder:text-md placeholder:text-slate-400 focus:border-none  "
                />
              </div>

              <div className="flex mb-10 ">
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
                  disabled={loading}
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
                    "Submit OTP"
                  )}
                </button>
              </div>
            </div>
          )
        }


        <Link
          to="/Signup"
          className=" ml-4 mr-4 mb-8 sm:ml-16 text-newDarkGold font-poppins font-medium hover:text-newLightGold "
        >
          Don't have an account ? Click here to get started!!
        </Link>

      </div >
    );
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex-1 lg:flex sm:h-auto bg-grey justify-between min-h-screen ">
        {/* <div className=""> */}
        <LeftContainer />
        <RightContainer />
        {/* </div> */}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Login;