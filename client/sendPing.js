require("dotenv").config();

const {
    Keypair,
    Connection,
    clusterApiUrl,
    Transaction,
    TransactionInstruction,
    PublicKey,
    sendAndConfirmTransaction,
} = require("@solana/web3.js");

function getPayerKeypair() {
    let SECREAT_KEY = JSON.parse(process.env.SECREAT_KEY ?? "");
    let secretKey = Uint8Array.from(SECREAT_KEY);
    return Keypair.fromSecretKey(secretKey);
}

async function pingProgram({ connection, signer }) {
    const PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
    const PROGRAM_DATA_ADDRESS = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

    let programId = new PublicKey(PROGRAM_ADDRESS);
    let prodramData = new PublicKey(PROGRAM_DATA_ADDRESS);

    let transaction = new Transaction();
    let transactionInstruction = new TransactionInstruction({
        programId,
        keys: [
            {
                pubkey: prodramData,
                isSigner: false,
                isWritable: true,
            },
        ],
    });

    transaction.add(transactionInstruction);

    let signature = await sendAndConfirmTransaction(connection, transaction, [
        signer,
    ]);

    console.log("Signature", signature);
}

async function main() {
    let payerKeypair = getPayerKeypair();
    console.log(payerKeypair.publicKey);
    let connection = new Connection(clusterApiUrl("devnet"));

    await pingProgram({ connection, signer: payerKeypair });
}

main()
    .then()
    .catch((err) => console.error(err));
