const express = require("express");
const bcrypt = require("bcrypt");
let router = express.Router();
const server = require("../server")

//Registrazione utente
const saltRounds = 10;
router
    //permette la registrazione sulla tabella users di un nuovo utente con i relativi controlli
    .route("/register")
    .post((req, res) => {
        const email = req.body.emailReg;
        const password = req.body.passwordReg;
        const nome = req.body.nomeReg;
        const cognome = req.body.cognomeReg;
        const telefono = req.body.telefonoReg;
        const dataNascita = req.body.dataNascitaReg;
        const patente = req.body.patenteReg;
        const puntiFedelta = 0;

        server.databa.query("SELECT id FROM users WHERE email = ?",
            email,
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                if(result){
                    console.log(result);
                }
                if (result.length === 0) {
                    if(email && password && nome && cognome && telefono && dataNascita) {
                        bcrypt.hash(password, saltRounds, (err, hash) => {
                            if (err) {
                                console.log(err);
                            }
                            if(hash){
                                console.log(hash);
                            }
                            server.databa.query("INSERT INTO users (email, password, nome, cognome, telefono, dataNascita, patente, puntiFedelta) VALUES (?,?,?,?,?,?,?,?)",
                                [email, hash, nome, cognome, telefono, dataNascita, patente, puntiFedelta],
                                (err, result) => {
                                    if(err){
                                        console.log(err);
                                    }
                                    if (result) {
                                        console.log(result);
                                        res.send(result);
                                    }
                                });
                        })
                    } else{
                        res.status(400).json("Bad request");
                    }
                } else {
                    res.send({message:"Questa email è gia associata ad un account!"})
                }
            })
    });

module.exports = router;