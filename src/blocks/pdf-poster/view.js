// eslint-disable-next-line no-unused-vars
import { version } from 'react-dom'
import { createRoot } from "react-dom";

import Viewer from "./components/Common/Viewer";
import "./style.scss";
import "./public.scss";
// import

const init = (container = document) => {
  // Search for the block class or the data-attributes attribute or the loading placeholder
  const blocksByClass = container.querySelectorAll(".wp-block-pdfp-pdf-poster");
  const blocksByAttr = container.querySelectorAll("[data-attributes]");
  const blocksByPlaceholder = container.querySelectorAll(".pdfp_loading_placeholder");
  
  // Combine and de-duplicate
  const blockSet = new Set([...blocksByClass, ...blocksByAttr]);
  blocksByPlaceholder.forEach(p => {
      if (p.parentElement && !blockSet.has(p.parentElement)) {
          blockSet.add(p.parentElement);
      }
  });

  const blocks = Array.from(blockSet);
  
  blocks.forEach((block) => {
    if (block.hasAttribute('data-pdfp-initialized')) {
       return;
    }
    
    let attributesData = block.dataset.attributes;
    if (!attributesData) {
        // Search in children if block itself doesn't have it (unlikely but safe)
        const attrEl = block.querySelector("[data-attributes]");
        if (attrEl) attributesData = attrEl.dataset.attributes;
    }
    
    if (!attributesData) {
        return;
    }
    
    block.setAttribute('data-pdfp-initialized', 'true');

    try {
        const attributes = JSON.parse(attributesData);
        const root = createRoot(block);
        root.render(<View attributes={attributes} id={block.id} />);
    } catch (e) {
        // Silently fail or log sparingly in production
    }
  });
};

// Start initialization
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
}

document.addEventListener("DOMContentLoaded", () => {
    init();
});

// Elementor Support
const runElementor = () => {
    if (window.elementorFrontend && elementorFrontend.hooks) {
        elementorFrontend.hooks.addAction('frontend/element_ready/global', ($scope) => {
            init($scope[0]);
        });
        return true;
    }
    return false;
};

// Robust Elementor hook registration
let elementorRetryCount = 0;
const setupElementor = () => {
    if (runElementor()) return;
    
    if (elementorRetryCount < 20) { // Retry for 10 seconds
        elementorRetryCount++;
        setTimeout(setupElementor, 500);
    }
};

setupElementor();

if (typeof jQuery !== 'undefined') {
    jQuery(window).on('elementor/frontend/init', runElementor);
}

export function View({ attributes, id }) {
  const setAttributes = () => { };

  return (
    <>
      <Viewer RichText={RichText} attributes={attributes} setAttributes={setAttributes} __={__} id={id} />
    </>
  );
}

export function RichText({ tag: Tag = "p", value = "" }) {
  if (value) {
    return <Tag>{value}</Tag>;
  }
  return null;
}

// eslint-disable-next-line no-unused-vars
export function __(text, textdomain) {
  return text;
}

