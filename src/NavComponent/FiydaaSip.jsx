import React, { useEffect, useRef, useState } from 'react';
import sipImage1 from "../assets/images/sipImage1.png"
import sipImage2 from "../assets/images/sipImage2.png"
import sipImage3 from "../assets/images/sipImage3.png"
import sipImage4 from "../assets/images/sipImage4.png"
import sipImage5 from "../assets/images/sipImage5.png"
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
            q: "What is the minimum amount to start an SIP?",
            a: "The minimum amount to start a Mutual Fund SIP can be as low as Rs 500 per month. This allows you to begin investing with a small amount and gradually increase your investment."
        },
        {
            q: "In which fund can I invest through SIP?",
            a: "You can invest in various types of mutual funds through SIP, including equity funds, debt funds, hybrid funds, and more. Choose a fund based on your investment goals, risk tolerance, and time horizon."
        },
        {
            q: "How to choose a mutual fund for my SIP?",
            a: "To choose a mutual fund for your SIP, consider your financial goals, risk tolerance, and investment horizon. Look at the fund's past performance, expense ratio, and the experience of the fund manager."
        },
        {
            q: "Can I invest in digital gold through SIP?",
            a: "Yes, many platforms offer SIP options for digital gold. This allows you to invest a fixed amount regularly in digital gold, making it easy to accumulate gold over time without a large upfront investment."
        },
        {
            q: "Can I invest in multiple SIPs?",
            a: " Yes, you can invest in multiple SIPs across different mutual fund schemes. Diversifying your investments across various funds can help spread risk and potentially improve returns."
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

const FiydaaSip = () => {

    function updateMetaTags() {

        const titleElement = document.querySelector("title");
        const metaTitleElement = document.querySelector('meta[name="title"]');
        const descriptionElement = document.querySelector('meta[name="description"]');

        let title = "Start Investing in SIP | Systematic Investment Plan";
        let description = "SIP allows investors to invest a fixed amount at regular intervals. The SIPs can be set up on a daily, weekly, monthly, or yearly basis.";


        titleElement.textContent = title;
        metaTitleElement.setAttribute("content", title);
        descriptionElement.setAttribute("content", description);
    }

    useEffect(() => {
        updateMetaTags();
    })
    return (
        <div>
            <h1 class=" mx-auto max-w-4xl font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-10 font-bold tracking-normal text-slate-900  text-center md:text-center  ">
                Start Investing in SIP |{" "}
                <span class="relative whitespace-nowrap text-blue-900">
                    <span class="relative">Systematic Investment Plan </span>
                </span>
            </h1>

            <div>
                <div className="chandan">
                    <img className="sipimage1 left-slide" src={sipImage1} alt="" />
                    <div className="sipDescContainer right-slide">
                        <p className="sipDesc">Fiydaa offers a diverse range of Systematic Investment Plan (SIP) options, designed to cater to various investment preferences and goals. Our SIP options ensure that your investments are not only diversified but also have the potential to yield higher returns over time. </p>
                        <Link to="/Sip-Calculator" class="relative inline-flex items-center justify-center mt-2 p-2 px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-blue-900 rounded-full shadow-md group">
                        <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-900 group-hover:translate-x-0 ease">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <span class="absolute flex items-center justify-center w-full h-full text-blue-900 transition-all duration-300 transform group-hover:translate-x-full ease">Calculate Your SIP</span>
                        <span class="relative invisible">Calculate Your SIP</span>
                    </Link>
                    </div>
                </div>
                <div className="chandan">
                    <div className="sipDescContainer left-slide">
                        <p className="sipDesc">
                            Fiydaa offers diverse SIP options: Gold SIP for accumulating digital gold in flexible installments, Virtual Asset SIP to invest in multiple mutual funds in one go, and Mutual Funds SIP with access to over 1300+ funds, all designed for efficient, goal-oriented investing. </p>
                    </div>
                    <img className="sipimage1 right-slide" src={sipImage2} alt="" />
                </div>
                <div className="chandan">
                    <img className="sipimage1 left-slide" src={sipImage3} alt="" />
                    <div className="sipDescContainer right-slide">
                        <p className="sipTitle">Gold SIP</p>
                        <p className="sipDesc">Accumulate digital gold in small, flexible installments through Fiydaa. Securely diversify your investments, hedge against inflation, and build wealth over time with hassle-free digital gold purchases.</p>
                    </div>
                </div>
                <div className="chandan">
                    <div className="sipDescContainer left-slide">
                        <p className="sipTitle">Virtual Asset SIP</p>
                        <p className="sipDesc">Invest in multiple mutual funds simultaneously with Fiydaa's Virtual Asset SIP. Track each fund separately, enjoy diversified investments, and manage your portfolio easily and efficiently.</p>
                    </div>
                    <img className="sipimage1 right-slide" src={sipImage4} alt="" />
                </div>

                <div className="chandan">
                    <img className="last-image right-slide" src={sipImage5} alt="" />

                    <div className="sipDescContainer left-slide">
                        <p className="sipTitle">Mutual Funds SIP </p>
                        <p className="sipDesc">Start investing with over 1300 mutual funds through Fiydaa's Mutual Funds SIP. Build wealth systematically with professional management, diversified portfolios, and flexible investment options.</p>
                    </div>
                </div>
            </div>


            <FAQSection />



        </div>
    );
}

export default FiydaaSip;
