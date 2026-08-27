import React, { Fragment, useEffect, useState } from "react";
// import { loadFrameIfNotLoaded } from '../../../hooks/utils/loadFrameIfNotLoaded';
// import isEdgeBrowser from "../../../hooks/utils/isEdgeBrowser";
const exampleFile = "http://localhost/freemius/wp-content/uploads/2022/02/temp.pdf";
import "./../../style.scss";

function PDFJSViewer({ __, attributes, source = pdfp?.placeholder || exampleFile, className, isBackend = false, onGViewError }) {
  const { hrScroll, title, socialShare } = attributes;
  const { position } = (socialShare || {});
  const [isLoaded, setIsLoaded] = useState(false);
  const [pdfError, setPdfError] = useState(null);
    


  useEffect(() => {
    // Reset error when source changes
    setPdfError(null);
    setIsLoaded(false);

    if (!source) return;

    // HTTP HEAD check to pre-validate the URL
    const validatePdfUrl = async (url) => {
      // Don't check GView URLs as they are already a proxy
      if (url.includes("google.com/gview")) return;

      let fileToValidate = url;
      // If it's a viewer URL, extract the actual file path to check it
      if (url.includes("viewer.html")) {
        try {
          const urlObj = new URL(url, window.location.origin);
          fileToValidate = urlObj.searchParams.get("file") || url;
        } catch (e) {
          // Fallback to original url if parsing fails
        }
      }

      try {
        // Advisory only: proxies answer HEAD with 405, or 403 on an unexpected
        // Cache-Control, or 404 for an unmapped path -- none of which mean the PDF is
        // unreachable. A real failure still surfaces via the PDFP_ERROR message
        // custom.js posts on PDF.js `documenterror`.
        const response = await fetch(fileToValidate, { method: "HEAD" });
        if (!response.ok) {
          console.warn(`PDF pre-check returned HTTP ${response.status}. Continuing load attempt.`);
          return;
        }
        const contentLength = response.headers.get("Content-Length");
        if (contentLength && parseInt(contentLength, 10) === 0) {
          setPdfError(__("The PDF file is empty or corrupted (0 bytes).", "pdfp"));
        }
      } catch (error) {
        // If fetch fails due to CORS, we just let PDF.js try anyway
        console.warn("PDF pre-check failed (likely CORS). Continuing load attempt.", error);
      }
    };

    validatePdfUrl(source);

    let timeoutId;
    if (source.includes("google.com/gview") && !isLoaded) {
      // Set a 10 second timeout for GView
      timeoutId = setTimeout(() => {
        if (!isLoaded && typeof onGViewError === "function") {
          console.warn("Google Docs Viewer took too long to load. Falling back to PDF.js.");
          onGViewError();
        }
      }, 10000);
    }

    // Listen for messages from custom.js inside the iframe
    const handleMessage = (event) => {
      if (event.data && event.data.type === "PDFP_ERROR") {
        setPdfError(event.data.message || __("An error occurred while loading the PDF.", "pdfp"));
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("message", handleMessage);
    };
  }, [source, isLoaded, onGViewError, __]);

  // In the block editor the canvas is an iframe, so the fullscreen state lives on the
  // button's own document -- the top-level `document` has no fullscreen element to exit.
  const exitFullScreen = (e) => {
    const doc = e.currentTarget?.ownerDocument || document;
    if (doc.fullscreenElement) doc.exitFullscreen();
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const renderError = (message) => (
    <div className="pdfp_error_container">
      <div className="pdfp_error_box">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p>{message}</p>
        <button onClick={() => window.location.reload()} className="pdfp_retry_btn">
          {__("Retry", "pdfp")}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {source.includes("dropbox.com") ? (
        <div className="dropbox-embed-sdfsdfsdf" style={{ border: "2px solid #ddd" }}>
          {/* Working from render.php */}
          <p>{__("Preview is not available for dropbox", "pdfp")}</p>
        </div>
      ) : (
        <Fragment>
          <div className={`iframe_wrapper ${className} ${hrScroll ? "pdfp_horizontal_scroll" : ""}`}>
            {isBackend && <div className="pdfp-embed-overlay"></div>}
            <div className="pdfp_frame_overlay"></div>
            {pdfError ? (
              renderError(pdfError)
            ) : (
              <iframe className="pdfp_iframe" src={source} title={title} onLoad={handleLoad}></iframe>
            )}
            <span className="close" onClick={exitFullScreen}>
              &times;
            </span>
          </div>
        </Fragment>
      )}
    </>
  );
}

export default PDFJSViewer;
