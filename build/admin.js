/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin.scss"
/*!************************!*\
  !*** ./src/admin.scss ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/admin.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _admin_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin.scss */ "./src/admin.scss");


// Google Drive picker removed

(function ($) {
  $(document).ready(function () {
    //import data
    // $(document).on("click", ".fpdf_import_data", function (e) {
    //   e.preventDefault();
    //   $.ajax({
    //     url: fpdfAdmin.ajaxUrl,
    //     data: {
    //       action: "fpdf_import_data",
    //     },
    //     success: (data) => {
    //       const result = JSON.parse(data);
    //       if (result.success === true) {
    //         location.href = location.href + "?pdfp-import=success";
    //       }
    //     },
    //   });
    // });

    // set cookie
    $(".fpdf_import_notice").on("click", function () {
      setCookie("fpdf_import_notice", "1", 17280000);
    });

    // set cookie function
    function setCookie(cookieName, cookieValue, expiryInSeconds) {
      var expiry = new Date();
      expiry.setTime(expiry.getTime() + 1000 * expiryInSeconds);
      document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expiry.toGMTString() + ";path=/";
    }

    // copy shortcode

    $(document).on("click", ".pdfp_front_shortcode input", function (e) {
      e.preventDefault();
      let shortcode = $(this).parent().find("input")[0];
      shortcode.value = $(this).data("value");
      shortcode.select();
      shortcode.setSelectionRange(0, 30);
      document.execCommand("copy");
      shortcode.value = 'Copy Shortcode';
      $(this).parent().find(".htooltip").text("Copied Successfully!");
    });
    $(document).on("click", ".pdfp_shortcode_copy_btn", function (e) {
      e.preventDefault();
      const text = $(this).data("clipboard-text");
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
      } else {
        const tempInput = document.createElement("input");
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }
      if ($(this).data('type') === 'icon') {
        $(this).css("width", "18px");
        setTimeout(() => {
          $(this).css("width", "22px");
        }, 200);
      } else {
        $(this).text("Copied!");
        setTimeout(() => {
          $(this).text(text);
        }, 2000);
      }
    });

    // Copy Quick Embed Shortcode
    $(document).on("click", ".pdfp-copy-shortcode", function (e) {
      e.preventDefault();
      const $btn = $(this);
      const text = $btn.data("shortcode");
      const $textSpan = $btn.find(".copy-text");
      const originalText = $textSpan.text();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          $btn.addClass("copied");
          $textSpan.text("Copied!");
          setTimeout(() => {
            $btn.removeClass("copied");
            $textSpan.text(originalText);
          }, 2000);
        });
      } else {
        const tempInput = document.createElement("input");
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        $btn.addClass("copied");
        $textSpan.text("Copied!");
        setTimeout(() => {
          $btn.removeClass("copied");
          $textSpan.text(originalText);
        }, 2000);
      }
    });
  });
  $(".pdfp_front_shortcode input").on("mouseout", function () {
    $(this).parent().find(".htooltip").text("Copy To Clipboard");
  });
  // $(".pdfp_front_shortcode input").on("click", function (e) {});
})(jQuery);
})();

/******/ })()
;
//# sourceMappingURL=admin.js.map