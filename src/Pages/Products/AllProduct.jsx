import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import coinImage from '../../assets/images/unset.png';
import HomeCoin from '../../assets/images/HomeCoin!.png';
import bracalet from '../../assets/NewImages/Bracelets.png';
import GoldCoin from '../../assets/NewImages/GoldCoin.png';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Typography, Button, Divider, styled } from "@mui/material";
import Countdown from "react-countdown";
import Skeleton from '@mui/material/Skeleton';
import BIS from "../../assets/images/BIS.png";
import NABL from "../../assets/images/NABL.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShieldHalved } from '@fortawesome/free-solid-svg-icons';

// import Countdown from "react-countdown";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const Componant = styled(Typography)`
  margin-top: 10px;
  background-color: #ffffff;
`;
const Deal = styled(Typography)`
  padding: 15px 20px;
  display: flex;
`;

const Timer = styled(Box)`
  display: flex;
  margin-left: 10px;
  align-items: center;
  color: #7f7f7f;
`;

const DaelText = styled(Typography)`
  font-size: 22px;
  font-weight: 600;
  margin-right: 25px;
  line-height: 32px;
`;
const ViewAllButton = styled(Button)`
  margin-left : auto;
  background-color: #103343;
  border-radius: 2px;
  font size:13px;
  font-weight:600;
 font-family:Poppins

`;

const Image = styled("img")({
    width: "auto",
    height: 150,
});

const Text = styled(Typography)`
  font-size: 14px;
  margin-top: 5px;
`;

const Componant1 = styled(Box)`
    display: flex;
