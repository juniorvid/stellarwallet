const Stellar = require('stellar-sdk');
const server = new Stellar.Server('https://horizon-testnet.stellar.org');
Stellar.Network.useTestNetwork();
const express = require('express');
const port = 8080;
const app = express();
app.listen(port);
const fetch = require('node-fetch');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(bodyParser.json());

app.get('/',(req,res) => {
    fs.readFile(__dirname + '/index.html', 'utf8', function(err, text){
        res.send(text);
    });
});
app.post('/',(req,res) => {
    importAccount(req.body.password,res);
});

     async function importAccount(sk, res) {
        const secretKey = sk;
        const sourceKeypair = Stellar.Keypair.fromSecret(secretKey);
        const publicKey = sourceKeypair.publicKey();
        const account = await server.loadAccount(publicKey);
        let response = `Public Key: ${publicKey}        Balance: ${Math.round(account.balances[0].balance)} lumens`
        res.send(response);
     }

