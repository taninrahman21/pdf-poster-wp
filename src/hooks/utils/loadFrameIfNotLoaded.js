export function loadFrameIfNotLoaded(doc = null) {
  if (!doc) {
    const frames = document.querySelectorAll(".pdfp_unsupported_frame");
    frames.forEach((iframe) => {
      loadFrameIfNotLoaded(iframe);
    });
  } else {
    if (doc && doc.contentDocument !== null) {
      const source = doc.src;
      doc.src = source;
      setTimeout(() => {
        loadFrameIfNotLoaded(doc);
      }, 1200);
    }
  }
}
