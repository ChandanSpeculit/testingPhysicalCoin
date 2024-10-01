// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// function Orders() {
//     const uniqueId = '12345';
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [invoices, setInvoices] = useState({}); // State to store invoices

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
//                 console.log(parsedData);
//                 setOrders(parsedData); // Update the state with the order data
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

//     if (loading) {
//         return <div>Loading...</div>;
//     }


//     const generatePDF = (invoiceData) => {
//         const doc = new jsPDF();

//         // Adding Title
//         doc.setFontSize(18);
//         doc.text('Invoice', 14, 22);

//         // Adding Customer Details
//         doc.setFontSize(12);
//         doc.text('Customer Details:', 14, 35);
//         doc.text(`Name: ${invoiceData.customerName}`, 14, 42);
//         doc.text(`Billing Address: ${invoiceData.billingAddress}`, 14, 49);
//         doc.text(`Shipping Address: ${invoiceData.customerShippingAddress}`, 14, 56);
//         doc.text(`PAN Card Number: ${invoiceData.panCardNumber}`, 14, 63);

//         // Adding Invoice Details
//         doc.setFontSize(12);
//         doc.text('Invoice Details:', 14, 75);
//         doc.text(`Invoice Date: ${invoiceData.invoiceDate}`, 14, 82);
//         doc.text(`Invoice Number: ${invoiceData.invoiceNumber ?? 'N/A'}`, 14, 89);
//         doc.text(`Transaction ID: ${invoiceData.transactionId}`, 14, 96);

//         // Adding Product Details Table
//         doc.autoTable({
//             startY: 110,
//             head: [['Product Name', 'Quantity', 'HSN Code', 'Rate Per Unit', 'Gross Amount']],
//             body: [
//                 [
//                     invoiceData.productName,
//                     invoiceData.quantity,
//                     invoiceData.hsnCode,
//                     invoiceData.ratePerUnit,
//                     invoiceData.grossInvoiceAmount,
//                 ],
//             ],
//         });

//         // Adding Tax Details
//         doc.text('Tax Details:', 14, doc.autoTable.previous.finalY + 10);
//         doc.text(`IGST: ${invoiceData.igst ?? 'N/A'} (${invoiceData.igstValue})`, 14, doc.autoTable.previous.finalY + 17);
//         doc.text(`CGST: ${invoiceData.cgst ?? 'N/A'} (${invoiceData.cgstValue ?? 'N/A'})`, 14, doc.autoTable.previous.finalY + 24);
//         doc.text(`SGST: ${invoiceData.sgst ?? 'N/A'} (${invoiceData.sgstValue ?? 'N/A'})`, 14, doc.autoTable.previous.finalY + 31);

//         // Adding Final Amount
//         doc.text('Amount Details:', 14, doc.autoTable.previous.finalY + 45);
//         doc.text(`Subtotal Amount: ${invoiceData.subtotalAmount}`, 14, doc.autoTable.previous.finalY + 52);
//         doc.text(`Net Amount: ${invoiceData.netAmount}`, 14, doc.autoTable.previous.finalY + 59);
//         doc.text(`Round Off: ${invoiceData.roundOff}`, 14, doc.autoTable.previous.finalY + 66);
//         doc.text(`Total Amount (in words): ${invoiceData.inWords}`, 14, doc.autoTable.previous.finalY + 73);

//         // Saving the PDF
//         doc.save(`Invoice_${invoiceData.transactionId}.pdf`);
//     };

//     return (
//         <div>
//             {orders.length === 0 ? (
//                 <p>No orders found</p>
//             ) : (
//                 <table border="1" cellPadding="10" cellSpacing="0" style={{ margin: 'auto' }}>
//                     <thead>
//                         <tr>
//                             <th>Order ID</th>
//                             <th>Customer Name</th>
//                             <th>Quantity</th>
//                             <th>Product Name</th>
//                             <th>Weight (gm)</th>
//                             <th>Final Order Price</th>
//                             <th>Download Invoice</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {orders.map((order, index) => (
//                             <tr key={index}>
//                                 <td>{order.id}</td>
//                                 <td>
//                                     {order.customerDetails.firstName} {order.customerDetails.lastName}
//                                 </td>
//                                 <td>{order.quantity}</td>
//                                 <td>{order.product.productName}</td>
//                                 <td>{order.product.weight}</td>
//                                 {Array.isArray(order.orderdetails) && order.orderdetails.length > 0 ? (
//                                     <td>{order.orderdetails[0].finalOrderPrice}</td>
//                                 ) : (
//                                     <td>N/A</td>
//                                 )}
//                                 <td>
//                                     <button
//                                         onClick={() => downloadPhysicalGoldInvoice(order.id)}
//                                         disabled={!!invoices[order.id]} // Disable button if invoice is already downloaded
//                                     >
//                                         {invoices[order.id] ? 'Invoice Downloaded' : 'Download Invoice'}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// }

