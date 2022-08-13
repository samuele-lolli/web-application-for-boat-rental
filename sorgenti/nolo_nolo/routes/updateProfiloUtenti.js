const express = require("express");
const bcrypt = require("bcrypt");
let router = express.Router();
const server = require("../server")

router
    //controlla che la password inserita sia corretta, se cosi è,
    //sarà possibile modificare i proprio dati sul profilo utente lato frontend
    .route("/passwordVecchia")
    .post((req, res) => {
        const id = req.body.id;
        const password0 = req.body.password0;

        server.databa.query("SELECT * FROM users WHERE id = ?",
            id,
            (err, result) => {
                if(err){
                    console.log(err);
                }
                if (result) {
                    console.log(result)
                }
                bcrypt.compare(password0, result[0].password, (error, response) => {
                    if (response) {
                        res.send({message: "OK"}); //vecchia password esatta
                        console.log(response);
                    } else {
                        res.send({message: "NO"}); //vecchia password errata
                        console.log(error);
                    }
                })
            });
    });

const saltRounds = 10;
router
    //aggiorna sul database tutti i campi modificati dall'utente lato frontend,
    //altrimenti restituisce un messaggio di errore.
    .route("/update")
    .post((req,res) => {
        const id = req.body.id;
        const emailU = req.body.emailU;
        const password = req.body.password;
        const nomeU = req.body.nomeU;
        const cognomeU = req.body.cognomeU;
        const telefonoU = req.body.telefonoU;
        const dataNascitaU = req.body.dataNascitaU;

        if(emailU!==""){
            server.databa.query("SELECT id FROM users WHERE email=?",
                emailU,
                (err, result) => {
                    if(err){
                        console.log(err);
                    }
                    if(result){
                        console.log(result);
                    }
                    if (result.length < 1) {
                        if(emailU!==""){
                            server.databa.query("UPDATE users SET email=? WHERE id=?",
                                [emailU, id],
                                (err, result) => {
                                    if(err){
                                        console.log(err);
                                    }
                                    if(result){
                                        console.log(result);
                                    }
                                });
                            res.send({message: "siModifiche"}); //campi modificati correttamente
                        }
                    }else{
                        if(password==="" && telefonoU==="" && dataNascitaU==="" && nomeU==="" && cognomeU===""){
                            res.send({message:"noModificheEmailErr"}); //nessun campo modificato e email che e' gia' presente sul db quindi non viene modificata
                        }else{
                            res.send({message: "siModificheEmailErr"}); //campi modificati correttamente a parte email che e' gia' presente sul db quindi non viene modificata
                        }
                    }
                });
        }
        if(password!==""){
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.log(err);
                }
                if(hash){
                    console.log(hash);
                }
                server.databa.query("UPDATE users SET password=? WHERE id=?",
                    [hash, id],
                    (err, result) => {
                        if(err){
                            console.log(err);
                        }
                        if(result){
                            console.log(result);
                        }
                    });
            })
        }
        if(nomeU!==""){
            server.databa.query("UPDATE users SET nome=? WHERE id=?",
                [nomeU, id],
                (err, result) => {
                    if(err){
                        console.log(err);
                    }
                    if(result){
                        console.log(result);
                    }
                });
        }
        if(cognomeU!==""){
            server.databa.query("UPDATE users SET cognome=? WHERE id=?",
                [cognomeU, id],
                (err, result) => {
                    if(err){
                        console.log(err);
                    }
                    if(result){
                        console.log(result);
                    }
                });
        }
        if(telefonoU!==""){
            server.databa.query("UPDATE users SET telefono=? WHERE id=?",
                [telefonoU, id],
                (err, result) => {
                    if(err){
                        console.log(err);
                    }
                    if(result){
                        console.log(result);
                    }
                });
        }
        if(dataNascitaU!==""){
            server.databa.query("UPDATE users SET dataNascita=? WHERE id=?",
                [dataNascitaU, id],
                (err, result) => {
                    if(err){
                        console.log(err);
                    }
                    if(result){
                        console.log(result);
                    }
                });
        }

        if((password!=="" || telefonoU!==""|| dataNascitaU!=="" || nomeU!=="" || cognomeU!=="") && (emailU==="")){
            res.send({message: "siModifiche"}); //campi modificati correttamente
        }else if(password==="" && telefonoU==="" && dataNascitaU==="" && nomeU==="" && cognomeU==="" && emailU===""){
            res.send({message: "noModifiche"}); //nessuna modifica(campi mandati al server tutti vuoti "")
        }

    });

router
    //recupera tutti i dati relativi ad un utente tramite l'id passato come parametro
    //questi dati verranno usati come placeholder all'interno del profilo utenti, prima delle modifiche
    .route("/placeholder")
    .post((req, res) => {
        const id = req.body.id;
        server.databa.query("SELECT * FROM users WHERE id = ?",
            id,
            (err, result) => {
                if(err){
                    console.log(err);
                }
                if (result) {
                    console.log(result);
                    req.session.user = result;
                    res.send({user: req.session.user});
                }
            });
    });

module.exports = router;