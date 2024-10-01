import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import coinImage from '../../assets/images/unset.png';
import bracalet from '../../assets/images/bracalet.png';
import goldCoinImage from '../../assets/images/GoldCoinLaxmiGanesh.png';




const AllProduct = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]); // Initialize state to store products
    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [bracalets, setBracalets] = useState([]);
    const [goldCoin, setGoldCoin] = useState([]);

    const getAllProductFromAugmont = (categoryId) => {
        fetch(`https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev/getAllProductFromAugmont`, {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ categoryId: categoryId }), // Empty body since no params are needed
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
                setProducts(parsedData.data)
            })
            .catch((error) => {
                console.error("There was a problem with the fetch operation:", error);
            });
    };

    const bracelates = () => {
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
                setBracalets(parsedData.data)
            })
            .catch((error) => {
                console.error("There was a problem with the fetch operation:", error);
            });
    };

    const goldCoinFunction = () => {
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


    const getProductSubCategoryFromAugmont = () => {
        fetch(`https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev/websiteApi/getProductSubCategoryFromAugmont`, {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}), // Empty body since no params are needed
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const parsedData = JSON.parse(data.body);
                console.log("API Response:", parsedData.data);
                setCategory(parsedData.data);
            })
            .catch((error) => {
                console.error("There was a problem with the fetch operation:", error);
            });
    };

    useEffect(() => {
        // getProductSubCategoryFromAugmont();
        bracelates()
        goldCoinFunction()
    }, []);

    return (
        <div>
            <section className="mx-auto gap-12 text-gray-600 overflow-hidden md:px-8 md:flex justify-evenly items-center bg-[#F0F7FA]">
                <div className='flex-col space-y-5 max-w-2xl mt-10 '>
                    <h2 className="text-4xl text-[#05226b] font-extrabold sm:text-5xl  font-poppins text-center sm:text-start">
                        Check out our exquisite <span style={{ fontWeight: "600", color: "#d69a2d" }}> <br />Gold Ornaments <br /></span> Collection
                    </h2>
                    <p className='text-center sm:text-start text-xl font-poppins font-medium'>
                        Give yourself a more sophisticated and elegant look with our stunning gold ornaments collection.
                    </p>

                </div>
                <div className=''>
                    <img src={coinImage} className="lg:max-w-lg md:max-w-sm" />
                </div>
            </section>

            {/* <section className="mx-auto overflow-hidden  px-3, py-8 md:px-8 md:flex justify-evenly items-center bg-[#0F3444]">

                <div className=''>
                    <img src={bracalet} className="lg:max-w-md md:max-w-sm" />
                </div>
                <div className=''>
                    <img src={bracalet} className="lg:max-w-md md:max-w-sm" />
                </div>


                <div className=''>
                    <img src={goldCoinImage} className="lg:max-w-md md:max-w-sm" />
                </div>
            </section> */}

            {/* <div className="mx-auto gap-12 text-gray-600 overflow-hidden md:px-8 md:flex justify-evenly items-center bg-[#F0F7FA]">

                <div>
                    <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
                        <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={coinImage} alt="" />
                        <div class="flex flex-col justify-between p-4 leading-normal">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </div>
                    </a>
                </div>
                <div>
                    <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
                        <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={coinImage} alt="" />
                        <div class="flex flex-col justify-between p-4 leading-normal">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </div>
                    </a>
                </div>


            </div> */}



            {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {category.length > 0 ? (
                    category
                        .filter((category) => category.id === 5 || category.id === 11)
                        .map((filteredCategory) => (
                            <button
                                key={filteredCategory.id}
                                onClick={() => getAllProductFromAugmont(filteredCategory.id)}
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '20px',
                                    margin: '10px',
                                    width: '250px',
                                }}
                            >
                                <h3>{filteredCategory.subCategoryName}</h3>
                            </button>
                        ))
                ) : (
                    <p>Loading products...</p>
                )}
            </div> */}



            {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} style={{ border: '1px solid #ddd', padding: '20px', margin: '10px', width: '250px' }}>
                            <img
                                src={product.productImage}
                                alt={product.productName}
                                style={{ width: '100%', height: 'auto' }}
                            />
                            <h3>{product.productName}</h3>
                            <p>Weight: {product.weight} gm</p>
                            <p>Price: ₹{product.productPrice[0]?.finalProductPrice}</p>
                            <p>{product.metaDescription}</p>
                            <div style={{ backgroundColor: 'red', justifyContent: 'space-around' }}>
                                <button onClick={() => {
                                    navigate(`/getProductDetails/${product.id}`);
                                }}>
                                    View Details
                                </button>

                                <button >
                                    Buy Now
                                </button>
                            </div>


                        </div>
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </div> */}


            <div style={{ display: 'flex', flexWrap: 'wrap', width: "90%", margin: 'auto' }}>
                {bracalets.length > 0 ? (
                    bracalets.map((product) => (
                        <div key={product.id} style={{ border: '1px solid #ddd', padding: '20px', margin: '10px', width: '250px' }}>
                            <img
                                src={product.productImage}
                                alt={product.productName}
                                style={{ width: '100%', height: 'auto' }}
                            />
                            <h3>{product.productName}</h3>
                            <p>Weight: {product.weight} gm</p>
                            <p>Price: ₹{product.productPrice[0]?.finalProductPrice}</p>
                            <p>{product.metaDescription}</p>
                            <div style={{ padding: 5, display: 'flex', justifyContent: 'space-between' }}>
                                <button
                                    style={{ backgroundColor: '#0F3444', color: 'white', padding: 5, fontSize: 12, borderRadius: 10 }}
                                    onClick={() => {
                                        navigate(`/getProductDetails/${product.id}`);
                                    }}
                                >
                                    View Details
                                </button>

                                {/* <button style={{ backgroundColor: '#d69a2d', color: 'white', padding: 5, fontSize: 12, borderRadius: 10 }}>
                                    Buy Now
                                </button> */}
                            </div>



                        </div>
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', width: "90%", margin: 'auto' }}>

                {goldCoin.length > 0 ? (
                    goldCoin.map((product) => (
                        <div key={product.id} style={{ border: '1px solid #ddd', padding: '20px', margin: '10px', width: '250px' }}>
                            <img
                                src={product.productImage}
                                alt={product.productName}
                                style={{ width: '100%', height: 'auto' }}
                            />
                            <h3>{product.productName}</h3>
                            <p>Weight: {product.weight} gm</p>
                            <p>Price: ₹{product.productPrice[0]?.finalProductPrice}</p>
                            <p>{product.metaDescription}</p>
                            <div style={{ padding: 5, display: 'flex', justifyContent: 'space-between' }}>
                                <button
                                    style={{ backgroundColor: '#0F3444', color: 'white', padding: 5, fontSize: 12, borderRadius: 10 }}
                                    onClick={() => {
                                        navigate(`/getProductDetails/${product.id}`);
                                    }}
                                >
                                    View Details
                                </button>

                                {/* <button style={{ backgroundColor: '#d69a2d', color: 'white', padding: 5, fontSize: 12, borderRadius: 10 }}>
                                    Buy Now
                                </button> */}
                            </div>


                        </div>
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </div>
        </div>
    );
}

export default AllProduct;
