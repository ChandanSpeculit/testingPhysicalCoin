import React, { useEffect, useState } from 'react'
import { Slide, Zoom } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import DigitalGoldCardImg from "../assets/images/DigitalGoldCard.png"
import MutualFundsCardImg from "../assets/images/MutualFundsCard.png"
import HomeHero from "../assets/images/HomeHero.png"
import LGT1 from "../assets/images/LGT1.png"
import LGT2 from "../assets/images/LGT2.png"
import LGT3 from "../assets/images/LGT3.png"
import LGT4 from "../assets/images/LGT4.png"
import SIP1 from "../assets/images/SIP1.png"
import SIP2 from "../assets/images/SIP2.png"
import SIP3 from "../assets/images/SIP3.png"
import creditScore from "../assets/images/CreditScore.png"
import { AiFillGold } from "react-icons/ai";
import VA_CI from "../assets/images/VA_CI.png"
import playStoreButton from "../assets/images/Play Store.png";
import HeroAugmont from "../assets/images/HeroAugmont.png";
import Herodecentro from "../assets/images/Herodecentro.png";
import HeroTarraki from "../assets/images/HeroTarraki.png";
import FiydaaX from "../assets/images/FiydaaX.png";
import appStoreButton from "../assets/images/App Store.png"
import { RiFundsFill } from "react-icons/ri";
import { GiTwoCoins } from "react-icons/gi";
import { FaViacoin } from "react-icons/fa6";

