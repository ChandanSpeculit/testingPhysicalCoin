import React, { useEffect, useRef, useState } from 'react';
import digitalGold6 from "../assets/images/digitalGold6.png"
import digitalGold5 from "../assets/images/digitalGold5.png"
import digitalGold4 from "../assets/images/digitalGold4.png"
import digitalGold3 from "../assets/images/digitalGold3.png"
import digitalGold2 from "../assets/images/digitalGold2.png"
import digitalGold1 from "../assets/images/digitalGold1.png"
import "./Css/SIP.css"
import goalBased from "../assets/images/goldPageBanner.png"
import { Helmet } from "react-helmet";
import { Zoom } from '@mui/material';
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
      q: "What is the minimum amount required to invest in digital gold?",
      a: "At Fiydaa, you can start investing in digital gold with as little as just ₹5."
    },
    {
      q: "Is digital gold safe?",
      a: "Yes, digital gold is stored securely in insured vaults by trusted providers like Augmont. However, it is essential to buy from reputable platforms to ensure your investment is safe."
    },
    {
      q: "Can I sell digital gold easily?",
      a: "Yes, digital gold is highly liquid. You can sell your digital gold at any time, and the money will be credited to your bank account or wallet. The selling price is based on the current market rate."
    },
    {
      q: "Can I convert digital gold into physical gold? ",
      a: "Yes, Fiydaa has a feature called Redeem Gold, where you can convert your invested digital gold into real gold coins delivered directly to your doorstep."
    },
    {
      q: "What is the purity of Digital Gold?",
      a: "Fiydaa provides 24 Karat gold with 995 purity (99.5% pure), sourced from Augmont, ensuring top-quality gold for your investment needs."
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
function DigitalGoldPage(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupClosed, setPopupClosed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000); // Show the popup after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupClosed(true);
  };


  function updateMetaTags() {

    const titleElement = document.querySelector("title");
    const metaTitleElement = document.querySelector('meta[name="title"]');
    const descriptionElement = document.querySelector('meta[name="description"]');

    let title = "Buy Digital Gold Online | 24k Certified Pure Gold";
    let description = "Start buying, selling, and redeeming 24K pure digital gold effortlessly with FiYDAA. Invest in e-gold, sell, and purchase digital gold online.";


    titleElement.textContent = title;
    metaTitleElement.setAttribute("content", title);
    descriptionElement.setAttribute("content", description);
  }

  useEffect(() => {
    updateMetaTags();
  })

  return (
    <div>
      {/* <div>
        {!popupClosed && (
          <Zoom in={showPopup} timeout={1000}>
            <div
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1000,
                display: 'block',
                width: '60%',
                backgroundColor: 'white',
                border: '2px solid #ccc',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              <img src={goalBased} alt="Popup" style={{ width: '100%' }} />
              <button
                onClick={handleClosePopup}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontWeight: 'bold',
                  color: 'white',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '40px',
                  cursor: 'pointer',
                }}
              >
                &times;
              </button>
            </div>
          </Zoom>
        )}
      </div> */}


      <div className='flex justify-center mb-20'>
        <img className='w-full ' src={goalBased} alt="" />
      </div>

      <h1 class=" mx-auto max-w-4xl font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-10 font-bold tracking-normal text-slate-900  text-center md:text-center  ">
        Buy Digital Gold Online | {" "}
        <span class="relative whitespace-nowrap text-blue-900">
          <span class="relative">24k Certified Pure Gold </span>
        </span>
      </h1>

      <div>
        <div className="chandan">
          <img className="sipimage1 left-slide" src={digitalGold1} alt="" />
          <div className="sipDescContainer right-slide">
            <p className="sipDesc">Digital gold is an innovative way of purchasing and investing in gold. It allows you to buy gold online, which is stored securely by the provider. You can buy, sell, and accumulate gold in fractional quantities without worrying about physical storage. </p>
            <Link to="/GoldLeasing" class="relative inline-flex items-center justify-center mt-2 p-2 px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-blue-900 rounded-full shadow-md group">
              <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-900 group-hover:translate-x-0 ease">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <span class="absolute flex items-center justify-center w-full h-full text-blue-900 transition-all duration-300 transform group-hover:translate-x-full ease">Save More</span>
              <span class="relative invisible">Save More</span>
            </Link>
          </div>
        </div>
        <div className="chandan">
          <div className="sipDescContainer left-slide">
            <p className="sipDesc">
              FiYDAA offers a unique proposition by providing not only secure digital gold investments but also a gold SIP (Systematic Investment Plan). This allows investors to regularly invest in gold, benefiting from its long-term value while enjoying the convenience of periodic investments </p>
          </div>
          <img className="sipimage1 right-slide" src={digitalGold2} alt="" />
        </div>
        <div className="chandan">
          <img className="sipimage1 left-slide" src={digitalGold3} alt="" />
          <div className="sipDescContainer right-slide">
            <p className="sipTitle">How to invest in digital gold</p>
            <p className="sipDesc">You can invest in digital gold by going to the Buy gold page on the FiYDAA App where you can either enter the quantity in grams or amount in rupees and make the payment to get the gold added to your account.</p>
          </div>
        </div>
        <div className="chandan">
          <div className="sipDescContainer left-slide">
            <p className="sipTitle">Where is physical Gold stored</p>
            <p className="sipDesc">The physical gold/silver is stored safely in the vault of Sequel, the service which is utilized by various banks in India and also by various Asset Management Companies (AMCs) for their Gold-ETFs. The physical Gold/Silver stored in the vault is also covered by insurance.</p>
          </div>
          <img className="sipimage1 right-slide" src={digitalGold6} alt="" />
        </div>
        <div className="chandan">
          <img className="sipimage1 right-slide" src={digitalGold5} alt="" />

          <div className="sipDescContainer left-slide">
            <p className="sipTitle">How is Digital Gold secured</p>
            <p className="sipDesc">100% safe and secure DG investment backed by an independent trustee.</p>
          </div>

        </div>

        <div className="chandan">

          <div className="sipDescContainer left-slide">
            <p className="sipTitle">Who protects Digital Gold investments</p>
            <p className="sipDesc">The security and verification of stored bullion for digital gold investments is managed by a third party trustee.</p>
          </div>
          <img className="last-image right-slide" src={digitalGold4} alt="" />

        </div>
      </div>



      <FAQSection />





    </div>)
}

export default DigitalGoldPage