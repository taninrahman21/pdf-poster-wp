// import attributes from "./attributes";
import metadata from "./block.json";
import Edit from "./components/Backend/Edit";
import "./editor.scss";

import { registerBlockType } from "@wordpress/blocks";
registerBlockType(metadata, {
  edit: Edit,
  save: () => {
    return null;
  },
  // getEditWrapperProps: ({ alignment }) => {
  //   return {
  //     "data-style": `text-align: ${alignment}`,
  //   };
  // },
});

// import { createHigherOrderComponent } from "@wordpress/compose";
// const withStyleClasses = createHigherOrderComponent((BlockListBlock) => {
//   return (props) => {
//     if (props.name !== "pdfp/pdfposter") {
//       return <BlockListBlock {...props} />;
//     }

//     const { alignment } = props.attributes;

//     return <BlockListBlock {...props} style={{ textAlign: alignment }} />;
//   };
// }, "withStyleClasses");

// wp.hooks.addFilter("editor.BlockListBlock", "slug/with-style-classes", withStyleClasses);
