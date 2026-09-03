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

      const field = this;
      const text = $(field).data("value");

      // The field now displays the shortcode itself, so unlike the old version this must
      // not overwrite its value -- it selects what is already there. The async clipboard
      // API is preferred; execCommand is the fallback for http origins and older browsers,
      // and it needs a real selection to work at all.
      const done = () => $(field).parent().find(".htooltip").text("Copied");

      field.select();
      field.setSelectionRange(0, String(text).length);

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, () => {
          document.execCommand("copy");
          done();
        });
        return;
      }

      document.execCommand("copy");
      done();
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
  // Delegated, so it also covers rows drawn after load (quick edit, AJAX paging).
  $(document).on("mouseleave", ".pdfp_front_shortcode", function () {
    $(this).find(".htooltip").text("Copy to clipboard");
  });
  // $(".pdfp_front_shortcode input").on("click", function (e) {});
})(jQuery);
