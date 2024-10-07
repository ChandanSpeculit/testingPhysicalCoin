
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Address() {
    const location = useLocation();
    const navigate = useNavigate();
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    const uniqueId = userInfo["custom:uniqueId"]
    // const uniqueId = "12345"
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
        fetch(`https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev/websiteApi/getAllStateList`, {
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

        fetch(`https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev/websiteApi/getAllCityList`, {
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
        console.log("senddata", sendData);
        if (isChecked) {
            addressForWebsite(); // Ensure this function is defined elsewhere in your code
        }
        fetch('https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev/websiteApi/productBuyAndSaveInDB', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
            .then((response) => response.json())
            .then((data) => {
                setPaymentTypeResponse(data.paymentLink)
                setPaymentLink(data.paymentLink.link_url)
                if (data.paymentLink?.link_url) {
                    window.location.href = data.paymentLink.link_url;
                }
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
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
        fetch('https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev//websiteApi/addressForWebsite', {
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
        fetch('https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev/websiteApi/addressForWebsite', {
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

    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handlePrePaymentCheck = () => {
        // Destructure form details
        const { firstName, lastName, mobileNumber, email, addressType, landmark, postalCode, panCardNumber, dob, state, city } = formDetails;

        // Check all required fields
        if (!uniqueId || !quantity || !product?.id || !selectedStateName || !cityName ||
            !firstName || !lastName || !mobileNumber || !email || !addressType || !landmark ||
            !postalCode || !panCardNumber || !dob || !state || !city) {
            alert("Please fill in all required fields.");
            setShowPaymentModal(false);
        } else {
            setShowPaymentModal(true);
        }
    };



    const testingPhysicalOrderLambda = () => {
        const timestamp = new Date().getTime();
        const mid = 'mid' + uniqueId + '_' + timestamp;
        const productPrice = product?.productPrice?.[0]?.finalProductPrice || 0;
        const totalPrice = productPrice * quantity;

        // Check if any required field is empty
        if (!uniqueId || !quantity || !product?.id || !selectedStateName || !cityName || !formDetails) {
            alert("Please fill in all required fields.");
            return;
        }
        if (isChecked) {
            addressForWebsite(); // Ensure this function is defined elsewhere in your code
        }
        let sendData = {
            reference_id: mid,
            uniqueId: uniqueId,
            transactionId: mid,
            amount: totalPrice,
            paymentType: 'physicalGold',
            paymentTypeId: 4,
            quantity: quantity,
            productId: product.id,
            stateName: selectedStateName,
            cityName: cityName,
            ...formDetails
        };

        console.log("sendData:", sendData);

        // Send cart details to the API
        fetch('https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev/websiteApi/testingPhysicalOrderLambda', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("API response:", data);
                alert("Payment Done");
                // Use a slight delay to ensure the alert has time to be shown before redirecting
                setTimeout(() => {
                    navigate('/myOrders');
                }, 3000);
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
                alert("An error occurred. Please try again.");
            });
    };


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


                            <div className="space-y-3">
                                <h3 className="text-lg font-medium font-poppins text-newDarkBlue">Your Addresses</h3>
                                {Array.isArray(addressFromBackend) && addressFromBackend.length == 0 && (
                                    <p className="font-poppins text-base text-gray-600">There are no addresses available.</p>
                                )}
                                {Array.isArray(addressFromBackend) && addressFromBackend.slice(0, 2).map((address, index) => (
                                    <div key={index} className="p-4 border border-gray-300 rounded-lg cursor-pointer" onClick={() => handleAddressSelect(address)}>
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



                            {showPaymentModal && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="w-full max-w-lg p-6 bg-white rounded-lg overflow-hidden shadow-lg relative">
                                        <button
                                            onClick={() => setShowPaymentModal(false)}
                                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                                        >
                                            &times;
                                        </button>
                                        <h3 className="text-lg font-medium font-poppins text-newDarkBlue mb-4">Payment</h3>

                                        <div class="flow-root">
                                            <div class="-my-3 mb-7 divide-y divide-gray-200 dark:divide-gray-800">
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

                                        <p className="text-base font-poppins text-newDarkBlue mb-6">
                                            This product will be delivered to this address within 7-10 business days.
                                        </p>


                                        <div className="p-4 border mb-10 border-gray-300 rounded-lg cursor-pointer">
                                            <p className="font-poppins text-base text-newDarkBlue">
                                                Name: {formDetails.firstName} {formDetails.lastName}
                                            </p>
                                            <p className="font-poppins text-sm text-gray-600"> Phone Number: {formDetails.mobileNumber}</p>

                                            <p className="font-poppins text-sm text-gray-600">Address:  {formDetails.addressType}, {formDetails.landmark}, {cityName}, {selectedStateName} </p>
                                            <p className="font-poppins text-sm text-gray-600">Postal Code: {formDetails.postalCode}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                testingPhysicalOrderLambda();
                                                setShowPaymentModal(false);
                                            }}
                                            className="flex w-full font-poppins items-center justify-center rounded-lg bg-newDarkBlue px-5 py-2.5 text-sm font-medium text-white"
                                        >
                                            Pay Now
                                        </button>
                                    </div>
                                </div>
                            )}

                            {showModal && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="w-full max-w-lg p-6 bg-white rounded-lg overflow-hidden shadow-lg relative">
                                        <button
                                            onClick={() => {
                                                setShowModal(false);
                                                document.body.style.overflow = 'auto';
                                            }}
                                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                                        >
                                            &times;
                                        </button>
                                        <h3 className="text-lg font-medium font-poppins text-newDarkBlue mb-4">All Addresses</h3>
                                        <div className="max-h-96 overflow-y-auto space-y-3 custom-scrollbar">
                                            {addressFromBackend.map((address, index) => (
                                                <div key={index} className="p-4 border border-gray-300 rounded-lg cursor-pointer" onClick={() => handleAddressSelect(address)}>
                                                    <p className="font-poppins text-base text-newDarkBlue">
                                                        {address.firstName} {address.lastName}
                                                    </p>
                                                    <p className="font-poppins text-sm text-gray-600">
                                                        {address.cityName}, {address.stateName}
                                                    </p>
                                                    <p className="font-poppins text-sm text-gray-600">{address.phoneNumber}</p>
                                                    <p className="font-poppins text-sm text-gray-600">{address.postalCode}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Address;