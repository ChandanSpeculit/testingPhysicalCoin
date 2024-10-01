import React, { useEffect, useRef, useState } from 'react';
import creditScore1 from "../assets/images/creditscore1.png"
import creditscore3 from "../assets/images/creditscore3.png"
import creditscore2 from "../assets/images/creditscore2.png"
import creditscore4 from "../assets/images/creditscore4.png"
import creditscore5 from "../assets/images/creditscore5.png"
import creditscore6 from "../assets/images/creditscore6.png"
import { Helmet } from "react-helmet";



import "./Css/SIP.css"
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
      q: "How is my credit score calculated?",
      a: "Your credit score is calculated based on factors like your payment history, credit utilization, length of credit history, types of credit accounts, and recent credit inquiries. Different scoring models may weigh these factors differently."
    },
    {
      q: "What is a good credit score?",
      a: "Credit scores range from 300 to 850. A score above 700 is considered good, while a score above 750 is excellent. Scores below 600 are considered poor and may affect your ability to get credit."
    },
    {
      q: "What factors can negatively impact my credit score?",
      a: "Factors that can hurt your credit score include late payments, high credit card balances, frequent credit applications, and a high debt-to-credit ratio."
    },
    {
      q: "How often should I check my credit score? ",
      a: "Check your credit score regularly, at least once a year, to ensure accuracy and track changes. This helps you spot and address any issues early."
    },
    {
      q: "How do different types of credit accounts affect my credit score?",
      a: "Having a mix of credit types, such as credit cards, auto loans, and mortgages, can positively impact your credit score. It shows your ability to manage various types of credit. However, it's more important to manage all credit responsibly rather than to have a diverse mix"
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
function CreditScorePage(props) {
  function updateMetaTags() {

    const titleElement = document.querySelector("title");
    const metaTitleElement = document.querySelector('meta[name="title"]');
    const descriptionElement = document.querySelector('meta[name="description"]');

    let title = "Get Instant Free Credit Score Online";
    let description = "Get Instant Free Credit Score & Download Credit Report. Credit Score is a tool by which banks determine your creditworthiness and interest rates on your loans.";


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
      <h1 class=" mx-auto  font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-10 font-bold tracking-normal text-slate-900  text-center md:text-center  ">
        Get Instant Free {" "}
        <span class="relative whitespace-nowrap text-blue-900">
          <span class="relative"> Credit Score Online </span>
        </span>
      </h1>

      <div>
        <div className="chandan">
          <img className="sipimage1 left-slide" src={creditScore1} alt="" />
          <div className="sipDescContainer right-slide">
            <p className="sipDesc">Your credit score is a number that represents your creditworthiness, typically expressed as a number between 300 and 900. It is based on your borrowing history — either through credit cards and loans. There are four major credit information companies (CICs or credit bureaus) in India: CIBIL, Experian, Equifax and Highmark.</p>
            <button onClick={handleClick} class="relative inline-flex items-center justify-center mt-2 p-2 px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-blue-900 rounded-full shadow-md group">
              <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-900 group-hover:translate-x-0 ease">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <span class="absolute flex items-center justify-center w-full h-full text-blue-900 transition-all duration-300 transform group-hover:translate-x-full ease">Download Now</span>
              <span class="relative invisible">Download Now</span>
            </button>
          </div>
        </div>
        <div className="chandan">
          <div className="sipDescContainer left-slide">
            <p className="sipDesc">
              Fiydaa offers free access to your Equifax credit score and a detailed report through its Credit Score section in the app. Monitor your financial health conveniently and stay informed about your creditworthiness.</p>
          </div>
          <img className="sipimage1 right-slide" src={creditscore3} alt="" />
        </div>
        <div className="chandan">
          <img className="sipimage1 left-slide" src={creditscore2} alt="" />
          <div className="sipDescContainer right-slide">
            <p className="sipTitle">What Factors Affect My Credit Score</p>
            <p className="sipDesc">The only factors they consider are your: - Payment history - Credit utilization - Length of credit history - Credit mix - New credit inquiries</p>
          </div>
        </div>
        <div className="chandan">
          <div className="sipDescContainer left-slide">
            <p className="sipTitle">Why is credit score significant</p>
            <p className="sipDesc">Lenders, potential employers, even potential landlords will ask to review your credit score and your credit report. They base much of their decisions on your credit information. When it comes to loans in particular, the better your score, the better the chances you’ll get approved, and the better the rates you’ll get.</p>
          </div>
          <img className="sipimage1 right-slide" src={creditscore4} alt="" />
        </div>

        <div className="chandan">
          <img className="sipimage1 right-slide" src={creditscore5} alt="" />

          <div className="sipDescContainer left-slide">
            <p className="sipTitle">How do I view my credit score </p>
            <p className="sipDesc">You can view your credit score by going to the Credit Score section in the Fiydaa App. You can see your Equifax credit score along with detailed report.</p>
          </div>
        </div>
        <div className="chandan">
          <div className="sipDescContainer left-slide">
            <p className="sipTitle">How long does a late payment stay on credit reports</p>
            <p className="sipDesc">Late payments stay on your credit report for up to seven years from the date of the original delinquency. Your payment history is a major credit score factor, so staying on top of due dates is important for your credit health. When possible, it can be smart to set up automatic payments for your bills and loans.</p>
          </div>
          <img className="last-image right-slide" src={creditscore6} alt="" />

        </div>
      </div>

      <FAQSection />






    </div>)
}

export default CreditScorePage