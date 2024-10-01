// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Link, useNavigate } from 'react-router-dom'
// function CartPage() {
//     const [quantity, setCartQuantity] = useState(1)

//     const uniqueId = "123456";
//     const [cart, setcart] = useState([])
//     const [loading, setLoading] = useState(true);

//     const wbesitePhysicalGoldCart = () => {
//         fetch(`https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev/websiteApi/wbesitePhysicalGoldCart`, {
//             method: 'POST',
//             crossDomain: true,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 uniqueId: uniqueId,
//                 getOrUpdate: "get"
//             }),
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 const parsedData = data.body
//                 setcart(JSON.parse(parsedData.cart))
//                 const wishList = JSON.parse(parsedData.wishlist)
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error('There was a problem with the fetch operation:', error);
//                 setLoading(false);
//             });
//     };

//     useEffect(() => {
//         wbesitePhysicalGoldCart();
//     });
//     return (
//         <div>
//             <h1>Product Details</h1>
//             {loading ? (
//                 <p>Loading product details...</p>
//             ) : cart ? (
//                 <div style={{ border: '1px solid #ddd', padding: '20px', margin: '10px', width: '50%', margin: 'auto', display: 'flex' }}>
//                     <div>

//                         <img
//                             src={cart.productImage}
//                             alt={cart.productName}
//                             style={{ width: '100%', height: 'auto' }}
//                         />    </div>

//                     <div>
//                         <h3>{cart.productName}</h3>
//                         <p>Weight: {cart.weight} gm</p>
//                         <p>Price: ₹{cart.productPrice[0]?.finalProductPrice}</p>
//                         <p>Quantity : 2</p>
//                         <p>{cart.metaDescription}</p>
//                         <button
//                             onClick={() => {
//                                 navigate(`/cartDetails`);
//                             }}
//                             style={{ backgroundColor: 'red', padding: 5, marginTop: 10 }}
//                         >
//                             Buy Now
//                         </button>

//                     </div>
//                 </div>


//             ) : (
//                 <p>Product not found or unable to load details.</p>
//             )}
//         </div>
//     )
// }

// export default CartPage


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CartPage() {
    const [quantity, setCartQuantity] = useState(1); // Initialize quantity
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    const uniqueId = userInfo["custom:uniqueId"]
    const [cart, setcart] = useState(null); // Initialize cart as null
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    console.log("cart", cart)
    const wbesitePhysicalGoldCart = () => {
        fetch(`https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev/websiteApi/wbesitePhysicalGoldCart`, {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uniqueId: uniqueId,
                getOrUpdate: "get"
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const parsedData = data.body;
                setcart(JSON.parse(parsedData.cart));
                setLoading(false);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        wbesitePhysicalGoldCart();
    }, []); // Make sure the effect runs only once

    const handleIncreaseQuantity = () => {
        setCartQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecreaseQuantity = () => {
        setCartQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleBuyNow = () => {
        const totalPrice = cart.productPrice[0]?.finalProductPrice * quantity;

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
        <div>
            <h1>Product Details</h1>
            {loading ? (
                <p>Loading product details...</p>
            ) : cart ? (
                <div style={{ border: '1px solid #ddd', padding: '20px', margin: '10px', width: '50%', margin: 'auto', display: 'flex' }}>
                    <div>
                        <img
                            src={cart.productImage}
                            alt={cart.productName}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>

                    <div>
                        <h3>{cart.productName}</h3>
                        <p>Weight: {cart.weight} gm</p>
                        <p>Price per unit: ₹{cart.productPrice[0]?.finalProductPrice}</p>
                        <p>
                            Total Price: ₹{(cart.productPrice[0]?.finalProductPrice * quantity).toFixed(2)}
                        </p>
                        <p>{cart.metaDescription}</p>

                        {/* Quantity Management */}
                        <div style={{ marginTop: '10px' }}>
                            <button onClick={handleDecreaseQuantity} style={{ padding: '5px', marginRight: '10px' }}>
                                -
                            </button>
                            <span>{quantity}</span>
                            <button onClick={handleIncreaseQuantity} style={{ padding: '5px', marginLeft: '10px' }}>
                                +
                            </button>
                        </div>

                        <button
                            onClick={handleBuyNow} // Check for the total price here
                            style={{ backgroundColor: 'red', padding: 5, marginTop: 10 }}
                        >
                            Buy Now
                        </button>

                    </div>
                </div>
            ) : (
                <p>Product not found or unable to load details.</p>
            )}
        </div>
    );
}

export default CartPage;
