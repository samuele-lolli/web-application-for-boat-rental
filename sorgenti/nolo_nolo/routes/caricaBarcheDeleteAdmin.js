const express = require("express");
let router = express.Router();
const server = require("../server")

router
    //recupera tutte le barche a motore
    .route("/tuttelebarcheMotore")
    .get((req, res) => {
        server.databa.query("SELECT id,nome FROM motore",
            (err, result) => {
                if (result) {
                    console.log(result)
                    res.send(result)
                }else {
                    res.status(400).json("Bad request")
                }
                if(err){
                    console.log(err);
                }
            });
    });
router
    //recupera tutte le barche a vela
    .route("/tuttelebarcheVela")
    .get((req, res) => {
        server.databa.query("SELECT id, nome FROM vela",
            (err, result) => {
                console.log(err);
                if (result) {
                    res.send(result)

                }else {
                    res.status(400).json("Bad request")
                }
                if(err){
                    console.log(err);
                }
            });
    });

router
    //recupera tutte le barche non alimentate
    .route("/tuttelebarcheNonAlimentate")
    .get((req, res) => {
        server.databa.query("SELECT id, nome FROM nonalimentata",
            (err, result) => {
                console.log(err);
                if (result) {
                    res.send(result)

                }else {
                    res.status(400).json("Bad request")
                }
                if(err){
                    console.log(err);
                }
            });
    });

router
    //recupera tutti gli accessori
    .route("/tuttelebarcheAccessori")
    .get((req, res) => {
        server.databa.query("SELECT id, nome FROM accessorio",
            (err, result) => {
                console.log(err);
                if (result) {
                    res.send(result)

                } else {
                    res.status(400).json("Bad request")
                }
                if(err){
                    console.log(err);
                }
            });
    });

