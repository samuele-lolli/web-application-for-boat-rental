const express = require("express");
let router = express.Router();
const server = require("../server")

router
    //effettua le insert sul database di tutte le date passate come prenotazione,
    //per uno specifico utente ed una specifica barca
    .route("/prenota")
    .post((req, res) => {
        const idUtente = req.body.idUtente;
        const idBarca = req.body.idBarca;
        const datePrenotate = req.body.datePrenotate;
        const emailAmministratore=1;
        let h=0;

        for(let i=0;i<datePrenotate.length;i++){
            server.databa.query("INSERT INTO nolonolo.prenotazione values(?,?,?,?);",
                [datePrenotate[i], idBarca, idUtente, emailAmministratore],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if (result.length === 1 && h===0) {
                        res.send({message: "ERR"})
                        h=1;
                    }
                    if(h===0 && i===(datePrenotate.length-1)){
                        res.send({message: "OK"})
                    }
                });
        }
    });

router
    .route("/dropdown")
    //recupera tutte le prenotazioni associate alle varie barche effettuate da uno specifico utente,
    .post((req, res) => {
        const idUtente = req.body.idUtente;

        server.databa.query("SELECT data, idBarca FROM prenotazione WHERE idUser=?;",
            [idUtente],
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

    });

router
    .route("/dropdown2")
    //recupera i nomi e le tariffe di una specifica barca a seconda dell'idBarca che viene passato.
    .post((req, res) => {
        const idBarca = req.body.idBarca;

        if(idBarca<1000){
            server.databa.query("SELECT nome, tariffa FROM nolonolo.vela WHERE id=?;",
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
            server.databa.query("SELECT nome, tariffa FROM nolonolo.motore WHERE id=?;",
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
            server.databa.query("SELECT nome, tariffa FROM nolonolo.nonalimentata WHERE id=?;",
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
            server.databa.query("SELECT nome, tariffa FROM nolonolo.accessorio WHERE id=?;",
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

router
    .route("/eliminaPrenotazione")
    //elimina dal database le prenotazioni relative a:
    //idBarca, idUtente e data passate come parametro
    .post((req, res) => {
        const id = req.body.id;
        const data = req.body.data;
        const idU = req.body.idU;

        server.databa.query("DELETE FROM nolonolo.prenotazione WHERE idBarca=? AND data=? AND idUser=?;",
            [id, data, idU],
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    res.send({message: "OK"});
                } else{
                    res.send({message: "ERR"});
                }
            });

    });
module.exports = router;