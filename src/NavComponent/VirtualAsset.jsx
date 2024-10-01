import React, { useEffect, useRef, useState } from 'react';
import virtualAssets1 from "../assets/images/virtualAssets1.png"
import virtualAssets2 from "../assets/images/virtualAssets2.png"
import virtualAssets3 from "../assets/images/virtualAssets3.png"
import virtualAssets4 from "../assets/images/virtualAssets4.png"
import mutualfund1 from "../assets/images/mutualfund1.png"
import "./Css/SIP.css"
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

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
            q: "What is a Virtual Asset?",
            a: "A Virtual Asset combines multiple mutual funds into a single investment entity. This simplifies managing your investments by treating all included funds as one. It helps streamline tracking and decision-making."
        },
        {
            q: "What can I include in a Virtual Asset?",
            a: "Virtual Assets currently only include mutual funds. You can select from a wide range of over 1300 mutual funds to include in your Virtual Asset. This allows you to build a diversified portfolio within one investment."
        },
        {
            q: "Can I buy or sell a Virtual Asset?",
            a: "Yes, you can buy or sell a Virtual Asset through the Fiydaa App. When you invest, your money is automatically allocated among the included mutual funds. Selling works the same way, with proceeds distributed accordingly."
        },
        {
            q: "How do I see how my Virtual Asset is doing?",
            a: "You can view your Virtual Asset’s performance through the Fiydaa App. The app provides detailed information on overall returns and individual mutual fund performance. This allows you to monitor your investment and make informed decisions."
        },
        {
            q: "Are there minimum investment amounts for a Virtual Asset?",
            a: "Yes, the minimum investment for a Virtual Asset is the sum of the minimum investment amounts for each included mutual fund. This ensures that all underlying funds' investment requirements are met."
        }
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



function VirtualAsset() {

    function updateMetaTags() {

        const titleElement = document.querySelector("title");
        const metaTitleElement = document.querySelector('meta[name="title"]');
        const descriptionElement = document.querySelector('meta[name="description"]');

        let title = "Merge Multiple Mutual Funds into a Single Investment Entity";
        let description = "Choose from 1300+ mutual funds and create personalized portfolios, manage investments seamlessly, and monitor your funds' performance comprehensively, with a centralized dashboard.";


        titleElement.textContent = title;
        metaTitleElement.setAttribute("content", title);
        descriptionElement.setAttribute("content", description);
    }

    useEffect(() => {
        updateMetaTags();
    })


    return (
        <div>
            <h1 class=" mx-auto font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-10 font-bold tracking-normal text-slate-900  text-center md:text-center  ">
                Merge Multiple Mutual Funds {" "}
                <span class="relative whitespace-nowrap text-blue-900">
                    <span class="relative">into a Single Investment Entity </span>
                </span>
            </h1>

            <div>
                <div className="chandan">
                    <img className="sipimage1 left-slide" src={virtualAssets1} alt="" />
                    <div className="sipDescContainer right-slide">
                        <p className="sipDesc">Virtual assets (VA) represent an innovative creation developed exclusively by our team at Fiydaa. They constitute an independent asset class, akin to consolidating your entire portfolio into a single entity. At present, VA encompasses solely Mutual Funds. By selecting your desired funds for investment, we amalgamate them into a singular asset, enabling comprehensive metric tracking encompassing investments and returns within the VA framework.</p>
                        <Link to="/" class="relative inline-flex items-center justify-center mt-2 p-2 px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-blue-900 rounded-full shadow-md group">
                        <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-900 group-hover:translate-x-0 ease">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <span class="absolute flex items-center justify-center w-full h-full text-blue-900 transition-all duration-300 transform group-hover:translate-x-full ease">Coming Soon</span>
                        <span class="relative invisible">Coming Soon</span>
                    </Link>
                    </div>
                </div>
                <div className="chandan">
                    <div className="sipDescContainer left-slide">
                        <p className="sipDesc">
                            Fiydaa introduces Virtual Assets (VA), a pioneering concept that merges various mutual funds into a unified investment entity. With over 1300 mutual funds to choose from, users can create personalized portfolios, manage investments seamlessly, and monitor performance comprehensively through the Fiydaa app.</p>
                    </div>
                    <img className="sipimage1 right-slide" src={virtualAssets2} alt="" />
                </div>
                <div className="chandan">
                    <img className="sipimage1 left-slide" src={virtualAssets3} alt="" />
                    <div className="sipDescContainer right-slide">
                        <p className="sipTitle">How to make a Virtual Asset</p>
                        <p className="sipDesc">AMaking a Virtual Asset is simple. Once you have completed your KYC requirements, get started by clicking "Virtual Asset" on your Fiydaa App's home screen. A detailed video explaining the flow and how these assets work is at the bottom of this FAQ page. Please refer to that.</p>
                    </div>
                </div>
                <div className="chandan">
                    <div className="sipDescContainer left-slide">
                        <p className="sipTitle">What assets do virtual assets include</p>
                        <p className="sipDesc">Currently, virtual assets (VAs) exclusively accommodate mutual funds. With a selection of over 1300 mutual funds, there's ample opportunity to create diverse virtual assets through various permutations and combinations.</p>
                    </div>
                    <img className="sipimage1 right-slide" src={mutualfund1} alt="" />
                </div>

                <div className="chandan">
                    <img className="last-image right-slide" src={virtualAssets4} alt="" />

                    <div className="sipDescContainer left-slide">
                        <p className="sipTitle">How does a Virtual Asset Work</p>
                        <p className="sipDesc">A virtual asset allows you to create a singular asset combining multiple mutual funds. In this manner, the friction which comes with managing multiple mutual funds can be reduced, and you can treat your entire mutual fund portfolio as one single asset. Therefore, you can make one lump sum investment, set up one SIP, and also sell your investments with one single action.

                        </p>
                    </div>
                </div>
            </div>


            <FAQSection />



        </div>)
}

export default VirtualAsset