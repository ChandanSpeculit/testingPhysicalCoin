import React, { useEffect, useRef, useState } from 'react';
import mutualfund1 from "../assets/images/mutualfund1.png";
import mutualfund2 from "../assets/images/mutualfund2.png";
import mutualfund3 from "../assets/images/mutualfund3.png";
import mutualfund4 from "../assets/images/mutualfund4.png";
import mutualfund5 from "../assets/images/mutualfund5.png";
import mutualfund6 from "../assets/images/mutualfund6.png";
import "./Css/SIP.css";
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
            q: "Is there any tax on Mutual Funds?",
            a: "Gains and profits from mutual funds are subject to taxation. It’s crucial to understand the tax rules for mutual funds before investing, as taxes are an inevitable aspect of investing."
        },
        {
            q: " What is an expense ratio?",
            a: "The expense ratio is a small annual fee that mutual funds charge to cover their management and operating costs. It’s shown as a percentage of your investment, and a lower ratio means lower costs for you."
        },
        {
            q: "Are mutual funds liquid?",
            a: "Yes, mutual funds are generally easy to buy and sell. You can get your money out pretty quickly, though some funds might charge a small fee if you sell too soon."
        },
        {
            q: "What is KYC in mutual funds?",
            a: "KYC, or Know Your Customer, is a process to verify your identity before you can invest in mutual funds. You’ll need to provide ID, address proof, and complete a quick verification."
        },
        {
            q: "What is an exit load?",
            a: "An exit load is a small fee charged when you sell your mutual fund units within a certain period. It's meant to discourage early withdrawals and is usually a percentage of the redemption amount."
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

function MutualFundPage() {

    function updateMetaTags() {

        const titleElement = document.querySelector("title");
        const metaTitleElement = document.querySelector('meta[name="title"]');
        const descriptionElement = document.querySelector('meta[name="description"]');

        let title = "Buy and Invest in 1300+ Mutual Funds Online with Zero Commission";
        let description = "Start your Mutual Funds Investments with 0% commission. You can freely choose from over 1300+ mutual funds only with FiYDAA.";


        titleElement.textContent = title;
        metaTitleElement.setAttribute("content", title);
        descriptionElement.setAttribute("content", description);
    }

    useEffect(() => {
        updateMetaTags();
    })
    return (
        <div>
            <h1 class="mx-auto  font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-10 font-bold tracking-normal text-slate-900  text-center md:text-center  ">
                Buy and Invest in 1300+ Mutual Funds{" "}
                <span className="relative whitespace-nowrap text-blue-900">
                    <span className="relative">Online with Zero Commission </span>
                </span>
            </h1>

            <div>
                <div className="chandan">
                    <img className="sipimage1 left-slide" src={mutualfund1} alt="" />
                    <div className="sipDescContainer right-slide">
                        <p className="sipDesc">A mutual fund is a pool of money managed by a professional Fund Manager. It is a trust that collects money from a number of investors who share a common investment objective and invests the same in equities, bonds, money market instruments and/or other securities. </p>
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
                            Fiydaa offers Mutual Funds and SIP options, enabling investors to participate in professionally managed funds across various asset classes. Invest conveniently and strategically with Fiydaa's diverse mutual fund offerings. </p>
                    </div>
                    <img className="sipimage1 right-slide" src={mutualfund2} alt="" />
                </div>
                <div className="chandan">
                    <img className="sipimage1 left-slide" src={mutualfund3} alt="" />
                    <div className="sipDescContainer right-slide">
                        <p className="sipTitle">How to purchase Mutual Funds</p>
                        <p className="sipDesc">You can purchase mutual funds by going to the Mutual Funds tab on Home screen: 1. Select any fund from the list and open it. 2. You will see two option at he bottom namely Buy fund and Setup SIP. 3. Select the desired option and follow the further steps to invest in that fund.</p>
                    </div>
                </div>
                <div className="chandan">
                    <div className="sipDescContainer left-slide">
                        <p className="sipTitle">What is NAV</p>
                        <p className="sipDesc">NAV stands for Net Asset Value, and it's a key metric used to measure the value of a mutual fund's assets per unit. NAV represents the price at which investors buy or sell units of a mutual fund.</p>
                    </div>
                    <img className="sipimage1 right-slide" src={mutualfund4} alt="" />
                </div>

                <div className="chandan">
                    <img className="sipimage1 right-slide" src={mutualfund5} alt="" />
                    <div className="sipDescContainer left-slide">
                        <p className="sipTitle">How do returns vary </p>
                        <p className="sipDesc">Returns in mutual funds can vary based on several factors, including the type of fund, investment strategy, market conditions, and fund manager's expertise. </p>
                    </div>
                </div>
                <div className="chandan">
                    <div className="sipDescContainer left-slide">
                        <p className="sipTitle">Who are we partnered with ? </p>
                        <p className="sipDesc">We are offering access to an extensive selection of over 1300+ Mutual Fund options from various AMCs across India</p>
                    </div>
                    <img className="last-image right-slide" src={mutualfund6} alt="" />
                </div>
            </div>

            <FAQSection />
        </div>
    );
}

export default MutualFundPage;
