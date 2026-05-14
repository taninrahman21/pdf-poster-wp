import { PanelBody, ToggleControl } from "@wordpress/components";
import { Notice, InlineMediaUpload } from "../../../../../../../bpl-tools/Components";
import { __ } from "@wordpress/i18n";
import { PDFIcon } from "../../../../../icons/PDF";

const Controls = ({ attributes, setAttributes, setOpen }) => {
    const { file, showName } = attributes;

    return (
        <PanelBody className="bPlPanelBody" title={<div className="pdfp-panel-icon">{PDFIcon} {__("Controls", "pdfp")}</div>} initialOpen={false}>

            <InlineMediaUpload setOpen={setOpen} className="mt10" label={__("Upload PDF", "pdfp")} types={["application/pdf"]} onChange={(file) => setAttributes({ file })} value={file} placeholder={__("Upload PDF", "pdfp")} />

            <ToggleControl
                className="mt10"
                label={__("Display Filename", "pdfp")}
                help={__("Show the filename at the top of the viewe", "pdfp")}
                id="showName"
                checked={showName}
                onChange={() => setAttributes({ showName: !showName })}
            />

            <Notice status='premium' isIcon={true}>
                {__('Unlock Adobe Embed modes, Raw PDF, navigation thumbnails, Initial Page, precise zoom, and more advanced controls—available exclusively in Premium.', 'pdfp')}
            </Notice>
        </PanelBody >
    )
}

export default Controls
