import { PanelBody, PanelRow } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { PDFIcon } from "../../../../../icons/PDF";
import { PremiumBadge } from "../../../../../../../bpl-tools/ProControls";

import ComingSoonCard from "../ComingSoonCard";

const Ads = () => {
    return (
        <PanelBody className="bPlPanelBody" title={<>
            <div className="pdfp-panel-icon">{PDFIcon} {__("Ads", "pdfp")}</div>
            <PremiumBadge label="Upcoming" />
        </>} initialOpen={false}>
            <ComingSoonCard 
                title={__("Ads Feature is Coming Soon", "pdfp")} 
                description={__("Get ready to monetize your PDF content with targeted advertisements. This feature will be available soon in PDF Poster Pro.", "pdfp")} 
            />
        </PanelBody>
    )
}

export default Ads;
