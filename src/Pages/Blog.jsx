import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import colouredLogo from "../assets/images/colouredLogo.png"
import fiydaablog from "../assets/images/fiydaablog.png"
import writtenblog1 from "../assets/BlogsImages/writtenblog1.png"
import writtenblog2 from "../assets/BlogsImages/writtenblog2.png"
import writtenblog3 from "../assets/BlogsImages/blogWritten3.png"
import writtenBlog4 from "../assets/BlogsImages/writtenBlog4.png"
import PPFvsMutualFund from "../assets/BlogsImages/PPFvsMutualFund.png"
import CanaraBankGold from "../assets/BlogsImages/CanaraBankGold.png"
import CDeductions from "../assets/BlogsImages/80CDeductions.png"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';





const blogData = [
    {
        title: "Save on Taxes with Section 80C Deductions",
        imgSrc: CDeductions,
        author: "Team Fiydaa",
        date: "Jul 29, 2024",
        readTime: "5 min read",
        link: "/Blogs/CDeductions"
    },
    {
        title: "Canara Bank Gold Loan Interest Rates 2024",
        imgSrc: CanaraBankGold,
        author: "Team Fiydaa",
        date: "Jul 28, 2024",
        readTime: "5 min read",
        link: "/Blogs/CanaraBankGold"
    },
    {
        title: "PPF vs mutual fund",
        imgSrc: PPFvsMutualFund,
        author: "Team Fiydaa",
        date: "Jul 27, 2024",
        readTime: "5 min read",
        link: "/Blogs/PPFvsMutualFund"
    },
    {
        title: "Understanding ELSS Mutual Funds: A Comprehensive Guide",
        imgSrc: writtenBlog4,
        author: "Team Fiydaa",
        date: "Jul 26, 2024",
        readTime: "5 min read",
        link: "/Blogs/UnderstandingELSSMutualFunds"
    },
    {
        title: "ULIP vs Mutual Fund : Which Option Is Better For Investment",
        imgSrc: writtenblog3,
        author: "Team Fiydaa",
        date: "Jul 25, 2024",
        readTime: "4 min read",
        link: "/Blogs/ULIPvsMutuaFund"
    },
    {
        title: "Direct vs Regular Mutual Fund: Which One To Choose?",
        imgSrc: writtenblog2,
        author: "Team Fiydaa",
        date: "Jul 24, 2024",
        readTime: "4 min read",
        link: "/Blogs/DirectvsRegularMutualFund"
    },
    {
        title: "Difference in SIP vs Mutual Fund : Which one is better",
        imgSrc: writtenblog1,
        author: "Team Fiydaa",
        date: "Jul 23, 2024",
        readTime: "4 min read",
        link: "/Blogs/DifferenceinSIPvsMutualFund"
    },
    // {
    //     title: "Future of Finance: How Technology is Revolutionizing Wealth Management",
    //     imgSrc: "https://miro.medium.com/v2/resize:fit:828/format:webp/0*x3LQcFVvbUJjYrpl",
    //     author: "Team Fiydaa",
    //     date: "Jul 12, 2024",
    //     readTime: "4 min read",
    //     link: "/blog/digital-gold"
    // },

    // {
    //     title: "Maximize Your Returns: Top 10 Tips for Investing in Mutual Funds",
    //     imgSrc: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*lFQETgkDWlJwHYc-",
    //     author: "Team Fiydaa",
    //     date: "Jul 9, 2024",
    //     readTime: "4 min read",
    //     link: "/blog/digital-gold"
    // },

    // {
    //     title: "The Role of Digital Gold in Securing Your Wealth: A New Era of Investment",
    //     imgSrc: "https://miro.medium.com/v2/resize:fit:828/format:webp/0*1jy_oA0uZYQZ0KGX",
    //     author: "Team Fiydaa",
    //     date: "Jul 5, 2024",
    //     readTime: "3 min read",
    //     link: "/blog/digital-gold"
    // },
    // {
    //     title: "Mastering Your Finances: A Step-by-Step Guide to Building a Solid Saving Plan",
    //     imgSrc: "https://miro.medium.com/v2/resize:fit:828/format:webp/0*-s3DSjs6kQK_jdAh",
    //     author: "Team Fiydaa",
    //     date: "Jul 4, 2024",
    //     readTime: "4 min read",
    //     link: "/blog/saving-plan"
    // },
    // {
    //     title: "Understanding Your Credit Score",
    //     imgSrc: "https://miro.medium.com/v2/resize:fit:828/format:webp/0*dUETS017S7Jvzx0a",
    //     author: "Team Fiydaa",
    //     date: "Jul 3, 2024",
    //     readTime: "3 min read",
    //     link: "/blog/fourth-blog"
    // },
    // {
    //     title: "The Smart Way to Grow Your Wealth: Systematic Investment Plans (SIPs)",
    //     imgSrc: fiydaablog,
    //     author: "Team Fiydaa",
    //     date: "Jul 1, 2024",
    //     readTime: "3 min read",
    //     link: "/blog/sip"
    // },
];



