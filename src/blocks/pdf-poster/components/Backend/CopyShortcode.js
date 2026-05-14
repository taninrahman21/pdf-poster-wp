import { select } from "@wordpress/data";
import { PanelBody, PanelRow, Flex, ClipboardButton } from "@wordpress/components";
import { useState } from "react";

const CopyShortcode = () => {
    const [hasCopied, setHasCopied] = useState(false);
    const postType = select("core/editor").getCurrentPostType();
    const { getCurrentPostId } = select("core/editor");
    const postId = getCurrentPostId();
    return (
        postType === "pdfposter" && (
            <PanelBody className="bPlPanelBody">
                <PanelRow>
                    <Flex justify="center">
                        <ClipboardButton
                            variant="primary"
                            text={`[pdf id=${postId}]`}
                            onCopy={() => setHasCopied(true)}
                            onFinishCopy={() => setHasCopied(false)}
                        >
                            {hasCopied ? 'Copied!' : 'Copy Shortcode'}
                        </ClipboardButton>
                    </Flex>
                </PanelRow>
            </PanelBody>
        )
    );
};

export default CopyShortcode;
