/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/pdf-poster/components/Common/Header.js":
/*!***********************************************************!*\
  !*** ./src/blocks/pdf-poster/components/Common/Header.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
  console.log(normalizedViewer, "From Tanin");
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
      if (!(0,_hooks_utils_isiOSDevice__WEBPACK_IMPORTED_MODULE_1__.default)()) {
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
    /*! <fs_premium_only> */
    label = downloadButtonText;
    /*! </fs_premium_only> */
    return label;
  })()), fullscreenButton && !protect && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "button",
    href: normalizedViewer === "flipbook" ? source : previewSrc,
    rel: "noreferrer",
    onClick: manageDownload,
    target: (() => {
      let target = "_self";
      /*! <fs_premium_only> */
      if (normalizedViewer === "flipbook") {
        target = "_self";
      } else {
        target = newWindow ? "blank" : "_self";
      }
      /*! </fs_premium_only> */
      return target;
    })()
  }, (() => {
    let label = "View Fullscreen";
    /*! <fs_premium_only> */
    label = fullscreenButtonText;
    /*! </fs_premium_only> */
    return label;
  })()))));
}

/***/ }),

/***/ "./src/blocks/pdf-poster/components/Common/PDFJSViewer.jsx":
/*!*****************************************************************!*\
  !*** ./src/blocks/pdf-poster/components/Common/PDFJSViewer.jsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/blocks/pdf-poster/components/Common/Style.js":
/*!**********************************************************!*\
  !*** ./src/blocks/pdf-poster/components/Common/Style.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
      padding: ${(0,_hooks_utils_getPadding__WEBPACK_IMPORTED_MODULE_1__.default)(buttonStyle.padding)}
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
      padding: ${(0,_hooks_utils_getPadding__WEBPACK_IMPORTED_MODULE_1__.default)(sss?.padding)}
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

/***/ }),

/***/ "./src/blocks/pdf-poster/components/Common/Viewer.js":
/*!***********************************************************!*\
  !*** ./src/blocks/pdf-poster/components/Common/Viewer.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_utils_alertOnContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../hooks/utils/alertOnContext */ "./src/hooks/utils/alertOnContext.js");
/* harmony import */ var _hooks_utils_getBlobUrl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../hooks/utils/getBlobUrl */ "./src/hooks/utils/getBlobUrl.js");
/* harmony import */ var _hooks_utils_revokeUrlOnDetectDevTool__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../hooks/utils/revokeUrlOnDetectDevTool */ "./src/hooks/utils/revokeUrlOnDetectDevTool.js");
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Header */ "./src/blocks/pdf-poster/components/Common/Header.js");
/* harmony import */ var _PDFJSViewer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PDFJSViewer */ "./src/blocks/pdf-poster/components/Common/PDFJSViewer.jsx");
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Style */ "./src/blocks/pdf-poster/components/Common/Style.js");
/* harmony import */ var _hooks_utils_matchProtocol__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../hooks/utils/matchProtocol */ "./src/hooks/utils/matchProtocol.js");
/* harmony import */ var _hooks_utils_isEdgeBrowser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../hooks/utils/isEdgeBrowser */ "./src/hooks/utils/isEdgeBrowser.js");










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
    position
  } = socialShare || {};
  const [source, setSource] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [gviewError, setGviewError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const verifyProtectedContent = async () => {
      let isProtected = false;
      // Protection logic removed

      if (!isProtected) {
        setSource((0,_hooks_utils_matchProtocol__WEBPACK_IMPORTED_MODULE_7__.default)(file));
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
    console.log(attributes, " Asona Valo Vasona");
    const encodedSource = getSafeEncodedUrl(source);
    if (source.includes(window.location.origin) || gviewError) {
      if ((0,_hooks_utils_isEdgeBrowser__WEBPACK_IMPORTED_MODULE_8__.default)() && defaultBrowser && !gviewError) {
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
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Style__WEBPACK_IMPORTED_MODULE_6__.default, {
    attributes: attributes,
    id: id
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pdfp_fullscreen_overlay"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pdfp_fullscreen_close",
    onClick: closeFullscreen
  }, "\xD7"), source && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, !enabled && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Header__WEBPACK_IMPORTED_MODULE_4__.default, {
    attributes: attributes,
    source: source,
    previewSrc: previewSrc,
    RichText: RichText,
    setAttributes: setAttributes,
    __: __,
    wrapper: ref.current,
    showTitle: true,
    showActions: actionsPosition === "top"
  }), currentViewer === "default" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_PDFJSViewer__WEBPACK_IMPORTED_MODULE_5__.default, {
    source: previewSrc,
    attributes: attributes,
    setAttributes: setAttributes,
    __: __,
    wrapper: ref.current,
    isBackend: isBackend,
    onGViewError: () => setGviewError(true)
  }), !enabled && actionsPosition === "bottom" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Header__WEBPACK_IMPORTED_MODULE_4__.default, {
    attributes: attributes,
    source: source,
    previewSrc: previewSrc,
    RichText: RichText,
    setAttributes: setAttributes,
    __: __,
    wrapper: ref.current,
    showTitle: false,
    showActions: true
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Viewer);

/***/ }),

