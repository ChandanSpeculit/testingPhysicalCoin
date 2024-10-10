import React, { useEffect, useState } from 'react'
import writtenblog1 from "../assets/BlogsImages/CanaraBankGold.png"
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function CanaraBankGold() {

    const features = [
        {
            name: "Team FiYDAA",
            icon:
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>

        },
        {
            name: "4 min read",
            icon:
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M1 4.75C1 3.784 1.784 3 2.75 3h14.5c.966 0 1.75.784 1.75 1.75v10.515a1.75 1.75 0 01-1.75 1.75h-1.5c-.078 0-.155-.005-.23-.015H4.48c-.075.01-.152.015-.23.015h-1.5A1.75 1.75 0 011 15.265V4.75zm16.5 7.385V11.01a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v1.125c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25zm0 2.005a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v1.125c0 .108.069.2.165.235h1.585a.25.25 0 00.25-.25v-1.11zm-15 1.11v-1.11a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25v1.125a.25.25 0 01-.164.235H2.75a.25.25 0 01-.25-.25zm2-4.24v1.125a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25V11.01a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25zm13-2.005V7.88a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v1.125c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25zM4.25 7.63a.25.25 0 01.25.25v1.125a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25V7.88a.25.25 0 01.25-.25h1.5zm0-3.13a.25.25 0 01.25.25v1.125a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25V4.75a.25.25 0 01.25-.25h1.5zm11.5 1.625a.25.25 0 01-.25-.25V4.75a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25v1.125a.25.25 0 01-.25.25h-1.5zm-9 3.125a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
                </svg>
        },
        {
            name: "Jul 28, 2024",
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

        let title = "Canara Bank Gold Loan Interest Rates 2024";
        let description = "Thinking about getting a gold loan and curious about Canara Bank's interest rates for 2024? You're in the right place! Gold loans are a fantastic way to get quick funds, and Canara Bank offers some competitive rates.";


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
                            Canara Bank Gold Loan Interest Rates 2024                        </h1>
                    </div>

                </div>
                <div className="flex-1 max-w-4xl mx-auto mt-14 xl:mt-0">
                    <div className="relative">
                        <img src={writtenblog1} className="rounded-lg" alt="" />
                    </div>
                </div>
            </section>


            <section>
                <div className="max-w-screen-xl mx-auto px-4 py-4 gap-12 text-gray-700 md:px-8 xl:flex">
                    <div className="space-y-5  mx-auto text-center xl:text-left">
                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Why Opt for a Gold Loan                            </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                Gold loans are an excellent choice when you need money quickly. These are secured loans, which means you use your gold as collateral. This often results in lower interest rates compared to unsecured loans. Plus, the approval process is typically faster and requires fewer documents. At FiYDAA, we offer various options to invest via digital gold. Explore them today and make the most of your gold investments!</p>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Canara Bank Gold Loan                            </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                Canara Bank, a leading bank in India, offers a range of facilities and products for both new and existing customers. Among their popular offerings is the gold loan, which is available in three main schemes, Swarna Loan, Swarna Express, and Swarna Overdraft. These schemes come with competitive interest rates and various benefits, making them an attractive option for those needing quick funds. Discover diverse digital gold investment options with FiYDAA. Start your journey today!
                            </p>
                        </div>


                        <div class="flex-1 max-w-5xl">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">Type of Loan</th>
                                        <th scope="col" class="px-6 py-3">Rate of Interest</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Swarna Loan                                        </th>
                                        <td class="px-6 py-4">

                                            9.25%
                                        </td>

                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Swarna Express                                        </th>
                                        <td class="px-6 py-4">
                                            9.25%
                                        </td>

                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Swarna Overdraft
                                        </th>
                                        <td class="px-6 py-4">
                                            9.25%

                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>


                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Canara Bank Gold Loan Rate per Gram                           </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                The rate per gram for Canara Bank gold loans ranges from Rs. 3,725 to Rs. 4,000. This rate can fluctuate based on daily gold prices. It’s a good idea to check these rates regularly to get the best deal.
                            </p>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Canara Bank Agriculture Gold Loan Interest Rate                        </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                For those in agriculture, Canara Bank offers a special gold loan scheme with an interest rate of 9.25% per annum for 2024. This makes it easier for farmers to get funds at a reasonable cost.
                            </p>
                        </div>


                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Canara Bank Gold Loan Eligibility Criteria                   </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                To be eligible for a Canara Bank gold loan, you need to meet a few basic requirements:                            </p>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <ul className="mt-4 list-disc list-inside">
                                <li className="font-poppins">
                                    <h3 className="text-xl font-semibold inline">Age:
                                        :</h3>
                                    <span className="text-gray-600 ml-2">
                                        Minimum age of 18 years.                                    </span>
                                </li>
                                <li className="font-poppins mt-2">
                                    <h3 className="text-xl font-semibold inline">Gold Quality:</h3>
                                    <span className="text-gray-600 ml-2">
                                        The pledged gold must meet certain purity standards.                                    </span>
                                </li>
                                <li className="font-poppins mt-2">
                                    <h3 className="text-xl font-semibold inline">Documents :</h3>
                                    <span className="text-gray-600 ml-2">
                                        Basic documents, such as identity proof and address proof are needed.                                   </span>
                                </li>
                            </ul>

                            <p className="text-gray-600 mt-3 font-poppins">
                                Choose from a range of digital gold investment options and secure your financial future with FiYDAA. Learn more!                          </p>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Canara Bank Gold Loan Processing Fee                            </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                There is a processing fee for every gold loan application. The fee varies depending on the loan scheme:
                            </p>
                        </div>


                        <div class="flex-1 max-w-5xl">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">Loan Scheme</th>
                                        <th scope="col" class="px-6 py-3">Processing Fee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Swarna Loan                                        </th>
                                        <td class="px-6 py-4">

                                            0.50% of the loan amount with a minimum of Rs. 500 and a maximum of Rs. 5,000
                                        </td>

                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Swarna Express                                        </th>
                                        <td class="px-6 py-4">
                                            50% of charges applicable to Swarna Loans                                        </td>

                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Swarna Overdraft
                                        </th>
                                        <td class="px-6 py-4">
                                            0.50% of the loan amount with a minimum of Rs. 500 and a maximum of Rs. 5,000

                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Features of Canara Bank Gold Loan                            </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                Choosing a gold loan from Canara Bank comes with several benefits:                            </p>
                            <ul className="mt-4 list-disc list-inside">
                                <li className="font-poppins">
                                    <h3 className="text-xl font-semibold inline">Quick Processing :</h3>
                                    <span className="text-gray-600 ml-2">
                                        Since gold loans are secured by gold, they are easy to process. Canara Bank usually disburses these loans within a few hours.                                   </span>
                                </li>
                                <li className="font-poppins mt-2">
                                    <h3 className="text-xl font-semibold inline">Low Interest Rates:</h3>
                                    <span className="text-gray-600 ml-2">
                                        Because gold is used as collateral, these loans generally have lower interest rates. Canara Bank offers rates starting from 7.10% to 7.60% per annum.
                                    </span>
                                </li>
                                <li className="font-poppins mt-2">
                                    <h3 className="text-xl font-semibold inline">Minimal Documentation:</h3>
                                    <span className="text-gray-600 ml-2">
                                        The documentation required is minimal since the collateral is already in place.                                  </span>
                                </li>
                                <li className="font-poppins mt-2">
                                    <h3 className="text-xl font-semibold inline">No Credit History Requirement:</h3>
                                    <span className="text-gray-600 ml-2">
                                        Unlike other loans, gold loans do not heavily depend on the borrower’s credit history.                               </span>
                                </li>
                            </ul>
                            <p className="text-gray-600 mt-3 font-poppins">
                                With FiYDAA, investing in digital gold is easier than ever. Explore our options and start investing today!                       </p>
                        </div>


                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                How to Apply for a Canara Bank Gold Loan                       </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                Applying for a Canara Bank gold loan is simple. You can visit the nearest branch with your gold ornaments and necessary documents. The bank will appraise your gold and approve the loan based on its value. Alternatively, you can apply online through the Canara Bank website for added convenience.                            </p>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Documentation Required
                            </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                One of the perks of a gold loan is the minimal documentation needed. Here are the basic documents required to apply for a Canara Bank gold loan:                          </p>
                            <ul className="mt-4 list-disc list-inside">
                                <li className="font-poppins">
                                    <h3 className="text-xl font-semibold inline">Identity proof (Aadhar card, PAN card, etc.)
                                    </h3>
                                </li>
                                <li className="font-poppins mt-2">
                                    <h3 className="text-xl font-semibold inline">Address proof (Utility bill, rental agreement, etc.)
                                    </h3>
                                </li>
                                <li className="font-poppins mt-2">
                                    <h3 className="text-xl font-semibold inline">Photographs
                                    </h3>
                                </li>
                                <li className="font-poppins mt-2">
                                    <h3 className="text-xl font-semibold inline">Gold ornaments for appraisal

                                    </h3>
                                </li>
                            </ul>
                        </div>


                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Tips to Get the Best Interest Rates                            </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                Here are some tips to help you get the best interest rates on your Canara Bank gold loan      </p>                      <ul className="mt-4 list-disc list-inside">
                                <li className="font-poppins">
                                    <h3 className="text-xl font-semibold inline">Check Gold Purity : Ensure your gold is of high purity to get better loan terms.
                                    </h3>
                                </li>
                                <li className="font-poppins mt-2">
                                    <h3 className="text-xl font-semibold inline">Compare Offers: Look at different loan offers to find the best rate.

                                    </h3>
                                </li>
                                <li className="font-poppins mt-2">
                                    <h3 className="text-xl font-semibold inline">Negotiate: Don’t hesitate to negotiate with the bank for better rates and terms.

                                    </h3>
                                </li>
                                <li className="font-poppins mt-2">
                                    <h3 className="text-xl font-semibold inline">Timely Repayment: Maintain a good repayment history to secure better deals in the future.


                                    </h3>
                                </li>
                            </ul>
                        </div>



                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Conclusion :
                            </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                Canara Bank’s gold loan interest rates for 2024 are attractive and provide a reliable financial solution. Whether you need funds for personal or business needs, a Canara Bank gold loan can be a smart choice. With competitive interest rates, minimal documentation, and flexible repayment options, it’s worth considering for your financial needs. FiYDAA offers a wide range of investment opportunities beyond digital gold. Explore your options now!
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

export default CanaraBankGold




