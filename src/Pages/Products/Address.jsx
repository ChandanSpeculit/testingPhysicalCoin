
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Modal, Box, Typography, IconButton, Button, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { API_GATEWAY } from "../../env"
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import loginImage from "../../assets/images/Login_Left_Image.png";
import appStoreButton from "../../assets/images/App Store.png"
import playStoreButton from "../../assets/images/Play Store.png";
import coinsBig from "../../assets/NewImages/coinsBig.png";
function Address() {
    const location = useLocation();
    const navigate = useNavigate();
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    const uniqueId = userInfo?.["custom:uniqueId"];
    const product = location.state?.product;
    const quantity = location.state?.quantity;
    const [state, setState] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCityList, setSelectedCityList] = useState([]);
    const [selectedStateName, setSelectedStateName] = useState("");
    const [cityName, setCityName] = useState("");
    const [paymentTypeResponse, setPaymentTypeResponse] = useState("")
    const [paymentLink, setPaymentLink] = useState("")
    const [addressFromBackend, setAddressFromBackend] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [isExistingCustomer, setIsExistingCustomer] = useState(null); // null initially
    const [otp, setOtp] = useState("");
    const [otpLogin, setOtpLogin] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpSentLogin, setOtpSentLogin] = useState(false);
    const [resendActive, setResendActive] = useState(false);
    const [resendActiveLogin, setResendActiveLogin] = useState(false);
    const [timer, setTimer] = useState(30);
    const [timerLogin, setTimerLogin] = useState(30);
    const [message, setMessage] = useState("");
    const [loading1, setLoading1] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedStateForSignup, setSelectedStateForSignup] = useState("");
    const [formDetails, setFormDetails] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        addressType: '',
        landmark: '',
        postalCode: '',
        panCardNumber: '',
        dob: '',
        state: '',
        city: ''
    });

    const getAllStateList = () => {
        fetch(`${API_GATEWAY}/websiteApi/getAllStateList`, {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const parsedData = data.body;
                setState(JSON.parse(parsedData));
                // console.log(SON.parse(parsedData))
                setLoading(false);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getAllStateList();
        getaddressForWebsite()
    }, []);


    const findStateNameById = (id) => {
        const selectedState = state.find((s) => s.id === Number(id)); // Convert to Number
        if (selectedState) {
            setSelectedStateName(selectedState.name);
        } else {
            setSelectedStateName("State not found");
        }
    };

    const findCityNameById = (id) => {
        const selectedCity = selectedCityList.find((city) => city.id === Number(id));
        if (selectedCity) {
            return selectedCity.name;
        } else {
            return "City not found";
        }
    };


    const handleCityChange = (event) => {
        const selectedId = event.target.value;
        setFormDetails({ ...formDetails, city: selectedId });
        const selectedCityName = findCityNameById(selectedId);
        setCityName(selectedCityName)

    };


    const handleStateChange = (event) => {
        const selectedId = event.target.value;
        setSelectedState(selectedId);
        setFormDetails({ ...formDetails, state: selectedId });
        findStateNameById(selectedId)

        fetch(`${API_GATEWAY}/websiteApi/getAllCityList`, {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ state_code: selectedId }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setSelectedCityList(data.body);
            })
            .catch((error) => {
                console.error("There was a problem with the fetch operation:", error);
            });
    };

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormDetails({
            ...formDetails,
            [name]: value,
        });
    };


    const handleBuy = () => {
        if (!uniqueId || !quantity || !product?.id || !selectedStateName || !cityName || !formDetails) {
            alert("Please fill in all required fields.");
            return;
        }

        const timestamp = new Date().getTime();
        const mid = 'mid' + uniqueId + '_' + timestamp;
        const productPrice = product.productPrice[0]?.finalProductPrice || 0;
        const totalPrice = productPrice * quantity;

        let sendData = {
            reference_id: mid,
            uniqueId: uniqueId,
            amount: totalPrice,
            paymentType: 'physicalGold',
            paymentTypeId: 4,
            quantity: quantity,
            productId: product.id,
            stateName: selectedStateName,
            cityName: cityName,
            ...formDetails
        };


        if (isChecked) {
            addressForWebsite(); // Ensure this function is defined elsewhere in your code
        }

        fetch(`${API_GATEWAY}/websiteApi/productBuyAndSaveInDB`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
            .then((response) => response.json())
            .then((data) => {
                setLoading1(true);
                setPaymentTypeResponse(data.paymentLink);
                setPaymentLink(data.paymentLink.link_url);
                if (data.paymentLink?.link_url) {
                    window.location.href = data.paymentLink.link_url;
                }
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
            })
            .finally(() => {
                setLoading1(false); // Turn off the loading spinner after redirect or error
            });
    };


    const addressForWebsite = () => {
        let sendData = {
            status: "add",
            uniqueId: uniqueId,
            stateName: selectedStateName,
            cityName: cityName,
            ...formDetails
        };
        console.log("senddata", sendData);
        // Now send cart details to the API
        fetch(`${API_GATEWAY}/websiteApi/addressForWebsite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Address updated successfully")
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
            });
    };


    const getaddressForWebsite = () => {
        let sendData = {
            status: "get",
            uniqueId: uniqueId,
        };

        // Now send cart details to the API
        fetch(`${API_GATEWAY}/websiteApi/addressForWebsite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
            .then((response) => response.json())
            .then((data) => {
                const parsedData = JSON.parse(data.body);
                setAddressFromBackend(parsedData.addresses);
            })
            .catch((error) => {
                console.error('Error fetching addresses:', error);
            });
    };


    const handleAddressSelect = (address) => {
        setFormDetails({
            firstName: address.firstName,
            lastName: address.lastName,
            mobileNumber: address.phoneNumber,
            email: address.email,
            addressType: address.addressType,
            landmark: address.landmark,
            postalCode: address.postalCode,
            panCardNumber: address.panCardNumber,
            dob: address.dob,
        });
        setShowModal(false);
        document.body.style.overflow = 'auto';
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };


    const handlePrePaymentCheck = () => {
        const { firstName, lastName, mobileNumber, email, addressType, landmark, postalCode, panCardNumber, dob, state, city } = formDetails;

        const requiredFields = [
            { field: quantity, message: "Please enter the quantity." },
            { field: product?.id, message: "Product details are missing." },
            { field: firstName, message: "Please enter your first name." },
            { field: lastName, message: "Please enter your last name." },
            { field: mobileNumber, message: "Please enter your mobile number." },
            { field: email, message: "Please enter your email." },
            { field: selectedStateName, message: "Please select your state." },
            { field: cityName, message: "Please enter your city name." },
            { field: addressType, message: "Please select your address type." },
            { field: landmark, message: "Please enter a landmark." },
            { field: postalCode, message: "Please enter your postal code." },
            { field: panCardNumber, message: "Please enter your PAN card number." },
            { field: dob, message: "Please enter your date of birth." },
            { field: state, message: "Please select your state." },
            { field: city, message: "Please enter your city." }
        ];
        for (let { field, message } of requiredFields) {
            if (!field) {
                alert(message);
                return;
            }
        }
        if (!uniqueId) {
            setOpenModal(true); // Open the modal if no uniqueId
            return; // Stop further validation
        }
        setShowPaymentModal(true);
    };


    const handleCloseModal = () => {
        setOpenModal(false);
        setIsExistingCustomer(null);
        setOtpSent(false)
        setOtpSentLogin(false)

    }

    const handleExistingCustomer = () => {
        setIsExistingCustomer(true);
    };

    const handleNewCustomer = () => {
        setIsExistingCustomer(false);
    };



    const handleBack = () => {
        setIsExistingCustomer(null);
    };

    const isValidPhoneNumber = () => {
        return /^[0-9]{10}$/.test(formDetails.mobileNumber);
    };

    const handleLogin = async () => {
        setLoading1(true);
        try {
            if (!isValidPhoneNumber()) {
                alert("Enter a valid phone number");
                setLoading1(false);
                return;
            }

            const requestObject = {
                request: {
                    userAttributes: {
                        phone_number: "+91" + formDetails.mobileNumber, // Assuming mobile number is stored in formDetails
                    },
                },
            };

            const response = await fetch(
                `${API_GATEWAY}/auth/create-auth-challenge`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestObject),
                }
            );

            console.log("API Response:", response);
            const loginResponse = await response.json();
            const parsedLoginResponse = JSON.parse(loginResponse.body)
            if (parsedLoginResponse.error) {
                if (
                    parsedLoginResponse.error.includes("UserNotFoundException")
                ) {
                    console.log("User does not exist");
                    alert("User not found, Please SignUp");
                } else {
                    alert("An error occurred: " + errorResponse.error);
                }
            } else {
                setOtpSentLogin(true);
                setTimerLogin(30);
                console.log("resendActiveLogin", resendActiveLogin)
                console.log("login otp sent");
            }
        } catch (error) {
            console.error("API Error:", error);
            alert("error occured");
        } finally {
            setLoading1(false);
        }
    };


    const handleVerify = async () => {
        setLoading(true);
        try {
            console.log("bbuu", otpLogin);
            const response = await fetch(
                `${API_GATEWAY}/auth/verify-auth-challenge`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        request: {
                            userAttributes: {
                                phone_number: "+91" + formDetails.mobileNumber,
                            },
                            challengeAnswer: otpLogin,
                        },
                    }),
                }
            );

            const responseData = await response.json();
            console.log("resi", responseData);
            console.log("133");
            let loginResponse = await responseData.token;
            let userd = await responseData.userdata;
            console.log("responseData", responseData);
            console.log(userd);
            if (responseData.answerCorrect) {
                console.log("OTP verification successful");
                console.log("kk", loginResponse);
                window.localStorage.setItem("userToken", loginResponse);
                window.localStorage.setItem("userInfo", JSON.stringify(userd));
                setOpenModal(false)
                setShowPaymentModal(true);

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
        setResendActiveLogin(false);
        setTimerLogin(30);


        const requestObject = {
            request: {
                userAttributes: {
                    phone_number: "+91" + formDetails.mobileNumber, // Assuming mobile number is stored in formDetails
                },
            },
        };

        try {
            const response = await fetch(
                `${API_GATEWAY}/auth/create-auth-challenge`,
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


    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleOtpChangeLogin = (e) => {
        setOtpLogin(e.target.value);
    };

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

    const handleStateChangeForSignup = (e) => {
        setSelectedStateForSignup(e.target.value);
    };


    const cleanedPhoneNumber = formDetails.mobileNumber.startsWith("+91")
        ? formDetails.mobileNumber.slice(3)
        : formDetails.mobileNumber;

    const handleSignUp = async () => {
        setLoading1(true);
        setTimer(30);
        const phoneNumberRegex = /^[0-9]{10}$/;
        if (!phoneNumberRegex.test(cleanedPhoneNumber)) {
            setMessage("Mobile Number");
            setLoading(false);
            return;
        }

        if (selectedStateForSignup === "") {
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
                `${API_GATEWAY}/auth/passwordless_signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        phoneNumber: "+91" + cleanedPhoneNumber,
                        // email: email.toLowerCase(),
                        selectedState: selectedStateForSignup,
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
                    alert(
                        'Please Login User already exists with this Phone Number/Email Address',
                    );
                    setIsExistingCustomer(true)


                } else if (parsedBody.message == 'Phone number not verified') {
                    console.log('User phone number not verified');
                    // const phnNumber = response.data.phone_number;
                    try {
                        const response = await fetch(
                            `${API_GATEWAY}/auth/cogni_resendsignupotp`,
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

    const handleVerifyForSignUp = async () => {
        const requestBody = {
            uniqueId: cleanedPhoneNumber,
            phone_number: "+91" + cleanedPhoneNumber, // Add user's phone number here
            consent_name: "Terms & Condition and Privacy Policy", // Assuming 'consentPolicy' is the name of the consent
            consent_status: "Yes", // 'Yes' or 'No' based on consentChecked
        };

        try {
            const response = fetch(
                `${API_GATEWAY}/save_concent`,
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
                `${API_GATEWAY}/auth/passwordless_signOtpVerify`,
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
                setOpenModal(false)
                setShowPaymentModal(true)
            }
            else {
                alert(body.message);
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    const handleResendForSignUp = async () => {
        setResendActive(false);
        setTimer(30);
        try {
            const response = await fetch(
                `${API_GATEWAY}/auth/cogni_resendsignupotp`,
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


    const startFirstTimer = () => {
        let intervalId;
        if (timer > 0 && !resendActive) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
    };

    let intervalIdLogin;

    const startSecondTimer = () => {
        if (timerLogin > 0 && !resendActiveLogin) {
            intervalIdLogin = setInterval(() => {
                setTimerLogin((prevTimerLogin) => prevTimerLogin - 1);
            }, 1000);
        }
    };
    useEffect(() => {
        if (timerLogin == 0) {
            setResendActiveLogin(true);
            clearInterval(intervalIdLogin);
        }

    }, [timerLogin])

    useEffect(() => {
        if (timer == 0) {
            setResendActive(true);
            clearInterval(intervalIdLogin);
        }
    }, [timer])






    return (

        <>
            <Navbar />

            <section className="max-w-7xl mx-auto mt-4">
                <Link
                    to={`/getProductDetails/${product.id}`}
                    className="flex items-center gap-2 text-black mb-8 font-poppins"
                >
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className=""
                    />
                    Back
                </Link>
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                        <div className="min-w-0 flex-1 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold font-poppins">Provide your details</h2>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-newDarkBlue font-poppins">First Name</label>
                                        <input type="text" id="firstName" name="firstName" value={formDetails.firstName} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" placeholder="Enter your first name" required />
                                    </div>

                                    <div>
                                        <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-newDarkBlue font-poppins">Last Name</label>
                                        <input type="text" id="lastName" name="lastName" value={formDetails.lastName} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" placeholder="Enter your last name" required />
                                    </div>

                                    <div>
                                        <label htmlFor="mobileNumber" className="mb-2 block text-sm font-medium text-newDarkBlue font-poppins">Mobile Number</label>
                                        <input type="text" id="mobileNumber" name="mobileNumber" value={formDetails.mobileNumber} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" placeholder="Enter your mobile number" required />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-newDarkBlue font-poppins">Email Address*</label>
                                        <input type="email" id="email" name="email" value={formDetails.email} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" placeholder="name@domain.com" required />
                                    </div>

                                    <div>
                                        <label htmlFor="state" className="mb-2 block text-sm font-medium text-newDarkBlue font-poppins">State*</label>
                                        <select id="state" name="state" value={formDetails.state} onChange={handleStateChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900">
                                            <option value="" disabled>Select a state</option>
                                            {state.map((state) => (
                                                <option key={state.id} value={state.id}>
                                                    {state.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="city" className="mb-2 block text-sm font-medium text-newDarkBlue font-poppins">City*</label>
                                        <select id="city" name="city" value={formDetails.city} onChange={handleCityChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900">
                                            <option value="" disabled>Select a City</option>
                                            {selectedCityList && selectedCityList.map((city) => (
                                                <option key={city.id} value={city.id}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="addressType" className="mb-2 block text-sm font-medium text-newDarkBlue font-poppins">Address</label>
                                        <input type="text" id="addressType" name="addressType" value={formDetails.addressType} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" placeholder="Enter Address Here" required />
                                    </div>

                                    <div>
                                        <label htmlFor="landmark" className="mb-2 block text-sm font-medium text-newDarkBlue font-poppins">Landmark*</label>
                                        <input type="text" id="landmark" name="landmark" value={formDetails.landmark} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" placeholder="Enter Landmark" required />
                                    </div>

                                    <div>
                                        <label htmlFor="postalCode" className="mb-2 block text-sm font-medium text-newDarkBlue font-poppins">Postal Code*</label>
                                        <input type="text" id="postalCode" name="postalCode" value={formDetails.postalCode} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" placeholder="Enter Pincode" required />
                                    </div>

                                    <div>
                                        <label htmlFor="panCardNumber" className="mb-2 block text-sm font-medium text-newDarkBlue font-poppins">Pan Card Number*</label>
                                        <input type="text" id="panCardNumber" name="panCardNumber" value={formDetails.panCardNumber} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" placeholder="ABCTY1234D" required />
                                    </div>

                                    <div>
                                        <label htmlFor="dob" className="mb-2 block text-sm font-medium text-newDarkBlue font-poppins">DOB*</label>
                                        <input type="date" id="dob" name="dob" value={formDetails.dob} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" placeholder="dd-mm-yyyy" required />
                                    </div>


                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="termsCheckbox"
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                        style={{ width: '20px', height: '20px' }} // Adjust the size as needed
                                        className="mr-2 ring-newDarkGold"
                                    />
                                    <p className="font-bold text-sm text-newDarkBlue font-poppins">
                                        Would you like to save this address? Please check the box.
                                    </p>
                                </div>



                            </div>
                        </div>

                        <div class=" w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                            <div class="flow-root">
                                <div class="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                                    <dl class="flex items-center justify-between gap-4 py-3">
                                        <dt class="text-base font-normal font-poppins text-newDarkBlue">Item Price</dt>
                                        <dd class="text-base font-medium font-poppins text-newDarkGold">₹ {product.productPrice[0]?.finalProductPrice}</dd>
                                    </dl>

                                    <dl class="flex items-center justify-between gap-4 py-3">
                                        <dt class="text-base font-normal font-poppins text-newDarkBlue">Quantity</dt>
                                        <dd class="text-base font-medium font-poppins text-newDarkGold">{quantity}</dd>
                                    </dl>

                                    <dl class="flex items-center justify-between gap-4 py-3">
                                        <dt class="text-base font-normal font-poppins text-newDarkBlue">GST 3% (Inclusive)</dt>
                                        <dd class="text-base font-medium font-poppins text-newDarkGold">₹ {(product.productPrice[0]?.finalProductPrice * 0.03 * quantity).toFixed(2)}
                                        </dd>
                                    </dl>

                                    <dl class="flex items-center justify-between gap-4 py-3">
                                        <dt class="text-base font-normal font-poppins text-newDarkBlue">Shipping Price (Inclusive)</dt>
                                        <dd class="text-base font-medium font-poppins text-newDarkGold">₹ {product.shipping}</dd>
                                    </dl>

                                    <dl class="flex items-center justify-between gap-4 py-3">
                                        <dt class="text-base font-semibold font-poppins text-newDarkBlue">Total</dt>
                                        <dd class="text-base font-medium font-poppins text-newDarkGold">₹ {(product.productPrice[0]?.finalProductPrice * quantity).toFixed(2)}</dd>
                                    </dl>
                                </div>
                            </div>

                            <div class="space-y-3">
                                <button
                                    onClick={() => {
                                        handlePrePaymentCheck();
                                    }}
                                    className="flex w-full font-poppins items-center justify-center rounded-lg bg-gradient-to-r from-newDarkBlue via-newLightBlue to-newDarkBlue px-5 py-2.5 text-sm font-medium text-newDarkGold hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Proceed to Payment
                                </button>


                                <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Shipping price and tax are inclusive in the total price.</p>
                            </div>


                            {uniqueId && (
                                <div className="space-y-3">
                                    <h3 className="text-lg font-medium font-poppins text-newDarkBlue">Your Addresses</h3>
                                    {Array.isArray(addressFromBackend) && addressFromBackend.length === 0 && (
                                        <p className="font-poppins text-base text-gray-600">There are no addresses available.</p>
                                    )}
                                    {Array.isArray(addressFromBackend) && addressFromBackend.slice(0, 2).map((address, index) => (
                                        <div
                                            key={index}
                                            className="p-4 border border-gray-300 rounded-lg cursor-pointer"
                                            onClick={() => handleAddressSelect(address)}
                                        >
                                            <p className="font-poppins text-base text-newDarkBlue">
                                                {address.firstName} {address.lastName}
                                            </p>
                                            <p className="font-poppins text-sm text-gray-600">{address.cityName}, {address.stateName}</p>
                                            <p className="font-poppins text-sm text-gray-600">{address.phoneNumber}</p>
                                            <p className="font-poppins text-sm text-gray-600">{address.postalCode}</p>
                                        </div>
                                    ))}
                                    {Array.isArray(addressFromBackend) && addressFromBackend.length > 2 && (
                                        <button
                                            onClick={() => setShowModal(true)}
                                            className="w-full font-poppins items-center justify-center rounded-lg bg-newDarkBlue px-3 py-2 text-sm font-medium text-white"
                                        >
                                            View More
                                        </button>
                                    )}
                                </div>
                            )}


                        </div>
                    </div>
                </div>
            </section>

            {/* <Modal
                open={showModal}
                onClose={() => {
                    setShowModal(false);
                    document.body.style.overflow = 'auto';
                }}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        maxWidth: 600,
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '8px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                    }}
                >
                    <IconButton
                        onClick={() => {
                            setShowModal(false);
                            document.body.style.overflow = 'auto';
                        }}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'gray',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography id="modal-title" variant="h6" component="h3" sx={{ mb: 2, fontFamily: 'Poppins', color: '#123456' }}>
                        All Addresses
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {addressFromBackend.map((address, index) => (
                            <Box
                                key={index}
                                sx={{
                                    p: 2,
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    '&:hover': { borderColor: '#888' },
                                }}
                                onClick={() => handleAddressSelect(address)}
                            >
                                <Typography sx={{ fontFamily: 'Poppins', fontSize: '16px', color: '#123456' }}>
                                    {address.firstName} {address.lastName}
                                </Typography>
                                <Typography sx={{ fontFamily: 'Poppins', fontSize: '14px', color: '#666' }}>
                                    {address.cityName}, {address.stateName}
                                </Typography>
                                <Typography sx={{ fontFamily: 'Poppins', fontSize: '14px', color: '#666' }}>
                                    {address.phoneNumber}
                                </Typography>
                                <Typography sx={{ fontFamily: 'Poppins', fontSize: '14px', color: '#666' }}>
                                    {address.postalCode}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Modal> */}

            <Modal
                open={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                aria-labelledby="payment-modal-title"
                aria-describedby="payment-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        maxWidth: 600,
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '8px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                    }}
                >
                    <IconButton
                        onClick={() => setShowPaymentModal(false)}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'gray',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography id="payment-modal-title" variant="h6" component="h3" sx={{ mb: 4, fontFamily: 'Poppins', color: '#123456' }}>
                        Payment
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                            <Typography sx={{ fontFamily: 'Poppins', fontSize: '16px', color: '#123456' }}>Item Price</Typography>
                            <Typography sx={{ fontFamily: 'Poppins', fontSize: '16px', color: '#DAA520' }}>
                                ₹ {product.productPrice[0]?.finalProductPrice}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                            <Typography sx={{ fontFamily: 'Poppins', fontSize: '16px', color: '#123456' }}>Quantity</Typography>
                            <Typography sx={{ fontFamily: 'Poppins', fontSize: '16px', color: '#DAA520' }}>{quantity}</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                            <Typography sx={{ fontFamily: 'Poppins', fontSize: '16px', color: '#123456' }}>GST 3% (Inclusive)</Typography>
                            <Typography sx={{ fontFamily: 'Poppins', fontSize: '16px', color: '#DAA520' }}>
                                ₹ {(product.productPrice[0]?.finalProductPrice * 0.03 * quantity).toFixed(2)}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                            <Typography sx={{ fontFamily: 'Poppins', fontSize: '16px', color: '#123456' }}>Shipping Price (Inclusive)</Typography>
                            <Typography sx={{ fontFamily: 'Poppins', fontSize: '16px', color: '#DAA520' }}>
                                ₹ {product.shipping}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                            <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', color: '#123456' }}>Total</Typography>
                            <Typography sx={{ fontFamily: 'Poppins', fontSize: '16px', color: '#DAA520' }}>
                                ₹ {(product.productPrice[0]?.finalProductPrice * quantity).toFixed(2)}
                            </Typography>
                        </Box>
                    </Box>

                    <Typography sx={{ fontFamily: 'Poppins', fontSize: '16px', color: '#123456', mb: 1 }}>
                        This product will be delivered to this address within 7-10 business days.
                    </Typography>

                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', mb: 6 }}>
                        <Typography sx={{ fontFamily: 'Poppins', fontSize: '16px', color: '#123456' }}>
                            Name: {formDetails.firstName} {formDetails.lastName}
                        </Typography>
                        <Typography sx={{ fontFamily: 'Poppins', fontSize: '14px', color: '#666' }}>
                            Phone Number: {formDetails.mobileNumber}
                        </Typography>
                        <Typography sx={{ fontFamily: 'Poppins', fontSize: '14px', color: '#666' }}>
                            Address: {formDetails.addressType}, {formDetails.landmark}, {cityName}, {selectedStateName}
                        </Typography>
                        <Typography sx={{ fontFamily: 'Poppins', fontSize: '14px', color: '#666' }}>
                            Postal Code: {formDetails.postalCode}
                        </Typography>
                    </Box>

                    <div>
                        {/* Loading Backdrop */}
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={loading1} // Backdrop is visible when loading is true
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>

                        {/* Button */}
                        <Button
                            fullWidth
                            sx={{
                                fontFamily: 'Poppins',
                                bgcolor: '#123456',
                                color: 'white',
                                py: 1.5,
                                '&:hover': { bgcolor: '#0F3460' },
                            }}
                            onClick={handleBuy}
                        >
                            Pay Now
                        </Button>
                    </div>
                </Box>
            </Modal>


            <Modal open={openModal} onClose={handleCloseModal}>
                <div class="absolute flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-5/6 bg-white shadow-lg sm:w-3/5 sm:h-5/6">

                    <div className=' bg-newLightBlue items-center justify-center'>
                        <div className="flex items-center justify-center">
                            <img
                                src={coinsBig}
                                alt="Your Image"
                                className="w-4/6 md:w-4/6  lg:1/6 h-auto object-cover mt-4"
                            />
                        </div>

                        <div className="">
                            {isExistingCustomer === null && (
                                <>

                                    <h2 className="text-xl font-semibold mb-4 text-center text-white font-poppins">Are you an existing customer?</h2>

                                    <div className="self-center flex flex-col sm:flex-row justify-center items-center gap-3 w-full md:w-4/5 mx-auto">
                                        <button
                                            onClick={handleExistingCustomer}
                                            className={`w-5/6 sm:w-1/2 md:w-2/5 bg-gradient-to-r from-newDarkGold via-newLightGold to-newDarkGold text-newLightBlue font-poppins font-medium px-6 py-2 rounded-md flex items-center justify-center h-12 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
                                            Yes
                                        </button>
                                        <button
                                            onClick={handleNewCustomer}
                                            className={`w-5/6  sm:w-1/2 md:w-2/5 bg-gradient-to-r from-newDarkGold via-newLightGold to-newDarkGold text-newLightBlue font-poppins font-medium px-6 py-2 rounded-md flex items-center justify-center h-12 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
                                            No
                                        </button>
                                    </div>

                                </>
                            )}

                            {isExistingCustomer === true && (
                                <div className="sm:px-4 sm:py-8">
                                    {!otpSentLogin && (
                                        <>
                                            <div className="flex justify-center items-center w-full">
                                                <div className="flex flex-col items-center justify-center mt-0 sm:mt-0 md:mt-[-5rem] lg:mt-[-5rem]">
                                                    <label className=" text-newDarkGold  text-sm sm:text-lg md:text-xl font-poppins px-5 sm:px-0">
                                                        Mobile Number *
                                                    </label>
                                                    <div className="mx-8 flex justify-center items-center w-9/12 sm:w-full mt-2 mb-4 p-2 sm:p-2 gap-3 sm:gap-2 border-2 border-newDarkGold rounded-xl sm:justify-center md:justify-center">
                                                        <p className="text-newDarkGold text-md sm:text-xl md:text-xl text-center">+91 |</p>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter your mobile number"
                                                            value={formDetails.mobileNumber}
                                                            onChange={handleChange}
                                                            maxLength={10}
                                                            required
                                                            id="mobileNumber"
                                                            name="mobileNumber"
                                                            className="bg-inherit w-8/12 sm:w-10/12 md:w-10/12 text-md sm:text-md md:text-md font-inter text-white focus:outline-none placeholder:font-thin placeholder:text-md placeholder:text-slate-400 text-center sm:text-center md:text-center"
                                                        />
                                                    </div>

                                                </div>
                                            </div>




                                            <div className="self-center flex flex-col sm:flex-row justify-center items-center gap-3 w-full md:w-4/5 mx-auto">
                                                <button
                                                    onClick={!loading ? () => {
                                                        handleLogin();
                                                        startSecondTimer();  // Start the first timer after login
                                                    } : null} disabled={loading}
                                                    className={`w-5/6  sm:w-1/2 md:w-2/5 bg-gradient-to-r from-newDarkGold via-newLightGold to-newDarkGold text-newLightBlue font-poppins font-medium px-6 py-2 rounded-md flex items-center justify-center h-12 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
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

                                                <button onClick={handleBack} className={`w-5/6  sm:w-1/2 md:w-2/5 bg-gradient-to-r from-newDarkGold via-newLightGold to-newDarkGold text-newLightBlue font-poppins font-medium px-6 py-2 rounded-md flex items-center justify-center h-12 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
                                                    Back
                                                </button>
                                            </div>

                                        </>
                                    )
                                    }

                                    {
                                        otpSentLogin && (
                                            <div className="flex flex-col items-center justify-center mt-0 sm:mt-0 md:mt-[-5rem] lg:mt-[-5rem]">

                                                <label className=" text-newDarkGold  text-sm sm:text-lg md:text-xl font-poppins px-5 sm:px-0">
                                                    OTP
                                                </label>


                                                <div className=" mx-3 mt-2 mb-4 p-1  border-2 border-newDarkGold rounded-xl justify-center items-center ">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter 6-digit OTP"
                                                        value={otpLogin}
                                                        onChange={handleOtpChangeLogin}
                                                        // onKeyDown={handleKeyPressOtp}
                                                        maxLength={6}
                                                        className=" bg-inherit text-xl font-inter text-white  focus:outline-none placeholder:font-thin placeholder:text-md placeholder:text-slate-400 focus:border-none  "
                                                    />
                                                </div>

                                                <div className="flex mb-10 justify-center">
                                                    <button
                                                        onClick={handleResend}
                                                        disabled={!resendActiveLogin} // Disable the button when it's not active
                                                        className={`text-newDarkGold ${!resendActiveLogin && "opacity-50 cursor-not-allowed" // Apply styles when button is disabled
                                                            }`}
                                                    >
                                                        {resendActiveLogin ? "Resend OTP" : `Resend OTP (${timerLogin}s)`}
                                                    </button>
                                                </div>
                                                <div className="self-center flex flex-col sm:flex-row justify-center items-center gap-3 w-full md:w-4/5 mx-auto">
                                                    <button
                                                        onClick={handleVerify}
                                                        disabled={loading}
                                                        className={`w-5/6  sm:w-1/2 md:w-2/5 bg-gradient-to-r from-newDarkGold via-newLightGold to-newDarkGold text-newLightBlue font-poppins font-medium px-6 py-2 rounded-md flex items-center justify-center h-12 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
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
                                                    <button
                                                        onClick={() => {
                                                            if (otpSentLogin) {
                                                                setOtpSentLogin(false); // Go back to mobile input step
                                                            }
                                                        }}
                                                        className={`w-5/6  sm:w-1/2 md:w-2/5 bg-gradient-to-r from-newDarkGold via-newLightGold to-newDarkGold text-newLightBlue font-poppins font-medium px-6 py-2 rounded-md flex items-center justify-center h-12 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                                    >
                                                        Back
                                                    </button>

                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            )}

                            {isExistingCustomer === false && (
                                <div className="sm:px-4 sm:py-8">
                                    {!otpSent && (
                                        <div className="justify-center items-center mt-0 sm:mt-0 md:mt-[-8rem]">
                                            <label className="text-newDarkGold text-lg font-poppins ">
                                                Mobile Number *
                                            </label>
                                            <div className="flex justify-center items-center w-full  mt-2 mb-2 p-2 gap-3 sm:gap-2 border-2 border-newDarkGold rounded-xl sm:justify-center md:justify-center ">
                                                <p className="text-newDarkGold text-md sm:text-xl md:text-xl text-center">+91 |</p>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your mobile number"
                                                    value={formDetails.mobileNumber}
                                                    onChange={handleChange}
                                                    maxLength={10}
                                                    id="mobileNumber"
                                                    name="mobileNumber"
                                                    className="bg-inherit w-8/12 sm:w-10/12 md:w-10/12 text-md sm:text-md md:text-md font-inter text-white focus:outline-none placeholder:font-thin placeholder:text-md placeholder:text-slate-400 text-center sm:text-center md:text-center"
                                                />
                                            </div>
                                            {message === "Mobile Number" && (
                                                <p className="text-red-500 mb-1 font-normal text-sm">
                                                    Please Enter a valid Mobile Number
                                                </p>
                                            )}

                                            <div className="flex-row mt-4 mb-2">
                                                <select
                                                    value={selectedStateForSignup}
                                                    onChange={handleStateChangeForSignup}
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
                                            <div className="flex items-center mb-2">
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
                                            <p className="text-red-500 mb-4 font-normal text-sm">{message}</p>
                                            <div className="self-center flex flex-col sm:flex-row justify-center items-center gap-3 w-full md:w-4/5 mx-auto">
                                                <button
                                                    onClick={() => {
                                                        handleSignUp();
                                                        startFirstTimer();
                                                    }}

                                                    className={`w-5/6  sm:w-1/2 md:w-2/5 bg-gradient-to-r from-newDarkGold via-newLightGold to-newDarkGold text-newLightBlue font-poppins font-medium px-6 py-2 rounded-md flex items-center justify-center h-12 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>

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
                                                <button onClick={handleBack}
                                                    className={`w-5/6  sm:w-1/2 md:w-2/5 bg-gradient-to-r from-newDarkGold via-newLightGold to-newDarkGold text-newLightBlue font-poppins font-medium px-6 py-2 rounded-md flex items-center justify-center h-12 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>

                                                    Back
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {otpSent && (
                                        <div className="flex flex-col items-center justify-center mt-0 sm:mt-0 md:mt-[-5rem] lg:mt-[-5rem]">
                                            <label className=" text-newDarkGold  text-sm sm:text-lg md:text-xl font-poppins px-5 sm:px-0">
                                                OTP
                                            </label>
                                            <div className=" mx-3 mt-2 mb-4 p-1  border-2 border-newDarkGold rounded-xl justify-center items-center ">

                                                <input
                                                    type="text"
                                                    placeholder="Enter 6-digit OTP"
                                                    value={otp}
                                                    onChange={handleOtpChange}
                                                    className=" bg-inherit text-xl font-inter text-white  focus:outline-none placeholder:font-thin placeholder:text-md placeholder:text-slate-400 focus:border-none  "
                                                />
                                            </div>

                                            <div className="flex mb-10 justify-center">
                                                <button
                                                    onClick={handleResendForSignUp}
                                                    disabled={!resendActive} // Disable the button when it's not active
                                                    className={`text-newDarkGold ${!resendActive && "opacity-50 cursor-not-allowed" // Apply styles when button is disabled
                                                        }`}
                                                >
                                                    {resendActive ? "Resend OTP" : `Resend OTP (${timer}s)`}
                                                </button>
                                            </div>

                                            <div className="self-center flex flex-col sm:flex-row justify-center items-center gap-3 w-full md:w-4/5 mx-auto">
                                                <button
                                                    onClick={handleVerifyForSignUp}
                                                    className={`w-5/6  sm:w-1/2 md:w-2/5 bg-gradient-to-r from-newDarkGold via-newLightGold to-newDarkGold text-newLightBlue font-poppins font-medium px-6 py-2 rounded-md flex items-center justify-center h-12 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
                                                    Submit OTP
                                                </button>

                                                <button onClick={handleBack}
                                                    className={`w-5/6  sm:w-1/2 md:w-2/5 bg-gradient-to-r from-newDarkGold via-newLightGold to-newDarkGold text-newLightBlue font-poppins font-medium px-6 py-2 rounded-md flex items-center justify-center h-12 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
                                                    Back
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="hidden md:hidden  xl:flex xl:flex-col items-center justify-center bg-gradient-to-r from-newDarkGold via-newLightGold to-newDarkGold ">
                        <img src={loginImage} alt="Your Image" className="w-1/2 h-auto object-cover mt-4" />
                        <div className="flex gap-5 justify-center mb-2">
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
                    </div>

                </div>
            </Modal>



            <Footer />
        </>
    );
}

export default Address;