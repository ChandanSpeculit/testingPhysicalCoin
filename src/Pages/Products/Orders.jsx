// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';
// import FiydaaLogo from "../../assets/images/navlogo.png";
// import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
// import CircularProgress from '@mui/material/CircularProgress';

// function Orders() {
//     const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
//     const uniqueId = userInfo["custom:uniqueId"]
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [invoices, setInvoices] = useState({}); // State to store invoices
//     const [open, setOpen] = useState(false);
//     const [failedOrders, setFailedOrders] = useState([]);
//     const [selectedOrderType, setSelectedOrderType] = useState('All orders');

//     const getUsersOrderFromDb = () => {
//         fetch(
//             `https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev/websiteApi/getUsersOrderFromDb`,
//             {
//                 method: 'POST',
//                 crossDomain: true,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     uniqueId: uniqueId,
//                 }),
//             }
//         )
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 const parsedData = JSON.parse(data.body);

//                 // Reverse the order data if it's an array
//                 const reversedOrders = Array.isArray(parsedData) ? parsedData.reverse() : parsedData;

//                 // Separate success and failed transactions
//                 const successOrders = reversedOrders.filter(order => order.status === "Success");
//                 const failedOrders = reversedOrders.filter(order => order.status === "Failed");

//                 if (successOrders.length > 0) {
//                     // Set orders for successful transactions
//                     setOrders(successOrders);
//                 }

//                 if (failedOrders.length > 0) {
//                     // Do something with failed transactions, e.g., set a different state for failed orders
//                     console.log("Failed transactions: ", failedOrders);
//                     // You can set a separate state for failed transactions if needed
//                     setFailedOrders(failedOrders);
//                 }

//                 // Set loading to false after processing
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error('There was a problem with the fetch operation:', error);
//                 setLoading(false);
//             });
//     };


//     const downloadPhysicalGoldInvoice = (orderId) => {
//         fetch(
//             `https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev/websiteApi/downloadPhysicalGoldInvoice`,
//             {
//                 method: 'POST',
//                 crossDomain: true,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     uniqueId: uniqueId,
//                     order_id: orderId,
//                 }),
//             }
//         )
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 const parsedData = JSON.parse(data.body);
//                 console.log(parsedData);
//                 setInvoices((prevInvoices) => ({
//                     ...prevInvoices,
//                     [orderId]: parsedData, // Store the invoice data for the specific order
//                 }));
//                 generatePDF(parsedData.invoiceData);
//             })
//             .catch((error) => {
//                 console.error('There was a problem with the fetch operation:', error);
//             });
//     };

//     useEffect(() => {
//         getUsersOrderFromDb();
//     }, []);


//     const chackOrderStatusOfPhysicalGold = (orderId) => {
//         setOpen(true);

//         fetch(
//             `https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev/websiteApi/chackOrderStatusOfPhysicalGold`,
//             {
//                 method: 'POST',
//                 crossDomain: true,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     uniqueId: uniqueId,
//                     order_id: orderId,
//                 }),
//             }
//         )
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 const parsedData = JSON.parse(data.body);
//                 console.log(parsedData);
//                 setOrderDetails(parsedData.orderData);

//             })
//             .catch((error) => {
//                 console.error('There was a problem with the fetch operation:', error);
//             });
//     };

//     const generatePDF = (invoiceData) => {
//         const doc = new jsPDF();

//         // Adding Logo on the Left and Invoice Title on the Right
//         const imgData = FiydaaLogo; // Replace with your base64 logo image data
//         doc.addImage(imgData, 'PNG', 10, 10, 40, 15);

//         // Adding Company Details and Title on the Right Side
//         doc.setFontSize(16);
//         doc.setFont('Poppins', 'bold');
//         doc.text('Invoice / Cash Memo', 200, 20, { align: 'right' });

//         doc.setFontSize(12);
//         doc.setFont('Poppins', 'bold');
//         doc.text('Sold By:', 200, 30, { align: 'right' });
//         doc.setFont('Poppins', 'normal');
//         doc.text('Clear Water Capital Pvt. Ltd.', 200, 36, { align: 'right' });
//         doc.text('PAN Number: ABCD', 200, 42, { align: 'right' });
//         doc.text('GST Number: ABCD', 200, 48, { align: 'right' });
//         doc.text('1ST FLOOR, 945/3, Pachranga Bazar,', 200, 54, { align: 'right' });
//         doc.text('Panipat, Haryana, 132103', 200, 60, { align: 'right' });

//         // Adding Divider
//         doc.setLineWidth(0.5);
//         doc.line(10, 70, 200, 70);

