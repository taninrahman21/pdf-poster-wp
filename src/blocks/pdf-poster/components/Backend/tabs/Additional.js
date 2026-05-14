import { PanelBody } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { PDFIcon } from "../../../../../icons/PDF";
import { PremiumBadge, PremiumPanel } from "../../../../../../../bpl-tools/ProControls";

const Additional = () => {
    const pricingUrl = "/wp-admin/admin.php?page=pdf-poster-pricing";
    return (
        <PanelBody className="bPlPanelBody" title={<>
            <div className="pdfp-panel-icon">{PDFIcon} {__("Additional", "pdfp")}</div>
            <PremiumBadge />
        </>} initialOpen={false}>
            <PremiumPanel title={__('Premium Additional Settings', 'pdfp')} description={__('Custom CSS and Class settings are available in the Premium version.', 'pdfp')} pricingUrl={pricingUrl} />
        </PanelBody>
    )
}

export default Additional
