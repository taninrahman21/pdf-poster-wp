import { PanelBody, SelectControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { PDFIcon } from "../../../../../icons/PDF";
import { PremiumBadge, PremiumPanel } from "../../../../../../../bpl-tools/ProControls";

const Viewers = () => {
    const pricingUrl = "/wp-admin/admin.php?page=pdf-poster-pricing";
    return (
        <PanelBody className="bPlPanelBody" title={<>
            <div className="pdfp-panel-icon">{PDFIcon} {__("Viewers", "pdfp")}</div>
            <PremiumBadge />
        </>} initialOpen={false}>
            <PremiumPanel title={__('Premium Viewer Settings', 'pdfp')} description={__('Display your PDFs in a professional Adobe Viewer or 3D FlipBook Viewer. This feature is available in the Premium version.', 'pdfp')} pricingUrl={pricingUrl} />
        </PanelBody>
    )
}


export default Viewers
