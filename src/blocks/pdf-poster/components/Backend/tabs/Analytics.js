import { PanelBody } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { PDFIcon } from "../../../../../icons/PDF";
import { PremiumPanel } from "../../../../../../../bpl-tools/ProControls";
import { PRICING_URL } from "../../../utils";

// Views and downloads are counted by PDF Poster Pro. The panel is still listed here --
// in the same slot the Pro build puts it -- so the feature keeps selling from inside the
// editor rather than being invisible in the free build.
//
// The two tiles are the Pro readout with its numbers withheld: an em dash rather than a
// zero, which would claim the document has been measured and ignored. Showing the shape
// of the thing says more about a counter than a paragraph does.

const Analytics = () => {
    return (
        <PanelBody className="bPlPanelBody" title={<>
            <div className="pdfp-panel-icon">{PDFIcon} {__("Analytics", "pdfp")}</div>
            <span className="pdfp-panel-pro-badge">Pro</span>
        </>} initialOpen={false}>
            <PremiumPanel
                title={__('Views & Downloads', 'pdfp')}
                description={__('Count every view and download in the visitor’s browser, so the numbers keep working behind a page cache — with sortable columns on your PDF Posters list and a 7, 30 or 90 day report. No IP address is stored. This feature is available in the Premium version.', 'pdfp')}
                pricingUrl={PRICING_URL}
            >
                <div className="pdfp-analytics-grid pdfp-analytics-locked">
                    <div className="pdfp-analytics-stat">
                        <span className="pdfp-analytics-label">{__("Views", "pdfp")}</span>
                        <span className="pdfp-analytics-value" aria-hidden="true">&mdash;</span>
                    </div>
                    <div className="pdfp-analytics-stat">
                        <span className="pdfp-analytics-label">{__("Downloads", "pdfp")}</span>
                        <span className="pdfp-analytics-value" aria-hidden="true">&mdash;</span>
                    </div>
                </div>
            </PremiumPanel>
        </PanelBody>
    )
}

export default Analytics;
