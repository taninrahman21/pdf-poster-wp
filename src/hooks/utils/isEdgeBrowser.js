export default function isEdgeBrowser() {
  const userAgent = window.navigator.userAgent;

  // Microsoft Edge can be identified by the "Edg" substring in the user agent
  return userAgent.includes("Edg");
}
