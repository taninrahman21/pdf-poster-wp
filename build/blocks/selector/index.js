/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/pdf-poster/components/Common/Header.js"
/*!***********************************************************!*\
  !*** ./src/blocks/pdf-poster/components/Common/Header.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_utils_isiOSDevice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../hooks/utils/isiOSDevice */ "./src/hooks/utils/isiOSDevice.js");



function Header({
  attributes,
  source,
  RichText,
  setAttributes,
  __,
  wrapper,
  previewSrc,
  showActions = true,
  showTitle = true
}) {
  const {
    downloadButton,
    protect,
    downloadButtonText,
    fullscreenButton,
    fullscreenButtonText,
    showName,
    titleFontSize,
    title,
    adobeEmbedder,
    newWindow,
    actionsPosition
  } = attributes;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {}, []);
  const normalizedViewer = adobeEmbedder === true ? "adobe" : adobeEmbedder === false ? "default" : adobeEmbedder || "default";
  const manageDownload = e => {
    if (normalizedViewer === "flipbook") {
      e.preventDefault();
      const event = new CustomEvent('PDFP_TOGGLE_FLIPBOOK_FULLSCREEN', {
        detail: {
          wrapper
        }
      });
      window.dispatchEvent(event);
      return;
    }
    if (e.target.target === "_self") {
      if (!(0,_hooks_utils_isiOSDevice__WEBPACK_IMPORTED_MODULE_1__["default"])()) {
        e.preventDefault();
        wrapper?.querySelector(".iframe_wrapper")?.requestFullscreen();
      } else {
        e.target = "blank";
      }
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, normalizedViewer !== "adobe" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `pdfp_header pdfp_header_${actionsPosition}`
  }, showName && showTitle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText, {
    tagName: "p",
    value: title,
    allowedFormats: [],
    style: {
      fontSize: titleFontSize,
      margin: "20px"
    },
    onChange: title => setAttributes({
      title
    }),
    placeholder: __("Title", "pdfp")
  }), (downloadButton || fullscreenButton) && !protect && showActions && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cta_wrapper"
  }, downloadButton && !protect && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "pdfp_download pdfp_download_btn button",
    download: true,
    target: "blank",
    href: source,
    rel: "noreferrer"
  }, (() => {
    let label = "Download File";
    label = downloadButtonText;
    return label;
  })()), fullscreenButton && !protect && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "button",
    href: normalizedViewer === "flipbook" ? source : previewSrc,
    rel: "noreferrer",
    onClick: manageDownload,
    target: (() => {
      let target = "_self";
      target = newWindow ? "blank" : "_self";
      return target;
    })()
  }, (() => {
    let label = "View Fullscreen";
    label = fullscreenButtonText;
    return label;
  })()))));
}

/***/ },

/***/ "./src/blocks/pdf-poster/components/Common/PDFJSViewer.jsx"
/*!*****************************************************************!*\
  !*** ./src/blocks/pdf-poster/components/Common/PDFJSViewer.jsx ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../style.scss */ "./src/blocks/pdf-poster/style.scss");


// import { loadFrameIfNotLoaded } from '../../../hooks/utils/loadFrameIfNotLoaded';
// import isEdgeBrowser from "../../../hooks/utils/isEdgeBrowser";
const exampleFile = "http://localhost/freemius/wp-content/uploads/2022/02/temp.pdf";

