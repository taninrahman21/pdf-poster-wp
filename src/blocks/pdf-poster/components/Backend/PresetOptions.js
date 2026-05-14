import { PanelRow } from "@wordpress/components";
import { SelectControl } from "@wordpress/components";
import { TextControl } from "@wordpress/components";
import { FormToggle } from "@wordpress/components";
import { PanelBody } from "@wordpress/components";
import { __experimentalNumberControl as NumberControl, __experimentalUnitControl as UnitControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import BColor from "../../../../Components/BColor";
import BSpacer from "../../../../Components/BSpacer";

const PresetOptions = (props) => {
  const { attributes, setAttributes } = props;

  const {
    titleFontSize,
    height,
    width,
    showName,
    print,
    onlyPDF,
    defaultBrowser,
    adobeEmbedder,
    downloadButton,
    downloadButtonText,
    fullscreenButton,
    fullscreenButtonText,
    newWindow,
    protect,
    thumbMenu,
    sidebarOpen,
    initialPage,
    zoomLevel,
    alert,
    lastVersion,
    hrScroll,
    adobeOptions,
    popupBtnStyle,
    popupBtnText,
  } = attributes;

  const normalizedViewer = adobeEmbedder === true ? "adobe" : (adobeEmbedder === false ? "default" : adobeEmbedder);

  return (
    <>
      <PanelBody className="bPlPanelBody" title={__("Settings", "pdfp")} initialOpen={false}>
        <PanelRow>
          <label htmlFor="adobeEmbedder" className="label">
            {__("use adobe PDF embedder", "pdfp")}
          </label>
          <FormToggle id="adobeEmbedder" checked={normalizedViewer === "adobe"} onChange={() => setAttributes({ adobeEmbedder: normalizedViewer === "adobe" ? "default" : "adobe" })} />
        </PanelRow>

        {normalizedViewer === "adobe" && (
          <>
            <PanelRow>
              <label htmlFor="embedMode" className="label">
                {__("Embed Mode", "pdfp")}
              </label>
              <SelectControl
                options={[
                  { label: "Sized Container", value: "SIZED_CONTAINER" },
                  { label: "Full Window", value: "FULL_WINDOW" },
                  { label: "In-Line", value: "IN_LINE" },
                  { label: "Lightbox", value: "LIGHT_BOX" },
                ]}
                value={adobeOptions?.embedMode}
                onChange={(embedMode) => setAttributes({ adobeOptions: { ...adobeOptions, embedMode } })}
              />
            </PanelRow>

            {adobeOptions?.embedMode === "LIGHT_BOX" && (
              <PanelRow>
                <TextControl label={__("Button Text", "pdfp")} value={popupBtnText} onChange={(popupBtnText) => setAttributes({ popupBtnText })} />
              </PanelRow>
            )}

            {["SIZED_CONTAINER", "IN_LINE", "LIGHT_BOX", "FULL_WINDOW"].includes(adobeOptions?.embedMode) && (
              <PanelRow>
                <label htmlFor="showPrintPDF" className="label">
                  {__("Show Print Button", "pdfp")}
                </label>
                <FormToggle id="showPrintPDF" checked={adobeOptions?.showPrintPDF} onChange={() => setAttributes({ adobeOptions: { ...adobeOptions, showPrintPDF: !adobeOptions?.showPrintPDF } })} />
              </PanelRow>
            )}
            {["SIZED_CONTAINER", "IN_LINE", "LIGHT_BOX", "FULL_WINDOW"].includes(adobeOptions?.embedMode) && (
              <PanelRow>
                <label htmlFor="showDownloadPDF" className="label">
                  {__("Show Download Button", "pdfp")}
                </label>
                <FormToggle id="showDownloadPDF" checked={adobeOptions?.showDownloadPDF} onChange={() => setAttributes({ adobeOptions: { ...adobeOptions, showDownloadPDF: !adobeOptions?.showDownloadPDF } })} />
              </PanelRow>
            )}
            {["SIZED_CONTAINER"].includes(adobeOptions.embedMode) && (
              <PanelRow>
                <label htmlFor="showFullScreen" className="label">
                  {__("Show Fullscreen Button", "pdfp")}
                </label>
                <FormToggle id="showFullScreen" checked={adobeOptions?.showFullScreen} onChange={() => setAttributes({ adobeOptions: { ...adobeOptions, showFullScreen: !adobeOptions?.showFullScreen } })} />
              </PanelRow>
            )}
            {["FULL_WINDOW"].includes(adobeOptions?.embedMode) && (
              <>
                <PanelRow>
                  <label htmlFor="showAnnotationTools" className="label">
                    {__("Show Annotation Tools", "pdfp")}
                  </label>
                  <FormToggle id="showAnnotationTools" checked={adobeOptions?.showAnnotationTools} onChange={() => setAttributes({ adobeOptions: { ...adobeOptions, showAnnotationTools: !adobeOptions?.showAnnotationTools } })} />
                </PanelRow>
                {/* <PanelRow>
          <label htmlFor="defaultViewMode" className="label">
            {__("View Mode", "pdfp")}
          </label>
          <SelectControl
            options={[
              { label: "Fit Page", value: "FIT_PAGE" },
              { label: "Fit Width", value: "FIT_WIDTH" },
              { label: "Two Column", value: "TWO_COLUMN" },
              { label: "Two Column Fit Page", value: "TWO_COLUMN_FIT_PAGE" },
            ]}
            value={adobeOptions.defaultViewMode}
            onChange={(defaultViewMode) => setAttributes({ adobeOptions: { ...adobeOptions, defaultViewMode } })}
          />
        </PanelRow> */}
              </>
            )}
          </>
        )}

        {normalizedViewer !== "adobe" && (
          <>
            <PanelRow>
              <label htmlFor="protect" className="label">
                {__("Protect my content", "pdfp")}
              </label>
              <FormToggle id="protect" checked={protect} onChange={() => setAttributes({ protect: !protect })} />
            </PanelRow>
            {protect && (
              <PanelRow>
                <label htmlFor="alert" className="label">
                  {__("Enable Alert", "pdfp")}
                </label>
                <FormToggle id="alert" checked={alert} onChange={() => setAttributes({ alert: !alert })} />
              </PanelRow>
            )}
            {!protect && (
              <PanelRow>
                <label htmlFor="print" className="label">
                  {__("Allow print", "pdfp")}
                </label>
                <FormToggle id="print" checked={print} onChange={() => setAttributes({ print: !print })} />
              </PanelRow>
            )}
            <PanelRow>
              <label htmlFor="showName" className="label">
                {__("Show title on top", "pdfp")}
              </label>
              <FormToggle id="showName" checked={showName} onChange={() => setAttributes({ showName: !showName })} />
            </PanelRow>
            <PanelRow>
              <label htmlFor="onlyPDF" className="label">
                {__("Raw PDF", "pdfp")}
              </label>
              <FormToggle id="onlyPDF" checked={onlyPDF} onChange={() => setAttributes({ onlyPDF: !onlyPDF })} />
            </PanelRow>

            {!protect && (
              <>
                <PanelRow>
                  <label htmlFor="defaultBrowser" className="label">
                    {__("Use browser pdf viewer", "pdfp")}
                  </label>
                  <FormToggle id="defaultBrowser" checked={defaultBrowser} onChange={() => setAttributes({ defaultBrowser: !defaultBrowser })} />
                </PanelRow>
                <PanelRow>
                  <label htmlFor="downloadButton" className="label">
                    {__("Show download button", "pdfp")}
                  </label>
                  <FormToggle id="downloadButton" checked={downloadButton} onChange={() => setAttributes({ downloadButton: !downloadButton })} />
                </PanelRow>
                {downloadButton && <TextControl label="" value={downloadButtonText} onChange={(downloadButtonText) => setAttributes({ downloadButtonText })} />}
              </>
            )}
            {!protect && (
              <>
                <PanelRow>
                  <label htmlFor="fullscreenButton" className="label">
                    {__("Show fullscreen button", "pdfp")}
                  </label>
                  <FormToggle id="fullscreenButton" checked={fullscreenButton} onChange={() => setAttributes({ fullscreenButton: !fullscreenButton })} />
                </PanelRow>
                {fullscreenButton && (
                  <>
                    <TextControl label="" value={fullscreenButtonText} onChange={(fullscreenButtonText) => setAttributes({ fullscreenButtonText })} />
                    <PanelRow>
                      <label htmlFor="newWindow" className="label">
                        {__("Open in new window", "pdfp")}
                      </label>
                      <FormToggle id="newWindow" checked={newWindow} onChange={() => setAttributes({ newWindow: !newWindow })} />
                    </PanelRow>
                  </>
                )}
              </>
            )}

            <PanelRow>
              <label htmlFor="thumbMenu" className="label">
                {__("Enable thumbnails toggle menu", "pdfp")}
              </label>
              <FormToggle id="thumbMenu" checked={thumbMenu} onChange={() => setAttributes({ thumbMenu: !thumbMenu })} />
            </PanelRow>
            {thumbMenu && (
              <PanelRow>
                <label htmlFor="sidebarOpen" className="label">
                  {__("Show Thumb by Default", "pdfp")}
                </label>
                <FormToggle id="sidebarOpen" checked={sidebarOpen} onChange={() => setAttributes({ sidebarOpen: !sidebarOpen })} />
              </PanelRow>
            )}
            <PanelRow>
              <label htmlFor="lastVersion" className="label">
                {__("Load the last version of the PDF", "pdfp")}
              </label>
              <FormToggle id="lastVersion" checked={lastVersion} onChange={() => setAttributes({ lastVersion: !lastVersion })} />
            </PanelRow>
            <PanelRow>
              <label htmlFor="hrScroll" className="label">
                {__("Horizontal Scrollbar", "pdfp")}
              </label>
              <FormToggle id="hrScroll" checked={hrScroll} onChange={() => setAttributes({ hrScroll: !hrScroll })} />
            </PanelRow>
            <PanelRow>
              <label className="label">{__("Initail page", "pdfp")}</label>
              <NumberControl isShiftStepEnabled={true} onChange={(initialPage) => setAttributes({ initialPage })} shiftStep={1} value={initialPage} />
            </PanelRow>
            <PanelRow>
              <label className="label">{__("Zoom Level (%)", "pdfp")}</label>
              <NumberControl help={__("leave empty to set auto", "pdfp")} isShiftStepEnabled={true} onChange={(zoomLevel) => setAttributes({ zoomLevel })} shiftStep={1} value={zoomLevel} />
            </PanelRow>
          </>
        )}
      </PanelBody>
      <PanelBody className="bPlPanelBody" title={__("Style", "pdfp")} initialOpen={false}>
        <PanelRow>
          <label htmlFor="Height" className="label">
            {__("Height", "pdfp")}
          </label>
          <UnitControl
            onChange={(height) => setAttributes({ height })}
            value={height.desktop || height}
            units={[
              { value: "px", label: "px", default: 500 },
              { value: "%", label: "%", default: 100 },
              { value: "vh", label: "vh", default: 100 },
            ]}
            isResetValueOnUnitChange={true}
          />
        </PanelRow>
        <PanelRow>
          <label htmlFor="width" className="label">
            {__("Width", "pdfp")}
          </label>
          <UnitControl
            onChange={(width) => setAttributes({ width })}
            value={width.desktop || width}
            units={[
              { value: "px", label: "px", default: 500 },
              { value: "%", label: "%", default: 100 },
              { value: "vw", label: "vw", default: 100 },
            ]}
            isResetValueOnUnitChange={true}
          />
        </PanelRow>
        <PanelRow>
          <label htmlFor="titleFontSize" className="label">
            {__("Title Font Size", "pdfp")}
          </label>
          <UnitControl
            onChange={(titleFontSize) => setAttributes({ titleFontSize })}
            value={titleFontSize}
            units={[
              { value: "px", label: "px", default: 16 },
              { value: "em", label: "em", default: 1 },
              { value: "rem", label: "rem", default: 1 },
            ]}
            isResetValueOnUnitChange={true}
          />
        </PanelRow>
      </PanelBody>
      {adobeOptions?.embedMode === "LIGHT_BOX" && normalizedViewer === "adobe" && (
        <PanelBody className="bPlPanelBody" title={__("Adobe Lightbox Button Style", "pdfp")}>
          <PanelRow>
            <label>{__("Background", "bpm")}</label>
            <BColor value={popupBtnStyle?.background} onChange={(background) => setAttributes({ popupBtnStyle: { ...popupBtnStyle, background } })} />
          </PanelRow>
          <PanelRow>
            <label>{__("Text Color", "bpm")}</label>
            <BColor value={popupBtnStyle?.color} onChange={(color) => setAttributes({ popupBtnStyle: { ...popupBtnStyle, color } })} />
          </PanelRow>
          <BSpacer title={__("Padding", "pdfp")} value={popupBtnStyle?.padding || {}} onChange={(padding) => setAttributes({ popupBtnStyle: { ...popupBtnStyle, padding } })} />
        </PanelBody>
      )}
    </>
  );
};

export default PresetOptions;
