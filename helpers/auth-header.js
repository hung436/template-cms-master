const CryptoJS = require("crypto-js");
const  AES = require("crypto-js/aes");
export const enScript = (string) =>{
// return AES.encrypt(string.toString(),process.env.KEY_ENCODE_USER);
const password = `${process.env.KEY_ENCODE_USER}`;
const encrypted =  CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(string), password);
return encrypted
};
export const deScript = (string) =>{
  const password = `${process.env.KEY_ENCODE_USER}`;
  // return AES.decrypt(string, process.env.KEY_ENCODE_USER).toString(CryptoJS.enc.Utf8);
  return CryptoJS.AES.decrypt(string, password).toString(CryptoJS.enc.Utf8);
};
