import React, { useEffect } from 'react'
import { Helmet } from "react-helmet";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


function Privacy() {

    function updateMetaTags() {

        const titleElement = document.querySelector("title");
        const metaTitleElement = document.querySelector('meta[name="title"]');
        const descriptionElement = document.querySelector('meta[name="description"]');

        let title = "Privacy Policy | FiYDAA";
        let description = "This Privacy Policy applies to all the users whose personal information has been processed by us in the course of our business, mobile applications, forums, blogs, and other online or offline offerings.";


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
            <div style={{ width: '70%', margin: 'auto', marginTop: '20px', marginBottom: '20px', textAlign: 'justify', fontFamily: 'Poppins' }}>

                <div style={{ margin: 'auto', marginBottom: '20px', textAlign: 'center' }}>
                    <h1 class="text-3xl font-poppins mb-4" align="center">FiYDAA Privacy Policy</h1>
                </div>
                <p class="text-2xl font-poppins mb-4">Digital Gold Services </p>


                We respect your privacy and hence handle your personal data with the utmost care and confidentiality. Please read the Privacy Policy carefully prior to using or registering on the Platform or accessing/availing the services on the Platform inter alia in relation to purchase/sale/transfer of Digital Gold from a brand named "Augmont ” operated and managed by “Augmont Goldtech Private Limited”(hereinafter referred as “Augmont”)  a company incorporated under the laws of India (“Services”). <br /><br />

                ‍This Privacy Policy specifies the manner in which personal data and other information is collected, received, stored, processed, disclosed, transferred, dealt with or otherwise handled by the Company. This Privacy Policy does not apply to information that You provide to, or that is collected by, any third-party (excluding the Company or its affiliates set out in paragraph 4 below) through the Platform, and any Third-Party Sites that You access or use in connection with the services offered on the Platform.<br /><br />

                By visiting the Platform, You (“You” or “Your”), accept and agree to be bound by the terms and conditions of this privacy policy (“Privacy Policy”). This Privacy Policy is incorporated into and subject to the terms of use of the Platform(“Terms”) and shall be read harmoniously and in conjunction with the Terms.<br /><br />

                It is important that you read this privacy notice together with any other privacy policy or fair processing notice we  may provide on specific occasions or when we are collecting or processing Personal Information about You so that You are fully aware of how and why we are using Your Personal Information . Additionally, we also recommend you to read the terms and privacy policy of Safe Gold which can be accessed at {" "}
                <a href="https://www.safegold.com/privacy-policy" style={{ color: '#05226b' }}>https://www.safegold.com/privacy-policy</a>
                <br /><br />

                This privacy notice supplements the other notices/policy and is not intended to supersede them.<br /><br />


                <p class="text-2xl font-poppins mb-4">Privacy Policy :</p>

                Fiydaa Application is developed by Clearwater Capital Private Limited, a company incorporated under the Companies Act, 2013 with its registered office at 1ST FLOOR, 945/3, Pachranga Bazar, Panipat, Haryana, 132103, India. This policy describes how Fiydaa and its Affiliates/Entities/Subsidiaries/Associates including but not limited to Clearwater Capital Private Limited, (collectively Fiydaa, we, our, us as the context may require) collect, store, use and otherwise process your Personal Information through Fiydaa website, Fiydaa Application, sdk, chatbot, notifications or any other medium used by Fiydaa to provide its services to you (hereinafter referred to as the Platform). By downloading and using Fiydaa services, visiting the Fiydaa website, providing your information or availing our product/services, you expressly agree to be bound by this Privacy Policy and the applicable service/product terms and conditions. We value the trust you place in us and respect your privacy, maintaining the highest standards for secure transactions and protection of your personal information. <br /><br />

                This privacy policy is published and shall be construed in accordance with the provisions of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 under the Information Technology Act, 2000; that require publishing of the privacy policy for collection, use, storage, transfer, disclosure of Personal Information (means and includes all information that can be linked to a specific individual) including Sensitive Personal Information (all Personal Information which requires heightened data protection measures due to its sensitive and personal nature) (both, hereinafter referred to as Personal Information), excluding any information that is freely available or accessible in public domain. Please note, we do not offer any product/service under our Platform outside India. If you do not agree with this privacy policy, please do not use or access our Platform  <br />
                ‍
                <p class="text-2xl font-poppins mb-4">Information Collection :</p>
                We may collect your Personal Information when you use our services or Platform or otherwise interact with us during our relationship. We collect Personal Information which is relevant and absolutely necessary for providing the services requested by you and to continually improve the Fiydaa Platform.<br /><br />

                Personal and Sensitive Personal Information collected includes but not limited to:<br /><br />


                1)name, age, gender, photo, address, phone number, e-mail id, your contacts and nominee details<br />
                2)PAN card number, KYC related information such as videos or other online/ offline verification documents as mandated by relevant regulatory authorities, your business-related information.<br />
                3)OTP sent to you by your bank or via Fiydaa or any third party Payment gateway<br />
                4)balance, transaction history and value, bank account details, wallet balance, investment details and transactions, service or transaction related communication, part of your card details for smooth transaction using Fiydaa or any of the services.<br />
                5)your device details such as device identifier, internet bandwidth, mobile device model, browser plug-ins, and cookies or similar technologies that may identify your browser/Fiydaa Application and plug-ins, and time spent, IP address and location.<br /><br />
                We will retain credit report data for no longer than six months. We and our service providers or business partners may also collect your Personal Information from third parties or information made publicly available including financial history and other information for the purpose of verifying and authenticating an investment transaction request you place with us. This is done in order to prevent suspicious transactions, or to comply with court judgements and bankruptcies, from credit reference and fraud prevention agencies. In case of employment opportunities with Fiydaa, we and our service providers or business partners may also collect your resume, your past employment and educational qualification for background checks and verifications, through online or offline databases that are otherwise legitimately obtained and are subject to the third party`'`s terms of use and/or privacy statement.<br /><br />

                Information may be collected at various stages of your usage of the Fiydaa Platform such as:<br /><br />

                1)visiting Fiydaa Platform<br />
                2)registering on Fiydaa Platform as an user or any other relationship that may be governed by terms and conditions listed on Fiydaa Platform.<br />
                3)transacting or attempting to transact on Fiydaa Platform<br />
                4) accessing links, e-mails, chat conversations, feedbacks, notifications sent or owned by Fiydaa Platform and if you opt to participate in our occasional surveys.<br />
                5) otherwise dealing with any of the Fiydaa Affiliates/Entities/Business Partners/Associates.<br />
                6)while applying for career opportunities with Fiydaa<br /><br />


                <p class="text-2xl font-poppins mb-4">Purpose and Use of Personal Information :</p>
                Fiydaa may process your Personal Information for the following purposes :<br />

                1) creation of your account and verification of your identity and access privileges<br />
                2) provide you access to the products and services being offered by us, merchants, affiliates, subsidiaries, associates, or business partners<br />
                3) to conduct the KYC compliance process as a mandatory prerequisite as per the requirements of various regulatory bodies<br />
                4) to validate, process and/or share your KYC information, nominee details with other intermediaries, Business Partners or AMCs or financial institutions or with any other service providers as may be required<br />
                5) to provide payment instructions; communicate with you for your queries, transactions, and/or any other regulatory requirement, etc.<br />
                6)to authenticate a transaction request; validate a standing instruction for a Systematic Investment Plan or confirm a payment made via the services<br />
                7) enhancing your user experience in various processes/submission of applications/avail of product/service offerings by analysing user behaviour on an aggregated basis;<br />
                8)to monitor and review products/services from time to time; customize the services to make your experience safer and easier, and conducting audits<br />
                9)to allow third parties to contact you for products and services availed/requested by you on Fiydaa Platform or third-party links<br />
                10) to carry credit checks, screenings or due diligence checks as lawfully if required by us; detect and protect us against error, fraud, money laundering and other criminal activity; enforce our terms and conditions<br />
                11) to inform you about online and offline offers, products, services, and updates; customizing and improving your experience by marketing, presenting advertising, and offering tailored products and offers<br />
                12) to resolve disputes; troubleshoot problems; technical support and fixing bugs; help promote a safe service<br />
                13) to identify security breaches and attacks; investigating, preventing, and taking action on illegal or suspected fraud or money laundering activities and conducting forensic audits as part of internal or external audit or government agencies located within<br />
                14) While we may also process your Personal Information for other legitimate business cases, we ensure to take appropriate steps to minimize the processing to the extent possible, making it less intrusive to your privacy.<br /><br />

                <p class="text-2xl font-poppins mb-4">Cookies or Similar Technologies :</p>
                We use data collection devices such as cookies or similar technologies on certain pages of the Platform to help analyse our web page flow, measure promotional effectiveness, and promote trust and safety. Cookies are small files placed on your device hard-drive/storage that assist us in providing our services. Cookies do not contain any of your Personal Information. We offer certain features that are only available through the use of a cookie or similar technologies. We also use cookies to allow you to enter your password less frequently during a session. Cookies or similar technologies can also help us provide information that is targeted to your interests. Most cookies are session cookies, meaning that they are automatically deleted from your device hard-drive/storage at the end of a session. You are always free to decline/delete our cookies or similar technologies if your browser/device permits, although in that case you may not be able to use certain features on the Platform and you may be required to re-enter your password more frequently during a session. Additionally, you may encounter cookies or other similar technologies on certain pages of the Platform that are placed by third parties. We do not control the use of cookies by third parties.<br /><br />

                <p class="text-2xl font-poppins mb-4">Information Sharing and Disclosures :</p>
                Your Personal Information is shared as allowed under applicable laws, after following due diligence, assessing the recipient`'`s privacy policies and practices, and in line with the purposes set out in this policy. Personal Information is shared only after a contractual obligation is imposed on the recipients to adhere to similar or no less stringent privacy practices of Fiydaa<br /><br />


                We may share your Personal Information in the course of your transaction with different categories of recipients such as business partners, service providers, associates, subsidiaries, legally recognized authorities, regulatory bodies, financial institutions, internal teams such as marketing, security, investigation team etc.
                <br /><br />

                Personal Information will be shared, as applicable, on need-to-know basis, for the following purposes:<br /><br />

                1) for enabling the provision of the products/services availed by you and facilitating the services between you and the service provider, as requested<br />
                2) for complying with applicable laws as well as meeting the Know Your Customer (KYC) requirements as mandated by various regulatory bodies, whose regulated service/product you opt through our services/Platforms<br />
                3) for completing a transaction initiated by you on a Business Partner site, where based on your instructions, the partners requests to fetch your Personal Information from us<br />
                4) for the purpose of processing your financial product subscription requests placed with us and ensuring that these requests reach the relevant financial institution whose service/product you have opted for<br />
                5) if it is required by financial institutions to verify, mitigate or prevent fraud or to manage risk or recover funds in accordance with applicable laws/regulations<br />
                6) for services related to communication, marketing, data and information storage, transmission, security, analytics, fraud detection, risk assessment and research<br />
                7)enforce our Terms or Privacy Policy; respond to claims that an advertisement, posting or other content violates the rights of a third party; or protect the rights, property or personal safety of our users or the general public<br />
                8) if required to do so by law or in good faith we believe that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal process<br /><br />

                While the information is shared, Fiydaa ensures that the processing is carried out only on behalf of Fiydaa and this policy is applicable to the extent possible.<br /><br />

                <p class="text-2xl font-poppins mb-4">Storage and Retention :</p>
                To the extent applicable, we store Personal Information within India and retain it in accordance with applicable laws and for a period no longer than it is required for the purpose for which it was collected. However, we may retain Personal Information related to you if we believe it may be necessary to prevent fraud or future abuse or if required by law such as in the event of the pendency of any legal/regulatory proceeding or receipt of any legal and/or regulatory direction to that effect or for other legitimate purposes.<br />

                Once the Personal Information has reached its retention period, it shall be deleted in compliance with Fiydaa`'`s policy on retention and data deletion. <br />

                <p class="text-2xl font-poppins mb-4">Reasonable Security Practices :</p>
                We understand that as effective as our security measures are, no security system is impenetrable. Hence, as part of our reasonable security practices, we undergo strict internal and external reviews to ensure appropriate information security encryption or controls are placed for both data in motion and data at rest within our network and servers respectively. The database is stored on servers secured behind a firewall; access to the servers is password-protected and is strictly limited.<br /><br />

                <p class="text-2xl font-poppins mb-4">Third-Party Products, Services, or Websites :</p>
                When you are availing products and services of service providers on the Fiydaa Platform, Personal Information may be collected by respective service providers and such Personal Information shall be governed by their privacy policy. You may refer to their privacy policy and terms of service to understand how your Personal Information will be handled by such service providers.<br /><br />

                Our services may include links to other websites or applications when you visit our Platform. Such websites or applications are governed by their respective privacy policies, which are beyond our control. Once you leave our servers (you can tell where you are by checking the URL in the location bar on your browser or on the m-site you are redirected), use of any Personal Information that you provide on these websites or applications is governed by the privacy policy of the operator of the application/website you are visiting. That policy may differ from ours and you are requested to review those policies or seek access to the policies from the domain owner before proceeding to use those applications or websites. We do not accept any responsibility or liability for usage of your Personal Information by these third parties or their policies<br /><br />

                Decentro is our payment gateway service provider. Decentro, is committed to protecting your personal data and respecting your privacy. Please read the following terms of the Policy carefully to understand our practices regarding your personal data and how they will treat it. This policy sets out the basis on which any personal data Decentro collects from you or about you, or that you provide to us, will be processed by us.<br /><br />

                Decentro implement certain security measures, including encryption and firewalls, to protect your personal information from unauthorized access. These security measures are in compliance with the security practices and procedures prescribed under the Information Technology Act, 2000, and the applicable rules (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information Rules, 2011). However, you agree and acknowledge that the above-mentioned measures do not guarantee absolute protection of personal information. By accessing the Services, you agree to assume all risks associated with the disclosure of personal information arising due to breaches of firewalls and secure server software.<br /><br />

                Where we have given you (or where you have chosen) a password that enables you to access certain parts of the Services, you are responsible for keeping this password confidential. We ask you not to share the password with anyone.<br /><br />

                We will comply with the requirements under the Information Technology Act, 2000, and the rules made thereunder in the event of a data or security risk.<br /><br />

                <p class="text-2xl font-poppins mb-4">Your Consent :</p>
                We process your Personal Information with consent. By using our Platform or services and/or by providing your Personal Information, you consent to the processing of your Personal Information by Fiydaa in accordance with this Privacy Policy. If you disclose to us any Personal Information relating to other people, you represent that you have the authority to do so and permit us to use the information in accordance with this Privacy Policy.<br /> <br />

                <p class="text-2xl font-poppins mb-4">Children Information :</p>
                We do not knowingly solicit or collect Personal Information from children under the age of 18 and use of our Platform is available only to persons who can form a legally binding contract under the Indian Contract Act, 1872. If you are under the age of 18 years then you must use the Platform or services under the supervision of your parent, legal guardian, or any responsible adult.<br /> <br />


                <p class="text-2xl font-poppins mb-4">Changes to Policy :</p>
                Since our business changes constantly, so will our policies. We reserve the right, at our sole discretion, to change, modify, add, or remove portions of this Privacy Policy at any time without any prior written notice to you. We may, however, reasonably endeavour to notify you of the changes, it is your responsibility to review the Privacy Policy periodically for updates/changes. Your continued use of our services/Platform, following the posting of changes will mean that you accept and agree to the revisions. We will never make changes to policies in order to make it less protective of Personal Information already shared by you.<br /> <br />


                <p class="text-2xl font-poppins mb-4">Grievance Officer :</p>
                If You have any grievance with respect to the Platform, please feel free to reach out to the grievance officer, the name and contact details of this Officer have been provided below:<br />
                <span style={{ fontWeight: 600 }}> Name: Veerkaran Gill</span><br />
                <span style={{ fontWeight: 600 }}> Email: support@fiydaa.in </span><br /><br />

                <p class="text-2xl font-poppins mb-4">Contact Us :</p>
                In case you have any questions or concerns regarding the processing of your Personal Information or this Privacy Policy you may write to us at support@fiydaa.in.





            </div>
            <Footer/>
        </>
    )
}

export default Privacy