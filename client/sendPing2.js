require("dotenv").config();

const {
    Connection,
    clusterApiUrl,
    Keypair,
    Transaction,
    TransactionInstruction,
    PublicKey,
    sendAndConfirmTransaction,
} = require("@solana/web3.js");

async function main() {
    let connection = new Connection(clusterApiUrl("devnet"));

    let secretKey = JSON.parse(process.env.SECREAT_KEY ?? "");
    secretKey = Uint8Array.from(secretKey);
    let signerKeypair = Keypair.fromSecretKey(secretKey);

    let transaction = new Transaction();

    let transactionInstruction = new TransactionInstruction({
        programId: new PublicKey(
            "9AmEvBRT65oc7VZuqtANnCGWks9FWpxj1AD63XnSULnx"
        ),
        keys: [],
    });

    transaction.add(transactionInstruction);
    let signature = await sendAndConfirmTransaction(connection, transaction, [
        signerKeypair,
    ]);
    console.log("Signature", signature);
}

main()
    .then()
    .catch((err) => console.log(err));