function PDFJSViewer({
  __,
  attributes,
  source = pdfp?.placeholder || exampleFile,
  className,
  isBackend = false,
  onGViewError
}) {
  const {
    hrScroll,
    title,
    socialShare
  } = attributes;
  const {
    position
  } = socialShare || {};
  const [isLoaded, setIsLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [pdfError, setPdfError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Reset error when source changes
    setPdfError(null);
    setIsLoaded(false);
    if (!source) return;

    // HTTP HEAD check to pre-validate the URL
    const validatePdfUrl = async url => {
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
        const response = await fetch(fileToValidate, {
          method: "HEAD",
          cache: "no-cache"
        });
        if (!response.ok) {
          setPdfError(__("The PDF file could not be found or the server returned an error.", "pdfp"));
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
    const handleMessage = event => {
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
  const exitFullScreen = () => {
    document.exitFullscreen();
  };
  const handleLoad = () => {
    setIsLoaded(true);
  };
  const renderError = message => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pdfp_error_container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pdfp_error_box"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "48",
    height: "48",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "12"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
    x1: "12",
    y1: "16",
    x2: "12.01",
    y2: "16"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, message), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => window.location.reload(),
    className: "pdfp_retry_btn"
  }, __("Retry", "pdfp"))));
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, source.includes("dropbox.com") ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dropbox-embed-sdfsdfsdf",
    style: {
      border: "2px solid #ddd"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, __("Preview is not available for dropbox", "pdfp"))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `iframe_wrapper ${className} ${hrScroll ? "pdfp_horizontal_scroll" : ""}`
  }, isBackend && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pdfp-embed-overlay"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pdfp_frame_overlay"
  }), pdfError ? renderError(pdfError) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("iframe", {
    className: "pdfp_iframe",
    src: source,
    title: title,
    onLoad: handleLoad
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "close",
    onClick: exitFullScreen
  }, "\xD7"))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PDFJSViewer);

/***/ },

/***/ "./src/blocks/pdf-poster/components/Common/SocialShare.js"
/*!****************************************************************!*\
  !*** ./src/blocks/pdf-poster/components/Common/SocialShare.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _icons_Facebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../icons/Facebook */ "./src/icons/Facebook.js");
/* harmony import */ var _icons_Linkedin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../icons/Linkedin */ "./src/icons/Linkedin.js");
/* harmony import */ var _icons_Pinterest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../icons/Pinterest */ "./src/icons/Pinterest.js");
/* harmony import */ var _icons_X__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../icons/X */ "./src/icons/X.js");





const SocialShare = ({
  attributes
}) => {
  const {
    socialShare
  } = attributes;
  const {
    enabled,
    facebook,
    twitter,
    linkedin,
    pinterest,
    position
  } = socialShare;
  if (!enabled) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `pdfp_social_share pdfp_social_icon_${position}`
  }, facebook && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons_Facebook__WEBPACK_IMPORTED_MODULE_1__["default"], {
    height: "40px",
    width: "40px"
  })), twitter && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: `https://twitter.com/intent/tweet?text=${window.location.href}`,
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons_X__WEBPACK_IMPORTED_MODULE_4__["default"], {
    height: "40px",
    width: "40px"
  })), linkedin && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`,
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons_Linkedin__WEBPACK_IMPORTED_MODULE_2__["default"], {
    height: "40px",
    width: "40px"
  })), pinterest && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: `https://pinterest.com/pin/create/button/?url=${window.location.href}`,
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons_Pinterest__WEBPACK_IMPORTED_MODULE_3__["default"], {
    height: "40px",
    width: "40px"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocialShare);

/***/ },

/***/ "./src/blocks/pdf-poster/components/Common/Style.js"
/*!**********************************************************!*\
  !*** ./src/blocks/pdf-poster/components/Common/Style.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Style)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_utils_getPadding__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../hooks/utils/getPadding */ "./src/hooks/utils/getPadding.js");



