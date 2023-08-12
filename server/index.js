const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x4eb2e322f339db2eab9899618ee0140456068539": 100,
  "0x00de8b294f6368a0fc346488834e578a1855aadb": 50,
  "0xb73da6799c06d085dc3a109e7712634bd2e82e2b": 75,
};

const error = {
  NO_ADDRESS: "Sender/Recipient address shouldn't be empty",
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  console.log(address);
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // Todo: Get a signature from the client-side application
  // recover the public address from the signature
  const { signature, publicKey, sender, recipient, amount } = req.body;

  if (!sender || !recipient) {
    res.status(400).send({ message: error.NO_ADDRESS });
  }

  console.log("Received", { signature, publicKey });

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
