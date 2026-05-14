export default function revokeUrlOnDetectDevTool(objUrl) {
  function detectDevTool(allow) {
    if (isNaN(+allow)) allow = 100;
    var start = +new Date(); // Validation of built-in Object tamper prevention.
    // eslint-disable-next-line no-debugger
    if (isDevToolsOpen()) {
      removeAllPDF();
    }
    // eslint-disable-next-line no-debugger
    // debugger;
    var end = +new Date(); // Validates too.
    if (isNaN(start) || isNaN(end) || end - start > allow) {
      URL.revokeObjectURL(objUrl);
      alert("please close developer tools");
      // iframe.src = "";
    }
  }

  if (window.attachEvent) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      detectDevTool();
      window.attachEvent("onresize", detectDevTool);
      window.attachEvent("onmousemove", detectDevTool);
      window.attachEvent("onfocus", detectDevTool);
      window.attachEvent("onblur", detectDevTool);
    } else {
      // eslint-disable-next-line no-undef
      setTimeout(argument.callee, 0);
    }
  } else {
    window.addEventListener("load", detectDevTool);
    window.addEventListener("resize", detectDevTool);
    window.addEventListener("mousemove", detectDevTool);
    window.addEventListener("focus", detectDevTool);
    window.addEventListener("blur", detectDevTool);
  }

  if (isDevToolsOpen()) {
    removeAllPDF();
  }
}

function isDevToolsOpen() {
  const threshold = 160;
  const ua = navigator.userAgent || navigator.vendor || window.opera;

  const isMobile = /android|iphone|ipad|ipod/i.test(ua);

  if (isMobile) {
    // Disable DevTools detection for mobile to avoid false positives
    return false;
  }

  const widthThreshold = window.outerWidth - window.innerWidth > threshold;
  const heightThreshold = window.outerHeight - window.innerHeight > threshold;

  return widthThreshold || heightThreshold;
}


export function removeAllPDF() {
  const pdfs = document.querySelectorAll(".wp-block-pdfp-pdf-poster");
  if (pdfs) {
    pdfs.forEach((pdf) => pdf.remove());
  } else {
    document.body.remove();
  }

  alert("I am sorry, you can't open developer tools. Please close the developer tools!");
}
