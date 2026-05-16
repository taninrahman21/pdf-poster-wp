import { useEffect } from "react";
import isiOSDevice from "../../../../hooks/utils/isiOSDevice";

export default function Header({ attributes, source, RichText, setAttributes, __, wrapper, previewSrc, showActions = true, showTitle = true }) {
  const { downloadButton, protect, downloadButtonText, fullscreenButton, fullscreenButtonText, showName, titleFontSize, title, adobeEmbedder, newWindow, actionsPosition } = attributes;

  useEffect(() => { }, []);

  const normalizedViewer = adobeEmbedder === true ? "adobe" : (adobeEmbedder === false ? "default" : adobeEmbedder || "default"); 
  

  const manageDownload = (e) => {
    if (normalizedViewer === "flipbook") {
      e.preventDefault();
      const event = new CustomEvent('PDFP_TOGGLE_FLIPBOOK_FULLSCREEN', { detail: { wrapper } });
      window.dispatchEvent(event);
      return;
    }

    if (e.target.target === "_self") {
      if (!isiOSDevice()) {
        e.preventDefault();
        wrapper?.querySelector(".iframe_wrapper")?.requestFullscreen();
      } else {
        e.target = "blank";
      }
    }
  };

  return (
    <>
      {normalizedViewer !== "adobe" && (
        <div className={`pdfp_header pdfp_header_${actionsPosition}`}>
          {showName && showTitle && <RichText tagName="p" value={title} allowedFormats={[]} style={{ fontSize: titleFontSize, margin: "20px" }} onChange={(title) => setAttributes({ title })} placeholder={__("Title", "pdfp")} />}
          {(downloadButton || fullscreenButton) && !protect && showActions && (
            <div className="cta_wrapper">

              {downloadButton && !protect && (
                <a className="pdfp_download pdfp_download_btn button" download target="blank" href={source} rel="noreferrer">
                  {(() => {
                    let label = "Download File"; 
                    label = downloadButtonText; 
                    return label;
                  })()}
                </a>
              )}

              {fullscreenButton && !protect && (
                <a 
                  className="button" 
                  href={normalizedViewer === "flipbook" ? source : previewSrc} 
                  rel="noreferrer" 
                  onClick={manageDownload} 
                  target={(() => {
                    let target = "_self";
                    target = newWindow ? "blank" : "_self";
                    return target;
                  })()}
                >
                  {(() => {
                    let label = "View Fullscreen";
                    label = fullscreenButtonText; 
                    return label;
                  })()}
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
