import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

function ParticularProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({}); // Cart state
  const [quantity, setCartQuantity] = useState(1); // Initialize quantity

  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  const uniqueId = userInfo["custom:uniqueId"]
  // console.log("product", product)

  const getParticularProductFromAugmont = () => {
    fetch(`https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev/websiteApi/getParticularProductFromAugmont`, {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: productId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const parsedData = JSON.parse(data.body);
        console.log(parsedData)
        setProduct(parsedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (productId) {
      getParticularProductFromAugmont();
    }
  }, [productId]);

  const addToCart = (product) => {
    let sendData = {
      cart: product,
      uniqueId: uniqueId,
      getOrUpdate: 'update',
      wishlist: ""
    }
    // Now send cart details to the API
    fetch('https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev/websiteApi/wbesitePhysicalGoldCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Product added to cart:', data);
        alert("Product added to cart")
        // navigate(`/cartDetails`);
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  };

  const handleIncreaseQuantity = () => {
    setCartQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setCartQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };



  const handleBuyNow = () => {
    const totalPrice = product.productPrice[0]?.finalProductPrice * quantity;

    if (totalPrice > 180000) {
      alert('Total price exceeds ₹180,000. Please reduce the quantity.');
    } else {
      // Proceed to the cart details page
      handleBuy(totalPrice);
    }
  };

  const handleBuy = (totalPrice, quantity) => {

    const timestamp = new Date().getTime();
    const mid = 'mid' + uniqueId + '_' + timestamp;

    let sendData = {
      reference_id: mid,
      uniqueId: uniqueId,
      amount: totalPrice,
      phoneNumber: "6372681115",
      paymentType: 'physicalGold',
      quantity: 1,
      productId: cart.id,
      paymentTypeId: 4,
    }
    console.log("senddata", sendData);
    // Now send cart details to the API
    fetch('https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev//websiteApi/productBuyAndSaveInDB', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response', data);
        alert("Pyment Link Generated")

      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  };

  return (
    <>
      {/* <div>
        <h1>Product Details</h1>
        {loading ? (
          <p>Loading product details...</p>
        ) : product ? (
          <div style={{ border: '1px solid #ddd', padding: '20px', margin: '10px', width: '50%', margin: 'auto', display: 'flex' }}>
            <div>

              <img
                src={product.productImage}
                alt={product.productName}
                style={{ width: '100%', height: 'auto' }}
              />    </div>

            <div>
              <h3>{product.productName}</h3>
              <p>Weight: {product.weight} gm</p>
              <p>Price: ₹{product.productPrice[0]?.finalProductPrice}</p>
              <p>{product.metaDescription}</p>
              <button onClick={() => addToCart(product)} style={{ backgroundColor: 'red', padding: 5, marginTop: 10 }}>Add to cart</button>
              <button
                onClick={() => {
                  navigate(`/cartDetails`);
                }}
                style={{ backgroundColor: 'red', padding: 5, marginTop: 10 }}
              >
                Cart
              </button>

            </div>
          </div>


        ) : (
          <p>Product not found or unable to load details.</p>
        )}
      </div> */}

      {/* <Link
        to="/"
        className="flex items-center gap-2 text-lg text-black ml-10"
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className=""
        />
        Back
      </Link> */}


      {/* {!loading && product && Object.keys(product).length > 0 && (
        <section class="relative ">
          <div class="w-full mt-8 mx-auto px-4 sm:px-6 lg:px-0">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-32 mx-auto max-md:px-2 ">
              <div class="img-box h-full max-lg:mx-auto ">
                <img src={"https://gold-loan-uat-new-org.s3.ap-south-1.amazonaws.com/products/1658816665496.jpeg"} alt=""
                  class="max-lg:mx-auto lg:ml-auto h-4/6 object-cover border border-newDarkGold" />
              </div>
             
              <div>
                <div class="data w-full max-w-xl">
                  <h2 class="font-inter font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">{product.productName}</h2>
                  <h3></h3>
                  <div class="flex flex-col sm:flex-row sm:items-center mb-6">
                    <h6
                      class="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                      ₹{product.productPrice[0]?.finalProductPrice}</h6>
                    <div class="flex items-center gap-2">
                      <div class="flex items-center gap-1">
                        Weight : {product.weight} gm  Catagory : {product.subCategory.subCategoryName}


                      </div>
                      <span class="pl-2 font-normal leading-7 text-gray-500 text-sm "> SKU : {product.sku}</span>
                    </div>

                  </div>
                  <p class="text-gray-500 text-base font-normal mb-5">
                    {product.metaDescription}
                  </p>
                  
                  <h6 class="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                    Total Price: ₹{(product.productPrice[0]?.finalProductPrice * quantity).toFixed(2)}                      </h6>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 py-8">
                    <div class="flex sm:items-center sm:justify-center w-full">
                      <button onClick={handleDecreaseQuantity}
                        class="group py-4 px-6 border border-gray-400 rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300">
                        <svg class="stroke-gray-900 group-hover:stroke-black" width="22" height="22"
                          viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.5 11H5.5" stroke="" stroke-width="1.6" stroke-linecap="round" />
                          <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                            stroke-linecap="round" />
                          <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                            stroke-linecap="round" />
                        </svg>
                      </button>
                      <p class="font-semibold text-gray-900 cursor-pointer text-lg py-[13px] px-6 w-full sm:max-w-[118px] outline-0 border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50"> {quantity}</p>

                      <button onClick={handleIncreaseQuantity}
                        class="group py-4 px-6 border border-gray-400 rounded-r-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300">
                        <svg class="stroke-gray-900 group-hover:stroke-black" width="22" height="22"
                          viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11 5.5V16.5M16.5 11H5.5" stroke="#9CA3AF" stroke-width="1.6"
                            stroke-linecap="round" />
                          <path d="M11 5.5V16.5M16.5 11H5.5" stroke="black" stroke-opacity="0.2"
                            stroke-width="1.6" stroke-linecap="round" />
                          <path d="M11 5.5V16.5M16.5 11H5.5" stroke="black" stroke-opacity="0.2"
                            stroke-width="1.6" stroke-linecap="round" />
                        </svg>
                      </button>
                    </div>

                  </div>
                  <div class="flex items-center gap-3">
                    <button
                      class="group transition-all duration-500 p-4 rounded-full bg-indigo-50 hover:bg-indigo-100 hover:shadow-sm hover:shadow-indigo-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"
                        fill="none">
                        <path
                          d="M4.47084 14.3196L13.0281 22.7501L21.9599 13.9506M13.0034 5.07888C15.4786 2.64037 19.5008 2.64037 21.976 5.07888C24.4511 7.5254 24.4511 11.4799 21.9841 13.9265M12.9956 5.07888C10.5204 2.64037 6.49824 2.64037 4.02307 5.07888C1.54789 7.51738 1.54789 11.4799 4.02307 13.9184M4.02307 13.9184L4.04407 13.939M4.02307 13.9184L4.46274 14.3115"
                          stroke="#4F46E5" stroke-width="1.6" stroke-miterlimit="10"
                          stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                    </button>
                    <button
                      onClick={() => {
                        navigate('/address', { state: { product, quantity } });
                      }}
                      class="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )} */}

      <Navbar />

      {!loading && <>
        <div className=" lg:flex-row items-start p-8 max-w-7xl mx-auto">
          {/* Left Content */}

          <Link
            to="/"
            className="flex items-center gap-2 text-black mb-8 font-poppins"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className=""
            />
            Back
          </Link>
          <nav className="flex items-center gap-2 text-gray-500 mb-8 font-poppins">
            <span>{product && product.subCategory?.category.categoryName}</span> / <span>{product && product.subCategory?.subCategoryName}</span>
          </nav>

          <div className='flex flex-col-reverse md:flex-row'>
            <div className="lg:w-1/2 sm:pr-8 mt-8">
              {/* Product Title */}
              <h1 className="text-xl sm:text-4xl font-poppins font-semibold mb-4">{product.productName}</h1>
              {/* <h3 className='text-2xl font-poppins font-medium mb-8'>(911 Purity)</h3> */}

              <div className='flex gap-2 mb-8'>
                <h3 className='text-base sm:text-base font-poppins font-regular'>Product Weight :</h3>
                <h3 className='text-base sm:text-base font-poppins font-medium'>{product.weight} grams</h3>
              </div>

              {/* Price and Reviews */}
              <div className="flex flex-col mb-4">
                <span className="text-lg md:text-xl font-medium font-poppins mb-4 text-newDarkBlue">₹ {product?.productPrice?.[0]?.finalProductPrice}</span>
                {/* <span className="ml-4 text-yellow-500 flex items-center">
              ★★★★☆ <span className="ml-1 text-gray-500">(1624 reviews)</span>
            </span> */}

                <span className="text-base md:text-xl font-light text-gray-400">(MRP inclusive of all taxes)</span>
              </div>


              <div className=" space-y-4 mb-8">
                <div className="inline-flex items-center space-x-5 border rounded-lg px-6 py-2 w-auto">
                  <button onClick={handleDecreaseQuantity} className="text-xl">-</button>
                  <span className='text-xl'>{quantity}</span>
                  <button onClick={handleIncreaseQuantity} className="text-xl">+</button>
                </div>

                <div>
                  <button onClick={() => {
                    navigate('/address', { state: { product, quantity } });
                  }}
                    className="bg-gradient-to-r from-newDarkBlue via-newLightBlue to-newDarkBlue text-white hover:text-newLightGold font-bold py-3 px-6 rounded-md">
                    Buy now →
                  </button>
                </div>
              </div>

              <div className="border border-newDarkGold text-newDarkBlue rounded-lg p-4 w-full">
                <h2 className="text-lg sm:text-2xl font-semibold font-poppins mb-4">Product Properties</h2>
                <div className="grid grid-cols-2  justify-between items-center">
                  <div>
                    <p className="text-base sm:text-lg font-semibold">{product.sku}</p>
                    <p className="text-sm text-newLightBlue font-poppins font-regular">SKU</p>
                  </div>

                  <div>
                    <p className="text-base sm:text-lg font-semibold font-poppins">{product && product.subCategory?.category.metalType.metalType.toUpperCase()}</p>
                    <p className="text-sm text-newLightBlue font-poppins font-regular">Metal Type</p>
                  </div>
                </div>
              </div>

            </div>

            <div className="md:w-1/2 mt-4 lg:mt-0">
              <img
                src={product && product.productImage}
                alt="Everyday Ruck Snack"
                className="rounded-lg border border-newDarkGold"
              />
            </div>
          </div>
        </div>

        <div className=" z-20 fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <p className="text-lg font-medium">Price</p>
              <p className="text-2xl font-semibold">₹{product?.productPrice?.[0]?.finalProductPrice * quantity} <span className="text-sm font-normal">MRP Inclusive of all taxes</span></p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4 border rounded-lg px-3 py-1">
                <button onClick={handleDecreaseQuantity} className="text-xl">-</button>
                <span>{quantity}</span>
                <button onClick={handleIncreaseQuantity} className="text-xl">+</button>
              </div>

              <button onClick={() => {
                navigate('/address', { state: { product, quantity } });
              }}
                className="bg-gradient-to-r from-newDarkBlue via-newLightBlue to-newDarkBlue text-white hover:text-newLightGold font-bold py-3 px-6 rounded-md">
                Buy now →</button>
            </div>
          </div>
        </div>
      </>
      }
      {loading &&
        <p className='ml-20 mt-20'> Loading product details...</p >
      }

      <div className='mb-20'>
        <Footer />
      </div>

    </>


  );
}

export default ParticularProduct;
