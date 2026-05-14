import attributes from "./attributes";
import Edit from "./Edit";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
// import Edit from "./Edit";
registerBlockType("meta-box/document-embedder", {
  title: __("PDF Poster Selector", "pdfp"),
  icon: "pdf",
  category: "design",
  keywords: [__("PDF Poster", "pdfp"), __("PDF Viewer", "pdfp")],
  supports: {
    // align: ["wide", "full"],
    html: false,
  },
  attributes,
  getEditWrapperProps: () => {},
  edit: Edit,
  save: () => {
    return null;
  },
  example: {
    attributes: true,
  },
});
