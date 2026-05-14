import { Panel, PanelBody, SelectControl, ToolbarButton, ToolbarGroup } from "@wordpress/components";
import { BlockControls, InspectorControls } from "@wordpress/block-editor";

const Settings = ({ attributes, setAttributes, options }) => {
  const { data } = attributes;


  return (
    <InspectorControls style={{ marginBottom: "40px" }}>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton icon={'edit'} label="Bold" onClick={() => setAttributes({ shadowAttributes: null, data: { tringle_text: null } })} />
        </ToolbarGroup>
      </BlockControls>
      <Panel>
        <PanelBody className="bPlPanelBody">
          <SelectControl label="PDF Poster" value={data?.tringle_text} options={options} onChange={(id) => setAttributes({ data: { tringle_text: id } })} />
        </PanelBody>
      </Panel>
    </InspectorControls>
  );
};

export default Settings
// export default compose([
//   withSelect((select) => {
//     const docs = select("core").getEntityRecords("postType", "pdfposter", { per_page: 100 });
//     return {
//       docs,
//     };
//   }),
// ])(Settings);
