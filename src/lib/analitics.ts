type WindowWithDataLayer = Window & {
    dataLayer: Record<string, any>[]
}

declare const window: WindowWithDataLayer


function gtag(...args: any[]) {
    (window as any).dataLayer.push(...args);
}

export const initGoogleTagManager = () => {
    // Google Tag Manager (GTM) Script
    const gtmScript = document.createElement('script');
    gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-TTVGX229';
    gtmScript.async = true;
  
    // Add the GTM Script to the document head
    document.head.appendChild(gtmScript);
};
  
export const initGoogleAnalytics = () => {
    if(typeof window !== 'undefined') {
        // Google Analytics (gtag.js) Script
        const gaScript = document.createElement('script');
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-11427641135';
        gaScript.async = true;
    
        // Add the GA Script to the document head
        document.head.appendChild(gaScript);
    
        // Configuring Google Analytics
        window.dataLayer = window.dataLayer || [];
      
        (window as any).dataLayer = (window as any).dataLayer || [];
        gtag('js', new Date());
        gtag('config', 'AW-11427641135');
    }
};

// <!-- Google tag (gtag.js) -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11427641135"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'AW-11427641135');
// </script>

// <!-- Google Tag Manager -->
// <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
// new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
// j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
// 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
// })(window,document,'script','dataLayer','GTM-TTVGX229');</script>
// <!-- End Google Tag Manager -->

// <!-- Google Tag Manager (noscript) -->
// <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TTVGX229"
// height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
// <!-- End Google Tag Manager (noscript) -->