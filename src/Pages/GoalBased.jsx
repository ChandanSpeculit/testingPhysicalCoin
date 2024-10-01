import { useState, useEffect, useRef } from "react";
import goalBased from "../assets/images/GoalBased.png"
import { FaCheck, FaTimes } from 'react-icons/fa'
import { Slide, Zoom } from '@mui/material';
import FiydaaLogo from "../assets/images/navlogo.png"
import { Link } from 'react-router-dom';
import { BiLike } from 'react-icons/bi';
import { AiOutlineAim } from 'react-icons/ai';
import { LuBuilding2 } from 'react-icons/lu';
import GoalCycle from "../assets/images/GoalCycle.png"
import DigitalGoldCardImg from "../assets/images/DigitalGoldCard.png"
import step1 from "../assets/images/Step1.png"
import step2 from "../assets/images/Step2.png"
import step3 from "../assets/images/Step3.png"
import step4 from "../assets/images/Step4.png"
import step5 from "../assets/images/Step5.png"
import goalStep1 from "../assets/images/GoalStep1App.png"
import goalStep2 from "../assets/images/GoalStep2App.png"
import goalStep3 from "../assets/images/GoalStep3App.png"
import goalStep4 from "../assets/images/GoalStep4App.png"
import goalStep5 from "../assets/images/GoalStep5App.png"
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Qrcode from "../assets/images/qrCodes.png"
import Modal from "react-modal";
import Swal from 'sweetalert2'
import { Helmet } from "react-helmet";



