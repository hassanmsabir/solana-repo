const solanaWeb3 = require('@solana/web3.js');

async function generateKeys() {
    // Generate a new keypair
    const keypair = solanaWeb3.Keypair.generate();

    // Extract the public and private keys
    const publicKey = keypair.publicKey.toBase58();
    const privateKey = keypair.secretKey;

    // Print the keys
    console.log('Public Key:', publicKey);
    console.log('Private Key:', privateKey);
}

generateKeys();
