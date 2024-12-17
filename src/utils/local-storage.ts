import * as CryptoJS from "crypto-js";
const keyCrypto = "e4f38dfdb6046b5540d91ba8560546a5";

export const _setStorage = (key: string, body: any) => {
  const setType = JSON.stringify(body);
  const ciphertext = CryptoJS.AES.encrypt(setType, keyCrypto).toString();
  localStorage.setItem(key, ciphertext);
};

export const _getStorage = (key: string) => {
  const boby = localStorage.getItem(key);
  try {
    if (boby) {
      var bytes = CryptoJS.AES.decrypt(boby, keyCrypto);
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(originalText);
    }
  } catch (error) {
    console.log(error);
    return boby;
  }
};

export const _deleteStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const _deleteAllStorage = () => {
  localStorage.clear();
};
