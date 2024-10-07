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

                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Customer Name:</dt>
                                    <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                        {order.customerDetails.firstName} {order.customerDetails.lastName}
                                    </dd>
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Quantity:</dt>
                                    <dd className="mt-1.5 text-base font-semibold  text-gray-900">
                                        {order.quantity}
                                    </dd>
                                </dl>

                                {/* <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Product Name:</dt>
                                <dd className="mt-1.5 text-base font-semibold text-gray-900 text-gray-900">
                                    {order.product.productName}
                                </dd>
                            </dl> */}

                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Weight (gm):</dt>
                                    <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                        {order.product.weight}
                                    </dd>
                                </dl>

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


