export default function alertOnContext(enabled, iframe) {
  if (!enabled) {
    document.oncontextmenu = function (e) {
      e.preventDefault();
    };
    if (iframe) {
      iframe.contentWindow.document.oncontextmenu = function (e) {
        e.preventDefault();
      };
    }
  } else {
    document.addEventListener("keydown", (e) => {
      if (((e.ctrlKey || e.metaKey) && e.key === "s") || e.key === "F12") {
        e.preventDefault();
        e.stopPropagation();
        alert("Saving is disabled on this page");
        return false;
      } else {
        return true;
      }
    });

    const attachProtection = () => {
      try {
        if (iframe && iframe.contentWindow && iframe.contentWindow.document) {
          iframe.contentWindow.document.oncontextmenu = function (e) {
            alert("Right Click Disabled");
            e.preventDefault();
          };
        }
      } catch (e) {
        console.warn("Could not attach protection to iframe (Cross-origin or not loaded yet)");
      }
    };

    if (iframe) {
      iframe.addEventListener("load", attachProtection);
      // Also try immediately in case it's already loaded
      attachProtection();
    }
    document.oncontextmenu = function (e) {
      alert("Right Click Disabled");
      e.preventDefault();
    };
  }
}
