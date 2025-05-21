import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY || "";
const IV_LENGTH = 16;

const getKey = () =>
  CryptoJS.enc.Utf8.parse(SECRET_KEY.padEnd(32, "0").slice(0, 32));

export const encrypt = (text) => {
  const stringData = typeof text === "string" ? text : JSON.stringify(text);
  const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);
  const key = getKey();
  const encrypted = CryptoJS.AES.encrypt(stringData, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const ivHex = iv.toString(CryptoJS.enc.Hex);
  const encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  return `${ivHex}:${encryptedHex}`;
};

export const decrypt = (encryptedText) => {
  const key = getKey();
  const [ivHex, encryptedHex] = encryptedText.split(":");
  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const encrypted = CryptoJS.enc.Hex.parse(encryptedHex);
  const decrepted = CryptoJS.AES.decrypt({ ciphertext: encrypted }, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decreptedText = decrepted.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decreptedText);
};