const GoalBased = () => {
    const [showSlide1, setShowSlide1] = useState(false);
    const [showSlide2, setShowSlide2] = useState(false);
    const [showSlide3, setShowSlide3] = useState(false);
    const [showSlide4, setShowSlide4] = useState(false);
    const [showSlide5, setShowSlide5] = useState(false);
    const [showSlide6, setShowSlide6] = useState(false);
    const [showSlide7, setShowSlide7] = useState(false);
    const [showStep1, setShowStep1] = useState(false);
    const [showStep2, setShowStep2] = useState(false);
    const [showStep3, setShowStep3] = useState(false);
    const [showStep4, setShowStep4] = useState(false);
    const [showStep5, setShowStep5] = useState(false);

    useEffect(() => {
        // Function to check if an element is in the viewport
        const isInViewport = (element) => {
            const rect = element.getBoundingClientRect();

            return (
                rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom > 0 &&
                rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
                rect.right > 0
            );
        };

        // Event listener to handle scroll
        const checkVisibilityOnMount = () => {
            const slide1 = document.getElementById('slide1');
            const slide2 = document.getElementById('slide2');
            const slide3 = document.getElementById('slide3');
            const slide4 = document.getElementById('slide4');
            const slide5 = document.getElementById('slide5');
            const slide6 = document.getElementById('slide6');
            const slide7 = document.getElementById('slide7');
            const step1 = document.getElementById('step1');
            const step2 = document.getElementById('step2');
            const step3 = document.getElementById('step3');
            const step4 = document.getElementById('step4');
            const step5 = document.getElementById('step5');



            if (slide1 && isInViewport(slide1)) setShowSlide1(true);
            if (slide2 && isInViewport(slide2)) setShowSlide2(true);
            if (slide3 && isInViewport(slide3)) setShowSlide3(true);
            if (slide4 && isInViewport(slide4)) setShowSlide4(true);
            if (slide5 && isInViewport(slide5)) setShowSlide5(true);
            if (slide6 && isInViewport(slide6)) setShowSlide6(true);
            if (slide7 && isInViewport(slide7)) setShowSlide7(true);
            if (step1 && isInViewport(step1)) setShowStep1(true);
            if (step2 && isInViewport(step2)) setShowStep2(true);
            if (step3 && isInViewport(step3)) setShowStep3(true);
            if (step4 && isInViewport(step4)) setShowStep4(true);
            if (step5 && isInViewport(step5)) setShowStep5(true);

        };

        // Event listener to handle scroll
        const handleScroll = () => {
            checkVisibilityOnMount();
        };

        // Initial check on mount
        checkVisibilityOnMount();

        // Attach event listener
        window.addEventListener('scroll', handleScroll);
        // Clean up the event listener on component unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const sendData = {
            get_or_update: "update",
            formData: formData
        };

        console.log("Sending data:", sendData);
        try {
            const response = await fetch(`https://0qbd8w1lbj.execute-api.ap-south-1.amazonaws.com/dev/saveUserDetailsInDb`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log("Response from backend:", data);

            if (data.statusCode === 200) {
                setModalOpen(false);
                Swal.fire({
                    icon: "success",
                    title: "<span style='color: #4caf50; font-family: Montserrat, sans-serif;'>Congratulations!</span>",
                    html: "<span style='font-weight: bold;'>You Are Now On The Exclusive Waitlist For Our App!</span>",
                    customClass: {
                        popup: 'my-popup'
                    }
                });
            } else if (data.statusCode === 201) {
                setModalOpen(false);
                Swal.fire({
                    icon: "success",
                    title: "<span style='color: #4caf50; font-family: Montserrat, sans-serif;'>Appreciate It!</span>",
                    html: "<span style='font-weight: bold;'>You Are Already On The Waitlist!</span>",
                    customClass: {
                        popup: 'my-popup'
                    }
                });
            }
        } catch (error) {
            console.error("Error updating details:", error);
        }
    };

    function updateMetaTags() {

        const titleElement = document.querySelector("title");
        const metaTitleElement = document.querySelector('meta[name="title"]');
        const descriptionElement = document.querySelector('meta[name="description"]');

        let title = "FiYDAA | India's Premier Goal-Based Investment Platform";
        let description = "Identify your financial goals, set a timeline for them & invest. Grow your wealth and achieve your most important financial objectives.";


        titleElement.textContent = title;
        metaTitleElement.setAttribute("content", title);
        descriptionElement.setAttribute("content", description);
    }

    useEffect(() => {
        updateMetaTags();
    })




    return (
        <>
            <div className='   overflow-x-hidden'>
                <div className='flex justify-center'>
                    <img className='w-full ' src={goalBased} alt="" onClick={handleClick} />
                </div>
                <div className=" mt-8 sm:mt-16 lg:mt-24 flex flex-col items-center justify-center gap-0 sm:gap-5 lg:gap-10">

                    <Zoom in={showSlide1} timeout={1000}>

                        <h1 id='slide1' className=" text-center sm:text-left text-xl sm:text-4xl xl:text-6xl font-medium mb-4">
                            Revolutionizing Goal-Oriented Investing
                        </h1>
                    </Zoom>

                    <Zoom in={showSlide2} timeout={1000}>

                        <h2 id="slide2" className=" mt-16 w-full mx-1 text-center text-base sm:text-xl lg:text-3xl text-white font-medium mb-8 bg-darkBlue p-3 sm:px-8 sm:py-4">
                            India's first goal oriented investment app
                        </h2>
                        {/* <h1 id="slide2"  class="mx-auto max-w-5xl font-display text-4xl font-bold tracking-normal text-slate-900 sm:text-4xl text-center md:text-center">
                        India's first{" "}
                            <span class="relative whitespace-nowrap text-blue-900">
                                <span class="relative">goal oriented investment</span>
                            </span>
                            {" "}app
                        </h1> */}
                    </Zoom>

                    {/* <p className="text-lg mb-8 w-4/5 text-center">
                        Fiydaa's Goal-oriented investing is all about aligning your investments with specific financial goals, like buying a house, funding education, or retiring comfortably.
                    </p> */}

                </div>


                <div className='flex flex-col gap-10 mt-10 w-4/5 mx-auto items-center'>
                    {/* Step 1 */}

                    <div id="step1" className='flex flex-row  items-center justify-between sm:justify-evenly'>

                        <Slide direction='right' in={showStep1} timeout={1000}>
                            <div className='sm:w-1/3 flex '>
                                <img src={step1} alt="Step 1" />
                            </div>
                        </Slide>

                        <Slide direction='left' in={showStep1} timeout={1000}>
                            <div className='flex sm:w-1/2'>
                                <img src={goalStep1} alt="Digital Gold Card" />
                            </div>
                        </Slide>
                    </div>
                    {/* Step 2 */}
                    <div id="step2" className='flex flex-row   items-center justify-between sm:justify-evenly '>

                        <Slide direction='right' in={showStep2} timeout={1000}>

                            <div className='w-1/2 flex '>
                                <img src={goalStep2} alt="Digital Gold Card" />
                            </div>
                        </Slide>

                        <Slide direction='left' in={showStep2} timeout={1000}>
                            <div className='w-1/3 flex'>
                                <img src={step2} alt="Step 2" />
                            </div>
                        </Slide>

                    </div>
                    {/* Step 3 */}
                    <div id="step3" className='flex flex-row  items-center justify-between sm:justify-evenly'>

                        <Slide direction='right' in={showStep3} timeout={1000}>


                            <div className='w-1/3'>
                                <img src={step3} alt="Step 3" />
                            </div>
                        </Slide>
                        <Slide direction='left' in={showStep3} timeout={1000}>

                            <div className='w-1/2'>
                                <img src={goalStep3} alt="Digital Gold Card" />
                            </div>
                        </Slide>

                    </div>
                    {/* Step 4 */}
                    <div id="step4" className='flex flex-row  items-center justify-between sm:justify-evenly'>

                        <Slide direction='right' in={showStep4} timeout={1000}>

                            <div className='w-1/2'>
                                <img src={goalStep4} alt="Digital Gold Card" />
                            </div>
                        </Slide>

                        <Slide direction='left' in={showStep4} timeout={1000}>
                            <div className='w-1/3'>
                                <img src={step4} alt="Step 4" />
                            </div>
                        </Slide>

                    </div>
                    {/* Step 5 */}
                    <div id="step5" className='flex flex-row items-center justify-between sm:justify-evenly'>
                        <Slide direction='right' in={showStep5} timeout={1000}>

                            <div className='w-1/3'>
                                <img src={step5} alt="Step 5" />
                            </div>

                        </Slide>

                        <Slide direction='left' in={showStep5} timeout={1000}>

                            <div className='w-1/2 '>
                                <img src={goalStep5} alt="Digital Gold Card" />
                            </div>
                        </Slide>
                    </div>
                </div>






                {/* <div id="slide3" className='mx-auto w-full sm:w-5/6 my-10 sm:my-20'>
                    <Zoom in={showSlide3} timeout={1000}>

                        <img src={GoalCycle} alt="" />
                    </Zoom>
                </div> */}

                <div id='slide4' className="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 lg:py-14 mx-auto my-10">
                    <div className="max-w-2xl mx-auto">
                        <div className="grid gap-12">


                            <Slide direction='right' in={showSlide4} timeout={1000}>
                                <div className=''>
                                    <h2 className="text-3xl text-gray-800 font-bold lg:text-4xl">
                                        Our vision
                                    </h2>
                                    <p className="mt-3 text-gray-800 ">
                                        Fiydaa's vision is to revolutionize goal-oriented investing by providing a personalized financial GPS that guides individuals towards their dreams. Through clear financial goal setting, tailored investment strategies, progress tracking, and efficient resource use, Fiydaa aims to help people stay disciplined, motivated, and committed to achieving their most important financial objectives.                            </p>
                                </div>
                            </Slide>


                            <div className="space-y-6 lg:space-y-10">
                                <Slide direction='left' in={showSlide4} timeout={1000}>

                                    <div id="slide5" className="flex">
                                        <LuBuilding2 className='size-12' />

                                        <div className="ms-5 sm:ms-8">
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-800 ">
                                                Fiydaa and Focus
                                            </h3>
                                            <p className="mt-1 text-gray-600 ">
                                                When you set clear financial goals, you know exactly what you're aiming for. Fiydaa provides a roadmap that guides your investment decisions, making it easier to stay on track                                    </p>
                                        </div>
                                    </div>
                                </Slide>


                                <Slide direction='right' in={showSlide4} timeout={1000}>

                                    <div id='slide6' className="flex">
                                        <AiOutlineAim className='size-12' />

                                        <div className="ms-5 sm:ms-8">
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-800 ">
                                                Fiydaa Motivation and Commitment
                                            </h3>
                                            <p className="mt-1 text-gray-600 ">
                                                Having clear goals can be very motivating. Seeing progress towards buying a home or saving for a big vacation can keep you committed to your investment plan.
                                            </p>
                                        </div>
                                    </div>
                                </Slide>

                                <Slide direction='left' in={showSlide4} timeout={1000}>


                                    <div id="slide7" className="flex">
                                        <BiLike className='size-12' />

                                        <div className="ms-5 sm:ms-8">
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-800 ">
                                                Fiydaa Personalization
                                            </h3>
                                            <p className="mt-1 text-gray-600  ">
                                                Everyone’s financial situation and aspirations are different. Fiydaa's Goal-oriented investing allows you to tailor your investment strategy to fit your unique needs and timelines.
                                            </p>
                                        </div>
                                    </div>
                                </Slide>

                            </div>
                        </div>
                    </div>
                </div>


                <div className="border sm:mt-32  px-4 py-8 sm:px-6 sm:py-8  lg:px-8 lg:py-14 bg-[#f2f2f2] bg-opacity-50">

                    <Link className=" flex justify-center">
                        <img
                            className="h-12 w-auto"
                            src={FiydaaLogo}
                            alt="Logo"
                        />
                    </Link>
                    <blockquote className="text-center lg:mx-auto lg:w-3/5">
                        <svg
                            className="mx-auto w-20 h-auto sm:w-28 text-gray-800 "
                            width="106"
                            height="36"
                            viewBox="0 0 106 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* SVG path */}
                        </svg>

                        <Zoom in={showSlide3} timeout={1000}>

                            <div id='slide3' className="mb-4">
                                <p className="relative text-lg sm:text-2xl md:text-3xl md:leading-normal font-medium text-gray-800">
                                    <svg class="absolute top-0 start-0 transform -translate-x-8 -translate-y-8 size-16 text-gray-200 sm:h-24 sm:w-24 " width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path d="M7.18079 9.25611C7.18079 10.0101 6.93759 10.6211 6.45119 11.0891C5.96479 11.5311 5.35039 11.7521 4.60799 11.7521C3.71199 11.7521 2.96958 11.4531 2.38078 10.8551C1.81758 10.2571 1.53598 9.39911 1.53598 8.28111C1.53598 7.08511 1.86878 5.91511 2.53438 4.77111C3.22559 3.60111 4.18559 2.67811 5.41439 2.00211L6.29759 3.36711C5.63199 3.83511 5.09439 4.35511 4.68479 4.92711C4.30079 5.49911 4.04479 6.16211 3.91679 6.91611C4.14719 6.81211 4.41599 6.76011 4.72319 6.76011C5.43999 6.76011 6.02879 6.99411 6.48959 7.46211C6.95039 7.93011 7.18079 8.52811 7.18079 9.25611ZM14.2464 9.25611C14.2464 10.0101 14.0032 10.6211 13.5168 11.0891C13.0304 11.5311 12.416 11.7521 11.6736 11.7521C10.7776 11.7521 10.0352 11.4531 9.44639 10.8551C8.88319 10.2571 8.60159 9.39911 8.60159 8.28111C8.60159 7.08511 8.93439 5.91511 9.59999 4.77111C10.2912 3.60111 11.2512 2.67811 12.48 2.00211L13.3632 3.36711C12.6976 3.83511 12.16 4.35511 11.7504 4.92711C11.3664 5.49911 11.1104 6.16211 10.9824 6.91611C11.2128 6.81211 11.4816 6.76011 11.7888 6.76011C12.5056 6.76011 13.0944 6.99411 13.5552 7.46211C14.016 7.93011 14.2464 8.52811 14.2464 9.25611Z" fill="currentColor" />
                                    </svg>
                                    <span className="relative z-10 italic   text-gray-800 ">
                                        It’s a personalized financial GPS that guides you towards your dreams.
                                    </span>
                                </p>
                            </div>
                        </Zoom>


                        {/* <footer className="mt-6">
                        <div className="font-semibold text-3xl text-gray-800 dark:text-neutral-200">"Fiydaa"</div>
                    </footer> */}
                    </blockquote>
                </div>


            </div>


        </>
    )
}

export default GoalBased