/***/ "./src/hooks/utils/alertOnContext.js":
/*!*******************************************!*\
  !*** ./src/hooks/utils/alertOnContext.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ alertOnContext)
/* harmony export */ });
function alertOnContext(enabled, iframe) {
  if (!enabled) {
    document.oncontextmenu = function (e) {
      e.preventDefault();
    };
    if (iframe) {
      iframe.contentWindow.document.oncontextmenu = function (e) {
        e.preventDefault();
      };
    }
  } else {
    document.addEventListener("keydown", e => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s" || e.key === "F12") {
        e.preventDefault();
        e.stopPropagation();
        alert("Saving is disabled on this page");
        return false;
      } else {
        return true;
      }
    });
    const attachProtection = () => {
      try {
        if (iframe && iframe.contentWindow && iframe.contentWindow.document) {
          iframe.contentWindow.document.oncontextmenu = function (e) {
            alert("Right Click Disabled");
            e.preventDefault();
          };
        }
      } catch (e) {
        console.warn("Could not attach protection to iframe (Cross-origin or not loaded yet)");
      }
    };
    if (iframe) {
      iframe.addEventListener("load", attachProtection);
      // Also try immediately in case it's already loaded
      attachProtection();
    }
    document.oncontextmenu = function (e) {
      alert("Right Click Disabled");
      e.preventDefault();
    };
  }
}

/***/ }),

/***/ "./src/hooks/utils/getBlobUrl.js":
/*!***************************************!*\
  !*** ./src/hooks/utils/getBlobUrl.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBlobUrl)
/* harmony export */ });
async function getBlobUrl(source) {
  const result = await fetch(source);
  const blob = await result.blob();
  return URL.createObjectURL(blob);
}

/***/ }),

/***/ "./src/hooks/utils/getPadding.js":
/*!***************************************!*\
  !*** ./src/hooks/utils/getPadding.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/hooks/utils/isEdgeBrowser.js":
/*!******************************************!*\
  !*** ./src/hooks/utils/isEdgeBrowser.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isEdgeBrowser)
/* harmony export */ });
function isEdgeBrowser() {
  const userAgent = window.navigator.userAgent;

  // Microsoft Edge can be identified by the "Edg" substring in the user agent
  return userAgent.includes("Edg");
}

/***/ }),

/***/ "./src/hooks/utils/isiOSDevice.js":
/*!****************************************!*\
  !*** ./src/hooks/utils/isiOSDevice.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isiOSDevice)
/* harmony export */ });
function isiOSDevice() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

/***/ }),

/***/ "./src/hooks/utils/matchProtocol.js":
/*!******************************************!*\
  !*** ./src/hooks/utils/matchProtocol.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ matchProtocol)
/* harmony export */ });
function matchProtocol(source) {
  if (typeof source !== 'string') return source;
  return source.replace(/https?:/, window.location.protocol);
}

/***/ }),

