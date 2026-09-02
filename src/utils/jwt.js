import jwt from "jwt-simple";

const getStorageSecret = () =>
  process.env.SECRET_KEY ?? process.env.NEXT_PUBLIC_STORAGE_KEY ?? null;

export const encodeData = (data) => {
  const secret = getStorageSecret();
  if (!secret) {
    return JSON.stringify(data);
  }
  return jwt.encode(data, secret);
};

export const decodeData = (encryptedData) => {
  const secret = getStorageSecret();
  if (!secret) {
    return JSON.parse(encryptedData);
  }
  return jwt.decode(encryptedData, secret);
};
