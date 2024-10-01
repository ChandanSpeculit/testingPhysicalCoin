
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Address() {
    const location = useLocation();
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    const uniqueId = userInfo["custom:uniqueId"]
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
    const [formDetails, setFormDetails] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        addressType: '',
        landmark: '',
        postalCode: '',
        panCardNumber: '',
        dob: ''
    });
    // console.log(selectedStateName, cityName)

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
            return "City not found"; // Handle case if city not found
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






    const handleBuy = (e) => {
        e.preventDefault();
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
        addressForWebsite()
        // Now send cart details to the API
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
                    window.location.href = '/myOrders';
                }, 500);
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
                alert("An error occurred. Please try again.");
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
                const parsedData = JSON.parse(data.body);
                console.log("Address updated successfully", parsedData.addresses)
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
            });
    };

    return (
        <section className="bg-white py-8 antialiase md:py-8">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                    <div className="min-w-0 flex-1 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-black">Delivery Details</h2>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-900 dark:text-black">First Name</label>
                                    <input type="text" id="firstName" name="firstName" value={formDetails.firstName} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" placeholder="Enter your first name" required />
                                </div>

                                <div>
                                    <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-900 dark:text-black">Last Name</label>
                                    <input type="text" id="lastName" name="lastName" value={formDetails.lastName} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" placeholder="Enter your last name" required />
                                </div>

                                <div>
                                    <label htmlFor="mobileNumber" className="mb-2 block text-sm font-medium text-gray-900 dark:text-black">Mobile Number</label>
                                    <input type="text" id="mobileNumber" name="mobileNumber" value={formDetails.mobileNumber} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" placeholder="Enter your mobile number" required />
                                </div>

                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-black">Email Address*</label>
                                    <input type="email" id="email" name="email" value={formDetails.email} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" placeholder="name@domain.com" required />
                                </div>

                                <div>
                                    <label htmlFor="state" className="mb-2 block text-sm font-medium text-gray-900 dark:text-black">State*</label>
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        <select id="state" name="state" value={formDetails.state} onChange={handleStateChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900">
                                            <option value="" disabled>Select a state</option>
                                            {state.map((state) => (
                                                <option key={state.id} value={state.id}>
                                                    {state.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-900 dark:text-black">City*</label>
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
                                    <label htmlFor="addressType" className="mb-2 block text-sm font-medium text-gray-900 dark:text-black">Address</label>
                                    <input type="text" id="addressType" name="addressType" value={formDetails.addressType} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" placeholder="Enter Address Here" required />
                                </div>

                                <div>
                                    <label htmlFor="landmark" className="mb-2 block text-sm font-medium text-gray-900 dark:text-black">Landmark*</label>
                                    <input type="text" id="landmark" name="landmark" value={formDetails.landmark} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" placeholder="Enter Landmark" required />
                                </div>

                                <div>
                                    <label htmlFor="postalCode" className="mb-2 block text-sm font-medium text-gray-900 dark:text-black">Postal Code*</label>
                                    <input type="text" id="postalCode" name="postalCode" value={formDetails.postalCode} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" placeholder="Enter Pincode" required />
                                </div>

                                <div>
                                    <label htmlFor="panCardNumber" className="mb-2 block text-sm font-medium text-gray-900 dark:text-black">Pan Card Number*</label>
                                    <input type="text" id="panCardNumber" name="panCardNumber" value={formDetails.panCardNumber} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" placeholder="ABCTY1234D" required />
                                </div>

                                <div>
                                    <label htmlFor="dob" className="mb-2 block text-sm font-medium text-gray-900 dark:text-black">DOB*</label>
                                    <input type="date" id="dob" name="dob" value={formDetails.dob} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" placeholder="dd-mm-yyyy" required />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="mt-10 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                        <div class="flow-root">
                            <div class="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                                <dl class="flex items-center justify-between gap-4 py-3">
                                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Item Price</dt>
                                    <dd class="text-base font-medium text-gray-900 dark:text-black">₹ {product.productPrice[0]?.finalProductPrice}</dd>
                                </dl>

                                <dl class="flex items-center justify-between gap-4 py-3">
                                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Quantity</dt>
                                    <dd class="text-base font-medium text-green-500">{quantity}</dd>
                                </dl>

                                <dl class="flex items-center justify-between gap-4 py-3">
                                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">GST 3% (Inclusive)</dt>
                                    <dd class="text-base font-medium text-gray-900 dark:text-black">₹ {(product.productPrice[0]?.finalProductPrice * 0.03 * quantity).toFixed(2)}
                                    </dd>
                                </dl>

                                <dl class="flex items-center justify-between gap-4 py-3">
                                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Shipping Price (Inclusive)</dt>
                                    <dd class="text-base font-medium text-gray-900 dark:text-black">₹ {product.shipping}</dd>
                                </dl>

                                <dl class="flex items-center justify-between gap-4 py-3">
                                    <dt class="text-base font-bold text-gray-900 dark:text-black">Total</dt>
                                    <dd class="text-base font-bold text-gray-900 dark:text-black">₹ {(product.productPrice[0]?.finalProductPrice * quantity).toFixed(2)}</dd>
                                </dl>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <button
                                onClick={() => { testingPhysicalOrderLambda() }} class="flex w-full items-center justify-center rounded-lg bg-[#0043e9] px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Payment</button>


                            <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Shipping price and tax are inclusive in the total price.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Address;
