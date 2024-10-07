import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ProductCard = ({ product, navigate }) => {
    return (
        <div onClick={() => navigate(`/getProductDetails/${product.id}`)}
            key={product.id} className="border border-newDarkGold shadow-sm shadow-newDarkGold rounded-lg p-4 m-4 lg:w-full font-poppins">
            <img
                src={product && product.productImage !== "0" ? product.productImage : "https://via.placeholder.com/201x201.png?text=loading..."}
                alt={product.productName}
                className="w-full h-auto"
            />
            <p className="mt-2 font-poppins">Weight: {product.weight} gm</p>
            <p className="font-medium font-poppins">Price: ₹ {product.productPrice[0]?.finalProductPrice}</p>
            <p className="text-gray-600">{product.metaDescription}</p>
            <button
                className="bg-newDarkBlue text-white py-1 px-2 text-sm rounded mt-2 self-center"
                onClick={() => navigate(`/getProductDetails/${product.id}`)}
            >
                View Details
            </button>
        </div>
    );
};

const ListAllProducts = () => {
    const navigate = useNavigate();

    const [bracelets, setBracelets] = useState([]);
    const [goldCoin, setGoldCoin] = useState([]);


    useEffect(() => {
        getBracelates();
        getGoldCoins();
    }, []);


    const getBracelates = () => {
        fetch(`https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev/getAllProductFromAugmont`, {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ categoryId: 5 }), // Empty body since no params are needed
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const parsedData = JSON.parse(data.body);
                console.log("Produucts:", parsedData.data); // Log the entire response
                setBracelets(parsedData.data)
            })
            .catch((error) => {
                console.error("There was a problem with the fetch operation:", error);
            });
    };

    const getGoldCoins = () => {
        fetch(`https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev/getAllProductFromAugmont`, {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ categoryId: 11 }), // Empty body since no params are needed
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const parsedData = JSON.parse(data.body);
                console.log("Produucts:", parsedData.data); // Log the entire response
                setGoldCoin(parsedData.data)
            })
            .catch((error) => {
                console.error("There was a problem with the fetch operation:", error);
            });
    };

    return (

        <>
            <Navbar />
            <div className="w-4/5 mx-auto mt-10">

                <h1 className="text-2xl font-semibold mt-4 font-poppins">Bracelets</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4">
                    {bracelets.map((product) => (
                        <ProductCard key={product.id} product={product} navigate={navigate} />
                    ))}
                </div>

                <h1 className="text-2xl font-semibold mt-4 font-poppins">Gold Coins</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {goldCoin.map((product) => (
                        <ProductCard key={product.id} product={product} navigate={navigate} />
                    ))}
                </div>


            </div>
            <Footer />
        </>
    );
};

export default ListAllProducts;
