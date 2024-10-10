import React, { useEffect, useState } from 'react'
import writtenblog4 from "../assets/BlogsImages/writtenBlog4.png"
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function UnderstandingELSSMutualFunds() {

  const features = [
    {
      name: "Team FiYDAA",
      icon:
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
        </svg>

    },
    {
      name: "5 min read",
      icon:
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M1 4.75C1 3.784 1.784 3 2.75 3h14.5c.966 0 1.75.784 1.75 1.75v10.515a1.75 1.75 0 01-1.75 1.75h-1.5c-.078 0-.155-.005-.23-.015H4.48c-.075.01-.152.015-.23.015h-1.5A1.75 1.75 0 011 15.265V4.75zm16.5 7.385V11.01a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v1.125c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25zm0 2.005a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v1.125c0 .108.069.2.165.235h1.585a.25.25 0 00.25-.25v-1.11zm-15 1.11v-1.11a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25v1.125a.25.25 0 01-.164.235H2.75a.25.25 0 01-.25-.25zm2-4.24v1.125a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25V11.01a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25zm13-2.005V7.88a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v1.125c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25zM4.25 7.63a.25.25 0 01.25.25v1.125a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25V7.88a.25.25 0 01.25-.25h1.5zm0-3.13a.25.25 0 01.25.25v1.125a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25V4.75a.25.25 0 01.25-.25h1.5zm11.5 1.625a.25.25 0 01-.25-.25V4.75a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25v1.125a.25.25 0 01-.25.25h-1.5zm-9 3.125a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
        </svg>
    },
    {
      name: "Jul 26, 2024",
      icon:
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
        </svg>
    }
  ]


  function updateMetaTags() {

    const titleElement = document.querySelector("title");
    const metaTitleElement = document.querySelector('meta[name="title"]');
    const descriptionElement = document.querySelector('meta[name="description"]');

    let title = "Understanding ELSS Mutual Funds: A Comprehensive Guide";
    let description = "Ready to start investing in ELSS funds? Download the FiYDAA app now and explore a wide range of investment options. Take the first step towards achieving your financial goals today!";


    titleElement.textContent = title;
    metaTitleElement.setAttribute("content", title);
    descriptionElement.setAttribute("content", description);
  }

  useEffect(() => {
    updateMetaTags();
  })


  return (
    <>
      <Navbar />

      <section>
        <div className="max-w-screen-xl mx-auto px-4 py-4 gap-12 text-gray-600 md:px-8 xl:flex">
          <div className="space-y-5  mx-auto text-center xl:text-left">
            <div className="flex flex-wrap items-center justify-center gap-6 xl:justify-start">
              {
                features.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-x-2 text-gray-500 text-sm font-Poppins">
                    <div style={{ color: '#0043e9' }}>{item.icon}</div>
                    {item.name}
                  </div>


                ))
              }
            </div>
            <h1 className="text-4xl text-gray-800 font-poppins font-bold">
              Understanding ELSS Mutual Funds: A Comprehensive Guide
            </h1>
          </div>

        </div>
        <div className="flex-1 max-w-4xl mx-auto mt-14 xl:mt-0">
          <div className="relative">
            <img src={writtenblog4} className="rounded-lg" alt="" />
          </div>
        </div>
      </section>


      <section>
        <div className="max-w-screen-xl mx-auto px-4 py-4 gap-12 text-gray-700 md:px-8 xl:flex">
          <div className="space-y-5  mx-auto text-center xl:text-left">
            <div className="flex-1 max-w-5xl">
              <h2 className="text-2xl font-bold font-poppins">
                Introduction :
              </h2>
              <p className="text-gray-600 mt-3 font-poppins">
                Equity Linked Savings Scheme (ELSS) funds are a popular choice among investors in India. They offer the dual benefits of tax savings and potential for high returns. This article will explore what ELSS funds are, their benefits, how to invest in them, and things to consider before investing.
              </p>
            </div>

            <div className="flex-1 max-w-5xl">
              <h2 className="text-2xl font-bold font-poppins">
                What is an ELSS Fund?
              </h2>
              <p className="text-gray-600 mt-3 font-poppins">
                An ELSS fund is a type of mutual fund that primarily invests in equity and equity-related instruments. These funds come with a lock-in period of three years, the shortest among tax-saving options under Section 80C of the Income Tax Act. By investing in an ELSS fund, you can claim a tax deduction of up to ₹1,50,000.
              </p>
            </div>

            <div className="flex-1 max-w-5xl">
              <h2 className="text-2xl font-bold font-poppins">
                Benefits of Investing in ELSS Funds
              </h2>
              <ul className="mt-4 list-disc list-inside">
                <li className="font-poppins">
                  <h3 className="text-xl font-semibold inline">Tax Savings :</h3>
                  <span className="text-gray-600 ml-2">
                    One of the primary benefits of an ELSS fund is the tax deduction it offers under Section 80C. By investing up to ₹1,50,000 in an ELSS fund, you can reduce your taxable income, leading to significant tax savings.                  </span>
                </li>
                <li className="font-poppins mt-2">
                  <h3 className="text-xl font-semibold inline">Potential for High Returns :</h3>
                  <span className="text-gray-600 ml-2">
                    Since ELSS funds have the potential to offer higher returns compared to other tax-saving instruments like Public Provident Fund (PPF) or National Savings Certificate (NSC). Over the past five years, ELSS funds have delivered average annual returns of about 22.79%. Their returns over three and ten years have been around 20.9% and 16.66% per annum, respectively.                  </span>
                </li>
                <li className="font-poppins mt-2">
                  <h3 className="text-xl font-semibold inline">Short Lock-in Period :</h3>
                  <span className="text-gray-600 ml-2">
                    ELSS funds have a lock-in period of only three years, which is shorter than most other tax-saving investments. This makes them an attractive option for investors looking for liquidity along with tax savings.
                  </span>
                </li>
              </ul>
            </div>


            <div className="flex-1 max-w-5xl">
              <h2 className="text-2xl font-bold font-poppins">
                How to Invest in ELSS Funds
              </h2>
              <ul className="mt-4 list-disc list-inside">
                <li className="font-poppins">
                  <h3 className="text-xl font-semibold inline">Choosing the Right ELSS Fund :</h3>
                  <span className="text-gray-600 ml-2">
                    There are many ELSS funds available in the market. It is essential to choose the right one based on your financial goals, risk tolerance, and investment horizon. Look at the past performance, fund manager's experience, and expense ratio before making a decision.              </span>
                </li>
                <li className="font-poppins mt-2">
                  <h3 className="text-xl font-semibold inline">Lump Sum vs. SIP :</h3>
                  <span className="text-gray-600 ml-2">
                    You can invest in an ELSS fund either through a lump sum payment or a Systematic Investment Plan (SIP). Investing through SIP allows you to invest a fixed amount regularly, which can help in averaging out the market volatility and reducing risk. For example, you can start an SIP with as little as ₹500 per month.                  </span>
                </li>
                <li className="font-poppins mt-2">
                  <h3 className="text-xl font-semibold inline">Investing Online :</h3>
                  <span className="text-gray-600 ml-2">
                    Investing in an ELSS fund is simple and can be done online. Most fund houses and investment platforms offer a hassle-free process to start investing. You need to complete your KYC, choose the fund, and make the payment.<br />
                    Take Control of Your Investments! Discover the FiYDAA app and find the perfect ELSS fund for your goals.
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex-1 max-w-5xl">
              <h2 className="text-2xl font-bold font-poppins">
                Things to Consider Before Investing in ELSS Funds
              </h2>
              <ul className="mt-4 list-disc list-inside">
                <li className="font-poppins">
                  <h3 className="text-xl font-semibold inline">Risk Factors :</h3>
                  <span className="text-gray-600 ml-2">
                    Since ELSS funds invest in equities, they come with a certain level of risk. The value of your investment can fluctuate based on market conditions. It is crucial to understand your risk tolerance before investing in an ELSS fund.
                  </span>
                </li>
                <li className="font-poppins mt-2">
                  <h3 className="text-xl font-semibold inline">Lock-in Period :</h3>
                  <span className="text-gray-600 ml-2">
                    The three-year lock-in period means you cannot withdraw your money before three years. While this is shorter compared to other tax-saving options, it is still a commitment. Make sure you are comfortable with this period before investing.               </span>
                </li>
                <li className="font-poppins mt-2">
                  <h3 className="text-xl font-semibold inline">Long-Term Capital Gains Tax :</h3>
                  <span className="text-gray-600 ml-2">
                    Returns from ELSS funds held for more than a year are treated as Long Term Capital Gains (LTCG). These gains are taxed at 10% without the benefit of indexation. While this tax is lower compared to other forms of income, it is essential to factor it into your investment decision
                  </span>
                </li>
              </ul>
            </div>






            <div className="flex-1 max-w-5xl">
              <h2 className="text-2xl font-bold font-poppins">
                Conclusion :
              </h2>
              <p className="text-gray-600 mt-3 font-poppins">
                An ELSS fund is an excellent investment option for those looking to save on taxes while also seeking higher returns. With a short lock-in period, potential for high returns, and tax benefits, ELSS funds can be a valuable addition to your investment portfolio. However, like all investments, they come with their own set of risks. It is crucial to do your research, understand your risk tolerance, and invest accordingly.
              </p>
            </div>


          </div>

        </div>
        <div className="text-center mt-10">
          <a href='/Blogs' target='blank' class="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group mb-10">
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#05226b] rounded-full group-hover:w-56 group-hover:h-56"></span>
            <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span class="relative font-poppins">Read our other blogs</span>
          </a>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default UnderstandingELSSMutualFunds




