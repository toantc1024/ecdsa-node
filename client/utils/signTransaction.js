import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

export const getAddress = (pub) => {
  const hashed = keccak256(pub.slice(1));
  return `0x${toHex(hashed.slice(hashed.length - 20))}`;
};
