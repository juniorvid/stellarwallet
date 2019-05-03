const Stellar = require('stellar-sdk');
const server = new Stellar.Server('https://horizon-testnet.stellar.org');
Stellar.Network.useTestNetwork();
const express = require('express');
const port = 8000;
const app = express();
app.listen(port);
const fetch = require('node-fetch');

app.get('/:sk',(req,res) => {
    importAccount(req.params.sk);
});

     async function importAccount(sk) {
        const secretKey = sk;
        const sourceKeypair = Stellar.Keypair.fromSecret(secretKey);
        const publicKey = sourceKeypair.publicKey();
        console.log(publicKey);
        const account = await server.loadAccount(publicKey);
        console.log(account);
     }



     