function Style({
  attributes,
  id = 'pdfp'
}) {
  const [CSS, setCSS] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const {
    height,
    popupBtnStyle: sss,
    popupOptions: rawPopupOptions,
    width,
    alignment,
    btnStyles: rawBtnStyles
  } = attributes;
  const popupOptions = rawPopupOptions || {};
  const btnStyle = popupOptions.btnStyle || {};
  const buttonStyle = rawBtnStyles || btnStyle || {};
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let CSS = `
    .${id} .cta_wrapper a, 
    .${id} .cta_wrapper button, 
    .${id} .popup-btn{
      padding: ${(0,_hooks_utils_getPadding__WEBPACK_IMPORTED_MODULE_1__["default"])(buttonStyle.padding)}
      color: ${buttonStyle.color}; 
      background: ${buttonStyle.background}; 
      border-radius: 3px;
      border:0;
      cursor: pointer;
      font-size: ${buttonStyle.fontSize};
      min-height: 0px;
      line-height: 1.35em;
      text-transform: initial;
    }
    #${id} {
        display: flex;
        justify-content: ${alignment};
    }
    #${id} .pdfp_wrapper {
      width: 100%;
    }
    
    #${id} .iframe_wrapper {
      height: ${height?.desktop || height};
      width: ${width?.desktop || width};
    }
     
        #${id} .pdfp_wrapper iframe {
          height: 100%;
          width: 100%;
        }
    .${id} .popup-trigger {
    display: flex;
      justify-content: ${popupOptions.triggerAlignment};
    }
    .${id} .popup-trigger img, .${id} .popup-trigger-text {
      height: ${popupOptions.imageHeight};
      width: ${popupOptions.imageWidth};
    }
    .${id}btn {
      background: ${sss?.background}; 
      color: ${sss?.color}; 
      padding: ${(0,_hooks_utils_getPadding__WEBPACK_IMPORTED_MODULE_1__["default"])(sss?.padding)}
    } `.replace(/\s\s+/g, " ").trim();
    if (typeof height === 'object') {
      CSS += ` @media only screen and (max-width: 1024px) {
        #${id} .iframe_wrapper {
          height: ${height.tablet || height};
          width: ${width.tablet || width};
        }
      }
      @media only screen and (max-width: 640px) {
        #${id} .iframe_wrapper{
          height: ${height.mobile || height} !important;
          width: ${width.mobile || width} !important;
        }
      }`.replace(/\s\s+/g, " ").trim();
    }
    setCSS(CSS);
  }, [sss, id, height, buttonStyle, width, alignment, popupOptions]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, CSS);
}

/***/ },

/***/ "./src/blocks/pdf-poster/components/Common/Viewer.js"
/*!***********************************************************!*\
  !*** ./src/blocks/pdf-poster/components/Common/Viewer.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Header */ "./src/blocks/pdf-poster/components/Common/Header.js");
/* harmony import */ var _PDFJSViewer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PDFJSViewer */ "./src/blocks/pdf-poster/components/Common/PDFJSViewer.jsx");
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Style */ "./src/blocks/pdf-poster/components/Common/Style.js");
/* harmony import */ var _SocialShare__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SocialShare */ "./src/blocks/pdf-poster/components/Common/SocialShare.js");
/* harmony import */ var _hooks_utils_matchProtocol__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../hooks/utils/matchProtocol */ "./src/hooks/utils/matchProtocol.js");
/* harmony import */ var _hooks_utils_isEdgeBrowser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../hooks/utils/isEdgeBrowser */ "./src/hooks/utils/isEdgeBrowser.js");








// import { isOldiPhoneOrIPad } from "../utils";