// export default Orders;



import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Orders() {
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    const uniqueId = userInfo["custom:uniqueId"]
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [invoices, setInvoices] = useState({}); // State to store invoices

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
                console.log(parsedData);
                setOrders(parsedData); // Update the state with the order data
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

    if (loading) {
        return <div>Loading...</div>;
    }

    const generatePDF = (invoiceData) => {
        const doc = new jsPDF();

        // Adding Title
        doc.setFontSize(18);
        doc.text('Invoice', 14, 22);

        // Adding Customer Details
        doc.setFontSize(12);
        doc.text('Customer Details:', 14, 35);
        doc.text(`Name: ${invoiceData.customerName}`, 14, 42);
        doc.text(`Billing Address: ${invoiceData.billingAddress}`, 14, 49);
        doc.text(`Shipping Address: ${invoiceData.customerShippingAddress}`, 14, 56);
        doc.text(`PAN Card Number: ${invoiceData.panCardNumber}`, 14, 63);

        // Adding Invoice Details
        doc.setFontSize(12);
        doc.text('Invoice Details:', 14, 75);
        doc.text(`Invoice Date: ${invoiceData.invoiceDate}`, 14, 82);
        doc.text(`Invoice Number: ${invoiceData.invoiceNumber ?? 'N/A'}`, 14, 89);
        doc.text(`Transaction ID: ${invoiceData.transactionId}`, 14, 96);

        // Adding Product Details Table
        doc.autoTable({
            startY: 110,
            head: [['Product Name', 'Quantity', 'HSN Code', 'Rate Per Unit', 'Gross Amount']],
            body: [
                [
                    invoiceData.productName,
                    invoiceData.quantity,
                    invoiceData.hsnCode,
                    invoiceData.ratePerUnit,
                    invoiceData.grossInvoiceAmount,
                ],
            ],
        });

        // Adding Tax Details
        doc.text('Tax Details:', 14, doc.autoTable.previous.finalY + 10);
        doc.text(`IGST: ${invoiceData.igst ?? 'N/A'} (${invoiceData.igstValue})`, 14, doc.autoTable.previous.finalY + 17);
        doc.text(`CGST: ${invoiceData.cgst ?? 'N/A'} (${invoiceData.cgstValue ?? 'N/A'})`, 14, doc.autoTable.previous.finalY + 24);
        doc.text(`SGST: ${invoiceData.sgst ?? 'N/A'} (${invoiceData.sgstValue ?? 'N/A'})`, 14, doc.autoTable.previous.finalY + 31);

        // Adding Final Amount
        doc.text('Amount Details:', 14, doc.autoTable.previous.finalY + 45);
        doc.text(`Subtotal Amount: ${invoiceData.subtotalAmount}`, 14, doc.autoTable.previous.finalY + 52);
        doc.text(`Net Amount: ${invoiceData.netAmount}`, 14, doc.autoTable.previous.finalY + 59);
        doc.text(`Round Off: ${invoiceData.roundOff}`, 14, doc.autoTable.previous.finalY + 66);
        doc.text(`Total Amount (in words): ${invoiceData.inWords}`, 14, doc.autoTable.previous.finalY + 73);

        // Saving the PDF
        doc.save(`Invoice_${invoiceData.transactionId}.pdf`);
    };

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                <table border="1" cellPadding="10" cellSpacing="0" style={{ margin: 'auto' }}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Quantity</th>
                            <th>Product Name</th>
                            <th>Weight (gm)</th>
                            <th>Final Order Price</th>
                            <th>Download Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(orders) && orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.id}</td>
                                <td>
                                    {order.customerDetails.firstName} {order.customerDetails.lastName}
                                </td>
                                <td>{order.quantity}</td>
                                <td>{order.product.productName}</td>
                                <td>{order.product.weight}</td>
                                {Array.isArray(order.orderdetails) && order.orderdetails.length > 0 ? (
                                    <td>{order.orderdetails[0].finalOrderPrice}</td>
                                ) : (
                                    <td>N/A</td>
                                )}
                                <td>
                                    <button
                                        onClick={() => downloadPhysicalGoldInvoice(order.id)}
                                        disabled={!!invoices[order.id]} // Disable button if invoice is already downloaded
                                    >
                                        {invoices[order.id] ? 'Invoice Downloaded' : 'Download Invoice'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
    
}

export default Orders;
