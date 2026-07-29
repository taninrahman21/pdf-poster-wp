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
                    <ToggleControl className="mt10" label={__("Allow Printing", "pdfp")} id="print" checked={print} onChange={() => setAttributes({ print: !print })} help={__("Allow visitors to print the PDF document.", "pdfp")} />

                    <ToggleControl className="mt10" label={__("Download Button", "pdfp")} id="downloadButton" checked={downloadButton} onChange={() => setAttributes({ downloadButton: !downloadButton })} help={__("Display a download button at the top of the viewer.", "pdfp")} />
                </>
            )}

            {!protect && fullscreenButton && (
                <TextControl className="mt10" label={__("Fullscreen Label", "pdfp")} help={__("Customize the text for the fullscreen button.", "pdfp")} value={fullscreenButtonText} onChange={(fullscreenButtonText) => setAttributes({ fullscreenButtonText })} />
            )}

            <Notice status='premium' isIcon={true}>
                {__('Unlock a custom Download Button label, opening the fullscreen view in a new tab, and moving the action buttons to the bottom of the viewer—available exclusively in Premium.', 'pdfp')}
            </Notice>
        </PanelBody>
    )
}

export default Actions
