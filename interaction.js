const solanaWeb3 = require('@solana/web3.js');

async function main() {
    // Connect to the Devnet cluster
    const connection = new solanaWeb3.Connection(
        solanaWeb3.clusterApiUrl('devnet'),
        'confirmed'
    );

    // Generate a new keypair for the sender
    const sender = solanaWeb3.Keypair.generate();
    console.log('Sender Public Key:', sender.publicKey.toString());

    // Generate a new keypair for the receiver
    const receiver = solanaWeb3.Keypair.generate();
    console.log('Receiver Public Key:', receiver.publicKey.toString());

    // Airdrop some SOL to the sender's account for testing
    const airdropSignature = await connection.requestAirdrop(
        sender.publicKey,
        solanaWeb3.LAMPORTS_PER_SOL // 1 SOL
    );

    // Confirm the transaction
    await connection.confirmTransaction(airdropSignature);

    // Check and print the balance of the sender's account after airdrop
    let senderBalance = await connection.getBalance(sender.publicKey);
    console.log('Sender Balance After Airdrop:', senderBalance);

    // Create a transaction to transfer SOL from sender to receiver
    const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
            fromPubkey: sender.publicKey,
            toPubkey: receiver.publicKey,
            lamports: solanaWeb3.LAMPORTS_PER_SOL / 100, // Transfer 0.01 SOL
        })
    );

    // Sign the transaction
    const signature = await solanaWeb3.sendAndConfirmTransaction(
        connection,
        transaction,
        [sender]
    );

    console.log('Transaction Signature:', signature);

    // Check and print the balance of both accounts after transfer
    senderBalance = await connection.getBalance(sender.publicKey);
    const receiverBalance = await connection.getBalance(receiver.publicKey);

    console.log('Sender Balance After Transfer:', senderBalance);
    console.log('Receiver Balance After Transfer:', receiverBalance);
}

main().catch(err => {
    console.error(err);
});
