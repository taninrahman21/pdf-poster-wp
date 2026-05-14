export default function isIPad() {
  return /iPad|Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1;
}
