import React, { useEffect, useRef, useState } from 'react';
import sipcardmen from "../assets/images/sipcardmen.png"
import sipcardmen1 from "../assets/images/sipcardmen1.png"
import microInvesting1 from "../assets/images/microInvesting1.png"
import microInvesting2 from "../assets/images/microInvesting2.png"
import microInvesting3 from "../assets/images/microInvesting3.png"
import microInvesting4 from "../assets/images/microInvesting4.png"
import microInvesting5 from "../assets/images/microInvesting5.png"
import "./Css/SIP.css"
import { Helmet } from "react-helmet";

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
            q: "Do I need a large amount of money to start micro investing? ",
            a: "No, one of the main advantages of micro investing is that you can start with very little money. Fiydaa allows you to invest with spare change from daily purchases."
        },
        {
            q: "How does micro-investing compare to traditional investing?",
            a: "Micro-investing offers lower minimum investment requirements and ease of use but may lack the depth and customization of traditional investing methods."
        },
    ];

    return (
        <section className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
            <div className="space-y-3 text-center">
                <p className="text-3xl text-gray-800 font-semibold">
                    Frequently Asked Questions
                </p>
                <p className="text-gray-600 max-w-lg mx-auto text-lg">
                    Answered all frequently asked questions, Still confused? feel free to contact us.
                </p>
            </div>
            <div className="mt-14 max-w-2xl mx-auto">
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

function ChangeInvestingPage() {
    function updateMetaTags() {

        const titleElement = document.querySelector("title");
        const metaTitleElement = document.querySelector('meta[name="title"]');
        const descriptionElement = document.querySelector('meta[name="description"]');

        let title = "Micro-Investing | Grow Your Wealth with Minimum Effort";
        let description = "Micro-investing involves regularly investing small amounts of money, helping you build your savings and investments without needing a lot of money upfront.";


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
        <div>
            <h1 class=" mx-auto  font-display text-md sm:text-lg md:text-2xl lg:text-4xl mb-10 font-bold tracking-normal text-slate-900  text-center md:text-center  ">
                Micro-Investing | {" "}
                <span class="relative whitespace-nowrap text-blue-900">
                    <span class="relative">Grow Your Wealth with Minimum Effort </span>
                </span>
            </h1>

            <div>
                <div className="chandan">
                    <img className="sipimage1 left-slide" src={microInvesting1} alt="" />
                    <div className="sipDescContainer right-slide">
                        <p className="sipDesc">Micro investing is a relatively new concept in India and is based on the change-investing format. Under this investment strategy, the apps allow the user to fix an amount which is known as a round-off amount to the closest next Rs. 10, Rs. 20 or Rs. 50 and so on. When the user spends on various aspects through the app, the differential round-off amount gets added till it reaches the target amount of investment (for example, Rs. 100, Rs. 500, or Rs. 1,000). </p>
                        <button onClick={handleClick} class="relative inline-flex items-center justify-center mt-2 p-2 px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-blue-900 rounded-full shadow-md group">
                            <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-900 group-hover:translate-x-0 ease">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span class="absolute flex items-center justify-center w-full h-full text-blue-900 transition-all duration-300 transform group-hover:translate-x-full ease">Invest Now</span>
                            <span class="relative invisible">Invest Now</span>
                        </button>
                    </div>
                </div>
                <div className="chandan">
                    <div className="sipDescContainer left-slide">
                        <p className="sipDesc">
                            Fiydaa's Exclusive Plan offers a unique approach to Micro investing in India. By rounding off everyday transactions, Fiydaa accumulates spare change towards investments like gold, enabling users to build portfolios gradually and conveniently without large initial investments. </p>
                    </div>
                    <img className="sipimage1 right-slide" src={microInvesting2} alt="" />
                </div>
                <div className="chandan">
                    <img className="sipimage1 left-slide" src={microInvesting3} alt="" />
                    <div className="sipDescContainer right-slide">
                        <p className="sipTitle">What is Micro investing</p>
                        <p className="sipDesc">Spare Micro investing involves investing small amounts of money from everyday transactions into financial features. Fiydaa scans users' UPI transactions, calculates the change, and offers the user the option to invest the spare change.</p>
                    </div>
                </div>
                <div className="chandan">
                    <div className="sipDescContainer left-slide">
                        <p className="sipTitle">How can Micro investing be beneficial</p>
                        <p className="sipDesc">It allows users to build investment portfolios without large upfront contributions gradually, making investing more accessible and convenient.</p>
                    </div>
                    <img className="sipimage1 right-slide" src={microInvesting4} alt="" />
                </div>

                <div className="chandan">
                    <img className="last-image right-slide" src={microInvesting5} alt="" />

                    <div className="sipDescContainer left-slide">
                        <p className="sipTitle">How to use Micro investing</p>
                        <p className="sipDesc">Whenever you make a transaction of any amount, you will be notified of the change amount of that particular transaction. You can choose whether to accumulate that change or not. If you click on yes, your amount will be accumulated in the Micro investing page of the app, which you can use to purchase gold. This helps increase investment without much pressure and in small amounts.

                        </p>
                    </div>
                </div>
            </div>
            <FAQSection />




        </div>)
}

export default ChangeInvestingPage