router
    //cancella la barca a motore dal nome passato come parametro
    .route("/deleteMotore")
    .post((req, res) => {
        const nomeBarca = req.body.nomeBarca
        server.databa.query("SELECT id FROM motore where nome=?",
            nomeBarca,
            (err, result) => {
                if (result) {
                    let id = result[0].id;
                    server.databa.query("SELECT * FROM prenotazione where idBarca=?",
                        id,
                        (err, result) => {
                            if (result.length > 0) {
                                server.databa.query("UPDATE motore SET disponibilita=0 where id=?",
                                    id,
                                    (err, result) => {
                                        if (result) {
                                            res.send({message: "ok"})
                                        }else {
                                            res.status(400).json("Bad request")
                                        }
                                        if(err){
                                            console.log(err);
                                        }
                                    });
                            }else {
                                server.databa.query("DELETE FROM motore where nome=?",
                                    nomeBarca,
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
                            if(err){
                                console.log(err);
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
    //cancella la barca non alimentata dal nome passato come parametro
    .route("/deleteNonAlimentata")
    .post((req, res) => {
        const nomeBarca = req.body.nomeBarca
        server.databa.query("SELECT id FROM nonalimentata where nome=?",
            nomeBarca,
            (err, result) => {
                if (result) {
                    let id = result[0].id;
                    server.databa.query("SELECT * FROM prenotazione where idBarca=?",
                        id,
                        (err, result) => {
                            if (result.length > 0) {
                                server.databa.query("UPDATE nonalimentata SET disponibilita=0 where id=?",
                                    id,
                                    (err, result) => {
                                        if (result) {
                                            res.send({message: "ok"})
                                        }else {
                                            res.status(400).json("Bad request")
                                        }
                                        if(err){
                                            console.log(err);
                                        }
                                    });
                            }else {
                                server.databa.query("DELETE FROM nonalimentata where nome=?",
                                    nomeBarca,
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
                            if(err){
                                console.log(err);
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
    //cancella la barca a vela dal nome passato come parametro
    .route("/deleteVela")
    .post((req, res) => {
        const nomeBarca = req.body.nomeBarca
        server.databa.query("SELECT id FROM vela where nome=?",
            nomeBarca,
            (err, result) => {
                if (result) {
                    let id = result[0].id;
                    server.databa.query("SELECT * FROM prenotazione where idBarca=?",
                        id,
                        (err, result) => {
                            if (result.length > 0) {
                                server.databa.query("UPDATE vela SET disponibilita=0 where id=?",
                                    id,
                                    (err, result) => {
                                        if (result) {
                                            res.send({message: "ok"})
                                        }else {
                                            res.status(400).json("Bad request")
                                        }
                                        if(err){
                                            console.log(err);
                                        }
                                    });
                            }else {
                                server.databa.query("DELETE FROM vela where nome=?",
                                    nomeBarca,
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
                            if(err){
                                console.log(err);
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
    //cancella l'accessorio dal nome passato come parametro
    .route("/deleteAccessori")
    .post((req, res) => {
        const nomeBarca = req.body.nomeBarca
        server.databa.query("SELECT id FROM accessorio where nome=?",
            nomeBarca,
            (err, result) => {
                if (result) {
                    let id = result[0].id;
                    server.databa.query("SELECT * FROM prenotazione where idBarca=?",
                        id,
                        (err, result) => {
                            if (result.length > 0) {
                                server.databa.query("UPDATE accessorio SET disponibilita=0 where id=?",
                                    id,
                                    (err, result) => {
                                        if (result) {
                                            res.send({message: "ok"})
                                        }else {
                                            res.status(400).json("Bad request")
                                        }
                                        if(err){
                                            console.log(err);
                                        }
                                    });
                            }else {
                                server.databa.query("DELETE FROM accessorio where nome=?",
                                    nomeBarca,
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
                            if(err){
                                console.log(err);
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
    //recupera tutti i campi relativi al tipo di barca scelto(motore, vela, ecc..) e al nome passato
    .route("/placeholderBarche")
    .post((req, res) => {
        const nomeBarca = req.body.nomeBarca;
        const tipoBarca = req.body.tipoBarca;
        console.log(tipoBarca)
        if(tipoBarca==="motore") {
            server.databa.query("SELECT * FROM motore WHERE nome = ?",
                nomeBarca,
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if (result) {
                        res.send(result);
                    }
                });
        } else if(tipoBarca === "vela"){
            server.databa.query("SELECT * FROM vela WHERE nome = ?",
                nomeBarca,
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if (result) {
                        console.log(result);
                        res.send(result);
                    }
                });
        } else if(tipoBarca === "nonalimentata"){
            server.databa.query("SELECT * FROM nonalimentata WHERE nome = ?",
                nomeBarca,
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if (result) {
                        console.log(result);
                        res.send(result);
                    }
                });
        } else if(tipoBarca === "accessori"){
            server.databa.query("SELECT * FROM accessorio WHERE nome = ?",
                nomeBarca,
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if (result) {
                        console.log(result);
                        res.send(result);
                    }
                });
        }
    });

router
    //aggiorna i campi delle barche a seconda del tipo di barca e del nome di barca passati come param.
    .route("/updateBarche")
    .post((req,res) => {
        const nomeBarcaIniziale = req.body.nomeBarcaIniziale;
        const descrizione = req.body.descrizione;
        const tipoBarca = req.body.tipoBarca;
        const disponibilita = req.body.disponibilita;
        const prezzo = req.body.prezzo;
        const condizioni = req.body.condizioni;
        if(tipoBarca==="motore") {
            if (descrizione !== "") {
                server.databa.query("UPDATE motore SET descrizione=? WHERE nome=?",
                    [descrizione, nomeBarcaIniziale],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (result) {
                            console.log(result);
                        }
                    });
            }
            if (disponibilita === false || disponibilita === true) {

                server.databa.query("UPDATE motore SET disponibilita=? WHERE nome=?",
                    [disponibilita, nomeBarcaIniziale],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (result) {
                            console.log(result);
                        }
                    });
            }
            if (prezzo !== "") {
                server.databa.query("UPDATE motore SET tariffa=? WHERE nome=?",
                    [prezzo, nomeBarcaIniziale],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (result) {
                            console.log(result);
                        }
                    });
            }
            if (condizioni !== "") {
                server.databa.query("UPDATE motore SET stato=? WHERE nome=?",
                    [condizioni, nomeBarcaIniziale],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (result) {
                            console.log(result);
                        }
                    });
            }
        }
        if(tipoBarca==="nonalimentata"){
            if (descrizione !== "") {
                server.databa.query("UPDATE nonalimentata SET descrizione=? WHERE nome=?",
                    [descrizione, nomeBarcaIniziale],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (result) {
                            console.log(result);
                        }
                    });
            }
            if (disponibilita === false || disponibilita === true) {

                server.databa.query("UPDATE nonalimentata SET disponibilita=? WHERE nome=?",
                    [disponibilita, nomeBarcaIniziale],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (result) {
                            console.log(result);
                        }
                    });
            }
            if (prezzo !== "") {
                server.databa.query("UPDATE nonalimentata SET tariffa=? WHERE nome=?",
                    [prezzo, nomeBarcaIniziale],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (result) {
                            console.log(result);
                        }
                    });
            }
            if (condizioni !== "") {
                server.databa.query("UPDATE nonalimentata SET stato=? WHERE nome=?",
                    [condizioni, nomeBarcaIniziale],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (result) {
                            console.log(result);
                        }
                    });
            }
        }
        if(tipoBarca==="vela"){
            if (descrizione !== "") {
                server.databa.query("UPDATE vela SET descrizione=? WHERE nome=?",
                    [descrizione, nomeBarcaIniziale],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (result) {
                            console.log(result);
                        }
                    });
            }
            if (disponibilita === false || disponibilita === true) {

                server.databa.query("UPDATE vela SET disponibilita=? WHERE nome=?",
                    [disponibilita, nomeBarcaIniziale],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (result) {
                            console.log(result);
                        }
                    });
            }
            if (prezzo !== "") {
                server.databa.query("UPDATE vela SET tariffa=? WHERE nome=?",
                    [prezzo, nomeBarcaIniziale],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (result) {
                            console.log(result);
                        }
                    });
            }
            if (condizioni !== "") {
                server.databa.query("UPDATE vela SET stato=? WHERE nome=?",
                    [condizioni, nomeBarcaIniziale],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (result) {
                            console.log(result);
                        }
                    });
            }
        }
        if(tipoBarca==="accessori"){
            if (descrizione !== "") {
                server.databa.query("UPDATE accessorio SET descrizione=? WHERE nome=?",
                    [descrizione, nomeBarcaIniziale],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (result) {
                            console.log(result);
                        }
                    });
            }
            if (disponibilita === false || disponibilita === true) {
                server.databa.query("UPDATE accessorio SET disponibilita=? WHERE nome=?",
                    [disponibilita, nomeBarcaIniziale],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (result) {
                            console.log(result);
                        }
                    });
            }
            if (prezzo !== "") {
                server.databa.query("UPDATE accessorio SET tariffa=? WHERE nome=?",
                    [prezzo, nomeBarcaIniziale],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (result) {
                            console.log(result);
                        }
                    });
            }
            if (condizioni !== "") {
                server.databa.query("UPDATE accessorio SET stato=? WHERE nome=?",
                    [condizioni, nomeBarcaIniziale],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (result) {
                            console.log(result);
                        }
                    });
            }
        }
        if(descrizione!=="" || condizioni!==""|| prezzo!==""){
            res.send({message: "siModifiche"}); //campi modificati correttamente
        }else if(descrizione==="" && condizioni==="" && prezzo===""){
            res.send({message: "noModifiche"}); //nessuna modifica(campi mandati al server tutti vuoti "")
        }
    });

module.exports = router;