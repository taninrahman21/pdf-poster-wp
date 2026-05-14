import { PanelBody, SelectControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { PDFIcon } from "../../../../../icons/PDF";

const SocialShare = ({ attributes, setAttributes }) => {
    const { socialShare } = attributes;
    const { enabled, position, facebook, twitter, linkedin, pinterest } = socialShare || {};

    return (
        <PanelBody className="bPlPanelBody" title={<div className="pdfp-panel-icon">{PDFIcon} {__("Social Share", "pdfp")}</div>} initialOpen={false}>
            <ToggleControl
                label={__("Enable Social Share", "pdfp")}
                checked={enabled}
                onChange={() => setAttributes({ socialShare: { ...socialShare, enabled: !enabled } })}
                help={__("Enable to show social media icons for sharing the PDF.", "pdfp")}
            />

            {enabled && (
                <>
                    <SelectControl options={[
                        { label: __("Top", "pdfp"), value: "top" },
                        { label: __("Bottom", "pdfp"), value: "bottom" },
                    ]}
                        label={__("Position", "pdfp")}
                        value={position}
                        onChange={(position) => setAttributes({ socialShare: { ...socialShare, position } })}
                        className="mt20 pt10"
                        help={__("Select position of social media icons", "pdfp")}
                    />

                    <div className="pdfp-panel-divider mb10 mt10"> {__("Social Media Platforms", "pdfp")}</div>

                    <ToggleControl
                        className="mt10"
                        label={__("Facebook", "pdfp")}
                        checked={facebook}
                        onChange={() => setAttributes({ socialShare: { ...socialShare, facebook: !facebook } })}
                    />

                    <ToggleControl
                        className="mt10"
                        label={__("Twitter", "pdfp")}
                        checked={twitter}
                        onChange={() => setAttributes({ socialShare: { ...socialShare, twitter: !twitter } })}
                    />
                    <ToggleControl
                        className="mt10"
                        label={__("LinkedIn", "pdfp")}
                        checked={linkedin}
                        onChange={() => setAttributes({ socialShare: { ...socialShare, linkedin: !linkedin } })}
                    />
                    <ToggleControl
                        className="mt10"
                        label={__("Pinterest", "pdfp")}
                        checked={pinterest}
                        onChange={() => setAttributes({ socialShare: { ...socialShare, pinterest: !pinterest } })}
                    />
                </>
            )}

        </PanelBody>
    );
};

export default SocialShare;