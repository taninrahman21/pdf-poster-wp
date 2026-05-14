// import "./public/index";
import "./public.scss";
import { getParams } from "./utils";

document.addEventListener("DOMContentLoaded", function () {
  PDFP.protect(document.querySelectorAll(".pdfp_wrapper"));

  const quickEmbedder = document.querySelectorAll(".pdfp_quick_frame_wrapper");
  quickEmbedder.forEach((item) => {
    const iframe = item.querySelector("iframe");

    const params = getParams(iframe?.src);
    if (params.file) {
      const file = new URL(params?.file);
      const src = new URL(iframe?.src);

      if (src?.protocol !== file?.protocol) {
        iframe.src = src.href.replace(file.protocol, src.protocol);
      }
    }
  });
});

document.addEventListener("adobe_dc_view_sdk.ready", function () {
  const documents = document.querySelectorAll(".pdfp-adobe-viewer");
  documents.forEach((doc) => {
    let url = doc?.href || doc?.dataset?.href;
    const divId = doc?.dataset?.id || doc?.parentElement?.id;
    const protect = true; //doc?.dataset.protect || false;
    const option = JSON.parse(doc?.dataset?.options, "{}");
    const clientId = PDFP.scramble("decode", pdfp.adobeClientKey);
    const parentElement = doc.parentElement;
    window.parentElement = parentElement;
    window.doc = doc;
    if (divId && url) {
      if (protect) {
        url = PDFP.scramble("decode", doc?.href || doc?.dataset?.href);
      }

      const protectedOption = {
        showPrintPDF: false,
        showDownloadPDF: false,
        showAnnotationTools: false,
        embedMode: option.embedMode,
      };

      if (doc?.tagName === "BUTTON") {
        doc.addEventListener("click", () => {
          renderPDF(protect ? protectedOption : option);
        });
      } else {
        renderPDF(protect ? protectedOption : option);
      }

      function renderPDF(option) {
        var adobeDCView = new AdobeDC.View({ clientId, divId });
        adobeDCView.previewFile(
          {
            content: { location: { url } },
            metaData: { fileName: " " },
          },
          { ...option, enableLinearization: true }
        );
      }
    }
  });
});

class PDFP {
  static protect = async (wrapperr) => {
    const getDetectorData = this.getDetectorData(wrapperr);
    let edge = false;
    let objUrl = null;

    if (!getDetectorData) {
      return false;
    }
    const { wrapper, iframe, options, infos, frame } = getDetectorData;
    const fullscreenBtn = wrapper.querySelector(".pdfp_fullscreen");
    const closeBtn = wrapper.querySelector(".close");
    const iframeWrapper = wrapper.querySelector(".iframe_wrapper");

    if (fullscreenBtn?.target === "_self") {
      fullscreenBtn?.addEventListener("click", (e) => {
        if (!PDFP.isiOSDevice()) {
          e.preventDefault();
          iframeWrapper?.requestFullscreen();
        } else {
          fullscreenBtn.target = "blank";
        }
      });
    }

    closeBtn?.addEventListener("click", (e) => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    });

