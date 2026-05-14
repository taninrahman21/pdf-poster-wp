export default async function getBlobUrl(source) {
  const result = await fetch(source);
  const blob = await result.blob();
  return URL.createObjectURL(blob);
}
