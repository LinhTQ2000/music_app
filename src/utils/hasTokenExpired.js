import { EXPIRATION_TIME, TOKEN_NAME } from "../constants/AppConstants";
export default function hasTokenExpired() {
  const current_time = new Date();
  const expiresIn = localStorage.getItem(EXPIRATION_TIME);
  const token = localStorage.getItem(TOKEN_NAME);
  const expirationTime = expiresIn ? new Date(Date.parse(expiresIn)) : false;
  if (!expirationTime || expirationTime < current_time || token === "") {
    localStorage.removeItem(EXPIRATION_TIME);
    localStorage.removeItem(TOKEN_NAME);
    return true;
  }
  return false;
}