    if (infos?.protect) {
      wrapper.classList.add("pdfp_protected");
      let src = iframe?.dataset?.source || "";
      iframe.dataset.source = "";
      let source = src.match(/\?file=(.+)&nobaki/);
      if (!source) {
        edge = true;
        source = src.match(/https:\/\/bplugins.com\/(.+)/);
      }
      if (source) {
        source = this.scramble("decode", source[1]);
        source = source.replace(/https?:/, window.location.protocol);
        if (source.includes("dropbox.com")) {
          objUrl = source;
        } else {
          const result = await fetch(source);
          const blob = await result.blob();
          objUrl = URL.createObjectURL(blob);
        }
        if (!edge) {
          source = src.replace(/\?file=(.+)&nobaki/, `?file=${objUrl}&nobaki`);
        } else {
          source = objUrl;
        }
        iframe.src = source;

        function detectDevTool(allow) {
          if (isNaN(+allow)) allow = 100;
          var start = +new Date(); // Validation of built-in Object tamper prevention.
          debugger;
          var end = +new Date(); // Validates too.
          if (isNaN(start) || isNaN(end) || end - start > allow) {
            URL.revokeObjectURL(objUrl);
            alert("please close devtool");
            iframe.src = "";
          }
        }

        if (window.attachEvent) {
          if (
            document.readyState === "complete" ||
            document.readyState === "interactive"
          ) {
            detectDevTool();
            window.attachEvent("onresize", detectDevTool);
            window.attachEvent("onmousemove", detectDevTool);
            window.attachEvent("onfocus", detectDevTool);
            window.attachEvent("onblur", detectDevTool);
          } else {
            // setTimeout(argument.callee, 0); // argument is not defined in modules
          }
        } else {
          window.addEventListener("load", detectDevTool);
          window.addEventListener("resize", detectDevTool);
          window.addEventListener("mousemove", detectDevTool);
          window.addEventListener("focus", detectDevTool);
          window.addEventListener("blur", detectDevTool);
        }

        const attachProtection = () => {
          try {
            if (iframe && iframe.contentWindow && iframe.contentWindow.document) {
               if (infos?.alert) {
                iframe.contentWindow.document.oncontextmenu = function (e) {
                  alert("Right Click Disabled");
                  e.preventDefault();
                };
              } else {
                iframe.contentWindow.document.oncontextmenu = function (e) {
                  e.preventDefault();
                };
              }
            }
          } catch (e) {
             // cross origin
          }
        };

        if (iframe) {
          iframe.addEventListener("load", attachProtection);
          attachProtection();
        }
      }

      // disable context menu

      // disable ctrl, alt, shift, f12

      if (infos?.alert) {
        document.oncontextmenu = function (e) {
          alert("Right Click Disabled");
          e.preventDefault();
        };
      } else {
        document.oncontextmenu = function (e) {
          e.preventDefault();
        };
      }
      // if (wrapper.querySelector(".pdfp_fullscreen")) wrapper.querySelector(".pdfp_fullscreen").href = source;
      // if (wrapper.querySelector(".pdfp_download")) wrapper.querySelector(".pdfp_download").href = source;
    } else {
      const params = getParams(iframe?.src);
      const file = new URL(params?.file);
      const src = new URL(iframe?.src);
      const fullscreenBtn = wrapper.querySelector(".pdfp_fullscreen");
      if (src?.protocol !== file?.protocol) {
        iframe.src = src.href.replace(file.protocol, src.protocol);
        if (fullscreenBtn) {
          fullscreenBtn.href = src.href.replace(file.protocol, src.protocol);
        }
      }
      iframe?.removeAttribute("data-source");
    }
  };

  static getDetectorData = (wrapper, options = false, infos = false) => {
    let iframe = null;
    let frame = null;

    // get the exact wrapper
    if (wrapper === null) {
      return false;
    }

    if (typeof wrapper[0] !== "undefined") {
      wrapper.forEach((item) => {
        PDFP.protect(item);
      });
      return false;
    }

    if (typeof wrapper.length !== "undefined" && wrapper.length === 0) {
      return false;
    }

    if (wrapper.querySelector(".pdfp_wrapper") !== null) {
      wrapper = wrapper.querySelector(".pdfp_wrapper");
    }

    //get data from attribute if it not pass in function
    if (!options && wrapper?.dataset?.options != undefined) {
      options = JSON.parse(wrapper?.dataset?.options || "{}");
    }
    if (!infos && wrapper?.dataset?.infos != undefined) {
      infos = JSON.parse(wrapper?.dataset?.infos || "{}");
      wrapper.removeAttribute("data-infos");
    }

    iframe = wrapper.querySelector("iframe");
    frame = wrapper.querySelector("iframe").getAttribute("id");

    return {
      wrapper,
      iframe,
      options,
      infos,
      frame,
    };
  };

  static scramble(task = "encode", data = "") {
    const originalKey = "abcdefghijklmnopqrstuvwxyz1234567890";
    const key = "z1ntg4ihmwj5cr09byx8spl7ak6vo2q3eduf";
    let resultData = "";
    if (task == "encode") {
      if (data != "") {
        const length = data.length;
        for (let i = 0; i < length; i++) {
          const position = originalKey.indexOf(data[i]);
          if (position !== -1) {
            resultData += key[position];
          } else {
            resultData += data[i];
          }
        }
      }
    }

    if (task == "decode") {
      if (data != "") {
        const length = data.length;
        for (let i = 0; i < length; i++) {
          const currentChar = data[i];
          const position = key.indexOf(currentChar);
          if (position !== -1) {
            resultData += originalKey[position];
          } else {
            resultData += currentChar;
          }
        }
      }
    }
    return resultData;
  }

  static isiOSDevice() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
}