//         // Adding Billing Address on the Left
//         doc.setFont('Poppins', 'bold');
//         doc.text('Billing Address:', 14, 80);
//         doc.setFont('Poppins', 'normal');
//         doc.text(`${invoiceData.customerName}`, 14, 87);
//         doc.text(`${invoiceData.panCardNumber}`, 14, 94);
//         doc.text(`${invoiceData.billingAddress}`, 14, 101);

//         // Adding Shipping Address Below Billing Address
//         doc.setFont('Poppins', 'bold');
//         doc.text('Shipping Address:', 14, 115);
//         doc.setFont('Poppins', 'normal');
//         doc.text(`${invoiceData.customerName}`, 14, 122);
//         doc.text(`${invoiceData.customerShippingAddress}`, 14, 129);

//         // Adding Divider Below Addresses
//         doc.line(10, 135, 200, 135);

//         // Adding Product Details Table with GST Details
//         doc.autoTable({
//             startY: 145,
//             head: [['Product Name', 'Quantity', 'HSN Code', 'Rate Per Unit', 'IGST', 'Gross Amount']],
//             body: [
//                 [
//                     invoiceData.productName,
//                     invoiceData.quantity,
//                     invoiceData.hsnCode,
//                     invoiceData.ratePerUnit,
//                     invoiceData.igstValue,
//                     invoiceData.grossInvoiceAmount,
//                 ],
//             ],
//             theme: 'plain',
//             headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }, // Black background with white text for header
//             bodyStyles: { textColor: [0, 0, 0] }, // Black text with no background for body rows
//         });

//         // Adding Final Amount Details
//         const finalY = doc.autoTable.previous.finalY;
//         doc.setFont('Poppins', 'bold');
//         doc.text('Amount Details:', 14, finalY + 10);
//         doc.setFont('Poppins', 'normal');
//         doc.text(`Subtotal Amount: ${invoiceData.subtotalAmount}`, 14, finalY + 17);
//         doc.text(`Net Amount: ${invoiceData.netAmount}`, 14, finalY + 24);
//         doc.text(`Round Off: ${invoiceData.roundOff}`, 14, finalY + 31);
//         doc.setFont('Poppins', 'bold');
//         doc.text(`Total Amount: ${invoiceData.totalAmount}`, 14, finalY + 38);
//         doc.text(`Total Amount (in words): ${invoiceData.inWords}`, 14, finalY + 45);

//         // Adding Digital Signature
//         doc.setFont('Poppins', 'italic');
//         doc.text('Digitally signed by Clear Water Capital Pvt. Ltd.', 14, finalY + 60);

//         // Adding System Generated Message
//         doc.setFontSize(10);
//         doc.setTextColor(150);
//         doc.text('This is a system-generated invoice and does not require a physical signature.', 105, 290, { align: 'center' });

//         // Saving the PDF
//         doc.save(`Invoice_${invoiceData.hsnCode}.pdf`);
//     };

//     const statuses = [
//         { statusId: 2, statusName: "booked" },
//         { statusId: 3, statusName: "active" },
//         { statusId: 5, statusName: "processing" },
//         { statusId: 6, statusName: "dispatched to client" },
//         { statusId: 7, statusName: "returned to origin" },
//         { statusId: 8, statusName: "delivered to client" },
//         { statusId: 10, statusName: "re-dispatched" },
//         { statusId: 13, statusName: "order cancelled" },
//         { statusId: 12, statusName: "payment received" },
//         { statusId: 11, statusName: "defaulter" },
//         { statusId: 18, statusName: "portfolio at risk" }
//     ];

//     const handleClose = () => {
//         setOpen(false);
//     };


//     const [orderDetails, setOrderDetails] = useState(null);


//     const formatDate = (dateString) => {
//         const date = new Date(dateString);

//         // Get hour, minute, and AM/PM
//         const optionsTime = {
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: true,
//         };
//         const timeFormatter = new Intl.DateTimeFormat('en-US', optionsTime);
//         const timeParts = timeFormatter.formatToParts(date);
//         const hour = timeParts.find(part => part.type === 'hour').value;
//         const minute = timeParts.find(part => part.type === 'minute').value;
//         const period = timeParts.find(part => part.type === 'dayPeriod').value;

//         // Get day, month, year in DD-MM-YYYY format
//         const day = String(date.getDate()).padStart(2, '0');
//         const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
//         const year = date.getFullYear();

//         // Construct the final formatted date
//         return `${hour}:${minute} ${period} ${day}-${month}-${year}`;
//     };


