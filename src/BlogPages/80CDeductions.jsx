import React, { useEffect, useState } from 'react'
import writtenblog1 from "../assets/BlogsImages/80CDeductions.png"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function CDeductions() {

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
            name: "Jul 29, 2024",
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

        let title = "Save on Taxes with Section 80C Deductions";
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
                            Save on Taxes with Section 80C Deductions                        </h1>
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
                                Save on Taxes with Section 80C Deductions                           </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                Tax season can be daunting, but it doesn't have to be. Section 80C of the Income Tax Act, India, offers a powerful tool to reduce your tax burden and boost your savings. In this blog, we'll break down everything you need to know about the 80C deduction list, making tax-saving easy for you. </p>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                What is Section 80C                           </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                Section 80C allows you to claim deductions on certain investments and expenses up to a maximum of ₹1.5 lakh per financial year. This deduction reduces your taxable income, which means you pay less tax. It’s a great way to save money while planning for your future.
                            </p>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Eligibility and Limits                          </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                Eligibility for Section 80C deductions includes individuals and Hindu Undivided Families (HUFs). Qualified investments and expenses cover contributions to PPF, EPF, ELSS, life insurance premiums, and tuition fees. The total deduction limit is ₹1.5 lakh per financial year. Each investment has specific conditions, such as a three-year lock-in for ELSS and a 15-year maturity for PPF. Knowing these details helps in effective financial planning and ensures tax compliance.
                            </p>
                        </div>


                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Eligible Investments under Section 80C
                            </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                Section 80C covers a wide range of investments and contributions that can be claimed as deductions. Here's a table outlining the most common options:
                            </p>
                        </div>


                        <div class="flex-1 max-w-5xl">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">Sub-Section</th>
                                        <th scope="col" class="px-6 py-3">Eligible Investments</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Section 80C
                                        </th>
                                        <td class="px-6 py-4">
                                            <ul>
                                                <li>Provident Funds (EPF, PPF)</li>
                                                <li>Life Insurance Premiums</li>
                                                <li>Equity Linked Saving Schemes (ELSS)</li>
                                                <li>Principal Repayment of Home Loan</li>
                                                <li>Sukanya Samriddhi Yojana (SSY)</li>
                                                <li>National Savings Certificate (NSC)</li>
                                                <li>Senior Citizen Savings Scheme (SCSS)</li>
                                                <li>ULIPs (with certain conditions)</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Section 80CCC
                                        </th>
                                        <td class="px-6 py-4">
                                            <ul>
                                                <li>Pension Plans of Public Sector Undertakings (PSUs)</li>
                                                <li>Mutual Fund contributions towards Employer Sponsored Schemes</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Section 80CCD(1)
                                        </th>
                                        <td class="px-6 py-4">
                                            <ul>
                                                <li>National Pension System (NPS) contributions (by individual)</li>
                                                <li>Atal Pension Yojana contributions</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Section 80CCD(1B)
                                        </th>
                                        <td class="px-6 py-4">
                                            <ul>
                                                <li>Additional NPS contributions (up to Rs.50,000)</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Section 80CCD(2)
                                        </th>
                                        <td class="px-6 py-4">
                                            <ul>
                                                <li>Employer's contribution towards NPS (up to 10% of salary)</li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>



                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Key Items in the 80C Deduction List                            </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                Section 80C of the Income Tax Act, 1961 offers various tax-saving instruments to reduce your taxable income. Here’s a summary of the eligible investments:
                            </p>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Life Insurance
                            </h2>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Premiums paid towards life insurance policies qualify for deductions up to ₹1,50,000.
                            </li>
                            <li>Returns from these policies are tax-exempt under Section 10(10D) of the Income Tax Act.</li>
                        </div>


                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Public Provident Fund (PPF)
                            </h2>
                            <li className="text-gray-600 mt-3 font-poppins">
                                A long-term, government-backed savings scheme.
                            </li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Deposits made to PPF accounts are deductible up to ₹1,00,000 under Section 80C.</li>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Equity Linked Savings Scheme (ELSS) Funds
                            </h2>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Investments in ELSS are eligible for a maximum deduction of ₹1,50,000.
                            </li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                ELSS has a 3-year lock-in period.</li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Returns on ELSS held for more than a year are considered Long Term Capital Gains (LTCG), taxed at 10% without indexation benefits.</li>

                            <p className="text-gray-600 mt-3 font-poppins">
                                With Fiydaa, you can buy all kinds of funds, including ELSS, and start your journey towards financial freedom. Download the app now and explore our range of investment options!</p>
                        </div>



                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Employee Provident Fund (EPF)
                            </h2>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Contributions to EPF are eligible for tax benefits up to ₹1,50,000.
                            </li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                EPF contributions provide long-term retirement savings.
                            </li>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                National Savings Certificates (NSC)
                            </h2>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Government-initiated saving instrument with a 5-year tenure.
                            </li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Interest earned on NSC is deductible under Section 80C.
                            </li>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Sukanya Samriddhi Yojana (SSY)
                            </h2>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Savings scheme for the girl child with a policy tenure of 21 years.
                            </li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Contributions are deductible up to ₹1,50,000 under Section 80C.
                            </li>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Unit Linked Insurance Plan (ULIP)
                            </h2>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Combines insurance with investment.
                            </li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Premiums paid are deductible up to ₹1,50,000 under Section 80C.
                            </li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Returns from ULIP are also exempt under Section 10(10D).
                            </li>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                NABARD Rural Bonds
                            </h2>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Issued by the National Bank for Agriculture and Rural Development.
                            </li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Investments in these bonds are deductible up to ₹1,50,000 under Section 80C.
                            </li>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Tax-Saving Fixed Deposits (Tax-Saver FDs)
                            </h2>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Offered by banks and post offices with a minimum lock-in period of 5 years.
                            </li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Investments are deductible up to ₹1,50,000 under Section 80C.
                            </li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Interest earned on these FDs is taxable.
                            </li>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Infrastructure Bonds
                            </h2>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Investments of ₹20,000 or more in infrastructure bonds qualify for deductions.
                            </li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Up to ₹1,50,000 can be deducted under Section 80C.
                            </li>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Senior Citizen Savings Scheme (SCSS)
                            </h2>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Available for individuals aged 60 and above.
                            </li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Requires a minimum investment lock-in period of 5 years, extendable by 3 years.
                            </li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                Contributions up to ₹1,50,000 are deductible under Section 80C.
                            </li>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Other 80C Deduction Options
                            </h2>
                            <p className="text-gray-600 mt-3 font-poppins">

                                While many taxpayers opt for well-known tax-saving instruments, there are other lesser-known investment options that qualify for deductions under Section 80C. Here’s a detailed list:
                            </p>
                        </div>

                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                National Housing Bank (NHB) Pension Fund/Deposit Scheme
                            </h2>
                            <li className="text-gray-600 mt-3 font-poppins">
                                <strong>Details:</strong> Investments made in the NHB pension fund or deposit schemes are eligible for tax deductions. These schemes are designed to provide a steady income post-retirement.
                            </li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                <strong>Benefits:</strong> Offers a reliable source of income during retirement while also providing tax benefits on the invested amount.
                            </li>
                        </div>

                        <div className="flex-1 max-w-4xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Contribution by Employee to Approved Superannuation Fund
                            </h2>
                            <li className="text-gray-600 mt-3 font-poppins">
                                <strong>Details:</strong> Contributions made by employees to an approved superannuation fund are eligible for tax deductions under Section 80C. These funds help in building a retirement corpus.
                            </li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                <strong>Benefits:</strong> Facilitates the accumulation of a substantial retirement savings corpus, with the added advantage of tax deductions.
                            </li>
                        </div>

                        <div className="flex-1 max-w-4xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Contribution to Annuity Plans by LIC or Other Government-Approved Insurers
                            </h2>
                            <li className="text-gray-600 mt-3 font-poppins">
                                <strong>Details:</strong> Premiums paid towards annuity plans from LIC or other government-approved insurers qualify for tax deductions. These plans provide regular income post-retirement.
                            </li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                <strong>Benefits:</strong> Ensures a steady stream of income during retirement while also providing tax benefits on the premiums paid.
                            </li>
                        </div>

                        <div className="flex-1 max-w-4xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Subscription to National Bank for Agriculture and Rural Development (NABARD) Bonds
                            </h2>
                            <li className="text-gray-600 mt-3 font-poppins">
                                <strong>Details:</strong> Investments in NABARD Rural Bonds are eligible for tax deductions under Section 80C. These bonds support rural development initiatives.
                            </li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                <strong>Benefits:</strong> Supports agricultural and rural development while providing tax benefits on the invested amount.
                            </li>
                        </div>

                        <div className="flex-1 max-w-4xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Subscription to Notified Deposit Scheme of Public Sector Housing Finance Companies
                            </h2>
                            <li className="text-gray-600 mt-3 font-poppins">
                                <strong>Details:</strong> Investments in specified deposit schemes of public sector housing finance companies qualify for tax deductions. These schemes encourage saving for housing purposes.
                            </li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                <strong>Benefits:</strong> Promotes saving for home-related expenses with the added advantage of tax benefits.
                            </li>
                        </div>

                        <div className="flex-1 max-w-4xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Subscription to Equity Shares or Debentures of a Public Company or Public Financial Institution
                            </h2>
                            <li className="text-gray-600 mt-3 font-poppins">
                                <strong>Details:</strong> Investments in equity shares or debentures of public companies or financial institutions that are part of an eligible issue of capital approved by the board, where proceeds are used for infrastructure, qualify for tax deductions under Section 80C.
                            </li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                <strong>Benefits:</strong> Contributes to infrastructure development while providing tax benefits on the invested amount.
                            </li>
                        </div>

                        <div className="flex-1 max-w-4xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Institution                            </h2>
                            <li className="text-gray-600 mt-3 font-poppins">
                                <strong>Details:</strong> Details: Investments in equity shares or debentures of public companies or financial institutions that are part of an eligible issue of capital approved by the board, where proceeds are used for infrastructure, qualify for deductions.
                            </li>
                            <li className="text-gray-600 mt-3 font-poppins">
                                <strong>Benefits:</strong>
                                Benefits: Supports infrastructure development while providing tax benefits
                            </li>
                        </div>



                        <div className="flex-1 max-w-5xl">
                            <h2 className="text-2xl font-bold font-poppins">
                                Conclusion :
                            </h2>
                            <p className="text-gray-600 mt-3 font-poppins">
                                Saving on taxes can be simple with Section 80C. By using the different options available, you can lower your taxable income and save more money. Whether you choose traditional options like PPF and EPF or newer ones like ELSS and ULIPs, the 80C deduction list has something for everyone. Just plan your investments carefully and keep up with tax rules to get the most benefit.
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

export default CDeductions




