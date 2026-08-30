import { PanelBody } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { PDFIcon } from "../../../../../icons/PDF";
import { PremiumPanel } from "../../../../../../../bpl-tools/ProControls";
import { PRICING_URL } from "../../../utils";

const Additional = () => {
    return (
        <PanelBody className="bPlPanelBody" title={<>
            <div className="pdfp-panel-icon">{PDFIcon} {__("Additional", "pdfp")}</div>
            <span className="pdfp-panel-pro-badge">Pro</span>
        </>} initialOpen={false}>
            <PremiumPanel title={__('Premium Additional Settings', 'pdfp')} description={__('Custom CSS and Class settings are available in the Premium version.', 'pdfp')} pricingUrl={PRICING_URL} />
        </PanelBody>
    )
}

export default Additional
