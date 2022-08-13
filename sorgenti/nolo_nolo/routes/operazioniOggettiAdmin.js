const express = require("express");
let router = express.Router();
const server = require("../server")

router
    //permette l'inserimento di una nuova barca sul database, sempre a seconda della tipologia di essa
    .route("/nuovabarca")
    .post((req, res) => {
        const tipoBarca = req.body.tipoBarca
        const nomebarca = req.body.nomeBarca;
        const descrizione = req.body.descrizione;
        const metratura = req.body.metratura;
        const posti = req.body.posti;
        const cavalli = req.body.cavalli;
        const immagine = req.body.immagine;
        const prezzo = req.body.prezzo;
        const luogo = req.body.luogo;
        const condizioni = req.body.condizioni
        const disponibilita = req.body.disponibilita
        const patente = req.body.patente

        if(tipoBarca==="motore") {
            server.databa.query("SELECT id FROM motore WHERE nome = ?",
                nomebarca,
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if(result){
                        console.log(result);
                    }
                    if (result.length === 0) {

                        server.databa.query("INSERT INTO motore (nome,descrizione, metratura, patente, posti, cavalli, disponibilita,immagine, tariffa, luogo, stato) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                            [nomebarca, descrizione, metratura, patente, posti, cavalli, disponibilita, immagine, prezzo, luogo, condizioni],
                            (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                                if (result) {
                                    console.log(result);
                                    res.send(result);
                                }
                            });
                    }else{res.send({message:"errore"})}
                })

        } else if(tipoBarca==="vela"){
            server.databa.query("SELECT id FROM vela WHERE nome = ?",
                nomebarca,
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if(result){
                        console.log(result);
                    }
                    if (result.length === 0) {
                        server.databa.query("INSERT INTO vela (nome,descrizione, metratura, patente, posti, cavalli, disponibilita,immagine, tariffa, luogo, stato) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                            [nomebarca, descrizione, metratura, patente, posti, cavalli, disponibilita, immagine, prezzo, luogo, condizioni],
                            (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                                if (result) {
                                    console.log(result);
                                    res.send(result);
                                }
                            });
                    }else{res.send({message:"errore"})}
                })

        }else if(tipoBarca==="nonalimentata"){
            server.databa.query("SELECT id FROM nonalimentata WHERE nome = ?",
                nomebarca,
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if(result){
                        console.log(result);
                    }
                    if (result.length === 0) {
                        server.databa.query("INSERT INTO nonalimentata (nome,descrizione, metratura, posti, disponibilita,immagine, tariffa, luogo, stato) VALUES (?,?,?,?,?,?,?,?,?)",
                            [nomebarca, descrizione, metratura, posti, disponibilita, immagine, prezzo, luogo, condizioni],
                            (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                                if (result) {
                                    console.log(result);
                                    res.send(result);
                                }
                            });
                    }else{res.send({message:"errore"})}
                })



        }else if(tipoBarca==="accessori"){

            server.databa.query("SELECT id FROM accessorio WHERE nome = ?",
                nomebarca,
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if(result){
                        console.log(result);
                    }
                    if (result.length === 0) {

                        server.databa.query("INSERT INTO accessorio (nome,descrizione,disponibilita,immagine, tariffa, luogo, stato) VALUES (?,?,?,?,?,?,?)",
                            [nomebarca, descrizione, disponibilita, immagine, prezzo, luogo, condizioni],
                            (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                                if (result) {
                                    console.log(result);
                                    res.send(result);
                                }
                            });
                    }else{res.send({message:"errore"})}
                })

        } else{
            res.send({message: "errore nella categoria!"})
        }
    });


module.exports = router;