//     const filteredOrders = () => {
//         if (selectedOrderType === 'All orders') {
//             return [...orders, ...failedOrders]; // Combine both success and failed orders
//         } else if (selectedOrderType === 'Success') {
//             return orders; // Only success orders
//         } else if (selectedOrderType === 'Failed') {
//             return failedOrders; // Only failed orders
//         }
//         return []; // Default case (if needed)
//     };

//     const handleClick = () => {
//         const userAgent = navigator.userAgent || navigator.vendor || window.opera;
//         let url;

//         // Detect iOS
//         if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
//             url = 'https://apps.apple.com/in/app/fiydaa-fintech-hub-by-speculit/id6475651556';
//         }
//         // Detect Android
//         else if (/android/i.test(userAgent)) {
//             url = 'https://play.google.com/store/apps/details?id=com.fiydaa&pcampaignid=web_share';
//         }
//         // Detect macOS
//         else if (navigator.platform.toLowerCase().includes('mac')) {
//             url = 'https://apps.apple.com/in/app/fiydaa-fintech-hub-by-speculit/id6475651556';
//         }
//         // Default to Play Store for other platforms (e.g., Windows)
//         else {
//             url = 'https://play.google.com/store/apps/details?id=com.fiydaa&pcampaignid=web_share';
//         }

//         window.open(url, '_blank');
//     };

//     return (
//         <>
//             <Navbar />


//             {/* <div class="container mx-auto flex flex-col justify-around p-4 text-center md:p-10 lg:flex-row mb-0">
//                 <div class="flex flex-col justify-center lg:text-left">
//                     <p class="mb-1 text-sm font-medium tracking-widest uppercase text-gray-600">TO view your profile Download the
//                     </p>
//                     <h1 class="py-2 text-3xl font-poppins">Fiydaa App</h1>
//                 </div>
//                 <div
//                     class="flex flex-col items-center justify-center flex-shrink-0 mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 lg:ml-4 lg:mt-0 lg:justify-end">
//                     <button onClick={handleClick} class="inline-flex items-center px-6 py-3 rounded-lg bg-gray-600 text-gray-50">
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-8 h-8 text-gray-50">
//                             <path d="M 5.4160156 2.328125 L 12.935547 10.158203 C 13.132547 10.363203 13.45925 10.363203 13.65625 10.158203 L 15.179688 8.5742188 C 15.405688 8.3392188 15.354312 7.956875 15.070312 7.796875 C 11.137313 5.571875 6.2620156 2.811125 5.4160156 2.328125 z M 3.140625 2.8476562 C 3.055625 3.0456562 3 3.2629063 3 3.5039062 L 3 20.591797 C 3 20.788797 3.044375 20.970625 3.109375 21.140625 L 11.576172 12.324219 C 11.762172 12.131219 11.762172 11.826813 11.576172 11.632812 L 3.140625 2.8476562 z M 17.443359 9.2578125 C 17.335484 9.2729375 17.233297 9.32375 17.154297 9.40625 L 15.015625 11.632812 C 14.829625 11.825812 14.829625 12.130219 15.015625 12.324219 L 17.134766 14.529297 C 17.292766 14.694297 17.546141 14.729188 17.744141 14.617188 C 19.227141 13.777188 20.226563 13.212891 20.226562 13.212891 C 20.725562 12.909891 21.007 12.443547 21 11.935547 C 20.992 11.439547 20.702609 10.981938 20.224609 10.710938 C 20.163609 10.676937 19.187672 10.124359 17.763672 9.3183594 C 17.664172 9.2623594 17.551234 9.2426875 17.443359 9.2578125 z M 13.296875 13.644531 C 13.165875 13.644531 13.034047 13.696328 12.935547 13.798828 L 5.4746094 21.566406 C 6.7566094 20.837406 11.328781 18.249578 15.050781 16.142578 C 15.334781 15.981578 15.386156 15.599281 15.160156 15.363281 L 13.65625 13.798828 C 13.55775 13.696328 13.427875 13.644531 13.296875 13.644531 z"></path>
//                         </svg>
//                         <span class="flex flex-col items-start ml-4 leading-none">
//                             <span class="mb-1 text-xs">GET IT ON</span>
//                             <span class="font-semibold title-font">Google Play</span>
//                         </span>
//                     </button>
//                     <button onClick={handleClick} class="inline-flex items-center px-5 py-3 rounded-lg bg-gray-600 text-gray-50">
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" class="fill-current w-8 h-8 text-gray-50">
//                             <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
//                         </svg>
//                         <span class="flex flex-col items-start ml-4 leading-none">
//                             <span class="mb-1 text-xs">Download on the</span>
//                             <span class="font-semibold title-font">App Store</span>
//                         </span>
//                     </button>
//                 </div>
//             </div> */}

