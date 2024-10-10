import React, { useEffect, useState } from 'react'
import writtenblog1 from "../assets/BlogsImages/writtenblog2.png"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function DirectvsRegularMutualFund() {

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
            name: "Jul 24, 2024",
            icon:
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                </svg>
        }
    ]

    const QuestionAnswer = [
        {
            q: "Expense Ratios:",
            a: "Direct mutual funds have lower expense ratios as there are no intermediary fees, directly increasing your returns. "
        },
        {
            q: "Broker Commission:",
            a: "Direct mutual funds do not involve broker commissions, eliminating an extra cost that can lower returns over time."
        },
        {
            q: "Returns",
            a: "These mutual funds generally deliver higher returns due to their lower costs. Studies consistently demonstrate that direct plans of mutual funds outperform regular plans in annual returns over the long term.<br/>Ready to aim for higher returns? Start investing with FiYDAA today for effortless investment options!"
        },
        {
            q: "Asset Under Management (AUM):",
            a: "Both direct and regular mutual funds contribute to the fund house’s AUM. However, the lower cost structure of direct funds can lead to better AUM growth due to higher investor returns."
        },
        {
            q: "Control and flexibility :",
            a: "Direct mutual funds offer you complete control over your investment decisions. This allows you to tailor your portfolio according to your financial goals. With FiYDAA, you can seamlessly manage your investments in various mutual funds, digital gold and SIPs, ensuring flexibility and convenience. Take charge of your financial future today with FiYDAA"
        },
    ]

    const QuestionAnswer1 = [
        {
            q: "Expense Ratios:",
            a: "Regular mutual funds include intermediary fees in their expense ratios, resulting in higher costs compared to direct mutual funds.  "
        },
        {
            q: "Broker Commission:",
            a: " Regular mutual funds involve broker commissions, which can add to the overall cost."
        },
        {
            q: "Returns",
            a: " The higher expense ratios of regular mutual funds generally lead to lower returns compared to direct mutual funds. However, the guidance from brokers can sometimes help make better investment choices."
        },
        {
            q: "Asset Under Management (AUM):",
            a: "Regular mutual funds contribute to the fund house’s AUM, but the higher cost structure can impact overall returns, potentially affecting AUM growth compared to direct mutual funds."
        },
    ]




    function updateMetaTags() {

        const titleElement = document.querySelector("title");
        const metaTitleElement = document.querySelector('meta[name="title"]');
        const descriptionElement = document.querySelector('meta[name="description"]');

        let title = "Direct vs Regular Mutual Fund: Which One To Choose?";
        let description = "Discover the differences between Direct vs Regular mutual funds to optimise your investment strategy with FiYDAA. Compare Direct vs Regular mutual funds for higher returns.";


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
                            Direct vs Regular Mutual Fund: Which One To Choose?
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
                                Introduction :
                            </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                When it comes to investing in mutual funds, understanding the difference between Direct vs Regular mutual funds is crucial. The right choice can significantly impact your returns and overall investment strategy. This article explores the key differences between Direct vs Regular Mutual, helping you make an informed decision about Direct vs Regular Mutual Fund options.
                            </p>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-3xl font-bold font-poppins">
                                What is a Direct Mutual Fund?
                            </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                Direct mutual funds are purchased directly from the fund house without intermediaries, like brokers or agents. This eliminates commission fees, resulting in higher returns over time. Direct mutual funds are recommended for experienced investors comfortable making their own investment decisions.
                            </p>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <div className='flex-1 mt-12 md:mt-0'>
                                <ul className='space-y-4 divide-y'>
                                    {QuestionAnswer.map((item, idx) => (
                                        <li
                                            className="py-2"
                                            key={idx}>
                                            <summary
                                                className="flex items-center justify-between font-poppins text-gray-700">
                                                {item.q}
                                            </summary>
                                            <p
                                                dangerouslySetInnerHTML={{ __html: item.a }}
                                                className='mt-3 text-gray-600 leading-relaxed font-poppins'>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-3xl font-bold font-poppins">
                                What is a Regular Mutual Fund?
                            </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                Regular mutual funds are bought through intermediaries like brokers or agents, who charge a commission for their services. This commission is included in the expense ratio, making regular mutual funds slightly more expensive. In the context of Direct vs Regular Mutual Fund, these intermediaries provide valuable advice and assistance, beneficial for novice investors or those who prefer guided investment decisions.
                            </p>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <div className='flex-1 mt-12 md:mt-0'>
                                <ul className='space-y-4 divide-y'>
                                    {QuestionAnswer1.map((item, idx) => (
                                        <li
                                            className="py-2"
                                            key={idx}>
                                            <summary
                                                className="flex items-center justify-between font-poppins text-gray-700">
                                                {item.q}
                                            </summary>
                                            <p
                                                dangerouslySetInnerHTML={{ __html: item.a }}
                                                className='mt-3 text-gray-600 leading-relaxed font-poppins'>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-3xl font-bold font-poppins">
                                Performance Comparison: Direct vs. Regular Mutual Funds :
                            </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                Consider an investor who decides to invest Rs 1,00,000 in a mutual fund. Rahul chooses a direct mutual fund with an expense ratio of 1.07% and a regular mutual fund with an expense ratio of 2.28%. Assuming both funds grow at an annual rate of 10% before expenses, here's how the expense ratios affect the returns over 10 years.
                            </p>
                        </div>

                        <ul className="mt-4 list-disc list-inside">
                            <h3 className="text-xl font-semibold inline mb-5">Direct Mutual Fund :</h3>

                            <li className="font-poppins">
                                <span className="text-gray-600 ml-2">
                                    Initial Investment: Rs 1,00,000
                                </span>
                            </li>
                            <li className="font-poppins mt-2">
                                <span className="text-gray-600 ml-2">
                                    Annual Growth Rate: 10%
                                </span>
                            </li>
                            <li className="font-poppins mt-2">
                                <span className="text-gray-600 ml-2">
                                    Expense Ratio: 1.07%
                                </span>
                            </li>
                            <li className="font-poppins mt-2">
                                <span className="text-gray-600 ml-2">
                                    After 10 years, the investment would grow to approximately Rs 2,57,374.
                                </span>
                            </li>
                        </ul>

                        <ul className="mt-4 list-disc list-inside">
                            <h3 className="text-xl font-semibold inline mb-5">Regular Mutual Fund :</h3>

                            <li className="font-poppins">
                                <span className="text-gray-600 ml-2">
                                    Initial Investment: Rs 1,00,000
                                </span>
                            </li>
                            <li className="font-poppins mt-2">
                                <span className="text-gray-600 ml-2">
                                    Annual Growth Rate: 10%
                                </span>
                            </li>
                            <li className="font-poppins mt-2">
                                <span className="text-gray-600 ml-2">
                                    Expense Ratio: 2.28%
                                </span>
                            </li>
                            <li className="font-poppins mt-2">
                                <span className="text-gray-600 ml-2">
                                    After 10 years, the investment would grow to approximately Rs 2,36,196.
                                </span>
                            </li>

                            {/* <p className="text-gray-600 mt-3 font-poppins">
                                This example illustrates that investment in the direct mutual fund grows more due to the lower expense ratio, resulting in higher overall returns compared to regular mutual funds in the Direct Vs Regular Mutual Fund comparison.
                            </p> */}
                        </ul>





                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-3xl font-bold font-poppins">
                                Conclusion :
                            </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                Choosing between Direct vs Regular mutual funds ultimately depends on your investment knowledge, preferences, and goals. Direct mutual funds offer lower costs and higher returns, ideal for experienced investors. Regular mutual funds provide valuable advice and convenience, perfect for those who prefer guided investment decisions.<br />
                                Explore the 1300 mutual funds FiYDAA offers and start investing today to maximize your returns!
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

export default DirectvsRegularMutualFund




