export const decodeToken = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

export const isTokenExpired = (tokenPayload: { exp: number }): boolean => {
  const currentTime = Date.now();
  const expiryTime = tokenPayload.exp * 1000;
  return expiryTime < currentTime;
};

export const isTokenExpiredWithinOneMinute = (tokenPayload: any): boolean => {
  try {
    const issuedAt = tokenPayload.iat;
    const customExpiryTime = issuedAt + 60;
    const isExpired = customExpiryTime * 1000 < Date.now();
    return isExpired;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true;
  }
};
