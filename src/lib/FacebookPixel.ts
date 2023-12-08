interface Window {
  fbq?: (...args: any[]) => void;
  _fbq?: any;
}

declare var fbq: Function;

export const initFacebookPixel = (): void => {
  (function (f: any, b: Document, e: string, v: string, n: any, t: HTMLScriptElement, s: Element) {
      if (f.fbq) return;
      n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];

      if (s && s.parentNode) {
          s.parentNode.insertBefore(t, s);
      } else {
          console.error("Could not insert script element into the DOM.");
      }
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js', {}, {} as HTMLScriptElement, {} as Element);
  
  fbq('init', '370159925378991');
  fbq('track', 'PageView');
};

