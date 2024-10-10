import React from "react";
import navbarLogo from "../assets/images/navlogo.png";
import playStoreButton from "../assets/images/Play Store.png";
import appStoreButton from "../assets/images/App Store.png"


function Footer() {
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

  const footerNavs = [
    {
      label: "Company",
      items: [
        {
          href: 'javascript:void()',
          name: 'Partners'
        },
        {
          href: '/Blogs',
          name: 'Blog'
        },
        {
          href: 'javascript:void()',
          name: 'Team'
        },
        {
          href: 'javascript:void()',
          name: 'Careers'
        },
      ],
    },
    {
      label: "Resources",
      items: [
        {
          href: '/Contact',
          name: 'Contact'
        },
        {
          href: '/Contact',
          name: 'Support'
        },
        {
          href: '/Insights',
          name: 'Insights'
        },
        {
          href: 'Delete-Account',
          name: 'Delete Account'
        },
      ],
    },
    {
      label: "About",
      items: [
        {
          href: '/terms_condition',
          name: 'Terms'
        },
        {
          href: '/terms_condition',
          name: 'License'
        },
        {
          href: '/Privacy-Policy',
          name: 'Privacy'
        },
        {
          href: '/About',
          name: 'About US'
        },
      ]
    }
  ]

  return (
    <footer className="mt-2 bg-white px-4 py-5 border-t border-newDarkGold lg:px-20 md:px-8 ">
      <div className="gap-6 justify-between md:flex">
        <div className="flex-1">
          <div className="max-w-xs">
            <img src={navbarLogo} className="w-32" />
            <p className="leading-relaxed mt-4 text-[15px] text-newDarkBlue font-poppins ">
              1ST FLOOR, 945/3, Pachranga Bazar, Panipat, Haryana, 132103
            </p>
          </div>
          <div className="mt-6">
            <p className="text-newLightBlue font-semibold font-poppins">Get the app</p>
            <div className="flex gap-5 justify-start items-center">
              <a
                href="https://play.google.com/store/apps/details?id=com.fiydaa&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
                id='PlayStoreButton'

              >
                <img
                  src={playStoreButton}
                  alt="Play Store"
                  className="h-12 lg:h-16"
                />
              </a>
              <a
                href="https://apps.apple.com/in/app/fiydaa-fintech-hub-by-speculit/id6475651556"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
                id='AppleStoreButton'

              >
                <img
                  src={appStoreButton}
                  alt="App Store"
                  className="h-12 lg:h-16"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex-1 mt-10 items-center justify-between flex md:mt-0">
          {
            footerNavs.map((item, idx) => (
              <ul
                className="space-y-4 "
                key={idx}
              >
                <h4 className="text-newDarkBlue font-poppins font-semibold">
                  {item.label}
                </h4>
                {
                  item.items.map(((el, idx) => (
                    <li key={idx}>
                      <a
                        href={el.href}
                        className="hover:underline text-newLightBlue font-poppins"

                      >
                        {el.name}
                      </a>
                    </li>
                  )))
                }
              </ul>
            ))
          }
        </div>
      </div>
      <div className="mt-8 py-6 border-t items-center justify-between sm:flex">
        <div className="mt-4 sm:mt-0 text-newDarkBlue font-poppins text-center sm:text-left">
          &copy; 2024 Clearwater Capital Pvt Ltd.  All rights reserved.
        </div>
        <div className="mt-6 sm:mt-0 ">
          <ul className="flex items-center justify-center sm:justify-start space-x-4">
            <li className="z-10 w-10 h-10 border border-newDarkGold rounded-full flex items-center justify-center">
              <a href="https://www.instagram.com/fiydaaofficial/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="url(#instagram-gradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="instagram-logo"
                >
                  <defs>
                    <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "#f58529", stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: "#dd2a7b", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#8134af", stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </li>

            <li className="z-10 w-10 h-10 border border-newDarkGold rounded-full flex items-center justify-center">
              <a target="_blank" href="https://www.facebook.com/share/sH8PDwhjNnz2UJvt/?mibextid=qi2Omg">
                <svg class="svg-icon w-6 h-6 text-blue-700" viewBox="0 0 20 20">
                  <path fill="none" d="M11.344,5.71c0-0.73,0.074-1.122,1.199-1.122h1.502V1.871h-2.404c-2.886,0-3.903,1.36-3.903,3.646v1.765h-1.8V10h1.8v8.128h3.601V10h2.403l0.32-2.718h-2.724L11.344,5.71z"></path>
                </svg>
              </a>
            </li>

            <li className="z-10 w-10 h-10 border border-newDarkGold rounded-full flex items-center justify-center">
              <a href="https://www.youtube.com/@thefiydaaexperience" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="none"
                  className="youtube-logo"
                >
                  <path
                    fill="#FF0000"
                    d="M23.498 6.186a2.997 2.997 0 0 0-2.11-2.122C19.812 3.499 12 3.499 12 3.499s-7.812 0-9.388.565A2.997 2.997 0 0 0 .502 6.186 31.987 31.987 0 0 0 0 11.998c.002 1.946.147 3.882.502 5.812a2.997 2.997 0 0 0 2.11 2.122C4.188 20.501 12 20.501 12 20.501s7.812 0 9.388-.565a2.997 2.997 0 0 0 2.11-2.122c.355-1.93.5-3.866.502-5.812a31.987 31.987 0 0 0-.502-5.812z"
                  />
                  <polygon fill="#FFF" points="9.75,15.02 15.5,11.998 9.75,8.976" />
                </svg>

              </a>
            </li>

            <li className="z-10 w-10 h-10 border border-newDarkGold rounded-full flex items-center justify-center">
              <a href="https://www.linkedin.com/company/fiydaa/" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 34 34"
                  fill="none"
                  className="linkedin-logo"
                >
                  <rect width="34" height="34" fill="#FFFFFF" rx="4" />
                  <path
                    fill="#0A66C2"
                    d="M8.333 12.738h3.561v10.799H8.333v-10.8zm1.78-5.401c-1.148 0-2.08.933-2.08 2.081 0 1.148.932 2.08 2.08 2.08 1.148 0 2.08-.932 2.08-2.08-.001-1.148-.933-2.081-2.08-2.081zm6.294 5.401h3.414v1.476h.048c.476-.902 1.637-1.848 3.371-1.848 3.607 0 4.275 2.372 4.275 5.453v6.217h-3.561v-5.509c0-1.314-.025-3.004-1.83-3.004-1.83 0-2.11 1.429-2.11 2.904v5.61h-3.56v-10.8z"
                  />
                </svg>




              </a>
            </li>
          </ul>
        </div>
      </div>
      <style jsx>
        {`
                .svg-icon path,
                .svg-icon polygon,
                .svg-icon rect {
                    fill: currentColor;
                }
            `}
      </style>
    </footer>

  );
}

export default Footer;