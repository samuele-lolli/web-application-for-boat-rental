const express = require("express");
let router = express.Router();
const server = require("../server")
const bcrypt = require("bcrypt");
const saltRounds = 10;
router
    //permette l'inserimento sul database di un nuovo utente con i relativi campi
    //se la mail è già associata ad un account, restituisce un errore
    .route("/nuovoUtente")
    .post((req, res) => {
        const email = req.body.email
        const password = req.body.password;
        const nome = req.body.nome;
        const cognome = req.body.cognome;
        const telefono = req.body.telefono;
        const dataNascita = req.body.dataNascita;
        const patente = req.body.patente;
        const puntiFedelta = 0;
        const saltRounds = 9;

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

router
    .route("/tuttiGliUtenti")
    .get((req, res) => {
        server.databa.query("SELECT id,email FROM users",
            (err, result) => {
                console.log(err);
                if (result) {
                    res.send(result)
                    console.log(result);
                }else {
                    res.status(400).json("Bad request")
                }
                if(err){
                    console.log(err);
                }
            });
    });

router
    .route("/deleteUser")
    .post((req, res) => {
        const email = req.body.nomeUser
        server.databa.query("SELECT id FROM users where email=?",
            email,
            (err, result) => {
                if (result) {
                    let id = result[0].id;
                    server.databa.query("SELECT * FROM prenotazione where idUser=?",
                        id,
                        (err, result) => {
                            if (result.length > 0) {
                                res.send({message: "error"})
                            }else {
                                server.databa.query("DELETE FROM users where email=?",
                                    email,
                                    (err, result) => {
                                        if (result) {
                                            res.send(result)
                                        }else {
                                            res.status(400).json("Bad request")
                                        }
                                        if(err){
                                            console.log(err);
                                        }
                                    });
                            }
                        });
                }else {
                    res.status(400).json("Bad request")
                }
                if(err){
                    console.log(err);
                }
            });
    });

router
    .route("/placeholderUtenti")
    .post((req, res) => {
        const email = req.body.email;
        server.databa.query("SELECT nome,cognome,password,telefono, patente FROM users WHERE email = ?",
            email,
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    res.send(result);
                }
            });
    });


router
    .route("/updateUtenti")
    .post((req,res) => {
        const email = req.body.email;
        const patente = req.body.patente;
        const nome = req.body.nome;
        const cognome = req.body.cognome;
        const password = req.body.password;
        const telefono = req.body.telefono;

        if(nome!==""){
            server.databa.query("UPDATE users SET nome=? WHERE email=?",
                [nome, email],
                (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
        }
        if(cognome!==""){
            server.databa.query("UPDATE users SET cognome=? WHERE email=?",
                [cognome, email],
                (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
        }
        console.log(password)
        if(password!=="") {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.log(err);
                }
                if (hash) {
                    console.log(hash);
                }
                server.databa.query("UPDATE users SET password=? WHERE email=?",
                    [hash, email],
                    (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
            })
        }

        if(telefono!==""){
            server.databa.query("UPDATE users SET telefono=? WHERE email=?",
                [telefono, email],
                (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
        }
        server.databa.query("UPDATE users SET patente=? WHERE email=?",
            [patente, email],
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    console.log(result);
                }
            });
        if(nome!=="" || cognome!==""|| telefono!=="" || password!==""){
            res.send({message: "siModifiche"}); //campi modificati correttamente
        }else if(nome==="" && cognome==="" && telefono==="" && password===""){
            res.send({message: "noModifiche"}); //nessuna modifica(campi mandati al server tutti vuoti "")
        }

    });

module.exports = router;