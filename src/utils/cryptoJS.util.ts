import * as CryptoJS from "crypto-js";

const iv = CryptoJS.enc.Base64.parse("");
const SECRET_KEY_256 = CryptoJS.SHA256(
  process.env.NEXT_PUBLIC_CRYPTO_KEY as string
);

export const encryptData = (data: any) => {
  const encryptedString = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_KEY_256,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  ).toString();

  const urlEncodedData = encodeURIComponent(encryptedString);
  return urlEncodedData.toString();
};

export const decryptData = (body: any) => {
  try {
    const decodedData = decodeURIComponent(body);

    let decrypted = CryptoJS.AES.decrypt(decodedData, SECRET_KEY_256, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    let dataDec = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    return dataDec;
  } catch (error: any) {
    console.log("🚀 ~ file: index.ts:32 ~ decryptData ~ error:", error.message);
  }
};
