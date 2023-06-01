require("dotenv").config();

const {
    Keypair,
    clusterApiUrl,
    PublicKey,
    Connection,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
} = require("@solana/web3.js");

const path = require("path");

const PROGRAM_KEYPAIR_PATH = path.join(
    path.resolve(__dirname, "../program/target/deploy/"),
    "program-keypair.json"
);

console.log(PROGRAM_KEYPAIR_PATH);

let SECREAT_KEY = JSON.parse(process.env.SECREAT_KEY ?? "");
let secretKey = Uint8Array.from(SECREAT_KEY);
let keypair = Keypair.fromSecretKey(secretKey);
console.log(keypair.publicKey, "Sender");

const connection = new Connection(clusterApiUrl("devnet"));
const public_key = new PublicKey(
    "B2Agq67zqzsC6DsXHmwpERFFKBEqWGCBzncZzNaZXbhx"
);

let transaction = new Transaction();

let sendSolInstruction = SystemProgram.transfer({
    fromPubkey: keypair.publicKey,
    toPubkey: public_key,
    lamports: 0.05 * LAMPORTS_PER_SOL,
});

transaction.add(sendSolInstruction);

async function sendLambport() {
    return sendAndConfirmTransaction(connection, transaction, [keypair]);
}

sendLambport()
    .then((signature) => {
        console.log(signature, "Signature");

        getBalanceUsingWeb3(public_key)
            .then((balance) => {
                console.log(public_key.toBase58());
                console.log(balance / LAMPORTS_PER_SOL, "SOL");
            })
            .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));

async function getBalanceUsingWeb3(publicKey) {
    return connection.getBalance(publicKey);
}
