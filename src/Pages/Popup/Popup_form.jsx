import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Swal from "sweetalert2";
import Typography from "@mui/material/Typography";
import AppleIcon from '@mui/icons-material/Apple';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import QrCodeIcon from '@mui/icons-material/QrCode';
import InfoIcon from '@mui/icons-material/Info';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import newpopup from '../../assets/images/newpopup.png'
import Footer from '../../components/Footer';
import { API_GATEWAY_URL } from '../../config/env-vars';

function Popup_form() {
  const [openModal, setOpenModal] = useState(false);
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {

    setIsSubmitted(true);

    e.preventDefault();
    if (formData.name.trim() === '' || formData.email.trim() === '') {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields.",
      });
      setIsSubmitted(false);
      return;
    }

    // const checkEmailUrl = checkEmailUrl_env;
    // const saveEmailUrl = saveEmailUrl_env;

    fetch(`${API_GATEWAY_URL}CheckBetaUsersEmail`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: formData.email }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {

        setIsSubmitted(false);

        let parsedData = JSON.parse(data.body);
        console.log("data", parsedData);
        if (parsedData.exists === true) {
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: 'This email is already in use. Please try another email.',
          // });
          // setOpenModal(true);
          setIsSubmitted(false);
          setDuplicateModalOpen(true);
          return;
        }
        else {
          fetch(`${API_GATEWAY_URL}Beta_users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: formData.email }),
          });

          console.log('Data saved successfully.');
          setOpenModal(true); // Open the modal after successful saving
          setIsSubmitted(false);
        }
      })
      .catch((error) => {
        setIsSubmitted(false);
        console.error(`There was a problem with the fetch operation:`, error);
      });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDuplicateCloseModal = () => {
    setDuplicateModalOpen(false);
  };



  const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#05226B',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#05226B',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }));

  function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }

  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
  };

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient(90deg, rgba(5,34,107,1) 0%, rgba(5,34,107,1) 15%, rgba(5,34,107,1) 100%, rgba(5,34,107,1) 100%)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient(90deg, rgba(5,34,107,1) 0%, rgba(5,34,107,1) 15%, rgba(5,34,107,1) 100%, rgba(5,34,107,1) 100%)"
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        "linear-gradient(90deg, rgba(5,34,107,1) 0%, rgba(5,34,107,1) 15%, rgba(5,34,107,1) 100%, rgba(5,34,107,1) 100%)",
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient(90deg, rgba(5,34,107,1) 0%, rgba(5,34,107,1) 15%, rgba(5,34,107,1) 100%, rgba(5,34,107,1) 100%)',
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <QrCodeIcon />,
      2: <InfoIcon />,
      3: <CloudDownloadIcon />,
      // 4: <VpnKeyIcon />,


    };

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };

  const steps = ['Scan the QR Code ', 'Enter Details', 'Download the App',];

  return (
    <>
      <section class="pt-8 flex">
        <div class="max-w-6xl px-1 mx-auto lg:px-6">
          <div class="flex flex-col items-center h-full justify-center md:flex-row">
            <div class="flex flex-wrap items-center ">
              <div class="relative hidden w-3/4 mb-12 lg:block lg:w-2/4 lg:mb-20 lg:-mt-10">
                {/* <div class="absolute inset-0 z-10 bg-gray-700 opacity-25"></div> */}
                <img src={newpopup} alt=""
                  class="relative inset-0 object-cover w-full h-2/4" />
              </div>

              <div className="w-full px-2 lg:px-4 lg:w-2/4 lg:mb-0 lg:py-0 py-7">
                <div className="px-6 text-left">
                  <h2 class="text-4xl font-bold text-gray-900 lg:text-2xl">
                    <span class="text-darkBlue">Hello! </span> Signup Towards Your Financial Future & Learn The Power Of Smart Investments !
                  </h2>
                  <h2 className="text-3xl font-bold leading-tight text-darkBlue my-7 md:text-4xl ">
                    Welcome!
                  </h2>
                  <form onSubmit={handleSubmit} className="mt-6 mb-4">
                    {/* Form fields */}
                    <div>
                      <label htmlFor="name" className="text-gray-700 font-semibold">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full focus:outline-none border-b-2 py-2 my-2 "
                        name="name"
                        id="name"
                        placeholder="Enter your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-gray-700 font-semibold">
                        Email:
                      </label>
                      <input
                        type="email"
                        className="w-full focus:outline-none border-b-2 py-2 my-2"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <button
                      className={`px-4 py-3 mt-2 font-semibold text-white bg-darkBlue rounded-lg ${isSubmitted ? "opacity-90" : ""}  duration-300 hover:scale-105 hover:bg-white hover:text-darkBlue border hover:shadow-xl hover:shadow-darkBlue`}
                      type="submit"
                      disabled={isSubmitted}

                    >
                      SUBMIT
                    </button>
                    <Stack sx={{ width: '100%', marginTop: '10%' }} spacing={4}>
                      <Stepper alternativeLabel activeStep={3} connector={<ColorlibConnector />}>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Stack>
                  </form>

                  {/* Modal for success message */}
                  <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={{
                      position: "absolute",
                      width: 400,
                      textAlign: "center",
                      bgcolor: "background.paper",
                      border: "none",
                      borderRadius: "20px",
                      boxShadow: 24,
                      p: 4,
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}>
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "-30px",
                          fontSize: "20px",
                          color: "#1872CE",
                        }}
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >Thank You
                      </Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "-30px",
                          fontSize: "20px",
                          color: "#1872CE",
                          mt: 2,
                        }}
                        id="modal-modal-description"
                      >

                        <h2 id="modal-modal-title">Email Registration Successful !!</h2>
                        <h6 style={{ color: 'blue' }}>Download our app</h6>

                      </Typography>

                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "25ich" },
                          width: "70%",
                          margin: "auto",
                          marginTop: "10px",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <Button variant='contained' style={{ display: 'flex', alignItems: 'center', paddingRight: '10' }}>

                          <a href="https://testflight.apple.com/join/ux3U4L2s">
                            <AppleIcon />
                          </a>
                          <a href="https://testflight.apple.com/join/ux3U4L2s" style={{ textDecoration: 'none', marginLeft: '5px' }}>
                            IOS
                          </a>
                        </Button>
                        <br />

                        <Button variant='contained' style={{ display: 'flex', alignItems: 'center', paddingRight: '10' }}>

                          <a href="https://apkfiydaa.s3.amazonaws.com/android/apk_v2.apk">
                            <PhoneAndroidIcon />
                          </a>
                          <a href="https://apkfiydaa.s3.amazonaws.com/android/apk_v2.apk" style={{ textDecoration: 'none', marginLeft: '5px' }}>
                            ANDROID
                          </a>
                        </Button>
                      </Box>
                    </Box>
                  </Modal>

                  {/* test */}

                  <Modal
                    open={duplicateModalOpen}
                    onClose={handleDuplicateCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={{
                      position: "absolute",
                      width: 400,
                      textAlign: "center",
                      bgcolor: "background.paper",
                      border: "none",
                      borderRadius: "20px",
                      boxShadow: 24,
                      p: 4,
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}>
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "-30px",
                          fontSize: "20px",
                          color: "#1872CE",
                        }}
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >Thank You
                      </Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "-30px",
                          fontSize: "20px",
                          color: "#1872CE",
                          mt: 2,
                        }}
                        id="modal-modal-description"
                      >

                        <h2 id="modal-modal-title">Email already registered !!</h2>
                        <h6 style={{ color: 'blue' }}>Download our app</h6>

                      </Typography>

                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "25ich" },
                          width: "70%",
                          margin: "auto",
                          marginTop: "10px",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <Button variant='contained' style={{ display: 'flex', alignItems: 'center', paddingRight: '10' }}>

                          <a href="https://testflight.apple.com/join/ux3U4L2s">
                            <AppleIcon />
                          </a>
                          <a href="https://testflight.apple.com/join/ux3U4L2s" style={{ textDecoration: 'none', marginLeft: '5px' }}>
                            IOS
                          </a>
                        </Button>
                        <br />

                        <Button variant='contained' style={{ display: 'flex', alignItems: 'center', paddingRight: '10' }}>

                          <a href="https://apkfiydaa.s3.amazonaws.com/android/apk_v2.apk">
                            <PhoneAndroidIcon />
                          </a>
                          <a href="https://apkfiydaa.s3.amazonaws.com/android/apk_v2.apk" style={{ textDecoration: 'none', marginLeft: '5px' }}>
                            ANDROID
                          </a>
                        </Button>
                      </Box>
                    </Box>
                  </Modal>


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section class="flex items-center justify-center bg-gray-100 ">
        <div class="px-4 py-20 mx-auto max-w-7xl">
          <div class="flex flex-wrap items-center gap-8 lg:flex-nowrap">
            <div class="w-full lg:w-1/2">
              <div class="relative">
                <h1 class="absolute -top-14 left-0 text-[120px] font-bold opacity-5 md:block hidden">
                  FEATURE
                </h1>
                <h1 class="text-5xl font-bold "> Our <span class="text-blue-900"> Features
                </span> </h1>
                <div class="flex w-24 mt-1 mb-6 overflow-hidden rounded md:mb-14">
                  <div class="flex-1 h-2 bg-blue-300">
                  </div>
                  <div class="flex-1 h-2 bg-blue-600">
                  </div>
                  <div class="flex-1 h-2 bg-blue-900">
                  </div>
                </div>
              </div>
              <p class="mb-4 text-base font-medium
               text-gray-600 lg:mb-16">
                Fiydaa introduces a revolutionary approach to managing your finances by offering a seamless platform for buying and selling gold digitally. As we prepare to launch this groundbreaking financial application, we are diligently refining every aspect of our service to ensure an unparalleled user experience. We are dedicated to presenting a cutting-edge solution that empowers you in your gold transactions.
                While we are meticulously perfecting the final details, we invite you to be a part of our private beta phase. By signing up, you will secure early access and receive an exclusive invite code as we near our official launch. Join us in shaping the future of digital gold transactions and witness the innovation firsthand. Experience the ease and efficiency of buying and selling gold through Fiydaa – your gateway to a new era in financial management.
              </p>
            </div>
            <div class="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
              <div
                class="w-full p-8 text-center transition-all bg-white rounded shadow  hover:shadow-lg">
                <div class="inline-block p-4 mb-4 bg-blue-900 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                    class="text-white" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                      d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm-.5 5a.5.5 0 0 1 1 0v1.5H10a.5.5 0 0 1 0 1H8.5V9a.5.5 0 0 1-1 0V7.5H6a.5.5 0 0 1 0-1h1.5V5z" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-black "> Digital Gold </h3>
              </div>


              <div
                class="w-full p-8 text-center transition-all bg-white rounded shadow hover:shadow-lg">
                <div class="inline-block p-4 mb-4 bg-blue-900 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                    class="text-white" viewBox="0 0 16 16">
                    <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
                    <path
                      d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
                  </svg>

                </div>
                <h3 class="text-lg font-semibold text-black"> SIP </h3>
              </div>


              <div
                class="w-full p-8 text-center transition-all bg-white rounded shadow  hover:shadow-lg">
                <div class="inline-block p-4 mb-4 bg-blue-900 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                    class="text-white" viewBox="0 0 16 16">
                    <path
                      d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                    <path
                      d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-black "> Credit Score </h3>
              </div>


              <div
                class="w-full p-8 text-center transition-all bg-white rounded shadow  hover:shadow-lg">
                <div class="inline-block p-4 mb-4 bg-blue-900 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                    class="text-white" viewBox="0 0 16 16">
                    <path
                      d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z">
                    </path>
                    <path
                      d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z">
                    </path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-black "> Mutual Funds </h3>
              </div>


            </div>
          </div>
        </div>
      </section>


      <section class="flex items-center pt-5 ">
        <div class="p-4 mx-auto max-w-7xl">
          <div class=" text-center">
            <h1 class="mb-4 text-3xl font-bold "> Our Partners </h1>
          </div>
          <div class="flex ">
            <div class="grid grid-cols-1 gap-4 lg:gap-8 sm:gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div class="relative mb-10 border-b-4 border-blue-900 " href="#">
                <div class="z-20 pt-8 pb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    class="absolute top-0 left-0 w-20 h-20 opacity-10" viewBox="0 0 16 16">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                  </svg>
                  <div class="text-center">
                    <div class="relative inline-block w-32 h-32 mb-10 text-xs text-white rounded">
                      <div
                        class="absolute w-24 h-24 border-t-4 border-r-4 border-blue-900 -top-4 -right-4">
                      </div>
                      <img class="object-cover w-full h-full"
                        src="https://images.yourstory.com/cs/images/companies/JSuIEEhu400x400-1647386694822.jpg?fm=auto&ar=1:1&mode=fill&fill=solid&fill-color=fff"
                        alt="" />
                      <div
                        class="absolute w-24 h-24 border-b-4 border-l-4 border-blue-900 -bottom-4 -left-4">
                      </div>
                    </div>
                  </div>
                  {/* <p class="mb-4 text-base leading-7 text-gray-400">
                    Keep on jumping to get the most of the jump rope exercise. It will help you to increase
                    your
                    bone density as well
                  </p> */}
                  <h2 class="text-lg font-bold leading-9 text-black ">
                    Augmont
                  </h2>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    class="absolute right-0 w-20 h-20 rotate-180 bottom-4 opacity-10" viewBox="0 0 16 16">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                  </svg>
                </div>
              </div>
              <div class="relative mb-10 border-b-4 border-blue-900 " href="#">
                <div class="z-20 pt-8 pb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    class="absolute top-0 left-0 w-20 h-20 opacity-10" viewBox="0 0 16 16">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                  </svg>
                  <div class="text-center">
                    <div class="relative inline-block w-32 h-32 mb-10 text-xs text-white rounded">
                      <div
                        class="absolute w-24 h-24 border-t-4 border-r-4 border-blue-900 -top-4 -right-4">
                      </div>
                      <img class="object-cover w-full h-full"
                        src="https://s3-symbol-logo.tradingview.com/equifax--600.png"
                        alt="" />
                      <div
                        class="absolute w-24 h-24 border-b-4 border-l-4 border-blue-900 -bottom-4 -left-4">
                      </div>
                    </div>
                  </div>
                  {/* <p class="mb-4 text-base leading-7 text-gray-400">
                    Keep on jumping to get the most of the jump rope exercise. It will help you to increase
                    your
                    bone density as well
                  </p> */}
                  <h2 class="text-lg font-bold leading-9 text-black ">
                    Equifax
                  </h2>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    class="absolute right-0 w-20 h-20 rotate-180 bottom-4 opacity-10" viewBox="0 0 16 16">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                  </svg>
                </div>
              </div>
              <div class="relative mb-10 border-b-4 border-blue-900 " href="#">
                <div class="z-20 pt-8 pb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    class="absolute top-0 left-0 w-20 h-20 opacity-10" viewBox="0 0 16 16">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                  </svg>
                  <div class="text-center">
                    <div class="relative inline-block w-32 h-32 mb-10 text-xs text-white rounded">
                      <div
                        class="absolute w-24 h-24 border-t-4 border-r-4 border-blue-900 -top-4 -right-4">
                      </div>
                      <img class="object-cover w-full h-full"
                        src="https://bookface-images.s3.amazonaws.com/logos/7e1356cd0c8b9c2988c0bf3237aca5109cd9b3ce.png"
                        alt="" />
                      <div
                        class="absolute w-24 h-24 border-b-4 border-l-4 border-blue-900 -bottom-4 -left-4">
                      </div>
                    </div>
                  </div>
                  {/* <p class="mb-4 text-base leading-7 text-gray-400">
                    Keep on jumping to get the most of the jump rope exercise. It will help you to increase
                    your
                    bone density as well
                  </p> */}
                  <h2 class="text-lg font-bold leading-9 text-black ">
                    Decentro
                  </h2>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    class="absolute right-0 w-20 h-20 rotate-180 bottom-4 opacity-10" viewBox="0 0 16 16">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                  </svg>
                </div>
              </div>
              <div class="relative mb-10 border-b-4 border-blue-900 " href="#">
                <div class="z-20 pt-8 pb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    class="absolute top-0 left-0 w-20 h-20 opacity-10" viewBox="0 0 16 16">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                  </svg>
                  <div class="text-center">
                    <div class="relative inline-block w-32 h-32 mb-10 text-xs text-white rounded">
                      <div
                        class="absolute w-24 h-24 border-t-4 border-r-4 border-blue-900 -top-4 -right-4">
                      </div>
                      <img class="object-cover w-full h-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgPXe7e4THdTDU9V37oCdSWk3FqKoRzL1utJqGXoGS8pQoZ95j"
                        alt="" />
                      <div
                        class="absolute w-24 h-24 border-b-4 border-l-4 border-blue-900 -bottom-4 -left-4">
                      </div>
                    </div>
                  </div>
                  {/* <p class="mb-4 text-base leading-7 text-gray-400">
                    Keep on jumping to get the most of the jump rope exercise. It will help you to increase
                    your
                    bone density as well
                  </p> */}
                  <h2 class="text-lg font-bold leading-9 text-black ">
                    Tarrakki
                  </h2>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    class="absolute right-0 w-20 h-20 rotate-180 bottom-4 opacity-10" viewBox="0 0 16 16">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                  </svg>
                </div>
              </div>
              <div class="relative mb-10 border-b-4 border-blue-900 " href="#">
                <div class="z-20 pt-8 pb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    class="absolute top-0 left-0 w-20 h-20 opacity-10" viewBox="0 0 16 16">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                  </svg>
                  <div class="text-center">
                    <div class="relative inline-block w-32 h-32 mb-10 text-xs text-white rounded">
                      <div
                        class="absolute w-24 h-24 border-t-4 border-r-4 border-blue-900 -top-4 -right-4">
                      </div>
                      <img class="object-cover w-full h-full"
                        src="https://pbs.twimg.com/profile_images/1641476962362302464/K8lb6OtN_400x400.jpg"
                        alt="" />
                      <div
                        class="absolute w-24 h-24 border-b-4 border-l-4 border-blue-900 -bottom-4 -left-4">
                      </div>
                    </div>
                  </div>
                  {/* <p class="mb-4 text-base leading-7 text-gray-400">
                    Keep on jumping to get the most of the jump rope exercise. It will help you to increase
                    your
                    bone density as well
                  </p> */}
                  <h2 class="text-lg font-bold leading-9 text-black">
                    Amazon Web Services
                  </h2>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    class="absolute right-0 w-20 h-20 rotate-180 bottom-4 opacity-10" viewBox="0 0 16 16">
                    <path
                      d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Popup_form