const Viewer = ({
  attributes,
  RichText,
  setAttributes,
  __,
  isBackend = false,
  id
}) => {
  const {
    adobeEmbedder,
    file,
    protect,
    alert: enableAlert,
    additional,
    socialShare,
    align,
    print,
    onlyPDF,
    downloadButton,
    thumbMenu,
    hrScroll,
    isHideRightToolbar,
    initialPage,
    zoomLevel,
    sidebarOpen,
    defaultBrowser = false,
    popupOptions,
    isPremium,
    actionsPosition
  } = attributes;
  const {
    enabled
  } = popupOptions || {};
  const {
    position: socialPosition,
    enabled: socialEnabled
  } = socialShare || {};
  const [source, setSource] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [gviewError, setGviewError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const verifyProtectedContent = async () => {
      let isProtected = false;
      // Protection logic removed

      if (!isProtected) {
        setSource((0,_hooks_utils_matchProtocol__WEBPACK_IMPORTED_MODULE_5__["default"])(file));
      }
    };
    verifyProtectedContent();
  }, [file]);
  const [previewSrc, setPreviewSrc] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let iframeSrc = "";
    const showSidePanel = window.innerWidth >= 768 ? sidebarOpen : false;
    const getSafeEncodedUrl = url => {
      try {
        // Decode first to avoid double encoding, then encode
        return encodeURIComponent(decodeURIComponent(url));
      } catch (e) {
        return encodeURIComponent(url);
      }
    };
    const encodedSource = getSafeEncodedUrl(source);
    if (source.includes(window.location.origin) || gviewError) {
      if ((0,_hooks_utils_isEdgeBrowser__WEBPACK_IMPORTED_MODULE_6__["default"])() && defaultBrowser && !gviewError) {
        iframeSrc = `//docs.google.com/gview?embedded=true&url=${encodedSource}`;
      } else {
        let zoom = "&z=auto";
        let proParams = "";
        // proParams removed

        iframeSrc = `${pdfp?.dir}assets/pdfjs-new/web/viewer.html?file=${encodedSource}${zoom}&nobaki=${!protect && downloadButton ? "vera" : "false"}&stdono=${print && !protect ? "vera" : "false"}&open=${showSidePanel}&onlypdf=${onlyPDF ? "vera" : "false"}${proParams}`;
      }
    } else if (source.includes(".google.com")) {
      iframeSrc = source;
    } else if (source) {
      // Fallback for other origin files - use Google Docs Viewer
      iframeSrc = `//docs.google.com/gview?embedded=true&url=${encodedSource}`;
    }
    setPreviewSrc(iframeSrc);
  }, [onlyPDF, thumbMenu, initialPage, protect, hrScroll, source, zoomLevel, print, downloadButton, sidebarOpen, isHideRightToolbar, gviewError]);
  const currentViewer = adobeEmbedder === true ? "adobe" : adobeEmbedder === false ? "default" : adobeEmbedder || "default";
  const fullscreenPDF = () => {
    if (currentViewer === "flipbook") {
      ref.current?.classList.add("pdfp_fullscreen_opened");
      return;
    }
    if (typeof ref.current?.querySelector(".iframe_wrapper").requestFullscreen === "function") {
      ref.current?.querySelector(".iframe_wrapper").requestFullscreen();
    } else {
      ref.current?.classList.add("pdfp_fullscreen_opened");
    }
  };
  const closeFullscreen = () => {
    ref.current?.classList.remove("pdfp_fullscreen_opened");
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: ref,
    className: `pdfp_wrapper pdfp_viewer_${currentViewer} ${additional?.Class} ${id} align-${align} ${enabled ? "pdfp_popup_enabled" : ""} ${protect ? "pdfp_protected" : ""}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Style__WEBPACK_IMPORTED_MODULE_3__["default"], {
    attributes: attributes,
    id: id
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pdfp_fullscreen_overlay"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pdfp_fullscreen_close",
    onClick: closeFullscreen
  }, "\xD7"), source && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, socialEnabled && socialPosition === "top" && !enabled && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SocialShare__WEBPACK_IMPORTED_MODULE_4__["default"], {
    attributes: attributes
  }), !enabled && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Header__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    source: source,
    previewSrc: previewSrc,
    RichText: RichText,
    setAttributes: setAttributes,
    __: __,
    wrapper: ref.current,
    showTitle: true,
    showActions: actionsPosition === "top"
  }), currentViewer === "default" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_PDFJSViewer__WEBPACK_IMPORTED_MODULE_2__["default"], {
    source: previewSrc,
    attributes: attributes,
    setAttributes: setAttributes,
    __: __,
    wrapper: ref.current,
    isBackend: isBackend,
    onGViewError: () => setGviewError(true)
  }), !enabled && actionsPosition === "bottom" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Header__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    source: source,
    previewSrc: previewSrc,
    RichText: RichText,
    setAttributes: setAttributes,
    __: __,
    wrapper: ref.current,
    showTitle: false,
    showActions: true
  }), socialEnabled && socialPosition === "bottom" && !enabled && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SocialShare__WEBPACK_IMPORTED_MODULE_4__["default"], {
    attributes: attributes
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Viewer);

/***/ },

/***/ "./src/blocks/selector/Edit.js"
/*!*************************************!*\
  !*** ./src/blocks/selector/Edit.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Settings */ "./src/blocks/selector/Settings.js");
/* harmony import */ var _pdf_poster_components_Common_Viewer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pdf-poster/components/Common/Viewer */ "./src/blocks/pdf-poster/components/Common/Viewer.js");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__);









function Edit(props) {
  const {
    attributes,
    setAttributes,
    clientId,
    isSelected,
    docs
  } = props;
  const {
    data,
    shadowAttributes
  } = attributes;
  const {
    tringle_text
  } = data;
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!attributes.data?.tringle_text) {
      return;
    }
    setIsLoading(true);
    jQuery.get(pdfp?.siteUrl + "/wp-json/pdfposter/v1/single/" + tringle_text, function (res) {
      setAttributes({
        shadowAttributes: res
      });
      setIsLoading(false);
    });
  }, [attributes.data]);
  let options;
  if (docs) {
    options = docs.map(item => {
      return {
        label: item?.title?.rendered || "No title",
        value: item?.id
      };
    });
    options = [{
      label: "Select",
      value: null
    }, ...options];
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.useBlockProps)()
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Settings__WEBPACK_IMPORTED_MODULE_2__["default"], {
    attributes,
    setAttributes,
    options
  }), !isSelected && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pdfp_selector",
    style: {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 9999,
      background: 'transparent'
    }
  }), isLoading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Loading..."), !isLoading && shadowAttributes?.file && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_pdf_poster_components_Common_Viewer__WEBPACK_IMPORTED_MODULE_3__["default"], {
    attributes: shadowAttributes,
    id: `block-${clientId}`,
    RichText: _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.RichText,
    __: _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__,
    setAttributes: newAttrs => {
      setAttributes({
        shadowAttributes: {
          ...shadowAttributes,
          ...newAttrs
        }
      });
    },
    isBackend: true
  }), !isLoading && !shadowAttributes?.file && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
    label: "PDF Poster",
    value: data?.tringle_text,
    options: options,
    onChange: id => setAttributes({
      data: {
        tringle_text: id
      }
    })
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__.compose)([(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.withSelect)(select => {
  const docs = select("core").getEntityRecords("postType", "pdfposter", {
    per_page: 100
  });
  return {
    docs
  };
})])(Edit));

/***/ },

/***/ "./src/blocks/selector/Settings.js"
/*!*****************************************!*\
  !*** ./src/blocks/selector/Settings.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);



const Settings = ({
  attributes,
  setAttributes,
  options
}) => {
  const {
    data
  } = attributes;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
    style: {
      marginBottom: "40px"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.BlockControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToolbarGroup, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToolbarButton, {
    icon: 'edit',
    label: "Bold",
    onClick: () => setAttributes({
      shadowAttributes: null,
      data: {
        tringle_text: null
      }
    })
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Panel, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    className: "bPlPanelBody"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: "PDF Poster",
    value: data?.tringle_text,
    options: options,
    onChange: id => setAttributes({
      data: {
        tringle_text: id
      }
    })
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Settings);
// export default compose([
//   withSelect((select) => {
//     const docs = select("core").getEntityRecords("postType", "pdfposter", { per_page: 100 });
//     return {
//       docs,
//     };
//   }),
// ])(Settings);

/***/ },

/***/ "./src/blocks/selector/attributes.js"
/*!*******************************************!*\
  !*** ./src/blocks/selector/attributes.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const attributes = {
  data: {
    type: "object",
    default: {
      tringle_text: ""
    }
  },
  shadowAttributes: {
    type: "object",
    default: {}
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (attributes);

/***/ },

/***/ "./src/blocks/selector/index.js"
/*!**************************************!*\
  !*** ./src/blocks/selector/index.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attributes */ "./src/blocks/selector/attributes.js");
/* harmony import */ var _Edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit */ "./src/blocks/selector/Edit.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__);




// import Edit from "./Edit";
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.registerBlockType)("meta-box/document-embedder", {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("PDF Poster Selector", "pdfp"),
  icon: "pdf",
  category: "design",
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("PDF Poster", "pdfp"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("PDF Viewer", "pdfp")],
  supports: {
    // align: ["wide", "full"],
    html: false
  },
  attributes: _attributes__WEBPACK_IMPORTED_MODULE_0__["default"],
  getEditWrapperProps: () => {},
  edit: _Edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: () => {
    return null;
  },
  example: {
    attributes: true
  }
});

/***/ },

/***/ "./src/hooks/utils/getPadding.js"
/*!***************************************!*\
  !*** ./src/hooks/utils/getPadding.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getPadding)
/* harmony export */ });
function getPadding(padding) {
  if (!padding) {
    return null;
  }
  if (typeof padding === 'string' && typeof parseInt(padding) === 'number') {
    return padding;
  }
  return `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;`;
}

/***/ },

/***/ "./src/hooks/utils/isEdgeBrowser.js"
/*!******************************************!*\
  !*** ./src/hooks/utils/isEdgeBrowser.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isEdgeBrowser)
/* harmony export */ });
function isEdgeBrowser() {
  const userAgent = window.navigator.userAgent;

  // Microsoft Edge can be identified by the "Edg" substring in the user agent
  return userAgent.includes("Edg");
}

/***/ },

/***/ "./src/hooks/utils/isiOSDevice.js"
/*!****************************************!*\
  !*** ./src/hooks/utils/isiOSDevice.js ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isiOSDevice)
/* harmony export */ });
function isiOSDevice() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

/***/ },

/***/ "./src/hooks/utils/matchProtocol.js"
/*!******************************************!*\
  !*** ./src/hooks/utils/matchProtocol.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ matchProtocol)
/* harmony export */ });
function matchProtocol(source) {
  if (typeof source !== 'string') return source;
  return source.replace(/https?:/, window.location.protocol);
}

/***/ },

/***/ "./src/icons/Facebook.js"
/*!*******************************!*\
  !*** ./src/icons/Facebook.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const FacebookIcon = ({
  height = "24px",
  width = "24px",
  ...restProps
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    version: "1.1",
    height: height,
    width: width,
    xmlns: "http://www.w3.org/2000/svg",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512 512",
    style: {
      enableBackground: `new 0 0 512 512`
    },
    ...restProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    style: {
      fill: "#1976D2"
    },
    d: "M448,0H64C28.704,0,0,28.704,0,64v384c0,35.296,28.704,64,64,64h384c35.296,0,64-28.704,64-64V64 C512,28.704,483.296,0,448,0z"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    style: {
      fill: "#FAFAFA"
    },
    d: "M432,256h-80v-64c0-17.664,14.336-16,32-16h32V96h-64l0,0c-53.024,0-96,42.976-96,96v64h-64v80h64 v176h96V336h48L432,256z"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FacebookIcon);

/***/ },

/***/ "./src/icons/Linkedin.js"
/*!*******************************!*\
  !*** ./src/icons/Linkedin.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const LinkedinIcon = ({
  height = "24px",
  width = "24px",
  ...restProps
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    height: height,
    width: width,
    viewBox: "0 0 176 176",
    xmlns: "http://www.w3.org/2000/svg",
    ...restProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "Layer_2",
    "data-name": "Layer 2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "linkedin"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
    id: "background",
    fill: "#0077b5",
    height: "176",
    rx: "24",
    width: "176"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "icon",
    fill: "#fff"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "m63.4 48a15 15 0 1 1 -15-15 15 15 0 0 1 15 15z"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "m60 73v66.27a3.71 3.71 0 0 1 -3.71 3.73h-15.81a3.71 3.71 0 0 1 -3.72-3.72v-66.28a3.72 3.72 0 0 1 3.72-3.72h15.81a3.72 3.72 0 0 1 3.71 3.72z"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "m142.64 107.5v32.08a3.41 3.41 0 0 1 -3.42 3.42h-17a3.41 3.41 0 0 1 -3.42-3.42v-31.09c0-4.64 1.36-20.32-12.13-20.32-10.45 0-12.58 10.73-13 15.55v35.86a3.42 3.42 0 0 1 -3.37 3.42h-16.42a3.41 3.41 0 0 1 -3.41-3.42v-66.87a3.41 3.41 0 0 1 3.41-3.42h16.42a3.42 3.42 0 0 1 3.42 3.42v5.78c3.88-5.82 9.63-10.31 21.9-10.31 27.18 0 27.02 25.38 27.02 39.32z"
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinkedinIcon);

/***/ },

/***/ "./src/icons/Pinterest.js"
/*!********************************!*\
  !*** ./src/icons/Pinterest.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const PinterestIcon = ({
  height = "24px",
  width = "24px",
  ...restProps
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    height: height,
    viewBox: "0 0 176 176",
    width: width,
    xmlns: "http://www.w3.org/2000/svg",
    ...restProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "Layer_2",
    "data-name": "Layer 2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "pinterest"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
    id: "background",
    fill: "#d50012",
    height: "176",
    rx: "24",
    width: "176"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    id: "icon",
    d: "m90.58 33c-30 0-45.16 21.52-45.16 39.47 0 10.87 4.11 20.53 12.94 24.14a2.17 2.17 0 0 0 3.16-1.61c.3-1.11 1-3.91 1.29-5.07.43-1.59.26-2.14-.91-3.52-2.54-3-4.17-6.89-4.17-12.39 0-16 12-30.27 31.11-30.27 17 0 26.29 10.37 26.29 24.22 0 18.22-8.06 33.59-20 33.59-6.61 0-11.56-5.47-10-12.17 1.9-8 5.58-16.64 5.58-22.42 0-5.17-2.78-9.49-8.52-9.49-6.76 0-12.19 7-12.19 16.36a24.3 24.3 0 0 0 2 10s-6.92 29.29-8.13 34.43c-2.41 10.21-.36 22.74-.19 24a.84.84 0 0 0 1.5.37c.63-.82 8.67-10.75 11.41-20.68.77-2.81 4.44-17.37 4.44-17.37 2.2 4.19 8.61 7.88 15.44 7.88 20.31 0 34.09-18.52 34.09-43.3.02-18.72-15.86-36.17-39.98-36.17z",
    fill: "#fff"
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PinterestIcon);

/***/ },

/***/ "./src/icons/X.js"
/*!************************!*\
  !*** ./src/icons/X.js ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const XIcon = ({
  height = "24px",
  width = "24px",
  ...restProps
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    height: height,
    width: width,
    "enable-background": "new 0 0 1227 1227",
    viewBox: "0 0 1227 1227",
    xmlns: "http://www.w3.org/2000/svg",
    ...restProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "m654.53 592.55 276.12 394.95h-113.32l-225.32-322.28v-.02l-33.08-47.31-263.21-376.5h113.32l212.41 303.85z"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "m1094.42 0h-961.84c-73.22 0-132.58 59.36-132.58 132.58v961.84c0 73.22 59.36 132.58 132.58 132.58h961.84c73.22 0 132.58-59.36 132.58-132.58v-961.84c0-73.22-59.36-132.58-132.58-132.58zm-311.8 1040.52-228.01-331.84-285.47 331.84h-73.78l326.49-379.5-326.49-475.17h249.02l215.91 314.23 270.32-314.23h73.78l-311.33 361.9h-.02l338.6 492.77z"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (XIcon);

/***/ },

/***/ "./src/blocks/pdf-poster/style.scss"
/*!******************************************!*\
  !*** ./src/blocks/pdf-poster/style.scss ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

module.exports = window["React"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/compose"
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["compose"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"blocks/selector/index": 0,
/******/ 			"blocks/pdf-poster/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkpdf_poster"] = globalThis["webpackChunkpdf_poster"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/pdf-poster/style-index"], () => (__webpack_require__("./src/blocks/selector/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map