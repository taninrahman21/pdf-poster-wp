import { useEffect, useRef, useState } from "react";
import alertOnContext from "../../../../hooks/utils/alertOnContext";
import getBlobUrl from "../../../../hooks/utils/getBlobUrl";
import revokeUrlOnDetectDevTool from "../../../../hooks/utils/revokeUrlOnDetectDevTool";
import Header from "./Header";
import PDFJSViewer from "./PDFJSViewer";
import Style from "./Style";
import matchProtocol from "../../../../hooks/utils/matchProtocol";
import isEdgeBrowser from "../../../../hooks/utils/isEdgeBrowser";
// import { isOldiPhoneOrIPad } from "../utils";

const Viewer = ({ attributes, RichText, setAttributes, __, isBackend = false, id }) => {
  const { adobeEmbedder, file, protect, alert: enableAlert, additional, socialShare, align, print, onlyPDF, downloadButton, thumbMenu, hrScroll, isHideRightToolbar, initialPage, zoomLevel, sidebarOpen, defaultBrowser = false, popupOptions, isPremium, actionsPosition } = attributes;
  const { enabled } = (popupOptions || {});
  const { position } = (socialShare || {});

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

    console.log(attributes, " Asona Valo Vasona");


    const encodedSource = getSafeEncodedUrl(source);

    if (source.includes(window.location.origin) || gviewError) {
      if (isEdgeBrowser() && defaultBrowser && !gviewError) {
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

  const currentViewer = adobeEmbedder === true ? "adobe" : (adobeEmbedder === false ? "default" : (adobeEmbedder || "default"));


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

  return (
    <div ref={ref} className={`pdfp_wrapper pdfp_viewer_${currentViewer} ${additional?.Class} ${id} align-${align} ${enabled ? "pdfp_popup_enabled" : ""} ${protect ? "pdfp_protected" : ""}`}>
      <Style attributes={attributes} id={id} />
      <div className="pdfp_fullscreen_overlay"></div>
      <div className="pdfp_fullscreen_close" onClick={closeFullscreen}>
        &times;
      </div>
      {source && (
        <>
          {!enabled && <Header attributes={attributes} source={source} previewSrc={previewSrc} RichText={RichText} setAttributes={setAttributes} __={__} wrapper={ref.current} showTitle={true} showActions={actionsPosition === "top"} />}


          {currentViewer === "default" && <PDFJSViewer source={previewSrc} attributes={attributes} setAttributes={setAttributes} __={__} wrapper={ref.current} isBackend={isBackend} onGViewError={() => setGviewError(true)} />}

          {!enabled && actionsPosition === "bottom" && <Header attributes={attributes} source={source} previewSrc={previewSrc} RichText={RichText} setAttributes={setAttributes} __={__} wrapper={ref.current} showTitle={false} showActions={true} />}
        </>
      )}
    </div>
  );
};

export default Viewer;
