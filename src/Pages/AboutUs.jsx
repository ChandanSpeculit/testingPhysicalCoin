// import React, { useEffect } from "react";
// import "../App.css";
// import sahilImage from "../assets/images/Sahil_image.png"; // Import team member images
// import Snehali_image from "../assets/images/Snehali_image.png";
// import ishaan_image from "../assets/images/ishan.png"
// import Joedeep_image from "../assets/images/joedeep_image.png";
// import raghav_image from "../assets/images/raghav_image.png";
// import veer_image from "../assets/images/veer.png";
// import siddhant_image from "../assets/images/sidhant.jpg";
// import pankaj_image from "../assets/images/pankaj_image.png";
// import chandan_image from "../assets/images/chandan_image.jpg";
// import ansh_image from "../assets/images/Ansh.jpg";
// import rishabh_image from "../assets/images/rishabh.png";
// import janhvi_image from "../assets/images/Janhvi.jpg"
// import "../App.css";
// import Footer from "../components/Footer";
// import { FaLinkedin } from "react-icons/fa";
// import { Helmet } from "react-helmet";

// // import groupPhoto from "../assets/images/groupPhoto.png";

// const AboutUsPage = () => {
//   const founders = [
//     {
//       name: "Raghav Gupta",
//       designation: "Chief Executive Officer",
//       image:
//         raghav_image,
//       linkedin: "https://www.linkedin.com/in/raghav436/"
//     },
//     {
//       name: "Veerkaran Gill",
//       designation: "Chief Financial Officer",
//       image: veer_image,
//       linkedin: "https://www.linkedin.com/in/veerkarangill7/"
//     },
//     {
//       name: "Siddhanta Panda",
//       designation: "Chief Technology Officer",
//       image:
//         siddhant_image,
//       linkedin: "https://www.linkedin.com/in/siddhanta-panda-5b55a4178/"
//     },
//   ];
//   const teamMembers = [
//     {
//       name: "Ishaan Singh",
//       designation: "Technical Product Manager",
//       image:
//         ishaan_image,
//       linkedin: "https://www.linkedin.com/in/ishaansingh2402/"
//     },
//     {
//       name: "Pankaj Dharmik",
//       designation: "Software Development Engineer",
//       image:
//         pankaj_image,
//       linkedin: "https://www.linkedin.com/in/pankaj-d-551382294/"
//     },
//     {
//       name: "Joedeep Singh",
//       designation: "Software Development Engineer",
//       image: Joedeep_image,
//       linkedin: "https://www.linkedin.com/in/joedeep-singh-8ab372191/"
//     },
//     {
//       name: "Snehali Teltumbde",
//       designation: "Software Development Engineer",
//       image: Snehali_image,
//       linkedin: "https://www.linkedin.com/in/snehali-teltumbde-bb067a1b3/"
//     },
//     {
//       name: "Sahil Garg",
//       designation: "Software Development Engineer",
//       image: sahilImage,
//       linkedin: "https://www.linkedin.com/in/sahil-garg-2038aa138/"
//     },
//     {
//       name: "Ansh Kataria",
//       designation: "Software Development Engineer",
//       image:
//         ansh_image,
//       linkedin: "https://www.linkedin.com/in/ansh-kataria28/"
//     },
//     {
//       name: "Chandan Kumar",
//       designation: "Software Development Engineer",
//       image:
//         chandan_image,
//       linkedin: "https://www.linkedin.com/in/kaushikchandan6372/"
//     },

//     {
//       name: "Rishabh Sharma",
//       designation: "Software Development Engineer",
//       image:
//         rishabh_image,
//       linkedin: "https://www.linkedin.com/in/rishabh-sharma-99a303254/"
//     },
//     {
//       name: "Janhvi Singh",
//       designation: "Digital Marketing Manager",
//       image:
//         janhvi_image,
//       linkedin: "https://www.linkedin.com/in/janhvi-singh-246103227/"
//     },
//   ];

//   function updateMetaTags() {

