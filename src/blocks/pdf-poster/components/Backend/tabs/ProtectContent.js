import { PanelBody } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { PDFIcon } from "../../../../../icons/PDF";
import { PremiumBadge, PremiumPanel } from "../../../../../../../bpl-tools/ProControls";

const ProtectContent = () => {
    const pricingUrl = "/wp-admin/admin.php?page=pdf-poster-pricing";
    return (
        <PanelBody className="bPlPanelBody" title={<>
            <div className="pdfp-panel-icon">{PDFIcon} {__("Protect Content", "pdfp")}</div>
            <span className="pdfp-panel-pro-badge">Pro</span>
        </>} initialOpen={false}>
            <PremiumPanel 
                title={__('Content Protection', 'pdfp')} 
                description={__('Keep your work safe by disabling right-clicks, text selection, and copying. This feature is available in the Premium version.', 'pdfp')} 
                pricingUrl={pricingUrl} 
            />
        </PanelBody>
    )
}

export default ProtectContent;