function Home() {

  const navigate = useNavigate();

  const FeatureCard = ({ icon, title, text }) => {
    return (
      <div className="flex flex-col items-center justify-center px-4  ">
        {icon}
        <h3 className="text-2xl xl:text-3xl font-bold mt-2 opacity-90">{title}</h3>
        <p className="text-center text-base sm:text-lg mt-2 text-gray-500">{text}</p>
      </div>
    );
  };

  const SipOption = ({ title, description, imageSrc, imageUrl }) => {
    return (

      <Zoom in={showSlide5} timeout={1000}>

        <div className="bg-[#f2f2f2] bg-opacity-50  flex flex-col rounded-2xl shadow-lg p-3 sm:p-6">
          <img src={imageSrc} alt={title} className="size-16 sm:size-24 -ml-3" />

          <h2 className="font-semibold text-lg sm:text-2xl mt-2 mb-4">{title}</h2>
          <p className=' text-sm sm:text-lg font-medium'>{description}</p>
        </div>
      </Zoom>
    );
  };


  const [showSlide1, setShowSlide1] = useState(false);
  const [showSlide2, setShowSlide2] = useState(false);
  const [showSlide3, setShowSlide3] = useState(false);
  const [showSlide4, setShowSlide4] = useState(false);
  const [showSlide5, setShowSlide5] = useState(false);
  const [showSlide6, setShowSlide6] = useState(false);
  const [showSlide7, setShowSlide7] = useState(false);

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

      if (slide1 && isInViewport(slide1)) setShowSlide1(true);
      if (slide2 && isInViewport(slide2)) setShowSlide2(true);
      if (slide3 && isInViewport(slide3)) setShowSlide3(true);
      if (slide4 && isInViewport(slide4)) setShowSlide4(true);
      if (slide5 && isInViewport(slide5)) setShowSlide5(true);
      if (slide6 && isInViewport(slide6)) setShowSlide6(true);
      if (slide7 && isInViewport(slide7)) setShowSlide7(true);
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
  }, []); // Empty dependency array ensures this effect runs only once

  const stats = [
    {
      data: "1300+",
      title: "Mutual Funds"
    },
    {
      data: "99.9%",
      title: "Pure Gold"
    }
  ]

  const meta = {
    title: "Invest with FiYDAA | India's First Goal Based Investment App",
    description: 'Specializing in goal-based investments, we offer seamless and simpler ways to buy and sell digital gold, mutual funds, and Systematic Investment Plans (SIPs).',
    canonical: 'https://fiydaa.in/',
    meta: {
      charset: 'utf-8',
      name: {
        keywords: 'credit score,mutualfund,digitalgold'
      }
    }
  }

  function updateMetaTags() {

    const titleElement = document.querySelector("title");
    const metaTitleElement = document.querySelector('meta[name="title"]');
    const descriptionElement = document.querySelector('meta[name="description"]');

    let title = "Invest with FiYDAA | India's First Goal Based Investment App";
    let description = "Specializing in goal-based investments, we offer seamless and simpler ways to buy and sell digital gold, mutual funds, and Systematic Investment Plans (SIPs).";


    titleElement.textContent = title;
    metaTitleElement.setAttribute("content", title);
    descriptionElement.setAttribute("content", description);
  }

  useEffect(() => {
    updateMetaTags();
  })


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

    <>
      <div className=' overflow-x-hidden'>
        <section id="slide1" className='flex  flex-col-reverse lg:flex-row lg:ml-32  pt-[1%] pb-[1%] justify-between items-center'>
          <div className='flex flex-col lg:gap-5 items-center lg:items-start'>
            <div>
              <h1 className="text-darkBlue font-[system-ui] font-bold text-4xl md:text-6xl">Get <span className="text-[#FFDC5C]  font-[system-ui] font-bold text-4xl md:text-6xl">17%</span> Returns</h1>
            </div>
            <div>
              <p><span className=" mt-2 font-[system-ui] text-darkBlue font-bold text-2xl md:text-6xl text-center">With FiYDAA </span></p>
            </div>
            <p className="mt-4 mb-4 sm:mb-0 md:mb-2 text-gray-800 md:text-xl text-sm text-center lg:text-left  font-poppins">Empower Your Future: Plan, Save, and Grow Your Wealth</p>
            <div className="flex gap-5 justify-center sm:justify-start">
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

            <p className="mt-2 mb-2   text-gray-500 md:text-md text-md text-center lg:text-left  font-poppins font-bold">Secured by</p>

            <div className="flex  justify-center gap-2 md:gap-5">
              <img
                src={HeroAugmont}
                alt="Play Store"
                className="h-6 sm:h-10 "
              />
              <img
                src={Herodecentro}
                alt="App Store"
                className="h-6 sm:h-10"
              />
              <img
                src={HeroTarraki}
                alt="Play Store"
                className="h-6 sm:h-10"
              />
              {/* <img
                src={appStoreButton}
                alt="App Store"
                className="h-6 sm:h-10"
              /> */}
            </div>
          </div>


          <Zoom in={true} timeout={1000} >
            <div className=" w-3/4 lg:w-1/2 ">
              <img onClick={handleClick} src={HomeHero} alt="" />
            </div>
          </Zoom>
        </section>


        <div className='my-4 '>
          <button onClick={handleClick}>
            <img className='' src={FiydaaX} alt="FiydaaX" />
          </button>
        </div>

        {/* <DigitalGoldCard /> */}

        <div id="slide3" className="bg-[#f2f2f2]  bg-opacity-50 rounded-4xl p-2 sm:p-6 flex flex-col-reverse gap-5 sm:flex-row lg:mx-8 my-10 justify-between">

          <Slide direction='right' in={showSlide3} timeout={700} >
            <div className="sm:w-3/5 flex flex-col sm:items-start sm:justify-center ">
              <div className='sm:ml-20 sm:w-2/3 p-4 sm:p-0 text-center sm:text-left flex flex-col items-center sm:items-start gap-8'>
                <h2 className="text-3xl sm:text-4xl lg:text-8xl font-medium text-gray-800 ">
                  DIGITAL GOLD
                </h2>

                <p className="text-gray-600  text-lg ">
                  Invest in digital gold as a safe, easy, and cost-effective way to diversify your portfolio and hedge against market volatility.
                </p>
                <button onClick={() => { navigate('/feature/Digital-Gold') }} className=" bg-darkBlue hover:bg-blue-700 flex items-center gap-2 text-white font-bold py-2 px-4 rounded-full">
                  <p>Know More</p>
                  <FaArrowRight />
                </button>

              </div>
            </div>
          </Slide>

          <Slide direction="left" in={showSlide3} timeout={1000}>
            <div className=" sm:w-2/5 lg:mr-10 ">
              <img className='' src={DigitalGoldCardImg} alt="Digital Gold" />
            </div>
          </Slide>


        </div>


        {/* <MutualFundCard /> */}
        <div id="slide4" className="flex flex-col-reverse sm:flex-row justify-between my-20 sm:my-32">

          <Slide direction="right" in={showSlide4} timeout={1000}>

            <div className='flex sm:ml-10 lg:ml-24 items-center'>

              <div className="p-2 lg:p-10  lg:w-3/5 text-center sm:text-left  flex flex-col items-center sm:items-start justify-center">
                <p className="text-4xl lg:text-6xl xl:text-8xl font-medium text-gray-800 ">
                  MUTUAL
                </p>
                <p className="text-4xl lg:text-6xl xl:text-8xl font-medium text-gray-800 ">
                  FUNDS
                </p>
                <p className="text-gray-600 text-lg my-8">
                  Start your investment journey with mutual funds, designed to yield
                  higher returns by pooling your resources with other investors.
                </p>
                <button
                  // onClick={() => { navigate('/feature/Mutual-Funds') }} 
                  className=" bg-darkBlue hover:bg-blue-700 flex items-center gap-2 text-white font-bold py-2 px-4 rounded-full">
                  <p>Coming Soon</p>
                  {/* <FaArrowRight /> */}
                </button>

              </div>
            </div>
          </Slide>

          <Slide direction="left" in={showSlide4} timeout={1000}>

            <div className=' lg:w-4/5 xl:w-3/5 pt-10'>
              <img
                src={MutualFundsCardImg}
                alt="Mutual Funds"
                className=""
              />
            </div>
          </Slide>
        </div>

        <div id="slide6" className=" flex items-center flex-col lg:flex-row justify-evenly">

          <Slide direction='right' in={showSlide6} timeout={1000}>
            <div className='w-2/3 sm:w-1/3'>
              <img src={VA_CI} alt="" />
            </div>
          </Slide>

          <div className="w-3/4 lg:w-1/2 flex flex-col text-center">
            <p className="text-xl  md:text-3xl lg:text-4xl font-medium text-gray-800  mb-4">
              How can fiydaa help you grow ?
            </p>

            <p className="text-sm md:text-base text-gray-600">
              Fiydaa, helps you build wealth by investing your spare change and improving your financial knowledge.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 mt-10">

              <Slide direction='left' in={showSlide6} timeout={1000}>
                <button onClick={() => { navigate("/feature/Digital-Gold") }} className="px-6 pt-6 rounded-xl border-2 text-left">
                  <AiFillGold className="text-darkBlue text-3xl mr-2" />
                  <h3 className="font-playfair font-bold text-lg sm:text-xl mt-4">
                    Digital Gold
                  </h3>
                  <ul className="text-sm sm:text-base text-gray-600 mt-2 list-disc pl-5">
                    <li>Enjoy an estimated 17% return on your investment.</li>
                    <li>Invest in 99.9% pure gold, securely stored and easily accessible.</li>
                  </ul>
                  <div className="flex">
                    <button onClick={() => { navigate('/feature/Digital-Gold') }} className="flex items-center gap-2 text-darkBlue font-bold text-sm py-4 rounded-full">
                      <p>Know More</p>
                      <FaArrowRight className='size-3' />
                    </button>
                  </div>
                </button>
              </Slide>

              <Slide direction='left' in={showSlide6} timeout={1000}>
                <button
                  //  onClick={() => { navigate("/feature/Mutual-Funds") }}
                  className="px-6 pt-6 rounded-xl border-2 text-left">
                  <RiFundsFill className="text-darkBlue text-3xl mr-2" />
                  <h3 className="font-playfair font-bold text-lg sm:text-xl mt-4">
                    Mutual Fund
                  </h3>
                  <ul className="text-sm sm:text-base text-gray-600 mt-2 list-disc pl-5">
                    <li>Choose from 1300+ mutual funds options to suit your financial needs.</li>
                    <li>Diversify your portfolio with a range of mutual fund options.</li>
                  </ul>
                  <div className="flex">
                    <button
                      // onClick={() => { navigate('/feature/Mutual-Funds') }} 
                      className="flex items-center gap-2 text-darkBlue font-bold text-sm py-4 rounded-full">
                      <p>Coming Soon</p>
                      <FaArrowRight className='size-3' />
                    </button>
                  </div>
                </button>
              </Slide>

              <Slide direction='left' in={showSlide6} timeout={1000}>
                <button onClick={() => { navigate("/feature/Micro-Investing") }} className="px-6 pt-6 rounded-xl border-2 text-left">
                  <GiTwoCoins className="text-darkBlue text-3xl mr-2" />
                  <h3 className="font-playfair font-bold text-lg sm:text-xl mt-4">
                    Micro Investing
                  </h3>
                  <ul className="text-sm sm:text-base text-gray-600 mt-2 list-disc pl-5">
                    <li>Turn your spare change into powerful investments for a sustainable future.</li>
                    <li>Simplify diversified investing with Virtual Assets.</li>
                  </ul>
                  <div className="flex">
                    <button onClick={() => { navigate('/feature/Micro-Investing') }} className="flex items-center gap-2 text-darkBlue font-bold text-sm py-4 rounded-full">
                      <p>Know More</p>
                      <FaArrowRight className='size-3' />
                    </button>
                  </div>
                </button>
              </Slide>

              <Slide direction='left' in={showSlide6} timeout={1000}>
                <button
                  // onClick={() => { navigate("/feature/Virtual-Asset") }}
                  className="px-6 pt-6 border-2 rounded-xl text-left">
                  <FaViacoin className="text-darkBlue text-3xl mr-2" />
                  <h3 className="font-playfair font-bold text-lg sm:text-xl mt-4">
                    Virtual Assets
                  </h3>
                  <ul className="text-sm sm:text-base text-gray-600 mt-2 list-disc pl-5">
                    <li>Combine your favorite mutual funds into a single purchase.</li>
                    <li>Make diversified investing simpler than ever.</li>
                  </ul>
                  <div className="flex">
                    <button
                      // onClick={() => { navigate('/feature/Virtual-Asset') }}
                      className="flex items-center gap-2 text-darkBlue font-bold text-sm py-4 rounded-full">
                      <p>Coming Soon</p>
                      <FaArrowRight className='size-3' />
                    </button>
                  </div>
                </button>
              </Slide>

            </div>
          </div>
        </div>

        <div className='my-20 '>
          <img className='' src={creditScore} alt="creditscore" />
        </div>


        {/* <HomePart1 /> */}

        <div id="slide2" className=" flex flex-col justify-center items-center mx-auto py-12 mb-20">

          <Zoom in={showSlide2} timeout={1000}>
            <p className="text-5xl sm:text-7xl text-darkBlue font-medium text-center mb-8">
              Start growing your wealth today

            </p>
          </Zoom>
          <p className=" font-poppins text-center text-base sm:text-lg  text-gray-800 mb-12 w-5/6 sm:w-3/5 ">
            Our app is designed to turn your financial habits into substantial
            wealth through change investing while also boosting your financial
            knowledge. We are called Fiydaa for a reason.
          </p>

          <Slide direction='right' in={showSlide2} timeout={1000} >

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-28 w-10/12">
              <FeatureCard
                icon={<img src={LGT1} className='size-14' alt="Money Bag" />}
                title="17%"
                text="Returns on Gold"
              />
              <FeatureCard
                icon={<img
                  src={LGT2} className='size-14' alt="Gold" />}
                title="99.9%"
                text="Pure Digital Gold"
              />
              <FeatureCard
                icon={<img
                  src={LGT3}
                  className='size-16'
                  alt="Credit Score" />}
                title="FREE"
                text="Credit Score"
              />
              <FeatureCard
                icon={
                  <img
                    className='size-16'
                    src={LGT4}
                    alt="SIP"
                  />}
                title="High Return"
                text="SIP options"
              />
            </div>
          </Slide>

        </div>








        {/* <SIPCard /> */}
        <div id="slide5" className=" mx-auto sm:py-12">
          <p className="text-lg sm:text-3xl font-bold text-center  sm:mb-4 ">
            EXPLORE OUR <span className="p-1  bg-gradient-to-r  from-gray-400 ">EXCLUSIVE</span>
            <br />

          </p>
          <p className=' font-bold text-center mb-8 '>
            <span className='text-3xl sm:text-7xl'>SIP OPTIONS</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20 my-14 mx-5 lg:mx-20">

            <SipOption
              title="GOLD SIP"
              description="Accumulate digital gold in small quantities through flexible periodic installments on fiydaa."
              imageSrc={SIP1}
            />
            <SipOption
              title="MUTUAL FUNDS SIP"
              description="Get into a habit of investments by starting an SIP from over 1300 mutual funds."
              imageSrc={SIP2}
            />
            <SipOption
              title="VIRTUAL ASSETS SIP"
              description="Make your investments dynamic in mutual funds. Buy multiple funds in a single go and track them separately."
              imageSrc={SIP3}
            />


          </div>
          <div className="flex justify-center  mt-8">
            <button onClick={() => { navigate('/feature/Systematic-Investment-Plan') }} className=" bg-darkBlue hover:bg-blue-700 flex items-center gap-2 text-white font-bold  py-2 px-4 rounded-full">
              <p>Know More</p>
              <FaArrowRight />
            </button>
          </div>
        </div>








        <div id="slide7" className="bg-[#f2f2f2] bg-opacity-50 flex flex-col items-center justify-center px-4 pt-20 pb-10 mt-24 gap-5">
          <div className=" max-w-5xl text-center flex flex-col gap-5 items-center">
            <Zoom in={showSlide7} timeout={1000}>
              <p className=" text-4xl sm:text-7xl font-medium mb-4">Invest on the go</p>
            </Zoom>
            <p className=" text-sm sm:text-base text-gray-500 mb-8">The Fiydaa app is a convenient platform for investing in Digital Gold and Mutual Funds. To get started, download the app from your mobile device's App/Play Store. Once installed, create your account and start your investment journey.</p>
          </div>
          <div className="flex gap-5 justify-center sm:justify-start">
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


        {/* <HomePart2 /> */}
        {/* <HomePart3 /> */}
        {/* <PartnersPart /> */}

        <section className="flex p-8 md:p-16 mt-10  items-center bg-white-100  ">
          <div className="p-4 mx-auto max-w-7xl">
            <div className=" text-center">
              <p className="mb-14  text-2xl md:text-3xl lg:text-5xl font-bold "> Our Partners </p>
            </div>
            <div className="flex">
              <div className="grid grid-cols-2 gap-4 lg:gap-16 sm:gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <div className="relative mb-10 border-b-4 border-blue-900 " href="#">
                  <div className="z-20 pt-8 pb-5">

                    <div className="text-center">
                      <div className="relative inline-block w-24 h-24 md:w-32 md:h-32 mb-10 text-xs text-white rounded">
                        <div
                          className="absolute w-24 h-24 border-t-4 border-r-4 border-blue-900 -top-4 -right-4">
                        </div>
                        <img className="object-cover w-full h-full"
                          src="https://images.yourstory.com/cs/images/companies/JSuIEEhu400x400-1647386694822.jpg?fm=auto&ar=1:1&mode=fill&fill=solid&fill-color=fff"
                          alt="" />
                        <div
                          className="absolute w-24 h-24 border-b-4 border-l-4 border-blue-900 -bottom-4 -left-4">
                        </div>
                      </div>
                    </div>
                    <h2 className="text-lg font-bold leading-9 text-black">
                      Augmont
                    </h2>

                  </div>
                </div>

                <div className="relative mb-10 border-b-4 border-blue-900 " href="#">
                  <div className="z-20 pt-8 pb-5">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    className="absolute top-0 left-0 w-20 h-20 opacity-10" viewBox="0 0 16 16">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                  </svg> */}
                    <div className="text-center">
                      <div className="relative inline-block w-24 h-24 md:w-32 md:h-32 mb-10 text-xs text-white rounded">
                        <div
                          className="absolute w-24 h-24 border-t-4 border-r-4 border-blue-900 -top-4 -right-4">
                        </div>
                        <img className="object-cover w-full h-full"
                          src="https://s3-symbol-logo.tradingview.com/equifax--600.png"
                          alt="" />
                        <div
                          className="absolute w-24 h-24 border-b-4 border-l-4 border-blue-900 -bottom-4 -left-4">
                        </div>
                      </div>
                    </div>

                    <h2 className="text-lg font-bold leading-9 text-black ">
                      Equifax
                    </h2>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    className="absolute right-0 w-20 h-20 rotate-180 bottom-4 opacity-10" viewBox="0 0 16 16">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                  </svg> */}
                  </div>
                </div>

                <div className="relative mb-10 border-b-4 border-blue-900 " href="#">
                  <div className="z-20 pt-8 pb-5">

                    <div className="text-center">
                      <div className="relative inline-block w-24 h-24 md:w-32 md:h-32 mb-10 text-xs text-white rounded">
                        <div
                          className="absolute w-24 h-24 border-t-4 border-r-4 border-blue-900 -top-4 -right-4">
                        </div>
                        <img className="object-cover w-full h-full"
                          src="https://bookface-images.s3.amazonaws.com/logos/7e1356cd0c8b9c2988c0bf3237aca5109cd9b3ce.png"
                          alt="" />
                        <div
                          className="absolute w-24 h-24 border-b-4 border-l-4 border-blue-900 -bottom-4 -left-4">
                        </div>
                      </div>
                    </div>
                    <h2 className="text-lg font-bold leading-9 text-black ">
                      Decentro
                    </h2>

                  </div>
                </div>

                <div className="relative mb-10 border-b-4 border-blue-900 " href="#">
                  <div className="z-20 pt-8 pb-5">

                    <div className="text-center">
                      <div className="relative inline-block w-24 h-24 md:w-32 md:h-32 mb-10 text-xs text-white rounded">
                        <div
                          className="absolute w-24 h-24 border-t-4 border-r-4 border-blue-900 -top-4 -right-4">
                        </div>
                        <img className="object-cover w-full h-full"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgPXe7e4THdTDU9V37oCdSWk3FqKoRzL1utJqGXoGS8pQoZ95j"
                          alt="" />
                        <div
                          className="absolute w-24 h-24 border-b-4 border-l-4 border-blue-900 -bottom-4 -left-4">
                        </div>
                      </div>
                    </div>

                    <h2 className="text-lg font-bold leading-9 text-black ">
                      Tarrakki
                    </h2>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    className="absolute right-0 w-20 h-20 rotate-180 bottom-4 opacity-10" viewBox="0 0 16 16">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                  </svg> */}
                  </div>
                </div>

                <div className="relative mb-10 border-b-4 border-blue-900 " href="#">
                  <div className="z-20 pt-8 pb-5">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    className="absolute top-0 left-0 w-20 h-20 opacity-10" viewBox="0 0 16 16">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                  </svg> */}
                    <div className="text-center">
                      <div className="relative inline-block w-24 h-24 md:w-32 md:h-32 mb-10 text-xs text-white rounded">
                        <div
                          className="absolute w-24 h-24 border-t-4 border-r-4 border-blue-900 -top-4 -right-4">
                        </div>
                        <img className="object-cover w-full h-full"
                          src="https://www.cascadeo.com/wp-content/uploads/2022/11/KRgw2UkV_400x400.jpg"
                          alt="" />
                        <div
                          className="absolute w-24 h-24 border-b-4 border-l-4 border-blue-900 -bottom-4 -left-4">
                        </div>
                      </div>
                    </div>

                    <h2 className="text-lg font-bold leading-9 text-black ">
                      Amazon Web Services
                    </h2>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    className="absolute right-0 w-20 h-20 rotate-180 bottom-4 opacity-10" viewBox="0 0 16 16">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                  </svg> */}
                  </div>
                </div>


              </div>
            </div>
          </div>
        </section>


      </div>
    </>
  )
}

export default Home