//     const titleElement = document.querySelector("title");
//     const metaTitleElement = document.querySelector('meta[name="title"]');
//     const descriptionElement = document.querySelector('meta[name="description"]');

//     let title = "About Us | FiYDAA";
//     let description = "FiYDAA specializes in digital gold and mutual funds via advanced technology to provide intuitive and secure investment platforms.";


//     titleElement.textContent = title;
//     metaTitleElement.setAttribute("content", title);
//     descriptionElement.setAttribute("content", description);
//   }

//   useEffect(() => {
//     updateMetaTags();
//   })

//   return (
//     <>
//       <main class="flex  w-full flex-col items-center justify-center text-center mt-10 ">
//         <h1 class="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl">Fikar Nahi{" "}
//           <span class="relative whitespace-nowrap text-blue-900">
//             <span class="relative">Fiydaa</span>
//           </span>
//           {" "} Hai
//         </h1>
//         <p class="mx-auto mt-12 max-w-4xl text-lg text-slate-700 leading-7">
//           At Fiydaa, we are focused on transforming the investment
//           landscape in India. We specialize in digital gold and mutual
//           funds via leveraging advanced technology to provide intuitive
//           and secure platforms for investments. Recognizing the enduring
//           value of gold, we facilitate seamless digital gold
//           transactions and thus fostering diversified investment
//           portfolios.</p>

//       </main>




//       <div className="mt-20">
//         <div className="flex items-center justify-center">
//           <p class="mx-auto max-w-5xl font-display text-3xl font-bold tracking-normal text-slate-900 sm:text-4xl">Meet Our{" "}
//             <span class="relative whitespace-nowrap text-blue-900">
//               <span class="relative">Founders</span>
//             </span>
//           </p>
//         </div>

//         <div className="flex justify-center gap-24 items-center flex-wrap mt-10">

//           {founders.map((founder, index) => (
//             <FoundersCard
//               key={index}
//               name={founder.name}
//               designation={founder.designation}
//               image={founder.image}
//               linkedin={founder.linkedin}
//             />
//           ))}
//         </div>

//         <div className="flex items-center justify-center mt-28">
//           <p class="mx-auto max-w-4xl font-display text-3xl font-bold tracking-normal text-slate-900 sm:text-4xl">Meet Our{" "}
//             <span class="relative whitespace-nowrap text-blue-900">
//               <span class="relative">Team</span>
//             </span>
//           </p>
//         </div>
//         <div className="flex justify-center items-center flex-wrap mt-10">
//           {teamMembers.map((member, index) => (
//             <TeamCard
//               key={index}
//               name={member.name}
//               designation={member.designation}
//               image={member.image}
//               linkedin={member.linkedin}
//             />
//           ))}
//         </div>
//       </div>


//     </>
//   );
// };

// const FoundersCard = ({ image, name, designation, linkedin }) => {
//   return (
//     <div className="flex flex-col items-center  p-4 transform transition duration-500 hover:scale-110">
//       <div className="w-48 h-48 rounded-full overflow-hidden mb-4 drop-shadow-xl shadow-lg group cursor-pointer relative">
//         <img src={image} alt={name} className="w-full h-full object-cover transition-transform transform scale-100 group-hover:scale-110" />
//       </div>
//       <h3 className="text-lg font-semibold mb-1 text-gray-800">{name}</h3>
//       <div className="flex items-center gap-2">
//         <p className="text-md font-bold text-gray-800">{designation}</p>
//         <a href={linkedin} target="_blank" rel="noopener noreferrer">
//           <FaLinkedin className="text-darkBlue" />
//         </a>
//       </div>
//     </div>
//   );
// };

