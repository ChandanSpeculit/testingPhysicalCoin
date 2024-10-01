import React, { useEffect } from 'react';

function Device_IOS_OR_Android() {

    useEffect(() => {
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

        // Redirect to the determined URL
        window.location.href = url;
    }, []); // Empty dependency array ensures this only runs once on mount.

    return (
        <>
            {/* <p>Redirecting to the app store...</p> */}
        </>
    );
}

export default Device_IOS_OR_Android;
