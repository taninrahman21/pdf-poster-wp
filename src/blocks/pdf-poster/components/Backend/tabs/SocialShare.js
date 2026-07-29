import { PanelBody, SelectControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { PDFIcon } from "../../../../../icons/PDF";

const SocialShare = ({ attributes, setAttributes }) => {
    const { socialShare } = attributes;
    const { enabled, position, facebook, twitter, linkedin, pinterest, mailto } = socialShare || {};

    return (
        <PanelBody className="bPlPanelBody" title={<div className="pdfp-panel-icon">{PDFIcon} {__("Social Share", "pdfp")}</div>} initialOpen={false}>
            <ToggleControl
                label={__("Enable Sharing", "pdfp")}
                checked={enabled}
                onChange={() => setAttributes({ socialShare: { ...socialShare, enabled: !enabled } })}
                help={__("Enable social sharing buttons for the PDF.", "pdfp")}
            />

            {enabled && (
                <>
                    <SelectControl options={[
                        { label: __("Top", "pdfp"), value: "top" },
                        { label: __("Bottom", "pdfp"), value: "bottom" },
                    ]}
                        label={__("Share Position", "pdfp")}
                        value={position}
                        onChange={(position) => setAttributes({ socialShare: { ...socialShare, position } })}
                        className="mt20 pt10"
                        help={__("Select where the sharing buttons should appear.", "pdfp")}
                    />

                    <div className="pdfp-panel-divider mb10 mt10"> {__("Social Media Platforms", "pdfp")}</div>

                    <ToggleControl
                        className="mt10"
                        label={__("Enable Facebook", "pdfp")}
                        checked={facebook}
                        onChange={() => setAttributes({ socialShare: { ...socialShare, facebook: !facebook } })}
                        help={__("Allow sharing on Facebook.", "pdfp")}
                    />

                    <ToggleControl
                        className="mt10"
                        label={__("Enable Twitter", "pdfp")}
                        checked={twitter}
                        onChange={() => setAttributes({ socialShare: { ...socialShare, twitter: !twitter } })}
                        help={__("Allow sharing on Twitter.", "pdfp")}
                    />
                    <ToggleControl
                        className="mt10"
                        label={__("Enable LinkedIn", "pdfp")}
                        checked={linkedin}
                        onChange={() => setAttributes({ socialShare: { ...socialShare, linkedin: !linkedin } })}
                        help={__("Allow sharing on LinkedIn.", "pdfp")}
                    />
                    <ToggleControl
                        className="mt10"
                        label={__("Enable Pinterest", "pdfp")}
                        checked={pinterest}
                        onChange={() => setAttributes({ socialShare: { ...socialShare, pinterest: !pinterest } })}
                        help={__("Allow sharing on Pinterest.", "pdfp")}
                    />
                    <ToggleControl
                        className="mt10"
                        label={__("Enable Email", "pdfp")}
                        checked={mailto}
                        onChange={() => setAttributes({ socialShare: { ...socialShare, mailto: !mailto } })}
                        help={__("Allow sharing via Email.", "pdfp")}
                    />
                </>
            )}

        </PanelBody>
    );
};

export default SocialShare;