`

const LeftComponant = styled(Box)(({ theme }) => ({
    width: '83%',
    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
}))

const RightComponant = styled(Box)(({ theme }) => ({
    background: "#FFFFFF",
    padding: 5,
    marginTop: 10,
    marginLeft: 10,
    width: "17%",
    textAlign: "center",
    [theme.breakpoints.down('md')]: {
        display: "none"
    }
}))





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


    const timerURL =
        "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";

    const renderer = ({ hours, minutes, seconds }) => {
        return (
            <Box variant="span">
                {hours} : {minutes} : {seconds} Left
            </Box>
        );
    };


    const [isViewAll, setIsViewAll] = useState(false);

    const handleViewAllClick = () => {
        setIsViewAll((prev) => !prev);
    };



    const features = [
        {
            icon:
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>,
            title: "BIS Hallmark",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue."
        },
        {
            icon:
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>,
            title: "100% Secured",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue."
        },
        {
            icon:
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                </svg>,
            title: "24k Pure Gold",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue."
        },
    ]

    const securedBy = [
        {
            icon:
                <img src={BIS} className=' size-10' />,
            title: "BIS",
            desc: "Hallmarked"
        },
        {
            icon:
                <img src={NABL} className=' size-10' />,
            title: "NABL",
            desc: "Accredited"
        },
        // {
        //     icon: <FontAwesomeIcon icon={faShieldHalved} className='size-8' />,
        //     title: "Insured By",
        //     desc: "ICICI Lombard"
        // },
    ]


    return (
        <div>

            <Navbar />

            {/* 
            <Carousel
                responsive={responsiveBanner}
                swipeable={false}
                draggable={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                slidesToSlide={1}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                containerClass="carousel-container"
            >
                {
                    bannerData.map(data => (
                        <ImageBanner src={data.url} alt="bannner" />
                    ))
                }
            </Carousel> */}


            <section className="mx-auto gap-12 text-gray-600 overflow-hidden md:px-8 md:flex justify-evenly items-center bg-[#F0F7FA]">
                <div className='flex-col space-y-5 max-w-2xl mt-10 '>
                    <h2 className="text-4xl text-[#05226b] font-extrabold sm:text-5xl  font-poppins text-center sm:text-start">
                        Check out our exquisite <span style={{ fontWeight: "600", color: "#d69a2d" }}> <br />Gold Ornaments <br /></span> Collection
                    </h2>
                    <p className='text-center sm:text-start text-xl font-poppins font-medium'>
                        Give yourself a more sophisticated and elegant look with our stunning gold ornaments collection.
                    </p>



                    <ul className="flex flex-col sm:flex-row justify-start gap-y-2 sm:gap-y-0 gap-x-0 md:gap-x-4">
                        {
                            securedBy.map((item, idx) => (
                                <li key={idx} className="p-1 sm:p-2 rounded-lg  flex items-center gap-x-2  bg-newLightGold text-newDarkBlue ">
                                    <div className="flex-none size-10 text-newDarkBlue flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-sm sm:text-sm font-medium font-poppins">
                                        {item.title} {" "}{item.desc}

                                    </h4>
                                </li>
                            ))
                        }
                    </ul>

                </div>
                <div className=''>
                    <img src={coinImage} className="lg:max-w-lg md:max-w-sm" />
                </div>
            </section>


            <Componant1>
                <LeftComponant>
                    <Componant>
                        <Deal>
                            <DaelText>Buy Gold Coin With High Discount Price</DaelText>
                            <Timer>
                                <img src={timerURL} alt="timer" style={{ width: 24 }} />
                                <Countdown date={Date.now() + 5.04e7} renderer={renderer} />
                            </Timer>
                            <ViewAllButton variant="contained" onClick={handleViewAllClick}>
                                {isViewAll ? "Hide All" : "View All"}
                            </ViewAllButton>
                        </Deal>
                        <Divider />

                        {goldCoin && goldCoin.length > 0 ? (
                            isViewAll ? (
                                <div style={{ display: 'flex', flexWrap: 'wrap', width: "90%", margin: 'auto' }}>
                                    {goldCoin.map((product) => (
                                        <div key={product.id} style={{ border: '1px solid #ddd', padding: '20px', margin: '10px', width: '250px' }}>
                                            <img
                                                src={product.productImage}
                                                alt={product.productName}
                                                style={{ width: '100%', height: 'auto' }}
                                            />
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

                                                <button style={{ backgroundColor: '#d69a2d', color: 'white', padding: 5, fontSize: 12, borderRadius: 10 }}>
                                                    Buy Now
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Carousel
                                    responsive={responsive}
                                    swipeable={false}
                                    draggable={false}
                                    infinite={true}
                                    autoPlay={true}
                                    autoPlaySpeed={4000}
                                    keyBoardControl={true}
                                    centerMode={true}
                                    dotListClass="custom-dot-list-style"
                                    itemClass="carousel-item-padding-40-px"
                                    containerClass="carousel-container"
                                >
                                    {goldCoin.map((product) => (
                                        <Button onClick={() => navigate(`/getProductDetails/${product.id}`)} key={product.id}>
                                            <Box textAlign="center" style={{ padding: "25px 13px" }}>
                                                <Image src={product.productImage} alt={product.productName} style={{ alignItems: 'center' }} />
                                                <Text style={{ color: "green" }}>Weight: {product.weight} gm</Text>
                                                <Text style={{ color: "#212121", opacity: ".6" }}>
                                                    ₹{product.productPrice[0]?.finalProductPrice}
                                                </Text>
                                            </Box>
                                        </Button>
                                    ))}
                                </Carousel>
                            )
                        ) : (
                            <Skeleton animation="wave" />
                        )}
                    </Componant>
                </LeftComponant>
                <RightComponant>
                    <img src={HomeCoin} alt="ad" style={{ width: 217 }} />
                </RightComponant>
            </Componant1>


            <section className="mx-auto text-gray-600 overflow-hidden md:px-8 md:flex justify-evenly items-center bg-[#F0F7FA]">

                <div className=''>
                    <img src={bracalet} className="lg:max-w-md md:max-w-sm" />
                </div>

                <div className='flex-col space-y-5 max-w-2xl mt-10 text-center'>
                    <h2 className="text-4xl text-[#05226b] font-extrabold sm:text-4xl  font-poppins text-center sm:text-center">
                        Check out our exquisite <span style={{ fontWeight: "600", color: "#d69a2d" }}>Gold Ornaments</span> Collection
                    </h2>
                    <p className='text-center sm:text-center text-xl font-poppins font-medium'>
                        Give yourself a more sophisticated and elegant look with our stunning gold ornaments collection.
                    </p>

                </div>
                <div className=''>
                    <img src={GoldCoin} className="lg:max-w-md md:max-w-sm" />
                </div>
            </section>

            <section className="relative py-28 bg-[#183043]">
                <div className="relative z-10 max-w-screen-xl mx-auto px-4 text-gray-300 justify-between gap-24 lg:flex md:px-8">
                    <div className="max-w-xl">
                        <h3 className="text-white text-3xl font-semibold sm:text-4xl">
                            Do more with less complexity
                        </h3>
                        <p className="mt-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus
                        </p>
                    </div>
                    <div className="mt-12 lg:mt-0">
                        <ul className="grid gap-8 sm:grid-cols-2">
                            {
                                features.map((item, idx) => (
                                    <li key={idx} className="flex gap-x-4">
                                        <div className="flex-none w-12 h-12 bg-[#E2AD5E] text-[#183043] rounded-lg flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-lg text-gray-100 font-semibold">
                                                {item.title}
                                            </h4>
                                            <p className="mt-3">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="absolute inset-0 max-w-md mx-auto h-72 blur-[118px]" style={{ background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)" }}></div>
            </section>

            <Componant1>
                <LeftComponant>
                    <Componant>
                        <Deal>
                            <DaelText>Buy Gold Coin With High Discount Price</DaelText>
                            <Timer>
                                <img src={timerURL} alt="timer" style={{ width: 24 }} />
                                <Countdown date={Date.now() + 5.04e7} renderer={renderer} />
                            </Timer>
                            <ViewAllButton variant="contained" onClick={handleViewAllClick}>
                                {isViewAll ? "Hide All" : "View All"}
                            </ViewAllButton>
                        </Deal>
                        <Divider />

                        {bracalets && bracalets.length > 0 ? (
                            isViewAll ? (
                                <div style={{ display: 'flex', flexWrap: 'wrap', width: "90%", margin: 'auto' }}>
                                    {bracalets.map((product) => (
                                        <div key={product.id} style={{ border: '1px solid #ddd', padding: '20px', margin: '10px', width: '250px' }}>
                                            <img
                                                src={product.productImage}
                                                alt={product.productName}
                                                style={{ width: '100%', height: 'auto' }}
                                            />
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

                                                <button style={{ backgroundColor: '#d69a2d', color: 'white', padding: 5, fontSize: 12, borderRadius: 10 }}>
                                                    Buy Now
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Carousel
                                    responsive={responsive}
                                    swipeable={false}
                                    draggable={false}
                                    infinite={true}
                                    autoPlay={true}
                                    autoPlaySpeed={4000}
                                    keyBoardControl={true}
                                    centerMode={true}
                                    dotListClass="custom-dot-list-style"
                                    itemClass="carousel-item-padding-40-px"
                                    containerClass="carousel-container"
                                >
                                    {bracalets.map((product) => (
                                        <Button onClick={() => navigate(`/getProductDetails/${product.id}`)} key={product.id}>
                                            <Box textAlign="center" style={{ padding: "25px 13px" }}>
                                                <Image src={product.productImage} alt={product.productName} style={{ alignItems: 'center' }} />
                                                <Text style={{ color: "green" }}>Weight: {product.weight} gm</Text>
                                                <Text style={{ color: "#212121", opacity: ".6" }}>
                                                    ₹{product.productPrice[0]?.finalProductPrice}
                                                </Text>
                                            </Box>
                                        </Button>
                                    ))}
                                </Carousel>
                            )
                        ) : (
                            <Skeleton animation="wave" />
                        )}
                    </Componant>
                </LeftComponant>
                <RightComponant>
                    <img src={HomeCoin} alt="ad" style={{ width: 217 }} />
                </RightComponant>
            </Componant1>

            <Footer />

        </div>
    );
}

export default AllProduct;
