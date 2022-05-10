export function payloadDecode() {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) return null;

  const base64url = jwt.split(".");
  if (!base64url[1]) return null;

  const base64 = base64url[1].replace("-", "+").replace("_", "/");

  return JSON.parse(window.atob(base64));
}

export default payloadDecode;
