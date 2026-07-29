import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import PDFJSViewer from "./PDFJSViewer";
import FlipbookViewer from "./FlipbookViewer";
import Style from "./Style";
import SocialShare from "./SocialShare";
import matchProtocol from "../../../../hooks/utils/matchProtocol";
import isEdgeBrowser from "../../../../hooks/utils/isEdgeBrowser";
import { hasFlipbookEngine } from "../../utils";
// import { isOldiPhoneOrIPad } from "../utils";

const Viewer = ({ attributes, RichText, setAttributes, __, isBackend = false, id }) => {
  const { adobeEmbedder, file, protect, alert: enableAlert, additional, socialShare, align, print, onlyPDF, downloadButton, thumbMenu, hrScroll, isHideRightToolbar, initialPage, zoomLevel, sidebarOpen, defaultBrowser = false, popupOptions, isPremium, actionsPosition, annotationMode, openLinksInNewTab, progressiveLoading = true, keyboardNav = false, rtlMode = "off", themeMode = "light" } = attributes;
  const { enabled } = (popupOptions || {});
  const { position: socialPosition, enabled: socialEnabled } = (socialShare || {});

  const isRtl = rtlMode === "on" || (rtlMode === "auto" && !!(typeof pdfp !== "undefined" && pdfp?.is_rtl));

  const prefersDark = () => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [systemDark, setSystemDark] = useState(prefersDark);
  useEffect(() => {
    if (themeMode !== "auto" || typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => setSystemDark(e.matches);
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () => { mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange); };
  }, [themeMode]);
  const effectiveTheme = themeMode === "auto" ? (systemDark ? "dark" : "light") : themeMode;

  const [source, setSource] = useState("");
  const [gviewError, setGviewError] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const verifyProtectedContent = async () => {
      let isProtected = false;
      // Protection logic removed

      if (!isProtected) {
        setSource(matchProtocol(file));
      }
    };

    verifyProtectedContent();
  }, [file]);

  const [previewSrc, setPreviewSrc] = useState(null);

  useEffect(() => {
    let iframeSrc = "";
    const showSidePanel = window.innerWidth >= 768 ? sidebarOpen : false;

    const getSafeEncodedUrl = (url) => {
      try {
        // Decode first to avoid double encoding, then encode
        return encodeURIComponent(decodeURIComponent(url));
      } catch (e) {
        return encodeURIComponent(url);
      }
    };
    


    const encodedSource = getSafeEncodedUrl(source);

    if (source.includes(window.location.origin) || gviewError) {
      if (isEdgeBrowser() && defaultBrowser && !gviewError) {
        iframeSrc = `//docs.google.com/gview?embedded=true&url=${encodedSource}`;
      } else {
        let zoom = "&z=auto";
        let proParams = "";
        // proParams removed

        // Free viewer options passed through to assets/pdfjs-new/web/custom.js.
        const freeParams = `&annotationMode=${annotationMode !== false ? "1" : "0"}&openLinksInNewTab=${openLinksInNewTab ? "1" : "0"}&progressive=${progressiveLoading !== false ? "1" : "0"}&keyboardnav=${keyboardNav ? "1" : "0"}&rtl=${isRtl ? "1" : "0"}&theme=${themeMode}`;

        iframeSrc = `${pdfp?.dir}assets/pdfjs-new/web/viewer.html?file=${encodedSource}${zoom}&nobaki=${!protect && downloadButton ? "vera" : "false"}&stdono=${print && !protect ? "vera" : "false"}&open=${showSidePanel}&onlypdf=${onlyPDF ? "vera" : "false"}${freeParams}${proParams}`;
      }
    } else if (source.includes(".google.com")) {
      iframeSrc = source;
    } else if (source) {
      // Fallback for other origin files - use Google Docs Viewer
      iframeSrc = `//docs.google.com/gview?embedded=true&url=${encodedSource}`;
    }
    setPreviewSrc(iframeSrc);
  }, [onlyPDF, thumbMenu, initialPage, protect, hrScroll, source, zoomLevel, print, downloadButton, sidebarOpen, isHideRightToolbar, gviewError, annotationMode, openLinksInNewTab, progressiveLoading, keyboardNav, isRtl, themeMode]);

  const requestedViewer = adobeEmbedder === true ? "adobe" : (adobeEmbedder === false ? "default" : (adobeEmbedder || "default"));

  // FlipBook and Slider are free, but they need dFlip on disk; Adobe and Scroll are
  // premium. A stored value we can't draw (a Pro export, or a package built without
  // the engine) would render an empty container, so fall back to the PDF.js viewer.
  // Mirrors the server-side clamp in PDFP_Functions::pdfp_resolve_viewer().
  const currentViewer = ["flipbook", "slider"].includes(requestedViewer) && hasFlipbookEngine()
    ? requestedViewer
    : "default";

  // Image-gallery flipbook can render without a PDF source, so it needs its own "has content" path.
  const fbImages = Array.isArray(attributes.flipbookImages) ? attributes.flipbookImages.filter(Boolean) : [];
  const useImagesFlipbook = ["flipbook", "slider"].includes(currentViewer) && attributes.flipbookSourceType === "images" && fbImages.length > 0;
  const hasContent = source || useImagesFlipbook;

  const fullscreenPDF = () => {
    if (["flipbook", "slider"].includes(currentViewer)) {
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

  return (
    <div ref={ref} dir={isRtl ? "rtl" : undefined} data-pdfp-theme={effectiveTheme} className={`pdfp_wrapper pdfp_viewer_${currentViewer} ${additional?.Class} ${id} align-${align} ${enabled ? "pdfp_popup_enabled" : ""} ${protect ? "pdfp_protected" : ""} ${isRtl ? "pdfp_rtl" : ""}`}>
      <Style attributes={attributes} id={id} />
      <div className="pdfp_fullscreen_overlay"></div>
      <div className="pdfp_fullscreen_close" onClick={closeFullscreen}>
        &times;
      </div>
      {hasContent && (
        <>
          {socialEnabled && socialPosition === "top" && !enabled && <SocialShare attributes={attributes} />}
          {!enabled && <Header attributes={attributes} source={source} previewSrc={previewSrc} RichText={RichText} setAttributes={setAttributes} __={__} wrapper={ref.current} showTitle={true} showActions={actionsPosition === "top"} />}

          {["flipbook", "slider"].includes(currentViewer) && <FlipbookViewer key={`${currentViewer}-${enabled ? 'popup' : 'normal'}-${isRtl ? 'rtl' : 'ltr'}-${effectiveTheme}-${useImagesFlipbook ? 'img' + fbImages.length : 'pdf'}`} attributes={attributes} source={source} viewerType={currentViewer} isRtl={isRtl} theme={effectiveTheme} />}

          {currentViewer === "default" && <PDFJSViewer source={previewSrc} attributes={attributes} setAttributes={setAttributes} __={__} wrapper={ref.current} isBackend={isBackend} onGViewError={() => setGviewError(true)} />}

          {!enabled && actionsPosition === "bottom" && <Header attributes={attributes} source={source} previewSrc={previewSrc} RichText={RichText} setAttributes={setAttributes} __={__} wrapper={ref.current} showTitle={false} showActions={true} />}
          {socialEnabled && socialPosition === "bottom" && !enabled && <SocialShare attributes={attributes} />}
        </>
      )}
    </div>
  );
};

export default Viewer;
