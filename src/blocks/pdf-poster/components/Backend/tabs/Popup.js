import { PanelBody } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { PDFIcon } from "../../../../../icons/PDF";
import { PremiumBadge, PremiumPanel } from "../../../../../../../bpl-tools/ProControls";

const Popup = () => {
    const pricingUrl = "/wp-admin/admin.php?page=pdf-poster-pricing";
    return (
        <PanelBody className="bPlPanelBody" title={<>
            <div className="pdfp-panel-icon">{PDFIcon} {__("Popup", "pdfp")}</div>
            <PremiumBadge />
        </>} initialOpen={false}>
            <PremiumPanel 
                title={__('Click-to-Open Popups', 'pdfp')} 
                description={__('Open your PDFs in a professional, premium popup window instead of a direct embed. This feature is available in the Premium version.', 'pdfp')} 
                pricingUrl={pricingUrl} 
            />
        </PanelBody>
    )
}

export default Popup;
