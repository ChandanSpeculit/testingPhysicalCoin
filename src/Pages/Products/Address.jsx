
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
    const [showPaymentModal, setShowPaymentModal] = useState(false);
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

        setLoading1(true); // Turn on the loading spinner

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

    const [loading1, setLoading1] = useState(false);


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


                        </div>
                    </div>
                </div>
            </section>

            <Modal
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
            </Modal>

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
            <Footer />
        </>
    );
}

export default Address;