function Blogs() {
    function updateMetaTags() {

        const titleElement = document.querySelector("title");
        const metaTitleElement = document.querySelector('meta[name="title"]');
        const descriptionElement = document.querySelector('meta[name="description"]');

        let title = "Empower Your Finances with FiYDAA Insights Blogs";
        let description = "Discover the latest insights and strategies to enhance your financial knowledge with Fiydaa blogs. Our blogs offer expert advice, up-to-date news, and practical tips to help you take control of your financial future.";


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
            <section class="mx-auto  pb-4 px-4 sm:px-8 bg-[#FCF9F7]">
                <div class="text-center space-y-4">
                    <h1 class="text-gray-800 font-bold text-4xl md:text-5xl">
                        Empower Your Finances with
                        <span class="text-indigo-600"> Fiydaa Insights</span>
                    </h1>
                    <p class="text-gray-800 max-w-3xl mx-auto leading-relaxed">
                        Discover the latest insights and strategies to enhance your financial knowledge with Fiydaa. Our platform offers expert advice, up-to-date news, and practical tips to help you take control of your financial future. Stay informed, stay ahead, and make smart financial decisions with Fiydaa.                    </p>
                </div>
            </section>

            <section className="py-4 bg-[#FCF9F7]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
                        {blogData.map((blog, index) => (
                            <Link to={blog.link} key={index} className="group cursor-pointer border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600 bg-[white]">
                                <div className="flex items-center mb-6">
                                    <img src={blog.imgSrc} alt={blog.title} className="rounded-lg w-full transition-transform transform scale-100 group-hover:scale-110" />
                                </div>
                                <div className="block">
                                    <h4 className="text-gray-900 font-medium leading-8 mb-3 text-lg font-poppins">{blog.title}</h4>
                                    {/* <h4 className="text-gray-900 font-medium leading-8 mb-3">{blog.title}</h4> */}

                                    <div className="flex items-center justify-between font-medium ">
                                        <div class="mt-auto flex items-center gap-x-3">
                                            {/* <img class="size-8 rounded-full transition-transform transform scale-100 group-hover:scale-110" src={colouredLogo} alt="Image Description" /> */}
                                            <div>
                                                <h6 className="text-sm text-gray-500 font-poppins">{blog.author}</h6>
                                            </div>
                                        </div>
                                        <span className="text-sm text-indigo-600">{blog.date} | {blog.readTime}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />


            {/* <section class="py-14 bg-[#FCF9F7]">
                <div
                    class="max-w-screen-xl mx-auto px-4 text-gray-600 gap-12 md:px-8 lg:flex"
                >

                    <div>
                        <ul
                            class="mt-12 gap-y-6 gap-x-12 items-center md:flex lg:gap-x-0 lg:mt-0"
                        >
                            <li
                                class="space-y-3 border-t py-6 md:max-w-sm md:py-0 md:border-t-0 lg:border-l lg:px-12 lg:max-w-none"
                            >
                                <div
                                    class="w-12 h-12 rounded-full border flex items-center justify-center text-gray-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                                        ></path>
                                    </svg>
                                </div>
                                <h4 class="text-gray-800 text-lg font-medium xl:text-xl">
                                    Join our community
                                </h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <a
                                    href="javascript:void(0)"
                                    class="flex items-center gap-1 text-sm text-indigo-600 duration-150 hover:text-indigo-400 font-medium"
                                >Join our Whatsapp<svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="w-5 h-5"
                                >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </a>
                            </li>
                            <li
                                class="space-y-3 border-t py-6 md:max-w-sm md:py-0 md:border-t-0 lg:border-l lg:px-12 lg:max-w-none"
                            >
                                <div
                                    class="w-12 h-12 rounded-full border flex items-center justify-center text-gray-700"
                                >
                                    <svg
                                        class="w-6 h-6"
                                        viewBox="0 0 48 48"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clip-path="url(#clip0_17_80)">
                                            <path
                                                d="M15.1003 43.5C33.2091 43.5 43.1166 28.4935 43.1166 15.4838C43.1166 15.0619 43.1072 14.6307 43.0884 14.2088C45.0158 12.815 46.679 11.0886 48 9.11066C46.205 9.90926 44.2993 10.4308 42.3478 10.6575C44.4026 9.42588 45.9411 7.491 46.6781 5.21159C44.7451 6.35718 42.6312 7.16528 40.4269 7.60128C38.9417 6.02318 36.978 4.97829 34.8394 4.62816C32.7008 4.27803 30.5064 4.64216 28.5955 5.66425C26.6846 6.68635 25.1636 8.30947 24.2677 10.2827C23.3718 12.2559 23.1509 14.4693 23.6391 16.5807C19.725 16.3842 15.8959 15.3675 12.4 13.5963C8.90405 11.825 5.81939 9.33893 3.34594 6.29909C2.0888 8.46655 1.70411 11.0314 2.27006 13.4722C2.83601 15.9131 4.31013 18.047 6.39281 19.44C4.82926 19.3904 3.29995 18.9694 1.93125 18.2119V18.3338C1.92985 20.6084 2.7162 22.8132 4.15662 24.5736C5.59704 26.334 7.60265 27.5412 9.8325 27.99C8.38411 28.3863 6.86396 28.4441 5.38969 28.1588C6.01891 30.1149 7.24315 31.8258 8.89154 33.0527C10.5399 34.2796 12.5302 34.9613 14.5847 35.0025C11.0968 37.7423 6.78835 39.2283 2.35313 39.2213C1.56657 39.2201 0.780798 39.1719 0 39.0769C4.50571 41.9676 9.74706 43.5028 15.1003 43.5Z"
                                                fill="currentColor"
                                            ></path>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_17_80">
                                                <rect width="48" height="48" fill="white"></rect>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <h4 class="text-gray-800 text-lg font-medium xl:text-xl">
                                    Follow us on Instagram
                                </h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <a
                                    href="javascript:void(0)"
                                    class="flex items-center gap-1 text-sm text-indigo-600 duration-150 hover:text-indigo-400 font-medium"
                                >follow on Instagram<svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="w-5 h-5"
                                >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </a>
                            </li>
                            <li
                                class="space-y-3 border-t py-6 md:max-w-sm md:py-0 md:border-t-0 lg:border-l lg:px-12 lg:max-w-none"
                            >
                                <div
                                    class="w-12 h-12 rounded-full border flex items-center justify-center text-gray-700"
                                >
                                    <svg
                                        class="w-6 h-6"
                                        viewBox="0 0 48 48"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clip-path="url(#clip0_17_80)">
                                            <path
                                                d="M15.1003 43.5C33.2091 43.5 43.1166 28.4935 43.1166 15.4838C43.1166 15.0619 43.1072 14.6307 43.0884 14.2088C45.0158 12.815 46.679 11.0886 48 9.11066C46.205 9.90926 44.2993 10.4308 42.3478 10.6575C44.4026 9.42588 45.9411 7.491 46.6781 5.21159C44.7451 6.35718 42.6312 7.16528 40.4269 7.60128C38.9417 6.02318 36.978 4.97829 34.8394 4.62816C32.7008 4.27803 30.5064 4.64216 28.5955 5.66425C26.6846 6.68635 25.1636 8.30947 24.2677 10.2827C23.3718 12.2559 23.1509 14.4693 23.6391 16.5807C19.725 16.3842 15.8959 15.3675 12.4 13.5963C8.90405 11.825 5.81939 9.33893 3.34594 6.29909C2.0888 8.46655 1.70411 11.0314 2.27006 13.4722C2.83601 15.9131 4.31013 18.047 6.39281 19.44C4.82926 19.3904 3.29995 18.9694 1.93125 18.2119V18.3338C1.92985 20.6084 2.7162 22.8132 4.15662 24.5736C5.59704 26.334 7.60265 27.5412 9.8325 27.99C8.38411 28.3863 6.86396 28.4441 5.38969 28.1588C6.01891 30.1149 7.24315 31.8258 8.89154 33.0527C10.5399 34.2796 12.5302 34.9613 14.5847 35.0025C11.0968 37.7423 6.78835 39.2283 2.35313 39.2213C1.56657 39.2201 0.780798 39.1719 0 39.0769C4.50571 41.9676 9.74706 43.5028 15.1003 43.5Z"
                                                fill="currentColor"
                                            ></path>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_17_80">
                                                <rect width="48" height="48" fill="white"></rect>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <h4 class="text-gray-800 text-lg font-medium xl:text-xl">
                                    Follow us on Twitter
                                </h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <a
                                    href="javascript:void(0)"
                                    class="flex items-center gap-1 text-sm text-indigo-600 duration-150 hover:text-indigo-400 font-medium"
                                >follow on Instagram<svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="w-5 h-5"
                                >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section> */}


            {/* <section class="py-14">
                <div
                    class="max-w-screen-xl mx-auto px-4 text-gray-600 gap-12 md:px-8 lg:flex"
                >
                    <div class="max-w-md">
                        <h3 class="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Let’s connect
                        </h3>
                        <p class="mt-3">
                            We’re here to help and answer any question you might have, We look
                            forward to hearing from you .
                        </p>
                    </div>
                    <div>
                        <ul
                            class="mt-12 gap-y-6 gap-x-12 items-center md:flex lg:gap-x-0 lg:mt-0"
                        >
                            <li
                                class="space-y-3 border-t py-6 md:max-w-sm md:py-0 md:border-t-0 lg:border-l lg:px-12 lg:max-w-none"
                            >
                                <div
                                    class="w-12 h-12 rounded-full border flex items-center justify-center text-gray-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                                        ></path>
                                    </svg>
                                </div>
                                <h4 class="text-gray-800 text-lg font-medium xl:text-xl">
                                    Join our community
                                </h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <a
                                    href="https://wa.me/+919053037500"
                                    target='blank'
                                    class="flex items-center gap-1 text-sm text-indigo-600 duration-150 hover:text-indigo-400 font-medium"
                                >Join our Whatsapp<svg
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="w-5 h-5"
                                >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </a>
                            </li>
                            <li
                                class="space-y-3 border-t py-6 md:max-w-sm md:py-0 md:border-t-0 lg:border-l lg:px-12 lg:max-w-none"
                            >
                                <div
                                    class="w-12 h-12 rounded-full border flex items-center justify-center text-gray-700"
                                >
                                    <svg
                                        class="w-6 h-6"
                                        viewBox="0 0 48 48"
                                        fill="none"
                                    >
                                        <g clip-path="url(#clip0_17_80)">
                                            <path
                                                d="M15.1003 43.5C33.2091 43.5 43.1166 28.4935 43.1166 15.4838C43.1166 15.0619 43.1072 14.6307 43.0884 14.2088C45.0158 12.815 46.679 11.0886 48 9.11066C46.205 9.90926 44.2993 10.4308 42.3478 10.6575C44.4026 9.42588 45.9411 7.491 46.6781 5.21159C44.7451 6.35718 42.6312 7.16528 40.4269 7.60128C38.9417 6.02318 36.978 4.97829 34.8394 4.62816C32.7008 4.27803 30.5064 4.64216 28.5955 5.66425C26.6846 6.68635 25.1636 8.30947 24.2677 10.2827C23.3718 12.2559 23.1509 14.4693 23.6391 16.5807C19.725 16.3842 15.8959 15.3675 12.4 13.5963C8.90405 11.825 5.81939 9.33893 3.34594 6.29909C2.0888 8.46655 1.70411 11.0314 2.27006 13.4722C2.83601 15.9131 4.31013 18.047 6.39281 19.44C4.82926 19.3904 3.29995 18.9694 1.93125 18.2119V18.3338C1.92985 20.6084 2.7162 22.8132 4.15662 24.5736C5.59704 26.334 7.60265 27.5412 9.8325 27.99C8.38411 28.3863 6.86396 28.4441 5.38969 28.1588C6.01891 30.1149 7.24315 31.8258 8.89154 33.0527C10.5399 34.2796 12.5302 34.9613 14.5847 35.0025C11.0968 37.7423 6.78835 39.2283 2.35313 39.2213C1.56657 39.2201 0.780798 39.1719 0 39.0769C4.50571 41.9676 9.74706 43.5028 15.1003 43.5Z"
                                                fill="currentColor"
                                            ></path>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_17_80">
                                                <rect width="48" height="48" fill="white"></rect>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <h4 class="text-gray-800 text-lg font-medium xl:text-xl">
                                    Follow us on Instagram
                                </h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <a
                                    href="https://www.instagram.com/fiydaaofficial/"
                                    target='blank'
                                    class="flex items-center gap-1 text-sm text-indigo-600 duration-150 hover:text-indigo-400 font-medium"
                                >Send us DMs on Instagram<svg
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="w-5 h-5"
                                >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </a>
                            </li>
                            <li
                                class="space-y-3 border-t py-6 md:max-w-sm md:py-0 md:border-t-0 lg:border-l lg:px-12 lg:max-w-none"
                            >
                                <div
                                    class="w-12 h-12 rounded-full border flex items-center justify-center text-gray-700"
                                >
                                    <svg
                                        class="w-6 h-6"
                                        viewBox="0 0 48 48"
                                        fill="none"
                                    >
                                        <g clip-path="url(#clip0_17_80)">
                                            <path
                                                d="M15.1003 43.5C33.2091 43.5 43.1166 28.4935 43.1166 15.4838C43.1166 15.0619 43.1072 14.6307 43.0884 14.2088C45.0158 12.815 46.679 11.0886 48 9.11066C46.205 9.90926 44.2993 10.4308 42.3478 10.6575C44.4026 9.42588 45.9411 7.491 46.6781 5.21159C44.7451 6.35718 42.6312 7.16528 40.4269 7.60128C38.9417 6.02318 36.978 4.97829 34.8394 4.62816C32.7008 4.27803 30.5064 4.64216 28.5955 5.66425C26.6846 6.68635 25.1636 8.30947 24.2677 10.2827C23.3718 12.2559 23.1509 14.4693 23.6391 16.5807C19.725 16.3842 15.8959 15.3675 12.4 13.5963C8.90405 11.825 5.81939 9.33893 3.34594 6.29909C2.0888 8.46655 1.70411 11.0314 2.27006 13.4722C2.83601 15.9131 4.31013 18.047 6.39281 19.44C4.82926 19.3904 3.29995 18.9694 1.93125 18.2119V18.3338C1.92985 20.6084 2.7162 22.8132 4.15662 24.5736C5.59704 26.334 7.60265 27.5412 9.8325 27.99C8.38411 28.3863 6.86396 28.4441 5.38969 28.1588C6.01891 30.1149 7.24315 31.8258 8.89154 33.0527C10.5399 34.2796 12.5302 34.9613 14.5847 35.0025C11.0968 37.7423 6.78835 39.2283 2.35313 39.2213C1.56657 39.2201 0.780798 39.1719 0 39.0769C4.50571 41.9676 9.74706 43.5028 15.1003 43.5Z"
                                                fill="currentColor"
                                            ></path>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_17_80">
                                                <rect width="48" height="48" fill="white"></rect>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <h4 class="text-gray-800 text-lg font-medium xl:text-xl">
                                    Follow us on Instagram
                                </h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <a
                                    href="https://www.instagram.com/fiydaaofficial/"
                                    target='blank'
                                    class="flex items-center gap-1 text-sm text-indigo-600 duration-150 hover:text-indigo-400 font-medium"
                                >Send us DMs on Instagram<svg
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="w-5 h-5"
                                >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section> */}


        </>

    );
}

export default Blogs;