//             <div style={{ width: '80%', margin: 'auto' }}>
//                 {loading ? (
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             justifyContent: 'center', // Center horizontally
//                             alignItems: 'center', // Center vertically
//                             height: '100vh', // Full height of the viewport
//                             width: '100%', // Full width
//                         }}
//                     >
//                         <CircularProgress />
//                     </Box>
//                 ) : orders.length == 0 ? (
//                     <div class="grid h-screen place-content-center bg-white px-4">
//                         <h1 class="uppercase tracking-widest text-gray-500">No Order Found</h1>
//                         <Link to="/" style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             padding: '12px 24px',
//                             backgroundColor: '#0D273E', // Green background
//                             color: 'white', // Text color
//                             borderRadius: '25px', // Rounded edges
//                             textDecoration: 'none', // Remove underline
//                             fontWeight: 'bold', // Bold text
//                             transition: 'background-color 0.3s',
//                             marginTop: 10 // Smooth transition
//                         }} >Buy Now</Link>
//                     </div>) : (


//                     <div className="mx-auto max-w-5xl">
//                         <div className="gap-4 sm:flex sm:items-center sm:justify-between">
//                             <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">My orders</h2>

//                             <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
//                                 <div>
//                                     <label htmlFor="order-type" className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select order type</label>
//                                     <select
//                                         id="order-type"
//                                         className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
//                                         value={selectedOrderType}
//                                         onChange={(e) => setSelectedOrderType(e.target.value)}
//                                     >
//                                         <option value="All orders">All orders</option>
//                                         <option value="Success">Success</option>
//                                         <option value="Failed">Failed</option>
//                                     </select>
//                                 </div>


//                             </div>
//                         </div>

//                         {filteredOrders().map((order, index) => (
//                             <div key={index} className="divide-y divide-gray-200 dark:divide-gray-700">
//                                 <div className="flex flex-wrap items-center gap-y-4 py-6">
//                                     <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
//                                         <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
//                                         <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-black">
//                                             <p href="#" className="hover:underline">#{order.transactionId || order.id}</p>
//                                         </dd>
//                                     </dl>

//                                     <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
//                                         <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
//                                         <dd className="mt-1.5 text-base font-semibold text-gray-900">
//                                             {order.status}
//                                         </dd>
//                                     </dl>

//                                     <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
//                                         <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Quantity:</dt>
//                                         <dd className="mt-1.5 text-base font-semibold text-gray-900">
//                                             {order.quantity}
//                                         </dd>
//                                     </dl>

//                                     <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
//                                         <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Weight (gm):</dt>
//                                         <dd className="mt-1.5 text-base font-semibold text-gray-900">
//                                             {order.product?.weight || 'N/A'}
//                                         </dd>
//                                     </dl>

//                                     <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
//                                         <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Final Order Price:</dt>
//                                         <dd className="mt-1.5 text-base font-semibold text-gray-900">
//                                             {Array.isArray(order.orderdetails) && order.orderdetails.length > 0
//                                                 ? order.orderdetails[0].finalOrderPrice
//                                                 : order.amount || 'N/A'}
//                                         </dd>
//                                     </dl>

//                                     <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
//                                         <button
//                                             type="button"
//                                             className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
//                                             onClick={() => downloadPhysicalGoldInvoice(order.id)}
//                                         >
//                                             Download
//                                         </button>
//                                         <button
//                                             className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
//                                             onClick={() => chackOrderStatusOfPhysicalGold(order.id)}
//                                         >
//                                             View details
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                 )}
//             </div>
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle className="text-center">Order Details</DialogTitle>
//                 <DialogContent>
//                     {orderDetails ? (
//                         <>
//                             <div className="mx-auto max-w-2xl px-4 2xl:px-0">
//                                 <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
//                                     <svg aria-hidden="true" className="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
//                                     </svg>
//                                     <span className="sr-only">Success</span>
//                                 </div>
//                                 <p className="mb-4 text-lg font-semibold text-gray-900 text-center">Order Placed Successfully.</p>
//                                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2 text-center">Thanks for your order!</h2>
//                                 <p className="text-gray-500 dark:text-black mb-6 md:mb-8 text-justify">
//                                     Your order #{orderDetails.id} has been placed successfully! We are currently processing your request. Please note that the estimated delivery time for your order is between 7 to 14 business days, depending on your location and the logistics involved.
//                                 </p>

