import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { getAddress } from "../utils/signTransaction";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) {
  async function onChange(evt) {
    try {
      const privateKey = evt.target.value;
      setPrivateKey(privateKey);

      let publicKey = secp256k1.getPublicKey(privateKey);
      const address = getAddress(publicKey);

      setAddress(address);

      if (address) {
        const {
          data: { balance },
        } = await server.get(`balance/${address}`);
        setBalance(balance);
      } else {
        setBalance(0);
      }
    } catch (error) {
      setAddress("");
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private key
        <input
          placeholder="Type your private key"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>

      {address && <div>Address: {address.slice(0, 10)}...</div>}

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
