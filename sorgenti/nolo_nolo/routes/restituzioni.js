const express = require("express");
let router = express.Router();
const server = require("../server")

router
    //controlla il booleano restituito(true/false) sulla tabella restituzioni,
    //dato l'id della barca, la data di inizio e fine di prenotazione, e l'idUtente
    //poi spedisce tutto al frontend
    .route("/controllaRestituzione")
    .post((req, res) => {
        const idBarca = req.body.idBarca;
        const inizio = req.body.inizio;
        const fine = req.body.fine;
        const idUtente = req.body.idUtente;

            server.databa.query("SELECT restituito FROM restituzioni WHERE idBarca=? AND dataInizio=? AND dataFine=? AND idUser=?",
            [idBarca, inizio, fine, idUtente],
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result.length>0) {
                    res.json(result)
                } else{
                    res.send({message: "ERR"})
                }
            });
    });

router
    //effettua le insert delle prenotazioni che l'utente sta restituendo,
    //successivamente dovranno essere accettate dall'admin anche e fino
    //a quel momento il booleano "restituito" rimane falso.
    .route("/restituisci")
    .post((req, res) => {
        const idBarca = req.body.idBarca;
        const inizio = req.body.inizio;
        const fine = req.body.fine;
        const idUtente = req.body.idUtente;

        server.databa.query("INSERT INTO restituzioni (idBarca, dataInizio, dataFine, idUser, restituito) VALUES (?,?,?,?,?)",
            [idBarca, inizio, fine, idUtente, false],
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    res.json(result)
                } else{
                    res.send({message: "ERR"})
                }
            });
    });

router
    .route("/restituisciUpdate")
    //va a settare a true "restituito" passandogli tutti i dati necessari per risalire alla
    //specifica prenotazione.
    //ciò viene fatto solo dopo che l'admin ha accettato la restituzione finale.
    .post((req, res) => {
        const idBarca = req.body.idBarca;
        const inizio = req.body.inizio;
        const fine = req.body.fine;
        const idUtente = req.body.idUtente;

        server.databa.query("UPDATE restituzioni SET restituito=? WHERE idBarca=? AND dataInizio=? AND dataFine=? AND idUser=? AND restituito=?",
            [true, idBarca, inizio, fine, idUtente, false],
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    res.json(result)
                } else{
                    res.send({message: "ERR"})
                }
            });
    });

router
    .route("/controllaMulte")
    //recupera da restituzioni tutti i campi necessari tramite idBarca, dataInizio e dataFine
    //lato front-end si verificherà se la restituzione è avvenuta in ritardo, e nel caso si procede
    //alla multa
    .post((req, res) => {
        const idUtente = req.body.idUtente;
        const fine = req.body.fine;
        const idBarca = req.body.idBarca;

        server.databa.query("SELECT * FROM restituzioni WHERE idBarca=? AND dataFine=? AND idUser=?",
            [idBarca, fine, idUtente],
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result.length>0) {
                    res.json(result)
                } else{
                    res.send({message: "ERR"})
                }
            });
    });

router
    //vengono recuperati i luoghi di restituzione(porti italiani) relativi alle singole barche.
    //a seconda dell'id viene selezionata una determinata categoria di barca
    .route("/luogoRestituzione")
    .post((req, res) => {
        const idBarca = req.body.idBarca;

        if(idBarca<1000){
            server.databa.query("SELECT luogo FROM nolonolo.vela WHERE id=?;",
                [idBarca],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if (result) {
                        res.json(result);
                    } else{
                        res.send({message: "ERR"});
                    }
                });
        }
        if(idBarca<2000 && idBarca>=1000){
            server.databa.query("SELECT luogo FROM nolonolo.motore WHERE id=?;",
                [idBarca],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if (result) {
                        res.json(result);
                    } else{
                        res.send({message: "ERR"});
                    }
                });
        }
        if(idBarca<3000 && idBarca>=2000){
            server.databa.query("SELECT luogo FROM nolonolo.nonalimentata WHERE id=?;",
                [idBarca],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if (result) {
                        res.json(result);
                    } else{
                        res.send({message: "ERR"});
                    }
                });
        }
        if(idBarca<4000 && idBarca>=3000){
            server.databa.query("SELECT luogo FROM nolonolo.accessorio WHERE id=?;",
                [idBarca],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if (result) {
                        res.json(result);
                    } else{
                        res.send({message: "ERR"});
                    }
                });
        }
    });
module.exports = router;