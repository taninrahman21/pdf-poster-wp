import "./admin.scss";

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
