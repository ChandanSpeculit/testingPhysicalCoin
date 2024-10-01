// import { Navigate, Route, Routes, useLocation, BrowserRouter as Router } from 'react-router-dom';
// import './App.css';
// import Home from './Pages/Home';
// import Navbar from './components/Navbar';
// import AboutUsPage from './Pages/AboutUs';
// import ContactUs from './Pages/ContactUs';
// import Insights from "./Pages/Insights/Insights";
// import DailyReports from "./Pages/Insights/DailyReports";
// import KnowledgeSeries from "./Pages/Insights/KnowledgeSeries";
// import Media from "./Pages/Insights/Media";
// import NewsandUpdate from "./Pages/Insights/NewsandUpdate";
// import WeeklyBlog from "./Pages/Insights/WeeklyBlog";
// import Footer from './components/Footer';
// import FiydaaEdu from './Pages/FiydaaEdu';
// import ScrollToTop from './Pages/ScrollToTop';
// import Privacy from './Pages/Privacy';
// import GoalBased from './Pages/GoalBased';
// import DeleteAccount from './Pages/DeleteAccount';
// import Blogs from './Pages/Blog';
// import FiydaaSip from './NavComponent/FiydaaSip';
// import SipCalculator from './components/SipCalculator';
// import ChangeInvestingPage from './NavComponent/ChangeInvestingPage';
// import DigitalGoldPage from './NavComponent/DigitalGoldPage';
// import MutualFundPage from './NavComponent/MutualFundPage';
// import CreditScorePage from './NavComponent/CreditScorePage';
// import VirtualAsset from './NavComponent/VirtualAsset';
// import DifferenceinSIPvsMutualFund from './BlogPages/DifferenceinSIPvsMutualFund';
// import DirectvsRegularMutualFund from './BlogPages/DirectvsRegularMutualFund';
// import ULIPvsMutuaFund from './BlogPages/ULIPvsMutuaFund';
// import UnderstandingELSSMutualFunds from './BlogPages/UnderstandingELSSMutualFunds';
// import GoldLeasing from './Pages/GoldLeasing';
// import Facebook from './Pages/FacebookPixel';
// import useAnalytics from './useAnalytics';
// import TermsAndCondition from './Pages/TermsAndCondition';
// import PPFvsMutualFund from './BlogPages/PPFvsMutualFund';
// import CanaraBankGold from './BlogPages/CanaraBankGold';
// import CDeductions from './BlogPages/80CDeductions';
// import UpdateBankDetails from './Pages/UpdateBankDetails';
// import Device_IOS_OR_Android from './Pages/Device_IOS_OR_Android';
// import AllProduct from './Pages/Products/AllProduct';
// import ParticularProduct from './Pages/Products/ParticularProduct';
// import CartPage from './Pages/Products/CartPage';
// import Address from './Pages/Products/Address';
// import Orders from './Pages/Products/Orders';
// import Login from './Pages/Login';
// import SignUp from './Pages/SignUp';
// function App() {
//   const location = useLocation();
//   useAnalytics();
//   const userToken = window.localStorage.getItem("userToken");


//   return (
//     <>
//       <ScrollToTop />
//       <Navbar />
//       <Facebook />
//       <Routes>
//         <Route exact path="/" element={<Home />} />
//         <Route path="/feature/Learn-Finance" element={<FiydaaEdu />} />
//         <Route path="/About" element={<AboutUsPage />} />
//         <Route path="/GoldLeasing" element={<GoldLeasing />} />
//         <Route path="/Sip-Calculator" element={<SipCalculator />} />
//         <Route path="/feature/Systematic-Investment-Plan" element={<FiydaaSip />} />
//         <Route path="/feature/Micro-Investing" element={<ChangeInvestingPage />} />
//         <Route path="/feature/Digital-Gold" element={<DigitalGoldPage />} />
//         <Route path="/feature/Mutual-Funds" element={<MutualFundPage />} />
//         <Route path="/feature/Credit-Score" element={<CreditScorePage />} />
//         <Route path="/feature/Virtual-Asset" element={<VirtualAsset />} />
//         <Route path="/Contact" element={<ContactUs />} />
//         <Route path="/feature/Goal-based-Investing" element={<GoalBased />} />
//         <Route path="/Privacy-Policy" element={<Privacy />} />
//         <Route path="/Delete-Account" element={<DeleteAccount />} />
//         <Route path="/terms_condition" element={<TermsAndCondition />} />
//         <Route path="*" element={<Navigate to="/" replace />} />
//         <Route path="/Insights" element={<Insights />}>
//           <Route index element={<Navigate replace to="/Insights/DailyReports" />} />
//           <Route path="DailyReports" element={<DailyReports />} />
//           <Route path="KnowledgeSeries" element={<KnowledgeSeries />} />
//           <Route path="Media" element={<Media />} />
//           <Route path="NewsandUpdate" element={<NewsandUpdate />} />
//           <Route path="WeeklyBlog" element={<WeeklyBlog />} />
//         </Route>
//         <Route path="/Blogs" element={<Blogs />} />
//         <Route path="/Blogs/DifferenceinSIPvsMutualFund" element={<DifferenceinSIPvsMutualFund />} />
//         <Route path="/Blogs/DirectvsRegularMutualFund" element={<DirectvsRegularMutualFund />} />
//         <Route path="/Blogs/ULIPvsMutuaFund" element={<ULIPvsMutuaFund />} />
//         <Route path="/Blogs/UnderstandingELSSMutualFunds" element={<UnderstandingELSSMutualFunds />} />
//         <Route path="/Blogs/PPFvsMutualFund" element={<PPFvsMutualFund />} />
//         <Route path="/Blogs/CanaraBankGold" element={<CanaraBankGold />} />
//         <Route path="/Blogs/CDeductions" element={<CDeductions />} />
//         <Route path="/detectDevice" element={<Device_IOS_OR_Android />} />
//         <Route path="/AllProduct" element={<AllProduct />} />
//         <Route path="/getProductDetails/:productId" element={<ParticularProduct />} />
//         <Route path="/cartDetails" element={<CartPage />} />
//         <Route path="/address" element={<Address />} />
//         <Route path="/myOrders" element={<Orders />} />
//         <Route path="/Login" element={<Login />} />
//         <Route path="/SignUp" element={<SignUp />} />


//       </Routes>
//       <Footer />
//     </>
//   );
// }

// export default function AppWrapper() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }



import { Navigate, Route, Routes, useLocation, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Facebook from './Pages/FacebookPixel';
import useAnalytics from './useAnalytics';
import ScrollToTop from './Pages/ScrollToTop';
import Footer from './components/Footer';

import MainStack from './Navigations/MainStack';
import AuthStack from './Navigations/AuthStack';
function App() {
  const location = useLocation();
  useAnalytics();
  const userToken = window.localStorage.getItem("userToken");


  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Facebook />
      {userToken ? <MainStack /> : <AuthStack />}
      <Footer />
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
