/**
 * Keep WordPress-generated URLs working when the page is served from another host.
 *
 * Every URL this plugin embeds is absolute and built from the site URL WordPress has
 * stored: the PDF comes out of the media library, the bundled viewer out of
 * plugin_dir_url() (localised as `pdfp.dir`). Behind a reverse proxy the visitor's
 * browser is on a different host than the one baked into those URLs, so anything that
 * compares them against location.origin reads a local PDF as a remote one, and every
 * same-origin fetch silently becomes cross-origin.
 *
 * Dropping the scheme and host fixes both at once: a root-relative path resolves
 * against whichever host the visitor is actually on, so direct and proxied access
 * behave identically and no origin ever has to be guessed. URLs that genuinely point
 * elsewhere -- a CDN, Google Drive, Dropbox -- are returned untouched, because they
 * have to stay absolute.
 *
 * Hosts are compared without their scheme on purpose: a proxy that terminates TLS in
 * front of a site whose stored URLs are still http:// is the common case, and going
 * root-relative resolves that mismatch instead of tripping over it.
 */

const resolve = (url) => {
  try {
    return new URL(url, window.location.href);
  } catch (e) {
    return null;
  }
};

// blob: and data: URLs are same-origin by construction and have nothing to strip.
const isOpaque = (url) => /^(blob:|data:)/i.test(url);

/**
 * The host WordPress builds its URLs from, read back off the localised plugin URL.
 * Falls back to the current host so a missing `pdfp` global cannot break rendering.
 */
export function getWpHost() {
  const dir = typeof pdfp !== 'undefined' ? pdfp?.dir : null;
  const resolved = dir ? resolve(dir) : null;
  return resolved ? resolved.host : window.location.host;
}

/**
 * True when `url` is served by this WordPress install, and so can be handed to the
 * bundled PDF.js viewer -- which refuses any file whose origin differs from its own
 * ("file origin does not match viewer's").
 */
export function isSiteLocalUrl(url) {
  if (typeof url !== 'string' || !url) return false;
  if (isOpaque(url)) return true;

  const target = resolve(url);
  if (!target) return false;

  return target.host === getWpHost() || target.host === window.location.host;
}

/**
 * Strip the scheme and host from a URL this site serves, leaving a root-relative path.
 * Anything hosted elsewhere is returned as-is.
 */
export default function toSiteRelativeUrl(url) {
  if (typeof url !== 'string' || !url || isOpaque(url)) return url;

  const target = resolve(url);
  if (!target || !isSiteLocalUrl(url)) return url;

  return `${target.pathname}${target.search}${target.hash}`;
}
