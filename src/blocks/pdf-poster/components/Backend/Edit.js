import { useState, useEffect } from "react";
import { RichText, useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
// import "./../Components/style.scss";

import Viewer from "../Common/Viewer";
import PresetModal from "./PresetModal";
// import Preview from "./Preview";
import Settings from "./Settings";
import Uploader from "./Uploader";

function Edit(props) {
  const { attributes, setAttributes, clientId, isSelected } = props;
  const { alignment, file = pdfp?.placeholder, additional } = attributes;
  const blockProps = useBlockProps();

  const [modalOpen, setModalOpen] = useState(false);
  const [preset, setPreset] = useState({ preset: attributes });

  //generate new unique ID
  useEffect(() => {
    // setAttributes({ adobeOptions: { ...adobeOptions, updated: true } });
  }, []);

  useEffect(() => {
    /*! <fs_premium_only> */
    setAttributes({ isPremium: pdfp?.pipe });
    /*! </fs_premium_only> */
  }, [pdfp])

  const id = `block-${clientId}`;

  if (!file) {
    return <Uploader attributes={attributes} setAttributes={setAttributes} />;
  }

  return (
    <div {...blockProps} style={{ textAlign: alignment }}>

      <style>{additional?.CSS}</style>
      <Settings setModalOpen={setModalOpen} {...props} setPreset={setPreset} />
      <Viewer attributes={attributes} RichText={RichText} __={__} setAttributes={setAttributes} isBackend={true} id={id} />
      {/*! <fs_premium_only> */}
        {pdfp?.pipe && <>{modalOpen && <PresetModal preset={preset} setPreset={setPreset} setModalOpen={setModalOpen} {...props} id={id} />}</>}
      {/*! </fs_premium_only> */}
    </div>
  );
}

export default Edit;
