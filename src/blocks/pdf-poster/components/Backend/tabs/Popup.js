import { PanelBody } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { PDFIcon } from "../../../../../icons/PDF";
import { PremiumPanel } from "../../../../../../../bpl-tools/ProControls";
import { PRICING_URL } from "../../../utils";

const Popup = () => {
    return (
        <PanelBody className="bPlPanelBody" title={<>
            <div className="pdfp-panel-icon">{PDFIcon} {__("Popup", "pdfp")}</div>
            <span className="pdfp-panel-pro-badge">Pro</span>
        </>} initialOpen={false}>
            <PremiumPanel 
                title={__('Click-to-Open Popups', 'pdfp')} 
                description={__('Open your PDFs in a professional, premium popup window instead of a direct embed. This feature is available in the Premium version.', 'pdfp')} 
                pricingUrl={PRICING_URL} 
            />
        </PanelBody>
    )
}

export default Popup;
