import React, { useEffect, useState } from 'react'
import writtenblog1 from "../assets/BlogsImages/writtenblog1.png"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function DifferenceinSIPvsMutualFund() {

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
            name: "Jul 23, 2024",
            icon:
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                </svg>
        }
    ]


    const faqsList = [
        {
            q: "Fixed Investment:",
            a: "You predetermine an amount to be invested at chosen intervals, building your investment gradually."
        },
        {
            q: "Rupee-Cost Averaging:",
            a: "By investing regularly, you buy units at different NAVs, averaging out the cost per unit over time. This reduces the impact of market volatility. "
        },
        {
            q: "Convenience and Affordability:",
            a: "SIPs allow you to start investing with small amounts, ideal for budget-conscious investors. According to The Economic Times, retail investors are increasingly joining India's growth, with SIPs making up nearly 20% of the industry's total assets under management (AUM)."
        },
        {
            q: "Long-Term Wealth Creation:",
            a: "SIPs harness the power of compounding to build wealth steadily over time. Start your SIP journey with FiYDAA today to pave the way for a secure financial future"
        },
    ]



    function updateMetaTags() {

        const titleElement = document.querySelector("title");
        const metaTitleElement = document.querySelector('meta[name="title"]');
        const descriptionElement = document.querySelector('meta[name="description"]');

        let title = "Difference in SIP vs Mutual Fund : Which one is better";
        let description = "Compare SIP vs Mutual Fund: Discover how SIPs offer disciplined investing, while mutual funds diversify across assets. Choose from 1300+ funds with FiYDAA.";


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
                            Difference in SIP vs Mutual Fund : Which one is better
                        </h1>
                    </div>

                </div>
                <div className="flex-1 max-w-4xl mx-auto mt-14 xl:mt-0">
                    <div className="relative">
                        <img src={writtenblog1} className="rounded-lg" alt="" />
                    </div>
                </div>
            </section>


            <section>
                <div className="max-w-screen-xl mx-auto px-4 py-4 gap-12 text-gray-600 md:px-8 xl:flex">
                    <div className="space-y-5  mx-auto text-center xl:text-left">
                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-3xl font-bold font-poppins">
                                Introduction
                            </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                People in investing encounter terms like "SIP" and "Mutual Fund" and wonder if they are interchangeable. Understanding the distinction between SIP vs Mutual Fund is crucial because both play significant roles in achieving financial goals. In this blog, we'll clarify the key differences between SIP vs Mutual fund to help you determine which approach is best suited with your investment objectives.
                            </p>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-3xl font-bold font-poppins">
                                What is a Systematic Investment Plan (SIP)?
                            </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                A Systematic Investment Plan (SIP) is a disciplined way to invest in mutual funds by regularly contributing a fixed amount, such as monthly or quarterly. This spreads out investments over time, minimising the impact of market volatility on returns. It's ideal for starting with smaller amounts and gradually increasing investments. Start your SIP journey with FiYDAA to build a stable financial future.
                            </p>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <div className='flex-1'>
                                <div className="max-w-5xl">
                                    <h2 className="text-3xl font-bold font-poppins">
                                        Key Features of SIP
                                    </h2>
                                </div>
                            </div>
                            <div className='flex-1 mt-12 md:mt-0'>
                                <ul className='space-y-4 divide-y'>
                                    {faqsList.map((item, idx) => (
                                        <li
                                            className="py-2"
                                            key={idx}>
                                            <summary
                                                className="flex items-center justify-between font-semibold text-gray-700">
                                                {item.q}
                                            </summary>
                                            <p
                                                dangerouslySetInnerHTML={{ __html: item.a }}
                                                className='mt-3 text-gray-600 leading-relaxed'>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-3xl font-bold font-poppins">
                                What is a Mutual Fund?
                            </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                A mutual fund is a professionally managed investment pool that combines funds from multiple investors to invest in stocks, bonds, and commodities with specific objectives. This diversification across asset classes helps reduce investment risk. Explore investment opportunities with FiYDAA to start building your portfolio today.
                            </p>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-3xl font-bold font-poppins">
                                Key features of Mutual Fund?
                            </h2>
                            <ul className="mt-4 list-disc list-inside">
                                <li className="font-poppins">
                                    <h3 className="text-xl font-semibold inline">Professional Management:</h3>
                                    <span className="text-gray-600 ml-2">
                                        Experienced fund managers handle investment decisions within the defined objectives of the fund.
                                    </span>
                                </li>
                                <li className="font-poppins mt-2">
                                    <h3 className="text-xl font-semibold inline">Diversification:</h3>
                                    <span className="text-gray-600 ml-2">
                                        Mutual funds invest in a basket of assets, mitigating risk compared to investing in individual stocks.
                                    </span>
                                </li>
                                <li className="font-poppins mt-2">
                                    <h3 className="text-xl font-semibold inline">Variety of Options:</h3>
                                    <span className="text-gray-600 ml-2">
                                        Mutual funds cater to diverse risk appetites and goals with options like equity, debt, hybrid, and balanced funds.
                                    </span>
                                </li>
                                <li className="font-poppins mt-2">
                                    <h3 className="text-xl font-semibold inline">Liquidity:</h3>
                                    <span className="text-gray-600 ml-2">
                                        Most mutual funds offer high liquidity, allowing you to redeem your units at the prevailing Net Asset Value (NAV).
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-3xl font-bold font-poppins">
                                SIP vs Mutual Fund: Advantages
                            </h2>

                            <h3>Investment Approach:</h3>
                            <ul>
                                <li>
                                    <strong>SIP:</strong> You set up a fixed amount to be invested automatically at regular intervals (weekly, monthly, quarterly) regardless of market fluctuations.
                                </li>
                                <li>
                                    <strong>Mutual Fund:</strong> You can choose to invest a lump sum upfront. This allows you to adapt your investment strategy based on your financial situation and market conditions.
                                </li>
                            </ul>

                            <h3>Focus:</h3>
                            <ul>
                                <li>
                                    <strong>SIP:</strong> By consistently investing a fixed amount, you automatically purchase more units when the market price is low and fewer units when it's high. This helps to average out the cost per unit over time.
                                </li>
                                <li>
                                    <strong>Mutual Fund:</strong> Diversification across asset classes is key in mutual funds, whether in equity, debt, or hybrid funds. This approach spreads your investment across stocks, bonds, or a mix, effectively managing risk. Explore over 1300 mutual funds with FiYDAA to diversify your investment portfolio today.
                                </li>
                            </ul>

                            <h3>Suitability:</h3>
                            <ul>
                                <li>
                                    <strong>SIP:</strong> Ideal for beginners and long-term investors. Benefits those who are just starting out or have a long investment horizon like retirement or child's education.
                                </li>
                                <li>
                                    <strong>Mutual Fund:</strong> With various types and risk profiles, mutual funds cater to different investors' goals and risk tolerances. FiYDAA offers a wide selection of over 1300 mutual funds to help you invest in your financial goals confidently.
                                </li>
                            </ul>

                            <h3>Minimum Investment:</h3>
                            <ul>
                                <li>
                                    <strong>SIP:</strong> Typically allows you to start with just Rs 500. This makes SIPs accessible to almost anyone and allows for gradual investment growth over time.
                                </li>
                                <li>
                                    <strong>Mutual Fund:</strong> Might have minimum investment requirements depending on the specific scheme.
                                </li>
                            </ul>

                            <h2 className="text-3xl font-bold font-poppins">
                                SIP vs Mutual Fund: Disadvantages
                            </h2>

                            <h3>SIP:</h3>
                            <ul>
                                <li>
                                    <strong>Market Risk:</strong> SIP investments remain vulnerable to market fluctuations that can impact overall investment values.
                                </li>
                                <li>
                                    <strong>Returns Based on Market Timing:</strong> The timing of entering and exiting the market can significantly influence SIP returns. High market periods may result in fewer units purchased per installment.
                                </li>
                            </ul>

                            <h3>Mutual Funds:</h3>
                            <ul>
                                <li>
                                    <strong>Costs:</strong> Mutual funds involve various fees and charges, such as management fees and expense ratios, which can diminish overall returns.
                                </li>
                                <li>
                                    <strong>Over-Diversification:</strong> Excessive diversification within a mutual fund can reduce potential returns, particularly if some holdings perform poorly.
                                </li>
                                <li>
                                    <strong>Lack of Control:</strong> Investors lack direct influence over the specific investments made by the mutual fund, as decisions are made by fund managers.
                                </li>
                            </ul>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-3xl font-bold font-poppins">
                                Conclusion
                            </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                This blog compares SIPs (Systematic Investment Plans) and Mutual Funds, outlining how each offers distinct advantages. FiYDAA caters to your every investment need with multiple SIP options and over 1300 mutual funds to choose from. Start your investment journey with FiYDAA now!
                            </p>
                        </div>


                    </div>

                </div>
            </section>
            <Footer />
        </>
    )
}

export default DifferenceinSIPvsMutualFund




