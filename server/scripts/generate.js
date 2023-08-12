const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const privateKey = secp256k1.utils.randomPrivateKey();

const publicKey = secp256k1.getPublicKey(privateKey);

const hashed = keccak256(publicKey.slice(1));
const address = hashed.slice(hashed.length - 20);

console.log({
  publicKey: toHex(publicKey),
  privateKey: toHex(privateKey),
  address: `0x${toHex(address)}`,
});

[
  {
    publicKey:
      "03b11bc883cc4b7f275b18b17173dfb917dfe6e4f41b284061a6364253d2b94b04",
    privateKey:
      "a92dfb458bfb1b8d0624e0a3348cdc6e71938d06a2923af86200f4a650aaa7a1",
    address: "0x4eb2e322f339db2eab9899618ee0140456068539",
  },
  ,
  {
    publicKey:
      "02a297cb220f0a0fa95c769271d0e347ab3821f8b3e05cc6a1426b8fae49b30413",
    privateKey:
      "7fdf684de73fbb866eff3344f133c403a143bbd806ac0d757807289cb2ed2cc0",
    address: "0x00de8b294f6368a0fc346488834e578a1855aadb",
  },
  {
    publicKey:
      "02c12c6da2472433663066517df6893454a342e38deef1b59a7e71b49a07e7646e",
    privateKey:
      "8d429e77b251ef9ee845dd6fa232878f71a9736a810d1bd19253daca8380ef5e",
    address: "0xb73da6799c06d085dc3a109e7712634bd2e82e2b",
  },
];
