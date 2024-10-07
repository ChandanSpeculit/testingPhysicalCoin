import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
function DeleteAccount() {
    function updateMetaTags() {
        const titleElement = document.querySelector("title");
        const metaTitleElement = document.querySelector('meta[name="title"]');
        const descriptionElement = document.querySelector('meta[name="description"]');
        let title = "Delete Account";
        let description = "Delete Your Account Anytime using FiYDAA App";
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
            <Box
                sx={{
                    border: "none",
                    borderRadius: "20px",
                    p: 4,
                }}
            >
                <div>
                    <svg class="w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" style={{ color: '#05226b' }} viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                    <ul class="space-y-4  bold list-disc list-inside ">
                        <li>
                            Are You sure you want to delete this account.
                            <ol class="ps-5 mt-2 space-y-1 list-decimal list-inside">
                                <li>
                                    This action is irreversible. Your account, name, phone number, email ID, sip, mutual funds, credit report and any other identifiers will be deleted from our records.
                                </li>
                            </ol>
                        </li>
                        <li>
                            What is retained ?
                            <ul class="ps-5 mt-2 space-y-1 list-decimal list-inside">
                                <li>Your KYC data and Transaction data is retained for 12 months to abide by the RBI Guidelines. Please note that after this period, KYC and transaction data is also permanently deleted.</li>
                            </ul>
                        </li>
                        <li>
                            Pre-requisites for account deletion.
                            We will check for the following conditions:
                            <ul class="ps-5 mt-2 space-y-1 list-decimal list-inside">
                                <li> You don't have any digital gold balance in your account.</li>
                                <li>You don't have any unsold mutual fund in your portfolio.</li>
                                <li> You don't have any ongoing SIP.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </Box>
            <Footer />


        </>
    )
}

export default DeleteAccount