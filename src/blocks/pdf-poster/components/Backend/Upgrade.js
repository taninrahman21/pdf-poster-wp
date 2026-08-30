import { Button, PanelBody, PanelRow, Flex, FlexItem } from "@wordpress/components";
import { PRICING_URL } from "../../utils";

const Upgrade = () => {
    return (
        <PanelBody>
            <Flex flex>
                <FlexItem className="pdfp-upgrade-panel">
                    <h2>Upgrade to Pro</h2>
                    <p>Upgrade to PDF Poster Pro to unlock all the features of PDF Poster.</p>
                    <a className="button button-primary" href={PRICING_URL} style={{ background: '#e47b00' }} target="_blank" rel="noopener noreferrer">Upgrade to Pro</a>
                </FlexItem>
            </Flex>
        </PanelBody>
    );
};

export default Upgrade;