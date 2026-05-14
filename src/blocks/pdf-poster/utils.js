export const presetDelete = async (id) => {
  return await jQuery
    .ajax({
      method: "POST",
      url: pdfp?.ajax_url,
      dataType: "json",
      data: {
        action: "pdf_poster_ajax",
        nonce: pdfp?.nonce,
        model: "Presets",
        method: "delete",
        id,
      },
    })
    .then((res) => res)
    // eslint-disable-next-line no-console
    .catch((err) => console.log({ err }));
};

export const getPresets = async () => {
  return await ajaxCall("GET", { model: "Presets", method: "all" });
};

export const ajaxCall = async (method = "GET", data = {}) => {
  return await jQuery
    .ajax({
      method,
      url: pdfp?.ajax_url,
      dataType: "json",
      data: {
        action: "pdf_poster_ajax",
        nonce: pdfp?.nonce,
        ...data,
      },
    })
    .then((res) => res)
    // eslint-disable-next-line no-console
    .catch((error) => console.log({ error }));
};

export function isOldiPhoneOrIPad() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Check for iPhone or iPad
  const isIPhone = /iPhone/.test(userAgent);
  const isIPad = /iPad/.test(userAgent);

  // Check for specific devices by their characteristics
  if (isIPhone && window.devicePixelRatio === 2 && window.screen.width === 375 && window.screen.height === 667) {
    return "iPhone 6";
  }

  if (isIPad && window.devicePixelRatio === 2 && window.screen.width === 768 && window.screen.height === 1024) {
    return "iPad Air 2";
  }

  return false;
}