//                                 <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
//                                     <dl className="sm:flex items-center justify-between gap-4">
//                                         <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Date</dt>
//                                         <dd className="font-medium text-gray-900 dark:text-white sm:text-end"> {formatDate(orderDetails.createdAt)}</dd>
//                                     </dl>
//                                     <dl className="sm:flex items-center justify-between gap-4">
//                                         <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Order Status:</dt>
//                                         <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{orderDetails.orderCurrentStatus.statusName}</dd>
//                                     </dl>
//                                     <dl className="sm:flex items-center justify-between gap-4">
//                                         <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Mode of Payment:</dt>
//                                         <dd className="font-medium text-gray-900 dark:text-white sm:text-end">Online</dd>
//                                     </dl>
//                                     <dl className="sm:flex items-center justify-between gap-4">
//                                         <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Customer Name</dt>
//                                         <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{`${orderDetails.customerDetails.firstName} ${orderDetails.customerDetails.lastName}`}</dd>
//                                     </dl>
//                                     <dl className="sm:flex items-center justify-between gap-4">
//                                         <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Mobile Number:</dt>
//                                         <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{orderDetails.customerDetails.mobileNumber}</dd>
//                                     </dl>
//                                     <dl className="sm:flex items-center justify-between gap-4">
//                                         <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Shipping Address</dt>
//                                         <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{orderDetails.customerOrderAddress[0].shippingAddress}</dd>
//                                     </dl>
//                                     <dl className="sm:flex items-center justify-between gap-4">
//                                         <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Shipping State</dt>
//                                         <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{orderDetails.customerOrderAddress[0].shippingState.name}</dd>
//                                     </dl>
//                                     <dl className="sm:flex items-center justify-between gap-4">
//                                         <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Shipping City</dt>
//                                         <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{orderDetails.customerOrderAddress[0].shippingCity.name}</dd>
//                                     </dl>
//                                     <dl className="sm:flex items-center justify-between gap-4">
//                                         <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Postal Code</dt>
//                                         <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{orderDetails.customerOrderAddress[0].shippingPostalCode}</dd>
//                                     </dl>
//                                 </div>
//                                 <div className="flex items-center justify-center space-x-4">
//                                     <Link to="/" className="py-2.5 px-5 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-xs">
//                                         Return to shopping
//                                     </Link>
//                                 </div>
//                             </div>
//                         </>
//                     ) : (
//                         <Box
//                             sx={{
//                                 display: 'flex',
//                                 justifyContent: 'center', // Center horizontally
//                                 alignItems: 'center', // Center vertically
//                                 // height: '100vh', // Full height of the viewport
//                                 width: '100%', // Full width
//                             }}
//                         >
//                             <CircularProgress />
//                         </Box>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         Close
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <div class="container mx-auto flex flex-col justify-around p-4 text-center md:p-10 lg:flex-row mb-0">
//                 <div class="flex flex-col justify-center lg:text-left">
//                     <p class="mb-1 text-sm font-medium tracking-widest uppercase text-gray-600">TO view your profile Download the
//                     </p>
//                     <h1 class="py-2 text-3xl font-poppins">Fiydaa App</h1>
//                 </div>
//                 <div
//                     class="flex flex-col items-center justify-center flex-shrink-0 mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 lg:ml-4 lg:mt-0 lg:justify-end">
//                     <button onClick={handleClick} class="inline-flex items-center px-6 py-3 rounded-lg bg-gray-600 text-gray-50">
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-8 h-8 text-gray-50">
//                             <path d="M 5.4160156 2.328125 L 12.935547 10.158203 C 13.132547 10.363203 13.45925 10.363203 13.65625 10.158203 L 15.179688 8.5742188 C 15.405688 8.3392188 15.354312 7.956875 15.070312 7.796875 C 11.137313 5.571875 6.2620156 2.811125 5.4160156 2.328125 z M 3.140625 2.8476562 C 3.055625 3.0456562 3 3.2629063 3 3.5039062 L 3 20.591797 C 3 20.788797 3.044375 20.970625 3.109375 21.140625 L 11.576172 12.324219 C 11.762172 12.131219 11.762172 11.826813 11.576172 11.632812 L 3.140625 2.8476562 z M 17.443359 9.2578125 C 17.335484 9.2729375 17.233297 9.32375 17.154297 9.40625 L 15.015625 11.632812 C 14.829625 11.825812 14.829625 12.130219 15.015625 12.324219 L 17.134766 14.529297 C 17.292766 14.694297 17.546141 14.729188 17.744141 14.617188 C 19.227141 13.777188 20.226563 13.212891 20.226562 13.212891 C 20.725562 12.909891 21.007 12.443547 21 11.935547 C 20.992 11.439547 20.702609 10.981938 20.224609 10.710938 C 20.163609 10.676937 19.187672 10.124359 17.763672 9.3183594 C 17.664172 9.2623594 17.551234 9.2426875 17.443359 9.2578125 z M 13.296875 13.644531 C 13.165875 13.644531 13.034047 13.696328 12.935547 13.798828 L 5.4746094 21.566406 C 6.7566094 20.837406 11.328781 18.249578 15.050781 16.142578 C 15.334781 15.981578 15.386156 15.599281 15.160156 15.363281 L 13.65625 13.798828 C 13.55775 13.696328 13.427875 13.644531 13.296875 13.644531 z"></path>
//                         </svg>
//                         <span class="flex flex-col items-start ml-4 leading-none">
//                             <span class="mb-1 text-xs">GET IT ON</span>
//                             <span class="font-semibold title-font">Google Play</span>
//                         </span>
//                     </button>
//                     <button onClick={handleClick} class="inline-flex items-center px-5 py-3 rounded-lg bg-gray-600 text-gray-50">
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" class="fill-current w-8 h-8 text-gray-50">
//                             <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
//                         </svg>
//                         <span class="flex flex-col items-start ml-4 leading-none">
//                             <span class="mb-1 text-xs">Download on the</span>
//                             <span class="font-semibold title-font">App Store</span>
//                         </span>
//                     </button>
//                 </div>
//             </div>


