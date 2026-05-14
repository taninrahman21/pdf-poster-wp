import { PanelBody, ToggleControl, TextControl } from "@wordpress/components";
import { Notice } from "../../../../../../../bpl-tools/Components";
import { __ } from "@wordpress/i18n";
import { PDFIcon } from "../../../../../icons/PDF";

const Actions = ({ setAttributes, attributes }) => {
    const { protect, downloadButton, print, fullscreenButtonText, fullscreenButton } = attributes;
    
    return (
        <PanelBody className="bPlPanelBody" title={<div className="pdfp-panel-icon">{PDFIcon} {__("Actions", "pdfp")}</div>} initialOpen={false}>
            {!protect && (
                <>
                    {!protect && <ToggleControl className="mt10" label={__("Allow print", "pdfp")} id="print" checked={print} onChange={() => setAttributes({ print: !print })} help={__("Allow user to print the PDF", "pdfp")} />}

                    <ToggleControl className="mt10" label={__("Show download button", "pdfp")} id="downloadButton" checked={downloadButton} onChange={() => setAttributes({ downloadButton: !downloadButton })} />
                    <div style={{ paddingTop: '7px', marginLeft: '40px' }}>
                        {downloadButton && <BControlPro setOpen={setOpen} className="mt5" isPremium={isPremium} Component={TextControl} label="Download Button Text" value={downloadButtonText} onChange={(downloadButtonText) => setAttributes({ downloadButtonText })} />}
                    </div>
                </>
            )}

            {!protect && (
                <> 

                    {fullscreenButton && (
                        <div style={{ paddingTop: '7px' }}>

                            <TextControl className="mt5" label={__("Fullscreen Button Text", "pdfp")} value={fullscreenButtonText} onChange={(fullscreenButtonText) => setAttributes({ fullscreenButtonText })} /> 
                        </div>
                    )}
                </>
            )}

            <Notice status='premium' isIcon={true}>
                {__('Unlock professional viewer control with Full Screen Button, Button Position and New Window Actions are available exclusively in Premium.', 'pdfp')}
            </Notice>
        </PanelBody>
    )
}

export default Actions


