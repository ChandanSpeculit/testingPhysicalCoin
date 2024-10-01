import React, { useEffect, useState } from 'react'
import { AiFillYoutube } from 'react-icons/ai'
import { FaUserGraduate } from 'react-icons/fa'
import { API_GATEWAY_URL } from '../config/env-vars'
import ReactPlayer from 'react-player'
import Lottie from 'lottie-react'
import fiydaaEdu from "../assets/FIydaaEdu.json"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { Helmet } from "react-helmet";

const FiydaaEdu = () => {

    const [youtubeList, setYoutubeList] = useState([]);

    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [expandedVideo, setExpandedVideo] = useState(null);


    const handleCardClick = (item) => {
        console.log(item)
        setSelectedVideo(item);
        setIsModalVisible(true);
    };

    const fetchYoutubeData = async () => {
        await fetch(`${API_GATEWAY_URL}getYoutubeList`, {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "callFor": "Youtube" })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                // console.log(data);
                if (data.body) {
                    setYoutubeList(JSON.parse(data.body));
                }
            })
            .catch((error) => {
                console.error("Error fetching data in 60: " + error);
            });
    }

    useEffect(() => {
        fetchYoutubeData();
    }, [])


    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const toggleExpandDescription = (item) => {
        if (expandedVideo === item) {
            setExpandedVideo(null);
        } else {
            setExpandedVideo(item);
        }
    };

    function updateMetaTags() {

        const titleElement = document.querySelector("title");
        const metaTitleElement = document.querySelector('meta[name="title"]');
        const descriptionElement = document.querySelector('meta[name="description"]');
    
        let title = "Learn to Plan Your Investments Better | FiYDAA Edu";
        let description = "We empower users to invest against their goals by adding each investment towards a goal. Explore Fiydaa Edu and improve your knowledge of finance.";
    
    
        titleElement.textContent = title;
        metaTitleElement.setAttribute("content", title);
        descriptionElement.setAttribute("content", description);
    }
    
    useEffect(() => {
        updateMetaTags();
    })
    

    return (
        <>
            {/* <Helmet>
                <title>Learn to Plan Your Investments Better | FiYDAA Edu </title>
                <meta property="og:title" content="Learn to Plan Your Investments Better | FiYDAA Edu " />
                <meta name="description" content="We empower users to invest against their goals by adding each investment towards a goal. Explore Fiydaa Edu and improve your knowledge of finance." />
            </Helmet> */}

            <div class="relative  overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')]  before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
                <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">


                    <div class=" max-w-3xl text-center mx-auto">
                        <h1 class="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
                            The Fiydaa {" "}
                            <span class="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">Experience</span>
                        </h1>
                    </div>

                    <div class="mt-5 max-w-3xl text-center mx-auto">
                        <p class="text-lg text-gray-700 dark:text-neutral-400">
                            Through our user-friendly investment platform, we aim to bring each customer closer to a brighter financial future. Additionally, we empower our users to invest against their goals by adding each investment towards a goal. Explore Fiydaa Edu and enlighten your knowledge of finance.
                        </p>
                    </div>




                </div>
            </div>

            {/* <div className='mt-5 flex justify-around'>
                <div className='w-full sm:w-2/3'>
                    <div className="pb-10 mx-4 flex flex-col">
                        <p className="gradient-to-br from-[#020247] via-[#05226B] to-[#020247] text-3xl opacity-70 font-light">The Fiydaa</p>
                        <p className="gradient-to-br from-[#020247] via-[#05226B] to-[#020247] text-3xl font-medium">EXPERIENCE</p>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center ">
                            <p className="font-light text-xl text-center text-black mt-1 mx-4">
                                Know More About Finance
                            </p>
                            <FaUserGraduate className="text-darkBlue" size={18} />
                        </div>
                        <div className=''>
                            <p className="font-light text-base text-justify mx-4 mt-1.5">
                                Through our user-friendly investment platform, we aim to bring each customer closer to a brighter financial future. Additionally, we empower our users to invest against their goals by adding each investment towards a goal. Explore Fiydaa Edu and enlighten your knowledge of finance.
                            </p>
                        </div>
                        <div className="flex flex-row  gap-2.5 mx-4 mt-7 pt-3 border-t border-gray-300 mb-3.5">
                            <p className="font-medium text-xl text-center text-blue-900">
                                Watch & Learn
                            </p>
                            <AiFillYoutube className="text-red-600" size={25} />
                        </div>
                    </div>
                </div>
                <div className="hidden sm:block w-64 h-64">
                    <Lottie
                        animationData={fiydaaEdu}
                        loop={true}
                        autoplay={true}
                    />
                </div>
            </div> */}


            <div className="flex flex-row sm:mx-20  gap-2.5 mx-4  pt-3  border-gray-300 mb-3.5 ">

                <div className=' border-2 border-darkBlue'></div>


                <div className='flex items-center gap-2'>
                    <p className="font-medium text-xl text-center text-blue-900">
                        Watch & Learn
                    </p>
                    <AiFillYoutube className="text-red-600" size={25} />
                </div>
            </div>

            <div className="sm:mx-14 pb-2.5 overflow-x-auto">
                <div className="sm:hidden grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 ">
                    {youtubeList.map(item => (
                        <div
                            key={item.title}
                            className="bg-white shadow rounded-lg cursor-pointer m-5 p-4 hover:scale-110"
                            onClick={() => handleCardClick(item)}
                        >
                            <div
                                className="relative"
                            >
                                <img
                                    src={item.standardThumbnail}
                                    alt={item.title}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <AiFillYoutube
                                    className="absolute text-white opacity-70"
                                    style={{ top: "40%", left: "50%", transform: "translate(-50%, -50%)" }}
                                    size={40}
                                />
                            </div>
                            <p className="py-2.5 text-sm text font-medium" >
                                {item.title}
                            </p>

                        </div>
                    ))}


                </div>

                <section class="hidden sm:block overflow-hidden border-b-2 pb-5">
                    <div class="max-w-screen-xl 2xl:max-w-screen-3xl px-8 md:px-12 mx-auto py-24  flex flex-col justify-center">
                        <div class="flex flex-col sm:flex-row mx-auto">
                            <a href="#_">
                                <img onClick={() => { handleCardClick(youtubeList[0]) }} src={youtubeList[0] && youtubeList[0].standardThumbnail} class="rounded-xl  rotate-6 hover:rotate-0 duration-500 hover:-translate-y-12 h-full w-full object-cover hover:scale-150 transform origin-bottom" alt="#_" /> </a><a href="#_">
                                <img onClick={() => { handleCardClick(youtubeList[1]) }} src={youtubeList[1] && youtubeList[1].standardThumbnail} class="rounded-xl  -rotate-12 hover:rotate-0 duration-500 hover:-translate-y-12 h-full w-full object-cover hover:scale-150 transform origin-bottom" alt="#_" /> </a><a href="#_">
                                <img onClick={() => { handleCardClick(youtubeList[2]) }} src={youtubeList[2] && youtubeList[2].standardThumbnail} class="rounded-xl  rotate-6 hover:rotate-0 duration-500 hover:-translate-y-12 h-full w-full object-cover hover:scale-150 transform origin-bottom" alt="#_" /> </a><a href="#_">
                                <img onClick={() => { handleCardClick(youtubeList[3]) }} src={youtubeList[3] && youtubeList[3].standardThumbnail} class="rounded-xl  -rotate-12 hover:rotate-0 duration-500 hover:-translate-y-12 h-full w-full object-cover hover:scale-150 transform origin-bottom" alt="#_" /> </a>
                        </div>
                    </div>


                </section>


                <div className="mt-10">
                    <p className="font-light text-center text-darkBlueNew text-3xl mt-5">Want To Know More?</p>
                    <p className="font-light text-center text-black text-xl mt-0">Join us on our Social Media Platforms.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-2 items-center m-4 py-4">
                        <Link
                            to="https://www.youtube.com/channel/UCsAN2zqT_lE_pZrtHwjDVrQ"
                            className="flex items-center gap-2 hover:scale-110">
                            <FontAwesomeIcon
                                icon={faYoutube}
                                size="lg"
                                className="text-red-600"
                            />
                            <span className="text-darkBlue text-lg">TheFiydaaExperience</span>
                        </Link>
                        <Link
                            to="https://www.instagram.com/fiydaaex/?igsh=MTVibHd5eTJ5NHZyeg%3D%3D"
                            className="flex items-center gap-2 hover:scale-110 ">
                            <FontAwesomeIcon
                                icon={faInstagram}
                                size="lg"
                                className=" rounded-md p-1 text-white bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600"
                            />
                            <span className="text-darkBlue text-lg">fiydaaex</span>
                        </Link>
                    </div>
                </div>

                {isModalVisible && (
                    <div
                        onClick={() => setIsModalVisible(false)}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
                        <div className="bg-white p-4 z-50 rounded-lg max-w-lg w-full">
                            <button
                                className="absolute top-2 right-2 text-white hover:text-gray-700"
                                onClick={() => setIsModalVisible(false)}
                            >
                                Close
                            </button>
                            {selectedVideo && (
                                <div onClick={(event) => event.stopPropagation()}>
                                    <ReactPlayer url={`https://www.youtube.com/watch?v=${selectedVideo.videoId}`} controls width="100%" />
                                    <h2 className="text-xl mt-4">{selectedVideo.title}</h2>
                                    <p  >{expandedVideo === selectedVideo ? selectedVideo.description : truncateText(selectedVideo.description, 100)}</p>

                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}

export default FiydaaEdu