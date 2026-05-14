import { Fragment } from "react";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { Button, PanelRow, TextControl } from "@wordpress/components";
function BMediaUpload({ value, type = [], onSelect }) {
  return (
    <div className="bMediaUpload">
      <Fragment>
        <MediaUploadCheck>
          <MediaUpload allowedTypes={type} onSelect={(image) => onSelect(image.url)} render={({ open }) => <Button className="button button-primary" onClick={open} icon={"upload"}></Button>} />
        </MediaUploadCheck>
        <PanelRow className="width-100">
          <TextControl id="picker_field" value={value} onChange={(fileUrl) => onSelect(fileUrl)} />
        </PanelRow>
      </Fragment>
    </div>
  );
}

export default BMediaUpload;
