import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import GoldLeasingBlob1 from "../assets/images/GoldLeasingBlob1.png";
import GoldLeasing2 from "../assets/images/GoldLeasing2.png";
import appStoreButton from "../assets/images/App Store.png"
import playStoreButton from "../assets/images/Play Store.png";
import { Zoom } from '@mui/material';
import Video from "../assets/images/Fiydaa Video.mp4";
import VideoThumbnails from "../assets/images/VideoThumbnails.png";
import FiydaaX from "../assets/images/StepingGoldLeasing.png";
import FiydaaXLogo from "../assets/images/FiydaaXLogo.png";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



const FaqsCard = (props) => {
    const answerElRef = useRef();
    const [state, setState] = useState(false);
    const [answerH, setAnswerH] = useState('0px');
    const { faqsList, idx } = props;

    const handleOpenAnswer = () => {
        const answerElH = answerElRef.current.childNodes[0].offsetHeight;
        setState(!state);
        setAnswerH(`${answerElH + 20}px`);
    };

    return (
        <div
            className="space-y-3 mt-5 overflow-hidden border-b"
            key={idx}
            onClick={handleOpenAnswer}
        >
            <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-gray-900 font-medium">
                {faqsList.q}
                {
                    state ? (
                        <svg className="h-5 w-5 text-gray-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                    ) : (
                        <svg className="h-5 w-5 text-gray-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    )
                }
            </h4>
            <div
                ref={answerElRef} className="duration-300"
                style={state ? { height: answerH } : { height: '0px' }}
            >
                <div>
                    <p className="text-gray-500">
                        {faqsList.a}
                    </p>
                </div>
            </div>
        </div>
    );
};

const FAQSection = () => {
    const faqsList = [
        {
            q: "What is FiYDAA X ?",
            a: "FiYDAA X, an advanced gold investment platform Fiydaa in collaboration with Augmont (India's leading gold refinery), offers a seamless way to invest in gold. Your gold investment is managed securely by esteemed jewellers who provide Bank/Corporate guarantees, safeguarding your investment. The interest earned is paid in grams of gold and passed on to you."
        },
        {
            q: "Is my data and investments safe?",
            a: "FiYDAA X employs OTP verification and device-level security for account access. We also verify your identity using PAN and date of birth to prevent misuse. Our stringent measures protect your information from loss, misuse, and unauthorized access, ensuring it remains secure under our control."
        },
        {
            q: "Why do the jewellers need my gold?",
            a: "Large-scale jewellers in India need 250-500 kg of gold monthly. To avoid losses from daily price changes, they prefer gold metal loans over cash. FiYDAA X allows them to lease gold at better rates than traditional loans, offering a chance for more people to invest in gold."
        },
        {
            q: "Is FiYDAA X secure for investing?",
            a: "Yes, investing in FiYDAA X is fully secure. Your investment is protected by Bank and Corporate Guarantees, with Augmont’s backing. This guarantees cover 100% of the leased gold's value, ensuring your investment is safe even if a jeweller defaults."
        },
        {
            q: " Is the Interest/Return Paid in Rupees or Gold?",
            a: "With FiYDAA X, returns are paid in grams of gold. Interest is calculated daily and added to your FiYDAA X account, with monthly deposits reflecting the total amount."
        },
        {
            q: "Is FiYDAA X legal?",
            a: "Yes, FiYDAA X is a legitimate gold leasing platform, and we ensure that all our products comply with legal standards."
        },

        {
            q: "Who can participate in FiYDAA X?",
            a: "FiYDAA X welcomes anyone aged 18 and above with a valid PAN card and an active bank account to join."
        },
        {
            q: "How much can I invest in FiYDAA X?",
            a: "FiYDAA X allows you to begin investing with a range extending from 0.1 grams to 250 grams of gold."
        },
    ]

    return (
        <section className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
            <div className="space-y-3 text-center font-poppins">
                <p className="text-3xl text-gray-800 font-semibold">
                    Frequently Asked Questions
                </p>
                <p className="text-gray-600 max-w-lg mx-auto text-lg">
                    Answered all frequently asked questions, Still confused? feel free to contact us.
                </p>
            </div>
            <div className="mt-14 max-w-2xl mx-auto font-poppins">
                {
                    faqsList.map((item, idx) => (
                        <FaqsCard
                            key={idx}
                            idx={idx}
                            faqsList={item}
                        />
                    ))
                }
            </div>
        </section>
    );
};

function GoldLeasing() {
    const [showSlide1, setShowSlide1] = useState(false);

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
            // const slide2 = document.getElementById('slide2');
            // const slide3 = document.getElementById('slide3');
            // const slide4 = document.getElementById('slide4');
            // const slide5 = document.getElementById('slide5');
            // const slide6 = document.getElementById('slide6');
            // const slide7 = document.getElementById('slide7');

            if (slide1 && isInViewport(slide1)) setShowSlide1(true);
            // if (slide2 && isInViewport(slide2)) setShowSlide2(true);
            // if (slide3 && isInViewport(slide3)) setShowSlide3(true);
            // if (slide4 && isInViewport(slide4)) setShowSlide4(true);
            // if (slide5 && isInViewport(slide5)) setShowSlide5(true);
            // if (slide6 && isInViewport(slide6)) setShowSlide6(true);
            // if (slide7 && isInViewport(slide7)) setShowSlide7(true);
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

    const plan = {
        name: "Golden Opportunities, Secure Returns",
        desc: "Invest in Fiydaa X and watch your digital gold yield extraordinary profits.",

    }

    const plan1 = {
        name: "Double the Assurance, Double the Returns",
        desc: "With Fiydaa X, benefit from 6% p.a. in fixed gold grams, while the market gives you 11% p.a.",

    }

    const features = [
        {
            name: "Effortless Investment",
            desc: "Simply buy, store, and lease—no complex procedures involved.",
            icon:
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
        },
        {
            name: "Secure Storage",
            desc: "Your gold is safely stored with Augmont, ensuring it remains in top condition.",
            icon:
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                </svg>
        },
        {
            name: "Trustworthy Partners",
            desc: "We lease to verified jewelers, so you know your gold is in good hands.",
            icon:
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
        },
        {
            name: "Attractive Returns",
            desc: "Enjoy up to 6% extra interest, making your investment more rewarding.",
            icon:
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
        },
    ]
    const [isVideoPoppedUp, setVideoPopUp] = useState(false)

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
            <section className="max-w-screen-xl mx-auto px-4 py-2 gap-12 text-gray-600 overflow-hidden md:px-8 md:flex justify-between items-center">
                <div className='flex-col space-y-5 max-w-xl mt-10 '>
                    <button onClick={handleClick} className='inline-flex gap-x-2 items-center rounded-full p-1 pr-6 border text-sm font-medium duration-150 hover:bg-white justify-center sm:justify-start'>
                        <span className='inline-block rounded-full px-3 py-1 bg-[#FFDC5C] text-black'>
                            Premium
                        </span>
                        <p className='flex items-center font-poppins'>
                            Get 17% Returns
                            With FiYDAA
                            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                        </p>
                    </button>
                    <h1 className="text-4xl text-[#05226b] font-extrabold sm:text-7xl  font-poppins text-center sm:text-start">
                        Fikar Nahi
                    </h1>
                    <h1 className="text-4xl text-[#FFDC5C] font-extrabold sm:text-7xl  font-poppins text-center sm:text-start">
                        FiYDAA X Hai!
                    </h1>
                    <p className='text-center sm:text-start text-2xl font-poppins font-medium'>

                        Earn 17% P.A returns on your gold investments
                    </p>
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
                {/* <Zoom in={true} timeout={1000}> */}

                <div className=''>
                    <img src={GoldLeasingBlob1} className="lg:max-w-lg md:max-w-sm" />
                </div>
                {/* </Zoom> */}
            </section>


            <div className='my-4 w-md'>
                {/* <button onClick={handleClick}> */}
                <img className='' src={FiydaaX} alt="FiydaaX" />
                {/* </button> */}
            </div>



            <section>
                <div className="max-w-screen-xl mx-auto px-4 py-12 gap-12 text-gray-600 md:px-8 xl:flex">
                    <div className="space-y-5 max-w-2xl mx-auto text-center xl:text-left">
                        <h1 className="text-4xl text-[#05226b] font-extrabold mx-auto md:text-5xl font-poppins">
                            Maximize the Value of Your Gold Without Selling                        </h1>
                        <p className="max-w-xl mx-auto xl:mx-0 font-poppins">
                            Gold leasing is a financial service that allows you to lease your gold. Instead of selling your gold, you lease it out and earn a regular income while retaining ownership. This is an innovative way to generate returns from your gold holdings, making your idle gold work for you.                        </p>
                        <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0 xl:justify-start">
                            <button onClick={handleClick} className=" font-poppins flex items-center justify-center gap-x-2 py-2 px-4 text-white font-medium bg-[#05226b] duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg md:inline-flex">
                                Download Now
                                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 max-w-xl mx-auto mt-14 xl:mt-0">
                        <div className="relative">
                            <img src={VideoThumbnails} className="rounded-lg" alt="" />
                            <button className="absolute w-16 h-16 rounded-full inset-0 m-auto duration-150 bg-blue-500 hover:bg-blue-600 ring-offset-2 focus:ring text-white"
                                onClick={() => setVideoPopUp(true)}
                            >
                                <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 m-auto">
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {
                    isVideoPoppedUp ? (
                        <div className="fixed inset-0 w-full h-full flex items-center justify-center z-50">
                            <div className="absolute inset-0 w-full h-full bg-black/50" onClick={() => setVideoPopUp(false)}></div>
                            <div className="px-4 relative">
                                <button
                                    className="w-12 h-12 mb-5 rounded-full duration-150 bg-gray-800 hover:bg-gray-700 text-white"
                                    onClick={() => setVideoPopUp(false)}
                                >
                                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 m-auto">
                                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                    </svg>
                                </button>
                                <video className="rounded-lg w-full max-w-2xl z-10" controls autoPlay={true}>
                                    <source src="https://fiydaaemailtemplate.s3.amazonaws.com/Fiydaa+Video.mp4" type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    ) : ""
                }
            </section>



            <div className="max-w-screen-xl mx-auto text-gray-600 md:px-8 mb-10 mt-10">
                <div className='relative max-w-xl space-y-3 px-4 md:px-0'>
                    <h3 className="text-blue-900 font-semibold font-poppins">
                        Smart, Simple and Secure
                    </h3>
                    <p className='text-gray-800 text-2xl font-poppins font-semibold sm:text-2xl'>
                        Why Choose Gold Leasing with Fiydaa X?                        </p>
                    <div className='max-w-xl font-poppins'>
                        <p>
                            Make the most of your gold with Fiydaa X—buy, store, lease with ease!
                        </p>
                    </div>
                </div>
                <div className='mt-16 justify-between gap-8 md:flex'>
                    <ul className="flex-1 max-w-md space-y-10 px-4 md:px-0">
                        {
                            features.map((item, idx) => (
                                <li key={idx} className="flex gap-x-3">
                                    <div className="flex-none w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-lg text-gray-800 font-medium font-poppins">
                                            {item.name}
                                        </h4>
                                        <p className="text-gray-600 mt-2 md:text-sm font-poppins">
                                            {item.desc}
                                        </p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    <div className="flex-1 flex flex-col border-y mt-2 md:max-w-xl md:rounded-xl md:border md:border-x-none md:shadow-lg md:mt-0 items-center bg-[#A4936B]">

                        <img src={GoldLeasing2} className="lg:max-w-md md:max-w-sm" />
                        {/* <div className="flex gap-5 justify-center sm:justify-start">
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
                        </div> */}
                    </div>
                </div>
            </div>


            <div className="py-10 bg-[#05226b]">
                <div className="max-w-screen-lg mx-auto px-4 flex-wrap gap-x-12 justify-between items-center md:flex md:px-8 lg:flex-nowrap md:justify-center">
                    <div className="max-w-md space-y-3 md:justify-center">
                        <p className="text-white text-3xl font-semibold sm:text-4xl font-poppins">
                            Your success drives our success
                        </p>
                        <p className="text-gray-300 font-poppins">
                            We only benefit when you do, so let's build and grow your wealth together.

                        </p>
                    </div>
                    <div className="flex-none mt-12 text-white lg:mt-0">
                        <img src={FiydaaXLogo} className='max-w-xs' />


                    </div>
                </div>
            </div>






            <FAQSection />

            <Footer />
        </div >
    )
}
export default GoldLeasing