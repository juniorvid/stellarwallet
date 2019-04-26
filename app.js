const Stellar = require('stellar-sdk');
const server = new Stellar.Server('https://horizon-testnet.stellar.org');
Stellar.Network.useTestNetwork();
const express = require('express');
const port = 8000;
const app = express();
app.listen(port);


app.get('/',(req,res) => {
    createAccount(req,res);
});

const createAccount = async (req,res) => { 
    try{
        console.log(`Creating Account...`)
        let pair = Stellar.Keypair.random()
        let account = {
            pk : pair.publicKey(),
            sk : pair.secret()
        }
        console.log(`Public Key: ${account.pk}`);
        console.log(`Secret Key: ${account.sk}`);
        res.send(account);
    }catch(err){
        res.send({"Msg" : "ERROR : " + err})
    }
}
