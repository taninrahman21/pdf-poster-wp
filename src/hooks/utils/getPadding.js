export default function getPadding(padding) {
  if (!padding) {
    return null;
  }
  if(typeof padding === 'string' && typeof parseInt(padding) === 'number') {
    return padding;
  }
  return `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;`;
}