//             <Footer />

//         </>
//     );

// }

// export default Orders;



import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FiydaaLogo from "../../assets/images/navlogo.png";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function Orders() {
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    const uniqueId = userInfo["custom:uniqueId"]
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [invoices, setInvoices] = useState({}); // State to store invoices
    const [open, setOpen] = useState(false);

    const getUsersOrderFromDb = () => {
        fetch(
            `https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev/websiteApi/getUsersOrderFromDb`,
            {
                method: 'POST',
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uniqueId: uniqueId,
                }),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const parsedData = JSON.parse(data.body);
    
                // Reverse the order data if it's an array
                const reversedOrders = Array.isArray(parsedData) ? parsedData.reverse() : parsedData;
    
                console.log(reversedOrders);
                setOrders(reversedOrders); // Update the state with the reversed order data
                setLoading(false);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                setLoading(false);
            });
    };
    
    const downloadPhysicalGoldInvoice = (orderId) => {
        fetch(
            `https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev/websiteApi/downloadPhysicalGoldInvoice`,
            {
                method: 'POST',
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uniqueId: uniqueId,
                    order_id: orderId,
                }),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const parsedData = JSON.parse(data.body);
                console.log(parsedData);
                setInvoices((prevInvoices) => ({
                    ...prevInvoices,
                    [orderId]: parsedData, // Store the invoice data for the specific order
                }));
                generatePDF(parsedData.invoiceData);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    useEffect(() => {
        getUsersOrderFromDb();
    }, []);


    const chackOrderStatusOfPhysicalGold = (orderId) => {
        setOpen(true);

        fetch(
            `https://rzozy98ys9.execute-api.ap-south-1.amazonaws.com/dev/websiteApi/chackOrderStatusOfPhysicalGold`,
            {
                method: 'POST',
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uniqueId: uniqueId,
                    order_id: orderId,
                }),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const parsedData = JSON.parse(data.body);
                console.log(parsedData);
                setOrderDetails(parsedData.orderData);

            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const generatePDF = (invoiceData) => {
        const doc = new jsPDF();

        // Adding Logo on the Left and Invoice Title on the Right
        const imgData = FiydaaLogo; // Replace with your base64 logo image data
        doc.addImage(imgData, 'PNG', 10, 10, 40, 15);

        // Adding Company Details and Title on the Right Side
        doc.setFontSize(16);
        doc.setFont('Poppins', 'bold');
        doc.text('Invoice / Cash Memo', 200, 20, { align: 'right' });

        doc.setFontSize(12);
        doc.setFont('Poppins', 'bold');
        doc.text('Sold By:', 200, 30, { align: 'right' });
        doc.setFont('Poppins', 'normal');
        doc.text('Clear Water Capital Pvt. Ltd.', 200, 36, { align: 'right' });
        doc.text('PAN Number: ABCD', 200, 42, { align: 'right' });
        doc.text('GST Number: ABCD', 200, 48, { align: 'right' });
        doc.text('1ST FLOOR, 945/3, Pachranga Bazar,', 200, 54, { align: 'right' });
        doc.text('Panipat, Haryana, 132103', 200, 60, { align: 'right' });

        // Adding Divider
        doc.setLineWidth(0.5);
        doc.line(10, 70, 200, 70);

        // Adding Billing Address on the Left
        doc.setFont('Poppins', 'bold');
        doc.text('Billing Address:', 14, 80);
        doc.setFont('Poppins', 'normal');
        doc.text(`${invoiceData.customerName}`, 14, 87);
        doc.text(`${invoiceData.panCardNumber}`, 14, 94);
        doc.text(`${invoiceData.billingAddress}`, 14, 101);

        // Adding Shipping Address Below Billing Address
        doc.setFont('Poppins', 'bold');
        doc.text('Shipping Address:', 14, 115);
        doc.setFont('Poppins', 'normal');
        doc.text(`${invoiceData.customerName}`, 14, 122);
        doc.text(`${invoiceData.customerShippingAddress}`, 14, 129);

        // Adding Divider Below Addresses
        doc.line(10, 135, 200, 135);

        // Adding Product Details Table with GST Details
        doc.autoTable({
            startY: 145,
            head: [['Product Name', 'Quantity', 'HSN Code', 'Rate Per Unit', 'IGST', 'Gross Amount']],
            body: [
                [
                    invoiceData.productName,
                    invoiceData.quantity,
                    invoiceData.hsnCode,
                    invoiceData.ratePerUnit,
                    invoiceData.igstValue,
                    invoiceData.grossInvoiceAmount,
                ],
            ],
            theme: 'plain',
            headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }, // Black background with white text for header
            bodyStyles: { textColor: [0, 0, 0] }, // Black text with no background for body rows
        });

        // Adding Final Amount Details
        const finalY = doc.autoTable.previous.finalY;
        doc.setFont('Poppins', 'bold');
        doc.text('Amount Details:', 14, finalY + 10);
        doc.setFont('Poppins', 'normal');
        doc.text(`Subtotal Amount: ${invoiceData.subtotalAmount}`, 14, finalY + 17);
        doc.text(`Net Amount: ${invoiceData.netAmount}`, 14, finalY + 24);
        doc.text(`Round Off: ${invoiceData.roundOff}`, 14, finalY + 31);
        doc.setFont('Poppins', 'bold');
        doc.text(`Total Amount: ${invoiceData.totalAmount}`, 14, finalY + 38);
        doc.text(`Total Amount (in words): ${invoiceData.inWords}`, 14, finalY + 45);

        // Adding Digital Signature
        doc.setFont('Poppins', 'italic');
        doc.text('Digitally signed by Clear Water Capital Pvt. Ltd.', 14, finalY + 60);

        // Adding System Generated Message
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text('This is a system-generated invoice and does not require a physical signature.', 105, 290, { align: 'center' });

        // Saving the PDF
        doc.save(`Invoice_${invoiceData.hsnCode}.pdf`);
    };

    const statuses = [
        { statusId: 2, statusName: "booked" },
        { statusId: 3, statusName: "active" },
        { statusId: 5, statusName: "processing" },
        { statusId: 6, statusName: "dispatched to client" },
        { statusId: 7, statusName: "returned to origin" },
        { statusId: 8, statusName: "delivered to client" },
        { statusId: 10, statusName: "re-dispatched" },
        { statusId: 13, statusName: "order cancelled" },
        { statusId: 12, statusName: "payment received" },
        { statusId: 11, statusName: "defaulter" },
        { statusId: 18, statusName: "portfolio at risk" }
    ];

    const handleClose = () => {
        setOpen(false);
    };


    const [orderDetails, setOrderDetails] = useState(null);


    const formatDate = (dateString) => {
        const date = new Date(dateString);

        // Get hour, minute, and AM/PM
        const optionsTime = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        const timeFormatter = new Intl.DateTimeFormat('en-US', optionsTime);
        const timeParts = timeFormatter.formatToParts(date);
        const hour = timeParts.find(part => part.type === 'hour').value;
        const minute = timeParts.find(part => part.type === 'minute').value;
        const period = timeParts.find(part => part.type === 'dayPeriod').value;

        // Get day, month, year in DD-MM-YYYY format
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();

        // Construct the final formatted date
        return `${hour}:${minute} ${period} ${day}-${month}-${year}`;
    };

    return (
        <>
            <Navbar />
            <div style={{ width: '80%', margin: 'auto' }}>
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center', // Center horizontally
                            alignItems: 'center', // Center vertically
                            height: '100vh', // Full height of the viewport
                            width: '100%', // Full width
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : orders.length == 0 ? (
                    <div class="grid h-screen place-content-center bg-white px-4">
                        <h1 class="uppercase tracking-widest text-gray-500">No Order Found</h1>
                        <Link to="/" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '12px 24px',
                            backgroundColor: '#0D273E', // Green background
                            color: 'white', // Text color
                            borderRadius: '25px', // Rounded edges
                            textDecoration: 'none', // Remove underline
                            fontWeight: 'bold', // Bold text
                            transition: 'background-color 0.3s',
                            marginTop: 10 // Smooth transition
                        }} >Buy Now</Link>
                    </div>) : (
                    orders.map((order, index) => (
                        <div key={index} className="divide-y divide-gray-200 dark:divide-gray-700">
                            <div className="flex flex-wrap items-center gap-y-4 py-6">
                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-black">
                                        <p href="#" className="hover:underline">
                                            #{order.id}
                                        </p>
                                    </dd>
                                </dl>

                                {/* <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Customer Name:</dt>
                                    <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                        {order.customerDetails.firstName} {order.customerDetails.lastName}
                                    </dd>
                                </dl> */}

                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Quantity:</dt>
                                    <dd className="mt-1.5 text-base font-semibold  text-gray-900">
                                        {order.quantity}
                                    </dd>
                                </dl>


                                {/* <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Weight (gm):</dt>
                                    <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                        {order.product.weight}
                                    </dd>
                                </dl> */}

                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Final Order Price:</dt>
                                    <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                        {Array.isArray(order.orderdetails) && order.orderdetails.length > 0
                                            ? order.orderdetails[0].finalOrderPrice
                                            : 'N/A'}
                                    </dd>
                                </dl>

                                <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                    <button
                                        type="button"
                                        className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
                                        onClick={() => downloadPhysicalGoldInvoice(order.id)}
                                    >
                                        Download
                                    </button>
                                    <button
                                        className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                                        onClick={() => chackOrderStatusOfPhysicalGold(order.id)}
                                    >
                                        View details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className="text-center">Order Details</DialogTitle>
                <DialogContent>
                    {orderDetails ? (
                        <>
                            <div className="mx-auto max-w-2xl px-4 2xl:px-0">
                                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                                    <svg aria-hidden="true" className="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                    <span className="sr-only">Success</span>
                                </div>
                                <p className="mb-4 text-lg font-semibold text-gray-900 text-center">Order Placed Successfully.</p>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2 text-center">Thanks for your order!</h2>
                                <p className="text-gray-500 dark:text-black mb-6 md:mb-8 text-justify">
                                    Your order #{orderDetails.id} has been placed successfully! We are currently processing your request. Please note that the estimated delivery time for your order is between 7 to 14 business days, depending on your location and the logistics involved.
                                </p>

                                <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
                                    <dl className="sm:flex items-center justify-between gap-4">
                                        <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Date</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white sm:text-end"> {formatDate(orderDetails.createdAt)}</dd>
                                    </dl>
                                    <dl className="sm:flex items-center justify-between gap-4">
                                        <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Order Status:</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{orderDetails.orderCurrentStatus.statusName}</dd>
                                    </dl>
                                    <dl className="sm:flex items-center justify-between gap-4">
                                        <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Mode of Payment:</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white sm:text-end">Online</dd>
                                    </dl>
                                    <dl className="sm:flex items-center justify-between gap-4">
                                        <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Customer Name</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{`${orderDetails.customerDetails.firstName} ${orderDetails.customerDetails.lastName}`}</dd>
                                    </dl>
                                    <dl className="sm:flex items-center justify-between gap-4">
                                        <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Mobile Number:</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{orderDetails.customerDetails.mobileNumber}</dd>
                                    </dl>
                                    <dl className="sm:flex items-center justify-between gap-4">
                                        <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Shipping Address</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{orderDetails.customerOrderAddress[0].shippingAddress}</dd>
                                    </dl>
                                    <dl className="sm:flex items-center justify-between gap-4">
                                        <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Shipping State</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{orderDetails.customerOrderAddress[0].shippingState.name}</dd>
                                    </dl>
                                    <dl className="sm:flex items-center justify-between gap-4">
                                        <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Shipping City</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{orderDetails.customerOrderAddress[0].shippingCity.name}</dd>
                                    </dl>
                                    <dl className="sm:flex items-center justify-between gap-4">
                                        <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Postal Code</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{orderDetails.customerOrderAddress[0].shippingPostalCode}</dd>
                                    </dl>
                                </div>
                                <div className="flex items-center justify-center space-x-4">
                                    <Link to="/" className="py-2.5 px-5 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-xs">
                                        Return to shopping
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center', // Center horizontally
                                alignItems: 'center', // Center vertically
                                // height: '100vh', // Full height of the viewport
                                width: '100%', // Full width
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>


            <Footer />

        </>
    );

}

export default Orders;