// const TeamCard = ({ image, name, designation, linkedin }) => {
//   return (
//     <div className="flex flex-col items-center justify-center mb-10 ml-5 mr-10 p-4 rounded-lg transform transition duration-500 hover:scale-110">
//       <div className="w-32 h-32 rounded-full overflow-hidden  mb-4 justify-center items-center drop-shadow-xl shadow-lg group cursor-pointer relative">
//         <img
//           src={image}
//           alt={name}
//           className="w-full h-full object-cover rounded-full mx-auto  transition-transform transform scale-100 group-hover:scale-110"
//         />
//       </div>
//       <h3 className="text-base text-left items-left font-semibold mb-1 text-black">
//         {name}
//       </h3>
//       <div className="flex items-center gap-2">
//         <p className="text-sm text-left text-black">{designation}</p>
//         <a href={linkedin} target="_blank" rel="noopener noreferrer">
//           <FaLinkedin className="text-darkBlue" />
//         </a>
//       </div>
//     </div>
//   );
// };
// export default AboutUsPage;


import React, { useEffect } from "react";
import "../App.css";
import sahilImage from "../assets/images/Sahil_image.png"; // Import team member images
import Snehali_image from "../assets/images/Snehali_image.png";
import ishaan_image from "../assets/images/ishan.png"
import Joedeep_image from "../assets/images/joedeep_image.png";
import raghav_image from "../assets/images/raghav_image.png";
import veer_image from "../assets/images/veer.png";
import siddhant_image from "../assets/images/sidhant.jpg";
import pankaj_image from "../assets/images/pankaj_image.png";
import chandan_image from "../assets/images/chandan_image.jpg";
import ansh_image from "../assets/images/Ansh.jpg";
import rishabh_image from "../assets/images/rishabh.png";
import janhvi_image from "../assets/images/Janhvi.jpg"
import "../App.css";
import Footer from "../components/Footer";
import { FaLinkedin } from "react-icons/fa";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";

// import groupPhoto from "../assets/images/groupPhoto.png";

