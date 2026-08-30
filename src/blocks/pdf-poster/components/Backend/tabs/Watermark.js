import { PanelBody } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { PDFIcon } from "../../../../../icons/PDF";
import { PremiumPanel } from "../../../../../../../bpl-tools/ProControls";
import { PRICING_URL } from "../../../utils";

// Watermark & Branding is Premium-only. The panel is still listed here -- in the same
// slot the Pro build puts it -- so the feature keeps selling from inside the editor
// rather than being invisible in the free build.

const Watermark = () => {
    return (
        <PanelBody className="bPlPanelBody" title={<>
            <div className="pdfp-panel-icon">{PDFIcon} {__("Watermark & Branding", "pdfp")}</div>
            <span className="pdfp-panel-pro-badge">Pro</span>
        </>} initialOpen={false}>
            <PremiumPanel
                title={__('Watermark & Branding', 'pdfp')}
                description={__('Stamp a text or logo mark over every page — ready-made themes, coverage and strength control, dynamic placeholders, per-page and per-audience targeting, plus anti-leak tamper restore. This feature is available in the Premium version.', 'pdfp')}
                pricingUrl={PRICING_URL}
            />
        </PanelBody>
    )
}

export default Watermark;
