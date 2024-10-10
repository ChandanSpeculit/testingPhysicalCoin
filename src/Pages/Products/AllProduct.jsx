import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import coinImage from '../../assets/images/unset.png';
import HomeCoin from '../../assets/images/HomeCoin!.png';
import bracalet from '../../assets/NewImages/Bracelets.png';
import GoldBracelets from '../../assets/NewImages/GoldBracelets.png';
import GoldCoin from '../../assets/NewImages/GoldCoin.png';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Typography, Button, Divider, styled, CircularProgress } from "@mui/material";
import BIS from "../../assets/images/BIS.png";
import NABL from "../../assets/images/NABL.png";
import appStoreButton from "../../assets/images/App Store.png"
import playStoreButton from "../../assets/images/Play Store.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import {API_GATEWAY} from "../../env"


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
  font-size: 16px;
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

    const [isViewAll, setIsViewAll] = useState(false);

    const handleViewAllClick = () => {
        navigate('/ListAllProducts')
    };



    const features = [
        {
            icon:
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>,
            title: "BIS Hallmark",
            desc: "Bureau of Indian Standards ensures Gold hallmarking that certifies the purity of Gold."
        },
        {
            icon:
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>,
            title: "100% Secured",
            desc: "Your peace of mind is our top priority. Fiydaa employs rigorous security measures to safeguard your investment every step of the way"
        },
        {
            icon:
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                </svg>,
            title: "24k Pure Gold",
            desc: "Transparency is the cornerstone of our service. With Fiydaa, you get real-time access to accurate and up-to-date information on gold prices, transaction history, and account statements."
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
        {
            icon: <FontAwesomeIcon icon={faShieldHalved} className='size-8' />,
            title: "Insured By",
            desc: "ICICI Lombard"
        },
    ]


    const handleClick = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        let url;

        // Detect iOS
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            url = 'https://apps.apple.com/in/app/fiydaa-fintech-hub-by-speculit/id6475651556';
        }
        // Detect Android
        else if (/android/i.test(userAgent)) {
            url = 'https://play.google.com/store/apps/details?id=com.fiydaa&pcampaignid=web_share';
        }
        // Detect macOS
        else if (navigator.platform.toLowerCase().includes('mac')) {
            url = 'https://apps.apple.com/in/app/fiydaa-fintech-hub-by-speculit/id6475651556';
        }
        // Default to Play Store for other platforms (e.g., Windows)
        else {
            url = 'https://play.google.com/store/apps/details?id=com.fiydaa&pcampaignid=web_share';
        }

        window.open(url, '_blank');
    };




    return (
        <div>

            <Navbar />


            <section className="mx-auto gap-12 text-gray-600 overflow-hidden px-4 md:px-8 flex flex-col md:flex-row justify-evenly items-center bg-[#F0F7FA]">
                <div className="flex-col space-y-5 max-w-2xl mt-10 w-full md:w-1/2">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#05226b] font-extrabold leading-relaxed font-poppins text-center md:text-start">
                        Check out our exquisite <span style={{ fontWeight: "600", color: "#d69a2d" }}> <br />Gold Ornaments <br /></span> Collection
                    </h2>
                    <p className="text-center md:text-start text-lg md:text-xl font-poppins font-medium">
                        Give yourself a more sophisticated and elegant look with our stunning gold ornaments collection.
                    </p>

                    <ul className="flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 gap-x-0 md:gap-x-4 justify-center md:justify-start">
                        {securedBy.map((item, idx) => (
                            <li key={idx} className="p-2 rounded-lg flex items-center gap-x-2 bg-newLightGold text-newDarkBlue w-full sm:w-auto">
                                <div className="flex-none size-10 text-newDarkBlue flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <h4 className="text-sm font-medium font-poppins">
                                    {item.title} {item.desc}
                                </h4>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <img src={coinImage} className="lg:max-w-lg w-full max-w-xs md:max-w-full" alt="Gold Coins" />
                </div>
            </section>



            <Componant1>
                <LeftComponant>
                    <Componant>
                        <div className='flex justify-between px-1 py-2 sm:px-6 sm:py-3 items-center'>
                            <p className='text-xs sm:text-2xl font-poppins font-medium'>
                                Buy gold Coin With Heavy Discount
                            </p>
                            <button onClick={handleViewAllClick} className='text-xs sm:text-md font-poppins font-medium bg-newDarkBlue text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg'>
                                View All
                            </button>
                        </div>
                        <Divider />



                        {goldCoin && goldCoin.length > 0 ? (
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
                                            <Image src={product.productImage !== "0" ? product.productImage : "https://via.placeholder.com/192x192.png?text=loading..."} alt={product.productName} style={{ alignItems: 'center' }} />
                                            <Text style={{ color: "black", fontFamily: "poppins" }}>Weight: {product.weight} gm</Text>
                                            <Text style={{ color: "black", fontFamily: "poppins" }}>
                                                Price   ₹ {product.productPrice[0]?.finalProductPrice}
                                            </Text>
                                        </Box>
                                    </Button>
                                ))}
                            </Carousel>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center', // Center horizontally
                                    alignItems: 'center', // Center vertically
                                    width: '100%', // Full width
                                    marginTop: "8%"
                                }}
                            >
                                <CircularProgress />
                            </Box>)}
                    </Componant>
                </LeftComponant>
                <RightComponant>
                    <img src={HomeCoin} alt="ad" style={{ width: 217 }} />
                </RightComponant>
            </Componant1>


            <section className="mx-auto text-gray-600 overflow-hidden md:px-8 md:flex justify-evenly items-center bg-[#F0F7FA]">

                <div className=''>
                    <img src={bracalet} className="" />
                </div>

                <div className='flex-col space-y-5  mt-10 text-center'>
                    <h2 className="text-4xl text-[#05226b] font-extrabold sm:text-4xl font-poppins text-center sm:text-center">
                        Who <span style={{ fontWeight: "600", color: "#d69a2d" }}> We </span> Are?
                    </h2>
                    <p className='text-center sm:text-center text-md font-poppins font-medium w-4/6 mx-auto'>
                        India's leading gold platform, offering a comprehensive range of services including Digital Gold,
                        Gold SIP, and Gold Leasing, with the nation's highest returns of up to 17%. We are known for
                        our commitment to quality, innovation, and delivering outstanding performance.

                    </p>

                    <div className="flex gap-5 justify-center">
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

                <div className=''>
                    <img src={GoldCoin} className="" />
                </div>
            </section>

            <section className="relative py-28 bg-[#183043]">
                <div className="relative z-10 max-w-screen-xl mx-auto px-4 text-gray-300 justify-between gap-24 lg:flex md:px-8">
                    {/* <div className="max-w-md">
                        <h3 className="text-white text-3xl font-poppins sm:text-4xl">
                            Fikar Nahi Fiydaa Hai
                        </h3>
                        <p className="mt-3 font-poppins">
                            Fiydaa is your gateway to a seamless and rewarding gold investment experience. When you choose Fiydaa as your trusted partner in acquiring gold, you open the door to a multitude of benefits that redefine the way you invest.
                        </p>
                    </div> */}
                    <div className="mt-12 lg:mt-0 font-poppins">
                        <ul className="grid gap-8 sm:grid-cols-3">
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
                                            <p className="mt-3 text-md">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="absolute inset-0 max-w-md mx-auto h-72 blur-[118px]" >

                </div>
            </section>

            <Componant1>
                <LeftComponant>
                    <Componant>
                        <div className='flex justify-between px-1 py-2 sm:px-6 sm:py-3 items-center'>
                            <p className='text-xs sm:text-2xl font-poppins font-medium'>
                                Buy gold Coin With Heavy Discount
                            </p>
                            <button onClick={handleViewAllClick} className='text-xs sm:text-md font-poppins font-medium bg-newDarkBlue text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg'>
                                View All
                            </button>
                        </div>
                        <Divider />

                        {bracalets && bracalets.length > 0 ? (
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
                                            <Image src={product.productImage !== "0" ? product.productImage : "https://via.placeholder.com/192x192.png?text=loading..."} alt={product.productName} style={{ alignItems: 'center' }} />
                                            <Text style={{ color: "black", fontFamily: "poppins" }}>Weight: {product.weight} gm</Text>
                                            <Text style={{ color: "black", fontFamily: "poppins" }}>
                                                Price   ₹ {product.productPrice[0]?.finalProductPrice}
                                            </Text>
                                        </Box>
                                    </Button>
                                ))}
                            </Carousel>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center', // Center horizontally
                                    alignItems: 'center', // Center vertically
                                    width: '100%', // Full width
                                    marginTop: "8%"
                                }}
                            >
                                <CircularProgress />
                            </Box>)}

                    </Componant>
                </LeftComponant>
                <RightComponant>
                    <img src={GoldBracelets} alt="ad" style={{ width: 217 }} />
                </RightComponant>
            </Componant1>

            <section class="bg-[#183043]">
                <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                    <button onClick={handleClick} className='mb-4 inline-flex gap-x-2 items-center rounded-full p-1 pr-6 border text-sm font-medium text-white duration-150 hover:bg-white hover:text-black justify-center sm:justify-start'>
                        <span className='inline-block rounded-full px-3 py-1 bg-[#FFDC5C] text-black'>
                            Premium
                        </span>
                        <p className='flex items-center font-poppins hover:text-black'>
                            Get 17% Returns
                            With FiYDAA
                            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                        </p>
                    </button>

                    <h1 class="mb-4 text-xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">We invest in your future with Digital Gold</h1>
                    <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 font-poppins">Invest in your future with Digital Gold, a secure and convenient way to buy, hold, and grow your wealth. Access the power of gold digitally, with the flexibility to invest anytime, anywhere, and watch your portfolio thrive.</p>
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
            </section>

            <Footer />

        </div>
    );
}

export default AllProduct;


