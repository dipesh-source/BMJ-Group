export const isTokenExpired = (token: any) => {
  if (!token) {
    return null;
  }
  const parts = token.split(".");
  if (parts.length !== 3) {
    return false;
  }

  // Decode the payload
  const payloadBase64Url = parts[1];
  const payload = JSON.parse(decodeBase64Url(payloadBase64Url));

  const currentTime = Math.floor(Date.now() / 1000);
  // Compare the expiration time with the current time
  return payload.exp < currentTime;
};

function decodeBase64Url(base64Url: any) {
  // Replace URL-safe characters with base64 characters
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  // Pad with '=' if necessary to make it a multiple of 4
  while (base64.length % 4) {
    base64 += "=";
  }

  // Decode the base64 string
  return atob(base64);
}
export const getBase64XeroClients = () => {
  const clientAuth = `${process.env.NEXT_PUBLIC_XERO_CLIENT_ID}:${process.env.NEXT_PUBLIC_XERO_CLIENT_SECRET}`;
  console.log("clientAuth :>> ", clientAuth);
  return `Basic ${btoa(clientAuth)}`;
};
export const getXeroLoginULR = () => {
  const xeroLoginURL = `https://login.xero.com/identity/connect/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_XERO_CLIENT_ID}&redirect_uri=https://bmjgrouplimited.com/&scope=offline_access accounting.transactions accounting.settings accounting.contacts&state=123`;

  return xeroLoginURL;
};
