import { PanelBody, PanelRow } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { PDFIcon } from "../../../../../icons/PDF";
import { PremiumBadge } from "../../../../../../../bpl-tools/ProControls";
import ComingSoonCard from "../ComingSoonCard";

const Analytics = () => {
    return (
        <PanelBody className="bPlPanelBody" title={<>
            <div className="pdfp-panel-icon">{PDFIcon} {__("Analytics", "pdfp")}</div>
            <PremiumBadge label="Upcoming" />
        </>} initialOpen={false}>
            <ComingSoonCard
                title={__("Analytics Feature is Coming Soon", "pdfp")} 
                description={__("The Analytics feature is coming soon in PDF Poster Pro.", "pdfp")} 
            />
        </PanelBody>
    )
}

export default Analytics;
