export default function matchProtocol(source) {
  if (typeof source !== 'string') return source;
  return source.replace(/https?:/, window.location.protocol);
}