/***/ "./src/hooks/utils/revokeUrlOnDetectDevTool.js":
/*!*****************************************************!*\
  !*** ./src/hooks/utils/revokeUrlOnDetectDevTool.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ revokeUrlOnDetectDevTool),
/* harmony export */   "removeAllPDF": () => (/* binding */ removeAllPDF)
/* harmony export */ });
function revokeUrlOnDetectDevTool(objUrl) {
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
function removeAllPDF() {
  const pdfs = document.querySelectorAll(".wp-block-pdfp-pdf-poster");
  if (pdfs) {
    pdfs.forEach(pdf => pdf.remove());
  } else {
    document.body.remove();
  }
  alert("I am sorry, you can't open developer tools. Please close the developer tools!");
}

/***/ }),

/***/ "./src/blocks/pdf-poster/public.scss":
/*!*******************************************!*\
  !*** ./src/blocks/pdf-poster/public.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/pdf-poster/style.scss":
/*!******************************************!*\
  !*** ./src/blocks/pdf-poster/style.scss ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

module.exports = window["ReactDOM"];

/***/ })

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************************!*\
  !*** ./src/blocks/pdf-poster/view.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "View": () => (/* binding */ View),
/* harmony export */   "RichText": () => (/* binding */ RichText),
/* harmony export */   "__": () => (/* binding */ __)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Common_Viewer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Common/Viewer */ "./src/blocks/pdf-poster/components/Common/Viewer.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/pdf-poster/style.scss");
/* harmony import */ var _public_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./public.scss */ "./src/blocks/pdf-poster/public.scss");

// eslint-disable-next-line no-unused-vars





// import

const init = (container = document) => {
  // Search for the block class or the data-attributes attribute or the loading placeholder
  const blocksByClass = container.querySelectorAll(".wp-block-pdfp-pdf-poster");
  const blocksByAttr = container.querySelectorAll("[data-attributes]");
  const blocksByPlaceholder = container.querySelectorAll(".pdfp_loading_placeholder");

  // Combine and de-duplicate
  const blockSet = new Set([...blocksByClass, ...blocksByAttr]);
  blocksByPlaceholder.forEach(p => {
    if (p.parentElement && !blockSet.has(p.parentElement)) {
      blockSet.add(p.parentElement);
    }
  });
  const blocks = Array.from(blockSet);
  blocks.forEach(block => {
    if (block.hasAttribute('data-pdfp-initialized')) {
      return;
    }
    let attributesData = block.dataset.attributes;
    if (!attributesData) {
      // Search in children if block itself doesn't have it (unlikely but safe)
      const attrEl = block.querySelector("[data-attributes]");
      if (attrEl) attributesData = attrEl.dataset.attributes;
    }
    if (!attributesData) {
      return;
    }
    block.setAttribute('data-pdfp-initialized', 'true');
    try {
      const attributes = JSON.parse(attributesData);
      const root = (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createRoot)(block);
      root.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(View, {
        attributes: attributes,
        id: block.id
      }));
    } catch (e) {
      // Silently fail or log sparingly in production
    }
  });
};

// Start initialization
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  init();
}
document.addEventListener("DOMContentLoaded", () => {
  init();
});

// Elementor Support
const runElementor = () => {
  if (window.elementorFrontend && elementorFrontend.hooks) {
    elementorFrontend.hooks.addAction('frontend/element_ready/global', $scope => {
      init($scope[0]);
    });
    return true;
  }
  return false;
};

// Robust Elementor hook registration
let elementorRetryCount = 0;
const setupElementor = () => {
  if (runElementor()) return;
  if (elementorRetryCount < 20) {
    // Retry for 10 seconds
    elementorRetryCount++;
    setTimeout(setupElementor, 500);
  }
};
setupElementor();
if (typeof jQuery !== 'undefined') {
  jQuery(window).on('elementor/frontend/init', runElementor);
}
function View({
  attributes,
  id
}) {
  const setAttributes = () => {};
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Common_Viewer__WEBPACK_IMPORTED_MODULE_2__.default, {
    RichText: RichText,
    attributes: attributes,
    setAttributes: setAttributes,
    __: __,
    id: id
  }));
}
function RichText({
  tag: Tag = "p",
  value = ""
}) {
  if (value) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Tag, null, value);
  }
  return null;
}

// eslint-disable-next-line no-unused-vars
function __(text, textdomain) {
  return text;
}
})();

/******/ })()
;
//# sourceMappingURL=view.js.map