const AboutUsPage = () => {
  const founders = [
    {
      name: "Raghav Gupta",
      designation: "Chief Executive Officer",
      image:
        raghav_image,
      linkedin: "https://www.linkedin.com/in/raghav436/"
    },
    {
      name: "Veerkaran Gill",
      designation: "Chief Financial Officer",
      image: veer_image,
      linkedin: "https://www.linkedin.com/in/veerkarangill7/"
    },
    {
      name: "Siddhanta Panda",
      designation: "Chief Technology Officer",
      image:
        siddhant_image,
      linkedin: "https://www.linkedin.com/in/siddhanta-panda-5b55a4178/"
    },
  ];
  const teamMembers = [
    {
      name: "Ishaan Singh",
      designation: "Technical Product Manager",
      image:
        ishaan_image,
      linkedin: "https://www.linkedin.com/in/ishaansingh2402/"
    },
    {
      name: "Pankaj Dharmik",
      designation: "Software Development Engineer",
      image:
        pankaj_image,
      linkedin: "https://www.linkedin.com/in/pankaj-d-551382294/"
    },
    // {
    //   name: "Joedeep Singh",
    //   designation: "Software Development Engineer",
    //   image: Joedeep_image,
    //   linkedin: "https://www.linkedin.com/in/joedeep-singh-8ab372191/"
    // },
    // {
    //   name: "Snehali Teltumbde",
    //   designation: "Software Development Engineer",
    //   image: Snehali_image,
    //   linkedin: "https://www.linkedin.com/in/snehali-teltumbde-bb067a1b3/"
    // },
    {
      name: "Sahil Garg",
      designation: "Software Development Engineer",
      image: sahilImage,
      linkedin: "https://www.linkedin.com/in/sahil-garg-2038aa138/"
    },
    {
      name: "Ansh Kataria",
      designation: "Software Development Engineer",
      image:
        ansh_image,
      linkedin: "https://www.linkedin.com/in/ansh-kataria28/"
    },
    {
      name: "Chandan Kumar",
      designation: "Software Development Engineer",
      image:
        chandan_image,
      linkedin: "https://www.linkedin.com/in/kaushikchandan6372/"
    },

    {
      name: "Rishabh Sharma",
      designation: "Software Development Engineer",
      image:
        rishabh_image,
      linkedin: "https://www.linkedin.com/in/rishabh-sharma-99a303254/"
    },
    // {
    //   name: "Janhvi Singh",
    //   designation: "Digital Marketing Manager",
    //   image:
    //     janhvi_image,
    //   linkedin: "https://www.linkedin.com/in/janhvi-singh-246103227/"
    // },
  ];

  function updateMetaTags() {

    const titleElement = document.querySelector("title");
    const metaTitleElement = document.querySelector('meta[name="title"]');
    const descriptionElement = document.querySelector('meta[name="description"]');

    let title = "About Us | FiYDAA";
    let description = "FiYDAA specializes in digital gold and mutual funds via advanced technology to provide intuitive and secure investment platforms.";


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
      <main class="flex  w-full flex-col items-center justify-center text-center mt-10 font-poppins">
        <h1 class="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-newDarkBlue sm:text-7xl">Fikar Nahi{" "}
          <span class="relative whitespace-nowrap text-newDarkGold">
            <span class="relative">Fiydaa</span>
          </span>
          {" "} Hai
        </h1>
        <p class="mx-auto mt-12 max-w-4xl text-lg text-newLightBlue leading-7">
          At Fiydaa, we are focused on transforming the investment
          landscape in India. We specialize in digital gold and mutual
          funds via leveraging advanced technology to provide intuitive
          and secure platforms for investments. Recognizing the enduring
          value of gold, we facilitate seamless digital gold
          transactions and thus fostering diversified investment
          portfolios.</p>

      </main>

      <div className="mt-20 font-poppins">
        <div className="flex items-center justify-center">
          <p class="mx-auto max-w-5xl font-display text-3xl font-bold tracking-normal text-newLightBlue sm:text-4xl">Meet Our{" "}
            <span class="relative whitespace-nowrap text-newDarkGold">
              <span class="relative">Founders</span>
            </span>
          </p>
        </div>

        <div className="flex justify-center gap-24 items-center flex-wrap mt-10">

          {founders.map((founder, index) => (
            <FoundersCard
              key={index}
              name={founder.name}
              designation={founder.designation}
              image={founder.image}
              linkedin={founder.linkedin}
            />
          ))}
        </div>

        <div className="flex items-center justify-center mt-28 font-poppins">
          <p class="mx-auto max-w-4xl font-display text-3xl font-bold tracking-normal text-newLightBlue sm:text-4xl">Meet Our{" "}
            <span class="relative whitespace-nowrap text-newDarkGold">
              <span class="relative">Team</span>
            </span>
          </p>
        </div>
        <div className="flex justify-center gap-24 items-center flex-wrap mt-10">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              name={member.name}
              designation={member.designation}
              image={member.image}
              linkedin={member.linkedin}
            />
          ))}
        </div>
      </div>
      <Footer />

    </>
  );
};

const FoundersCard = ({ image, name, designation, linkedin }) => {
  return (
    <div className="flex flex-col items-center p-4 transform transition duration-500 hover:scale-110 font-poppins">
      <div className="w-48 h-48 rounded-full overflow-hidden mb-4 drop-shadow-xl shadow-lg group cursor-pointer relative">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform transform scale-100 group-hover:scale-110" />
      </div>
      <h3 className="text-lg font-semibold mb-1 text-newLightBlue  ">{name}</h3>
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-newDarkGold">{designation}</p>
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-newDarkBlue" />
        </a>
      </div>
    </div>
  );
};

const TeamCard = ({ image, name, designation, linkedin }) => {
  return (


    <div className="flex flex-col items-center justify-center mb-10 ml-5 mr-10 p-4 rounded-lg transform transition duration-500 hover:scale-110 font-poppins">
      <div className="w-32 h-32 rounded-full overflow-hidden  mb-4 justify-center items-center drop-shadow-xl shadow-lg group cursor-pointer relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-full mx-auto  transition-transform transform scale-100 group-hover:scale-110"
        />
      </div>
      <h3 className="text-base text-left items-left font-semibold mb-1 text-black">
        {name}
      </h3>
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-newDarkGold">{designation}</p>
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-newDarkBlue" />
        </a>
      </div>
    </div>
  );
};
export default AboutUsPage;